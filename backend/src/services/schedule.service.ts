import { db } from "../db/index";
import { Schedule } from "../interfaces/schedule.interface";

export async function getAll() {
  const include = await createInclude();
  return await db.Schedule.findAll({
    include,
  });
}

export async function getAllByUser(user) {
  const { id } = user;
  const include = await createInclude();
  return await db.Schedule.findAll({
    where: { userId: id },
    include,
  });
}

export async function getById(id: string) {
  return await getSchedule(id);
}

export async function create(params: { schedule: Schedule }) {
  const { schedule } = params;
  return await createSchedule(schedule);
}

export async function update(id: string, params) {
  const schedule = await getSchedule(id);

  Object.assign(schedule, params);
  await schedule.save();

  return schedule.get();
}

export async function _delete(id: string) {
  const schedule = await getSchedule(id);
  await schedule.destroy();
}

// helpers
export async function createSchedule(schedule: Schedule, activityId?: string) {
  const include = await createInclude();
  const scheduleParams = {
    ...schedule,
    activityId,
  };
  const params = activityId ? scheduleParams : null;
  const scheduleInstance = await db.Schedule.create(params, { include });

  const standard = Promise.all(
    schedule.standard.map(async (sched) => {
      const standardScheduleParams = {
        ...sched,
        scheduleId: scheduleInstance.id,
      };

      const scheduleStandardId = await db.ScheduleStandard.create(
        standardScheduleParams
      );

      const hours = sched.hours.map((scheduleHours) => {
        return {
          ...scheduleHours,
          scheduleStandardId: scheduleStandardId.id,
        };
      });

      const weekdays = sched.hours.map((scheduleWeekdays) => {
        return {
          ...scheduleWeekdays,
          scheduleStandardId: scheduleStandardId.id,
        };
      });

      return [
        await db.ScheduleHours.bulkCreate(hours),
        await db.ScheduleWeekdays.bulkCreate(weekdays),
      ];
    })
  );

  const exception = Promise.all(
    schedule.exception.map(async (sched) => {
      const exceptionScheduleParams = {
        ...sched,
        scheduleId: scheduleInstance.id,
      };

      const exceptionStandardId = await db.ScheduleException.create(
        exceptionScheduleParams
      );

      const hours = sched.hours.map((scheduleHours) => {
        return {
          ...scheduleHours,
          scheduleExceptionId: exceptionStandardId.id,
        };
      });

      const weekdays = sched.hours.map((scheduleWeekdays) => {
        return {
          ...scheduleWeekdays,
          scheduleExceptionId: exceptionStandardId.id,
        };
      });

      return [
        await db.ScheduleHours.bulkCreate(hours),
        await db.ScheduleWeekdays.bulkCreate(weekdays),
      ];
    })
  );

  await standard;
  await exception;

  return await getSchedule(scheduleInstance.id);
}

async function getSchedule(id: string) {
  const include = await createInclude();
  const schedule = await db.Schedule.findByPk(id, {
    include,
  });
  if (!schedule) {
    throw "Schedule not found";
  }
  return schedule;
}

async function createInclude() {
  return await [
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
  ];
}
