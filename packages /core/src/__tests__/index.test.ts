/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/

import {compile} from "../index";

describe('11', () => {
  it('11', async () => {
    let {ast,code}  = compile("let a  =1;console.log(111)");
    expect(code).toEqual("hello");
  });
});
