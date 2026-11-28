#!/usr/bin/env bash
#
# bump-version.sh: keep every manifest on one version.
#
# Usage:
#   scripts/bump-version.sh <new-version>   Set the version in every file listed in .version-bump.json
#   scripts/bump-version.sh --check         Print each version and exit 1 if they differ
#
# Needs jq. CHANGELOG.md is not touched: add its entry by hand.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CONFIG="$REPO_ROOT/.version-bump.json"

command -v jq >/dev/null 2>&1 || { echo "error: jq is not on PATH" >&2; exit 1; }
[[ -f "$CONFIG" ]] || { echo "error: $CONFIG not found" >&2; exit 1; }

# "plugins.0.version" -> .plugins[0].version
jq_path() { echo ".$1" | sed -E 's/\.([0-9]+)/[\1]/g'; }

check() {
  local first="" drift=0 path field v
  while IFS=$'\t' read -r path field; do
    v=$(jq -r "$(jq_path "$field")" "$REPO_ROOT/$path")
    printf '%-40s %s\n' "$path" "$v"
    [[ -z "$first" ]] && first="$v"
    [[ "$v" != "$first" ]] && drift=1
  done < <(jq -r '.files[] | [.path, .field] | @tsv' "$CONFIG")
  if [[ $drift -eq 1 ]]; then echo "drift: versions differ" >&2; return 1; fi
}

case "${1:-}" in
  ""|-h|--help) sed -n '3,10p' "$0"; exit 0 ;;
  --check) check; exit $? ;;
  *)
    new="$1"
    [[ "$new" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "error: version must look like 1.2.3" >&2; exit 1; }
    while IFS=$'\t' read -r path field; do
      file="$REPO_ROOT/$path"
      # Edit the text in place so jq does not reformat the file.
      [[ "$(grep -c '"version":' "$file")" -eq 1 ]] || { echo "error: $path must have exactly one \"version\" key" >&2; exit 1; }
      sed -E -i.bak "s/(\"version\": *\")[^\"]*(\")/\1$new\2/" "$file" && rm "$file.bak"
    done < <(jq -r '.files[] | [.path, .field] | @tsv' "$CONFIG")
    check
    ;;
esac
