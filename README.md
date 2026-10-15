# HarvestSignal

A working research demonstration for Aryan Sinha's Bihar paddy-price project.

## Demonstrate

1. Open Overview, then run a forecast for a market.
2. In Markets & forecasts, open How it works and Backtest results.
3. In Messages & delivery, choose a language and queue a demo campaign.
4. Inspect the exact message and recipient log. Simulate delivery receipts, then retry failed deliveries.
5. In Farmer feedback, choose a farmer, enter a price with the keypad, supply quantity/date/rating, and save.
6. Refresh to show database persistence. Export CSV logs if needed.
7. Open Data & project costs to explain source readiness and the budget.

## Implemented

- Persistent D1/SQLite records for 200 fictional households, weekly prices, forecasts, campaigns, delivery events, and feedback.
- Deterministic four-week trend model, bounded one-week extrapolation, and 12 rolling holdout tests against a last-price baseline.
- Exact Hindi / Roman-Hindi message storage, GSM-7 / Unicode segment calculations, estimated costs, per-recipient status, retries, consent rechecks, and duplicate-campaign protection.
- CSV imports for weekly prices and fictional farmers, plus exports for data, recipients, messages, and feedback.
- Mobile navigation, desktop operations dashboard, browser Hindi speech prompt where supported, and a phone keypad simulator.

## Boundaries

All seeded market prices and farmer identities are synthetic. All telecom events are simulated. No live messages or phone calls are made and no paid services were purchased. The live baseline calculation is not the proposal's XGBoost + ARIMA ensemble. Weather and satellite connections are planned, not active. Synthetic backtests do not establish real-world accuracy or income impact. Farmer sale reports are not automatically treated as mandi ground truth.

Uploaded price files require `date,price`, 16–500 consecutive weekly observations, and a source citation. The selected market's history is replaced; saved forecasts remain as historical snapshots. Data is user supplied and not independently verified. Only upload fictional farmer details into this demo.

## Run locally

Requires Node 22.13+ and npm. From this directory:

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_fair_justice.sql
npm run dev
```

Run the migration once on a new local database. The server prints its local URL. For a production-build preview, use `npm start` instead. Local and hosted databases are separate. First access seeds each database once.

## Pilot budget

The $1,935 plan is a planning allowance: SMS $60, sampled voice $100, hosting $50, open data/database/jobs $0 within eligible allowances, DLT $70 provision, fieldwork $880, KF support $500, dissemination $25, contingency $250. Retaining $400 contingency gives $2,085. Domestic gateway taxes, actual DLT terms, voice setup/rental/minutes, and eligibility for research quotas must be confirmed before purchases.
