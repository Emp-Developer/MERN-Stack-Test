const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");

const users = require("./routes/api/users");

const User = require("./models/userModel");

const PORT = 4000;

app.use(cors());
app.use(express.json());

// Bodyparser middleware Replace with "express"
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// app.get('/', async function (req, res) {
//     const userInfo = req.body;
//     console.log("userInfo", userInfo)
//     const response = await userModel.insertMany(userInfo);
//     res.send(response);
// })

// app.post('/register', async function (req, res) {
//     const userInfo = req.body;
//     console.log("SignupInfor", userInfo)
//     const response = await UserModel.create(userInfo);
//     res.send(response);
// })

var MongClient = require('mongodb').MongoClient;
var url = require('./config/key').mongoURI;
MongClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("myDB");
    dbo.collection("usersCollection").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});