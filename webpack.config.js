const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');


// MiniCssExtractPlugin doesn't work with HMR, so enable it based on mode
const module_rule_scss = {
  test: /\.scss$/,
  use: [
    'style-loader',
    "css-loader",
    {
      loader: "sass-loader",
      options: {
        includePaths: ['./node_modules'],
        data: `
          @import "./static_src/yarr.scss";
        `,
      },
    },
  ],
}


const config = {
  entry: {
    'yarr': './static_src/yarr.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'yarr/static/yarr'),
    filename: '[name].js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  devServer: {
    contentBase: './yarr/static/yarr',
    hot: true,
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },

      // SCSS
      module_rule_scss,
    ],
  },
};


module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    console.log('Running in production, using MiniCssExtractPlugin');
    module_rule_scss.use[0] = MiniCssExtractPlugin.loader;
  }
  return config;
}
