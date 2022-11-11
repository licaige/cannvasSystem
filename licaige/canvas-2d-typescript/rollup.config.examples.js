import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import template from "rollup-plugin-generate-html-template";
import { uglify } from "rollup-plugin-uglify";
import typescript from "rollup-plugin-typescript";
// import commonjs from "@rollup/plugin-commonjs"

const extensions = [".ts"];

export default [
    buildPage("index"),
    buildPage("chart"),
];

function buildPage(page, htmlTemplate = "src/examples/template.html") {
    return {
        input: `./src/examples/${page}/index.ts`,
        output: {
            file: `./examples/${page}.js`,
            format: "umd",
            extend: true,
            globals: {
            },
        },
        watch: {
            chokidar: {
                usePolling: true,
            },
        },
        plugins: [
            typescript(),
            // commonjs(),
            template({
                template: htmlTemplate,
                target: `${page}.html`,
            }),
            resolve({extensions}),
            babel({
                extensions,
                include: ["./src/**/*"]
            }),
            // uglify() // 压缩
        ],
    }
}
