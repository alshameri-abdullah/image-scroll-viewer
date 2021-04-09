const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.set("view engine", "ejs");

let dir;
let images = [];
let recent = [];

if(fs.existsSync(path.join(__dirname, 'recent.json'))){
    recent = JSON.parse(fs.readFileSync('recent.json'));
} else {
    fs.writeFileSync('recent.json', JSON.stringify(recent));
}

app.get('/', (req, res) => {
    images = [];
    if (req.query.directory) {
        dir = req.query.directory;
        console.log('Your directory is:  ' , dir);
        let files = fs.readdirSync(dir);

        if(recent.includes(dir)){
            recent.splice(recent.indexOf(dir), 1);
        }
        recent.unshift(dir);
        if(recent.length > 10){
            recent.pop();
        }
        fs.writeFileSync('recent.json', JSON.stringify(recent));

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
        return res.render('start', { recent });
    }
});

app.listen(4000, function () {
    console.log('Listening on http://localhost:4000/');
});