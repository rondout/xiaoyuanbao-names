import usePagination from "@/hooks/usePagination";
import { NameDisplayData } from "@/models/name.model";
import { Empty, Pagination } from "antd";
import { useCallback } from "react";

export default function NameList(props: { names: NameDisplayData[]; onClick?: (name: NameDisplayData) => void; }) {
    const { names, onClick} = props;
    const { paginationProps, records } = usePagination(names)

    const genClassName = useCallback((isSelected: boolean) => {
        return isSelected ? "selected-name-item name-item" : "name-item";
    }, [])

    return (
        <div>
            <div className="all-name-list">
                {records.length > 0 &&
                    records.map((item) => (
                        <div
                            onClick={() => onClick?.(item)}
                            key={item.name}
                            className={genClassName(item.selected)}
                        >
                            {item.name}
                        </div>
                    ))}
                {records.length <= 0 && <Empty className="full-width"></Empty>}
            </div>
            <Pagination {...paginationProps} style={{ marginTop: 24 }}></Pagination>
        </div>
    );
}
