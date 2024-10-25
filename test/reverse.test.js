const { test } = require("node:test");
const assert = require("assert");

const reverse = require("../utils/for_testing").reverse;

test("Reverse for a", () => {
  const result = reverse("a");
  assert.strictEqual(result, "a");
});

test("Reverse for react", async () => {
  const result = await reverse("react");
  assert.strictEqual(result, "tcaer");
});

test("Reverse for aeiou", async () => {
  const result = await reverse("aeiou");
  assert.strictEqual(result, "uoiea");
});
