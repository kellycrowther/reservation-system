import { db } from "../db/index";

export async function getAll() {
  return await db.Reservation.findAll({
    include: [
      { model: db.Location, as: "location" },
      { model: db.Activity, as: "activity" },
    ],
    // @ts-ignore - bad typings
    exclude: ["activityId"],
  });
}

export async function getAllByUser(user) {
  const { id } = user;
  return await db.Reservation.findAll({
    where: { userId: id },
    include: [
      { model: db.Location, as: "location" },
      { model: db.Activity, as: "activity" },
    ],
  });
}

export async function getById(id) {
  return await getReservation(id);
}

export async function create(params) {
  return await db.Reservation.create(params);
}

export async function update(id, params) {
  const reservation = await getReservation(id);

  Object.assign(reservation, params);
  await reservation.save();

  return reservation.get();
}

export async function _delete(id: string) {
  const reservation = await getReservation(id);
  await reservation.destroy();
}

// helpers
async function getReservation(id: string) {
  const reservation = await db.Reservation.findByPk(id, {
    include: [
      { model: db.Location, as: "location" },
      { model: db.Activity, as: "activity" },
    ],
  });
  if (!reservation) {
    throw "Reservation not found";
  }
  return reservation;
}

export async function getReservationsByActivity(activityId: string) {
  const reservations = await db.Reservation.findAll({
    where: {
      activityId,
    },
  });
  return reservations;
}
