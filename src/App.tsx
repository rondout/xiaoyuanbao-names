import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import router from "./router";
import zhCN from 'antd/locale/zh_CN';

export default function App() {
  const [colorPrimary] = useTheme();

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary } }}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}
