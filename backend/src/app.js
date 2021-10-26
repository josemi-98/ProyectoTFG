import express from "express";
import config from "./config";
import router from './router';
import "./database";
const app = express();
const cors = require('cors')

app.use(cors());

// Config
config(app);

// Router
router(app);

app.listen(process.env.PORT, () =>
  console.log(`El servidor ha sido inicializado: http://${process.env.HOST}:${process.env.PORT}`)
);