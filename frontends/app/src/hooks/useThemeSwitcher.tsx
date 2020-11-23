import { useEffect, useState } from "react";
import darkVars from "../assets/styles/dark.json";
import lightVars from "../assets/styles/light.json";
import "../styles/main.less";

import { message } from "antd";

type Themes = "DARK" | "LIGHT";

declare global {
  interface Window {
    less: any;
  }
}

function selectTheme(selectedTheme: Themes) {
  let theme;
  switch (selectedTheme) {
    case "LIGHT":
      theme = lightVars;
      break;
    case "DARK":
      theme = darkVars;
      break;
    default:
      theme = lightVars;
      break;
  }
  return theme;
}

export const useThemeSwitcher = (selectedTheme: Themes) => {
  const [themeApplied, setThemeApplied] = useState(false);
  const [error, setError] = useState(null);

  function change(selectedTheme: Themes) {
    let vars: any = selectTheme(selectedTheme);
    window.less
      .modifyVars(vars)
      .then(() => {
        setThemeApplied(true);
      })
      .catch((error: any) => {
        message.error(`Failed to update theme`, error);
        setError(error);
      });
  }

  useEffect(() => {
    change(selectedTheme);
  }, [selectedTheme]);

  return {
    themeApplied,
    error,
    change,
  };
};
