/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/

import {compile} from "../index";

describe('基础编译', () => {
  it('基本转换', async () => {

    for (let i = 0, iLen = codes.length; i < iLen; i++) {
      let code1 = codes[i];
      let result  = compile(code1,{ast:true});
      debugger;
      expect(result.code).toMatchSnapshot("序号:"+i);
    }
  });
});

let codes =[
  "let a  =1;console.log(111)",
  'async function test (){let {data} = await api.get()}'
]
