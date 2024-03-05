// https://github.com/a-tarasyuk/react-webpack-typescript-babel
// https://github.com/Microsoft/TypeScript-Babel-Starter
// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
// https://github.com/webpack-contrib/sass-loader

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');
const ENTRY_POINTS = {
        'react-app': path.resolve(__dirname, 'react')
};

const outputPath = path.resolve(__dirname, 'docs');

let assetsPath = outputPath;// path.resolve(APP_PATH, 'assets');
// let assets = fs.readdirSync(assetsPath).map((v) => {
//    console.log('assets', path.join(assetsPath, v));
//    return path.join(assetsPath, v);
// });

module.exports = {
  entry: ENTRY_POINTS,

  output: {
    filename: '[name].js',
    path: outputPath
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.jpg'],
    alias: {
      '@services': path.resolve(__dirname, 'src', 'services', 'index.ts'),
      'bootstrap-css': 'node_modules/bootstrap/dist/css/bootstrap.css'
    }
  },

  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        babelrc: false,
        "presets": [
          "@babel/env",
          "@babel/typescript",
          "@babel/react"
        ],
        "plugins": [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread"
        ]
      }
    }, {
      test: /\.scss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader',
        options: {
          // https://github.com/webpack-contrib/file-loader#function
          name(file) {
            return '[name].[ext]';
          },
          outputPath: path.relative(outputPath, assetsPath)
        }
      }]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: path.join(__dirname, 'index.html') }),
    new ForkTsCheckerWebpackPlugin()
  ],


  devServer: {
    // https://webpack.js.org/configuration/dev-server/#devserverhttps
    // https: true,
    // headers: [{
    //   key: 'Authorization',
    //   value: 'Bearer <OAuth>',
    // }],
    hot: true
  }
};
