#!/usr/bin/env python3
"""
AI Ready Life — Vault Package Builder
Packages each domain vault template into a downloadable zip.

Usage:
  python3 scripts/build_vault_packages.py [domain]   # single domain
  python3 scripts/build_vault_packages.py             # all 20 domains
  python3 scripts/build_vault_packages.py --no-pdf   # skip PDF generation

Output: scripts/dist/aireadylife-{domain}-vault.zip

Each zip contains:
  aireadylife-{domain}-vault/
    aireadylife-{domain}-guide.pdf   (beautifully formatted prompt guide)
    profile.md                        (Alex Rivera persona — from vault-demo/profile.md)
    config.md                         (blank template for user to fill in)
    QUICKSTART.md                     (getting started guide)
    PROMPTS.md                        (30+ example prompts in plain markdown)
    open-loops.md                     (auto-updated by skills)
    state.md                          (demo data — Alex Rivera)
    00_current/.gitkeep               (folder stubs)
    01_.../gitkeep
    ...

PDF generation requires:
  - Node.js installed
  - Google Chrome installed
  - fd-apps-aireadyu-pdf project at ../fd-apps-aireadyu-pdf/
"""

import sys
import subprocess
import zipfile
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
VAULT_DEMO = REPO_ROOT / "vault-demo"
DIST_DIR = Path(__file__).parent / "dist"
PDF_DIR = DIST_DIR / "pdfs"
PDF_GEN = REPO_ROOT.parent / "fd-apps-aireadyu-pdf"  # sibling project

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

# Files to include from each domain folder (relative to vault-demo/{domain}/)
DOMAIN_FILES = [
    "config.md",
    "QUICKSTART.md",
    "PROMPTS.md",
    "open-loops.md",
    "state.md",
]


def generate_pdfs(targets: list[str]) -> dict[str, Path]:
    """
    Generate PDF guides for the given domains using fd-apps-aireadyu-pdf.
    Returns a dict of {domain: pdf_path} for successfully generated PDFs.
    """
    if not PDF_GEN.exists():
        print(f"  ⚠️   PDF generator not found at {PDF_GEN} — skipping PDF generation")
        print(f"       PDFs can be generated later with:")
        print(
            f"       cd {PDF_GEN} && node generate.js aireadylife-health aireadylife-wealth ..."
        )
        return {}

    PDF_DIR.mkdir(parents=True, exist_ok=True)
    slugs = [f"aireadylife-{d}" for d in targets]

    print(f"🎨  Generating {len(targets)} PDF guide(s) via fd-apps-aireadyu-pdf…")
    result = subprocess.run(
        ["node", "generate.js"] + slugs,
        cwd=str(PDF_GEN),
        capture_output=False,  # let output stream so user sees progress
        text=True,
    )
    if result.returncode != 0:
        print(
            f"  ⚠️   PDF generator exited with code {result.returncode} — continuing without PDFs"
        )
        return {}

    # Collect successfully generated PDFs
    found = {}
    for domain in targets:
        pdf_path = PDF_DIR / f"aireadylife-{domain}-guide.pdf"
        if pdf_path.exists():
            found[domain] = pdf_path
        else:
            print(f"  ⚠️   PDF not found for {domain} — will be omitted from zip")
    return found


def build_package(domain: str, pdf_path: Path | None = None) -> bool:
    """Build a vault zip for a single domain. Returns True on success."""
    domain_dir = VAULT_DEMO / domain
    if not domain_dir.exists():
        print(f"  ❌  {domain}: vault-demo/{domain}/ not found — skipping")
        return False

    zip_name = f"aireadylife-{domain}-vault.zip"
    zip_path = DIST_DIR / zip_name
    zip_root = f"aireadylife-{domain}-vault"

    missing_files = [f for f in DOMAIN_FILES if not (domain_dir / f).exists()]
    if missing_files:
        print(f"  ⚠️   {domain}: missing {', '.join(missing_files)} — packaging anyway")

    profile_path = VAULT_DEMO / "profile.md"
    include_profile = profile_path.exists()
    if not include_profile:
        print(f"  ⚠️   {domain}: vault-demo/profile.md not found — omitting from zip")

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        # PDF guide first — it's the hero of the package
        if pdf_path and pdf_path.exists():
            zf.write(pdf_path, f"{zip_root}/aireadylife-{domain}-guide.pdf")

        # Alex Rivera persona reference
        if include_profile:
            zf.write(profile_path, f"{zip_root}/profile.md")

        # Per-domain template files
        for fname in DOMAIN_FILES:
            fpath = domain_dir / fname
            if fpath.exists():
                zf.write(fpath, f"{zip_root}/{fname}")

        # Folder stubs
        for item in sorted(domain_dir.rglob(".gitkeep")):
            rel = item.relative_to(domain_dir)
            zf.write(item, f"{zip_root}/{rel}")

    size_kb = zip_path.stat().st_size / 1024
    pdf_note = " + PDF" if pdf_path and pdf_path.exists() else ""
    print(f"  ✅  {domain}: {zip_name} ({size_kb:.1f} KB){pdf_note}")
    return True


def main():
    DIST_DIR.mkdir(parents=True, exist_ok=True)

    args = sys.argv[1:]
    skip_pdf = "--no-pdf" in args
    args = [a for a in args if a != "--no-pdf"]

    if args:
        invalid = [d for d in args if d not in DOMAINS]
        if invalid:
            print(f"❌  Unknown domain(s): {', '.join(invalid)}")
            print(f"   Valid domains: {', '.join(DOMAINS)}")
            sys.exit(1)
        targets = args
    else:
        targets = DOMAINS

    print(f"🔨  AI Ready Life — Vault Package Builder")
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

    # Step 2: Package zips
    print(f"📦  Packaging vault zips…")
    success, failed = [], []
    for domain in targets:
        ok = build_package(domain, pdf_path=pdf_map.get(domain))
        (success if ok else failed).append(domain)

    print(f"\n{'─' * 60}")
    print("SUMMARY")
    print("─" * 60)
    print(f"  Built:   {len(success)}")
    print(f"  Failed:  {len(failed)}")
    print(f"  PDFs:    {len(pdf_map)}/{len(targets)}")

    if success:
        print(f"\n  Output → {DIST_DIR}")
        for domain in success:
            zip_path = DIST_DIR / f"aireadylife-{domain}-vault.zip"
            size_kb = zip_path.stat().st_size / 1024
            print(f"    {f'aireadylife-{domain}-vault.zip':<45} {size_kb:>6.1f} KB")

    if failed:
        print(f"\n  Failed: {', '.join(failed)}")

    print(f"\n  Next step: python3 scripts/upload_to_gumroad.py")


if __name__ == "__main__":
    main()
