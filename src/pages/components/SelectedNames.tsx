import { Genders, GenderTextMap } from "@/models/name.model";
import { Button } from "antd";
import { useState } from "react";
import AllNames from "./AllNames";

/*
 * @Author: shufei.han
 * @Date: 2024-09-09 17:22:14
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:17:09
 * @FilePath: \xiaoyuanbao-names\src\pages\components\SelectedNames.tsx
 * @Description:
 */
export default function SelectedNames(props: { gender: Genders }) {
  const [allNamesOpen, setAllNamesOpen] = useState(false);

  const handleSelectOpen = () => {
    setAllNamesOpen(true);
  };

  return (
    <div className="selected-names">
      <h4 className="primary-text">
        下面是为你的<span>{GenderTextMap.get(props.gender)}</span>选择的名字
      </h4>
      <Button onClick={handleSelectOpen}>选择</Button>
      <AllNames onClose={() => setAllNamesOpen(false)} gender={props.gender} open={allNamesOpen}></AllNames>
    </div>
  );
}
