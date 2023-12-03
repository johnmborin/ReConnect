const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const queryText = `
      SELECT q.id, q.detail, q.type, q.hidden, q.archived, qo.id as option_id, qo.detail as option_detail
      FROM question q
      LEFT JOIN question_options qo ON q.id = qo.question_id;
    `;
    const result = await pool.query(queryText);
    const rows = result.rows;

    const questions = rows.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          detail: row.detail,
          type: row.type,
          hidden: row.hidden,
          archived: row.archived,
          options: [],
        };
      }
      if (row.option_detail) {
        acc[row.id].options.push({
          id: row.option_id,
          detail: row.option_detail,
        });
      }
      return acc;
    }, {});

    const questionsArray = Object.values(questions);

    console.log(questionsArray);

    res.json(questionsArray);
  } catch (error) {
    console.log("error in question router GET", error);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = `INSERT INTO "question" ("detail", "type")
    VALUES ($1, $2) RETURNING id;`;
    const result = await client.query(queryText, [
      req.body.detail,
      req.body.type,
    ]);

    const questionId = result.rows[0].id;

    if (req.body.type === "single" || req.body.type === "multi") {
      const queryText = `INSERT INTO "question_options" ("question_id", "detail")
      VALUES ($1, $2);`;
      for (let option of req.body.options) {
        await client.query(queryText, [questionId, option.detail]);
      }
    }
    await client.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("error in question router POST", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.put("/:id", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const updateQuestionQuery = `UPDATE "question" SET "type" = $1, "detail" = $2, "hidden" = $3 WHERE "id" = $4;`;
    await client.query(updateQuestionQuery, [
      req.body.type,
      req.body.detail,
      req.body.hidden,
      req.params.id,
    ]);

    for (let option of req.body.options) {
      if (String(option.id).startsWith("new-")) {
        const newOptionsQuery = `INSERT INTO "question_options" ("question_id", "detail") VALUES ($1, $2);`;
        await client.query(newOptionsQuery, [req.params.id, option.detail]);
      } else {
        const updateOptionQuery = `UPDATE "question_options" SET "detail" = $1 WHERE "id" = $2;`;
        await client.query(updateOptionQuery, [option.detail, option.id]);
      }
    }

    for (let optionId of req.body.deleteOptions) {
      await client.query(`DELETE FROM "question_options" WHERE "id" = $1;`, [
        optionId,
      ]);
    }

    await client.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("error in question router PUT", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.put("/visibility/:id", (req, res) => {
  const queryText = `UPDATE "question" SET "hidden" = NOT "hidden" WHERE "id" = $1;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in question router PUT", error);
      res.sendStatus(500);
    });
});

router.put("/archive/:id", (req, res) => {
  const queryText = `UPDATE "question" SET "archived" = true WHERE "id" = $1;`;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in question router PUT", error);
      res.sendStatus(500);
    });
});

module.exports = router;
