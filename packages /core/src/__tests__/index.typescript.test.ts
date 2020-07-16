/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/16
 **/


import {compileExpress} from "../index";

describe('typescript类型验证', () => {
  it('简单类型', async () => {
    let result1 = compileExpress("111 as number",{ast:true});
    debugger;
    expect(result1.code).toEqual(`(async () => {
  return 111 as number;
})();`);
  });
});
