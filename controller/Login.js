const express = require("express");
const router = express.Router();
const knex = require("../db");
const bcrypt = require("bcrypt");

//Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //validating input data
  if (!username || !password) {
    res.send("Please insert password or username.");
    return;
  } else {
    await knex("Users")
      .select("username")
      .where("username", "=", username)
      .then(async (user) => {
        //comparing passwords
        const isValid = bcrypt.compare(password, user[0].password);
        //if valid password found then this query will work
        if (isValid) {
          try {
            const user = await knex("Users")
              .select("username", "password", "role")
              .from("Users")
              .where({
                username,
                password,
              });
            //if user not found sending error message
            if (!user.length) {
              res.status(400).send("User not found");
              return;
            } else {
              //in case of user
              res.status(200).json({
                user: user,
                isLogin: true,
              });
              return;
            }
          } catch (error) {
            res.status(400).send(error);
          }
        }
      });
  }
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  //validating data
  if (!username || !email || !password) {
    res.send("Please fill the following field");
    return;
  }

  const hash = bcrypt.hashSync(password, 10);

  //registring user
  try {
    const user = await knex("Users")
      .insert({
        username,
        email,
        password: hash,
      })
      .into("Users");
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
