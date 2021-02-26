import { Radio as AdRadio } from "antd";
import * as React from "react";
import { RadioGroupProps as AdRadioGroupProps } from "antd/lib/radio/interface";
import { FieldProps } from "formik";
import { FormikFieldProps } from "../field-props";
import Field from "../formik-field";

export type RadioGroupProps = FormikFieldProps & AdRadioGroupProps;

export const Radio = ({
  name,
  validate,
  fast,
  onChange,
  ...restProps
}: RadioGroupProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdRadio
        value={value}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
          setFieldTouched(name, true, false);
          onChange && onChange(event);
        }}
        {...restProps}
      />
    )}
  </Field>
);

export default Radio;

Radio.Group = ({
  name,
  validate,
  fast,
  onChange,
  ...restProps
}: RadioGroupProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdRadio.Group
        value={value}
        onChange={(event) => {
          setFieldValue(name, event.target.value);
          setFieldTouched(name, true, false);
          onChange && onChange(event);
        }}
        {...restProps}
      />
    )}
  </Field>
);

Radio.Button = AdRadio.Button;
