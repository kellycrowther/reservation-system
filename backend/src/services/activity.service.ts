import { db } from "../db/index";
import {
  ActivityCalendar,
  CreateActivityParams,
} from "../interfaces/activity.interface";
import { getReservationsByActivity } from "./reservation.service";
import { createSchedule, updateSchedule } from "./schedule.service";
import * as moment from "moment";
import {
  GeneratedSchedule,
  ScheduleDetails,
} from "../interfaces/schedule.interface";

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

  await createSchedule(schedule, activity.id);

  return activity.get();
}

export async function update(id: string, params: CreateActivityParams) {
  const activity = await getActivity(id);

  Object.assign(activity, params);
  await activity.save();

  if (params.schedule) {
    await updateSchedule(params.schedule.id, params.schedule);
  }

  return activity.reload();
}

export async function _delete(id: string) {
  const activity = await getActivity(id);
  await activity.destroy();
}

export async function getCalendar(id) {
  const activity = await getActivity(id);
  const reservations = await getReservationsByActivity(id);
  const startDate = moment().startOf("month");
  const endDate = moment().endOf("month");

  // create month calendar
  const calendarDays = createCalendar(startDate, endDate);

  // create schedules
  const standardSchedule = generateSchedules(activity.schedule.standard);
  const exceptionSchedule = generateSchedules(activity.schedule.exception);

  // search calendar for standard schedule, exception schedule, and reservation capacity then set dayIsActive
  for (const day of calendarDays) {
    const standardDayIsActive = standardSchedule.find((standardDay) =>
      moment(standardDay.date).isSame(moment(day.date), "day")
    );

    const exceptionDayIsActive = exceptionSchedule.find((exceptionDay) =>
      moment(exceptionDay.date).isSame(moment(day.date), "day")
    );
    const reservationsQuantity = reservations.reduce(
      (accumulator, reservation) => {
        if (moment(day.date).isSame(reservation.startTime)) {
          return accumulator + reservation.quantity;
        }
        return 0;
      },
      0
    );
    // TODO: cannot be active if date is in the past
    const dayIsActive = !!(
      reservationsQuantity < activity.capacity &&
      standardDayIsActive &&
      !exceptionDayIsActive
    );

    day.isActive = dayIsActive;
  }
  return calendarDays;
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

function createCalendar(startDate: moment.Moment, endDate: moment.Moment) {
  const calendarDays: ActivityCalendar[] = [];

  while (startDate.isSameOrBefore(endDate)) {
    const day = <ActivityCalendar>{
      date: startDate.toISOString(),
    };
    calendarDays.push(day);
    startDate.add(1, "day");
  }
  return calendarDays;
}

function generateSchedules(schedules: ScheduleDetails[]): GeneratedSchedule[] {
  const calendar = [];
  schedules.forEach((schedule) => {
    const startTime = moment(schedule.startTime).clone();
    const endTime = moment(schedule.endTime).clone();
    // while start time is before the end time
    while (startTime.isSameOrBefore(endTime)) {
      // create the day
      for (const weekday of schedule.weekdays) {
        // create the hour
        for (const hour of schedule.hours) {
          if (startTime.day() === weekday.day) {
            calendar.push({
              date: startTime
                .set("day", weekday.day)
                .set("hour", hour.hour)
                .set("minute", hour.minutes)
                .set("second", 0)
                .set("millisecond", 0)
                .toISOString(),
            });
          }
        }
      }
      startTime.add(1, "day");
    }
  });
  return calendar;
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
