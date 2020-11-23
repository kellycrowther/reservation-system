import React from "react";
import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";
import { Dropdown, Button, Menu } from "antd";
import { BgColorsOutlined } from "@ant-design/icons";

export const ThemeSwitcher = () => {
  const { change } = useThemeSwitcher("LIGHT");

  const menu = (
    <Menu>
      <Menu.Item onClick={() => change("LIGHT")}>Light</Menu.Item>
      <Menu.Item onClick={() => change("DARK")}>Dark</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      {/* TODO: remove hardcoded color */}
      <Button
        type="link"
        style={{ color: "#ffffffa6", marginRight: "10px" }}
        icon={<BgColorsOutlined />}
      ></Button>
    </Dropdown>
  );
};
