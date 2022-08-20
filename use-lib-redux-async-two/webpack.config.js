const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildMode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const outputDir = process.env.NODE_ENV === 'production' ? 'build' : 'dist';
const sourceMap =
    process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'eval-source-map';

const loaderCSS =
    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
    mode: buildMode,
    devtool: sourceMap,
    entry: {
        main: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
        path: path.resolve(__dirname, outputDir),
        filename: '[name].[contenthash].js',
        // здесь будут файлы ресурсов, для которых не задан путь в настройках загрузчика
        assetModuleFilename: 'asset/[hash][ext][query]',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Learn Redux',
            template: path.resolve(__dirname, 'src/index.html'), // файл шаблона
            filename: 'index.html', // выходной файл
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/i, // изображения
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 4096, // ограничение 4kb
                    },
                },
                generator: {
                    filename: 'img/[hash][ext][query]', // все изображения в dist/img или build/img
                },
            },
            {
                test: /\.s?css$/, // файл css-стилей
                use: [
                    loaderCSS, // style или link в head
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: {
                                    'postcss-preset-env': {
                                        browsers: 'last 3 versions',
                                    },
                                },
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i, // файлы шрифтов
                type: 'asset/resource',
                generator: {
                    filename: 'font/[hash][ext][query]', // все шрифты в dist/font или build/font
                },
            },
            {
                test: /\.js$/, // js-файлы, транспиляция
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    target: ['web', 'es6'], // сборка для браузера, es6+ будет преобразован в es5
    devServer: {
        port: 9000,
        open: true, // открыть браузер
    },
    watchOptions: {
        ignored: /node_modules/, // не отслеживать node_modules
        poll: 1000, // проверять изменения каждую секунду
    },
};

if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }));
}

module.exports = config;
