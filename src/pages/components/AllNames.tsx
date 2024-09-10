/*
 * @Author: shufei.han
 * @Date: 2024-09-09 18:11:04
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:04:12
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AllNames.tsx
 * @Description:
 */
import {
  Genders,
  GenderTextMap,
  getAllNames,
  getSelectedNames,
  NameDisplayData,
  saveSelectedNames,
} from "@/models/name.model";
import { Button, Drawer } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import AllChars from "./AllChars";
import "./allName.css";
import NameList from "./NameList";

export default function AllNames(props: {
  gender: Genders;
  open: boolean;
  onClose: () => void;
}) {
  const [allCharsOpen, setAllCharsOpen] = useState(false);
  const [allNames, setAllNames] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const handleSelectName = (data: NameDisplayData) => {
    if(data.selected) {
      handleCancelSelectName(data)
      return
    }
    const selectedNames = getSelectedNames(props.gender);
    selectedNames.push(data.name);
    setSelectedNames(selectedNames);
    saveSelectedNames(selectedNames, props.gender);
    initNames();
  };

  const handleCancelSelectName = (data: NameDisplayData) => {
    const selectedNames = getSelectedNames(props.gender);
    const index = selectedNames.indexOf(data.name);
    selectedNames.splice(index, 1);
    setSelectedNames(selectedNames);
    saveSelectedNames(selectedNames, props.gender);
    initNames();
  };

  const initNames = useCallback(() => {
    if (!props.open) {
      return;
    }
    const names = getAllNames(props.gender);
    setAllNames(names);
    const selectedNames = getSelectedNames(props.gender);
    setSelectedNames(selectedNames);
  }, [props.open, props.gender]);

  useEffect(() => {
    initNames();
  }, [initNames]);

  const viewAllChars = () => {
    setAllCharsOpen(true);
  };

  const computedNameData = useMemo(() => {
    const all: NameDisplayData[] = allNames.map((name) => {
      return {
        name,
        selected: selectedNames.includes(name),
      };
    });
    const selected: NameDisplayData[] = selectedNames.map((name) => {
      return {
        name,
        selected: true,
      };
    });
    return { all, selected }
  }, [allNames, selectedNames]);

  return (
    <Drawer
      title={`这是给你的${GenderTextMap.get(props.gender)}准备的所有的备选名字`}
      open={props.open}
      onClose={props.onClose}
    >
      <Button onClick={viewAllChars} type="primary">
        查看所有的文字
      </Button>
      <div className="all-names">
        <h4 className="primary-text">
          下面是
          <span style={{ color: "red", fontWeight: "bold" }}>选中的</span>
          {GenderTextMap.get(props.gender)}的名字
        </h4>
      </div>

      <NameList names={computedNameData.selected} onClick={handleCancelSelectName}></NameList>

      <div className="all-names">
        <h4 className="primary-text">
          下面是
          <span style={{ color: "red", fontWeight: "bold" }}>未被选中的</span>
          {GenderTextMap.get(props.gender)}的名字
        </h4>
      </div>

      <NameList names={computedNameData.all} onClick={handleSelectName}></NameList>

      <AllChars
        open={allCharsOpen}
        onClose={() => setAllCharsOpen(false)}
        gender={props.gender}
      ></AllChars>
    </Drawer>
  );
}
