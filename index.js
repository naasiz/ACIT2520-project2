const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const { ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");
const { forwardAuthenticated } = require("./middleware/checkAuth");
const passport = require("./middleware/passport");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);


app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(ejsLayouts);

app.set("view engine", "ejs");



// Routes start here
app.get("/reminders",ensureAuthenticated,reminderController.list);
app.get("/reminder/new", ensureAuthenticated,reminderController.new);
app.get("/reminder/:id",ensureAuthenticated ,reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated,reminderController.edit);
app.post("/reminder/", ensureAuthenticated,reminderController.create);
// ⭐ Implement these two routes below!
app.post("/reminder/update/:id", ensureAuthenticated,reminderController.update);
app.post("/reminder/delete/:id", ensureAuthenticated,reminderController.delete);

// 👌 Ignore for now
app.get("/register", authController.register);
// app.get("/login",forwardAuthenticated ,authController.login);
// app.post("/register", authController.registerSubmit);
// app.post("/login", authController.loginSubmit);
// app.post("/dashboard", authController.dashboard);
const authRoutes=require("./routes/authRoute");
const adminRoutes=require("./routes/indexRoute");
app.use('/auth',authRoutes);
app.use('/admin',adminRoutes)

app.listen(3001, function () {
  console.log(
    "Server running. Visit: http://localhost:3001/reminders in your browser 🚀"
  );
});
