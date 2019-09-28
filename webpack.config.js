const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 提取 CSS 为单独一个文件

module.exports = env => {
  if (!env) {
    env = {};
  }

  let plugins = [
    new HtmlWebpackPlugin({
      template: './app/views/index.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ];

  // 生产环境才提取css
  if (env.production) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: 'production',
        },
      }),
      new ExtractTextPlugin('style.css')
    );
  }

  return {
    entry: {
      app: './app/js/main.js',
    },
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: env.production
              ? {
                  css: ExtractTextPlugin.extract({
                    use: 'css-loader!px2rem-loader?remUnit=75&remPrecision=8',
                    fallback: 'vue-style-loader',
                  }),
                  scss: ExtractTextPlugin.extract({
                    use:
                      'css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
                    fallback: 'vue-style-loader',
                  }),
                }
              : {
                  css:
                    'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8',
                  scss:
                    'vue-style-loader!css-loader!px2rem-loader?remUnit=75&remPrecision=8!sass-loader',
                },
            cssModules: {
              localIdentName: '[path][name]---[local[---[hash:base64:5]',
              camelCase: true,
            },
          },
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader',
        },
      ],
    },
    plugins,
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js', // 用 webpack 1 时需用 'vue/dist/vue.common.js'
      },
      extensions: ['.js', '.json', '.vue'],
    },
  };
};
