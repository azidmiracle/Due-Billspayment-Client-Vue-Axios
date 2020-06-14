const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dueLists = require("../model/DueList.model");

// Get all dues

router.get("/:id", async (req, res, next) => {
    //res.send("Getting data");
    try {
      const due = await dueLists.find({_id: req.params.id});
      res.json(due);
    } catch (err) {
      res.json(err);
    }
  });


// Update one subscriber
router.post("/:id", async (req, res) => {
dueLists.update(
      { _id: req.params.id },{
          $push:{txn:req.body.txn}
      }).then(function(record){
        res.json(record)
      })
    });
/*
router.patch("/:id", async (req, res) => {
  try {
    const updatedDueTxn = await dueLists.findOne(
      { _id: req.params.id },
      {
        $set: {
          txn: req.body.txn,
        },
      }
    );
    res.json(updatedDueTxn)
  } catch (err) {
    res.json(err);
  }
});*/


// Delete one subscriber
router.delete("/:id", async (req, res) => {
    try{
        const removeDue =await dueLists.remove({
            _id:req.params.id
        })
        res.json(removeDue)
    }
    catch(err){
        res.json(err);
    }
    
});

module.exports = router;
