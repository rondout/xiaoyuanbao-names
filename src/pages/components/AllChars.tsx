/*
 * @Author: shufei.han
 * @Date: 2024-09-09 17:25:44
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:35:07
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AllChars.tsx
 * @Description:
 */
import { Genders } from "@/models/name.model";
import "./allChar.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer, Modal } from "antd";
import useName from "@/hooks/useName";

export default function AllChars(props: {
  gender: Genders;
  open?: boolean;
  onClose?: () => void;
  onAddChar: () => void;
}) {
  const { allChars, deleteChar } = useName(props.gender);
  const [modal, contextHolder] = Modal.useModal();
  const handleDelete = (char: string) => {
    modal.confirm({
      centered: true,
      title: `确定要删除 ${char} 吗？`,
      content: (
        <div style={{fontSize: 14}}>
          <span>确认后，与</span>
          <span style={{fontWeight: 'bold', padding: '0 8px', fontSize: 16}} className="primary-text">{char}</span>
          <span>有关的所有名字（包括已选择的）都会被删除，请谨慎操作</span>
        </div>
      ),
      onOk: () => {
        deleteChar(char);
      },
    });
  };

  return (
    <Drawer title="所有的文字" open={props.open} onClose={props.onClose}>
      {contextHolder}
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
        <Button onClick={props.onAddChar} type="primary">
          添加
        </Button>
      </div>
    </Drawer>
  );
}
