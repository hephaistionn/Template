const env = process.env.NODE_ENV;
const path = require('path')
const fs = require('fs');
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const I18nPlugin = require('i18n-webpack-plugin');

const jsEntry = './client/src/app.js';
const langEntry = '/client/assets/';
const output = './client/.dist';
const bundleName = 'bundle'


// loading languages
const files = fs.readdirSync(path.resolve(__dirname + langEntry))
.filter(filename => filename.indexOf('.json')!==-1);
const languages = {}
files.forEach(modelName => {
  languages[`${modelName.replace('.json', '')}`] = require(`./client/assets/${modelName}`);
});

const configs = Object.keys(languages).map(function (language) {
  const config = {
    entry: [jsEntry],
    output: {
      path: path.resolve(__dirname, output),
      filename: language + `.${bundleName}.js`
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
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
          test: /\.css$/,
          use: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: () => [autoprefixer()]
                }
              },
              'sass-loader'
            ]
          })
        },
        {
          test: /\.(woff2|eot|ttf|otf|woff2|woff)$/,
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
        filename: `${bundleName}.css`,
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
