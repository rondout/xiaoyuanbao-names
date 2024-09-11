import usePagination from "@/hooks/usePagination";
import { NameDisplayData } from "@/models/name.model";
import { Button, Divider, Empty, Input, Pagination } from "antd";
import { useCallback, useState } from "react";

export default function NameList(props: { names: NameDisplayData[]; onClick?: (name: NameDisplayData) => void; }) {
    const { names, onClick } = props;
    const [searchText, setSearchText] = useState("");
    const { paginationProps, records, handleSearch: handleSearchFn } = usePagination(names)

    const genClassName = useCallback((isSelected: boolean) => {
        return isSelected ? "selected-name-item name-item" : "name-item";
    }, [])

    const handleSearch = useCallback(() => {
        handleSearchFn(searchText);
    }, [searchText])

    return (
        <div>
            <div className="search-box flex-start flex-nowrap">
                <Input onPressEnter={handleSearch} placeholder="输入文字搜索" value={searchText} onChange={(e) => setSearchText(e.target.value)}></Input>
                <Button onClick={handleSearch} type="primary">搜索</Button>
            </div>
            <Divider style={{ margin: '8px 0 16px' }}></Divider>
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
            {records.length > 0 &&
                <Pagination {...paginationProps} style={{ marginTop: 24 }}></Pagination>
            }
        </div >
    );
}
