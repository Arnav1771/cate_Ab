#!/usr/bin/env bash
# Clone, install and start cate_Ab in dev mode. Usage: setup.sh [target-dir]
set -euo pipefail

REPO="${CATE_REPO:-https://github.com/Arnav1771/cate_Ab.git}"
DIR="${1:-cate_Ab}"

command -v node >/dev/null || { echo "Node.js 20 or 22 is required" >&2; exit 1; }
major="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$major" -lt 20 ] || [ "$major" -gt 22 ]; then
  echo "Node $major found; cate needs Node 20 or 22 (node-pty breaks on 23+)" >&2
  exit 1
fi

[ -d "$DIR/.git" ] || git clone "$REPO" "$DIR"
cd "$DIR"
npm install
exec npm run dev
