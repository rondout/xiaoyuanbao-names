/*
 * @Author: shufei.han
 * @Date: 2024-09-10 11:33:07
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:50:03
 * @FilePath: \xiaoyuanbao-names\src\hooks\useName.ts
 * @Description: 
 */
import { Genders, NameDisplayData } from "@/models/name.model";
import { deleteNamesAfterDeleteCharAction, selectAllChars, selectAllNames, selectAllSelectedNames, setAllCharsAction, setSelectedNameAction } from "@/store/main";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useName(gender: Genders) {
    const allChars = useSelector(selectAllChars)[gender]
    const allNames = useSelector(selectAllNames)[gender]
    const allSelectedNames = useSelector(selectAllSelectedNames)[gender]
    const dispatch = useDispatch()

    const setSelectName = useCallback((data: NameDisplayData) => {
        dispatch(setSelectedNameAction({ gender, data }))
    }, [gender])

    const deleteChar = useCallback((char: string) => {
        dispatch(setAllCharsAction({ gender, char, type: 'DELETE' }))
        dispatch(deleteNamesAfterDeleteCharAction({ char, gender }))
    }, [gender])


    const displayNameData = useMemo(() => {
        const all: NameDisplayData[] = allNames.map((name) => {
            return {
                name,
                selected: allSelectedNames.includes(name),
            };
        });
        const selected: NameDisplayData[] = allSelectedNames.map((name) => {
            return {
                name,
                selected: true,
            };
        });
        return { all, selected }
    }, [allNames, allSelectedNames]);

    return {
        allChars,
        allNames,
        allSelectedNames,
        setSelectName,
        displayNameData,
        deleteChar
    }

}