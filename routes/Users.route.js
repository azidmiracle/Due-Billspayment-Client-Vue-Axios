const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../model/Users.model");

// Get all subscribers

router.get("/", async (req, res, next) => {
  //res.send("Getting data");
    try{
        const user = await User.find({})
        res.json(user)
    }catch (err) {
        res.json(err);
      }
});

// Create one subscriber
router.post("/", async (req, res, next) => {
  //console.log(req.body)
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser)
  } catch (err) {
    res.json(err);
  }
});

// Update one subscriber
router.patch("/:id", (req, res) => {});

// Delete one subscriber
router.delete("/:id", (req, res) => {});

module.exports = router;
