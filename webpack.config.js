const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './pages/main/index.js',
    quiz: './pages/quiz/index.js',
    results: './pages/results/index.js',
    catalog: './pages/catalog/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './pages/main/index.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'quiz.html',
      template: './pages/quiz/index.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'results.html',
      template: './pages/results/index.html',
    }),
    new HTMLWebpackPlugin({
      filename: 'catalog.html',
      template: './pages/catalog/index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|wav|jpeg|svg|jpg|wav)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
    ],
  },
};
