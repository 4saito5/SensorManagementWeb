const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './client/index.tsx',
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: 'bundle.js'
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
      // ソースマップファイルの処理
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [
      '.ts', '.tsx', '.js', '.json'
    ],
  },
  // ソースマップを有効にする
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ],
};
