import { db } from "../db/index";
import { CreateActivityParams } from "../interfaces/activity.interface";
import { createSchedule } from "./schedule.service";

export async function getAll() {
  const include = await createInclude();
  return await db.Activity.findAll({
    include,
  });
}

export async function getAllByUser(user) {
  const { id } = user;
  const include = await createInclude();
  return await db.Activity.findAll({
    where: { userId: id },
    include,
  });
}

export async function getById(id: string) {
  return await getActivity(id);
}

export async function create(params: CreateActivityParams) {
  const { schedule } = params;
  const include = await createInclude();

  const activity = await db.Activity.create(params, {
    include,
  });

  createSchedule(schedule, activity.id);

  return activity.get();
}

export async function update(id: string, params: CreateActivityParams) {
  const activity = await getActivity(id);

  Object.assign(activity, params);
  await activity.save();

  return activity.get();
}

export async function _delete(id: string) {
  const activity = await getActivity(id);
  await activity.destroy();
}

// helpers
async function getActivity(id: string) {
  const include = await createInclude();
  const activity = await db.Activity.findByPk(id, {
    include,
  });
  if (!activity) {
    throw "Activity not found";
  }
  return activity;
}

async function createInclude() {
  return await [
    { model: db.Location, as: "locations" },
    {
      model: db.Schedule,
      as: "schedule",
      include: [
        {
          model: db.ScheduleStandard,
          as: "standard",
          include: [
            {
              model: db.ScheduleWeekdays,
              as: "weekdays",
            },
            {
              model: db.ScheduleHours,
              as: "hours",
            },
          ],
        },
        {
          model: db.ScheduleException,
          as: "exception",
          include: [
            {
              model: db.ScheduleWeekdays,
              as: "weekdays",
            },
            {
              model: db.ScheduleHours,
              as: "hours",
            },
          ],
        },
      ],
    },
  ];
}
