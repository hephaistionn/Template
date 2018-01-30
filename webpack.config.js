const env = process.env.NODE_ENV;
const path = require('path')
const fs = require('fs');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const I18nPlugin = require("i18n-webpack-plugin");

// loading languages
const files = fs.readdirSync(path.resolve(__dirname + '/client/assets/'))
.filter(filename => filename.indexOf('.json')!==-1);
const languages = {}
files.forEach(modelName => {
  languages[`${modelName.replace('.json', '')}`] = require(`./client/assets/${modelName}`);
});

const configs = Object.keys(languages).map(function (language) {
  const config = {
    entry: ['./client/src/app.js', './client/src/app.scss'],
    output: {
      path: path.resolve(__dirname, './client/.dist'),
      filename: language + '.bundle.js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            // eslint options (if necessary)
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react']
            }
          }
        },
        {
          test: /\.scs$/,
          use: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [autoprefixer({ "browserslist": ["last 3 versions"] })]
                }
              },
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(woff2|eot|ttf|otf)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle.css',
        allChunks: true,
        // disable: env !== 'production'
      }),
      new I18nPlugin(
        languages[language],
        { functionName: 'tr' }
      )
    ]
  }

  if (env === 'production') {
    config.plugins.push(new UglifyJSPlugin())
  }

  return config;

});

// only one language
if (env !== 'production') {
  configs.shift();
}

module.exports = configs;
