/*
 * @Author: shufei.han
 * @Date: 2024-09-09 18:11:04
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:34:34
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AllNames.tsx
 * @Description:
 */
import { Genders, GenderTextMap, getAllNames } from "@/models/name.model";
import { Button, Drawer } from "antd";
import { useEffect, useState } from "react";
import AllChars from "./AllChars";

export default function AllNames(props: {
  gender: Genders;
  open: boolean;
  onClose: () => void;
}) {
  const [allCharsOpen, setAllCharsOpen] = useState(false);
  // eslint-disable-next-line
//   const [allNames, setAllNames] = useState<string[]>([]);

  useEffect(() => {
    if (!props.open) {
      return;
    }
    getAllNames(props.gender);
  }, [props.open, props.gender]);

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
          下面是所有{GenderTextMap.get(props.gender)}的名字
        </h4>
      </div>

      <AllChars
        open={allCharsOpen}
        onClose={() => setAllCharsOpen(false)}
        gender={props.gender}
      ></AllChars>
    </Drawer>
  );
}
