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
import PresetTypescript from "@babel/preset-typescript";
import PresetEnv from "@babel/preset-env";
import  PluginOptionalChaining from "@babel/plugin-proposal-optional-chaining";
import  PluginTransform from "@babel/plugin-transform-typescript";

import * as babelParser from '@babel/parser';




let mockApi ={
  assertVersion:()=>true
};
let presets  =  [
  [PresetEnv,{
    targets: {
      "chrome": "60",
    }
  }],
  PresetTypescript(mockApi)
];
let plugins = [
  PluginTransform(mockApi,{}),
  PluginOptionalChaining(mockApi,{}),]


export function compileExpress(code:string,opt?:TransformOptions){
  //是不是要把最后一行添加一个return;

  let wrapSource = `(async ()=>{
${code}
})()`;

  return compile(wrapSource,{
    ...opt,
    filename:"auto-gene/script.ts",
    presets,
    plugins: [
      {
      visitor:  {
        ExpressionStatement(path){
          let isEndExp = path.node.end==wrapSource.length-5;
          if(isEndExp) {
            let result  = path.getSource();
            if(!result.includes('return')) {
              debugger;

              let result  =babelParser.parse(`return ${path.getSource()}`,{
                allowAwaitOutsideFunction:true,
                allowReturnOutsideFunction:true,
                plugins:['typescript']
              })
              path.replaceWith( result.program.body[0]);
            }
          }
        }
      }
    }].concat(plugins)
  });
}


export function compile(code:string,opt?:TransformOptions){
  return babel.transform(code, opt);
}
