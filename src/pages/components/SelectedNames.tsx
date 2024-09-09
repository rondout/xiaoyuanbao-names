import { Genders, GenderTextMap, getSelectedNames } from "@/models/name.model";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import AllNames from "./AllNames";
import  "./allName.css"

/*
 * @Author: shufei.han
 * @Date: 2024-09-09 17:22:14
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 18:17:09
 * @FilePath: \xiaoyuanbao-names\src\pages\components\SelectedNames.tsx
 * @Description:
 */
export default function SelectedNames(props: { gender: Genders }) {
  const [allNamesOpen, setAllNamesOpen] = useState(false);
  const [allSelectedNames, steAllSelectedNmaes] = useState<string[]>([]);

  const getAllSelecetdNmaes = useCallback(() => {
    const names = getSelectedNames(props.gender);
    steAllSelectedNmaes(names);
  }, [props.gender]);

  useEffect(() => {
    getAllSelecetdNmaes()
  }, [
    getAllSelecetdNmaes
  ])
  const handleSelectOpen = () => {
    setAllNamesOpen(true);
  };

  const handleCloseDrawer = () => {
    getAllSelecetdNmaes()  
    setAllNamesOpen(false);
  };

  return (
    <div className="selected-names">
      <h4 className="primary-text">
        下面是为你的<span>{GenderTextMap.get(props.gender)}</span>选择的名字
      </h4>
      <div className="selected-names-list">
        {
          allSelectedNames?.map(item => <div className="selected-name-item" key={item}>{item}</div>)
        }
      </div>
      <Button style={{marginTop: 32}} onClick={handleSelectOpen}>继续选择</Button>
      <AllNames onClose={handleCloseDrawer} gender={props.gender} open={allNamesOpen}></AllNames>
    </div>
  );
}
