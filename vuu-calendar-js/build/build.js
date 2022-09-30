/*-- rollup--*/
const rollup = require("rollup");
const progress = require("rollup-plugin-progress");
const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const version = process.env.VERSION || require('../package.json').version;

const inputOptions = {
    input: 'src/index.js',
    plugins: [resolve(), babel({
        babelrc: false,
        presets: [['env', {modules: false}]]
    }), progress()]
};

const banner =
    '/*!\n' +
    ` * vuu-calendar.js v${version}\n` +
    ` * (c) 2018-${new Date().getFullYear()} lihui zeng\n` +
    ' * Released under the MIT License.\n' +
    ' */';

const outputOptions = {
    file: 'dist/vuu-calendar.js',
    format: 'umd',
    name: 'Cer',
    banner
};


function build() {

    rollup.rollup(inputOptions).then(function (bundle, map) {
        bundle.write(outputOptions)
    }).catch(function () {

    })
}

build();
