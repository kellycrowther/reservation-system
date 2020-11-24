import React from "react";
import { Field } from "formik";

export const StyledField = (props) => {
  return (
    <div style={{ margin: "1em 0" }}>
      <span style={{ fontWeight: "bold" }}>{props.label}</span>
      <Field className="ant-input" {...props} />
    </div>
  );
};
