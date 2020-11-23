import React from "react";
import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";
import { Select } from "antd";

const { Option } = Select;

export const ThemeSwitcher = () => {
  const { change } = useThemeSwitcher("LIGHT");

  return (
    <Select
      defaultValue="LIGHT"
      style={{ width: 120 }}
      onChange={(value) => change(value)}
    >
      <Option value="LIGHT">Light</Option>
      <Option value="DARK">Dark</Option>
    </Select>
  );
};
