const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


const NODE_ENV = (process.env.NODE_ENV || 'development').trim();

var config = {
    context: path.join(__dirname, '/src'),
    entry: {
        bundle: './index.jsx',
        common: './common.js'
    },
    output: {
        path: __dirname + '/build/assets/',
        filename: '[name].js',
        publicPath: '/assets'
    },

    resolve: {
        root: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules')
        ],
        modulesDirectories: ['node_modules'],
        extensions:         ['', '.js', '.jsx', '.tsx', '.csx', '.coffee']
    },

    watch: NODE_ENV == 'development',
    watchOptions: {
        aggregateTimeout: 150
    },

    devtool: NODE_ENV == 'development' ? "source-map" : null,

    plugins: [
        // не дает перезаписать скрипты при наличии в них ошибок
        new webpack.NoErrorsPlugin(),
        // находит общие зависимости библиотек и обобщает их
        new webpack.optimize.DedupePlugin(),
        // минимизирует id, которые используются webpack для подгрузки чанков и прочего
        new webpack.optimize.OccurrenceOrderPlugin(),
        // выделение общего кода из точек входа
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 2
        }),
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
                loaders: ["react-hot", "babel"],
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.css$/,
                loaders: ["style", "css", "postcss"],
                exclude: [/build/]
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
        host: 'localhost',
        port: '9000',
        contentBase: __dirname + '/build',
        historyApiFallback: true
    }
};


if (NODE_ENV == 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            sequences : true,
            booleans : true,
            loops : true,
            unused : true,
            warnings : false,
            drop_console: true,
            unsafe : true
        }
    })
  );
}

// массив для мульти-компиляции
module.exports = [config];