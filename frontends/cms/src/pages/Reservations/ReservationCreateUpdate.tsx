import React from "react";
import "./ReservationCreateUpdate.css";
import { Redirect, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Row, Col, Typography, Radio } from "antd";
import { StyledField } from "../../components/Field/StyledField";
import { FieldError } from "../../components/Field/FieldError";
import { DatePicker, Select } from "../../components/formik-antd";
import { useFetchLocations } from "../../services/location.service";
import { ReservationInput } from "../../interfaces/Reservation";
import {
  useCreateReservation,
  useFetchReservationDetail,
  useUpdateReservation,
} from "../../services/reservation.service";
import { useFetchActivitiesList } from "../../services/activity.service";
import { useFetchUsersList } from "../../services/user.service";

const { Title } = Typography;
const { Option } = Select;

export const ReservationCreateUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const { mutate, data: newReservation } = useCreateReservation();
  const {
    data: updatedReservation,
    execute: updateReservation,
  } = useUpdateReservation(id);
  const { data: reservation } = useFetchReservationDetail(id);
  const { data: locations } = useFetchLocations();
  const { data: activities } = useFetchActivitiesList();
  const { data: users } = useFetchUsersList();

  console.info("DATA detail: ", reservation);

  const initialValues: ReservationInput = {
    name: updatedReservation?.name || reservation?.name || "",
    userId: updatedReservation?.userId || reservation?.userId || "",
    activityId:
      updatedReservation?.activityId || reservation?.activity.id || "",
    locationId: updatedReservation?.locationId || reservation?.locationId || 0,
    startTime: updatedReservation?.startTime || reservation?.startTime || "",
    quantity: updatedReservation?.quantity || reservation?.quantity || 0,
  };

  const validationSchema = Yup.object({
    userId: Yup.string().required("User is required"),
    name: Yup.string().required("Name is required"),
    quantity: Yup.number().required("Quantity is required"),
  });

  if (newReservation) {
    return <Redirect to={`/reservations/${newReservation.id}`} />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={(values, { setSubmitting }) => {
        id ? updateReservation({ data: values }) : mutate({ data: values });
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
        setFieldTouched,
        setFieldValue,
        errors,
        touched,
        isValid,
        dirty,
        /* and other goodies like error */
      }) => (
        <Row align="middle" justify="start">
          <Col xs={24} md={{ offset: 2, span: 22 }}>
            <Title level={3} style={{ textAlign: "center" }}>
              {id ? "Update" : "Create"} Reservation
            </Title>
            <form name="register" onSubmit={handleSubmit}>
              <Row gutter={3}>
                <Col span={4}>
                  <div style={{ fontWeight: "bold", margin: "1em 0 0 0" }}>
                    User
                  </div>
                  <Select
                    placeholder="User"
                    name="userId"
                    value={values.userId}
                    className="activity-select"
                    disabled={!!id}
                  >
                    {users?.map((value, activityIndex) => (
                      <Option key={activityIndex} value={value.id || ""}>
                        {value.username} - {value.firstName} {value.lastName}
                      </Option>
                    ))}
                  </Select>

                  {errors.userId && touched.userId && (
                    <FieldError>{errors.userId}</FieldError>
                  )}
                </Col>
                <Col span={6}>
                  <StyledField
                    name="name"
                    label="Name"
                    placeholder="Enter reservation name"
                  />

                  {errors.name && touched.name && (
                    <FieldError>{errors.name}</FieldError>
                  )}
                </Col>

                {/* TODO: Quantity shouldn't be able to exceed activity capacity */}
                <Col span={2}>
                  <StyledField
                    name="quantity"
                    label="Quantity"
                    type="number"
                    placeholder="Enter quantity"
                  />

                  {errors.quantity && touched.quantity && (
                    <FieldError>{errors.quantity}</FieldError>
                  )}
                </Col>
                <Col span={3}>
                  <div style={{ fontWeight: "bold", margin: "1em 0 .25em 0" }}>
                    Location
                  </div>
                  <Row justify="center">
                    <Radio.Group
                      value={values.locationId}
                      onChange={(event) => {
                        setFieldValue("locationId", event.target.value);
                        setFieldTouched("locationId", true, false);
                      }}
                    >
                      {locations?.map((fetchedLocation, locationIndex) => {
                        return (
                          <Radio key={locationIndex} value={fetchedLocation.id}>
                            {fetchedLocation.name}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </Row>
                </Col>

                <Col span={3}>
                  <div style={{ fontWeight: "bold", margin: "1em 0 0 0" }}>
                    Activity
                  </div>
                  <Select
                    placeholder="Activity"
                    name="activityId"
                    value={values.activityId}
                    className="activity-select"
                  >
                    {activities?.map((value, activityIndex) => (
                      <Option key={activityIndex} value={value.id || ""}>
                        {value.name}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Col span={6}>
                  <div style={{ fontWeight: "bold", margin: "1em 0 .25em 0" }}>
                    Start Date & Time
                  </div>

                  <DatePicker showTime name={"startTime"} />
                </Col>
              </Row>

              <Form.Item className="submit-btn">
                <Button type="primary" htmlType="submit" disabled={!isValid}>
                  {id ? "Update" : "Create"} Reservation
                </Button>
              </Form.Item>
            </form>
          </Col>
        </Row>
      )}
    </Formik>
  );
};
