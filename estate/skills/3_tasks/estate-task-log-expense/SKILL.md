---
name: arlive-estate-log-expense
type: task
cadence: as-received
description: >
  Records a property expense to vault/estate/03_cashflow/ with property address,
  date, vendor, category, amount, notes, and receipt reference. Builds the expense
  history used for cash flow analysis and tax documentation.
---

# arlive-estate-log-expense

**Cadence:** As-received (logged at time of expense)
**Produces:** A new expense record appended to the property's expense log in `vault/estate/03_cashflow/`.

## What it does

Records individual property expenses to the vault immediately when incurred, so `arlive-estate-analyze-cash-flow` has accurate, real-time expense data for every property. Each log entry captures: the property address (using a standard slug for consistent filtering), the expense date, the vendor or payee name, the expense category using the standard classification (maintenance, repair, capital improvement, insurance premium, property tax, mortgage payment, management fee, landscaping, utilities, pest control, other), the amount, any relevant notes (what was repaired, which unit, warranty claim number), and a receipt reference number or file path for documentation. The category classification matters because maintenance and repair are fully deductible in the current year, while capital improvements must be depreciated — logging them correctly from the start prevents misclassification at tax time. Files are appended to a property-specific expense log (`vault/estate/03_cashflow/{property-slug}-expenses.md`) rather than a single flat file so per-property analysis remains fast. Large capital expenditures automatically generate a note to the estate open loops file recommending confirmation of depreciation treatment with a tax professional.

## Apps

vault file system

## Vault Output

`vault/estate/03_cashflow/`
