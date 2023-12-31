#!/bin/bash

read -rp 'Name of component: ' name
# Capitalize first letter
component_name="$(tr '[:lower:]' '[:upper:]' <<<"${name:0:1}")${name:1}"
styled_name=$(echo "$component_name" | perl -pe 's/([a-z0-9])([A-Z])/$1-\L$2/g' | perl -ne 'print lc')

story_dir='apps/docs/stories'
ui_dir='packages/ui/src/components'
component_dir="$ui_dir/$component_name"

mkdir "$component_dir"
printf ".%s {\n}" "$styled_name" >>"$component_dir/index.module.scss"
echo "import { classNames } from \"@marshallku/utils\";
import styles from \"./index.module.scss\";

export interface ${component_name}Props {}

const cx = classNames(styles, \"$styled_name\");

function $component_name({}: ${component_name}Props) {}

export default $component_name;" >>"$component_dir/index.tsx"
echo "import { $component_name, ${component_name}Props } from \"@ui\";
import { Meta, StoryObj } from \"@storybook/react\";

const story: Meta<${component_name}Props> = {
    component: $component_name,
    title: \"Components/$component_name\",
    parameters: {
        docs: {
            description: {
                component: \"ADD_YOUR_DESCRIPTION\",
            },
        },
    },
};

export default story;

export const Default: StoryObj<${component_name}Props> = {
    args: {},
};" >>"$story_dir/$component_name.stories.tsx"

next_component=$(find "$ui_dir" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort | awk -v specific="$component_name" '{if (p) {print; exit 0}; if ($0 == specific) p=1}')
echo "$next_component"
regex="export \* from \"./$next_component\";"
export_all="export * from \"./$component_name\";"
export_default="export { default as $component_name } from \"./$component_name\";"
barrel_file="$ui_dir/index.ts"

if grep -q "$regex" "$barrel_file"; then
    sed -i "s#${regex}#${export_all}\n${export_default}\n${regex}#g" "$barrel_file"
else
    printf "%s\n%s\n" "$export_all" "$export_default" >>"$barrel_file"
fi
