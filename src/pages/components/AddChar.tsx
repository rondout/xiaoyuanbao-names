/*
 * @Author: shufei.han
 * @Date: 2024-09-10 11:09:53
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:16:03
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AddChar.tsx
 * @Description:
 */
import { GenderTextMap, Genders } from "@/models/name.model";
import { initStoreNamesAction, setAllCharsAction } from "@/store/main";
import { Input, Modal, ModalProps } from "antd";
import useMessage from "antd/es/message/useMessage";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface AddCharProps extends ModalProps {
  gender: Genders;
  open: boolean;
}

export default function AddChar(props: AddCharProps) {
  const { gender } = props;
  const [char, setChar] = useState('')
  const dispatch = useDispatch()
  const [message, contextolder] = useMessage()
  const [modal, modelContextHolder] = Modal.useModal();

  const handleOk = () => {
    if (char?.length !== 1) {
      message.error('请输入一个字符')
      return
    }
    try {
      dispatch(setAllCharsAction({ char, type: 'ADD', gender }))
      dispatch(initStoreNamesAction())
      handleCancel(null)
      modal.info({
        title: "添加成功",
        content: "添加成功，并且已经根据添加的文字是生成了名字，请查看",
        centered: true
      })
    } catch (error) {
      if (typeof error === 'string') {
        message.error(error)
      }
      else {
        console.log(error);
        message.error('请重新输入')
      }
    }
  };

  const handleCancel: AddCharProps['onCancel'] = (e) => {
    props.onCancel?.(e);
    setChar('')
  };

  return (
    <Modal {...props} title={`添加${GenderTextMap.get(gender)}名`} onCancel={handleCancel} onOk={handleOk} centered>
      {contextolder}
      {modelContextHolder}
      <Input value={char} onChange={(e) => setChar(e.target.value)} onPressEnter={handleOk}></Input>
    </Modal>
  );
}
