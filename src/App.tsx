import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import useTheme from "./hooks/useTheme";
import router from "./router";
import zhCN from 'antd/locale/zh_CN';
import { useEffect } from "react";
import { initLocalStorage } from "./models/base.model";

export default function App() {
  const [colorPrimary] = useTheme();

  useEffect(() => {
    initLocalStorage()
  }, [])

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary } }}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
}
