import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Row, Col } from "antd";
import {
  DeploymentUnitOutlined,
  UserOutlined,
  TrophyOutlined,
  ScheduleOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import moment from "moment";
import "./App.css";
import { ThemeSwitcher } from "./components/ThemeSwitcher/ThemeSwitcher";
import { RenderRoutes } from "./routes/routes";
import { UserContext } from "./context/userContext";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useContext(UserContext);

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
              <Col offset={22} span={1} style={{ textAlign: "right" }}>
                <ThemeSwitcher />
              </Col>
              <Col
                onClick={() => logout()}
                span={1}
                style={{ color: "#ffffffa6", cursor: "pointer" }}
              >
                <LogoutOutlined />
              </Col>
            </Row>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <RenderRoutes />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Created by Kelly Crowther ©{moment().year()}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
