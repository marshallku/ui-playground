export const getColor = (key: string | number, subKey?: string | number) =>
    `--palette-${key}` + (subKey ? `-${subKey}` : "");
