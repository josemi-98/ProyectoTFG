import express from "express";
import config from "./config";
import router from './router';
import "./database";


const app = express();
const cors = require('cors');
const path = require('path');
const multer = require('multer')

app.use(cors());

var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var fs = require('fs');
require('dotenv/config');

//settings
//app.set(views,path.join(__dirname, 'views'));

// Step 4 - set up EJS
  
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
  
// Set EJS as templating engine 
app.set("view engine", "ejs");

// Step 5 - set up multer for storing uploaded files
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });

// Step 6 - load the mongoose model for Image
  
var imgModel = require('./models/ejercicio');

// Step 7 - the GET request handler that provides the HTML UI
  
app.get('/', (req, res) => {
  imgModel.find({}, (err, items) => {
      if (err) {
          console.log(err);
          res.status(500).send('An error occurred', err);
      }
      else {
          res.render('imagesPage', { items: items });
      }
  });
});

// Step 8 - the POST handler for processing the uploaded file
  
app.post('/', upload.single('image'), (req, res, next) => {
  
  var obj = {
      name: req.body.name,
      desc: req.body.desc,
      img: {
          data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
          contentType: 'image/png'
      }
  }
  imgModel.create(obj, (err, item) => {
      if (err) {
          console.log(err);
      }
      else {
          // item.save();
          res.redirect('/');
      }
  });
});



// Multer Middlwares - Creates the folder if doesn't exists
//app.use(multer({dest: path.join(__dirname, 'public/uploads')}).single('image'));

// Config
config(app);

// Router
router(app);


app.listen(process.env.PORT, () =>
  console.log(`El servidor ha sido inicializado: http://${process.env.HOST}:${process.env.PORT}`)
);