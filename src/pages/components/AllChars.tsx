/*
 * @Author: shufei.han
 * @Date: 2024-09-09 17:25:44
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:35:07
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AllChars.tsx
 * @Description:
 */
import { Genders, getChars } from "@/models/name.model";
import "./allChar.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";

export default function AllChars(props: { gender: Genders; open?: boolean; onClose?: () => void }) {
  const allChars = getChars(props.gender);

  const handleDelete = (char: string) => {
    console.log(char);
  };

  return (
    <Drawer title="所有的文字" open={props.open} onClose={props.onClose}>
      <div className="all-chars">
        {allChars.map((char) => (
          <div className="char-tag" style={{ fontSize: 20 }} key={char}>
            {char}
            <CloseOutlined
              onClick={() => handleDelete(char)}
              className="close-icon"
            />
          </div>
        ))}
        <Button type="primary">添加</Button>
      </div>
    </Drawer>
  );
}