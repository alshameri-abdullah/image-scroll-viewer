const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.set("view engine", "ejs");

let dir;
let images = [];

app.get('/', (req, res) => {
    images = [];
    if (req.query.directory) {
        dir = req.query.directory;
        console.log('Your directory is:  ' , dir);
        let files = fs.readdirSync(dir);
        files.forEach(file => {
            if(
                path.extname(file) === '.jpg' ||
                path.extname(file) === '.jpeg' ||
                path.extname(file) === '.png' ||
                path.extname(file) === '.svg' ||
                path.extname(file) === '.gif'
            ) {
                var image = fs.readFileSync(path.join(dir, file), 'base64');
                images.push(image);
            }
        });
        return res.render('view', { images });
        
    } else {
        return res.sendFile(path.join(__dirname + '/Public/start.html'));
    }
});

app.listen(4000, function () {
    console.log('Listening on http://localhost:4000/');
});