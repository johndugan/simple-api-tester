const express = require('express');
const app = express();

// https://github.com/felixge/node-dateformat
const dateFormat = require('dateformat');
const logRequest = (method) => `${__dirname}/request/${method}_${dateFormat(new Date(), 'mmdd_hhMM-sstt')}.json`;

// https://github.com/jprichardson/node-jsonfile
const jsonFile = require('jsonfile');
jsonFile.spaces = 4;

// https://github.com/expressjs/body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('*', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/api', (req, res) => {
    jsonFile.writeFile(logRequest('post'), req.body, (err) => {
        if (err) {
            console.error(err);
        }
    });
    res.sendStatus(200);
});

app.listen(5000, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Listening at http://localhost:5000');
});
