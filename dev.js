const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config")({ dev: true });
console.log(webpackConfig);
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const compiler = webpack(webpackConfig);
const app = require("express")();
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res) => {
    fs.readFile(path.join(compiler.outputPath, "index.html"), (err, file) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send(file.toString());
        }
    });
});

app.listen(3001, (err) => {
    if (err) {
        return console.error(err.message);
    }
});