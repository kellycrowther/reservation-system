import React from "react";
import { FastField } from "formik";

export const StyledField = (props) => {
  return (
    <div style={{ margin: "1em 0" }}>
      <span style={{ fontWeight: "bold" }}>{props.label}</span>
      <FastField className="ant-input" {...props} />
    </div>
  );
};
