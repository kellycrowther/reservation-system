import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Typography } from "antd";
import { Checkbox } from "../../shared-components/formik-antd";
import { StyledField } from "../../shared-components/Field/StyledField";
import { FieldError } from "../../shared-components/Field/FieldError";
import { useFetchLocations } from "../../hooks/useLocation";
import {
  Schedule,
  ScheduleDetail,
  ScheduleHours,
  ScheduleWeekdays,
} from "../../interfaces/Schedule";
import { useCreateActivity } from "../../hooks/useFetchActivitiesList";
import { Redirect } from "react-router-dom";
import { ScheduleCreateUpdate } from "./ScheduleCreateUpdate";
import { Location } from "../../interfaces/Location";

const { Title } = Typography;

interface InitialValues {
  name: string;
  description: string;
  pictureUrl: string;
  capacity: number;
  locations: Location[];
  schedule: Schedule;
}

export const ActivityCreateUpdate = () => {
  const { data: locations } = useFetchLocations();
  const { mutate, data: newActivity } = useCreateActivity();

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
          weekdays: [] as Array<ScheduleWeekdays>,
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
          weekdays: [] as Array<ScheduleWeekdays>,
        },
      ] as Array<ScheduleDetail>,
    } as Schedule,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
    capacity: Yup.number().required("Capacity is required"),
  });

  if (newActivity) {
    return <Redirect to={`/activities/${newActivity.id}`} />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={(values, { setSubmitting }) => {
        console.info("VALUES: ", values);
        mutate({ data: values } as any);
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
                  <Row>
                    {locations?.map((fetchedLocation, locationIndex) => {
                      return (
                        <Col span={12} key={locationIndex}>
                          <Checkbox
                            name=""
                            value={fetchedLocation.id}
                            checked={
                              !!values.locations.find(
                                (location) => location.id === fetchedLocation.id
                              )
                            }
                            onChange={(event) => {
                              const { value } = event.target;
                              if (
                                values.locations.find(
                                  (location) => location.id === value
                                )
                              ) {
                                values.locations = values.locations.filter(
                                  (location) => location.id !== value
                                );
                              } else {
                                values.locations.push({
                                  id: value,
                                } as Location);
                              }
                            }}
                          >
                            {fetchedLocation.name}
                          </Checkbox>
                        </Col>
                      );
                    })}
                  </Row>
                </Col>
              </Row>

              <ScheduleCreateUpdate
                values={values}
                schedulePath="standard"
                scheduleName="Standard Schedule"
              />

              <ScheduleCreateUpdate
                values={values}
                schedulePath="exception"
                scheduleName="Exception Schedule"
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
