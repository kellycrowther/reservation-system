const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_middleware/error-handler");

const { PORT } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.set("port", PORT || 5000);

app.use("/api", routes);

// global error handler
app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(`🚀 Server is listening on port ${app.get("port")}`);
});
