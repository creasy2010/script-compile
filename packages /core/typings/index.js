"use strict";
/**
 * @desc
 *
 * @使用场景
 *
 * @coder.yang2010@gmail.com
 * @Date    2020/7/15
 **/
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const babel = __importStar(require("@babel/core"));
const preset_typescript_1 = __importDefault(require("@babel/preset-typescript"));
const preset_env_1 = __importDefault(require("@babel/preset-env"));
const plugin_proposal_optional_chaining_1 = __importDefault(require("@babel/plugin-proposal-optional-chaining"));
const plugin_transform_typescript_1 = __importDefault(require("@babel/plugin-transform-typescript"));
const babelParser = __importStar(require("@babel/parser"));
let mockApi = {
    assertVersion: () => true
};
let presets = [
    [preset_env_1.default, {
            targets: {
                "chrome": "60",
            }
        }],
    preset_typescript_1.default(mockApi)
];
let plugins = [
    plugin_transform_typescript_1.default(mockApi, {}),
    plugin_proposal_optional_chaining_1.default(mockApi, {}),
];
/**
 * 编译 表达式. 目前不允许定义内部方法;
 * @param code
 * @param opt
 */
function compileExpress(code, opt) {
    //是不是要把最后一行添加一个return;
    let wrapSource = `(async ()=>{
${code}
})()`;
    //禁止内部再定义方法. 只允许外部有一个方法定义
    let functionCount = 0;
    let result = compile(wrapSource, Object.assign(Object.assign({}, opt), { filename: "auto-gene/script.ts", presets, plugins: [
            {
                visitor: {
                    ArrowFunctionExpression(path) {
                        functionCount++;
                    },
                    FunctionExpression(path) {
                        functionCount++;
                    },
                    ExpressionStatement(path) {
                        let isEndExp = path.node.end == wrapSource.length - 5;
                        if (isEndExp) {
                            let result = path.getSource();
                            if (!result.includes('return')) {
                                let result = babelParser.parse(`return ${path.getSource()}`, {
                                    allowAwaitOutsideFunction: true,
                                    allowReturnOutsideFunction: true,
                                    plugins: ['typescript']
                                });
                                path.replaceWith(result.program.body[0]);
                            }
                        }
                    }
                }
            }
        ].concat(plugins) }));
    if (functionCount > 1) {
        throw new Error('不支持内部定义方法,请尝试其他方法1111');
    }
    return result;
}
exports.compileExpress = compileExpress;
function compile(code, opt) {
    return babel.transform(code, opt);
}
exports.compile = compile;
