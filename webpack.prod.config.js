const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const VENDOR_LIBS = ['react', 'redux', 'redux-thunk', 'react-redux', 'react-dom', 'react-select', 'rodal'];

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: false,
	},
};

const resolveUrlLoader = {
	loader: 'resolve-url-loader',
	options: {
		sourceMap: false,
		fail: true,
	},
};

const sassLoader = {
	loader: 'sass-loader',
	options: {
		outputStyle: 'compressed',
		sourceMap: false,
	},
};

const scssLoader = [cssLoader, resolveUrlLoader, sassLoader];

module.exports = merge(baseConfig, {
	entry: {
		bundle: './src/index.jsx',
		vendor: VENDOR_LIBS,
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].[chunkhash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					use: cssLoader,
				}),
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: scssLoader,
					publicPath: '/dist',
				}),
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				compress: {
					warnings: false,
				},
			},
		}),
	],
});
