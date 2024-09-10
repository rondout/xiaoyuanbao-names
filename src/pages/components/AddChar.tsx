/*
 * @Author: shufei.han
 * @Date: 2024-09-10 11:09:53
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:16:03
 * @FilePath: \xiaoyuanbao-names\src\pages\components\AddChar.tsx
 * @Description: 
 */
import { Genders } from "@/models/name.model";

export default function AddChar(props: { gender: Genders; open: boolean; onClose: () => void; }) {
  const { gender } = props;
  return (
    <div
      className="add-char"
    >
      {gender}
    </div>
  );
}   