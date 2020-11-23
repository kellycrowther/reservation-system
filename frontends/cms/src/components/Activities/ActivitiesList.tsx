import React from "react";
import { Table, Row, Col } from "antd";

const Title = () => {
  return <h2>Activities</h2>;
};

export const ActivitiesList = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <Row>
      <Col offset={4} span={16}>
        <Table
          dataSource={dataSource}
          columns={columns}
          title={() => <Title />}
        />
      </Col>
    </Row>
  );
};
