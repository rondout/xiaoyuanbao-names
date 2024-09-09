/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:31:36
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 16:44:54
 * @FilePath: \xiaoyuanbao-names\src\hooks\useLogin.ts
 * @Description: 
 */
import { getRemember, getToken, setRemember, setToken, setUser, TOKEN_KEY, UserInfo, userList } from "@/models/base.model";
import { selectIsLogin, setLoginState } from "@/store/main";
import { nanoid } from "nanoid";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const isLogin = useSelector(selectIsLogin)
    const dispatch = useDispatch()
    const [remember, setRememberValue] = useState(getRemember())
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY)
        dispatch(setLoginState(false))
    }

    const login = (userInfo: UserInfo) => {
        const usernameAndPasswordValid = userList.some(user => user.username === userInfo.username && user.password === userInfo.password)
        if(!usernameAndPasswordValid) {
            throw "用户名或密码错误"
        }
        const token = nanoid()
        setToken(token)
        setUser(userInfo)
        dispatch(setLoginState(true))
        navigate("/")
    }

    const changeRemember = (remember: boolean) => {
        setRemember(remember)
        setRememberValue(remember)
    }

    useEffect(() => {
        dispatch(setLoginState(!!getToken()))
    }, [])

    return {
        isLogin, logout, login, remember, changeRemember
    }
}