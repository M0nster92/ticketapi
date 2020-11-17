const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
var router = require("./routes");
const mongoose = require("mongoose");
var dbUrls = require('./dburls');
var passport = require("passport");
var session = require("express-session");
const { urlencoded } = require("express");
const MongoStore = require("connect-mongo")(session);

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());
require("./passport-config");

app.use(session({
    name: 'usercookie',
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    cookie: {
        maxAge: 1 * 3600 * 1000, //1 hour
        httpOnly: false,
        secure: false
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.get('/', function(req, res, next) {
    req.session.name = "user";
    if (req.session.views) {
        console.log(req.session);
        req.session.views++
            res.setHeader('Content-Type', 'text/html')
        res.write('<p>views: ' + req.session.views + '</p>')
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
        res.end()
    } else {
        req.session.views = 1
        res.end('welcome to the session demo. refresh!')
    }
})


app.use("/", router);

app.listen(3000, () => console.log("App is running on port 3000"));