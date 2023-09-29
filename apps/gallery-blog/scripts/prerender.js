import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

const POST_PATH = "posts";

const generateFile = (fileName) => {
    const content = readFileSync(resolve(fileName), "utf8");

    console.log(content);
};

const files = readdirSync(resolve(POST_PATH));

for (let i = 0, max = files.length; i < max; ++i) {
    generateFile(`${POST_PATH}/${files[i]}`);
}
