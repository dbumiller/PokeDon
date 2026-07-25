import { test } from 'node:test';
import assert from 'node:assert';
import { sequelize } from './models/database.js';

test('Database connection smoke test', async (t) => {

  // Sub-test 1: Live network connection
  await t.test('should authenticate successfully', async () => {
    try {
      await sequelize.authenticate();
      assert.ok(true, 'Database authentication successful');
    } catch (error) {
      assert.fail(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  });

  // Sub-test 2: Clean process cleanup
  await t.test('should close connection cleanly', async () => {
    await sequelize.close();
    assert.ok(true, 'Connection closed successfully');
  });
});