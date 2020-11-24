import React from "react";
import { useHistory } from "react-router-dom";
import { Table, Row, Col, Result, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFetchActivitiesList } from "../../hooks/useFetchActivitiesList";
import "./ActivitiesList.css";

const Title = () => {
  return <h2>Activities</h2>;
};

export const ActivitiesList = () => {
  const history = useHistory();
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
      <Col offset={1} span={22}>
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
          <>
            <Row className="new-resource-container">
              <Col offset={20} span={4} className="new-resource">
                <Button
                  onClick={() => history.push("/activities/new")}
                  type="primary"
                  icon={<PlusOutlined />}
                >
                  New Activity
                </Button>
              </Col>
            </Row>
            <Table
              dataSource={data}
              columns={columns}
              loading={loading}
              rowKey="id"
              title={() => <Title />}
              rowClassName="activity-row"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => history.push(`/activities/${record.id}`),
                };
              }}
            />
          </>
        )}
      </Col>
    </Row>
  );
};
