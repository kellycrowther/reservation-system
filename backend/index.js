const express = require("express");
const routes = require("./routes");

const { PORT } = process.env;

const app = express();

app.use(express.json());

app.set("port", PORT || 5000);

app.use("/api", routes);

app.listen(app.get("port"), () => {
  console.log(`🚀 Server is listening on port ${app.get("port")}`);
});
