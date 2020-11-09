const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
var router = require("./routes");
const mongoose = require("mongoose");
var dbUrls = require('./dburls');

mongoose.connect(dbUrls.localhost, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
    console.log('ticketdb connected successful!!');
});

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello");
})

app.use("/", router);

app.listen(3000, () => console.log("App is running on port 3000"));