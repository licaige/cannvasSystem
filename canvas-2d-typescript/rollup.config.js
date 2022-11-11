import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { uglify } from 'rollup-plugin-uglify';
import typescript from "rollup-plugin-typescript"
import commonjs from "rollup-plugin-commonjs";

const extensions = [".ts"];

export default [
    {
        input: "./src/index.ts",
        external: [],
        plugins: [
            typescript(),
            resolve({ extensions }),
            commonjs({
                include: ["./src/**/*"]
            }),
            babel({ extensions, include: ["./src/**/*"] }),
            //uglify()
        ],
        output: [
            { file: pkg.browser, format: "es" },
            { file: pkg.browserMin, format: "es", plugins: [terser()] },
            { file: pkg.unpkg, format: "umd", name: "afc" },
        ],
        watch: {
            chokidar: {
                usePolling: true,
            },
        },
    },
];
