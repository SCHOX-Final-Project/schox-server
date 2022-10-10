if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const errHandler = require("./middleware/errHandler");
const router = require("./routes");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.use(errHandler);

app.listen(port, () => {
  console.log("start di port", port);
});

module.exports = app;
