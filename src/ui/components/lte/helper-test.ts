import lte from './helper';

const { module, test } = QUnit;

module('Helper: lte', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(lte([]), undefined);
  });
});
