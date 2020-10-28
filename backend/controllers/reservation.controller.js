const { reservationService } = require("../services");

module.exports = {
  getAll,
  getAllByUser,
  getById,
  update,
  create,
  _delete,
};

function create(req, res, next) {
  reservationService
    .create(req.body)
    .then((reservation) => res.json(reservation))
    .catch(next);
}

function getAll(req, res, next) {
  reservationService
    .getAll()
    .then((reservations) => res.json(reservations))
    .catch(next);
}

function getAllByUser(req, res, next) {
  reservationService
    .getAllByUser(req.user)
    .then((reservations) => res.json(reservations))
    .catch(next);
}

function getById(req, res, next) {
  reservationService
    .getById(req.params.id)
    .then((reservation) => res.json(reservation))
    .catch(next);
}

function update(req, res, next) {
  reservationService
    .update(req.params.id, req.body)
    .then((reservation) => res.json(reservation))
    .catch(next);
}

function _delete(req, res, next) {
  reservationService
    .delete(req.params.id)
    .then((reservation) =>
      res.json({ message: "Reservation deleted successfully" })
    )
    .catch(next);
}
