---
type: op
trigger: user-facing
cadence: monthly
description: >
  Reviews pet care for households with pets: vet appointments due (annual exam,
  vaccinations, dental), medication refills, food / litter / supply inventory, and
  exercise log. Auto-skips if pet_count is 0. Universal for pet households — works
  for dogs, cats, and other companion animals.
---

# home-pet-care-review

**Trigger phrases:**
- "pet care review"
- "vet appointments due"
- "pet supply check"

**Auto-skip:** if `pet_count` in config is 0, this op exits with:
"No pets configured — skipping pet care review."

**Cadence:** Monthly.

## What It Does

Per pet, reviews the standard care surfaces:

**Per pet record:**
- Species, breed, name, DOB, weight (last logged).
- Veterinarian: name, contact.
- Vaccinations: rabies, distemper / parvo / FVRCP (cats), leptospirosis, bordetella;
  dates given + due dates.
- Annual / semi-annual exams: last done, next due.
- Medications: name, dose, frequency, last refill, next refill needed.
- Heartworm / flea / tick: last given, next due.
- Dental: last cleaning.
- Food / litter / supply inventory: current stock, weeks of runway, reorder threshold.
- Exercise / walk log (optional, dogs typically): days walked / week.

**Flags:**
- Vaccination due within 30 days → open loop.
- Med refill needed within 14 days → open loop.
- Supply runway <2 weeks → open loop.
- Annual exam overdue → open loop with "schedule today" prompt.

## Output

- `vault/home/02_briefs/YYYY-MM-DD-pet-care.md`
- Open-loop entries per flag

## Steps

1. Read pet roster from `vault/home/00_current/pets/`.
2. For each pet: load record, evaluate every surface above.
3. Flag anything within threshold.
4. Write brief.

## Configuration

`vault/home/config.md`:
- `pet_count`
- Pet records live in `vault/home/00_current/pets/{pet-name}.md` (one per pet)

## Vault Paths

- Reads: `vault/home/00_current/pets/`, `vault/home/config.md`
- Writes: `vault/home/02_briefs/YYYY-MM-DD-pet-care.md`,
  `vault/home/open-loops.md`
