import assert from 'node:assert/strict';
import { profileCollection } from '@x12i/mapix-mongo-profiler';
const profile = profileCollection({ runId: 'demo-run', sourceId: 'fixture-source',
  collection: { sourceId: 'fixture-source', dbName: 'fixture-db', collectionName: 'assets', dataRoot: 'data' },
  sampleStrategy: 'first_n', records: [
    { data: { id: 'asset-1', name: 'Example laptop', status: 'active' } },
    { data: { id: 'asset-2', name: 'Example server', status: 'active' } },
  ],
});
import { detectSensitivity, redactValue } from '@x12i/mapix-mongo-profiler';
assert.equal(profile.sampledRecordCount, 2);
const name = profile.fields.find(field => field.path === 'name');
const usable = name?.valueType === 'string' && name.presenceRatio === 1;
// The pinned release currently loses collected values before field analysis.
// Fail closed in the consuming workflow: do not promote this profile.
assert.equal(usable, false, 'Recheck this compatibility guard when upgrading');
assert.equal(name.presenceRatio, 0);
const sensitive = detectSensitivity('api_token').sensitive;
assert.equal(sensitive, true);
assert.notEqual(redactValue('synthetic-value', sensitive), 'synthetic-value');
console.log({ usable, observedNameField: name, nextAction: 'Use an authored reviewed profile until the value aggregation defect is fixed.' });
