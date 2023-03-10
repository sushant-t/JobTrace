const webpack = require("webpack");
const dotenv = require("dotenv");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config = {
  entry: {
    index: path.join(__dirname, "./src/index.tsx"),
    content: path.join(__dirname, "src/content/content.ts"),
    background: path.join(__dirname, "src/services/background.ts"),
  },
  output: { path: path.join(__dirname, "build"), filename: "[name].js" },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.ts(x)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: "url-loader",
            options: {
              mimetype: "image/png",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    fallback: {
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    },
    alias: {
      "axios/lib": path.resolve(__dirname, "node_modules/axios/lib"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "build"),
    },
    port: 3000,
    liveReload: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
    new ReactRefreshWebpackPlugin(),
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: "JobTrace",
      myPageHeader: "Welcome To JobTrace",
      template: "./src/index.html",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
    }),
    new webpack.DefinePlugin(envKeys),
  ],
};

module.exports = config;
