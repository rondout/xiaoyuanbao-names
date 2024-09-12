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
import ThemeChanger from "./components/ThemeChanger";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentGender, setGenderAction } from "@/store/main";

export default function MainLayout() {
  const { isLogin } = useLogin();
  const currentGender = useSelector(selectCurrentGender)
  const dispatch = useDispatch()
  const handleGenderChange = (e: RadioChangeEvent) => {
    localStorage.setItem("gender", e.target.value);
    dispatch(setGenderAction(e.target.value as Genders))
  };

  if (!isLogin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div style={{ padding: 12 }}>
      <ThemeChanger></ThemeChanger>
      <div className="flex" style={{ marginBottom: 24, marginTop: 16 }}>
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
