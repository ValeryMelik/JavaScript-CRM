const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development';

  return {
    mode: env.mode,
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.js',
      clean: true,
    },
    devServer: {
      port: 4000,
      hot: true,
    },
    devtool: isDev ? 'inline-source-map' : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/layout', 'index.pug'),
      }),
      new FaviconsWebpackPlugin('./src/assets/img/favicon.png'),
      isDev && new webpack.ProgressPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/style.css',
        }),
    ],
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'defaults' }]],
            },
          },
        },
        {
          test: /\.svg$/i,
          type: 'asset/resource',
          generator: {
            filename: './img/[name][ext]',
          },
        },
        {
          test: /\.woff2$/i,
          type: 'asset/resource',
          generator: {
            filename: './fonts/[name][ext]',
          },
        },
        {
          test: /\.scss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.pug$/,
          loader: 'pug-loader',
        },
      ],
    },
  };
};
