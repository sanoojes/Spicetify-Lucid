(async () => {
  for (; !Spicetify.React || !Spicetify.ReactDOM; )
    await new Promise((e) => setTimeout(e, 10));
  var D,
    l,
    R,
    T,
    z,
    o,
    n,
    A,
    i,
    V,
    F,
    x,
    L,
    e,
    t,
    r,
    U,
    a,
    H,
    G,
    W,
    K,
    s,
    q,
    J,
    Z,
    X,
    Y,
    c,
    Q,
    ee,
    u,
    te,
    ae,
    ne,
    re,
    le,
    oe,
    ie,
    se,
    d,
    ce,
    ue,
    de,
    me,
    pe,
    v,
    fe,
    ge,
    m,
    ve,
    ye,
    p,
    be,
    he,
    Ee,
    we,
    Se,
    f,
    g,
    ke,
    y,
    _e,
    b,
    h,
    E,
    w,
    S,
    k,
    xe,
    Le,
    Oe,
    Me,
    _,
    Ce,
    O,
    M,
    Ne,
    Be,
    C,
    $e,
    N,
    Ie,
    je,
    Pe,
    De,
    Re,
    B,
    Te,
    ze,
    Ae,
    Ve,
    $,
    Fe,
    Ue,
    He,
    Ge,
    We;
  async function Ke() {
    var e, t;
    window.isCustomControls ||
      ((t = q()),
      (e = J()),
      (t = Math.round((t ** 0.912872807 * 100) / 100 - 3)),
      await Spicetify.CosmosAsync.post('sp://messages/v1/container/control', {
        type: 'update_titlebar',
        height: t,
      }),
      !window.isWindows) ||
      window.isCustomControls ||
      window.isLightMode ||
      ((t = Z(135, e, 1)),
      window.rootStyle.setProperty('--control-height', '64px'),
      window.rootStyle.setProperty('--control-width', t + 'px'));
  }
  function I(e, t, a) {
    return '#' + ((e << 16) | (t << 8) | a).toString(16).padStart(6, '0');
  }
  function qe(e, t, a) {
    var [e, t, a] = [e / 255, t / 255, a / 255],
      [e, t, a] = [
        e <= 0.03928 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4,
        t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4,
        a <= 0.03928 ? a / 12.92 : ((a + 0.055) / 1.055) ** 2.4,
      ];
    return 0.2126 * e + 0.7152 * t + 0.0722 * a;
  }
  function Je(e, t) {
    return L(x({}, e), {
      r: Math.max(0, Math.round(e.r * t)),
      g: Math.max(0, Math.round(e.g * t)),
      b: Math.max(0, Math.round(e.b * t)),
      hex: I(
        Math.max(0, Math.round(e.r * t)),
        Math.max(0, Math.round(e.g * t)),
        Math.max(0, Math.round(e.b * t))
      ),
    });
  }
  function j(e, t) {
    return L(x({}, e), {
      r: Math.min(255, Math.round(e.r + (255 - e.r) * t)),
      g: Math.min(255, Math.round(e.g + (255 - e.g) * t)),
      b: Math.min(255, Math.round(e.b + (255 - e.b) * t)),
      hex: I(
        Math.min(255, Math.round(e.r + (255 - e.r) * t)),
        Math.min(255, Math.round(e.g + (255 - e.g) * t)),
        Math.min(255, Math.round(e.b + (255 - e.b) * t))
      ),
    });
  }
  function P(e, t) {
    (e = qe(e.r, e.g, e.b)), (t = qe(t.r, t.g, t.b));
    return (Math.max(e, t) + 0.05) / (Math.min(e, t) + 0.05);
  }
  async function Ze(r) {
    try {
      var l = await (0, le.loadImage)(r),
        o = Math.max(l.width / 20, 10),
        i = Math.max(l.height / 20, 10),
        s = (0, le.createCanvas)(o, i).getContext('2d'),
        c = (s.drawImage(l, 0, 0, o, i), s.getImageData(0, 0, o, i)),
        u = c.data,
        d = {};
      let t = {};
      var m = Math.floor(0.2 * u.length);
      for (let e = 0; e < m; e += 4) {
        var p = u[e],
          f = u[e + 1],
          g = u[e + 2],
          v = p + `-${f}-` + g;
        (d[v] = (d[v] || 0) + 1),
          (t[v] = { r: p, g: f, b: g, hex: I(p, f, g) });
      }
      var y = Object.entries(d)
          .sort((e, t) => t[1] - e[1])
          .map(([e]) => t[e]),
        b = y[0];
      let e = y[1],
        a = y[2],
        n = 2;
      for (; !e || P(b, e) < 2.5; ) {
        if (n >= y.length) {
          e = j(b, 0.2);
          break;
        }
        (e = y[n]), n++;
      }
      for (; !a || P(b, a) < 2.5 || P(e, a) < 2.5; ) {
        if (n >= y.length) {
          a = j(e, 0.2);
          break;
        }
        (a = y[n]), n++;
      }
      var h,
        E = {
          main: Je(b, 0.8),
          sidebar: Je(e, 0.9),
          card: Je(a, 0.9),
          accent: j(a, 0.4),
          highlight: j(e, 0.2),
          button: j(a, 0.4),
          'button-active': j(a, 0.4),
          text: j(b, 0.8),
          subtext: j(b, 0.9),
          primary: b,
          secondary: e,
          tertiary: a,
        };
      for (h of [E.main, E.sidebar, E.card])
        0.3 < qe(h.r, h.g, h.b) &&
          ((h.r = Math.max(0, Math.round(0.7 * h.r))),
          (h.g = Math.max(0, Math.round(0.7 * h.g))),
          (h.b = Math.max(0, Math.round(0.7 * h.b))),
          (h.hex = I(h.r, h.g, h.b))),
          (h =
            ((w = h),
            (S = 0.5),
            (_ = k = void 0),
            (k = Math.max(0, Math.min(255, Math.round(w.r * S)))),
            (_ = Math.max(0, Math.min(255, Math.round(w.g * S)))),
            (S = Math.max(0, Math.min(255, Math.round(w.b * S)))),
            L(x({}, w), { r: k, g: _, b: S, hex: I(k, _, S) })));
      return (
        E.accent &&
          E.main &&
          P(E.accent, E.main) < 4.5 &&
          (E.accent = j(E.accent, 0.2)),
        E
      );
    } catch (e) {
      return console.error('Error extracting colors:', e), e;
    }
    var w, S, k, _;
  }
  async function Xe(t, e) {
    try {
      if (e) {
        if (!window.currentArtUrl) return null;
        var a,
          n,
          r = await Ze(window.currentArtUrl);
        if (r instanceof Error)
          return (
            console.error('[Lucid] Error extracting colors:', r.message), null
          );
        let e = ':root{';
        for ([a, n] of Object.entries(r))
          e += ` --spice-${a}: ${n.hex} !important;
 --spice-rgb-${a}: ${n.r}, ${n.g}, ${n.b} !important;
`;
        return (e += '}'), (t.innerHTML = e), r;
      }
      return (t.innerHTML = ''), null;
    } catch (e) {
      return console.error('Error saving colors to style:', e), null;
    }
  }
  async function Ye(e) {
    e && e.remove();
  }
  (D = Object.create),
    (l = Object.defineProperty),
    (R = Object.defineProperties),
    (T = Object.getOwnPropertyDescriptor),
    (z = Object.getOwnPropertyDescriptors),
    (o = Object.getOwnPropertyNames),
    (n = Object.getOwnPropertySymbols),
    (A = Object.getPrototypeOf),
    (i = Object.prototype.hasOwnProperty),
    (V = Object.prototype.propertyIsEnumerable),
    (F = (e, t, a) =>
      t in e
        ? l(e, t, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (e[t] = a)),
    (x = (e, t) => {
      for (var a in (t = t || {})) i.call(t, a) && F(e, a, t[a]);
      if (n) for (var a of n(t)) V.call(t, a) && F(e, a, t[a]);
      return e;
    }),
    (L = (e, t) => R(e, z(t))),
    (t = (e, t, a) => (
      (a = null != e ? D(A(e)) : {}),
      ((t, a, n, r) => {
        if ((a && 'object' == typeof a) || 'function' == typeof a)
          for (let e of o(a))
            i.call(t, e) ||
              e === n ||
              l(t, e, {
                get: () => a[e],
                enumerable: !(r = T(a, e)) || r.enumerable,
              });
        return t;
      })(
        !t && e && e.__esModule
          ? a
          : l(a, 'default', { value: e, enumerable: !0 }),
        e
      )
    )),
    (r = (e = (e, t) =>
      function () {
        return (
          t || (0, e[o(e)[0]])((t = { exports: {} }).exports, t), t.exports
        );
      })({
      'external-global-plugin:react'(e, t) {
        t.exports = Spicetify.React;
      },
    })),
    (U = e({
      'node_modules/canvas/lib/parse-font.js'(e, t) {
        var a = `'([^']+)'|"([^"]+)"|[\\w\\s-]+`,
          r = new RegExp('(bold|bolder|lighter|[1-9]00) +', 'i'),
          l = new RegExp('(italic|oblique) +', 'i'),
          o = new RegExp('(small-caps) +', 'i'),
          i = new RegExp(
            '(ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded) +',
            'i'
          ),
          s = new RegExp(
            `([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q) *((?:${a})( *, *(?:${a}))*)`
          ),
          c = {};
        t.exports = (e) => {
          if (c[e]) return c[e];
          var t = s.exec(e);
          if (t) {
            var a,
              n = {
                weight: 'normal',
                style: 'normal',
                stretch: 'normal',
                variant: 'normal',
                size: parseFloat(t[1]),
                unit: t[2],
                family: t[3].replace(/["']/g, '').replace(/ *, */g, ','),
              },
              t = e.substring(0, t.index);
            switch (
              ((a = r.exec(t)) && (n.weight = a[1]),
              (a = l.exec(t)) && (n.style = a[1]),
              (a = o.exec(t)) && (n.variant = a[1]),
              (a = i.exec(t)) && (n.stretch = a[1]),
              n.unit)
            ) {
              case 'pt':
                n.size /= 0.75;
                break;
              case 'pc':
                n.size *= 16;
                break;
              case 'in':
                n.size *= 96;
                break;
              case 'cm':
                n.size *= 96 / 2.54;
                break;
              case 'mm':
                n.size *= 96 / 25.4;
                break;
              case '%':
                break;
              case 'em':
              case 'rem':
                n.size *= 16 / 0.75;
                break;
              case 'q':
                n.size *= 96 / 25.4 / 4;
            }
            return (c[e] = n);
          }
        };
      },
    })),
    (a = e({
      'node_modules/canvas/browser.js'(e) {
        var t = U();
        (e.parseFont = t),
          (e.createCanvas = function (e, t) {
            return Object.assign(document.createElement('canvas'), {
              width: e,
              height: t,
            });
          }),
          (e.createImageData = function (e, t, a) {
            switch (arguments.length) {
              case 0:
                return new ImageData();
              case 1:
                return new ImageData(e);
              case 2:
                return new ImageData(e, t);
              default:
                return new ImageData(e, t, a);
            }
          }),
          (e.loadImage = function (r, l) {
            return new Promise(function (e, t) {
              let a = Object.assign(document.createElement('img'), l);
              function n() {
                (a.onload = null), (a.onerror = null);
              }
              (a.onload = function () {
                n(), e(a);
              }),
                (a.onerror = function () {
                  n(), t(new Error('Failed to load the image "' + r + '"'));
                }),
                (a.src = r);
            });
          });
      },
    })),
    (H = e({
      '../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js'(
        e
      ) {
        function i(e) {
          for (
            var t = arguments.length, a = new Array(1 < t ? t - 1 : 0), n = 1;
            n < t;
            n++
          )
            a[n - 1] = arguments[n];
          var r = 'error',
            l = a,
            o = u.ReactDebugCurrentFrame.getStackAddendum();
          '' !== o && ((e += '%s'), (l = l.concat([o]))),
            (o = l.map(function (e) {
              return String(e);
            })).unshift('Warning: ' + e),
            Function.prototype.apply.call(console[r], console, o);
        }
        function s(e) {
          var t = e.getSnapshot,
            e = e.value;
          try {
            var a = t();
            return !d(e, a);
          } catch (e) {
            return 1;
          }
        }
        var c, u, d, m, p, f, g, v, y, t;
        'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' ==
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
            new Error()
          ),
          (c = r()),
          (u = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED),
          (d =
            'function' == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                }),
          (m = c.useState),
          (p = c.useEffect),
          (f = c.useLayoutEffect),
          (g = c.useDebugValue),
          (y = v = !1),
          (t = !(
            'undefined' == typeof window ||
            void 0 === window.document ||
            void 0 === window.document.createElement
          )),
          (t =
            void 0 !== c.useSyncExternalStore
              ? c.useSyncExternalStore
              : !t
              ? function (e, t, a) {
                  return t();
                }
              : function (e, t, a) {
                  v ||
                    (void 0 !== c.startTransition &&
                      ((v = !0),
                      i(
                        'You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release.'
                      )));
                  var n = t(),
                    r =
                      (y ||
                        ((r = t()), d(n, r)) ||
                        (i(
                          'The result of getSnapshot should be cached to avoid an infinite loop'
                        ),
                        (y = !0)),
                      m({ inst: { value: n, getSnapshot: t } })),
                    l = r[0].inst,
                    o = r[1];
                  return (
                    f(
                      function () {
                        (l.value = n),
                          (l.getSnapshot = t),
                          s(l) && o({ inst: l });
                      },
                      [e, n, t]
                    ),
                    p(
                      function () {
                        s(l) && o({ inst: l });
                        return e(function () {
                          s(l) && o({ inst: l });
                        });
                      },
                      [e]
                    ),
                    g(n),
                    n
                  );
                }),
          (e.useSyncExternalStore = t),
          'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' ==
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
              new Error()
            );
      },
    })),
    (G = e({
      '../../node_modules/use-sync-external-store/shim/index.js'(e, t) {
        t.exports = H();
      },
    })),
    (W = e({
      '../../node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js'(
        e
      ) {
        var t, a, u, l, d, m, p, f;
        'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
          'function' ==
            typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(
            new Error()
          ),
          (t = r()),
          (a = G()),
          (u =
            'function' == typeof Object.is
              ? Object.is
              : function (e, t) {
                  return (
                    (e === t && (0 !== e || 1 / e == 1 / t)) ||
                    (e != e && t != t)
                  );
                }),
          (l = a.useSyncExternalStore),
          (d = t.useRef),
          (m = t.useEffect),
          (p = t.useMemo),
          (f = t.useDebugValue),
          (e.useSyncExternalStoreWithSelector = function (e, a, o, i, s) {
            var c,
              t = d(null);
            null === t.current
              ? ((c = { hasValue: !1, value: null }), (t.current = c))
              : (c = t.current);
            var n = (t = p(
                function () {
                  var n,
                    r,
                    l = !1,
                    e = function (e) {
                      if (l)
                        return (
                          (t = r),
                          u(n, e) || ((a = i(e)), void 0 !== s && s(t, a))
                            ? t
                            : ((n = e), (r = a))
                        );
                      l = !0;
                      var t = i((n = e));
                      if (void 0 !== s && c.hasValue) {
                        var a = c.value;
                        if (s(a, t)) return (r = a);
                      }
                      return (r = t);
                    },
                    t = void 0 === o ? null : o;
                  return [
                    function () {
                      return e(a());
                    },
                    null === t
                      ? void 0
                      : function () {
                          return e(t());
                        },
                  ];
                },
                [a, o, i, s]
              ))[0],
              r = l(e, n, t[1]);
            return (
              m(
                function () {
                  (c.hasValue = !0), (c.value = r);
                },
                [r]
              ),
              f(r),
              r
            );
          }),
          'undefined' != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' ==
              typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(
              new Error()
            );
      },
    })),
    (e = e({
      '../../node_modules/use-sync-external-store/shim/with-selector.js'(e, t) {
        t.exports = W();
      },
    })),
    (K = t(r())),
    (s = t(r())),
    (q = () => {
      var e = window.innerWidth;
      return (window.outerWidth / e) * 100;
    }),
    (J = () => window.innerWidth / window.outerWidth),
    (Z = (e, t, a = 1, n = 0, r = Number.POSITIVE_INFINITY) =>
      Math.max(n, Math.min(e * (t + a - 1), r))),
    (X = t(r())),
    (Y = () => {
      var e = X.default.useRef(null);
      return X.default.createElement('div', {
        ref: e,
        className: 'lucid-transperent-window-controls',
      });
    }),
    (c = t(r())),
    (Q = t(r())),
    (ee = () =>
      Q.default.createElement('div', { className: 'static-background' })),
    (u = t(r())),
    (te = () =>
      u.default.createElement(
        'div',
        { className: 'animated-background-container' },
        u.default.createElement('div', { className: 'back' }),
        u.default.createElement('div', { className: 'backleft' }),
        u.default.createElement('div', { className: 'backright' }),
        u.default.createElement('div', { className: 'front' })
      )),
    (ae = t(r())),
    (ne = () =>
      ae.default.createElement('div', { className: 'solid-background' })),
    (re = t(r())),
    (le = t(a())),
    (oe = {}),
    (ie = (e) => {
      let n,
        r = new Set();
      var t = (e, a) => {
          e = 'function' == typeof e ? e(n) : e;
          if (!Object.is(e, n)) {
            let t = n;
            (n = (null != a ? a : 'object' != typeof e || null === e)
              ? e
              : Object.assign({}, n, e)),
              r.forEach((e) => e(n, t));
          }
        },
        a = () => n,
        l = {
          setState: t,
          getState: a,
          getInitialState: () => o,
          subscribe: (e) => (r.add(e), () => r.delete(e)),
          destroy: () => {
            'production' !== (oe.env ? oe.env.MODE : void 0) &&
              console.warn(
                '[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.'
              ),
              r.clear();
          },
        };
      let o = (n = e(t, a, l));
      return l;
    }),
    (se = (e) => (e ? ie(e) : ie)),
    (a = t(r(), 1)),
    (e = t(e(), 1)),
    (d = {}),
    (ce = a.default.useDebugValue),
    (ue = e.default.useSyncExternalStoreWithSelector),
    (de = !1),
    (me = (e) => e),
    (a = (e) => {
      'production' !== (d.env ? d.env.MODE : void 0) &&
        'function' != typeof e &&
        console.warn(
          "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
        );
      let n = 'function' == typeof e ? se(e) : e;
      e = (e, t) => {
        return (
          ([e, t = me, a] = [n, e, t]),
          'production' !== (d.env ? d.env.MODE : void 0) &&
            a &&
            !de &&
            (console.warn(
              "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
            ),
            (de = !0)),
          (e = ue(
            e.subscribe,
            e.getState,
            e.getServerState || e.getInitialState,
            t,
            a
          )),
          ce(e),
          e
        );
        var a;
      };
      return Object.assign(e, n), e;
    }),
    (pe = {}),
    (v = (a) => (e) => {
      try {
        let t = a(e);
        return t instanceof Promise
          ? t
          : {
              then(e) {
                return v(e)(t);
              },
              catch(e) {
                return this;
              },
            };
      } catch (t) {
        return {
          then(e) {
            return this;
          },
          catch(e) {
            return v(e)(t);
          },
        };
      }
    }),
    (ge = {
      backgroundMode: 'static',
      backgroundStyles: {
        solid: { opacity: 1, backgroundColor: 'var(--spice-main)' },
        static: {
          blur: 32,
          opacity: 1,
          saturation: 1.1,
          contrast: 1.2,
          brightness: 0.6,
          backgroundColor: 'var(--spice-main)',
        },
        animated: {
          blur: 32,
          time: 45,
          opacity: 1,
          saturation: 1.1,
          contrast: 1.2,
          brightness: 0.6,
          backgroundColor: 'var(--spice-main)',
        },
      },
      grainEffect: 'stary',
      isDynamicColor: !(fe = (p, f) => (a, n, e) => {
        let r = {
            storage: ((e, a) => {
              let n;
              try {
                n = e();
              } catch (e) {
                return;
              }
              return {
                getItem: (e) => {
                  var t = (e) =>
                      null === e
                        ? null
                        : JSON.parse(e, null == a ? void 0 : a.reviver),
                    e = null != (e = n.getItem(e)) ? e : null;
                  return e instanceof Promise ? e.then(t) : t(e);
                },
                setItem: (e, t) =>
                  n.setItem(
                    e,
                    JSON.stringify(t, null == a ? void 0 : a.replacer)
                  ),
                removeItem: (e) => n.removeItem(e),
              };
            })(() => localStorage),
            partialize: (e) => e,
            version: 0,
            merge: (e, t) => ({ ...t, ...e }),
            ...f,
          },
          l = !1,
          o = new Set(),
          i = new Set(),
          s = r.storage;
        if (!s)
          return p(
            (...e) => {
              console.warn(
                `[zustand persist middleware] Unable to update item '${r.name}', the given storage is currently unavailable.`
              ),
                a(...e);
            },
            n,
            e
          );
        let c = () => {
            var e = r.partialize({ ...n() });
            return s.setItem(r.name, { state: e, version: r.version });
          },
          u = e.setState,
          d =
            ((e.setState = (e, t) => {
              u(e, t), c();
            }),
            p(
              (...e) => {
                a(...e), c();
              },
              n,
              e
            ));
        e.getInitialState = () => d;
        let m,
          t = () => {
            var e;
            if (s) {
              (l = !1), o.forEach((e) => e(null != (e = n()) ? e : d));
              let t =
                (null == (e = r.onRehydrateStorage)
                  ? void 0
                  : e.call(r, null != (e = n()) ? e : d)) || void 0;
              return v(s.getItem.bind(s))(r.name)
                .then((e) => {
                  if (e) {
                    if ('number' != typeof e.version || e.version === r.version)
                      return [!1, e.state];
                    if (r.migrate) return [!0, r.migrate(e.state, e.version)];
                    console.error(
                      "State loaded from storage couldn't be migrated since no migrate function was provided"
                    );
                  }
                  return [!1, void 0];
                })
                .then((e) => {
                  var [e, t] = e;
                  if (
                    ((m = r.merge(t, null != (t = n()) ? t : d)), a(m, !0), e)
                  )
                    return c();
                })
                .then(() => {
                  null != t && t(m, void 0),
                    (m = n()),
                    (l = !0),
                    i.forEach((e) => e(m));
                })
                .catch((e) => {
                  null != t && t(void 0, e);
                });
            }
          };
        return (
          (e.persist = {
            setOptions: (e) => {
              (r = { ...r, ...e }), e.storage && (s = e.storage);
            },
            clearStorage: () => {
              null != s && s.removeItem(r.name);
            },
            getOptions: () => r,
            rehydrate: () => t(),
            hasHydrated: () => l,
            onHydrate: (e) => (
              o.add(e),
              () => {
                o.delete(e);
              }
            ),
            onFinishHydration: (e) => (
              i.add(e),
              () => {
                i.delete(e);
              }
            ),
          }),
          r.skipHydration || t(),
          m || d
        );
      }),
      playbarMode: 'default',
      playbarStyles: {
        compact: {
          opacity: 1,
          saturation: 1.1,
          contrast: 1.2,
          brightness: 0.6,
          backdropBlur: 32,
          backgroundColor: 'var(--spice-main)',
        },
        default: {
          time: 45,
          opacity: 1,
          saturation: 1.1,
          contrast: 1.2,
          brightness: 0.6,
          backdropBlur: 32,
          backgroundColor: 'var(--spice-main)',
        },
      },
      fontFamily: 'Poppins',
      fontImportUrl:
        'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
      playlistViewMode: 'card',
    }),
    (m = (e = ((e, t) => {
      var f, g;
      return 'getStorage' in t || 'serialize' in t || 'deserialize' in t
        ? ('production' !== (pe.env ? pe.env.MODE : void 0) &&
            console.warn(
              '[DEPRECATED] `getStorage`, `serialize` and `deserialize` options are deprecated. Use `storage` option instead.'
            ),
          (f = e),
          (g = t),
          (a, n, e) => {
            let r = {
                getStorage: () => localStorage,
                serialize: JSON.stringify,
                deserialize: JSON.parse,
                partialize: (e) => e,
                version: 0,
                merge: (e, t) => ({ ...t, ...e }),
                ...g,
              },
              l = !1,
              o = new Set(),
              i = new Set(),
              s;
            try {
              s = r.getStorage();
            } catch (e) {}
            if (!s)
              return f(
                (...e) => {
                  console.warn(
                    `[zustand persist middleware] Unable to update item '${r.name}', the given storage is currently unavailable.`
                  ),
                    a(...e);
                },
                n,
                e
              );
            let c = v(r.serialize),
              u = () => {
                var e = r.partialize({ ...n() });
                let t;
                e = c({ state: e, version: r.version })
                  .then((e) => s.setItem(r.name, e))
                  .catch((e) => {
                    t = e;
                  });
                if (t) throw t;
                return e;
              },
              d = e.setState,
              m =
                ((e.setState = (e, t) => {
                  d(e, t), u();
                }),
                f(
                  (...e) => {
                    a(...e), u();
                  },
                  n,
                  e
                )),
              p,
              t = () => {
                var e;
                if (s) {
                  (l = !1), o.forEach((e) => e(n()));
                  let t =
                    (null == (e = r.onRehydrateStorage)
                      ? void 0
                      : e.call(r, n())) || void 0;
                  return v(s.getItem.bind(s))(r.name)
                    .then((e) => {
                      if (e) return r.deserialize(e);
                    })
                    .then((e) => {
                      if (e)
                        return 'number' != typeof e.version ||
                          e.version === r.version
                          ? e.state
                          : r.migrate
                          ? r.migrate(e.state, e.version)
                          : void console.error(
                              "State loaded from storage couldn't be migrated since no migrate function was provided"
                            );
                    })
                    .then(
                      (e) => (
                        (p = r.merge(e, null != (e = n()) ? e : m)),
                        a(p, !0),
                        u()
                      )
                    )
                    .then(() => {
                      null != t && t(p, void 0),
                        (l = !0),
                        i.forEach((e) => e(p));
                    })
                    .catch((e) => {
                      null != t && t(void 0, e);
                    });
                }
              };
            return (
              (e.persist = {
                setOptions: (e) => {
                  (r = { ...r, ...e }), e.getStorage && (s = e.getStorage());
                },
                clearStorage: () => {
                  null != s && s.removeItem(r.name);
                },
                getOptions: () => r,
                rehydrate: () => t(),
                hasHydrated: () => l,
                onHydrate: (e) => (
                  o.add(e),
                  () => {
                    o.delete(e);
                  }
                ),
                onFinishHydration: (e) => (
                  i.add(e),
                  () => {
                    i.delete(e);
                  }
                ),
              }),
              t(),
              p || m
            );
          })
        : fe(e, t);
    })(
      (r) =>
        L(x({}, ge), {
          setBackgroundMode: (e) => r(() => ({ backgroundMode: e })),
          setFontFamily: (e) => r(() => ({ fontFamily: e })),
          setFontImportUrl: (e) => r(() => ({ fontImportUrl: e })),
          setGrainEffect: (e) => r(() => ({ grainEffect: e })),
          setPlaybarMode: (e) => r(() => ({ playbarMode: e })),
          setPlaybarStyles: (e) => r(() => ({ playbarStyles: e })),
          setPlaylistViewMode: (e) => r(() => ({ playlistViewMode: e })),
          setDynamicColor: (t) => r((e) => ({ isDynamicColor: t })),
          updateBackgroundStyles: (t, a, n) => {
            r((e) =>
              L(x({}, e), {
                backgroundStyles: L(x({}, e.backgroundStyles), {
                  [t]: L(x({}, e.backgroundStyles[t]), { [a]: n }),
                }),
              })
            );
          },
          resetSettings: () => {
            r(ge);
          },
        }),
      { name: 'lucid-settings' }
    ))
      ? a(e)
      : a),
    (ve = () => {
      let e = m().isDynamicColor,
        t = document.getElementById('lucid_dynamic_colors'),
        a =
          (t ||
            (((t = document.createElement('style')).id =
              'lucid_dynamic_colors'),
            document.head.appendChild(t)),
          () => {
            Xe(t, e)
              .then(() => console.log('[Lucid] Dynamic colors updated!'))
              .catch((e) =>
                console.error('[Lucid] Error updating dynamic colors:', e)
              );
          });
      return (
        re.default.useEffect(() => {
          if (e)
            return (
              Spicetify.Player.addEventListener('songchange', a),
              Xe(t, e)
                .then(() =>
                  console.log('[Lucid] Dynamic colors applied initially!')
                )
                .catch((e) =>
                  console.error(
                    '[Lucid] Error applying dynamic colors initially:',
                    e
                  )
                ),
              () => {
                Spicetify.Player.removeEventListener('songchange', a), Ye(t);
              }
            );
          Ye(t);
        }, [e, t]),
        re.default.createElement('div', { id: 'dynamic-colors' })
      );
    }),
    (ye = () => {
      let { backgroundMode: t, backgroundStyles: a } = m(),
        [e, n] = c.default.useState({});
      return (
        c.default.useEffect(() => {
          var e;
          n({
            '--background-color':
              null == (e = a[t]) ? void 0 : e.backgroundColor,
            '--opacity': null == (e = a[t]) ? void 0 : e.opacity,
            '--brightness': null == (e = a[t]) ? void 0 : e.brightness,
            '--contrast': null == (e = a[t]) ? void 0 : e.contrast,
            '--time': `${(null == (e = a[t]) ? void 0 : e.time) || 0}s`,
            '--blur': `${(null == (e = a[t]) ? void 0 : e.blur) || 0}px`,
            '--saturation': null == (e = a[t]) ? void 0 : e.saturation,
            '--backdrop-blur': `${
              (null == (e = a[t]) ? void 0 : e.backdropBlur) || 0
            }px`,
          });
        }, [t, a]),
        c.default.createElement(
          'div',
          { className: 'background-wrapper', style: e },
          'animated' === t && c.default.createElement(te, null),
          'static' === t && c.default.createElement(ee, null),
          'solid' === t && c.default.createElement(ne, null),
          c.default.createElement(ve, null)
        )
      );
    }),
    (p = t(r())),
    (be = t(r())),
    (he = Spicetify.React.createContext(null)),
    (Ee = ({ children: e }) => {
      let [t, a] = be.default.useState(!1);
      return be.default.createElement(
        he.Provider,
        {
          value: { isOpen: t, openModal: () => a(!0), closeModal: () => a(!1) },
        },
        e
      );
    }),
    (we = () => {
      var e = Spicetify.React.useContext(he);
      if (e) return e;
      throw new Error('[Lucid] Wrap Element with ModalContextProvider');
    }),
    (Se = ({ cb: t }) => (
      Spicetify.React.useEffect(() => {
        let e = new Spicetify.Menu.Item(
          'Lucid Settings',
          !1,
          () => t(),
          '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>'
        );
        return (
          e.register(),
          () => {
            e.deregister();
          }
        );
      }, [t]),
      null
    )),
    (f = t(r())),
    (g = t(r())),
    (ke = g.default.memo(({ title: e, children: t, headingChild: a }) => {
      let { isOpen: n, closeModal: r } = we();
      return n
        ? g.default.createElement(
            'div',
            { className: 'modal-container' },
            g.default.createElement('div', {
              className: 'modal-overlay ' + (n && 'open'),
              style: { zIndex: 20 },
              onClick: r,
            }),
            g.default.createElement(
              'div',
              {
                className: 'modal-section ' + (n && 'open'),
                role: 'dialog',
                'aria-label': e,
                'aria-modal': 'true',
              },
              g.default.createElement(
                'div',
                { className: 'main-embedWidgetGenerator-container' },
                g.default.createElement(
                  'div',
                  { className: 'main-trackCreditsModal-header' },
                  g.default.createElement(
                    'h1',
                    { className: 'main-type-alto' },
                    e
                  ),
                  a && g.default.createElement('div', null, a),
                  g.default.createElement(
                    'button',
                    {
                      type: 'button',
                      'aria-label': 'Close',
                      className: 'main-trackCreditsModal-closeBtn',
                      onClick: () => r(),
                    },
                    g.default.createElement(
                      'svg',
                      {
                        width: '18',
                        height: '18',
                        viewBox: '0 0 32 32',
                        xmlns: 'http://www.w3.org/2000/svg',
                      },
                      g.default.createElement('title', null, 'Close'),
                      g.default.createElement('path', {
                        d: 'M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143',
                        fill: 'currentColor',
                        'fill-rule': 'evenodd',
                      })
                    )
                  )
                ),
                g.default.createElement(
                  'div',
                  { className: 'modal-contents' },
                  g.default.createElement(
                    'main',
                    { className: 'modal-wrapper' },
                    t
                  )
                )
              )
            )
          )
        : null;
    })),
    (y = t(r())),
    (_e = ({ title: e, description: t, children: a }) =>
      y.default.createElement(
        'div',
        { className: 'setting-section' },
        y.default.createElement(
          'div',
          { className: 'heading-wrapper' },
          y.default.createElement('h3', { className: 'title' }, e),
          t && y.default.createElement('p', { className: 'description' }, t)
        ),
        y.default.createElement('div', { className: 'cards-wrapper' }, a)
      )),
    (b = t(r())),
    (h = t(r())),
    (E = ({ options: e, selectedValue: a, onSelect: n, label: t }) => {
      let [r, l] = h.default.useState(!1),
        o = h.default.useRef(null);
      var i = h.default.useRef(null);
      h.default.useEffect(() => {
        let e = (e) => {
          o.current && !o.current.contains(e.target) && l(!1);
        };
        return (
          document.addEventListener('mousedown', e),
          () => {
            document.removeEventListener('mousedown', e);
          }
        );
      }, []);
      return h.default.createElement(
        'div',
        { className: 'dropdown-container', ref: o },
        h.default.createElement(
          'button',
          {
            className: 'dropdown-button ' + (r && 'open'),
            onClick: () => {
              l(!r);
            },
            'aria-haspopup': 'listbox',
            'aria-expanded': r,
            'aria-label': 'Toggle dropdown menu',
            type: 'button',
          },
          t || a,
          h.default.createElement(
            'span',
            { className: 'dropdown-arrow' },
            h.default.createElement(
              'svg',
              {
                role: 'img',
                'aria-labelledby': 'title',
                width: '24',
                height: '24',
                fill: 'none',
                viewBox: '0 0 24 24',
                xmlns: 'http://www.w3.org/2000/svg',
              },
              h.default.createElement('span', { id: 'title' }, 'Down'),
              h.default.createElement('path', {
                d: 'M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z',
                fill: '#ffffff',
              })
            )
          )
        ),
        r &&
          h.default.createElement(
            'ul',
            {
              className: 'dropdown-menu',
              'aria-label': 'Dropdown menu',
              ref: i,
            },
            e.map((t) =>
              h.default.createElement(
                'li',
                {
                  key: t.value,
                  onClick: () => {
                    return (e = t.value), n(e), void l(!1);
                    var e;
                  },
                  className:
                    a === t.value ? 'dropdown-item selected' : 'dropdown-item',
                  'aria-selected': a === t.value,
                  tabIndex: -1,
                },
                t.label
              )
            )
          )
      );
    }),
    (w = t(r())),
    (S = ({ title: e, tooltip: t, selectedValue: a, children: n }) =>
      w.default.createElement(
        'div',
        { className: 'card' },
        w.default.createElement(
          'div',
          { className: 'title-wrapper' },
          e && w.default.createElement('h5', { className: 'title' }, e),
          t && w.default.createElement('p', { className: 'tooltip' }, t),
          a &&
            w.default.createElement(
              'p',
              { className: 'selected-value' },
              'Selected: ',
              a
            )
        ),
        w.default.createElement('div', { className: 'children-wrapper' }, n)
      )),
    (k = t(r())),
    (xe = ({ onChange: e, currentValue: t }) =>
      k.default.createElement(
        'div',
        { className: 'slider-wrapper' },
        k.default.createElement(
          'label',
          { className: 'switch' },
          k.default.createElement('input', {
            type: 'checkbox',
            checked: t,
            onChange: () => {
              e(!t);
            },
          }),
          k.default.createElement('span', { className: 'slider round' })
        )
      )),
    (Le = t(r())),
    (Oe = ({
      name: e,
      step: t,
      type: a,
      value: n,
      placeholder: r,
      onChange: l,
    }) =>
      Le.default.createElement('input', {
        type: a,
        name: e,
        step: t,
        placeholder: r,
        value: void 0 !== n ? n.toString() : '',
        className: 'input',
        onChange: (e) => {
          l(e);
        },
      })),
    (Me = b.default.memo(() => {
      let {
          backgroundMode: a,
          backgroundStyles: e,
          isDynamicColor: t,
          setBackgroundMode: n,
          setDynamicColor: r,
          updateBackgroundStyles: l,
        } = m(),
        [o, i] = b.default.useState(a);
      b.default.useEffect(() => n(o), [o]);
      return b.default.createElement(
        b.default.Fragment,
        null,
        b.default.createElement(
          S,
          {
            title: 'Set Background',
            selectedValue:
              'animated' === a
                ? 'Animated Background'
                : 'solid' === a
                ? 'Solid Background'
                : 'static' === a
                ? 'Static Background'
                : void 0,
          },
          b.default.createElement(
            'div',
            null,
            b.default.createElement(E, {
              options: [
                { label: 'Animated', value: 'animated' },
                { label: 'Static', value: 'static' },
                { label: 'Solid', value: 'solid' },
              ],
              selectedValue: o,
              onSelect: (e) => {
                i(e);
              },
              label: 'Select an option',
            })
          )
        ),
        Object.entries(e[a]).map(([t, e]) =>
          b.default.createElement(
            S,
            { key: t, title: 'Set ' + t },
            b.default.createElement(Oe, {
              type: 'backgroundColor' === t ? 'text' : 'number',
              name: t,
              step: 0.01,
              value: e,
              onChange: (e) =>
                ((e, t) => {
                  e = e.target.value.trim();
                  l(a, t, e);
                })(e, t),
            })
          )
        ),
        b.default.createElement(
          S,
          { title: 'Dynamic Color (Experimental)' },
          b.default.createElement(xe, {
            currentValue: t,
            onChange: (e) => r(e),
          })
        )
      );
    })),
    (_ = t(r())),
    (Ce = () => {
      let e = m().resetSettings;
      return _.default.createElement(
        'div',
        null,
        _.default.createElement(
          S,
          { title: 'Reset to Default' },
          _.default.createElement(
            'button',
            {
              type: 'button',
              className: 'button reset-button',
              onClick: () => {
                confirm(
                  'Are you sure you want to reset all background settings to their default values? This action cannot be undone.'
                ) && e();
              },
            },
            'Reset'
          )
        )
      );
    }),
    (O = t(r())),
    (M = t(r())),
    (Ne = () => {
      let { fontFamily: e, fontImportUrl: t, setFontImportUrl: a } = m(),
        [n, r] = M.default.useState(t || e);
      return M.default.createElement(
        'div',
        null,
        M.default.createElement(Oe, {
          name: 'Font Family',
          onChange: (e) => {
            r(e.target.value), a(e.target.value);
          },
          placeholder: 'Enter Font Family Name or Google Fonts link',
          type: 'text',
          value: n,
        })
      );
    }),
    (Be = () => {
      var e = m().fontFamily;
      return O.default.createElement(
        'div',
        null,
        O.default.createElement(
          S,
          { title: 'Font Family', selectedValue: e },
          O.default.createElement(Ne, null)
        )
      );
    }),
    (C = t(r())),
    ($e = () => {
      let { playlistViewMode: e, setPlaylistViewMode: t } = m();
      return C.default.createElement(
        'div',
        null,
        C.default.createElement(
          S,
          { title: 'Set Playlist View', selectedValue: e },
          C.default.createElement(E, {
            options: [
              { label: 'Default', value: 'default' },
              { label: 'compact', value: 'compact' },
              { label: 'card', value: 'card' },
            ],
            onSelect: (e) => {
              t(e);
            },
            selectedValue: e,
          })
        )
      );
    }),
    (N = t(r())),
    (Ie = () => {
      let { grainEffect: e, setGrainEffect: t } = m();
      return N.default.createElement(
        'div',
        null,
        N.default.createElement(
          S,
          { title: 'Set Grains', selectedValue: e },
          N.default.createElement(E, {
            options: [
              { label: 'Stary', value: 'stary' },
              { label: 'Default', value: 'default' },
              { label: 'None', value: 'none' },
            ],
            onSelect: (e) => {
              t(e);
            },
            selectedValue: e,
          })
        )
      );
    }),
    (je = f.default.memo(() => {
      var e = [
        {
          key: 'background',
          title: 'Background',
          description: "Customize your theme's background.",
          content: f.default.createElement(Me, null),
        },
        {
          key: 'grains',
          title: 'Grains',
          description: 'Set your grain texture.',
          content: f.default.createElement(Ie, null),
        },
        {
          key: 'playlistView',
          title: 'Playlist View',
          description: 'Configure your playlist view.',
          content: f.default.createElement($e, null),
        },
        {
          key: 'font',
          title: 'Font',
          description: 'Select your desired font.',
          content: f.default.createElement(Be, null),
        },
        {
          key: 'reset',
          title: 'Reset Settings',
          description: 'Reset to default settings.',
          content: f.default.createElement(Ce, null),
        },
      ];
      return f.default.createElement(
        ke,
        { title: 'Lucid Settings' },
        f.default.createElement(
          'div',
          { className: 'sections-container' },
          e.map((e) =>
            f.default.createElement(
              'div',
              { className: 'section-wrapper', key: e.key, id: e.key },
              f.default.createElement(
                _e,
                { title: e.title, description: e.description },
                e.content
              )
            )
          )
        )
      );
    })),
    (Pe = p.default.memo(() => {
      let { isOpen: e, openModal: t } = we();
      return p.default.createElement(
        p.default.Fragment,
        null,
        p.default.createElement(Se, { cb: () => t() }),
        e ? p.default.createElement(je, null) : null
      );
    })),
    (De = t(r())),
    (Re = () => {
      let e = m().playlistViewMode;
      return (
        (0, De.useEffect)(
          () => (
            document.body.classList.remove(
              'playlist-view-compact',
              'playlist-view-default',
              'playlist-view-card'
            ),
            document.body.classList.add('playlist-view-' + e),
            () => {
              document.body.classList.remove('playlist-view-' + e);
            }
          ),
          [e]
        ),
        De.default.createElement('div', {
          id: 'playlistViewMode',
          'data-playlistViewMode': e,
        })
      );
    }),
    (B = t(r())),
    (Te = () => {
      let {
          fontFamily: e,
          fontImportUrl: a,
          setFontFamily: n,
          setFontImportUrl: r,
        } = m(),
        [t, l] = B.default.useState(null),
        o = () => {
          var t;
          if (
            (l(null),
            ((e) => {
              try {
                return new URL(e), !0;
              } catch (e) {
                return !1;
              }
            })(a))
          ) {
            n(
              decodeURIComponent(
                (null ==
                (t = null == (t = a.match(/family=([^&:]+)/)) ? void 0 : t[1])
                  ? void 0
                  : t.replace(/\+/g, ' ')) || ''
              )
            );
            let e = document.getElementById('custom-font');
            e
              ? (e.href = a)
              : (((e = document.createElement('link')).rel =
                  'preload stylesheet'),
                (e.as = 'style'),
                (e.id = 'custom-font'),
                (e.href = a),
                document.head.appendChild(e));
          } else
            a ? (n(a), r('')) : l('Please enter a valid font family or URL.');
          null != (t = window.rootStyle) && t.setProperty('--font-to-use', e);
        };
      return (
        B.default.useEffect(() => {
          t && console.error('Font loading error:', t);
        }, [t]),
        B.default.useEffect(() => {
          o();
        }, [e, a]),
        B.default.createElement('div', {
          id: 'font',
          'data-font-family': e,
          'data-font-import-url': a,
        })
      );
    }),
    (ze = t(r())),
    (Ae = () => {
      let e = m().grainEffect;
      return (
        (0, ze.useEffect)(
          () => (
            document.body.classList.remove(
              'grain-stary',
              'grain-default',
              'grain-none'
            ),
            document.body.classList.add('grain-' + e),
            () => {
              document.body.classList.remove('grain-' + e);
            }
          ),
          [e]
        ),
        ze.default.createElement('div', {
          id: 'grainEffect',
          'data-grainEffect': e,
        })
      );
    }),
    (Ve = () => {
      Spicetify.React.useEffect(() => {
        (() => {
          var a = Spicetify.Locale;
          function n(e) {
            return e.replace(/[{0}{1}«»”“]/g, '').trim();
          }
          if (a) {
            var r = n(a.get('playlist.a11y.play') || ''),
              l = n(a.get('playlist.a11y.pause') || ''),
              o = a.get('play'),
              i = a.get('pause'),
              s = a.get('browse'),
              c = a.get(
                'web-player.aligned-curation.tooltips.add-to-liked-songs'
              ),
              u = a.get('web-player.aligned-curation.tooltips.add-to-playlist'),
              d = a.get('playback-control.skip-forward'),
              m = a.get('playback-control.skip-back'),
              p = a.get('buddy-feed.friend-activity'),
              f = a.get('tracklist.a11y.play') || '',
              g = a.get('view.web-player-home');
            let e, t;
            ['zh-CN', 'zh-TW', 'am', 'fi'].includes(a.getLocale())
              ? ([e, t] = f.split('{1}'))
              : ([e, t] = f.split('{0}')),
              (e = n(e)),
              (t = n(t));
            var f = a.get('playback-control.enable-repeat'),
              v = a.get('playback-control.enable-repeat-one'),
              a = a.get('playback-control.disable-repeat'),
              y = document.createElement('style');
            (y.innerHTML = `
.main-repeatButton-button[aria-checked="false"],
.player-controls__right button[aria-label*="${f}"]  span{
  -webkit-mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  background-color: var(--spice-subtext);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="mixed"],
.player-controls__right button[aria-label*="${a}"] span {
  -webkit-mask-image: var(--repeat-mixed-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-mixed.svg"));
  mask-image: var(--repeat-mixed-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-mixed.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="true"],
.player-controls__right button[aria-label*="${v}"] span {
  -webkit-mask-image: var(--repeat-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat.svg"));
  mask-image: var(--repeat-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.player-controls__right button[aria-label*="${a}"] svg,
.player-controls__right button[aria-label*="${f}"] svg {
  transform: scale(1.15);
}

.player-controls__right button[aria-label*="${a}"] svg,
.player-controls__right button[aria-label*="${f}"] svg {
  visibility: hidden;
  opacity: 0;
}

.main-repeatButton-button {
  transform: scale(0.65) !important;
}

.player-controls__buttons button[aria-label*="${o}"] span,
.main-playButton-button[aria-label*="${o}"],
.main-playButton-PlayButton>button[aria-label*="${o}"],
.main-playPauseButton-button[aria-label="${o}"],
.main-trackList-rowPlayPauseButton[aria-label*="${o}"],
.main-trackList-rowImagePlayButton[aria-label*="${e}"][aria-label*="${t}"],
.main-playButton-PlayButton>button[aria-label*="${r}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
  mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
}

.main-playButton-button[aria-label*="${i}"],
.main-playButton-PlayButton>button[aria-label*="${i}"],
.main-playPauseButton-button[aria-label*="${i}"],
.player-controls__buttons button[aria-label*="${i}"] span,
.main-trackList-rowPlayPauseButton[aria-label*="${i}"],
.main-trackList-rowImagePlayButton[aria-label*="${i}"],
.main-playButton-PlayButton>button[aria-label*="${l}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
  mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
}

.Root__globalNav button:is([aria-label="Clear search field"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${s}"] path {
  display: none !important;
}

button[aria-label="${s}"] svg {
  display: none;
  -webkit-mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}

.main-repeatButton-button[aria-label="${f}"],
.main-repeatButton-button[aria-label="${a}"],
.main-repeatButton-button[aria-label="${v}"],
{
scale: 0.75 !important;
background-color: var(--spice-subtext) !important;
color: var(--spice-subtext);

svg {
  display: none;
}
}

.player-controls__buttons button[aria-label*="${o}"] span,
.player-controls__buttons button[aria-label*="${i}"] span{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  aspect-ratio: 1/1;
}

.main-playPauseButton-button,
button[aria-label="${c}"],
button[aria-label="${u}"],
.player-controls button[aria-label="${m}"],
.player-controls button[aria-label="${d}"]
{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  min-height: 1rem;
  min-width: 1rem;
  aspect-ratio: 1/1;
  border-radius: 0 !important;
  border: none !important;
  height: var(--button-size, 24px);
  width: var(--button-size, 24px);
  
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}

.player-controls__buttons button[aria-label*="${o}"] span svg,
.player-controls__buttons button[aria-label*="${i}"] span svg {
  display: none;
  visibility: hidden;
}

button[aria-label="${u}"],
button[aria-label="${c}"] {
  background-color: var(--spice-subtext);
  -webkit-mask-image: var(--heart-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg"));
  mask-image: var(--heart-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg")) !important;
  mask-size: 100%;
  mask-position: 50% 50%;
  min-width: 1.2rem;
  min-height: 1.2rem;

  svg,
  span {
display: none;
visibility: hidden;
  }
}

button[aria-label="${u}"] {
  background-color: var(--spice-accent);
  -webkit-mask-image: var(--heart-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg"));
  mask-image: var(--heart-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg")) !important;
}

.player-controls button[aria-label="${m}"] span,
.player-controls button[aria-label="${d}"] span {
  opacity: 0;
}

.player-controls button[aria-label="${m}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--prev-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg"));
  mask-image: var(--prev-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg"));
}

.player-controls button[aria-label="${d}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--next-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg"));
  mask-image: var(--next-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg"));
}

button[aria-label="${p}"]>path {
  display: none;
}

.main-actionButtons>div>button[aria-label="${p}"] svg,
.main-actionButtons>button[aria-label="${p}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: var(--people-team-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg"));
  mask-image: var(--people-team-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg"));
}

.main-yourLibraryX-navLink[aria-label="${g}"] svg,
button[aria-label="${g}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg"));
  -webkit-mask-image: var(--home-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg"));
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${g}"].active svg,
.main-globalNav-navLinkActive[aria-label="${g}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-filled-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg"));
  -webkit-mask-image: var(--home-filled-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg"));
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${g}"].active svg {
  path {
display: none !important;
  }

  background-color: var(--spice-accent) !important;
}

#context-menu ul[aria-label*="Add to playlist menu"] {
  p {
max-width: 10rem;
  }
}
`),
              document.head.appendChild(y);
          }
        })(),
          Ke(),
          e();
      }, []);
      let e = () => {
        (() => {
          window.currentArtUrl =
            Spicetify.Player.data.item.metadata.image_xlarge_url ||
            Spicetify.Player.data.item.metadata.image_large_url ||
            Spicetify.Player.data.item.metadata.image_url ||
            Spicetify.Player.data.item.metadata.image_small_url ||
            '';
          try {
            window.rootStyle.setProperty(
              '--now-playing-art-image',
              `url(${window.currentArtUrl})`
            );
          } catch (e) {
            console.error('Error updating album art:', e);
          }
        })();
      };
      return (
        window.addEventListener('resize', Ke),
        Spicetify.Player.addEventListener('songchange', e),
        s.default.createElement(
          s.default.Fragment,
          null,
          s.default.createElement(
            'div',
            { id: 'state' },
            s.default.createElement(Re, null),
            s.default.createElement(Ae, null)
          ),
          s.default.createElement(
            'div',
            {
              id: 'background-container',
              className: 'background-container',
              style: { containerType: 'normal' },
            },
            s.default.createElement(ye, null)
          ),
          s.default.createElement(
            'div',
            {
              id: 'modal-container',
              className: 'modal-container',
              style: { containerType: 'normal' },
            },
            s.default.createElement(Ee, null, s.default.createElement(Pe, null))
          ),
          window.isWindows && !window.isLightMode
            ? s.default.createElement(
                'div',
                {
                  id: 'transperent-controls-container',
                  className: 'transperent-controls-container',
                  style: { containerType: 'normal' },
                },
                s.default.createElement(Y, null)
              )
            : null,
          s.default.createElement(Te, null)
        )
      );
    }),
    ($ = t(r())),
    (Fe = t(r())),
    (Ue = {
      copyButton: 'error-module__copyButton___UntTn_theme',
      button: 'error-module__button___sf48q_theme',
    }),
    (He = 'https://github.com/sanoojes/Spicetify-Lucid/issues'),
    (Ge = ({ error: e }) => {
      let [t, a] = (0, Fe.useState)(!1),
        n = (0, Fe.useRef)(null),
        r = '';
      r = e instanceof Error ? e.message : JSON.stringify(e, null, 2);
      return $.default.createElement(
        'div',
        { style: { width: '50vw' } },
        $.default.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between' } },
          $.default.createElement(
            'span',
            { style: { margin: 'auto 0' } },
            $.default.createElement(
              'p',
              null,
              'Oops! Lucid theme encountered an error. Please',
              ' ',
              $.default.createElement(
                'a',
                { href: He, target: '_blank', rel: 'noopener noreferrer' },
                'report an issue here'
              )
            )
          ),
          $.default.createElement(
            'div',
            null,
            $.default.createElement(
              'button',
              { type: 'button', onClick: () => a(!t), className: Ue.button },
              t ? 'Hide Details' : 'Show Details'
            ),
            $.default.createElement(
              'button',
              {
                type: 'button',
                onClick: () => {
                  n.current &&
                    (navigator.clipboard.writeText(n.current.textContent || ''),
                    Spicetify.showNotification(
                      'Error details copied!',
                      !1,
                      2e3
                    ));
                },
                className: Ue.copyButton,
                style: { marginLeft: '8px' },
              },
              'Copy Error'
            )
          )
        ),
        t &&
          $.default.createElement(
            'pre',
            { style: { whiteSpace: 'pre-wrap' }, ref: n },
            r
          )
      );
    }),
    (We = async function () {
      var e;
      try {
        for (
          ;
          null == Spicetify ||
          !Spicetify.showNotification ||
          null == Spicetify ||
          !Spicetify.Player ||
          null == Spicetify ||
          !Spicetify.React;

        )
          await new Promise((e) => setTimeout(e, 100));
        var t = document.createElement('div'),
          a = ((t.id = 'lucid-main'), document.getElementById('main'));
        null != a && a.append(t),
          t &&
            Spicetify.ReactDOM.createRoot(t).render(
              K.default.createElement(Ve, null)
            ),
          (window.rootStyle = document.documentElement.style),
          (window.isCustomControls = !1),
          (window.isLightMode =
            'light' ===
              (null == Spicetify ? void 0 : Spicetify.Config.color_scheme) ||
            !1),
          (window.isWindows =
            'windows' ===
              (null == (e = null == Spicetify ? void 0 : Spicetify.Platform)
                ? void 0
                : e.operatingSystem
              ).toLowerCase() ||
            (null == Spicetify
              ? void 0
              : Spicetify.Platform.PlatformData.os_name
            )
              .toLowerCase()
              .includes('win')),
          (window.isGlobalNav = !(
            !document.querySelector('.globalNav') &&
            !document.querySelector('.Root__globalNav')
          )),
          (async () => {
            var e;
            document.getElementById('customControls') &&
              ((window.isCustomControls = !0),
              null !=
                (e = document.querySelector(
                  '.lucid-transperent-window-controls'
                ))) &&
              e.remove();
          })();
      } catch (e) {
        e &&
          ((a = e),
          console.error('[Lucid] Error:', a),
          Spicetify.showNotification(
            $.default.createElement(Ge, { error: a }),
            !0
          ));
      }
    }),
    (async () => {
      await We();
    })(),
    (async () => {
      var e;
      document.getElementById('theme') ||
        (((e = document.createElement('style')).id = 'theme'),
        (e.textContent = String.raw`
  .error-module__button___sf48q_theme,.error-module__copyButton___UntTn_theme{background-color:#424242;color:#fff;border:2px solid rgba(var(--spice-rgb-text),.25);padding:8px 16px;font-size:14px;cursor:pointer;border-radius:var(--card-border-radius);transition:all .3s ease-in-out}.error-module__button___sf48q_theme:hover,.error-module__copyButton___UntTn_theme:hover{background-color:#616161;border-radius:100px}
      `.trim()),
        document.head.appendChild(e));
    })();
})();
