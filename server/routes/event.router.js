const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("in event router GET");
  const queryText = `
      SELECT user_event.*, event.* 
      FROM user_event 
      JOIN event ON user_event.event_id = event.id 
      ORDER BY user_event.id ASC;
    `;

  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in event router GET", error);
      res.sendStatus(500);
    });
});

module.exports = router;
