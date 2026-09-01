# Third-Party Notices

The PPTX renderer bundles executable code from `mtx-decompressor` and a
bounded derivative of its MicroType Express decoder.

- Project: https://github.com/ChristopherVR/mtx-decompressor
- Version: 1.6.0
- License: Mozilla Public License 2.0
- Complete license text: `LICENSES/MPL-2.0.txt`
- Corresponding source: https://github.com/ChristopherVR/mtx-decompressor/tree/v1.6.0

The MPL-covered derivative adds hard per-stream, aggregate, glyph, and SFNT
allocation budgets, bounded RLE growth, and a single-pass CTF-to-SFNT pipeline.
Its complete modified TypeScript source is distributed at
`third-party/mtx-bounded-source/`. Unmodified upstream portions remain
available from the project link above.

The `.ts.txt` filenames in that directory are plain TypeScript corresponding
source with a static-host-safe suffix; see its `README.txt` for restoration and
build details.
