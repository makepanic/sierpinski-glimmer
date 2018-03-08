import div from './helper';

const { module, test } = QUnit;

module('Helper: div', function(hooks) {
  test('it computes', function(assert) {
    assert.equal(div([]), undefined);
  });
});
