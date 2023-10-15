#!/bin/bash

git_status=$([[ -n $(git status --porcelain) ]] && echo "true" || echo "false")
echo "$git_status"
