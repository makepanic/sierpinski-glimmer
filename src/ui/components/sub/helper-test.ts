import sub from './helper';

const { module, test } = QUnit;

module('Helper: sub', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(sub([]), undefined);
  });
});
