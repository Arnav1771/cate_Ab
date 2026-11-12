# cate-ab skill

An agent skill for installing, running and using **cate_Ab (Cate)**, a desktop IDE on an
infinite zoomable canvas where editor, terminal, browser, document and AI-agent panels
float side by side.

This repository holds the skill only:

```
SKILL.md          instructions the agent reads (name and trigger in the frontmatter)
manifest.yaml     catalog metadata (categories, tags, compatibility)
scripts/setup.sh  clones the app, checks Node, installs and starts dev mode
```

## Install the skill

Download this repository as a zip and unpack it into your agent's skills folder as
`cate-ab/`. For example, for Claude Code:

```bash
mkdir -p ~/.claude/skills
rm -rf /tmp/cate-ab-zip && unzip -q cate_Ab-*.zip -d /tmp/cate-ab-zip
mv /tmp/cate-ab-zip/*/ ~/.claude/skills/cate-ab
```

Then ask your agent to "set up Cate" or "open my project in Cate".

## Where the app lives

The app's source code (the fork with embedded n8n, FloWise, Rivet, AutoGen Studio,
Open WebUI and AnythingLLM panels) is on the `app` branch of this repository.
`scripts/setup.sh` clones that branch.

## Credits

Cate is made by [0-AI UG](https://github.com/0-AI-UG/cate) and released under the MIT
licence. cate_Ab is a fork of it. This skill is written by Arnav Bhargava and is also MIT
licensed (see `LICENSE`).
