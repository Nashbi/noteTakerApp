const fs = require('fs')
const express = require('express')
// const util = require('util')
const path = require('path')
// const notes = require('./db/db.json')
const { v4: uuidv4 } = require('uuid')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


// Let's setup the GET Route for our homepage
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Let's setup the GET Route for our notes page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };


app.get('/api/notes', (req, res) => {
    let ourNotes = fs.readFileSync('./db/db.json')
    ourNotes = JSON.parse(ourNotes);
    res.json(ourNotes);
});

app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (req.body) {
        const noteBody = {
            title,
            text,
            // id: uuid(),
        };
    readAndAppend(noteBody, './db/db.json');
    res.json('success')

    } else {
        res.error("It did not work");
    }

});


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))






// use the fs.length; fs. - use textContent to display ; 
//after you read the files, console log that data, 
//if it looks like an array of objects then you can use vanilla.js syntax to get what you need done.