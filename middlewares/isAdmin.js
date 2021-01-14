const knex = require("../db");

const isAdmin = async (req, res, next) => {
  const { username } = req.body;

  const user = await knex("Users")
    .select("role")
    .where("username", "=", username);
  if (user) {
    next();
  } else {
    res.send("You cant access admin page");
  }
};

module.exports = isAdmin;
