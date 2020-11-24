import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Typography, Select } from "antd";
import { StyledField } from "../../shared-components/Field/StyledField";
import { FieldError } from "../../shared-components/Field/FieldError";

const { Title } = Typography;
const { Option } = Select;

export const ActivityCreateUpdate = () => {
  const initialValues = {
    name: "",
    description: "",
    pictureUrl: "",
    capacity: 0,
    locations: [],
    schedule: {},
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    capacity: Yup.number().required("Capacity is required"),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={(values, { setSubmitting }) => {
        // createUser(values);
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        setFieldValue,
        errors,
        touched,
        isValid,
        dirty,
        /* and other goodies like error */
      }) => (
        <Row align="middle" justify="start">
          <Col xs={24} md={{ offset: 8, span: 8 }}>
            <Title level={3} style={{ textAlign: "center" }}>
              Create Activity
            </Title>
            <form name="register" onSubmit={handleSubmit}>
              <StyledField
                name="name"
                label="Name"
                placeholder="Enter acitivity name"
              />

              {errors.name && touched.name && (
                <FieldError>{errors.name}</FieldError>
              )}

              <StyledField
                name="description"
                label="Description"
                placeholder="Enter description"
              />

              <StyledField
                name="capacity"
                label="Capacity"
                type="number"
                placeholder="Enter capacity"
              />

              {errors.capacity && touched.capacity && (
                <FieldError>{errors.capacity}</FieldError>
              )}

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!(isValid && dirty)}
                >
                  Create Activity
                </Button>
              </Form.Item>
            </form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};
