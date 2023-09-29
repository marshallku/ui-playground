import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

const POST_PATH = "posts";

/**
 * Get metadata and content from given markdown string
 */
const parseContentAndMetadata = (fileName: string, fileContent: string) => {
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

const parseMarkdown = (fileName: string) => {
    const content = readFileSync(resolve(POST_PATH, fileName), "utf8");

    return {
        fileName,
        ...parseContentAndMetadata(fileName, content),
    };
};

const files = readdirSync(resolve(POST_PATH))
    .map(parseMarkdown)
    .sort((a, b) => {
        const aDate = new Date(a.metaData.date).getTime();
        const bDate = new Date(b.metaData.date).getTime();

        if (aDate < bDate) {
            return 1;
        }

        if (bDate < aDate) {
            return -1;
        }

        return 0;
    });

console.log(files);
