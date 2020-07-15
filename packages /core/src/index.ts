/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/

import * as babel from  '@babel/core';
import {TransformOptions} from "@babel/core";
import  template from '@babel/template'



export function compileExpress(code:string,opt?:TransformOptions){
  //是不是要把最后一行添加一个return;

  let wrapSource = `(async ()=>{
${code}
})()`;
  return compile(wrapSource,{
    plugins: [{
      visitor:  {
        ExpressionStatement(path){
          let isEndExp = path.node.end==wrapSource.length-5;
          if(isEndExp) {
            debugger;
            let result  = path.getSource();
            if(!result.includes('return')) {
              path.replaceWith( babel.template.statement.ast`return ${path.getSource()}`);
            }
          }
        },
        BlockStatement(path){
          //path.getSource()
          // path.replaceWithSourceString(``)
          debugger;
        }
      }
    }]
  });
}


export function compile(code:string,opt?:TransformOptions){
  return babel.transform(code, opt);
}
