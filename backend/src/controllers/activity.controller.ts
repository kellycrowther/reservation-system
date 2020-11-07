import * as activityService from "../services/activity.service";

export function create(req, res, next) {
  activityService
    .create(req.body)
    .then((activity) => res.json(activity))
    .catch(next);
}

export function getAll(req, res, next) {
  activityService
    .getAll()
    .then((activities) => res.json(activities))
    .catch(next);
}

export function getAllByUser(req, res, next) {
  activityService
    .getAllByUser(req.user)
    .then((activities) => res.json(activities))
    .catch(next);
}

export function getById(req, res, next) {
  activityService
    .getById(req.params.id)
    .then((activity) => res.json(activity))
    .catch(next);
}

export function update(req, res, next) {
  activityService
    .update(req.params.id, req.body)
    .then((activity) => res.json(activity))
    .catch(next);
}

export function _delete(req, res, next) {
  activityService
    ._delete(req.params.id)
    .then(() => res.json({ message: "Activity deleted successfully" }))
    .catch(next);
}

export function getCalendar(req, res, next) {
  activityService
    .getCalendar(req.params.id)
    .then((calendar) => res.json(calendar))
    .catch(next);
}
