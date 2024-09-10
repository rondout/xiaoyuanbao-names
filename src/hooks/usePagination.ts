/*
 * @Author: shufei.han
 * @Date: 2024-09-10 10:37:12
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 10:54:42
 * @FilePath: \xiaoyuanbao-names\src\hooks\usePagination.ts
 * @Description: 
 */
import { PaginationProps } from "antd";
import { useMemo, useState } from "react";

export const DEFAULT_PAGE_SIZE = 3 * 10;

export default function usePagination<T>(data: Array<T>, pageSize = DEFAULT_PAGE_SIZE) {
    const [currentPage, setCurrentPage] = useState(1);
    const total = data.length;

    const records = useMemo(() => {
        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [data, pageSize, currentPage])

    const onChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page);
    }

    return { paginationProps: { onChange, pageSize, total }, records }
}