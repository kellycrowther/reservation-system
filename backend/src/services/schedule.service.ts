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

export async function update(id: string, params: { schedule: Schedule }) {
  const { schedule } = params;
  return await updateSchedule(id, schedule);
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

      const weekdays = sched.weekdays.map((scheduleWeekdays) => {
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

export async function updateSchedule(scheduleId: string, schedule: Schedule) {
  const scheduleInstance = await getSchedule(scheduleId);

  const standard = Promise.all(
    schedule.standard.map(async (sched) => {
      let standardSchedule = await db.ScheduleStandard.findByPk(sched.id);

      if (standardSchedule === null) {
        // create if not found
        standardSchedule = await db.ScheduleStandard.create(sched);
      } else if (sched._destroy === true) {
        // if _destroy is true, remove the schedule and exit
        // TODO: bug when sending destroy multiple times via postman
        return await standardSchedule.destroy();
      } else {
        // if standardSchedule found, update it
        standardSchedule = await standardSchedule.update(sched);
      }

      const hoursPromise = Promise.all(
        sched.hours.map(async (scheduleHours) => {
          let hours = await db.ScheduleHours.findByPk(scheduleHours.id);

          if (hours === null) {
            // create if not found
            hours = await db.ScheduleHours.create(scheduleHours);
          } else if (scheduleHours._destroy === true) {
            // if _destroy is true, remove the hours and exit
            // TODO: bug when sending destroy multiple times via postman
            return await hours.destroy();
          } else {
            // if found, update it
            hours = await hours.update(scheduleHours);
          }

          return hours;
        })
      );

      const weekdaysPromise = Promise.all(
        sched.weekdays.map(async (scheduleWeekdays) => {
          let weekdays = await db.ScheduleWeekdays.findByPk(
            scheduleWeekdays.id
          );

          if (weekdays === null) {
            // create if not found
            weekdays = await db.ScheduleWeekdays.create(scheduleWeekdays);
          } else if (scheduleWeekdays._destroy === true) {
            // if _destroy is true, remove the weekday and exit
            // TODO: bug when sending destroy multiple times via postman
            return await weekdays.destroy();
          } else {
            // if found, update it
            weekdays = await weekdays.update(scheduleWeekdays);
          }
        })
      );

      const hours = await hoursPromise;
      const weekdays = await weekdaysPromise;

      return [standardSchedule, hours, weekdays];
    })
  );

  const exception = Promise.all(
    schedule.exception.map(async (sched) => {
      let exceptionSchedule = await db.ScheduleException.findByPk(sched.id);

      if (exceptionSchedule === null) {
        // create if not found
        exceptionSchedule = await db.ScheduleException.create(sched);
      } else if (sched._destroy === true) {
        // if _destroy is true, remove the schedule and exit
        // TODO: bug when sending destroy multiple times via postman
        return await exceptionSchedule.destroy();
      } else {
        // if standardSchedule found, update it
        exceptionSchedule = await exceptionSchedule.update(sched);
      }

      const hoursPromise = Promise.all(
        sched.hours.map(async (scheduleHours) => {
          let hours = await db.ScheduleHours.findByPk(scheduleHours.id);

          if (hours === null) {
            // create if not found
            hours = await db.ScheduleHours.create(scheduleHours);
          } else if (scheduleHours._destroy === true) {
            // if _destroy is true, remove the hours and exit
            // TODO: bug when sending destroy multiple times via postman
            return await hours.destroy();
          } else {
            // if found, update it
            hours = await hours.update(scheduleHours);
          }

          return hours;
        })
      );

      const weekdaysPromise = Promise.all(
        sched.weekdays.map(async (scheduleWeekdays) => {
          let weekdays = await db.ScheduleWeekdays.findByPk(
            scheduleWeekdays.id
          );

          if (weekdays === null) {
            // create if not found
            weekdays = await db.ScheduleWeekdays.create(scheduleWeekdays);
          } else if (scheduleWeekdays._destroy === true) {
            // if _destroy is true, remove the weekday and exit
            // TODO: bug when sending destroy multiple times via postman
            return await weekdays.destroy();
          } else {
            // if found, update it
            weekdays = await weekdays.update(scheduleWeekdays);
          }
        })
      );

      await hoursPromise;
      await weekdaysPromise;

      return [
        await exceptionSchedule,
        await hoursPromise,
        await weekdaysPromise,
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
