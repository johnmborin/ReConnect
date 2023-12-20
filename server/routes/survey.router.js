const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  let queryText = `SELECT * from "question" WHERE "hidden" = false AND "type" = 'multi' ORDER BY "id" ASC`;
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
    console.log(req.body);
    const surveyResponses = req.body;
    const userId = req.user.id;
    const currentDate = new Date();

    pool
      .connect()
      .then(client => {
        return client
          .query("BEGIN")
          .then(() => {
            const insertPromises = surveyResponses.map(response => {
              if (response) {
                let { id: question_id, response: userResponse } = response;
                console.log(
                  `Question ID: ${question_id}, User Response: ${userResponse}`
                );

                if (userResponse && userResponse.includes("|")) {
                  const responses = userResponse.split("|");
                  return Promise.all(
                    responses.map(res => {
                      return client.query(
                        `INSERT INTO "response" ("user_id", "date", "question_id", "response") VALUES ($1, $2, $3, $4)`,
                        [userId, currentDate, question_id, res.trim()]
                      );
                    })
                  );
                } else if (userResponse) {
                  return client.query(
                    `INSERT INTO "response" ("user_id", "date", "question_id", "response") VALUES ($1, $2, $3, $4)`,
                    [userId, currentDate, question_id, userResponse]
                  );
                }
              }
            });

            return Promise.all(insertPromises);
          })
          .then(client.query("COMMIT"))
          .catch(err => {
            console.error("Error during transaction", err.stack);
            return client.query("ROLLBACK");
          })
          .finally(() => {
            client.release();
          });
      })
      .then(() => res.sendStatus(201))
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
