
const { Activity, Reservation, Location } = require("../backend/models");

const activitySeeds = [
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

const reservationSeeds = [
  {
    name: "my first reservation",
  },
  {
    name: "another reservation",
  },
];

(async () => {
  await Activity.sync({ force: true });
  await Location.sync({ force: true });
  await Reservation.sync({ force: true });

  await Promise.all(
    locationSeeds.map(async (data) => {
      const location = await Location.create(data)
      console.log(`Created location with ID ${location.id}`);
    })
  );

  await Promise.all(
    activitySeeds.map(async (data) => {
      const activity = await Activity.create(data)
      console.log(`Created activitiy with ID ${activity.id}`);
    })
  );

  await Promise.all(
    reservationSeeds.map(async (data) => {
      const activity = await Reservation.create(data)
      console.log(`Created reservation with ID ${activity.id}`);
    })
  );
  console.log("Database seeded successfully.");
})();
