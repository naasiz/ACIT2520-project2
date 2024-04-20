const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");




router.get("/panel", ensureAuthenticated, isAdmin, (req, res) => {
  req.sessionStore.all(function (error, sessions) {
    if (error) {
      return res.status(500).send(error);
    }
    res.render("auth/admin", {
      user: req.user,
      sessions: sessions
    });
  });
});

module.exports = router;
