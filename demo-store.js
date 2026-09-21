/**
 * Walnut DEMO shared store — localStorage key walnutDemoOrders
 * SAMPLE / DEMO only. Never live Production.
 * Access / role gating lives in access.js (WalnutAccess) — not here.
 */
(function (global) {
  'use strict';

  var KEY = 'walnutDemoOrders';

  var OUTLETS = ['FS', 'TC', 'KK', 'BV', 'CC', 'PP', 'BN', 'JNY', 'MK1', 'MK2', 'SA'];
  var OUTLET_NAMES = {
    FS: 'Foh Sang', TC: 'Taman Cantek', KK: 'Karamunsing', BV: 'Beverly',
    CC: 'Cyber City', PP: 'Papar', BN: 'Benoni', JNY: 'Jenny',
    MK1: 'Market Booth 1', MK2: 'Market Booth 2', SA: 'Staff'
  };
  var OUTLET_BILL_NAMES = {
    FS: 'FOH SANG', TC: 'TAMAN CANTEK', KK: 'KARAMUNSING', BV: 'BEVERLY',
    CC: 'CYBER CITY', PP: 'PAPAR', BN: 'BENONI', JNY: 'JENNY',
    MK1: 'MARKET BOOTH 1', MK2: 'MARKET BOOTH 2', SA: 'STAFF SA'
  };

  var FRESH_BUN = [
    'CHEESE ROLL BUN', 'CHICKEN FLOSS BUN', 'CHICKEN FRANKIE', 'CHOC.RICE BUN',
    'CHOCO BUN', 'DOUBLE SAUSAGE', 'DONUT CHOCOLATE', 'DONUT RING', 'FRANKIE CHEESE',
    'HAM BONETO', 'MILK SHAKE BUN', 'MINI HAWAII', 'POLO BUN', 'RAISIN CREAM CHEESE',
    'SPICY CHICKEN FLOSS', 'SUGAR BUN', 'SUGAR CHEESE STICK BUN', 'TUNA MINCE', 'UFO MAYO'
  ];
  var FRESH_INACTIVE = { 'CHOCO BUN': 1, 'HAM BONETO': 1, 'SUGAR BUN': 1, 'UFO MAYO': 1 };

  var PACK_BUN = [
    { name: "BUTTER BUN 2's", label: "BUTTER BUN 2's (28p)", trays: 28 },
    { name: "BURGER BUN 5'S", label: "BURGER BUN 5'S (4p)", trays: 4 },
    { name: "BUTTER MILK BUN 4'S", label: "BUTTER MILK BUN 4'S (6p)", trays: 6 },
    { name: "CHEESE BUN 6'S", label: "CHEESE BUN 6'S (9p)", trays: 9 },
    { name: "CHOCOLATE CHIP BUN 4'S", label: "CHOCOLATE CHIP BUN 4'S (10p)", trays: 10 },
    { name: "HOT DOG BUN 5'S", label: "HOT DOG BUN 5'S (4p)", trays: 4 },
    { name: "KAYA BUN 4'S", label: "KAYA BUN 4'S (8p)", trays: 8 },
    { name: 'TAU SAR BUN', label: 'TAU SAR BUN (8p)', trays: 8 },
    { name: "WHOLEMEAL ROLL 6'S", label: "WHOLEMEAL ROLL 6'S (6p)", trays: 6 },
    { name: "PANDESA ROLL 8'S", label: "PANDESA ROLL 8'S (5P)", trays: 5 },
    { name: 'BUTTER CREAM BUN', label: 'BUTTER CREAM BUN', trays: 1 }
  ];

  var SPECIALTY = [
    'MINI HAM & CHEESE', 'MIX GRAIN', 'PEEL & CHEESE', 'PEEL & NUTS',
    'WHOLEMEAL MINI', 'WHOLEMEAL LOAF', 'CHARCOAL WALNUT', 'MATCHA RED BEAN'
  ];
  var BREAD = [
    'FRENCH LOAF', 'EGG BREAD', 'HIGH FIBER', 'OATMEAL', 'RAISIN BREAD',
    'SANDWICH BREAD', 'WHOLEMEAL BREAD', "SCONE 2'S"
  ];
  var PASTRY = [
    'BAKED CHEESE PACK', 'BANANA LOAF', 'BANANA PACK', 'BELGIUM PACK', 'CARROT CAKE PACK',
    'FRUIT CAKE PACK', 'PARMESAN', 'PURE BUTTER CAKE', 'MUFFIN BLUEBERRY (set)',
    'MUFFIN CHOC CHEESE (set)', 'MUFFIN CHOCOLATE CHIP (set)', 'MUFFIN FRUIT (set)',
    'S/R CHOCOLATE', 'S/R COFFEE', 'S/R PANDAN', 'S/R VANILLA',
    'EGG TART', 'COCONUT TART', 'KAYA PIANG', 'LOU POH PIANG', 'TAU SAR PIANG',
    "EGG COOKIES 4'S", "PEANUT COOKIES 4'S", "PINEAPPLE TART 5'S", 'GARLIC SLICE',
    'PANDAN JADE PIANG', 'BREAD PUDDING', 'LEMON TART', 'CHOCOLATE TART',
    'CHICKEN PIE', 'QUICHE', 'MERINGUE COOKIE', 'FLOSSY ORI', 'FLOSSY TOM YUM',
    'PASTRY PUFF', 'CHOCOLATE PUFF (5PCS)', 'MINI CHOC ECLAIRS (5PCS)', 'MINI CUSTARD CREAM PUFF (5PCS)'
  ];
  var CAKE_HALF = [
    'CHOCOLATE 1/2KG', 'VANILLA 1/2KG', 'PANDAN 1/2KG', 'RED VELVET 1/2KG',
    'MOIST CHOC 1/2KG', 'OREO 1/2KG', 'TIRAMISU 1/2KG', 'FRUIT 1/2KG'
  ];
  var CAKE_1KG = [
    'CHOCOLATE 1KG', 'VANILLA 1KG', 'PANDAN 1KG', 'RED VELVET 1KG',
    'MOIST CHOC 1KG', 'OREO 1KG', 'BLACK FOREST 1KG', 'FRUIT 1KG'
  ];
  var CARTOON = [
    'CARTOON BEAR', 'CARTOON HELLO KITTY', 'CARTOON DORAEMON', 'CARTOON POKEMON',
    'CARTOON SPONGEBOB', 'CARTOON FROZEN', 'CARTOON MARVEL', 'CARTOON CUSTOM'
  ];
  var SLICE = [
    'SLICE CHOCOLATE', 'SLICE VANILLA', 'SLICE PANDAN', 'SLICE RED VELVET',
    'SLICE OREO', 'SLICE TIRAMISU', 'SLICE CHEESECAKE', 'SLICE FRUIT'
  ];
  var OTHERS = [
    'MINI CUPCAKE BOX', 'BROWNIE BOX', 'COOKIE ASSORT',
    'GIFT BOX SMALL', 'GIFT BOX LARGE', 'CUSTOM OTHER'
  ];

  var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var WEEK_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function loadOrders() {
    try {
      var arr = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function latestByOutlet() {
    var map = {};
    loadOrders().forEach(function (entry) {
      var code = (entry && (entry.outlet || (entry.payload && entry.payload.outlet))) || '';
      if (!code || map[code]) return;
      map[code] = entry;
    });
    return map;
  }

  function payloadOf(entry) {
    return (entry && entry.payload) || entry || {};
  }

  function seed(name, outlet, base) {
    var n = 0, i;
    for (i = 0; i < name.length; i++) n += name.charCodeAt(i);
    for (i = 0; i < outlet.length; i++) n += outlet.charCodeAt(i) * 3;
    return ((n + base) % 9) + (base % 3);
  }

  function sampleQty(product, outlet, base) {
    if (FRESH_INACTIVE[product]) return null; // inactive → dash
    var v = seed(product, outlet, base);
    if (outlet === 'MK1' || outlet === 'MK2') v = Math.max(0, Math.floor(v / 2));
    if (outlet === 'SA') v = Math.max(0, Math.floor(v / 3));
    if (outlet === 'JNY' && base === 1) v = Math.max(0, Math.floor(v * 0.8));
    if (outlet === 'PP' || outlet === 'BN') {
      // lighter SAMPLE for some specialty
      if (base === 7) v = Math.max(0, Math.floor(v / 2));
    }
    return v;
  }

  function dayKeyFromIso(iso) {
    if (!iso) {
      var now = new Date();
      return WEEK_KEYS[(now.getDay() + 6) % 7]; // Mon=0 mapping via WEEK_KEYS index
    }
    var p = String(iso).split('-');
    if (p.length < 3) return 'Mon';
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0);
    var wd = d.getDay(); // 0 Sun
    return WEEK_KEYS[wd === 0 ? 6 : wd - 1];
  }

  function fmtDisplayDate(iso) {
    if (!iso) {
      try {
        return new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kuching', day: '2-digit', month: 'short', year: 'numeric'
        }).format(new Date());
      } catch (e) {
        return '';
      }
    }
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var p = String(iso).split('-');
    if (p.length < 3) return iso;
    var day = Number(p[2]);
    var mon = Number(p[1]) - 1;
    return (day < 10 ? '0' : '') + day + '-' + months[mon] + '-' + p[0];
  }

  function fmtSheetDate(iso) {
    if (!iso) {
      try {
        var parts = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Kuching', day: '2-digit', month: 'short', year: 'numeric', weekday: 'long'
        }).formatToParts(new Date());
        var m = {};
        parts.forEach(function (x) { if (x.type !== 'literal') m[x.type] = x.value; });
        return (m.day || '') + '/' + (m.month || '') + '/' + (m.year || '') + ', ' + (m.weekday || '');
      } catch (e) {
        return '';
      }
    }
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var p = String(iso).split('-');
    var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]), 12, 0, 0);
    var day = Number(p[2]);
    return (day < 10 ? '0' : '') + day + '/' + months[Number(p[1]) - 1] + '/' + p[0] + ', ' + days[d.getDay()];
  }

  /** Fresh bun qty for one outlet from DEMO order (weekly day column or daily fresh). */
  function freshFromPayload(payload, product) {
    if (!payload) return null;
    var daily = payload.daily || {};
    if (daily[product] != null && Number(daily[product]) > 0) return Number(daily[product]);
    var weekly = payload.weekly;
    if (!weekly) return null;
    var dayKey = dayKeyFromIso(payload.orderDate);
    var rows = (weekly.nextWeek && weekly.nextWeek.rows) || weekly.rows || [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (!r || r.product !== product) continue;
      if (r.inactive) return null;
      var q = r.qty && r.qty[dayKey];
      if (q == null || q === '') return 0;
      return Number(q) || 0;
    }
    return null;
  }

  function packFromPayload(payload, productName) {
    if (!payload) return null;
    var list = payload.packBunChanges || [];
    for (var i = 0; i < list.length; i++) {
      var it = list[i];
      if (!it) continue;
      if (it.product === productName || String(it.product || '').indexOf(productName.replace(/ \(.*$/, '')) === 0) {
        var n = it.newAmount != null ? Number(it.newAmount) : Number(it.ordered);
        return isNaN(n) ? 0 : n;
      }
    }
    // also allow daily pack_bun keys
    var daily = payload.daily || {};
    if (daily[productName] != null) return Number(daily[productName]) || 0;
    return null;
  }

  function dailyFromPayload(payload, product) {
    if (!payload || !payload.daily) return null;
    if (payload.daily[product] == null) return null;
    return Number(payload.daily[product]) || 0;
  }

  function soFromPayload(payload, product) {
    var sp = payload && payload.special;
    if (!sp || !sp.product) return null;
    var name = String(sp.product).toUpperCase();
    if (name === String(product).toUpperCase() || name.indexOf(String(product).toUpperCase()) >= 0) {
      return Number(sp.qty) || Number(sp.quantity) || 1;
    }
    return null;
  }

  /**
   * Build matrix rows: product × outlets + TOTAL + SO
   * source: 'fresh' | 'pack' | 'daily'
   * When outlet has DEMO submit, override SAMPLE for that column.
   */
  function buildMatrix(products, opts) {
    opts = opts || {};
    var source = opts.source || 'daily';
    var base = opts.base != null ? opts.base : 1;
    var latest = latestByOutlet();
    var rows = [];
    var productList = products.map(function (p) {
      return typeof p === 'string' ? { name: p, label: p } : p;
    });

    productList.forEach(function (p, pi) {
      var row = { product: p.label || p.name, key: p.name, cells: {}, total: 0, so: 0, sources: {} };
      var inactive = !!FRESH_INACTIVE[p.name];
      OUTLETS.forEach(function (o) {
        var entry = latest[o];
        var payload = entry ? payloadOf(entry) : null;
        var val = null;
        var fromOrder = false;
        if (payload) {
          if (source === 'fresh') val = freshFromPayload(payload, p.name);
          else if (source === 'pack') val = packFromPayload(payload, p.name);
          else val = dailyFromPayload(payload, p.name);
          if (val != null) fromOrder = true;
        }
        if (val == null) {
          if (inactive) val = null;
          else val = sampleQty(p.name, o, base + pi);
        }
        row.cells[o] = val;
        row.sources[o] = fromOrder ? 'order' : (inactive ? 'inactive' : 'sample');
        if (typeof val === 'number') row.total += val;

        if (payload) {
          var so = soFromPayload(payload, p.name);
          if (so != null) row.so += so;
        }
      });
      if (typeof row.so === 'number') row.total += row.so;
      rows.push(row);
    });
    return rows;
  }

  /** Latest DEMO qty map for one outlet (bill fill). */
  function billQtyMap(outletCode) {
    var latest = latestByOutlet();
    var entry = latest[outletCode];
    var map = {};
    var meta = { hasOrder: false, orderId: '', at: '', orderDate: '', packBunDate: '', label: 'SAMPLE placeholder' };

    // SAMPLE zeros / light placeholders
    function putSample(list, base) {
      list.forEach(function (name, i) {
        var n = typeof name === 'string' ? name : name.name;
        if (FRESH_INACTIVE[n]) { map[n] = null; return; }
        map[n] = sampleQty(n, outletCode, base + i);
      });
    }
    putSample(FRESH_BUN, 1);
    putSample(SPECIALTY, 7);
    putSample(BREAD, 5);
    putSample(PASTRY, 3);
    putSample(CAKE_HALF, 2);
    putSample(CAKE_1KG, 2);
    putSample(CARTOON, 1);
    putSample(SLICE, 4);
    putSample(OTHERS, 1);
    PACK_BUN.forEach(function (p, i) {
      map[p.name] = sampleQty(p.name, outletCode, 4 + i);
      map[p.label] = map[p.name];
    });

    if (!entry) return { qty: map, meta: meta, special: null };

    var payload = payloadOf(entry);
    meta.hasOrder = true;
    meta.orderId = entry.orderId || entry.id || '';
    meta.at = entry.at || '';
    meta.orderDate = payload.orderDate || '';
    meta.packBunDate = payload.packBunDate || '';
    meta.label = 'DEMO submit ' + meta.orderId;

    // Override from daily
    Object.keys(payload.daily || {}).forEach(function (k) {
      map[k] = Number(payload.daily[k]) || 0;
    });

    // Fresh from weekly / daily
    FRESH_BUN.forEach(function (n) {
      var v = freshFromPayload(payload, n);
      if (v != null) map[n] = v;
    });

    // Pack bun changes
    PACK_BUN.forEach(function (p) {
      var v = packFromPayload(payload, p.name);
      if (v != null) {
        map[p.name] = v;
        map[p.label] = v;
      }
    });

    return { qty: map, meta: meta, special: payload.special || null };
  }

  function cellDisplay(v) {
    if (v == null) return '–';
    if (v === 0) return '0';
    return String(v);
  }

  global.WalnutDemoStore = {
    KEY: KEY,
    OUTLETS: OUTLETS,
    OUTLET_NAMES: OUTLET_NAMES,
    OUTLET_BILL_NAMES: OUTLET_BILL_NAMES,
    FRESH_BUN: FRESH_BUN,
    FRESH_INACTIVE: FRESH_INACTIVE,
    PACK_BUN: PACK_BUN,
    SPECIALTY: SPECIALTY,
    BREAD: BREAD,
    PASTRY: PASTRY,
    CAKE_HALF: CAKE_HALF,
    CAKE_1KG: CAKE_1KG,
    CARTOON: CARTOON,
    SLICE: SLICE,
    OTHERS: OTHERS,
    loadOrders: loadOrders,
    latestByOutlet: latestByOutlet,
    buildMatrix: buildMatrix,
    billQtyMap: billQtyMap,
    cellDisplay: cellDisplay,
    fmtDisplayDate: fmtDisplayDate,
    fmtSheetDate: fmtSheetDate,
    dayKeyFromIso: dayKeyFromIso
  };
})(typeof window !== 'undefined' ? window : this);
