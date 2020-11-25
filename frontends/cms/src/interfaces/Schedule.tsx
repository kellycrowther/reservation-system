export interface Schedule {
  id: string;
  createdAt: string;
  updatedAt: string;
  activityId: string;
  standard: ScheduleDetail[];
  exception: ScheduleDetail[];
}

export interface ScheduleDetail {
  id: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  weekdays: Array<ScheduleWeekdays>;
  hours: Array<ScheduleHours>;
  _destroy: boolean;
}

export interface ScheduleWeekdays {
  id: string;
  day: number;
  scheduleStandardId: string;
  updatedAt: string;
  createdAt: string;
  _destroy: boolean;
}

export interface ScheduleHours {
  id?: string;
  hour: number;
  minutes: number;
  scheduleStandardId?: string;
  updatedAt?: string;
  createdAt?: string;
  _destroy?: boolean;
}
