#!/bin/bash

icon_path='src/icons'
constant_file='src/constants/index.ts'

echo 'const icons = [' >"$constant_file"

function convert_name {
    file_name=$(basename "$1")
    file_name_without_extension="${file_name%.*}"
    dash_replaced="${file_name_without_extension// /-}"

    echo "$dash_replaced"
}

for file in "$icon_path"/*; do
    if [ -f "$file" ]; then
        converted_name=$(convert_name "$file")
        echo "  '${converted_name}'", >>"$constant_file"
    fi
done

{
    echo '] as const;'
    echo '' >>"$constant_file"
    echo 'export default icons' >>"$constant_file"
} >>"$constant_file"

npx prettier --write "$constant_file"
