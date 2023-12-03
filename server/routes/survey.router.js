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
    .then((result) => {
      console.log("result.rows", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(err, "error in survey GET");
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  console.log("/survey POST route");
  console.log(req.body);
  console.log("is authenticated?", req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log("user", req.user);

    let queryText = `
    INSERT INTO "response" ("response", "user_id", "date", "question_id", "score")
    VALUES ($1, $2, COALESCE($3, CURRENT_DATE), COALESCE($4, DEFAULT_QUESTION_ID), COALESCE($5, DEFAULT_SCORE));
`;

    const queryParams = [
      req.body.response,
      req.user.id,
      req.body.question_id, // Assuming this comes from the client
      req.body.score, // Assuming this comes from the client
    ];

    pool
      .query(queryText, queryParams)
      .then((result) => {
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(401);
  }
});

// router.get('/', (req, res) => {
//     console.log('/survey GET route');
//     console.log('is authenticated?', req.isAuthenticated());
//     console.log('user', req.user);
//     if(req.isAuthenticated()) {
//       let queryText = `SELECT * FROM "question" WHERE "user_id" = $1 ORDER BY id;`;
//       pool.query(queryText, [req.user.id]).then((result) => {
//           res.send(result.rows);
//       }).catch((error) => {
//           console.log(error);
//           res.sendStatus(500);
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   });

/**
 * POST route template
 */
// router.post('/', (req, res) => {
//   // POST route code here
// });

module.exports = router;
