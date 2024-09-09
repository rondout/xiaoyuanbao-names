/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:26:13
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 17:10:50
 * @FilePath: \xiaoyuanbao-names\src\router\index.tsx
 * @Description:
 */
import { createHashRouter } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import Login from "@/pages/Login";

const router = createHashRouter([
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
