import React from "react";
import { useFormik } from "formik";
import { Input, Row, Col, Button, Space, Spin } from "antd";
import { useAuthenticate } from "../../services/user.service";
import { Redirect } from "react-router-dom";

interface LoginErrors {
  password: string;
}

interface InitialValues {
  username: string;
  password: string;
}

export const Login = () => {
  const { execute: authenticate, data, loading } = useAuthenticate();

  const validate = (values: InitialValues) => {
    let errors = {} as LoginErrors;
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      authenticate({ data: values });
    },
  });

  const { getFieldProps, handleSubmit } = formik;

  if (data) {
    return <Redirect to="/" />;
  }

  return (
    <Row>
      <Col offset={8} span={8}>
        <h1>Login</h1>
        {loading ? (
          <Spin />
        ) : (
          <form onSubmit={handleSubmit}>
            <Space size={12} direction="vertical" style={{ width: "85%" }}>
              <label htmlFor="email">Username</label>
              <Input
                {...getFieldProps("username")}
                type="username"
                id="username"
              />
              <label htmlFor="password">Password</label>
              <Input
                {...getFieldProps("password")}
                type="password"
                id="password"
              />
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Space>
          </form>
        )}
      </Col>
    </Row>
  );
};
