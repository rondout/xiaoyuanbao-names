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
      <NameList names={allSelectedNames.map(name => ({ name, selected: true }))}></NameList>
      <Button style={{ marginTop: 32 }} onClick={handleSelectOpen}>继续选择</Button>
      <AllNames onClose={handleCloseDrawer} gender={props.gender} open={allNamesOpen}></AllNames>
    </div>
  );
}
