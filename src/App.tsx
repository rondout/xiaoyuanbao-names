import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import router from "./router";

export default function App() {
  const [colorPrimary] = useTheme();

  return (
    <ConfigProvider theme={{ token: { colorPrimary } }}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}
