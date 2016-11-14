const express = require('express');
var compression = require('compression');
const app = express();

app.use(compression());
app.use(express.static('docs'));

app.listen(3002, (err) => {
    if (err) {
        return console.error(err.message);
    }
});