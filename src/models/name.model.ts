/*
 * @Author: shufei.han
 * @Date: 2024-09-09 17:16:59
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 12:09:33
 * @FilePath: \xiaoyuanbao-names\src\models\name.model.ts
 * @Description:
 */
import initConfig from './config.json'

export const firstName = '韩'

export interface JsonConfigType {
  names: {
    [Genders.BOY]: string[];
    [Genders.GIRL]: string[];
  },
  chars: {
    [Genders.BOY]: string[];
    [Genders.GIRL]: string[];
  },
}

export enum Genders {
  BOY = "BOY",
  GIRL = "GIRL",
}

export const GenderTextMap = new Map<Genders, string>([
  [Genders.BOY, "皮夹克"],
  [Genders.GIRL, "小棉袄"],
]);

export const CharsMap = new Map<Genders, string[]>([
  [Genders.BOY, initConfig.chars.BOY],
  [Genders.GIRL, initConfig.chars.GIRL],
]);
export const CHAR_STORAGE_KEY_BOY = "boy-chars";
export const CHAR_STORAGE_KEY_GIRL = "girl-chars";

export const NAME_STORAGE_KEY_BOY = "boy-names";
export const NAME_STORAGE_KEY_GIRL = "girl-names";

export const SELECTED_NAMES_KEY_BOY = "selected-names-boy";
export const SELECTED_NAMES_KEY_GIRL = "selected-names-girl";

export const CHAR_STORAGE_KEY_MAP = new Map<Genders, string>([
  [Genders.BOY, CHAR_STORAGE_KEY_BOY],
  [Genders.GIRL, CHAR_STORAGE_KEY_GIRL],
]);

export const NameStorageKeyMap = new Map<Genders, string>([
  [Genders.BOY, NAME_STORAGE_KEY_BOY],
  [Genders.GIRL, NAME_STORAGE_KEY_GIRL],
]);

export const SelectedNameKeyMap = new Map<Genders, string>([
  [Genders.BOY, SELECTED_NAMES_KEY_BOY],
  [Genders.GIRL, SELECTED_NAMES_KEY_GIRL],
]);

/** 将所有的名字存储至localStorage */
export const saveNamesToStorage = (names: string[], gender: Genders) => {
  localStorage.setItem(NameStorageKeyMap.get(gender), JSON.stringify(names));
};
/** 从localStorage 中获取所有的名字 */
export const getNamesFromStorage = (gender: Genders): string[] => {
  try {
    const names = JSON.parse(
      localStorage.getItem(NameStorageKeyMap.get(gender))
    );
    if (names instanceof Array) {
      return names;
    }
  } catch (error) { }
};
/** 获取所有的已选的名字 */
export const getSelectedNames = (gender: Genders): string[] => {
  try {
    const storageNames = JSON.parse(localStorage.getItem(SelectedNameKeyMap.get(gender)));
    if (storageNames instanceof Array) {
      return storageNames;
    }
    throw "No Selected Names From Storage"
  } catch (error) {
    return []
  }
};
/** 存储已选的名字 */
export const saveSelectedNames = (names: string[], gender: Genders) => {
  localStorage.setItem(SelectedNameKeyMap.get(gender), JSON.stringify(names));
};
/** 获取所有的字 */
export const getChars = (gender: Genders): string[] => {
  const storageChars = localStorage.getItem(CHAR_STORAGE_KEY_MAP.get(gender));
  return storageChars ? JSON.parse(storageChars) : CharsMap.get(gender);
};

export const setCharsToStorage = (chars: string[], gender: Genders) => {
  localStorage.setItem(CHAR_STORAGE_KEY_MAP.get(gender), JSON.stringify(chars));
};

export function getAllNames(gender: Genders) {
  let storageNames = getNamesFromStorage(gender);
  if (storageNames) {
    return storageNames;
  }
  return initConfig.names[gender];
}

export function updateNamesAfterAddChar(gender: Genders, char: string) {
  const currentAllNames = [...getAllNames(gender)];
  // 此方法是在添加文字后触发  但是由于此方法调用的时机先于setCharsToStorage方法，因此这里拿到的chars是不包含新添加的字符的
  const allChars = getChars(gender);
  const newNames: string[] = []
  allChars.forEach(item => {
    newNames.push(firstName + item + char)
    newNames.push(firstName + char + item)
  })
  currentAllNames.push(...newNames)
  saveNamesToStorage(currentAllNames, gender)
}

export interface BaseNameData {
  name: string;
}

export interface NameDisplayData extends BaseNameData {
  selected?: boolean;
}