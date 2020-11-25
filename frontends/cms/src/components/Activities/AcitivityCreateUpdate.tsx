import React from "react";
import { FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Typography, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Checkbox } from "formik-antd";
import { DatePicker, Select } from "../../shared-components/formik-antd";
import { StyledField } from "../../shared-components/Field/StyledField";
import { FieldError } from "../../shared-components/Field/FieldError";
import { useFetchLocations } from "../../hooks/useLocation";
import {
  Schedule,
  ScheduleDetail,
  ScheduleHours,
} from "../../interfaces/Schedule";

const { Title } = Typography;
const { Option } = Select;

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
    schedule: {
      standard: [
        {
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          hours: [
            {
              hour: 0,
              minutes: 0,
            },
          ] as Array<ScheduleHours>,
        },
      ] as Array<ScheduleDetail>,
      exception: [
        {
          name: "",
          description: "",
          startTime: "",
          endTime: "",
          hours: [
            {
              hour: 0,
              minutes: 0,
            },
          ] as Array<ScheduleHours>,
        },
      ] as Array<ScheduleDetail>,
    } as Schedule,
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
              <FieldArray
                name="schedule.standard"
                render={({ push, remove }) =>
                  values.schedule.standard.map((standardSchedule, index) => {
                    return (
                      <Row key={index} gutter={3}>
                        <Col span={6}>
                          <StyledField
                            name={`schedule.standard[${index}].name`}
                            label="Schedule Name"
                            placeholder="Enter schedule name"
                          />
                        </Col>
                        <Col span={6}>
                          <StyledField
                            name={`schedule.standard[${index}].description`}
                            label="Schedule Description"
                            placeholder="Enter schedule name"
                          />
                        </Col>
                        <Col>
                          <div style={{ margin: "1em 0" }}>
                            <div style={{ fontWeight: "bold" }}>Start Date</div>
                            <DatePicker
                              name={`schedule.standard[${index}].startTime`}
                            />
                          </div>
                        </Col>
                        <Col>
                          <div style={{ margin: "1em 0" }}>
                            <div style={{ fontWeight: "bold" }}>End Date</div>
                            <DatePicker
                              name={`schedule.standard[${index}].endTime`}
                            />
                          </div>
                        </Col>
                        <Col span={24}>
                          <div style={{ margin: "1em 0" }}>
                            <div style={{ fontWeight: "bold" }}>
                              Start Times
                            </div>
                            <FieldArray
                              name={`schedule.standard[${index}].hours`}
                              render={({ push, remove }) => {
                                return (
                                  <Row>
                                    {values.schedule.standard[index].hours.map(
                                      (hour, hourIndex) => (
                                        <Col span={4} key={hourIndex}>
                                          <Row
                                            style={{
                                              justifyContent: "space-evenly",
                                            }}
                                          >
                                            <Col>
                                              <FormLabel label="Hour" />
                                              <Select
                                                placeholder="Hour"
                                                name={`schedule.standard[${index}].hours[${hourIndex}].hour`}
                                              >
                                                {[...Array(24)].map(
                                                  (value, clockIndex) => (
                                                    <Option
                                                      key={clockIndex}
                                                      value={clockIndex}
                                                    >
                                                      {clockIndex}
                                                    </Option>
                                                  )
                                                )}
                                              </Select>
                                            </Col>

                                            <Col>
                                              <FormLabel label="Minute" />
                                              <Select
                                                placeholder="Minute"
                                                name={`schedule.standard[${index}].hours[${hourIndex}].minutes`}
                                              >
                                                {[...Array(60)].map(
                                                  (value, clockIndex) => (
                                                    <Option
                                                      key={clockIndex}
                                                      value={clockIndex}
                                                    >
                                                      {clockIndex}
                                                    </Option>
                                                  )
                                                )}
                                              </Select>
                                            </Col>
                                            <Row>
                                              <Col>
                                                <Space size={12}>
                                                  <Button
                                                    onClick={() =>
                                                      remove(hourIndex)
                                                    }
                                                    type="ghost"
                                                    danger
                                                    icon={<MinusOutlined />}
                                                  />
                                                  <Button
                                                    onClick={() =>
                                                      push({
                                                        hour: 0,
                                                        minute: 0,
                                                      })
                                                    }
                                                    type="primary"
                                                    ghost
                                                    icon={<PlusOutlined />}
                                                  />
                                                </Space>
                                              </Col>
                                            </Row>
                                          </Row>
                                        </Col>
                                      )
                                    )}
                                  </Row>
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col span={24}>
                          <Space size={12}>
                            <Button
                              onClick={() => remove(index)}
                              type="ghost"
                              danger
                              icon={<MinusOutlined />}
                            >
                              Remove Schedule
                            </Button>
                            <Button
                              onClick={() =>
                                push({
                                  name: "",
                                  description: "",
                                  startTime: "",
                                  endTime: "",
                                })
                              }
                              type="primary"
                              ghost
                              icon={<PlusOutlined />}
                            >
                              Add Schedule
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    );
                  })
                }
              />

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

const FormLabel = ({ label }: { label: string }) => (
  <div style={{ fontWeight: "bold" }}>{label}</div>
);
