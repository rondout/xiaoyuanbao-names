/*
 * @Author: shufei.han
 * @Date: 2024-09-09 18:11:04
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:52:15
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AllNames.tsx
 * @Description:
 */
import { Genders, GenderTextMap, } from "@/models/name.model";
import { Button, Drawer } from "antd";
import { useState } from "react";
import AllChars from "./AllChars";
import "./allName.css";
import NameList from "./NameList";
import useName from "@/hooks/useName";
import AddChar from "./AddChar";

export default function AllNames(props: {
  gender: Genders;
  open: boolean;
  onClose: () => void;
}) {
  const [allCharsOpen, setAllCharsOpen] = useState(false);
  const [addCharOpen, setAddCharOpen] = useState(false);

  const { displayNameData, setSelectName } = useName(props.gender)

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

      <NameList names={displayNameData.selected} onClick={setSelectName}></NameList>

      <div className="all-names">
        <h4 className="primary-text">
          下面是
          <span style={{ color: "red", fontWeight: "bold" }}>未被选中的</span>
          {GenderTextMap.get(props.gender)}的名字
        </h4>
      </div>

      <NameList names={displayNameData.all} onClick={setSelectName}></NameList>

      <AllChars
        open={allCharsOpen}
        onClose={() => setAllCharsOpen(false)}
        gender={props.gender}
        onAddChar={() => setAddCharOpen(true)}
      ></AllChars>
      <AddChar open={addCharOpen} gender={props.gender} onCancel={() => setAddCharOpen(false)}></AddChar>
    </Drawer>
  );
}
