/*
 * @Author: shufei.han
 * @Date: 2024-09-10 11:33:07
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 11:50:03
 * @FilePath: \xiaoyuanbao-names\src\hooks\useName.ts
 * @Description: 
 */
import { getRandomInteger } from "@/models/base.model";
import { Genders, NameDisplayData } from "@/models/name.model";
import { deleteNamesAfterDeleteCharAction, selectAllChars, selectAllNames, selectAllSelectedNames, setAllCharsAction, setSelectedNameAction } from "@/store/main";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

let timer: NodeJS.Timeout

export default function useName(gender: Genders) {
    const allChars = useSelector(selectAllChars)[gender]
    const allNames = useSelector(selectAllNames)[gender]
    const allSelectedNames = useSelector(selectAllSelectedNames)[gender]
    const [randomIndex, setRandomIndex] = useState(getRandomInteger(0, allNames.length - 1))
    const dispatch = useDispatch()
    const [randomGenarating, setRandomGenarating] = useState(false)

    const setSelectName = useCallback((data: NameDisplayData) => {
        dispatch(setSelectedNameAction({ gender, data }))
    }, [gender])

    const deleteChar = useCallback((char: string) => {
        dispatch(setAllCharsAction({ gender, char, type: 'DELETE' }))
        dispatch(deleteNamesAfterDeleteCharAction({ char, gender }))
    }, [gender])

    const randomName = useMemo(() => {
        return allNames[randomIndex]    
    }, [allNames, randomIndex])

    const currentRandomNameSelected = useMemo(() => {
        return allSelectedNames.includes(randomName)
    }, [allSelectedNames, randomName])

    const startRandom = useCallback(() => {
        setRandomGenarating(true)
        const allCount = allNames.length
        timer = setInterval(() => {
            const randomIndex = getRandomInteger(0, allCount - 1)
            setRandomIndex(randomIndex)
        }, 20)
    }, [allNames])

    const stopRandom = useCallback(() => {
        setRandomGenarating(false)
        timer && clearInterval(timer)
    }, [])

    useEffect(() => {
        return () => {
            stopRandom()
        }
    }, [])


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

    const selectRandomName  = useCallback((selected = true) => {
        console.log(selected);
        setSelectName({name: randomName, selected})
    }, [randomName])

    return {
        allChars,
        allNames,
        allSelectedNames,
        setSelectName,
        displayNameData,
        deleteChar,
        randomName,
        currentRandomNameSelected,
        startRandom,
        stopRandom,
        selectRandomName,
        randomGenarating
    }

}