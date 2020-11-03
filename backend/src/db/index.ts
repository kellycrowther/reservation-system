import { config } from "../config";
import * as mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { model as userModel } from "../models/user.model";
import { model as reservationModel } from "../models/reservation.model";
import { model as locationModel } from "../models/location.model";
import { model as activityModel } from "../models/activity.model";
import { model as activityLocationJoinModel } from "../models/activity.model";
import { model as scheduleModel } from "../models/schedule.model";
import { model as scheduleStandardModel } from "../models/schedule-standard.model";
import { model as scheduleExceptionModel } from "../models/schedule-exception.model";
import { model as scheduleWeekdaysModel } from "../models/schedule-weekdays.model";
import { model as scheduleHoursModel } from "../models/schedule-hours.model";
import { UserModelStatic } from "../interfaces/user.interface";
import { ReservationModelStatic } from "../interfaces/reservation.interface";
import { LocationModelStatic } from "../interfaces/location.interface";
import { ActivityModelStatic } from "../interfaces/activity.interface";
import {
  ScheduleExceptionModelStatic,
  ScheduleHourModelStatic,
  ScheduleModelStatic,
  ScheduleStandardModelStatic,
  ScheduleWeekdayModelStatic,
} from "../interfaces/schedule.interface";

export { db };

interface IDatabase {
  User: UserModelStatic;
  Activity: ActivityModelStatic;
  Reservation: ReservationModelStatic;
  Location: LocationModelStatic;
  Schedule: ScheduleModelStatic;
  ScheduleStandard: ScheduleStandardModelStatic;
  ScheduleException: ScheduleExceptionModelStatic;
  ScheduleWeekdays: ScheduleWeekdayModelStatic;
  ScheduleHours: ScheduleHourModelStatic;
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
  const Schedule = scheduleModel(sequelize);
  const ScheduleStandard = scheduleStandardModel(sequelize);
  const ScheduleException = scheduleExceptionModel(sequelize);
  const ScheduleWeekdays = scheduleWeekdaysModel(sequelize);
  const ScheduleHours = scheduleHoursModel(sequelize);

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

  // schedule relationships
  Activity.hasOne(Schedule, { foreignKey: "activityId", as: "schedule" });
  Schedule.belongsTo(Activity, { foreignKey: "activityId" });

  Schedule.hasMany(ScheduleStandard, {
    foreignKey: "scheduleId",
    as: "standard",
  });
  ScheduleStandard.belongsTo(Schedule, { foreignKey: "scheduleId" });
  ScheduleException.belongsTo(Schedule, { foreignKey: "scheduleId" });
  ScheduleStandard.hasMany(ScheduleWeekdays, {
    foreignKey: "scheduleStandardId",
    as: "weekdays",
  });
  ScheduleWeekdays.belongsTo(ScheduleStandard, {
    foreignKey: "scheduleStandardId",
  });
  ScheduleWeekdays.belongsTo(ScheduleException, {
    foreignKey: "scheduleExceptionId",
  });
  ScheduleStandard.hasMany(ScheduleHours, {
    foreignKey: "scheduleStandardId",
    as: "hours",
  });
  ScheduleHours.belongsTo(ScheduleStandard, {
    foreignKey: "scheduleStandardId",
  });
  ScheduleHours.belongsTo(ScheduleException, {
    foreignKey: "scheduleExceptionId",
  });

  // add to db
  db.User = User;
  db.Reservation = Reservation;
  db.Location = Location;
  db.Activity = Activity;
  db.Schedule = Schedule;
  db.ScheduleStandard = ScheduleStandard;
  db.ScheduleException = ScheduleException;
  db.ScheduleWeekdays = ScheduleWeekdays;
  db.ScheduleHours = ScheduleHours;
  return db;
}
