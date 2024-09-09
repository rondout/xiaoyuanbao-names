/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:22:07
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 15:58:08
 * @FilePath: \xiaoyuanbao-names\src\hooks\useTheme.ts
 * @Description: 
 */
import { useCallback, useEffect, useState } from "react"

export const PRIMARY_KEY = 'theme-color'
export const DEFAULT_PRIMARY = '#3f51b5'

export const getThemeFromStorage = () => {
    return localStorage.getItem(PRIMARY_KEY) || DEFAULT_PRIMARY
}

export const setThemeToStorage = (color: string) => {
    localStorage.setItem(PRIMARY_KEY, color)
}
export default function useTheme(): [string, (color: string) => void] {
    const [colorPrimary, setTheme] = useState(getThemeFromStorage)

    const setColorToDocument =  useCallback(() => {
        document.documentElement.style.setProperty('--primary', colorPrimary)
    }, [colorPrimary])

    const changePrimary = (color: string) => {
        setTheme(color)
        setThemeToStorage(color)
    }

    useEffect(() => {
        setColorToDocument()
    }, [setColorToDocument])

    return [colorPrimary, changePrimary]
}