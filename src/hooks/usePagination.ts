/*
 * @Author: shufei.han
 * @Date: 2024-09-10 10:37:12
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 10:54:42
 * @FilePath: \xiaoyuanbao-names\src\hooks\usePagination.ts
 * @Description: 
 */
import { BaseNameData } from "@/models/name.model";
import { PaginationProps } from "antd";
import { useMemo, useState } from "react";

export const DEFAULT_PAGE_SIZE = 3 * 10;

export default function usePagination<T extends BaseNameData>(data: Array<T>, pageSize = DEFAULT_PAGE_SIZE) {
    const [current, setCurrentPage] = useState(1);
    const [searchText, setSearchText] = useState("");

    const filteredData = useMemo(() => {
        return data.filter(item => item.name.includes(searchText));
    }, [data, searchText])
    
    const total = useMemo(() => {
        return filteredData.length;
    }, [data, searchText])
    
    const records = useMemo(() => {
        return filteredData.slice((current - 1) * pageSize, current * pageSize);
    }, [data, pageSize, current, searchText])

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = (str: string) => {
        setSearchText(str);
        setCurrentPage(1);
    }

    return { paginationProps: { onChange, pageSize, total, current }, records, handleSearch }
}