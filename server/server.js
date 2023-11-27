const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const familyRouter = require("./routes/family.router");
const eventRouter = require("./routes/event.router");
const resourceRouter = require("./routes/resource.router");
const questionRouter = require("./routes/question.router");
const responseRouter = require("./routes/response.router");
const promptRouter = require("./routes/prompt.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/family", familyRouter);
app.use("/api/event", eventRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/question", questionRouter);
app.use("/api/response", responseRouter);
app.use("/api/prompt", promptRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5002;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
