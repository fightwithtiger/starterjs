import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

const extensions = [".js"];

const resolve = (...args) => path.resolve(...args);

const config = [
  {
    // 编译typescript, 生成 js 文件
    input: resolve('./src/index.js'),
    output: [
      {
        file: resolve('./', pkg.module),
        format: 'es',
        name: 'starter',
      },
      // {
      //   file: resolve('./', pkg.main),
      //   format: 'cjs',
      //   name: 'starter',
      // },
    ],
    plugins: [
      commonjs(),
      babel({
        extensions,
      }),
      nodeResolve({
        extensions,
      }),
    ],
  },
];

export default config;
