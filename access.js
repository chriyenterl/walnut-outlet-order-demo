/**
 * Walnut DEMO access gate — Ai-Cha-style #access=TOKEN links.
 * DEMO tokens only (deterministic practice secrets). Not crypto-secure.
 * No account login. localStorage DEMO only — never Drive / Production.
 */
(function (global) {
  'use strict';

  var SS_KEY = 'walnutDemoAccessToken';
  var BASE_PATH_HINT = 'https://chriyenterl.github.io/walnut-outlet-order-demo/';

  /** DEMO token registry — rotate for live. */
  var ACCESS = {
  'wlt-master-1b050dd03bf144ee7a82e810': { role: 'master', label: 'Master / Backend' },
  'wlt-FS-23d7392c4b16f62d93dcb9b4': { role: 'outlet', outlet: 'FS', name: 'Foh Sang' },
  'wlt-TC-bb98f20cdfe1caf7f3b3005b': { role: 'outlet', outlet: 'TC', name: 'Taman Cantek' },
  'wlt-KK-226e1d7c7c94ad05508ffbf2': { role: 'outlet', outlet: 'KK', name: 'Karamunsing' },
  'wlt-BV-8a699ccf5ce6e079044e84d4': { role: 'outlet', outlet: 'BV', name: 'Beverly' },
  'wlt-CC-2600270c5d7bd1649fae7cdc': { role: 'outlet', outlet: 'CC', name: 'Cyber City' },
  'wlt-PP-f499a899c1b0bdd7350fc156': { role: 'outlet', outlet: 'PP', name: 'Papar' },
  'wlt-BN-903fefdbc977dd4ca9a70850': { role: 'outlet', outlet: 'BN', name: 'Benoni' },
  'wlt-JNY-5aa051077270d53767c428c0': { role: 'outlet', outlet: 'JNY', name: 'Jenny' },
  'wlt-MK1-84ae09353128d1ef3853b4ee': { role: 'outlet', outlet: 'MK1', name: 'Market Booth 1' },
  'wlt-MK2-829fe390372a46a91ae0f3d7': { role: 'outlet', outlet: 'MK2', name: 'Market Booth 2' },
  'wlt-SA-6ae38ea3b7ed48e3c61c057f': { role: 'outlet', outlet: 'SA', name: 'Staff' }
  };

  var _token = null;
  var _entry = null;
  var _gateShown = false;

  function readFromLocation() {
    var token = null;
    try {
      var hash = String(location.hash || '');
      var m = hash.match(/(?:^[#&]|[#&])access=([^&]+)/i);
      if (m) token = decodeURIComponent(m[1]);
    } catch (e) {}
    if (!token) {
      try {
        var q = new URLSearchParams(location.search || '');
        token = q.get('access');
      } catch (e2) {}
    }
    if (token) token = String(token).trim();
    return token || null;
  }

  function persist(token) {
    try {
      if (token) sessionStorage.setItem(SS_KEY, token);
      else sessionStorage.removeItem(SS_KEY);
    } catch (e) {}
  }

  function loadPersisted() {
    try {
      return sessionStorage.getItem(SS_KEY) || null;
    } catch (e) {
      return null;
    }
  }

  function resolve(token) {
    if (!token) return null;
    return ACCESS[token] || null;
  }

  function ensureHashOnUrl(token) {
    if (!token) return;
    try {
      var want = '#access=' + encodeURIComponent(token);
      if (location.hash !== want && location.hash.indexOf('access=') < 0) {
        // Prefer keeping other hash fragments if any — but we own access=
        history.replaceState(null, '', location.pathname + location.search + want);
      } else if (location.hash.indexOf('access=') < 0) {
        history.replaceState(null, '', location.pathname + location.search + want);
      }
    } catch (e) {}
  }

  function parse() {
    var fromLoc = readFromLocation();
    var token = fromLoc || loadPersisted();
    var entry = resolve(token);
    if (entry) {
      _token = token;
      _entry = entry;
      persist(token);
      ensureHashOnUrl(token);
      return { token: token, entry: entry };
    }
    _token = null;
    _entry = null;
    return null;
  }

  function isMaster() {
    return !!( _entry && _entry.role === 'master' );
  }

  function outletCode() {
    if (!_entry) return null;
    if (_entry.role === 'outlet') return _entry.outlet || null;
    return null;
  }

  function role() {
    return _entry ? _entry.role : null;
  }

  function label() {
    if (!_entry) return '';
    if (_entry.role === 'master') return _entry.label || 'Master';
    return (_entry.name || '') + ' (' + (_entry.outlet || '') + ')';
  }

  /** Short outlet display name (no code), e.g. "Beverly". Empty for master. */
  function outletName() {
    if (!_entry || _entry.role !== 'outlet') return '';
    return _entry.name || _entry.outlet || '';
  }

  /** Header right label: "OUTLET · Beverly" or "MASTER · All outlets" */
  function headerRoleLabel() {
    if (!_entry) return '';
    if (_entry.role === 'master') return 'MASTER · All outlets';
    var n = outletName() || _entry.outlet || 'Outlet';
    return 'OUTLET · ' + n;
  }

  /** Avatar initials for header pill */
  function initials() {
    if (!_entry) return 'W';
    if (_entry.role === 'master') return 'WM';
    var n = outletName() || _entry.outlet || 'W';
    var parts = String(n).trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    if (_entry.outlet) return String(_entry.outlet).slice(0, 2).toUpperCase();
    return String(n).slice(0, 2).toUpperCase();
  }

  function entry() {
    return _entry;
  }

  function token() {
    return _token;
  }

  function appendAccess(href) {
    if (!_token || !href) return href;
    try {
      // Skip external / mailto / javascript
      if (/^(https?:|mailto:|tel:|javascript:)/i.test(href)) {
        if (href.indexOf(location.origin) !== 0 && !/^\//.test(href) && !/^\./.test(href)) {
          return href;
        }
      }
      var hashIdx = href.indexOf('#');
      var base = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
      var hash = hashIdx >= 0 ? href.slice(hashIdx + 1) : '';
      // strip existing access=
      if (hash) {
        hash = hash.replace(/(^|&)access=[^&]*/gi, '').replace(/^&|&$/g, '');
      }
      var accessPart = 'access=' + encodeURIComponent(_token);
      var newHash = hash ? (hash + '&' + accessPart) : accessPart;
      return base + '#' + newHash;
    } catch (e) {
      return href;
    }
  }

  function wireNav(root) {
    if (!_token) return;
    var scope = root || document;
    var links = scope.querySelectorAll('a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' && href.indexOf('access=') < 0 && href.length > 1) continue;
      // Only rewrite same-site relative / same-folder html links
      if (/^(https?:|mailto:|tel:|javascript:)/i.test(href) && href.indexOf(location.origin) !== 0) continue;
      if (/\.html(\?|#|$)/i.test(href) || /^(index|backend|production|bill|baker|links)(\.html)?(\?|#|$)/i.test(href) || href === './' || href === '/') {
        a.setAttribute('href', appendAccess(href));
      }
    }
  }

  function applyNavVisibility() {
    var masterOnly = document.querySelectorAll('[data-master-only]');
    for (var i = 0; i < masterOnly.length; i++) {
      if (isMaster()) {
        masterOnly[i].classList.remove('walnut-access-hidden');
        masterOnly[i].style.display = '';
      } else {
        masterOnly[i].classList.add('walnut-access-hidden');
        masterOnly[i].style.display = 'none';
      }
    }
  }

  function injectGateStyles() {
    if (document.getElementById('walnutAccessGateCss')) return;
    var css = document.createElement('style');
    css.id = 'walnutAccessGateCss';
    css.textContent = [
      '.walnut-access-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;',
      'padding:24px;background:radial-gradient(ellipse 80% 50% at 10% -10%,rgba(139,90,43,.12),transparent 50%),',
      'radial-gradient(ellipse 60% 40% at 100% 0%,rgba(92,58,30,.08),transparent 45%),#f6f1ea;color:#2a1f18;',
      'font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}',
      '.walnut-access-gate .card{max-width:420px;width:100%;background:rgba(255,255,255,.85);border:1px solid rgba(92,58,30,.14);',
      'border-radius:16px;padding:22px 20px;box-shadow:0 10px 28px rgba(92,58,30,.10);text-align:center}',
      '.walnut-access-gate .badge{display:inline-flex;font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;',
      'background:rgba(255,236,180,.55);color:#b06000;border:1px solid rgba(176,96,0,.28);padding:4px 8px;border-radius:8px;margin-bottom:12px}',
      '.walnut-access-gate h1{margin:0 0 8px;font-size:18px;font-weight:800;letter-spacing:-.02em}',
      '.walnut-access-gate p{margin:0 0 10px;font-size:13px;color:#7a6558;line-height:1.5}',
      '.walnut-access-gate .mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;color:#b06000;word-break:break-all}',
      '.walnut-access-hidden{display:none!important}'
    ].join('');
    document.head.appendChild(css);
  }

  function showGate(kind) {
    if (_gateShown) return;
    _gateShown = true;
    injectGateStyles();
    // Hide app chrome
    try {
      var app = document.querySelector('.app, .chrome, header.chrome, main, .bottom-nav, .site-nav, .tabs-wrap, .page, .sheet-wrap');
      var nodes = document.querySelectorAll('.app, body > .chrome, body > header, body > main, body > .tabs-wrap, body > .page, body > .sheet-wrap, .bottom-nav, #toast');
      for (var i = 0; i < nodes.length; i++) nodes[i].style.display = 'none';
    } catch (e) {}

    var title = 'Access link required';
    var msg = 'Open your outlet link or Master link. No sign-in.';
    if (kind === 'master') {
      title = 'Master link required';
      msg = 'This page is for Master / Backend only. Open the Master DEMO link (not an outlet link).';
    }

    var el = document.createElement('div');
    el.className = 'walnut-access-gate';
    el.id = 'walnutAccessGate';
    el.innerHTML =
      '<div class="card">' +
        '<div class="badge">DEMO · no login</div>' +
        '<h1>' + title + '</h1>' +
        '<p>' + msg + '</p>' +
        '<p>Ask Marcus for your private <span class="mono">#access=…</span> URL. Tokens stay in the link hash — nothing is typed here.</p>' +
        '<p style="margin-top:14px;font-size:11px;opacity:.75">Marcus: open <span class="mono">links.html</span> for the DEMO link list.</p>' +
      '</div>';
    document.body.appendChild(el);
  }

  /**
   * @param {'outlet'|'master'|'any'} need
   * @returns {boolean} true if access OK
   */
  function require(need) {
    parse();
    need = need || 'any';
    if (!_entry) {
      showGate(need === 'master' ? 'master' : 'any');
      return false;
    }
    if (need === 'master' && !isMaster()) {
      showGate('master');
      return false;
    }
    if (need === 'outlet' && !isMaster() && _entry.role !== 'outlet') {
      showGate('any');
      return false;
    }
    // outlet OR master for 'outlet' need when we allow master to order too:
    // Spec: index requires outlet OR master — pass need='any' or use requireOutletOrMaster
    if (need === 'outlet' && isMaster()) {
      // master allowed on outlet pages
    }
    wireNav(document);
    applyNavVisibility();
    return true;
  }

  /** index.html: outlet token OR master */
  function requireOutletOrMaster() {
    parse();
    if (!_entry) {
      showGate('any');
      return false;
    }
    if (_entry.role !== 'outlet' && _entry.role !== 'master') {
      showGate('any');
      return false;
    }
    wireNav(document);
    applyNavVisibility();
    return true;
  }

  function listRegistry() {
    var out = [];
    Object.keys(ACCESS).forEach(function (t) {
      var e = ACCESS[t];
      out.push({
        token: t,
        role: e.role,
        outlet: e.outlet || null,
        name: e.name || e.label || '',
        label: e.role === 'master' ? (e.label || 'Master') : ((e.name || '') + ' (' + e.outlet + ')')
      });
    });
    // stable order: master first, then outlet order
    var order = ['FS','TC','KK','BV','CC','PP','BN','JNY','MK1','MK2','SA'];
    out.sort(function (a, b) {
      if (a.role === 'master' && b.role !== 'master') return -1;
      if (b.role === 'master' && a.role !== 'master') return 1;
      return order.indexOf(a.outlet) - order.indexOf(b.outlet);
    });
    return out;
  }

  function buildUrl(page, tok) {
    var t = tok || _token;
    page = page || 'index.html';
    return page + '#access=' + encodeURIComponent(t);
  }

  global.WalnutAccess = {
    ACCESS: ACCESS,
    BASE: BASE_PATH_HINT,
    parse: parse,
    require: require,
    requireOutletOrMaster: requireOutletOrMaster,
    isMaster: isMaster,
    outletCode: outletCode,
    outletName: outletName,
    headerRoleLabel: headerRoleLabel,
    initials: initials,
    entry: entry,
    role: role,
    label: label,
    token: token,
    appendAccess: appendAccess,
    wireNav: wireNav,
    applyNavVisibility: applyNavVisibility,
    showGate: showGate,
    listRegistry: listRegistry,
    buildUrl: buildUrl
  };
})(typeof window !== 'undefined' ? window : this);
