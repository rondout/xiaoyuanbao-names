const { writeFile } = require("fs/promises");
const path = require("path");

const girlChars = ["莹", "雪", "琳", "晗", "涵", "琴", "晴", "丽", "美", "瑶", "梦",
    "茜", "倩", "希", "夕", "梅", "月", "悦", "乐", "彤", "珍", "依", "沫", "玉", "灵",
    "婷", "菲", "萱", "欣", "薇", "佳", "可", "芳", "芬", "慧", "俊", "盈", "慈", "璇",
    "妍", "若", "娅", "清", "舒", "映", "蓉", "长", "英", "文", "燕", "星", "善", "玲",
    "宇", "铭", "子", "筱", "旭", "怡", "莉", "颖", "芝", "艳", "榕", "嫣", "晓", "秀",
    "青", "羽", "洁", "雨", "胜", "红", "道", "辰", "贞", "琼", "昱", "瑛", "祖", "萍",
    "瑞", "娟", "国", "娜", "臣", "儿", "璐", "家", "格", "洋", "玟", "心", "瑄", "景",
    "羡", "冉", "晨", "宗", "研", "艾", "金", "育", "歆", "永", "君", "新", "霞", "芮",
    "淇", "方", "敏"
]
const boyChars = ["飞", "川", "勇", "刚", "间"];

enum Genders {
    BOY = "BOY",
    GIRL = "GIRL"
}

class NamesFactory {
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
        if (this.gender === Genders.BOY) {
            return boyChars;
        }
        return girlChars;
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

const configJsonPath = path.resolve(__dirname, "../src/models/config.json")

const boyNames = new NamesFactory(Genders.BOY).names
const girlNames = new NamesFactory(Genders.GIRL).names

const saveConfigToJson = async () => {
    const data = {
        names: {
            [Genders.GIRL]: girlNames,
            [Genders.BOY]: boyNames
        },
        chars: {
            [Genders.GIRL]: girlChars,
            [Genders.BOY]: boyChars
        }
    }
    await writeFile(configJsonPath, JSON.stringify(data))
}

saveConfigToJson()

