const { locationService } = require("../services");

module.exports = {
  getAll,
  getById,
  update,
  create,
  _delete,
};

function create(req, res, next) {
  locationService
    .create(req.body)
    .then((location) => res.json(location))
    .catch(next);
}

function getAll(req, res, next) {
  locationService
    .getAll()
    .then((locations) => res.json(locations))
    .catch(next);
}

function getById(req, res, next) {
  locationService
    .getById(req.params.id)
    .then((location) => res.json(location))
    .catch(next);
}

function update(req, res, next) {
  locationService
    .update(req.params.id, req.body)
    .then((location) => res.json(location))
    .catch(next);
}

function _delete(req, res, next) {
  locationService
    .delete(req.params.id)
    .then(() => res.json({ message: "Location deleted successfully" }))
    .catch(next);
}
