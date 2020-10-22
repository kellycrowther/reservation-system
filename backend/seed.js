
const { Activity } = require("../backend/models");
const { Location } = require("../backend/models")

const seeds = [
  {
    name: "hello",
    locationId: 1
  },
  {
    name: "world",
    locationId: 2
  },
];

const locationSeeds = [
  {
    name: "lakeside",
  },
  {
    name: "gmrc",
  },
];

(async () => {
  await Activity.sync({ force: true });
  await Location.sync({ force: true });

  await Promise.all(
    locationSeeds.map(async (data) => {
      const location = await Location.create(data)
      console.log(`Created location with ID ${location.id}`);
    })
  );

  await Promise.all(
    seeds.map(async (data) => {
      const activity = await Activity.create(data)
      console.log(`Created activitiy with ID ${activity.id}`);
    })
  );
  console.log("Database seeded successfully.");
})();
