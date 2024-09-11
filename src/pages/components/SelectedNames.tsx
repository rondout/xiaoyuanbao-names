/*
 * @Author: shufei.han
 * @Date: 2024-09-10 09:14:53
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:43:09
 * @FilePath: \xiaoyuanbao-names\src\pages\components\SelectedNames.tsx
 * @Description: 
 */
import { Genders, GenderTextMap } from "@/models/name.model";
import { Button } from "antd";
import { useState } from "react";
import AllNames from "./AllNames";
import "./allName.css"
import NameList from "./NameList";
import useName from "@/hooks/useName";

export default function SelectedNames(props: { gender: Genders }) {
  const [allNamesOpen, setAllNamesOpen] = useState(false);

  const {allSelectedNames} = useName(props.gender)

  const handleSelectOpen = () => {
    setAllNamesOpen(true);
  };

  const handleCloseDrawer = () => {
    setAllNamesOpen(false);
  };

  return (
    <div className="selected-names">
      <h4 className="primary-text">
        下面是为你的<span>{GenderTextMap.get(props.gender)}</span>选择的名字
      </h4>
      <div style={{padding: '0 16px'}}>
        <NameList names={allSelectedNames.map(name => ({ name, selected: true }))}></NameList>
        <div style={{padding: '16px 0'}}>
          已选择
          <span className="primary-text" style={{fontWeight: 'bold', padding: '0 8px'}}>{allSelectedNames.length}</span>个名字
        </div>
      </div>
      <Button style={{ marginTop: 32 }} onClick={handleSelectOpen}>继续选择</Button>
      <AllNames onClose={handleCloseDrawer} gender={props.gender} open={allNamesOpen}></AllNames>
    </div>
  );
}
