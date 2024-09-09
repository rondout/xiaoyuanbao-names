/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:27:15
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 16:39:43
 * @FilePath: \xiaoyuanbao-names\src\pages\MainLayout.tsx
 * @Description:
 */
import useLogin from "@/hooks/useLogin";
import { Navigate } from "react-router-dom";

export default function MainLayout() {
  const {isLogin} = useLogin();  

  console.log(isLogin);
  

  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }

  return <div>{isLogin?'yes':'no'}</div>;
}
