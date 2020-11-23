import React from "react";
import { Table, Row, Col, Result, Button } from "antd";
import { useFetchActivitiesList } from "../../hooks/useFetchActivitiesList";

const Title = () => {
  return <h2>Activities</h2>;
};

export const ActivitiesList = () => {
  const { data, error, loading, execute } = useFetchActivitiesList();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
    },
  ];
  return (
    <Row>
      <Col offset={4} span={16}>
        {error ? (
          <Result
            status="warning"
            title="There was a problem fetching the activities. Please try refreshing the page."
            extra={
              <Button type="primary" key="console" onClick={() => execute()}>
                Refresh Page
              </Button>
            }
          />
        ) : (
          <Table
            dataSource={data}
            columns={columns}
            loading={loading}
            rowKey="id"
            title={() => <Title />}
          />
        )}
      </Col>
    </Row>
  );
};
