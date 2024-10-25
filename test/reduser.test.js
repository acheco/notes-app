const { test, describe } = require("node:test");
const assert = require("assert");
const reduce = require("../utils/for_testing").reducer;

describe("Reduce", () => {
  test(" 1 plus 5 its 6", () => {
    assert.strictEqual(reduce([1, 5]), 6);
  });

  test("this array it equal to 21", () => {
    assert.strictEqual(reduce([1, 2, 3, 4, 5, 6]), 21);
  });

  test("of empty array is zero", () => {
    assert.strictEqual(reduce([]), 0);
  });
});
