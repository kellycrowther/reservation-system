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
      <Menu theme="dark">
        <Menu.Item icon={<BgColorsOutlined />}></Menu.Item>
      </Menu>
    </Dropdown>
  );
};
