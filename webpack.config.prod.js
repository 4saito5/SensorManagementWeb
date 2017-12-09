const webpack = require("webpack"),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  extractTextPlugin = new ExtractTextPlugin('[name]');

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    'bundle.js': './client/index.tsx',
    'style-pc.css': './client/assets/stylesheets/style-pc.scss',
    'style-smartphone.css': './client/assets/stylesheets/style-smartphone.scss',
  },  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: '[name]'
  },
  module: {
    rules: [
      {
        // 拡張子 .ts もしくは .tsx の場合
        test: /\.tsx?$/,
        // TypeScript をコンパイルする
        use: 'awesome-typescript-loader'
      },
      {
        // SCSSファイルの読み込み
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?-url&minimize&sourceMap!sass-loader"
        })
      },
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ],
  },
  plugins: [
    extractTextPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};
