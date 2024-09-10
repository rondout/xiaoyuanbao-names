/*
 * @Author: shufei.han
 * @Date: 2024-09-09 17:16:59
 * @LastEditors: shufei.han
 * @LastEditTime: 2024-09-10 12:09:33
 * @FilePath: \xiaoyuanbao-names\src\models\name.model.ts
 * @Description:
 */
export enum Genders {
  BOY = "BOY",
  GIRL = "GIRL",
}

export const girlChars = ["莹", "雪", "琳", "晗", "涵", "琴", "晴", "丽", "美", "瑶", "梦",
  "茜", "倩", "希", "夕", "梅", "月", "悦", "乐", "彤", "珍", "依", "沫", "玉", "灵",
  "婷", "菲", "萱", "欣", "薇", "佳", "可", "芳", "芬", "慧", "俊", "盈", "慈", "璇",
  "妍", "若", "娅", "清", "舒", "映", "蓉", "长", "英", "文", "燕", "星", "善", "玲",
  "宇", "铭", "子", "筱", "旭", "怡", "莉", "颖", "芝", "艳", "榕", "嫣", "晓", "秀",
  "青", "羽", "洁", "雨", "胜", "红", "道", "辰", "贞", "琼", "昱", "瑛", "祖", "萍",
  "瑞", "娟", "国", "娜", "臣", "儿", "璐", "家", "格", "洋", "玟", "心", "瑄", "景",
  "羡", "冉", "晨", "宗", "研", "艾", "金", "育", "歆", "永", "君", "新", "霞", "芮",
  "淇", "方", "敏"
]
export const boyChars = ["飞", "川", "勇", "刚", "间"];

export const GenderTextMap = new Map<Genders, string>([
  [Genders.BOY, "皮夹克"],
  [Genders.GIRL, "小棉袄"],
]);

export const CharsMap = new Map<Genders, string[]>([
  [Genders.BOY, boyChars],
  [Genders.GIRL, girlChars],
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

export const saveNamesToStorage = (names: string[], gender: Genders) => {
  localStorage.setItem(NameStorageKeyMap.get(gender), JSON.stringify(names));
};

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

export const saveSelectedNames = (names: string[], gender: Genders) => {
  localStorage.setItem(SelectedNameKeyMap.get(gender), JSON.stringify(names));
};

export const getChars = (gender: Genders): string[] => {
  const storageChars = localStorage.getItem(CHAR_STORAGE_KEY_MAP.get(gender));
  return storageChars ? JSON.parse(storageChars) : CharsMap.get(gender);
};

export const setCharsToStorage = (chars: string[], gender: Genders) => {
  localStorage.setItem(CHAR_STORAGE_KEY_MAP.get(gender), JSON.stringify(chars));
};

export class NamesFactory {
  public names: string[] = [];
  public twoCharNames: string[] = [];

  static getRandomInteger(min: number, max: number): number {
    // 确保 min 不大于 max
    min = Math.ceil(min);
    max = Math.floor(max);

    // 返回一个在 [min, max] 范围内的随机整数
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private get chars() {
    return getChars(this.gender);
  }

  constructor(private gender = Genders.GIRL, public firstName: string = "韩") {
    this.genNames();
  }

  private get charsLength() {
    return this.chars.length;
  }

  private get maxTwoCharNameCount() {
    return this.charsLength * this.charsLength;
  }

  private getSingleName() {
    const char1 = NamesFactory.getRandomInteger(0, this.chars.length - 1);
    const char2 = NamesFactory.getRandomInteger(0, this.chars.length - 1);
    const name = this.firstName + this.chars[char1] + this.chars[char2];
    return name;
  }

  public genNames(): string[] {
    const names: string[] = [];
    while (names.length < this.maxTwoCharNameCount) {
      const name = this.getSingleName();
      if (!names.includes(name)) {
        names.push(name);
      }
    }
    this.names = names;
    // localStorage.setItem(NAME_STORAGE_KEY, JSON.stringify(names));
    saveNamesToStorage(names, this.gender);
    return names;
  }

  public async gen2CharNames() {
    const names: string[] = [];
    for (let i = 0; i < this.charsLength; i++) {
      names.push(this.firstName + this.chars[i]);
      if ((i + 1) % 20 === 0) {
        names.push("\n");
      }
    }
    this.twoCharNames = names;
  }
}

export function getAllNames(gender: Genders) {
  let storageNames = getNamesFromStorage(gender);
  if (storageNames) {
    return storageNames;
  }
  return new NamesFactory(gender).names;
}


export interface NameDisplayData {
  name: string;
  selected?: boolean;
}