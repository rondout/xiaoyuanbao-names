/*
 * @Author: shufei.han
 * @Date: 2024-09-09 18:11:04
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:34:34
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AllNames.tsx
 * @Description:
 */
import {
  Genders,
  GenderTextMap,
  getAllNames,
  getSelectedNames,
  saveSelectedNames,
} from "@/models/name.model";
import { Button, Drawer, Empty } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import AllChars from "./AllChars";
import "./allName.css";

export default function AllNames(props: {
  gender: Genders;
  open: boolean;
  onClose: () => void;
}) {
  const [allCharsOpen, setAllCharsOpen] = useState(false);
  const [allNames, setAllNames] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const unSelectedNames = useMemo(() => {
    return allNames.filter((name) => !selectedNames.includes(name));
  }, [allNames, selectedNames]);

  const handleSelectName = (name: string) => {
    const selectedNames = getSelectedNames(props.gender);
    selectedNames.push(name);
    setSelectedNames(selectedNames);
    saveSelectedNames(selectedNames, props.gender);
    initNames()
  };

  const handleCancelSelectName = (name: string) => {
    const selectedNames = getSelectedNames(props.gender);
    const index = selectedNames.indexOf(name);
    selectedNames.splice(index, 1);
    setSelectedNames(selectedNames);
    saveSelectedNames(selectedNames, props.gender);
    initNames()
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
    initNames()
  }, [initNames]);

  const viewAllChars = () => {
    setAllCharsOpen(true);
  };

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

      <div className="all-name-list">
        {selectedNames.length > 0 &&
          selectedNames.map((name) => (
            <div
              onClick={() => handleCancelSelectName(name)}
              key={name}
              className="name-item selected-name-item"
            >
              {name}
            </div>
          ))}
        {selectedNames.length <= 0 && <Empty className="full-width"></Empty>}
      </div>

      <div className="all-names">
        <h4 className="primary-text">
          下面是
          <span style={{ color: "red", fontWeight: "bold" }}>未被选中的</span>
          {GenderTextMap.get(props.gender)}的名字
        </h4>
      </div>

      <div className="all-name-list">
        {unSelectedNames.map((name) => (
          <div
            onClick={() => handleSelectName(name)}
            key={name}
            className="name-item"
          >
            {name}
          </div>
        ))}
      </div>

      <AllChars
        open={allCharsOpen}
        onClose={() => setAllCharsOpen(false)}
        gender={props.gender}
      ></AllChars>
    </Drawer>
  );
}
