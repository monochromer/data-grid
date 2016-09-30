const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const NODE_ENV = (process.env.NODE_ENV || 'development').trim();

var config = {
    context: path.join(__dirname, '/src'),
    entry: {
        bundle: './index.jsx'
    },
    output: {
        path: __dirname + '/build/assets/',
        filename: '[name].js',
        publicPath: 'build/'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx']
    },

    // resolveLoader: {
    //     modulesDirectories: ['node_modules'],
    //     moduleTemplates:    ['*-loader', '*'],
    //     extensions:         ['', '.js']
    // },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 150
    },

    devtool: NODE_ENV == 'development' ? "source-map" : null,

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
        new ExtractTextPlugin('styles.css', {
            allChunks: true,
            disable: NODE_ENV == 'development'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel",
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.jsx$/,
                loader: "react-hot!babel",
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.css$/,
                loader: "style!css!postcss",
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!stylus?resolve url'),
                exclude: [/node_modules/, /build/]
            },
            {
                test:   /\.(png|jpg|jpeg|svg|ttf|eot|woff|woff2)$/,
                loader: 'url?name=[path][name].[ext]&limit=4096'
            }
        ]
    },

    postcss: function () {
        return [
            autoprefixer({
                browsers: ['last 4 versions', '> 1%', 'IE 9']
            })
        ];
    },

    devServer: {
        // proxy: {
        //     '*': 'http://localhost:3000'
        // },
        host: 'localhost',
        port: '9000',
        contentBase: __dirname + '/build',
        historyApiFallback: true
    }
};


if (NODE_ENV == 'production') {
  config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true,
          unsafe: true
        }
      })
  );
}

// массив для мульти-компиляции
module.exports = [config];