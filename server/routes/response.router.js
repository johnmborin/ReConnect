const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  let queryText = `
    SELECT "response".*, "user"."first_name" 
    FROM "response" 
    JOIN "user" ON "response"."user_id" = "user"."id" 
    ORDER BY "response"."id" ASC
  `;

  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(err, "error in survey GET");
      res.sendStatus(500);
    });
});

module.exports = router;
