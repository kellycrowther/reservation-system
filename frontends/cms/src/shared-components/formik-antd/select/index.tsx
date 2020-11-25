import { Select as AdSelect } from "antd";
import { FieldProps } from "formik";
import * as React from "react";
import { SelectProps as AdSelectProps } from "antd/lib/select";
import { FormikFieldProps } from "../field-props";
import Field from "../formik-field";

export type SelectProps<T = any> = FormikFieldProps &
  AdSelectProps<T> & { children?: React.ReactNode };
// declare class Select<ValueType extends SelectValue = SelectValue> extends React.Component<SelectProps<ValueType>> {
export const Select = ({
  name,
  validate,
  fast,
  children,
  onChange,
  onBlur,
  ...restProps
}: SelectProps) => {
  return (
    <Field name={name} validate={validate} fast={fast}>
      {({
        field: { value },
        form: { setFieldValue, setFieldTouched },
      }: FieldProps) => (
        <AdSelect<any>
          onChange={(value, option) => {
            setFieldValue(name, value);
            onChange && onChange(value, option);
          }}
          onBlur={(value) => {
            setFieldTouched(name);
            onBlur && onBlur(value);
          }}
          // setting undefined will show the placeholder
          value={value === "" || value === null ? undefined : value}
          {...restProps}
        >
          {children}
        </AdSelect>
      )}
    </Field>
  );
};

export default Select;

Select.Option = AdSelect.Option;
Select.OptGroup = AdSelect.OptGroup;
