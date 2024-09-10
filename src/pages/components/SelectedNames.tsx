/*
 * @Author: shufei.han
 * @Date: 2024-09-10 09:14:53
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:23:13
 * @FilePath: \xiaoyuanbao-names\src\pages\components\SelectedNames.tsx
 * @Description: 
 */
import { Genders, GenderTextMap, getSelectedNames } from "@/models/name.model";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import AllNames from "./AllNames";
import "./allName.css"
import NameList from "./NameList";

export default function SelectedNames(props: { gender: Genders }) {
  const [allNamesOpen, setAllNamesOpen] = useState(false);
  const [allSelectedNames, steAllSelectedNames] = useState<string[]>([]);

  const getAllSelectedNames = useCallback(() => {
    const names = getSelectedNames(props.gender);
    steAllSelectedNames(names);
  }, [props.gender]);

  useEffect(() => {
    getAllSelectedNames()
  }, [
    getAllSelectedNames
  ])
  const handleSelectOpen = () => {
    setAllNamesOpen(true);
  };

  const handleCloseDrawer = () => {
    getAllSelectedNames()
    setAllNamesOpen(false);
  };

  return (
    <div className="selected-names">
      <h4 className="primary-text">
        下面是为你的<span>{GenderTextMap.get(props.gender)}</span>选择的名字
      </h4>
      <div style={{padding: '0 16px'}}>
        <NameList names={allSelectedNames.map(name => ({ name, selected: true }))}></NameList>
      </div>
      <Button style={{ marginTop: 32 }} onClick={handleSelectOpen}>继续选择</Button>
      <AllNames onClose={handleCloseDrawer} gender={props.gender} open={allNamesOpen}></AllNames>
    </div>
  );
}
