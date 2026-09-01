MicroType Express bounded decoder corresponding source

These files are the complete TypeScript source corresponding to the modified
MPL-2.0 decoder code bundled in this offline demo. The extra .txt suffix keeps
static hosts from assigning an executable JavaScript MIME type; remove only
that final suffix to recover the original .ts filenames.

Upstream project: https://github.com/ChristopherVR/mtx-decompressor/tree/v1.6.0
Upstream version: 1.6.0
License: Mozilla Public License 2.0
License text: ../../LICENSES/MPL-2.0.txt

Local changes add hard allocation budgets, bounded RLE expansion, a single-pass
CTF-to-SFNT pipeline, and validation before attacker-controlled allocations.
