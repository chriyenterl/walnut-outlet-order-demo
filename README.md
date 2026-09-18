# Walnut Bakery — Outlet Order DEMO

Static DEMO of the outlet ordering UI (Safari-friendly) + Production / Bill sheet clones + backend inbox.

**Not live Production.** Sample catalogue and DEMO quantities only. Walnut brown theme.  
**Never write to Drive folder Walnut Bakery Production.**

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Outlet Order UI (≡ `Index-preview.html`) |
| `production.html` | **DEMO clone** of Production Sheet (BAKER default; BR&SP / Pastry / Cakeroom / PACKER / SO DATA) |
| `bill.html` | **DEMO clone** of Bill For Print (per-outlet delivery form) |
| `backend.html` | Backend inbox — DEMO submissions from `localStorage` |
| `baker.html` | Legacy SAMPLE baker board (prefer Production clone) |
| `demo-store.js` | Shared reader for `localStorage.walnutDemoOrders` |

## Wiring

1. Submit an order on `index.html` → writes `localStorage` key **`walnutDemoOrders`**.
2. Open `production.html` → outlet column updates (green cells) from that submit; TOTAL recomputed. Other cells = SAMPLE.
3. Open `bill.html?outlet=FS` (etc.) → QTY filled from latest DEMO submit for that outlet.

Both clones listen for `storage` + **Reload from Order UI**. Same origin required (`python3 -m http.server` from this folder).

## GitHub Pages (parent publishes)

- https://chriyenterl.github.io/walnut-outlet-order-demo/production.html  
- https://chriyenterl.github.io/walnut-outlet-order-demo/bill.html  

## Design notes

See `../walnut-outlet-order/DESIGN.md` (Production / Bill clone section).

Owner: Chriyenterl Marcus · Brand: Walnut Bakery
