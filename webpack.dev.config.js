const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const VENDOR_LIBS = ['react', 'redux', 'redux-thunk', 'react-redux', 'react-dom', 'react-router', 'react-router-dom'];

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
		// outputStyle: 'compressed',
		// sourceMap: false,
		outputStyle: 'expanded',
		sourceMap: true,
		sourceMapContents: true,
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
					publicPath: '/',
				}),
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
});
