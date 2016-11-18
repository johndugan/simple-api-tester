const express = require('express');
const app = express();
const api = express.Router();

// https://github.com/felixge/node-dateformat
const dateFormat = require('dateformat');
const createFile = (method) => `${method}_${dateFormat(new Date(), 'mmdd_hhMM-sstt')}.json`;
const logFile = (path, file) => `${__dirname}/${path}/${file}`;
const logRes = (file) => `Success! View contents in "/request/${file}"\n`;

// https://github.com/jprichardson/node-jsonfile
const jsonFile = require('jsonfile');
jsonFile.spaces = 4;

// https://github.com/expressjs/body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

// API routes
// ----------
api.route('/')
    .get((req, res) => {
        res.sendFile(`${__dirname}/data/data.json`);
    })
    .post((req, res) => {
        let file = createFile('post');
        jsonFile.writeFile(logFile('request', file), req.body, (err) => {
            if (err) {
                console.error(err);
            }
        });
        res.send(logRes(file));
    });

// Prepend API routes with /api
app.use('/api', api);

app.listen(5000, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Listening at http://localhost:5000');
});
