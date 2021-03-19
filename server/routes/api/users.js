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

router.get("/dashboard", (req, res) => {
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

module.exports = router;