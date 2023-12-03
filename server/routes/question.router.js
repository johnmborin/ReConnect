const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const queryText = `
      SELECT q.id, q.detail, q.type, qo.id as option_id, qo.detail as option_detail
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

    console.log(JSON.stringify(questionsArray, null, 2));
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
        await client.query(queryText, [questionId, option.value]);
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

    // Update question detail and type
    const updateQuestionQuery = `UPDATE "question" SET "detail" = $1, "type" = $2 WHERE "id" = $3;`;
    await client.query(updateQuestionQuery, [
      req.body.detail,
      req.body.type,
      req.params.id,
    ]);

    // Process new options
    const newOptionsQuery = `INSERT INTO "question_options" ("question_id", "detail") VALUES ($1, $2);`;
    for (let option of req.body.options) {
      await client.query(newOptionsQuery, [req.params.id, option.value]);
    }

    // Process updated options
    for (let option of req.body.updatedOptions) {
      const updateOptionQuery = `UPDATE "question_options" SET "detail" = $1 WHERE "id" = $2;`;
      await client.query(updateOptionQuery, [option.value, option.id]);
    }

    // Delete options not present in updatedOptions
    // const allOptions = await client.query(
    //   `SELECT "id" FROM "question_options" WHERE "question_id" = $1;`,
    //   [req.params.id]
    // );
    // const updatedOptionsIds = req.body.updatedOptions.map(
    //   (option) => option.id
    // );

    // for (let option of allOptions.rows) {
    //   if (!updatedOptionsIds.includes(option.id)) {
    //     await client.query(`DELETE FROM "question_options" WHERE "id" = $1;`, [
    //       option.id,
    //     ]);
    //   }
    // }

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

module.exports = router;
