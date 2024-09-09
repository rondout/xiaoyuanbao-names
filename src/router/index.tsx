/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:26:13
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 15:32:17
 * @FilePath: \xiaoyuanbao-names\src\router\index.tsx
 * @Description:
 */
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  }
]);

export default router;
