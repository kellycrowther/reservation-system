const db = require("../db/index");

module.exports = {
  getAll,
  getAllByUser,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.Reservation.findAll();
}

async function getAllByUser(user) {
  const { id } = user;
  return await db.Reservation.findAll({ where: { userId: id } });
}

async function getById(id) {
  return await getReservation(id);
}

async function create(params) {
  return await db.Reservation.create(params);
}

async function update(id, params) {
  const reservation = await getReservation(id);

  Object.assign(reservation, params);
  await reservation.save();

  return reservation.get();
}

async function _delete(id) {
  const reservation = await getReservation(id);
  await reservation.destroy();
}

// helpers
async function getReservation(id) {
  const reservation = await db.Reservation.findByPk(id);
  if (!reservation) {
    throw "Reservation not found";
  }
  return reservation;
}
