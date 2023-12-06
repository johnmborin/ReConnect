const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // console.log("in resource router GET");
  const accessLevelQuery = req.user.is_parent ? "Adult": "Child";
  const queryText = `SELECT * FROM "resource" WHERE access_level = '${accessLevelQuery}' ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      // console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in resource router GET", error);
      res.sendStatus(500);
    });
});

module.exports = router;
