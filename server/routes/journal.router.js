const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // write a get route that gets all the journals from the database

  // console.log("in journal router GET");
  const queryText = `SELECT * FROM "journal" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in journal router GET", error);
      res.sendStatus(500);
    });
});

module.exports = router;
