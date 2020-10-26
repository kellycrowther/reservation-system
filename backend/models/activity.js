const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");
const { Sequelize } = require("sequelize");
const { Location } = require("./location");

class Activity extends Model {
  async test() {}
}

Activity.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

Location.hasMany(Activity, { foreignKey: "activityId", as: "activity" });
Activity.belongsTo(Location, { foreignKey: "locationId", as: "location" });

Activity.sync({ alter: true });

module.exports = {
  Activity,
};
