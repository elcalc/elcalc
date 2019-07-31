const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const OptimizeWasmPlugin = require('optimize-wasm-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const translateEnvToMode = env => {
	if (env === 'production') {
		return 'production';
	}

	return 'development';
};

module.exports = env => {
	return {
		target: 'electron-renderer',
		mode: translateEnvToMode(env),
		node: {
			__dirname: false,
			__filename: false
		},
		externals: [nodeExternals()],
		optimization: {
			minimize: translateEnvToMode(env) === 'production',
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							warnings: false,
							comparisons: false,
							inline: 2
						},
						output: {
							ecma: 8,
							comments: false,
							/* eslint-disable-next-line camelcase */
							ascii_only: true
						}
					},
					parallel: true,
					sourceMap: false,
					cache: true
				}),
				new OptimizeWasmPlugin()
			],
			mangleWasmImports: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: ['babel-loader?cacheDirectory=true']
				},
				{
					test: /\.css$/,
					use: [
						'cache-loader',
						'style-loader',
						'css-loader',
						'clean-css-loader'
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../src/app.html'),
				filename: 'app.html',
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeStyleLinkTypeAttributes: true,
					removeScriptTypeAttributes: true,
					keepClosingSlash: true,
					minifyJS: true,
					minifyCSS: true,
					minifyURLs: true
				},
				excludeAssets: [/background.js/]
			}),
			new HtmlWebpackExcludeAssetsPlugin(),
			new ScriptExtHtmlWebpackPlugin({
				defaultAttribute: 'async',
				prefetch: ['app.js']
			}),
			new WasmPackPlugin({
				crateDirectory: path.resolve(__dirname, '../crate')
			}),
			new FriendlyErrorsWebpackPlugin({clearConsole: env === 'development'})
		]
	};
};
