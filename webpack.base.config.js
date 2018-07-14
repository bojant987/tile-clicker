const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /\.png$|.jpg$|.svg$|.jpeg$|.ico$/,
				loader: 'file-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.sass', '.scss', '.less', '.css', '.json', '.png'],
	},
	plugins: [
		new CopyWebpackPlugin([{ from: 'assets/img', to: 'img' }]),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest'],
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new ExtractTextPlugin({
			filename: '[name].[hash].css',
			allChunks: true,
		}),
	],
};
