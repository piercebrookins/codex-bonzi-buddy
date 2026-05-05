# codex-bonzi-buddy

<p align="center">
  <img src="runs/bonzex/frames/idle/00.png" alt="Bonzex Codex Bonzi Buddy pet" width="180">
</p>

Bonzex is a Bonzi Buddy-inspired custom pet for Codex. It is packaged in the Codex custom pet format with a 9-row animated spritesheet and `pet.json` manifest.

## Install

Copy the packaged pet folder into your Codex pets directory:

```bash
mkdir -p ~/.codex/pets
cp -R pets/bonzex ~/.codex/pets/bonzex
```

Then open Codex and go to:

```text
Settings -> Appearance -> Refresh
```

Bonzex should appear under custom pets.

## Repo contents

- `pets/bonzex/` - installable Codex custom pet package
- `runs/bonzex/final/` - generated final spritesheet and validation output
- `runs/bonzex/qa/` - contact sheet, review data, and animation preview videos
- `runs/bonzex/prompts/` - prompts used to hatch the pet
- `assets/bonzi.png` - source reference image copied from `7coil/BonziBuddy`
- `index.html`, `styles.css`, `script.js` - small browser preview/toy created before the Codex pet package

## Validation

The final hatch-pet validation passed with no errors or warnings:

- Atlas: `1536x1872`
- Cell size: `192x208`
- Format: `WEBP`
- Mode: `RGBA`
- Rows: `idle`, `running-right`, `running-left`, `waving`, `jumping`, `failed`, `waiting`, `running`, `review`

Review the contact sheet here:

```text
runs/bonzex/qa/contact-sheet.png
```

## Attribution

The Bonzi reference sprite in `assets/bonzi.png` came from the archived MIT-licensed repository:

https://github.com/7coil/BonziBuddy

Bonzex is an original generated Codex pet inspired by that reference.
