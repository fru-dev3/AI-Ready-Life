#!/usr/bin/env python3
"""
AI Ready Life — Vault Package Builder
Packages each domain vault template into a downloadable zip.

Usage:
  python3 scripts/build_vault_packages.py [domain]   # single domain
  python3 scripts/build_vault_packages.py             # all 20 domains + bundles
  python3 scripts/build_vault_packages.py --no-pdf   # skip PDF generation

Output: scripts/dist/aireadylife-{domain}.zip

Each zip contains:
  aireadylife-{domain}/
    get-started/
      QUICKSTART.md                        (from vault-demo/{domain}/QUICKSTART.md)
      PROMPTS.md                           (from vault-demo/{domain}/PROMPTS.md)
      aireadylife-{domain}-guide.pdf       (if PDF exists in scripts/dist/pdfs/)
    vault/
      config.md                            (from vault-demo/{domain}/config.md)
      00_current/.gitkeep
      01_prior/2025/.gitkeep
      01_prior/2024/.gitkeep
      01_prior/2023/.gitkeep
      02_briefs/.gitkeep

Bundles (built automatically when all domains are packaged):
  aireadylife-core.zip     — health + wealth + tax + career
  aireadylife-complete.zip — all 20 domains

PDF generation requires:
  - Node.js installed
  - Google Chrome installed
  - fd-apps-aireadyu-pdf project at ../fd-apps-aireadyu-pdf/
"""

import io
import sys
import subprocess
import zipfile
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
VAULT_DEMO = REPO_ROOT / "vault-demo"
DIST_DIR = Path(__file__).parent / "dist"
PDF_DIR = DIST_DIR / "pdfs"
PREVIEW_DIR = DIST_DIR / "previews"
PDF_GEN = REPO_ROOT.parent / "fd-apps-aireadyu-pdf"  # sibling project

CORE_DOMAINS = ["health", "wealth", "tax", "career"]

DOMAINS = [
    "health",
    "wealth",
    "tax",
    "career",
    "benefits",
    "brand",
    "business",
    "chief",
    "calendar",
    "content",
    "estate",
    "explore",
    "home",
    "insurance",
    "intel",
    "learning",
    "real-estate",
    "records",
    "social",
    "vision",
]

# Explicit folder stubs to create inside vault/ (as .gitkeep entries)
VAULT_STUBS = [
    "00_current/.gitkeep",
    "01_prior/2025/.gitkeep",
    "01_prior/2024/.gitkeep",
    "01_prior/2023/.gitkeep",
    "02_briefs/.gitkeep",
]


def generate_pdfs(targets: list[str]) -> dict[str, Path]:
    """
    Generate PDF guides for the given domains using fd-apps-aireadyu-pdf.
    Returns a dict of {domain: pdf_path} for successfully generated PDFs.
    """
    if not PDF_GEN.exists():
        print(
            f"  WARNING  PDF generator not found at {PDF_GEN} — skipping PDF generation"
        )
        print(f"           PDFs can be generated later with:")
        print(
            f"           cd {PDF_GEN} && node generate.js aireadylife-health aireadylife-wealth ..."
        )
        return {}

    PDF_DIR.mkdir(parents=True, exist_ok=True)
    slugs = [f"aireadylife-{d}" for d in targets]

    print(f"Generating {len(targets)} PDF guide(s) via fd-apps-aireadyu-pdf...")
    result = subprocess.run(
        ["node", "generate.js"] + slugs,
        cwd=str(PDF_GEN),
        capture_output=False,  # let output stream so user sees progress
        text=True,
    )
    if result.returncode != 0:
        print(
            f"  WARNING  PDF generator exited with code {result.returncode} — continuing without PDFs"
        )
        return {}

    # Collect successfully generated PDFs
    found = {}
    for domain in targets:
        pdf_path = PDF_DIR / f"aireadylife-{domain}-guide.pdf"
        if pdf_path.exists():
            found[domain] = pdf_path
        else:
            print(f"  WARNING  PDF not found for {domain} — will be omitted from zip")
    return found


def _empty_gitkeep() -> bytes:
    """Return an empty bytes object representing a .gitkeep placeholder."""
    return b""


def build_package(
    domain: str,
    pdf_path: Path | None = None,
    preview_path: Path | None = None,
) -> bool:
    """Build a vault zip for a single domain. Returns True on success."""
    domain_dir = VAULT_DEMO / domain
    if not domain_dir.exists():
        print(f"  FAIL  {domain}: vault-demo/{domain}/ not found — skipping")
        return False

    zip_name = f"aireadylife-{domain}.zip"
    zip_path = DIST_DIR / zip_name
    zip_root = f"aireadylife-{domain}"

    # Source files
    # config.md comes from the blank template in {domain}/vault/config.md
    # QUICKSTART and PROMPTS come from vault-demo (demo context, correct instructions)
    domain_vault_template = REPO_ROOT / domain / "vault" / "config.md"
    sources = {
        "config.md": (
            domain_vault_template
            if domain_vault_template.exists()
            else domain_dir / "config.md"
        ),
        "QUICKSTART.md": domain_dir / "QUICKSTART.md",
        "PROMPTS.md": domain_dir / "PROMPTS.md",
    }
    missing = [name for name, path in sources.items() if not path.exists()]
    if missing:
        print(f"  WARNING  {domain}: missing {', '.join(missing)} — packaging anyway")

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        # --- get-started/ ---
        # QUICKSTART.md
        qs_path = sources["QUICKSTART.md"]
        if qs_path.exists():
            zf.write(qs_path, f"{zip_root}/get-started/QUICKSTART.md")

        # PROMPTS.md
        pr_path = sources["PROMPTS.md"]
        if pr_path.exists():
            zf.write(pr_path, f"{zip_root}/get-started/PROMPTS.md")

        # Preview PDF (teaser/welcome doc — generated by generate-aireadylife-preview.js)
        if preview_path and preview_path.exists():
            zf.write(
                preview_path, f"{zip_root}/get-started/aireadylife-{domain}-preview.pdf"
            )

        # Main guide PDF (full reference — generated by generate.js)
        if pdf_path and pdf_path.exists():
            zf.write(pdf_path, f"{zip_root}/get-started/aireadylife-{domain}-guide.pdf")

        # --- vault/{domain}/ ---
        # config.md nested under domain subfolder so structure matches bundles
        cfg_path = sources["config.md"]
        if cfg_path.exists():
            zf.write(cfg_path, f"{zip_root}/vault/{domain}/config.md")

        # Explicit folder stubs — no rglob scanning
        for stub in VAULT_STUBS:
            arcname = f"{zip_root}/vault/{domain}/{stub}"
            zf.writestr(arcname, "")

    size_kb = zip_path.stat().st_size / 1024
    notes = []
    if pdf_path and pdf_path.exists():
        notes.append("guide PDF")
    if preview_path and preview_path.exists():
        notes.append("preview PDF")
    note_str = f" + {', '.join(notes)}" if notes else ""
    print(f"  OK  {domain}: {zip_name} ({size_kb:.1f} KB){note_str}")
    return True


def build_bundle(name: str, domains: list[str]) -> bool:
    """
    Build a unified bundle zip with a single vault/ folder containing all domains.

    Structure:
      aireadylife-{name}/
        get-started/
          QUICKSTART.md
          PROMPTS.md
        vault/
          {domain}/
            config.md
            00_current/.gitkeep
            01_prior/2025/.gitkeep
            ...
            02_briefs/.gitkeep

    Returns True on success.
    """
    bundle_demo = VAULT_DEMO / name
    qs_path = bundle_demo / "QUICKSTART.md"
    pr_path = bundle_demo / "PROMPTS.md"

    if not bundle_demo.exists():
        print(f"  FAIL  {name}: vault-demo/{name}/ not found — skipping bundle")
        return False

    bundle_path = DIST_DIR / f"aireadylife-{name}.zip"
    zip_root = f"aireadylife-{name}"

    with zipfile.ZipFile(bundle_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        # get-started/
        if qs_path.exists():
            zf.write(qs_path, f"{zip_root}/get-started/QUICKSTART.md")
        if pr_path.exists():
            zf.write(pr_path, f"{zip_root}/get-started/PROMPTS.md")

        # vault/{domain}/ — config.md + folder stubs for each domain
        for domain in domains:
            domain_vault_template = REPO_ROOT / domain / "vault" / "config.md"
            cfg_path = (
                domain_vault_template
                if domain_vault_template.exists()
                else VAULT_DEMO / domain / "config.md"
            )
            if cfg_path.exists():
                zf.write(cfg_path, f"{zip_root}/vault/{domain}/config.md")
            else:
                print(f"  WARNING  {name}: no config.md for {domain} — omitted")

            for stub in VAULT_STUBS:
                zf.writestr(f"{zip_root}/vault/{domain}/{stub}", "")

    size_kb = bundle_path.stat().st_size / 1024
    print(
        f"  OK  {name}: aireadylife-{name}.zip ({size_kb:.1f} KB) [{len(domains)} domains]"
    )
    return True


def main():
    DIST_DIR.mkdir(parents=True, exist_ok=True)

    args = sys.argv[1:]
    skip_pdf = "--no-pdf" in args
    args = [a for a in args if a != "--no-pdf"]

    if args:
        invalid = [d for d in args if d not in DOMAINS]
        if invalid:
            print(f"FAIL  Unknown domain(s): {', '.join(invalid)}")
            print(f"      Valid domains: {', '.join(DOMAINS)}")
            sys.exit(1)
        targets = args
    else:
        targets = DOMAINS

    print(f"AI Ready Life — Vault Package Builder")
    print(f"    Source:  {VAULT_DEMO}")
    print(f"    Output:  {DIST_DIR}")
    print(f"    Domains: {len(targets)}\n")

    # Step 1: Generate PDFs (or pick up pre-existing ones from dist/pdfs/)
    pdf_map: dict[str, Path] = {}
    if not skip_pdf:
        pdf_map = generate_pdfs(targets)
        print()

    # Always pick up any pre-existing PDFs not covered by generation
    for domain in targets:
        if domain not in pdf_map:
            existing = PDF_DIR / f"aireadylife-{domain}-guide.pdf"
            if existing.exists():
                pdf_map[domain] = existing

    # Pick up pre-existing preview PDFs from dist/previews/
    preview_map: dict[str, Path] = {}
    for domain in targets:
        preview = PREVIEW_DIR / f"aireadylife-{domain}-preview.pdf"
        if preview.exists():
            preview_map[domain] = preview

    # Step 2: Package individual domain zips
    print(f"Packaging vault zips...")
    success, failed = [], []
    for domain in targets:
        ok = build_package(
            domain,
            pdf_path=pdf_map.get(domain),
            preview_path=preview_map.get(domain),
        )
        (success if ok else failed).append(domain)

    # Step 3: Build bundles (only when packaging all domains)
    bundle_success = []
    if not args:  # full run, not a single-domain call
        print(f"\nBuilding bundles...")
        bundles = [
            ("core", CORE_DOMAINS),
            ("complete", DOMAINS),
        ]
        for bundle_name, bundle_domains in bundles:
            ok = build_bundle(bundle_name, bundle_domains)
            if ok:
                bundle_success.append(bundle_name)

    print(f"\n{'─' * 60}")
    print("SUMMARY")
    print("─" * 60)
    print(f"  Built:    {len(success)}")
    print(f"  Failed:   {len(failed)}")
    print(f"  Bundles:  {len(bundle_success)}")
    print(f"  Guides:   {len(pdf_map)}/{len(targets)}")
    print(f"  Previews: {len(preview_map)}/{len(targets)}")

    if success:
        print(f"\n  Output -> {DIST_DIR}")
        for domain in success:
            zip_path = DIST_DIR / f"aireadylife-{domain}.zip"
            size_kb = zip_path.stat().st_size / 1024
            print(f"    {f'aireadylife-{domain}.zip':<40} {size_kb:>6.1f} KB")
        for bundle_name in bundle_success:
            zip_path = DIST_DIR / f"aireadylife-{bundle_name}.zip"
            size_kb = zip_path.stat().st_size / 1024
            print(
                f"    {f'aireadylife-{bundle_name}.zip':<40} {size_kb:>6.1f} KB  [bundle]"
            )

    if failed:
        print(f"\n  Failed: {', '.join(failed)}")

    print(f"\n  Next step: python3 scripts/upload_to_gumroad.py")


if __name__ == "__main__":
    main()
