const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./Config/db");
// user
const { userRouter } = require("./routes/user.route");
// auth
const { auth } = require("./middleware/auth.middleware");
// Dash
const { dashRouter } = require("./routes/dashboard.route");

app.use(cors());
app.use(express.json());
// user
app.use("/users", userRouter);
// Dash
app.use("/employees", dashRouter);

app.listen(8080, async () => {
    try {
      await connection;
      console.log("Connected to database");
    } catch (err) {
      console.log(err);
      console.log("Not able to connect database");
    }
    console.log(`Server is running on port 8080`);
  });