import { config } from "../config";
import * as mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { model as userModel } from "../models/user.model";
import { model as reservationModel } from "../models/reservation.model";
import { model as locationModel } from "../models/location.model";
import { model as activityModel } from "../models/activity.model";
import { model as activityLocationJoinModel } from "../models/activity.model";
import { UserModelStatic } from "../interfaces/user.interface";

export { db };

interface IDatabase {
  User: UserModelStatic;
  Activity: any;
  Reservation: any;
  Location: any;
}

let db: IDatabase = <IDatabase>{};

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

  db = makeDb(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });
}

function makeDb(sequelize): IDatabase {
  let db: IDatabase = <IDatabase>{};
  // init models and add them to the exported db object
  const User = userModel(sequelize);
  const Reservation = reservationModel(sequelize);
  const Location = locationModel(sequelize);
  const Activity = activityModel(sequelize);
  const ActivityLocationJoin = activityLocationJoinModel(sequelize);

  // define relationships
  Reservation.belongsTo(User, { foreignKey: "userId" });
  Reservation.belongsTo(Activity, { foreignKey: "activityId", as: "activity" });
  Reservation.belongsTo(Location, { foreignKey: "locationId", as: "location" });

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
  return db;
}
