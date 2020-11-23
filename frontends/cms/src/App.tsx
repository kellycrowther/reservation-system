import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import {
  DeploymentUnitOutlined,
  UserOutlined,
  TrophyOutlined,
  ScheduleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./App.css";
import { ActivitiesList } from "./components/Activities/ActivitiesList";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(isCollapsed: boolean) => setCollapsed(isCollapsed)}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["5"]}>
            <Menu.Item key="5" icon={<HomeOutlined />}>
              Home
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<ScheduleOutlined />}>
              Reservations
              <Link to="/reservations" />
            </Menu.Item>
            <Menu.Item key="3" icon={<TrophyOutlined />}>
              Activities
              <Link to="/activities" />
            </Menu.Item>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Users
              <Link to="/users" />
            </Menu.Item>
            <Menu.Item key="4" icon={<DeploymentUnitOutlined />}>
              Locations
              <Link to="/locations" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={collapsed ? { marginLeft: 80 } : { marginLeft: 200 }}
        >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <Row>
              <Col offset={23} span={1} style={{ textAlign: "right" }}>
                <ThemeSwitcher />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <Switch>
              <Route exact path="/activities">
                <ActivitiesList />
              </Route>
              <Route path="*">
                <h2>Route Not Found</h2>
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
