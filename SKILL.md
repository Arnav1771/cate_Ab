---
name: cate-ab
description: Install, run, build and use cate_Ab (Cate), a desktop IDE on an infinite zoomable canvas where editor, terminal, browser, document and AI-agent panels float spatially. Use when the user wants an infinite-canvas workspace for coding, wants to lay out editor, terminal and browser panels spatially, or mentions cate, Cate IDE or cate_Ab.
---

# cate_Ab (Cate): infinite canvas IDE

Cate is an Electron + React desktop app. Instead of tabs and stacked windows, each
project gets one infinite canvas. You spread editors (Monaco), terminals (xterm.js +
node-pty), browsers, documents (PDF/DOCX/images) and an AI agent panel across it, dock
them into tabs and splits, or detach them into their own OS windows. Opening a folder
makes it a workspace; layout, panel positions and terminals are restored next time.

cate_Ab is a fork of the MIT-licensed [0-AI-UG/cate](https://github.com/0-AI-UG/cate).
It adds embedded-service panels (n8n, FloWise, Rivet, AutoGen Studio, Open WebUI,
AnythingLLM). The fork's app source lives on the `app` branch of
`Arnav1771/cate_Ab`; this skill only contains the instructions and a setup script.

## Prerequisites (build from source)

- Node.js **20 or 22**. Node 23+ fails because `node-pty` has no prebuilds.
- npm 9 or newer.
- Python 3 and a C++ toolchain for `node-pty`:
  - macOS: `xcode-select --install`
  - Debian/Ubuntu: `sudo apt install build-essential python3`
  - Fedora/RHEL: `sudo dnf install @development-tools gcc-c++ make python3`
  - Arch: `sudo pacman -S base-devel python`
  - Windows: Visual Studio Build Tools with the "Desktop development with C++" workload
- A desktop session. It is a GUI app and will not run headless.

If the user only wants plain Cate without the fork's extra panels, point them to the
installers on the upstream releases page: https://github.com/0-AI-UG/cate/releases

## Install and run

Run `scripts/setup.sh [target-dir]` from this skill folder. It checks the Node version,
clones the fork's `app` branch, runs `npm install` and starts dev mode. Override the
source with `CATE_REPO=<url>` and `CATE_BRANCH=<branch>`.

By hand:

```bash
git clone -b app https://github.com/Arnav1771/cate_Ab.git
cd cate_Ab
npm install
npm run dev          # launches the Electron app with hot reload
```

Other scripts in the app's `package.json`:

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
- **Add panels:** right-click the canvas, use the command palette (`Cmd+K`), or the
  shortcuts New Terminal `Cmd+T`, New Editor `Cmd+Shift+E`, New Browser `Cmd+Shift+B`.
  The palette entry "New Canvas..." opens a picker for the embedded-service panels.
- **Zoom and pan:** Cmd + scroll zooms (0.3x to 3x), two-finger scroll pans,
  right-click drag pans. Zoom in, out and reset with `Cmd+=`, `Cmd+-`, `Cmd+0`;
  zoom to fit `Cmd+1`; zoom to selection `Cmd+2`. Tools: `V` select, `H` hand.
- **Navigate:** panel switcher `Ctrl+Space`, next and previous panel `Ctrl+Tab` and
  `Ctrl+Shift+Tab`, arrow keys move focus between panels, minimap `Cmd+Shift+M`.
- **Arrange:** drag panels onto the dock to build tabs and splits; auto-layout
  `Cmd+Shift+L`; the palette's "New Region" adds a region; undo and redo `Cmd+Z` and
  `Cmd+Shift+Z`.
- **Layouts:** the palette's "Saved Layouts…" saves and restores named layouts.
- **Close a panel** `Cmd+W`, **save a file** `Cmd+S`, **toggle the sidebar** `Cmd+\`.

On Windows and Linux the menus use Ctrl instead of Cmd. Every shortcut can be rebound in
Settings (`Cmd+,` on macOS).

### Embedded-service panels (fork additions)

Each panel has a URL bar (click to change the URL or port; it is remembered per panel
type) and a button that opens a terminal running the launch command. Defaults:

| Panel | Default URL | Launch command |
|---|---|---|
| n8n | http://localhost:5678 | `npx n8n` |
| FloWise | http://localhost:3000 | `npx flowise` |
| Rivet | http://localhost:3000 | `npx rivet-app` |
| AutoGen Studio | http://localhost:8081 | `autogenstudio ui --port 8081` |
| Open WebUI | http://localhost:8080 | `open-webui serve` |
| AnythingLLM | http://localhost:3001 | `npx anythingllm` |

These tools are not bundled; the user installs and runs them. The launch commands are
suggestions, so check each tool's own docs. FloWise and Rivet both default to port 3000:
change one panel's URL if both run at once.

## Configuration

No config files are needed. Settings, themes and shortcuts live in Cate's settings file:

```
macOS:   ~/Library/Application Support/cate/config.json
Linux:   ~/.config/cate/config.json
Windows: %APPDATA%/cate/config.json
```

Cate installs its own `cate-theme` skill on first launch for making themes. AI agent
providers are connected inside the app with OAuth or an API key.

## Troubleshooting

- `npm install` fails building `node-pty`: wrong Node version (use 20 or 22), or Python 3
  or the C++ toolchain is missing (see Prerequisites).
- An unsigned local macOS build will not open: `xattr -cr /Applications/Cate.app`.
- The Linux AppImage will not launch: `./Cate.AppImage --no-sandbox`. On read-only-root
  systems such as Steam Deck, use the `tar.gz` build.
- WSL needs WSLg (or another X or Wayland server) for the window to appear.

## Limits

- Desktop GUI only; there is no web or headless mode.
- Terminals and file access are limited to workspace folders you approve.
- Embedded-service panels only show services you run yourself.
- Upstream release installers do not include the fork's extra panels.
