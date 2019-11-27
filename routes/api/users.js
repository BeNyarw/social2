const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/key.js");
const validateRegisterInput = require("../../checking/register");
const validateLoginInput = require("../../checking/login");
const User = require("../../models/User.model.js");


router.route('/').get((req, res) => {
  User.find()
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        pseudo: req.body.pseudo,
        lvl: req.body.lvl,
        email: req.body.email,
        password: req.body.password
      });// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
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
  const { errors, isValid } = validateLoginInput(req.body);// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    // Check if user exists
    console.log(user)
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }// Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          pseudo: user.pseudo
        };// Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
              user : user.pseudo,
              lvl : user.lvl
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.route('/:pseudo').get((req, res) => {
    const pseudo = req.params.pseudo;
    console.log(pseudo)
    User.findOne({ pseudo })
    .then(User => res.json(User))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/addFriend/:pseudo", (req, res) => {

  const pseudo = req.params.pseudo;
  const user = req.body.user;// Find user by email
  User.findOne({ pseudo }).then(user => {
    // Check if user exists
    console.log(user)
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    User.findById({user})
      .then(post => {
        post.friend = pseudo;
        post.save()
          .then(() => res.json('Friend added'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
    User.findById({pseudo})
      .then(post => {
        post.friend = user;
        post.save()
          .then(() => res.json('Friend added'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
});

module.exports = router;
