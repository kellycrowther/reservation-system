import { Model, BuildOptions } from "sequelize";

export interface Schedule {
  id: string;
  standard: Array<ScheduleDetails>;
  exception: Array<ScheduleDetails>;
}

export interface ScheduleDetails {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  weekdays: Array<ScheduleWeekdays>;
  hours: Array<ScheduleHours>;
  _destroy: boolean;
}

export interface ScheduleAttributes extends Model {
  id: string;
  standardScheduleId: string;
  exceptionScheduleId: string;
  standard: ScheduleDetails[];
  exception: ScheduleDetails[];
}

export type ScheduleModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScheduleAttributes;
};

export interface ScheduleWeekdays {
  id: string;
  day: number;
  scheduleStandardId: string;
  updatedAt: string;
  createdAt: string;
  _destroy: boolean;
}

export interface ScheduleHours {
  id: string;
  hour: number;
  minutes: number;
  scheduleStandardId: string;
  updatedAt: string;
  createdAt: string;
  _destroy: boolean;
}

export interface ScheduleStandardAttributes extends Model {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  weekdays: Array<string>;
  hours: Array<ScheduleHours>;
}

export type ScheduleStandardModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScheduleStandardAttributes;
};

export interface ScheduleHourAttributes extends Model {
  id: string;
  hour: number;
  minutes: number;
}

export type ScheduleHourModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScheduleHourAttributes;
};

export interface ScheduleWeekdayAttributes extends Model {
  id: string;
  day: number;
}

export type ScheduleWeekdayModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScheduleWeekdayAttributes;
};

export interface ScheduleExceptionAttributes extends Model {
  id: string;
  type: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  weekdays: Array<string>;
  hours: Array<ScheduleHours>;
}

export type ScheduleExceptionModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScheduleExceptionAttributes;
};

export interface GeneratedSchedule {
  date: string;
}
