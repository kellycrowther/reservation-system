import React from "react";
import { FieldArray } from "formik";
import { Button, Row, Col, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Select,
  Checkbox,
} from "../../shared-components/formik-antd";
import { StyledField } from "../../shared-components/Field/StyledField";
import { Schedule, ScheduleWeekdays } from "../../interfaces/Schedule";
import { weekdays } from "./weekdays";

const { Option } = Select;

interface InitialValues {
  name: string;
  description: string;
  pictureUrl: string;
  capacity: number;
  locations: number[];
  schedule: Schedule;
}

type SchedulePath = "standard" | "exception";

export const ScheduleCreateUpdate = ({
  values,
  schedulePath,
  scheduleName,
}: {
  values: InitialValues;
  schedulePath: SchedulePath;
  scheduleName: string;
}) => {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>{scheduleName}</div>
      <FieldArray
        name={`schedule.${schedulePath}`}
        render={({ push, remove }) =>
          values.schedule[schedulePath].map((standardSchedule, index) => {
            return (
              <Row key={index} gutter={3}>
                <Col span={6}>
                  <StyledField
                    name={`schedule.${schedulePath}[${index}].name`}
                    label="Schedule Name"
                    placeholder="Enter schedule name"
                  />
                </Col>
                <Col span={6}>
                  <StyledField
                    name={`schedule.${schedulePath}[${index}].description`}
                    label="Schedule Description"
                    placeholder="Enter schedule name"
                  />
                </Col>
                <Col>
                  <div style={{ margin: "1em 0" }}>
                    <div style={{ fontWeight: "bold" }}>Start Date</div>
                    <DatePicker
                      name={`schedule.${schedulePath}[${index}].startTime`}
                    />
                  </div>
                </Col>
                <Col>
                  <div style={{ margin: "1em 0" }}>
                    <div style={{ fontWeight: "bold" }}>End Date</div>
                    <DatePicker
                      name={`schedule.${schedulePath}[${index}].endTime`}
                    />
                  </div>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={8}>
                      <div style={{ margin: "1em 0" }}>
                        <div style={{ fontWeight: "bold" }}>Weekdays</div>
                        {/* Must be managed manually since we are rendering days with constant data */}
                        <Row>
                          {weekdays.map((day, dayIndex) => {
                            return (
                              <Col
                                span={12}
                                style={{ textAlign: "left" }}
                                key={dayIndex}
                              >
                                <Checkbox
                                  name=""
                                  value={day.value}
                                  checked={
                                    !!values.schedule[schedulePath][
                                      index
                                    ].weekdays.find(
                                      (weekday) => weekday.day === day.value
                                    )
                                  }
                                  onChange={(event) => {
                                    const { value } = event.target;
                                    if (
                                      values.schedule[schedulePath][
                                        index
                                      ].weekdays.find(
                                        (weekday) => weekday.day === value
                                      )
                                    ) {
                                      values.schedule[schedulePath][
                                        index
                                      ].weekdays.splice(
                                        values.schedule[schedulePath][
                                          index
                                        ].weekdays.indexOf(value),
                                        1
                                      );
                                    } else {
                                      values.schedule[schedulePath][
                                        index
                                      ].weekdays.push({
                                        day: value,
                                      } as ScheduleWeekdays);
                                    }
                                  }}
                                >
                                  {day.name}
                                </Checkbox>
                              </Col>
                            );
                          })}
                        </Row>
                      </div>
                    </Col>
                    <Col span={16}>
                      <div style={{ margin: "1em 0" }}>
                        <div style={{ fontWeight: "bold" }}>Start Times</div>
                        <FieldArray
                          name={`schedule.${schedulePath}[${index}].hours`}
                          render={({ push, remove }) => {
                            return (
                              <Row>
                                {values.schedule[schedulePath][index].hours.map(
                                  (hour, hourIndex) => (
                                    <Col span={6} key={hourIndex}>
                                      <Row
                                        style={{
                                          justifyContent: "space-evenly",
                                        }}
                                      >
                                        <Col>
                                          <FormLabel label="Hour" />
                                          <Select
                                            placeholder="Hour"
                                            name={`schedule.${schedulePath}[${index}].hours[${hourIndex}].hour`}
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
                                            name={`schedule.${schedulePath}[${index}].hours[${hourIndex}].minutes`}
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
                                        <Row style={{ margin: "16px 0" }}>
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
                                                    minutes: 0,
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
                  </Row>
                </Col>
                <Col span={24} style={{ margin: "0 0 1em 0" }}>
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
                          weekdays: [],
                          hours: [
                            {
                              hour: 0,
                              minutes: 0,
                            },
                          ],
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
    </>
  );
};

const FormLabel = ({ label }: { label: string }) => (
  <div style={{ fontWeight: "bold" }}>{label}</div>
);
