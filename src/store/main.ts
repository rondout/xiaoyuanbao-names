/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:35:03
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-09 16:40:39
 * @FilePath: \xiaoyuanbao-names\src\store\main.ts
 * @Description: 
 */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getToken } from "@/models/base.model";

export const mainSlice = createSlice({
    name: "main",
    initialState: {
        isLogin: !!getToken(),
    },
    reducers: {
        setLoginState: (state, action) => {
            state.isLogin = action.payload
        },
    },
});

export const { setLoginState } = mainSlice.actions;

export const selectIsLogin = (state: RootState) => state.main.isLogin;

export default mainSlice.reducer;

