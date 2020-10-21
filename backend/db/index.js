const { Sequelize } = require("sequelize");
const db = new Sequelize("sqlite://db.sqlite", { sync: true });
module.exports = db;