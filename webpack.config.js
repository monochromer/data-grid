const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProduction = NODE_ENV === 'production';

var config = {
    context: path.join(__dirname, '/src/'),
    entry: {
        bundle: './index.jsx'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, '/build/'),
        // publicPath: process.env.ASSET_PATH || '/assets/'
        // publicPath: '/'
    },

    resolve: {
        modules: [
          path.join(__dirname, '/src/'),
          'node_modules'
        ],
        extensions: ['.js', '.jsx', '.tsx', '.csx', '.coffee']
    },
    resolveLoader: {
      modules: ['node_modules']
    },

    watch: !isProduction,
    watchOptions: {
        aggregateTimeout: 150
    },

    devtool: isProduction ? false : 'cheap-module-eval-source-map',

    plugins: [
        // не дает перезаписать скрипты при наличии в них ошибок
        new webpack.NoEmitOnErrorsPlugin(),

        // минимизирует id, которые используются webpack для подгрузки чанков и прочего
        new webpack.optimize.OccurrenceOrderPlugin(),

        // выделение общего кода из точек входа
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            // filename: 'vendor-[hash].js',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),

        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),

        new ExtractTextPlugin({
          filename: 'styles.css',
          disable: !isProduction,
          allChunks: true
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.jsx$/,
                use: ['react-hot-loader', 'babel-loader'],
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.css$/,
                exclude: [/build/],
                use: 
                    !isProduction
                        ? ['style-loader', 'css-loader', 'postcss-loader']
                        : ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'postcss-loader']
                        })
            },
            {
                test: /\.styl$/,
                exclude: [/node_modules/, /build/],
                use: 
                    !isProduction
                        ? ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
                        : ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: ['css-loader', 'postcss-loader', 'stylus-loader']
                        })
            },
            {
                test: /\.(png|jpg|jpeg|svg|ttf|eot|woff|woff2)$/,
                use: ['url-loader?name=[path][name].[ext]&limit=4096']
            }
        ]
    },

    devServer: {
        host: 'localhost',
        port: '9000',
        // contentBase: [
        //     path.join(__dirname, '/build/'),
        //     // path.join(__dirname, '/build/assets/')
        // ],
        hot: true,
        historyApiFallback: true
    }
};


if (NODE_ENV == 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        mangle: { screw_ie8 : true },
        compress: {
            screw_ie8: true,
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