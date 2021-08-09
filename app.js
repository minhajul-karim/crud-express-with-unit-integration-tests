/*
 * Title: Project Initial File
 * Description: Initial file to start the application
 * Author: Minhajul Karim
 * Date: 4 Aug 2021
 */

// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const userRouter = require("./routes/users");

const app = express();

// Handlebars settings
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Index route
app.get("/", (req, res) => {
  res.sendStatus(200);
});

// Settings to parse body of a POST request
app.use(express.urlencoded({ extended: true }));

// Use a separate router for the paths following /customers
app.use("/customers", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
