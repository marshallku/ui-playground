import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

const POST_PATH = "posts";

/**
 * Get meta data from given markdown string
 *
 * @param {string} fileName
 * @param {string} content
 */
const getMetaDataFromMarkdown = (fileName, content) => {
    const [, metaDataContent] = content.split("---");

    if (!metaDataContent) {
        throw new Error(`Invalid file: ${fileName}`);
    }

    return Object.fromEntries(
        metaDataContent
            .split("\n")
            .filter(Boolean)
            .map((line) => {
                const [key, ...value] = line.split(":");
                return [key.trim(), value.join(":").trim()];
            }),
    );
};

const generateFile = (fileName) => {
    const content = readFileSync(resolve(fileName), "utf8");

    console.log(fileName, getMetaDataFromMarkdown(fileName, content));
};

const files = readdirSync(resolve(POST_PATH));

for (let i = 0, max = files.length; i < max; ++i) {
    generateFile(`${POST_PATH}/${files[i]}`);
}
