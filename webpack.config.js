const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOT_SERVER_URL = "/";// "http://localhost:3001/";
const devEntries = [
    "react-hot-loader/patch",
    `webpack-hot-middleware/client?path=${HOT_SERVER_URL}__webpack_hmr`,
];
const devPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoErrorsPlugin(),
];
const productionPlugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: false
        },
        mangle: {
            screw_ie8: true
        },
        output: {
            comments: false,
            screw_ie8: true
        }
    }),
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production"),
        },
    }),
];

module.exports = (options = {}) => ({
    entry: [
        ...(options.dev ? devEntries : []),
        "./config/polyfills.js",
        "./src/js/index.js",
    ],
    devtool: options.dev ? "eval" : "source-map",
    output: {
        path: path.resolve("./build"),
        filename: "app.js",
        publicPath: `${HOT_SERVER_URL}`,
    },
    module: {
        loaders: [
            // First, run the linter.
            // It's important to do this before Babel processes the JS.
            {
                test: /\.(js|jsx)$/,
                loader: 'eslint',
                include: path.resolve("./src"),
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                include: path.resolve("./src"),
                exclude: /node_modules/,
                loader: "babel",
            },
            {
                test: /\.css$/,
                exclude: /(normalize|global)/,
                loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
            },
            // JSON is not enabled by default in Webpack but both Node and Browserify
            // allow it implicitly so we also enable it.
            {
                test: /\.json$/,
                loader: 'json'
            },
            // "file" loader makes sure those assets end up in the `build` folder.
            // When you `import` an asset, you get its filename.
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            // "url" loader works just like "file" loader but it also embeds
            // assets smaller than specified size as data URLs to avoid requests.
            {
                test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            }
        ],
    },
    // We use PostCSS for autoprefixing only.
    // postcss: function () {
    //     return [
    //         autoprefixer({
    //             browsers: [
    //                 '>1%',
    //                 'last 4 versions',
    //                 'Firefox ESR',
    //                 'not ie < 9', // React doesn't support IE8 anyway
    //             ]
    //         }),
    //     ];
    // },
    plugins: [
        // Generates an `index.html` file with the <script> injected.
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve("./src/html/index.html"),
            minify: (options.dev ?
                {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true
                } :
                {}
            ),
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
        }),
        ...(options.dev ? devPlugins : productionPlugins),
    ],
});