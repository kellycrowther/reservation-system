import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Typography } from "antd";
import { Checkbox } from "formik-antd";
import { StyledField } from "../../shared-components/Field/StyledField";
import { FieldError } from "../../shared-components/Field/FieldError";
import { useFetchLocations } from "../../hooks/useLocation";
import { Schedule } from "../../interfaces/Schedule";

const { Title } = Typography;

interface InitialValues {
  name: string;
  description: string;
  pictureUrl: string;
  capacity: number;
  locations: number[];
  schedule: Schedule;
}

export const ActivityCreateUpdate = () => {
  const { data: locations } = useFetchLocations();

  const initialValues: InitialValues = {
    name: "",
    description: "",
    pictureUrl: "",
    capacity: 0,
    locations: [],
    schedule: {} as Schedule,
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
        console.info("VALUES: ", values);
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
          <Col xs={24} md={{ offset: 4, span: 18 }}>
            <Title level={3} style={{ textAlign: "center" }}>
              Create Activity
            </Title>
            <form name="register" onSubmit={handleSubmit}>
              <Row gutter={3}>
                <Col span={6}>
                  <StyledField
                    name="name"
                    label="Name"
                    placeholder="Enter acitivity name"
                  />

                  {errors.name && touched.name && (
                    <FieldError>{errors.name}</FieldError>
                  )}
                </Col>
                <Col span={8}>
                  <StyledField
                    name="description"
                    label="Description"
                    placeholder="Enter description"
                  />
                </Col>
                <Col span={2}>
                  <StyledField
                    name="capacity"
                    label="Capacity"
                    type="number"
                    placeholder="Enter capacity"
                  />

                  {errors.capacity && touched.capacity && (
                    <FieldError>{errors.capacity}</FieldError>
                  )}
                </Col>
                <Col span={6}>
                  <div style={{ fontWeight: "bold", margin: "1em 0 .25em 0" }}>
                    Locations
                  </div>
                  <Checkbox.Group
                    name="locations"
                    options={locations?.map((location) => {
                      return {
                        label: location.name,
                        value: location.id,
                      };
                    })}
                  />
                </Col>
              </Row>

              <div style={{ fontWeight: "bold" }}>Standard Schedule</div>

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
