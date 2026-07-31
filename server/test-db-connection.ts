import { test } from 'node:test';
import assert from 'node:assert';
import { sequelize } from './models/database.js';

test('Database connection smoke test', async (t) => {
  try {
    // Live network test
    await t.test('Should authenticate successfully', async () => {
      await sequelize.authenticate();
      assert.ok(true, 'Database authentication successful');
    });

  } catch (error) {
    assert.fail(`Database connectivity validation failed ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    await sequelize.close();
  }
});