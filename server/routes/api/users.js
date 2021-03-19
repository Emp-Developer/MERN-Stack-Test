const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key")

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load UserModel
const User = require("../../models/userModel");

router.post("/register", (req, res) => {
    // Validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(404).json({email: "Email already exists!"});
        } else {
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash password before storing
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {
        if(!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }

        // Check Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer" + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            }
        });
    });
});

router.post("/update", function(req, res) {
    User.findByIdAndUpdate(
        req.body.id, 
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        },
        {new: true},
        function(err, response) {
            if(err) {
                console.log("We hit an err" + err);
                res.json({
                    message: "Database update failed"
                });
            }
            console.log("This is the Response: " + response);
        }
    );
})

router.get('/api', (req, res) => {
    User.findOne({_id: "605058d65790ea4d4c584e1f"})
        .then((data) => {
            console.log('Data', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error', error);
        });
})

router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;

    const newUser = new User(data);

    newUser.save((error) => {
        if(error) {
            res.status(500).json({msg: 'Sorry...'})
            return;
        } 
        return res.json({
            msg: "Your data"
        });
        
    });
});

router.get('/api/email', (req, res) => {
    const data = {
        email: 'limin@gmail.com',
    };
    res.json(data)
})



module.exports = router;