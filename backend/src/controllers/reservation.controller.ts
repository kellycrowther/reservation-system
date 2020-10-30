import * as reservationService from "../services/reservation.service";

export function create(req, res, next) {
  reservationService
    .create(req.body)
    .then((reservation) => res.json(reservation))
    .catch(next);
}

export function getAll(req, res, next) {
  reservationService
    .getAll()
    .then((reservations) => res.json(reservations))
    .catch(next);
}

export function getAllByUser(req, res, next) {
  reservationService
    .getAllByUser(req.user)
    .then((reservations) => res.json(reservations))
    .catch(next);
}

export function getById(req, res, next) {
  reservationService
    .getById(req.params.id)
    .then((reservation) => res.json(reservation))
    .catch(next);
}

export function update(req, res, next) {
  reservationService
    .update(req.params.id, req.body)
    .then((reservation) => res.json(reservation))
    .catch(next);
}

export function _delete(req, res, next) {
  reservationService
    ._delete(req.params.id)
    .then((reservation) =>
      res.json({ message: "Reservation deleted successfully" })
    )
    .catch(next);
}
