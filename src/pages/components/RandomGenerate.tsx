import useName from "@/hooks/useName";
import { Genders } from "@/models/name.model";
import { Button, Modal } from "antd";
import { useState } from "react";

export default function RandomGenerate(props: { gender: Genders }) {
    const [open, setOpen] = useState(false);
    const { currentRandomNameSelected, startRandom, randomName, stopRandom, selectRandomName, randomGenarating } = useName(props.gender);
    const [started, setStarted] = useState(false);
    const showModal = () => {
        setOpen(true);
    };

    const handleStop = () => {
        setStarted(false);
        stopRandom();
    }

    const handleStart = () => {
        setStarted(true);
        startRandom()
    }

    return (
        <div>
            <Button type="primary" onClick={showModal}>随机生成</Button>
            <Modal title={null} open={open} closable={false} footer={null} centered>
                <div className="random-name-display">
                    {randomName}
                </div>
                <div className="flex">
                    {
                        started ? <Button style={{ marginRight: 12 }} shape="round" onClick={handleStop}>暂停</Button> :
                            <Button style={{ marginRight: 12 }} shape="round" onClick={handleStart}>开始</Button>
                    }
                    {
                        !currentRandomNameSelected ? <Button disabled={randomGenarating} shape="round" onClick={() => selectRandomName(false)}>选择</Button> :
                            <Button disabled={randomGenarating} shape="round" onClick={() => selectRandomName()}>取消</Button>
                    }
                </div>
            </Modal>
        </div>
    )
}