const db = require("../db/index");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Location.findAll();
}

async function getById(id) {
  return await getLocation(id);
}

async function create(params) {
  return await db.Location.create(params);
}

async function update(id, params) {
  const location = await getLocation(id);

  Object.assign(location, params);
  await location.save();

  return location.get();
}

async function _delete(id) {
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
