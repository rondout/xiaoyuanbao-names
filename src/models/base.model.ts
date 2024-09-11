/*
 * @Author: shufei.han
 * @Date: 2024-09-09 16:41:14
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 16:43:33
 * @FilePath: \xiaoyuanbao-names\src\models\base.model.ts
 * @Description:  
 */
import { version } from "../../package.json"

export const TOKEN_KEY = "token";
export const REMEBER_KEY = "remeber";
export const USER_KEY = "user";
export const STORAGE_VERSION_KEY = "current-version";

export interface UserInfo {
    username: string;
    password: string;
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getRemember = () => {
    return localStorage.getItem(REMEBER_KEY) === 'true'
}

export const setRemember = (remember: boolean) => {
    localStorage.setItem(REMEBER_KEY, remember ? 'true' : 'false')
}

export const getUser = (): UserInfo => {
    try {
        const userInfo = JSON.parse(localStorage.getItem(USER_KEY)) as UserInfo
        const isValidData = userInfo && userInfo.username && userInfo.password
        if (isValidData) {
            return userInfo
        }
        throw "error"
    } catch (e) {
    }
}

export const setUser = (userInfo: UserInfo) => {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
}


export const userList: UserInfo[] = [
    {
        username: "silvia",
        password: "syy029",
    },
    {
        username: "joey",
        password: "Hsf5898048430",
    }
]

export const initLocalStorage = () => {
    const storageVersion = localStorage.getItem(STORAGE_VERSION_KEY)
    if (storageVersion !== version) {
        localStorage.clear()
        localStorage.setItem(STORAGE_VERSION_KEY, version)
    }
}