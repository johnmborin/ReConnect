const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  let queryText = `SELECT * from "question" WHERE "hidden" = false AND "type" = 'short' ORDER BY "id" ASC`;
  pool
    .query(queryText)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  if (req.isAuthenticated()) {
    const responses = req.body.response;

    for (const questionId in responses) {
      const queryText = `
                INSERT INTO "response" ("response", "user_id", "date", "question_id")
                VALUES ($1, $2, $3, $4);
            `;

      const queryParams = [
        responses[questionId],
        req.user.id,
        req.body.date,
        questionId,
      ];

      pool
        .query(queryText, queryParams)
        .then(result => {})
        .catch(error => {
          console.log(error);
          res.sendStatus(500);
        });
    }

    res.sendStatus(201);
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
