import { Model, BuildOptions } from "sequelize";

export interface ScheduleAttributes extends Model {
  id: string;
  standardScheduleId: string;
  exceptionScheduleId: string;
}

export type ScheduleModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ScheduleAttributes;
};

export interface ScheduleHours {
  hours: string;
  minutes: string;
}

export interface ScheduleStandardAttributes extends Model {
  id: string;
  type: string;
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
  day: string;
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
