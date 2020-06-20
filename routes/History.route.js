/*MODULE DESCRIPTION:
THIS ROUTE IS USED TO INSERT NEW TRANSACTION UNDER HOME TAB
AND
GET THE PREVIOUS TRANSACTION TO DISPALY UNDER HISTORY TAB
*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dueLists = require("../model/DueList.model");

/*
THIS PART IS GETTING ALL THE TRANSACTION
IN ORDER TO DISPLAY THE PREVIOUS TRANSACTIONS
*/
//Aggregation function
router.get("/:username", async (req, res, next) => {
  //res.send("Getting data");
  try {
    let todayDate = new Date(); //get the date today

    let prevMonth = new Date(todayDate.setMonth(todayDate.getMonth() - 6)); //get the date previous 12 months

    const due = await dueLists.aggregate([
      {
        $match: { username: req.params.username}
      },
      {
        $project: {//SECOND STAGE: project the necessary fiels
          username: 1,
          bills_name: 1,
          benefeciary_name: 1,
          txn: 1
        },
      },
      {
        $unwind: "$txn",
      },
      {
        $match: { "txn.date_paid": { $gte: new Date("2020-01-09") } }
      },
      {
        $group: {
          //THIRD STAGE: once projected, can sort the output by bills name
          _id: { month: { $month: "$txn.date_paid"}, year: { $year: "$txn.date_paid" } },
          allTnxs: {
            $push: {
              bills_name: "$bills_name",
              txn: "$txn",
            },
          },
        },
    }
    ]);
    res.json(due); //return the value and pass it to the client side
  } catch (err) {
    res.json(err);
  }
});

/*
//Aggregation function
router.get("/:username", async (req, res, next) => {
  //res.send("Getting data");
  try {
    let todayDate = new Date(); //get the date today

    let prevMonth = new Date(todayDate.setMonth(todayDate.getMonth() - 1)); //get the date previous 12 months

    const tnxs = await dueLists.aggregate([
      {
        $match: {
          //FIRST STAGE: GET THE LISTS WHERE THE username equals to the logged username
          username: req.params.username,
        },
      },
      {
        $project: {
          //SECOND STAGE: project the necessary fiels
          bills_name: 1,
          benefeciary_name: 1,
          txn: [
            //filter the transaction where the txn.date_paid is equal or greater than the prevMonth variable
            {
              $filter: {
                input: "$txn",
                as: "txn",
                cond: {
                  $and: [
                    {
                      $gte: ["$$txn.date_paid", prevMonth],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      /*{
        $group: {
          //THIRD STAGE: once projected, can sort the output by bills name
          _id: {
            day: {
              $dayofYear: "$txn.date_paid",
            },
            year: {
              $year: "$txn.date_paid",
            },
          },
          allTnxs: {
            $push: {
              bills_name: "$bills_name",
              txn: "txn",
            },
          },
        },
      },
    ]);
    res.json(tnxs); //return the value and pass it to the client side
  } catch (err) {
    res.json(err);
  }
});*/

module.exports = router;
