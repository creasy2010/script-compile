/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/

import {compile, compileExpress} from "../index";

describe('基础编译', () => {
  it('基本转换', async () => {
    for (let i = 0, iLen = codes.length; i < iLen; i++) {
      let code1 = codes[i];
      let result  = compile(code1,{ast:true});
      debugger;
      expect(result.code).toMatchSnapshot("序号:"+i);
    }
  });

  it('表达式转换-数字', async () => {
    //累似于.  输入常量 22 ==> (() => 111)()  这样属性赋值可以为  var a = (() => 111)();
    let result = compileExpress("111");
    expect(result.code).toEqual(`(async () => {
  return 111;
})();`);
  });

   it('表达式转换-await', async () => {
      //累似于.  输入常量 22 ==> (() => 111)()  这样属性赋值可以为  var a = (() => 111)();
      let result = compileExpress("await fetchApi('sdfsdf')");
      expect(result.code).toEqual(`(async () => {
  return await fetchApi('sdfsdf');
})();`);

     let result1 = compileExpress("console.log(1231);await fetchApi('sdfsdf')");
     expect(result1.code).toEqual(`(async () => {
  console.log(1231);
  return await fetchApi('sdfsdf');
})();`);
  });
});


let codes =[
  "let a  =1;console.log(111)",
  `async function test (){
     let {data} = await api.get();
   }`
]
