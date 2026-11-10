---
name: cate-ab
description: Install, run, build and use cate_Ab (Cate), a desktop IDE on an infinite zoomable canvas where editor, terminal, browser, document and AI-agent panels float spatially. Use when the user wants an infinite-canvas workspace for coding, wants to lay out editor, terminal and browser panels spatially, or mentions cate, Cate IDE or cate_Ab.
---

# cate_Ab (Cate): infinite canvas IDE

Cate is an Electron + React desktop app. Instead of tabs and stacked windows, each
project gets one infinite canvas; you spread editors (Monaco), terminals (xterm.js +
node-pty), browsers, documents (PDF/DOCX/images) and an AI agent panel (Pi) across it,
dock them into tabs/splits, or detach them into their own OS windows. Opening a folder
makes it a workspace; layout, panel positions and terminals are restored next time.

cate_Ab is a fork of the MIT-licensed upstream `0-AI-UG/cate`. It adds embedded-service
panels (n8n, FloWise, Rivet, AutoGen Studio, Open WebUI, AnythingLLM, browser automation).

## Prerequisites (build from source)

- Node.js **20 or 22** (`.nvmrc` says 20; `package.json` engines `>=20 <23`). Node 23+
  fails because `node-pty` has no prebuilds.
- npm >= 9
- Python 3 and a C++ toolchain for `node-pty`:
  - macOS: `xcode-select --install`
  - Debian/Ubuntu: `sudo apt install build-essential python3`
  - Fedora/RHEL: `sudo dnf install @development-tools gcc-c++ make python3`
  - Arch: `sudo pacman -S base-devel python`
  - Windows: Visual Studio Build Tools, "Desktop development with C++" workload
- A desktop session (it is a GUI app; it will not run headless).

Prebuilt installers exist for upstream Cate (no fork-specific panels): see the README
"Install" table. Use those if the user only wants to use Cate, not the fork.

## Install and run

```bash
git clone https://github.com/Arnav1771/cate_Ab.git
cd cate_Ab
npm install
npm run dev          # launches the Electron app with hot reload
```

Or run `scripts/setup.sh [target-dir]` from this skill folder, which checks the Node
version, clones (override the URL with `CATE_REPO=...`), installs and starts dev mode.

Other scripts in `package.json`:

| Command | What it does |
|---|---|
| `npm run build` | production build (electron-vite) into `dist/` |
| `npm run preview` | run the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest unit tests |
| `npm run test:e2e` | Playwright tests |
| `npm run package` (`:mac`, `:win`, `:linux`) | electron-builder installers into `release/` |

## Core actions

- **Open a project:** File > Open Folder (`CmdOrCtrl+O`). The folder becomes a workspace.
- **Add panels:** right-click the canvas, use the command palette (`Cmd+K`), or shortcuts:
  New Terminal `Cmd+T`, New Editor `Cmd+Shift+E`, New Browser `Cmd+Shift+B`.
  Palette entry "New Canvas..." opens a picker for the embedded-service panels.
- **Zoom/pan:** Cmd + scroll zooms (range 0.3x to 3x), two-finger scroll pans,
  right-click drag pans. Zoom in/out/reset `Cmd+=` / `Cmd+-` / `Cmd+0`,
  zoom to fit `Cmd+1`, zoom to selection `Cmd+2`. Tools: `V` select, `H` hand.
- **Navigate:** panel switcher `Ctrl+Space`, next/previous panel `Ctrl+Tab` /
  `Ctrl+Shift+Tab`, arrow keys move focus between panels, minimap `Cmd+Shift+M`.
- **Arrange:** drag panels onto the dock to build tabs and splits; auto-layout
  `Cmd+Shift+L`; palette "New Region" adds a region; undo/redo `Cmd+Z` / `Cmd+Shift+Z`.
- **Layouts:** palette "Saved Layouts…" saves and restores named layouts.
- **Close panel** `Cmd+W`, **save file** `Cmd+S`, **toggle sidebar** `Cmd+\`.

On Windows/Linux the app menu maps these to Ctrl (`CmdOrCtrl`). In-canvas defaults
are stored as Cmd bindings and can be rebound in Settings (the menu's Settings item is
`Cmd+,` on macOS).

### Embedded-service panels (fork additions)

Each shows a URL bar (click to change URL/port; remembered per panel type) and a button
that opens a terminal running the launch command. Defaults:

| Panel | Default URL | Launch command |
|---|---|---|
| n8n | http://localhost:5678 | `npx n8n` |
| FloWise | http://localhost:3000 | `npx flowise` |
| Rivet | http://localhost:3000 | `npx rivet-app` |
| AutoGen Studio | http://localhost:8081 | `autogenstudio ui --port 8081` |
| Open WebUI | http://localhost:8080 | `open-webui serve` |
| AnythingLLM | http://localhost:3001 | `npx anythingllm` |

These tools are not bundled; the user must install/run them. The launch commands are
pre-filled suggestions and are not verified here (check each tool's own docs).

## Configuration

No config files are needed. Settings, themes and shortcuts live in Cate's settings file:

```
macOS:   ~/Library/Application Support/cate/config.json
Linux:   ~/.config/cate/config.json
Windows: %APPDATA%/cate/config.json
```

Themes: use the companion `cate-theme` skill in `skills/cate-theme/` (Cate also copies
it into `~/.claude/skills/` on first launch). AI agent providers (Anthropic, OpenAI,
Gemini, OpenRouter, etc.) are connected inside the app via OAuth or API key.

## Troubleshooting

- `npm install` fails building `node-pty`: wrong Node version (use 20 or 22) or missing
  Python 3 / C++ toolchain (see prerequisites).
- macOS unsigned local build will not open: `xattr -cr /Applications/Cate.app`.
- Linux AppImage will not launch: `./Cate.AppImage --no-sandbox`; on read-only-root
  distros (Steam Deck) use the `tar.gz` build.
- WSL: needs WSLg (or another X/Wayland server) for the window to appear.
- Some git-touching unit tests fail on a dirty tree or a local branch named `main`;
  this is environmental (see `CLAUDE.md`).
- FloWise and Rivet both default to port 3000; change one panel's URL if running both.

## Limits

- Desktop GUI only; no web or headless mode.
- Terminals and file access are scoped to approved workspace folders.
- Embedded-service panels only display services you run yourself.
- Prebuilt release links in the README point to upstream Cate, not this fork.
- For anything not covered here, check the repo README and `CLAUDE.md`.
