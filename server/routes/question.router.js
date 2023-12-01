const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "question" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      console.log("questions", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      // console.log("error in question router GET", error);
      res.sendStatus(500);
    });
});

module.exports = router;
