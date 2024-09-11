const { writeFile } = require("fs/promises");
const path = require("path");

const girlChars = ["莹", "雪", "琳", "晗", "涵", "晴", "丽", "美", "瑶", "梦",
    "茜", "倩", "希", "夕", "梅", "月", "悦", "乐", "彤", "珍", "依", "沫", "灵",
    "婷", "菲", "萱", "欣", "薇", "佳", "可", "慧", "盈", "璇", "妍", "若", "娅", "清",
    "舒", "映", "文", "善", "玲", "宇", "筱", "怡", "颖", "榕", "嫣", "晓", "青",
    "羽", "洁", "雨", "贞", "昱", "瑛", "祖", "瑞", "儿", "璐", "家", "洋", "玟", "心",
    "瑄", "景", "羡", "冉", "晨", "研", "艾", "歆", "君", "新", "芮", "淇", "敏"
]
const boyChars = ["明", "辰", "勇", "健", "峰", "泽", "涛", "臣", "浩", "宇", "晨",
    "晴", "阳", "昭", "辉", "烁", "炜", "灿", "炎", "鑫", "森", "瑞", "俊", "逸",
    "岳", "晟", "润", "楠", "智", "超", "博", "哲", "聪", "铭", "琛", "涵", "龙",
    "雄", "景", "诚", "晓", "朗", "洋", "瀚", "航", "杰", "柏", "毅", "力", "天",
    "志", "维", "立", "达", "远", "康", "乐", "海", "江", "河", "清", "云", "风",
    "雨", "晶", "磊", "石", "岩", "峻", "崇", "山", "旭", "岚", "永",
]


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

console.log("开始生成名字");

const boyNames = new NamesFactory(Genders.BOY).names
console.log("boyNames: ", boyNames);

const girlNames = new NamesFactory(Genders.GIRL).names
console.log("girlNames: ", girlNames);

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

