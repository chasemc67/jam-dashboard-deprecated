#!/bin/bash

separator="\n\n// --- SEPARATOR ---\n\n"

find ./src/components -type f | while read file; do
    echo -e "// FILE: $file"
    cat "$file"
    echo -e "$separator"
done

find ./src/utils -type f | while read file; do
    echo -e "// FILE: $file"
    cat "$file"
    echo -e "$separator"
done
