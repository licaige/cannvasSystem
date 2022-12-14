/**
 * @author lg<lirufei0808@gmail.com>
 * @date 2020/4/29
 * @description
 */
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
	// ......
	configureWebpack: {
		plugins: [
			new MonacoWebpackPlugin({
				// available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
				languages: ['javascript', 'css', 'html', 'typescript', 'json']
			})
		]
	}
};
