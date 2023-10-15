#!/bin/bash

. scripts/utils/confirm.sh

folders=$(ls -d -- apps/* packages/*)
target=$(echo "$folders" | fzf)
current_directory="$PWD"

cd "$target" || exit 1

packages=$(pnpm outdated)
package_name=$(sed -n 's/.*"name": "\(.*\)",/\1/p' package.json)
IFS=$'\n'
mapfile -t lines <<<"$packages"
regex="│ (\S+)(.*)? │ +([0-9\.]+) +│ +([0-9\.]+) +│"

cmd='pnpm i '

for ((i = 0; i < ${#lines[@]}; i++)); do
    line=${lines[$i]}

    if [[ $line =~ $regex ]]; then
        package="${BASH_REMATCH[1]}"
        current_version="${BASH_REMATCH[3]}"
        update_version="${BASH_REMATCH[4]}"

        confirm "Will you update $package from $current_version to $update_version?" && cmd+="$package@$update_version "

    fi
done

if [[ "$cmd" == 'pnpm i ' ]]; then
    echo 'Packages are up to date, installation step is skipped'
    exit 0
fi

cd "$current_directory" || exit 1
eval "$cmd --filter $package_name"

if confirm "Commit changes?"; then
    git add "$target/package.json" pnpm-lock.yaml
    git commit -m 'Update packages'
fi
