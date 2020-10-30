import { db } from "../db/index";

export async function getAll() {
  return await db.Location.findAll();
}

export async function getById(id) {
  return await getLocation(id);
}

export async function create(params) {
  return await db.Location.create(params);
}

export async function update(id, params) {
  const location = await getLocation(id);

  Object.assign(location, params);
  await location.save();

  return location.get();
}

export async function _delete(id) {
  const location = await getLocation(id);
  await location.destroy();
}

// helpers
async function getLocation(id) {
  const location = await db.Location.findByPk(id);
  if (!location) {
    throw "Location not found";
  }
  return location;
}
