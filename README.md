# Walnut Bakery — Outlet Order DEMO

Static DEMO of the outlet ordering UI (Safari-friendly) + Production / Bill sheet clones + backend inbox.

**Not live Production.** Sample catalogue and DEMO quantities only. Walnut brown theme.  
**Never write to Drive folder Walnut Bakery Production.**

## Access links (Ai-Cha style)

No account login. Each outlet gets a private URL with a DEMO token in the hash:

```
https://chriyenterl.github.io/walnut-outlet-order-demo/index.html#access=OUTLET_TOKEN
```

| Role | What they can open |
|------|--------------------|
| **Outlet** | `index.html` only — outlet picker locked to their code |
| **Master** | Order (any outlet) + Production + Baker totals + Bill + Backend + All links |

- Invalid / missing token → blocking gate: *“Open your outlet link or Master link. No sign-in.”*
- Outlet token on `backend.html` / `production.html` / `baker-board.html` / `bill.html` → *“Master link required”*
- Token is persisted in `sessionStorage` for same-tab nav; internal links auto-append `#access=…`

**Marcus link sheet:** [`links.html`](links.html) lists every DEMO outlet URL + Master URL (tokens visible for practice). Rotate tokens before any live use.

### Published base

`https://chriyenterl.github.io/walnut-outlet-order-demo/`

| Entry | Example |
|-------|---------|
| Master (Backend) | `…/backend.html#access=MASTER_TOKEN` |
| Master (Order) | `…/index.html#access=MASTER_TOKEN` |
| Outlet (e.g. FS) | `…/index.html#access=FS_TOKEN` |
| All DEMO links | `…/links.html` |

Tokens live in `access.js` (`WalnutAccess.ACCESS`). Deterministic DEMO practice secrets — not crypto-secure.

## Pages

| File | Purpose | Access |
|------|---------|--------|
| `index.html` | Outlet Order UI (canonical; ≡ `Index-preview.html` in sibling tree) | Outlet or Master |
| `production.html` | DEMO clone of Production Sheet (dept totals + per outlet, fulfilment) | Master |
| `baker-board.html` | Baker totals — product, ordered total, produced, gave. No outlet columns | Master |
| `bill.html` | DEMO clone of Bill For Print | Master |
| `backend.html` | Backend inbox — DEMO submissions from `localStorage` | Master |
| `links.html` | Marcus-facing DEMO link list (copyable) | Open (lists secrets) |
| `baker.html` | Legacy SAMPLE baker board (use Baker totals instead) | Master |
| `access.js` | Token registry + gate + nav hash wiring | — |
| `demo-store.js` | Shared reader for `localStorage.walnutDemoOrders` | — |

## Wiring

1. Submit an order on `index.html` → writes `localStorage` key **`walnutDemoOrders`**.
2. Open `production.html` (Master) → outlet column updates (green cells) from that submit; TOTAL recomputed. Other cells = SAMPLE.
3. Open `bill.html?outlet=FS` (Master) → QTY filled from latest DEMO submit for that outlet.

Both clones listen for `storage` + **Reload from Order UI**. Same origin required (`python3 -m http.server` from this folder).

## After Submit

### DEMO path (this browser)

1. **Submit** on `index.html` writes `localStorage.walnutDemoOrders` only. Nothing is sent to Google Drive.
2. The done panel shows the outlet code, order id, and a short summary: daily lines/units, pack changes, weekly, and SO.
3. **Master** link — primary next step is **Production sheet** and **Bill for print**. The Bill link is `bill.html?outlet=CODE` (access token stays in `#access=`). Secondary: Baker totals, Backend inbox, All orders, New order.
4. **Outlet** link — confirmation only. Copy says factory / Master will see it on Production and Bill. Buttons: All orders and New order. No Production, Baker, or Bill links (those pages stay Master-only).
5. **Production** (`production.html`) shows a banner when the inbox has submits (`N outlets · latest: OUTLET at TIME`), a SAMPLE vs Order UI legend, and green override cells. `?outlet=` or `#outlet=` highlights that column. Empty inbox: **Submit from Order UI first**. Department tabs keep product total and per-outlet columns. Under each department, **Fulfilment** records Produced and Gave per outlet (`localStorage.walnutDemoFulfilment`, keyed by date + department + product + outlet).
6. **Baker totals** (`baker-board.html`) is the baker sheet: Product, TOTAL (Order UI sum), Produced, Gave. No outlet columns. Produced is a batch total, or the sum of per-outlet Produced when those lines exist.
7. **Bill** (`bill.html?outlet=CODE`) opens on that outlet: “Bill for [Outlet] · from latest DEMO submit”, or SAMPLE if none. Four print sections + Print. Special orders show bill no and customer name. Link row: ← Order · Production · Baker totals · Backend.
8. **Backend** inbox rows include **Open Production** and **Open Bill** for that outlet.
9. **Special order** lines store `billNo` and `customerName` separately. There is no baking-date field. Blank bill no stays blank.

### Live path (later — not this DEMO)

When ordering is live, outlet **Ordering** tabs write to the real Google Sheets **Production** and **Bill For Print**. This practice DEMO never does that.

## Local smoke checks

```bash
cd walnut-outlet-order-pages && python3 -m http.server 8765
# no hash → gate
# #access=<FS token> on index → locked to FS
# same FS token on backend → Master link required
# #access=<master> on backend → works
# open links.html → copyable URLs
```

## Design notes

See `../walnut-outlet-order/DESIGN.md` (Production / Bill clone section).

Owner: Chriyenterl Marcus · Brand: Walnut Bakery
