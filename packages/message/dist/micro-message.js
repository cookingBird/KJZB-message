/*! For license information please see micro-message.js.LICENSE.txt */
!(function (t, e) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : 'object' == typeof exports
    ? (exports['micro-message'] = e())
    : (t['micro-message'] = e())
})(self, () =>
  (() => {
    var t = {
        899: () => {},
        379: t => {
          'use strict'
          var e = []
          function r (t) {
            for (var r = -1, n = 0; n < e.length; n++)
              if (e[n].identifier === t) {
                r = n
                break
              }
            return r
          }
          function n (t, n) {
            for (var i = {}, a = [], u = 0; u < t.length; u++) {
              var c = t[u],
                s = n.base ? c[0] + n.base : c[0],
                f = i[s] || 0,
                l = ''.concat(s, ' ').concat(f)
              i[s] = f + 1
              var p = r(l),
                d = {
                  css: c[1],
                  media: c[2],
                  sourceMap: c[3],
                  supports: c[4],
                  layer: c[5]
                }
              if (-1 !== p) e[p].references++, e[p].updater(d)
              else {
                var y = o(d, n)
                ;(n.byIndex = u),
                  e.splice(u, 0, { identifier: l, updater: y, references: 1 })
              }
              a.push(l)
            }
            return a
          }
          function o (t, e) {
            var r = e.domAPI(e)
            return (
              r.update(t),
              function (e) {
                if (e) {
                  if (
                    e.css === t.css &&
                    e.media === t.media &&
                    e.sourceMap === t.sourceMap &&
                    e.supports === t.supports &&
                    e.layer === t.layer
                  )
                    return
                  r.update((t = e))
                } else r.remove()
              }
            )
          }
          t.exports = function (t, o) {
            var i = n((t = t || []), (o = o || {}))
            return function (t) {
              t = t || []
              for (var a = 0; a < i.length; a++) {
                var u = r(i[a])
                e[u].references--
              }
              for (var c = n(t, o), s = 0; s < i.length; s++) {
                var f = r(i[s])
                0 === e[f].references && (e[f].updater(), e.splice(f, 1))
              }
              i = c
            }
          }
        },
        569: t => {
          'use strict'
          var e = {}
          t.exports = function (t, r) {
            var n = (function (t) {
              if (void 0 === e[t]) {
                var r = document.querySelector(t)
                if (
                  window.HTMLIFrameElement &&
                  r instanceof window.HTMLIFrameElement
                )
                  try {
                    r = r.contentDocument.head
                  } catch (t) {
                    r = null
                  }
                e[t] = r
              }
              return e[t]
            })(t)
            if (!n)
              throw new Error(
                "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
              )
            n.appendChild(r)
          }
        },
        216: t => {
          'use strict'
          t.exports = function (t) {
            var e = document.createElement('style')
            return t.setAttributes(e, t.attributes), t.insert(e, t.options), e
          }
        },
        565: (t, e, r) => {
          'use strict'
          t.exports = function (t) {
            var e = r.nc
            e && t.setAttribute('nonce', e)
          }
        },
        795: t => {
          'use strict'
          t.exports = function (t) {
            if ('undefined' == typeof document)
              return { update: function () {}, remove: function () {} }
            var e = t.insertStyleElement(t)
            return {
              update: function (r) {
                !(function (t, e, r) {
                  var n = ''
                  r.supports && (n += '@supports ('.concat(r.supports, ') {')),
                    r.media && (n += '@media '.concat(r.media, ' {'))
                  var o = void 0 !== r.layer
                  o &&
                    (n += '@layer'.concat(
                      r.layer.length > 0 ? ' '.concat(r.layer) : '',
                      ' {'
                    )),
                    (n += r.css),
                    o && (n += '}'),
                    r.media && (n += '}'),
                    r.supports && (n += '}')
                  var i = r.sourceMap
                  i &&
                    'undefined' != typeof btoa &&
                    (n +=
                      '\n/*# sourceMappingURL=data:application/json;base64,'.concat(
                        btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                        ' */'
                      )),
                    e.styleTagTransform(n, t, e.options)
                })(e, t, r)
              },
              remove: function () {
                !(function (t) {
                  if (null === t.parentNode) return !1
                  t.parentNode.removeChild(t)
                })(e)
              }
            }
          }
        },
        589: t => {
          'use strict'
          t.exports = function (t, e) {
            if (e.styleSheet) e.styleSheet.cssText = t
            else {
              for (; e.firstChild; ) e.removeChild(e.firstChild)
              e.appendChild(document.createTextNode(t))
            }
          }
        }
      },
      e = {}
    function r (n) {
      var o = e[n]
      if (void 0 !== o) return o.exports
      var i = (e[n] = { exports: {} })
      return t[n](i, i.exports, r), i.exports
    }
    ;(r.n = t => {
      var e = t && t.__esModule ? () => t.default : () => t
      return r.d(e, { a: e }), e
    }),
      (r.d = (t, e) => {
        for (var n in e)
          r.o(e, n) &&
            !r.o(t, n) &&
            Object.defineProperty(t, n, { enumerable: !0, get: e[n] })
      }),
      (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (r.r = t => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(t, '__esModule', { value: !0 })
      }),
      (r.nc = void 0)
    var n = {}
    return (
      (() => {
        'use strict'
        r.r(n),
          r.d(n, { Utils: () => t, connector: () => dt, default: () => yt })
        var t = {}
        function e (t) {
          var e = t.search.slice(1),
            r = {}
          return (
            e
              .split('&')
              .map(function (t) {
                return t.split('=')
              })
              .forEach(function (t) {
                r[t[0]] = t[1]
              }),
            r
          )
        }
        function o (t) {
          return (
            window.addEventListener('pagehide', t),
            function () {
              return window.removeEventListener('pagehide', t)
            }
          )
        }
        function i (t) {
          return (
            window.addEventListener('load', t),
            function () {
              return window.removeEventListener('load', t)
            }
          )
        }
        function a (t) {
          return (
            window.addEventListener('message', t),
            function () {
              return window.removeEventListener('message', t)
            }
          )
        }
        function u (t) {
          var e,
            r =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : function (t) {
                    return Boolean(t)
                  },
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 'requestAnimationFrame'
          function o (t, e, n) {
            if (!(document && window && window.requestAnimationFrame))
              throw Error("browser don't support")
            var i = document.getElementById(t)
            if (r(i)) return e(i)
            'requestAnimationFrame' === n &&
              requestAnimationFrame(function () {
                o(t, e, n)
              }),
              'setTimeout' === n &&
                setTimeout(function () {
                  o(t, e, n)
                })
          }
          return new Promise(function (r) {
            ;(e = r),
              o(
                t,
                function (t) {
                  setTimeout(function () {
                    e(t)
                  })
                },
                n
              )
          })
        }
        function c () {
          return (
            (c =
              'undefined' != typeof Reflect && Reflect.get
                ? Reflect.get.bind()
                : function (t, e, r) {
                    var n = (function (t, e) {
                      for (
                        ;
                        !Object.prototype.hasOwnProperty.call(t, e) &&
                        null !== (t = f(t));

                      );
                      return t
                    })(t, e)
                    if (n) {
                      var o = Object.getOwnPropertyDescriptor(n, e)
                      return o.get
                        ? o.get.call(arguments.length < 3 ? t : r)
                        : o.value
                    }
                  }),
            c.apply(this, arguments)
          )
        }
        function s (t, e) {
          return (
            (s = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t
                }),
            s(t, e)
          )
        }
        function f (t) {
          return (
            (f = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t)
                }),
            f(t)
          )
        }
        function l (t) {
          return (
            (l =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  }),
            l(t)
          )
        }
        function p (t, e) {
          if (!(t instanceof e))
            throw new TypeError('Cannot call a class as a function')
        }
        function d (t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(
                t,
                (void 0,
                (o = (function (t, e) {
                  if ('object' !== l(t) || null === t) return t
                  var r = t[Symbol.toPrimitive]
                  if (void 0 !== r) {
                    var n = r.call(t, 'string')
                    if ('object' !== l(n)) return n
                    throw new TypeError(
                      '@@toPrimitive must return a primitive value.'
                    )
                  }
                  return String(t)
                })(n.key)),
                'symbol' === l(o) ? o : String(o)),
                n
              )
          }
          var o
        }
        function y (t, e, r) {
          return (
            e && d(t.prototype, e),
            r && d(t, r),
            Object.defineProperty(t, 'prototype', { writable: !1 }),
            t
          )
        }
        r.r(t),
          r.d(t, {
            ChainRunner: () => v,
            getParams: () => e,
            onLoad: () => i,
            onMessage: () => a,
            onPageHide: () => o,
            requestDom: () => u
          })
        var v = (function (t) {
          !(function (t, e) {
            if ('function' != typeof e && null !== e)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            ;(t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 }
            })),
              Object.defineProperty(t, 'prototype', { writable: !1 }),
              e && s(t, e)
          })(o, t)
          var e,
            r,
            n =
              ((e = o),
              (r = (function () {
                if ('undefined' == typeof Reflect || !Reflect.construct)
                  return !1
                if (Reflect.construct.sham) return !1
                if ('function' == typeof Proxy) return !0
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  )
                } catch (t) {
                  return !1
                }
              })()),
              function () {
                var t,
                  n = f(e)
                if (r) {
                  var o = f(this).constructor
                  t = Reflect.construct(n, arguments, o)
                } else t = n.apply(this, arguments)
                return (function (t, e) {
                  if (e && ('object' === l(e) || 'function' == typeof e))
                    return e
                  if (void 0 !== e)
                    throw new TypeError(
                      'Derived constructors may only return object or undefined'
                    )
                  return (function (t) {
                    if (void 0 === t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return t
                  })(t)
                })(this, t)
              })
          function o () {
            return p(this, o), n.call(this)
          }
          return (
            y(o, [
              {
                key: 'push',
                value: function (t) {
                  var e =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 1
                  return c(f(o.prototype), 'push', this).call(this, t, e)
                }
              },
              {
                key: 'use',
                value: function (t) {
                  return this.push(t)
                }
              },
              {
                key: 'run',
                value: function (t) {
                  return this.queue.reduce(function (t, e, r) {
                    return e(t)
                  }, t)
                }
              }
            ]),
            o
          )
        })(
          (function () {
            function t (e) {
              p(this, t), (this.queue = void 0 === e ? [] : new Array(e))
            }
            return (
              y(t, [
                {
                  key: 'push',
                  value: function (t) {
                    var e = this,
                      r =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : 0
                    return (
                      0 === r && this.queue.push(t),
                      1 === r && this.queue.unshift(t),
                      function () {
                        return e.queue.splice(
                          e.queue.findIndex(function (e) {
                            return e === t
                          }),
                          1
                        )
                      }
                    )
                  }
                }
              ]),
              t
            )
          })()
        )
        const h = {
          randomUUID:
            'undefined' != typeof crypto &&
            crypto.randomUUID &&
            crypto.randomUUID.bind(crypto)
        }
        let m
        const g = new Uint8Array(16)
        function b () {
          if (
            !m &&
            ((m =
              'undefined' != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)),
            !m)
          )
            throw new Error(
              'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
            )
          return m(g)
        }
        const w = []
        for (let t = 0; t < 256; ++t) w.push((t + 256).toString(16).slice(1))
        const O = function (t, e, r) {
          if (h.randomUUID && !e && !t) return h.randomUUID()
          const n = (t = t || {}).random || (t.rng || b)()
          if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), e)) {
            r = r || 0
            for (let t = 0; t < 16; ++t) e[r + t] = n[t]
            return e
          }
          return (function (t, e = 0) {
            return (
              w[t[e + 0]] +
              w[t[e + 1]] +
              w[t[e + 2]] +
              w[t[e + 3]] +
              '-' +
              w[t[e + 4]] +
              w[t[e + 5]] +
              '-' +
              w[t[e + 6]] +
              w[t[e + 7]] +
              '-' +
              w[t[e + 8]] +
              w[t[e + 9]] +
              '-' +
              w[t[e + 10]] +
              w[t[e + 11]] +
              w[t[e + 12]] +
              w[t[e + 13]] +
              w[t[e + 14]] +
              w[t[e + 15]]
            ).toLowerCase()
          })(n)
        }
        function j (t) {
          return (
            (j =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  }),
            j(t)
          )
        }
        function S (t, e) {
          var r = Object.keys(t)
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(t)
            e &&
              (n = n.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable
              })),
              r.push.apply(r, n)
          }
          return r
        }
        function P (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = null != arguments[e] ? arguments[e] : {}
            e % 2
              ? S(Object(r), !0).forEach(function (e) {
                  _(t, e, r[e])
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
              : S(Object(r)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(r, e)
                  )
                })
          }
          return t
        }
        function _ (t, e, r) {
          return (
            (e = x(e)) in t
              ? Object.defineProperty(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
              : (t[e] = r),
            t
          )
        }
        function E (t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(t, x(n.key), n)
          }
        }
        function x (t) {
          var e = (function (t, e) {
            if ('object' !== j(t) || null === t) return t
            var r = t[Symbol.toPrimitive]
            if (void 0 !== r) {
              var n = r.call(t, 'string')
              if ('object' !== j(n)) return n
              throw new TypeError(
                '@@toPrimitive must return a primitive value.'
              )
            }
            return String(t)
          })(t)
          return 'symbol' === j(e) ? e : String(e)
        }
        var k = (function () {
            function t (e) {
              var r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {}
              !(function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError('Cannot call a class as a function')
              })(this, t),
                (this.targetOrigin = r.targetOrigin || '*'),
                (this.timeout = r.timeout || 3e3),
                (this.tag = r.namespace || 'gislife'),
                (this.defaultResponseInterceptor = new v()),
                (this.requestInterceptor = new v()),
                (this._cancel = this._initResponse())
            }
            var e, r
            return (
              (e = t),
              (r = [
                {
                  key: '_initResponse',
                  value: function () {
                    var t = this
                    return a(function (e) {
                      var r
                      !1 ===
                        (null === (r = e.data) || void 0 === r
                          ? void 0
                          : r.response) &&
                        e.source.postMessage(
                          P(
                            P({}, t.defaultResponseInterceptor.run(e.data)),
                            {},
                            { response: !0 }
                          ),
                          e.origin
                        )
                    })
                  }
                },
                {
                  key: '_postMessage',
                  value: function (t, e) {
                    var r = this,
                      n = t.timeout || this.timeout,
                      o = !1
                    if (e) {
                      var i,
                        u,
                        c = O(),
                        s = a(function (t) {
                          var e = t.data
                          ;(null == e ? void 0 : e.id) === c &&
                            e.belong === r.tag &&
                            ((o = !0), i(e.data), s())
                        })
                      return new Promise(function (a, f) {
                        ;(i = a), (u = f)
                        var l = r.requestInterceptor.run(t)
                        e.postMessage(
                          { id: c, data: l, belong: r.tag, response: !1 },
                          '*'
                        ),
                          setTimeout(function () {
                            o ||
                              (u(
                                '-----postMessage timeout,target maybe not ready'
                              ),
                              s())
                          }, n)
                      })
                    }
                    return Promise.reject('missing target')
                  }
                },
                {
                  key: 'send',
                  value: function (t, e) {
                    return this._postMessage(e, t).then(
                      function (t) {
                        return t
                      },
                      function (t) {
                        return Promise.reject(t)
                      }
                    )
                  }
                },
                {
                  key: 'on',
                  value: function (t) {
                    var e = this
                    return a(function (r) {
                      var n, o
                      ;(null == r || null === (n = r.data) || void 0 === n
                        ? void 0
                        : n.belong) === e.tag &&
                        !1 ===
                          (null === (o = r.data) || void 0 === o
                            ? void 0
                            : o.response) &&
                        t(r.data.data)
                    })
                  }
                },
                {
                  key: 'destory',
                  value: function () {
                    this._cancel()
                  }
                }
              ]) && E(e.prototype, r),
              Object.defineProperty(e, 'prototype', { writable: !1 }),
              t
            )
          })(),
          C = 'URL_CONFIG'
        function R (t) {
          return (
            (R =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  }),
            R(t)
          )
        }
        function L (t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(
                t,
                (void 0,
                (o = (function (t, e) {
                  if ('object' !== R(t) || null === t) return t
                  var r = t[Symbol.toPrimitive]
                  if (void 0 !== r) {
                    var n = r.call(t, 'string')
                    if ('object' !== R(n)) return n
                    throw new TypeError(
                      '@@toPrimitive must return a primitive value.'
                    )
                  }
                  return String(t)
                })(n.key)),
                'symbol' === R(o) ? o : String(o)),
                n
              )
          }
          var o
        }
        function T () {
          return (
            (T =
              'undefined' != typeof Reflect && Reflect.get
                ? Reflect.get.bind()
                : function (t, e, r) {
                    var n = (function (t, e) {
                      for (
                        ;
                        !Object.prototype.hasOwnProperty.call(t, e) &&
                        null !== (t = N(t));

                      );
                      return t
                    })(t, e)
                    if (n) {
                      var o = Object.getOwnPropertyDescriptor(n, e)
                      return o.get
                        ? o.get.call(arguments.length < 3 ? t : r)
                        : o.value
                    }
                  }),
            T.apply(this, arguments)
          )
        }
        function A (t, e) {
          return (
            (A = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t
                }),
            A(t, e)
          )
        }
        function I (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            )
          return t
        }
        function N (t) {
          return (
            (N = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t)
                }),
            N(t)
          )
        }
        window[C] = { test: 'test' }
        var M = new Map(),
          D = new WeakMap(),
          F = new Map(),
          q = (function (t) {
            !(function (t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: { value: t, writable: !0, configurable: !0 }
              })),
                Object.defineProperty(t, 'prototype', { writable: !1 }),
                e && A(t, e)
            })(a, t)
            var e,
              r,
              n,
              o,
              i =
                ((n = a),
                (o = (function () {
                  if ('undefined' == typeof Reflect || !Reflect.construct)
                    return !1
                  if (Reflect.construct.sham) return !1
                  if ('function' == typeof Proxy) return !0
                  try {
                    return (
                      Boolean.prototype.valueOf.call(
                        Reflect.construct(Boolean, [], function () {})
                      ),
                      !0
                    )
                  } catch (t) {
                    return !1
                  }
                })()),
                function () {
                  var t,
                    e = N(n)
                  if (o) {
                    var r = N(this).constructor
                    t = Reflect.construct(e, arguments, r)
                  } else t = e.apply(this, arguments)
                  return (function (t, e) {
                    if (e && ('object' === R(e) || 'function' == typeof e))
                      return e
                    if (void 0 !== e)
                      throw new TypeError(
                        'Derived constructors may only return object or undefined'
                      )
                    return I(t)
                  })(this, t)
                })
            function a (t) {
              var e,
                r =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {}
              return (
                (function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, a),
                ((e = i.call(this, t, r)).appCode = r.appCode),
                (e.localStorageName = r.localStorageName || 'globalConfig'),
                e._configResponse(I(e)),
                e._stateResponse(I(e)),
                e
              )
            }
            return (
              (e = a),
              (r = [
                {
                  key: 'setAppCode',
                  value: function (t) {
                    var e,
                      r,
                      n = this
                    ;(this.appCode = t),
                      null === (e = this.__pageHideCancel) ||
                        void 0 === e ||
                        e.call(this),
                      null === (r = this.__maintainCancel) ||
                        void 0 === r ||
                        r.call(this),
                      window.parent !== window &&
                        (window.parent.postMessage('message', '*'),
                        this.send(window.parent, {
                          target: 'parent',
                          type: 'register'
                        })
                          .then(function (t) {
                            return n.send(window.parent, {
                              target: 'main',
                              type: 'config'
                            })
                          })
                          .then(function (t) {
                            localStorage.setItem(
                              n.localStorageName,
                              JSON.stringify(t.data)
                            )
                          })),
                      (this.__maintainCancel = this.on(function (t) {
                        var e = t.sourceCode
                        if ('register' === t.type) {
                          var r = document.getElementById('gislife-' + e)
                          r
                            ? n.registerApp(e, r)
                            : console.error(
                                'register error, can not find element'
                              )
                        }
                      })),
                      (this.__cancelPassive = this._onPassive())
                  }
                },
                {
                  key: 'send',
                  value: function (t, e) {
                    var r = this
                    if (
                      ((e.sourceCode =
                        void 0 === e.sourceCode ? this.appCode : e.sourceCode),
                      (e.pop = void 0 === e.pop || e.pop),
                      t)
                    )
                      return T(N(a.prototype), 'send', this).call(this, t, e)
                    var n = window.parent !== window ? [window.parent] : [],
                      o = []
                    return (
                      M.forEach(function (t, e) {
                        o.push(t.contentWindow)
                      }),
                      Promise.all(
                        n.concat(o).map(function (t) {
                          return T(N(a.prototype), 'send', r).call(r, t, e)
                        })
                      )
                    )
                  }
                },
                {
                  key: 'on',
                  value: function (t) {
                    var e = this
                    return T(N(a.prototype), 'on', this).call(
                      this,
                      function (r) {
                        ;(r.target !== e.appCode &&
                          'parent' !== r.target &&
                          'global' !== r.target) ||
                          t(r)
                      }
                    )
                  }
                },
                {
                  key: 'registerApp',
                  value: function (t, e) {
                    M.has(t) || (M.set(t, e), D.set(e, t))
                  }
                },
                {
                  key: 'unRegisterApp',
                  value: function (t) {
                    return M.delete(t)
                  }
                },
                {
                  key: 'getApp',
                  value: function (t) {
                    var e
                    if (t instanceof HTMLIFrameElement) {
                      var r = D.get(t)
                      r && (e = [r, tar])
                    }
                    if ('string' == typeof t) {
                      var n = D.get(t)
                      n && (e = [tarCode, n])
                    }
                    return (
                      e || console.warn('getApp error,target named:', t, M), e
                    )
                  }
                },
                {
                  key: 'destory',
                  value: function () {
                    this.__maintainCancel(),
                      this.__pageHideCancel(),
                      T(N(a.prototype), 'destory', this).call(this)
                  }
                },
                {
                  key: 'getState',
                  value: function (t) {
                    return F.get(t)
                  }
                },
                {
                  key: 'setState',
                  value: function (t, e) {
                    return F.set(t, e)
                  }
                },
                {
                  key: '_configResponse',
                  value: function (t) {
                    var e = this
                    t.defaultResponseInterceptor.push(function (t) {
                      var r
                      if (
                        'config' ===
                        (null == t || null === (r = t.data) || void 0 === r
                          ? void 0
                          : r.type)
                      ) {
                        var n = JSON.parse(
                          localStorage.getItem(e.localStorageName)
                        )
                        t.data.data = window[C] || n
                      }
                      return t
                    })
                  }
                },
                {
                  key: '_onPassive',
                  value: function () {
                    var t = this
                    return T(N(a.prototype), 'on', this).call(
                      this,
                      function (e) {
                        'parent' !== e.target &&
                          e.target !== t.appCode &&
                          ('main' === t.appCode && (e.pop = !1),
                          'main' === e.target
                            ? window.parent !== window &&
                              t.send(window.parent, e)
                            : (M.forEach(function (r, n) {
                                n !== e.sourceCode && t.send(r.contentWindow, e)
                              }),
                              window.parent !== window &&
                                !0 === e.pop &&
                                t.send(window.parent, e)))
                      }
                    )
                  }
                },
                {
                  key: '_stateResponse',
                  value: function (t) {
                    t.defaultResponseInterceptor.use(function (t) {
                      return (
                        'state' === t.data.type &&
                          (t.data.data = F.get(t.data.sourceCode)),
                        t
                      )
                    })
                  }
                }
              ]) && L(e.prototype, r),
              Object.defineProperty(e, 'prototype', { writable: !1 }),
              a
            )
          })(k)
        function U (t) {
          return (
            (U =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  }),
            U(t)
          )
        }
        function $ (t, e) {
          for (var r = 0; r < e.length; r++) {
            var n = e[r]
            ;(n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              'value' in n && (n.writable = !0),
              Object.defineProperty(
                t,
                (void 0,
                (o = (function (t, e) {
                  if ('object' !== U(t) || null === t) return t
                  var r = t[Symbol.toPrimitive]
                  if (void 0 !== r) {
                    var n = r.call(t, 'string')
                    if ('object' !== U(n)) return n
                    throw new TypeError(
                      '@@toPrimitive must return a primitive value.'
                    )
                  }
                  return String(t)
                })(n.key)),
                'symbol' === U(o) ? o : String(o)),
                n
              )
          }
          var o
        }
        function B () {
          return (
            (B =
              'undefined' != typeof Reflect && Reflect.get
                ? Reflect.get.bind()
                : function (t, e, r) {
                    var n = (function (t, e) {
                      for (
                        ;
                        !Object.prototype.hasOwnProperty.call(t, e) &&
                        null !== (t = H(t));

                      );
                      return t
                    })(t, e)
                    if (n) {
                      var o = Object.getOwnPropertyDescriptor(n, e)
                      return o.get
                        ? o.get.call(arguments.length < 3 ? t : r)
                        : o.value
                    }
                  }),
            B.apply(this, arguments)
          )
        }
        function G (t, e) {
          return (
            (G = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (t, e) {
                  return (t.__proto__ = e), t
                }),
            G(t, e)
          )
        }
        function H (t) {
          return (
            (H = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (t) {
                  return t.__proto__ || Object.getPrototypeOf(t)
                }),
            H(t)
          )
        }
        var W = (function (t) {
          !(function (t, e) {
            if ('function' != typeof e && null !== e)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            ;(t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 }
            })),
              Object.defineProperty(t, 'prototype', { writable: !1 }),
              e && G(t, e)
          })(a, t)
          var e,
            r,
            n,
            o,
            i =
              ((n = a),
              (o = (function () {
                if ('undefined' == typeof Reflect || !Reflect.construct)
                  return !1
                if (Reflect.construct.sham) return !1
                if ('function' == typeof Proxy) return !0
                try {
                  return (
                    Boolean.prototype.valueOf.call(
                      Reflect.construct(Boolean, [], function () {})
                    ),
                    !0
                  )
                } catch (t) {
                  return !1
                }
              })()),
              function () {
                var t,
                  e = H(n)
                if (o) {
                  var r = H(this).constructor
                  t = Reflect.construct(e, arguments, r)
                } else t = e.apply(this, arguments)
                return (function (t, e) {
                  if (e && ('object' === U(e) || 'function' == typeof e))
                    return e
                  if (void 0 !== e)
                    throw new TypeError(
                      'Derived constructors may only return object or undefined'
                    )
                  return (function (t) {
                    if (void 0 === t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return t
                  })(t)
                })(this, t)
              })
          function a (t, e) {
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError('Cannot call a class as a function')
              })(this, a),
              i.call(this, t, e)
            )
          }
          return (
            (e = a),
            (r = [
              {
                key: '$send',
                value: function (t) {
                  var e
                  if (!t.target || !t.type) throw Error('message syntax error')
                  var r = t.target
                  if (
                    ('main' === r || 'parent' === r) &&
                    window.parent !== window
                  )
                    return (
                      (e = window.parent),
                      B(H(a.prototype), 'send', this).call(this, e, t)
                    )
                  var n = this.getApp(r)
                  return (
                    r instanceof HTMLIFrameElement &&
                      n &&
                      ((t.target = n[0]), (e = r.contentWindow)),
                    'string' == typeof r && n && (e = n[1].contentWindow),
                    e || console.warn('current layer target not exist'),
                    B(H(a.prototype), 'send', this).call(this, e, t)
                  )
                }
              },
              {
                key: '$on',
                value: function (t, e, r) {
                  var n
                  if ('string' != typeof e && 'function' != typeof e)
                    throw Error('type parma type error')
                  return (
                    t &&
                      t.$on('hook:beforeDestory', function () {
                        var t
                        null === (t = n) || void 0 === t || t()
                      }),
                    (n =
                      'function' == typeof e
                        ? B(H(a.prototype), 'on', this).call(
                            this,
                            function (t) {
                              e(t)
                            }
                          )
                        : B(H(a.prototype), 'on', this).call(
                            this,
                            function (t) {
                              t.type === e && r(t.data)
                            }
                          ))
                  )
                }
              },
              {
                key: 'sendCallback',
                value: function (t, e, r) {
                  if ('function' != typeof e || void 0 === r)
                    throw Error('callback or params type error')
                  if (!t) throw Error('missing target')
                  return this.$send({
                    type: 'callback',
                    target: t,
                    data: { callback: e.toString(), params: r }
                  })
                }
              },
              {
                key: 'onCallback',
                value: function (t, e) {
                  return this.$on(t, function (t) {
                    if ('callback' === t.type) {
                      var r = t.data
                      if (null !== r.params) {
                        var n = Object.keys(r.params),
                          o = Object.values(r.params),
                          i = Function.apply(
                            void 0,
                            n.concat([
                              '('
                                .concat(r.callback, ')(')
                                .concat(n.join(','), ')')
                            ])
                          )
                        e(function (t) {
                          i.apply(t, o)
                        })
                      } else {
                        var a = Function('('.concat(r.callback, ')()'))
                        e(function (t) {
                          a.apply(t)
                        })
                      }
                    }
                  })
                }
              },
              {
                key: 'getConfig',
                value: function () {
                  var t = localStorage.getItem(this.localStorageName)
                  if (t) {
                    var e = JSON.parse(t)
                    return Promise.resolve(e)
                  }
                  return this.$send({ type: 'config', target: 'main' })
                }
              },
              {
                key: 'sendState',
                value: function (t, e) {
                  return (
                    this.setState(t, e),
                    this.$send({ type: 'state', target: t, data: e })
                  )
                }
              },
              {
                key: 'onState',
                value: function (t, e) {
                  return (
                    this.$send({ target: 'parent', type: 'state' }).then(
                      function (e) {
                        return t(e.data)
                      }
                    ),
                    this.$on(e, function (e) {
                      if ('state' === e.type) {
                        var r = e.data
                        t(r)
                      }
                    })
                  )
                }
              }
            ]) && $(e.prototype, r),
            Object.defineProperty(e, 'prototype', { writable: !1 }),
            a
          )
        })(q)
        function J (t) {
          return (
            (J =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (t) {
                    return typeof t
                  }
                : function (t) {
                    return t &&
                      'function' == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? 'symbol'
                      : typeof t
                  }),
            J(t)
          )
        }
        function V () {
          V = function () {
            return t
          }
          var t = {},
            e = Object.prototype,
            r = e.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (t, e, r) {
                t[e] = r.value
              },
            o = 'function' == typeof Symbol ? Symbol : {},
            i = o.iterator || '@@iterator',
            a = o.asyncIterator || '@@asyncIterator',
            u = o.toStringTag || '@@toStringTag'
          function c (t, e, r) {
            return (
              Object.defineProperty(t, e, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }),
              t[e]
            )
          }
          try {
            c({}, '')
          } catch (t) {
            c = function (t, e, r) {
              return (t[e] = r)
            }
          }
          function s (t, e, r, o) {
            var i = e && e.prototype instanceof p ? e : p,
              a = Object.create(i.prototype),
              u = new _(o || [])
            return n(a, '_invoke', { value: O(t, r, u) }), a
          }
          function f (t, e, r) {
            try {
              return { type: 'normal', arg: t.call(e, r) }
            } catch (t) {
              return { type: 'throw', arg: t }
            }
          }
          t.wrap = s
          var l = {}
          function p () {}
          function d () {}
          function y () {}
          var v = {}
          c(v, i, function () {
            return this
          })
          var h = Object.getPrototypeOf,
            m = h && h(h(E([])))
          m && m !== e && r.call(m, i) && (v = m)
          var g = (y.prototype = p.prototype = Object.create(v))
          function b (t) {
            ;['next', 'throw', 'return'].forEach(function (e) {
              c(t, e, function (t) {
                return this._invoke(e, t)
              })
            })
          }
          function w (t, e) {
            function o (n, i, a, u) {
              var c = f(t[n], t, i)
              if ('throw' !== c.type) {
                var s = c.arg,
                  l = s.value
                return l && 'object' == J(l) && r.call(l, '__await')
                  ? e.resolve(l.__await).then(
                      function (t) {
                        o('next', t, a, u)
                      },
                      function (t) {
                        o('throw', t, a, u)
                      }
                    )
                  : e.resolve(l).then(
                      function (t) {
                        ;(s.value = t), a(s)
                      },
                      function (t) {
                        return o('throw', t, a, u)
                      }
                    )
              }
              u(c.arg)
            }
            var i
            n(this, '_invoke', {
              value: function (t, r) {
                function n () {
                  return new e(function (e, n) {
                    o(t, r, e, n)
                  })
                }
                return (i = i ? i.then(n, n) : n())
              }
            })
          }
          function O (t, e, r) {
            var n = 'suspendedStart'
            return function (o, i) {
              if ('executing' === n)
                throw new Error('Generator is already running')
              if ('completed' === n) {
                if ('throw' === o) throw i
                return { value: void 0, done: !0 }
              }
              for (r.method = o, r.arg = i; ; ) {
                var a = r.delegate
                if (a) {
                  var u = j(a, r)
                  if (u) {
                    if (u === l) continue
                    return u
                  }
                }
                if ('next' === r.method) r.sent = r._sent = r.arg
                else if ('throw' === r.method) {
                  if ('suspendedStart' === n) throw ((n = 'completed'), r.arg)
                  r.dispatchException(r.arg)
                } else 'return' === r.method && r.abrupt('return', r.arg)
                n = 'executing'
                var c = f(t, e, r)
                if ('normal' === c.type) {
                  if (
                    ((n = r.done ? 'completed' : 'suspendedYield'), c.arg === l)
                  )
                    continue
                  return { value: c.arg, done: r.done }
                }
                'throw' === c.type &&
                  ((n = 'completed'), (r.method = 'throw'), (r.arg = c.arg))
              }
            }
          }
          function j (t, e) {
            var r = e.method,
              n = t.iterator[r]
            if (void 0 === n)
              return (
                (e.delegate = null),
                ('throw' === r &&
                  t.iterator.return &&
                  ((e.method = 'return'),
                  (e.arg = void 0),
                  j(t, e),
                  'throw' === e.method)) ||
                  ('return' !== r &&
                    ((e.method = 'throw'),
                    (e.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                l
              )
            var o = f(n, t.iterator, e.arg)
            if ('throw' === o.type)
              return (
                (e.method = 'throw'), (e.arg = o.arg), (e.delegate = null), l
              )
            var i = o.arg
            return i
              ? i.done
                ? ((e[t.resultName] = i.value),
                  (e.next = t.nextLoc),
                  'return' !== e.method &&
                    ((e.method = 'next'), (e.arg = void 0)),
                  (e.delegate = null),
                  l)
                : i
              : ((e.method = 'throw'),
                (e.arg = new TypeError('iterator result is not an object')),
                (e.delegate = null),
                l)
          }
          function S (t) {
            var e = { tryLoc: t[0] }
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e)
          }
          function P (t) {
            var e = t.completion || {}
            ;(e.type = 'normal'), delete e.arg, (t.completion = e)
          }
          function _ (t) {
            ;(this.tryEntries = [{ tryLoc: 'root' }]),
              t.forEach(S, this),
              this.reset(!0)
          }
          function E (t) {
            if (t) {
              var e = t[i]
              if (e) return e.call(t)
              if ('function' == typeof t.next) return t
              if (!isNaN(t.length)) {
                var n = -1,
                  o = function e () {
                    for (; ++n < t.length; )
                      if (r.call(t, n))
                        return (e.value = t[n]), (e.done = !1), e
                    return (e.value = void 0), (e.done = !0), e
                  }
                return (o.next = o)
              }
            }
            return { next: x }
          }
          function x () {
            return { value: void 0, done: !0 }
          }
          return (
            (d.prototype = y),
            n(g, 'constructor', { value: y, configurable: !0 }),
            n(y, 'constructor', { value: d, configurable: !0 }),
            (d.displayName = c(y, u, 'GeneratorFunction')),
            (t.isGeneratorFunction = function (t) {
              var e = 'function' == typeof t && t.constructor
              return (
                !!e &&
                (e === d || 'GeneratorFunction' === (e.displayName || e.name))
              )
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), c(t, u, 'GeneratorFunction')),
                (t.prototype = Object.create(g)),
                t
              )
            }),
            (t.awrap = function (t) {
              return { __await: t }
            }),
            b(w.prototype),
            c(w.prototype, a, function () {
              return this
            }),
            (t.AsyncIterator = w),
            (t.async = function (e, r, n, o, i) {
              void 0 === i && (i = Promise)
              var a = new w(s(e, r, n, o), i)
              return t.isGeneratorFunction(r)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next()
                  })
            }),
            b(g),
            c(g, u, 'Generator'),
            c(g, i, function () {
              return this
            }),
            c(g, 'toString', function () {
              return '[object Generator]'
            }),
            (t.keys = function (t) {
              var e = Object(t),
                r = []
              for (var n in e) r.push(n)
              return (
                r.reverse(),
                function t () {
                  for (; r.length; ) {
                    var n = r.pop()
                    if (n in e) return (t.value = n), (t.done = !1), t
                  }
                  return (t.done = !0), t
                }
              )
            }),
            (t.values = E),
            (_.prototype = {
              constructor: _,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = void 0),
                  this.tryEntries.forEach(P),
                  !t)
                )
                  for (var e in this)
                    't' === e.charAt(0) &&
                      r.call(this, e) &&
                      !isNaN(+e.slice(1)) &&
                      (this[e] = void 0)
              },
              stop: function () {
                this.done = !0
                var t = this.tryEntries[0].completion
                if ('throw' === t.type) throw t.arg
                return this.rval
              },
              dispatchException: function (t) {
                if (this.done) throw t
                var e = this
                function n (r, n) {
                  return (
                    (a.type = 'throw'),
                    (a.arg = t),
                    (e.next = r),
                    n && ((e.method = 'next'), (e.arg = void 0)),
                    !!n
                  )
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var i = this.tryEntries[o],
                    a = i.completion
                  if ('root' === i.tryLoc) return n('end')
                  if (i.tryLoc <= this.prev) {
                    var u = r.call(i, 'catchLoc'),
                      c = r.call(i, 'finallyLoc')
                    if (u && c) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                    } else if (u) {
                      if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
                    } else {
                      if (!c)
                        throw new Error(
                          'try statement without catch or finally'
                        )
                      if (this.prev < i.finallyLoc) return n(i.finallyLoc)
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n]
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, 'finallyLoc') &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o
                    break
                  }
                }
                i &&
                  ('break' === t || 'continue' === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null)
                var a = i ? i.completion : {}
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = 'next'), (this.next = i.finallyLoc), l)
                    : this.complete(a)
                )
              },
              complete: function (t, e) {
                if ('throw' === t.type) throw t.arg
                return (
                  'break' === t.type || 'continue' === t.type
                    ? (this.next = t.arg)
                    : 'return' === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = 'return'),
                      (this.next = 'end'))
                    : 'normal' === t.type && e && (this.next = e),
                  l
                )
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e]
                  if (r.finallyLoc === t)
                    return this.complete(r.completion, r.afterLoc), P(r), l
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var r = this.tryEntries[e]
                  if (r.tryLoc === t) {
                    var n = r.completion
                    if ('throw' === n.type) {
                      var o = n.arg
                      P(r)
                    }
                    return o
                  }
                }
                throw new Error('illegal catch attempt')
              },
              delegateYield: function (t, e, r) {
                return (
                  (this.delegate = {
                    iterator: E(t),
                    resultName: e,
                    nextLoc: r
                  }),
                  'next' === this.method && (this.arg = void 0),
                  l
                )
              }
            }),
            t
          )
        }
        function Y (t, e, r, n, o, i, a) {
          try {
            var u = t[i](a),
              c = u.value
          } catch (t) {
            return void r(t)
          }
          u.done ? e(c) : Promise.resolve(c).then(n, o)
        }
        const z = {
          name: 'microApp',
          inheritAttrs: !1,
          props: {
            src: { type: String, required: !0 },
            microAppCode: { type: String, required: !0 },
            state: { type: Object },
            classNmae: String
          },
          data: function () {
            return { id: 'gislife-' + this.microAppCode }
          },
          watch: {
            state: {
              deep: !0,
              immediate: !0,
              handler: function (t) {
                var e,
                  r = this
                return ((e = V().mark(function e () {
                  return V().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            u(r.id, function (t) {
                              return t && t.contentWindow
                            })
                          )
                        case 2:
                          r.$connector.sendState(r.microAppCode, t)
                        case 4:
                        case 'end':
                          return e.stop()
                      }
                  }, e)
                })),
                function () {
                  var t = this,
                    r = arguments
                  return new Promise(function (n, o) {
                    var i = e.apply(t, r)
                    function a (t) {
                      Y(i, n, o, a, u, 'next', t)
                    }
                    function u (t) {
                      Y(i, n, o, a, u, 'throw', t)
                    }
                    a(void 0)
                  })
                })()
              }
            }
          },
          beforeDestroy: function () {
            this.$connector.unRegisterApp(this.microAppCode)
          }
        }
        var K = r(379),
          Q = r.n(K),
          X = r(795),
          Z = r.n(X),
          tt = r(569),
          et = r.n(tt),
          rt = r(565),
          nt = r.n(rt),
          ot = r(216),
          it = r.n(ot),
          at = r(589),
          ut = r.n(at),
          ct = r(899),
          st = r.n(ct),
          ft = {}
        ;(ft.styleTagTransform = ut()),
          (ft.setAttributes = nt()),
          (ft.insert = et().bind(null, 'head')),
          (ft.domAPI = Z()),
          (ft.insertStyleElement = it()),
          Q()(st(), ft),
          st() && st().locals && st().locals
        var lt = (function (t, e, r, n, o, i, a, u) {
          var c,
            s = 'function' == typeof t ? t.options : t
          if (
            (e &&
              ((s.render = e), (s.staticRenderFns = []), (s._compiled = !0)),
            c)
          )
            if (s.functional) {
              s._injectStyles = c
              var f = s.render
              s.render = function (t, e) {
                return c.call(e), f(t, e)
              }
            } else {
              var l = s.beforeCreate
              s.beforeCreate = l ? [].concat(l, c) : [c]
            }
          return { exports: t, options: s }
        })(z, function () {
          var t = this
          return (0,
          t._self
            ._c)('iframe', { ref: 'window', staticClass: 'gislife-micro-app', class: t.classNmae, attrs: { title: t.id, src: t.src, id: t.id } })
        })
        const pt = lt.exports
        var dt = new W()
        const yt = {
          install: function (t) {
            if (window.parent !== window) {
              var r = e(window.location)
              dt.setAppCode(r.microAppCode)
            } else dt.setAppCode('main')
            Object.defineProperty(t.prototype, '$connector', {
              get: function () {
                return dt
              },
              set: function (t) {
                throw Error("$connector can't set value")
              }
            }),
              t.component(pt.name, pt)
          }
        }
      })(),
      n
    )
  })()
)
//# sourceMappingURL=micro-message.js.map
