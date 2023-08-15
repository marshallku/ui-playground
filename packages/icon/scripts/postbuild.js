import { writeFileSync } from "fs";
import icons from "../dist/icons.json" assert { type: "json" };

writeFileSync(
    "./dist/constants.ts",
    `const icons = [
    ${Object.keys(icons)
        .map((key) => `'${key}'`)
        .join(",\n    ")},
] as const;

export default icons;`,
    "utf-8",
);
