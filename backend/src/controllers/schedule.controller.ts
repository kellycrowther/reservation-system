import * as scheduleService from "../services/schedule.service";

export function create(req, res, next) {
  scheduleService
    .create(req.body)
    .then((schedule) => res.json(schedule))
    .catch(next);
}

export function getAll(req, res, next) {
  scheduleService
    .getAll()
    .then((schedules) => res.json(schedules))
    .catch(next);
}

export function getAllByUser(req, res, next) {
  scheduleService
    .getAllByUser(req.user)
    .then((schedules) => res.json(schedules))
    .catch(next);
}

export function getById(req, res, next) {
  scheduleService
    .getById(req.params.id)
    .then((schedule) => res.json(schedule))
    .catch(next);
}

export function update(req, res, next) {
  scheduleService
    .update(req.params.id, req.body)
    .then((schedule) => res.json(schedule))
    .catch(next);
}

export function _delete(req, res, next) {
  scheduleService
    ._delete(req.params.id)
    .then(() => res.json({ message: "Schedule deleted successfully" }))
    .catch(next);
}
