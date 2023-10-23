#!/bin/bash

declare -A arr

while IFS= read -r line; do
    if [[ $line == apps/* ]] || [[ $line == packages/* ]]; then
        IFS='/' read -ra ADDR <<<"$line"
        path="${ADDR[0]}/${ADDR[1]}"
        arr[$path]=1
    fi
done < <(git diff --name-only --diff-filter=duxb "origin/$BASE" "origin/$HEAD" | grep -E '\.((j|t)sx?)$')

for key in "${!arr[@]}"; do
    package_file="$key/package.json"

    if [[ ! -f "$package_file" ]]; then
        continue
    fi

    if grep -q '"build": ' "$package_file"; then
        package_name=$(grep -oP '"name"\s*:\s*"\K[^"]*' "$package_file")

        pnpm run build --filter="$package_name" || exit 1
    fi

    if grep -q '"test": ' "$package_file"; then
        package_name=$(grep -oP '"name"\s*:\s*"\K[^"]*' "$package_file")

        pnpm run test --filter="$package_name" || exit 1
    fi
done
