const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "prompt" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error in prompt router GET", error);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const newPrompt = req.body;
  const queryText = `INSERT INTO "prompt" ("detail", "hidden") VALUES ($1, $2);`;

  pool
    .query(queryText, [newPrompt.detail, newPrompt.hidden])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in prompt router POST", error);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  const prompt = req.body;
  const queryText = `UPDATE "prompt" SET "detail" = $1, "hidden" = $2 WHERE "id" = $3;`;

  pool
    .query(queryText, [prompt.detail, prompt.hidden, req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in prompt router PUT", error);
      res.sendStatus(500);
    });
});

router.put("/visibility/:id", (req, res) => {
  const queryText = `UPDATE "prompt" SET "hidden" = NOT "hidden" WHERE "id" = $1;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in prompt router PUT", error);
      res.sendStatus(500);
    });
});

module.exports = router;
