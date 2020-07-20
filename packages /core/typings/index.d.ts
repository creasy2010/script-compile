/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/
import * as babel from '@babel/core';
import { TransformOptions } from "@babel/core";
/**
 * 编译 表达式. 目前不允许定义内部方法;
 * @param code
 * @param opt
 */
export declare function compileExpress(code: string, opt?: TransformOptions): babel.BabelFileResult;
export declare function compile(code: string, opt?: TransformOptions): babel.BabelFileResult;
