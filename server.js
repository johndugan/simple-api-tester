/* eslint no-console:off, new-cap:off */
const express = require('express');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const jsonFile = require('jsonfile');

// -----
// SETUP
// -----

const app = express();
const apiRouter = express.Router();
jsonFile.spaces = 4;

// -------
// HELPERS
// -------

function createFile(method) {
    var colon = String.fromCodePoint(42889);
    return `${method}_${dateFormat(
        new Date(),
        `yyyy-mm-dd_tt_h${colon}MM${colon}ss`
    )}.json`;
}
function logFile(path, file) {
    return `${__dirname}/${path}/${file}`;
}
function logRes(file) {
    return `Success! View contents in "/request/${file}"`;
}

app.use(bodyParser.json()); // <- middleware

// ------
// ROUTER
// ------

apiRouter
    .route('/')
    .get((req, res) => {
        res.sendFile(`${__dirname}/data/data.json`);
    })
    .post((req, res) => {
        var file = createFile('post');
        jsonFile.writeFile(logFile('request', file), req.body, (err) => {
            if (err) {
                console.error(err);
            }
        });
        res.send(logRes(file));
    });

// ------
// ROUTES
// ------

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});
app.use('/api', apiRouter); // <- middleware (apply apiRouter to all /api routes)

// ------
// SERVER
// ------

const port = process.env.PORT || 5000;
app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Listening at http://localhost:${port}`);
});
