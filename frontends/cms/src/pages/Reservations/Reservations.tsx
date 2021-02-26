import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Row, Col, Result, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { useFetchReservationsList } from "../../services/reservation.service";
import { Location } from "../../interfaces/Location";
import { Activity } from "../../interfaces/Activity";

const Title = () => {
  return <h2>Reservations</h2>;
};

export const Reservations = () => {
  const history = useHistory();
  const { data, error, loading, fetch } = useFetchReservationsList();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Activity",
      dataIndex: "activity",
      render: (activity: Activity) => <p>{activity.name}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Start Date & Time",
      dataIndex: "startTime",
      render: (startTime: string) => (
        <p>{moment(startTime).format("MM-DD-YYYY HH:MM")}</p>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (location: Location) => <p>{location.name}</p>,
    },
  ];

  return (
    <Row>
      <Col offset={1} span={22}>
        {error ? (
          <Result
            status="warning"
            title="There was a problem fetching the reservations. Please try refreshing the page."
            extra={
              <Button type="primary" key="console" onClick={() => fetch()}>
                Refresh Page
              </Button>
            }
          />
        ) : (
          <>
            <Row>
              <Col offset={20} span={4}>
                <Button
                  onClick={() => history.push("/reservations/new")}
                  type="primary"
                  icon={<PlusOutlined />}
                >
                  New Reservation
                </Button>
              </Col>
            </Row>
            <Table
              dataSource={data}
              columns={columns}
              loading={loading}
              rowKey="id"
              title={() => <Title />}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) =>
                    history.push(`/reservations/${record.id}`),
                };
              }}
            />
          </>
        )}
      </Col>
    </Row>
  );
};
