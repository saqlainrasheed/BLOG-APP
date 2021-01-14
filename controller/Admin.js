var express = require("express");
var router = express.Router();
const knex = require("../db");
//admin routes
// dashboard
router.get("/admin", async (req, res) => {
  try {
    await knex
      .select("*")
      .from("Posts")
      .then((posts) => {
        res.status(200).send(posts);
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// single posts dashboard
router.get("/admin/edit/:id", async (req, res) => {
  try {
    await knex
      .select("*")
      .from("Posts")
      .then((posts) => {
        let post = posts.filter((post) => {
          return post.p_id == req.params.id;
        })[0];
        res.status(200).json(post);
      });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// create post;
router.post("/admin/create", async (req, res) => {
  const { title, body } = req.body;
  try {
    const newPost = await knex("Posts").insert({
      title: title,
      body: body,
      date_of_creation: new Date(),
    });
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

// delete post;
router.delete("/admin/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await knex("Posts").where({ p_id: id }).del();
    res.status(200).send("Successfully deleted.");
  } catch (error) {
    res.status(400).send("Something went wrong.");
  }
});

// update post;
router.put("/admin/edit/:id", async (req, res) => {
  const { title, body } = req.body;
  const id = req.params.id;
  try {
    await knex("Posts").where("p_id", "=", id).update({
      title: title,
      body: body,
    });

    res.status(200).send("Updated post successfully.");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
