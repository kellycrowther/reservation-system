import * as React from "react";
import { DatePicker as AdDatePicker } from "antd";
import { FieldProps } from "formik";
import moment from "moment";
import { FormikFieldProps } from "../field-props";
import Field from "../formik-field";
import {
  DatePickerProps as $DatePickerProps,
  MonthPickerProps as $MonthPickerProps,
  RangePickerProps as $RangePickerProps,
  WeekPickerProps as $WeekPickerProps,
} from "antd/lib/date-picker";

const {
  MonthPicker: AdMonthPicker,
  RangePicker: AdRangePicker,
  WeekPicker: AdWeekPicker,
} = AdDatePicker;

export type DatePickerProps = $DatePickerProps & FormikFieldProps;

export const DatePicker = ({
  name,
  validate,
  onChange,
  fast,
  ...restProps
}: DatePickerProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdDatePicker
        value={value ? moment(value) : undefined}
        onChange={(date, dateString) => {
          setFieldValue(name, date ? date.toISOString() : null);
          setFieldTouched(name, true, false);
          onChange && onChange(date, dateString);
        }}
        {...restProps}
      />
    )}
  </Field>
);

export default DatePicker;

DatePicker.MonthPicker = ({
  name,
  validate,
  onChange,
  ...restProps
}: MonthPickerProps) => (
  <Field name={name} validate={validate}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdMonthPicker
        value={value ? moment(value) : undefined}
        onChange={(date, dateString) => {
          setFieldValue(name, date ? date.toISOString() : null);
          setFieldTouched(name, true, false);
          onChange && onChange(date, dateString);
        }}
        {...restProps}
      />
    )}
  </Field>
);

DatePicker.RangePicker = ({
  name,
  validate,
  onChange,
  ...restProps
}: RangePickerProps) => (
  <Field name={name} validate={validate}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdRangePicker
        name={name}
        value={value}
        onChange={(dates, dateStrings) => {
          setFieldValue(name, dates);
          setFieldTouched(name, true, false);
          onChange && onChange(dates, dateStrings);
        }}
        {...restProps}
      />
    )}
  </Field>
);

DatePicker.WeekPicker = ({
  name,
  validate,
  onChange,
  ...restProps
}: WeekPickerProps) => (
  <Field name={name} validate={validate}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdWeekPicker
        name={name}
        value={value}
        onChange={(date, dateString) => {
          setFieldValue(name, date);
          setFieldTouched(name, true, false);
          onChange && onChange(date, dateString);
        }}
        {...restProps}
      />
    )}
  </Field>
);

export type WeekPickerProps = FormikFieldProps & $WeekPickerProps;
export type RangePickerProps = FormikFieldProps & $RangePickerProps;
export type MonthPickerProps = FormikFieldProps & $MonthPickerProps;
