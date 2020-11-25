import { TimePicker as AdTimePicker } from "antd";
import { FieldProps } from "formik";
import * as React from "react";
import moment from "moment";
import { FormikFieldProps } from "../field-props";
import Field from "../formik-field";
import { TimePickerProps as AdTimePickerProps } from "antd/lib/time-picker";

export type TimePickerProps = FormikFieldProps & AdTimePickerProps;

export const TimePicker = ({
  name,
  validate,
  fast,
  onChange,
  ...restProps
}: TimePickerProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdTimePicker
        value={value ? moment(value) : undefined}
        onChange={(time, timeString) => {
          setFieldValue(name, time ? time.toISOString() : null);
          setFieldTouched(name, true, false);
          onChange && onChange(time, timeString);
        }}
        {...restProps}
      />
    )}
  </Field>
);

export default TimePicker;
