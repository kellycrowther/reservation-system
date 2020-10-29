const config = require("../config.json");
const mysql = require("mysql2/promise");
const { Sequelize } = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  makeDb(sequelize);

  // sync all models with database
  await sequelize.sync({ force: true });
}

function makeDb(sequelize) {
  // init models and add them to the exported db object
  const User = require("../models/user.model")(sequelize);
  const Reservation = require("../models/reservation")(sequelize);
  const Location = require("../models/location")(sequelize);
  const Activity = require("../models/activity")(sequelize);
  const ActivityLocationJoin = require("../models/activity-location.join")(
    sequelize
  );

  // define relationships
  Reservation.belongsTo(User, { foreignKey: "userId" });
  Location.belongsToMany(Activity, {
    foreignKey: "locationId",
    through: ActivityLocationJoin,
  });
  Activity.belongsToMany(Location, {
    foreignKey: "activityId",
    through: ActivityLocationJoin,
    as: "locations",
  });

  // add to db
  db.User = User;
  db.Reservation = Reservation;
  db.Location = Location;
  db.Activity = Activity;
}
