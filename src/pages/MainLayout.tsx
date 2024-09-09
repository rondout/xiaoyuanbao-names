/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:27:15
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:06:32
 * @FilePath: \xiaoyuanbao-names\src\pages\MainLayout.tsx
 * @Description:
 */
import useLogin from "@/hooks/useLogin";
import { Navigate } from "react-router-dom";
import SelectedNames from "./components/SelectedNames";
import { Radio, RadioChangeEvent } from "antd";
import { Genders, GenderTextMap } from "@/models/name.model";
import { useState } from "react";

export default function MainLayout() {
  const { isLogin } = useLogin();
  const [currentGender, setGender] = useState<Genders>(
    (localStorage.getItem("gender") as Genders) || Genders.BOY
  );

  const handleGenderChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
    localStorage.setItem("gender", e.target.value);
  };

  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div style={{ padding: 12 }}>
      <div className="flex" style={{ marginBottom: 24 }}>
        <Radio.Group
          onChange={handleGenderChange}
          value={currentGender}
          buttonStyle="solid"
        >
          <Radio.Button value={Genders.BOY}>{GenderTextMap.get(Genders.BOY)}</Radio.Button>
          <Radio.Button value={Genders.GIRL}>{GenderTextMap.get(Genders.GIRL)}</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        <SelectedNames gender={currentGender}></SelectedNames>
      </div>
    </div>
  );
}
