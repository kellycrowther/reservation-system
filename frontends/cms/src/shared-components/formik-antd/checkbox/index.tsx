import * as React from "react";
import { Checkbox as AdCheckbox } from "antd";
import { FieldProps } from "formik";
import Field from "../formik-field";
import { CheckboxProps as AdCheckboxProps } from "antd/lib/checkbox/Checkbox";
import { FormikFieldProps } from "../field-props";
import { CheckboxGroupProps as AdCheckboxGroupProps } from "antd/lib/checkbox/Group";

export type CheckboxProps = FormikFieldProps & AdCheckboxProps;

export const Checkbox = ({
  name,
  validate,
  fast,
  onChange,
  ...restProps
}: CheckboxProps) => (
  <Field name={name} validate={validate} fast={fast}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdCheckbox
        name={name}
        checked={value}
        onChange={(event) => {
          setFieldValue(name, event.target.checked);
          setFieldTouched(name, true, false);
          onChange && onChange(event);
        }}
        {...restProps}
      />
    )}
  </Field>
);

export default Checkbox;

export type CheckboxGroupProps = FormikFieldProps & AdCheckboxGroupProps;

Checkbox.Group = ({
  name,
  validate,
  onChange,
  ...restProps
}: CheckboxGroupProps) => (
  <Field name={name} validate={validate}>
    {({
      field: { value },
      form: { setFieldValue, setFieldTouched },
    }: FieldProps) => (
      <AdCheckbox.Group
        value={value}
        onChange={(value) => {
          setFieldValue(name, value);
          setFieldTouched(name, true, false);
          onChange && onChange(value);
        }}
        {...restProps}
      />
    )}
  </Field>
);
