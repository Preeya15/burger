const express = require("express");

const router = express.Router();

var burger = require("../models/burger.js");

router.get("/", function (req, res) {
  burger.all(function (data) {
    var hbsObject = {
      burger: data,
    };
    // console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  console.log(req.body);
  //key value pairs passed in as two separate arrays
  burger.create(
    ["burger_name"],
    [req.body.burger_name],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = `id = ${req.params.id}`;
  console.log("condition", condition);
  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = `id = ${req.params.id}`;
  console.log("condition", condition);
  burger.delete(condition, function (result) {
  if(result.affectedRows===1){
    return res.status(200).end()
  } 
  console.log(result)
  });
  
  // res.redirect('/')
});

module.exports = router;