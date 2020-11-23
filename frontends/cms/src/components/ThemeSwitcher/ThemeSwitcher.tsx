import React from "react";
import { useThemeSwitcher } from "../../hooks/useThemeSwitcher";
import { Select } from "antd";

const { Option } = Select;

export const ThemeSwitcher = ({ open }: { open: boolean }) => {
  const { change } = useThemeSwitcher("LIGHT");

  console.info("OPEN: ", open);

  return (
    <Select
      defaultValue="LIGHT"
      style={{ width: 120 }}
      onChange={(value) => change(value)}
      open={open}
    >
      <Option value="LIGHT">Light</Option>
      <Option value="DARK">Dark</Option>
    </Select>
  );
};
