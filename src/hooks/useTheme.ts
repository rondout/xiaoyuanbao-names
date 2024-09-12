/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:22:07
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 15:58:08
 * @FilePath: \xiaoyuanbao-names\src\hooks\useTheme.ts
 * @Description: 
 */
import { setThemeToStorage } from "@/models/base.model"
import { selectCurrentGender, selectTheme, setThemeAction } from "@/store/main"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
export default function useTheme(): [string, (color: string) => void] {
    const gender = useSelector(selectCurrentGender)
    const colorPrimary = useSelector(selectTheme)
    const dispatch = useDispatch()

    const setColorToDocument =  useCallback(() => {
        document.documentElement.style.setProperty('--primary', colorPrimary)
    }, [colorPrimary])

    const changePrimary = (color: string) => {
        dispatch(setThemeAction(color))
        setThemeToStorage(color, gender)
    }

    useEffect(() => {
        setColorToDocument()
    }, [setColorToDocument])

    return [colorPrimary, changePrimary]
}