const { activityService } = require("../services");

module.exports = {
  getAll,
  getById,
  update,
  create,
  _delete,
};

function create(req, res, next) {
  activityService
    .create(req.body)
    .then(() => res.json({ message: "Create activity successful" }))
    .catch(next);
}

function getAll(req, res, next) {
  activityService
    .getAll()
    .then((activities) => res.json(activities))
    .catch(next);
}

function getById(req, res, next) {
  activityService
    .getById(req.params.id)
    .then((activity) => res.json(activity))
    .catch(next);
}

function update(req, res, next) {
  activityService
    .update(req.params.id, req.body)
    .then((activity) => res.json(activity))
    .catch(next);
}

function _delete(req, res, next) {
  activityService
    .delete(req.params.id)
    .then(() => res.json({ message: "Activity deleted successfully" }))
    .catch(next);
}
