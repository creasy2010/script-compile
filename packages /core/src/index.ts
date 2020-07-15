/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/

import * as babel from  '@babel/core';

export function compile(code:string){
  return babel.transform("console.log(11)", {});
}
