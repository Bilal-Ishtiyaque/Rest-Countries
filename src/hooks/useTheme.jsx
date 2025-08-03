import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
  return useContext(ThemeContext);
}

export default useTheme