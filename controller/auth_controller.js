let database = require("../database");
let uesrs=require("../models/userModel");
const passport = require("../middleware/passport");

const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

let authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  dashboard:(req,res)=>{
    if (req.user.role == 'admin') {
      res.redirect('/admin');
    }
    else {
      res.render("dashboard", {
        user: req.user,
      });
    }
  },
  admin:(req,res)=>{
    req.sessionStore.all(function (error, sessions) {
      if (error) {
        return res.status(500).send(error);
      }
      res.render("admin", {
        user: req.user,
        sessions: sessions
      });
    });
  },
  loginSubmit: (req, res) => {
    passport.authenticate("local", {
      successRedirect: "/test",
      failureRedirect: "/test",
    });
  },

  registerSubmit: (req, res) => {
    const { email, password } = req.body;
    const id = users.length + 1; // Simulate unique user IDs
    uesrs.userModel.createOne(_,email,password);
    res.send('User registered successfully');
  },
};

module.exports = authController;
