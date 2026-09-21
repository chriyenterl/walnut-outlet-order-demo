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
| **Master** | Order (any outlet) + Production + Bill + Backend + All links |

- Invalid / missing token → blocking gate: *“Open your outlet link or Master link. No sign-in.”*
- Outlet token on `backend.html` / `production.html` / `bill.html` → *“Master link required”*
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
| `production.html` | DEMO clone of Production Sheet | Master |
| `bill.html` | DEMO clone of Bill For Print | Master |
| `backend.html` | Backend inbox — DEMO submissions from `localStorage` | Master |
| `links.html` | Marcus-facing DEMO link list (copyable) | Open (lists secrets) |
| `baker.html` | Legacy SAMPLE baker board (prefer Production clone) | — |
| `access.js` | Token registry + gate + nav hash wiring | — |
| `demo-store.js` | Shared reader for `localStorage.walnutDemoOrders` | — |

## Wiring

1. Submit an order on `index.html` → writes `localStorage` key **`walnutDemoOrders`**.
2. Open `production.html` (Master) → outlet column updates (green cells) from that submit; TOTAL recomputed. Other cells = SAMPLE.
3. Open `bill.html?outlet=FS` (Master) → QTY filled from latest DEMO submit for that outlet.

Both clones listen for `storage` + **Reload from Order UI**. Same origin required (`python3 -m http.server` from this folder).

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
