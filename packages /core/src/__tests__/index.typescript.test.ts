/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/16
 **/

import { compileExpress } from "../index";

describe("typescript类型验证", () => {
  it("简单类型", async () => {
    let result1 = compileExpress("111 as number", { ast: true });
    expect(result1.code).toMatchInlineSnapshot(`
      "\\"use strict\\";

      (async () => {
        return 111;
      })();"
    `);
  });
  it("option channel", async () => {
    let result1 = compileExpress("a.b?.c?.d", { ast: true });
    expect(result1.code).toMatchInlineSnapshot(`
      "\\"use strict\\";

      (async () => {
        var _a$b, _a$b$c;

        return (_a$b = a.b) === null || _a$b === void 0 ? void 0 : (_a$b$c = _a$b.c) === null || _a$b$c === void 0 ? void 0 : _a$b$c.d;
      })();"
    `);
  });
});
