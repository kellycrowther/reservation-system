import { db } from "../db/index";

export async function getAll() {
  return await db.Activity.findAll({
    include: [{ model: db.Location, as: "locations" }],
  });
}

export async function getAllByUser(user) {
  const { id } = user;
  return await db.Activity.findAll({ where: { userId: id } });
}

export async function getById(id) {
  return await getActivity(id);
}

export async function create(params) {
  await db.Activity.create(params);
}

export async function update(id, params) {
  const activity = await getActivity(id);

  Object.assign(activity, params);
  await activity.save();

  return activity.get();
}

export async function _delete(id) {
  const activity = await getActivity(id);
  await activity.destroy();
}

// helpers
async function getActivity(id) {
  const activity = await db.Activity.findByPk(id);
  if (!activity) {
    throw "Activity not found";
  }
  return activity;
}
