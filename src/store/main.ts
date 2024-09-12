/*
 * @Author: shufei.han
 * @Date: 2024-09-09 15:35:03
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 12:13:22
 * @FilePath: \xiaoyuanbao-names\src\store\main.ts
 * @Description: 
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { getThemeFromStorage, getToken } from "@/models/base.model";
import { Genders, getAllNames, getChars, getSelectedNames, NameDisplayData, saveNamesToStorage, saveSelectedNames, setCharsToStorage, updateNamesAfterAddChar } from "@/models/name.model";

const initGender = (localStorage.getItem("gender") as Genders) || Genders.BOY
const initTheme = getThemeFromStorage(initGender)

export const mainSlice = createSlice({
    name: "main",
    initialState: {
        isLogin: !!getToken(),
        currentGender: initGender,
        theme: initTheme,
        allChars: {
            [Genders.BOY]: getChars(Genders.BOY),
            [Genders.GIRL]: getChars(Genders.GIRL)
        },
        allNames: {
            [Genders.BOY]: getAllNames(Genders.BOY),
            [Genders.GIRL]: getAllNames(Genders.GIRL)
        },
        allSelectedNames: {
            [Genders.BOY]: getSelectedNames(Genders.BOY),
            [Genders.GIRL]: getSelectedNames(Genders.GIRL)
        }
    },
    reducers: {
        setLoginState: (state, action) => {
            state.isLogin = action.payload
        },
        setThemeAction(state, action) {
            state.theme = action.payload
        },
        setGenderAction(state, action: PayloadAction<Genders>) {
            state.currentGender = action.payload
            state.theme = getThemeFromStorage(action.payload)
        },
        initStoreNamesAction(state) {
            state.allNames = {
                [Genders.BOY]: getAllNames(Genders.BOY),
                [Genders.GIRL]: getAllNames(Genders.GIRL)
            }
        },
        setAllCharsAction: (state, action: PayloadAction<{ gender: Genders, char: string, type: "ADD" | "DELETE" }>) => {
            const { gender, char, type } = action.payload
            const currentChars = state.allChars[gender]
            if (type === "ADD") {
                if (currentChars.includes(char!)) {
                    throw "当前文字已存在"
                }
                state.allChars[gender] = [...currentChars, char!]
                updateNamesAfterAddChar(gender, char)
            } else if (type === "DELETE") {
                state.allChars[gender] = currentChars.filter(item => item !== char)
            }
            setCharsToStorage(state.allChars[gender], gender)
        },
        setSelectedNameAction: (state, action: PayloadAction<{ data: NameDisplayData; gender: Genders }>) => {
            const { data, gender } = action.payload
            if (data.selected) {
                state.allSelectedNames[gender] = state.allSelectedNames[gender].filter(name => name !== data.name)
                saveSelectedNames(state.allSelectedNames[gender], gender)
            } else {
                state.allSelectedNames[gender].push(data.name)
                saveSelectedNames(state.allSelectedNames[gender], gender)
            }
        },
        /** 删除字后要同步删除所有的和这个字相关的名字 */
        deleteNamesAfterDeleteCharAction(state, payload: PayloadAction<{ gender: Genders, char: string }>) {
            const { gender, char } = payload.payload
            // 删除和这个字有关的所有名字
            const currentAllNames = state.allNames[gender]
            state.allNames[gender] = currentAllNames.filter(name => !name.includes(char))
            saveNamesToStorage(state.allNames[gender], gender)
            // 删除和这个字有关的所有已选择名字
            const currentAllSelectedNames = state.allSelectedNames[gender]
            state.allSelectedNames[gender] = currentAllSelectedNames.filter(name => !name.includes(char))
            saveSelectedNames(state.allSelectedNames[gender], gender)
        }
    },
});

export const { setLoginState, setAllCharsAction, setSelectedNameAction,
    deleteNamesAfterDeleteCharAction, initStoreNamesAction,
    setThemeAction, setGenderAction } = mainSlice.actions;

export const selectIsLogin = (state: RootState) => state.main.isLogin;
export const selectAllChars = (state: RootState) => state.main.allChars;
export const selectAllNames = (state: RootState) => state.main.allNames;
export const selectAllSelectedNames = (state: RootState) => state.main.allSelectedNames;
export const selectTheme = (state: RootState) => state.main.theme;
export const selectCurrentGender = (state: RootState) => state.main.currentGender;

export default mainSlice.reducer;

