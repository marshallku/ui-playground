import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

const POST_PATH = "posts";

/**
 * Get metadata and content from given markdown string
 *
 * @param {string} fileName
 * @param {string} fileContent
 */
const parseContentAndMetadata = (fileName, fileContent) => {
    const [, metaDataContent, rawContent] = fileContent.split("---");

    if (!metaDataContent) {
        throw new Error(`Invalid file: ${fileName}`);
    }

    return {
        metaData: Object.fromEntries(
            metaDataContent
                .split("\n")
                .filter(Boolean)
                .map((line) => {
                    const [key, ...value] = line.split(":");
                    return [key.trim(), value.join(":").trim()];
                }),
        ),
        // Remove leading line break characters
        content: rawContent.trim(),
    };
};

const parseMarkdown = (fileName) => {
    const content = readFileSync(resolve(POST_PATH, fileName), "utf8");

    return {
        fileName,
        ...parseContentAndMetadata(fileName, content),
    };
};

const files = readdirSync(resolve(POST_PATH)).map(parseMarkdown);

console.log(files);
