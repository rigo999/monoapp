// packages/utils/src/utils/tools.ts
import { resolve } from "path";

import deepmerge from "deepmerge";

/**
/**
 * 深度合并两个对象。
 *
 * 该函数通过递归合并两个对象的属性。特别地，它提供了对数组处理的自定义逻辑，
 * 可以根据数组模式（替换或合并）来决定如何处理数组类型的属性。
 *
 * @param x 初始值。
 * @param y 新值。
 * @param arrayMode 数组合并模式，可选值为'replace'（替换）或'merge'（合并），默认为'merge'。
 *        'replace'模式下，新数组会替换旧数组；'merge'模式下，新旧数组的元素会被合并去重。
 * @returns 返回合并后的对象。如果T2是T1的子类型，则返回T1；否则返回T1和T2的合并类型。
 */
export const deepMerge = <T1, T2>(
  x: Partial<T1>,
  y: Partial<T2>,
  arrayMode: "replace" | "merge" = "merge",
) => {
  // 初始化deepmerge的选项对象
  const options: deepmerge.Options = {};

  // 根据arrayMode的值，配置不同的数组合并策略
  if (arrayMode === "replace") {
    options.arrayMerge = (_d, s, _o) => s;
  } else if (arrayMode === "merge") {
    options.arrayMerge = (_d, s, _o) => Array.from(new Set([..._d, ...s]));
  }

  // 调用deepmerge库进行深度合并，并根据T1和T2的关系确定返回类型
  return deepmerge(x, y, options) as T2 extends T1 ? T1 : T1 & T2;
};

export const echoTest = () => "changed";

/**
 * 解析给定目录的路径。
 * 该函数通过分析错误堆栈找到调用者文件的位置，然后将给定的目录相对路径解析为绝对路径。
 * 这对于需要根据调用者的路径来确定资源位置的情况非常有用，例如加载配置文件或模块。
 * 获取dir参数相对于当前调用这个函数的文件的绝对路径
 * 比如调用者是scripts/test.ts,而src与scripts同级别.那么,pathResolve('../src')就是src的绝对路径
 * @param dir 需要解析的目录路径。它可以是相对路径或绝对路径。
 * @returns 返回解析后的绝对路径。
 */
export const pathResolve = (dir: string) => {
  // 创建一个错误对象来获取调用堆栈
  const { stack } = new Error();
  // 将堆栈信息分割成行
  const stackLines = stack.split("\n");
  // 获取调用者的行信息
  const callerLine = stackLines[2].trim();
  // 从调用者行中提取文件路径
  const callerFilePath = callerLine.match(/\(([^:)]+):/)[1];
  // 使用resolve函数将相对路径转换为绝对路径
  return resolve(callerFilePath, dir);
};
