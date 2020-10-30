import * as locationService from "../services/location.service";

export function create(req, res, next) {
  locationService
    .create(req.body)
    .then((location) => res.json(location))
    .catch(next);
}

export function getAll(req, res, next) {
  locationService
    .getAll()
    .then((locations) => res.json(locations))
    .catch(next);
}

export function getById(req, res, next) {
  locationService
    .getById(req.params.id)
    .then((location) => res.json(location))
    .catch(next);
}

export function update(req, res, next) {
  locationService
    .update(req.params.id, req.body)
    .then((location) => res.json(location))
    .catch(next);
}

export function _delete(req, res, next) {
  locationService
    ._delete(req.params.id)
    .then(() => res.json({ message: "Location deleted successfully" }))
    .catch(next);
}
