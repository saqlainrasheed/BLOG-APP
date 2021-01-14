var express = require("express");
var router = express.Router();
const knex = require("../db");

//home route with all the posts
router.get("/", async (req, res) => {
  try {
    await knex
      .select("*")
      .from("Posts")
      .then((posts) => {
        res.status(200).send(posts);
      });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

//single posts router
router.get("/post/:id", async (req, res) => {
  try {
    await knex
      .select("*")
      .from("Posts")
      .then((posts) => {
        let post = posts.filter((post) => {
          return post.p_id == req.params.id;
        })[0];

        res.send(post);
      });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
});

module.exports = router;
