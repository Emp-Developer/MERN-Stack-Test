const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");

const users = require("./routes/api/users");

const UserModel = require('./models/userModel');

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

// app.post('/signup', async function (req, res) {
//     const userInfo = req.body;
//     console.log("SignupInfor", userInfo)
//     const response = await UserModel.create(userInfo);
//     res.send(response);
// })

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});