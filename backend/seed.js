
const { Activity } = require("../backend/models");

const seeds = [
  {
    name: "hello",
  },
  {
    name: "world",
  },
];

(async () => {
  await Activity.sync({ force: true });
  await Promise.all(
    seeds.map(async (data) => {
      const activity = await Activity.create(data)
      console.log(`Created activitiy with ID ${activity.id}`);
    })
  );
  console.log("Database seeded successfully.");
})();
