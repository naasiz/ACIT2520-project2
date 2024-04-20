let database = require("../database");

let remindersController = {
  list: (req, res) => {

    let userId = req.user.id;

    userReminders = database.cindy.reminders.filter(item =>  item.userId === userId);
    res.render("reminder/index", { reminders: userReminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    let userId=req.user.id;
    let reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      userId:userId
    };
    database.cindy.reminders.push(reminder);
    console.log(database.cindy.reminders);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implementation here 👈

    let reminderToFind = req.params.id;
    let { title, description, completed } = req.body;

    const index = database.cindy.reminders.findIndex(
      (item) => item.id == reminderToFind
    );

    if ((index) => 0) {
      database.cindy.reminders[index].title = title;
      database.cindy.reminders[index].description = description;
      database.cindy.reminders[index].completed =
        completed == "false" ? false : true;
    }
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    const id = req.params.id;
    database.cindy.reminders = database.cindy.reminders.filter(
      (item) => item.id != id
    );
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
