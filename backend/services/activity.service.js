const { Activity } = require("../models");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await Activity.findAll();
}

async function getById(id) {
  return await getActivity(id);
}

async function create(params) {
  await Activity.create(params);
}

async function update(id, params) {
  const activity = await getActivity(id);

  Object.assign(activity, params);
  await activity.save();

  return activity.get();
}

async function _delete(id) {
  const activity = await getActivity(id);
  await activity.destroy();
}

// helpers
async function getActivity(id) {
  const activity = await Activity.findByPk(id);
  if (!activity) {
    throw "Activity not found";
  }
  return activity;
}
