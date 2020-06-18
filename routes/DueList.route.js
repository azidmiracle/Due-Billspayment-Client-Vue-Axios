const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dueLists = require("../model/DueList.model");

//Aggregation function
router.get("/:username", async (req, res, next) => {
  //res.send("Getting data");
  try {
    //get the date today

    let todayDate = new Date();

    let threemonthAgo = new Date(todayDate.setMonth(todayDate.getMonth() - 1));

    const due = await dueLists.aggregate([
      {
        $match: {
          username: req.params.username,
        },
      },
      {
        $project: {
          username: 1,
          bills_name: 1,
          benefeciary_name: 1,
          frequency: 1,
          scheduled_day: 1,
          amount: 1,
          currency: 1,
          txn: [
            {
              $filter: {
                input: "$txn",
                as: "txn",
                cond: {
                  $and: [
                    {
                      $gt: ["$$txn.date_paid", threemonthAgo],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      { $sort: { bills_name: 1 } },
    ]);
    res.json(due);
  } catch (err) {
    res.json(err);
  }
});

/*

// Get all dues

router.get("/:username", async (req, res, next) => {
  //res.send("Getting data");
  try {
    const due = await dueLists.aggregate().match(
      { username: req.params.username }
    ).project({
      username: 1,
      bills_name: 1,
      benefeciary_name: 1,
      frequency: 1,
      scheduled_day: 1,
      amount: 1,
      currency: 1,
      txn: {
        $filter: {
          input: "$txn",
          as: "txn",
          cond: {
            $and: [
              {
                $gt: [
                  "$$txn.date_paid",
                  ISODate("2020-06-10T19:31:01.279Z"),
                ],
              },
            ],
          },
        },
      },
    });
    res.json(due);
  } catch (err) {
    res.json(err);
  }
});
*/
/*
router.get("/:username", async (req, res, next) => {
  //res.send("Getting data");
  try {
    const due = await dueLists.find({username: req.params.username});
    res.json(due);
  } catch (err) {
    res.json(err);
  }
});

*/

// Create one due
router.post("/", async (req, res, next) => {
  //console.log(req.body)
  const due = new dueLists({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    bills_name: req.body.bills_name,
    benefeciary_name: req.body.benefeciary_name,
    frequency: req.body.frequency,
    scheduled_day: req.body.scheduled_day,
    amount: req.body.amount,
    currency: req.body.currency,
    txn: req.body.txn,
  });
  try {
    const savedDue = await due.save();
    res.json(savedDue);
  } catch (err) {
    res.json(err);
  }
});

// Update one due
router.patch("/:id", async (req, res) => {
  try {
    const updatedDue = await dueLists.updateOne(
      { _id: req.params.id },
      {
        $set: {
          bills_name: req.body.bills_name,
          benefeciary_name: req.body.benefeciary_name,
          frequency: req.body.frequency,
          scheduled_day: req.body.scheduled_day,
          amount: req.body.amount,
          currency: req.body.currency,
        },
      }
    );
    res.json(updatedDue);
  } catch (err) {
    res.json(err);
  }
});

// Delete one due
router.delete("/:id", async (req, res) => {
  try {
    const removeDue = await dueLists.remove({
      _id: req.params.id,
    });
    res.json(removeDue);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
