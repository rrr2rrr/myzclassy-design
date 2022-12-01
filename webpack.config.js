const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritePlugin = require('svg-sprite-loader/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");
const path = require('path');
const fs = require('fs');
const del = require('del');

const PATH = {
    PUBLIC_PATH: path.join(__dirname, 'public'),
    JS: 'js/[name].[hash:5].js',
    CSS: 'css/[name].[hash:5].css',
    PAGES: './pages',
    ASSETS: {
      IMAGES: 'images',
      FONTS: 'fonts'
    }
}

const PAGES = fs.readdirSync(PATH.PAGES).filter(fileName => {
  if(fileName.endsWith('.pug') && !fileName.startsWith('_')){
    return fileName
  }
})

const ENTRYES = [
  './ts/index.ts',
  './sass/index.scss',
]

module.exports = {
  context: __dirname,
  mode: 'development',
  target: 'web',
  entry: ENTRYES,
  output: {
    path: PATH.PUBLIC_PATH,
    filename: PATH.JS,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   type: "asset",
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
    ],
  },
  plugins: [

    new MiniCssExtractPlugin({
      filename: PATH.CSS
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATH.ASSETS.IMAGES}`,
            to: `images`
        },
      ]
    }),

    new SpritePlugin(),

    // new ImageMinimizerPlugin({
    //   minimizer: {
    //     implementation: ImageMinimizerPlugin.imageminMinify,
    //     options: {
    //       plugins: [
    //         ["gifsicle", { interlaced: true }],
    //         ["jpegtran", { progressive: true }],
    //         ["optipng", { optimizationLevel: 5 }],
    //         [
    //           "svgo",
    //           {
    //             plugins: extendDefaultPlugins([
    //               {
    //                 name: "removeViewBox",
    //                 active: false,
    //               },
    //               {
    //                 name: "addAttributesToSVGElement",
    //                 params: {
    //                   attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
    //                 },
    //               },
    //             ]),
    //           },
    //         ],
    //       ],
    //     },
    //   },
    // }),

    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PATH.PAGES}/${page}`,
      filename: `./${page.replace(/\.pug/,'.html')}`,
      inject: 'body'
    })),



    {
      apply: (compiler) => {
        compiler.hooks.beforeCompile.tapAsync('DeletePublic', (params, callback) => {
            del([PATH.PUBLIC_PATH])
            callback();
        });
      }
    }
  ],
  devServer: {
    contentBase: PATH.PUBLIC_PATH,
    watchContentBase: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3000,
  }
};
