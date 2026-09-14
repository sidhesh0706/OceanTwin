"""Explicit delimited observation schema: one row per depth sample."""
import csv
import io
import math
from datetime import datetime, timezone
from backend.app.models import ObservationSource


def parse_observations(payload: bytes):
    content = payload.decode('utf-8-sig')
    try: dialect = csv.Sniffer().sniff(content[:4096], delimiters=',;\t')
    except csv.Error: dialect = csv.excel
    reader = csv.DictReader(io.StringIO(content), dialect=dialect)
    required = {'id','instrument_type','latitude','longitude','timestamp','depth','synthetic','source_name'}
    if not required.issubset(reader.fieldnames or []):
        raise ValueError('Required columns: ' + ', '.join(sorted(required)))
    groups = {}
    for line, row in enumerate(reader, 2):
        if line > 100001: raise ValueError('Maximum 100,000 samples per upload.')
        def number(key, optional=False):
            value = (row.get(key) or '').strip()
            if optional and value.lower() in ('','nan','na','null'): return None
            n = float(value)
            if not math.isfinite(n): raise ValueError(f'Line {line}: {key} must be finite.')
            return n
        stamp = datetime.fromisoformat(row['timestamp'].replace('Z','+00:00'))
        if stamp.tzinfo is None: raise ValueError('Timestamps must include a timezone.')
        if row['synthetic'].lower() not in ('true','false'): raise ValueError('synthetic must be true or false.')
        meta = dict(id=row['id'].strip(), instrument_type=row['instrument_type'].strip().upper(), latitude=number('latitude'), longitude=number('longitude'), timestamp=stamp.astimezone(timezone.utc).isoformat().replace('+00:00','Z'), synthetic=row['synthetic'].lower()=='true', source_name=row['source_name'].strip())
        if not meta['id'] or not meta['source_name']: raise ValueError('ID and source name cannot be empty.')
        if meta['id'] in groups and groups[meta['id']]['meta'] != meta: raise ValueError('Each profile ID must have consistent metadata; use a different ID for each cycle.')
        group=groups.setdefault(meta['id'],{'meta':meta,'profiles':[]})
        sample={'depth':number('depth')}
        for name in ('temperature','salinity','chlorophyll'):
            value=number(name, True)
            qc=(row.get(name+'_qc') or '').strip()
            if qc and qc not in ('1','2'): value=None
            sample[name]=value
            if name in ('temperature', 'salinity'):
                sample[name+'_qc'] = qc or None
        group['profiles'].append(sample)
    result=[]
    for g in groups.values():
        rows=sorted(g['profiles'],key=lambda p:p['depth'])
        if len({r['depth'] for r in rows}) != len(rows): raise ValueError('Duplicate depths in a profile are not supported.')
        variables=[v for v in ('temperature','salinity','chlorophyll') if any(r[v] is not None for r in rows)]
        if not variables: raise ValueError('Profile has no valid measurements.')
        result.append(ObservationSource.model_validate(g['meta'] | {'profiles':rows, 'available_variables':variables}).model_dump())
    if not result: raise ValueError('No profiles found.')
    return result
