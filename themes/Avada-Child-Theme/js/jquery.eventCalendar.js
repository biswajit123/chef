/*!
 * jQuery JavaScript Library v1.8.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2012 jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: Thu Sep 20 2012 21:13:05 GMT-0400 (Eastern Daylight Time)
 */
function track_event(e) {
    var t = e.category,
        n = e.action ? e.action : t,
        r = e.note,
        i = e.properties ? e.properties : {}, s = parseInt(e.value);
    i.mp_note = r, i.url = window.location.pathname, i.page_name = document.title, isNaN(s) ? _gaq.push(["_trackEvent", t, n, r]) : _gaq.push(["_trackEvent", t, n, r, s]), window.optimizely = window.optimizely || [], window.optimizely.push(["trackEvent", t])
}

function getURLParameter(e) {
    return decodeURI(((new RegExp(e + "=" + "(.+?)(&|$)")).exec(location.search) || [, null])[1])
}(function (e, t) {
    function _(e) {
        var t = M[e] = {};
        return v.each(e.split(y), function (e, n) {
            t[n] = !0
        }), t
    }

    function H(e, n, r) {
        if (r === t && e.nodeType === 1) {
            var i = "data-" + n.replace(P, "-$1").toLowerCase();
            r = e.getAttribute(i);
            if (typeof r == "string") {
                try {
                    r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r
                } catch (s) {}
                v.data(e, n, r)
            } else r = t
        }
        return r
    }

    function B(e) {
        var t;
        for (t in e) {
            if (t === "data" && v.isEmptyObject(e[t])) continue;
            if (t !== "toJSON") return !1
        }
        return !0
    }

    function et() {
        return !1
    }

    function tt() {
        return !0
    }

    function ut(e) {
        return !e || !e.parentNode || e.parentNode.nodeType === 11
    }

    function at(e, t) {
        do e = e[t]; while (e && e.nodeType !== 1);
        return e
    }

    function ft(e, t, n) {
        t = t || 0;
        if (v.isFunction(t)) return v.grep(e, function (e, r) {
            var i = !! t.call(e, r, e);
            return i === n
        });
        if (t.nodeType) return v.grep(e, function (e, r) {
            return e === t === n
        });
        if (typeof t == "string") {
            var r = v.grep(e, function (e) {
                return e.nodeType === 1
            });
            if (it.test(t)) return v.filter(t, r, !n);
            t = v.filter(t, r)
        }
        return v.grep(e, function (e, r) {
            return v.inArray(e, t) >= 0 === n
        })
    }

    function lt(e) {
        var t = ct.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement)
            while (t.length) n.createElement(t.pop());
        return n
    }

    function Lt(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }

    function At(e, t) {
        if (t.nodeType !== 1 || !v.hasData(e)) return;
        var n, r, i, s = v._data(e),
            o = v._data(t, s),
            u = s.events;
        if (u) {
            delete o.handle, o.events = {};
            for (n in u)
                for (r = 0, i = u[n].length; r < i; r++) v.event.add(t, n, u[n][r])
        }
        o.data && (o.data = v.extend({}, o.data))
    }

    function Ot(e, t) {
        var n;
        if (t.nodeType !== 1) return;
        t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando)
    }

    function Mt(e) {
        return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : []
    }

    function _t(e) {
        Et.test(e.type) && (e.defaultChecked = e.checked)
    }

    function Qt(e, t) {
        if (t in e) return t;
        var n = t.charAt(0).toUpperCase() + t.slice(1),
            r = t,
            i = Jt.length;
        while (i--) {
            t = Jt[i] + n;
            if (t in e) return t
        }
        return r
    }

    function Gt(e, t) {
        return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e)
    }

    function Yt(e, t) {
        var n, r, i = [],
            s = 0,
            o = e.length;
        for (; s < o; s++) {
            n = e[s];
            if (!n.style) continue;
            i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r))
        }
        for (s = 0; s < o; s++) {
            n = e[s];
            if (!n.style) continue;
            if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none"
        }
        return e
    }

    function Zt(e, t, n) {
        var r = Rt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function en(e, t, n, r) {
        var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
            s = 0;
        for (; i < 4; i += 2) n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
        return s
    }

    function tn(e, t, n) {
        var r = t === "width" ? e.offsetWidth : e.offsetHeight,
            i = !0,
            s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";
        if (r <= 0 || r == null) {
            r = Dt(e, t);
            if (r < 0 || r == null) r = e.style[t];
            if (Ut.test(r)) return r;
            i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0
        }
        return r + en(e, t, n || (s ? "border" : "content"), i) + "px"
    }

    function nn(e) {
        if (Wt[e]) return Wt[e];
        var t = v("<" + e + ">").appendTo(i.body),
            n = t.css("display");
        t.remove();
        if (n === "none" || n === "") {
            Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            }));
            if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();
            t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt)
        }
        return Wt[e] = n, n
    }

    function fn(e, t, n, r) {
        var i;
        if (v.isArray(t)) v.each(t, function (t, i) {
            n || sn.test(e) ? r(e, i) : fn(e + "[" + (typeof i == "object" ? t : "") + "]", i, n, r)
        });
        else if (!n && v.type(t) === "object")
            for (i in t) fn(e + "[" + i + "]", t[i], n, r);
        else r(e, t)
    }

    function Cn(e) {
        return function (t, n) {
            typeof t != "string" && (n = t, t = "*");
            var r, i, s, o = t.toLowerCase().split(y),
                u = 0,
                a = o.length;
            if (v.isFunction(n))
                for (; u < a; u++) r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n)
        }
    }

    function kn(e, n, r, i, s, o) {
        s = s || n.dataTypes[0], o = o || {}, o[s] = !0;
        var u, a = e[s],
            f = 0,
            l = a ? a.length : 0,
            c = e === Sn;
        for (; f < l && (c || !u); f++) u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
        return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u
    }

    function Ln(e, n) {
        var r, i, s = v.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
        i && v.extend(!0, e, i)
    }

    function An(e, n, r) {
        var i, s, o, u, a = e.contents,
            f = e.dataTypes,
            l = e.responseFields;
        for (s in l) s in r && (n[l[s]] = r[s]);
        while (f[0] === "*") f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
        if (i)
            for (s in a)
                if (a[s] && a[s].test(i)) {
                    f.unshift(s);
                    break
                }
        if (f[0] in r) o = f[0];
        else {
            for (s in r) {
                if (!f[0] || e.converters[s + " " + f[0]]) {
                    o = s;
                    break
                }
                u || (u = s)
            }
            o = o || u
        } if (o) return o !== f[0] && f.unshift(o), r[o]
    }

    function On(e, t) {
        var n, r, i, s, o = e.dataTypes.slice(),
            u = o[0],
            a = {}, f = 0;
        e.dataFilter && (t = e.dataFilter(t, e.dataType));
        if (o[1])
            for (n in e.converters) a[n.toLowerCase()] = e.converters[n];
        for (; i = o[++f];)
            if (i !== "*") {
                if (u !== "*" && u !== i) {
                    n = a[u + " " + i] || a["* " + i];
                    if (!n)
                        for (r in a) {
                            s = r.split(" ");
                            if (s[1] === i) {
                                n = a[u + " " + s[0]] || a["* " + s[0]];
                                if (n) {
                                    n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));
                                    break
                                }
                            }
                        }
                    if (n !== !0)
                        if (n && e["throws"]) t = n(t);
                        else try {
                            t = n(t)
                        } catch (l) {
                            return {
                                state: "parsererror",
                                error: n ? l : "No conversion from " + u + " to " + i
                            }
                        }
                }
                u = i
            }
        return {
            state: "success",
            data: t
        }
    }

    function Fn() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }

    function In() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }

    function $n() {
        return setTimeout(function () {
            qn = t
        }, 0), qn = v.now()
    }

    function Jn(e, t) {
        v.each(t, function (t, n) {
            var r = (Vn[t] || []).concat(Vn["*"]),
                i = 0,
                s = r.length;
            for (; i < s; i++)
                if (r[i].call(e, t, n)) return
        })
    }

    function Kn(e, t, n) {
        var r, i = 0,
            s = 0,
            o = Xn.length,
            u = v.Deferred().always(function () {
                delete a.elem
            }),
            a = function () {
                var t = qn || $n(),
                    n = Math.max(0, f.startTime + f.duration - t),
                    r = 1 - (n / f.duration || 0),
                    i = 0,
                    s = f.tweens.length;
                for (; i < s; i++) f.tweens[i].run(r);
                return u.notifyWith(e, [f, r, n]), r < 1 && s ? n : (u.resolveWith(e, [f]), !1)
            }, f = u.promise({
                elem: e,
                props: v.extend({}, t),
                opts: v.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: qn || $n(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n, r) {
                    var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);
                    return f.tweens.push(i), i
                },
                stop: function (t) {
                    var n = 0,
                        r = t ? f.tweens.length : 0;
                    for (; n < r; n++) f.tweens[n].run(1);
                    return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this
                }
            }),
            l = f.props;
        Qn(l, f.opts.specialEasing);
        for (; i < o; i++) {
            r = Xn[i].call(f, e, l, f.opts);
            if (r) return r
        }
        return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, {
            anim: f,
            queue: f.opts.queue,
            elem: e
        })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always)
    }

    function Qn(e, t) {
        var n, r, i, s, o;
        for (n in e) {
            r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];
            if (o && "expand" in o) {
                s = o.expand(s), delete e[r];
                for (n in s) n in e || (e[n] = s[n], t[n] = i)
            } else t[r] = i
        }
    }

    function Gn(e, t, n) {
        var r, i, s, o, u, a, f, l, c = this,
            h = e.style,
            p = {}, d = [],
            m = e.nodeType && Gt(e);
        n.queue || (f = v._queueHooks(e, "fx"), f.unqueued == null && (f.unqueued = 0, l = f.empty.fire, f.empty.fire = function () {
            f.unqueued || l()
        }), f.unqueued++, c.always(function () {
            c.always(function () {
                f.unqueued--, v.queue(e, "fx").length || f.empty.fire()
            })
        })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? h.display = "inline-block" : h.zoom = 1)), n.overflow && (h.overflow = "hidden", v.support.shrinkWrapBlocks || c.done(function () {
            h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
        }));
        for (r in t) {
            s = t[r];
            if (Un.exec(s)) {
                delete t[r];
                if (s === (m ? "hide" : "show")) continue;
                d.push(r)
            }
        }
        o = d.length;
        if (o) {
            u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), m ? v(e).show() : c.done(function () {
                v(e).hide()
            }), c.done(function () {
                var t;
                v.removeData(e, "fxshow", !0);
                for (t in p) v.style(e, t, p[t])
            });
            for (r = 0; r < o; r++) i = d[r], a = c.createTween(i, m ? u[i] : 0), p[i] = u[i] || v.style(e, i), i in u || (u[i] = a.start, m && (a.end = a.start, a.start = i === "width" || i === "height" ? 1 : 0))
        }
    }

    function Yn(e, t, n, r, i) {
        return new Yn.prototype.init(e, t, n, r, i)
    }

    function Zn(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        t = t ? 1 : 0;
        for (; i < 4; i += 2 - t) n = $t[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }

    function tr(e) {
        return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1
    }
    var n, r, i = e.document,
        s = e.location,
        o = e.navigator,
        u = e.jQuery,
        a = e.$,
        f = Array.prototype.push,
        l = Array.prototype.slice,
        c = Array.prototype.indexOf,
        h = Object.prototype.toString,
        p = Object.prototype.hasOwnProperty,
        d = String.prototype.trim,
        v = function (e, t) {
            return new v.fn.init(e, t, n)
        }, m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
        g = /\S/,
        y = /\s+/,
        b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
        E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        S = /^[\],:{}\s]*$/,
        x = /(?:^|:|,)(?:\s*\[)+/g,
        T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        C = /^-ms-/,
        k = /-([\da-z])/gi,
        L = function (e, t) {
            return (t + "").toUpperCase()
        }, A = function () {
            i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready())
        }, O = {};
    v.fn = v.prototype = {
        constructor: v,
        init: function (e, n, r) {
            var s, o, u, a;
            if (!e) return this;
            if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
            if (typeof e == "string") {
                e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);
                if (s && (s[1] || !n)) {
                    if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);
                    o = i.getElementById(s[2]);
                    if (o && o.parentNode) {
                        if (o.id !== s[2]) return r.find(e);
                        this.length = 1, this[0] = o
                    }
                    return this.context = i, this.selector = e, this
                }
                return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
            }
            return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this))
        },
        selector: "",
        jquery: "1.8.2",
        length: 0,
        size: function () {
            return this.length
        },
        toArray: function () {
            return l.call(this)
        },
        get: function (e) {
            return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e]
        },
        pushStack: function (e, t, n) {
            var r = v.merge(this.constructor(), e);
            return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
        },
        each: function (e, t) {
            return v.each(this, e, t)
        },
        ready: function (e) {
            return v.ready.promise().done(e), this
        },
        eq: function (e) {
            return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1)
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        slice: function () {
            return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","))
        },
        map: function (e) {
            return this.pushStack(v.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: [].sort,
        splice: [].splice
    }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
        var e, n, r, i, s, o, u = arguments[0] || {}, a = 1,
            f = arguments.length,
            l = !1;
        typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), typeof u != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);
        for (; a < f; a++)
            if ((e = arguments[a]) != null)
                for (n in e) {
                    r = u[n], i = e[n];
                    if (u === i) continue;
                    l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i)
                }
        return u
    }, v.extend({
        noConflict: function (t) {
            return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (e) {
            e ? v.readyWait++ : v.ready(!0)
        },
        ready: function (e) {
            if (e === !0 ? --v.readyWait : v.isReady) return;
            if (!i.body) return setTimeout(v.ready, 1);
            v.isReady = !0;
            if (e !== !0 && --v.readyWait > 0) return;
            r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready")
        },
        isFunction: function (e) {
            return v.type(e) === "function"
        },
        isArray: Array.isArray || function (e) {
            return v.type(e) === "array"
        },
        isWindow: function (e) {
            return e != null && e == e.window
        },
        isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function (e) {
            return e == null ? String(e) : O[h.call(e)] || "object"
        },
        isPlainObject: function (e) {
            if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;
            try {
                if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (n) {
                return !1
            }
            var r;
            for (r in e);
            return r === t || p.call(e, r)
        },
        isEmptyObject: function (e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function (e) {
            throw new Error(e)
        },
        parseHTML: function (e, t, n) {
            var r;
            return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)))
        },
        parseJSON: function (t) {
            if (!t || typeof t != "string") return null;
            t = v.trim(t);
            if (e.JSON && e.JSON.parse) return e.JSON.parse(t);
            if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return (new Function("return " + t))();
            v.error("Invalid JSON: " + t)
        },
        parseXML: function (n) {
            var r, i;
            if (!n || typeof n != "string") return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch (s) {
                r = t
            }
            return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r
        },
        noop: function () {},
        globalEval: function (t) {
            t && g.test(t) && (e.execScript || function (t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function (e) {
            return e.replace(C, "ms-").replace(k, L)
        },
        nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function (e, n, r) {
            var i, s = 0,
                o = e.length,
                u = o === t || v.isFunction(e);
            if (r) {
                if (u) {
                    for (i in e)
                        if (n.apply(e[i], r) === !1) break
                } else
                    for (; s < o;)
                        if (n.apply(e[s++], r) === !1) break
            } else if (u) {
                for (i in e)
                    if (n.call(e[i], i, e[i]) === !1) break
            } else
                for (; s < o;)
                    if (n.call(e[s], s, e[s++]) === !1) break; return e
        },
        trim: d && !d.call("ï»¿Â ") ? function (e) {
            return e == null ? "" : d.call(e)
        } : function (e) {
            return e == null ? "" : (e + "").replace(b, "")
        },
        makeArray: function (e, t) {
            var n, r = t || [];
            return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r
        },
        inArray: function (e, t, n) {
            var r;
            if (t) {
                if (c) return c.call(t, e, n);
                r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;
                for (; n < r; n++)
                    if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function (e, n) {
            var r = n.length,
                i = e.length,
                s = 0;
            if (typeof r == "number")
                for (; s < r; s++) e[i++] = n[s];
            else
                while (n[s] !== t) e[i++] = n[s++];
            return e.length = i, e
        },
        grep: function (e, t, n) {
            var r, i = [],
                s = 0,
                o = e.length;
            n = !! n;
            for (; s < o; s++) r = !! t(e[s], s), n !== r && i.push(e[s]);
            return i
        },
        map: function (e, n, r) {
            var i, s, o = [],
                u = 0,
                a = e.length,
                f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));
            if (f)
                for (; u < a; u++) i = n(e[u], u, r), i != null && (o[o.length] = i);
            else
                for (s in e) i = n(e[s], s, r), i != null && (o[o.length] = i);
            return o.concat.apply([], o)
        },
        guid: 1,
        proxy: function (e, n) {
            var r, i, s;
            return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function () {
                return e.apply(n, i.concat(l.call(arguments)))
            }, s.guid = e.guid = e.guid || v.guid++, s) : t
        },
        access: function (e, n, r, i, s, o, u) {
            var a, f = r == null,
                l = 0,
                c = e.length;
            if (r && typeof r == "object") {
                for (l in r) v.access(e, n, l, r[l], 1, o, i);
                s = 1
            } else if (i !== t) {
                a = u === t && v.isFunction(i), f && (a ? (a = n, n = function (e, t, n) {
                    return a.call(v(e), n)
                }) : (n.call(e, i), n = null));
                if (n)
                    for (; l < c; l++) n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
                s = 1
            }
            return s ? e : f ? n.call(e) : c ? n(e[0], r) : o
        },
        now: function () {
            return (new Date).getTime()
        }
    }), v.ready.promise = function (t) {
        if (!r) {
            r = v.Deferred();
            if (i.readyState === "complete") setTimeout(v.ready, 1);
            else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);
            else {
                i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);
                var n = !1;
                try {
                    n = e.frameElement == null && i.documentElement
                } catch (s) {}
                n && n.doScroll && function o() {
                    if (!v.isReady) {
                        try {
                            n.doScroll("left")
                        } catch (e) {
                            return setTimeout(o, 50)
                        }
                        v.ready()
                    }
                }()
            }
        }
        return r.promise(t)
    }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
        O["[object " + t + "]"] = t.toLowerCase()
    }), n = v(i);
    var M = {};
    v.Callbacks = function (e) {
        e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);
        var n, r, i, s, o, u, a = [],
            f = !e.once && [],
            l = function (t) {
                n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;
                for (; a && u < o; u++)
                    if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        n = !1;
                        break
                    }
                i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable())
            }, c = {
                add: function () {
                    if (a) {
                        var t = a.length;
                        (function r(t) {
                            v.each(t, function (t, n) {
                                var i = v.type(n);
                                i === "function" && (!e.unique || !c.has(n)) ? a.push(n) : n && n.length && i !== "string" && r(n)
                            })
                        })(arguments), i ? o = a.length : n && (s = t, l(n))
                    }
                    return this
                },
                remove: function () {
                    return a && v.each(arguments, function (e, t) {
                        var n;
                        while ((n = v.inArray(t, a, n)) > -1) a.splice(n, 1), i && (n <= o && o--, n <= u && u--)
                    }), this
                },
                has: function (e) {
                    return v.inArray(e, a) > -1
                },
                empty: function () {
                    return a = [], this
                },
                disable: function () {
                    return a = f = n = t, this
                },
                disabled: function () {
                    return !a
                },
                lock: function () {
                    return f = t, n || c.disable(), this
                },
                locked: function () {
                    return !f
                },
                fireWith: function (e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this
                },
                fire: function () {
                    return c.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!r
                }
            };
        return c
    }, v.extend({
        Deferred: function (e) {
            var t = [
                    ["resolve", "done", v.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", v.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", v.Callbacks("memory")]
                ],
                n = "pending",
                r = {
                    state: function () {
                        return n
                    },
                    always: function () {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var e = arguments;
                        return v.Deferred(function (n) {
                            v.each(t, function (t, r) {
                                var s = r[0],
                                    o = e[t];
                                i[r[1]](v.isFunction(o) ? function () {
                                    var e = o.apply(this, arguments);
                                    e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e])
                                } : n[s])
                            }), e = null
                        }).promise()
                    },
                    promise: function (e) {
                        return e != null ? v.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, v.each(t, function (e, s) {
                var o = s[2],
                    u = s[3];
                r[s[1]] = o.add, u && o.add(function () {
                    n = u
                }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function (e) {
            var t = 0,
                n = l.call(arguments),
                r = n.length,
                i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
                s = i === 1 ? e : v.Deferred(),
                o = function (e, t, n) {
                    return function (r) {
                        t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n)
                    }
                }, u, a, f;
            if (r > 1) {
                u = new Array(r), a = new Array(r), f = new Array(r);
                for (; t < r; t++) n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i
            }
            return i || s.resolveWith(f, n), s.promise()
        }
    }), v.support = function () {
        var t, n, r, s, o, u, a, f, l, c, h, p = i.createElement("div");
        p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0], r.style.cssText = "top:1px;float:left;opacity:.5";
        if (!n || !n.length) return {};
        s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], t = {
            leadingWhitespace: p.firstChild.nodeType === 3,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !! p.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: r.getAttribute("href") === "/a",
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !! r.style.cssFloat,
            checkOn: u.value === "on",
            optSelected: o.selected,
            getSetAttribute: p.className !== "t",
            enctype: !! i.createElement("form").enctype,
            html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            boxModel: i.compatMode === "CSS1Compat",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;
        try {
            delete p.test
        } catch (d) {
            t.deleteExpando = !1
        }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function () {
            t.noCloneEvent = !1
        }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);
        if (p.attachEvent)
            for (l in {
                submit: !0,
                change: !0,
                focusin: !0
            }) f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
        return v(function () {
            var n, r, s, o, u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
                a = i.getElementsByTagName("body")[0];
            if (!a) return;
            n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || {
                width: "4px"
            }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null
        }), a.removeChild(p), n = r = s = o = u = a = p = null, t
    }();
    var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        P = /([A-Z])/g;
    v.extend({
        cache: {},
        deletedIds: [],
        uuid: 0,
        expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function (e) {
            return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !! e && !B(e)
        },
        data: function (e, n, r, i) {
            if (!v.acceptData(e)) return;
            var s, o, u = v.expando,
                a = typeof n == "string",
                f = e.nodeType,
                l = f ? v.cache : e,
                c = f ? e[u] : e[u] && u;
            if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;
            c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));
            if (typeof n == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);
            return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o
        },
        removeData: function (e, t, n) {
            if (!v.acceptData(e)) return;
            var r, i, s, o = e.nodeType,
                u = o ? v.cache : e,
                a = o ? e[v.expando] : v.expando;
            if (!u[a]) return;
            if (t) {
                r = n ? u[a] : u[a].data;
                if (r) {
                    v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));
                    for (i = 0, s = t.length; i < s; i++) delete r[t[i]];
                    if (!(n ? B : v.isEmptyObject)(r)) return
                }
            }
            if (!n) {
                delete u[a].data;
                if (!B(u[a])) return
            }
            o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null
        },
        _data: function (e, t, n) {
            return v.data(e, t, n, !0)
        },
        acceptData: function (e) {
            var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), v.fn.extend({
        data: function (e, n) {
            var r, i, s, o, u, a = this[0],
                f = 0,
                l = null;
            if (e === t) {
                if (this.length) {
                    l = v.data(a);
                    if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
                        s = a.attributes;
                        for (u = s.length; f < u; f++) o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
                        v._data(a, "parsedAttrs", !0)
                    }
                }
                return l
            }
            return typeof e == "object" ? this.each(function () {
                v.data(this, e)
            }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
                if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;
                r[1] = n, this.each(function () {
                    var t = v(this);
                    t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r)
                })
            }, null, n, arguments.length > 1, null, !1))
        },
        removeData: function (e) {
            return this.each(function () {
                v.removeData(this, e)
            })
        }
    }), v.extend({
        queue: function (e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function (e, t) {
            t = t || "fx";
            var n = v.queue(e, t),
                r = n.length,
                i = n.shift(),
                s = v._queueHooks(e, t),
                o = function () {
                    v.dequeue(e, t)
                };
            i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire()
        },
        _queueHooks: function (e, t) {
            var n = t + "queueHooks";
            return v._data(e, n) || v._data(e, n, {
                empty: v.Callbacks("once memory").add(function () {
                    v.removeData(e, t + "queue", !0), v.removeData(e, n, !0)
                })
            })
        }
    }), v.fn.extend({
        queue: function (e, n) {
            var r = 2;
            return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
                var t = v.queue(this, e, n);
                v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e)
            })
        },
        dequeue: function (e) {
            return this.each(function () {
                v.dequeue(this, e)
            })
        },
        delay: function (e, t) {
            return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
                var r = setTimeout(t, e);
                n.stop = function () {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function (e) {
            return this.queue(e || "fx", [])
        },
        promise: function (e, n) {
            var r, i = 1,
                s = v.Deferred(),
                o = this,
                u = this.length,
                a = function () {
                    --i || s.resolveWith(o, [o])
                };
            typeof e != "string" && (n = e, e = t), e = e || "fx";
            while (u--) r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
            return a(), s.promise(n)
        }
    });
    var j, F, I, q = /[\t\r\n]/g,
        R = /\r/g,
        U = /^(?:button|input)$/i,
        z = /^(?:button|input|object|select|textarea)$/i,
        W = /^a(?:rea|)$/i,
        X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        V = v.support.getSetAttribute;
    v.fn.extend({
        attr: function (e, t) {
            return v.access(this, v.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each(function () {
                v.removeAttr(this, e)
            })
        },
        prop: function (e, t) {
            return v.access(this, v.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = v.propFix[e] || e, this.each(function () {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function (e) {
            var t, n, r, i, s, o, u;
            if (v.isFunction(e)) return this.each(function (t) {
                v(this).addClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string") {
                t = e.split(y);
                for (n = 0, r = this.length; n < r; n++) {
                    i = this[n];
                    if (i.nodeType === 1)
                        if (!i.className && t.length === 1) i.className = e;
                        else {
                            s = " " + i.className + " ";
                            for (o = 0, u = t.length; o < u; o++) s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
                            i.className = v.trim(s)
                        }
                }
            }
            return this
        },
        removeClass: function (e) {
            var n, r, i, s, o, u, a;
            if (v.isFunction(e)) return this.each(function (t) {
                v(this).removeClass(e.call(this, t, this.className))
            });
            if (e && typeof e == "string" || e === t) {
                n = (e || "").split(y);
                for (u = 0, a = this.length; u < a; u++) {
                    i = this[u];
                    if (i.nodeType === 1 && i.className) {
                        r = (" " + i.className + " ").replace(q, " ");
                        for (s = 0, o = n.length; s < o; s++)
                            while (r.indexOf(" " + n[s] + " ") >= 0) r = r.replace(" " + n[s] + " ", " ");
                        i.className = e ? v.trim(r) : ""
                    }
                }
            }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e,
                r = typeof t == "boolean";
            return v.isFunction(e) ? this.each(function (n) {
                v(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function () {
                if (n === "string") {
                    var i, s = 0,
                        o = v(this),
                        u = t,
                        a = e.split(y);
                    while (i = a[s++]) u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i)
                } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || ""
            })
        },
        hasClass: function (e) {
            var t = " " + e + " ",
                n = 0,
                r = this.length;
            for (; n < r; n++)
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function (e) {
            var n, r, i, s = this[0];
            if (!arguments.length) {
                if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);
                return
            }
            return i = v.isFunction(e), this.each(function (r) {
                var s, o = v(this);
                if (this.nodeType !== 1) return;
                i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
                    return e == null ? "" : e + ""
                })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];
                if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s
            })
        }
    }), v.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = e.attributes.value;
                    return !t || t.specified ? e.value : e.text
                }
            },
            select: {
                get: function (e) {
                    var t, n, r, i, s = e.selectedIndex,
                        o = [],
                        u = e.options,
                        a = e.type === "select-one";
                    if (s < 0) return null;
                    n = a ? s : 0, r = a ? s + 1 : u.length;
                    for (; n < r; n++) {
                        i = u[n];
                        if (i.selected && (v.support.optDisabled ? !i.disabled : i.getAttribute("disabled") === null) && (!i.parentNode.disabled || !v.nodeName(i.parentNode, "optgroup"))) {
                            t = v(i).val();
                            if (a) return t;
                            o.push(t)
                        }
                    }
                    return a && !o.length && u.length ? v(u[s]).val() : o
                },
                set: function (e, t) {
                    var n = v.makeArray(t);
                    return v(e).find("option").each(function () {
                        this.selected = v.inArray(v(this).val(), n) >= 0
                    }), n.length || (e.selectedIndex = -1), n
                }
            }
        },
        attrFn: {},
        attr: function (e, n, r, i) {
            var s, o, u, a = e.nodeType;
            if (!e || a === 3 || a === 8 || a === 2) return;
            if (i && v.isFunction(v.fn[n])) return v(e)[n](r);
            if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);
            u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));
            if (r !== t) {
                if (r === null) {
                    v.removeAttr(e, n);
                    return
                }
                return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r)
            }
            return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s)
        },
        removeAttr: function (e, t) {
            var n, r, i, s, o = 0;
            if (t && e.nodeType === 1) {
                r = t.split(y);
                for (; o < r.length; o++) i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function (e, t) {
                    if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");
                    else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            },
            value: {
                get: function (e, t) {
                    return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null
                },
                set: function (e, t, n) {
                    if (j && v.nodeName(e, "button")) return j.set(e, t, n);
                    e.value = t
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function (e, n, r) {
            var i, s, o, u = e.nodeType;
            if (!e || u === 3 || u === 8 || u === 2) return;
            return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function (e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t
                }
            }
        }
    }), F = {
        get: function (e, n) {
            var r, i = v.prop(e, n);
            return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
        },
        set: function (e, t, n) {
            var r;
            return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
        }
    }, V || (I = {
        name: !0,
        id: !0,
        coords: !0
    }, j = v.valHooks.button = {
        get: function (e, n) {
            var r;
            return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t
        },
        set: function (e, t, n) {
            var r = e.getAttributeNode(n);
            return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + ""
        }
    }, v.each(["width", "height"], function (e, t) {
        v.attrHooks[t] = v.extend(v.attrHooks[t], {
            set: function (e, n) {
                if (n === "") return e.setAttribute(t, "auto"), n
            }
        })
    }), v.attrHooks.contenteditable = {
        get: j.get,
        set: function (e, t, n) {
            t === "" && (t = "false"), j.set(e, t, n)
        }
    }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
        v.attrHooks[n] = v.extend(v.attrHooks[n], {
            get: function (e) {
                var r = e.getAttribute(n, 2);
                return r === null ? t : r
            }
        })
    }), v.support.style || (v.attrHooks.style = {
        get: function (e) {
            return e.style.cssText.toLowerCase() || t
        },
        set: function (e, t) {
            return e.style.cssText = t + ""
        }
    }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, {
        get: function (e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function () {
        v.valHooks[this] = {
            get: function (e) {
                return e.getAttribute("value") === null ? "on" : e.value
            }
        }
    }), v.each(["radio", "checkbox"], function () {
        v.valHooks[this] = v.extend(v.valHooks[this], {
            set: function (e, t) {
                if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0
            }
        })
    });
    var $ = /^(?:textarea|input|select)$/i,
        J = /^([^\.]*|)(?:\.(.+)|)$/,
        K = /(?:^|\s)hover(\.\S+|)\b/,
        Q = /^key/,
        G = /^(?:mouse|contextmenu)|click/,
        Y = /^(?:focusinfocus|focusoutblur)$/,
        Z = function (e) {
            return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1")
        };
    v.event = {
        add: function (e, n, r, i, s) {
            var o, u, a, f, l, c, h, p, d, m, g;
            if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;
            r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), u = o.handle, u || (o.handle = u = function (e) {
                return typeof v == "undefined" || !! e && v.event.triggered === e.type ? t : v.event.dispatch.apply(u.elem, arguments)
            }, u.elem = e), n = v.trim(Z(n)).split(" ");
            for (f = 0; f < n.length; f++) {
                l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({
                    type: c,
                    origType: l[1],
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: s,
                    needsContext: s && v.expr.match.needsContext.test(s),
                    namespace: h.join(".")
                }, d), m = a[c];
                if (!m) {
                    m = a[c] = [], m.delegateCount = 0;
                    if (!g.setup || g.setup.call(e, i, h, u) === !1) e.addEventListener ? e.addEventListener(c, u, !1) : e.attachEvent && e.attachEvent("on" + c, u)
                }
                g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0
            }
            e = null
        },
        global: {},
        remove: function (e, t, n, r, i) {
            var s, o, u, a, f, l, c, h, p, d, m, g = v.hasData(e) && v._data(e);
            if (!g || !(h = g.events)) return;
            t = v.trim(Z(t || "")).split(" ");
            for (s = 0; s < t.length; s++) {
                o = J.exec(t[s]) || [], u = a = o[1], f = o[2];
                if (!u) {
                    for (u in h) v.event.remove(e, u + t[s], n, r, !0);
                    continue
                }
                p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
                for (c = 0; c < d.length; c++) m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
                d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u])
            }
            v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function (n, r, s, o) {
            if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
                var u, a, f, l, c, h, p, d, m, g, y = n.type || n,
                    b = [];
                if (Y.test(y + v.event.triggered)) return;
                y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());
                if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;
                n = typeof n == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";
                if (!s) {
                    u = v.cache;
                    for (f in u) u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
                    return
                }
                n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};
                if (p.trigger && p.trigger.apply(s, r) === !1) return;
                m = [
                    [s, p.bindType || y]
                ];
                if (!o && !p.noBubble && !v.isWindow(s)) {
                    g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;
                    for (c = s; l; l = l.parentNode) m.push([l, g]), c = l;
                    c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g])
                }
                for (f = 0; f < m.length && !n.isPropagationStopped(); f++) l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
                return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result
            }
            return
        },
        dispatch: function (n) {
            n = v.event.fix(n || e.event);
            var r, i, s, o, u, a, f, c, h, p, d = (v._data(this, "events") || {})[n.type] || [],
                m = d.delegateCount,
                g = l.call(arguments),
                y = !n.exclusive && !n.namespace,
                b = v.event.special[n.type] || {}, w = [];
            g[0] = n, n.delegateTarget = this;
            if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;
            if (m && (!n.button || n.type !== "click"))
                for (s = n.target; s != this; s = s.parentNode || this)
                    if (s.disabled !== !0 || n.type !== "click") {
                        u = {}, f = [];
                        for (r = 0; r < m; r++) c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
                        f.length && w.push({
                            elem: s,
                            matches: f
                        })
                    }
            d.length > m && w.push({
                elem: this,
                matches: d.slice(m)
            });
            for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
                a = w[r], n.currentTarget = a.elem;
                for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
                    c = a.matches[i];
                    if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()))
                }
            }
            return b.postDispatch && b.postDispatch.call(this, n), n.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, n) {
                var r, s, o, u = n.button,
                    a = n.fromElement;
                return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[v.expando]) return e;
            var t, n, r = e,
                s = v.event.fixHooks[e.type] || {}, o = s.props ? this.props.concat(s.props) : this.props;
            e = v.Event(r);
            for (t = o.length; t;) n = o[--t], e[n] = r[n];
            return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, s.filter ? s.filter(e, r) : e
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function (e, t, n) {
                    v.isWindow(this) && (this.onbeforeunload = n)
                },
                teardown: function (e, t) {
                    this.onbeforeunload === t && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function (e, t, n, r) {
            var i = v.extend(new v.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function (e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n))
    }, v.Event = function (e, t) {
        if (!(this instanceof v.Event)) return new v.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0
    }, v.Event.prototype = {
        preventDefault: function () {
            this.isDefaultPrevented = tt;
            var e = this.originalEvent;
            if (!e) return;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1
        },
        stopPropagation: function () {
            this.isPropagationStopped = tt;
            var e = this.originalEvent;
            if (!e) return;
            e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = tt, this.stopPropagation()
        },
        isDefaultPrevented: et,
        isPropagationStopped: et,
        isImmediatePropagationStopped: et
    }, v.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (e, t) {
        v.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function (e) {
                var n, r = this,
                    i = e.relatedTarget,
                    s = e.handleObj,
                    o = s.selector;
                if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;
                return n
            }
        }
    }), v.support.submitBubbles || (v.event.special.submit = {
        setup: function () {
            if (v.nodeName(this, "form")) return !1;
            v.event.add(this, "click._submit keypress._submit", function (e) {
                var n = e.target,
                    r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;
                r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
                    e._submit_bubble = !0
                }), v._data(r, "_submit_attached", !0))
            })
        },
        postDispatch: function (e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function () {
            if (v.nodeName(this, "form")) return !1;
            v.event.remove(this, "._submit")
        }
    }), v.support.changeBubbles || (v.event.special.change = {
        setup: function () {
            if ($.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function (e) {
                    e.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), v.event.add(this, "click._change", function (e) {
                    this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0)
                });
                return !1
            }
            v.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                $.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
                    this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0)
                }), v._data(t, "_change_attached", !0))
            })
        },
        handle: function (e) {
            var t = e.target;
            if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments)
        },
        teardown: function () {
            return v.event.remove(this, "._change"), !$.test(this.nodeName)
        }
    }), v.support.focusinBubbles || v.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, t) {
        var n = 0,
            r = function (e) {
                v.event.simulate(t, e.target, v.event.fix(e), !0)
            };
        v.event.special[t] = {
            setup: function () {
                n++ === 0 && i.addEventListener(e, r, !0)
            },
            teardown: function () {
                --n === 0 && i.removeEventListener(e, r, !0)
            }
        }
    }), v.fn.extend({
        on: function (e, n, r, i, s) {
            var o, u;
            if (typeof e == "object") {
                typeof n != "string" && (r = r || n, n = t);
                for (u in e) this.on(u, n, r, e[u], s);
                return this
            }
            r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));
            if (i === !1) i = et;
            else if (!i) return this;
            return s === 1 && (o = i, i = function (e) {
                return v().off(e), o.apply(this, arguments)
            }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
                v.event.add(this, e, i, r, n)
            })
        },
        one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function (e, n, r) {
            var i, s;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if (typeof e == "object") {
                for (s in e) this.off(s, n, e[s]);
                return this
            }
            if (n === !1 || typeof n == "function") r = n, n = t;
            return r === !1 && (r = et), this.each(function () {
                v.event.remove(this, e, r, n)
            })
        },
        bind: function (e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function (e, t) {
            return this.off(e, null, t)
        },
        live: function (e, t, n) {
            return v(this.context).on(e, this.selector, t, n), this
        },
        die: function (e, t) {
            return v(this.context).off(e, this.selector || "**", t), this
        },
        delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function (e, t, n) {
            return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function (e, t) {
            return this.each(function () {
                v.event.trigger(e, t, this)
            })
        },
        triggerHandler: function (e, t) {
            if (this[0]) return v.event.trigger(e, t, this[0], !0)
        },
        toggle: function (e) {
            var t = arguments,
                n = e.guid || v.guid++,
                r = 0,
                i = function (n) {
                    var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;
                    return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
                };
            i.guid = n;
            while (r < t.length) t[r++].guid = n;
            return this.click(i)
        },
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        v.fn[t] = function (e, n) {
            return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks)
    }),
        function (e, t) {
            function nt(e, t, n, r) {
                n = n || [], t = t || g;
                var i, s, a, f, l = t.nodeType;
                if (!e || typeof e != "string") return n;
                if (l !== 1 && l !== 9) return [];
                a = o(t);
                if (!a && !r)
                    if (i = R.exec(e))
                        if (f = i[1]) {
                            if (l === 9) {
                                s = t.getElementById(f);
                                if (!s || !s.parentNode) return n;
                                if (s.id === f) return n.push(s), n
                            } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n
                        } else {
                            if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;
                            if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n
                        }
                return vt(e.replace(j, "$1"), t, n, r, a)
            }

            function rt(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return n === "input" && t.type === e
                }
            }

            function it(e) {
                return function (t) {
                    var n = t.nodeName.toLowerCase();
                    return (n === "input" || n === "button") && t.type === e
                }
            }

            function st(e) {
                return N(function (t) {
                    return t = +t, N(function (n, r) {
                        var i, s = e([], n.length, t),
                            o = s.length;
                        while (o--) n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                    })
                })
            }

            function ot(e, t, n) {
                if (e === t) return n;
                var r = e.nextSibling;
                while (r) {
                    if (r === t) return -1;
                    r = r.nextSibling
                }
                return 1
            }

            function ut(e, t) {
                var n, r, s, o, u, a, f, l = L[d][e];
                if (l) return t ? 0 : l.slice(0);
                u = e, a = [], f = i.preFilter;
                while (u) {
                    if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length)), a.push(s = []);
                    n = !1;
                    if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");
                    for (o in i.filter)(r = J[o].exec(u)) && (!f[o] || (r = f[o](r, g, !0))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
                    if (!n) break
                }
                return t ? u.length : u ? nt.error(e) : L(e, a).slice(0)
            }

            function at(e, t, r) {
                var i = t.dir,
                    s = r && t.dir === "parentNode",
                    o = w++;
                return t.first ? function (t, n, r) {
                    while (t = t[i])
                        if (s || t.nodeType === 1) return e(t, n, r)
                } : function (t, r, u) {
                    if (!u) {
                        var a, f = b + " " + o + " ",
                            l = f + n;
                        while (t = t[i])
                            if (s || t.nodeType === 1) {
                                if ((a = t[d]) === l) return t.sizset;
                                if (typeof a == "string" && a.indexOf(f) === 0) {
                                    if (t.sizset) return t
                                } else {
                                    t[d] = l;
                                    if (e(t, r, u)) return t.sizset = !0, t;
                                    t.sizset = !1
                                }
                            }
                    } else
                        while (t = t[i])
                            if (s || t.nodeType === 1)
                                if (e(t, r, u)) return t
                }
            }

            function ft(e) {
                return e.length > 1 ? function (t, n, r) {
                    var i = e.length;
                    while (i--)
                        if (!e[i](t, n, r)) return !1;
                    return !0
                } : e[0]
            }

            function lt(e, t, n, r, i) {
                var s, o = [],
                    u = 0,
                    a = e.length,
                    f = t != null;
                for (; u < a; u++)
                    if (s = e[u])
                        if (!n || n(s, r, i)) o.push(s), f && t.push(u);
                return o
            }

            function ct(e, t, n, r, i, s) {
                return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
                    if (s && i) return;
                    var f, l, c, h = [],
                        p = [],
                        d = o.length,
                        v = s || dt(t || "*", u.nodeType ? [u] : u, [], s),
                        m = e && (s || !t) ? lt(v, h, e, u, a) : v,
                        g = n ? i || (s ? e : d || r) ? [] : o : m;
                    n && n(m, g, u, a);
                    if (r) {
                        c = lt(g, p), r(c, [], u, a), f = c.length;
                        while (f--)
                            if (l = c[f]) g[p[f]] = !(m[p[f]] = l)
                    }
                    if (s) {
                        f = e && g.length;
                        while (f--)
                            if (l = g[f]) s[h[f]] = !(o[h[f]] = l)
                    } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g)
                })
            }

            function ht(e) {
                var t, n, r, s = e.length,
                    o = i.relative[e[0].type],
                    u = o || i.relative[" "],
                    a = o ? 1 : 0,
                    f = at(function (e) {
                        return e === t
                    }, u, !0),
                    l = at(function (e) {
                        return T.call(t, e) > -1
                    }, u, !0),
                    h = [
                        function (e, n, r) {
                            return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r))
                        }
                    ];
                for (; a < s; a++)
                    if (n = i.relative[e[a].type]) h = [at(ft(h), n)];
                    else {
                        n = i.filter[e[a].type].apply(null, e[a].matches);
                        if (n[d]) {
                            r = ++a;
                            for (; r < s; r++)
                                if (i.relative[e[r].type]) break;
                            return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""))
                        }
                        h.push(n)
                    }
                return ft(h)
            }

            function pt(e, t) {
                var r = t.length > 0,
                    s = e.length > 0,
                    o = function (u, a, f, l, h) {
                        var p, d, v, m = [],
                            y = 0,
                            w = "0",
                            x = u && [],
                            T = h != null,
                            N = c,
                            C = u || s && i.find.TAG("*", h && a.parentNode || a),
                            k = b += N == null ? 1 : Math.E;
                        T && (c = a !== g && a, n = o.el);
                        for (;
                            (p = C[w]) != null; w++) {
                            if (s && p) {
                                for (d = 0; v = e[d]; d++)
                                    if (v(p, a, f)) {
                                        l.push(p);
                                        break
                                    }
                                T && (b = k, n = ++o.el)
                            }
                            r && ((p = !v && p) && y--, u && x.push(p))
                        }
                        y += w;
                        if (r && w !== y) {
                            for (d = 0; v = t[d]; d++) v(x, m, a, f);
                            if (u) {
                                if (y > 0)
                                    while (w--)!x[w] && !m[w] && (m[w] = E.call(l));
                                m = lt(m)
                            }
                            S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l)
                        }
                        return T && (b = k, c = N), x
                    };
                return o.el = 0, r ? N(o) : o
            }

            function dt(e, t, n, r) {
                var i = 0,
                    s = t.length;
                for (; i < s; i++) nt(e, t[i], n, r);
                return n
            }

            function vt(e, t, n, r, s) {
                var o, u, f, l, c, h = ut(e),
                    p = h.length;
                if (!r && h.length === 1) {
                    u = h[0] = h[0].slice(0);
                    if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
                        t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];
                        if (!t) return n;
                        e = e.slice(u.shift().length)
                    }
                    for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
                        f = u[o];
                        if (i.relative[l = f.type]) break;
                        if (c = i.find[l])
                            if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
                                u.splice(o, 1), e = r.length && u.join("");
                                if (!e) return S.apply(n, x.call(r, 0)), n;
                                break
                            }
                    }
                }
                return a(e, h)(r, t, s, n, z.test(e)), n
            }

            function mt() {}
            var n, r, i, s, o, u, a, f, l, c, h = !0,
                p = "undefined",
                d = ("sizcache" + Math.random()).replace(".", ""),
                m = String,
                g = e.document,
                y = g.documentElement,
                b = 0,
                w = 0,
                E = [].pop,
                S = [].push,
                x = [].slice,
                T = [].indexOf || function (e) {
                    var t = 0,
                        n = this.length;
                    for (; t < n; t++)
                        if (this[t] === e) return t;
                    return -1
                }, N = function (e, t) {
                    return e[d] = t == null || t, e
                }, C = function () {
                    var e = {}, t = [];
                    return N(function (n, r) {
                        return t.push(n) > i.cacheLength && delete e[t.shift()], e[n] = r
                    }, e)
                }, k = C(),
                L = C(),
                A = C(),
                O = "[\\x20\\t\\r\\n\\f]",
                M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
                _ = M.replace("w", "w#"),
                D = "([*^$|!~]?=)",
                P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
                H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
                B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
                j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
                F = new RegExp("^" + O + "*," + O + "*"),
                I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
                q = new RegExp(H),
                R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
                U = /^:not/,
                z = /[\x20\t\r\n\f]*[+~]/,
                W = /:not\($/,
                X = /h\d/i,
                V = /input|select|textarea|button/i,
                $ = /\\(?!\\)/g,
                J = {
                    ID: new RegExp("^#(" + M + ")"),
                    CLASS: new RegExp("^\\.(" + M + ")"),
                    NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"),
                    TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + P),
                    PSEUDO: new RegExp("^" + H),
                    POS: new RegExp(B, "i"),
                    CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"),
                    needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i")
                }, K = function (e) {
                    var t = g.createElement("div");
                    try {
                        return e(t)
                    } catch (n) {
                        return !1
                    } finally {
                        t = null
                    }
                }, Q = K(function (e) {
                    return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length
                }),
                G = K(function (e) {
                    return e.innerHTML = "<a href='#'></a>", e.firstChild && typeof e.firstChild.getAttribute !== p && e.firstChild.getAttribute("href") === "#"
                }),
                Y = K(function (e) {
                    e.innerHTML = "<select></select>";
                    var t = typeof e.lastChild.getAttribute("multiple");
                    return t !== "boolean" && t !== "string"
                }),
                Z = K(function (e) {
                    return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2)
                }),
                et = K(function (e) {
                    e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);
                    var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;
                    return r = !g.getElementById(d), y.removeChild(e), t
                });
            try {
                x.call(y.childNodes, 0)[0].nodeType
            } catch (tt) {
                x = function (e) {
                    var t, n = [];
                    for (; t = this[e]; e++) n.push(t);
                    return n
                }
            }
            nt.matches = function (e, t) {
                return nt(e, null, null, t)
            }, nt.matchesSelector = function (e, t) {
                return nt(t, null, null, [e]).length > 0
            }, s = nt.getText = function (e) {
                var t, n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (i === 1 || i === 9 || i === 11) {
                        if (typeof e.textContent == "string") return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += s(e)
                    } else if (i === 3 || i === 4) return e.nodeValue
                } else
                    for (; t = e[r]; r++) n += s(t);
                return n
            }, o = nt.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? t.nodeName !== "HTML" : !1
            }, u = nt.contains = y.contains ? function (e, t) {
                var n = e.nodeType === 9 ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !! (r && r.nodeType === 1 && n.contains && n.contains(r))
            } : y.compareDocumentPosition ? function (e, t) {
                return t && !! (e.compareDocumentPosition(t) & 16)
            } : function (e, t) {
                while (t = t.parentNode)
                    if (t === e) return !0;
                return !1
            }, nt.attr = function (e, t) {
                var n, r = o(e);
                return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null)
            }, i = nt.selectors = {
                cacheLength: 50,
                createPseudo: N,
                match: J,
                attrHandle: G ? {} : {
                    href: function (e) {
                        return e.getAttribute("href", 2)
                    },
                    type: function (e) {
                        return e.getAttribute("type")
                    }
                },
                find: {
                    ID: r ? function (e, t, n) {
                        if (typeof t.getElementById !== p && !n) {
                            var r = t.getElementById(e);
                            return r && r.parentNode ? [r] : []
                        }
                    } : function (e, n, r) {
                        if (typeof n.getElementById !== p && !r) {
                            var i = n.getElementById(e);
                            return i ? i.id === e || typeof i.getAttributeNode !== p && i.getAttributeNode("id").value === e ? [i] : t : []
                        }
                    },
                    TAG: Q ? function (e, t) {
                        if (typeof t.getElementsByTagName !== p) return t.getElementsByTagName(e)
                    } : function (e, t) {
                        var n = t.getElementsByTagName(e);
                        if (e === "*") {
                            var r, i = [],
                                s = 0;
                            for (; r = n[s]; s++) r.nodeType === 1 && i.push(r);
                            return i
                        }
                        return n
                    },
                    NAME: et && function (e, t) {
                        if (typeof t.getElementsByName !== p) return t.getElementsByName(name)
                    },
                    CLASS: Z && function (e, t, n) {
                        if (typeof t.getElementsByClassName !== p && !n) return t.getElementsByClassName(e)
                    }
                },
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e
                    },
                    PSEUDO: function (e) {
                        var t, n;
                        if (J.CHILD.test(e[0])) return null;
                        if (e[3]) e[2] = e[3];
                        else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;
                        return e.slice(0, 3)
                    }
                },
                filter: {
                    ID: r ? function (e) {
                        return e = e.replace($, ""),
                            function (t) {
                                return t.getAttribute("id") === e
                            }
                    } : function (e) {
                        return e = e.replace($, ""),
                            function (t) {
                                var n = typeof t.getAttributeNode !== p && t.getAttributeNode("id");
                                return n && n.value === e
                            }
                    },
                    TAG: function (e) {
                        return e === "*" ? function () {
                            return !0
                        } : (e = e.replace($, "").toLowerCase(), function (t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        })
                    },
                    CLASS: function (e) {
                        var t = k[d][e];
                        return t || (t = k(e, new RegExp("(^|" + O + ")" + e + "(" + O + "|$)"))),
                            function (e) {
                                return t.test(e.className || typeof e.getAttribute !== p && e.getAttribute("class") || "")
                            }
                    },
                    ATTR: function (e, t, n) {
                        return function (r, i) {
                            var s = nt.attr(r, e);
                            return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0
                        }
                    },
                    CHILD: function (e, t, n, r) {
                        return e === "nth" ? function (e) {
                            var t, i, s = e.parentNode;
                            if (n === 1 && r === 0) return !0;
                            if (s) {
                                i = 0;
                                for (t = s.firstChild; t; t = t.nextSibling)
                                    if (t.nodeType === 1) {
                                        i++;
                                        if (e === t) break
                                    }
                            }
                            return i -= r, i === n || i % n === 0 && i / n >= 0
                        } : function (t) {
                            var n = t;
                            switch (e) {
                                case "only":
                                case "first":
                                    while (n = n.previousSibling)
                                        if (n.nodeType === 1) return !1;
                                    if (e === "first") return !0;
                                    n = t;
                                case "last":
                                    while (n = n.nextSibling)
                                        if (n.nodeType === 1) return !1;
                                    return !0
                            }
                        }
                    },
                    PSEUDO: function (e, t) {
                        var n, r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);
                        return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
                            var i, s = r(e, t),
                                o = s.length;
                            while (o--) i = T.call(e, s[o]), e[i] = !(n[i] = s[o])
                        }) : function (e) {
                            return r(e, 0, n)
                        }) : r
                    }
                },
                pseudos: {
                    not: N(function (e) {
                        var t = [],
                            n = [],
                            r = a(e.replace(j, "$1"));
                        return r[d] ? N(function (e, t, n, i) {
                            var s, o = r(e, null, i, []),
                                u = e.length;
                            while (u--)
                                if (s = o[u]) e[u] = !(t[u] = s)
                        }) : function (e, i, s) {
                            return t[0] = e, r(t, null, s, n), !n.pop()
                        }
                    }),
                    has: N(function (e) {
                        return function (t) {
                            return nt(e, t).length > 0
                        }
                    }),
                    contains: N(function (e) {
                        return function (t) {
                            return (t.textContent || t.innerText || s(t)).indexOf(e) > -1
                        }
                    }),
                    enabled: function (e) {
                        return e.disabled === !1
                    },
                    disabled: function (e) {
                        return e.disabled === !0
                    },
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && !! e.checked || t === "option" && !! e.selected
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    parent: function (e) {
                        return !i.pseudos.empty(e)
                    },
                    empty: function (e) {
                        var t;
                        e = e.firstChild;
                        while (e) {
                            if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;
                            e = e.nextSibling
                        }
                        return !0
                    },
                    header: function (e) {
                        return X.test(e.nodeName)
                    },
                    text: function (e) {
                        var t, n;
                        return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t)
                    },
                    radio: rt("radio"),
                    checkbox: rt("checkbox"),
                    file: rt("file"),
                    password: rt("password"),
                    image: rt("image"),
                    submit: it("submit"),
                    reset: it("reset"),
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return t === "input" && e.type === "button" || t === "button"
                    },
                    input: function (e) {
                        return V.test(e.nodeName)
                    },
                    focus: function (e) {
                        var t = e.ownerDocument;
                        return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && ( !! e.type || !! e.href)
                    },
                    active: function (e) {
                        return e === e.ownerDocument.activeElement
                    },
                    first: st(function (e, t, n) {
                        return [0]
                    }),
                    last: st(function (e, t, n) {
                        return [t - 1]
                    }),
                    eq: st(function (e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: st(function (e, t, n) {
                        for (var r = 0; r < t; r += 2) e.push(r);
                        return e
                    }),
                    odd: st(function (e, t, n) {
                        for (var r = 1; r < t; r += 2) e.push(r);
                        return e
                    }),
                    lt: st(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r);
                        return e
                    }),
                    gt: st(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                        return e
                    })
                }
            }, f = y.compareDocumentPosition ? function (e, t) {
                return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1
            } : function (e, t) {
                if (e === t) return l = !0, 0;
                if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
                var n, r, i = [],
                    s = [],
                    o = e.parentNode,
                    u = t.parentNode,
                    a = o;
                if (o === u) return ot(e, t);
                if (!o) return -1;
                if (!u) return 1;
                while (a) i.unshift(a), a = a.parentNode;
                a = u;
                while (a) s.unshift(a), a = a.parentNode;
                n = i.length, r = s.length;
                for (var f = 0; f < n && f < r; f++)
                    if (i[f] !== s[f]) return ot(i[f], s[f]);
                return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1)
            }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
                var t, n = 1;
                l = h, e.sort(f);
                if (l)
                    for (; t = e[n]; n++) t === e[n - 1] && e.splice(n--, 1);
                return e
            }, nt.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, a = nt.compile = function (e, t) {
                var n, r = [],
                    i = [],
                    s = A[d][e];
                if (!s) {
                    t || (t = ut(e)), n = t.length;
                    while (n--) s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
                    s = A(e, pt(i, r))
                }
                return s
            }, g.querySelectorAll && function () {
                var e, t = vt,
                    n = /'|\\/g,
                    r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
                    i = [":focus"],
                    s = [":active", ":focus"],
                    u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;
                K(function (e) {
                    e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked")
                }), K(function (e) {
                    e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled")
                }), i = new RegExp(i.join("|")), vt = function (e, r, s, o, u) {
                    if (!o && !u && (!i || !i.test(e))) {
                        var a, f, l = !0,
                            c = d,
                            h = r,
                            p = r.nodeType === 9 && e;
                        if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
                            a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;
                            while (f--) a[f] = c + a[f].join("");
                            h = z.test(e) && r.parentNode || r, p = a.join(",")
                        }
                        if (p) try {
                            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s
                        } catch (v) {} finally {
                            l || r.removeAttribute("id")
                        }
                    }
                    return t(e, r, s, o, u)
                }, u && (K(function (t) {
                    e = u.call(t, "div");
                    try {
                        u.call(t, "[test!='']:sizzle"), s.push("!=", H)
                    } catch (n) {}
                }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
                    n = n.replace(r, "='$1']");
                    if (!o(t) && !s.test(n) && (!i || !i.test(n))) try {
                        var a = u.call(t, n);
                        if (a || e || t.document && t.document.nodeType !== 11) return a
                    } catch (f) {}
                    return nt(n, null, null, [t]).length > 0
                })
            }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt, nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains
        }(e);
    var nt = /Until$/,
        rt = /^(?:parents|prev(?:Until|All))/,
        it = /^.[^:#\[\.,]*$/,
        st = v.expr.match.needsContext,
        ot = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    v.fn.extend({
        find: function (e) {
            var t, n, r, i, s, o, u = this;
            if (typeof e != "string") return v(e).filter(function () {
                for (t = 0, n = u.length; t < n; t++)
                    if (v.contains(u[t], this)) return !0
            });
            o = this.pushStack("", "find", e);
            for (t = 0, n = this.length; t < n; t++) {
                r = o.length, v.find(e, this[t], o);
                if (t > 0)
                    for (i = r; i < o.length; i++)
                        for (s = 0; s < r; s++)
                            if (o[s] === o[i]) {
                                o.splice(i--, 1);
                                break
                            }
            }
            return o
        },
        has: function (e) {
            var t, n = v(e, this),
                r = n.length;
            return this.filter(function () {
                for (t = 0; t < r; t++)
                    if (v.contains(this, n[t])) return !0
            })
        },
        not: function (e) {
            return this.pushStack(ft(this, e, !1), "not", e)
        },
        filter: function (e) {
            return this.pushStack(ft(this, e, !0), "filter", e)
        },
        is: function (e) {
            return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0)
        },
        closest: function (e, t) {
            var n, r = 0,
                i = this.length,
                s = [],
                o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;
            for (; r < i; r++) {
                n = this[r];
                while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
                    if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
                        s.push(n);
                        break
                    }
                    n = n.parentNode
                }
            }
            return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e)
        },
        index: function (e) {
            return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function (e, t) {
            var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
                r = v.merge(this.get(), n);
            return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r))
        },
        addBack: function (e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
        }
    }), v.fn.andSelf = v.fn.addBack, v.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && t.nodeType !== 11 ? t : null
        },
        parents: function (e) {
            return v.dir(e, "parentNode")
        },
        parentsUntil: function (e, t, n) {
            return v.dir(e, "parentNode", n)
        },
        next: function (e) {
            return at(e, "nextSibling")
        },
        prev: function (e) {
            return at(e, "previousSibling")
        },
        nextAll: function (e) {
            return v.dir(e, "nextSibling")
        },
        prevAll: function (e) {
            return v.dir(e, "previousSibling")
        },
        nextUntil: function (e, t, n) {
            return v.dir(e, "nextSibling", n)
        },
        prevUntil: function (e, t, n) {
            return v.dir(e, "previousSibling", n)
        },
        siblings: function (e) {
            return v.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function (e) {
            return v.sibling(e.firstChild)
        },
        contents: function (e) {
            return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes)
        }
    }, function (e, t) {
        v.fn[e] = function (n, r) {
            var i = v.map(this, t, n);
            return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","))
        }
    }), v.extend({
        filter: function (e, t, n) {
            return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t)
        },
        dir: function (e, n, r) {
            var i = [],
                s = e[n];
            while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) s.nodeType === 1 && i.push(s), s = s[n];
            return i
        },
        sibling: function (e, t) {
            var n = [];
            for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
            return n
        }
    });
    var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        ht = / jQuery\d+="(?:null|\d+)"/g,
        pt = /^\s+/,
        dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        vt = /<([\w:]+)/,
        mt = /<tbody/i,
        gt = /<|&#?\w+;/,
        yt = /<(?:script|style|link)/i,
        bt = /<(?:script|object|embed|option|style)/i,
        wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
        Et = /^(?:checkbox|radio)$/,
        St = /checked\s*(?:[^=]|=\s*.checked.)/i,
        xt = /\/(java|ecma)script/i,
        Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
        Nt = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, Ct = lt(i),
        kt = Ct.appendChild(i.createElement("div"));
    Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({
        text: function (e) {
            return v.access(this, function (e) {
                return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e))
            }, null, e, arguments.length)
        },
        wrapAll: function (e) {
            if (v.isFunction(e)) return this.each(function (t) {
                v(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = v(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                    var e = this;
                    while (e.firstChild && e.firstChild.nodeType === 1) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function (e) {
            return v.isFunction(e) ? this.each(function (t) {
                v(this).wrapInner(e.call(this, t))
            }) : this.each(function () {
                var t = v(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function (e) {
            var t = v.isFunction(e);
            return this.each(function (n) {
                v(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                v.nodeName(this, "body") || v(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function () {
            return this.domManip(arguments, !0, function (e) {
                (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e)
            })
        },
        prepend: function () {
            return this.domManip(arguments, !0, function (e) {
                (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function () {
            if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this)
            });
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(e, this), "before", this.selector)
            }
        },
        after: function () {
            if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
                this.parentNode.insertBefore(e, this.nextSibling)
            });
            if (arguments.length) {
                var e = v.clean(arguments);
                return this.pushStack(v.merge(this, e), "after", this.selector)
            }
        },
        remove: function (e, t) {
            var n, r = 0;
            for (;
                (n = this[r]) != null; r++)
                if (!e || v.filter(e, [n]).length)!t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
            return this
        },
        empty: function () {
            var e, t = 0;
            for (;
                (e = this[t]) != null; t++) {
                e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));
                while (e.firstChild) e.removeChild(e.firstChild)
            }
            return this
        },
        clone: function (e, t) {
            return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
                return v.clone(this, e, t)
            })
        },
        html: function (e) {
            return v.access(this, function (e) {
                var n = this[0] || {}, r = 0,
                    i = this.length;
                if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;
                if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(dt, "<$1></$2>");
                    try {
                        for (; r < i; r++) n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
                        n = 0
                    } catch (s) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function (e) {
            return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
                var n = v(this),
                    r = n.html();
                n.replaceWith(e.call(this, t, r))
            }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
                var t = this.nextSibling,
                    n = this.parentNode;
                v(this).remove(), t ? v(t).before(e) : v(n).append(e)
            }))
        },
        detach: function (e) {
            return this.remove(e, !0)
        },
        domManip: function (e, n, r) {
            e = [].concat.apply([], e);
            var i, s, o, u, a = 0,
                f = e[0],
                l = [],
                c = this.length;
            if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function () {
                v(this).domManip(e, n, r)
            });
            if (v.isFunction(f)) return this.each(function (i) {
                var s = v(this);
                e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r)
            });
            if (this[0]) {
                i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);
                if (s) {
                    n = n && v.nodeName(s, "tr");
                    for (u = i.cacheable || c - 1; a < c; a++) r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0))
                }
                o = s = null, l.length && v.each(l, function (e, t) {
                    t.src ? v.ajax ? v.ajax({
                        url: t.src,
                        type: "GET",
                        dataType: "script",
                        async: !1,
                        global: !1,
                        "throws": !0
                    }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t)
                })
            }
            return this
        }
    }), v.buildFragment = function (e, n, r) {
        var s, o, u, a = e[0];
        return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), {
            fragment: s,
            cacheable: o
        }
    }, v.fragments = {}, v.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        v.fn[e] = function (n) {
            var r, i = 0,
                s = [],
                o = v(n),
                u = o.length,
                a = this.length === 1 && this[0].parentNode;
            if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;
            for (; i < u; i++) r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
            return this.pushStack(s, e, o.selector)
        }
    }), v.extend({
        clone: function (e, t, n) {
            var r, i, s, o;
            v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));
            if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
                Ot(e, o), r = Mt(e), i = Mt(o);
                for (s = 0; r[s]; ++s) i[s] && Ot(r[s], i[s])
            }
            if (t) {
                At(e, o);
                if (n) {
                    r = Mt(e), i = Mt(o);
                    for (s = 0; r[s]; ++s) At(r[s], i[s])
                }
            }
            return r = i = null, o
        },
        clean: function (e, t, n, r) {
            var s, o, u, a, f, l, c, h, p, d, m, g, y = t === i && Ct,
                b = [];
            if (!t || typeof t.createDocumentFragment == "undefined") t = i;
            for (s = 0;
                 (u = e[s]) != null; s++) {
                typeof u == "number" && (u += "");
                if (!u) continue;
                if (typeof u == "string")
                    if (!gt.test(u)) u = t.createTextNode(u);
                    else {
                        y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];
                        while (l--) c = c.lastChild;
                        if (!v.support.tbody) {
                            h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];
                            for (o = p.length - 1; o >= 0; --o) v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o])
                        }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c)
                    }
                u.nodeType ? b.push(u) : v.merge(b, u)
            }
            c && (u = c = y = null);
            if (!v.support.appendChecked)
                for (s = 0;
                     (u = b[s]) != null; s++) v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
            if (n) {
                m = function (e) {
                    if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e)
                };
                for (s = 0;
                     (u = b[s]) != null; s++)
                    if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length)
            }
            return b
        },
        cleanData: function (e, t) {
            var n, r, i, s, o = 0,
                u = v.expando,
                a = v.cache,
                f = v.support.deleteExpando,
                l = v.event.special;
            for (;
                (i = e[o]) != null; o++)
                if (t || v.acceptData(i)) {
                    r = i[u], n = r && a[r];
                    if (n) {
                        if (n.events)
                            for (s in n.events) l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
                        a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r))
                    }
                }
        }
    }),
        function () {
            var e, t;
            v.uaMatch = function (e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return {
                    browser: t[1] || "",
                    version: t[2] || "0"
                }
            }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
                function e(t, n) {
                    return new e.fn.init(t, n)
                }
                v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, i) {
                    return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t)
                }, e.fn.init.prototype = e.fn;
                var t = e(i);
                return e
            }
        }();
    var Dt, Pt, Ht, Bt = /alpha\([^)]*\)/i,
        jt = /opacity=([^)]*)/,
        Ft = /^(top|right|bottom|left)$/,
        It = /^(none|table(?!-c[ea]).+)/,
        qt = /^margin/,
        Rt = new RegExp("^(" + m + ")(.*)$", "i"),
        Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
        zt = new RegExp("^([-+])=(" + m + ")", "i"),
        Wt = {}, Xt = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Vt = {
            letterSpacing: 0,
            fontWeight: 400
        }, $t = ["Top", "Right", "Bottom", "Left"],
        Jt = ["Webkit", "O", "Moz", "ms"],
        Kt = v.fn.toggle;
    v.fn.extend({
        css: function (e, n) {
            return v.access(this, function (e, n, r) {
                return r !== t ? v.style(e, n, r) : v.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function () {
            return Yt(this, !0)
        },
        hide: function () {
            return Yt(this)
        },
        toggle: function (e, t) {
            var n = typeof e == "boolean";
            return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
                (n ? e : Gt(this)) ? v(this).show() : v(this).hide()
            })
        }
    }), v.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = Dt(e, "opacity");
                        return n === "" ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": v.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, n, r, i) {
            if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;
            var s, o, u, a = v.camelCase(n),
                f = e.style;
            n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];
            if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];
            o = typeof r, o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");
            if (r == null || o === "number" && isNaN(r)) return;
            o === "number" && !v.cssNumber[a] && (r += "px");
            if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
                f[n] = r
            } catch (l) {}
        },
        css: function (e, n, r, i) {
            var s, o, u, a = v.camelCase(n);
            return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s
        },
        swap: function (e, t, n) {
            var r, i, s = {};
            for (i in t) s[i] = e.style[i], e.style[i] = t[i];
            r = n.call(e);
            for (i in t) e.style[i] = s[i];
            return r
        }
    }), e.getComputedStyle ? Dt = function (t, n) {
        var r, i, s, o, u = e.getComputedStyle(t, null),
            a = t.style;
        return u && (r = u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r
    } : i.documentElement.currentStyle && (Dt = function (e, t) {
        var n, r, i = e.currentStyle && e.currentStyle[t],
            s = e.style;
        return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i
    }), v.each(["height", "width"], function (e, t) {
        v.cssHooks[t] = {
            get: function (e, n, r) {
                if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
                    return tn(e, t, r)
                }) : tn(e, t, r)
            },
            set: function (e, n, r) {
                return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0)
            }
        }
    }), v.support.opacity || (v.cssHooks.opacity = {
        get: function (e, t) {
            return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function (e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
                s = r && r.filter || n.filter || "";
            n.zoom = 1;
            if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
                n.removeAttribute("filter");
                if (r && !r.filter) return
            }
            n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i
        }
    }), v(function () {
        v.support.reliableMarginRight || (v.cssHooks.marginRight = {
            get: function (e, t) {
                return v.swap(e, {
                    display: "inline-block"
                }, function () {
                    if (t) return Dt(e, "marginRight")
                })
            }
        }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
            v.cssHooks[t] = {
                get: function (e, n) {
                    if (n) {
                        var r = Dt(e, t);
                        return Ut.test(r) ? v(e).position()[t] + "px" : r
                    }
                }
            }
        })
    }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
        return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none"
    }, v.expr.filters.visible = function (e) {
        return !v.expr.filters.hidden(e)
    }), v.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (e, t) {
        v.cssHooks[e + t] = {
            expand: function (n) {
                var r, i = typeof n == "string" ? n.split(" ") : [n],
                    s = {};
                for (r = 0; r < 4; r++) s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
                return s
            }
        }, qt.test(e) || (v.cssHooks[e + t].set = Zt)
    });
    var rn = /%20/g,
        sn = /\[\]$/,
        on = /\r?\n/g,
        un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        an = /^(?:select|textarea)/i;
    v.fn.extend({
        serialize: function () {
            return v.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                return this.elements ? v.makeArray(this.elements) : this
            }).filter(function () {
                    return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type))
                }).map(function (e, t) {
                    var n = v(this).val();
                    return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
                        return {
                            name: t.name,
                            value: e.replace(on, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(on, "\r\n")
                    }
                }).get()
        }
    }), v.param = function (e, n) {
        var r, i = [],
            s = function (e, t) {
                t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);
        if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function () {
            s(this.name, this.value)
        });
        else
            for (r in e) fn(r, e[r], n, s);
        return i.join("&").replace(rn, "+")
    };
    var ln, cn, hn = /#.*$/,
        pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        vn = /^(?:GET|HEAD)$/,
        mn = /^\/\//,
        gn = /\?/,
        yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bn = /([?&])_=[^&]*/,
        wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        En = v.fn.load,
        Sn = {}, xn = {}, Tn = ["*/"] + ["*"];
    try {
        cn = s.href
    } catch (Nn) {
        cn = i.createElement("a"), cn.href = "", cn = cn.href
    }
    ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
        if (typeof e != "string" && En) return En.apply(this, arguments);
        if (!this.length) return this;
        var i, s, o, u = this,
            a = e.indexOf(" ");
        return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && typeof n == "object" && (s = "POST"), v.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: n,
            complete: function (e, t) {
                r && u.each(r, o || [e.responseText, t, e])
            }
        }).done(function (e) {
                o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e)
            }), this
    }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
        v.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), v.each(["get", "post"], function (e, n) {
        v[n] = function (e, r, i, s) {
            return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({
                type: n,
                url: e,
                data: r,
                success: i,
                dataType: s
            })
        }
    }), v.extend({
        getScript: function (e, n) {
            return v.get(e, t, n, "script")
        },
        getJSON: function (e, t, n) {
            return v.get(e, t, n, "json")
        },
        ajaxSetup: function (e, t) {
            return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e
        },
        ajaxSettings: {
            url: cn,
            isLocal: dn.test(ln[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Tn
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": v.parseJSON,
                "text xml": v.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Cn(Sn),
        ajaxTransport: Cn(xn),
        ajax: function (e, n) {
            function T(e, n, s, a) {
                var l, y, b, w, S, T = n;
                if (E === 2) return;
                E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));
                if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);
                else {
                    b = T;
                    if (!T || e) T = "error", e < 0 && (e = 0)
                }
                x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"))
            }
            typeof e == "object" && (n = e, e = t), n = n || {};
            var r, i, s, o, u, a, f, l, c = v.ajaxSetup({}, n),
                h = c.context || c,
                p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
                d = v.Deferred(),
                m = v.Callbacks("once memory"),
                g = c.statusCode || {}, b = {}, w = {}, E = 0,
                S = "canceled",
                x = {
                    readyState: 0,
                    setRequestHeader: function (e, t) {
                        if (!E) {
                            var n = e.toLowerCase();
                            e = w[n] = w[n] || e, b[e] = t
                        }
                        return this
                    },
                    getAllResponseHeaders: function () {
                        return E === 2 ? i : null
                    },
                    getResponseHeader: function (e) {
                        var n;
                        if (E === 2) {
                            if (!s) {
                                s = {};
                                while (n = pn.exec(i)) s[n[1].toLowerCase()] = n[2]
                            }
                            n = s[e.toLowerCase()]
                        }
                        return n === t ? null : n
                    },
                    overrideMimeType: function (e) {
                        return E || (c.mimeType = e), this
                    },
                    abort: function (e) {
                        return e = e || S, o && o.abort(e), T(0, e), this
                    }
                };
            d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
                if (e) {
                    var t;
                    if (E < 2)
                        for (t in e) g[t] = [g[t], e[t]];
                    else t = e[x.status], x.always(t)
                }
                return this
            }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()) || !1, c.crossDomain = a && a.join(":") + (a[3] ? "" : a[1] === "http:" ? 80 : 443) !== ln.join(":") + (ln[3] ? "" : ln[1] === "http:" ? 80 : 443)), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);
            if (E === 2) return x;
            f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");
            if (!c.hasContent) {
                c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;
                if (c.cache === !1) {
                    var N = v.now(),
                        C = c.url.replace(bn, "$1_=" + N);
                    c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "")
                }
            }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers) x.setRequestHeader(l, c.headers[l]);
            if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
                S = "abort";
                for (l in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) x[l](c[l]);
                o = kn(xn, c, n, x);
                if (!o) T(-1, "No Transport");
                else {
                    x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
                        x.abort("timeout")
                    }, c.timeout));
                    try {
                        E = 1, o.send(b, T)
                    } catch (k) {
                        if (!(E < 2)) throw k;
                        T(-1, k)
                    }
                }
                return x
            }
            return x.abort()
        },
        active: 0,
        lastModified: {},
        etag: {}
    });
    var Mn = [],
        _n = /\?/,
        Dn = /(=)\?(?=&|$)|\?\?/,
        Pn = v.now();
    v.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Mn.pop() || v.expando + "_" + Pn++;
            return this[e] = !0, e
        }
    }), v.ajaxPrefilter("json jsonp", function (n, r, i) {
        var s, o, u, a = n.data,
            f = n.url,
            l = n.jsonp !== !1,
            c = l && Dn.test(f),
            h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);
        if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
            return u || v.error(s + " was not called"), u[0]
        }, n.dataTypes[0] = "json", e[s] = function () {
            u = arguments
        }, i.always(function () {
            e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t
        }), "script"
    }), v.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function (e) {
                return v.globalEval(e), e
            }
        }
    }), v.ajaxPrefilter("script", function (e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), v.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var n, r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;
            return {
                send: function (s, o) {
                    n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
                        if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success")
                    }, r.insertBefore(n, r.firstChild)
                },
                abort: function () {
                    n && n.onload(0, 1)
                }
            }
        }
    });
    var Hn, Bn = e.ActiveXObject ? function () {
            for (var e in Hn) Hn[e](0, 1)
        } : !1,
        jn = 0;
    v.ajaxSettings.xhr = e.ActiveXObject ? function () {
        return !this.isLocal && Fn() || In()
    } : Fn,
        function (e) {
            v.extend(v.support, {
                ajax: !! e,
                cors: !! e && "withCredentials" in e
            })
        }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
        if (!n.crossDomain || v.support.cors) {
            var r;
            return {
                send: function (i, s) {
                    var o, u, a = n.xhr();
                    n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);
                    if (n.xhrFields)
                        for (u in n.xhrFields) a[u] = n.xhrFields[u];
                    n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (u in i) a.setRequestHeader(u, i[u])
                    } catch (f) {}
                    a.send(n.hasContent && n.data || null), r = function (e, i) {
                        var u, f, l, c, h;
                        try {
                            if (r && (i || a.readyState === 4)) {
                                r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);
                                if (i) a.readyState !== 4 && a.abort();
                                else {
                                    u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);
                                    try {
                                        c.text = a.responseText
                                    } catch (e) {}
                                    try {
                                        f = a.statusText
                                    } catch (p) {
                                        f = ""
                                    }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204)
                                }
                            }
                        } catch (d) {
                            i || s(-1, d)
                        }
                        c && s(u, f, c, l)
                    }, n.async ? a.readyState === 4 ? setTimeout(r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = r), a.onreadystatechange = r) : r()
                },
                abort: function () {
                    r && r(0, 1)
                }
            }
        }
    });
    var qn, Rn, Un = /^(?:toggle|show|hide)$/,
        zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
        Wn = /queueHooks$/,
        Xn = [Gn],
        Vn = {
            "*": [
                function (e, t) {
                    var n, r, i = this.createTween(e, t),
                        s = zn.exec(t),
                        o = i.cur(),
                        u = +o || 0,
                        a = 1,
                        f = 20;
                    if (s) {
                        n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");
                        if (r !== "px" && u) {
                            u = v.css(i.elem, e, !0) || n || 1;
                            do a = a || ".5", u /= a, v.style(i.elem, e, u + r); while (a !== (a = i.cur() / o) && a !== 1 && --f)
                        }
                        i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n
                    }
                    return i
                }
            ]
        };
    v.Animation = v.extend(Kn, {
        tweener: function (e, t) {
            v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            var n, r = 0,
                i = e.length;
            for (; r < i; r++) n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t)
        },
        prefilter: function (e, t) {
            t ? Xn.unshift(e) : Xn.push(e)
        }
    }), v.Tween = Yn, Yn.prototype = {
        constructor: Yn,
        init: function (e, t, n, r, i, s) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px")
        },
        cur: function () {
            var e = Yn.propHooks[this.prop];
            return e && e.get ? e.get(this) : Yn.propHooks._default.get(this)
        },
        run: function (e) {
            var t, n = Yn.propHooks[this.prop];
            return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this
        }
    }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return e.elem[e.prop] == null || !! e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop]
            },
            set: function (e) {
                v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, v.each(["toggle", "show", "hide"], function (e, t) {
        var n = v.fn[t];
        v.fn[t] = function (r, i, s) {
            return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s)
        }
    }), v.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(Gt).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function (e, t, n, r) {
            var i = v.isEmptyObject(e),
                s = v.speed(t, n, r),
                o = function () {
                    var t = Kn(this, v.extend({}, e), s);
                    i && t.stop(!0)
                };
            return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o)
        },
        stop: function (e, n, r) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0,
                    n = e != null && e + "queueHooks",
                    s = v.timers,
                    o = v._data(this);
                if (n) o[n] && o[n].stop && i(o[n]);
                else
                    for (n in o) o[n] && o[n].stop && Wn.test(n) && i(o[n]);
                for (n = s.length; n--;) s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
                (t || !r) && v.dequeue(this, e)
            })
        }
    }), v.each({
        slideDown: Zn("show"),
        slideUp: Zn("hide"),
        slideToggle: Zn("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (e, t) {
        v.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), v.speed = function (e, t, n) {
        var r = e && typeof e == "object" ? v.extend({}, e) : {
            complete: n || !n && t || v.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !v.isFunction(t) && t
        };
        r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;
        if (r.queue == null || r.queue === !0) r.queue = "fx";
        return r.old = r.complete, r.complete = function () {
            v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue)
        }, r
    }, v.easing = {
        linear: function (e) {
            return e
        },
        swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
        var e, t = v.timers,
            n = 0;
        for (; n < t.length; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
        t.length || v.fx.stop()
    }, v.fx.timer = function (e) {
        e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval))
    }, v.fx.interval = 13, v.fx.stop = function () {
        clearInterval(Rn), Rn = null
    }, v.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
        return v.grep(v.timers, function (t) {
            return e === t.elem
        }).length
    });
    var er = /^(?:body|html)$/i;
    v.fn.offset = function (e) {
        if (arguments.length) return e === t ? this : this.each(function (t) {
            v.offset.setOffset(this, e, t)
        });
        var n, r, i, s, o, u, a, f = {
                top: 0,
                left: 0
            }, l = this[0],
            c = l && l.ownerDocument;
        if (!c) return;
        return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, {
            top: f.top + u - s,
            left: f.left + a - o
        }) : f)
    }, v.offset = {
        bodyOffset: function (e) {
            var t = e.offsetTop,
                n = e.offsetLeft;
            return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), {
                top: t,
                left: n
            }
        },
        setOffset: function (e, t, n) {
            var r = v.css(e, "position");
            r === "static" && (e.style.position = "relative");
            var i = v(e),
                s = i.offset(),
                o = v.css(e, "top"),
                u = v.css(e, "left"),
                a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
                f = {}, l = {}, c, h;
            a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f)
        }
    }, v.fn.extend({
        position: function () {
            if (!this[0]) return;
            var e = this[0],
                t = this.offsetParent(),
                n = this.offset(),
                r = er.test(t[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : t.offset();
            return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, {
                top: n.top - r.top,
                left: n.left - r.left
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || i.body;
                while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") e = e.offsetParent;
                return e || i.body
            })
        }
    }), v.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (e, n) {
        var r = /Y/.test(n);
        v.fn[e] = function (i) {
            return v.access(this, function (e, i, s) {
                var o = tr(e);
                if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];
                o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s
            }, e, i, arguments.length, null)
        }
    }), v.each({
        Height: "height",
        Width: "width"
    }, function (e, n) {
        v.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function (r, i) {
            v.fn[i] = function (i, s) {
                var o = arguments.length && (r || typeof i != "boolean"),
                    u = r || (i === !0 || s === !0 ? "margin" : "border");
                return v.access(this, function (n, r, i) {
                    var s;
                    return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u)
                }, n, o ? i : t, o, null)
            }
        })
    }), e.jQuery = e.$ = v, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return v
    })
})(window),
    function (e, t) {
        var n = function () {
            var t = e._data(document, "events");
            return t && t.click && e.grep(t.click, function (e) {
                return e.namespace === "rails"
            }).length
        };
        n() && e.error("jquery-ujs has already been loaded!");
        var r;
        e.rails = r = {
            linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
            inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
            formSubmitSelector: "form",
            formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
            disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
            enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
            requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
            fileInputSelector: "input:file",
            linkDisableSelector: "a[data-disable-with]",
            CSRFProtection: function (t) {
                var n = e('meta[name="csrf-token"]').attr("content");
                n && t.setRequestHeader("X-CSRF-Token", n)
            },
            fire: function (t, n, r) {
                var i = e.Event(n);
                return t.trigger(i, r), i.result !== !1
            },
            confirm: function (e) {
                return confirm(e)
            },
            ajax: function (t) {
                return e.ajax(t)
            },
            href: function (e) {
                return e.attr("href")
            },
            handleRemote: function (n) {
                var i, s, o, u, a, f, l, c;
                if (r.fire(n, "ajax:before")) {
                    u = n.data("cross-domain"), a = u === t ? null : u, f = n.data("with-credentials") || null, l = n.data("type") || e.ajaxSettings && e.ajaxSettings.dataType;
                    if (n.is("form")) {
                        i = n.attr("method"), s = n.attr("action"), o = n.serializeArray();
                        var h = n.data("ujs:submit-button");
                        h && (o.push(h), n.data("ujs:submit-button", null))
                    } else n.is(r.inputChangeSelector) ? (i = n.data("method"), s = n.data("url"), o = n.serialize(), n.data("params") && (o = o + "&" + n.data("params"))) : (i = n.data("method"), s = r.href(n), o = n.data("params") || null);
                    c = {
                        type: i || "GET",
                        data: o,
                        dataType: l,
                        beforeSend: function (e, i) {
                            return i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script), r.fire(n, "ajax:beforeSend", [e, i])
                        },
                        success: function (e, t, r) {
                            n.trigger("ajax:success", [e, t, r])
                        },
                        complete: function (e, t) {
                            n.trigger("ajax:complete", [e, t])
                        },
                        error: function (e, t, r) {
                            n.trigger("ajax:error", [e, t, r])
                        },
                        xhrFields: {
                            withCredentials: f
                        },
                        crossDomain: a
                    }, s && (c.url = s);
                    var p = r.ajax(c);
                    return n.trigger("ajax:send", p), p
                }
                return !1
            },
            handleMethod: function (n) {
                var i = r.href(n),
                    s = n.data("method"),
                    o = n.attr("target"),
                    u = e("meta[name=csrf-token]").attr("content"),
                    a = e("meta[name=csrf-param]").attr("content"),
                    f = e('<form method="post" action="' + i + '"></form>'),
                    l = '<input name="_method" value="' + s + '" type="hidden" />';
                a !== t && u !== t && (l += '<input name="' + a + '" value="' + u + '" type="hidden" />'), o && f.attr("target", o), f.hide().append(l).appendTo("body"), f.submit()
            },
            disableFormElements: function (t) {
                t.find(r.disableSelector).each(function () {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with", t[n]()), t[n](t.data("disable-with")), t.prop("disabled", !0)
                })
            },
            enableFormElements: function (t) {
                t.find(r.enableSelector).each(function () {
                    var t = e(this),
                        n = t.is("button") ? "html" : "val";
                    t.data("ujs:enable-with") && t[n](t.data("ujs:enable-with")), t.prop("disabled", !1)
                })
            },
            allowAction: function (e) {
                var t = e.data("confirm"),
                    n = !1,
                    i;
                return t ? (r.fire(e, "confirm") && (n = r.confirm(t), i = r.fire(e, "confirm:complete", [n])), n && i) : !0
            },
            blankInputs: function (t, n, r) {
                var i = e(),
                    s, o, u = n || "input,textarea",
                    a = t.find(u);
                return a.each(function () {
                    s = e(this), o = s.is(":checkbox,:radio") ? s.is(":checked") : s.val();
                    if (!o == !r) {
                        if (s.is(":radio") && a.filter('input:radio:checked[name="' + s.attr("name") + '"]').length) return !0;
                        i = i.add(s)
                    }
                }), i.length ? i : !1
            },
            nonBlankInputs: function (e, t) {
                return r.blankInputs(e, t, !0)
            },
            stopEverything: function (t) {
                return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
            },
            callFormSubmitBindings: function (n, r) {
                var i = n.data("events"),
                    s = !0;
                return i !== t && i.submit !== t && e.each(i.submit, function (e, t) {
                    if (typeof t.handler == "function") return s = t.handler(r)
                }), s
            },
            disableElement: function (e) {
                e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function (e) {
                    return r.stopEverything(e)
                })
            },
            enableElement: function (e) {
                e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.data("ujs:enable-with", !1)), e.unbind("click.railsDisable")
            }
        }, r.fire(e(document), "rails:attachBindings") && (e.ajaxPrefilter(function (e, t, n) {
            e.crossDomain || r.CSRFProtection(n)
        }), e(document).delegate(r.linkDisableSelector, "ajax:complete", function () {
            r.enableElement(e(this))
        }), e(document).delegate(r.linkClickSelector, "click.rails", function (n) {
            var i = e(this),
                s = i.data("method"),
                o = i.data("params");
            if (!r.allowAction(i)) return r.stopEverything(n);
            i.is(r.linkDisableSelector) && r.disableElement(i);
            if (i.data("remote") !== t) {
                if ((n.metaKey || n.ctrlKey) && (!s || s === "GET") && !o) return !0;
                var u = r.handleRemote(i);
                return u === !1 ? r.enableElement(i) : u.error(function () {
                    r.enableElement(i)
                }), !1
            }
            if (i.data("method")) return r.handleMethod(i), !1
        }), e(document).delegate(r.inputChangeSelector, "change.rails", function (t) {
            var n = e(this);
            return r.allowAction(n) ? (r.handleRemote(n), !1) : r.stopEverything(t)
        }), e(document).delegate(r.formSubmitSelector, "submit.rails", function (n) {
            var i = e(this),
                s = i.data("remote") !== t,
                o = r.blankInputs(i, r.requiredInputSelector),
                u = r.nonBlankInputs(i, r.fileInputSelector);
            if (!r.allowAction(i)) return r.stopEverything(n);
            if (o && i.attr("novalidate") == t && r.fire(i, "ajax:aborted:required", [o])) return r.stopEverything(n);
            if (s) {
                if (u) {
                    setTimeout(function () {
                        r.disableFormElements(i)
                    }, 13);
                    var a = r.fire(i, "ajax:aborted:file", [u]);
                    return a || setTimeout(function () {
                        r.enableFormElements(i)
                    }, 13), a
                }
                return !e.support.submitBubbles && e().jquery < "1.7" && r.callFormSubmitBindings(i, n) === !1 ? r.stopEverything(n) : (r.handleRemote(i), !1)
            }
            setTimeout(function () {
                r.disableFormElements(i)
            }, 13)
        }), e(document).delegate(r.formInputClickSelector, "click.rails", function (t) {
            var n = e(this);
            if (!r.allowAction(n)) return r.stopEverything(t);
            var i = n.attr("name"),
                s = i ? {
                    name: i,
                    value: n.val()
                } : null;
            n.closest("form").data("ujs:submit-button", s)
        }), e(document).delegate(r.formSubmitSelector, "ajax:beforeSend.rails", function (t) {
            this == t.target && r.disableFormElements(e(this))
        }), e(document).delegate(r.formSubmitSelector, "ajax:complete.rails", function (t) {
            this == t.target && r.enableFormElements(e(this))
        }), e(function () {
            csrf_token = e("meta[name=csrf-token]").attr("content"), csrf_param = e("meta[name=csrf-param]").attr("content"), e('form input[name="' + csrf_param + '"]').val(csrf_token)
        }))
    }(jQuery),
    function (e, t) {
        function n(t, n) {
            var i = t.nodeName.toLowerCase();
            if ("area" === i) {
                var s = t.parentNode,
                    o = s.name,
                    u;
                return !t.href || !o || s.nodeName.toLowerCase() !== "map" ? !1 : (u = e("img[usemap=#" + o + "]")[0], !! u && r(u))
            }
            return (/input|select|textarea|button|object/.test(i) ? !t.disabled : "a" == i ? t.href || n : n) && r(t)
        }

        function r(t) {
            return !e(t).parents().andSelf().filter(function () {
                return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
            }).length
        }
        e.ui = e.ui || {};
        if (e.ui.version) return;
        e.extend(e.ui, {
            version: "1.8.23",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        }), e.fn.extend({
            propAttr: e.fn.prop || e.fn.attr,
            _focus: e.fn.focus,
            focus: function (t, n) {
                return typeof t == "number" ? this.each(function () {
                    var r = this;
                    setTimeout(function () {
                        e(r).focus(), n && n.call(r)
                    }, t)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var t;
                return e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                }).eq(0) : t = this.parents().filter(function () {
                    return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
                }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
            },
            zIndex: function (n) {
                if (n !== t) return this.css("zIndex", n);
                if (this.length) {
                    var r = e(this[0]),
                        i, s;
                    while (r.length && r[0] !== document) {
                        i = r.css("position");
                        if (i === "absolute" || i === "relative" || i === "fixed") {
                            s = parseInt(r.css("zIndex"), 10);
                            if (!isNaN(s) && s !== 0) return s
                        }
                        r = r.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (e) {
                    e.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function (n, r) {
            function u(t, n, r, s) {
                return e.each(i, function () {
                    n -= parseFloat(e.curCSS(t, "padding" + this, !0)) || 0, r && (n -= parseFloat(e.curCSS(t, "border" + this + "Width", !0)) || 0), s && (n -= parseFloat(e.curCSS(t, "margin" + this, !0)) || 0)
                }), n
            }
            var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                s = r.toLowerCase(),
                o = {
                    innerWidth: e.fn.innerWidth,
                    innerHeight: e.fn.innerHeight,
                    outerWidth: e.fn.outerWidth,
                    outerHeight: e.fn.outerHeight
                };
            e.fn["inner" + r] = function (n) {
                return n === t ? o["inner" + r].call(this) : this.each(function () {
                    e(this).css(s, u(this, n) + "px")
                })
            }, e.fn["outer" + r] = function (t, n) {
                return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function () {
                    e(this).css(s, u(this, t, !0, n) + "px")
                })
            }
        }), e.extend(e.expr[":"], {
            data: e.expr.createPseudo ? e.expr.createPseudo(function (t) {
                return function (n) {
                    return !!e.data(n, t)
                }
            }) : function (t, n, r) {
                return !!e.data(t, r[3])
            },
            focusable: function (t) {
                return n(t, !isNaN(e.attr(t, "tabindex")))
            },
            tabbable: function (t) {
                var r = e.attr(t, "tabindex"),
                    i = isNaN(r);
                return (i || r >= 0) && n(t, !i)
            }
        }), e(function () {
            var t = document.body,
                n = t.appendChild(n = document.createElement("div"));
            n.offsetHeight, e.extend(n.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            }), e.support.minHeight = n.offsetHeight === 100, e.support.selectstart = "onselectstart" in n, t.removeChild(n).style.display = "none"
        }), e.curCSS || (e.curCSS = e.css), e.extend(e.ui, {
            plugin: {
                add: function (t, n, r) {
                    var i = e.ui[t].prototype;
                    for (var s in r) i.plugins[s] = i.plugins[s] || [], i.plugins[s].push([n, r[s]])
                },
                call: function (e, t, n) {
                    var r = e.plugins[t];
                    if (!r || !e.element[0].parentNode) return;
                    for (var i = 0; i < r.length; i++) e.options[r[i][0]] && r[i][1].apply(e.element, n)
                }
            },
            contains: function (e, t) {
                return document.compareDocumentPosition ? e.compareDocumentPosition(t) & 16 : e !== t && e.contains(t)
            },
            hasScroll: function (t, n) {
                if (e(t).css("overflow") === "hidden") return !1;
                var r = n && n === "left" ? "scrollLeft" : "scrollTop",
                    i = !1;
                return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
            },
            isOverAxis: function (e, t, n) {
                return e > t && e < t + n
            },
            isOver: function (t, n, r, i, s, o) {
                return e.ui.isOverAxis(t, r, s) && e.ui.isOverAxis(n, i, o)
            }
        })
    }(jQuery),
    function (e, t) {
        if (e.cleanData) {
            var n = e.cleanData;
            e.cleanData = function (t) {
                for (var r = 0, i;
                     (i = t[r]) != null; r++) try {
                    e(i).triggerHandler("remove")
                } catch (s) {}
                n(t)
            }
        } else {
            var r = e.fn.remove;
            e.fn.remove = function (t, n) {
                return this.each(function () {
                    return n || (!t || e.filter(t, [this]).length) && e("*", this).add([this]).each(function () {
                        try {
                            e(this).triggerHandler("remove")
                        } catch (t) {}
                    }), r.call(e(this), t, n)
                })
            }
        }
        e.widget = function (t, n, r) {
            var i = t.split(".")[0],
                s;
            t = t.split(".")[1], s = i + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][s] = function (n) {
                return !!e.data(n, t)
            }, e[i] = e[i] || {}, e[i][t] = function (e, t) {
                arguments.length && this._createWidget(e, t)
            };
            var o = new n;
            o.options = e.extend(!0, {}, o.options), e[i][t].prototype = e.extend(!0, o, {
                namespace: i,
                widgetName: t,
                widgetEventPrefix: e[i][t].prototype.widgetEventPrefix || t,
                widgetBaseClass: s
            }, r), e.widget.bridge(t, e[i][t])
        }, e.widget.bridge = function (n, r) {
            e.fn[n] = function (i) {
                var s = typeof i == "string",
                    o = Array.prototype.slice.call(arguments, 1),
                    u = this;
                return i = !s && o.length ? e.extend.apply(null, [!0, i].concat(o)) : i, s && i.charAt(0) === "_" ? u : (s ? this.each(function () {
                    var r = e.data(this, n),
                        s = r && e.isFunction(r[i]) ? r[i].apply(r, o) : r;
                    if (s !== r && s !== t) return u = s, !1
                }) : this.each(function () {
                    var t = e.data(this, n);
                    t ? t.option(i || {})._init() : e.data(this, n, new r(i, this))
                }), u)
            }
        }, e.Widget = function (e, t) {
            arguments.length && this._createWidget(e, t)
        }, e.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            options: {
                disabled: !1
            },
            _createWidget: function (t, n) {
                e.data(n, this.widgetName, this), this.element = e(n), this.options = e.extend(!0, {}, this.options, this._getCreateOptions(), t);
                var r = this;
                this.element.bind("remove." + this.widgetName, function () {
                    r.destroy()
                }), this._create(), this._trigger("create"), this._init()
            },
            _getCreateOptions: function () {
                return e.metadata && e.metadata.get(this.element[0])[this.widgetName]
            },
            _create: function () {},
            _init: function () {},
            destroy: function () {
                this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
            },
            widget: function () {
                return this.element
            },
            option: function (n, r) {
                var i = n;
                if (arguments.length === 0) return e.extend({}, this.options);
                if (typeof n == "string") {
                    if (r === t) return this.options[n];
                    i = {}, i[n] = r
                }
                return this._setOptions(i), this
            },
            _setOptions: function (t) {
                var n = this;
                return e.each(t, function (e, t) {
                    n._setOption(e, t)
                }), this
            },
            _setOption: function (e, t) {
                return this.options[e] = t, e === "disabled" && this.widget()[t ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", t), this
            },
            enable: function () {
                return this._setOption("disabled", !1)
            },
            disable: function () {
                return this._setOption("disabled", !0)
            },
            _trigger: function (t, n, r) {
                var i, s, o = this.options[t];
                r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
                if (s)
                    for (i in s) i in n || (n[i] = s[i]);
                return this.element.trigger(n, r), !(e.isFunction(o) && o.call(this.element[0], n, r) === !1 || n.isDefaultPrevented())
            }
        }
    }(jQuery),
    function (e, t) {
        var n = !1;
        e(document).mouseup(function (e) {
            n = !1
        }), e.widget("ui.mouse", {
            options: {
                cancel: ":input,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function () {
                var t = this;
                this.element.bind("mousedown." + this.widgetName, function (e) {
                    return t._mouseDown(e)
                }).bind("click." + this.widgetName, function (n) {
                        if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
                    }), this.started = !1
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function (t) {
                if (n) return;
                this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
                var r = this,
                    i = t.which == 1,
                    s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
                if (!i || s || !this._mouseCapture(t)) return !0;
                this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    r.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                    this._mouseStarted = this._mouseStart(t) !== !1;
                    if (!this._mouseStarted) return t.preventDefault(), !0
                }
                return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (e) {
                    return r._mouseMove(e)
                }, this._mouseUpDelegate = function (e) {
                    return r._mouseUp(e)
                }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
            },
            _mouseMove: function (t) {
                return !e.browser.msie || document.documentMode >= 9 || !! t.button ? this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted) : this._mouseUp(t)
            },
            _mouseUp: function (t) {
                return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target == this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
            },
            _mouseDistanceMet: function (e) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function (e) {
                return this.mouseDelayMet
            },
            _mouseStart: function (e) {},
            _mouseDrag: function (e) {},
            _mouseStop: function (e) {},
            _mouseCapture: function (e) {
                return !0
            }
        })
    }(jQuery),
    function (e, t) {
        e.widget("ui.draggable", e.ui.mouse, {
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1
            },
            _create: function () {
                this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
            },
            destroy: function () {
                if (!this.element.data("draggable")) return;
                return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
            },
            _mouseCapture: function (t) {
                var n = this.options;
                return this.helper || n.disabled || e(t.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(t), this.handle ? (n.iframeFix && e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function () {
                    e('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1e3
                    }).css(e(this).offset()).appendTo("body")
                }), !0) : !1)
            },
            _mouseStart: function (t) {
                var n = this.options;
                return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, e.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
            },
            _mouseDrag: function (t, n) {
                this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
                if (!n) {
                    var r = this._uiHash();
                    if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                    this.position = r.position
                }
                if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
                if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
                return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
            },
            _mouseStop: function (t) {
                var n = !1;
                e.ui.ddmanager && !this.options.dropBehaviour && (n = e.ui.ddmanager.drop(this, t)), this.dropped && (n = this.dropped, this.dropped = !1);
                var r = this.element[0],
                    i = !1;
                while (r && (r = r.parentNode)) r == document && (i = !0);
                if (!i && this.options.helper === "original") return !1;
                if (this.options.revert == "invalid" && !n || this.options.revert == "valid" && n || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, n)) {
                    var s = this;
                    e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                        s._trigger("stop", t) !== !1 && s._clear()
                    })
                } else this._trigger("stop", t) !== !1 && this._clear();
                return !1
            },
            _mouseUp: function (t) {
                return this.options.iframeFix === !0 && e("div.ui-draggable-iframeFix").each(function () {
                    this.parentNode.removeChild(this)
                }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
            },
            cancel: function () {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
            },
            _getHandle: function (t) {
                var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
                return e(this.options.handle, this.element).find("*").andSelf().each(function () {
                    this == t.target && (n = !0)
                }), n
            },
            _createHelper: function (t) {
                var n = this.options,
                    r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
                return r.parents("body").length || r.appendTo(n.appendTo == "parent" ? this.element[0].parentNode : n.appendTo), r[0] != this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
            },
            _adjustOffsetFromHelper: function (t) {
                typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
                if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie) t = {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function () {
                if (this.cssPosition == "relative") {
                    var e = this.element.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                }
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function () {
                var t = this.options;
                t.containment == "parent" && (t.containment = this.helper[0].parentNode);
                if (t.containment == "document" || t.containment == "window") this.containment = [t.containment == "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t.containment == "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (t.containment == "document" ? 0 : e(window).scrollLeft()) + e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (t.containment == "document" ? 0 : e(window).scrollTop()) + (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                if (!/^(document|window|parent)$/.test(t.containment) && t.containment.constructor != Array) {
                    var n = e(t.containment),
                        r = n[0];
                    if (!r) return;
                    var i = n.offset(),
                        s = e(r).css("overflow") != "hidden";
                    this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (s ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (s ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
                } else t.containment.constructor == Array && (this.containment = t.containment)
            },
            _convertPositionTo: function (t, n) {
                n || (n = this.position);
                var r = t == "absolute" ? 1 : -1,
                    i = this.options,
                    s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(s[0].tagName);
                return {
                    top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r),
                    left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r)
                }
            },
            _generatePosition: function (t) {
                var n = this.options,
                    r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    i = /(html|body)/i.test(r[0].tagName),
                    s = t.pageX,
                    o = t.pageY;
                if (this.originalPosition) {
                    var u;
                    if (this.containment) {
                        if (this.relative_container) {
                            var a = this.relative_container.offset();
                            u = [this.containment[0] + a.left, this.containment[1] + a.top, this.containment[2] + a.left, this.containment[3] + a.top]
                        } else u = this.containment;
                        t.pageX - this.offset.click.left < u[0] && (s = u[0] + this.offset.click.left), t.pageY - this.offset.click.top < u[1] && (o = u[1] + this.offset.click.top), t.pageX - this.offset.click.left > u[2] && (s = u[2] + this.offset.click.left), t.pageY - this.offset.click.top > u[3] && (o = u[3] + this.offset.click.top)
                    }
                    if (n.grid) {
                        var f = n.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1] : this.originalPageY;
                        o = u ? f - this.offset.click.top < u[1] || f - this.offset.click.top > u[3] ? f - this.offset.click.top < u[1] ? f + n.grid[1] : f - n.grid[1] : f : f;
                        var l = n.grid[0] ? this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0] : this.originalPageX;
                        s = u ? l - this.offset.click.left < u[0] || l - this.offset.click.left > u[2] ? l - this.offset.click.left < u[0] ? l + n.grid[0] : l - n.grid[0] : l : l
                    }
                }
                return {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                    left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && e.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
                }
            },
            _clear: function () {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
            },
            _trigger: function (t, n, r) {
                return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
            },
            plugins: {},
            _uiHash: function (e) {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                }
            }
        }), e.extend(e.ui.draggable, {
            version: "1.8.23"
        }), e.ui.plugin.add("draggable", "connectToSortable", {
            start: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options,
                    s = e.extend({}, n, {
                        item: r.element
                    });
                r.sortables = [], e(i.connectToSortable).each(function () {
                    var n = e.data(this, "sortable");
                    n && !n.options.disabled && (r.sortables.push({
                        instance: n,
                        shouldRevert: n.options.revert
                    }), n.refreshPositions(), n._trigger("activate", t, s))
                })
            },
            stop: function (t, n) {
                var r = e(this).data("draggable"),
                    i = e.extend({}, n, {
                        item: r.element
                    });
                e.each(r.sortables, function () {
                    this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
                })
            },
            drag: function (t, n) {
                var r = e(this).data("draggable"),
                    i = this,
                    s = function (t) {
                        var n = this.offset.click.top,
                            r = this.offset.click.left,
                            i = this.positionAbs.top,
                            s = this.positionAbs.left,
                            o = t.height,
                            u = t.width,
                            a = t.top,
                            f = t.left;
                        return e.ui.isOver(i + n, s + r, a, f, o, u)
                    };
                e.each(r.sortables, function (s) {
                    this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                        return n.helper[0]
                    }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
                })
            }
        }), e.ui.plugin.add("draggable", "cursor", {
            start: function (t, n) {
                var r = e("body"),
                    i = e(this).data("draggable").options;
                r.css("cursor") && (i._cursor = r.css("cursor")), r.css("cursor", i.cursor)
            },
            stop: function (t, n) {
                var r = e(this).data("draggable").options;
                r._cursor && e("body").css("cursor", r._cursor)
            }
        }), e.ui.plugin.add("draggable", "opacity", {
            start: function (t, n) {
                var r = e(n.helper),
                    i = e(this).data("draggable").options;
                r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
            },
            stop: function (t, n) {
                var r = e(this).data("draggable").options;
                r._opacity && e(n.helper).css("opacity", r._opacity)
            }
        }), e.ui.plugin.add("draggable", "scroll", {
            start: function (t, n) {
                var r = e(this).data("draggable");
                r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML" && (r.overflowOffset = r.scrollParent.offset())
            },
            drag: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options,
                    s = !1;
                if (r.scrollParent[0] != document && r.scrollParent[0].tagName != "HTML") {
                    if (!i.axis || i.axis != "x") r.overflowOffset.top + r.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - r.overflowOffset.top < i.scrollSensitivity && (r.scrollParent[0].scrollTop = s = r.scrollParent[0].scrollTop - i.scrollSpeed);
                    if (!i.axis || i.axis != "y") r.overflowOffset.left + r.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - r.overflowOffset.left < i.scrollSensitivity && (r.scrollParent[0].scrollLeft = s = r.scrollParent[0].scrollLeft - i.scrollSpeed)
                } else {
                    if (!i.axis || i.axis != "x") t.pageY - e(document).scrollTop() < i.scrollSensitivity ? s = e(document).scrollTop(e(document).scrollTop() - i.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < i.scrollSensitivity && (s = e(document).scrollTop(e(document).scrollTop() + i.scrollSpeed));
                    if (!i.axis || i.axis != "y") t.pageX - e(document).scrollLeft() < i.scrollSensitivity ? s = e(document).scrollLeft(e(document).scrollLeft() - i.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < i.scrollSensitivity && (s = e(document).scrollLeft(e(document).scrollLeft() + i.scrollSpeed))
                }
                s !== !1 && e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(r, t)
            }
        }), e.ui.plugin.add("draggable", "snap", {
            start: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options;
                r.snapElements = [], e(i.snap.constructor != String ? i.snap.items || ":data(draggable)" : i.snap).each(function () {
                    var t = e(this),
                        n = t.offset();
                    this != r.element[0] && r.snapElements.push({
                        item: this,
                        width: t.outerWidth(),
                        height: t.outerHeight(),
                        top: n.top,
                        left: n.left
                    })
                })
            },
            drag: function (t, n) {
                var r = e(this).data("draggable"),
                    i = r.options,
                    s = i.snapTolerance,
                    o = n.offset.left,
                    u = o + r.helperProportions.width,
                    a = n.offset.top,
                    f = a + r.helperProportions.height;
                for (var l = r.snapElements.length - 1; l >= 0; l--) {
                    var c = r.snapElements[l].left,
                        h = c + r.snapElements[l].width,
                        p = r.snapElements[l].top,
                        d = p + r.snapElements[l].height;
                    if (!(c - s < o && o < h + s && p - s < a && a < d + s || c - s < o && o < h + s && p - s < f && f < d + s || c - s < u && u < h + s && p - s < a && a < d + s || c - s < u && u < h + s && p - s < f && f < d + s)) {
                        r.snapElements[l].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, e.extend(r._uiHash(), {
                            snapItem: r.snapElements[l].item
                        })), r.snapElements[l].snapping = !1;
                        continue
                    }
                    if (i.snapMode != "inner") {
                        var v = Math.abs(p - f) <= s,
                            m = Math.abs(d - a) <= s,
                            g = Math.abs(c - u) <= s,
                            y = Math.abs(h - o) <= s;
                        v && (n.position.top = r._convertPositionTo("relative", {
                            top: p - r.helperProportions.height,
                            left: 0
                        }).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
                            top: d,
                            left: 0
                        }).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: c - r.helperProportions.width
                        }).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: h
                        }).left - r.margins.left)
                    }
                    var b = v || m || g || y;
                    if (i.snapMode != "outer") {
                        var v = Math.abs(p - a) <= s,
                            m = Math.abs(d - f) <= s,
                            g = Math.abs(c - o) <= s,
                            y = Math.abs(h - u) <= s;
                        v && (n.position.top = r._convertPositionTo("relative", {
                            top: p,
                            left: 0
                        }).top - r.margins.top), m && (n.position.top = r._convertPositionTo("relative", {
                            top: d - r.helperProportions.height,
                            left: 0
                        }).top - r.margins.top), g && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: c
                        }).left - r.margins.left), y && (n.position.left = r._convertPositionTo("relative", {
                            top: 0,
                            left: h - r.helperProportions.width
                        }).left - r.margins.left)
                    }!r.snapElements[l].snapping && (v || m || g || y || b) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, e.extend(r._uiHash(), {
                        snapItem: r.snapElements[l].item
                    })), r.snapElements[l].snapping = v || m || g || y || b
                }
            }
        }), e.ui.plugin.add("draggable", "stack", {
            start: function (t, n) {
                var r = e(this).data("draggable").options,
                    i = e.makeArray(e(r.stack)).sort(function (t, n) {
                        return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
                    });
                if (!i.length) return;
                var s = parseInt(i[0].style.zIndex) || 0;
                e(i).each(function (e) {
                    this.style.zIndex = s + e
                }), this[0].style.zIndex = s + i.length
            }
        }), e.ui.plugin.add("draggable", "zIndex", {
            start: function (t, n) {
                var r = e(n.helper),
                    i = e(this).data("draggable").options;
                r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
            },
            stop: function (t, n) {
                var r = e(this).data("draggable").options;
                r._zIndex && e(n.helper).css("zIndex", r._zIndex)
            }
        })
    }(jQuery),
    function (e, t) {
        e.widget("ui.droppable", {
            widgetEventPrefix: "drop",
            options: {
                accept: "*",
                activeClass: !1,
                addClasses: !0,
                greedy: !1,
                hoverClass: !1,
                scope: "default",
                tolerance: "intersect"
            },
            _create: function () {
                var t = this.options,
                    n = t.accept;
                this.isover = 0, this.isout = 1, this.accept = e.isFunction(n) ? n : function (e) {
                    return e.is(n)
                }, this.proportions = {
                    width: this.element[0].offsetWidth,
                    height: this.element[0].offsetHeight
                }, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
            },
            destroy: function () {
                var t = e.ui.ddmanager.droppables[this.options.scope];
                for (var n = 0; n < t.length; n++) t[n] == this && t.splice(n, 1);
                return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"), this
            },
            _setOption: function (t, n) {
                t == "accept" && (this.accept = e.isFunction(n) ? n : function (e) {
                    return e.is(n)
                }), e.Widget.prototype._setOption.apply(this, arguments)
            },
            _activate: function (t) {
                var n = e.ui.ddmanager.current;
                this.options.activeClass && this.element.addClass(this.options.activeClass), n && this._trigger("activate", t, this.ui(n))
            },
            _deactivate: function (t) {
                var n = e.ui.ddmanager.current;
                this.options.activeClass && this.element.removeClass(this.options.activeClass), n && this._trigger("deactivate", t, this.ui(n))
            },
            _over: function (t) {
                var n = e.ui.ddmanager.current;
                if (!n || (n.currentItem || n.element)[0] == this.element[0]) return;
                this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(n)))
            },
            _out: function (t) {
                var n = e.ui.ddmanager.current;
                if (!n || (n.currentItem || n.element)[0] == this.element[0]) return;
                this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(n)))
            },
            _drop: function (t, n) {
                var r = n || e.ui.ddmanager.current;
                if (!r || (r.currentItem || r.element)[0] == this.element[0]) return !1;
                var i = !1;
                return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                    var t = e.data(this, "droppable");
                    if (t.options.greedy && !t.options.disabled && t.options.scope == r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {
                        offset: t.element.offset()
                    }), t.options.tolerance)) return i = !0, !1
                }), i ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1
            },
            ui: function (e) {
                return {
                    draggable: e.currentItem || e.element,
                    helper: e.helper,
                    position: e.position,
                    offset: e.positionAbs
                }
            }
        }), e.extend(e.ui.droppable, {
            version: "1.8.23"
        }), e.ui.intersect = function (t, n, r) {
            if (!n.offset) return !1;
            var i = (t.positionAbs || t.position.absolute).left,
                s = i + t.helperProportions.width,
                o = (t.positionAbs || t.position.absolute).top,
                u = o + t.helperProportions.height,
                a = n.offset.left,
                f = a + n.proportions.width,
                l = n.offset.top,
                c = l + n.proportions.height;
            switch (r) {
                case "fit":
                    return a <= i && s <= f && l <= o && u <= c;
                case "intersect":
                    return a < i + t.helperProportions.width / 2 && s - t.helperProportions.width / 2 < f && l < o + t.helperProportions.height / 2 && u - t.helperProportions.height / 2 < c;
                case "pointer":
                    var h = (t.positionAbs || t.position.absolute).left + (t.clickOffset || t.offset.click).left,
                        p = (t.positionAbs || t.position.absolute).top + (t.clickOffset || t.offset.click).top,
                        d = e.ui.isOver(p, h, l, a, n.proportions.height, n.proportions.width);
                    return d;
                case "touch":
                    return (o >= l && o <= c || u >= l && u <= c || o < l && u > c) && (i >= a && i <= f || s >= a && s <= f || i < a && s > f);
                default:
                    return !1
            }
        }, e.ui.ddmanager = {
            current: null,
            droppables: {
                "default": []
            },
            prepareOffsets: function (t, n) {
                var r = e.ui.ddmanager.droppables[t.options.scope] || [],
                    i = n ? n.type : null,
                    s = (t.currentItem || t.element).find(":data(droppable)").andSelf();
                e: for (var o = 0; o < r.length; o++) {
                    if (r[o].options.disabled || t && !r[o].accept.call(r[o].element[0], t.currentItem || t.element)) continue;
                    for (var u = 0; u < s.length; u++)
                        if (s[u] == r[o].element[0]) {
                            r[o].proportions.height = 0;
                            continue e
                        }
                    r[o].visible = r[o].element.css("display") != "none";
                    if (!r[o].visible) continue;
                    i == "mousedown" && r[o]._activate.call(r[o], n), r[o].offset = r[o].element.offset(), r[o].proportions = {
                        width: r[o].element[0].offsetWidth,
                        height: r[o].element[0].offsetHeight
                    }
                }
            },
            drop: function (t, n) {
                var r = !1;
                return e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
                    if (!this.options) return;
                    !this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, n) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = 1, this.isover = 0, this._deactivate.call(this, n))
                }), r
            },
            dragStart: function (t, n) {
                t.element.parents(":not(body,html)").bind("scroll.droppable", function () {
                    t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
                })
            },
            drag: function (t, n) {
                t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function () {
                    if (this.options.disabled || this.greedyChild || !this.visible) return;
                    var r = e.ui.intersect(t, this, this.options.tolerance),
                        i = !r && this.isover == 1 ? "isout" : r && this.isover == 0 ? "isover" : null;
                    if (!i) return;
                    var s;
                    if (this.options.greedy) {
                        var o = this.element.parents(":data(droppable):eq(0)");
                        o.length && (s = e.data(o[0], "droppable"), s.greedyChild = i == "isover" ? 1 : 0)
                    }
                    s && i == "isover" && (s.isover = 0, s.isout = 1, s._out.call(s, n)), this[i] = 1, this[i == "isout" ? "isover" : "isout"] = 0, this[i == "isover" ? "_over" : "_out"].call(this, n), s && i == "isout" && (s.isout = 0, s.isover = 1, s._over.call(s, n))
                })
            },
            dragStop: function (t, n) {
                t.element.parents(":not(body,html)").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
            }
        }
    }(jQuery),
    function (e, t) {
        e.widget("ui.resizable", e.ui.mouse, {
            widgetEventPrefix: "resize",
            options: {
                alsoResize: !1,
                animate: !1,
                animateDuration: "slow",
                animateEasing: "swing",
                aspectRatio: !1,
                autoHide: !1,
                containment: !1,
                ghost: !1,
                grid: !1,
                handles: "e,s,se",
                helper: !1,
                maxHeight: null,
                maxWidth: null,
                minHeight: 10,
                minWidth: 10,
                zIndex: 1e3
            },
            _create: function () {
                var t = this,
                    n = this.options;
                this.element.addClass("ui-resizable"), e.extend(this, {
                    _aspectRatio: !! n.aspectRatio,
                    aspectRatio: n.aspectRatio,
                    originalElement: this.element,
                    _proportionallyResizeElements: [],
                    _helper: n.helper || n.ghost || n.animate ? n.helper || "ui-resizable-helper" : null
                }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize()), this.handles = n.handles || (e(".ui-resizable-handle", this.element).length ? {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                } : "e,s,se");
                if (this.handles.constructor == String) {
                    this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                    var r = this.handles.split(",");
                    this.handles = {};
                    for (var i = 0; i < r.length; i++) {
                        var s = e.trim(r[i]),
                            o = "ui-resizable-" + s,
                            u = e('<div class="ui-resizable-handle ' + o + '"></div>');
                        u.css({
                            zIndex: n.zIndex
                        }), "se" == s && u.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[s] = ".ui-resizable-" + s, this.element.append(u)
                    }
                }
                this._renderAxis = function (t) {
                    t = t || this.element;
                    for (var n in this.handles) {
                        this.handles[n].constructor == String && (this.handles[n] = e(this.handles[n], this.element).show());
                        if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                            var r = e(this.handles[n], this.element),
                                i = 0;
                            i = /sw|ne|nw|se|n|s/.test(n) ? r.outerHeight() : r.outerWidth();
                            var s = ["padding", /ne|nw|n/.test(n) ? "Top" : /se|sw|s/.test(n) ? "Bottom" : /^e$/.test(n) ? "Right" : "Left"].join("");
                            t.css(s, i), this._proportionallyResize()
                        }
                        if (!e(this.handles[n]).length) continue
                    }
                }, this._renderAxis(this.element), this._handles = e(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
                    if (!t.resizing) {
                        if (this.className) var e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                        t.axis = e && e[1] ? e[1] : "se"
                    }
                }), n.autoHide && (this._handles.hide(), e(this.element).addClass("ui-resizable-autohide").hover(function () {
                    if (n.disabled) return;
                    e(this).removeClass("ui-resizable-autohide"), t._handles.show()
                }, function () {
                    if (n.disabled) return;
                    t.resizing || (e(this).addClass("ui-resizable-autohide"), t._handles.hide())
                })), this._mouseInit()
            },
            destroy: function () {
                this._mouseDestroy();
                var t = function (t) {
                    e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
                if (this.elementIsWrapper) {
                    t(this.element);
                    var n = this.element;
                    n.after(this.originalElement.css({
                        position: n.css("position"),
                        width: n.outerWidth(),
                        height: n.outerHeight(),
                        top: n.css("top"),
                        left: n.css("left")
                    })).remove()
                }
                return this.originalElement.css("resize", this.originalResizeStyle), t(this.originalElement), this
            },
            _mouseCapture: function (t) {
                var n = !1;
                for (var r in this.handles) e(this.handles[r])[0] == t.target && (n = !0);
                return !this.options.disabled && n
            },
            _mouseStart: function (t) {
                var r = this.options,
                    i = this.element.position(),
                    s = this.element;
                this.resizing = !0, this.documentScroll = {
                    top: e(document).scrollTop(),
                    left: e(document).scrollLeft()
                }, (s.is(".ui-draggable") || /absolute/.test(s.css("position"))) && s.css({
                    position: "absolute",
                    top: i.top,
                    left: i.left
                }), this._renderProxy();
                var o = n(this.helper.css("left")),
                    u = n(this.helper.css("top"));
                r.containment && (o += e(r.containment).scrollLeft() || 0, u += e(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                    left: o,
                    top: u
                }, this.size = this._helper ? {
                    width: s.outerWidth(),
                    height: s.outerHeight()
                } : {
                    width: s.width(),
                    height: s.height()
                }, this.originalSize = this._helper ? {
                    width: s.outerWidth(),
                    height: s.outerHeight()
                } : {
                    width: s.width(),
                    height: s.height()
                }, this.originalPosition = {
                    left: o,
                    top: u
                }, this.sizeDiff = {
                    width: s.outerWidth() - s.width(),
                    height: s.outerHeight() - s.height()
                }, this.originalMousePosition = {
                    left: t.pageX,
                    top: t.pageY
                }, this.aspectRatio = typeof r.aspectRatio == "number" ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
                var a = e(".ui-resizable-" + this.axis).css("cursor");
                return e("body").css("cursor", a == "auto" ? this.axis + "-resize" : a), s.addClass("ui-resizable-resizing"), this._propagate("start", t), !0
            },
            _mouseDrag: function (t) {
                var n = this.helper,
                    r = this.options,
                    i = {}, s = this,
                    o = this.originalMousePosition,
                    u = this.axis,
                    a = t.pageX - o.left || 0,
                    f = t.pageY - o.top || 0,
                    l = this._change[u];
                if (!l) return !1;
                var c = l.apply(this, [t, a, f]),
                    h = e.browser.msie && e.browser.version < 7,
                    p = this.sizeDiff;
                this._updateVirtualBoundaries(t.shiftKey);
                if (this._aspectRatio || t.shiftKey) c = this._updateRatio(c, t);
                return c = this._respectSize(c, t), this._propagate("resize", t), n.css({
                    top: this.position.top + "px",
                    left: this.position.left + "px",
                    width: this.size.width + "px",
                    height: this.size.height + "px"
                }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(c), this._trigger("resize", t, this.ui()), !1
            },
            _mouseStop: function (t) {
                this.resizing = !1;
                var n = this.options,
                    r = this;
                if (this._helper) {
                    var i = this._proportionallyResizeElements,
                        s = i.length && /textarea/i.test(i[0].nodeName),
                        o = s && e.ui.hasScroll(i[0], "left") ? 0 : r.sizeDiff.height,
                        u = s ? 0 : r.sizeDiff.width,
                        a = {
                            width: r.helper.width() - u,
                            height: r.helper.height() - o
                        }, f = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null,
                        l = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
                    n.animate || this.element.css(e.extend(a, {
                        top: l,
                        left: f
                    })), r.helper.height(r.size.height), r.helper.width(r.size.width), this._helper && !n.animate && this._proportionallyResize()
                }
                return e("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
            },
            _updateVirtualBoundaries: function (e) {
                var t = this.options,
                    n, i, s, o, u;
                u = {
                    minWidth: r(t.minWidth) ? t.minWidth : 0,
                    maxWidth: r(t.maxWidth) ? t.maxWidth : Infinity,
                    minHeight: r(t.minHeight) ? t.minHeight : 0,
                    maxHeight: r(t.maxHeight) ? t.maxHeight : Infinity
                };
                if (this._aspectRatio || e) n = u.minHeight * this.aspectRatio, s = u.minWidth / this.aspectRatio, i = u.maxHeight * this.aspectRatio, o = u.maxWidth / this.aspectRatio, n > u.minWidth && (u.minWidth = n), s > u.minHeight && (u.minHeight = s), i < u.maxWidth && (u.maxWidth = i), o < u.maxHeight && (u.maxHeight = o);
                this._vBoundaries = u
            },
            _updateCache: function (e) {
                var t = this.options;
                this.offset = this.helper.offset(), r(e.left) && (this.position.left = e.left), r(e.top) && (this.position.top = e.top), r(e.height) && (this.size.height = e.height), r(e.width) && (this.size.width = e.width)
            },
            _updateRatio: function (e, t) {
                var n = this.options,
                    i = this.position,
                    s = this.size,
                    o = this.axis;
                return r(e.height) ? e.width = e.height * this.aspectRatio : r(e.width) && (e.height = e.width / this.aspectRatio), o == "sw" && (e.left = i.left + (s.width - e.width), e.top = null), o == "nw" && (e.top = i.top + (s.height - e.height), e.left = i.left + (s.width - e.width)), e
            },
            _respectSize: function (e, t) {
                var n = this.helper,
                    i = this._vBoundaries,
                    s = this._aspectRatio || t.shiftKey,
                    o = this.axis,
                    u = r(e.width) && i.maxWidth && i.maxWidth < e.width,
                    a = r(e.height) && i.maxHeight && i.maxHeight < e.height,
                    f = r(e.width) && i.minWidth && i.minWidth > e.width,
                    l = r(e.height) && i.minHeight && i.minHeight > e.height;
                f && (e.width = i.minWidth), l && (e.height = i.minHeight), u && (e.width = i.maxWidth), a && (e.height = i.maxHeight);
                var c = this.originalPosition.left + this.originalSize.width,
                    h = this.position.top + this.size.height,
                    p = /sw|nw|w/.test(o),
                    d = /nw|ne|n/.test(o);
                f && p && (e.left = c - i.minWidth), u && p && (e.left = c - i.maxWidth), l && d && (e.top = h - i.minHeight), a && d && (e.top = h - i.maxHeight);
                var v = !e.width && !e.height;
                return v && !e.left && e.top ? e.top = null : v && !e.top && e.left && (e.left = null), e
            },
            _proportionallyResize: function () {
                var t = this.options;
                if (!this._proportionallyResizeElements.length) return;
                var n = this.helper || this.element;
                for (var r = 0; r < this._proportionallyResizeElements.length; r++) {
                    var i = this._proportionallyResizeElements[r];
                    if (!this.borderDif) {
                        var s = [i.css("borderTopWidth"), i.css("borderRightWidth"), i.css("borderBottomWidth"), i.css("borderLeftWidth")],
                            o = [i.css("paddingTop"), i.css("paddingRight"), i.css("paddingBottom"), i.css("paddingLeft")];
                        this.borderDif = e.map(s, function (e, t) {
                            var n = parseInt(e, 10) || 0,
                                r = parseInt(o[t], 10) || 0;
                            return n + r
                        })
                    }
                    if (!(!e.browser.msie || !e(n).is(":hidden") && !e(n).parents(":hidden").length)) continue;
                    i.css({
                        height: n.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: n.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            },
            _renderProxy: function () {
                var t = this.element,
                    n = this.options;
                this.elementOffset = t.offset();
                if (this._helper) {
                    this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                    var r = e.browser.msie && e.browser.version < 7,
                        i = r ? 1 : 0,
                        s = r ? 2 : -1;
                    this.helper.addClass(this._helper).css({
                        width: this.element.outerWidth() + s,
                        height: this.element.outerHeight() + s,
                        position: "absolute",
                        left: this.elementOffset.left - i + "px",
                        top: this.elementOffset.top - i + "px",
                        zIndex: ++n.zIndex
                    }), this.helper.appendTo("body").disableSelection()
                } else this.helper = this.element
            },
            _change: {
                e: function (e, t, n) {
                    return {
                        width: this.originalSize.width + t
                    }
                },
                w: function (e, t, n) {
                    var r = this.options,
                        i = this.originalSize,
                        s = this.originalPosition;
                    return {
                        left: s.left + t,
                        width: i.width - t
                    }
                },
                n: function (e, t, n) {
                    var r = this.options,
                        i = this.originalSize,
                        s = this.originalPosition;
                    return {
                        top: s.top + n,
                        height: i.height - n
                    }
                },
                s: function (e, t, n) {
                    return {
                        height: this.originalSize.height + n
                    }
                },
                se: function (t, n, r) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
                },
                sw: function (t, n, r) {
                    return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
                },
                ne: function (t, n, r) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, n, r]))
                },
                nw: function (t, n, r) {
                    return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, n, r]))
                }
            },
            _propagate: function (t, n) {
                e.ui.plugin.call(this, t, [n, this.ui()]), t != "resize" && this._trigger(t, n, this.ui())
            },
            plugins: {},
            ui: function () {
                return {
                    originalElement: this.originalElement,
                    element: this.element,
                    helper: this.helper,
                    position: this.position,
                    size: this.size,
                    originalSize: this.originalSize,
                    originalPosition: this.originalPosition
                }
            }
        }), e.extend(e.ui.resizable, {
            version: "1.8.23"
        }), e.ui.plugin.add("resizable", "alsoResize", {
            start: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = function (t) {
                        e(t).each(function () {
                            var t = e(this);
                            t.data("resizable-alsoresize", {
                                width: parseInt(t.width(), 10),
                                height: parseInt(t.height(), 10),
                                left: parseInt(t.css("left"), 10),
                                top: parseInt(t.css("top"), 10)
                            })
                        })
                    };
                typeof i.alsoResize == "object" && !i.alsoResize.parentNode ? i.alsoResize.length ? (i.alsoResize = i.alsoResize[0], s(i.alsoResize)) : e.each(i.alsoResize, function (e) {
                    s(e)
                }) : s(i.alsoResize)
            },
            resize: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.originalSize,
                    o = r.originalPosition,
                    u = {
                        height: r.size.height - s.height || 0,
                        width: r.size.width - s.width || 0,
                        top: r.position.top - o.top || 0,
                        left: r.position.left - o.left || 0
                    }, a = function (t, r) {
                        e(t).each(function () {
                            var t = e(this),
                                i = e(this).data("resizable-alsoresize"),
                                s = {}, o = r && r.length ? r : t.parents(n.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                            e.each(o, function (e, t) {
                                var n = (i[t] || 0) + (u[t] || 0);
                                n && n >= 0 && (s[t] = n || null)
                            }), t.css(s)
                        })
                    };
                typeof i.alsoResize == "object" && !i.alsoResize.nodeType ? e.each(i.alsoResize, function (e, t) {
                    a(e, t)
                }) : a(i.alsoResize)
            },
            stop: function (t, n) {
                e(this).removeData("resizable-alsoresize")
            }
        }), e.ui.plugin.add("resizable", "animate", {
            stop: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r._proportionallyResizeElements,
                    o = s.length && /textarea/i.test(s[0].nodeName),
                    u = o && e.ui.hasScroll(s[0], "left") ? 0 : r.sizeDiff.height,
                    a = o ? 0 : r.sizeDiff.width,
                    f = {
                        width: r.size.width - a,
                        height: r.size.height - u
                    }, l = parseInt(r.element.css("left"), 10) + (r.position.left - r.originalPosition.left) || null,
                    c = parseInt(r.element.css("top"), 10) + (r.position.top - r.originalPosition.top) || null;
                r.element.animate(e.extend(f, c && l ? {
                    top: c,
                    left: l
                } : {}), {
                    duration: i.animateDuration,
                    easing: i.animateEasing,
                    step: function () {
                        var n = {
                            width: parseInt(r.element.css("width"), 10),
                            height: parseInt(r.element.css("height"), 10),
                            top: parseInt(r.element.css("top"), 10),
                            left: parseInt(r.element.css("left"), 10)
                        };
                        s && s.length && e(s[0]).css({
                            width: n.width,
                            height: n.height
                        }), r._updateCache(n), r._propagate("resize", t)
                    }
                })
            }
        }), e.ui.plugin.add("resizable", "containment", {
            start: function (t, r) {
                var i = e(this).data("resizable"),
                    s = i.options,
                    o = i.element,
                    u = s.containment,
                    a = u instanceof e ? u.get(0) : /parent/.test(u) ? o.parent().get(0) : u;
                if (!a) return;
                i.containerElement = e(a);
                if (/document/.test(u) || u == document) i.containerOffset = {
                    left: 0,
                    top: 0
                }, i.containerPosition = {
                    left: 0,
                    top: 0
                }, i.parentData = {
                    element: e(document),
                    left: 0,
                    top: 0,
                    width: e(document).width(),
                    height: e(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var f = e(a),
                        l = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function (e, t) {
                        l[e] = n(f.css("padding" + t))
                    }), i.containerOffset = f.offset(), i.containerPosition = f.position(), i.containerSize = {
                        height: f.innerHeight() - l[3],
                        width: f.innerWidth() - l[1]
                    };
                    var c = i.containerOffset,
                        h = i.containerSize.height,
                        p = i.containerSize.width,
                        d = e.ui.hasScroll(a, "left") ? a.scrollWidth : p,
                        v = e.ui.hasScroll(a) ? a.scrollHeight : h;
                    i.parentData = {
                        element: a,
                        left: c.left,
                        top: c.top,
                        width: d,
                        height: v
                    }
                }
            },
            resize: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.containerSize,
                    o = r.containerOffset,
                    u = r.size,
                    a = r.position,
                    f = r._aspectRatio || t.shiftKey,
                    l = {
                        top: 0,
                        left: 0
                    }, c = r.containerElement;
                c[0] != document && /static/.test(c.css("position")) && (l = o), a.left < (r._helper ? o.left : 0) && (r.size.width = r.size.width + (r._helper ? r.position.left - o.left : r.position.left - l.left), f && (r.size.height = r.size.width / r.aspectRatio), r.position.left = i.helper ? o.left : 0), a.top < (r._helper ? o.top : 0) && (r.size.height = r.size.height + (r._helper ? r.position.top - o.top : r.position.top), f && (r.size.width = r.size.height * r.aspectRatio), r.position.top = r._helper ? o.top : 0), r.offset.left = r.parentData.left + r.position.left, r.offset.top = r.parentData.top + r.position.top;
                var h = Math.abs((r._helper ? r.offset.left - l.left : r.offset.left - l.left) + r.sizeDiff.width),
                    p = Math.abs((r._helper ? r.offset.top - l.top : r.offset.top - o.top) + r.sizeDiff.height),
                    d = r.containerElement.get(0) == r.element.parent().get(0),
                    v = /relative|absolute/.test(r.containerElement.css("position"));
                d && v && (h -= r.parentData.left), h + r.size.width >= r.parentData.width && (r.size.width = r.parentData.width - h, f && (r.size.height = r.size.width / r.aspectRatio)), p + r.size.height >= r.parentData.height && (r.size.height = r.parentData.height - p, f && (r.size.width = r.size.height * r.aspectRatio))
            },
            stop: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.position,
                    o = r.containerOffset,
                    u = r.containerPosition,
                    a = r.containerElement,
                    f = e(r.helper),
                    l = f.offset(),
                    c = f.outerWidth() - r.sizeDiff.width,
                    h = f.outerHeight() - r.sizeDiff.height;
                r._helper && !i.animate && /relative/.test(a.css("position")) && e(this).css({
                    left: l.left - u.left - o.left,
                    width: c,
                    height: h
                }), r._helper && !i.animate && /static/.test(a.css("position")) && e(this).css({
                    left: l.left - u.left - o.left,
                    width: c,
                    height: h
                })
            }
        }), e.ui.plugin.add("resizable", "ghost", {
            start: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.size;
                r.ghost = r.originalElement.clone(), r.ghost.css({
                    opacity: .25,
                    display: "block",
                    position: "relative",
                    height: s.height,
                    width: s.width,
                    margin: 0,
                    left: 0,
                    top: 0
                }).addClass("ui-resizable-ghost").addClass(typeof i.ghost == "string" ? i.ghost : ""), r.ghost.appendTo(r.helper)
            },
            resize: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options;
                r.ghost && r.ghost.css({
                    position: "relative",
                    height: r.size.height,
                    width: r.size.width
                })
            },
            stop: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options;
                r.ghost && r.helper && r.helper.get(0).removeChild(r.ghost.get(0))
            }
        }), e.ui.plugin.add("resizable", "grid", {
            resize: function (t, n) {
                var r = e(this).data("resizable"),
                    i = r.options,
                    s = r.size,
                    o = r.originalSize,
                    u = r.originalPosition,
                    a = r.axis,
                    f = i._aspectRatio || t.shiftKey;
                i.grid = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid;
                var l = Math.round((s.width - o.width) / (i.grid[0] || 1)) * (i.grid[0] || 1),
                    c = Math.round((s.height - o.height) / (i.grid[1] || 1)) * (i.grid[1] || 1);
                /^(se|s|e)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c) : /^(ne)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c, r.position.top = u.top - c) : /^(sw)$/.test(a) ? (r.size.width = o.width + l, r.size.height = o.height + c, r.position.left = u.left - l) : (r.size.width = o.width + l, r.size.height = o.height + c, r.position.top = u.top - c, r.position.left = u.left - l)
            }
        });
        var n = function (e) {
            return parseInt(e, 10) || 0
        }, r = function (e) {
            return !isNaN(parseInt(e, 10))
        }
    }(jQuery),
    function (e, t) {
        e.widget("ui.selectable", e.ui.mouse, {
            options: {
                appendTo: "body",
                autoRefresh: !0,
                distance: 0,
                filter: "*",
                tolerance: "touch"
            },
            _create: function () {
                var t = this;
                this.element.addClass("ui-selectable"), this.dragged = !1;
                var n;
                this.refresh = function () {
                    n = e(t.options.filter, t.element[0]), n.addClass("ui-selectee"), n.each(function () {
                        var t = e(this),
                            n = t.offset();
                        e.data(this, "selectable-item", {
                            element: this,
                            $element: t,
                            left: n.left,
                            top: n.top,
                            right: n.left + t.outerWidth(),
                            bottom: n.top + t.outerHeight(),
                            startselected: !1,
                            selected: t.hasClass("ui-selected"),
                            selecting: t.hasClass("ui-selecting"),
                            unselecting: t.hasClass("ui-unselecting")
                        })
                    })
                }, this.refresh(), this.selectees = n.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
            },
            destroy: function () {
                return this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"), this._mouseDestroy(), this
            },
            _mouseStart: function (t) {
                var n = this;
                this.opos = [t.pageX, t.pageY];
                if (this.options.disabled) return;
                var r = this.options;
                this.selectees = e(r.filter, this.element[0]), this._trigger("start", t), e(r.appendTo).append(this.helper), this.helper.css({
                    left: t.clientX,
                    top: t.clientY,
                    width: 0,
                    height: 0
                }), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
                    var r = e.data(this, "selectable-item");
                    r.startselected = !0, !t.metaKey && !t.ctrlKey && (r.$element.removeClass("ui-selected"), r.selected = !1, r.$element.addClass("ui-unselecting"), r.unselecting = !0, n._trigger("unselecting", t, {
                        unselecting: r.element
                    }))
                }), e(t.target).parents().andSelf().each(function () {
                    var r = e.data(this, "selectable-item");
                    if (r) {
                        var i = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected");
                        return r.$element.removeClass(i ? "ui-unselecting" : "ui-selected").addClass(i ? "ui-selecting" : "ui-unselecting"), r.unselecting = !i, r.selecting = i, r.selected = i, i ? n._trigger("selecting", t, {
                            selecting: r.element
                        }) : n._trigger("unselecting", t, {
                            unselecting: r.element
                        }), !1
                    }
                })
            },
            _mouseDrag: function (t) {
                var n = this;
                this.dragged = !0;
                if (this.options.disabled) return;
                var r = this.options,
                    i = this.opos[0],
                    s = this.opos[1],
                    o = t.pageX,
                    u = t.pageY;
                if (i > o) {
                    var a = o;
                    o = i, i = a
                }
                if (s > u) {
                    var a = u;
                    u = s, s = a
                }
                return this.helper.css({
                    left: i,
                    top: s,
                    width: o - i,
                    height: u - s
                }), this.selectees.each(function () {
                    var a = e.data(this, "selectable-item");
                    if (!a || a.element == n.element[0]) return;
                    var f = !1;
                    r.tolerance == "touch" ? f = !(a.left > o || a.right < i || a.top > u || a.bottom < s) : r.tolerance == "fit" && (f = a.left > i && a.right < o && a.top > s && a.bottom < u), f ? (a.selected && (a.$element.removeClass("ui-selected"), a.selected = !1), a.unselecting && (a.$element.removeClass("ui-unselecting"), a.unselecting = !1), a.selecting || (a.$element.addClass("ui-selecting"), a.selecting = !0, n._trigger("selecting", t, {
                        selecting: a.element
                    }))) : (a.selecting && ((t.metaKey || t.ctrlKey) && a.startselected ? (a.$element.removeClass("ui-selecting"), a.selecting = !1, a.$element.addClass("ui-selected"), a.selected = !0) : (a.$element.removeClass("ui-selecting"), a.selecting = !1, a.startselected && (a.$element.addClass("ui-unselecting"), a.unselecting = !0), n._trigger("unselecting", t, {
                        unselecting: a.element
                    }))), a.selected && !t.metaKey && !t.ctrlKey && !a.startselected && (a.$element.removeClass("ui-selected"), a.selected = !1, a.$element.addClass("ui-unselecting"), a.unselecting = !0, n._trigger("unselecting", t, {
                        unselecting: a.element
                    })))
                }), !1
            },
            _mouseStop: function (t) {
                var n = this;
                this.dragged = !1;
                var r = this.options;
                return e(".ui-unselecting", this.element[0]).each(function () {
                    var r = e.data(this, "selectable-item");
                    r.$element.removeClass("ui-unselecting"), r.unselecting = !1, r.startselected = !1, n._trigger("unselected", t, {
                        unselected: r.element
                    })
                }), e(".ui-selecting", this.element[0]).each(function () {
                    var r = e.data(this, "selectable-item");
                    r.$element.removeClass("ui-selecting").addClass("ui-selected"), r.selecting = !1, r.selected = !0, r.startselected = !0, n._trigger("selected", t, {
                        selected: r.element
                    })
                }), this._trigger("stop", t), this.helper.remove(), !1
            }
        }), e.extend(e.ui.selectable, {
            version: "1.8.23"
        })
    }(jQuery),
    function (e, t) {
        e.widget("ui.sortable", e.ui.mouse, {
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3
            },
            _create: function () {
                var e = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? e.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
            },
            destroy: function () {
                e.Widget.prototype.destroy.call(this), this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function (t, n) {
                t === "disabled" ? (this.options[t] = n, this.widget()[n ? "addClass" : "removeClass"]("ui-sortable-disabled")) : e.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function (t, n) {
                var r = this;
                if (this.reverting) return !1;
                if (this.options.disabled || this.options.type == "static") return !1;
                this._refreshItems(t);
                var i = null,
                    s = this,
                    o = e(t.target).parents().each(function () {
                        if (e.data(this, r.widgetName + "-item") == s) return i = e(this), !1
                    });
                e.data(t.target, r.widgetName + "-item") == s && (i = e(t.target));
                if (!i) return !1;
                if (this.options.handle && !n) {
                    var u = !1;
                    e(this.options.handle, i).find("*").andSelf().each(function () {
                        this == t.target && (u = !0)
                    });
                    if (!u) return !1
                }
                return this.currentItem = i, this._removeCurrentsFromItems(), !0
            },
            _mouseStart: function (t, n, r) {
                var i = this.options,
                    s = this;
                this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, e.extend(this.offset, {
                    click: {
                        left: t.pageX - this.offset.left,
                        top: t.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this.domPosition = {
                    prev: this.currentItem.prev()[0],
                    parent: this.currentItem.parent()[0]
                }, this.helper[0] != this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), i.containment && this._setContainment(), i.cursor && (e("body").css("cursor") && (this._storedCursor = e("body").css("cursor")), e("body").css("cursor", i.cursor)), i.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", i.opacity)), i.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", i.zIndex)), this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
                if (!r)
                    for (var o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", t, s._uiHash(this));
                return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !i.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
            },
            _mouseDrag: function (t) {
                this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
                if (this.options.scroll) {
                    var n = this.options,
                        r = !1;
                    this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < n.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + n.scrollSpeed : t.pageY - this.overflowOffset.top < n.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - n.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < n.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + n.scrollSpeed : t.pageX - this.overflowOffset.left < n.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - n.scrollSpeed)) : (t.pageY - e(document).scrollTop() < n.scrollSensitivity ? r = e(document).scrollTop(e(document).scrollTop() - n.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < n.scrollSensitivity && (r = e(document).scrollTop(e(document).scrollTop() + n.scrollSpeed)), t.pageX - e(document).scrollLeft() < n.scrollSensitivity ? r = e(document).scrollLeft(e(document).scrollLeft() - n.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < n.scrollSensitivity && (r = e(document).scrollLeft(e(document).scrollLeft() + n.scrollSpeed))), r !== !1 && e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)
                }
                this.positionAbs = this._convertPositionTo("absolute");
                if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
                if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
                for (var i = this.items.length - 1; i >= 0; i--) {
                    var s = this.items[i],
                        o = s.item[0],
                        u = this._intersectsWithPointer(s);
                    if (!u) continue;
                    if (o != this.currentItem[0] && this.placeholder[u == 1 ? "next" : "prev"]()[0] != o && !e.ui.contains(this.placeholder[0], o) && (this.options.type == "semi-dynamic" ? !e.ui.contains(this.element[0], o) : !0)) {
                        this.direction = u == 1 ? "down" : "up";
                        if (this.options.tolerance != "pointer" && !this._intersectsWithSides(s)) break;
                        this._rearrange(t, s), this._trigger("change", t, this._uiHash());
                        break
                    }
                }
                return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function (t, n) {
                if (!t) return;
                e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
                if (this.options.revert) {
                    var r = this,
                        i = r.placeholder.offset();
                    r.reverting = !0, e(this.helper).animate({
                        left: i.left - this.offset.parent.left - r.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: i.top - this.offset.parent.top - r.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        r._clear(t)
                    })
                } else this._clear(t, n);
                return !1
            },
            cancel: function () {
                var t = this;
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var n = this.containers.length - 1; n >= 0; n--) this.containers[n]._trigger("deactivate", null, t._uiHash(this)), this.containers[n].containerCache.over && (this.containers[n]._trigger("out", null, t._uiHash(this)), this.containers[n].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function (t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    r = [];
                return t = t || {}, e(n).each(function () {
                    var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[-=_](.+)/);
                    n && r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
                }), !r.length && t.key && r.push(t.key + "="), r.join("&")
            },
            toArray: function (t) {
                var n = this._getItemsAsjQuery(t && t.connected),
                    r = [];
                return t = t || {}, n.each(function () {
                    r.push(e(t.item || this).attr(t.attribute || "id") || "")
                }), r
            },
            _intersectsWith: function (e) {
                var t = this.positionAbs.left,
                    n = t + this.helperProportions.width,
                    r = this.positionAbs.top,
                    i = r + this.helperProportions.height,
                    s = e.left,
                    o = s + e.width,
                    u = e.top,
                    a = u + e.height,
                    f = this.offset.click.top,
                    l = this.offset.click.left,
                    c = r + f > u && r + f < a && t + l > s && t + l < o;
                return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? c : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
            },
            _intersectsWithPointer: function (t) {
                var n = this.options.axis === "x" || e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    r = this.options.axis === "y" || e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    i = n && r,
                    s = this._getDragVerticalDirection(),
                    o = this._getDragHorizontalDirection();
                return i ? this.floating ? o && o == "right" || s == "down" ? 2 : 1 : s && (s == "down" ? 2 : 1) : !1
            },
            _intersectsWithSides: function (t) {
                var n = e.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    r = e.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    i = this._getDragVerticalDirection(),
                    s = this._getDragHorizontalDirection();
                return this.floating && s ? s == "right" && r || s == "left" && !r : i && (i == "down" && n || i == "up" && !n)
            },
            _getDragVerticalDirection: function () {
                var e = this.positionAbs.top - this.lastPositionAbs.top;
                return e != 0 && (e > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function () {
                var e = this.positionAbs.left - this.lastPositionAbs.left;
                return e != 0 && (e > 0 ? "right" : "left")
            },
            refresh: function (e) {
                return this._refreshItems(e), this.refreshPositions(), this
            },
            _connectWith: function () {
                var e = this.options;
                return e.connectWith.constructor == String ? [e.connectWith] : e.connectWith
            },
            _getItemsAsjQuery: function (t) {
                var n = this,
                    r = [],
                    i = [],
                    s = this._connectWith();
                if (s && t)
                    for (var o = s.length - 1; o >= 0; o--) {
                        var u = e(s[o]);
                        for (var a = u.length - 1; a >= 0; a--) {
                            var f = e.data(u[a], this.widgetName);
                            f && f != this && !f.options.disabled && i.push([e.isFunction(f.options.items) ? f.options.items.call(f.element) : e(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f])
                        }
                    }
                i.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                    options: this.options,
                    item: this.currentItem
                }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
                for (var o = i.length - 1; o >= 0; o--) i[o][0].each(function () {
                    r.push(this)
                });
                return e(r)
            },
            _removeCurrentsFromItems: function () {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                for (var t = 0; t < this.items.length; t++)
                    for (var n = 0; n < e.length; n++) e[n] == this.items[t].item[0] && this.items.splice(t, 1)
            },
            _refreshItems: function (t) {
                this.items = [], this.containers = [this];
                var n = this.items,
                    r = this,
                    i = [
                        [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                            item: this.currentItem
                        }) : e(this.options.items, this.element), this]
                    ],
                    s = this._connectWith();
                if (s && this.ready)
                    for (var o = s.length - 1; o >= 0; o--) {
                        var u = e(s[o]);
                        for (var a = u.length - 1; a >= 0; a--) {
                            var f = e.data(u[a], this.widgetName);
                            f && f != this && !f.options.disabled && (i.push([e.isFunction(f.options.items) ? f.options.items.call(f.element[0], t, {
                                item: this.currentItem
                            }) : e(f.options.items, f.element), f]), this.containers.push(f))
                        }
                    }
                for (var o = i.length - 1; o >= 0; o--) {
                    var l = i[o][1],
                        c = i[o][0];
                    for (var a = 0, h = c.length; a < h; a++) {
                        var p = e(c[a]);
                        p.data(this.widgetName + "-item", l), n.push({
                            item: p,
                            instance: l,
                            width: 0,
                            height: 0,
                            left: 0,
                            top: 0
                        })
                    }
                }
            },
            refreshPositions: function (t) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                for (var n = this.items.length - 1; n >= 0; n--) {
                    var r = this.items[n];
                    if (r.instance != this.currentContainer && this.currentContainer && r.item[0] != this.currentItem[0]) continue;
                    var i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item;
                    t || (r.width = i.outerWidth(), r.height = i.outerHeight());
                    var s = i.offset();
                    r.left = s.left, r.top = s.top
                }
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (var n = this.containers.length - 1; n >= 0; n--) {
                        var s = this.containers[n].element.offset();
                        this.containers[n].containerCache.left = s.left, this.containers[n].containerCache.top = s.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight()
                    }
                return this
            },
            _createPlaceholder: function (t) {
                var n = t || this,
                    r = n.options;
                if (!r.placeholder || r.placeholder.constructor == String) {
                    var i = r.placeholder;
                    r.placeholder = {
                        element: function () {
                            var t = e(document.createElement(n.currentItem[0].nodeName)).addClass(i || n.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                            return i || (t.style.visibility = "hidden"), t
                        },
                        update: function (e, t) {
                            if (i && !r.forcePlaceholderSize) return;
                            t.height() || t.height(n.currentItem.innerHeight() - parseInt(n.currentItem.css("paddingTop") || 0, 10) - parseInt(n.currentItem.css("paddingBottom") || 0, 10)), t.width() || t.width(n.currentItem.innerWidth() - parseInt(n.currentItem.css("paddingLeft") || 0, 10) - parseInt(n.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
                n.placeholder = e(r.placeholder.element.call(n.element, n.currentItem)), n.currentItem.after(n.placeholder), r.placeholder.update(n, n.placeholder)
            },
            _contactContainers: function (t) {
                var n = null,
                    r = null;
                for (var i = this.containers.length - 1; i >= 0; i--) {
                    if (e.ui.contains(this.currentItem[0], this.containers[i].element[0])) continue;
                    if (this._intersectsWith(this.containers[i].containerCache)) {
                        if (n && e.ui.contains(this.containers[i].element[0], n.element[0])) continue;
                        n = this.containers[i], r = i
                    } else this.containers[i].containerCache.over && (this.containers[i]._trigger("out", t, this._uiHash(this)), this.containers[i].containerCache.over = 0)
                }
                if (!n) return;
                if (this.containers.length === 1) this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1;
                else if (this.currentContainer != this.containers[r]) {
                    var s = 1e4,
                        o = null,
                        u = this.positionAbs[this.containers[r].floating ? "left" : "top"];
                    for (var a = this.items.length - 1; a >= 0; a--) {
                        if (!e.ui.contains(this.containers[r].element[0], this.items[a].item[0])) continue;
                        var f = this.containers[r].floating ? this.items[a].item.offset().left : this.items[a].item.offset().top;
                        Math.abs(f - u) < s && (s = Math.abs(f - u), o = this.items[a], this.direction = f - u > 0 ? "down" : "up")
                    }
                    if (!o && !this.options.dropOnEmpty) return;
                    this.currentContainer = this.containers[r], o ? this._rearrange(t, o, null, !0) : this._rearrange(t, null, this.containers[r].element, !0), this._trigger("change", t, this._uiHash()), this.containers[r]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[r]._trigger("over", t, this._uiHash(this)), this.containers[r].containerCache.over = 1
                }
            },
            _createHelper: function (t) {
                var n = this.options,
                    r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper == "clone" ? this.currentItem.clone() : this.currentItem;
                return r.parents("body").length || e(n.appendTo != "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0]), r[0] == this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (r[0].style.width == "" || n.forceHelperSize) && r.width(this.currentItem.width()), (r[0].style.height == "" || n.forceHelperSize) && r.height(this.currentItem.height()), r
            },
            _adjustOffsetFromHelper: function (t) {
                typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                    left: +t[0],
                    top: +t[1] || 0
                }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
            },
            _getParentOffset: function () {
                this.offsetParent = this.helper.offsetParent();
                var t = this.offsetParent.offset();
                this.cssPosition == "absolute" && this.scrollParent[0] != document && e.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
                if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && e.browser.msie) t = {
                    top: 0,
                    left: 0
                };
                return {
                    top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function () {
                if (this.cssPosition == "relative") {
                    var e = this.currentItem.position();
                    return {
                        top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function () {
                var t = this.options;
                t.containment == "parent" && (t.containment = this.helper[0].parentNode);
                if (t.containment == "document" || t.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(t.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(t.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                if (!/^(document|window|parent)$/.test(t.containment)) {
                    var n = e(t.containment)[0],
                        r = e(t.containment).offset(),
                        i = e(n).css("overflow") != "hidden";
                    this.containment = [r.left + (parseInt(e(n).css("borderLeftWidth"), 10) || 0) + (parseInt(e(n).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(e(n).css("borderTopWidth"), 10) || 0) + (parseInt(e(n).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (i ? Math.max(n.scrollWidth, n.offsetWidth) : n.offsetWidth) - (parseInt(e(n).css("borderLeftWidth"), 10) || 0) - (parseInt(e(n).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (i ? Math.max(n.scrollHeight, n.offsetHeight) : n.offsetHeight) - (parseInt(e(n).css("borderTopWidth"), 10) || 0) - (parseInt(e(n).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
                }
            },
            _convertPositionTo: function (t, n) {
                n || (n = this.position);
                var r = t == "absolute" ? 1 : -1,
                    i = this.options,
                    s = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    o = /(html|body)/i.test(s[0].tagName);
                return {
                    top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : o ? 0 : s.scrollTop()) * r),
                    left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (e.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : o ? 0 : s.scrollLeft()) * r)
                }
            },
            _generatePosition: function (t) {
                var n = this.options,
                    r = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! e.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    i = /(html|body)/i.test(r[0].tagName);
                this.cssPosition == "relative" && (this.scrollParent[0] == document || this.scrollParent[0] == this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
                var s = t.pageX,
                    o = t.pageY;
                if (this.originalPosition) {
                    this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top));
                    if (n.grid) {
                        var u = this.originalPageY + Math.round((o - this.originalPageY) / n.grid[1]) * n.grid[1];
                        o = this.containment ? u - this.offset.click.top < this.containment[1] || u - this.offset.click.top > this.containment[3] ? u - this.offset.click.top < this.containment[1] ? u + n.grid[1] : u - n.grid[1] : u : u;
                        var a = this.originalPageX + Math.round((s - this.originalPageX) / n.grid[0]) * n.grid[0];
                        s = this.containment ? a - this.offset.click.left < this.containment[0] || a - this.offset.click.left > this.containment[2] ? a - this.offset.click.left < this.containment[0] ? a + n.grid[0] : a - n.grid[0] : a : a
                    }
                }
                return {
                    top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : i ? 0 : r.scrollTop()),
                    left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (e.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : r.scrollLeft())
                }
            },
            _rearrange: function (e, t, n, r) {
                n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var i = this,
                    s = this.counter;
                window.setTimeout(function () {
                    s == i.counter && i.refreshPositions(!r)
                }, 0)
            },
            _clear: function (t, n) {
                this.reverting = !1;
                var r = [],
                    i = this;
                !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
                if (this.helper[0] == this.currentItem[0]) {
                    for (var s in this._storedCSS)
                        if (this._storedCSS[s] == "auto" || this._storedCSS[s] == "static") this._storedCSS[s] = "";
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                this.fromOutside && !n && r.push(function (e) {
                    this._trigger("receive", e, this._uiHash(this.fromOutside))
                }), (this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !n && r.push(function (e) {
                    this._trigger("update", e, this._uiHash())
                });
                if (!e.ui.contains(this.element[0], this.currentItem[0])) {
                    n || r.push(function (e) {
                        this._trigger("remove", e, this._uiHash())
                    });
                    for (var s = this.containers.length - 1; s >= 0; s--) e.ui.contains(this.containers[s].element[0], this.currentItem[0]) && !n && (r.push(function (e) {
                        return function (t) {
                            e._trigger("receive", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[s])), r.push(function (e) {
                        return function (t) {
                            e._trigger("update", t, this._uiHash(this))
                        }
                    }.call(this, this.containers[s])))
                }
                for (var s = this.containers.length - 1; s >= 0; s--) n || r.push(function (e) {
                    return function (t) {
                        e._trigger("deactivate", t, this._uiHash(this))
                    }
                }.call(this, this.containers[s])), this.containers[s].containerCache.over && (r.push(function (e) {
                    return function (t) {
                        e._trigger("out", t, this._uiHash(this))
                    }
                }.call(this, this.containers[s])), this.containers[s].containerCache.over = 0);
                this._storedCursor && e("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex), this.dragging = !1;
                if (this.cancelHelperRemoval) {
                    if (!n) {
                        this._trigger("beforeStop", t, this._uiHash());
                        for (var s = 0; s < r.length; s++) r[s].call(this, t);
                        this._trigger("stop", t, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                n || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] != this.currentItem[0] && this.helper.remove(), this.helper = null;
                if (!n) {
                    for (var s = 0; s < r.length; s++) r[s].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function () {
                e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function (t) {
                var n = t || this;
                return {
                    helper: n.helper,
                    placeholder: n.placeholder || e([]),
                    position: n.position,
                    originalPosition: n.originalPosition,
                    offset: n.positionAbs,
                    item: n.currentItem,
                    sender: t ? t.element : null
                }
            }
        }), e.extend(e.ui.sortable, {
            version: "1.8.23"
        })
    }(jQuery), jQuery.effects || function (e, t) {
    function n(t) {
        var n;
        return t && t.constructor == Array && t.length == 3 ? t : (n = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(t)) ? [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10)] : (n = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(t)) ? [parseFloat(n[1]) * 2.55, parseFloat(n[2]) * 2.55, parseFloat(n[3]) * 2.55] : (n = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(t)) ? [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)] : (n = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(t)) ? [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)] : (n = /rgba\(0, 0, 0, 0\)/.exec(t)) ? i.transparent : i[e.trim(t).toLowerCase()]
    }

    function r(t, r) {
        var i;
        do {
            i = (e.curCSS || e.css)(t, r);
            if (i != "" && i != "transparent" || e.nodeName(t, "body")) break;
            r = "backgroundColor"
        } while (t = t.parentNode);
        return n(i)
    }

    function u() {
        var e = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            t = {}, n, r;
        if (e && e.length && e[0] && e[e[0]]) {
            var i = e.length;
            while (i--) n = e[i], typeof e[n] == "string" && (r = n.replace(/\-(\w)/g, function (e, t) {
                return t.toUpperCase()
            }), t[r] = e[n])
        } else
            for (n in e) typeof e[n] == "string" && (t[n] = e[n]);
        return t
    }

    function a(t) {
        var n, r;
        for (n in t) r = t[n], (r == null || e.isFunction(r) || n in o || /scrollbar/.test(n) || !/color/i.test(n) && isNaN(parseFloat(r))) && delete t[n];
        return t
    }

    function f(e, t) {
        var n = {
            _: 0
        }, r;
        for (r in t) e[r] != t[r] && (n[r] = t[r]);
        return n
    }

    function l(t, n, r, i) {
        typeof t == "object" && (i = n, r = null, n = t, t = n.effect), e.isFunction(n) && (i = n, r = null, n = {});
        if (typeof n == "number" || e.fx.speeds[n]) i = r, r = n, n = {};
        return e.isFunction(r) && (i = r, r = null), n = n || {}, r = r || n.duration, r = e.fx.off ? 0 : typeof r == "number" ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default, i = i || n.complete, [t, n, r, i]
    }

    function c(t) {
        return !t || typeof t == "number" || e.fx.speeds[t] ? !0 : typeof t == "string" && !e.effects[t] ? !0 : !1
    }
    e.effects = {}, e.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (t, i) {
        e.fx.step[i] = function (e) {
            e.colorInit || (e.start = r(e.elem, i), e.end = n(e.end), e.colorInit = !0), e.elem.style[i] = "rgb(" + Math.max(Math.min(parseInt(e.pos * (e.end[0] - e.start[0]) + e.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[1] - e.start[1]) + e.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(e.pos * (e.end[2] - e.start[2]) + e.start[2], 10), 255), 0) + ")"
        }
    });
    var i = {
            aqua: [0, 255, 255],
            azure: [240, 255, 255],
            beige: [245, 245, 220],
            black: [0, 0, 0],
            blue: [0, 0, 255],
            brown: [165, 42, 42],
            cyan: [0, 255, 255],
            darkblue: [0, 0, 139],
            darkcyan: [0, 139, 139],
            darkgrey: [169, 169, 169],
            darkgreen: [0, 100, 0],
            darkkhaki: [189, 183, 107],
            darkmagenta: [139, 0, 139],
            darkolivegreen: [85, 107, 47],
            darkorange: [255, 140, 0],
            darkorchid: [153, 50, 204],
            darkred: [139, 0, 0],
            darksalmon: [233, 150, 122],
            darkviolet: [148, 0, 211],
            fuchsia: [255, 0, 255],
            gold: [255, 215, 0],
            green: [0, 128, 0],
            indigo: [75, 0, 130],
            khaki: [240, 230, 140],
            lightblue: [173, 216, 230],
            lightcyan: [224, 255, 255],
            lightgreen: [144, 238, 144],
            lightgrey: [211, 211, 211],
            lightpink: [255, 182, 193],
            lightyellow: [255, 255, 224],
            lime: [0, 255, 0],
            magenta: [255, 0, 255],
            maroon: [128, 0, 0],
            navy: [0, 0, 128],
            olive: [128, 128, 0],
            orange: [255, 165, 0],
            pink: [255, 192, 203],
            purple: [128, 0, 128],
            violet: [128, 0, 128],
            red: [255, 0, 0],
            silver: [192, 192, 192],
            white: [255, 255, 255],
            yellow: [255, 255, 0],
            transparent: [255, 255, 255]
        }, s = ["add", "remove", "toggle"],
        o = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };
    e.effects.animateClass = function (t, n, r, i) {
        return e.isFunction(r) && (i = r, r = null), this.queue(function () {
            var o = e(this),
                l = o.attr("style") || " ",
                c = a(u.call(this)),
                h, p = o.attr("class") || "";
            e.each(s, function (e, n) {
                t[n] && o[n + "Class"](t[n])
            }), h = a(u.call(this)), o.attr("class", p), o.animate(f(c, h), {
                queue: !1,
                duration: n,
                easing: r,
                complete: function () {
                    e.each(s, function (e, n) {
                        t[n] && o[n + "Class"](t[n])
                    }), typeof o.attr("style") == "object" ? (o.attr("style").cssText = "", o.attr("style").cssText = l) : o.attr("style", l), i && i.apply(this, arguments), e.dequeue(this)
                }
            })
        })
    }, e.fn.extend({
        _addClass: e.fn.addClass,
        addClass: function (t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                add: t
            },
                n, r, i
            ]) : this._addClass(t)
        },
        _removeClass: e.fn.removeClass,
        removeClass: function (t, n, r, i) {
            return n ? e.effects.animateClass.apply(this, [{
                remove: t
            },
                n, r, i
            ]) : this._removeClass(t)
        },
        _toggleClass: e.fn.toggleClass,
        toggleClass: function (n, r, i, s, o) {
            return typeof r == "boolean" || r === t ? i ? e.effects.animateClass.apply(this, [r ? {
                add: n
            } : {
                remove: n
            },
                i, s, o
            ]) : this._toggleClass(n, r) : e.effects.animateClass.apply(this, [{
                toggle: n
            },
                r, i, s
            ])
        },
        switchClass: function (t, n, r, i, s) {
            return e.effects.animateClass.apply(this, [{
                add: n,
                remove: t
            },
                r, i, s
            ])
        }
    }), e.extend(e.effects, {
        version: "1.8.23",
        save: function (e, t) {
            for (var n = 0; n < t.length; n++) t[n] !== null && e.data("ec.storage." + t[n], e[0].style[t[n]])
        },
        restore: function (e, t) {
            for (var n = 0; n < t.length; n++) t[n] !== null && e.css(t[n], e.data("ec.storage." + t[n]))
        },
        setMode: function (e, t) {
            return t == "toggle" && (t = e.is(":hidden") ? "show" : "hide"), t
        },
        getBaseline: function (e, t) {
            var n, r;
            switch (e[0]) {
                case "top":
                    n = 0;
                    break;
                case "middle":
                    n = .5;
                    break;
                case "bottom":
                    n = 1;
                    break;
                default:
                    n = e[0] / t.height
            }
            switch (e[1]) {
                case "left":
                    r = 0;
                    break;
                case "center":
                    r = .5;
                    break;
                case "right":
                    r = 1;
                    break;
                default:
                    r = e[1] / t.width
            }
            return {
                x: r,
                y: n
            }
        },
        createWrapper: function (t) {
            if (t.parent().is(".ui-effects-wrapper")) return t.parent();
            var n = {
                    width: t.outerWidth(!0),
                    height: t.outerHeight(!0),
                    "float": t.css("float")
                }, r = e("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                i = document.activeElement;
            try {
                i.id
            } catch (s) {
                i = document.body
            }
            return t.wrap(r), (t[0] === i || e.contains(t[0], i)) && e(i).focus(), r = t.parent(), t.css("position") == "static" ? (r.css({
                position: "relative"
            }), t.css({
                position: "relative"
            })) : (e.extend(n, {
                position: t.css("position"),
                zIndex: t.css("z-index")
            }), e.each(["top", "left", "bottom", "right"], function (e, r) {
                n[r] = t.css(r), isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
            }), t.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto"
            })), r.css(n).show()
        },
        removeWrapper: function (t) {
            var n, r = document.activeElement;
            return t.parent().is(".ui-effects-wrapper") ? (n = t.parent().replaceWith(t), (t[0] === r || e.contains(t[0], r)) && e(r).focus(), n) : t
        },
        setTransition: function (t, n, r, i) {
            return i = i || {}, e.each(n, function (e, n) {
                var s = t.cssUnit(n);
                s[0] > 0 && (i[n] = s[0] * r + s[1])
            }), i
        }
    }), e.fn.extend({
        effect: function (t, n, r, i) {
            var s = l.apply(this, arguments),
                o = {
                    options: s[1],
                    duration: s[2],
                    callback: s[3]
                }, u = o.options.mode,
                a = e.effects[t];
            return e.fx.off || !a ? u ? this[u](o.duration, o.callback) : this.each(function () {
                o.callback && o.callback.call(this)
            }) : a.call(this, o)
        },
        _show: e.fn.show,
        show: function (e) {
            if (c(e)) return this._show.apply(this, arguments);
            var t = l.apply(this, arguments);
            return t[1].mode = "show", this.effect.apply(this, t)
        },
        _hide: e.fn.hide,
        hide: function (e) {
            if (c(e)) return this._hide.apply(this, arguments);
            var t = l.apply(this, arguments);
            return t[1].mode = "hide", this.effect.apply(this, t)
        },
        __toggle: e.fn.toggle,
        toggle: function (t) {
            if (c(t) || typeof t == "boolean" || e.isFunction(t)) return this.__toggle.apply(this, arguments);
            var n = l.apply(this, arguments);
            return n[1].mode = "toggle", this.effect.apply(this, n)
        },
        cssUnit: function (t) {
            var n = this.css(t),
                r = [];
            return e.each(["em", "px", "%", "pt"], function (e, t) {
                n.indexOf(t) > 0 && (r = [parseFloat(n), t])
            }), r
        }
    });
    var h = {};
    e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
        h[t] = function (t) {
            return Math.pow(t, e + 2)
        }
    }), e.extend(h, {
        Sine: function (e) {
            return 1 - Math.cos(e * Math.PI / 2)
        },
        Circ: function (e) {
            return 1 - Math.sqrt(1 - e * e)
        },
        Elastic: function (e) {
            return e === 0 || e === 1 ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin(((e - 1) * 80 - 7.5) * Math.PI / 15)
        },
        Back: function (e) {
            return e * e * (3 * e - 2)
        },
        Bounce: function (e) {
            var t, n = 4;
            while (e < ((t = Math.pow(2, --n)) - 1) / 11);
            return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((t * 3 - 2) / 22 - e, 2)
        }
    }), e.each(h, function (t, n) {
        e.easing["easeIn" + t] = n, e.easing["easeOut" + t] = function (e) {
            return 1 - n(1 - e)
        }, e.easing["easeInOut" + t] = function (e) {
            return e < .5 ? n(e * 2) / 2 : n(e * -2 + 2) / -2 + 1
        }
    })
}(jQuery),
    function (e, t) {
        e.effects.blind = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right"],
                    i = e.effects.setMode(n, t.options.mode || "hide"),
                    s = t.options.direction || "vertical";
                e.effects.save(n, r), n.show();
                var u = e.effects.createWrapper(n).css({
                        overflow: "hidden"
                    }),
                    a = s == "vertical" ? "height" : "width",
                    f = s == "vertical" ? u.height() : u.width();
                i == "show" && u.css(a, 0);
                var l = {};
                l[a] = i == "show" ? f : 0, u.animate(l, t.duration, t.options.easing, function () {
                    i == "hide" && n.hide(), e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(n[0], arguments), n.dequeue()
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.bounce = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right"],
                    i = e.effects.setMode(n, t.options.mode || "effect"),
                    s = t.options.direction || "up",
                    u = t.options.distance || 20,
                    a = t.options.times || 5,
                    f = t.duration || 250;
                /show|hide/.test(i) && r.push("opacity"), e.effects.save(n, r), n.show(), e.effects.createWrapper(n);
                var l = s == "up" || s == "down" ? "top" : "left",
                    c = s == "up" || s == "left" ? "pos" : "neg",
                    u = t.options.distance || (l == "top" ? n.outerHeight(!0) / 3 : n.outerWidth(!0) / 3);
                i == "show" && n.css("opacity", 0).css(l, c == "pos" ? -u : u), i == "hide" && (u /= a * 2), i != "hide" && a--;
                if (i == "show") {
                    var h = {
                        opacity: 1
                    };
                    h[l] = (c == "pos" ? "+=" : "-=") + u, n.animate(h, f / 2, t.options.easing), u /= 2, a--
                }
                for (var p = 0; p < a; p++) {
                    var d = {}, v = {};
                    d[l] = (c == "pos" ? "-=" : "+=") + u, v[l] = (c == "pos" ? "+=" : "-=") + u, n.animate(d, f / 2, t.options.easing).animate(v, f / 2, t.options.easing), u = i == "hide" ? u * 2 : u / 2
                }
                if (i == "hide") {
                    var h = {
                        opacity: 0
                    };
                    h[l] = (c == "pos" ? "-=" : "+=") + u, n.animate(h, f / 2, t.options.easing, function () {
                        n.hide(), e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments)
                    })
                } else {
                    var d = {}, v = {};
                    d[l] = (c == "pos" ? "-=" : "+=") + u, v[l] = (c == "pos" ? "+=" : "-=") + u, n.animate(d, f / 2, t.options.easing).animate(v, f / 2, t.options.easing, function () {
                        e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments)
                    })
                }
                n.queue("fx", function () {
                    n.dequeue()
                }), n.dequeue()
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.clip = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right", "height", "width"],
                    i = e.effects.setMode(n, t.options.mode || "hide"),
                    s = t.options.direction || "vertical";
                e.effects.save(n, r), n.show();
                var u = e.effects.createWrapper(n).css({
                        overflow: "hidden"
                    }),
                    a = n[0].tagName == "IMG" ? u : n,
                    f = {
                        size: s == "vertical" ? "height" : "width",
                        position: s == "vertical" ? "top" : "left"
                    }, l = s == "vertical" ? a.height() : a.width();
                i == "show" && (a.css(f.size, 0), a.css(f.position, l / 2));
                var c = {};
                c[f.size] = i == "show" ? l : 0, c[f.position] = i == "show" ? 0 : l / 2, a.animate(c, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.options.easing,
                    complete: function () {
                        i == "hide" && n.hide(), e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(n[0], arguments), n.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.drop = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right", "opacity"],
                    i = e.effects.setMode(n, t.options.mode || "hide"),
                    s = t.options.direction || "left";
                e.effects.save(n, r), n.show(), e.effects.createWrapper(n);
                var u = s == "up" || s == "down" ? "top" : "left",
                    a = s == "up" || s == "left" ? "pos" : "neg",
                    f = t.options.distance || (u == "top" ? n.outerHeight(!0) / 2 : n.outerWidth(!0) / 2);
                i == "show" && n.css("opacity", 0).css(u, a == "pos" ? -f : f);
                var l = {
                    opacity: i == "show" ? 1 : 0
                };
                l[u] = (i == "show" ? a == "pos" ? "+=" : "-=" : a == "pos" ? "-=" : "+=") + f, n.animate(l, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.options.easing,
                    complete: function () {
                        i == "hide" && n.hide(), e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments), n.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.explode = function (t) {
            return this.queue(function () {
                var n = t.options.pieces ? Math.round(Math.sqrt(t.options.pieces)) : 3,
                    r = t.options.pieces ? Math.round(Math.sqrt(t.options.pieces)) : 3;
                t.options.mode = t.options.mode == "toggle" ? e(this).is(":visible") ? "hide" : "show" : t.options.mode;
                var i = e(this).show().css("visibility", "hidden"),
                    s = i.offset();
                s.top -= parseInt(i.css("marginTop"), 10) || 0, s.left -= parseInt(i.css("marginLeft"), 10) || 0;
                var u = i.outerWidth(!0),
                    a = i.outerHeight(!0);
                for (var f = 0; f < n; f++)
                    for (var l = 0; l < r; l++) i.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -l * (u / r),
                        top: -f * (a / n)
                    }).parent().addClass("ui-effects-explode").css({
                            position: "absolute",
                            overflow: "hidden",
                            width: u / r,
                            height: a / n,
                            left: s.left + l * (u / r) + (t.options.mode == "show" ? (l - Math.floor(r / 2)) * (u / r) : 0),
                            top: s.top + f * (a / n) + (t.options.mode == "show" ? (f - Math.floor(n / 2)) * (a / n) : 0),
                            opacity: t.options.mode == "show" ? 0 : 1
                        }).animate({
                            left: s.left + l * (u / r) + (t.options.mode == "show" ? 0 : (l - Math.floor(r / 2)) * (u / r)),
                            top: s.top + f * (a / n) + (t.options.mode == "show" ? 0 : (f - Math.floor(n / 2)) * (a / n)),
                            opacity: t.options.mode == "show" ? 1 : 0
                        }, t.duration || 500);
                setTimeout(function () {
                    t.options.mode == "show" ? i.css({
                        visibility: "visible"
                    }) : i.css({
                        visibility: "visible"
                    }).hide(), t.callback && t.callback.apply(i[0]), i.dequeue(), e("div.ui-effects-explode").remove()
                }, t.duration || 500)
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.fade = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = e.effects.setMode(n, t.options.mode || "hide");
                n.animate({
                    opacity: r
                }, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.options.easing,
                    complete: function () {
                        t.callback && t.callback.apply(this, arguments), n.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.fold = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right"],
                    i = e.effects.setMode(n, t.options.mode || "hide"),
                    s = t.options.size || 15,
                    u = !! t.options.horizFirst,
                    a = t.duration ? t.duration / 2 : e.fx.speeds._default / 2;
                e.effects.save(n, r), n.show();
                var f = e.effects.createWrapper(n).css({
                        overflow: "hidden"
                    }),
                    l = i == "show" != u,
                    c = l ? ["width", "height"] : ["height", "width"],
                    h = l ? [f.width(), f.height()] : [f.height(), f.width()],
                    p = /([0-9]+)%/.exec(s);
                p && (s = parseInt(p[1], 10) / 100 * h[i == "hide" ? 0 : 1]), i == "show" && f.css(u ? {
                    height: 0,
                    width: s
                } : {
                    height: s,
                    width: 0
                });
                var d = {}, v = {};
                d[c[0]] = i == "show" ? h[0] : s, v[c[1]] = i == "show" ? h[1] : 0, f.animate(d, a, t.options.easing).animate(v, a, t.options.easing, function () {
                    i == "hide" && n.hide(), e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(n[0], arguments), n.dequeue()
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.highlight = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["backgroundImage", "backgroundColor", "opacity"],
                    i = e.effects.setMode(n, t.options.mode || "show"),
                    s = {
                        backgroundColor: n.css("backgroundColor")
                    };
                i == "hide" && (s.opacity = 0), e.effects.save(n, r), n.show().css({
                    backgroundImage: "none",
                    backgroundColor: t.options.color || "#ffff99"
                }).animate(s, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.options.easing,
                        complete: function () {
                            i == "hide" && n.hide(), e.effects.restore(n, r), i == "show" && !e.support.opacity && this.style.removeAttribute("filter"), t.callback && t.callback.apply(this, arguments), n.dequeue()
                        }
                    })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.pulsate = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = e.effects.setMode(n, t.options.mode || "show"),
                    i = (t.options.times || 5) * 2 - 1,
                    s = t.duration ? t.duration / 2 : e.fx.speeds._default / 2,
                    u = n.is(":visible"),
                    a = 0;
                u || (n.css("opacity", 0).show(), a = 1), (r == "hide" && u || r == "show" && !u) && i--;
                for (var f = 0; f < i; f++) n.animate({
                    opacity: a
                }, s, t.options.easing), a = (a + 1) % 2;
                n.animate({
                    opacity: a
                }, s, t.options.easing, function () {
                    a == 0 && n.hide(), t.callback && t.callback.apply(this, arguments)
                }), n.queue("fx", function () {
                    n.dequeue()
                }).dequeue()
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.puff = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = e.effects.setMode(n, t.options.mode || "hide"),
                    i = parseInt(t.options.percent, 10) || 150,
                    s = i / 100,
                    u = {
                        height: n.height(),
                        width: n.width()
                    };
                e.extend(t.options, {
                    fade: !0,
                    mode: r,
                    percent: r == "hide" ? i : 100,
                    from: r == "hide" ? u : {
                        height: u.height * s,
                        width: u.width * s
                    }
                }), n.effect("scale", t.options, t.duration, t.callback), n.dequeue()
            })
        }, e.effects.scale = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = e.extend(!0, {}, t.options),
                    i = e.effects.setMode(n, t.options.mode || "effect"),
                    s = parseInt(t.options.percent, 10) || (parseInt(t.options.percent, 10) == 0 ? 0 : i == "hide" ? 0 : 100),
                    u = t.options.direction || "both",
                    a = t.options.origin;
                i != "effect" && (r.origin = a || ["middle", "center"], r.restore = !0);
                var f = {
                    height: n.height(),
                    width: n.width()
                };
                n.from = t.options.from || (i == "show" ? {
                    height: 0,
                    width: 0
                } : f);
                var l = {
                    y: u != "horizontal" ? s / 100 : 1,
                    x: u != "vertical" ? s / 100 : 1
                };
                n.to = {
                    height: f.height * l.y,
                    width: f.width * l.x
                }, t.options.fade && (i == "show" && (n.from.opacity = 0, n.to.opacity = 1), i == "hide" && (n.from.opacity = 1, n.to.opacity = 0)), r.from = n.from, r.to = n.to, r.mode = i, n.effect("size", r, t.duration, t.callback), n.dequeue()
            })
        }, e.effects.size = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                    i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                    s = ["width", "height", "overflow"],
                    u = ["fontSize"],
                    a = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                    f = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                    l = e.effects.setMode(n, t.options.mode || "effect"),
                    c = t.options.restore || !1,
                    h = t.options.scale || "both",
                    p = t.options.origin,
                    d = {
                        height: n.height(),
                        width: n.width()
                    };
                n.from = t.options.from || d, n.to = t.options.to || d;
                if (p) {
                    var v = e.effects.getBaseline(p, d);
                    n.from.top = (d.height - n.from.height) * v.y, n.from.left = (d.width - n.from.width) * v.x, n.to.top = (d.height - n.to.height) * v.y, n.to.left = (d.width - n.to.width) * v.x
                }
                var m = {
                    from: {
                        y: n.from.height / d.height,
                        x: n.from.width / d.width
                    },
                    to: {
                        y: n.to.height / d.height,
                        x: n.to.width / d.width
                    }
                };
                if (h == "box" || h == "both") m.from.y != m.to.y && (r = r.concat(a), n.from = e.effects.setTransition(n, a, m.from.y, n.from), n.to = e.effects.setTransition(n, a, m.to.y, n.to)), m.from.x != m.to.x && (r = r.concat(f), n.from = e.effects.setTransition(n, f, m.from.x, n.from), n.to = e.effects.setTransition(n, f, m.to.x, n.to));
                (h == "content" || h == "both") && m.from.y != m.to.y && (r = r.concat(u), n.from = e.effects.setTransition(n, u, m.from.y, n.from), n.to = e.effects.setTransition(n, u, m.to.y, n.to)), e.effects.save(n, c ? r : i), n.show(), e.effects.createWrapper(n), n.css("overflow", "hidden").css(n.from);
                if (h == "content" || h == "both") a = a.concat(["marginTop", "marginBottom"]).concat(u), f = f.concat(["marginLeft", "marginRight"]), s = r.concat(a).concat(f), n.find("*[width]").each(function () {
                    var n = e(this);
                    c && e.effects.save(n, s);
                    var r = {
                        height: n.height(),
                        width: n.width()
                    };
                    n.from = {
                        height: r.height * m.from.y,
                        width: r.width * m.from.x
                    }, n.to = {
                        height: r.height * m.to.y,
                        width: r.width * m.to.x
                    }, m.from.y != m.to.y && (n.from = e.effects.setTransition(n, a, m.from.y, n.from), n.to = e.effects.setTransition(n, a, m.to.y, n.to)), m.from.x != m.to.x && (n.from = e.effects.setTransition(n, f, m.from.x, n.from), n.to = e.effects.setTransition(n, f, m.to.x, n.to)), n.css(n.from), n.animate(n.to, t.duration, t.options.easing, function () {
                        c && e.effects.restore(n, s)
                    })
                });
                n.animate(n.to, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.options.easing,
                    complete: function () {
                        n.to.opacity === 0 && n.css("opacity", n.from.opacity), l == "hide" && n.hide(), e.effects.restore(n, c ? r : i), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments), n.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.shake = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right"],
                    i = e.effects.setMode(n, t.options.mode || "effect"),
                    s = t.options.direction || "left",
                    u = t.options.distance || 20,
                    a = t.options.times || 3,
                    f = t.duration || t.options.duration || 140;
                e.effects.save(n, r), n.show(), e.effects.createWrapper(n);
                var l = s == "up" || s == "down" ? "top" : "left",
                    c = s == "up" || s == "left" ? "pos" : "neg",
                    h = {}, p = {}, d = {};
                h[l] = (c == "pos" ? "-=" : "+=") + u, p[l] = (c == "pos" ? "+=" : "-=") + u * 2, d[l] = (c == "pos" ? "-=" : "+=") + u * 2, n.animate(h, f, t.options.easing);
                for (var v = 1; v < a; v++) n.animate(p, f, t.options.easing).animate(d, f, t.options.easing);
                n.animate(p, f, t.options.easing).animate(h, f / 2, t.options.easing, function () {
                    e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments)
                }), n.queue("fx", function () {
                    n.dequeue()
                }), n.dequeue()
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.slide = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = ["position", "top", "bottom", "left", "right"],
                    i = e.effects.setMode(n, t.options.mode || "show"),
                    s = t.options.direction || "left";
                e.effects.save(n, r), n.show(), e.effects.createWrapper(n).css({
                    overflow: "hidden"
                });
                var u = s == "up" || s == "down" ? "top" : "left",
                    a = s == "up" || s == "left" ? "pos" : "neg",
                    f = t.options.distance || (u == "top" ? n.outerHeight(!0) : n.outerWidth(!0));
                i == "show" && n.css(u, a == "pos" ? isNaN(f) ? "-" + f : -f : f);
                var l = {};
                l[u] = (i == "show" ? a == "pos" ? "+=" : "-=" : a == "pos" ? "-=" : "+=") + f, n.animate(l, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.options.easing,
                    complete: function () {
                        i == "hide" && n.hide(), e.effects.restore(n, r), e.effects.removeWrapper(n), t.callback && t.callback.apply(this, arguments), n.dequeue()
                    }
                })
            })
        }
    }(jQuery),
    function (e, t) {
        e.effects.transfer = function (t) {
            return this.queue(function () {
                var n = e(this),
                    r = e(t.options.to),
                    i = r.offset(),
                    s = {
                        top: i.top,
                        left: i.left,
                        height: r.innerHeight(),
                        width: r.innerWidth()
                    }, u = n.offset(),
                    a = e('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(t.options.className).css({
                        top: u.top,
                        left: u.left,
                        height: n.innerHeight(),
                        width: n.innerWidth(),
                        position: "absolute"
                    }).animate(s, t.duration, t.options.easing, function () {
                            a.remove(), t.callback && t.callback.apply(n[0], arguments), n.dequeue()
                        })
            })
        }
    }(jQuery),
    function (e, t) {
        e.widget("ui.accordion", {
            options: {
                active: 0,
                animated: "slide",
                autoHeight: !0,
                clearStyle: !1,
                collapsible: !1,
                event: "click",
                fillSpace: !1,
                header: "> li > :first-child,> :not(li):even",
                icons: {
                    header: "ui-icon-triangle-1-e",
                    headerSelected: "ui-icon-triangle-1-s"
                },
                navigation: !1,
                navigationFilter: function () {
                    return this.href.toLowerCase() === location.href.toLowerCase()
                }
            },
            _create: function () {
                var t = this,
                    n = t.options;
                t.running = 0, t.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"), t.headers = t.element.find(n.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
                    if (n.disabled) return;
                    e(this).addClass("ui-state-hover")
                }).bind("mouseleave.accordion", function () {
                        if (n.disabled) return;
                        e(this).removeClass("ui-state-hover")
                    }).bind("focus.accordion", function () {
                        if (n.disabled) return;
                        e(this).addClass("ui-state-focus")
                    }).bind("blur.accordion", function () {
                        if (n.disabled) return;
                        e(this).removeClass("ui-state-focus")
                    }), t.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
                if (n.navigation) {
                    var r = t.element.find("a").filter(n.navigationFilter).eq(0);
                    if (r.length) {
                        var i = r.closest(".ui-accordion-header");
                        i.length ? t.active = i : t.active = r.closest(".ui-accordion-content").prev()
                    }
                }
                t.active = t._findActive(t.active || n.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"), t.active.next().addClass("ui-accordion-content-active"), t._createIcons(), t.resize(), t.element.attr("role", "tablist"), t.headers.attr("role", "tab").bind("keydown.accordion", function (e) {
                    return t._keydown(e)
                }).next().attr("role", "tabpanel"), t.headers.not(t.active || "").attr({
                    "aria-expanded": "false",
                    "aria-selected": "false",
                    tabIndex: -1
                }).next().hide(), t.active.length ? t.active.attr({
                    "aria-expanded": "true",
                    "aria-selected": "true",
                    tabIndex: 0
                }) : t.headers.eq(0).attr("tabIndex", 0), e.browser.safari || t.headers.find("a").attr("tabIndex", -1), n.event && t.headers.bind(n.event.split(" ").join(".accordion ") + ".accordion", function (e) {
                    t._clickHandler.call(t, e, this), e.preventDefault()
                })
            },
            _createIcons: function () {
                var t = this.options;
                t.icons && (e("<span></span>").addClass("ui-icon " + t.icons.header).prependTo(this.headers), this.active.children(".ui-icon").toggleClass(t.icons.header).toggleClass(t.icons.headerSelected), this.element.addClass("ui-accordion-icons"))
            },
            _destroyIcons: function () {
                this.headers.children(".ui-icon").remove(), this.element.removeClass("ui-accordion-icons")
            },
            destroy: function () {
                var t = this.options;
                this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"), this.headers.find("a").removeAttr("tabIndex"), this._destroyIcons();
                var n = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
                return (t.autoHeight || t.fillHeight) && n.css("height", ""), e.Widget.prototype.destroy.call(this)
            },
            _setOption: function (t, n) {
                e.Widget.prototype._setOption.apply(this, arguments), t == "active" && this.activate(n), t == "icons" && (this._destroyIcons(), n && this._createIcons()), t == "disabled" && this.headers.add(this.headers.next())[n ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
            },
            _keydown: function (t) {
                if (this.options.disabled || t.altKey || t.ctrlKey) return;
                var n = e.ui.keyCode,
                    r = this.headers.length,
                    i = this.headers.index(t.target),
                    s = !1;
                switch (t.keyCode) {
                    case n.RIGHT:
                    case n.DOWN:
                        s = this.headers[(i + 1) % r];
                        break;
                    case n.LEFT:
                    case n.UP:
                        s = this.headers[(i - 1 + r) % r];
                        break;
                    case n.SPACE:
                    case n.ENTER:
                        this._clickHandler({
                            target: t.target
                        }, t.target), t.preventDefault()
                }
                return s ? (e(t.target).attr("tabIndex", -1), e(s).attr("tabIndex", 0), s.focus(), !1) : !0
            },
            resize: function () {
                var t = this.options,
                    n;
                if (t.fillSpace) {
                    if (e.browser.msie) {
                        var r = this.element.parent().css("overflow");
                        this.element.parent().css("overflow", "hidden")
                    }
                    n = this.element.parent().height(), e.browser.msie && this.element.parent().css("overflow", r), this.headers.each(function () {
                        n -= e(this).outerHeight(!0)
                    }), this.headers.next().each(function () {
                        e(this).height(Math.max(0, n - e(this).innerHeight() + e(this).height()))
                    }).css("overflow", "auto")
                } else t.autoHeight && (n = 0, this.headers.next().each(function () {
                    n = Math.max(n, e(this).height("").height())
                }).height(n));
                return this
            },
            activate: function (e) {
                this.options.active = e;
                var t = this._findActive(e)[0];
                return this._clickHandler({
                    target: t
                }, t), this
            },
            _findActive: function (t) {
                return t ? typeof t == "number" ? this.headers.filter(":eq(" + t + ")") : this.headers.not(this.headers.not(t)) : t === !1 ? e([]) : this.headers.filter(":eq(0)")
            },
            _clickHandler: function (t, n) {
                var r = this.options;
                if (r.disabled) return;
                if (!t.target) {
                    if (!r.collapsible) return;
                    this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header), this.active.next().addClass("ui-accordion-content-active");
                    var i = this.active.next(),
                        s = {
                            options: r,
                            newHeader: e([]),
                            oldHeader: r.active,
                            newContent: e([]),
                            oldContent: i
                        }, o = this.active = e([]);
                    this._toggle(o, i, s);
                    return
                }
                var u = e(t.currentTarget || n),
                    a = u[0] === this.active[0];
                r.active = r.collapsible && a ? !1 : this.headers.index(u);
                if (this.running || !r.collapsible && a) return;
                var f = this.active,
                    o = u.next(),
                    i = this.active.next(),
                    s = {
                        options: r,
                        newHeader: a && r.collapsible ? e([]) : u,
                        oldHeader: this.active,
                        newContent: a && r.collapsible ? e([]) : o,
                        oldContent: i
                    }, l = this.headers.index(this.active[0]) > this.headers.index(u[0]);
                this.active = a ? e([]) : u, this._toggle(o, i, s, a, l), f.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(r.icons.headerSelected).addClass(r.icons.header), a || (u.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(r.icons.header).addClass(r.icons.headerSelected), u.next().addClass("ui-accordion-content-active"));
                return
            },
            _toggle: function (t, n, r, i, s) {
                var o = this,
                    u = o.options;
                o.toShow = t, o.toHide = n, o.data = r;
                var a = function () {
                    if (!o) return;
                    return o._completed.apply(o, arguments)
                };
                o._trigger("changestart", null, o.data), o.running = n.size() === 0 ? t.size() : n.size();
                if (u.animated) {
                    var f = {};
                    u.collapsible && i ? f = {
                        toShow: e([]),
                        toHide: n,
                        complete: a,
                        down: s,
                        autoHeight: u.autoHeight || u.fillSpace
                    } : f = {
                        toShow: t,
                        toHide: n,
                        complete: a,
                        down: s,
                        autoHeight: u.autoHeight || u.fillSpace
                    }, u.proxied || (u.proxied = u.animated), u.proxiedDuration || (u.proxiedDuration = u.duration), u.animated = e.isFunction(u.proxied) ? u.proxied(f) : u.proxied, u.duration = e.isFunction(u.proxiedDuration) ? u.proxiedDuration(f) : u.proxiedDuration;
                    var l = e.ui.accordion.animations,
                        c = u.duration,
                        h = u.animated;
                    h && !l[h] && !e.easing[h] && (h = "slide"), l[h] || (l[h] = function (e) {
                        this.slide(e, {
                            easing: h,
                            duration: c || 700
                        })
                    }), l[h](f)
                } else u.collapsible && i ? t.toggle() : (n.hide(), t.show()), a(!0);
                n.prev().attr({
                    "aria-expanded": "false",
                    "aria-selected": "false",
                    tabIndex: -1
                }).blur(), t.prev().attr({
                    "aria-expanded": "true",
                    "aria-selected": "true",
                    tabIndex: 0
                }).focus()
            },
            _completed: function (e) {
                this.running = e ? 0 : --this.running;
                if (this.running) return;
                this.options.clearStyle && this.toShow.add(this.toHide).css({
                    height: "",
                    overflow: ""
                }), this.toHide.removeClass("ui-accordion-content-active"), this.toHide.length && (this.toHide.parent()[0].className = this.toHide.parent()[0].className), this._trigger("change", null, this.data)
            }
        }), e.extend(e.ui.accordion, {
            version: "1.8.23",
            animations: {
                slide: function (t, n) {
                    t = e.extend({
                        easing: "swing",
                        duration: 300
                    }, t, n);
                    if (!t.toHide.size()) {
                        t.toShow.animate({
                            height: "show",
                            paddingTop: "show",
                            paddingBottom: "show"
                        }, t);
                        return
                    }
                    if (!t.toShow.size()) {
                        t.toHide.animate({
                            height: "hide",
                            paddingTop: "hide",
                            paddingBottom: "hide"
                        }, t);
                        return
                    }
                    var r = t.toShow.css("overflow"),
                        i = 0,
                        s = {}, o = {}, u = ["height", "paddingTop", "paddingBottom"],
                        a, f = t.toShow;
                    a = f[0].style.width, f.width(f.parent().width() - parseFloat(f.css("paddingLeft")) - parseFloat(f.css("paddingRight")) - (parseFloat(f.css("borderLeftWidth")) || 0) - (parseFloat(f.css("borderRightWidth")) || 0)), e.each(u, function (n, r) {
                        o[r] = "hide";
                        var i = ("" + e.css(t.toShow[0], r)).match(/^([\d+-.]+)(.*)$/);
                        s[r] = {
                            value: i[1],
                            unit: i[2] || "px"
                        }
                    }), t.toShow.css({
                        height: 0,
                        overflow: "hidden"
                    }).show(), t.toHide.filter(":hidden").each(t.complete).end().filter(":visible").animate(o, {
                        step: function (e, n) {
                            n.prop == "height" && (i = n.end - n.start === 0 ? 0 : (n.now - n.start) / (n.end - n.start)), t.toShow[0].style[n.prop] = i * s[n.prop].value + s[n.prop].unit
                        },
                        duration: t.duration,
                        easing: t.easing,
                        complete: function () {
                            t.autoHeight || t.toShow.css("height", ""), t.toShow.css({
                                width: a,
                                overflow: r
                            }), t.complete()
                        }
                    })
                },
                bounceslide: function (e) {
                    this.slide(e, {
                        easing: e.down ? "easeOutBounce" : "swing",
                        duration: e.down ? 1e3 : 200
                    })
                }
            }
        })
    }(jQuery),
    function (e, t) {
        var n = 0;
        e.widget("ui.autocomplete", {
            options: {
                appendTo: "body",
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null
            },
            pending: 0,
            _create: function () {
                var t = this,
                    n = this.element[0].ownerDocument,
                    r;
                this.isMultiLine = this.element.is("textarea"), this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                    role: "textbox",
                    "aria-autocomplete": "list",
                    "aria-haspopup": "true"
                }).bind("keydown.autocomplete", function (n) {
                        if (t.options.disabled || t.element.propAttr("readOnly")) return;
                        r = !1;
                        var i = e.ui.keyCode;
                        switch (n.keyCode) {
                            case i.PAGE_UP:
                                t._move("previousPage", n);
                                break;
                            case i.PAGE_DOWN:
                                t._move("nextPage", n);
                                break;
                            case i.UP:
                                t._keyEvent("previous", n);
                                break;
                            case i.DOWN:
                                t._keyEvent("next", n);
                                break;
                            case i.ENTER:
                            case i.NUMPAD_ENTER:
                                t.menu.active && (r = !0, n.preventDefault());
                            case i.TAB:
                                if (!t.menu.active) return;
                                t.menu.select(n);
                                break;
                            case i.ESCAPE:
                                t.element.val(t.term), t.close(n);
                                break;
                            default:
                                clearTimeout(t.searching), t.searching = setTimeout(function () {
                                    t.term != t.element.val() && (t.selectedItem = null, t.search(null, n))
                                }, t.options.delay)
                        }
                    }).bind("keypress.autocomplete", function (e) {
                        r && (r = !1, e.preventDefault())
                    }).bind("focus.autocomplete", function () {
                        if (t.options.disabled) return;
                        t.selectedItem = null, t.previous = t.element.val()
                    }).bind("blur.autocomplete", function (e) {
                        if (t.options.disabled) return;
                        clearTimeout(t.searching), t.closing = setTimeout(function () {
                            t.close(e), t._change(e)
                        }, 150)
                    }), this._initSource(), this.menu = e("<ul></ul>").addClass("ui-autocomplete").appendTo(e(this.options.appendTo || "body", n)[0]).mousedown(function (n) {
                    var r = t.menu.element[0];
                    e(n.target).closest(".ui-menu-item").length || setTimeout(function () {
                        e(document).one("mousedown", function (n) {
                            n.target !== t.element[0] && n.target !== r && !e.ui.contains(r, n.target) && t.close()
                        })
                    }, 1), setTimeout(function () {
                        clearTimeout(t.closing)
                    }, 13)
                }).menu({
                        focus: function (e, n) {
                            var r = n.item.data("item.autocomplete");
                            !1 !== t._trigger("focus", e, {
                                item: r
                            }) && /^key/.test(e.originalEvent.type) && t.element.val(r.value)
                        },
                        selected: function (e, r) {
                            var i = r.item.data("item.autocomplete"),
                                s = t.previous;
                            t.element[0] !== n.activeElement && (t.element.focus(), t.previous = s, setTimeout(function () {
                                t.previous = s, t.selectedItem = i
                            }, 1)), !1 !== t._trigger("select", e, {
                                item: i
                            }) && t.element.val(i.value), t.term = t.element.val(), t.close(e), t.selectedItem = i
                        },
                        blur: function (e, n) {
                            t.menu.element.is(":visible") && t.element.val() !== t.term && t.element.val(t.term)
                        }
                    }).zIndex(this.element.zIndex() + 1).css({
                        top: 0,
                        left: 0
                    }).hide().data("menu"), e.fn.bgiframe && this.menu.element.bgiframe(), t.beforeunloadHandler = function () {
                    t.element.removeAttr("autocomplete")
                }, e(window).bind("beforeunload", t.beforeunloadHandler)
            },
            destroy: function () {
                this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"), this.menu.element.remove(), e(window).unbind("beforeunload", this.beforeunloadHandler), e.Widget.prototype.destroy.call(this)
            },
            _setOption: function (t, n) {
                e.Widget.prototype._setOption.apply(this, arguments), t === "source" && this._initSource(), t === "appendTo" && this.menu.element.appendTo(e(n || "body", this.element[0].ownerDocument)[0]), t === "disabled" && n && this.xhr && this.xhr.abort()
            },
            _initSource: function () {
                var t = this,
                    n, r;
                e.isArray(this.options.source) ? (n = this.options.source, this.source = function (t, r) {
                    r(e.ui.autocomplete.filter(n, t.term))
                }) : typeof this.options.source == "string" ? (r = this.options.source, this.source = function (n, i) {
                    t.xhr && t.xhr.abort(), t.xhr = e.ajax({
                        url: r,
                        data: n,
                        dataType: "json",
                        success: function (e, t) {
                            i(e)
                        },
                        error: function () {
                            i([])
                        }
                    })
                }) : this.source = this.options.source
            },
            search: function (e, t) {
                e = e != null ? e : this.element.val(), this.term = this.element.val();
                if (e.length < this.options.minLength) return this.close(t);
                clearTimeout(this.closing);
                if (this._trigger("search", t) === !1) return;
                return this._search(e)
            },
            _search: function (e) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.source({
                    term: e
                }, this._response())
            },
            _response: function () {
                var e = this,
                    t = ++n;
                return function (r) {
                    t === n && e.__response(r), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
                }
            },
            __response: function (e) {
                !this.options.disabled && e && e.length ? (e = this._normalize(e), this._suggest(e), this._trigger("open")) : this.close()
            },
            close: function (e) {
                clearTimeout(this.closing), this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.deactivate(), this._trigger("close", e))
            },
            _change: function (e) {
                this.previous !== this.element.val() && this._trigger("change", e, {
                    item: this.selectedItem
                })
            },
            _normalize: function (t) {
                return t.length && t[0].label && t[0].value ? t : e.map(t, function (t) {
                    return typeof t == "string" ? {
                        label: t,
                        value: t
                    } : e.extend({
                        label: t.label || t.value,
                        value: t.value || t.label
                    }, t)
                })
            },
            _suggest: function (t) {
                var n = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
                this._renderMenu(n, t), this.menu.deactivate(), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({
                    of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next(new e.Event("mouseover"))
            },
            _resizeMenu: function () {
                var e = this.menu.element;
                e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function (t, n) {
                var r = this;
                e.each(n, function (e, n) {
                    r._renderItem(t, n)
                })
            },
            _renderItem: function (t, n) {
                return e("<li></li>").data("item.autocomplete", n).append(e("<a></a>").text(n.label)).appendTo(t)
            },
            _move: function (e, t) {
                if (!this.menu.element.is(":visible")) {
                    this.search(null, t);
                    return
                }
                if (this.menu.first() && /^previous/.test(e) || this.menu.last() && /^next/.test(e)) {
                    this.element.val(this.term), this.menu.deactivate();
                    return
                }
                this.menu[e](t)
            },
            widget: function () {
                return this.menu.element
            },
            _keyEvent: function (e, t) {
                if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(e, t), t.preventDefault()
            }
        }), e.extend(e.ui.autocomplete, {
            escapeRegex: function (e) {
                return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
            },
            filter: function (t, n) {
                var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
                return e.grep(t, function (e) {
                    return r.test(e.label || e.value || e)
                })
            }
        })
    }(jQuery),
    function (e) {
        e.widget("ui.menu", {
            _create: function () {
                var t = this;
                this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                    role: "listbox",
                    "aria-activedescendant": "ui-active-menuitem"
                }).click(function (n) {
                        if (!e(n.target).closest(".ui-menu-item a").length) return;
                        n.preventDefault(), t.select(n)
                    }), this.refresh()
            },
            refresh: function () {
                var t = this,
                    n = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
                n.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (n) {
                    t.activate(n, e(this).parent())
                }).mouseleave(function () {
                        t.deactivate()
                    })
            },
            activate: function (e, t) {
                this.deactivate();
                if (this.hasScroll()) {
                    var n = t.offset().top - this.element.offset().top,
                        r = this.element.scrollTop(),
                        i = this.element.height();
                    n < 0 ? this.element.scrollTop(r + n) : n >= i && this.element.scrollTop(r + n - i + t.height())
                }
                this.active = t.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(), this._trigger("focus", e, {
                    item: t
                })
            },
            deactivate: function () {
                if (!this.active) return;
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id"), this._trigger("blur"), this.active = null
            },
            next: function (e) {
                this.move("next", ".ui-menu-item:first", e)
            },
            previous: function (e) {
                this.move("prev", ".ui-menu-item:last", e)
            },
            first: function () {
                return this.active && !this.active.prevAll(".ui-menu-item").length
            },
            last: function () {
                return this.active && !this.active.nextAll(".ui-menu-item").length
            },
            move: function (e, t, n) {
                if (!this.active) {
                    this.activate(n, this.element.children(t));
                    return
                }
                var r = this.active[e + "All"](".ui-menu-item").eq(0);
                r.length ? this.activate(n, r) : this.activate(n, this.element.children(t))
            },
            nextPage: function (t) {
                if (this.hasScroll()) {
                    if (!this.active || this.last()) {
                        this.activate(t, this.element.children(".ui-menu-item:first"));
                        return
                    }
                    var n = this.active.offset().top,
                        r = this.element.height(),
                        i = this.element.children(".ui-menu-item").filter(function () {
                            var t = e(this).offset().top - n - r + e(this).height();
                            return t < 10 && t > -10
                        });
                    i.length || (i = this.element.children(".ui-menu-item:last")), this.activate(t, i)
                } else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
            },
            previousPage: function (t) {
                if (this.hasScroll()) {
                    if (!this.active || this.first()) {
                        this.activate(t, this.element.children(".ui-menu-item:last"));
                        return
                    }
                    var n = this.active.offset().top,
                        r = this.element.height(),
                        i = this.element.children(".ui-menu-item").filter(function () {
                            var t = e(this).offset().top - n + r - e(this).height();
                            return t < 10 && t > -10
                        });
                    i.length || (i = this.element.children(".ui-menu-item:first")), this.activate(t, i)
                } else this.activate(t, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
            },
            hasScroll: function () {
                return this.element.height() < this.element[e.fn.prop ? "prop" : "attr"]("scrollHeight")
            },
            select: function (e) {
                this._trigger("selected", e, {
                    item: this.active
                })
            }
        })
    }(jQuery),
    function (e, t) {
        var n, r, i, s, o = "ui-button ui-widget ui-state-default ui-corner-all",
            u = "ui-state-hover ui-state-active ",
            a = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
            f = function () {
                var t = e(this).find(":ui-button");
                setTimeout(function () {
                    t.button("refresh")
                }, 1)
            }, l = function (t) {
                var n = t.name,
                    r = t.form,
                    i = e([]);
                return n && (r ? i = e(r).find("[name='" + n + "']") : i = e("[name='" + n + "']", t.ownerDocument).filter(function () {
                    return !this.form
                })), i
            };
        e.widget("ui.button", {
            options: {
                disabled: null,
                text: !0,
                label: null,
                icons: {
                    primary: null,
                    secondary: null
                }
            },
            _create: function () {
                this.element.closest("form").unbind("reset.button").bind("reset.button", f), typeof this.options.disabled != "boolean" ? this.options.disabled = !! this.element.propAttr("disabled") : this.element.propAttr("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !! this.buttonElement.attr("title");
                var t = this,
                    u = this.options,
                    a = this.type === "checkbox" || this.type === "radio",
                    c = "ui-state-hover" + (a ? "" : " ui-state-active"),
                    h = "ui-state-focus";
                u.label === null && (u.label = this.buttonElement.html()), this.buttonElement.addClass(o).attr("role", "button").bind("mouseenter.button", function () {
                    if (u.disabled) return;
                    e(this).addClass("ui-state-hover"), this === n && e(this).addClass("ui-state-active")
                }).bind("mouseleave.button", function () {
                        if (u.disabled) return;
                        e(this).removeClass(c)
                    }).bind("click.button", function (e) {
                        u.disabled && (e.preventDefault(), e.stopImmediatePropagation())
                    }), this.element.bind("focus.button", function () {
                    t.buttonElement.addClass(h)
                }).bind("blur.button", function () {
                        t.buttonElement.removeClass(h)
                    }), a && (this.element.bind("change.button", function () {
                    if (s) return;
                    t.refresh()
                }), this.buttonElement.bind("mousedown.button", function (e) {
                    if (u.disabled) return;
                    s = !1, r = e.pageX, i = e.pageY
                }).bind("mouseup.button", function (e) {
                        if (u.disabled) return;
                        if (r !== e.pageX || i !== e.pageY) s = !0
                    })), this.type === "checkbox" ? this.buttonElement.bind("click.button", function () {
                    if (u.disabled || s) return !1;
                    e(this).toggleClass("ui-state-active"), t.buttonElement.attr("aria-pressed", t.element[0].checked)
                }) : this.type === "radio" ? this.buttonElement.bind("click.button", function () {
                    if (u.disabled || s) return !1;
                    e(this).addClass("ui-state-active"), t.buttonElement.attr("aria-pressed", "true");
                    var n = t.element[0];
                    l(n).not(n).map(function () {
                        return e(this).button("widget")[0]
                    }).removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : (this.buttonElement.bind("mousedown.button", function () {
                    if (u.disabled) return !1;
                    e(this).addClass("ui-state-active"), n = this, e(document).one("mouseup", function () {
                        n = null
                    })
                }).bind("mouseup.button", function () {
                        if (u.disabled) return !1;
                        e(this).removeClass("ui-state-active")
                    }).bind("keydown.button", function (t) {
                        if (u.disabled) return !1;
                        (t.keyCode == e.ui.keyCode.SPACE || t.keyCode == e.ui.keyCode.ENTER) && e(this).addClass("ui-state-active")
                    }).bind("keyup.button", function () {
                        e(this).removeClass("ui-state-active")
                    }), this.buttonElement.is("a") && this.buttonElement.keyup(function (t) {
                    t.keyCode === e.ui.keyCode.SPACE && e(this).click()
                })), this._setOption("disabled", u.disabled), this._resetButton()
            },
            _determineButtonType: function () {
                this.element.is(":checkbox") ? this.type = "checkbox" : this.element.is(":radio") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button";
                if (this.type === "checkbox" || this.type === "radio") {
                    var e = this.element.parents().filter(":last"),
                        t = "label[for='" + this.element.attr("id") + "']";
                    this.buttonElement = e.find(t), this.buttonElement.length || (e = e.length ? e.siblings() : this.element.siblings(), this.buttonElement = e.filter(t), this.buttonElement.length || (this.buttonElement = e.find(t))), this.element.addClass("ui-helper-hidden-accessible");
                    var n = this.element.is(":checked");
                    n && this.buttonElement.addClass("ui-state-active"), this.buttonElement.attr("aria-pressed", n)
                } else this.buttonElement = this.element
            },
            widget: function () {
                return this.buttonElement
            },
            destroy: function () {
                this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(o + " " + u + " " + a).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title"), e.Widget.prototype.destroy.call(this)
            },
            _setOption: function (t, n) {
                e.Widget.prototype._setOption.apply(this, arguments);
                if (t === "disabled") {
                    n ? this.element.propAttr("disabled", !0) : this.element.propAttr("disabled", !1);
                    return
                }
                this._resetButton()
            },
            refresh: function () {
                var t = this.element.is(":disabled");
                t !== this.options.disabled && this._setOption("disabled", t), this.type === "radio" ? l(this.element[0]).each(function () {
                    e(this).is(":checked") ? e(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : e(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : this.type === "checkbox" && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
            },
            _resetButton: function () {
                if (this.type === "input") {
                    this.options.label && this.element.val(this.options.label);
                    return
                }
                var t = this.buttonElement.removeClass(a),
                    n = e("<span></span>", this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(t.empty()).text(),
                    r = this.options.icons,
                    i = r.primary && r.secondary,
                    s = [];
                r.primary || r.secondary ? (this.options.text && s.push("ui-button-text-icon" + (i ? "s" : r.primary ? "-primary" : "-secondary")), r.primary && t.prepend("<span class='ui-button-icon-primary ui-icon " + r.primary + "'></span>"), r.secondary && t.append("<span class='ui-button-icon-secondary ui-icon " + r.secondary + "'></span>"), this.options.text || (s.push(i ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || t.attr("title", n))) : s.push("ui-button-text-only"), t.addClass(s.join(" "))
            }
        }), e.widget("ui.buttonset", {
            options: {
                items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
            },
            _create: function () {
                this.element.addClass("ui-buttonset")
            },
            _init: function () {
                this.refresh()
            },
            _setOption: function (t, n) {
                t === "disabled" && this.buttons.button("option", t, n), e.Widget.prototype._setOption.apply(this, arguments)
            },
            refresh: function () {
                var t = this.element.css("direction") === "rtl";
                this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                    return e(this).button("widget")[0]
                }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(t ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(t ? "ui-corner-left" : "ui-corner-right").end().end()
            },
            destroy: function () {
                this.element.removeClass("ui-buttonset"), this.buttons.map(function () {
                    return e(this).button("widget")[0]
                }).removeClass("ui-corner-left ui-corner-right").end().button("destroy"), e.Widget.prototype.destroy.call(this)
            }
        })
    }(jQuery),
    function ($, undefined) {
        function Datepicker() {
            this.debug = !1, this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, $.extend(this._defaults, this.regional[""]), this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
        }

        function bindHover(e) {
            var t = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.bind("mouseout", function (e) {
                var n = $(e.target).closest(t);
                if (!n.length) return;
                n.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
            }).bind("mouseover", function (n) {
                    var r = $(n.target).closest(t);
                    if ($.datepicker._isDisabledDatepicker(instActive.inline ? e.parent()[0] : instActive.input[0]) || !r.length) return;
                    r.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), r.addClass("ui-state-hover"), r.hasClass("ui-datepicker-prev") && r.addClass("ui-datepicker-prev-hover"), r.hasClass("ui-datepicker-next") && r.addClass("ui-datepicker-next-hover")
                })
        }

        function extendRemove(e, t) {
            $.extend(e, t);
            for (var n in t)
                if (t[n] == null || t[n] == undefined) e[n] = t[n];
            return e
        }

        function isArray(e) {
            return e && ($.browser.safari && typeof e == "object" && e.length || e.constructor && e.constructor.toString().match(/\Array\(\)/))
        }
        $.extend($.ui, {
            datepicker: {
                version: "1.8.23"
            }
        });
        var PROP_NAME = "datepicker",
            dpuuid = (new Date).getTime(),
            instActive;
        $.extend(Datepicker.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            log: function () {
                this.debug && console.log.apply("", arguments)
            },
            _widgetDatepicker: function () {
                return this.dpDiv
            },
            setDefaults: function (e) {
                return extendRemove(this._defaults, e || {}), this
            },
            _attachDatepicker: function (target, settings) {
                var inlineSettings = null;
                for (var attrName in this._defaults) {
                    var attrValue = target.getAttribute("date:" + attrName);
                    if (attrValue) {
                        inlineSettings = inlineSettings || {};
                        try {
                            inlineSettings[attrName] = eval(attrValue)
                        } catch (err) {
                            inlineSettings[attrName] = attrValue
                        }
                    }
                }
                var nodeName = target.nodeName.toLowerCase(),
                    inline = nodeName == "div" || nodeName == "span";
                target.id || (this.uuid += 1, target.id = "dp" + this.uuid);
                var inst = this._newInst($(target), inline);
                inst.settings = $.extend({}, settings || {}, inlineSettings || {}), nodeName == "input" ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
            },
            _newInst: function (e, t) {
                var n = e[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
                return {
                    id: n,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: t,
                    dpDiv: t ? bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')) : this.dpDiv
                }
            },
            _connectDatepicker: function (e, t) {
                var n = $(e);
                t.append = $([]), t.trigger = $([]);
                if (n.hasClass(this.markerClassName)) return;
                this._attachments(n, t), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (e, n, r) {
                    t.settings[n] = r
                }).bind("getData.datepicker", function (e, n) {
                        return this._get(t, n)
                    }), this._autoSize(t), $.data(e, PROP_NAME, t), t.settings.disabled && this._disableDatepicker(e)
            },
            _attachments: function (e, t) {
                var n = this._get(t, "appendText"),
                    r = this._get(t, "isRTL");
                t.append && t.append.remove(), n && (t.append = $('<span class="' + this._appendClass + '">' + n + "</span>"), e[r ? "before" : "after"](t.append)), e.unbind("focus", this._showDatepicker), t.trigger && t.trigger.remove();
                var i = this._get(t, "showOn");
                (i == "focus" || i == "both") && e.focus(this._showDatepicker);
                if (i == "button" || i == "both") {
                    var s = this._get(t, "buttonText"),
                        o = this._get(t, "buttonImage");
                    t.trigger = $(this._get(t, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                        src: o,
                        alt: s,
                        title: s
                    }) : $('<button type="button"></button>').addClass(this._triggerClass).html(o == "" ? s : $("<img/>").attr({
                        src: o,
                        alt: s,
                        title: s
                    }))), e[r ? "before" : "after"](t.trigger), t.trigger.click(function () {
                        return $.datepicker._datepickerShowing && $.datepicker._lastInput == e[0] ? $.datepicker._hideDatepicker() : $.datepicker._datepickerShowing && $.datepicker._lastInput != e[0] ? ($.datepicker._hideDatepicker(), $.datepicker._showDatepicker(e[0])) : $.datepicker._showDatepicker(e[0]), !1
                    })
                }
            },
            _autoSize: function (e) {
                if (this._get(e, "autoSize") && !e.inline) {
                    var t = new Date(2009, 11, 20),
                        n = this._get(e, "dateFormat");
                    if (n.match(/[DM]/)) {
                        var r = function (e) {
                            var t = 0,
                                n = 0;
                            for (var r = 0; r < e.length; r++) e[r].length > t && (t = e[r].length, n = r);
                            return n
                        };
                        t.setMonth(r(this._get(e, n.match(/MM/) ? "monthNames" : "monthNamesShort"))), t.setDate(r(this._get(e, n.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - t.getDay())
                    }
                    e.input.attr("size", this._formatDate(e, t).length)
                }
            },
            _inlineDatepicker: function (e, t) {
                var n = $(e);
                if (n.hasClass(this.markerClassName)) return;
                n.addClass(this.markerClassName).append(t.dpDiv).bind("setData.datepicker", function (e, n, r) {
                    t.settings[n] = r
                }).bind("getData.datepicker", function (e, n) {
                        return this._get(t, n)
                    }), $.data(e, PROP_NAME, t), this._setDate(t, this._getDefaultDate(t), !0), this._updateDatepicker(t), this._updateAlternate(t), t.settings.disabled && this._disableDatepicker(e), t.dpDiv.css("display", "block")
            },
            _dialogDatepicker: function (e, t, n, r, i) {
                var s = this._dialogInst;
                if (!s) {
                    this.uuid += 1;
                    var o = "dp" + this.uuid;
                    this._dialogInput = $('<input type="text" id="' + o + '" style="position: absolute; top: -100px; width: 0px;"/>'), this._dialogInput.keydown(this._doKeyDown), $("body").append(this._dialogInput), s = this._dialogInst = this._newInst(this._dialogInput, !1), s.settings = {}, $.data(this._dialogInput[0], PROP_NAME, s)
                }
                extendRemove(s.settings, r || {}), t = t && t.constructor == Date ? this._formatDate(s, t) : t, this._dialogInput.val(t), this._pos = i ? i.length ? i : [i.pageX, i.pageY] : null;
                if (!this._pos) {
                    var u = document.documentElement.clientWidth,
                        a = document.documentElement.clientHeight,
                        f = document.documentElement.scrollLeft || document.body.scrollLeft,
                        l = document.documentElement.scrollTop || document.body.scrollTop;
                    this._pos = [u / 2 - 100 + f, a / 2 - 150 + l]
                }
                return this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), s.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), $.blockUI && $.blockUI(this.dpDiv), $.data(this._dialogInput[0], PROP_NAME, s), this
            },
            _destroyDatepicker: function (e) {
                var t = $(e),
                    n = $.data(e, PROP_NAME);
                if (!t.hasClass(this.markerClassName)) return;
                var r = e.nodeName.toLowerCase();
                $.removeData(e, PROP_NAME), r == "input" ? (n.append.remove(), n.trigger.remove(), t.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : (r == "div" || r == "span") && t.removeClass(this.markerClassName).empty()
            },
            _enableDatepicker: function (e) {
                var t = $(e),
                    n = $.data(e, PROP_NAME);
                if (!t.hasClass(this.markerClassName)) return;
                var r = e.nodeName.toLowerCase();
                if (r == "input") e.disabled = !1, n.trigger.filter("button").each(function () {
                    this.disabled = !1
                }).end().filter("img").css({
                        opacity: "1.0",
                        cursor: ""
                    });
                else if (r == "div" || r == "span") {
                    var i = t.children("." + this._inlineClass);
                    i.children().removeClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs, function (t) {
                    return t == e ? null : t
                })
            },
            _disableDatepicker: function (e) {
                var t = $(e),
                    n = $.data(e, PROP_NAME);
                if (!t.hasClass(this.markerClassName)) return;
                var r = e.nodeName.toLowerCase();
                if (r == "input") e.disabled = !0, n.trigger.filter("button").each(function () {
                    this.disabled = !0
                }).end().filter("img").css({
                        opacity: "0.5",
                        cursor: "default"
                    });
                else if (r == "div" || r == "span") {
                    var i = t.children("." + this._inlineClass);
                    i.children().addClass("ui-state-disabled"), i.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
                this._disabledInputs = $.map(this._disabledInputs, function (t) {
                    return t == e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e
            },
            _isDisabledDatepicker: function (e) {
                if (!e) return !1;
                for (var t = 0; t < this._disabledInputs.length; t++)
                    if (this._disabledInputs[t] == e) return !0;
                return !1
            },
            _getInst: function (e) {
                try {
                    return $.data(e, PROP_NAME)
                } catch (t) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function (e, t, n) {
                var r = this._getInst(e);
                if (arguments.length == 2 && typeof t == "string") return t == "defaults" ? $.extend({}, $.datepicker._defaults) : r ? t == "all" ? $.extend({}, r.settings) : this._get(r, t) : null;
                var i = t || {};
                typeof t == "string" && (i = {}, i[t] = n);
                if (r) {
                    this._curInst == r && this._hideDatepicker();
                    var s = this._getDateDatepicker(e, !0),
                        o = this._getMinMaxDate(r, "min"),
                        u = this._getMinMaxDate(r, "max");
                    extendRemove(r.settings, i), o !== null && i.dateFormat !== undefined && i.minDate === undefined && (r.settings.minDate = this._formatDate(r, o)), u !== null && i.dateFormat !== undefined && i.maxDate === undefined && (r.settings.maxDate = this._formatDate(r, u)), this._attachments($(e), r), this._autoSize(r), this._setDate(r, s), this._updateAlternate(r), this._updateDatepicker(r)
                }
            },
            _changeDatepicker: function (e, t, n) {
                this._optionDatepicker(e, t, n)
            },
            _refreshDatepicker: function (e) {
                var t = this._getInst(e);
                t && this._updateDatepicker(t)
            },
            _setDateDatepicker: function (e, t) {
                var n = this._getInst(e);
                n && (this._setDate(n, t), this._updateDatepicker(n), this._updateAlternate(n))
            },
            _getDateDatepicker: function (e, t) {
                var n = this._getInst(e);
                return n && !n.inline && this._setDateFromField(n, t), n ? this._getDate(n) : null
            },
            _doKeyDown: function (e) {
                var t = $.datepicker._getInst(e.target),
                    n = !0,
                    r = t.dpDiv.is(".ui-datepicker-rtl");
                t._keyEvent = !0;
                if ($.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker(), n = !1;
                        break;
                    case 13:
                        var i = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", t.dpDiv);
                        i[0] && $.datepicker._selectDay(e.target, t.selectedMonth, t.selectedYear, i[0]);
                        var s = $.datepicker._get(t, "onSelect");
                        if (s) {
                            var o = $.datepicker._formatDate(t);
                            s.apply(t.input ? t.input[0] : null, [o, t])
                        } else $.datepicker._hideDatepicker();
                        return !1;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 34:
                        $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && $.datepicker._clearDate(e.target), n = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && $.datepicker._gotoToday(e.target), n = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, r ? 1 : -1, "D"), n = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? -$.datepicker._get(t, "stepBigMonths") : -$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, -7, "D"), n = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, r ? -1 : 1, "D"), n = e.ctrlKey || e.metaKey, e.originalEvent.altKey && $.datepicker._adjustDate(e.target, e.ctrlKey ? +$.datepicker._get(t, "stepBigMonths") : +$.datepicker._get(t, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && $.datepicker._adjustDate(e.target, 7, "D"), n = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        n = !1
                } else e.keyCode == 36 && e.ctrlKey ? $.datepicker._showDatepicker(this) : n = !1;
                n && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function (e) {
                var t = $.datepicker._getInst(e.target);
                if ($.datepicker._get(t, "constrainInput")) {
                    var n = $.datepicker._possibleChars($.datepicker._get(t, "dateFormat")),
                        r = String.fromCharCode(e.charCode == undefined ? e.keyCode : e.charCode);
                    return e.ctrlKey || e.metaKey || r < " " || !n || n.indexOf(r) > -1
                }
            },
            _doKeyUp: function (e) {
                var t = $.datepicker._getInst(e.target);
                if (t.input.val() != t.lastVal) try {
                    var n = $.datepicker.parseDate($.datepicker._get(t, "dateFormat"), t.input ? t.input.val() : null, $.datepicker._getFormatConfig(t));
                    n && ($.datepicker._setDateFromField(t), $.datepicker._updateAlternate(t), $.datepicker._updateDatepicker(t))
                } catch (r) {
                    $.datepicker.log(r)
                }
                return !0
            },
            _showDatepicker: function (e) {
                e = e.target || e, e.nodeName.toLowerCase() != "input" && (e = $("input", e.parentNode)[0]);
                if ($.datepicker._isDisabledDatepicker(e) || $.datepicker._lastInput == e) return;
                var t = $.datepicker._getInst(e);
                $.datepicker._curInst && $.datepicker._curInst != t && ($.datepicker._curInst.dpDiv.stop(!0, !0), t && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0]));
                var n = $.datepicker._get(t, "beforeShow"),
                    r = n ? n.apply(e, [e, t]) : {};
                if (r === !1) return;
                extendRemove(t.settings, r), t.lastVal = null, $.datepicker._lastInput = e, $.datepicker._setDateFromField(t), $.datepicker._inDialog && (e.value = ""), $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(e), $.datepicker._pos[1] += e.offsetHeight);
                var i = !1;
                $(e).parents().each(function () {
                    return i |= $(this).css("position") == "fixed", !i
                }), i && $.browser.opera && ($.datepicker._pos[0] -= document.documentElement.scrollLeft, $.datepicker._pos[1] -= document.documentElement.scrollTop);
                var s = {
                    left: $.datepicker._pos[0],
                    top: $.datepicker._pos[1]
                };
                $.datepicker._pos = null, t.dpDiv.empty(), t.dpDiv.css({
                    position: "absolute",
                    display: "block",
                    top: "-1000px"
                }), $.datepicker._updateDatepicker(t), s = $.datepicker._checkOffset(t, s, i), t.dpDiv.css({
                    position: $.datepicker._inDialog && $.blockUI ? "static" : i ? "fixed" : "absolute",
                    display: "none",
                    left: s.left + "px",
                    top: s.top + "px"
                });
                if (!t.inline) {
                    var o = $.datepicker._get(t, "showAnim"),
                        u = $.datepicker._get(t, "duration"),
                        a = function () {
                            var e = t.dpDiv.find("iframe.ui-datepicker-cover");
                            if ( !! e.length) {
                                var n = $.datepicker._getBorders(t.dpDiv);
                                e.css({
                                    left: -n[0],
                                    top: -n[1],
                                    width: t.dpDiv.outerWidth(),
                                    height: t.dpDiv.outerHeight()
                                })
                            }
                        };
                    t.dpDiv.zIndex($(e).zIndex() + 1), $.datepicker._datepickerShowing = !0, $.effects && $.effects[o] ? t.dpDiv.show(o, $.datepicker._get(t, "showOptions"), u, a) : t.dpDiv[o || "show"](o ? u : null, a), (!o || !u) && a(), t.input.is(":visible") && !t.input.is(":disabled") && t.input.focus(), $.datepicker._curInst = t
                }
            },
            _updateDatepicker: function (e) {
                var t = this;
                t.maxRows = 4;
                var n = $.datepicker._getBorders(e.dpDiv);
                instActive = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e);
                var r = e.dpDiv.find("iframe.ui-datepicker-cover");
                !r.length || r.css({
                    left: -n[0],
                    top: -n[1],
                    width: e.dpDiv.outerWidth(),
                    height: e.dpDiv.outerHeight()
                }), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var i = this._getNumberOfMonths(e),
                    s = i[1],
                    o = 17;
                e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), s > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + s).css("width", o * s + "em"), e.dpDiv[(i[0] != 1 || i[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e == $.datepicker._curInst && $.datepicker._datepickerShowing && e.input && e.input.is(":visible") && !e.input.is(":disabled") && e.input[0] != document.activeElement && e.input.focus();
                if (e.yearshtml) {
                    var u = e.yearshtml;
                    setTimeout(function () {
                        u === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), u = e.yearshtml = null
                    }, 0)
                }
            },
            _getBorders: function (e) {
                var t = function (e) {
                    return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[e] || e
                };
                return [parseFloat(t(e.css("border-left-width"))), parseFloat(t(e.css("border-top-width")))]
            },
            _checkOffset: function (e, t, n) {
                var r = e.dpDiv.outerWidth(),
                    i = e.dpDiv.outerHeight(),
                    s = e.input ? e.input.outerWidth() : 0,
                    o = e.input ? e.input.outerHeight() : 0,
                    u = document.documentElement.clientWidth + (n ? 0 : $(document).scrollLeft()),
                    a = document.documentElement.clientHeight + (n ? 0 : $(document).scrollTop());
                return t.left -= this._get(e, "isRTL") ? r - s : 0, t.left -= n && t.left == e.input.offset().left ? $(document).scrollLeft() : 0, t.top -= n && t.top == e.input.offset().top + o ? $(document).scrollTop() : 0, t.left -= Math.min(t.left, t.left + r > u && u > r ? Math.abs(t.left + r - u) : 0), t.top -= Math.min(t.top, t.top + i > a && a > i ? Math.abs(i + o) : 0), t
            },
            _findPos: function (e) {
                var t = this._getInst(e),
                    n = this._get(t, "isRTL");
                while (e && (e.type == "hidden" || e.nodeType != 1 || $.expr.filters.hidden(e))) e = e[n ? "previousSibling" : "nextSibling"];
                var r = $(e).offset();
                return [r.left, r.top]
            },
            _hideDatepicker: function (e) {
                var t = this._curInst;
                if (!t || e && t != $.data(e, PROP_NAME)) return;
                if (this._datepickerShowing) {
                    var n = this._get(t, "showAnim"),
                        r = this._get(t, "duration"),
                        i = function () {
                            $.datepicker._tidyDialog(t)
                        };
                    $.effects && $.effects[n] ? t.dpDiv.hide(n, $.datepicker._get(t, "showOptions"), r, i) : t.dpDiv[n == "slideDown" ? "slideUp" : n == "fadeIn" ? "fadeOut" : "hide"](n ? r : null, i), n || i(), this._datepickerShowing = !1;
                    var s = this._get(t, "onClose");
                    s && s.apply(t.input ? t.input[0] : null, [t.input ? t.input.val() : "", t]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    }), $.blockUI && ($.unblockUI(), $("body").append(this.dpDiv))), this._inDialog = !1
                }
            },
            _tidyDialog: function (e) {
                e.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function (e) {
                if (!$.datepicker._curInst) return;
                var t = $(e.target),
                    n = $.datepicker._getInst(t[0]);
                (t[0].id != $.datepicker._mainDivId && t.parents("#" + $.datepicker._mainDivId).length == 0 && !t.hasClass($.datepicker.markerClassName) && !t.closest("." + $.datepicker._triggerClass).length && $.datepicker._datepickerShowing && (!$.datepicker._inDialog || !$.blockUI) || t.hasClass($.datepicker.markerClassName) && $.datepicker._curInst != n) && $.datepicker._hideDatepicker()
            },
            _adjustDate: function (e, t, n) {
                var r = $(e),
                    i = this._getInst(r[0]);
                if (this._isDisabledDatepicker(r[0])) return;
                this._adjustInstDate(i, t + (n == "M" ? this._get(i, "showCurrentAtPos") : 0), n), this._updateDatepicker(i)
            },
            _gotoToday: function (e) {
                var t = $(e),
                    n = this._getInst(t[0]);
                if (this._get(n, "gotoCurrent") && n.currentDay) n.selectedDay = n.currentDay, n.drawMonth = n.selectedMonth = n.currentMonth, n.drawYear = n.selectedYear = n.currentYear;
                else {
                    var r = new Date;
                    n.selectedDay = r.getDate(), n.drawMonth = n.selectedMonth = r.getMonth(), n.drawYear = n.selectedYear = r.getFullYear()
                }
                this._notifyChange(n), this._adjustDate(t)
            },
            _selectMonthYear: function (e, t, n) {
                var r = $(e),
                    i = this._getInst(r[0]);
                i["selected" + (n == "M" ? "Month" : "Year")] = i["draw" + (n == "M" ? "Month" : "Year")] = parseInt(t.options[t.selectedIndex].value, 10), this._notifyChange(i), this._adjustDate(r)
            },
            _selectDay: function (e, t, n, r) {
                var i = $(e);
                if ($(r).hasClass(this._unselectableClass) || this._isDisabledDatepicker(i[0])) return;
                var s = this._getInst(i[0]);
                s.selectedDay = s.currentDay = $("a", r).html(), s.selectedMonth = s.currentMonth = t, s.selectedYear = s.currentYear = n, this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear))
            },
            _clearDate: function (e) {
                var t = $(e),
                    n = this._getInst(t[0]);
                this._selectDate(t, "")
            },
            _selectDate: function (e, t) {
                var n = $(e),
                    r = this._getInst(n[0]);
                t = t != null ? t : this._formatDate(r), r.input && r.input.val(t), this._updateAlternate(r);
                var i = this._get(r, "onSelect");
                i ? i.apply(r.input ? r.input[0] : null, [t, r]) : r.input && r.input.trigger("change"), r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], typeof r.input[0] != "object" && r.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function (e) {
                var t = this._get(e, "altField");
                if (t) {
                    var n = this._get(e, "altFormat") || this._get(e, "dateFormat"),
                        r = this._getDate(e),
                        i = this.formatDate(n, r, this._getFormatConfig(e));
                    $(t).each(function () {
                        $(this).val(i)
                    })
                }
            },
            noWeekends: function (e) {
                var t = e.getDay();
                return [t > 0 && t < 6, ""]
            },
            iso8601Week: function (e) {
                var t = new Date(e.getTime());
                t.setDate(t.getDate() + 4 - (t.getDay() || 7));
                var n = t.getTime();
                return t.setMonth(0), t.setDate(1), Math.floor(Math.round((n - t) / 864e5) / 7) + 1
            },
            parseDate: function (e, t, n) {
                if (e == null || t == null) throw "Invalid arguments";
                t = typeof t == "object" ? t.toString() : t + "";
                if (t == "") return null;
                var r = (n ? n.shortYearCutoff : null) || this._defaults.shortYearCutoff;
                r = typeof r != "string" ? r : (new Date).getFullYear() % 100 + parseInt(r, 10);
                var i = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    s = (n ? n.dayNames : null) || this._defaults.dayNames,
                    o = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    u = (n ? n.monthNames : null) || this._defaults.monthNames,
                    a = -1,
                    f = -1,
                    l = -1,
                    c = -1,
                    h = !1,
                    p = function (t) {
                        var n = y + 1 < e.length && e.charAt(y + 1) == t;
                        return n && y++, n
                    }, d = function (e) {
                        var n = p(e),
                            r = e == "@" ? 14 : e == "!" ? 20 : e == "y" && n ? 4 : e == "o" ? 3 : 2,
                            i = new RegExp("^\\d{1," + r + "}"),
                            s = t.substring(g).match(i);
                        if (!s) throw "Missing number at position " + g;
                        return g += s[0].length, parseInt(s[0], 10)
                    }, v = function (e, n, r) {
                        var i = $.map(p(e) ? r : n, function (e, t) {
                                return [[t, e]]
                            }).sort(function (e, t) {
                                    return -(e[1].length - t[1].length)
                                }),
                            s = -1;
                        $.each(i, function (e, n) {
                            var r = n[1];
                            if (t.substr(g, r.length).toLowerCase() == r.toLowerCase()) return s = n[0], g += r.length, !1
                        });
                        if (s != -1) return s + 1;
                        throw "Unknown name at position " + g
                    }, m = function () {
                        if (t.charAt(g) != e.charAt(y)) throw "Unexpected literal at position " + g;
                        g++
                    }, g = 0;
                for (var y = 0; y < e.length; y++)
                    if (h) e.charAt(y) == "'" && !p("'") ? h = !1 : m();
                    else switch (e.charAt(y)) {
                        case "d":
                            l = d("d");
                            break;
                        case "D":
                            v("D", i, s);
                            break;
                        case "o":
                            c = d("o");
                            break;
                        case "m":
                            f = d("m");
                            break;
                        case "M":
                            f = v("M", o, u);
                            break;
                        case "y":
                            a = d("y");
                            break;
                        case "@":
                            var b = new Date(d("@"));
                            a = b.getFullYear(), f = b.getMonth() + 1, l = b.getDate();
                            break;
                        case "!":
                            var b = new Date((d("!") - this._ticksTo1970) / 1e4);
                            a = b.getFullYear(), f = b.getMonth() + 1, l = b.getDate();
                            break;
                        case "'":
                            p("'") ? m() : h = !0;
                            break;
                        default:
                            m()
                    }
                if (g < t.length) throw "Extra/unparsed characters found in date: " + t.substring(g);
                a == -1 ? a = (new Date).getFullYear() : a < 100 && (a += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (a <= r ? 0 : -100));
                if (c > -1) {
                    f = 1, l = c;
                    do {
                        var w = this._getDaysInMonth(a, f - 1);
                        if (l <= w) break;
                        f++, l -= w
                    } while (!0)
                }
                var b = this._daylightSavingAdjust(new Date(a, f - 1, l));
                if (b.getFullYear() != a || b.getMonth() + 1 != f || b.getDate() != l) throw "Invalid date";
                return b
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 1e7,
            formatDate: function (e, t, n) {
                if (!t) return "";
                var r = (n ? n.dayNamesShort : null) || this._defaults.dayNamesShort,
                    i = (n ? n.dayNames : null) || this._defaults.dayNames,
                    s = (n ? n.monthNamesShort : null) || this._defaults.monthNamesShort,
                    o = (n ? n.monthNames : null) || this._defaults.monthNames,
                    u = function (t) {
                        var n = h + 1 < e.length && e.charAt(h + 1) == t;
                        return n && h++, n
                    }, a = function (e, t, n) {
                        var r = "" + t;
                        if (u(e))
                            while (r.length < n) r = "0" + r;
                        return r
                    }, f = function (e, t, n, r) {
                        return u(e) ? r[t] : n[t]
                    }, l = "",
                    c = !1;
                if (t)
                    for (var h = 0; h < e.length; h++)
                        if (c) e.charAt(h) == "'" && !u("'") ? c = !1 : l += e.charAt(h);
                        else switch (e.charAt(h)) {
                            case "d":
                                l += a("d", t.getDate(), 2);
                                break;
                            case "D":
                                l += f("D", t.getDay(), r, i);
                                break;
                            case "o":
                                l += a("o", Math.round(((new Date(t.getFullYear(), t.getMonth(), t.getDate())).getTime() - (new Date(t.getFullYear(), 0, 0)).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                l += a("m", t.getMonth() + 1, 2);
                                break;
                            case "M":
                                l += f("M", t.getMonth(), s, o);
                                break;
                            case "y":
                                l += u("y") ? t.getFullYear() : (t.getYear() % 100 < 10 ? "0" : "") + t.getYear() % 100;
                                break;
                            case "@":
                                l += t.getTime();
                                break;
                            case "!":
                                l += t.getTime() * 1e4 + this._ticksTo1970;
                                break;
                            case "'":
                                u("'") ? l += "'" : c = !0;
                                break;
                            default:
                                l += e.charAt(h)
                        }
                return l
            },
            _possibleChars: function (e) {
                var t = "",
                    n = !1,
                    r = function (t) {
                        var n = i + 1 < e.length && e.charAt(i + 1) == t;
                        return n && i++, n
                    };
                for (var i = 0; i < e.length; i++)
                    if (n) e.charAt(i) == "'" && !r("'") ? n = !1 : t += e.charAt(i);
                    else switch (e.charAt(i)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            t += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            r("'") ? t += "'" : n = !0;
                            break;
                        default:
                            t += e.charAt(i)
                    }
                return t
            },
            _get: function (e, t) {
                return e.settings[t] !== undefined ? e.settings[t] : this._defaults[t]
            },
            _setDateFromField: function (e, t) {
                if (e.input.val() == e.lastVal) return;
                var n = this._get(e, "dateFormat"),
                    r = e.lastVal = e.input ? e.input.val() : null,
                    i, s;
                i = s = this._getDefaultDate(e);
                var o = this._getFormatConfig(e);
                try {
                    i = this.parseDate(n, r, o) || s
                } catch (u) {
                    this.log(u), r = t ? "" : r
                }
                e.selectedDay = i.getDate(), e.drawMonth = e.selectedMonth = i.getMonth(), e.drawYear = e.selectedYear = i.getFullYear(), e.currentDay = r ? i.getDate() : 0, e.currentMonth = r ? i.getMonth() : 0, e.currentYear = r ? i.getFullYear() : 0, this._adjustInstDate(e)
            },
            _getDefaultDate: function (e) {
                return this._restrictMinMax(e, this._determineDate(e, this._get(e, "defaultDate"), new Date))
            },
            _determineDate: function (e, t, n) {
                var r = function (e) {
                    var t = new Date;
                    return t.setDate(t.getDate() + e), t
                }, i = function (t) {
                    try {
                        return $.datepicker.parseDate($.datepicker._get(e, "dateFormat"), t, $.datepicker._getFormatConfig(e))
                    } catch (n) {}
                    var r = (t.toLowerCase().match(/^c/) ? $.datepicker._getDate(e) : null) || new Date,
                        i = r.getFullYear(),
                        s = r.getMonth(),
                        o = r.getDate(),
                        u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                        a = u.exec(t);
                    while (a) {
                        switch (a[2] || "d") {
                            case "d":
                            case "D":
                                o += parseInt(a[1], 10);
                                break;
                            case "w":
                            case "W":
                                o += parseInt(a[1], 10) * 7;
                                break;
                            case "m":
                            case "M":
                                s += parseInt(a[1], 10), o = Math.min(o, $.datepicker._getDaysInMonth(i, s));
                                break;
                            case "y":
                            case "Y":
                                i += parseInt(a[1], 10), o = Math.min(o, $.datepicker._getDaysInMonth(i, s))
                        }
                        a = u.exec(t)
                    }
                    return new Date(i, s, o)
                }, s = t == null || t === "" ? n : typeof t == "string" ? i(t) : typeof t == "number" ? isNaN(t) ? n : r(t) : new Date(t.getTime());
                return s = s && s.toString() == "Invalid Date" ? n : s, s && (s.setHours(0), s.setMinutes(0), s.setSeconds(0), s.setMilliseconds(0)), this._daylightSavingAdjust(s)
            },
            _daylightSavingAdjust: function (e) {
                return e ? (e.setHours(e.getHours() > 12 ? e.getHours() + 2 : 0), e) : null
            },
            _setDate: function (e, t, n) {
                var r = !t,
                    i = e.selectedMonth,
                    s = e.selectedYear,
                    o = this._restrictMinMax(e, this._determineDate(e, t, new Date));
                e.selectedDay = e.currentDay = o.getDate(), e.drawMonth = e.selectedMonth = e.currentMonth = o.getMonth(), e.drawYear = e.selectedYear = e.currentYear = o.getFullYear(), (i != e.selectedMonth || s != e.selectedYear) && !n && this._notifyChange(e), this._adjustInstDate(e), e.input && e.input.val(r ? "" : this._formatDate(e))
            },
            _getDate: function (e) {
                var t = !e.currentYear || e.input && e.input.val() == "" ? null : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return t
            },
            _attachHandlers: function (e) {
                var t = this._get(e, "stepMonths"),
                    n = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function () {
                    var e = {
                        prev: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(n, -t, "M")
                        },
                        next: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._adjustDate(n, +t, "M")
                        },
                        hide: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._hideDatepicker()
                        },
                        today: function () {
                            window["DP_jQuery_" + dpuuid].datepicker._gotoToday(n)
                        },
                        selectDay: function () {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function () {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(n, this, "M"), !1
                        },
                        selectYear: function () {
                            return window["DP_jQuery_" + dpuuid].datepicker._selectMonthYear(n, this, "Y"), !1
                        }
                    };
                    $(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function (e) {
                var t = new Date;
                t = this._daylightSavingAdjust(new Date(t.getFullYear(), t.getMonth(), t.getDate()));
                var n = this._get(e, "isRTL"),
                    r = this._get(e, "showButtonPanel"),
                    i = this._get(e, "hideIfNoPrevNext"),
                    s = this._get(e, "navigationAsDateFormat"),
                    o = this._getNumberOfMonths(e),
                    u = this._get(e, "showCurrentAtPos"),
                    a = this._get(e, "stepMonths"),
                    f = o[0] != 1 || o[1] != 1,
                    l = this._daylightSavingAdjust(e.currentDay ? new Date(e.currentYear, e.currentMonth, e.currentDay) : new Date(9999, 9, 9)),
                    c = this._getMinMaxDate(e, "min"),
                    h = this._getMinMaxDate(e, "max"),
                    p = e.drawMonth - u,
                    d = e.drawYear;
                p < 0 && (p += 12, d--);
                if (h) {
                    var v = this._daylightSavingAdjust(new Date(h.getFullYear(), h.getMonth() - o[0] * o[1] + 1, h.getDate()));
                    v = c && v < c ? c : v;
                    while (this._daylightSavingAdjust(new Date(d, p, 1)) > v) p--, p < 0 && (p = 11, d--)
                }
                e.drawMonth = p, e.drawYear = d;
                var m = this._get(e, "prevText");
                m = s ? this.formatDate(m, this._daylightSavingAdjust(new Date(d, p - a, 1)), this._getFormatConfig(e)) : m;
                var g = this._canAdjustMonth(e, -1, d, p) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + m + "</span></a>" : i ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + m + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "e" : "w") + '">' + m + "</span></a>",
                    y = this._get(e, "nextText");
                y = s ? this.formatDate(y, this._daylightSavingAdjust(new Date(d, p + a, 1)), this._getFormatConfig(e)) : y;
                var b = this._canAdjustMonth(e, 1, d, p) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + y + "</span></a>" : i ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + y + '"><span class="ui-icon ui-icon-circle-triangle-' + (n ? "w" : "e") + '">' + y + "</span></a>",
                    w = this._get(e, "currentText"),
                    E = this._get(e, "gotoCurrent") && e.currentDay ? l : t;
                w = s ? this.formatDate(w, E, this._getFormatConfig(e)) : w;
                var S = e.inline ? "" : '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(e, "closeText") + "</button>",
                    x = r ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (n ? S : "") + (this._isInRange(e, E) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + w + "</button>" : "") + (n ? "" : S) + "</div>" : "",
                    T = parseInt(this._get(e, "firstDay"), 10);
                T = isNaN(T) ? 0 : T;
                var N = this._get(e, "showWeek"),
                    C = this._get(e, "dayNames"),
                    k = this._get(e, "dayNamesShort"),
                    L = this._get(e, "dayNamesMin"),
                    A = this._get(e, "monthNames"),
                    O = this._get(e, "monthNamesShort"),
                    M = this._get(e, "beforeShowDay"),
                    _ = this._get(e, "showOtherMonths"),
                    D = this._get(e, "selectOtherMonths"),
                    P = this._get(e, "calculateWeek") || this.iso8601Week,
                    H = this._getDefaultDate(e),
                    B = "";
                for (var j = 0; j < o[0]; j++) {
                    var F = "";
                    this.maxRows = 4;
                    for (var I = 0; I < o[1]; I++) {
                        var q = this._daylightSavingAdjust(new Date(d, p, e.selectedDay)),
                            R = " ui-corner-all",
                            U = "";
                        if (f) {
                            U += '<div class="ui-datepicker-group';
                            if (o[1] > 1) switch (I) {
                                case 0:
                                    U += " ui-datepicker-group-first", R = " ui-corner-" + (n ? "right" : "left");
                                    break;
                                case o[1] - 1:
                                    U += " ui-datepicker-group-last", R = " ui-corner-" + (n ? "left" : "right");
                                    break;
                                default:
                                    U += " ui-datepicker-group-middle", R = ""
                            }
                            U += '">'
                        }
                        U += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + R + '">' + (/all|left/.test(R) && j == 0 ? n ? b : g : "") + (/all|right/.test(R) && j == 0 ? n ? g : b : "") + this._generateMonthYearHeader(e, p, d, c, h, j > 0 || I > 0, A, O) + '</div><table class="ui-datepicker-calendar"><thead>' + "<tr>";
                        var z = N ? '<th class="ui-datepicker-week-col">' + this._get(e, "weekHeader") + "</th>" : "";
                        for (var W = 0; W < 7; W++) {
                            var X = (W + T) % 7;
                            z += "<th" + ((W + T + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + ">" + '<span title="' + C[X] + '">' + L[X] + "</span></th>"
                        }
                        U += z + "</tr></thead><tbody>";
                        var V = this._getDaysInMonth(d, p);
                        d == e.selectedYear && p == e.selectedMonth && (e.selectedDay = Math.min(e.selectedDay, V));
                        var J = (this._getFirstDayOfMonth(d, p) - T + 7) % 7,
                            K = Math.ceil((J + V) / 7),
                            Q = f ? this.maxRows > K ? this.maxRows : K : K;
                        this.maxRows = Q;
                        var G = this._daylightSavingAdjust(new Date(d, p, 1 - J));
                        for (var Y = 0; Y < Q; Y++) {
                            U += "<tr>";
                            var Z = N ? '<td class="ui-datepicker-week-col">' + this._get(e, "calculateWeek")(G) + "</td>" : "";
                            for (var W = 0; W < 7; W++) {
                                var et = M ? M.apply(e.input ? e.input[0] : null, [G]) : [!0, ""],
                                    tt = G.getMonth() != p,
                                    nt = tt && !D || !et[0] || c && G < c || h && G > h;
                                Z += '<td class="' + ((W + T + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (tt ? " ui-datepicker-other-month" : "") + (G.getTime() == q.getTime() && p == e.selectedMonth && e._keyEvent || H.getTime() == G.getTime() && H.getTime() == q.getTime() ? " " + this._dayOverClass : "") + (nt ? " " + this._unselectableClass + " ui-state-disabled" : "") + (tt && !_ ? "" : " " + et[1] + (G.getTime() == l.getTime() ? " " + this._currentClass : "") + (G.getTime() == t.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!tt || _) && et[2] ? ' title="' + et[2] + '"' : "") + (nt ? "" : ' data-handler="selectDay" data-event="click" data-month="' + G.getMonth() + '" data-year="' + G.getFullYear() + '"') + ">" + (tt && !_ ? "&#xa0;" : nt ? '<span class="ui-state-default">' + G.getDate() + "</span>" : '<a class="ui-state-default' + (G.getTime() == t.getTime() ? " ui-state-highlight" : "") + (G.getTime() == l.getTime() ? " ui-state-active" : "") + (tt ? " ui-priority-secondary" : "") + '" href="#">' + G.getDate() + "</a>") + "</td>", G.setDate(G.getDate() + 1), G = this._daylightSavingAdjust(G)
                            }
                            U += Z + "</tr>"
                        }
                        p++, p > 11 && (p = 0, d++), U += "</tbody></table>" + (f ? "</div>" + (o[0] > 0 && I == o[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : ""), F += U
                    }
                    B += F
                }
                return B += x + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !e.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : ""), e._keyEvent = !1, B
            },
            _generateMonthYearHeader: function (e, t, n, r, i, s, o, u) {
                var a = this._get(e, "changeMonth"),
                    f = this._get(e, "changeYear"),
                    l = this._get(e, "showMonthAfterYear"),
                    c = '<div class="ui-datepicker-title">',
                    h = "";
                if (s || !a) h += '<span class="ui-datepicker-month">' + o[t] + "</span>";
                else {
                    var p = r && r.getFullYear() == n,
                        d = i && i.getFullYear() == n;
                    h += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                    for (var v = 0; v < 12; v++)(!p || v >= r.getMonth()) && (!d || v <= i.getMonth()) && (h += '<option value="' + v + '"' + (v == t ? ' selected="selected"' : "") + ">" + u[v] + "</option>");
                    h += "</select>"
                }
                l || (c += h + (s || !a || !f ? "&#xa0;" : ""));
                if (!e.yearshtml) {
                    e.yearshtml = "";
                    if (s || !f) c += '<span class="ui-datepicker-year">' + n + "</span>";
                    else {
                        var m = this._get(e, "yearRange").split(":"),
                            g = (new Date).getFullYear(),
                            y = function (e) {
                                var t = e.match(/c[+-].*/) ? n + parseInt(e.substring(1), 10) : e.match(/[+-].*/) ? g + parseInt(e, 10) : parseInt(e, 10);
                                return isNaN(t) ? g : t
                            }, b = y(m[0]),
                            w = Math.max(b, y(m[1] || ""));
                        b = r ? Math.max(b, r.getFullYear()) : b, w = i ? Math.min(w, i.getFullYear()) : w, e.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
                        for (; b <= w; b++) e.yearshtml += '<option value="' + b + '"' + (b == n ? ' selected="selected"' : "") + ">" + b + "</option>";
                        e.yearshtml += "</select>", c += e.yearshtml, e.yearshtml = null
                    }
                }
                return c += this._get(e, "yearSuffix"), l && (c += (s || !a || !f ? "&#xa0;" : "") + h), c += "</div>", c
            },
            _adjustInstDate: function (e, t, n) {
                var r = e.drawYear + (n == "Y" ? t : 0),
                    i = e.drawMonth + (n == "M" ? t : 0),
                    s = Math.min(e.selectedDay, this._getDaysInMonth(r, i)) + (n == "D" ? t : 0),
                    o = this._restrictMinMax(e, this._daylightSavingAdjust(new Date(r, i, s)));
                e.selectedDay = o.getDate(), e.drawMonth = e.selectedMonth = o.getMonth(), e.drawYear = e.selectedYear = o.getFullYear(), (n == "M" || n == "Y") && this._notifyChange(e)
            },
            _restrictMinMax: function (e, t) {
                var n = this._getMinMaxDate(e, "min"),
                    r = this._getMinMaxDate(e, "max"),
                    i = n && t < n ? n : t;
                return i = r && i > r ? r : i, i
            },
            _notifyChange: function (e) {
                var t = this._get(e, "onChangeMonthYear");
                t && t.apply(e.input ? e.input[0] : null, [e.selectedYear, e.selectedMonth + 1, e])
            },
            _getNumberOfMonths: function (e) {
                var t = this._get(e, "numberOfMonths");
                return t == null ? [1, 1] : typeof t == "number" ? [1, t] : t
            },
            _getMinMaxDate: function (e, t) {
                return this._determineDate(e, this._get(e, t + "Date"), null)
            },
            _getDaysInMonth: function (e, t) {
                return 32 - this._daylightSavingAdjust(new Date(e, t, 32)).getDate()
            },
            _getFirstDayOfMonth: function (e, t) {
                return (new Date(e, t, 1)).getDay()
            },
            _canAdjustMonth: function (e, t, n, r) {
                var i = this._getNumberOfMonths(e),
                    s = this._daylightSavingAdjust(new Date(n, r + (t < 0 ? t : i[0] * i[1]), 1));
                return t < 0 && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(e, s)
            },
            _isInRange: function (e, t) {
                var n = this._getMinMaxDate(e, "min"),
                    r = this._getMinMaxDate(e, "max");
                return (!n || t.getTime() >= n.getTime()) && (!r || t.getTime() <= r.getTime())
            },
            _getFormatConfig: function (e) {
                var t = this._get(e, "shortYearCutoff");
                return t = typeof t != "string" ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
                    shortYearCutoff: t,
                    dayNamesShort: this._get(e, "dayNamesShort"),
                    dayNames: this._get(e, "dayNames"),
                    monthNamesShort: this._get(e, "monthNamesShort"),
                    monthNames: this._get(e, "monthNames")
                }
            },
            _formatDate: function (e, t, n, r) {
                t || (e.currentDay = e.selectedDay, e.currentMonth = e.selectedMonth, e.currentYear = e.selectedYear);
                var i = t ? typeof t == "object" ? t : this._daylightSavingAdjust(new Date(r, n, t)) : this._daylightSavingAdjust(new Date(e.currentYear, e.currentMonth, e.currentDay));
                return this.formatDate(this._get(e, "dateFormat"), i, this._getFormatConfig(e))
            }
        }), $.fn.datepicker = function (e) {
            if (!this.length) return this;
            $.datepicker.initialized || ($(document).mousedown($.datepicker
                ._checkExternalClick).find("body").append($.datepicker.dpDiv), $.datepicker.initialized = !0);
            var t = Array.prototype.slice.call(arguments, 1);
            return typeof e != "string" || e != "isDisabled" && e != "getDate" && e != "widget" ? e == "option" && arguments.length == 2 && typeof arguments[1] == "string" ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t)) : this.each(function () {
                typeof e == "string" ? $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this].concat(t)) : $.datepicker._attachDatepicker(this, e)
            }) : $.datepicker["_" + e + "Datepicker"].apply($.datepicker, [this[0]].concat(t))
        }, $.datepicker = new Datepicker, $.datepicker.initialized = !1, $.datepicker.uuid = (new Date).getTime(), $.datepicker.version = "1.8.23", window["DP_jQuery_" + dpuuid] = $
    }(jQuery),
    function (e, t) {
        var n = "ui-dialog ui-widget ui-widget-content ui-corner-all ",
            r = {
                buttons: !0,
                height: !0,
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0,
                width: !0
            }, i = {
                maxHeight: !0,
                maxWidth: !0,
                minHeight: !0,
                minWidth: !0
            };
        e.widget("ui.dialog", {
            options: {
                autoOpen: !0,
                buttons: {},
                closeOnEscape: !0,
                closeText: "close",
                dialogClass: "",
                draggable: !0,
                hide: null,
                height: "auto",
                maxHeight: !1,
                maxWidth: !1,
                minHeight: 150,
                minWidth: 150,
                modal: !1,
                position: {
                    my: "center",
                    at: "center",
                    collision: "fit",
                    using: function (t) {
                        var n = e(this).css(t).offset().top;
                        n < 0 && e(this).css("top", t.top - n)
                    }
                },
                resizable: !0,
                show: null,
                stack: !0,
                title: "",
                width: 300,
                zIndex: 1e3
            },
            _create: function () {
                this.originalTitle = this.element.attr("title"), typeof this.originalTitle != "string" && (this.originalTitle = ""), this.options.title = this.options.title || this.originalTitle;
                var t = this,
                    r = t.options,
                    i = r.title || "&#160;",
                    s = e.ui.dialog.getTitleId(t.element),
                    o = (t.uiDialog = e("<div></div>")).appendTo(document.body).hide().addClass(n + r.dialogClass).css({
                        zIndex: r.zIndex
                    }).attr("tabIndex", -1).css("outline", 0).keydown(function (n) {
                            r.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
                        }).attr({
                            role: "dialog",
                            "aria-labelledby": s
                        }).mousedown(function (e) {
                            t.moveToTop(!1, e)
                        }),
                    u = t.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(o),
                    a = (t.uiDialogTitlebar = e("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(o),
                    f = e('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                        f.addClass("ui-state-hover")
                    }, function () {
                        f.removeClass("ui-state-hover")
                    }).focus(function () {
                            f.addClass("ui-state-focus")
                        }).blur(function () {
                            f.removeClass("ui-state-focus")
                        }).click(function (e) {
                            return t.close(e), !1
                        }).appendTo(a),
                    l = (t.uiDialogTitlebarCloseText = e("<span></span>")).addClass("ui-icon ui-icon-closethick").text(r.closeText).appendTo(f),
                    c = e("<span></span>").addClass("ui-dialog-title").attr("id", s).html(i).prependTo(a);
                e.isFunction(r.beforeclose) && !e.isFunction(r.beforeClose) && (r.beforeClose = r.beforeclose), a.find("*").add(a).disableSelection(), r.draggable && e.fn.draggable && t._makeDraggable(), r.resizable && e.fn.resizable && t._makeResizable(), t._createButtons(r.buttons), t._isOpen = !1, e.fn.bgiframe && o.bgiframe()
            },
            _init: function () {
                this.options.autoOpen && this.open()
            },
            destroy: function () {
                var e = this;
                return e.overlay && e.overlay.destroy(), e.uiDialog.hide(), e.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"), e.uiDialog.remove(), e.originalTitle && e.element.attr("title", e.originalTitle), e
            },
            widget: function () {
                return this.uiDialog
            },
            close: function (t) {
                var n = this,
                    r, i;
                if (!1 === n._trigger("beforeClose", t)) return;
                return n.overlay && n.overlay.destroy(), n.uiDialog.unbind("keypress.ui-dialog"), n._isOpen = !1, n.options.hide ? n.uiDialog.hide(n.options.hide, function () {
                    n._trigger("close", t)
                }) : (n.uiDialog.hide(), n._trigger("close", t)), e.ui.dialog.overlay.resize(), n.options.modal && (r = 0, e(".ui-dialog").each(function () {
                    this !== n.uiDialog[0] && (i = e(this).css("z-index"), isNaN(i) || (r = Math.max(r, i)))
                }), e.ui.dialog.maxZ = r), n
            },
            isOpen: function () {
                return this._isOpen
            },
            moveToTop: function (t, n) {
                var r = this,
                    i = r.options,
                    s;
                return i.modal && !t || !i.stack && !i.modal ? r._trigger("focus", n) : (i.zIndex > e.ui.dialog.maxZ && (e.ui.dialog.maxZ = i.zIndex), r.overlay && (e.ui.dialog.maxZ += 1, r.overlay.$el.css("z-index", e.ui.dialog.overlay.maxZ = e.ui.dialog.maxZ)), s = {
                    scrollTop: r.element.scrollTop(),
                    scrollLeft: r.element.scrollLeft()
                }, e.ui.dialog.maxZ += 1, r.uiDialog.css("z-index", e.ui.dialog.maxZ), r.element.attr(s), r._trigger("focus", n), r)
            },
            open: function () {
                if (this._isOpen) return;
                var t = this,
                    n = t.options,
                    r = t.uiDialog;
                return t.overlay = n.modal ? new e.ui.dialog.overlay(t) : null, t._size(), t._position(n.position), r.show(n.show), t.moveToTop(!0), n.modal && r.bind("keydown.ui-dialog", function (t) {
                    if (t.keyCode !== e.ui.keyCode.TAB) return;
                    var n = e(":tabbable", this),
                        r = n.filter(":first"),
                        i = n.filter(":last");
                    if (t.target === i[0] && !t.shiftKey) return r.focus(1), !1;
                    if (t.target === r[0] && t.shiftKey) return i.focus(1), !1
                }), e(t.element.find(":tabbable").get().concat(r.find(".ui-dialog-buttonpane :tabbable").get().concat(r.get()))).eq(0).focus(), t._isOpen = !0, t._trigger("open"), t
            },
            _createButtons: function (t) {
                var n = this,
                    r = !1,
                    i = e("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                    s = e("<div></div>").addClass("ui-dialog-buttonset").appendTo(i);
                n.uiDialog.find(".ui-dialog-buttonpane").remove(), typeof t == "object" && t !== null && e.each(t, function () {
                    return !(r = !0)
                }), r && (e.each(t, function (t, r) {
                    r = e.isFunction(r) ? {
                        click: r,
                        text: t
                    } : r;
                    var i = e('<button type="button"></button>').click(function () {
                        r.click.apply(n.element[0], arguments)
                    }).appendTo(s);
                    e.each(r, function (e, t) {
                        if (e === "click") return;
                        e in i ? i[e](t) : i.attr(e, t)
                    }), e.fn.button && i.button()
                }), i.appendTo(n.uiDialog))
            },
            _makeDraggable: function () {
                function s(e) {
                    return {
                        position: e.position,
                        offset: e.offset
                    }
                }
                var t = this,
                    n = t.options,
                    r = e(document),
                    i;
                t.uiDialog.draggable({
                    cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                    handle: ".ui-dialog-titlebar",
                    containment: "document",
                    start: function (r, o) {
                        i = n.height === "auto" ? "auto" : e(this).height(), e(this).height(e(this).height()).addClass("ui-dialog-dragging"), t._trigger("dragStart", r, s(o))
                    },
                    drag: function (e, n) {
                        t._trigger("drag", e, s(n))
                    },
                    stop: function (o, u) {
                        n.position = [u.position.left - r.scrollLeft(), u.position.top - r.scrollTop()], e(this).removeClass("ui-dialog-dragging").height(i), t._trigger("dragStop", o, s(u)), e.ui.dialog.overlay.resize()
                    }
                })
            },
            _makeResizable: function (n) {
                function u(e) {
                    return {
                        originalPosition: e.originalPosition,
                        originalSize: e.originalSize,
                        position: e.position,
                        size: e.size
                    }
                }
                n = n === t ? this.options.resizable : n;
                var r = this,
                    i = r.options,
                    s = r.uiDialog.css("position"),
                    o = typeof n == "string" ? n : "n,e,s,w,se,sw,ne,nw";
                r.uiDialog.resizable({
                    cancel: ".ui-dialog-content",
                    containment: "document",
                    alsoResize: r.element,
                    maxWidth: i.maxWidth,
                    maxHeight: i.maxHeight,
                    minWidth: i.minWidth,
                    minHeight: r._minHeight(),
                    handles: o,
                    start: function (t, n) {
                        e(this).addClass("ui-dialog-resizing"), r._trigger("resizeStart", t, u(n))
                    },
                    resize: function (e, t) {
                        r._trigger("resize", e, u(t))
                    },
                    stop: function (t, n) {
                        e(this).removeClass("ui-dialog-resizing"), i.height = e(this).height(), i.width = e(this).width(), r._trigger("resizeStop", t, u(n)), e.ui.dialog.overlay.resize()
                    }
                }).css("position", s).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
            },
            _minHeight: function () {
                var e = this.options;
                return e.height === "auto" ? e.minHeight : Math.min(e.minHeight, e.height)
            },
            _position: function (t) {
                var n = [],
                    r = [0, 0],
                    i;
                if (t) {
                    if (typeof t == "string" || typeof t == "object" && "0" in t) n = t.split ? t.split(" ") : [t[0], t[1]], n.length === 1 && (n[1] = n[0]), e.each(["left", "top"], function (e, t) {
                        +n[e] === n[e] && (r[e] = n[e], n[e] = t)
                    }), t = {
                        my: n.join(" "),
                        at: n.join(" "),
                        offset: r.join(" ")
                    };
                    t = e.extend({}, e.ui.dialog.prototype.options.position, t)
                } else t = e.ui.dialog.prototype.options.position;
                i = this.uiDialog.is(":visible"), i || this.uiDialog.show(), this.uiDialog.css({
                    top: 0,
                    left: 0
                }).position(e.extend({
                    of: window
                }, t)), i || this.uiDialog.hide()
            },
            _setOptions: function (t) {
                var n = this,
                    s = {}, o = !1;
                e.each(t, function (e, t) {
                    n._setOption(e, t), e in r && (o = !0), e in i && (s[e] = t)
                }), o && this._size(), this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", s)
            },
            _setOption: function (t, r) {
                var i = this,
                    s = i.uiDialog;
                switch (t) {
                    case "beforeclose":
                        t = "beforeClose";
                        break;
                    case "buttons":
                        i._createButtons(r);
                        break;
                    case "closeText":
                        i.uiDialogTitlebarCloseText.text("" + r);
                        break;
                    case "dialogClass":
                        s.removeClass(i.options.dialogClass).addClass(n + r);
                        break;
                    case "disabled":
                        r ? s.addClass("ui-dialog-disabled") : s.removeClass("ui-dialog-disabled");
                        break;
                    case "draggable":
                        var o = s.is(":data(draggable)");
                        o && !r && s.draggable("destroy"), !o && r && i._makeDraggable();
                        break;
                    case "position":
                        i._position(r);
                        break;
                    case "resizable":
                        var u = s.is(":data(resizable)");
                        u && !r && s.resizable("destroy"), u && typeof r == "string" && s.resizable("option", "handles", r), !u && r !== !1 && i._makeResizable(r);
                        break;
                    case "title":
                        e(".ui-dialog-title", i.uiDialogTitlebar).html("" + (r || "&#160;"))
                }
                e.Widget.prototype._setOption.apply(i, arguments)
            },
            _size: function () {
                var t = this.options,
                    n, r, i = this.uiDialog.is(":visible");
                this.element.show().css({
                    width: "auto",
                    minHeight: 0,
                    height: 0
                }), t.minWidth > t.width && (t.width = t.minWidth), n = this.uiDialog.css({
                    height: "auto",
                    width: t.width
                }).height(), r = Math.max(0, t.minHeight - n);
                if (t.height === "auto")
                    if (e.support.minHeight) this.element.css({
                        minHeight: r,
                        height: "auto"
                    });
                    else {
                        this.uiDialog.show();
                        var s = this.element.css("height", "auto").height();
                        i || this.uiDialog.hide(), this.element.height(Math.max(s, r))
                    } else this.element.height(Math.max(t.height - n, 0));
                this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
            }
        }), e.extend(e.ui.dialog, {
            version: "1.8.23",
            uuid: 0,
            maxZ: 0,
            getTitleId: function (e) {
                var t = e.attr("id");
                return t || (this.uuid += 1, t = this.uuid), "ui-dialog-title-" + t
            },
            overlay: function (t) {
                this.$el = e.ui.dialog.overlay.create(t)
            }
        }), e.extend(e.ui.dialog.overlay, {
            instances: [],
            oldInstances: [],
            maxZ: 0,
            events: e.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (e) {
                return e + ".dialog-overlay"
            }).join(" "),
            create: function (t) {
                this.instances.length === 0 && (setTimeout(function () {
                    e.ui.dialog.overlay.instances.length && e(document).bind(e.ui.dialog.overlay.events, function (t) {
                        if (e(t.target).zIndex() < e.ui.dialog.overlay.maxZ) return !1
                    })
                }, 1), e(document).bind("keydown.dialog-overlay", function (n) {
                    t.options.closeOnEscape && !n.isDefaultPrevented() && n.keyCode && n.keyCode === e.ui.keyCode.ESCAPE && (t.close(n), n.preventDefault())
                }), e(window).bind("resize.dialog-overlay", e.ui.dialog.overlay.resize));
                var n = (this.oldInstances.pop() || e("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                    width: this.width(),
                    height: this.height()
                });
                return e.fn.bgiframe && n.bgiframe(), this.instances.push(n), n
            },
            destroy: function (t) {
                var n = e.inArray(t, this.instances);
                n != -1 && this.oldInstances.push(this.instances.splice(n, 1)[0]), this.instances.length === 0 && e([document, window]).unbind(".dialog-overlay"), t.remove();
                var r = 0;
                e.each(this.instances, function () {
                    r = Math.max(r, this.css("z-index"))
                }), this.maxZ = r
            },
            height: function () {
                var t, n;
                return e.browser.msie && e.browser.version < 7 ? (t = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight), n = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight), t < n ? e(window).height() + "px" : t + "px") : e(document).height() + "px"
            },
            width: function () {
                var t, n;
                return e.browser.msie ? (t = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth), n = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth), t < n ? e(window).width() + "px" : t + "px") : e(document).width() + "px"
            },
            resize: function () {
                var t = e([]);
                e.each(e.ui.dialog.overlay.instances, function () {
                    t = t.add(this)
                }), t.css({
                    width: 0,
                    height: 0
                }).css({
                        width: e.ui.dialog.overlay.width(),
                        height: e.ui.dialog.overlay.height()
                    })
            }
        }), e.extend(e.ui.dialog.overlay.prototype, {
            destroy: function () {
                e.ui.dialog.overlay.destroy(this.$el)
            }
        })
    }(jQuery),
    function (e, t) {
        e.ui = e.ui || {};
        var n = /left|center|right/,
            r = /top|center|bottom/,
            i = "center",
            s = {}, o = e.fn.position,
            u = e.fn.offset;
        e.fn.position = function (t) {
            if (!t || !t.of) return o.apply(this, arguments);
            t = e.extend({}, t);
            var u = e(t.of),
                a = u[0],
                f = (t.collision || "flip").split(" "),
                l = t.offset ? t.offset.split(" ") : [0, 0],
                c, h, p;
            return a.nodeType === 9 ? (c = u.width(), h = u.height(), p = {
                top: 0,
                left: 0
            }) : a.setTimeout ? (c = u.width(), h = u.height(), p = {
                top: u.scrollTop(),
                left: u.scrollLeft()
            }) : a.preventDefault ? (t.at = "left top", c = h = 0, p = {
                top: t.of.pageY,
                left: t.of.pageX
            }) : (c = u.outerWidth(), h = u.outerHeight(), p = u.offset()), e.each(["my", "at"], function () {
                var e = (t[this] || "").split(" ");
                e.length === 1 && (e = n.test(e[0]) ? e.concat([i]) : r.test(e[0]) ? [i].concat(e) : [i, i]), e[0] = n.test(e[0]) ? e[0] : i, e[1] = r.test(e[1]) ? e[1] : i, t[this] = e
            }), f.length === 1 && (f[1] = f[0]), l[0] = parseInt(l[0], 10) || 0, l.length === 1 && (l[1] = l[0]), l[1] = parseInt(l[1], 10) || 0, t.at[0] === "right" ? p.left += c : t.at[0] === i && (p.left += c / 2), t.at[1] === "bottom" ? p.top += h : t.at[1] === i && (p.top += h / 2), p.left += l[0], p.top += l[1], this.each(function () {
                var n = e(this),
                    r = n.outerWidth(),
                    o = n.outerHeight(),
                    u = parseInt(e.curCSS(this, "marginLeft", !0)) || 0,
                    a = parseInt(e.curCSS(this, "marginTop", !0)) || 0,
                    d = r + u + (parseInt(e.curCSS(this, "marginRight", !0)) || 0),
                    v = o + a + (parseInt(e.curCSS(this, "marginBottom", !0)) || 0),
                    m = e.extend({}, p),
                    g;
                t.my[0] === "right" ? m.left -= r : t.my[0] === i && (m.left -= r / 2), t.my[1] === "bottom" ? m.top -= o : t.my[1] === i && (m.top -= o / 2), s.fractions || (m.left = Math.round(m.left), m.top = Math.round(m.top)), g = {
                    left: m.left - u,
                    top: m.top - a
                }, e.each(["left", "top"], function (n, i) {
                    e.ui.position[f[n]] && e.ui.position[f[n]][i](m, {
                        targetWidth: c,
                        targetHeight: h,
                        elemWidth: r,
                        elemHeight: o,
                        collisionPosition: g,
                        collisionWidth: d,
                        collisionHeight: v,
                        offset: l,
                        my: t.my,
                        at: t.at
                    })
                }), e.fn.bgiframe && n.bgiframe(), n.offset(e.extend(m, {
                    using: t.using
                }))
            })
        }, e.ui.position = {
            fit: {
                left: function (t, n) {
                    var r = e(window),
                        i = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft();
                    t.left = i > 0 ? t.left - i : Math.max(t.left - n.collisionPosition.left, t.left)
                },
                top: function (t, n) {
                    var r = e(window),
                        i = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop();
                    t.top = i > 0 ? t.top - i : Math.max(t.top - n.collisionPosition.top, t.top)
                }
            },
            flip: {
                left: function (t, n) {
                    if (n.at[0] === i) return;
                    var r = e(window),
                        s = n.collisionPosition.left + n.collisionWidth - r.width() - r.scrollLeft(),
                        o = n.my[0] === "left" ? -n.elemWidth : n.my[0] === "right" ? n.elemWidth : 0,
                        u = n.at[0] === "left" ? n.targetWidth : -n.targetWidth,
                        a = -2 * n.offset[0];
                    t.left += n.collisionPosition.left < 0 ? o + u + a : s > 0 ? o + u + a : 0
                },
                top: function (t, n) {
                    if (n.at[1] === i) return;
                    var r = e(window),
                        s = n.collisionPosition.top + n.collisionHeight - r.height() - r.scrollTop(),
                        o = n.my[1] === "top" ? -n.elemHeight : n.my[1] === "bottom" ? n.elemHeight : 0,
                        u = n.at[1] === "top" ? n.targetHeight : -n.targetHeight,
                        a = -2 * n.offset[1];
                    t.top += n.collisionPosition.top < 0 ? o + u + a : s > 0 ? o + u + a : 0
                }
            }
        }, e.offset.setOffset || (e.offset.setOffset = function (t, n) {
            /static/.test(e.curCSS(t, "position")) && (t.style.position = "relative");
            var r = e(t),
                i = r.offset(),
                s = parseInt(e.curCSS(t, "top", !0), 10) || 0,
                o = parseInt(e.curCSS(t, "left", !0), 10) || 0,
                u = {
                    top: n.top - i.top + s,
                    left: n.left - i.left + o
                };
            "using" in n ? n.using.call(t, u) : r.css(u)
        }, e.fn.offset = function (t) {
            var n = this[0];
            return !n || !n.ownerDocument ? null : t ? e.isFunction(t) ? this.each(function (n) {
                e(this).offset(t.call(this, n, e(this).offset()))
            }) : this.each(function () {
                e.offset.setOffset(this, t)
            }) : u.call(this)
        }), e.curCSS || (e.curCSS = e.css),
            function () {
                var t = document.getElementsByTagName("body")[0],
                    n = document.createElement("div"),
                    r, i, o, u, a;
                r = document.createElement(t ? "div" : "body"), o = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, t && e.extend(o, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (var f in o) r.style[f] = o[f];
                r.appendChild(n), i = t || document.documentElement, i.insertBefore(r, i.firstChild), n.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;", u = e(n).offset(function (e, t) {
                    return t
                }).offset(), r.innerHTML = "", i.removeChild(r), a = u.top + u.left + (t ? 2e3 : 0), s.fractions = a > 21 && a < 22
            }()
    }(jQuery),
    function (e, t) {
        e.widget("ui.progressbar", {
            options: {
                value: 0,
                max: 100
            },
            min: 0,
            _create: function () {
                this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                    role: "progressbar",
                    "aria-valuemin": this.min,
                    "aria-valuemax": this.options.max,
                    "aria-valuenow": this._value()
                }), this.valueDiv = e("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this.oldValue = this._value(), this._refreshValue()
            },
            destroy: function () {
                this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove(), e.Widget.prototype.destroy.apply(this, arguments)
            },
            value: function (e) {
                return e === t ? this._value() : (this._setOption("value", e), this)
            },
            _setOption: function (t, n) {
                t === "value" && (this.options.value = n, this._refreshValue(), this._value() === this.options.max && this._trigger("complete")), e.Widget.prototype._setOption.apply(this, arguments)
            },
            _value: function () {
                var e = this.options.value;
                return typeof e != "number" && (e = 0), Math.min(this.options.max, Math.max(this.min, e))
            },
            _percentage: function () {
                return 100 * this._value() / this.options.max
            },
            _refreshValue: function () {
                var e = this.value(),
                    t = this._percentage();
                this.oldValue !== e && (this.oldValue = e, this._trigger("change")), this.valueDiv.toggle(e > this.min).toggleClass("ui-corner-right", e === this.options.max).width(t.toFixed(0) + "%"), this.element.attr("aria-valuenow", e)
            }
        }), e.extend(e.ui.progressbar, {
            version: "1.8.23"
        })
    }(jQuery),
    function (e, t) {
        var n = 5;
        e.widget("ui.slider", e.ui.mouse, {
            widgetEventPrefix: "slide",
            options: {
                animate: !1,
                distance: 0,
                max: 100,
                min: 0,
                orientation: "horizontal",
                range: !1,
                step: 1,
                value: 0,
                values: null
            },
            _create: function () {
                var t = this,
                    r = this.options,
                    i = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                    s = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
                    o = r.values && r.values.length || 1,
                    u = [];
                this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all" + (r.disabled ? " ui-slider-disabled ui-disabled" : "")), this.range = e([]), r.range && (r.range === !0 && (r.values || (r.values = [this._valueMin(), this._valueMin()]), r.values.length && r.values.length !== 2 && (r.values = [r.values[0], r.values[0]])), this.range = e("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header" + (r.range === "min" || r.range === "max" ? " ui-slider-range-" + r.range : "")));
                for (var a = i.length; a < o; a += 1) u.push(s);
                this.handles = i.add(e(u.join("")).appendTo(t.element)), this.handle = this.handles.eq(0), this.handles.add(this.range).filter("a").click(function (e) {
                    e.preventDefault()
                }).hover(function () {
                        r.disabled || e(this).addClass("ui-state-hover")
                    }, function () {
                        e(this).removeClass("ui-state-hover")
                    }).focus(function () {
                        r.disabled ? e(this).blur() : (e(".ui-slider .ui-state-focus").removeClass("ui-state-focus"), e(this).addClass("ui-state-focus"))
                    }).blur(function () {
                        e(this).removeClass("ui-state-focus")
                    }), this.handles.each(function (t) {
                    e(this).data("index.ui-slider-handle", t)
                }), this.handles.keydown(function (r) {
                    var i = e(this).data("index.ui-slider-handle"),
                        s, o, u, a;
                    if (t.options.disabled) return;
                    switch (r.keyCode) {
                        case e.ui.keyCode.HOME:
                        case e.ui.keyCode.END:
                        case e.ui.keyCode.PAGE_UP:
                        case e.ui.keyCode.PAGE_DOWN:
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            r.preventDefault();
                            if (!t._keySliding) {
                                t._keySliding = !0, e(this).addClass("ui-state-active"), s = t._start(r, i);
                                if (s === !1) return
                            }
                    }
                    a = t.options.step, t.options.values && t.options.values.length ? o = u = t.values(i) : o = u = t.value();
                    switch (r.keyCode) {
                        case e.ui.keyCode.HOME:
                            u = t._valueMin();
                            break;
                        case e.ui.keyCode.END:
                            u = t._valueMax();
                            break;
                        case e.ui.keyCode.PAGE_UP:
                            u = t._trimAlignValue(o + (t._valueMax() - t._valueMin()) / n);
                            break;
                        case e.ui.keyCode.PAGE_DOWN:
                            u = t._trimAlignValue(o - (t._valueMax() - t._valueMin()) / n);
                            break;
                        case e.ui.keyCode.UP:
                        case e.ui.keyCode.RIGHT:
                            if (o === t._valueMax()) return;
                            u = t._trimAlignValue(o + a);
                            break;
                        case e.ui.keyCode.DOWN:
                        case e.ui.keyCode.LEFT:
                            if (o === t._valueMin()) return;
                            u = t._trimAlignValue(o - a)
                    }
                    t._slide(r, i, u)
                }).keyup(function (n) {
                        var r = e(this).data("index.ui-slider-handle");
                        t._keySliding && (t._keySliding = !1, t._stop(n, r), t._change(n, r), e(this).removeClass("ui-state-active"))
                    }), this._refreshValue(), this._animateOff = !1
            },
            destroy: function () {
                return this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"), this._mouseDestroy(), this
            },
            _mouseCapture: function (t) {
                var n = this.options,
                    r, i, s, o, u, a, f, l, c;
                return n.disabled ? !1 : (this.elementSize = {
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight()
                }, this.elementOffset = this.element.offset(), r = {
                    x: t.pageX,
                    y: t.pageY
                }, i = this._normValueFromMouse(r), s = this._valueMax() - this._valueMin() + 1, u = this, this.handles.each(function (t) {
                    var n = Math.abs(i - u.values(t));
                    s > n && (s = n, o = e(this), a = t)
                }), n.range === !0 && this.values(1) === n.min && (a += 1, o = e(this.handles[a])), f = this._start(t, a), f === !1 ? !1 : (this._mouseSliding = !0, u._handleIndex = a, o.addClass("ui-state-active").focus(), l = o.offset(), c = !e(t.target).parents().andSelf().is(".ui-slider-handle"), this._clickOffset = c ? {
                    left: 0,
                    top: 0
                } : {
                    left: t.pageX - l.left - o.width() / 2,
                    top: t.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0)
                }, this.handles.hasClass("ui-state-hover") || this._slide(t, a, i), this._animateOff = !0, !0))
            },
            _mouseStart: function (e) {
                return !0
            },
            _mouseDrag: function (e) {
                var t = {
                    x: e.pageX,
                    y: e.pageY
                }, n = this._normValueFromMouse(t);
                return this._slide(e, this._handleIndex, n), !1
            },
            _mouseStop: function (e) {
                return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(e, this._handleIndex), this._change(e, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
            },
            _detectOrientation: function () {
                this.orientation = this.options.orientation === "vertical" ? "vertical" : "horizontal"
            },
            _normValueFromMouse: function (e) {
                var t, n, r, i, s;
                return this.orientation === "horizontal" ? (t = this.elementSize.width, n = e.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (t = this.elementSize.height, n = e.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), r = n / t, r > 1 && (r = 1), r < 0 && (r = 0), this.orientation === "vertical" && (r = 1 - r), i = this._valueMax() - this._valueMin(), s = this._valueMin() + r * i, this._trimAlignValue(s)
            },
            _start: function (e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                return this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("start", e, n)
            },
            _slide: function (e, t, n) {
                var r, i, s;
                this.options.values && this.options.values.length ? (r = this.values(t ? 0 : 1), this.options.values.length === 2 && this.options.range === !0 && (t === 0 && n > r || t === 1 && n < r) && (n = r), n !== this.values(t) && (i = this.values(), i[t] = n, s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n,
                    values: i
                }), r = this.values(t ? 0 : 1), s !== !1 && this.values(t, n, !0))) : n !== this.value() && (s = this._trigger("slide", e, {
                    handle: this.handles[t],
                    value: n
                }), s !== !1 && this.value(n))
            },
            _stop: function (e, t) {
                var n = {
                    handle: this.handles[t],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("stop", e, n)
            },
            _change: function (e, t) {
                if (!this._keySliding && !this._mouseSliding) {
                    var n = {
                        handle: this.handles[t],
                        value: this.value()
                    };
                    this.options.values && this.options.values.length && (n.value = this.values(t), n.values = this.values()), this._trigger("change", e, n)
                }
            },
            value: function (e) {
                if (arguments.length) {
                    this.options.value = this._trimAlignValue(e), this._refreshValue(), this._change(null, 0);
                    return
                }
                return this._value()
            },
            values: function (t, n) {
                var r, i, s;
                if (arguments.length > 1) {
                    this.options.values[t] = this._trimAlignValue(n), this._refreshValue(), this._change(null, t);
                    return
                }
                if (!arguments.length) return this._values();
                if (!e.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(t) : this.value();
                r = this.options.values, i = arguments[0];
                for (s = 0; s < r.length; s += 1) r[s] = this._trimAlignValue(i[s]), this._change(null, s);
                this._refreshValue()
            },
            _setOption: function (t, n) {
                var r, i = 0;
                e.isArray(this.options.values) && (i = this.options.values.length), e.Widget.prototype._setOption.apply(this, arguments);
                switch (t) {
                    case "disabled":
                        n ? (this.handles.filter(".ui-state-focus").blur(), this.handles.removeClass("ui-state-hover"), this.handles.propAttr("disabled", !0), this.element.addClass("ui-disabled")) : (this.handles.propAttr("disabled", !1), this.element.removeClass("ui-disabled"));
                        break;
                    case "orientation":
                        this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
                        break;
                    case "value":
                        this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
                        break;
                    case "values":
                        this._animateOff = !0, this._refreshValue();
                        for (r = 0; r < i; r += 1) this._change(null, r);
                        this._animateOff = !1
                }
            },
            _value: function () {
                var e = this.options.value;
                return e = this._trimAlignValue(e), e
            },
            _values: function (e) {
                var t, n, r;
                if (arguments.length) return t = this.options.values[e], t = this._trimAlignValue(t), t;
                n = this.options.values.slice();
                for (r = 0; r < n.length; r += 1) n[r] = this._trimAlignValue(n[r]);
                return n
            },
            _trimAlignValue: function (e) {
                if (e <= this._valueMin()) return this._valueMin();
                if (e >= this._valueMax()) return this._valueMax();
                var t = this.options.step > 0 ? this.options.step : 1,
                    n = (e - this._valueMin()) % t,
                    r = e - n;
                return Math.abs(n) * 2 >= t && (r += n > 0 ? t : -t), parseFloat(r.toFixed(5))
            },
            _valueMin: function () {
                return this.options.min
            },
            _valueMax: function () {
                return this.options.max
            },
            _refreshValue: function () {
                var t = this.options.range,
                    n = this.options,
                    r = this,
                    i = this._animateOff ? !1 : n.animate,
                    s, o = {}, u, a, f, l;
                this.options.values && this.options.values.length ? this.handles.each(function (t, a) {
                    s = (r.values(t) - r._valueMin()) / (r._valueMax() - r._valueMin()) * 100, o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%", e(this).stop(1, 1)[i ? "animate" : "css"](o, n.animate), r.options.range === !0 && (r.orientation === "horizontal" ? (t === 0 && r.range.stop(1, 1)[i ? "animate" : "css"]({
                        left: s + "%"
                    }, n.animate), t === 1 && r.range[i ? "animate" : "css"]({
                        width: s - u + "%"
                    }, {
                        queue: !1,
                        duration: n.animate
                    })) : (t === 0 && r.range.stop(1, 1)[i ? "animate" : "css"]({
                        bottom: s + "%"
                    }, n.animate), t === 1 && r.range[i ? "animate" : "css"]({
                        height: s - u + "%"
                    }, {
                        queue: !1,
                        duration: n.animate
                    }))), u = s
                }) : (a = this.value(), f = this._valueMin(), l = this._valueMax(), s = l !== f ? (a - f) / (l - f) * 100 : 0, o[r.orientation === "horizontal" ? "left" : "bottom"] = s + "%", this.handle.stop(1, 1)[i ? "animate" : "css"](o, n.animate), t === "min" && this.orientation === "horizontal" && this.range.stop(1, 1)[i ? "animate" : "css"]({
                    width: s + "%"
                }, n.animate), t === "max" && this.orientation === "horizontal" && this.range[i ? "animate" : "css"]({
                    width: 100 - s + "%"
                }, {
                    queue: !1,
                    duration: n.animate
                }), t === "min" && this.orientation === "vertical" && this.range.stop(1, 1)[i ? "animate" : "css"]({
                    height: s + "%"
                }, n.animate), t === "max" && this.orientation === "vertical" && this.range[i ? "animate" : "css"]({
                    height: 100 - s + "%"
                }, {
                    queue: !1,
                    duration: n.animate
                }))
            }
        }), e.extend(e.ui.slider, {
            version: "1.8.23"
        })
    }(jQuery),
    function (e, t) {
        function i() {
            return ++n
        }

        function s() {
            return ++r
        }
        var n = 0,
            r = 0;
        e.widget("ui.tabs", {
            options: {
                add: null,
                ajaxOptions: null,
                cache: !1,
                cookie: null,
                collapsible: !1,
                disable: null,
                disabled: [],
                enable: null,
                event: "click",
                fx: null,
                idPrefix: "ui-tabs-",
                load: null,
                panelTemplate: "<div></div>",
                remove: null,
                select: null,
                show: null,
                spinner: "<em>Loading&#8230;</em>",
                tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
            },
            _create: function () {
                this._tabify(!0)
            },
            _setOption: function (e, t) {
                if (e == "selected") {
                    if (this.options.collapsible && t == this.options.selected) return;
                    this.select(t)
                } else this.options[e] = t, this._tabify()
            },
            _tabId: function (e) {
                return e.title && e.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + i()
            },
            _sanitizeSelector: function (e) {
                return e.replace(/:/g, "\\:")
            },
            _cookie: function () {
                var t = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + s());
                return e.cookie.apply(null, [t].concat(e.makeArray(arguments)))
            },
            _ui: function (e, t) {
                return {
                    tab: e,
                    panel: t,
                    index: this.anchors.index(e)
                }
            },
            _cleanup: function () {
                this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                    var t = e(this);
                    t.html(t.data("label.tabs")).removeData("label.tabs")
                })
            },
            _tabify: function (n) {
                function h(t, n) {
                    t.css("display", ""), !e.support.opacity && n.opacity && t[0].style.removeAttribute("filter")
                }
                var r = this,
                    i = this.options,
                    s = /^#.+/;
                this.list = this.element.find("ol,ul").eq(0), this.lis = e(" > li:has(a[href])", this.list), this.anchors = this.lis.map(function () {
                    return e("a", this)[0]
                }), this.panels = e([]), this.anchors.each(function (t, n) {
                    var o = e(n).attr("href"),
                        u = o.split("#")[0],
                        a;
                    u && (u === location.toString().split("#")[0] || (a = e("base")[0]) && u === a.href) && (o = n.hash, n.href = o);
                    if (s.test(o)) r.panels = r.panels.add(r.element.find(r._sanitizeSelector(o)));
                    else if (o && o !== "#") {
                        e.data(n, "href.tabs", o), e.data(n, "load.tabs", o.replace(/#.*$/, ""));
                        var f = r._tabId(n);
                        n.href = "#" + f;
                        var l = r.element.find("#" + f);
                        l.length || (l = e(i.panelTemplate).attr("id", f).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(r.panels[t - 1] || r.list), l.data("destroy.tabs", !0)), r.panels = r.panels.add(l)
                    } else i.disabled.push(t)
                }), n ? (this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"), this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.lis.addClass("ui-state-default ui-corner-top"), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"), i.selected === t ? (location.hash && this.anchors.each(function (e, t) {
                    if (t.hash == location.hash) return i.selected = e, !1
                }), typeof i.selected != "number" && i.cookie && (i.selected = parseInt(r._cookie(), 10)), typeof i.selected != "number" && this.lis.filter(".ui-tabs-selected").length && (i.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))), i.selected = i.selected || (this.lis.length ? 0 : -1)) : i.selected === null && (i.selected = -1), i.selected = i.selected >= 0 && this.anchors[i.selected] || i.selected < 0 ? i.selected : 0, i.disabled = e.unique(i.disabled.concat(e.map(this.lis.filter(".ui-state-disabled"), function (e, t) {
                    return r.lis.index(e)
                }))).sort(), e.inArray(i.selected, i.disabled) != -1 && i.disabled.splice(e.inArray(i.selected, i.disabled), 1), this.panels.addClass("ui-tabs-hide"), this.lis.removeClass("ui-tabs-selected ui-state-active"), i.selected >= 0 && this.anchors.length && (r.element.find(r._sanitizeSelector(r.anchors[i.selected].hash)).removeClass("ui-tabs-hide"), this.lis.eq(i.selected).addClass("ui-tabs-selected ui-state-active"), r.element.queue("tabs", function () {
                    r._trigger("show", null, r._ui(r.anchors[i.selected], r.element.find(r._sanitizeSelector(r.anchors[i.selected].hash))[0]))
                }), this.load(i.selected)), e(window).bind("unload", function () {
                    r.lis.add(r.anchors).unbind(".tabs"), r.lis = r.anchors = r.panels = null
                })) : i.selected = this.lis.index(this.lis.filter(".ui-tabs-selected")), this.element[i.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible"), i.cookie && this._cookie(i.selected, i.cookie);
                for (var o = 0, u; u = this.lis[o]; o++) e(u)[e.inArray(o, i.disabled) != -1 && !e(u).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled");
                i.cache === !1 && this.anchors.removeData("cache.tabs"), this.lis.add(this.anchors).unbind(".tabs");
                if (i.event !== "mouseover") {
                    var a = function (e, t) {
                        t.is(":not(.ui-state-disabled)") && t.addClass("ui-state-" + e)
                    }, f = function (e, t) {
                        t.removeClass("ui-state-" + e)
                    };
                    this.lis.bind("mouseover.tabs", function () {
                        a("hover", e(this))
                    }), this.lis.bind("mouseout.tabs", function () {
                        f("hover", e(this))
                    }), this.anchors.bind("focus.tabs", function () {
                        a("focus", e(this).closest("li"))
                    }), this.anchors.bind("blur.tabs", function () {
                        f("focus", e(this).closest("li"))
                    })
                }
                var l, c;
                i.fx && (e.isArray(i.fx) ? (l = i.fx[0], c = i.fx[1]) : l = c = i.fx);
                var p = c ? function (t, n) {
                    e(t).closest("li").addClass("ui-tabs-selected ui-state-active"), n.hide().removeClass("ui-tabs-hide").animate(c, c.duration || "normal", function () {
                        h(n, c), r._trigger("show", null, r._ui(t, n[0]))
                    })
                } : function (t, n) {
                    e(t).closest("li").addClass("ui-tabs-selected ui-state-active"), n.removeClass("ui-tabs-hide"), r._trigger("show", null, r._ui(t, n[0]))
                }, d = l ? function (e, t) {
                    t.animate(l, l.duration || "normal", function () {
                        r.lis.removeClass("ui-tabs-selected ui-state-active"), t.addClass("ui-tabs-hide"), h(t, l), r.element.dequeue("tabs")
                    })
                } : function (e, t, n) {
                    r.lis.removeClass("ui-tabs-selected ui-state-active"), t.addClass("ui-tabs-hide"), r.element.dequeue("tabs")
                };
                this.anchors.bind(i.event + ".tabs", function () {
                    var t = this,
                        n = e(t).closest("li"),
                        s = r.panels.filter(":not(.ui-tabs-hide)"),
                        o = r.element.find(r._sanitizeSelector(t.hash));
                    if (n.hasClass("ui-tabs-selected") && !i.collapsible || n.hasClass("ui-state-disabled") || n.hasClass("ui-state-processing") || r.panels.filter(":animated").length || r._trigger("select", null, r._ui(this, o[0])) === !1) return this.blur(), !1;
                    i.selected = r.anchors.index(this), r.abort();
                    if (i.collapsible) {
                        if (n.hasClass("ui-tabs-selected")) return i.selected = -1, i.cookie && r._cookie(i.selected, i.cookie), r.element.queue("tabs", function () {
                            d(t, s)
                        }).dequeue("tabs"), this.blur(), !1;
                        if (!s.length) return i.cookie && r._cookie(i.selected, i.cookie), r.element.queue("tabs", function () {
                            p(t, o)
                        }), r.load(r.anchors.index(this)), this.blur(), !1
                    }
                    i.cookie && r._cookie(i.selected, i.cookie);
                    if (!o.length) throw "jQuery UI Tabs: Mismatching fragment identifier.";
                    s.length && r.element.queue("tabs", function () {
                        d(t, s)
                    }), r.element.queue("tabs", function () {
                        p(t, o)
                    }), r.load(r.anchors.index(this)), e.browser.msie && this.blur()
                }), this.anchors.bind("click.tabs", function () {
                    return !1
                })
            },
            _getIndex: function (e) {
                return typeof e == "string" && (e = this.anchors.index(this.anchors.filter("[href$='" + e + "']"))), e
            },
            destroy: function () {
                var t = this.options;
                return this.abort(), this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"), this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"), this.anchors.each(function () {
                    var t = e.data(this, "href.tabs");
                    t && (this.href = t);
                    var n = e(this).unbind(".tabs");
                    e.each(["href", "load", "cache"], function (e, t) {
                        n.removeData(t + ".tabs")
                    })
                }), this.lis.unbind(".tabs").add(this.panels).each(function () {
                    e.data(this, "destroy.tabs") ? e(this).remove() : e(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }), t.cookie && this._cookie(null, t.cookie), this
            },
            add: function (n, r, i) {
                i === t && (i = this.anchors.length);
                var s = this,
                    o = this.options,
                    u = e(o.tabTemplate.replace(/#\{href\}/g, n).replace(/#\{label\}/g, r)),
                    a = n.indexOf("#") ? this._tabId(e("a", u)[0]) : n.replace("#", "");
                u.addClass("ui-state-default ui-corner-top").data("destroy.tabs", !0);
                var f = s.element.find("#" + a);
                return f.length || (f = e(o.panelTemplate).attr("id", a).data("destroy.tabs", !0)), f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"), i >= this.lis.length ? (u.appendTo(this.list), f.appendTo(this.list[0].parentNode)) : (u.insertBefore(this.lis[i]), f.insertBefore(this.panels[i])), o.disabled = e.map(o.disabled, function (e, t) {
                    return e >= i ? ++e : e
                }), this._tabify(), this.anchors.length == 1 && (o.selected = 0, u.addClass("ui-tabs-selected ui-state-active"), f.removeClass("ui-tabs-hide"), this.element.queue("tabs", function () {
                    s._trigger("show", null, s._ui(s.anchors[0], s.panels[0]))
                }), this.load(0)), this._trigger("add", null, this._ui(this.anchors[i], this.panels[i])), this
            },
            remove: function (t) {
                t = this._getIndex(t);
                var n = this.options,
                    r = this.lis.eq(t).remove(),
                    i = this.panels.eq(t).remove();
                return r.hasClass("ui-tabs-selected") && this.anchors.length > 1 && this.select(t + (t + 1 < this.anchors.length ? 1 : -1)), n.disabled = e.map(e.grep(n.disabled, function (e, n) {
                    return e != t
                }), function (e, n) {
                    return e >= t ? --e : e
                }), this._tabify(), this._trigger("remove", null, this._ui(r.find("a")[0], i[0])), this
            },
            enable: function (t) {
                t = this._getIndex(t);
                var n = this.options;
                if (e.inArray(t, n.disabled) == -1) return;
                return this.lis.eq(t).removeClass("ui-state-disabled"), n.disabled = e.grep(n.disabled, function (e, n) {
                    return e != t
                }), this._trigger("enable", null, this._ui(this.anchors[t], this.panels[t])), this
            },
            disable: function (e) {
                e = this._getIndex(e);
                var t = this,
                    n = this.options;
                return e != n.selected && (this.lis.eq(e).addClass("ui-state-disabled"), n.disabled.push(e), n.disabled.sort(), this._trigger("disable", null, this._ui(this.anchors[e], this.panels[e]))), this
            },
            select: function (e) {
                e = this._getIndex(e);
                if (e == -1) {
                    if (!this.options.collapsible || this.options.selected == -1) return this;
                    e = this.options.selected
                }
                return this.anchors.eq(e).trigger(this.options.event + ".tabs"), this
            },
            load: function (t) {
                t = this._getIndex(t);
                var n = this,
                    r = this.options,
                    i = this.anchors.eq(t)[0],
                    s = e.data(i, "load.tabs");
                this.abort();
                if (!s || this.element.queue("tabs").length !== 0 && e.data(i, "cache.tabs")) {
                    this.element.dequeue("tabs");
                    return
                }
                this.lis.eq(t).addClass("ui-state-processing");
                if (r.spinner) {
                    var o = e("span", i);
                    o.data("label.tabs", o.html()).html(r.spinner)
                }
                return this.xhr = e.ajax(e.extend({}, r.ajaxOptions, {
                    url: s,
                    success: function (s, o) {
                        n.element.find(n._sanitizeSelector(i.hash)).html(s), n._cleanup(), r.cache && e.data(i, "cache.tabs", !0), n._trigger("load", null, n._ui(n.anchors[t], n.panels[t]));
                        try {
                            r.ajaxOptions.success(s, o)
                        } catch (u) {}
                    },
                    error: function (e, s, o) {
                        n._cleanup(), n._trigger("load", null, n._ui(n.anchors[t], n.panels[t]));
                        try {
                            r.ajaxOptions.error(e, s, t, i)
                        } catch (o) {}
                    }
                })), n.element.dequeue("tabs"), this
            },
            abort: function () {
                return this.element.queue([]), this.panels.stop(!1, !0), this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2)), this.xhr && (this.xhr.abort(), delete this.xhr), this._cleanup(), this
            },
            url: function (e, t) {
                return this.anchors.eq(e).removeData("cache.tabs").data("load.tabs", t), this
            },
            length: function () {
                return this.anchors.length
            }
        }), e.extend(e.ui.tabs, {
            version: "1.8.23"
        }), e.extend(e.ui.tabs.prototype, {
            rotation: null,
            rotate: function (e, t) {
                var n = this,
                    r = this.options,
                    i = n._rotate || (n._rotate = function (t) {
                        clearTimeout(n.rotation), n.rotation = setTimeout(function () {
                            var e = r.selected;
                            n.select(++e < n.anchors.length ? e : 0)
                        }, e), t && t.stopPropagation()
                    }),
                    s = n._unrotate || (n._unrotate = t ? function (e) {
                        i()
                    } : function (e) {
                        e.clientX && n.rotate(null)
                    });
                return e ? (this.element.bind("tabsshow", i), this.anchors.bind(r.event + ".tabs", s), i()) : (clearTimeout(n.rotation), this.element.unbind("tabsshow", i), this.anchors.unbind(r.event + ".tabs", s), delete this._rotate, delete this._unrotate), this
            }
        })
    }(jQuery), ! function (e) {
    e(function () {
        "use strict";
        e.support.transition = function () {
            var e = function () {
                var e = document.createElement("bootstrap"),
                    t = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "otransitionend",
                        msTransition: "MSTransitionEnd",
                        transition: "transitionend"
                    }, n;
                for (n in t)
                    if (e.style[n] !== undefined) return t[n]
            }();
            return e && {
                end: e
            }
        }()
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = '[data-dismiss="alert"]',
        n = function (n) {
            e(n).on("click", t, this.close)
        };
    n.prototype.close = function (t) {
        function s() {
            i.trigger("closed").remove()
        }
        var n = e(this),
            r = n.attr("data-target"),
            i;
        r || (r = n.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, "")), i = e(r), t && t.preventDefault(), i.length || (i = n.hasClass("alert") ? n : n.parent()), i.trigger(t = e.Event("close"));
        if (t.isDefaultPrevented()) return;
        i.removeClass("in"), e.support.transition && i.hasClass("fade") ? i.on(e.support.transition.end, s) : s()
    }, e.fn.alert = function (t) {
        return this.each(function () {
            var r = e(this),
                i = r.data("alert");
            i || r.data("alert", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.alert.Constructor = n, e(function () {
        e("body").on("click.alert.data-api", t, n.prototype.close)
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.button.defaults, n)
    };
    t.prototype.setState = function (e) {
        var t = "disabled",
            n = this.$element,
            r = n.data(),
            i = n.is("input") ? "val" : "html";
        e += "Text", r.resetText || n.data("resetText", n[i]()), n[i](r[e] || this.options[e]), setTimeout(function () {
            e == "loadingText" ? n.addClass(t).attr(t, t) : n.removeClass(t).removeAttr(t)
        }, 0)
    }, t.prototype.toggle = function () {
        var e = this.$element.parent('[data-toggle="buttons-radio"]');
        e && e.find(".active").removeClass("active"), this.$element.toggleClass("active")
    }, e.fn.button = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("button"),
                s = typeof n == "object" && n;
            i || r.data("button", i = new t(this, s)), n == "toggle" ? i.toggle() : n && i.setState(n)
        })
    }, e.fn.button.defaults = {
        loadingText: "loading..."
    }, e.fn.button.Constructor = t, e(function () {
        e("body").on("click.button.data-api", "[data-toggle^=button]", function (t) {
            var n = e(t.target);
            n.hasClass("btn") || (n = n.closest(".btn")), n.button("toggle")
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = n, this.options.slide && this.slide(this.options.slide), this.options.pause == "hover" && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.prototype = {
        cycle: function (t) {
            return t || (this.paused = !1), this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)), this
        },
        to: function (t) {
            var n = this.$element.find(".active"),
                r = n.parent().children(),
                i = r.index(n),
                s = this;
            if (t > r.length - 1 || t < 0) return;
            return this.sliding ? this.$element.one("slid", function () {
                s.to(t)
            }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", e(r[t]))
        },
        pause: function (e) {
            return e || (this.paused = !0), clearInterval(this.interval), this.interval = null, this
        },
        next: function () {
            if (this.sliding) return;
            return this.slide("next")
        },
        prev: function () {
            if (this.sliding) return;
            return this.slide("prev")
        },
        slide: function (t, n) {
            var r = this.$element.find(".active"),
                i = n || r[t](),
                s = this.interval,
                o = t == "next" ? "left" : "right",
                u = t == "next" ? "first" : "last",
                a = this,
                f = e.Event("slide");
            this.sliding = !0, s && this.pause(), i = i.length ? i : this.$element.find(".item")[u]();
            if (i.hasClass("active")) return;
            if (e.support.transition && this.$element.hasClass("slide")) {
                this.$element.trigger(f);
                if (f.isDefaultPrevented()) return;
                i.addClass(t), i[0].offsetWidth, r.addClass(o), i.addClass(o), this.$element.one(e.support.transition.end, function () {
                    i.removeClass([t, o].join(" ")).addClass("active"), r.removeClass(["active", o].join(" ")), a.sliding = !1, setTimeout(function () {
                        a.$element.trigger("slid")
                    }, 0)
                })
            } else {
                this.$element.trigger(f);
                if (f.isDefaultPrevented()) return;
                r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    }, e.fn.carousel = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("carousel"),
                s = e.extend({}, e.fn.carousel.defaults, typeof n == "object" && n);
            i || r.data("carousel", i = new t(this, s)), typeof n == "number" ? i.to(n) : typeof n == "string" || (n = s.slide) ? i[n]() : s.interval && i.cycle()
        })
    }, e.fn.carousel.defaults = {
        interval: 5e3,
        pause: "hover"
    }, e.fn.carousel.Constructor = t, e(function () {
        e("body").on("click.carousel.data-api", "[data-slide]", function (t) {
            var n = e(this),
                r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
                s = !i.data("modal") && e.extend({}, i.data(), n.data());
            i.carousel(s), t.preventDefault()
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.collapse.defaults, n), this.options.parent && (this.$parent = e(this.options.parent)), this.options.toggle && this.toggle()
    };
    t.prototype = {
        constructor: t,
        dimension: function () {
            var e = this.$element.hasClass("width");
            return e ? "width" : "height"
        },
        show: function () {
            var t, n, r, i;
            if (this.transitioning) return;
            t = this.dimension(), n = e.camelCase(["scroll", t].join("-")), r = this.$parent && this.$parent.find("> .accordion-group > .in");
            if (r && r.length) {
                i = r.data("collapse");
                if (i && i.transitioning) return;
                r.collapse("hide"), i || r.data("collapse", null)
            }
            this.$element[t](0), this.transition("addClass", e.Event("show"), "shown"), this.$element[t](this.$element[0][n])
        },
        hide: function () {
            var t;
            if (this.transitioning) return;
            t = this.dimension(), this.reset(this.$element[t]()), this.transition("removeClass", e.Event("hide"), "hidden"), this.$element[t](0)
        },
        reset: function (e) {
            var t = this.dimension();
            return this.$element.removeClass("collapse")[t](e || "auto")[0].offsetWidth, this.$element[e !== null ? "addClass" : "removeClass"]("collapse"), this
        },
        transition: function (t, n, r) {
            var i = this,
                s = function () {
                    n.type == "show" && i.reset(), i.transitioning = 0, i.$element.trigger(r)
                };
            this.$element.trigger(n);
            if (n.isDefaultPrevented()) return;
            this.transitioning = 1, this.$element[t]("in"), e.support.transition && this.$element.hasClass("collapse") ? this.$element.one(e.support.transition.end, s) : s()
        },
        toggle: function () {
            this[this.$element.hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.collapse = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("collapse"),
                s = typeof n == "object" && n;
            i || r.data("collapse", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.collapse.defaults = {
        toggle: !0
    }, e.fn.collapse.Constructor = t, e(function () {
        e("body").on("click.collapse.data-api", "[data-toggle=collapse]", function (t) {
            var n = e(this),
                r, i = n.attr("data-target") || t.preventDefault() || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, ""),
                s = e(i).data("collapse") ? "toggle" : n.data();
            e(i).collapse(s)
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";

    function r() {
        e(t).parent().removeClass("open")
    }
    var t = '[data-toggle="dropdown"]',
        n = function (t) {
            var n = e(t).on("click.dropdown.data-api", this.toggle);
            e("html").on("click.dropdown.data-api", function () {
                n.parent().removeClass("open")
            })
        };
    n.prototype = {
        constructor: n,
        toggle: function (t) {
            var n = e(this),
                i, s, o;
            if (n.is(".disabled, :disabled")) return;
            return s = n.attr("data-target"), s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, "")), i = e(s), i.length || (i = n.parent()), o = i.hasClass("open"), r(), o || i.toggleClass("open"), !1
        }
    }, e.fn.dropdown = function (t) {
        return this.each(function () {
            var r = e(this),
                i = r.data("dropdown");
            i || r.data("dropdown", i = new n(this)), typeof t == "string" && i[t].call(r)
        })
    }, e.fn.dropdown.Constructor = n, e(function () {
        e("html").on("click.dropdown.data-api", r), e("body").on("click.dropdown", ".dropdown form", function (e) {
            e.stopPropagation()
        }).on("click.dropdown.data-api", t, n.prototype.toggle)
    })
}(window.jQuery), ! function (e) {
    "use strict";

    function n() {
        var t = this,
            n = setTimeout(function () {
                t.$element.off(e.support.transition.end), r.call(t)
            }, 500);
        this.$element.one(e.support.transition.end, function () {
            clearTimeout(n), r.call(t)
        })
    }

    function r(e) {
        this.$element.hide().trigger("hidden"), i.call(this)
    }

    function i(t) {
        var n = this,
            r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var i = e.support.transition && r;
            this.$backdrop = e('<div class="modal-backdrop ' + r + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(e.proxy(this.hide, this)), i && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), i ? this.$backdrop.one(e.support.transition.end, t) : t()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(e.support.transition.end, e.proxy(s, this)) : s.call(this)) : t && t()
    }

    function s() {
        this.$backdrop.remove(), this.$backdrop = null
    }

    function o() {
        var t = this;
        this.isShown && this.options.keyboard ? e(document).on("keyup.dismiss.modal", function (e) {
            e.which == 27 && t.hide()
        }) : this.isShown || e(document).off("keyup.dismiss.modal")
    }
    var t = function (t, n) {
        this.options = n, this.$element = e(t).delegate('[data-dismiss="modal"]', "click.dismiss.modal", e.proxy(this.hide, this))
    };
    t.prototype = {
        constructor: t,
        toggle: function () {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function () {
            var t = this,
                n = e.Event("show");
            this.$element.trigger(n);
            if (this.isShown || n.isDefaultPrevented()) return;
            e("body").addClass("modal-open"), this.isShown = !0, o.call(this), i.call(this, function () {
                var n = e.support.transition && t.$element.hasClass("fade");
                t.$element.parent().length || t.$element.appendTo(document.body), t.$element.show(), n && t.$element[0].offsetWidth, t.$element.addClass("in"), n ? t.$element.one(e.support.transition.end, function () {
                    t.$element.trigger("shown")
                }) : t.$element.trigger("shown")
            })
        },
        hide: function (t) {
            t && t.preventDefault();
            var i = this;
            t = e.Event("hide"), this.$element.trigger(t);
            if (!this.isShown || t.isDefaultPrevented()) return;
            this.isShown = !1, e("body").removeClass("modal-open"), o.call(this), this.$element.removeClass("in"), e.support.transition && this.$element.hasClass("fade") ? n.call(this) : r.call(this)
        }
    }, e.fn.modal = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("modal"),
                s = e.extend({}, e.fn.modal.defaults, r.data(), typeof n == "object" && n);
            i || r.data("modal", i = new t(this, s)), typeof n == "string" ? i[n]() : s.show && i.show()
        })
    }, e.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.fn.modal.Constructor = t, e(function () {
        e("body").on("click.modal.data-api", '[data-toggle="modal"]', function (t) {
            var n = e(this),
                r, i = e(n.attr("data-target") || (r = n.attr("href")) && r.replace(/.*(?=#[^\s]+$)/, "")),
                s = i.data("modal") ? "toggle" : e.extend({}, i.data(), n.data());
            t.preventDefault(), i.modal(s)
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";

    function t(t, n) {
        var r = e.proxy(this.process, this),
            i = e(t).is("body") ? e(window) : e(t),
            s;
        this.options = e.extend({}, e.fn.scrollspy.defaults, n), this.$scrollElement = i.on("scroll.scroll.data-api", r), this.selector = (this.options.target || (s = e(t).attr("href")) && s.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = e("body"), this.refresh(), this.process()
    }
    t.prototype = {
        constructor: t,
        refresh: function () {
            var t = this,
                n;
            this.offsets = e([]), this.targets = e([]), n = this.$body.find(this.selector).map(function () {
                var t = e(this),
                    n = t.data("target") || t.attr("href"),
                    r = /^#\w/.test(n) && e(n);
                return r && n.length && [
                    [r.position().top, n]
                ] || null
            }).sort(function (e, t) {
                    return e[0] - t[0]
                }).each(function () {
                    t.offsets.push(this[0]), t.targets.push(this[1])
                })
        },
        process: function () {
            var e = this.$scrollElement.scrollTop() + this.options.offset,
                t = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                n = t - this.$scrollElement.height(),
                r = this.offsets,
                i = this.targets,
                s = this.activeTarget,
                o;
            if (e >= n) return s != (o = i.last()[0]) && this.activate(o);
            for (o = r.length; o--;) s != i[o] && e >= r[o] && (!r[o + 1] || e <= r[o + 1]) && this.activate(i[o])
        },
        activate: function (t) {
            var n, r;
            this.activeTarget = t, e(this.selector).parent(".active").removeClass("active"), r = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]', n = e(r).parent("li").addClass("active"), n.parent(".dropdown-menu") && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
        }
    }, e.fn.scrollspy = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("scrollspy"),
                s = typeof n == "object" && n;
            i || r.data("scrollspy", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.scrollspy.Constructor = t, e.fn.scrollspy.defaults = {
        offset: 10
    }, e(function () {
        e('[data-spy="scroll"]').each(function () {
            var t = e(this);
            t.scrollspy(t.data())
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t) {
        this.element = e(t)
    };
    t.prototype = {
        constructor: t,
        show: function () {
            var t = this.element,
                n = t.closest("ul:not(.dropdown-menu)"),
                r = t.attr("data-target"),
                i, s, o;
            r || (r = t.attr("href"), r = r && r.replace(/.*(?=#[^\s]*$)/, ""));
            if (t.parent("li").hasClass("active")) return;
            i = n.find(".active a").last()[0], o = e.Event("show", {
                relatedTarget: i
            }), t.trigger(o);
            if (o.isDefaultPrevented()) return;
            s = e(r), this.activate(t.parent("li"), n), this.activate(s, s.parent(), function () {
                t.trigger({
                    type: "shown",
                    relatedTarget: i
                })
            })
        },
        activate: function (t, n, r) {
            function o() {
                i.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), t.addClass("active"), s ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu") && t.closest("li.dropdown").addClass("active"), r && r()
            }
            var i = n.find("> .active"),
                s = r && e.support.transition && i.hasClass("fade");
            s ? i.one(e.support.transition.end, o) : o(), i.removeClass("in")
        }
    }, e.fn.tab = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("tab");
            i || r.data("tab", i = new t(this)), typeof n == "string" && i[n]()
        })
    }, e.fn.tab.Constructor = t, e(function () {
        e("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (t) {
            t.preventDefault(), e(this).tab("show")
        })
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("tooltip", e, t)
    };
    t.prototype = {
        constructor: t,
        init: function (t, n, r) {
            var i, s;
            this.type = t, this.$element = e(n), this.options = this.getOptions(r), this.enabled = !0, this.options.trigger != "manual" && (i = this.options.trigger == "hover" ? "mouseenter" : "focus", s = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(i, this.options.selector, e.proxy(this.enter, this)), this.$element.on(s, this.options.selector, e.proxy(this.leave, this))), this.options.selector ? this._options = e.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle()
        },
        getOptions: function (t) {
            return t = e.extend({}, e.fn[this.type].defaults, t, this.$element.data()), t.delay && typeof t.delay == "number" && (t.delay = {
                show: t.delay,
                hide: t.delay
            }), t
        },
        enter: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            if (!n.options.delay || !n.options.delay.show) return n.show();
            clearTimeout(this.timeout), n.hoverState = "in", this.timeout = setTimeout(function () {
                n.hoverState == "in" && n.show()
            }, n.options.delay.show)
        },
        leave: function (t) {
            var n = e(t.currentTarget)[this.type](this._options).data(this.type);
            this.timeout && clearTimeout(this.timeout);
            if (!n.options.delay || !n.options.delay.hide) return n.hide();
            n.hoverState = "out", this.timeout = setTimeout(function () {
                n.hoverState == "out" && n.hide()
            }, n.options.delay.hide)
        },
        show: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), this.setContent(), this.options.animation && e.addClass("fade"), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), e.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(t ? this.$element : document.body), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                    case "bottom":
                        o = {
                            top: n.top + n.height,
                            left: n.left + n.width / 2 - r / 2
                        };
                        break;
                    case "top":
                        o = {
                            top: n.top - i,
                            left: n.left + n.width / 2 - r / 2
                        };
                        break;
                    case "left":
                        o = {
                            top: n.top + n.height / 2 - i / 2,
                            left: n.left - r
                        };
                        break;
                    case "right":
                        o = {
                            top: n.top + n.height / 2 - i / 2,
                            left: n.left + n.width
                        }
                }
                e.css(o).addClass(s).addClass("in")
            }
        },
        isHTML: function (e) {
            return typeof e != "string" || e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(e)
        },
        setContent: function () {
            var e = this.tip(),
                t = this.getTitle();
            e.find(".tooltip-inner")[this.isHTML(t) ? "html" : "text"](t), e.removeClass("fade in top bottom left right")
        },
        hide: function () {
            function r() {
                var t = setTimeout(function () {
                    n.off(e.support.transition.end).remove()
                }, 500);
                n.one(e.support.transition.end, function () {
                    clearTimeout(t), n.remove()
                })
            }
            var t = this,
                n = this.tip();
            n.removeClass("in"), e.support.transition && this.$tip.hasClass("fade") ? r() : n.remove()
        },
        fixTitle: function () {
            var e = this.$element;
            (e.attr("title") || typeof e.attr("data-original-title") != "string") && e.attr("data-original-title", e.attr("title") || "").removeAttr("title")
        },
        hasContent: function () {
            return this.getTitle()
        },
        getPosition: function (t) {
            return e.extend({}, t ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            })
        },
        getTitle: function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-original-title") || (typeof n.title == "function" ? n.title.call(t[0]) : n.title), e
        },
        tip: function () {
            return this.$tip = this.$tip || e(this.options.template)
        },
        validate: function () {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function () {
            this.enabled = !0
        },
        disable: function () {
            this.enabled = !1
        },
        toggleEnabled: function () {
            this.enabled = !this.enabled
        },
        toggle: function () {
            this[this.tip().hasClass("in") ? "hide" : "show"]()
        }
    }, e.fn.tooltip = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("tooltip"),
                s = typeof n == "object" && n;
            i || r.data("tooltip", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.tooltip.Constructor = t, e.fn.tooltip.defaults = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover",
        title: "",
        delay: 0
    }
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.init("popover", e, t)
    };
    t.prototype = e.extend({}, e.fn.tooltip.Constructor.prototype, {
        constructor: t,
        setContent: function () {
            var e = this.tip(),
                t = this.getTitle(),
                n = this.getContent();
            e.find(".popover-title")[this.isHTML(t) ? "html" : "text"](t), e.find(".popover-content > *")[this.isHTML(n) ? "html" : "text"](n), e.removeClass("fade top bottom left right in")
        },
        hasContent: function () {
            return this.getTitle() || this.getContent()
        },
        getContent: function () {
            var e, t = this.$element,
                n = this.options;
            return e = t.attr("data-content") || (typeof n.content == "function" ? n.content.call(t[0]) : n.content), e
        },
        tip: function () {
            return this.$tip || (this.$tip = e(this.options.template)), this.$tip
        }
    }), e.fn.popover = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("popover"),
                s = typeof n == "object" && n;
            i || r.data("popover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.popover.Constructor = t, e.fn.popover.defaults = e.extend({}, e.fn.tooltip.defaults, {
        placement: "right",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })
}(window.jQuery), ! function (e) {
    "use strict";
    var t = function (t, n) {
        this.$element = e(t), this.options = e.extend({}, e.fn.typeahead.defaults, n), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.$menu = e(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen()
    };
    t.prototype = {
        constructor: t,
        select: function () {
            var e = this.$menu.find(".active").attr("data-value");
            return this.$element.val(this.updater(e)).change(), this.hide()
        },
        updater: function (e) {
            return e
        },
        show: function () {
            var t = e.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.css({
                top: t.top + t.height,
                left: t.left
            }), this.$menu.show(), this.shown = !0, this
        },
        hide: function () {
            return this.$menu.hide(), this.shown = !1, this
        },
        lookup: function (t) {
            var n = this,
                r, i;
            return this.query = this.$element.val(), this.query ? (r = e.grep(this.source, function (e) {
                return n.matcher(e)
            }), r = this.sorter(r), r.length ? this.render(r.slice(0, this.options.items)).show() : this.shown ? this.hide() : this) : this.shown ? this.hide() : this
        },
        matcher: function (e) {
            return~ e.toLowerCase().indexOf(this.query.toLowerCase())
        },
        sorter: function (e) {
            var t = [],
                n = [],
                r = [],
                i;
            while (i = e.shift()) i.toLowerCase().indexOf(this.query.toLowerCase()) ? ~i.indexOf(this.query) ? n.push(i) : r.push(i) : t.push(i);
            return t.concat(n, r)
        },
        highlighter: function (e) {
            var t = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
            return e.replace(new RegExp("(" + t + ")", "ig"), function (e, t) {
                return "<strong>" + t + "</strong>"
            })
        },
        render: function (t) {
            var n = this;
            return t = e(t).map(function (t, r) {
                return t = e(n.options.item).attr("data-value", r), t.find("a").html(n.highlighter(r)), t[0]
            }), t.first().addClass("active"), this.$menu.html(t), this
        },
        next: function (t) {
            var n = this.$menu.find(".active").removeClass("active"),
                r = n.next();
            r.length || (r = e(this.$menu.find("li")[0])), r.addClass("active")
        },
        prev: function (e) {
            var t = this.$menu.find(".active").removeClass("active"),
                n = t.prev();
            n.length || (n = this.$menu.find("li").last()), n.addClass("active")
        },
        listen: function () {
            this.$element.on("blur", e.proxy(this.blur, this)).on("keypress", e.proxy(this.keypress, this)).on("keyup", e.proxy(this.keyup, this)), (e.browser.webkit || e.browser.msie || e.browser.mozilla) && this.$element.on("keydown", e.proxy(this.keypress, this)), this.$menu.on("click", e.proxy(this.click, this)).on("mouseenter", "li", e.proxy(this.mouseenter, this))
        },
        keyup: function (e) {
            switch (e.keyCode) {
                case 40:
                case 38:
                    break;
                case 9:
                case 13:
                    if (!this.shown) return;
                    this.select();
                    break;
                case 27:
                    if (!this.shown) return;
                    this.hide();
                    break;
                default:
                    this.lookup()
            }
            e.stopPropagation(), e.preventDefault()
        },
        keypress: function (e) {
            if (!this.shown) return;
            switch (e.keyCode) {
                case 9:
                case 13:
                case 27:
                    e.preventDefault();
                    break;
                case 38:
                    if (e.type != "keydown") break;
                    e.preventDefault(), this.prev();
                    break;
                case 40:
                    if (e.type != "keydown") break;
                    e.preventDefault(), this.next()
            }
            e.stopPropagation()
        },
        blur: function (e) {
            var t = this;
            setTimeout(function () {
                t.hide()
            }, 150)
        },
        click: function (e) {
            e.stopPropagation(), e.preventDefault(), this.select()
        },
        mouseenter: function (t) {
            this.$menu.find(".active").removeClass("active"), e(t.currentTarget).addClass("active")
        }
    }, e.fn.typeahead = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("typeahead"),
                s = typeof n == "object" && n;
            i || r.data("typeahead", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>'
    }, e.fn.typeahead.Constructor = t, e(function () {
        e("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function (t) {
            var n = e(this);
            if (n.data("typeahead")) return;
            t.preventDefault(), n.typeahead(n.data())
        })
    })
}(window.jQuery),
    function (e) {
        function t(t, n, r) {
            var i = this;
            i.id = r, i.options = n, i.status = {
                animated: !1,
                rendered: !1,
                disabled: !1,
                focused: !1
            }, i.elements = {
                target: t.addClass(i.options.style.classes.target),
                tooltip: null,
                wrapper: null,
                content: null,
                contentWrapper: null,
                title: null,
                button: null,
                tip: null,
                bgiframe: null
            }, i.cache = {
                mouse: {},
                position: {},
                toggle: 0
            }, i.timers = {}, e.extend(i, i.options.api, {
                show: function (t) {
                    function s() {
                        i.options.position.type !== "static" && i.focus(), i.onShow.call(i, t), e.browser.msie && i.elements.tooltip.get(0).style.removeAttribute("filter")
                    }
                    var n, r;
                    if (!i.status.rendered) return e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "show");
                    if (i.elements.tooltip.css("display") !== "none") return i;
                    i.elements.tooltip.stop(!0, !1), n = i.beforeShow.call(i, t);
                    if (n === !1) return i;
                    i.cache.toggle = 1, i.options.position.type !== "static" && i.updatePosition(t, i.options.show.effect.length > 0), typeof i.options.show.solo == "object" ? r = e(i.options.show.solo) : i.options.show.solo === !0 && (r = e("div.qtip").not(i.elements.tooltip)), r && r.each(function () {
                        e(this).qtip("api").status.rendered === !0 && e(this).qtip("api").hide()
                    });
                    if (typeof i.options.show.effect.type == "function") i.options.show.effect.type.call(i.elements.tooltip, i.options.show.effect.length), i.elements.tooltip.queue(function () {
                        s(), e(this).dequeue()
                    });
                    else {
                        switch (i.options.show.effect.type.toLowerCase()) {
                            case "fade":
                                i.elements.tooltip.fadeIn(i.options.show.effect.length, s);
                                break;
                            case "slide":
                                i.elements.tooltip.slideDown(i.options.show.effect.length, function () {
                                    s(), i.options.position.type !== "static" && i.updatePosition(t, !0)
                                });
                                break;
                            case "grow":
                                i.elements.tooltip.show(i.options.show.effect.length, s);
                                break;
                            default:
                                i.elements.tooltip.show(null, s)
                        }
                        i.elements.tooltip.addClass(i.options.style.classes.active)
                    }
                    return e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_SHOWN, "show")
                },
                hide: function (t) {
                    function r() {
                        i.onHide.call(i, t)
                    }
                    var n;
                    if (!i.status.rendered) return e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "hide");
                    if (i.elements.tooltip.css("display") === "none") return i;
                    clearTimeout(i.timers.show), i.elements.tooltip.stop(!0, !1), n = i.beforeHide.call(i, t);
                    if (n === !1) return i;
                    i.cache.toggle = 0;
                    if (typeof i.options.hide.effect.type == "function") i.options.hide.effect.type.call(i.elements.tooltip, i.options.hide.effect.length), i.elements.tooltip.queue(function () {
                        r(), e(this).dequeue()
                    });
                    else {
                        switch (i.options.hide.effect.type.toLowerCase()) {
                            case "fade":
                                i.elements.tooltip.fadeOut(i.options.hide.effect.length, r);
                                break;
                            case "slide":
                                i.elements.tooltip.slideUp(i.options.hide.effect.length, r);
                                break;
                            case "grow":
                                i.elements.tooltip.hide(i.options.hide.effect.length, r);
                                break;
                            default:
                                i.elements.tooltip.hide(null, r)
                        }
                        i.elements.tooltip.removeClass(i.options.style.classes.active)
                    }
                    return e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_HIDDEN, "hide")
                },
                updatePosition: function (t, n) {
                    var r, s, o, u, a, f, l, h, p, d, v, m, y, b;
                    if (!i.status.rendered) return e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updatePosition");
                    if (i.options.position.type == "static") return e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.CANNOT_POSITION_STATIC, "updatePosition");
                    s = {
                        position: {
                            left: 0,
                            top: 0
                        },
                        dimensions: {
                            height: 0,
                            width: 0
                        },
                        corner: i.options.position.corner.target
                    }, o = {
                        position: i.getPosition(),
                        dimensions: i.getDimensions(),
                        corner: i.options.position.corner.tooltip
                    };
                    if (i.options.position.target !== "mouse") {
                        if (i.options.position.target.get(0).nodeName.toLowerCase() == "area") {
                            u = i.options.position.target.attr("coords").split(",");
                            for (r = 0; r < u.length; r++) u[r] = parseInt(u[r]);
                            a = i.options.position.target.parent("map").attr("name"), f = e('img[usemap="#' + a + '"]:first').offset(), s.position = {
                                left: Math.floor(f.left + u[0]),
                                top: Math.floor(f.top + u[1])
                            };
                            switch (i.options.position.target.attr("shape").toLowerCase()) {
                                case "rect":
                                    s.dimensions = {
                                        width: Math.ceil(Math.abs(u[2] - u[0])),
                                        height: Math.ceil(Math.abs(u[3] - u[1]))
                                    };
                                    break;
                                case "circle":
                                    s.dimensions = {
                                        width: u[2] + 1,
                                        height: u[2] + 1
                                    };
                                    break;
                                case "poly":
                                    s.dimensions = {
                                        width: u[0],
                                        height: u[1]
                                    };
                                    for (r = 0; r < u.length; r++) r % 2 == 0 ? (u[r] > s.dimensions.width && (s.dimensions.width = u[r]), u[r] < u[0] && (s.position.left = Math.floor(f.left + u[r]))) : (u[r] > s.dimensions.height && (s.dimensions.height = u[r]), u[r] < u[1] && (s.position.top = Math.floor(f.top + u[r])));
                                    s.dimensions.width = s.dimensions.width - (s.position.left - f.left), s.dimensions.height = s.dimensions.height - (s.position.top - f.top);
                                    break;
                                default:
                                    return e.fn.qtip.log.error.call(i, 4, e.fn.qtip.constants.INVALID_AREA_SHAPE, "updatePosition")
                            }
                            s.dimensions.width -= 2, s.dimensions.height -= 2
                        } else i.options.position.target.add(document.body).length === 1 ? (s.position = {
                            left: e(document).scrollLeft(),
                            top: e(document).scrollTop()
                        }, s.dimensions = {
                            height: e(window).height(),
                            width: e(window).width()
                        }) : (typeof i.options.position.target.attr("qtip") != "undefined" ? s.position = i.options.position.target.qtip("api").cache.position : s.position = i.options.position.target.offset(), s.dimensions = {
                            height: i.options.position.target.outerHeight(),
                            width: i.options.position.target.outerWidth()
                        });
                        l = e.extend({}, s.position), s.corner.search(/right/i) !== -1 && (l.left += s.dimensions.width), s.corner.search(/bottom/i) !== -1 && (l.top += s.dimensions.height), s.corner
                            .search(/((top|bottom)Middle)|center/) !== -1 && (l.left += s.dimensions.width / 2), s.corner.search(/((left|right)Middle)|center/) !== -1 && (l.top += s.dimensions.height / 2)
                    } else s.position = l = {
                        left: i.cache.mouse.x,
                        top: i.cache.mouse.y
                    }, s.dimensions = {
                        height: 1,
                        width: 1
                    };
                    o.corner.search(/right/i) !== -1 && (l.left -= o.dimensions.width), o.corner.search(/bottom/i) !== -1 && (l.top -= o.dimensions.height), o.corner.search(/((top|bottom)Middle)|center/) !== -1 && (l.left -= o.dimensions.width / 2), o.corner.search(/((left|right)Middle)|center/) !== -1 && (l.top -= o.dimensions.height / 2), h = e.browser.msie ? 1 : 0, p = e.browser.msie && parseInt(e.browser.version.charAt(0)) === 6 ? 1 : 0, i.options.style.border.radius > 0 && (o.corner.search(/Left/) !== -1 ? l.left -= i.options.style.border.radius : o.corner.search(/Right/) !== -1 && (l.left += i.options.style.border.radius), o.corner.search(/Top/) !== -1 ? l.top -= i.options.style.border.radius : o.corner.search(/Bottom/) !== -1 && (l.top += i.options.style.border.radius)), h && (o.corner.search(/top/) !== -1 ? l.top -= h : o.corner.search(/bottom/) !== -1 && (l.top += h), o.corner.search(/left/) !== -1 ? l.left -= h : o.corner.search(/right/) !== -1 && (l.left += h), o.corner.search(/leftMiddle|rightMiddle/) !== -1 && (l.top -= 1)), i.options.position.adjust.screen === !0 && (l = c.call(i, l, s, o)), i.options.position.target === "mouse" && i.options.position.adjust.mouse === !0 && (i.options.position.adjust.screen === !0 && i.elements.tip ? v = i.elements.tip.attr("rel") : v = i.options.position.corner.tooltip, l.left += v.search(/right/i) !== -1 ? -6 : 6, l.top += v.search(/bottom/i) !== -1 ? -6 : 6), !i.elements.bgiframe && e.browser.msie && parseInt(e.browser.version.charAt(0)) == 6 && e("select, object").each(function () {
                        m = e(this).offset(), m.bottom = m.top + e(this).height(), m.right = m.left + e(this).width(), l.top + o.dimensions.height >= m.top && l.left + o.dimensions.width >= m.left && g.call(i)
                    }), l.left += i.options.position.adjust.x, l.top += i.options.position.adjust.y, y = i.getPosition();
                    if (l.left != y.left || l.top != y.top) {
                        b = i.beforePositionUpdate.call(i, t);
                        if (b === !1) return i;
                        i.cache.position = l, n === !0 ? (i.status.animated = !0, i.elements.tooltip.animate(l, 200, "swing", function () {
                            i.status.animated = !1
                        })) : i.elements.tooltip.css(l), i.onPositionUpdate.call(i, t), typeof t != "undefined" && t.type && t.type !== "mousemove" && e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_POSITION_UPDATED, "updatePosition")
                    }
                    return i
                },
                updateWidth: function (t) {
                    var n;
                    return i.status.rendered ? t && typeof t != "number" ? e.fn.qtip.log.error.call(i, 2, "newWidth must be of type number", "updateWidth") : (n = i.elements.contentWrapper.siblings().add(i.elements.tip).add(i.elements.button), t || (typeof i.options.style.width.value == "number" ? t = i.options.style.width.value : (i.elements.tooltip.css({
                        width: "auto"
                    }), n.hide(), e.browser.msie && i.elements.wrapper.add(i.elements.contentWrapper.children()).css({
                        zoom: "normal"
                    }), t = i.getDimensions().width + 1, i.options.style.width.value || (t > i.options.style.width.max && (t = i.options.style.width.max), t < i.options.style.width.min && (t = i.options.style.width.min)))), t % 2 !== 0 && (t -= 1), i.elements.tooltip.width(t), n.show(), i.options.style.border.radius && i.elements.tooltip.find(".qtip-betweenCorners").each(function (n) {
                        e(this).width(t - i.options.style.border.radius * 2)
                    }), e.browser.msie && (i.elements.wrapper.add(i.elements.contentWrapper.children()).css({
                        zoom: "1"
                    }), i.elements.wrapper.width(t), i.elements.bgiframe && i.elements.bgiframe.width(t).height(i.getDimensions.height)), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_WIDTH_UPDATED, "updateWidth")) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateWidth")
                },
                updateStyle: function (t) {
                    var n, r, o, a, f;
                    return i.status.rendered ? typeof t != "string" || !e.fn.qtip.styles[t] ? e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.STYLE_NOT_DEFINED, "updateStyle") : (i.options.style = d.call(i, e.fn.qtip.styles[t], i.options.user.style), i.elements.content.css(h(i.options.style)), i.options.content.title.text !== !1 && i.elements.title.css(h(i.options.style.title, !0)), i.elements.contentWrapper.css({
                        borderColor: i.options.style.border.color
                    }), i.options.style.tip.corner !== !1 && (e("<canvas>").get(0).getContext ? (n = i.elements.tooltip.find(".qtip-tip canvas:first"), o = n.get(0).getContext("2d"), o.clearRect(0, 0, 300, 300), a = n.parent("div[rel]:first").attr("rel"), f = v(a, i.options.style.tip.size.width, i.options.style.tip.size.height), u.call(i, n, f, i.options.style.tip.color || i.options.style.border.color)) : e.browser.msie && (n = i.elements.tooltip.find('.qtip-tip [nodeName="shape"]'), n.attr("fillcolor", i.options.style.tip.color || i.options.style.border.color))), i.options.style.border.radius > 0 && (i.elements.tooltip.find(".qtip-betweenCorners").css({
                        backgroundColor: i.options.style.border.color
                    }), e("<canvas>").get(0).getContext ? (r = m(i.options.style.border.radius), i.elements.tooltip.find(".qtip-wrapper canvas").each(function () {
                        o = e(this).get(0).getContext("2d"), o.clearRect(0, 0, 300, 300), a = e(this).parent("div[rel]:first").attr("rel"), s.call(i, e(this), r[a], i.options.style.border.radius, i.options.style.border.color)
                    })) : e.browser.msie && i.elements.tooltip.find('.qtip-wrapper [nodeName="arc"]').each(function () {
                        e(this).attr("fillcolor", i.options.style.border.color)
                    })), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_STYLE_UPDATED, "updateStyle")) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateStyle")
                },
                updateContent: function (t, n) {
                    function u() {
                        i.updateWidth(), n !== !1 && (i.options.position.type !== "static" && i.updatePosition(i.elements.tooltip.is(":visible"), !0), i.options.style.tip.corner !== !1 && a.call(i))
                    }
                    var r, s, o;
                    if (!i.status.rendered) return e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateContent");
                    if (!t) return e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.NO_CONTENT_PROVIDED, "updateContent");
                    r = i.beforeContentUpdate.call(i, t);
                    if (typeof r == "string") t = r;
                    else if (r === !1) return;
                    return e.browser.msie && i.elements.contentWrapper.children().css({
                        zoom: "normal"
                    }), t.jquery && t.length > 0 ? t.clone(!0).appendTo(i.elements.content).show() : i.elements.content.html(t), s = i.elements.content.find("img[complete=false]"), s.length > 0 ? (o = 0, s.each(function (t) {
                        e('<img src="' + e(this).attr("src") + '" />').load(function () {
                            ++o == s.length && u()
                        })
                    })) : u(), i.onContentUpdate.call(i), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_CONTENT_UPDATED, "loadContent")
                },
                loadContent: function (t, n, r) {
                    function o(t) {
                        i.onContentLoad.call(i), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_CONTENT_LOADED, "loadContent"), i.updateContent(t)
                    }
                    var s;
                    return i.status.rendered ? (s = i.beforeContentLoad.call(i), s === !1 ? i : (r == "post" ? e.post(t, n, o) : e.get(t, n, o), i)) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "loadContent")
                },
                updateTitle: function (t) {
                    return i.status.rendered ? t ? (returned = i.beforeTitleUpdate.call(i), returned === !1 ? i : (i.elements.button && (i.elements.button = i.elements.button.clone(!0)), i.elements.title.html(t), i.elements.button && i.elements.title.prepend(i.elements.button), i.onTitleUpdate.call(i), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_TITLE_UPDATED, "updateTitle"))) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.NO_CONTENT_PROVIDED, "updateTitle") : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "updateTitle")
                },
                focus: function (t) {
                    var n, r, s, o;
                    if (!i.status.rendered) return e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "focus");
                    if (i.options.position.type == "static") return e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.CANNOT_FOCUS_STATIC, "focus");
                    n = parseInt(i.elements.tooltip.css("z-index")), r = 6e3 + e("div.qtip[qtip]").length - 1;
                    if (!i.status.focused && n !== r) {
                        o = i.beforeFocus.call(i, t);
                        if (o === !1) return i;
                        e("div.qtip[qtip]").not(i.elements.tooltip).each(function () {
                            e(this).qtip("api").status.rendered === !0 && (s = parseInt(e(this).css("z-index")), typeof s == "number" && s > -1 && e(this).css({
                                zIndex: parseInt(e(this).css("z-index")) - 1
                            }), e(this).qtip("api").status.focused = !1)
                        }), i.elements.tooltip.css({
                            zIndex: r
                        }), i.status.focused = !0, i.onFocus.call(i, t), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_FOCUSED, "focus")
                    }
                    return i
                },
                disable: function (t) {
                    return i.status.rendered ? (t ? i.status.disabled ? e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.TOOLTIP_ALREADY_DISABLED, "disable") : (i.status.disabled = !0, e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_DISABLED, "disable")) : i.status.disabled ? (i.status.disabled = !1, e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_ENABLED, "disable")) : e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.TOOLTIP_ALREADY_ENABLED, "disable"), i) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "disable")
                },
                destroy: function () {
                    var t, n, r;
                    n = i.beforeDestroy.call(i);
                    if (n === !1) return i;
                    i.status.rendered ? (i.options.show.when.target.unbind("mousemove.qtip", i.updatePosition), i.options.show.when.target.unbind("mouseout.qtip", i.hide), i.options.show.when.target.unbind(i.options.show.when.event + ".qtip"), i.options.hide.when.target.unbind(i.options.hide.when.event + ".qtip"), i.elements.tooltip.unbind(i.options.hide.when.event + ".qtip"), i.elements.tooltip.unbind("mouseover.qtip", i.focus), i.elements.tooltip.remove()) : i.options.show.when.target.unbind(i.options.show.when.event + ".qtip-create");
                    if (typeof i.elements.target.data("qtip") == "object") {
                        r = i.elements.target.data("qtip").interfaces;
                        if (typeof r == "object" && r.length > 0)
                            for (t = 0; t < r.length - 1; t++) r[t].id == i.id && r.splice(t, 1)
                    }
                    return delete e.fn.qtip.interfaces[i.id], typeof r == "object" && r.length > 0 ? i.elements.target.data("qtip").current = r.length - 1 : i.elements.target.removeData("qtip"), i.onDestroy.call(i), e.fn.qtip.log.error.call(i, 1, e.fn.qtip.constants.EVENT_DESTROYED, "destroy"), i.elements.target
                },
                getPosition: function () {
                    var t, n;
                    return i.status.rendered ? (t = i.elements.tooltip.css("display") !== "none" ? !1 : !0, t && i.elements.tooltip.css({
                        visiblity: "hidden"
                    }).show(), n = i.elements.tooltip.offset(), t && i.elements.tooltip.css({
                        visiblity: "visible"
                    }).hide(), n) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "getPosition")
                },
                getDimensions: function () {
                    var t, n;
                    return i.status.rendered ? (t = i.elements.tooltip.is(":visible") ? !1 : !0, t && i.elements.tooltip.css({
                        visiblity: "hidden"
                    }).show(), n = {
                        height: i.elements.tooltip.outerHeight(),
                        width: i.elements.tooltip.outerWidth()
                    }, t && i.elements.tooltip.css({
                        visiblity: "visible"
                    }).hide(), n) : e.fn.qtip.log.error.call(i, 2, e.fn.qtip.constants.TOOLTIP_NOT_RENDERED, "getDimensions")
                }
            })
        }

        function n() {
            var t, n, i, s, u, a, c;
            t = this, t.beforeRender.call(t), t.status.rendered = !0, t.elements.tooltip = '<div qtip="' + t.id + '" class="qtip ' + (t.options.style.classes.tooltip || t.options.style) + '"style="display:none; -moz-border-radius:0; -webkit-border-radius:0; border-radius:0;position:' + t.options.position.type + ';">  <div class="qtip-wrapper" style="position:relative; overflow:hidden; text-align:left;">    <div class="qtip-contentWrapper" style="overflow:hidden;">       <div class="qtip-content ' + t.options.style.classes.content + '"></div></div></div></div>', t.elements.tooltip = e(t.elements.tooltip), t.elements.tooltip.appendTo(t.options.position.container), t.elements.tooltip.data("qtip", {
                current: 0,
                interfaces: [t]
            }), t.elements.wrapper = t.elements.tooltip.children("div:first"), t.elements.contentWrapper = t.elements.wrapper.children("div:first").css({
                background: t.options.style.background
            }), t.elements.content = t.elements.contentWrapper.children("div:first").css(h(t.options.style)), e.browser.msie && t.elements.wrapper.add(t.elements.content).css({
                zoom: 1
            }), t.options.hide.when.event == "unfocus" && t.elements.tooltip.attr("unfocus", !0), typeof t.options.style.width.value == "number" && t.updateWidth(), e("<canvas>").get(0).getContext || e.browser.msie ? (t.options.style.border.radius > 0 ? r.call(t) : t.elements.contentWrapper.css({
                border: t.options.style.border.width + "px solid " + t.options.style.border.color
            }), t.options.style.tip.corner !== !1 && o.call(t)) : (t.elements.contentWrapper.css({
                border: t.options.style.border.width + "px solid " + t.options.style.border.color
            }), t.options.style.border.radius = 0, t.options.style.tip.corner = !1, e.fn.qtip.log.error.call(t, 2, e.fn.qtip.constants.CANVAS_VML_NOT_SUPPORTED, "render")), typeof t.options.content.text == "string" && t.options.content.text.length > 0 || t.options.content.text.jquery && t.options.content.text.length > 0 ? i = t.options.content.text : typeof t.elements.target.attr("title") == "string" && t.elements.target.attr("title").length > 0 ? (i = t.elements.target.attr("title").replace("\\n", "<br />"), t.elements.target.attr("title", "")) : typeof t.elements.target.attr("alt") == "string" && t.elements.target.attr("alt").length > 0 ? (i = t.elements.target.attr("alt").replace("\\n", "<br />"), t.elements.target.attr("alt", "")) : (i = " ", e.fn.qtip.log.error.call(t, 1, e.fn.qtip.constants.NO_VALID_CONTENT, "render")), t.options.content.title.text !== !1 && f.call(t), t.updateContent(i), l.call(t), t.options.show.ready === !0 && t.show(), t.options.content.url !== !1 && (s = t.options.content.url, u = t.options.content.data, a = t.options.content.method || "get", t.loadContent(s, u, a)), t.onRender.call(t), e.fn.qtip.log.error.call(t, 1, e.fn.qtip.constants.EVENT_RENDERED, "render")
        }

        function r() {
            var t, n, r, i, o, u, a, f, l, c, h, p, d, v, g;
            t = this, t.elements.wrapper.find(".qtip-borderBottom, .qtip-borderTop").remove(), r = t.options.style.border.width, i = t.options.style.border.radius, o = t.options.style.border.color || t.options.style.tip.color, u = m(i), a = {};
            for (n in u) a[n] = '<div rel="' + n + '" style="' + (n.search(/Left/) !== -1 ? "left" : "right") + ":0; position:absolute; height:" + i + "px; width:" + i + 'px; overflow:hidden; line-height:0.1px; font-size:1px">', e("<canvas>").get(0).getContext ? a[n] += '<canvas height="' + i + '" width="' + i + '" style="vertical-align: top"></canvas>' : e.browser.msie && (f = i * 2 + 3, a[n] += '<v:arc stroked="false" fillcolor="' + o + '" startangle="' + u[n][0] + '" endangle="' + u[n][1] + '" style="width:' + f + "px; height:" + f + "px; margin-top:" + (n.search(/bottom/) !== -1 ? -2 : -1) + "px; margin-left:" + (n.search(/Right/) !== -1 ? u[n][2] - 3.5 : -1) + 'px; vertical-align:top; display:inline-block; behavior:url(#default#VML)"></v:arc>'), a[n] += "</div>";
            l = t.getDimensions().width - Math.max(r, i) * 2, c = '<div class="qtip-betweenCorners" style="height:' + i + "px; width:" + l + "px; overflow:hidden; background-color:" + o + '; line-height:0.1px; font-size:1px;">', h = '<div class="qtip-borderTop" dir="ltr" style="height:' + i + "px; margin-left:" + i + 'px; line-height:0.1px; font-size:1px; padding:0;">' + a.topLeft + a.topRight + c, t.elements.wrapper.prepend(h), p = '<div class="qtip-borderBottom" dir="ltr" style="height:' + i + "px; margin-left:" + i + 'px; line-height:0.1px; font-size:1px; padding:0;">' + a.bottomLeft + a.bottomRight + c, t.elements.wrapper.append(p), e("<canvas>").get(0).getContext ? t.elements.wrapper.find("canvas").each(function () {
                d = u[e(this).parent("[rel]:first").attr("rel")], s.call(t, e(this), d, i, o)
            }) : e.browser.msie && t.elements.tooltip.append('<v:image style="behavior:url(#default#VML);"></v:image>'), v = Math.max(i, i + (r - i)), g = Math.max(r - i, 0), t.elements.contentWrapper.css({
                border: "0px solid " + o,
                borderWidth: g + "px " + v + "px"
            })
        }

        function s(e, t, n, r) {
            var i = e.get(0).getContext("2d");
            i.fillStyle = r, i.beginPath(), i.arc(t[0], t[1], n, 0, Math.PI * 2, !1), i.fill()
        }

        function o(t) {
            var n, r, i, s, o;
            n = this, n.elements.tip !== null && n.elements.tip.remove(), r = n.options.style.tip.color || n.options.style.border.color;
            if (n.options.style.tip.corner === !1) return;
            t || (t = n.options.style.tip.corner), i = v(t, n.options.style.tip.size.width, n.options.style.tip.size.height), n.elements.tip = '<div class="' + n.options.style.classes.tip + '" dir="ltr" rel="' + t + '" style="position:absolute; height:' + n.options.style.tip.size.height + "px; width:" + n.options.style.tip.size.width + 'px; margin:0 auto; line-height:0.1px; font-size:1px;">', e("<canvas>").get(0).getContext ? n.elements.tip += '<canvas height="' + n.options.style.tip.size.height + '" width="' + n.options.style.tip.size.width + '"></canvas>' : e.browser.msie && (s = n.options.style.tip.size.width + "," + n.options.style.tip.size.height, o = "m" + i[0][0] + "," + i[0][1], o += " l" + i[1][0] + "," + i[1][1], o += " " + i[2][0] + "," + i[2][1], o += " xe", n.elements.tip += '<v:shape fillcolor="' + r + '" stroked="false" filled="true" path="' + o + '" coordsize="' + s + '" style="width:' + n.options.style.tip.size.width + "px; height:" + n.options.style.tip.size.height + "px; line-height:0.1px; display:inline-block; behavior:url(#default#VML); vertical-align:" + (t.search(/top/) !== -1 ? "bottom" : "top") + '"></v:shape>', n.elements.tip += '<v:image style="behavior:url(#default#VML);"></v:image>', n.elements.contentWrapper.css("position", "relative")), n.elements.tooltip.prepend(n.elements.tip + "</div>"), n.elements.tip = n.elements.tooltip.find("." + n.options.style.classes.tip).eq(0), e("<canvas>").get(0).getContext && u.call(n, n.elements.tip.find("canvas:first"), i, r), t.search(/top/) !== -1 && e.browser.msie && parseInt(e.browser.version.charAt(0)) === 6 && n.elements.tip.css({
                marginTop: -4
            }), a.call(n, t)
        }

        function u(e, t, n) {
            var r = e.get(0).getContext("2d");
            r.fillStyle = n, r.beginPath(), r.moveTo(t[0][0], t[0][1]), r.lineTo(t[1][0], t[1][1]), r.lineTo(t[2][0], t[2][1]), r.fill()
        }

        function a(t) {
            var n, r, i, s, o;
            n = this;
            if (n.options.style.tip.corner === !1 || !n.elements.tip) return;
            t || (t = n.elements.tip.attr("rel")), r = positionAdjust = e.browser.msie ? 1 : 0, n.elements.tip.css(t.match(/left|right|top|bottom/)[0], 0), t.search(/top|bottom/) !== -1 ? (e.browser.msie && (parseInt(e.browser.version.charAt(0)) === 6 ? positionAdjust = t.search(/top/) !== -1 ? -3 : 1 : positionAdjust = t.search(/top/) !== -1 ? 1 : 2), t.search(/Middle/) !== -1 ? n.elements.tip.css({
                left: "50%",
                marginLeft: -(n.options.style.tip.size.width / 2)
            }) : t.search(/Left/) !== -1 ? n.elements.tip.css({
                left: n.options.style.border.radius - r
            }) : t.search(/Right/) !== -1 && n.elements.tip.css({
                right: n.options.style.border.radius + r
            }), t.search(/top/) !== -1 ? n.elements.tip.css({
                top: -positionAdjust
            }) : n.elements.tip.css({
                bottom: positionAdjust
            })) : t.search(/left|right/) !== -1 && (e.browser.msie && (positionAdjust = parseInt(e.browser.version.charAt(0)) === 6 ? 1 : t.search(/left/) !== -1 ? 1 : 2), t.search(/Middle/) !== -1 ? n.elements.tip.css({
                top: "50%",
                marginTop: -(n.options.style.tip.size.height / 2)
            }) : t.search(/Top/) !== -1 ? n.elements.tip.css({
                top: n.options.style.border.radius - r
            }) : t.search(/Bottom/) !== -1 && n.elements.tip.css({
                bottom: n.options.style.border.radius + r
            }), t.search(/left/) !== -1 ? n.elements.tip.css({
                left: -positionAdjust
            }) : n.elements.tip.css({
                right: positionAdjust
            })), i = "padding-" + t.match(/left|right|top|bottom/)[0], s = n.options.style.tip.size[i.search(/left|right/) !== -1 ? "width" : "height"], n.elements.tooltip.css("padding", 0), n.elements.tooltip.css(i, s), e.browser.msie && parseInt(e.browser.version.charAt(0)) == 6 && (o = parseInt(n.elements.tip.css("margin-top")) || 0, o += parseInt(n.elements.content.css("margin-top")) || 0, n.elements.tip.css({
                marginTop: o
            }))
        }

        function f() {
            var t = this;
            t.elements.title !== null && t.elements.title.remove(), t.elements.title = e('<div class="' + t.options.style.classes.title + '">').css(h(t.options.style.title, !0)).css({
                zoom: e.browser.msie ? 1 : 0
            }).prependTo(t.elements.contentWrapper), t.options.content.title.text && t.updateTitle.call(t, t.options.content.title.text), t.options.content.title.button !== !1 && typeof t.options.content.title.button == "string" && (t.elements.button = e('<a class="' + t.options.style.classes.button + '" style="float:right; position: relative"></a>').css(h(t.options.style.button, !0)).html(t.options.content.title.button).prependTo(t.elements.title).click(function (e) {
                t.status.disabled || t.hide(e)
            }))
        }

        function l() {
            function o(n) {
                if (t.status.disabled === !0) return;
                t.options.hide.when.event == "inactive" && (e(i).each(function () {
                    r.bind(this + ".qtip-inactive", s), t.elements.content.bind(this + ".qtip-inactive", s)
                }), s()), clearTimeout(t.timers.show), clearTimeout(t.timers.hide), t.timers.show = setTimeout(function () {
                    t.show(n)
                }, t.options.show.delay)
            }

            function u(n) {
                if (t.status.disabled === !0) return;
                if (t.options.hide.fixed === !0 && t.options.hide.when.event.search(/mouse(out|leave)/i) !== -1 && e(n.relatedTarget).parents("div.qtip[qtip]").length > 0) return n.stopPropagation(), n.preventDefault(), clearTimeout(t.timers.hide), !1;
                clearTimeout(t.timers.show), clearTimeout(t.timers.hide), t.elements.tooltip.stop(!0, !0), t.timers.hide = setTimeout(function () {
                    t.hide(n)
                }, t.options.hide.delay)
            }
            var t, n, r, i;
            t = this, n = t.options.show.when.target, r = t.options.hide.when.target, t.options.hide.fixed && (r = r.add(t.elements.tooltip));
            if (t.options.hide.when.event == "inactive") {
                i = ["click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseout", "mouseenter", "mouseleave", "mouseover"];

                function s(n) {
                    if (t.status.disabled === !0) return;
                    clearTimeout(t.timers.inactive), t.timers.inactive = setTimeout(function () {
                        e(i).each(function () {
                            r.unbind(this + ".qtip-inactive"), t.elements.content.unbind(this + ".qtip-inactive")
                        }), t.hide(n)
                    }, t.options.hide.delay)
                }
            } else t.options.hide.fixed === !0 && t.elements.tooltip.bind("mouseover.qtip", function () {
                if (t.status.disabled === !0) return;
                clearTimeout(t.timers.hide)
            });
            t.options.show.when.target.add(t.options.hide.when.target).length === 1 && t.options.show.when.event == t.options.hide.when.event && t.options.hide.when.event !== "inactive" || t.options.hide.when.event == "unfocus" ? (t.cache.toggle = 0, n.bind(t.options.show.when.event + ".qtip", function (e) {
                t.cache.toggle == 0 ? o(e) : u(e)
            })) : (n.bind(t.options.show.when.event + ".qtip", o), t.options.hide.when.event !== "inactive" && r.bind(t.options.hide.when.event + ".qtip", u)), t.options.position.type.search(/(fixed|absolute)/) !== -1 && t.elements.tooltip.bind("mouseover.qtip", t.focus), t.options.position.target === "mouse" && t.options.position.type !== "static" && n.bind("mousemove.qtip", function (e) {
                t.cache.mouse = {
                    x: e.pageX,
                    y: e.pageY
                }, t.status.disabled === !1 && t.options.position.adjust.mouse === !0 && t.options.position.type !== "static" && t.elements.tooltip.css("display") !== "none" && t.updatePosition(e)
            })
        }

        function c(t, n, r) {
            var i, s, u, a, f, l;
            return i = this, r.corner == "center" ? n.position : (s = e.extend({}, t), a = {
                x: !1,
                y: !1
            }, f = {
                left: s.left < e.fn.qtip.cache.screen.scroll.left,
                right: s.left + r.dimensions.width + 2 >= e.fn.qtip.cache.screen.width + e.fn.qtip.cache.screen.scroll.left,
                top: s.top < e.fn.qtip.cache.screen.scroll.top,
                bottom: s.top + r.dimensions.height + 2 >= e.fn.qtip.cache.screen.height + e.fn.qtip.cache.screen.scroll.top
            }, u = {
                left: f.left && (r.corner.search(/right/i) != -1 || r.corner.search(/right/i) == -1 && !f.right),
                right: f.right && (r.corner.search(/left/i) != -1 || r.corner.search(/left/i) == -1 && !f.left),
                top: f.top && r.corner.search(/top/i) == -1,
                bottom: f.bottom && r.corner.search(/bottom/i) == -1
            }, u.left ? (i.options.position.target !== "mouse" ? s.left = n.position.left + n.dimensions.width : s.left = i.cache.mouse.x, a.x = "Left") : u.right && (i.options.position.target !== "mouse" ? s.left = n.position.left - r.dimensions.width : s.left = i.cache.mouse.x - r.dimensions.width, a.x = "Right"), u.top ? (i.options.position.target !== "mouse" ? s.top = n.position.top + n.dimensions.height : s.top = i.cache.mouse.y, a.y = "top") : u.bottom && (i.options.position.target !== "mouse" ? s.top = n.position.top - r.dimensions.height : s.top = i.cache.mouse.y - r.dimensions.height, a.y = "bottom"), s.left < 0 && (s.left = t.left, a.x = !1), s.top < 0 && (s.top = t.top, a.y = !1), i.options.style.tip.corner !== !1 && (s.corner = new String(r.corner), a.x !== !1 && (s.corner = s.corner.replace(/Left|Right|Middle/, a.x)), a.y !== !1 && (s.corner = s.corner.replace(/top|bottom/, a.y)), s.corner !== i.elements.tip.attr("rel") && o.call(i, s.corner)), s)
        }

        function h(t, n) {
            var r, i;
            r = e.extend(!0, {}, t);
            for (i in r) n === !0 && i.search(/(tip|classes)/i) !== -1 ? delete r[i] : !n && i.search(/(width|border|tip|title|classes|user)/i) !== -1 && delete r[i];
            return r
        }

        function p(e) {
            return typeof e.tip != "object" && (e.tip = {
                corner: e.tip
            }), typeof e.tip.size != "object" && (e.tip.size = {
                width: e.tip.size,
                height: e.tip.size
            }), typeof e.border != "object" && (e.border = {
                width: e.border
            }), typeof e.width != "object" && (e.width = {
                value: e.width
            }), typeof e.width.max == "string" && (e.width.max = parseInt(e.width.max.replace(/([0-9]+)/i, "$1"))), typeof e.width.min == "string" && (e.width.min = parseInt(e.width.min.replace(/([0-9]+)/i, "$1"))), typeof e.tip.size.x == "number" && (e.tip.size.width = e.tip.size.x, delete e.tip.size.x), typeof e.tip.size.y == "number" && (e.tip.size.height = e.tip.size.y, delete e.tip.size.y), e
        }

        function d() {
            var t, n, r, i, s, o;
            t = this, r = [!0, {}];
            for (n = 0; n < arguments.length; n++) r.push(arguments[n]);
            i = [e.extend.apply(e, r)];
            while (typeof i[0].name == "string") i.unshift(p(e.fn.qtip.styles[i[0].name]));
            return i.unshift(!0, {
                classes: {
                    tooltip: "qtip-" + (arguments[0].name || "defaults")
                }
            }, e.fn.qtip.styles.defaults), s = e.extend.apply(e, i), o = e.browser.msie ? 1 : 0, s.tip.size.width += o, s.tip.size.height += o, s.tip.size.width % 2 > 0 && (s.tip.size.width += 1), s.tip.size.height % 2 > 0 && (s.tip.size.height += 1), s.tip.corner === !0 && (s.tip.corner = t.options.position.corner.tooltip === "center" ? !1 : t.options.position.corner.tooltip), s
        }

        function v(e, t, n) {
            var r = {
                bottomRight: [
                    [0, 0],
                    [t, n],
                    [t, 0]
                ],
                bottomLeft: [
                    [0, 0],
                    [t, 0],
                    [0, n]
                ],
                topRight: [
                    [0, n],
                    [t, 0],
                    [t, n]
                ],
                topLeft: [
                    [0, 0],
                    [0, n],
                    [t, n]
                ],
                topMiddle: [
                    [0, n],
                    [t / 2, 0],
                    [t, n]
                ],
                bottomMiddle: [
                    [0, 0],
                    [t, 0],
                    [t / 2, n]
                ],
                rightMiddle: [
                    [0, 0],
                    [t, n / 2],
                    [0, n]
                ],
                leftMiddle: [
                    [t, 0],
                    [t, n],
                    [0, n / 2]
                ]
            };
            return r.leftTop = r.bottomRight, r.rightTop = r.bottomLeft, r.leftBottom = r.topRight, r.rightBottom = r.topLeft, r[e]
        }

        function m(t) {
            var n;
            return e("<canvas>").get(0).getContext ? n = {
                topLeft: [t, t],
                topRight: [0, t],
                bottomLeft: [t, 0],
                bottomRight: [0, 0]
            } : e.browser.msie && (n = {
                topLeft: [-90, 90, 0],
                topRight: [-90, 90, -t],
                bottomLeft: [90, 270, 0],
                bottomRight: [90, 270, -t]
            }), n
        }

        function g() {
            var e, t, n;
            e = this, n = e.getDimensions(), t = '<iframe class="qtip-bgiframe" frameborder="0" tabindex="-1" src="javascript:false" style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=\'0\'); border: 1px solid red; height:' + n.height + "px; width:" + n.width + 'px" />', e.elements.bgiframe = e.elements.wrapper.prepend(t).children(".qtip-bgiframe:first")
        }
        e.fn.qtip = function (r, i) {
            var s, o, u, a, f, l, c, h;
            if (typeof r == "string") {
                typeof e(this).data("qtip") != "object" && e.fn.qtip.log.error.call(self, 1, e.fn.qtip.constants.NO_TOOLTIP_PRESENT, !1);
                if (r == "api") return e(this).data("qtip").interfaces[e(this).data("qtip").current];
                if (r == "interfaces") return e(this).data("qtip").interfaces
            } else {
                r || (r = {});
                if (typeof r.content != "object" || r.content.jquery && r.content.length > 0) r.content = {
                    text: r.content
                };
                typeof r.content.title != "object" && (r.content.title = {
                    text: r.content.title
                }), typeof r.position != "object" && (r.position = {
                    corner: r.position
                }), typeof r.position.corner != "object" && (r.position.corner = {
                    target: r.position.corner,
                    tooltip: r.position.corner
                }), typeof r.show != "object" && (r.show = {
                    when: r.show
                }), typeof r.show.when != "object" && (r.show.when = {
                    event: r.show.when
                }), typeof r.show.effect != "object" && (r.show.effect = {
                    type: r.show.effect
                }), typeof r.hide != "object" && (r.hide = {
                    when: r.hide
                }), typeof r.hide.when != "object" && (r.hide.when = {
                    event: r.hide.when
                }), typeof r.hide.effect != "object" && (r.hide.effect = {
                    type: r.hide.effect
                }), typeof r.style != "object" && (r.style = {
                    name: r.style
                }), r.style = p(r.style), a = e.extend(!0, {}, e.fn.qtip.defaults, r), a.style = d.call({
                    options: a
                }, a.style), a.user = e.extend(!0, {}, r)
            }
            return e(this).each(function () {
                if (typeof r == "string") {
                    l = r.toLowerCase(), u = e(this).qtip("interfaces");
                    if (typeof u == "object")
                        if (i === !0 && l == "destroy")
                            while (u.length > 0) u[u.length - 1].destroy();
                        else {
                            i !== !0 && (u = [e(this).qtip("api")]);
                            for (s = 0; s < u.length; s++) l == "destroy" ? u[s].destroy() : u[s].status.rendered === !0 && (l == "show" ? u[s].show() : l == "hide" ? u[s].hide() : l == "focus" ? u[s].focus() : l == "disable" ? u[s].disable(!0) : l == "enable" && u[s].disable(!1))
                        }
                } else {
                    c = e.extend(!0, {}, a), c.hide.effect.length = a.hide.effect.length, c.show.effect.length = a.show.effect.length, c.position.container === !1 && (c.position.container = e(document.body)), c.position.target === !1 && (c.position.target = e(this)), c.show.when.target === !1 && (c.show.when.target = e(this)), c.hide.when.target === !1 && (c.hide.when.target = e(this)), o = e.fn.qtip.interfaces.length;
                    for (s = 0; s < o; s++)
                        if (typeof e.fn.qtip.interfaces[s] == "undefined") {
                            o = s;
                            break
                        }
                    f = new t(e(this), c, o), e.fn.qtip.interfaces[o] = f, typeof e(this).data("qtip") == "object" ? (typeof e(this).attr("qtip") == "undefined" && (e(this).data("qtip").current = e(this).data("qtip").interfaces.length), e(this).data("qtip").interfaces.push(f)) : e(this).data("qtip", {
                        current: 0,
                        interfaces: [f]
                    }), c.content.prerender === !1 && c.show.when.event !== !1 && c.show.ready !== !0 ? c.show.when.target.bind(c.show.when.event + ".qtip-" + o + "-create", {
                        qtip: o
                    }, function (t) {
                        h = e.fn.qtip.interfaces[t.data.qtip], h.options.show.when.target.unbind(h.options.show.when.event + ".qtip-" + t.data.qtip + "-create"), h.cache.mouse = {
                            x: t.pageX,
                            y: t.pageY
                        }, n.call(h), h.options.show.when.target.trigger(h.options.show.when.event)
                    }) : (f.cache.mouse = {
                        x: c.show.when.target.offset().left,
                        y: c.show.when.target.offset().top
                    }, n.call(f))
                }
            })
        }, e(document).ready(function () {
            e.fn.qtip.cache = {
                screen: {
                    scroll: {
                        left: e(window).scrollLeft(),
                        top: e(window).scrollTop()
                    },
                    width: e(window).width(),
                    height: e(window).height()
                }
            };
            var t;
            e(window).bind("resize scroll", function (n) {
                clearTimeout(t), t = setTimeout(function () {
                    n.type === "scroll" ? e.fn.qtip.cache.screen.scroll = {
                        left: e(window).scrollLeft(),
                        top: e(window).scrollTop()
                    } : (e.fn.qtip.cache.screen.width = e(window).width(), e.fn.qtip.cache.screen.height = e(window).height());
                    for (i = 0; i < e.fn.qtip.interfaces.length; i++) {
                        var t = e.fn.qtip.interfaces[i];
                        t.status.rendered === !0 && (t.options.position.type !== "static" || t.options.position.adjust.scroll && n.type === "scroll" || t.options.position.adjust.resize && n.type === "resize") && t.updatePosition(n, !0)
                    }
                }, 100)
            }), e(document).bind("mousedown.qtip", function (t) {
                e(t.target).parents("div.qtip").length === 0 && e(".qtip[unfocus]").each(function () {
                    var n = e(this).qtip("api");
                    e(this).is(":visible") && !n.status.disabled && e(t.target).add(n.elements.target).length > 1 && n.hide(t)
                })
            })
        }), e.fn.qtip.interfaces = [], e.fn.qtip.log = {
            error: function () {
                return this
            }
        }, e.fn.qtip.constants = {}, e.fn.qtip.defaults = {
            content: {
                prerender: !1,
                text: !1,
                url: !1,
                data: null,
                title: {
                    text: !1,
                    button: !1
                }
            },
            position: {
                target: !1,
                corner: {
                    target: "bottomRight",
                    tooltip: "topLeft"
                },
                adjust: {
                    x: 0,
                    y: 0,
                    mouse: !0,
                    screen: !1,
                    scroll: !0,
                    resize: !0
                },
                type: "absolute",
                container: !1
            },
            show: {
                when: {
                    target: !1,
                    event: "mouseover"
                },
                effect: {
                    type: "fade",
                    length: 100
                },
                delay: 140,
                solo: !1,
                ready: !1
            },
            hide: {
                when: {
                    target: !1,
                    event: "mouseout"
                },
                effect: {
                    type: "fade",
                    length: 100
                },
                delay: 0,
                fixed: !1
            },
            api: {
                beforeRender: function () {},
                onRender: function () {},
                beforePositionUpdate: function () {},
                onPositionUpdate: function () {},
                beforeShow: function () {},
                onShow: function () {},
                beforeHide: function () {},
                onHide: function () {},
                beforeContentUpdate: function () {},
                onContentUpdate: function () {},
                beforeContentLoad: function () {},
                onContentLoad: function () {},
                beforeTitleUpdate: function () {},
                onTitleUpdate: function () {},
                beforeDestroy: function () {},
                onDestroy: function () {},
                beforeFocus: function () {},
                onFocus: function () {}
            }
        }, e.fn.qtip.styles = {
            defaults: {
                background: "white",
                color: "#111",
                overflow: "hidden",
                textAlign: "left",
                width: {
                    min: 0,
                    max: 250
                },
                padding: "5px 9px",
                border: {
                    width: 1,
                    radius: 0,
                    color: "#d3d3d3"
                },
                tip: {
                    corner: !1,
                    color: !1,
                    size: {
                        width: 13,
                        height: 13
                    },
                    opacity: 1
                },
                title: {
                    background: "#e1e1e1",
                    fontWeight: "bold",
                    padding: "7px 12px"
                },
                button: {
                    cursor: "pointer"
                },
                classes: {
                    target: "",
                    tip: "qtip-tip",
                    title: "qtip-title",
                    button: "qtip-button",
                    content: "qtip-content",
                    active: "qtip-active"
                }
            },
            cream: {
                border: {
                    width: 3,
                    radius: 0,
                    color: "#F9E98E"
                },
                title: {
                    background: "#F0DE7D",
                    color: "#A27D35"
                },
                background: "#FBF7AA",
                color: "#A27D35",
                classes: {
                    tooltip: "qtip-cream"
                }
            },
            light: {
                border: {
                    width: 3,
                    radius: 0,
                    color: "#E2E2E2"
                },
                title: {
                    background: "#f1f1f1",
                    color: "#454545"
                },
                background: "white",
                color: "#454545",
                classes: {
                    tooltip: "qtip-light"
                }
            },
            dark: {
                border: {
                    width: 3,
                    radius: 0,
                    color: "#303030"
                },
                title: {
                    background: "#404040",
                    color: "#f3f3f3"
                },
                background: "#505050",
                color: "#f3f3f3",
                classes: {
                    tooltip: "qtip-dark"
                }
            },
            red: {
                border: {
                    width: 3,
                    radius: 0,
                    color: "#CE6F6F"
                },
                title: {
                    background: "#f28279",
                    color: "#9C2F2F"
                },
                background: "#F79992",
                color: "#9C2F2F",
                classes: {
                    tooltip: "qtip-red"
                }
            },
            green: {
                border: {
                    width: 3,
                    radius: 0,
                    color: "#A9DB66"
                },
                title: {
                    background: "#b9db8c",
                    color: "#58792E"
                },
                background: "#CDE6AC",
                color: "#58792E",
                classes: {
                    tooltip: "qtip-green"
                }
            },
            blue: {
                border: {
                    width: 3,
                    radius: 0,
                    color: "#ADD9ED"
                },
                title: {
                    background: "#D0E9F5",
                    color: "#5E99BD"
                },
                background: "#E5F6FE",
                color: "#4D9FBF",
                classes: {
                    tooltip: "qtip-blue"
                }
            }
        }
    }(jQuery),
    function ($) {
        $.extend({
            metadata: {
                defaults: {
                    type: "class",
                    name: "metadata",
                    cre: /({.*})/,
                    single: "metadata"
                },
                setType: function (e, t) {
                    this.defaults.type = e, this.defaults.name = t
                },
                get: function (elem, opts) {
                    var settings = $.extend({}, this.defaults, opts);
                    settings.single.length || (settings.single = "metadata");
                    var data = $.data(elem, settings.single);
                    if (data) return data;
                    data = "{}";
                    if (settings.type == "class") {
                        var m = settings.cre.exec(elem.className);
                        m && (data = m[1])
                    } else if (settings.type == "elem") {
                        if (!elem.getElementsByTagName) return undefined;
                        var e = elem.getElementsByTagName(settings.name);
                        e.length && (data = $.trim(e[0].innerHTML))
                    } else if (elem.getAttribute != undefined) {
                        var attr = elem.getAttribute(settings.name);
                        attr && (data = attr)
                    }
                    return data.indexOf("{") < 0 && (data = "{" + data + "}"), data = eval("(" + data + ")"), $.data(elem, settings.single, data), data
                }
            }
        }), $.fn.metadata = function (e) {
            return $.metadata.get(this[0], e)
        }
    }(jQuery),
    function (e) {
        e.extend(e.fn, {
            validate: function (t) {
                if (!this.length) {
                    t && t.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
                    return
                }
                var n = e.data(this[0], "validator");
                if (n) return n;
                this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), e.data(this[0], "validator", n);
                if (n.settings.onsubmit) {
                    var r = this
                        .find("input, button");
                    r.filter(".cancel").click(function () {
                        n.cancelSubmit = !0
                    }), n.settings.submitHandler && r.filter(":submit").click(function () {
                        n.submitButton = this
                    }), this.submit(function (t) {
                        function r() {
                            if (n.settings.submitHandler) {
                                if (n.submitButton) var t = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(n.submitButton.value).appendTo(n.currentForm);
                                return n.settings.submitHandler.call(n, n.currentForm), n.submitButton && t.remove(), !1
                            }
                            return !0
                        }
                        return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit = !1, r()) : n.form() ? n.pendingRequest ? (n.formSubmitted = !0, !1) : r() : (n.focusInvalid(), !1)
                    })
                }
                return n
            },
            valid: function () {
                if (e(this[0]).is("form")) return this.validate().form();
                var t = !0,
                    n = e(this[0].form).validate();
                return this.each(function () {
                    t &= n.element(this)
                }), t
            },
            removeAttrs: function (t) {
                var n = {}, r = this;
                return e.each(t.split(/\s/), function (e, t) {
                    n[t] = r.attr(t), r.removeAttr(t)
                }), n
            },
            rules: function (t, n) {
                var r = this[0];
                if (t) {
                    var i = e.data(r.form, "validator").settings,
                        s = i.rules,
                        o = e.validator.staticRules(r);
                    switch (t) {
                        case "add":
                            e.extend(o, e.validator.normalizeRule(n)), s[r.name] = o, n.messages && (i.messages[r.name] = e.extend(i.messages[r.name], n.messages));
                            break;
                        case "remove":
                            if (!n) return delete s[r.name], o;
                            var u = {};
                            return e.each(n.split(/\s/), function (e, t) {
                                u[t] = o[t], delete o[t]
                            }), u
                    }
                }
                var a = e.validator.normalizeRules(e.extend({}, e.validator.metadataRules(r), e.validator.classRules(r), e.validator.attributeRules(r), e.validator.staticRules(r)), r);
                if (a.required) {
                    var f = a.required;
                    delete a.required, a = e.extend({
                        required: f
                    }, a)
                }
                return a
            }
        }), e.extend(e.expr[":"], {
            blank: function (t) {
                return !e.trim("" + t.value)
            },
            filled: function (t) {
                return !!e.trim("" + t.value)
            },
            unchecked: function (e) {
                return !e.checked
            }
        }), e.validator = function (t, n) {
            this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, this.init()
        }, e.validator.format = function (t, n) {
            return arguments.length == 1 ? function () {
                var n = e.makeArray(arguments);
                return n.unshift(t), e.validator.format.apply(this, n)
            } : (arguments.length > 2 && n.constructor != Array && (n = e.makeArray(arguments).slice(1)), n.constructor != Array && (n = [n]), e.each(n, function (e, n) {
                t = t.replace(new RegExp("\\{" + e + "\\}", "g"), n)
            }), t)
        }, e.extend(e.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: e([]),
                errorLabelContainer: e([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (e, t) {
                    this.lastActive = e, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(e)).hide())
                },
                onfocusout: function (e, t) {
                    !this.checkable(e) && (e.name in this.submitted || !this.optional(e)) && this.element(e)
                },
                onkeyup: function (e, t) {
                    (e.name in this.submitted || e == this.lastElement) && this.element(e)
                },
                onclick: function (e, t) {
                    e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
                },
                highlight: function (t, n, r) {
                    t.type === "radio" ? this.findByName(t.name).addClass(n).removeClass(r) : e(t).addClass(n).removeClass(r)
                },
                unhighlight: function (t, n, r) {
                    t.type === "radio" ? this.findByName(t.name).removeClass(n).addClass(r) : e(t).removeClass(n).addClass(r)
                }
            },
            setDefaults: function (t) {
                e.extend(e.validator.defaults, t)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                accept: "Please enter a value with a valid extension.",
                maxlength: e.validator.format("Please enter no more than {0} characters."),
                minlength: e.validator.format("Please enter at least {0} characters."),
                rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
                range: e.validator.format("Please enter a value between {0} and {1}."),
                max: e.validator.format("Please enter a value less than or equal to {0}."),
                min: e.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function r(t) {
                        var n = e.data(this[0].form, "validator"),
                            r = "on" + t.type.replace(/^validate/, "");
                        n.settings[r] && n.settings[r].call(n, this[0], t)
                    }
                    this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var t = this.groups = {};
                    e.each(this.settings.groups, function (n, r) {
                        e.each(r.split(/\s/), function (e, r) {
                            t[r] = n
                        })
                    });
                    var n = this.settings.rules;
                    e.each(n, function (t, r) {
                        n[t] = e.validator.normalizeRule(r)
                    }), e(this.currentForm).validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", r).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", r), this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function () {
                    return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                    return this.valid()
                },
                element: function (t) {
                    t = this.validationTargetFor(this.clean(t)), this.lastElement = t, this.prepareElement(t), this.currentElements = e(t);
                    var n = this.check(t);
                    return n ? delete this.invalid[t.name] : this.invalid[t.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n
                },
                showErrors: function (t) {
                    if (t) {
                        e.extend(this.errorMap, t), this.errorList = [];
                        for (var n in t) this.errorList.push({
                            message: t[n],
                            element: this.findByName(n)[0]
                        });
                        this.successList = e.grep(this.successList, function (e) {
                            return !(e.name in t)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function () {
                    e.fn.resetForm && e(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass)
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                },
                objectLength: function (e) {
                    var t = 0;
                    for (var n in e) t++;
                    return t
                },
                hideErrors: function () {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function () {
                    return this.size() == 0
                },
                size: function () {
                    return this.errorList.length
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
                },
                findLastActive: function () {
                    var t = this.lastActive;
                    return t && e.grep(this.errorList, function (e) {
                        return e.element.name == t.name
                    }).length == 1 && t
                },
                elements: function () {
                    var t = this,
                        n = {};
                    return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in n || !t.objectLength(e(this).rules()) ? !1 : (n[this.name] = !0, !0)
                    })
                },
                clean: function (t) {
                    return e(t)[0]
                },
                errors: function () {
                    return e(this.settings.errorElement + "." + this.settings.errorClass, this.errorContext)
                },
                reset: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([]), this.currentElements = e([])
                },
                prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function (e) {
                    this.reset(), this.toHide = this.errorsFor(e)
                },
                check: function (t) {
                    t = this.validationTargetFor(this.clean(t));
                    var n = e(t).rules(),
                        r = !1;
                    for (var i in n) {
                        var s = {
                            method: i,
                            parameters: n[i]
                        };
                        try {
                            var o = e.validator.methods[i].call(this, t.value.replace(/\r/g, ""), t, s.parameters);
                            if (o == "dependency-mismatch") {
                                r = !0;
                                continue
                            }
                            r = !1;
                            if (o == "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(t));
                                return
                            }
                            if (!o) return this.formatAndAdd(t, s), !1
                        } catch (u) {
                            throw this.settings.debug && window.console && console.log("exception occured when checking element " + t.id + ", check the '" + s.method + "' method", u), u
                        }
                    }
                    if (r) return;
                    return this.objectLength(n) && this.successList.push(t), !0
                },
                customMetaMessage: function (t, n) {
                    if (!e.metadata) return;
                    var r = this.settings.meta ? e(t).metadata()[this.settings.meta] : e(t).metadata();
                    return r && r.messages && r.messages[n]
                },
                customMessage: function (e, t) {
                    var n = this.settings.messages[e];
                    return n && (n.constructor == String ? n : n[t])
                },
                findDefined: function () {
                    for (var e = 0; e < arguments.length; e++)
                        if (arguments[e] !== undefined) return arguments[e];
                    return undefined
                },
                defaultMessage: function (t, n) {
                    return this.findDefined(this.customMessage(t.name, n), this.customMetaMessage(t, n), !this.settings.ignoreTitle && t.title || undefined, e.validator.messages[n], "<strong>Warning: No message defined for " + t.name + "</strong>")
                },
                formatAndAdd: function (e, t) {
                    var n = this.defaultMessage(e, t.method),
                        r = /\$?\{(\d+)\}/g;
                    typeof n == "function" ? n = n.call(this, t.parameters, e) : r.test(n) && (n = jQuery.format(n.replace(r, "{$1}"), t.parameters)), this.errorList.push({
                        message: n,
                        element: e
                    }), this.errorMap[e.name] = n, this.submitted[e.name] = n
                },
                addWrapper: function (e) {
                    return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
                },
                defaultShowErrors: function () {
                    for (var e = 0; this.errorList[e]; e++) {
                        var t = this.errorList[e];
                        this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message)
                    }
                    this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                    if (this.settings.success)
                        for (var e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                    if (this.settings.unhighlight)
                        for (var e = 0, n = this.validElements(); n[e]; e++) this.settings.unhighlight.call(this, n[e], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function () {
                    return e(this.errorList).map(function () {
                        return this.element
                    })
                },
                showLabel: function (t, n) {
                    var r = this.errorsFor(t);
                    r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.attr("generated") && r.html(n)) : (r = e("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(t),
                        generated: !0
                    }).addClass(this.settings.errorClass).html(n || ""), this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, e(t)) : r.insertAfter(t))), !n && this.settings.success && (r.text(""), typeof this.settings.success == "string" ? r.addClass(this.settings.success) : this.settings.success(r)), this.toShow = this.toShow.add(r)
                },
                errorsFor: function (t) {
                    var n = this.idOrName(t);
                    return this.errors().filter(function () {
                        return e(this).attr("for") == n
                    })
                },
                idOrName: function (e) {
                    return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
                },
                validationTargetFor: function (e) {
                    return this.checkable(e) && (e = this.findByName(e.name).not(this.settings.ignore)[0]), e
                },
                checkable: function (e) {
                    return /radio|checkbox/i.test(e.type)
                },
                findByName: function (t) {
                    var n = this.currentForm;
                    return e(document.getElementsByName(t)).map(function (e, r) {
                        return r.form == n && r.name == t && r || null
                    })
                },
                getLength: function (t, n) {
                    switch (n.nodeName.toLowerCase()) {
                        case "select":
                            return e("option:selected", n).length;
                        case "input":
                            if (this.checkable(n)) return this.findByName(n.name).filter(":checked").length
                    }
                    return t.length
                },
                depend: function (e, t) {
                    return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) : !0
                },
                dependTypes: {
                    "boolean": function (e, t) {
                        return e
                    },
                    string: function (t, n) {
                        return !!e(t, n.form).length
                    },
                    "function": function (e, t) {
                        return e(t)
                    }
                },
                optional: function (t) {
                    return !e.validator.methods.required.call(this, e.trim(t.value), t) && "dependency-mismatch"
                },
                startRequest: function (e) {
                    this.pending[e.name] || (this.pendingRequest++, this.pending[e.name] = !0)
                },
                stopRequest: function (t, n) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], n && this.pendingRequest == 0 && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !n && this.pendingRequest == 0 && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function (t) {
                    return e.data(t, "previousValue") || e.data(t, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(t, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                dateDE: {
                    dateDE: !0
                },
                number: {
                    number: !0
                },
                numberDE: {
                    numberDE: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function (t, n) {
                t.constructor == String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t)
            },
            classRules: function (t) {
                var n = {}, r = e(t).attr("class");
                return r && e.each(r.split(" "), function () {
                    this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this])
                }), n
            },
            attributeRules: function (t) {
                var n = {}, r = e(t);
                for (var i in e.validator.methods) {
                    var s;
                    i === "required" && typeof e.fn.prop == "function" ? s = r.prop(i) : s = r.attr(i), s ? n[i] = s : r[0].getAttribute("type") === i && (n[i] = !0)
                }
                return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength, n
            },
            metadataRules: function (t) {
                if (!e.metadata) return {};
                var n = e.data(t.form, "validator").settings.meta;
                return n ? e(t).metadata()[n] : e(t).metadata()
            },
            staticRules: function (t) {
                var n = {}, r = e.data(t.form, "validator");
                return r.settings.rules && (n = e.validator.normalizeRule(r.settings.rules[t.name]) || {}), n
            },
            normalizeRules: function (t, n) {
                return e.each(t, function (r, i) {
                    if (i === !1) {
                        delete t[r];
                        return
                    }
                    if (i.param || i.depends) {
                        var s = !0;
                        switch (typeof i.depends) {
                            case "string":
                                s = !! e(i.depends, n.form).length;
                                break;
                            case "function":
                                s = i.depends.call(n, n)
                        }
                        s ? t[r] = i.param !== undefined ? i.param : !0 : delete t[r]
                    }
                }), e.each(t, function (r, i) {
                    t[r] = e.isFunction(i) ? i(n) : i
                }), e.each(["minlength", "maxlength", "min", "max"], function () {
                    t[this] && (t[this] = Number(t[this]))
                }), e.each(["rangelength", "range"], function () {
                    t[this] && (t[this] = [Number(t[this][0]), Number(t[this][1])])
                }), e.validator.autoCreateRanges && (t.min && t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), t.minlength && t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t.messages && delete t.messages, t
            },
            normalizeRule: function (t) {
                if (typeof t == "string") {
                    var n = {};
                    e.each(t.split(/\s/), function () {
                        n[this] = !0
                    }), t = n
                }
                return t
            },
            addMethod: function (t, n, r) {
                e.validator.methods[t] = n, e.validator.messages[t] = r != undefined ? r : e.validator.messages[t], n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
            },
            methods: {
                required: function (t, n, r) {
                    if (!this.depend(r, n)) return "dependency-mismatch";
                    switch (n.nodeName.toLowerCase()) {
                        case "select":
                            var i = e(n).val();
                            return i && i.length > 0;
                        case "input":
                            if (this.checkable(n)) return this.getLength(t, n) > 0;
                        default:
                            return e.trim(t).length > 0
                    }
                },
                remote: function (t, n, r) {
                    if (this.optional(n)) return "dependency-mismatch";
                    var i = this.previousValue(n);
                    this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), i.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = i.message, r = typeof r == "string" && {
                        url: r
                    } || r;
                    if (this.pending[n.name]) return "pending";
                    if (i.old === t) return i.valid;
                    i.old = t;
                    var s = this;
                    this.startRequest(n);
                    var o = {};
                    return o[n.name] = t, e.ajax(e.extend(!0, {
                        url: r,
                        mode: "abort",
                        port: "validate" + n.name,
                        dataType: "json",
                        data: o,
                        success: function (r) {
                            s.settings.messages[n.name].remote = i.originalMessage;
                            var o = r === !0;
                            if (o) {
                                var u = s.formSubmitted;
                                s.prepareElement(n), s.formSubmitted = u, s.successList.push(n), s.showErrors()
                            } else {
                                var a = {}, f = r || s.defaultMessage(n, "remote");
                                a[n.name] = i.message = e.isFunction(f) ? f(t) : f, s.showErrors(a)
                            }
                            i.valid = o, s.stopRequest(n, o)
                        }
                    }, r)), "pending"
                },
                minlength: function (t, n, r) {
                    return this.optional(n) || this.getLength(e.trim(t), n) >= r
                },
                maxlength: function (t, n, r) {
                    return this.optional(n) || this.getLength(e.trim(t), n) <= r
                },
                rangelength: function (t, n, r) {
                    var i = this.getLength(e.trim(t), n);
                    return this.optional(n) || i >= r[0] && i <= r[1]
                },
                min: function (e, t, n) {
                    return this.optional(t) || e >= n
                },
                max: function (e, t, n) {
                    return this.optional(t) || e <= n
                },
                range: function (e, t, n) {
                    return this.optional(t) || e >= n[0] && e <= n[1]
                },
                email: function (e, t) {
                    return this.optional(t) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)
                },
                url: function (e, t) {
                    return this.optional(t) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
                },
                date: function (e, t) {
                    return this.optional(t) || !/Invalid|NaN/.test(new Date(e))
                },
                dateISO: function (e, t) {
                    return this.optional(t) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(e)
                },
                number: function (e, t) {
                    return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(e)
                },
                digits: function (e, t) {
                    return this.optional(t) || /^\d+$/.test(e)
                },
                creditcard: function (e, t) {
                    if (this.optional(t)) return "dependency-mismatch";
                    if (/[^0-9 -]+/.test(e)) return !1;
                    var n = 0,
                        r = 0,
                        i = !1;
                    e = e.replace(/\D/g, "");
                    for (var s = e.length - 1; s >= 0; s--) {
                        var o = e.charAt(s),
                            r = parseInt(o, 10);
                        i && (r *= 2) > 9 && (r -= 9), n += r, i = !i
                    }
                    return n % 10 == 0
                },
                accept: function (e, t, n) {
                    return n = typeof n == "string" ? n.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(t) || e.match(new RegExp(".(" + n + ")$", "i"))
                },
                equalTo: function (t, n, r) {
                    var i = e(r).unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        e(n).valid()
                    });
                    return t == i.val()
                }
            }
        }), e.format = e.validator.format
    }(jQuery),
    function (e) {
        var t = {};
        if (e.ajaxPrefilter) e.ajaxPrefilter(function (e, n, r) {
            var i = e.port;
            e.mode == "abort" && (t[i] && t[i].abort(), t[i] = r)
        });
        else {
            var n = e.ajax;
            e.ajax = function (r) {
                var i = ("mode" in r ? r : e.ajaxSettings).mode,
                    s = ("port" in r ? r : e.ajaxSettings).port;
                return i == "abort" ? (t[s] && t[s].abort(), t[s] = n.apply(this, arguments)) : n.apply(this, arguments)
            }
        }
    }(jQuery),
    function (e) {
        !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && e.each({
            focus: "focusin",
            blur: "focusout"
        }, function (t, n) {
            function r(t) {
                return t = e.event.fix(t), t.type = n, e.event.handle.call(this, t)
            }
            e.event.special[n] = {
                setup: function () {
                    this.addEventListener(t, r, !0)
                },
                teardown: function () {
                    this.removeEventListener(t, r, !0)
                },
                handler: function (t) {
                    return arguments[0] = e.event.fix(t), arguments[0].type = n, e.event.handle.apply(this, arguments)
                }
            }
        }), e.extend(e.fn, {
            validateDelegate: function (t, n, r) {
                return this.bind(n, function (n) {
                    var i = e(n.target);
                    if (i.is(t)) return r.apply(i, arguments)
                })
            }
        })
    }(jQuery),
    function (e, t, n) {
        function G(n, r, i) {
            var o = t.createElement(n);
            return r && (o.id = s + r), i && (o.style.cssText = i), e(o)
        }

        function Y(e) {
            var t = T.length,
                n = (U + e) % t;
            return n < 0 ? t + n : n
        }

        function Z(e, t) {
            return Math.round((/%/.test(e) ? (t === "x" ? N.width() : N.height()) / 100 : 1) * parseInt(e, 10))
        }

        function et(e) {
            return B.photo || /\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(e)
        }

        function tt() {
            var t, n = e.data(R, i);
            n == null ? (B = e.extend({}, r), console && console.log && console.log("Error: cboxElement missing settings object")) : B = e.extend({}, n);
            for (t in B) e.isFunction(B[t]) && t.slice(0, 2) !== "on" && (B[t] = B[t].call(R));
            B.rel = B.rel || R.rel || "nofollow", B.href = B.href || e(R).attr("href"), B.title = B.title || R.title, typeof B.href == "string" && (B.href = e.trim(B.href))
        }

        function nt(t, n) {
            e.event.trigger(t), n && n.call(R)
        }

        function rt() {
            var e, t = s + "Slideshow_",
                n = "click." + s,
                r, i, o;
            B.slideshow && T[1] ? (r = function () {
                M.text(B.slideshowStop).unbind(n).bind(f, function () {
                    if (B.loop || T[U + 1]) e = setTimeout(J.next, B.slideshowSpeed)
                }).bind(a, function () {
                        clearTimeout(e)
                    }).one(n + " " + l, i), g.removeClass(t + "off").addClass(t + "on"), e = setTimeout(J.next, B.slideshowSpeed)
            }, i = function () {
                clearTimeout(e), M.text(B.slideshowStart).unbind([f, a, l, n].join(" ")).one(n, function () {
                    J.next(), r()
                }), g.removeClass(t + "on").addClass(t + "off")
            }, B.slideshowAuto ? r() : i()) : g.removeClass(t + "off " + t + "on")
        }

        function it(t) {
            V || (R = t, tt(), T = e(R), U = 0, B.rel !== "nofollow" && (T = e("." + o).filter(function () {
                var t = e.data(this, i),
                    n;
                return t && (n = t.rel || this.rel), n === B.rel
            }), U = T.index(R), U === -1 && (T = T.add(R), U = T.length - 1)), W || (W = X = !0, g.show(), B.returnFocus && e(R).blur().one(c, function () {
                e(this).focus()
            }), m.css({
                opacity: +B.opacity,
                cursor: B.overlayClose ? "pointer" : "auto"
            }).show(), B.w = Z(B.initialWidth, "x"), B.h = Z(B.initialHeight, "y"), J.position(), d && N.bind("resize." + v + " scroll." + v, function () {
                m.css({
                    width: N.width(),
                    height: N.height(),
                    top: N.scrollTop(),
                    left: N.scrollLeft()
                })
            }).trigger("resize." + v), nt(u, B.onOpen), H.add(A).hide(), P.html(B.close).show()), J.load(!0))
        }

        function st() {
            !g && t.body && (Q = !1, N = e(n), g = G(K).attr({
                id: i,
                "class": p ? s + (d ? "IE6" : "IE") : ""
            }).hide(), m = G(K, "Overlay", d ? "position:absolute" : "").hide(), y = G(K, "Wrapper"), b = G(K, "Content").append(C = G(K, "LoadedContent", "width:0; height:0; overflow:hidden"), L = G(K, "LoadingOverlay").add(G(K, "LoadingGraphic")), A = G(K, "Title"), O = G(K, "Current"), _ = G(K, "Next"), D = G(K, "Previous"), M = G(K, "Slideshow").bind(u, rt), P = G(K, "Close")), y.append(G(K).append(G(K, "TopLeft"), w = G(K, "TopCenter"), G(K, "TopRight")), G(K, !1, "clear:left").append(E = G(K, "MiddleLeft"), b, S = G(K, "MiddleRight")), G(K, !1, "clear:left").append(G(K, "BottomLeft"), x = G(K, "BottomCenter"), G(K, "BottomRight"))).find("div div").css({
                "float": "left"
            }), k = G(K, !1, "position:absolute; width:9999px; visibility:hidden; display:none"), H = _.add(D).add(O).add(M), e(t.body).append(m, g.append(y, k)))
        }

        function ot() {
            return g ? (Q || (Q = !0, j = w.height() + x.height() + b.outerHeight(!0) - b.height(), F = E.width() + S.width() + b.outerWidth(!0) - b.width(), I = C.outerHeight(!0), q = C.outerWidth(!0), g.css({
                "padding-bottom": j,
                "padding-right": F
            }), _.click(function () {
                J.next()
            }), D.click(function () {
                J.prev()
            }), P.click(function () {
                J.close()
            }), m.click(function () {
                B.overlayClose && J.close()
            }), e(t).bind("keydown." + s, function (e) {
                var t = e.keyCode;
                W && B.escKey && t === 27 && (e.preventDefault(), J.close()), W && B.arrowKey && T[1] && (t === 37 ? (e.preventDefault(), D.click()) : t === 39 && (e.preventDefault(), _.click()))
            }), e("." + o, t).live("click", function (e) {
                e.which > 1 || e.shiftKey || e.altKey || e.metaKey || (e.preventDefault(), it(this))
            })), !0) : !1
        }
        var r = {
                transition: "elastic",
                speed: 300,
                width: !1,
                initialWidth: "600",
                innerWidth: !1,
                maxWidth: !1,
                height: !1,
                initialHeight: "450",
                innerHeight: !1,
                maxHeight: !1,
                scalePhotos: !0,
                scrolling: !0,
                inline: !1,
                html: !1,
                iframe: !1,
                fastIframe: !0,
                photo: !1,
                href: !1,
                title: !1,
                rel: !1,
                opacity: .9,
                preloading: !0,
                current: "image {current} of {total}",
                previous: "previous",
                next: "next",
                close: "close",
                xhrError: "This content failed to load.",
                imgError: "This image failed to load.",
                open: !1,
                returnFocus: !0,
                reposition: !0,
                loop: !0,
                slideshow: !1,
                slideshowAuto: !0,
                slideshowSpeed: 2500,
                slideshowStart: "start slideshow",
                slideshowStop: "stop slideshow",
                onOpen: !1,
                onLoad: !1,
                onComplete: !1,
                onCleanup: !1,
                onClosed: !1,
                overlayClose: !0,
                escKey: !0,
                arrowKey: !0,
                top: !1,
                bottom: !1,
                left: !1,
                right: !1,
                fixed: !1,
                data: undefined
            }, i = "colorbox",
            s = "cbox",
            o = s + "Element",
            u = s + "_open",
            a = s + "_load",
            f = s + "_complete",
            l = s + "_cleanup",
            c = s + "_closed",
            h = s + "_purge",
            p = !e.support.opacity && !e.support.style,
            d = p && !n.XMLHttpRequest,
            v = s + "_IE6",
            m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W, X, V, $, J, K = "div",
            Q;
        if (e.colorbox) return;
        e(st), J = e.fn[i] = e[i] = function (t, n) {
            var s = this;
            t = t || {}, st();
            if (ot()) {
                if (!s[0]) {
                    if (s.selector) return s;
                    s = e("<a/>"), t.open = !0
                }
                n && (t.onComplete = n), s.each(function () {
                    e.data(this, i, e.extend({}, e.data(this, i) || r, t))
                }).addClass(o), (e.isFunction(t.open) && t.open.call(s) || t.open) && it(s[0])
            }
            return s
        }, J.position = function (e, t) {
            function f(e) {
                w[0].style.width = x[0].style.width = b[0].style.width = e.style.width, b[0].style.height = E[0].style.height = S[0].style.height = e.style.height
            }
            var n, r = 0,
                i = 0,
                o = g.offset(),
                u, a;
            N.unbind("resize." + s), g.css({
                top: -9e4,
                left: -9e4
            }), u = N.scrollTop(), a = N.scrollLeft(), B.fixed && !d ? (o.top -= u, o.left -= a, g.css({
                position: "fixed"
            })) : (r = u, i = a, g.css({
                position: "absolute"
            })), B.right !== !1 ? i += Math.max(N.width() - B.w - q - F - Z(B.right, "x"), 0) : B.left !== !1 ? i += Z(B.left, "x") : i += Math.round(Math.max(N.width() - B.w - q - F, 0) / 2), B.bottom !== !1 ? r += Math.max(N.height() - B.h - I - j - Z(B.bottom, "y"), 0) : B.top !== !1 ? r += Z(B.top, "y") : r += Math.round(Math.max(N.height() - B.h - I - j, 0) / 2), g.css({
                top: o.top,
                left: o.left
            }), e = g.width() === B.w + q && g.height() === B.h + I ? 0 : e || 0, y[0].style.width = y[0].style.height = "9999px", n = {
                width: B.w + q,
                height: B.h + I,
                top: r,
                left: i
            }, e === 0 && g.css(n), g.dequeue().animate(n, {
                duration: e,
                complete: function () {
                    f(this), X = !1, y[0].style.width = B.w + q + F + "px", y[0].style.height = B.h + I + j + "px", B.reposition && setTimeout(function () {
                        N.bind("resize." + s, J.position)
                    }, 1), t && t()
                },
                step: function () {
                    f(this)
                }
            })
        }, J.resize = function (e) {
            W && (e = e || {}, e.width && (B.w = Z(e.width, "x") - q - F), e.innerWidth && (B.w = Z(e.innerWidth, "x")), C.css({
                width: B.w
            }), e.height && (B.h = Z(e.height, "y") - I - j), e.innerHeight && (B.h = Z(e.innerHeight, "y")), !e.innerHeight && !e.height && (C.css({
                height: "auto"
            }), B.h = C.height()), C.css({
                height: B.h
            }), J.position(B.transition === "none" ? 0 : B.speed))
        }, J.prep = function (t) {
            function o() {
                return B.w = B.w || C.width(), B.w = B.mw && B.mw < B.w ? B.mw : B.w, B.w
            }

            function u() {
                return B.h = B.h || C.height(), B.h = B.mh && B.mh < B.h ? B.mh : B.h, B.h
            }
            if (!W) return;
            var n, r = B.transition === "none" ? 0 : B.speed;
            C.remove(), C = G(K, "LoadedContent").append(t), C.hide().appendTo(k.show()).css({
                width: o(),
                overflow: B.scrolling ? "auto" : "hidden"
            }).css({
                    height: u()
                }).prependTo(b), k.hide(), e(z).css({
                "float": "none"
            }), d && e("select").not(g.find("select")).filter(function () {
                return this.style.visibility !== "hidden"
            }).css({
                    visibility: "hidden"
                }).one(l, function () {
                    this.style.visibility = "inherit"
                }), n = function () {
                function y() {
                    p && g[0].style.removeAttribute("filter")
                }
                var t, n, o = T.length,
                    u, a = "frameBorder",
                    l = "allowTransparency",
                    c, d, v, m;
                if (!W) return;
                c = function () {
                    clearTimeout($), L.hide(), nt(f, B.onComplete)
                }, p && z && C.fadeIn(100), A.html(B.title).add(C).show();
                if (o > 1) {
                    typeof B.current == "string" && O.html(B.current.replace("{current}", U + 1).replace("{total}", o)).show(), _[B.loop || U < o - 1 ? "show" : "hide"]().html(B.next), D[B.loop || U ? "show" : "hide"]().html(B.previous), B.slideshow && M.show();
                    if (B.preloading) {
                        t = [Y(-1), Y(1)];
                        while (n = T[t.pop()]) m = e.data(n, i), m && m.href ? (d = m.href, e.isFunction(d) && (d = d.call(n))) : d = n.href, et(d) && (v = new Image, v.src = d)
                    }
                } else H.hide();
                B.iframe ? (u = G("iframe")[0], a in u && (u[a] = 0), l in u && (u[l] = "true"), u.name = s + +(new Date), B.fastIframe ? c() : e(u).one("load", c), u.src = B.href, B.scrolling || (u.scrolling = "no"), e(u).addClass(s + "Iframe").appendTo(C).one(h, function () {
                    u.src = "//about:blank"
                })) : c(), B.transition === "fade" ? g.fadeTo(r, 1, y) : y()
            }, B.transition === "fade" ? g.fadeTo(r, 0, function () {
                J.position(0, n)
            }) : J.position(r, n)
        }, J.load = function (t) {
            var n, r, i = J.prep;
            X = !0, z = !1, R = T[U], t || tt(), nt(h), nt(a, B.onLoad), B.h = B.height ? Z(B.height, "y") - I - j : B.innerHeight && Z(B.innerHeight, "y"), B.w = B.width ? Z(B.width, "x") - q - F : B.innerWidth && Z(B.innerWidth, "x"), B.mw = B.w, B.mh = B.h, B.maxWidth && (B.mw = Z(B.maxWidth, "x") - q - F, B.mw = B.w && B.w < B.mw ? B.w : B.mw), B.maxHeight && (B.mh = Z(B.maxHeight, "y") - I - j, B.mh = B.h && B.h < B.mh ? B.h : B.mh), n = B.href, $ = setTimeout(function () {
                L.show()
            }, 100), B.inline ? (G(K).hide().insertBefore(e(n)[0]).one(h, function () {
                e(this).replaceWith(C.children())
            }), i(e(n))) : B.iframe ? i(" ") : B.html ? i(B.html) : et(n) ? (e(z = new Image).addClass(s + "Photo").error(function () {
                B.title = !1, i(G(K, "Error").html(B.imgError))
            }).load(function () {
                    var e;
                    z.onload = null, B.scalePhotos && (r = function () {
                        z.height -= z.height * e, z.width -= z.width * e
                    }, B.mw && z.width > B.mw && (e = (z.width - B.mw) / z.width, r()), B.mh && z.height > B.mh && (e = (z.height - B.mh) / z.height, r())), B.h && (z.style.marginTop = Math.max(B.h - z.height, 0) / 2 + "px"), T[1] && (B.loop || T[U + 1]) && (z.style.cursor = "pointer", z.onclick = function () {
                        J.next()
                    }), p && (z.style.msInterpolationMode = "bicubic"), setTimeout(function () {
                        i(z)
                    }, 1)
                }), setTimeout(function () {
                z.src = n
            }, 1)) : n && k.load(n, B.data, function (t, n, r) {
                i(n === "error" ? G(K, "Error").html(B.xhrError) : e(this).contents())
            })
        }, J.next = function () {
            !X && T[1] && (B.loop || T[U + 1]) && (U = Y(1), J.load())
        }, J.prev = function () {
            !X && T[1] && (B.loop || U) && (U = Y(-1), J.load())
        }, J.close = function () {
            W && !V && (V = !0, W = !1, nt(l, B.onCleanup), N.unbind("." + s + " ." + v), m.fadeTo(200, 0), g.stop().fadeTo(300, 0, function () {
                g.add(m).css({
                    opacity: 1,
                    cursor: "auto"
                }).hide(), nt(h), C.remove(), setTimeout(function () {
                    V = !1, nt(c, B.onClosed)
                }, 1)
            }))
        }, J.remove = function () {
            e([]).add(g).add(m).remove(), g = null, e("." + o).removeData(i).removeClass(o).die()
        }, J.element = function () {
            return e(R)
        }, J.settings = r
    }(jQuery, document, this),
    function (e) {
        e.cookie = function (t, n, r) {
            if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(n)) || n === null || n === undefined)) {
                r = e.extend({}, r);
                if (n === null || n === undefined) r.expires = -1;
                if (typeof r.expires == "number") {
                    var i = r.expires,
                        s = r.expires = new Date;
                    s.setDate(s.getDate() + i)
                }
                return n = String(n), document.cookie = [encodeURIComponent(t), "=", r.raw ? n : encodeURIComponent(n), r.expires ? "; expires=" + r.expires.toUTCString() : "", r.path ? "; path=" + r.path : "", r.domain ? "; domain=" + r.domain : "", r.secure ? "; secure" : ""].join("")
            }
            r = n || {};
            var o = r.raw ? function (e) {
                    return e
                } : decodeURIComponent,
                u = document.cookie.split("; ");
            for (var a = 0, f; f = u[a] && u[a].split("="); a++)
                if (o(f[0]) === t) return o(f[1] || "");
            return null
        }
    }(jQuery),
    function (e) {
        window.NestedFormEvents = function () {
            this.addFields = e.proxy(this.addFields, this), this.removeFields = e.proxy(this.removeFields, this)
        }, NestedFormEvents.prototype = {
            addFields: function (t) {
                var n = t.currentTarget,
                    r = e(n).data("association"),
                    i = e("#" + e(n).data("blueprint-id")),
                    s = i.data("blueprint"),
                    o = (e(n).closest(".fields").closestChild("input, textarea, select").eq(0).attr("name") || "").replace(new RegExp("[[a-z_]+]$"), "");
                if (o) {
                    var u = o.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g) || [],
                        a = o.match(/[0-9]+/g) || [];
                    for (var f = 0; f < u.length; f++) a[f] && (s = s.replace(new RegExp("(_" + u[f] + ")_.+?_", "g"), "$1_" + a[f] + "_"), s = s.replace(new RegExp("(\\[" + u[f] + "\\])\\[.+?\\]", "g"), "$1[" + a[f] + "]"))
                }
                var l = new RegExp("new_" + r, "g"),
                    c = this.newId();
                s = e.trim(s.replace(l, c));
                var h = this.insertFields(s, r, n);
                return h.trigger({
                    type: "nested:fieldAdded",
                    field: h
                }).trigger({
                        type: "nested:fieldAdded:" + r,
                        field: h
                    }), !1
            },
            newId: function () {
                return (new Date).getTime()
            },
            insertFields: function (t, n, r) {
                var i = e(r).data("target");
                return i ? e(t).appendTo(e(i)) : e(t).insertBefore(r)
            },
            removeFields: function (t) {
                var n = e(t.currentTarget),
                    r = n.data("association"),
                    i = n.prev("input[type=hidden]");
                i.val("1");
                var s = n.closest(".fields");
                return s.hide(), s.trigger({
                    type: "nested:fieldRemoved",
                    field: s
                }).trigger({
                        type: "nested:fieldRemoved:" + r,
                        field: s
                    }), !1
            }
        }, window.nestedFormEvents = new NestedFormEvents, e(document).delegate("form a.add_nested_fields", "click", nestedFormEvents.addFields).delegate("form a.remove_nested_fields", "click", nestedFormEvents.removeFields)
    }(jQuery),
    function (e) {
        e.fn.closestChild = function (t) {
            if (t && t != "") {
                var n = [];
                n.push(this);
                while (n.length > 0) {
                    var r = n.shift(),
                        i = r.children();
                    for (var s = 0; s < i.length; ++s) {
                        var o = e(i[s]);
                        if (o.is(t)) return o;
                        n.push(o)
                    }
                }
            }
            return e()
        }
    }(jQuery),
    function (e, t, n, r) {
        var i = n("html"),
            s = n(
                e),
            o = n(t),
            u = n.fancybox = function () {
                u.open.apply(this, arguments)
            }, a = navigator.userAgent.match(/msie/i),
            f = null,
            l = t.createTouch !== r,
            c = function (e) {
                return e && e.hasOwnProperty && e instanceof n
            }, h = function (e) {
                return e && "string" === n.type(e)
            }, p = function (e) {
                return h(e) && 0 < e.indexOf("%")
            }, d = function (e, t) {
                var n = parseInt(e, 10) || 0;
                return t && p(e) && (n *= u.getViewport()[t] / 100), Math.ceil(n)
            }, v = function (e, t) {
                return d(e, t) + "px"
            };
        n.extend(u, {
            version: "2.1.5",
            defaults: {
                padding: 15,
                margin: 20,
                width: 800,
                height: 600,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 9999,
                maxHeight: 9999,
                pixelRatio: 1,
                autoSize: !0,
                autoHeight: !1,
                autoWidth: !1,
                autoResize: !0,
                autoCenter: !l,
                fitToView: !0,
                aspectRatio: !1,
                topRatio: .5,
                leftRatio: .5,
                scrolling: "auto",
                wrapCSS: "",
                arrows: !0,
                closeBtn: !0,
                closeClick: !1,
                nextClick: !1,
                mouseWheel: !0,
                autoPlay: !1,
                playSpeed: 3e3,
                preload: 3,
                modal: !1,
                loop: !0,
                ajax: {
                    dataType: "html",
                    headers: {
                        "X-fancyBox": !0
                    }
                },
                iframe: {
                    scrolling: "auto",
                    preload: !0
                },
                swf: {
                    wmode: "transparent",
                    allowfullscreen: "true",
                    allowscriptaccess: "always"
                },
                keys: {
                    next: {
                        13: "left",
                        34: "up",
                        39: "left",
                        40: "up"
                    },
                    prev: {
                        8: "right",
                        33: "down",
                        37: "right",
                        38: "down"
                    },
                    close: [27],
                    play: [32],
                    toggle: [70]
                },
                direction: {
                    next: "left",
                    prev: "right"
                },
                scrollOutside: !0,
                index: 0,
                type: null,
                href: null,
                content: null,
                title: null,
                tpl: {
                    wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                    image: '<img class="fancybox-image" src="{href}" alt="" />',
                    iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (a ? ' allowtransparency="true"' : "") + "></iframe>",
                    error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                    closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                    next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                openEffect: "fade",
                openSpeed: 250,
                openEasing: "swing",
                openOpacity: !0,
                openMethod: "zoomIn",
                closeEffect: "fade",
                closeSpeed: 250,
                closeEasing: "swing",
                closeOpacity: !0,
                closeMethod: "zoomOut",
                nextEffect: "elastic",
                nextSpeed: 250,
                nextEasing: "swing",
                nextMethod: "changeIn",
                prevEffect: "elastic",
                prevSpeed: 250,
                prevEasing: "swing",
                prevMethod: "changeOut",
                helpers: {
                    overlay: !0,
                    title: !0
                },
                onCancel: n.noop,
                beforeLoad: n.noop,
                afterLoad: n.noop,
                beforeShow: n.noop,
                afterShow: n.noop,
                beforeChange: n.noop,
                beforeClose: n.noop,
                afterClose: n.noop
            },
            group: {},
            opts: {},
            previous: null,
            coming: null,
            current: null,
            isActive: !1,
            isOpen: !1,
            isOpened: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
            player: {
                timer: null,
                isActive: !1
            },
            ajaxLoad: null,
            imgPreload: null,
            transitions: {},
            helpers: {},
            open: function (e, t) {
                if (e && (n.isPlainObject(t) || (t = {}), !1 !== u.close(!0))) return n.isArray(e) || (e = c(e) ? n(e).get() : [e]), n.each(e, function (i, s) {
                    var o = {}, a, f, l, p, d;
                    "object" === n.type(s) && (s.nodeType && (s = n(s)), c(s) ? (o = {
                        href: s.data("fancybox-href") || s.attr("href"),
                        title: s.data("fancybox-title") || s.attr("title"),
                        isDom: !0,
                        element: s
                    }, n.metadata && n.extend(!0, o, s.metadata())) : o = s), a = t.href || o.href || (h(s) ? s : null), f = t.title !== r ? t.title : o.title || "", p = (l = t.content || o.content) ? "html" : t.type || o.type, !p && o.isDom && (p = s.data("fancybox-type"), p || (p = (p = s.prop("class").match(/fancybox\.(\w+)/)) ? p[1] : null)), h(a) && (p || (u.isImage(a) ? p = "image" : u.isSWF(a) ? p = "swf" : "#" === a.charAt(0) ? p = "inline" : h(s) && (p = "html", l = s)), "ajax" === p && (d = a.split(/\s+/, 2), a = d.shift(), d = d.shift())), l || ("inline" === p ? a ? l = n(h(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a) : o.isDom && (l = s) : "html" === p ? l = a : !p && !a && o.isDom && (p = "inline", l = s)), n.extend(o, {
                        href: a,
                        type: p,
                        content: l,
                        title: f,
                        selector: d
                    }), e[i] = o
                }), u.opts = n.extend(!0, {}, u.defaults, t), t.keys !== r && (u.opts.keys = t.keys ? n.extend({}, u.defaults.keys, t.keys) : !1), u.group = e, u._start(u.opts.index)
            },
            cancel: function () {
                var e = u.coming;
                e && !1 !== u.trigger("onCancel") && (u.hideLoading(), u.ajaxLoad && u.ajaxLoad.abort(), u.ajaxLoad = null, u.imgPreload && (u.imgPreload.onload = u.imgPreload.onerror = null), e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(), u.coming = null, u.current || u._afterZoomOut(e))
            },
            close: function (e) {
                u.cancel(), !1 !== u.trigger("beforeClose") && (u.unbindEvents(), u.isActive && (!u.isOpen || !0 === e ? (n(".fancybox-wrap").stop(!0).trigger("onReset").remove(), u._afterZoomOut()) : (u.isOpen = u.isOpened = !1, u.isClosing = !0, n(".fancybox-item, .fancybox-nav").remove(), u.wrap.stop(!0, !0).removeClass("fancybox-opened"), u.transitions[u.current.closeMethod]())))
            },
            play: function (e) {
                var t = function () {
                    clearTimeout(u.player.timer)
                }, n = function () {
                    t(), u.current && u.player.isActive && (u.player.timer = setTimeout(u.next, u.current.playSpeed))
                }, r = function () {
                    t(), o.unbind(".player"), u.player.isActive = !1, u.trigger("onPlayEnd")
                };
                !0 === e || !u.player.isActive && !1 !== e ? u.current && (u.current.loop || u.current.index < u.group.length - 1) && (u.player.isActive = !0, o.bind({
                    "onCancel.player beforeClose.player": r,
                    "onUpdate.player": n,
                    "beforeLoad.player": t
                }), n(), u.trigger("onPlayStart")) : r()
            },
            next: function (e) {
                var t = u.current;
                t && (h(e) || (e = t.direction.next), u.jumpto(t.index + 1, e, "next"))
            },
            prev: function (e) {
                var t = u.current;
                t && (h(e) || (e = t.direction.prev), u.jumpto(t.index - 1, e, "prev"))
            },
            jumpto: function (e, t, n) {
                var i = u.current;
                i && (e = d(e), u.direction = t || i.direction[e >= i.index ? "next" : "prev"], u.router = n || "jumpto", i.loop && (0 > e && (e = i.group.length + e % i.group.length), e %= i.group.length), i.group[e] !== r && (u.cancel(), u._start(e)))
            },
            reposition: function (e, t) {
                var r = u.current,
                    i = r ? r.wrap : null,
                    s;
                i && (s = u._getPosition(t), e && "scroll" === e.type ? (delete s.position, i.stop(!0, !0).animate(s, 200)) : (i.css(s), r.pos = n.extend({}, r.dim, s)))
            },
            update: function (e) {
                var t = e && e.type,
                    n = !t || "orientationchange" === t;
                n && (clearTimeout(f), f = null), u.isOpen && !f && (f = setTimeout(function () {
                    var r = u.current;
                    r && !u.isClosing && (u.wrap.removeClass("fancybox-tmp"), (n || "load" === t || "resize" === t && r.autoResize) && u._setDimension(), "scroll" === t && r.canShrink || u.reposition(e), u.trigger("onUpdate"), f = null)
                }, n && !l ? 0 : 300))
            },
            toggle: function (e) {
                u.isOpen && (u.current.fitToView = "boolean" === n.type(e) ? e : !u.current.fitToView, l && (u.wrap.removeAttr("style").addClass("fancybox-tmp"), u.trigger("onUpdate")), u.update())
            },
            hideLoading: function () {
                o.unbind(".loading"), n("#fancybox-loading").remove()
            },
            showLoading: function () {
                var e, t;
                u.hideLoading(), e = n('<div id="fancybox-loading"><div></div></div>').click(u.cancel).appendTo("body"), o.bind("keydown.loading", function (e) {
                    27 === (e.which || e.keyCode) && (e.preventDefault(), u.cancel())
                }), u.defaults.fixed || (t = u.getViewport(), e.css({
                    position: "absolute",
                    top: .5 * t.h + t.y,
                    left: .5 * t.w + t.x
                }))
            },
            getViewport: function () {
                var t = u.current && u.current.locked || !1,
                    n = {
                        x: s.scrollLeft(),
                        y: s.scrollTop()
                    };
                return t ? (n.w = t[0].clientWidth, n.h = t[0].clientHeight) : (n.w = l && e.innerWidth ? e.innerWidth : s.width(), n.h = l && e.innerHeight ? e.innerHeight : s.height()), n
            },
            unbindEvents: function () {
                u.wrap && c(u.wrap) && u.wrap.unbind(".fb"), o.unbind(".fb"), s.unbind(".fb")
            },
            bindEvents: function () {
                var e = u.current,
                    t;
                e && (s.bind("orientationchange.fb" + (l ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), u.update), (t = e.keys) && o.bind("keydown.fb", function (i) {
                    var s = i.which || i.keyCode,
                        o = i.target || i.srcElement;
                    if (27 === s && u.coming) return !1;
                    !i.ctrlKey && !i.altKey && !i.shiftKey && !i.metaKey && (!o || !o.type && !n(o).is("[contenteditable]")) && n.each(t, function (t, o) {
                        if (1 < e.group.length && o[s] !== r) return u[t](o[s]), i.preventDefault(), !1;
                        if (-1 < n.inArray(s, o)) return u[t](), i.preventDefault(), !1
                    })
                }), n.fn.mousewheel && e.mouseWheel && u.wrap.bind("mousewheel.fb", function (t, r, i, s) {
                    for (var o = n(t.target || null), a = !1; o.length && !a && !o.is(".fancybox-skin") && !o.is(".fancybox-wrap");) a = o[0] && (!o[0].style.overflow || "hidden" !== o[0].style.overflow) && (o[0].clientWidth && o[0].scrollWidth > o[0].clientWidth || o[0].clientHeight && o[0].scrollHeight > o[0].clientHeight), o = n(o).parent();
                    0 !== r && !a && 1 < u.group.length && !e.canShrink && (0 < s || 0 < i ? u.prev(0 < s ? "down" : "left") : (0 > s || 0 > i) && u.next(0 > s ? "up" : "right"), t.preventDefault())
                }))
            },
            trigger: function (e, t) {
                var r, i = t || u.coming || u.current;
                if (i) {
                    n.isFunction(i[e]) && (r = i[e].apply(i, Array.prototype.slice.call(arguments, 1)));
                    if (!1 === r) return !1;
                    i.helpers && n.each(i.helpers, function (t, r) {
                        r && u.helpers[t] && n.isFunction(u.helpers[t][e]) && u.helpers[t][e](n.extend(!0, {}, u.helpers[t].defaults, r), i)
                    }), o.trigger(e)
                }
            },
            isImage: function (e) {
                return h(e) && e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
            },
            isSWF: function (e) {
                return h(e) && e.match(/\.(swf)((\?|#).*)?$/i)
            },
            _start: function (e) {
                var t = {}, r, i;
                e = d(e), r = u.group[e] || null;
                if (!r) return !1;
                t = n.extend(!0, {}, u.opts, r), r = t.margin, i = t.padding, "number" === n.type(r) && (t.margin = [r, r, r, r]), "number" === n.type(i) && (t.padding = [i, i, i, i]), t.modal && n.extend(!0, t, {
                    closeBtn: !1,
                    closeClick: !1,
                    nextClick: !1,
                    arrows: !1,
                    mouseWheel: !1,
                    keys: null,
                    helpers: {
                        overlay: {
                            closeClick: !1
                        }
                    }
                }), t.autoSize && (t.autoWidth = t.autoHeight = !0), "auto" === t.width && (t.autoWidth = !0), "auto" === t.height && (t.autoHeight = !0), t.group = u.group, t.index = e, u.coming = t;
                if (!1 === u.trigger("beforeLoad")) u.coming = null;
                else {
                    i = t.type, r = t.href;
                    if (!i) return u.coming = null, u.current && u.router && "jumpto" !== u.router ? (u.current.index = e, u[u.router](u.direction)) : !1;
                    u.isActive = !0;
                    if ("image" === i || "swf" === i) t.autoHeight = t.autoWidth = !1, t.scrolling = "visible";
                    "image" === i && (t.aspectRatio = !0), "iframe" === i && l && (t.scrolling = "scroll"), t.wrap = n(t.tpl.wrap).addClass("fancybox-" + (l ? "mobile" : "desktop") + " fancybox-type-" + i + " fancybox-tmp " + t.wrapCSS).appendTo(t.parent || "body"), n.extend(t, {
                        skin: n(".fancybox-skin", t.wrap),
                        outer: n(".fancybox-outer", t.wrap),
                        inner: n(".fancybox-inner", t.wrap)
                    }), n.each(["Top", "Right", "Bottom", "Left"], function (e, n) {
                        t.skin.css("padding" + n, v(t.padding[e]))
                    }), u.trigger("onReady");
                    if ("inline" === i || "html" === i) {
                        if (!t.content || !t.content.length) return u._error("content")
                    } else if (!r) return u._error("href");
                    "image" === i ? u._loadImage() : "ajax" === i ? u._loadAjax() : "iframe" === i ? u._loadIframe() : u._afterLoad()
                }
            },
            _error: function (e) {
                n.extend(u.coming, {
                    type: "html",
                    autoWidth: !0,
                    autoHeight: !0,
                    minWidth: 0,
                    minHeight: 0,
                    scrolling: "no",
                    hasError: e,
                    content: u.coming.tpl.error
                }), u._afterLoad()
            },
            _loadImage: function () {
                var e = u.imgPreload = new Image;
                e.onload = function () {
                    this.onload = this.onerror = null, u.coming.width = this.width / u.opts.pixelRatio, u.coming.height = this.height / u.opts.pixelRatio, u._afterLoad()
                }, e.onerror = function () {
                    this.onload = this.onerror = null, u._error("image")
                }, e.src = u.coming.href, !0 !== e.complete && u.showLoading()
            },
            _loadAjax: function () {
                var e = u.coming;
                u.showLoading(), u.ajaxLoad = n.ajax(n.extend({}, e.ajax, {
                    url: e.href,
                    error: function (e, t) {
                        u.coming && "abort" !== t ? u._error("ajax", e) : u.hideLoading()
                    },
                    success: function (t, n) {
                        "success" === n && (e.content = t, u._afterLoad())
                    }
                }))
            },
            _loadIframe: function () {
                var e = u.coming,
                    t = n(e.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", l ? "auto" : e.iframe.scrolling).attr("src", e.href);
                n(e.wrap).bind("onReset", function () {
                    try {
                        n(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                    } catch (e) {}
                }), e.iframe.preload && (u.showLoading(), t.one("load", function () {
                    n(this).data("ready", 1), l || n(this).bind("load.fb", u.update), n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), u._afterLoad()
                })), e.content = t.appendTo(e.inner), e.iframe.preload || u._afterLoad()
            },
            _preloadImages: function () {
                var e = u.group,
                    t = u.current,
                    n = e.length,
                    r = t.preload ? Math.min(t.preload, n - 1) : 0,
                    i, s;
                for (s = 1; s <= r; s += 1) i = e[(t.index + s) % n], "image" === i.type && i.href && ((new Image).src = i.href)
            },
            _afterLoad: function () {
                var e = u.coming,
                    t = u.current,
                    r, i, s, o, a;
                u.hideLoading();
                if (e && !1 !== u.isActive)
                    if (!1 === u.trigger("afterLoad", e, t)) e.wrap.stop(!0).trigger("onReset").remove(), u.coming = null;
                    else {
                        t && (u.trigger("beforeChange", t), t.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), u.unbindEvents(), r = e.content, i = e.type, s = e.scrolling, n.extend(u, {
                            wrap: e.wrap,
                            skin: e.skin,
                            outer: e.outer,
                            inner: e.inner,
                            current: e,
                            previous: t
                        }), o = e.href;
                        switch (i) {
                            case "inline":
                            case "ajax":
                            case "html":
                                e.selector ? r = n("<div>").html(r).find(e.selector) : c(r) && (r.data("fancybox-placeholder") || r.data("fancybox-placeholder", n('<div class="fancybox-placeholder"></div>').insertAfter(r).hide()), r = r.show().detach(), e.wrap.bind("onReset", function () {
                                    n(this).find(r).length && r.hide().replaceAll(r.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                                }));
                                break;
                            case "image":
                                r = e.tpl.image.replace("{href}", o);
                                break;
                            case "swf":
                                r = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + o + '"></param>', a = "", n.each(e.swf, function (e, t) {
                                    r += '<param name="' + e + '" value="' + t + '"></param>', a += " " + e + '="' + t + '"'
                                }), r += '<embed src="' + o + '" type="application/x-shockwave-flash" width="100%" height="100%"' + a + "></embed></object>"
                        }(!c(r) || !r.parent().is(e.inner)) && e.inner.append(r), u.trigger("beforeShow"), e.inner.css("overflow", "yes" === s ? "scroll" : "no" === s ? "hidden" : s), u._setDimension(), u.reposition(), u.isOpen = !1, u.coming = null, u.bindEvents(), u.isOpened ? t.prevMethod && u.transitions[t.prevMethod]() : n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), u.transitions[u.isOpened ? e.nextMethod : e.openMethod](), u._preloadImages()
                    }
            },
            _setDimension: function () {
                var e = u.getViewport(),
                    t = 0,
                    r = !1,
                    i = !1,
                    r = u.wrap,
                    s = u.skin,
                    o = u.inner,
                    a = u.current,
                    i = a.width,
                    f = a.height,
                    l = a.minWidth,
                    c = a.minHeight,
                    h = a.maxWidth,
                    m = a.maxHeight,
                    g = a.scrolling,
                    y = a.scrollOutside ? a.scrollbarWidth : 0,
                    S = a.margin,
                    x = d(S[1] + S[3]),
                    T = d(S[0] + S[2]),
                    N, C, k, L, A, O, M, _, D;
                r.add(s).add(o).width("auto").height("auto").removeClass("fancybox-tmp"), S = d(s.outerWidth(!0) - s.width()), N = d(s.outerHeight(!0) - s.height()), C = x + S, k = T + N, L = p(i) ? (e.w - C) * d(i) / 100 : i, A = p(f) ? (e.h - k) * d(f) / 100 : f;
                if ("iframe" === a.type) {
                    if (D = a.content, a.autoHeight && 1 === D.data("ready")) try {
                        D[0].contentWindow.document.location && (o.width(L).height(9999), O = D.contents().find("body"), y && O.css("overflow-x", "hidden"), A = O.outerHeight(!0))
                    } catch (P) {}
                } else if (a.autoWidth || a.autoHeight) o.addClass("fancybox-tmp"), a.autoWidth || o.width(L), a.autoHeight || o.height(A), a.autoWidth && (L = o.width()), a.autoHeight && (A = o.height()), o.removeClass("fancybox-tmp");
                i = d(L), f = d(A), _ = L / A, l = d(p(l) ? d(l, "w") - C : l), h = d(p(h) ? d(h, "w") - C : h), c = d(p(c) ? d(c, "h") - k : c), m = d(p(m) ? d(m, "h") - k : m), O = h, M = m, a.fitToView && (h = Math.min(e.w - C, h), m = Math.min(e.h - k, m)), C = e.w - x, T = e.h - T, a.aspectRatio ? (i > h && (i = h, f = d(i / _)), f > m && (f = m, i = d(f * _)), i < l && (i = l, f = d(i / _)), f < c && (f = c, i = d(f * _))) : (i = Math.max(l, Math.min(i, h)), a.autoHeight && "iframe" !== a.type && (o.width(i), f = o.height()), f = Math.max(c, Math.min(f, m)));
                if (a.fitToView)
                    if (o.width(i).height(f), r.width(i + S), e = r.width(), x = r.height(), a.aspectRatio)
                        for (;
                            (e > C || x > T) && i > l && f > c && !(19 < t++);) f = Math.max(c, Math.min(m, f - 10)), i = d(f * _), i < l && (i = l, f = d(i / _)), i > h && (i = h, f = d(i / _)), o.width(i).height(f), r.width(i + S), e = r.width(), x = r.height();
                    else i = Math.max(l, Math.min(i, i - (e - C))), f = Math.max(c, Math.min(f, f - (x - T)));
                y && "auto" === g && f < A && i + S + y < C && (i += y), o.width(i).height(f), r.width(i + S), e = r.width(), x = r.height(), r = (e > C || x > T) && i > l && f > c, i = a.aspectRatio ? i < O && f < M && i < L && f < A : (i < O || f < M) && (i < L || f < A), n.extend(a, {
                    dim: {
                        width: v(e),
                        height: v(x)
                    },
                    origWidth: L,
                    origHeight: A,
                    canShrink: r,
                    canExpand: i,
                    wPadding: S,
                    hPadding: N,
                    wrapSpace: x - s.outerHeight(!0),
                    skinSpace: s.height() - f
                }), !D && a.autoHeight && f > c && f < m && !i && o.height("auto")
            },
            _getPosition: function (e) {
                var t = u.current,
                    n = u.getViewport(),
                    r = t.margin,
                    i = u.wrap.width() + r[1] + r[3],
                    s = u.wrap.height() + r[0] + r[2],
                    r = {
                        position: "absolute",
                        top: r[0],
                        left: r[3]
                    };
                return t.autoCenter && t.fixed && !e && s <= n.h && i <= n.w ? r.position = "fixed" : t.locked || (r.top += n.y, r.left += n.x), r.top = v(Math.max(r.top, r.top + (n.h - s) * t.topRatio)), r.left = v(Math.max(r.left, r.left + (n.w - i) * t.leftRatio)), r
            },
            _afterZoomIn: function () {
                var e = u.current;
                e && (u.isOpen = u.isOpened = !0, u.wrap.css("overflow", "visible").addClass("fancybox-opened"), u.update(), (e.closeClick || e.nextClick && 1 < u.group.length) && u.inner.css("cursor", "pointer").bind("click.fb", function (t) {
                    !n(t.target).is("a") && !n(t.target).parent().is("a") && (t.preventDefault(), u[e.closeClick ? "close" : "next"]())
                }), e.closeBtn && n(e.tpl.closeBtn).appendTo(u.skin).bind("click.fb", function (e) {
                    e.preventDefault(), u.close()
                }), e.arrows && 1 < u.group.length && ((e.loop || 0 < e.index) && n(e.tpl.prev).appendTo(u.outer).bind("click.fb", u.prev), (e.loop || e.index < u.group.length - 1) && n(e.tpl.next).appendTo(u.outer).bind("click.fb", u.next)), u.trigger("afterShow"), !e.loop && e.index === e.group.length - 1 ? u.play(!1) : u.opts.autoPlay && !u.player.isActive && (u.opts.autoPlay = !1, u.play()))
            },
            _afterZoomOut: function (e) {
                e = e || u.current, n(".fancybox-wrap").trigger("onReset").remove(), n.extend(u, {
                    group: {},
                    opts: {},
                    router: !1,
                    current: null,
                    isActive: !1,
                    isOpened: !1,
                    isOpen: !1,
                    isClosing: !1,
                    wrap: null,
                    skin: null,
                    outer: null,
                    inner: null
                }), u.trigger("afterClose", e)
            }
        }), u.transitions = {
            getOrigPosition: function () {
                var e = u.current,
                    t = e.element,
                    n = e.orig,
                    r = {}, i = 50,
                    s = 50,
                    o = e.hPadding,
                    a = e.wPadding,
                    f = u.getViewport();
                !n && e.isDom && t.is(":visible") && (n = t.find("img:first"), n.length || (n = t)), c(n) ? (r = n.offset(), n.is("img") && (i = n.outerWidth(), s = n.outerHeight())) : (r.top = f.y + (f.h - s) * e.topRatio, r.left = f.x + (f.w - i) * e.leftRatio);
                if ("fixed" === u.wrap.css("position") || e.locked) r.top -= f.y, r.left -= f.x;
                return r = {
                    top: v(r.top - o * e.topRatio),
                    left: v(r.left - a * e.leftRatio),
                    width: v(i + a),
                    height: v(s + o)
                }
            },
            step: function (e, t) {
                var n, r, i = t.prop;
                r = u.current;
                var s = r.wrapSpace,
                    o = r.skinSpace;
                if ("width" === i || "height" === i) n = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start), u.isClosing && (n = 1 - n), r = "width" === i ? r.wPadding : r.hPadding, r = e - r, u.skin[i](d("width" === i ? r : r - s * n)), u.inner[i](d("width" === i ? r : r - s * n - o * n))
            },
            zoomIn: function () {
                var e = u.current,
                    t = e.pos,
                    r = e.openEffect,
                    i = "elastic" === r,
                    s = n.extend({
                        opacity: 1
                    }, t);
                delete s.position, i ? (t = this.getOrigPosition(), e.openOpacity && (t.opacity = .1)) : "fade" === r && (t.opacity = .1), u.wrap.css(t).animate(s, {
                    duration: "none" === r ? 0 : e.openSpeed,
                    easing: e.openEasing,
                    step: i ? this.step : null,
                    complete: u._afterZoomIn
                })
            },
            zoomOut: function () {
                var e = u.current,
                    t = e.closeEffect,
                    n = "elastic" === t,
                    r = {
                        opacity: .1
                    };
                n && (r = this.getOrigPosition(), e.closeOpacity && (r.opacity = .1)), u.wrap.animate(r, {
                    duration: "none" === t ? 0 : e.closeSpeed,
                    easing: e.closeEasing,
                    step: n ? this.step : null,
                    complete: u._afterZoomOut
                })
            },
            changeIn: function () {
                var e = u.current,
                    t = e.nextEffect,
                    n = e.pos,
                    r = {
                        opacity: 1
                    }, i = u.direction,
                    s;
                n.opacity = .1, "elastic" === t && (s = "down" === i || "up" === i ? "top" : "left", "down" === i || "right" === i ? (n[s] = v(d(n[s]) - 200), r[s] = "+=200px") : (n[s] = v(d(n[s]) + 200), r[s] = "-=200px")), "none" === t ? u._afterZoomIn() : u.wrap.css(n).animate(r, {
                    duration: e.nextSpeed,
                    easing: e.nextEasing,
                    complete: u._afterZoomIn
                })
            },
            changeOut: function () {
                var e = u.previous,
                    t = e.prevEffect,
                    r = {
                        opacity: .1
                    }, i = u.direction;
                "elastic" === t && (r["down" === i || "up" === i ? "top" : "left"] = ("up" === i || "left" === i ? "-" : "+") + "=200px"), e.wrap.animate(r, {
                    duration: "none" === t ? 0 : e.prevSpeed,
                    easing: e.prevEasing,
                    complete: function () {
                        n(this).trigger("onReset").remove()
                    }
                })
            }
        }, u.helpers.overlay = {
            defaults: {
                closeClick: !0,
                speedOut: 200,
                showEarly: !0,
                css: {},
                locked: !l,
                fixed: !0
            },
            overlay: null,
            fixed: !1,
            el: n("html"),
            create: function (e) {
                e = n.extend({}, this.defaults, e), this.overlay && this.close(), this.overlay = n('<div class="fancybox-overlay"></div>').appendTo(u.coming ? u.coming.parent : e.parent), this.fixed = !1, e.fixed && u.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
            },
            open: function (e) {
                var t = this;
                e = n.extend({}, this.defaults, e), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(e), this.fixed || (s.bind("resize.overlay", n.proxy(this.update, this)), this.update()), e.closeClick && this.overlay.bind("click.overlay", function (e) {
                    if (n(e.target).hasClass("fancybox-overlay")) return u.isActive ? u.close() : t.close(), !1
                }), this.overlay.css(e.css).show()
            },
            close: function () {
                var e, t;
                s.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (n(".fancybox-margin").removeClass("fancybox-margin"), e = s.scrollTop(), t = s.scrollLeft(), this.el.removeClass("fancybox-lock"), s.scrollTop(e).scrollLeft(t)), n(".fancybox-overlay").remove().hide(), n.extend(this, {
                    overlay: null,
                    fixed: !1
                })
            },
            update: function () {
                var e = "100%",
                    n;
                this.overlay.width(e).height("100%"), a ? (n = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), o.width() > n && (e = o.width())) : o.width() > s.width() && (e = o.width()), this.overlay.width(e).height(o.height())
            },
            onReady: function (e, t) {
                var r = this.overlay;
                n(".fancybox-overlay").stop(!0, !0), r || this.create(e), e.locked && this.fixed && t.fixed && (r || (this.margin = o.height() > s.height() ? n("html").css("margin-right").replace("px", "") : !1), t.locked = this.overlay.append(t.wrap), t.fixed = !1), !0 === e.showEarly && this.beforeShow.apply(this, arguments)
            },
            beforeShow: function (e, t) {
                var r, i;
                t.locked && (!1 !== this.margin && (n("*").filter(function () {
                    return "fixed" === n(this).css("position") && !n(this).hasClass("fancybox-overlay") && !n(this).hasClass("fancybox-wrap")
                }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), r = s.scrollTop(), i = s.scrollLeft(), this.el.addClass("fancybox-lock"), s.scrollTop(r).scrollLeft(i)), this.open(e)
            },
            onUpdate: function () {
                this.fixed || this.update()
            },
            afterClose: function (e) {
                this.overlay && !u.coming && this.overlay.fadeOut(e.speedOut, n.proxy(this.close, this))
            }
        }, u.helpers.title = {
            defaults: {
                type: "float",
                position: "bottom"
            },
            beforeShow: function (e) {
                var t = u.current,
                    r = t.title,
                    i = e.type;
                n.isFunction(r) && (r = r.call(t.element, t));
                if (h(r) && "" !== n.trim(r)) {
                    t = n('<div class="fancybox-title fancybox-title-' + i + '-wrap">' + r + "</div>");
                    switch (i) {
                        case "inside":
                            i = u.skin;
                            break;
                        case "outside":
                            i = u.wrap;
                            break;
                        case "over":
                            i = u.inner;
                            break;
                        default:
                            i = u.skin, t.appendTo("body"), a && t.width(t.width()), t.wrapInner('<span class="child"></span>'), u.current.margin[2] += Math.abs(d(t.css("margin-bottom")))
                    }
                    t["top" === e.position ? "prependTo" : "appendTo"](i)
                }
            }
        }, n.fn.fancybox = function (e) {
            var t, r = n(this),
                i = this.selector || "",
                s = function (s) {
                    var o = n(this).blur(),
                        a = t,
                        f, l;
                    !s.ctrlKey && !s.altKey && !s.shiftKey && !s.metaKey && !o.is(".fancybox-wrap") && (f = e.groupAttr || "data-fancybox-group", l = o.attr(f), l || (f = "rel", l = o.get(0)[f]), l && "" !== l && "nofollow" !== l && (o = i.length ? n(i) : r, o = o.filter("[" + f + '="' + l + '"]'), a = o.index(this)), e.index = a, !1 !== u.open(o, e) && s.preventDefault())
                };
            return e = e || {}, t = e.index || 0, !i || !1 === e.live ? r.unbind("click.fb-start").bind("click.fb-start", s) : o.undelegate(i, "click.fb-start").delegate(i + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", s), this.filter("[data-fancybox-start=1]").trigger("click"), this
        }, o.ready(function () {
            var t, s;
            n.scrollbarWidth === r && (n.scrollbarWidth = function () {
                var e = n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    t = e.children(),
                    t = t.innerWidth() - t.height(99).innerWidth();
                return e.remove(), t
            });
            if (n.support.fixedPosition === r) {
                t = n.support, s = n('<div style="position:fixed;top:20px;"></div>').appendTo("body");
                var o = 20 === s[0].offsetTop || 15 === s[0].offsetTop;
                s.remove(), t.fixedPosition = o
            }
            n.extend(u.defaults, {
                scrollbarWidth: n.scrollbarWidth(),
                fixed: n.support.fixedPosition,
                parent: n("body")
            }), t = n(e).width(), i.addClass("fancybox-lock-test"), s = n(e).width(), i.removeClass("fancybox-lock-test"), n("<style type='text/css'>.fancybox-margin{margin-right:" + (s - t) + "px;}</style>").appendTo("head")
        })
    }(window, document, jQuery), Date.CultureInfo = {
    name: "en-US",
    englishName: "English (United States)",
    nativeName: "English (United States)",
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    amDesignator: "AM",
    pmDesignator: "PM",
    firstDayOfWeek: 0,
    twoDigitYearMax: 2029,
    dateElementOrder: "mdy",
    formatPatterns: {
        shortDate: "M/d/yyyy",
        longDate: "dddd, MMMM dd, yyyy",
        shortTime: "h:mm tt",
        longTime: "h:mm:ss tt",
        fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt",
        sortableDateTime: "yyyy-MM-ddTHH:mm:ss",
        universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ",
        rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT",
        monthDay: "MMMM dd",
        yearMonth: "MMMM, yyyy"
    },
    regexPatterns: {
        jan: /^jan(uary)?/i,
        feb: /^feb(ruary)?/i,
        mar: /^mar(ch)?/i,
        apr: /^apr(il)?/i,
        may: /^may/i,
        jun: /^jun(e)?/i,
        jul: /^jul(y)?/i,
        aug: /^aug(ust)?/i,
        sep: /^sep(t(ember)?)?/i,
        oct: /^oct(ober)?/i,
        nov: /^nov(ember)?/i,
        dec: /^dec(ember)?/i,
        sun: /^su(n(day)?)?/i,
        mon: /^mo(n(day)?)?/i,
        tue: /^tu(e(s(day)?)?)?/i,
        wed: /^we(d(nesday)?)?/i,
        thu: /^th(u(r(s(day)?)?)?)?/i,
        fri: /^fr(i(day)?)?/i,
        sat: /^sa(t(urday)?)?/i,
        future: /^next/i,
        past: /^last|past|prev(ious)?/i,
        add: /^(\+|after|from)/i,
        subtract: /^(\-|before|ago)/i,
        yesterday: /^yesterday/i,
        today: /^t(oday)?/i,
        tomorrow: /^tomorrow/i,
        now: /^n(ow)?/i,
        millisecond: /^ms|milli(second)?s?/i,
        second: /^sec(ond)?s?/i,
        minute: /^min(ute)?s?/i,
        hour: /^h(ou)?rs?/i,
        week: /^w(ee)?k/i,
        month: /^m(o(nth)?s?)?/i,
        day: /^d(ays?)?/i,
        year: /^y((ea)?rs?)?/i,
        shortMeridian: /^(a|p)/i,
        longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i,
        timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt)/i,
        ordinalSuffix: /^\s*(st|nd|rd|th)/i,
        timeContext: /^\s*(\:|a|p)/i
    },
    abbreviatedTimeZoneStandard: {
        GMT: "-000",
        EST: "-0400",
        CST: "-0500",
        MST: "-0600",
        PST: "-0700"
    },
    abbreviatedTimeZoneDST: {
        GMT: "-000",
        EDT: "-0500",
        CDT: "-0600",
        MDT: "-0700",
        PDT: "-0800"
    }
}, Date.getMonthNumberFromName = function (e) {
    var t = Date.CultureInfo.monthNames,
        n = Date.CultureInfo.abbreviatedMonthNames,
        r = e.toLowerCase();
    for (var i = 0; i < t.length; i++)
        if (t[i].toLowerCase() == r || n[i].toLowerCase() == r) return i;
    return -1
}, Date.getDayNumberFromName = function (e) {
    var t = Date.CultureInfo.dayNames,
        n = Date.CultureInfo.abbreviatedDayNames,
        r = Date.CultureInfo.shortestDayNames,
        i = e.toLowerCase();
    for (var s = 0; s < t.length; s++)
        if (t[s].toLowerCase() == i || n[s].toLowerCase() == i) return s;
    return -1
}, Date.isLeapYear = function (e) {
    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
}, Date.getDaysInMonth = function (e, t) {
    return [31, Date.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
}, Date.getTimezoneOffset = function (e, t) {
    return t || !1 ? Date.CultureInfo.abbreviatedTimeZoneDST[e.toUpperCase()] : Date.CultureInfo.abbreviatedTimeZoneStandard[e.toUpperCase()]
}, Date.getTimezoneAbbreviation = function (e, t) {
    var n = t || !1 ? Date.CultureInfo.abbreviatedTimeZoneDST : Date.CultureInfo.abbreviatedTimeZoneStandard,
        r;
    for (r in n)
        if (n[r] === e) return r;
    return null
}, Date.prototype.clone = function () {
    return new Date(this.getTime())
}, Date.prototype.compareTo = function (e) {
    if (isNaN(this)) throw new Error(this);
    if (e instanceof Date && !isNaN(e)) return this > e ? 1 : this < e ? -1 : 0;
    throw new TypeError(e)
}, Date.prototype.equals = function (e) {
    return this.compareTo(e) === 0
}, Date.prototype.between = function (e, t) {
    var n = this.getTime();
    return n >= e.getTime() && n <= t.getTime()
}, Date.prototype.addMilliseconds = function (e) {
    return this.setMilliseconds(this.getMilliseconds() + e), this
}, Date.prototype.addSeconds = function (e) {
    return this.addMilliseconds(e * 1e3)
}, Date.prototype.addMinutes = function (e) {
    return this.addMilliseconds(e * 6e4)
}, Date.prototype.addHours = function (e) {
    return this.addMilliseconds(e * 36e5)
}, Date.prototype.addDays = function (e) {
    return this.addMilliseconds(e * 864e5)
}, Date.prototype.addWeeks = function (e) {
    return this.addMilliseconds(e * 6048e5)
}, Date.prototype.addMonths = function (e) {
    var t = this.getDate();
    return this.setDate(1), this.setMonth(this.getMonth() + e), this.setDate(Math.min(t, this.getDaysInMonth())), this
}, Date.prototype.addYears = function (e) {
    return this.addMonths(e * 12)
}, Date.prototype.add = function (e) {
    if (typeof e == "number") return this._orient = e, this;
    var t = e;
    return (t.millisecond || t.milliseconds) && this.addMilliseconds(t.millisecond || t.milliseconds), (t.second || t.seconds) && this.addSeconds(t.second || t.seconds), (t.minute || t.minutes) && this.addMinutes(t.minute || t.minutes), (t.hour || t.hours) && this.addHours(t.hour || t.hours), (t.month || t.months) && this.addMonths(t.month || t.months), (t.year || t.years) && this.addYears(t.year || t.years), (t.day || t.days) && this.addDays(t.day || t.days), this
}, Date._validate = function (e, t, n, r) {
    if (typeof e != "number") throw new TypeError(e + " is not a Number.");
    if (e < t || e > n) throw new RangeError(e + " is not a valid value for " + r + ".");
    return !0
}, Date.validateMillisecond = function (e) {
    return Date._validate(e, 0, 999, "milliseconds")
}, Date.validateSecond = function (e) {
    return Date._validate(e, 0, 59, "seconds")
}, Date.validateMinute = function (e) {
    return Date._validate(e, 0, 59, "minutes")
}, Date.validateHour = function (e) {
    return Date._validate(e, 0, 23, "hours")
}, Date.validateDay = function (e, t, n) {
    return Date._validate(e, 1, Date.getDaysInMonth(t, n), "days")
}, Date.validateMonth = function (e) {
    return Date._validate(e, 0, 11, "months")
}, Date.validateYear = function (e) {
    return Date._validate(e, 1, 9999, "seconds")
}, Date.prototype.set = function (e) {
    var t = e;
    return !t.millisecond && t.millisecond !== 0 && (t.millisecond = -1), !t.second && t.second !== 0 && (t.second = -1), !t.minute && t.minute !== 0 && (t.minute = -1), !t.hour && t.hour !== 0 && (t.hour = -1), !t.day && t.day !== 0 && (t.day = -1), !t.month && t.month !== 0 && (t.month = -1), !t.year && t.year !== 0 && (t.year = -1), t.millisecond != -1 && Date.validateMillisecond(t.millisecond) && this.addMilliseconds(t.millisecond - this.getMilliseconds()), t.second != -1 && Date.validateSecond(t.second) && this.addSeconds(t.second - this.getSeconds()), t.minute != -1 && Date.validateMinute(t.minute) && this.addMinutes(t.minute - this.getMinutes()), t.hour != -1 && Date.validateHour(t.hour) && this.addHours(t.hour - this.getHours()), t.month !== -1 && Date.validateMonth(t.month) && this.addMonths(t.month - this.getMonth()), t.year != -1 && Date.validateYear(t.year) && this.addYears(t.year - this.getFullYear()), t.day != -1 && Date.validateDay(t.day, this.getFullYear(), this.getMonth()) && this.addDays(t.day - this.getDate()), t.timezone && this.setTimezone(t.timezone), t.timezoneOffset && this.setTimezoneOffset(t.timezoneOffset), this
}, Date.prototype.clearTime = function () {
    return this.setHours(0), this.setMinutes(0), this.setSeconds(0), this.setMilliseconds(0), this
}, Date.prototype.isLeapYear = function () {
    var e = this.getFullYear();
    return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
}, Date.prototype.isWeekday = function () {
    return !this.is().sat() && !this.is().sun()
}, Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth())
}, Date.prototype.moveToFirstDayOfMonth = function () {
    return this.set({
        day: 1
    })
}, Date.prototype.moveToLastDayOfMonth = function () {
    return this.set({
        day: this.getDaysInMonth()
    })
}, Date.prototype.moveToDayOfWeek = function (e, t) {
    var n = (e - this.getDay() + 7 * (t || 1)) % 7;
    return this.addDays(n === 0 ? n += 7 * (t || 1) : n)
}, Date.prototype.moveToMonth = function (e, t) {
    var n = (e - this.getMonth() + 12 * (t || 1)) % 12;
    return this.addMonths(n === 0 ? n += 12 * (t || 1) : n)
}, Date.prototype.getDayOfYear = function () {
    return Math.floor((this - new Date(this.getFullYear(), 0, 1)) / 864e5)
}, Date.prototype.getWeekOfYear = function (e) {
    var t = this.getFullYear(),
        n = this.getMonth(),
        r = this.getDate(),
        i = e || Date.CultureInfo.firstDayOfWeek,
        s = 8 - (new Date(t, 0, 1)).getDay();
    s == 8 && (s = 1);
    var o = (Date.UTC(t, n, r, 0, 0, 0) - Date.UTC(t, 0, 1, 0, 0, 0)) / 864e5 + 1,
        u = Math.floor((o - s + 7) / 7);
    if (u === i) {
        t--;
        var a = 8 - (new Date(t, 0, 1)).getDay();
        a == 2 || a == 8 ? u = 53 : u = 52
    }
    return u
}, Date.prototype.isDST = function () {
    return console.log("isDST"), this.toString().match(/(E|C|M|P)(S|D)T/)[2] == "D"
}, Date.prototype.getTimezone = function () {
    return Date.getTimezoneAbbreviation(this.getUTCOffset, this.isDST())
}, Date.prototype.setTimezoneOffset = function (e) {
    var t = this.getTimezoneOffset(),
        n = Number(e) * -6 / 10;
    return this.addMinutes(n - t), this
}, Date.prototype.setTimezone = function (e) {
    return this.setTimezoneOffset(Date.getTimezoneOffset(e))
}, Date.prototype.getUTCOffset = function () {
    var e = this.getTimezoneOffset() * -10 / 6,
        t;
    return e < 0 ? (t = (e - 1e4).toString(), t[0] + t.substr(2)) : (t = (e + 1e4).toString(), "+" + t.substr(1))
}, Date.prototype.getDayName = function (e) {
    return e ? Date.CultureInfo.abbreviatedDayNames[this.getDay()] : Date.CultureInfo.dayNames[this.getDay()]
}, Date.prototype.getMonthName = function (e) {
    return e ? Date.CultureInfo.abbreviatedMonthNames[this.getMonth()] : Date.CultureInfo.monthNames[this.getMonth()]
}, Date.prototype._toString = Date.prototype.toString, Date.prototype.toString = function (e) {
    var t = this,
        n = function (t) {
            return t.toString().length == 1 ? "0" + t : t
        };
    return e ? e.replace(/dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?/g, function (e) {
        switch (e) {
            case "hh":
                return n(t.getHours() < 13 ? t.getHours() : t.getHours() - 12);
            case "h":
                return t.getHours() < 13 ? t.getHours() : t.getHours() - 12;
            case "HH":
                return n(t.getHours());
            case "H":
                return t.getHours();
            case "mm":
                return n(t.getMinutes());
            case "m":
                return t.getMinutes();
            case "ss":
                return n(t.getSeconds());
            case "s":
                return t.getSeconds();
            case "yyyy":
                return t.getFullYear();
            case "yy":
                return t.getFullYear().toString().substring(2, 4);
            case "dddd":
                return t.getDayName();
            case "ddd":
                return t.getDayName(!0);
            case "dd":
                return n(t.getDate());
            case "d":
                return t.getDate().toString();
            case "MMMM":
                return t.getMonthName();
            case "MMM":
                return t.getMonthName(!0);
            case "MM":
                return n(t.getMonth() + 1);
            case "M":
                return t.getMonth() + 1;
            case "t":
                return t.getHours() < 12 ? Date.CultureInfo.amDesignator.substring(0, 1) : Date.CultureInfo.pmDesignator.substring(0, 1);
            case "tt":
                return t.getHours() < 12 ? Date.CultureInfo.amDesignator : Date.CultureInfo.pmDesignator;
            case "zzz":
            case "zz":
            case "z":
                return ""
        }
    }) : this._toString()
}, Date.now = function () {
    return new Date
}, Date.today = function () {
    return Date.now().clearTime()
}, Date.prototype._orient = 1, Date.prototype.next = function () {
    return this._orient = 1, this
}, Date.prototype.last = Date.prototype.prev = Date.prototype.previous = function () {
    return this._orient = -1, this
}, Date.prototype._is = !1, Date.prototype.is = function () {
    return this._is = !0, this
}, Number.prototype._dateElement = "day", Number.prototype.fromNow = function () {
    var e = {};
    return e[this._dateElement] = this, Date.now().add(e)
}, Number.prototype.ago = function () {
    var e = {};
    return e[this._dateElement] = this * -1, Date.now().add(e)
},
    function () {
        var e = Date.prototype,
            t = Number.prototype,
            n = "sunday monday tuesday wednesday thursday friday saturday".split(/\s/),
            r = "january february march april may june july august september october november december".split(/\s/),
            i = "Millisecond Second Minute Hour Day Week Month Year".split(/\s/),
            s, o = function (e) {
                return function () {
                    return this._is ? (this._is = !1, this.getDay() == e) : this.moveToDayOfWeek(e, this._orient)
                }
            };
        for (var u = 0; u < n.length; u++) e[n[u]] = e[n[u].substring(0, 3)] = o(u);
        var a = function (e) {
            return function () {
                return this._is ? (this._is = !1, this.getMonth() === e) : this.moveToMonth(e, this._orient)
            }
        };
        for (var f = 0; f < r.length; f++) e[r[f]] = e[r[f].substring(0, 3)] = a(f);
        var l = function (e) {
            return function () {
                return e.substring(e.length - 1) != "s" && (e += "s"), this["add" + e](this._orient)
            }
        }, c = function (e) {
            return function () {
                return this._dateElement = e, this
            }
        };
        for (var h = 0; h < i.length; h++) s = i[h].toLowerCase(), e[s] = e[s + "s"] = l(i[h]), t[s] = t[s + "s"] = c(s)
    }(), Date.prototype.toJSONString = function () {
    return this.toString("yyyy-MM-ddThh:mm:ssZ")
}, Date.prototype.toShortDateString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.shortDatePattern)
}, Date.prototype.toLongDateString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.longDatePattern)
}, Date.prototype.toShortTimeString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.shortTimePattern)
}, Date.prototype.toLongTimeString = function () {
    return this.toString(Date.CultureInfo.formatPatterns.longTimePattern)
}, Date.prototype.getOrdinal = function () {
    switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th"
    }
},
    function () {
        Date.Parsing = {
            Exception: function (e) {
                this.message = "Parse error at '" + e.substring(0, 10) + " ...'"
            }
        };
        var e = Date.Parsing,
            t = e.Operators = {
                rtoken: function (t) {
                    return function (n) {
                        var i = n.match(t);
                        if (i) return [i[0], n.substring(i[0].length)];
                        throw new e.Exception(n)
                    }
                },
                token: function (e) {
                    return function (e) {
                        return t.rtoken(new RegExp("^s*" + e + "s*"))(e)
                    }
                },
                stoken: function (e) {
                    return t.rtoken(new RegExp("^" + e))
                },
                until: function (e) {
                    return function (t) {
                        var n = [],
                            r = null;
                        while (t.length) {
                            try {
                                r = e.call(this, t)
                            } catch (i) {
                                n.push(r[0]), t = r[1];
                                continue
                            }
                            break
                        }
                        return [n, t]
                    }
                },
                many: function (e) {
                    return function (t) {
                        var n = [],
                            r = null;
                        while (t.length) {
                            try {
                                r = e.call(this, t)
                            } catch (i) {
                                return [n, t]
                            }
                            n.push(r[0]), t = r[1]
                        }
                        return [n, t]
                    }
                },
                optional: function (e) {
                    return function (t) {
                        var n = null;
                        try {
                            n = e.call(this, t)
                        } catch (r) {
                            return [null, t]
                        }
                        return [n[0], n[1]]
                    }
                },
                not: function (t) {
                    return function (n) {
                        try {
                            t.call(this, n)
                        } catch (r) {
                            return [null, n]
                        }
                        throw new e.Exception(n)
                    }
                },
                ignore: function (e) {
                    return e ? function (t) {
                        var n = null;
                        return n = e.call(this, t), [null, n[1]]
                    } : null
                },
                product: function () {
                    var e = arguments[0],
                        n = Array.prototype.slice.call(arguments, 1),
                        r = [];
                    for (var i = 0; i < e.length; i++) r.push(t.each(e[i], n));
                    return r
                },
                cache: function (t) {
                    var n = {}, r = null;
                    return function (i) {
                        try {
                            r = n[i] = n[i] || t.call(this, i)
                        } catch (s) {
                            r = n[i] = s
                        }
                        if (r instanceof e.Exception) throw r;
                        return r
                    }
                },
                any: function () {
                    var t = arguments;
                    return function (n) {
                        var r = null;
                        for (var i = 0; i < t.length; i++) {
                            if (t[i] == null) continue;
                            try {
                                r = t[i].call(this, n)
                            } catch (s) {
                                r = null
                            }
                            if (r) return r
                        }
                        throw new e.Exception(n)
                    }
                },
                each: function () {
                    var t = arguments;
                    return function (n) {
                        var r = [],
                            i = null;
                        for (var s = 0; s < t.length; s++) {
                            if (t[s] == null) continue;
                            try {
                                i = t[s].call(this, n)
                            } catch (o) {
                                throw new e.Exception(n)
                            }
                            r.push(i[0]), n = i[1]
                        }
                        return [r, n]
                    }
                },
                all: function () {
                    var e = arguments,
                        t = t;
                    return t.each(t.optional(e))
                },
                sequence: function (n, r, i) {
                    return r = r || t.rtoken(/^\s*/), i = i || null, n.length == 1 ? n[0] : function (t) {
                        var s = null,
                            o = null,
                            u = [];
                        for (var a = 0; a < n.length; a++) {
                            try {
                                s = n[a].call(this, t)
                            } catch (f) {
                                break
                            }
                            u.push(s[0]);
                            try {
                                o = r.call(this, s[1])
                            } catch (l) {
                                o = null;
                                break
                            }
                            t = o[1]
                        }
                        if (!s) throw new e.Exception(t);
                        if (o) throw new e.Exception(o[1]);
                        if (i) try {
                            s = i.call(this, s[1])
                        } catch (h) {
                            throw new e.Exception(s[1])
                        }
                        return [u, s ? s[1] : t]
                    }
                },
                between: function (e, n, i) {
                    i = i || e;
                    var s = t.each(t.ignore(e), n, t.ignore(i));
                    return function (e) {
                        var t = s.call(this, e);
                        return [[t[0][0], r[0][2]], t[1]]
                    }
                },
                list: function (e, n, r) {
                    return n = n || t.rtoken(/^\s*/), r = r || null, e instanceof Array ? t.each(t.product(e.slice(0, -1), t.ignore(n)), e.slice(-1), t.ignore(r)) : t.each(t.many(t.each(e, t.ignore(n))), px, t.ignore(r))
                },
                set: function (n, r, i) {
                    return r = r || t.rtoken(/^\s*/), i = i || null,
                        function (s) {
                            var o = null,
                                u = null,
                                a = null,
                                f = null,
                                l = [
                                    [], s
                                ],
                                h = !1;
                            for (var p = 0; p < n.length; p++) {
                                a = null, u = null, o = null, h = n.length == 1;
                                try {
                                    o = n[p].call(this, s)
                                } catch (v) {
                                    continue
                                }
                                f = [
                                    [o[0]], o[1]
                                ];
                                if (o[1].length > 0 && !h) try {
                                    a = r.call(this, o[1])
                                } catch (m) {
                                    h = !0
                                } else h = !0;
                                !h && a[1].length === 0 && (h = !0);
                                if (!h) {
                                    var g = [];
                                    for (var y = 0; y < n.length; y++) p != y && g.push(n[y]);
                                    u = t.set(g, r).call(this, a[1]), u[0].length > 0 && (f[0] = f[0].concat(u[0]), f[1] = u[1])
                                }
                                f[1].length < l[1].length && (l = f);
                                if (l[1].length === 0) break
                            }
                            if (l[0].length === 0) return l;
                            if (i) {
                                try {
                                    a = i.call(this, l[1])
                                } catch (b) {
                                    throw new e.Exception(l[1])
                                }
                                l[1] = a[1]
                            }
                            return l
                        }
                },
                forward: function (e, t) {
                    return function (n) {
                        return e[t].call(this, n)
                    }
                },
                replace: function (e, t) {
                    return function (n) {
                        var r = e.call(this, n);
                        return [t, r[1]]
                    }
                },
                process: function (e, t) {
                    return function (n) {
                        var r = e.call(this, n);
                        return [t.call(this, r[0]), r[1]]
                    }
                },
                min: function (t, n) {
                    return function (r) {
                        var i = n.call(this, r);
                        if (i[0].length < t) throw new e.Exception(r);
                        return i
                    }
                }
            }, n = function (e) {
                return function () {
                    var t = null,
                        n = [];
                    arguments.length > 1 ? t = Array.prototype.slice.call(arguments) : arguments[0] instanceof Array && (t = arguments[0]);
                    if (!t) return e.apply(null, arguments);
                    for (var r = 0, i = t.shift(); r < i.length; r++) return t.unshift(i[r]), n.push(e.apply(null, t)), t.shift(), n
                }
            }, i = "optional not ignore cache".split(/\s/);
        for (var s = 0; s < i.length; s++) t[i[s]] = n(t[i[s]]);
        var o = function (e) {
            return function () {
                return arguments[0] instanceof Array ? e.apply(null, arguments[0]) : e.apply(null, arguments)
            }
        }, u = "each any all".split(/\s/);
        for (var a = 0; a < u.length; a++) t[u[a]] = o(t[u[a]])
    }(),
    function () {
        var e = function (t) {
            var n = [];
            for (var r = 0; r < t.length; r++) t[r] instanceof Array ? n = n.concat(e(t[r])) : t[r] && n.push(t[r]);
            return n
        };
        Date.Grammar = {}, Date.Translator = {
            hour: function (e) {
                return function () {
                    this.hour = Number(e)
                }
            },
            minute: function (e) {
                return function () {
                    this.minute = Number(e)
                }
            },
            second: function (e) {
                return function () {
                    this.second = Number(e)
                }
            },
            meridian: function (e) {
                return function () {
                    this.meridian = e.slice(0, 1).toLowerCase()
                }
            },
            timezone: function (e) {
                return function () {
                    var t = e.replace(/[^\d\+\-]/g, "");
                    t.length ? this.timezoneOffset = Number(t) : this.timezone = e.toLowerCase()
                }
            },
            day: function (e) {
                var t = e[0];
                return function () {
                    this.day = Number(t.match(/\d+/)[0])
                }
            },
            month: function (e) {
                return function () {
                    this.month = e.length == 3 ? Date.getMonthNumberFromName(e) : Number(e) - 1
                }
            },
            year: function (e) {
                return function () {
                    var t = Number(e);
                    this.year = e.length > 2 ? t : t + (t + 2e3 < Date.CultureInfo.twoDigitYearMax ? 2e3 : 1900)
                }
            },
            rday: function (e) {
                return function () {
                    switch (e) {
                        case "yesterday":
                            this.days = -1;
                            break;
                        case "tomorrow":
                            this.days = 1;
                            break;
                        case "today":
                            this.days = 0;
                            break;
                        case "now":
                            this.days = 0, this.now = !0
                    }
                }
            },
            finishExact: function (e) {
                e = e instanceof Array ? e : [e];
                var t = new Date;
                this.year = t.getFullYear(), this.month = t.getMonth(), this.day = 1, this.hour = 0, this.minute = 0, this.second = 0;
                for (var n = 0; n < e.length; n++) e[n] && e[n].call(this);
                this.hour = this.meridian == "p" && this.hour < 13 ? this.hour + 12 : this.hour;
                if (this.day > Date.getDaysInMonth(this.year, this.month)) throw new RangeError(this.day + " is not a valid value for days.");
                var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);
                return this.timezone ? r.set({
                    timezone: this.timezone
                }) : this.timezoneOffset && r.set({
                    timezoneOffset: this.timezoneOffset
                }), r
            },
            finish: function (t) {
                t = t instanceof Array ? e(t) : [t];
                if (t.length === 0) return null;
                for (var n = 0; n < t.length; n++) typeof t[n] == "function" && t[n].call(this);
                if (this.now) return new Date;
                var r = Date.today(),
                    i = null,
                    s = this.days != null || !! this.orient || !! this.operator;
                if (s) {
                    var o, u, a;
                    a = this.orient == "past" || this.operator == "subtract" ? -1 : 1, this.weekday && (this.unit = "day", o = Date.getDayNumberFromName(this.weekday) - r.getDay(), u = 7, this.days = o ? (o + a * u) % u : a * u), this.month && (this.unit = "month", o = this.month - r.getMonth(), u = 12, this.months = o ? (o + a * u) % u : a * u, this.month = null), this.unit || (this.unit = "day");
                    if (this[this.unit + "s"] == null || this.operator != null) this.value || (this.value = 1), this.unit == "week" && (this.unit = "day", this.value = this.value * 7), this[this.unit + "s"] = this.value * a;
                    return r.add(this)
                }
                return this.meridian && this.hour && (this.hour = this.hour < 13 && this.meridian == "p" ? this.hour + 12 : this.hour), this.weekday && !this.day && (this.day = r.addDays(Date.getDayNumberFromName(this.weekday) - r.getDay()).getDate()), this.month && !this.day && (this.day = 1), r.set(this)
            }
        };
        var t = Date.Parsing.Operators,
            n = Date.Grammar,
            r = Date.Translator,
            i;
        n.datePartDelimiter = t.rtoken(/^([\s\-\.\,\/\x27]+)/), n.timePartDelimiter = t.stoken(":"), n.whiteSpace = t.rtoken(/^\s*/), n.generalDelimiter = t.rtoken(/^(([\s\,]|at|on)+)/);
        var s = {};
        n.ctoken = function (e) {
            var n = s[e];
            if (!n) {
                var r = Date.CultureInfo.regexPatterns,
                    i = e.split(/\s+/),
                    o = [];
                for (var u = 0; u < i.length; u++) o.push(t.replace(t.rtoken(r[i[u]]), i[u]));
                n = s[e] = t.any.apply(null, o)
            }
            return n
        }, n.ctoken2 = function (e) {
            return t.rtoken(Date.CultureInfo.regexPatterns[e])
        }, n.h = t.cache(t.process(t.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), r.hour)), n.hh = t.cache(t.process(t.rtoken(/^(0[0-9]|1[0-2])/), r.hour)), n.H = t.cache(t.process(t.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), r.hour)), n.HH = t.cache(t.process(t.rtoken(/^([0-1][0-9]|2[0-3])/), r.hour)), n.m = t.cache(t.process(t.rtoken(/^([0-5][0-9]|[0-9])/), r.minute)), n.mm = t.cache(t.process(t.rtoken(/^[0-5][0-9]/), r.minute)), n.s = t.cache(t.process(t.rtoken(/^([0-5][0-9]|[0-9])/), r.second)), n.ss = t.cache(t.process(t.rtoken(/^[0-5][0-9]/), r.second)), n.hms = t.cache(t.sequence([n.H, n.mm, n.ss], n.timePartDelimiter)), n.t = t.cache(t.process(n.ctoken2("shortMeridian"), r.meridian)), n.tt = t.cache(t.process(n.ctoken2("longMeridian"), r.meridian)), n.z = t.cache(t.process(t.rtoken(/^(\+|\-)?\s*\d\d\d\d?/), r.timezone)), n.zz = t.cache(t.process(t.rtoken(/^(\+|\-)\s*\d\d\d\d/), r.timezone)), n.zzz = t.cache(t.process(n.ctoken2("timezone"), r.timezone)), n.timeSuffix = t.each(t.ignore(n.whiteSpace), t.set([n.tt, n.zzz])), n.time = t.each(t.optional(t.ignore(t.stoken("T"))), n.hms, n.timeSuffix), n.d = t.cache(t.process(t.each(t.rtoken(/^([0-2]\d|3[0-1]|\d)/), t.optional(n.ctoken2("ordinalSuffix"))), r.day)), n.dd = t.cache(t.process(t.each(t.rtoken(/^([0-2]\d|3[0-1])/), t.optional(n.ctoken2("ordinalSuffix"))), r.day)), n.ddd = n.dddd = t.cache(t.process(n.ctoken("sun mon tue wed thu fri sat"), function (e) {
            return function () {
                this.weekday = e
            }
        })), n.M = t.cache(t.process(t.rtoken(/^(1[0-2]|0\d|\d)/), r.month)), n.MM = t.cache(t.process(t.rtoken(/^(1[0-2]|0\d)/), r.month)), n.MMM = n.MMMM = t.cache(t.process(n.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), r.month)), n.y = t.cache(t.process(t.rtoken(/^(\d\d?)/), r.year)), n.yy = t.cache(t.process(t.rtoken(/^(\d\d)/), r.year)), n.yyy = t.cache(t.process(t.rtoken(/^(\d\d?\d?\d?)/), r.year)), n.yyyy = t.cache(t.process(t.rtoken(/^(\d\d\d\d)/), r.year)), i = function () {
            return t.each(t.any.apply(null, arguments), t.not(n.ctoken2("timeContext")))
        }, n.day = i(n.d, n.dd), n.month = i(n.M, n.MMM), n.year = i(n.yyyy, n.yy), n.orientation = t.process(n.ctoken("past future"), function (e) {
            return function () {
                this.orient = e
            }
        }), n.operator = t.process(n.ctoken("add subtract"), function (e) {
            return function () {
                this.operator = e
            }
        }), n.rday = t.process(n.ctoken("yesterday tomorrow today now"), r.rday), n.unit = t.process(n.ctoken("minute hour day week month year"), function (e) {
            return function () {
                this.unit = e
            }
        }), n.value = t.process(t.rtoken(/^\d\d?(st|nd|rd|th)?/), function (e) {
            return function () {
                this.value = e.replace(/\D/g, "")
            }
        }), n.expression = t.set([n.rday, n.operator, n.value, n.unit, n.orientation, n.ddd, n.MMM]), i = function () {
            return t.set(arguments, n.datePartDelimiter)
        }, n.mdy = i(n.ddd, n.month, n.day, n.year), n.ymd = i(n.ddd, n.year, n.month, n.day), n.dmy = i(n.ddd, n.day, n.month, n.year), n.date = function (e) {
            return (n[Date.CultureInfo.dateElementOrder] || n.mdy).call(this, e)
        }, n.format = t.process(t.many(t.any(t.process(t.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (e) {
            if (n[e]) return n[e];
            throw Date.Parsing.Exception(e)
        }), t.process(t.rtoken(/^[^dMyhHmstz]+/), function (e) {
            return t.ignore(t.stoken(e))
        }))), function (e) {
            return t.process(t.each.apply(null, e), r.finishExact)
        });
        var o = {}, u = function (e) {
            return o[e] = o[e] || n.format(e)[0]
        };
        n.formats = function (e) {
            if (e instanceof Array) {
                var n = [];
                for (var r = 0; r < e.length; r++) n.push(u(e[r]));
                return t.any.apply(null, n)
            }
            return u(e)
        }, n._formats = n.formats(["yyyy-MM-ddTHH:mm:ss", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "d"]), n._start = t.process(t.set([n.date, n.time, n.expression], n.generalDelimiter, n.whiteSpace), r.finish), n.start = function (e) {
            try {
                var t = n._formats.call({}, e);
                if (t[1].length === 0) return t
            } catch (r) {}
            return n._start.call({}, e)
        }
    }(), Date._parse = Date.parse, Date.parse = function (e) {
    var t = null;
    if (!e) return null;
    try {
        t = Date.Grammar.start.call({}, e)
    } catch (n) {
        return null
    }
    return t[1].length === 0 ? t[0] : null
}, Date.getParseFunction = function (e) {
    var t = Date.Grammar.formats(e);
    return function (e) {
        var n = null;
        try {
            n = t.call({}, e)
        } catch (r) {
            return null
        }
        return n[1].length === 0 ? n[0] : null
    }
}, Date.parseExact = function (e, t) {
    return Date.getParseFunction(t)(e)
}, ! function (e) {
    "use strict";
    var t = function (e, t) {
        this.cinit("clickover", e, t)
    };
    t.prototype = e.extend({}, e.fn.popover.Constructor.prototype, {
        constructor: t,
        cinit: function (t, n, r) {
            this.attr = {}, this.attr.me = (Math.random() * 10 + "").replace(/\D/g, ""), this.attr.click_event_ns = "click." + this.attr.me + " touchstart." + this.attr.me, r || (r = {}), r.trigger = "manual", this.init(t, n, r), this.$element.on("click", this.options.selector, e.proxy(this.clickery, this))
        },
        clickery: function (t) {
            t && (t.preventDefault(), t.stopPropagation()), this.options.width && this.tip().width(this.options.width), this.options.height && this.tip().height(this.options.height), this.options.tip_id && this.tip().attr("id", this.options.tip_id), this.options.class_name && this.tip().addClass(this.options.class_name), this[this.isShown() ? "hide" : "show"]();
            if (this.isShown()) {
                var n = this;
                this.options.global_close && e("body").on(this.attr.click_event_ns, function (e) {
                    n.tip().has(e.target).length || n.clickery()
                }), this.options.esc_close && e(document).bind("keyup.clickery", function (e) {
                    e.keyCode == 27 && n.clickery();
                    return
                }), !this.options.allow_multiple && e("[data-clickover-open=1]").each(function () {
                    e(this).data("clickover") && e(this).data("clickover").clickery()
                }), this.$element.attr("data-clickover-open", 1), this.tip().on("click", '[data-dismiss="clickover"]', e.proxy(this.clickery, this)), this.options.auto_close && this.options.auto_close > 0 && (this.attr.tid = setTimeout(e.proxy(this.clickery, this), this.options.auto_close)), typeof this.options.onShown == "function" && this.options.onShown.call(this), this.$element.trigger("shown")
            } else this.$element.removeAttr("data-clickover-open"), this.options.esc_close && e(document).unbind("keyup.clickery"), e("body").off(this.attr.click_event_ns), typeof this.attr.tid == "number" && (clearTimeout(this.attr.tid), delete this.attr.tid), typeof this.options.onHidden == "function" && this.options.onHidden.call(this), this.$element.trigger("hidden")
        },
        isShown: function () {
            return this.tip().hasClass("in")
        },
        resetPosition: function () {
            var e, t, n, r, i, s, o;
            if (this.hasContent() && this.enabled) {
                e = this.tip(), s = typeof this.options.placement == "function" ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement, t = /in/.test(s), n = this.getPosition(t), r = e[0].offsetWidth, i = e[0].offsetHeight;
                switch (t ? s.split(" ")[1] : s) {
                    case "bottom":
                        o = {
                            top: n.top + n.height,
                            left: n.left + n.width / 2 - r / 2
                        };
                        break;
                    case "top":
                        o = {
                            top: n.top - i,
                            left: n.left + n.width / 2 - r / 2
                        };
                        break;
                    case "left":
                        o = {
                            top: n.top + n.height / 2 - i / 2,
                            left: n.left - r
                        };
                        break;
                    case "right":
                        o = {
                            top: n.top + n.height / 2 - i / 2,
                            left: n.left + n.width
                        }
                }
                e.css(o)
            }
        },
        debughide: function () {
            var e = (new Date).toString();
            console.log(e + ": clickover hide"), this.hide()
        }
    }), e.fn.clickover = function (n) {
        return this.each(function () {
            var r = e(this),
                i = r.data("clickover"),
                s = typeof n == "object" && n;
            i || r.data("clickover", i = new t(this, s)), typeof n == "string" && i[n]()
        })
    }, e.fn.clickover.Constructor = t, e.fn.clickover.defaults = e.extend({}, e.fn.popover.defaults, {
        trigger: "manual",
        auto_close: 0,
        global_close: 1,
        esc_close: 1,
        onShown: null,
        onHidden: null,
        width: null,
        height: null,
        tip_id: null,
        class_name: "clickover",
        allow_multiple: 0
    })
}(window.jQuery),
    function (e, t, n, r) {
        function u(t, n) {
            this.element = e(t), this.options = e.extend({}, s, n), this._defaults = s, this._name = i, this.init()
        }
        var i = "Calendar",
            s = {
                weekStart: 7,
                msg_days: ["S", "M", "T", "W", "T", "F", "S"],
                msg_months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                msg_today: "Today",
                msg_events_header: "Events Today",
                events: null
            }, o = '<table class="calendar" id="calendar"><div class="caltop"><h3 class="month"></h3> <h3 class="year"></h3></div><th colspan="2" class="sel" id="last" style="xvisibility: hidden;"><div class="arrow"><i class="icon-arrow-left"></i></div></th><th colspan="2" class="sel" id="next"><div class="arrow"><i class="icon-arrow-right"></i></div></th><thead class="calendar-header"></thead><tbody class="calendar-body"></tbody><tfoot>';
        '<th colspan="3" class="sel" id="current">' + s.msg_today + "</th>" + "</tfoot>" + "</table>" + "", daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], today = new Date, u.prototype.init = function () {
            this.weekStart = this.options.weekStart || 1, this.days = this.options.msg_days, this.months = this.options.msg_months, this.msg_today = this.options.msg_today, this.msg_events_hdr = this.options.msg_events_header, this.events = this.options.events, this.calendar = e(o.replace("%msg_today%", this.msg_today)).appendTo(this.element).on({
                click: e.proxy(this.click, this)
            }), this.live_date = new Date;
            var t = new Date;
            this.mm = t.getMonth(), this.yy = t.getFullYear();
            var n = new Date(this.yy, this.mm, 1);
            this.yp = n.getFullYear(), this.yn = n.getFullYear(), this.component ? this.component.on("click", e.proxy(this.show, this)) : this.element.on("click", e.proxy(this.show, this));
            var r = this;
            this.element.on("change_order_status", function (e, n, i) {
                for (var s in r.events) r.events[s].order_id == n ? (r.events[s].status = i, r.events[s].selected = !0) : r.events[s].selected = !1;
                r.renderCalendar(t)
            }), this.renderCalendar(t)
        }, u.prototype.renderEvents = function (t, n) {
            var r = this.live_date,
                i = r.getFullYear(),
                s = this.msg_events_hdr,
                o = (new Date).setHours(0, 0, 0, 0),
                u = Date.parseExact(t.slice(-1)[0].date, "yyyy-MM-dd").setHours(0, 0, 0, 0);
            for (var a = 1; a <= daysInMonth[r.getMonth()]; a++) {
                var f = r.getMonth(),
                    l = new Date(i, f, a, 0, 0, 0, 0),
                    c = new Date(u),
                    h = new Date(c.setDate(c.getDate() - c.getDay() + 6)),
                    p = new Date,
                    d = new Date(p.setDate(p.getDate() - p.getDay() - 1));
                past_day = n.parent("div:first").find("#day_" + a), d.valueOf() > l.valueOf() && (past_day.parent().addClass("past"), past_day.addClass("past")), o.valueOf() == l.valueOf() && past_day.addClass("today"), l.valueOf() > h.valueOf() && (past_day.parent().addClass("past"), past_day.addClass("past")), past_day.parent().find(".past").off("click"), e.each(t, function () {
                    var r = Date.parseExact(this.date, "yyyy-MM-dd"),
                        i = new Date(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), r.getUTCHours(), r.getUTCMinutes(), r.getUTCSeconds());
                    if (i.getDate() == l.getDate() && i.getMonth() == l.getMonth() && i.getFullYear() == l.getFullYear()) {
                        var s = n.parent("div:first").find("#day_" + a),
                            o = this;
                        s.parent().addClass("clickable"), o.selected && (e("TR.selected").removeClass("selected"), s.parent().addClass("selected")), s.removeClass("day").empty().append('<span class="weekday">' + a + "</span>"), this.status == "Suspended" || this.status == "Failed" ? s.addClass("day skip") : (this.status == "Scheduled" || this.status == "Paid") && s.addClass("day holiday"), s.parent().find(".day").click(function () {
                            e("TR.selected").removeClass("selected"), s.parent().addClass("selected"), e.each(t, function () {
                                this.selected = !1
                            }), o.selected = !0, o.clickEvent()
                        })
                    }
                })
            }
        }, u.prototype.loadEvents = function () {
            this.events !== null && this.renderEvents(this.events, this.calendar)
        }, u.prototype.renderCalendar = function (t) {
            var n = new Date(this.yy, this.mm, 1),
                r = this.live_date;
            e("#calendar #last").show(), n.valueOf() < today.valueOf() && e("#calendar #last").hide(), e("#calendar #next").show(), last_day = new Date(this.yy, this.mm + 1, 0), last_event = Date.parseExact(events.slice(-1)[0].date, "yyyy-MM-dd"), last_day.valueOf() > last_event.valueOf() && e("#calendar #next").hide(), this.element.parent("div:first").find(".year").empty(), this.element.parent("div:first").find(".month").empty(), this.element.parent("div:first").find(".year").append(n.getFullYear()), this.element.parent("div:first").find(".month").append(this.months[n.getMonth()]), this.isLeapYear(t.getYear()) ? daysInMonth[1] = 29 : daysInMonth[1] = 28, this.calendar.find(".calendar-header").empty(), this.calendar.find(".calendar-body").empty(), this.renderDays();
            var i = n.getDay(),
                s = 6,
                o = 0,
                u = 0,
                a = 0;
            for (var f = 0; f >= a; f++) {
                var l = "";
                for (var c = this.weekStart; c < this.days.length + this.weekStart; c++) {
                    cls = "", msg = "", id = "";
                    if (u >= daysInMonth[n.getMonth()]) o = 0;
                    else if (o % 7 > 0 && u % 7 > 0 || c % 7 == i % 7) o++, u++;
                    o == daysInMonth[n.getMonth()] && (a = daysInMonth[n.getMonth()]), cls.length == 0 && (c % 7 == 0 || c % 7 == 6 ? cls = "day weekend" : cls = "day"), id = "day_" + o, month_ = t.getMonth() + 1, year = t.getFullYear(), o == 0 ? l += "<td>&nbsp;</td>" : msg.length > 0 ? l += '<td class="' + cls + '" id="' + id + '" year="' + year + '" month="' + month_ + '" day="' + o + '"><span class="weekday">' + o + "</span></td>" : l += '<td class="' + cls + '" id="' + id + '" year="' + year + '" month="' + month_ + '" day="' + o + '">' + o + "</td>"
                }
                l = "<tr>" + l + "</tr>", this.calendar.find(".calendar-body").append(l)
            }
            this.loadEvents()
        }, u.prototype.renderDays = function () {
            var e = "";
            for (var t = this.weekStart; t < this.weekStart + 7; t++) e += "<th>" + this.days[t % 7] + "</th>";
            var n = "<tr>" + e + "</tr>";
            this.calendar.find(".calendar-header").append(n)
        }, u.prototype.click = function (t) {
            t.stopPropagation(), t.preventDefault();
            var n = e(t.target).closest("td, th");
            if (n.length == 1) switch (n[0].nodeName.toLowerCase()) {
                case "td":
                    if (n.is(".day")) {
                        var r = parseInt(n.attr("day"), 10) || 1,
                            i = parseInt(n.attr("month"), 10) || 1,
                            s = parseInt(n.attr("year"), 10) || 1;
                        this.element.trigger({
                            type: "changeDay",
                            day: r,
                            month: i,
                            year: s
                        })
                    } else if (n.is(".holiday")) {
                        var r = parseInt(n.attr("day"), 10) || 1,
                            i = parseInt(n.attr("month"), 10) || 1,
                            s = parseInt(n.attr("year"), 10) || 1;
                        this.element.trigger({
                            type: "onEvent",
                            day: r,
                            month: i,
                            year: s
                        })
                    } else if (n.is(".today")) {
                        var r = parseInt(n.attr("day"), 10) || 1,
                            i = parseInt(n.attr("month"), 10) || 1,
                            s = parseInt(n.attr("year"), 10) || 1;
                        this.element.trigger({
                            type: "changeDay",
                            day: r,
                            month: i,
                            year: s
                        })
                    }
                    break;
                case "th":
                    if (n.is(".sel")) switch (n.attr("id")) {
                        case "last":
                            this.update_date("prv");
                            var o = new Date(this.yp, this.mm, 1);
                            this.live_date = o, this.renderCalendar(o, this.events), this.element.trigger({
                                type: "onPrev"
                            });
                            break;
                        case "current":
                            this.update_date("crt");
                            var u = new Date;
                            this.live_date = u, this.renderCalendar(u, this.events), this.element.trigger({
                                type: "onCurrent"
                            });
                            break;
                        case "next":
                            this.update_date("nxt");
                            var a = new Date(this.yn, this.mm, 1);
                            this.live_date = a, this.renderCalendar(a, this.events), this.element.trigger({
                                type: "onNext"
                            })
                    }
            }
        }, u.prototype.update_date = function (e) {
            var t = new Date;
            switch (e) {
                case "prv":
                    t = new Date(this.yy, this.mm - 1, 1);
                    break;
                case "nxt":
                    t = new Date(this.yy, this.mm + 1, 1);
                    break;
                case "crt":
            }
            this.mm = t.getMonth(), this.yy = t.getFullYear();
            var n = new Date(this.yy, this.mm, 1);
            this.yp = n.getFullYear(), this.yn = n.getFullYear()
        }, u.prototype.isLeapYear = function (e) {
            return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
        }, e.fn[i] = function (t) {
            return this.each(function () {
                e.data(this, "plugin_" + i) || e.data(this, "plugin_" + i, new u(this, t))
            })
        }
    }(jQuery, window, document), $(function () {
    $(".load-more").click(function () {
        $(".load-more").hide(), $("#loader").show()
    })
}),
    function (e, t) {
        function c(e, t) {
            var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }

        function h() {
            var e = y.elements;
            return typeof e == "string" ? e.split(" ") : e
        }

        function p(e) {
            var t = f[e[u]];
            return t || (t = {}, a++, e[u] = a, f[a] = t), t
        }

        function d(e, n, r) {
            n || (n = t);
            if (l) return n.createElement(e);
            r || (r = p(n));
            var o;
            return r.cache[e] ? o = r.cache[e].cloneNode() : s.test(e) ? o = (r.cache[e] = r.createElem(e)).cloneNode() : o = r.createElem(e), o.canHaveChildren && !i.test(e) ? r.frag.appendChild(o) : o
        }

        function v(e, n) {
            e || (e = t);
            if (l) return e.createDocumentFragment();
            n = n || p(e);
            var r = n.frag.cloneNode(),
                i = 0,
                s = h(),
                o = s.length;
            for (; i < o; i++) r.createElement(s[i]);
            return r
        }

        function m(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                return y.shivMethods ? d(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/\w+/g, function (e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(y, t.frag)
        }

        function g(e) {
            e || (e = t);
            var n = p(e);
            return y.shivCSS && !o && !n.hasCSS && (n.hasCSS = !! c(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || m(e, n), e
        }

        function S(e) {
            var t, n = e.getElementsByTagName("*"),
                r = n.length,
                i = RegExp("^(?:" + h().join("|") + ")$", "i"),
                s = [];
            while (r--) t = n[r], i.test(t.nodeName) && s.push(t.applyElement(x(t)));
            return s
        }

        function x(e) {
            var t, n = e.attributes,
                r = n.length,
                i = e.ownerDocument.createElement(w + ":" + e.nodeName);
            while (r--) t = n[r], t.specified && i.setAttribute(t.nodeName, t.nodeValue);
            return i.style.cssText = e.style.cssText, i
        }

        function T(e) {
            var t, n = e.split("{"),
                r = n.length,
                i = RegExp("(^|[\\s,>+~])(" + h().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"),
                s = "$1" + w + "\\:$2";
            while (r--) t = n[r] = n[r].split("}"), t[t.length - 1] = t[t.length - 1].replace(i, s), n[r] = t.join("}");
            return n.join("{")
        }

        function N(e) {
            var t = e.length;
            while (t--) e[t].removeNode()
        }

        function C(e) {
            function o() {
                clearTimeout(r._removeSheetTimer), t && t.removeNode(!0), t = null
            }
            var t, n, r = p(e),
                i = e.namespaces,
                s = e.parentWindow;
            return !E || e.printShived ? e : (typeof i[w] == "undefined" && i.add(w), s.attachEvent("onbeforeprint", function () {
                o();
                var r, i, s, u = e.styleSheets,
                    a = [],
                    f = u.length,
                    l = Array(f);
                while (f--) l[f] = u[f];
                while (s = l.pop())
                    if (!s.disabled && b.test(s.media)) {
                        try {
                            r = s.imports, i = r.length
                        } catch (h) {
                            i = 0
                        }
                        for (f = 0; f < i; f++) l.push(r[f]);
                        try {
                            a.push(s.cssText)
                        } catch (h) {}
                    }
                a = T(a.reverse().join("")), n = S(e), t = c(e, a)
            }), s.attachEvent("onafterprint", function () {
                N(n), clearTimeout(r._removeSheetTimer), r._removeSheetTimer = setTimeout(o, 500)
            }), e.printShived = !0, e)
        }
        var n = "3.6.2",
            r = e.html5 || {}, i = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            s = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            o, u = "_html5shiv",
            a = 0,
            f = {}, l;
        (function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", o = "hidden" in e, l = e.childNodes.length == 1 || function () {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                }()
            } catch (n) {
                o = !0, l = !0
            }
        })();
        var y = {
            elements: r.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: n,
            shivCSS: r.shivCSS !== !1,
            supportsUnknownElements: l,
            shivMethods: r.shivMethods !== !1,
            type: "default",
            shivDocument: g,
            createElement: d,
            createDocumentFragment: v
        };
        e.html5 = y, g(t);
        var b = /^$|\b(?:all|print)\b/,
            w = "html5shiv",
            E = !l && function () {
                var n = t.documentElement;
                return typeof t.namespaces != "undefined" && typeof t.parentWindow != "undefined" && typeof n.applyElement != "undefined" && typeof n.removeNode != "undefined" && typeof e.attachEvent != "undefined"
            }();
        y.type += " print", y.shivPrint = C, C(t)
    }(this, document),
    function (e, t) {
        function c(e, t) {
            var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }

        function h() {
            var e = y.elements;
            return typeof e == "string" ? e.split(" ") : e
        }

        function p(e) {
            var t = f[e[u]];
            return t || (t = {}, a++, e[u] = a, f[a] = t), t
        }

        function d(e, n, r) {
            n || (n = t);
            if (l) return n.createElement(e);
            r || (r = p(n));
            var o;
            return r.cache[e] ? o = r.cache[e].cloneNode() : s.test(e) ? o = (r.cache[e] = r.createElem(e)).cloneNode() : o = r.createElem(e), o.canHaveChildren && !i.test(e) ? r.frag.appendChild(o) : o
        }

        function v(e, n) {
            e || (e = t);
            if (l) return e.createDocumentFragment();
            n = n || p(e);
            var r = n.frag.cloneNode(),
                i = 0,
                s = h(),
                o = s.length;
            for (; i < o; i++) r.createElement(s[i]);
            return r
        }

        function m(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                return y.shivMethods ? d(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/\w+/g, function (e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(y, t.frag)
        }

        function g(e) {
            e || (e = t);
            var n = p(e);
            return y.shivCSS && !o && !n.hasCSS && (n.hasCSS = !! c(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || m(e, n), e
        }
        var n = "3.6.2",
            r = e.html5 || {}, i = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            s = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            o, u = "_html5shiv",
            a = 0,
            f = {}, l;
        (function () {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", o = "hidden" in e, l = e.childNodes.length == 1 || function () {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                }()
            } catch (n) {
                o = !0, l = !0
            }
        })();
        var y = {
            elements: r.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
            version: n,
            shivCSS: r.shivCSS !== !1,
            supportsUnknownElements: l,
            shivMethods: r.shivMethods !== !1,
            type: "default",
            shivDocument: g,
            createElement: d,
            createDocumentFragment: v
        };
        e.html5 = y, g(t)
    }(this, document), $(function () {
    $(window).width() > 600 && ($("#hp-hero-4").waypoint(function (e) {
        e === "down" && $(".pie-slice").animate({
            left: "+=20",
            top: "+=50"
        }, 1e3)
    }, {
        offset: "5%"
    }), $("#hp-hero-4").waypoint(function (e) {
        e === "up" && $(".pie-slice").animate({
            left: "-=20",
            top: "-=50"
        }, 1e3)
    }, {
        offset: "5%"
    }));
    var e = function (e) {
        var t = e.$currentPage.find(".caption").html();
        $("#current-caption").html(t).fadeIn(200)
    };
    $("#slider-hp1").anythingSlider({
        appendControlsTo: $(".cap-1"),
        hashTags: !1,
        buildArrows: !1,
        expand: !0,
        playRtl: !1,
        easing: "easeOutCubic",
        startStopped: !0,
        autoPlay: !0,
        delay: 5e3,
        animationTime: 1e3,
        onInitialized: function (t, n) {
            e(n)
        },
        onSlideBegin: function (e, t) {
            $("#current-caption").fadeOut(200)
        },
        onSlideComplete: function (t) {
            e(t)
        }
    });
    var t = function (e) {
        var t = e.$currentPage.find(".name").html();
        $(".ingredient-name").html(t).fadeIn(200)
    };
    $("#slider-hp2").anythingSlider({
        appendControlsTo: $(".cap-2"),
        hashTags: !1,
        expand: !0,
        easing: "easeOutCubic",
        buildArrows: !1,
        startStopped: !0,
        autoPlay: !0,
        delay: 5e3,
        animationTime: 1e3,
        onInitialized: function (e, n) {
            t(n)
        },
        onSlideBegin: function (e, t) {
            $(".ingredient-name").fadeOut(200)
        },
        onSlideComplete: function (e) {
            t(e)
        }
    }), $(".promo-close").click(function () {
        $("#head-promo").hide()
    }), $("#head-promo").insertBefore("#hp-hero-1"), $(".promo-click").click(function () {
        $("#head-promo").toggle()
    }), $(".frogs").click(function () {
        $("#states").hide()
    })
}),
    function (e, t, n) {
        "use strict";
        e.anythingSlider = function (r, i) {
            var s = this,
                o, u;
            s.el = r, s.$el = e(r).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>'), s.$el.data("AnythingSlider", s), s.init = function () {
                s.options = o = e.extend({}, e.anythingSlider.defaults, i), s.initialized = !1, e.isFunction(o.onBeforeInitialize) && s.$el.bind("before_initialize", o.onBeforeInitialize), s.$el.trigger("before_initialize", s), e('<!--[if lte IE 8]><script>jQuery("body").addClass("as-oldie");</script><![endif]-->').appendTo("body").remove(), s.$wrapper = s.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-" + o.theme), s.$outer = s.$wrapper.parent(), s.$window = s.$el.closest("div.anythingWindow"), s.$win = e(t), s.$controls = e('<div class="anythingControls"></div>'), s.$nav = e('<ul class="thumbNav"><li><a><span></span></a></li></ul>'), s.$startStop = e('<a href="#" class="start-stop"></a>'), (o.buildStartStop || o.buildNavigation) && s.$controls.appendTo(o.appendControlsTo && e(o.appendControlsTo).length ? e(o.appendControlsTo) : s.$wrapper), o.buildNavigation && s.$nav.appendTo(o.appendNavigationTo && e(o.appendNavigationTo).length ? e(o.appendNavigationTo) : s.$controls), o.buildStartStop && s.$startStop.appendTo(o.appendStartStopTo && e(o
                    .appendStartStopTo).length ? e(o.appendStartStopTo) : s.$controls), s.runTimes = e(".anythingBase").length, s.regex = o.hashTags ? new RegExp("panel" + s.runTimes + "-(\\d+)", "i") : null, s.runTimes === 1 && s.makeActive(), s.flag = !1, o.autoPlayLocked && (o.autoPlay = !0), s.playing = o.autoPlay, s.slideshow = !1, s.hovered = !1, s.panelSize = [], s.currentPage = s.targetPage = o.startPanel = parseInt(o.startPanel, 10) || 1, o.changeBy = parseInt(o.changeBy, 10) || 1, u = (o.mode || "h").toLowerCase().match(/(h|v|f)/), u = o.vertical ? "v" : (u || ["h"])[0], o.mode = u === "v" ? "vertical" : u === "f" ? "fade" : "horizontal", u === "f" && (o.showMultiple = 1, o.infiniteSlides = !1), s.adj = o.infiniteSlides ? 0 : 1, s.adjustMultiple = 0, o.playRtl && s.$wrapper.addClass("rtl"), o.buildStartStop && s.buildAutoPlay(), o.buildArrows && s.buildNextBackButtons(), s.$lastPage = s.$targetPage = s.$currentPage, s.updateSlider(), o.expand && (s.$window.css({
                    width: "100%",
                    height: "100%"
                }), s.checkResize()), e.isFunction(e.easing[o.easing]) || (o.easing = "swing"), o.pauseOnHover && s.$wrapper.hover(function () {
                    s.playing && (s.$el.trigger("slideshow_paused", s), s.clearTimer(!0))
                }, function () {
                    s.playing && (s.$el.trigger("slideshow_unpaused", s), s.startStop(s.playing, !0))
                }), s.slideControls(!1), s.$wrapper.bind("mouseenter mouseleave", function (t) {
                    e(this)[t.type === "mouseenter" ? "addClass" : "removeClass"]("anythingSlider-hovered"), s.hovered = t.type === "mouseenter" ? !0 : !1, s.slideControls(s.hovered)
                }), e(n).keyup(function (e) {
                    if (o.enableKeyboard && s.$wrapper.hasClass("activeSlider") && !e.target.tagName.match("TEXTAREA|INPUT|SELECT")) {
                        if (o.mode !== "vertical" && (e.which === 38 || e.which === 40)) return;
                        switch (e.which) {
                            case 39:
                            case 40:
                                s.goForward();
                                break;
                            case 37:
                            case 38:
                                s.goBack()
                        }
                    }
                }), s.currentPage = (o.hashTags ? s.gotoHash() : "") || o.startPanel || 1, s.gotoPage(s.currentPage, !1, null, -1);
                var r = "slideshow_resized slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
                e.each("onSliderResize onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function (t, n) {
                    e.isFunction(o[n]) && s.$el.bind(r[t], o[n])
                }), e.isFunction(o.onSlideComplete) && s.$el.bind("slide_complete", function () {
                    return setTimeout(function () {
                        o.onSlideComplete(s)
                    }, 0), !1
                }), s.initialized = !0, s.$el.trigger("initialized", s), s.startStop(o.autoPlay)
            }, s.updateSlider = function () {
                s.$el.children(".cloned").remove(), s.navTextVisible = s.$nav.find("span:first").css("visibility") !== "hidden", s.$nav.empty(), s.currentPage = s.currentPage || 1, s.$items = s.$el.children(), s.pages = s.$items.length, s.dir = o.mode === "vertical" ? "top" : "left", o.showMultiple = parseInt(o.showMultiple, 10) || 1, o.navigationSize = o.navigationSize === !1 ? 0 : parseInt(o.navigationSize, 10) || 0, s.$items.find("a").unbind("focus.AnythingSlider").bind("focus.AnythingSlider", function (t) {
                    var n = e(this).closest(".panel"),
                        r = s.$items.index(n) + s.adj;
                    s.$items.find(".focusedLink").removeClass("focusedLink"), e(this).addClass("focusedLink"), s.$window.scrollLeft(0).scrollTop(0), r !== -1 && (r >= s.currentPage + o.showMultiple || r < s.currentPage) && (s.gotoPage(r), t.preventDefault())
                }), o.showMultiple > 1 && (o.showMultiple > s.pages && (o.showMultiple = s.pages), s.adjustMultiple = o.infiniteSlides && s.pages > 1 ? 0 : o.showMultiple - 1), s.$controls.add(s.$nav).add(s.$startStop).add(s.$forward).add(s.$back)[s.pages <= 1 ? "hide" : "show"](), s.pages > 1 && s.buildNavigation(), o.mode !== "fade" && o.infiniteSlides && s.pages > 1 && (s.$el.prepend(s.$items.filter(":last").clone().addClass("cloned")), o.showMultiple > 1 ? s.$el.append(s.$items.filter(":lt(" + o.showMultiple + ")").clone().addClass("cloned multiple")) : s.$el.append(s.$items.filter(":first").clone().addClass("cloned")), s.$el.find(".cloned").each(function () {
                    e(this).find("a,input,textarea,select,button,area,form").attr({
                        disabled: "disabled",
                        name: ""
                    }), e(this).find("[id]")[e.fn.addBack ? "addBack" : "andSelf"]().removeAttr("id")
                })), s.$items = s.$el.addClass(o.mode).children().addClass("panel"), s.setDimensions(), o.resizeContents ? (s.$items.css("width", s.width), s.$wrapper.css("width", s.getDim(s.currentPage)[0]).add(s.$items).css("height", s.height)) : s.$win.load(function () {
                    s.setDimensions(), u = s.getDim(s.currentPage), s.$wrapper.css({
                        width: u[0],
                        height: u[1]
                    }), s.setCurrentPage(s.currentPage, !1)
                }), s.currentPage > s.pages && (s.currentPage = s.pages), s.setCurrentPage(s.currentPage, !1), s.$nav.find("a").eq(s.currentPage - 1).addClass("cur"), o.mode === "fade" && (u = s.$items.eq(s.currentPage - 1), o.resumeOnVisible ? u.css({
                    opacity: 1
                }).siblings().css({
                        opacity: 0
                    }) : (s.$items.css("opacity", 1), u.fadeIn(0).siblings().fadeOut(0)))
            }, s.buildNavigation = function () {
                if (o.buildNavigation && s.pages > 1) {
                    var t, n, r, i, u;
                    s.$items.filter(":not(.cloned)").each(function (f) {
                        u = e("<li/>"), r = f + 1, n = (r === 1 ? " first" : "") + (r === s.pages ? " last" : ""), t = '<a class="panel' + r + (s.navTextVisible ? '"' : " " + o.tooltipClass + '" title="@"') + ' href="#"><span>@</span></a>', e.isFunction(o.navigationFormatter) ? (i = o.navigationFormatter(r, e(this)), typeof i == "string" ? u.html(t.replace(/@/g, i)) : u = e("<li/>", i)) : u.html(t.replace(/@/g, r)), u.appendTo(s.$nav).addClass(n).data("index", r)
                    }), s.$nav.children("li").bind(o.clickControls, function (t) {
                        !s.flag && o.enableNavigation && (s.flag = !0, setTimeout(function () {
                            s.flag = !1
                        }, 100), s.gotoPage(e(this).data("index"))), t.preventDefault()
                    }), !! o.navigationSize && o.navigationSize < s.pages && (s.$controls.find(".anythingNavWindow").length || s.$nav.before('<ul><li class="prev"><a href="#"><span>' + o.backText + "</span></a></li></ul>").after('<ul><li class="next"><a href="#"><span>' + o.forwardText + "</span></a></li></ul>").wrap('<div class="anythingNavWindow"></div>'), s.navWidths = s.$nav.find("li").map(function () {
                        return e(this).outerWidth(!0) + Math.ceil(parseInt(e(this).find("span").css("left"), 10) / 2 || 0)
                    }).get(), s.navLeft = s.currentPage, s.$nav.width(s.navWidth(1, s.pages + 1) + 25), s.$controls.find(".anythingNavWindow").width(s.navWidth(1, o.navigationSize + 1)).end().find(".prev,.next").bind(o.clickControls, function (t) {
                        s.flag || (s.flag = !0, setTimeout(function () {
                            s.flag = !1
                        }, 200), s.navWindow(s.navLeft + o.navigationSize * (e(this).is(".prev") ? -1 : 1))), t.preventDefault()
                    }))
                }
            }, s.navWidth = function (e, t) {
                var n, r = Math.min(e, t),
                    i = Math.max(e, t),
                    o = 0;
                for (n = r; n < i; n++) o += s.navWidths[n - 1] || 0;
                return o
            }, s.navWindow = function (e) {
                if ( !! o.navigationSize && o.navigationSize < s.pages && s.navWidths) {
                    var t = s.pages - o.navigationSize + 1;
                    e = e <= 1 ? 1 : e > 1 && e < t ? e : t, e !== s.navLeft && (s.$controls.find(".anythingNavWindow").animate({
                        scrollLeft: s.navWidth(1, e),
                        width: s.navWidth(e, e + o.navigationSize)
                    }, {
                        queue: !1,
                        duration: o.animationTime
                    }), s.navLeft = e)
                }
            }, s.buildNextBackButtons = function () {
                s.$forward = e('<span class="arrow forward"><a href="#"><span>' + o.forwardText + "</span></a></span>"), s.$back = e('<span class="arrow back"><a href="#"><span>' + o.backText + "</span></a></span>"), s.$back.bind(o.clickBackArrow, function (e) {
                    o.enableArrows && !s.flag && (s.flag = !0, setTimeout(function () {
                        s.flag = !1
                    }, 100), s.goBack()), e.preventDefault()
                }), s.$forward.bind(o.clickForwardArrow, function (e) {
                    o.enableArrows && !s.flag && (s.flag = !0, setTimeout(function () {
                        s.flag = !1
                    }, 100), s.goForward()), e.preventDefault()
                }), s.$back.add(s.$forward).find("a").bind("focusin focusout", function () {
                    e(this).toggleClass("hover")
                }), s.$back.appendTo(o.appendBackTo && e(o.appendBackTo).length ? e(o.appendBackTo) : s.$wrapper), s.$forward.appendTo(o.appendForwardTo && e(o.appendForwardTo).length ? e(o.appendForwardTo) : s.$wrapper), s.arrowWidth = s.$forward.width(), s.arrowRight = parseInt(s.$forward.css("right"), 10), s.arrowLeft = parseInt(s.$back.css("left"), 10)
            }, s.buildAutoPlay = function () {
                s.$startStop.html("<span>" + (s.playing ? o.stopText : o.startText) + "</span>").bind(o.clickSlideshow, function (e) {
                    o.enableStartStop && (s.startStop(!s.playing), s.makeActive(), s.playing && !o.autoPlayDelayed && s.goForward(!0, o.playRtl)), e.preventDefault()
                }).bind("focusin focusout", function () {
                        e(this).toggleClass("hover")
                    })
            }, s.checkResize = function (e) {
                var t = !! (n.hidden || n.webkitHidden || n.mozHidden || n.msHidden);
                clearTimeout(s.resizeTimer), s.resizeTimer = setTimeout(function () {
                    var n = s.$outer.width(),
                        r = s.$outer[0].tagName === "BODY" ? s.$win.height() : s.$outer.height();
                    !t && (s.lastDim[0] !== n || s.lastDim[1] !== r) && (s.setDimensions(), s.$el.trigger("slideshow_resized", s), s.gotoPage(s.currentPage, s.playing, null, -1)), typeof e == "undefined" && s.checkResize()
                }, t ? 2e3 : 500)
            }, s.setDimensions = function () {
                s.$wrapper.find(".anythingWindow, .anythingBase, .panel")[e.fn.addBack ? "addBack" : "andSelf"]().css({
                    width: "",
                    height: ""
                }), s.width = s.$el.width(), s.height = s.$el.height(), s.outerPad = [s.$wrapper.innerWidth() - s.$wrapper.width(), s.$wrapper.innerHeight() - s.$wrapper.height()];
                var t, n, r, i, u = 0,
                    a = {
                        width: "100%",
                        height: "100%"
                    }, f = o.showMultiple > 1 && o.mode === "horizontal" ? s.width || s.$window.width() / o.showMultiple : s.$window.width(),
                    l = o.showMultiple > 1 && o.mode === "vertical" ? s.height / o.showMultiple || s.$window.height() / o.showMultiple : s.$window.height();
                o.expand && (s.lastDim = [s.$outer.width(), s.$outer.height()], t = s.lastDim[0] - s.outerPad[0], n = s.lastDim[1] - s.outerPad[1], s.$wrapper.add(s.$window).css({
                    width: t,
                    height: n
                }), s.height = n = o.showMultiple > 1 && o.mode === "vertical" ? l : n, s.width = f = o.showMultiple > 1 && o.mode === "horizontal" ? t / o.showMultiple : t, s.$items.css({
                    width: f,
                    height: l
                })), s.$items.each(function (l) {
                    i = e(this), r = i.children(), o.resizeContents ? (t = s.width, n = s.height, i.css({
                        width: t,
                        height: n
                    }), r.length && (r[0].tagName === "EMBED" && r.attr(a), r[0].tagName === "OBJECT" && r.find("embed").attr(a), r.length === 1 && r.css(a))) : (o.mode === "vertical" ? (t = i.css("display", "inline-block").width(), i.css("display", "")) : t = i.width() || s.width, r.length === 1 && t >= f && (t = r.width() >= f ? f : r.width(), r.css("max-width", t)), i.css({
                        width: t,
                        height: ""
                    }), n = r.length === 1 ? r.outerHeight(!0) : i.height(), n <= s.outerPad[1] && (n = s.height), i.css("height", n)), s.panelSize[l] = [t, n, u], u += o.mode === "vertical" ? n : t
                }), s.$el.css(o.mode === "vertical" ? "height" : "width", o.mode === "fade" ? s.width : u)
            }, s.getDim = function (e) {
                var t, n, r = s.width,
                    i = s.height;
                if (s.pages < 1 || isNaN(e)) return [r, i];
                e = o.infiniteSlides && s.pages > 1 ? e : e - 1, n = s.panelSize[e], n && (r = n[0] || r, i = n[1] || i);
                if (o.showMultiple > 1)
                    for (n = 1; n < o.showMultiple; n++) t = e + n, o.mode === "vertical" ? (r = Math.max(r, s.panelSize[t][0]), i += s.panelSize[t][1]) : (r += s.panelSize[t][0], i = Math.max(i, s.panelSize[t][1]));
                return [r, i]
            }, s.goForward = function (e, t) {
                s.gotoPage(s[o.allowRapidChange ? "targetPage" : "currentPage"] + o.changeBy * (t ? -1 : 1), e)
            }, s.goBack = function (e) {
                s.gotoPage(s[o.allowRapidChange ? "targetPage" : "currentPage"] - o.changeBy, e)
            }, s.gotoPage = function (t, n, r, i) {
                n !== !0 && (n = !1, s.startStop(!1), s.makeActive()), /^[#|.]/.test(t) && e(t).length && (t = e(t).closest(".panel").index() + s.adj);
                if (o.changeBy !== 1) {
                    var u = s.pages - s.adjustMultiple;
                    t < 1 && (t = o.stopAtEnd ? 1 : o.infiniteSlides ? s.pages + t : o.showMultiple > 1 - t ? 1 : u), t > s.pages ? t = o.stopAtEnd ? s.pages : o.showMultiple > 1 - t ? 1 : t -= u : t >= u && (t = u)
                }
                if (s.pages <= 1) return;
                s.$lastPage = s.$currentPage, typeof t != "number" && (t = parseInt(t, 10) || o.startPanel, s.setCurrentPage(t));
                if (n && o.isVideoPlaying(s)) return;
                o.stopAtEnd && !o.infiniteSlides && t > s.pages - o.showMultiple && (t = s.pages - o.showMultiple + 1), s.exactPage = t, t > s.pages + 1 - s.adj && (t = !o.infiniteSlides && !o.stopAtEnd ? 1 : s.pages), t < s.adj && (t = !o.infiniteSlides && !o.stopAtEnd ? s.pages : 1), o.infiniteSlides || (s.exactPage = t), s.currentPage = t > s.pages ? s.pages : t < 1 ? 1 : s.currentPage, s.$currentPage = s.$items.eq(s.currentPage - s.adj), s.targetPage = t === 0 ? s.pages : t > s.pages ? 1 : t, s.$targetPage = s.$items.eq(s.targetPage - s.adj), i = typeof i != "undefined" ? i : o.animationTime, i >= 0 && s.$el.trigger("slide_init", s), i > 0 && s.slideControls(!0), o.buildNavigation && s.setNavigation(s.targetPage), n !== !0 && (n = !1), (!n || o.stopAtEnd && t === s.pages) && s.startStop(!1), i >= 0 && s.$el.trigger("slide_begin", s), setTimeout(function (e) {
                    var n, u, a = !0;
                    o.allowRapidChange && s.$wrapper.add(s.$el).add(s.$items).stop(!0, !0), o.resizeContents || (u = s.getDim(t), e = {}, s.$wrapper.width() !== u[0] && (e.width = u[0] || s.width, a = !1), s.$wrapper.height() !== u[1] && (e.height = u[1] || s.height, a = !1), a || s.$wrapper.filter(":not(:animated)").animate(e, {
                        queue: !1,
                        duration: i < 0 ? 0 : i,
                        easing: o.easing
                    })), o.mode === "fade" ? s.$lastPage[0] !== s.$targetPage[0] ? (s.fadeIt(s.$lastPage, 0, i), s.fadeIt(s.$targetPage, 1, i, function () {
                        s.endAnimation(t, r, i)
                    })) : s.endAnimation(t, r, i) : (e = {}, e[s.dir] = -s.panelSize[o.infiniteSlides && s.pages > 1 ? t : t - 1][2], o.mode === "vertical" && !o.resizeContents && (e.width = u[0]), s.$el.filter(":not(:animated)").animate(e, {
                        queue: !1,
                        duration: i < 0 ? 0 : i,
                        easing: o.easing,
                        complete: function () {
                            s.endAnimation(t, r, i)
                        }
                    }))
                }, parseInt(o.delayBeforeAnimate, 10) || 0)
            }, s.endAnimation = function (e, t, n) {
                e === 0 ? (s.$el.css(s.dir, o.mode === "fade" ? 0 : -s.panelSize[s.pages][2]), e = s.pages) : e > s.pages && (s.$el.css(s.dir, o.mode === "fade" ? 0 : -s.panelSize[1][2]), e = 1), s.exactPage = e, s.setCurrentPage(e, !1), o.mode === "fade" && s.fadeIt(s.$items.not(":eq(" + (e - s.adj) + ")"), 0, 0), s.hovered || s.slideControls(!1), o.hashTags && s.setHash(e), n >= 0 && s.$el.trigger("slide_complete", s), typeof t == "function" && t(s), o.autoPlayLocked && !s.playing && setTimeout(function () {
                    s.startStop(!0)
                }, o.resumeDelay - (o.autoPlayDelayed ? o.delay : 0))
            }, s.fadeIt = function (e, t, n, r) {
                var i = n < 0 ? 0 : n;
                o.resumeOnVisible ? e.filter(":not(:animated)").fadeTo(i, t, r) : e.filter(":not(:animated)")[t === 0 ? "fadeOut" : "fadeIn"](i, r)
            }, s.setCurrentPage = function (e, t) {
                e = parseInt(e, 10);
                if (s.pages < 1 || e === 0 || isNaN(e)) return;
                e > s.pages + 1 - s.adj && (e = s.pages - s.adj), e < s.adj && (e = 1), o.buildArrows && !o.infiniteSlides && o.stopAtEnd && (s.$forward[e === s.pages - s.adjustMultiple ? "addClass" : "removeClass"]("disabled"), s.$back[e === 1 ? "addClass" : "removeClass"]("disabled"), e === s.pages && s.playing && s.startStop());
                if (!t) {
                    var n = s.getDim(e);
                    s.$wrapper.css({
                        width: n[0],
                        height: n[1]
                    }).add(s.$window).scrollLeft(0).scrollTop(0), s.$el.css(s.dir, o.mode === "fade" ? 0 : -s.panelSize[o.infiniteSlides && s.pages > 1 ? e : e - 1][2])
                }
                s.currentPage = e, s.$currentPage = s.$items.removeClass("activePage").eq(e - s.adj).addClass("activePage"), o.buildNavigation && s.setNavigation(e)
            }, s.setNavigation = function (e) {
                s.$nav.find(".cur").removeClass("cur").end().find("a").eq(e - 1).addClass("cur")
            }, s.makeActive = function () {
                s.$wrapper.hasClass("activeSlider") || (e(".activeSlider").removeClass("activeSlider"), s.$wrapper.addClass("activeSlider"))
            }, s.gotoHash = function () {
                var n = t.location.hash,
                    r = n.indexOf("&"),
                    i = n.match(s.regex);
                return i === null && !/^#&/.test(n) && !/#!?\//.test(n) && !/\=/.test(n) ? (n = n.substring(0, r >= 0 ? r : n.length), i = e(n).length && e(n).closest(".anythingBase")[0] === s.el ? s.$items.index(e(n).closest(".panel")) + s.adj : null) : i !== null && (i = o.hashTags ? parseInt(i[1], 10) : null), i
            }, s.setHash = function (e) {
                var n = "panel" + s.runTimes + "-",
                    r = t.location.hash;
                typeof r != "undefined" && (t.location.hash = r.indexOf(n) > 0 ? r.replace(s.regex, n + e) : r + "&" + n + e)
            }, s.slideControls = function (e) {
                var t = e ? "slideDown" : "slideUp",
                    n = e ? 0 : o.animationTime,
                    r = e ? o.animationTime : 0,
                    i = e ? 1 : 0,
                    u = e ? 0 : 1;
                o.toggleControls && s.$controls.stop(!0, !0).delay(n)[t](o.animationTime / 2).delay(r), o.buildArrows && o.toggleArrows && (!s.hovered && s.playing && (u = 1, i = 0), s.$forward.stop(!0, !0).delay(n).animate({
                    right: s.arrowRight + u * s.arrowWidth,
                    opacity: i
                }, o.animationTime / 2), s.$back.stop(!0, !0).delay(n).animate({
                    left: s.arrowLeft + u * s.arrowWidth,
                    opacity: i
                }, o.animationTime / 2))
            }, s.clearTimer = function (e) {
                s.timer && (t.clearInterval(s.timer), !e && s.slideshow && (s.$el.trigger("slideshow_stop", s), s.slideshow = !1))
            }, s.startStop = function (e, r) {
                e !== !0 && (e = !1), s.playing = e, e && !r && (s.$el.trigger("slideshow_start", s), s.slideshow = !0), o.buildStartStop && (s.$startStop.toggleClass("playing", e).find("span").html(e ? o.stopText : o.startText), s.$startStop.find("span").css("visibility") === "hidden" && s.$startStop.addClass(o.tooltipClass).attr("title", e ? o.stopText : o.startText)), e ? (s.clearTimer(!0), s.timer = t.setInterval(function () {
                    n.hidden || n.webkitHidden || n.mozHidden || n.msHidden ? o.autoPlayLocked || s.startStop() : o.isVideoPlaying(s) ? o.resumeOnVideoEnd || s.startStop() : s.goForward(!0, o.playRtl)
                }, o.delay)) : s.clearTimer()
            }, s.init()
        }, e.anythingSlider.defaults = {
            theme: "default",
            mode: "horiz",
            expand: !1,
            resizeContents: !0,
            showMultiple: !1,
            easing: "swing",
            buildArrows: !0,
            buildNavigation: !0,
            buildStartStop: !0,
            toggleArrows: !1,
            toggleControls: !1,
            startText: "Start",
            stopText: "Stop",
            forwardText: "&raquo;",
            backText: "&laquo;",
            tooltipClass: "tooltip",
            enableArrows: !0,
            enableNavigation: !0,
            enableStartStop: !0,
            enableKeyboard: !0,
            startPanel: 1,
            changeBy: 1,
            hashTags: !0,
            infiniteSlides: !0,
            navigationFormatter: null,
            navigationSize: !1,
            autoPlay: !1,
            autoPlayLocked: !1,
            autoPlayDelayed: !1,
            pauseOnHover: !0,
            stopAtEnd: !1,
            playRtl: !1,
            delay: 3e3,
            resumeDelay: 15e3,
            animationTime: 600,
            delayBeforeAnimate: 0,
            clickForwardArrow: "click",
            clickBackArrow: "click",
            clickControls: "click focusin",
            clickSlideshow: "click",
            allowRapidChange: !1,
            resumeOnVideoEnd: !0,
            resumeOnVisible: !0,
            isVideoPlaying: function (e) {
                return !1
            }
        }, e.fn.anythingSlider = function (t, n) {
            return this.each(function () {
                var r, i = e(this).data("AnythingSlider");
                (typeof t).match("object|undefined") ? i ? i.updateSlider() : new e.anythingSlider(this, t) : /\d/.test(t) && !isNaN(t) && i ? (r = typeof t == "number" ? t : parseInt(e.trim(t), 10), r >= 1 && r <= i.pages && i.gotoPage(r, !1, n)) : /^[#|.]/.test(t) && e(t).length && i.gotoPage(t, !1, n)
            })
        }
    }(jQuery, window, document), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (e, t, n, r, i) {
        return jQuery.easing[jQuery.easing.def](e, t, n, r, i)
    },
    easeInQuad: function (e, t, n, r, i) {
        return r * (t /= i) * t + n
    },
    easeOutQuad: function (e, t, n, r, i) {
        return -r * (t /= i) * (t - 2) + n
    },
    easeInOutQuad: function (e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t + n : -r / 2 * (--t * (t - 2) - 1) + n
    },
    easeInCubic: function (e, t, n, r, i) {
        return r * (t /= i) * t * t + n
    },
    easeOutCubic: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t + 1) + n
    },
    easeInOutCubic: function (e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t + n : r / 2 * ((t -= 2) * t * t + 2) + n
    },
    easeInQuart: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t + n
    },
    easeOutQuart: function (e, t, n, r, i) {
        return -r * ((t = t / i - 1) * t * t * t - 1) + n
    },
    easeInOutQuart: function (e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t * t + n : -r / 2 * ((t -= 2) * t * t * t - 2) + n
    },
    easeInQuint: function (e, t, n, r, i) {
        return r * (t /= i) * t * t * t * t + n
    },
    easeOutQuint: function (e, t, n, r, i) {
        return r * ((t = t / i - 1) * t * t * t * t + 1) + n
    },
    easeInOutQuint: function (e, t, n, r, i) {
        return (t /= i / 2) < 1 ? r / 2 * t * t * t * t * t + n : r / 2 * ((t -= 2) * t * t * t * t + 2) + n
    },
    easeInSine: function (e, t, n, r, i) {
        return -r * Math.cos(t / i * (Math.PI / 2)) + r + n
    },
    easeOutSine: function (e, t, n, r, i) {
        return r * Math.sin(t / i * (Math.PI / 2)) + n
    },
    easeInOutSine: function (e, t, n, r, i) {
        return -r / 2 * (Math.cos(Math.PI * t / i) - 1) + n
    },
    easeInExpo: function (e, t, n, r, i) {
        return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n
    },
    easeOutExpo: function (e, t, n, r, i) {
        return t == i ? n + r : r * (-Math.pow(2, -10 * t / i) + 1) + n
    },
    easeInOutExpo: function (e, t, n, r, i) {
        return t == 0 ? n : t == i ? n + r : (t /= i / 2) < 1 ? r / 2 * Math.pow(2, 10 * (t - 1)) + n : r / 2 * (-Math.pow(2, -10 * --t) + 2) + n
    },
    easeInCirc: function (e, t, n, r, i) {
        return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n
    },
    easeOutCirc: function (e, t, n, r, i) {
        return r * Math.sqrt(1 - (t = t / i - 1) * t) + n
    },
    easeInOutCirc: function (e, t, n, r, i) {
        return (t /= i / 2) < 1 ? -r / 2 * (Math.sqrt(1 - t * t) - 1) + n : r / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + n
    },
    easeInElastic: function (e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        o || (o = i * .3);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return -(u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o)) + n
    },
    easeOutElastic: function (e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i) == 1) return n + r;
        o || (o = i * .3);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return u * Math.pow(2, -10 * t) * Math.sin((t * i - s) * 2 * Math.PI / o) + r + n
    },
    easeInOutElastic: function (e, t, n, r, i) {
        var s = 1.70158,
            o = 0,
            u = r;
        if (t == 0) return n;
        if ((t /= i / 2) == 2) return n + r;
        o || (o = i * .3 * 1.5);
        if (u < Math.abs(r)) {
            u = r;
            var s = o / 4
        } else var s = o / (2 * Math.PI) * Math.asin(r / u);
        return t < 1 ? -0.5 * u * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) + n : u * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * i - s) * 2 * Math.PI / o) * .5 + r + n
    },
    easeInBack: function (e, t, n, r, i, s) {
        return s == undefined && (s = 1.70158), r * (t /= i) * t * ((s + 1) * t - s) + n
    },
    easeOutBack: function (e, t, n, r, i, s) {
        return s == undefined && (s = 1.70158), r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n
    },
    easeInOutBack: function (e, t, n, r, i, s) {
        return s == undefined && (s = 1.70158), (t /= i / 2) < 1 ? r / 2 * t * t * (((s *= 1.525) + 1) * t - s) + n : r / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n
    },
    easeInBounce: function (e, t, n, r, i) {
        return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n
    },
    easeOutBounce: function (e, t, n, r, i) {
        return (t /= i) < 1 / 2.75 ? r * 7.5625 * t * t + n : t < 2 / 2.75 ? r * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + n : t < 2.5 / 2.75 ? r * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + n : r * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + n
    },
    easeInOutBounce: function (e, t, n, r, i) {
        return t < i / 2 ? jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * .5 + n : jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * .5 + r * .5 + n
    }
}),
    function (e) {
        var t = {
            init: function (n) {
                return this.each(function () {
                    t.destroy.call(this), this.opt = e.extend(!0, {}, e.fn.raty.defaults, n);
                    var r = e(this),
                        i = ["number", "readOnly", "score", "scoreName"];
                    t._callback.call(this, i), this.opt.precision && t._adjustPrecision.call(this), this.opt.number = t._between(this.opt.number, 0, this.opt.numberMax), this.opt.path = this.opt.path || "", this.opt.path && this.opt.path.slice(this.opt.path.length - 1, this.opt.path.length) !== "/" && (this.opt.path += "/"), this.stars = t._createStars.call(this), this.score = t._createScore.call(this), t._apply.call(this, this.opt.score);
                    var s = this.opt.space ? 4 : 0,
                        o = this.opt.width || this.opt.number * this.opt.size + this.opt.number * s;
                    this.opt.cancel && (this.cancel = t._createCancel.call(this), o += this.opt.size + s), this.opt.readOnly ? t._lock.call(this) : (r.css("cursor", "pointer"), t._binds.call(this)), this.opt.width !== !1 && r.css("width", o), t._target.call(this, this.opt.score), r.data({
                        settings: this.opt,
                        raty: !0
                    })
                })
            },
            _adjustPrecision: function () {
                this.opt.targetType = "score", this.opt.half = !0
            },
            _apply: function (e) {
                e && e > 0 && (e = t._between(e, 0, this.opt.number), this.score.val(e)), t._fill.call(this, e), e && t._roundStars.call(this, e)
            },
            _between: function (e, t, n) {
                return Math.min(Math.max(parseFloat(e), t), n)
            },
            _binds: function () {
                this.cancel && t._bindCancel.call(this), t._bindClick.call(this), t._bindOut.call(this), t._bindOver.call(this)
            },
            _bindCancel: function () {
                t._bindClickCancel.call(this), t._bindOutCancel.call(this), t._bindOverCancel.call(this)
            },
            _bindClick: function () {
                var t = this,
                    n = e(t);
                t.stars.on("click.raty", function (e) {
                    t.score.val(t.opt.half || t.opt.precision ? n.data("score") : this.alt), t.opt.click && t.opt.click.call(t, parseFloat(t.score.val()), e)
                })
            },
            _bindClickCancel: function () {
                var e = this;
                e.cancel.on("click.raty", function (t) {
                    e.score.removeAttr("value"), e.opt.click && e.opt.click.call(e, null, t)
                })
            },
            _bindOut: function () {
                var n = this;
                e(this).on("mouseleave.raty", function (e) {
                    var r = parseFloat(n.score.val()) || undefined;
                    t._apply.call(n, r), t._target.call(n, r, e), n.opt.mouseout && n.opt.mouseout.call(n, r, e)
                })
            },
            _bindOutCancel: function () {
                var t = this;
                t.cancel.on("mouseleave.raty", function (n) {
                    e(this).attr("src", t.opt.path + t.opt.cancelOff), t.opt.mouseout && t.opt.mouseout.call(t, t.score.val() || null, n)
                })
            },
            _bindOverCancel: function () {
                var n = this;
                n.cancel.on("mouseover.raty", function (r) {
                    e(this).attr("src", n.opt.path + n.opt.cancelOn), n.stars.attr("src", n.opt.path + n.opt.starOff), t._target.call(n, null, r), n.opt.mouseover && n.opt.mouseover.call(n, null)
                })
            },
            _bindOver: function () {
                var n = this,
                    r = e(n),
                    i = n.opt.half ? "mousemove.raty" : "mouseover.raty";
                n.stars.on(i, function (i) {
                    var s = parseInt(this.alt, 10);
                    if (n.opt.half) {
                        var o = parseFloat((i.pageX - e(this).offset().left) / n.opt.size),
                            u = o > .5 ? 1 : .5;
                        s = s - 1 + u, t._fill.call(n, s), n.opt.precision && (s = s - u + o), t._roundStars.call(n, s), r.data("score", s)
                    } else t._fill.call(n, s);
                    t._target.call(n, s, i), n.opt.mouseover && n.opt.mouseover.call(n, s, i)
                })
            },
            _callback: function (e) {
                for (i in e) typeof this.opt[e[i]] == "function" && (this.opt[e[i]] = this.opt[e[i]].call(this))
            },
            _createCancel: function () {
                var t = e(this),
                    n = this.opt.path + this.opt.cancelOff,
                    r = e("<img />", {
                        src: n,
                        alt: "x",
                        title: this.opt.cancelHint,
                        "class": "raty-cancel"
                    });
                return this.opt.cancelPlace == "left" ? t.prepend("&#160;").prepend(r) : t.append("&#160;").append(r), r
            },
            _createScore: function () {
                return e("<input />", {
                    type: "hidden",
                    name: this.opt.scoreName
                }).appendTo(this)
            },
            _createStars: function () {
                var n = e(this);
                for (var r = 1; r <= this.opt.number; r++) {
                    var i = t._getHint.call(this, r),
                        s = this.opt.score && this.opt.score >= r ? "starOn" : "starOff";
                    s = this.opt.path + this.opt[s], e("<img />", {
                        src: s,
                        alt: r,
                        title: i
                    }).appendTo(this), this.opt.space && n.append(r < this.opt.number ? "&#160;" : "")
                }
                return n.children("img")
            },
            _error: function (t) {
                e(this).html(t), e.error(t)
            },
            _fill: function (e) {
                var t = this,
                    n = 0;
                for (var r = 1; r <= t.stars.length; r++) {
                    var i = t.stars.eq(r - 1),
                        s = t.opt.single ? r == e : r <= e;
                    if (t.opt.iconRange && t.opt.iconRange.length > n) {
                        var o = t.opt.iconRange[n],
                            u = o.on || t.opt.starOn,
                            a = o.off || t.opt.starOff,
                            f = s ? u : a;
                        r <= o.range && i.attr("src", t.opt.path + f), r == o.range && n++
                    } else {
                        var f = s ? "starOn" : "starOff";
                        i.attr("src", this.opt.path + this.opt[f])
                    }
                }
            },
            _getHint: function (e) {
                var t = this.opt.hints[e - 1];
                return t === "" ? "" : t || e
            },
            _lock: function () {
                var n = parseInt(this.score.val(), 10),
                    r = n ? t._getHint.call(this, n) : this.opt.noRatedMsg;
                e(this).data("readonly", !0).css("cursor", "").attr("title", r), this.score.attr("readonly", "readonly"), this.stars.attr("title", r), this.cancel && this.cancel.hide()
            },
            _roundStars: function (e) {
                var t = (e - Math.floor(e)).toFixed(2);
                if (t > this.opt.round.down) {
                    var n = "starOn";
                    this.opt.halfShow && t < this.opt.round.up ? n = "starHalf" : t < this.opt.round.full && (n = "starOff"), this.stars.eq(Math.ceil(e) - 1).attr("src", this.opt.path + this.opt[n])
                }
            },
            _target: function (n, r) {
                if (this.opt.target) {
                    var i = e(this.opt.target);
                    i.length === 0 && t._error.call(this, "Target selector invalid or missing!"), this.opt.targetFormat.indexOf("{score}") < 0 && t._error.call(this, 'Template "{score}" missing!');
                    var s = r && r.type == "mouseover";
                    n === undefined ? n = this.opt.targetText : n === null ? n = s ? this.opt.cancelHint : this.opt.targetText : (this.opt.targetType == "hint" ? n = t._getHint.call(this, Math.ceil(n)) : this.opt.precision && (n = parseFloat(n).toFixed(1)), !s && !this.opt.targetKeep && (n = this.opt.targetText)), n && (n = this.opt.targetFormat.toString().replace("{score}", n)), i.is(":input") ? i.val(n) : i.html(n)
                }
            },
            _unlock: function () {
                e(this).data("readonly", !1).css("cursor", "pointer").removeAttr("title"), this.score.removeAttr("readonly", "readonly");
                for (var n = 0; n < this.opt.number; n++) this.stars.eq(n).attr("title", t._getHint.call(this, n + 1));
                this.cancel && this.cancel.css("display", "")
            },
            cancel: function (n) {
                return this.each(function () {
                    e(this).data("readonly") !== !0 && (t[n ? "click" : "score"].call(this, null), this.score.removeAttr("value"))
                })
            },
            click: function (n) {
                return e(this).each(function () {
                    e(this).data("readonly") !== !0 && (t._apply.call(this, n), this.opt.click || t._error.call(this, 'You must add the "click: function(score, evt) { }" callback.'), this.opt.click.call(this, n, {
                        type: "click"
                    }), t._target.call(this, n))
                })
            },
            destroy: function () {
                return e(this).each(function () {
                    var t = e(this),
                        n = t.data("raw");
                    n ? t.off(".raty").empty().css({
                        cursor: n.style.cursor,
                        width: n.style.width
                    }).removeData("readonly") : t.data("raw", t.clone()[0])
                })
            },
            getScore: function () {
                var t = [],
                    n;
                return e(this).each(function () {
                    n = this.score.val(), t.push(n ? parseFloat(n) : undefined)
                }), t.length > 1 ? t : t[0]
            },
            readOnly: function (n) {
                return this.each(function () {
                    var r = e(this);
                    r.data("readonly") !== n && (n ? (r.off(".raty").children("img").off(".raty"), t._lock.call(this)) : (t._binds.call(this), t._unlock.call(this)), r.data("readonly", n))
                })
            },
            reload: function () {
                return t.set.call(this, {})
            },
            score: function () {
                return arguments.length ? t.setScore.apply(this, arguments) : t.getScore.call(this)
            },
            set: function (t) {
                return this.each(function () {
                    var n = e(this),
                        r = n.data("settings"),
                        i = e.extend({}, r, t);
                    n.raty(i)
                })
            },
            setScore: function (n) {
                return e(this).each(function () {
                    e(this).data("readonly") !== !0 && (t._apply.call(this, n), t._target.call(this, n))
                })
            }
        };
        e.fn.raty = function (n) {
            if (t[n]) return t[n].apply(this, Array.prototype.slice.call(arguments, 1));
            if (typeof n == "object" || !n) return t.init.apply(this, arguments);
            e.error("Method " + n + " does not exist!")
        }, e.fn.raty.defaults = {
            cancel: !1,
            cancelHint: "Cancel this rating!",
            cancelOff: "cancel-off.png",
            cancelOn: "cancel-on.png",
            cancelPlace: "left",
            click: undefined,
            half: !1,
            halfShow: !0,
            hints: ["bad", "poor", "regular", "good", "gorgeous"],
            iconRange: undefined,
            mouseout: undefined,
            mouseover: undefined,
            noRatedMsg: "Not rated yet!",
            number: 5,
            numberMax: 20,
            path: "",
            precision: !1,
            readOnly: !1,
            round: {
                down: .25,
                full: .6,
                up: .76
            },
            score: undefined,
            scoreName: "score",
            single: !1,
            size: 16,
            space: !0,
            starHalf: "star-half.png",
            starOff: "star-off.png",
            starOn: "star-on.png",
            target: undefined,
            targetFormat: "{score}",
            targetKeep: !1,
            targetText: "",
            targetType: "hint",
            width: undefined
        }
    }(jQuery),
    function (e) {
        jQuery.fn.widowFix = function (t) {
            var n = {
                letterLimit: null,
                prevLimit: null,
                linkFix: !1,
                dashes: !1
            }, r = e.extend(n, t);
            if (this.length) return this.each(function () {
                function f() {
                    u === "" && (u = o.pop(), f())
                }
                var t = e(this),
                    n;
                if (r.linkFix) {
                    var i = t.find("a:last");
                    i.wrap("<var>");
                    var s = e("var").html();
                    n = i.contents()[0], i.contents().unwrap()
                }
                var o = e(this).html().split(" "),
                    u = o.pop();
                if (o.length <= 1) return;
                f();
                if (r.dashes) {
                    var l = ["-", "â€“", "â€”"];
                    e.each(l, function (e, t) {
                        if (u.indexOf(t) > 0) return u = '<span style="white-space:nowrap;">' + u + "</span>", !1
                    })
                }
                var c = o[o.length - 1];
                if (r.linkFix) {
                    if (r.letterLimit !== null && n.length >= r.letterLimit) {
                        t.find("var").each(function () {
                            e(this).contents().replaceWith(s), e(this).contents().unwrap()
                        });
                        return
                    }
                    if (r.prevLimit !== null && c.length >= r.prevLimit) {
                        t.find("var").each(function () {
                            e(this).contents().replaceWith(s), e(this).contents().unwrap()
                        });
                        return
                    }
                } else {
                    if (r.letterLimit !== null && u.length >= r.letterLimit) return;
                    if (r.prevLimit !== null && c.length >= r.prevLimit) return
                }
                var h = o.join(" ") + "&nbsp;" + u;
                t.html(h), r.linkFix && t.find("var").each(function () {
                    e(this).contents().replaceWith(s), e(this).contents().unwrap()
                })
            })
        }
    }(jQuery);
var MobileEsp = {
    initCompleted: !1,
    isWebkit: !1,
    isMobilePhone: !1,
    isIphone: !1,
    isAndroid: !1,
    isAndroidPhone: !1,
    isTierTablet: !1,
    isTierIphone: !1,
    isTierRichCss: !1,
    isTierGenericMobile: !1,
    engineWebKit: "webkit",
    deviceIphone: "iphone",
    deviceIpod: "ipod",
    deviceIpad: "ipad",
    deviceMacPpc: "macintosh",
    deviceAndroid: "android",
    deviceGoogleTV: "googletv",
    deviceHtcFlyer: "htc_flyer",
    deviceWinPhone7: "windows phone os 7",
    deviceWinPhone8: "windows phone 8",
    deviceWinMob: "windows ce",
    deviceWindows: "windows",
    deviceIeMob: "iemobile",
    devicePpc: "ppc",
    enginePie: "wm5 pie",
    deviceBB: "blackberry",
    deviceBB10: "bb10",
    vndRIM: "vnd.rim",
    deviceBBStorm: "blackberry95",
    deviceBBBold: "blackberry97",
    deviceBBBoldTouch: "blackberry 99",
    deviceBBTour: "blackberry96",
    deviceBBCurve: "blackberry89",
    deviceBBCurveTouch: "blackberry 938",
    deviceBBTorch: "blackberry 98",
    deviceBBPlaybook: "playbook",
    deviceSymbian: "symbian",
    deviceSymbos: "symbos",
    deviceS60: "series60",
    deviceS70: "series70",
    deviceS80: "series80",
    deviceS90: "series90",
    devicePalm: "palm",
    deviceWebOS: "webos",
    deviceWebOShp: "hpwos",
    engineBlazer: "blazer",
    engineXiino: "xiino",
    deviceNuvifone: "nuvifone",
    deviceBada: "bada",
    deviceTizen: "tizen",
    deviceMeego: "meego",
    deviceKindle: "kindle",
    engineSilk: "silk-accelerated",
    vndwap: "vnd.wap",
    wml: "wml",
    deviceTablet: "tablet",
    deviceBrew: "brew",
    deviceDanger: "danger",
    deviceHiptop: "hiptop",
    devicePlaystation: "playstation",
    devicePlaystationVita: "vita",
    deviceNintendoDs: "nitro",
    deviceNintendo: "nintendo",
    deviceWii: "wii",
    deviceXbox: "xbox",
    deviceArchos: "archos",
    engineOpera: "opera",
    engineNetfront: "netfront",
    engineUpBrowser: "up.browser",
    engineOpenWeb: "openweb",
    deviceMidp: "midp",
    uplink: "up.link",
    engineTelecaQ: "teleca q",
    engineObigo: "obigo",
    devicePda: "pda",
    mini: "mini",
    mobile: "mobile",
    mobi: "mobi",
    maemo: "maemo",
    linux: "linux",
    mylocom2: "sony/com",
    manuSonyEricsson: "sonyericsson",
    manuericsson: "ericsson",
    manuSamsung1: "sec-sgh",
    manuSony: "sony",
    manuHtc: "htc",
    svcDocomo: "docomo",
    svcKddi: "kddi",
    svcVodafone: "vodafone",
    disUpdate: "update",
    uagent: "",
    InitDeviceScan: function () {
        this.initCompleted = !1, navigator && navigator.userAgent && (this.uagent = navigator.userAgent.toLowerCase()), this.isWebkit = this.DetectWebkit(), this.isIphone = this.DetectIphone(), this.isAndroid = this.DetectAndroid(), this.isAndroidPhone = this.DetectAndroidPhone(), this.isMobilePhone = this.DetectMobileQuick(), this.isTierIphone = this.DetectTierIphone(), this.isTierTablet = this.DetectTierTablet(), this.isTierRichCss = this.DetectTierRichCss(), this.isTierGenericMobile = this.DetectTierOtherPhones(), this.initCompleted = !0
    },
    DetectIphone: function () {
        return this.initCompleted || this.isIphone ? this.isIphone : this.uagent.search(this.deviceIphone) > -1 ? this.DetectIpad() || this.DetectIpod() ? !1 : !0 : !1
    },
    DetectIpod: function () {
        return this.uagent.search(this.deviceIpod) > -1 ? !0 : !1
    },
    DetectIphoneOrIpod: function () {
        return this.DetectIphone() || this.DetectIpod() ? !0 : !1
    },
    DetectIpad: function () {
        return this.uagent.search(this.deviceIpad) > -1 && this.DetectWebkit() ? !0 : !1
    },
    DetectIos: function () {
        return this.DetectIphoneOrIpod() || this.DetectIpad() ? !0 : !1
    },
    DetectAndroid: function () {
        return this.initCompleted || this.isAndroid ? this.isAndroid : this.uagent.search(this.deviceAndroid) > -1 || this.DetectGoogleTV() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },
    DetectAndroidPhone: function () {
        return this.initCompleted || this.isAndroidPhone ? this.isAndroidPhone : this.DetectAndroid() && this.uagent.search(this.mobile) > -1 ? !0 : this.DetectOperaAndroidPhone() ? !0 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !0 : !1
    },
    DetectAndroidTablet: function () {
        return this.DetectAndroid() ? this.DetectOperaMobile() ? !1 : this.uagent.search(this.deviceHtcFlyer) > -1 ? !1 : this.uagent.search(this.mobile) > -1 ? !1 : !0 : !1
    },
    DetectAndroidWebKit: function () {
        return this.DetectAndroid() && this.DetectWebkit() ? !0 : !1
    },
    DetectGoogleTV: function () {
        return this.uagent.search(this.deviceGoogleTV) > -1 ? !0 : !1
    },
    DetectWebkit: function () {
        return this.initCompleted || this.isWebkit ? this.isWebkit : this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },
    DetectWindowsPhone: function () {
        return this.DetectWindowsPhone7() || this.DetectWindowsPhone8() ? !0 : !1
    },
    DetectWindowsPhone7: function () {
        return this.uagent.search(this.deviceWinPhone7) > -1 ? !0 : !1
    },
    DetectWindowsPhone8: function () {
        return this.uagent.search(this.deviceWinPhone8) > -1 ? !0 : !1
    },
    DetectWindowsMobile: function () {
        return this.DetectWindowsPhone() ? !1 : this.uagent.search(this.deviceWinMob) > -1 || this.uagent.search(this.deviceIeMob) > -1 || this.uagent.search(this.enginePie) > -1 ? !0 : this.uagent.search(this.devicePpc) > -1 && !(this.uagent.search(this.deviceMacPpc) > -1) ? !0 : this.uagent.search(this.manuHtc) > -1 && this.uagent.search(this.deviceWindows) > -1 ? !0 : !1
    },
    DetectBlackBerry: function () {
        return this.uagent.search(this.deviceBB) > -1 || this.uagent.search(this.vndRIM) > -1 ? !0 : this.DetectBlackBerry10Phone() ? !0 : !1
    },
    DetectBlackBerry10Phone: function () {
        return this.uagent.search(this.deviceBB10) > -1 && this.uagent.search(this.mobile) > -1 ? !0 : !1
    },
    DetectBlackBerryTablet: function () {
        return this.uagent.search(this.deviceBBPlaybook) > -1 ? !0 : !1
    },
    DetectBlackBerryWebKit: function () {
        return this.DetectBlackBerry() && this.uagent.search(this.engineWebKit) > -1 ? !0 : !1
    },
    DetectBlackBerryTouch: function () {
        return this.DetectBlackBerry() && (this.uagent.search(this.deviceBBStorm) > -1 || this.uagent.search(this.deviceBBTorch) > -1 || this.uagent.search(this.deviceBBBoldTouch) > -1 || this.uagent.search(this.deviceBBCurveTouch) > -1) ? !0 : !1
    },
    DetectBlackBerryHigh: function () {
        return this.DetectBlackBerryWebKit() ? !1 : this.DetectBlackBerry() && (this.DetectBlackBerryTouch() || this.uagent.search(this.deviceBBBold) > -1 || this.uagent.search(this.deviceBBTour) > -1 || this.uagent.search(this.deviceBBCurve) > -1) ? !0 : !1
    },
    DetectBlackBerryLow: function () {
        return this.DetectBlackBerry() ? this.DetectBlackBerryHigh() || this.DetectBlackBerryWebKit() ? !1 : !0 : !1
    },
    DetectS60OssBrowser: function () {
        return this.DetectWebkit() ? this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbian) > -1 ? !0 : !1 : !1
    },
    DetectSymbianOS: function () {
        return this.uagent.search(this.deviceSymbian) > -1 || this.uagent.search(this.deviceS60) > -1 || this.uagent.search(this.deviceSymbos) > -1 && this.DetectOperaMobile || this.uagent.search(this.deviceS70) > -1 || this.uagent.search(this.deviceS80) > -1 || this.uagent.search(this.deviceS90) > -1 ? !0 : !1
    },
    DetectPalmOS: function () {
        return this.DetectPalmWebOS() ? !1 : this.uagent.search(this.devicePalm) > -1 || this.uagent.search(this.engineBlazer) > -1 || this.uagent.search(this.engineXiino) > -1 ? !0 : !1
    },
    DetectPalmWebOS: function () {
        return this.uagent.search(this.deviceWebOS) > -1 ? !0 : !1
    },
    DetectWebOSTablet: function () {
        return this.uagent.search(this.deviceWebOShp) > -1 && this.uagent.search(this.deviceTablet) > -1 ? !0 : !1
    },
    DetectOperaMobile: function () {
        return this.uagent.search(this.engineOpera) > -1 && (this.uagent.search(this.mini) > -1 || this.uagent.search(this.mobi) > -1) ? !0 : !1
    },
    DetectOperaAndroidPhone: function () {
        return this.uagent.search(this.engineOpera) > -1 && this.uagent.search(this.deviceAndroid) > -1 && this.uagent.search(this.mobi) > -1 ? !0 : !1
    },
    DetectOperaAndroidTablet: function () {
        return this.uagent.search(this.engineOpera) > -1 && this.uagent.search(this.deviceAndroid) > -1 && this.uagent.search(this.deviceTablet) > -1 ? !0 : !1
    },
    DetectKindle: function () {
        return this.uagent.search(this.deviceKindle) > -1 && !this.DetectAndroid() ? !0 : !1
    },
    DetectAmazonSilk: function () {
        return this.uagent.search(this.engineSilk) > -1 ? !0 : !1
    },
    DetectGarminNuvifone: function () {
        return this.uagent.search(this.deviceNuvifone) > -1 ? !0 : !1
    },
    DetectBada: function () {
        return this.uagent.search(this.deviceBada) > -1 ? !0 : !1
    },
    DetectTizen: function () {
        return this.uagent.search(this.deviceTizen) > -1 ? !0 : !1
    },
    DetectMeego: function () {
        return this.uagent.search(this.deviceMeego) > -1 ? !0 : !1
    },
    DetectDangerHiptop: function () {
        return this.uagent.search(this.deviceDanger) > -1 || this.uagent.search(this.deviceHiptop) > -1 ? !0 : !1
    },
    DetectSonyMylo: function () {
        return this.uagent.search(this.manuSony) > -1 && (this.uagent.search(this.qtembedded) > -1 || this.uagent.search(this.mylocom2) > -1) ? !0 : !1
    },
    DetectMaemoTablet: function () {
        return this.uagent.search(this.maemo) > -1 ? !0 : this.uagent.search(this.linux) > -1 && this.uagent.search(this.deviceTablet) > -1 && !this.DetectWebOSTablet() && !this.DetectAndroid() ? !0 : !1
    },
    DetectArchos: function () {
        return this.uagent.search(this.deviceArchos) > -1 ? !0 : !1
    },
    DetectGameConsole: function () {
        return this.DetectSonyPlaystation() || this.DetectNintendo() || this.DetectXbox() ? !0 : !1
    },
    DetectSonyPlaystation: function () {
        return this.uagent.search(this.devicePlaystation) > -1 ? !0 : !1
    },
    DetectGamingHandheld: function () {
        return this.uagent.search(this.devicePlaystation) > -1 && this.uagent.search(this.devicePlaystationVita) > -1 ? !0 : !1
    },
    DetectNintendo: function () {
        return this.uagent.search(this.deviceNintendo) > -1 || this.uagent.search(this.deviceWii) > -1 || this.uagent.search(this.deviceNintendoDs) > -1 ? !0 : !1
    },
    DetectXbox: function () {
        return this.uagent.search(this.deviceXbox) > -1 ? !0 : !1
    },
    DetectBrewDevice: function () {
        return this.uagent.search(this.deviceBrew) > -1 ? !0 : !1
    },
    DetectSmartphone: function () {
        return this.DetectTierIphone() || this.DetectS60OssBrowser() || this.DetectSymbianOS() || this.DetectWindowsMobile() || this.DetectBlackBerry() || this.DetectPalmOS() ? !0 : !1
    },
    DetectMobileQuick: function () {
        return this.initCompleted || this.isMobilePhone ? this.isMobilePhone : this.DetectTierTablet() ? !1 : this.DetectSmartphone() ? !0 : this.uagent.search(this.mobile) > -1 ? !0 : this.DetectKindle() || this.DetectAmazonSilk() ? !0 : this.uagent.search(this.deviceMidp) > -1 || this.DetectBrewDevice() ? !0 : this.DetectOperaMobile() || this.DetectArchos() ? !0 : this.uagent.search(this.engineObigo) > -1 || this.uagent.search(this.engineNetfront) > -1 || this.uagent.search(this.engineUpBrowser) > -1 || this.uagent.search(this.engineOpenWeb) > -1 ? !0 : !1
    },
    DetectMobileLong: function () {
        return this.DetectMobileQuick() ? !0 : this.DetectGameConsole() ? !0 : this.DetectDangerHiptop() || this.DetectMaemoTablet() || this.DetectSonyMylo() || this.DetectGarminNuvifone() ? !0 : this.uagent.search(this.devicePda) > -1 && !(this.uagent.search(this.disUpdate) > -1) ? !0 : this.uagent.search(this.manuSamsung1) > -1 || this.uagent.search(this.manuSonyEricsson) > -1 || this.uagent.search(this.manuericsson) > -1 ? !0 : this.uagent.search(this.svcDocomo) > -1 || this.uagent.search(this.svcKddi) > -1 || this.uagent.search(this.svcVodafone) > -1 ? !0 : !1
    },
    DetectTierTablet: function () {
        return this.initCompleted || this.isTierTablet ? this.isTierTablet : this.DetectIpad() || this.DetectAndroidTablet() || this.DetectBlackBerryTablet() || this.DetectWebOSTablet() ? !0 : !1
    },
    DetectTierIphone: function () {
        return this.initCompleted || this.isTierIphone ? this.isTierIphone : this.DetectIphoneOrIpod() || this.DetectAndroidPhone() || this.DetectWindowsPhone() || this.DetectBlackBerry10Phone() || this.DetectPalmWebOS() || this.DetectBada() || this.DetectTizen() || this.DetectGamingHandheld() ? !0 : this.DetectBlackBerryWebKit() && this.DetectBlackBerryTouch() ? !0 : !1
    },
    DetectTierRichCss: function () {
        return this.initCompleted || this.isTierRichCss ? this.isTierRichCss : this.DetectTierIphone() || this.DetectKindle() || this.DetectTierTablet() ? !1 : this.DetectMobileQuick() ? this.DetectWebkit() ? !0 : this.DetectS60OssBrowser() || this.DetectBlackBerryHigh() || this.DetectWindowsMobile() || this.uagent.search(this.engineTelecaQ) > -1 ? !0 : !1 : !1
    },
    DetectTierOtherPhones: function () {
        return this.initCompleted || this.isTierGenericMobile ? this.isTierGenericMobile : this.DetectTierIphone() || this.DetectTierRichCss() || this.DetectTierTablet() ? !1 : this.DetectMobileLong() ? !0 : !1
    }
};
MobileEsp.InitDeviceScan(), $(document).ready(function () {
    $.browser.msie && $.browser.version == 10 && $(".modal").removeClass("fade")
}), window.Modernizr = function (e, t, n) {
    function A(e) {
        f.cssText = e
    }

    function O(e, t) {
        return A(p.join(e + ";") + (t || ""))
    }

    function M(e, t) {
        return typeof e === t
    }

    function _(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function D(e, t) {
        for (var r in e) {
            var i = e[r];
            if (!_(i, "-") && f[i] !== n) return t == "pfx" ? i : !0
        }
        return !1
    }

    function P(e, t, r) {
        for (var i in e) {
            var s = t[e[i]];
            if (s !== n) return r === !1 ? e[i] : M(s, "function") ? s.bind(r || t) : s
        }
        return !1
    }

    function H(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + v.join(r + " ") + r).split(" ");
        return M(t, "string") || M(t, "undefined") ? D(i, t) : (i = (e + " " + m.join(r + " ") + r).split(" "), P(i, t, n))
    }

    function B() {
        i.input = function (n) {
            for (var r = 0, i = n.length; r < i; r++) w[n[r]] = n[r] in l;
            return w.list && (w.list = !! t.createElement("datalist") && !! e.HTMLDataListElement), w
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), i.inputtypes = function (e) {
            for (var r = 0, i, s, u, a = e.length; r < a; r++) l.setAttribute("type", s = e[r]), i = l.type !== "text", i && (l.value = c, l.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(s) && l.style.WebkitAppearance !== n ? (o.appendChild(l), u = t.defaultView, i = u.getComputedStyle && u.getComputedStyle(l, null).WebkitAppearance !== "textfield" && l.offsetHeight !== 0, o.removeChild(l)) : /^(search|tel)$/.test(s) || (/^(url|email)$/.test(s) ? i = l.checkValidity && l.checkValidity() === !1 : i = l.value != c)), b[e[r]] = !! i;
            return b
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var r = "2.6.2",
        i = {}, s = !0,
        o = t.documentElement,
        u = "modernizr",
        a = t.createElement(u),
        f = a.style,
        l = t.createElement("input"),
        c = ":)",
        h = {}.toString,
        p = " -webkit- -moz- -o- -ms- ".split(" "),
        d = "Webkit Moz O ms",
        v = d.split(" "),
        m = d.toLowerCase().split(" "),
        g = {
            svg: "http://www.w3.org/2000/svg"
        }, y = {}, b = {}, w = {}, E = [],
        S = E.slice,
        x, T = function (e, n, r, i) {
            var s, a, f, l, c = t.createElement("div"),
                h = t.body,
                p = h || t.createElement("body");
            if (parseInt(r, 10))
                while (r--) f = t.createElement("div"), f.id = i ? i[r] : u + (r + 1), c.appendChild(f);
            return s = ["&#173;", '<style id="s', u, '">', e, "</style>"].join(""), c.id = u, (h ? c : p).innerHTML += s, p.appendChild(c), h || (p.style.background = "", p.style.overflow = "hidden", l = o.style.overflow, o.style.overflow = "hidden", o.appendChild(p)), a = n(c, e), h ? c.parentNode.removeChild(c) : (p.parentNode.removeChild(p), o.style.overflow = l), !! a
        }, N = function (t) {
            var n = e.matchMedia || e.msMatchMedia;
            if (n) return n(t).matches;
            var r;
            return T("@media " + t + " { #" + u + " { position: absolute; } }", function (t) {
                r = (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle)["position"] == "absolute"
            }), r
        }, C = function () {
            function r(r, i) {
                i = i || t.createElement(e[r] || "div"), r = "on" + r;
                var s = r in i;
                return s || (i.setAttribute || (i = t.createElement("div")), i.setAttribute && i.removeAttribute && (i.setAttribute(r, ""), s = M(i[r], "function"), M(i[r], "undefined") || (i[r] = n), i.removeAttribute(r))), i = null, s
            }
            var e = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return r
        }(),
        k = {}.hasOwnProperty,
        L;
    !M(k, "undefined") && !M(k.call, "undefined") ? L = function (e, t) {
        return k.call(e, t)
    } : L = function (e, t) {
        return t in e && M(e.constructor.prototype[t], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (t) {
        var n = this;
        if (typeof n != "function") throw new TypeError;
        var r = S.call(arguments, 1),
            i = function () {
                if (this instanceof i) {
                    var e = function () {};
                    e.prototype = n.prototype;
                    var s = new e,
                        o = n.apply(s, r.concat(S.call(arguments)));
                    return Object(o) === o ? o : s
                }
                return n.apply(t, r.concat(S.call(arguments)))
            };
        return i
    }), y.flexbox = function () {
        return H("flexWrap")
    }, y.flexboxlegacy = function () {
        return H("boxDirection")
    }, y.canvas = function () {
        var e = t.createElement("canvas");
        return !!e.getContext && !! e.getContext("2d")
    }, y.canvastext = function () {
        return !!i.canvas && !! M(t.createElement("canvas").getContext("2d").fillText, "function")
    }, y.webgl = function () {
        return !!e.WebGLRenderingContext
    }, y.touch = function () {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : T(["@media (", p.join("touch-enabled),("), u, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) {
            n = e.offsetTop === 9
        }), n
    }, y.geolocation = function () {
        return "geolocation" in navigator
    }, y.postmessage = function () {
        return !!e.postMessage
    }, y.websqldatabase = function () {
        return !!e.openDatabase
    }, y.indexedDB = function () {
        return !!H("indexedDB", e)
    }, y.hashchange = function () {
        return C("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, y.history = function () {
        return !!e.history && !! history.pushState
    }, y.draganddrop = function () {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, y.websockets = function () {
        return "WebSocket" in e || "MozWebSocket" in e
    }, y.rgba = function () {
        return A("background-color:rgba(150,255,150,.5)"), _(f.backgroundColor, "rgba")
    }, y.hsla = function () {
        return A("background-color:hsla(120,40%,100%,.5)"), _(f.backgroundColor, "rgba") || _(f.backgroundColor, "hsla")
    }, y.multiplebgs = function () {
        return A("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(f.background)
    }, y.backgroundsize = function () {
        return H("backgroundSize")
    }, y.borderimage = function () {
        return H("borderImage")
    }, y.borderradius = function () {
        return H("borderRadius")
    }, y.boxshadow = function () {
        return H("boxShadow")
    }, y.textshadow = function () {
        return t.createElement("div").style.textShadow === ""
    }, y.opacity = function () {
        return O("opacity:.55"), /^0.55$/.test(f.opacity)
    }, y.cssanimations = function () {
        return H("animationName")
    }, y.csscolumns = function () {
        return H("columnCount")
    }, y.cssgradients = function () {
        var e = "background-image:",
            t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            n = "linear-gradient(left top,#9f9, white);";
        return A((e + "-webkit- ".split(" ").join(t + e) + p.join(n + e)).slice(0, -e.length)), _(f.backgroundImage, "gradient")
    }, y.cssreflections = function () {
        return H("boxReflect")
    }, y.csstransforms = function () {
        return !!H("transform")
    }, y.csstransforms3d = function () {
        var e = !! H("perspective");
        return e && "webkitPerspective" in o.style && T("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t, n) {
            e = t.offsetLeft === 9 && t.offsetHeight === 3
        }), e
    }, y.csstransitions = function () {
        return H("transition")
    }, y.fontface = function () {
        var e;
        return T('@font-face {font-family:"font";src:url("https://")}', function (n, r) {
            var i = t.getElementById("smodernizr"),
                s = i.sheet || i.styleSheet,
                o = s ? s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText || "" : "";
            e = /src/i.test(o) && o.indexOf(r.split(" ")[0]) === 0
        }), e
    }, y.generatedcontent = function () {
        var e;
        return T(["#", u, "{font:0/0 a}#", u, ':after{content:"', c, '";visibility:hidden;font:3px/1 a}'].join(""), function (t) {
            e = t.offsetHeight >= 3
        }), e
    }, y.video = function () {
        var e = t.createElement("video"),
            n = !1;
        try {
            if (n = !! e.canPlayType) n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "")
        } catch (r) {}
        return n
    }, y.audio = function () {
        var e = t.createElement("audio"),
            n = !1;
        try {
            if (n = !! e.canPlayType) n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, "")
        } catch (r) {}
        return n
    }, y.localstorage = function () {
        try {
            return localStorage.setItem(u, u), localStorage.removeItem(u), !0
        } catch (e) {
            return !1
        }
    }, y.sessionstorage = function () {
        try {
            return sessionStorage.setItem(u, u), sessionStorage.removeItem(u), !0
        } catch (e) {
            return !1
        }
    }, y.webworkers = function () {
        return !!e.Worker
    }, y.applicationcache = function () {
        return !!e.applicationCache
    }, y.svg = function () {
        return !!t.createElementNS && !! t.createElementNS(g.svg, "svg").createSVGRect
    }, y.inlinesvg = function () {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == g.svg
    }, y.smil = function () {
        return !!t.createElementNS && /SVGAnimate/.test(h.call(t.createElementNS(g.svg, "animate")))
    }, y.svgclippaths = function () {
        return !!t.createElementNS && /SVGClipPath/.test(h.call(t.createElementNS(g.svg, "clipPath")))
    };
    for (var j in y) L(y, j) && (x = j.toLowerCase(), i[x] = y[j](), E.push((i[x] ? "" : "no-") + x));
    return i.input || B(), i.addTest = function (e, t) {
        if (typeof e == "object")
            for (var r in e) L(e, r) && i.addTest(r, e[r]);
        else {
            e = e.toLowerCase();
            if (i[e] !== n) return i;
            t = typeof t == "function" ? t() : t, typeof s != "undefined" && s && (o.className += " " + (t ? "" : "no-") + e), i[e] = t
        }
        return i
    }, A(""), a = l = null,
        function (e, t) {
            function l(e, t) {
                var n = e.createElement("p"),
                    r = e.getElementsByTagName("head")[0] || e.documentElement;
                return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
            }

            function c() {
                var e = g.elements;
                return typeof e == "string" ? e.split(" ") : e
            }

            function h(e) {
                var t = a[e[o]];
                return t || (t = {}, u++, e[o] = u, a[u] = t), t
            }

            function p(e, n, s) {
                n || (n = t);
                if (f) return n.createElement(e);
                s || (s = h(n));
                var o;
                return s.cache[e] ? o = s.cache[e].cloneNode() : i.test(e) ? o = (s.cache[e] = s.createElem(e)).cloneNode() : o = s.createElem(e), o.canHaveChildren && !r.test(e) ? s.frag.appendChild(o) : o
            }

            function d(e, n) {
                e || (e = t);
                if (f) return e.createDocumentFragment();
                n = n || h(e);
                var r = n.frag.cloneNode(),
                    i = 0,
                    s = c(),
                    o = s.length;
                for (; i < o; i++) r.createElement(s[i]);
                return r
            }

            function v(e, t) {
                t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) {
                    return g.shivMethods ? p(n, e, t) : t.createElem(n)
                }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + c().join().replace(/\w+/g, function (e) {
                    return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                }) + ");return n}")(g, t.frag)
            }

            function m(e) {
                e || (e = t);
                var n = h(e);
                return g.shivCSS && !s && !n.hasCSS && (n.hasCSS = !! l(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), f || v(e, n), e
            }
            var n = e.html5 || {}, r = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                i = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                s, o = "_html5shiv",
                u = 0,
                a = {}, f;
            (function () {
                try {
                    var e = t.createElement("a");
                    e.innerHTML = "<xyz></xyz>", s = "hidden" in e, f = e.childNodes.length == 1 || function () {
                        t.createElement("a");
                        var e = t.createDocumentFragment();
                        return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined"
                    }()
                } catch (n) {
                    s = !0, f = !0
                }
            })();
            var g = {
                elements: n.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                shivCSS: n.shivCSS !== !1,
                supportsUnknownElements: f,
                shivMethods: n.shivMethods !== !1,
                type: "default",
                shivDocument: m,
                createElement: p,
                createDocumentFragment: d
            };
            e.html5 = g, m(t)
        }(this, t), i._version = r, i._prefixes = p, i._domPrefixes = m, i._cssomPrefixes = v, i.mq = N, i.hasEvent = C, i.testProp = function (e) {
        return D([e])
    }, i.testAllProps = H, i.testStyles = T, i.prefixed = function (e, t, n) {
        return t ? H(e, t, n) : H(e, "pfx")
    }, o.className = o.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (s ? " js " + E.join(" ") : ""), i
}(this, this.document),
    function (e) {
        var t = {
                verticalOffset: 10,
                horizontalOffset: 10,
                title: !1,
                content: !1,
                url: !1,
                classes: "",
                position: "auto",
                fadeSpeed: 160,
                trigger: "click",
                preventDefault: !0,
                stopChildrenPropagation: !0,
                hideOnHTMLClick: !0,
                animateChange: !0,
                autoReposition: !0,
                anchor: !1
            }, n = [],
            r = {
                calc_position: function (t, n) {
                    var r = t.popover("getData"),
                        i = r.options,
                        s = i.anchor ? e(i.anchor) : t,
                        o = r.popover,
                        u = s.offset(),
                        a, f;
                    return n == "top" ? (a = u.top - o.outerHeight(), f = u.left - o.outerWidth() / 2 + s.outerWidth() / 2) : n == "right" ? (a = u.top + s.outerHeight() / 2 - o.outerHeight() / 2, f = u.left + s.outerWidth()) : n == "left" ? (a = u.top + s.outerHeight() / 2 - o.outerHeight() / 2, f = u.left - o.outerWidth()) : (a = u.top + s.outerHeight(), f = u.left - o.outerWidth() / 2 + s.outerWidth() / 2), x2 = f + o.outerWidth(), y2 = a + o.outerHeight(), ret = {
                        x1: f,
                        x2: x2,
                        y1: a,
                        y2: y2
                    }, ret
                },
                pop_position_class: function (e, t) {
                    var n = "popover-top popover-right popover-left",
                        r = "top-arrow",
                        i = "right-arrow bottom-arrow left-arrow";
                    t == "top" ? (n = "popover-right popover-bottom popover-left", r = "bottom-arrow", i = "top-arrow right-arrow left-arrow") : t == "right" ? (n = "popover-yop popover-bottom popover-left", r = "left-arrow", i = "top-arrow right-arrow bottom-arrow") : t == "left" && (n = "popover-top popover-right popover-bottom", r = "right-arrow", i = "top-arrow bottom-arrow left-arrow"), e.removeClass(n).addClass("popover-" + t).find(".arrow").removeClass(i).addClass(r)
                }
            }, i = {
                init: function (r) {
                    return this.each(function () {
                        var i = e.extend({}, t, r),
                            s = e(this),
                            o = s.popover("getData");
                        if (!o) {
                            var u = e('<div class="popover" />').addClass(i.classes).append('<div class="arrow" />').append('<div class="wrap"></div>').appendTo("body").hide();
                            i.stopChildrenPropagation && u.children().bind("click.popover", function (e) {
                                e.stopPropagation()
                            }), i.anchor && !i.anchor instanceof jQuery && (i.anchor = e(i.anchor));
                            var o = {
                                target: s,
                                popover: u,
                                options: i
                            };
                            i.title && e('<div class="title" />').html(i.title instanceof jQuery ? i.title.html() : i.title).appendTo(u.find(".wrap")), i.content && e('<div class="content" />').html(i.content instanceof jQuery ? i.content.html() : i.content).appendTo(u.find(".wrap")), s.data("popover", o), n.push(s), i.url && s.popover("ajax", i.url), s.popover("reposition"), s.popover("setTrigger", i.trigger);
                            if (i.hideOnHTMLClick) {
                                var a = "click.popover";
                                "ontouchstart" in document.documentElement && (a = "touchstart.popover"), e("html").unbind(a).bind(a, function (t) {
                                    e("html").popover("fadeOutAll")
                                })
                            }
                            if (i.autoReposition) {
                                var f = function (e) {
                                    s.popover("reposition")
                                };
                                e(window).unbind("resize.popover").bind("resize.popover", f).unbind("scroll.popover").bind("scroll.popover", f)
                            }
                        }
                    })
                },
                reposition: function () {
                    return this.each(function () {
                        var t = e(this),
                            n = t.popover("getData");
                        if (n) {
                            var i = n.popover,
                                s = n.options,
                                o = s.anchor ? e(s.anchor) : t,
                                u = o.offset(),
                                a = s.position;
                            a != "top" && a != "right" && a != "left" && a != "auto" && (a = "bottom");
                            var f;
                            if (a == "auto") {
                                var l = ["bottom", "left", "top", "right"],
                                    c = e(window).scrollTop(),
                                    h = e(window).scrollLeft(),
                                    p = e(window).outerHeight(),
                                    d = e(window).outerWidth();
                                e.each(l, function (e, n) {
                                    f = r.calc_position(t, n);
                                    var i = f.x1 - h,
                                        o = f.x2 - h + s.horizontalOffset,
                                        u = f.y1 - c,
                                        l = f.y2 - c + s.verticalOffset;
                                    return i < 0 || o < 0 || u < 0 || l < 0 ? !0 : l > p ? !0 : o > d ? !0 : (a = n, !1)
                                });
                                if (a == "auto") return
                            }
                            f = r.calc_position(t, a);
                            var v = f.top,
                                m = f.left;
                            r.pop_position_class(i, a);
                            var g = 0,
                                y = 0;
                            a == "bottom" && (g = s.verticalOffset), a == "top" && (g = -s.verticalOffset), a == "right" && (y = s.horizontalOffset), a == "left" && (y = -s.horizontalOffset);
                            var b = {
                                left: f.x1,
                                top: f.y1,
                                marginTop: g,
                                marginLeft: y
                            };
                            n.initd && s.animateChange ? i.css(b) : (n.initd = !0, i.css(b)), t.data("popover", n)
                        }
                    })
                },
                destroy: function () {
                    return this.each(function () {
                        var t = e(this),
                            n = t.popover("getData");
                        t.unbind(".popover"), e(window).unbind(".popover"), n.popover.remove(), t.removeData("popover")
                    })
                },
                show: function () {
                    return this.each(function () {
                        var t = e(this),
                            n = t.popover("getData");
                        if (n) {
                            var r = n.popover;
                            t.popover("reposition"), r.clearQueue().css({
                                zIndex: 950
                            }).show()
                        }
                    })
                },
                hide: function () {
                    return this.each(function () {
                        var t = e(this),
                            n = t.popover("getData");
                        n && n.popover.hide().css({
                            zIndex: 949
                        })
                    })
                },
                fadeOut: function (t) {
                    return this.each(function () {
                        var n = e(this),
                            r = n.popover("getData");
                        if (r) {
                            var i = r.popover,
                                s = r.options;
                            i.delay(100).css({
                                zIndex: 949
                            }).fadeOut(t ? t : s.fadeSpeed)
                        }
                    })
                },
                hideAll: function () {
                    return e.each(n, function (t, n) {
                        var r = e(this),
                            i = r.popover("getData");
                        if (i) {
                            var s = i.popover;
                            s.hide()
                        }
                    })
                },
                fadeOutAll: function (t) {
                    return e.each(n, function (n, r) {
                        var i = e(this),
                            s = i.popover("getData");
                        if (s) {
                            var o = s.popover,
                                u = s.options;
                            o.css({
                                zIndex: 949
                            }).fadeOut(t ? t : u.fadeSpeed)
                        }
                    })
                },
                setTrigger: function (t) {
                    return this.each(function () {
                        var n = e(this),
                            r = n.popover("getData");
                        if (r) {
                            var i = r.popover,
                                s = r.options,
                                o = s.anchor ? e(s.anchor) : n;
                            t === "click" ? (o.unbind("click.popover").bind("click.popover", function (e) {
                                s.preventDefault && e.preventDefault(), e.stopPropagation(), n.popover("show")
                            }), i.unbind("click.popover").bind("click.popover", function (e) {
                                e.stopPropagation()
                            })) : (o.unbind("click.popover"), i.unbind("click.popover")), t === "hover" ? (o.add(i).bind("mousemove.popover", function (e) {
                                n.popover("show")
                            }), o.add(i).bind("mouseleave.popover", function (e) {
                                n.popover("fadeOut")
                            })) : o.add(i).unbind("mousemove.popover").unbind("mouseleave.popover"), t === "focus" ? (o.add(i).bind("focus.popover", function (e) {
                                n.popover("show")
                            }), o.add(i).bind("blur.popover", function (e) {
                                n.popover("fadeOut")
                            }), o.bind("click.popover", function (e) {
                                e.stopPropagation()
                            })) : o.add(i).unbind("focus.popover").unbind("blur.popover").unbind("click.popover")
                        }
                    })
                },
                title: function (t) {
                    return this.each(function () {
                        var n = e(this),
                            r = n.popover("getData");
                        if (r) {
                            var i = r.popover.find(".title"),
                                s = r.popover.find(".wrap");
                            i.length === 0 && (i = e('<div class="title" />').appendTo(s)), i.html(t)
                        }
                    })
                },
                content: function (t) {
                    return this.each(function () {
                        var n = e(this),
                            r = n.popover("getData");
                        if (r) {
                            var i = r.popover.find(".content"),
                                s = r.popover.find(".wrap");
                            i.length === 0 && (i = e('<div class="content" />').appendTo(s)), i.html(t)
                        }
                    })
                },
                ajax: function (t, n) {
                    return this.each(function () {
                        var r = e(this),
                            i = r.popover("getData");
                        if (i) {
                            var s = {
                                url: t,
                                success: function (t) {
                                    var n = i.popover.find(".content"),
                                        r = i.popover.find(".wrap");
                                    n.length === 0 && (n = e('<div class="content" />').appendTo(r)), n.html(t)
                                }
                            }, o = e.extend({}, s, n);
                            e.ajax(o)
                        }
                    })
                },
                setOption: function (t, n) {
                    return this.each(function () {
                        var r = e(this),
                            i = r.popover("getData");
                        i && (i.options[t] = n, r.data("popover", i))
                    })
                },
                getData: function () {
                    var t = [];
                    this.each(function () {
                        var n = e(this),
                            r = n.data("popover");
                        r && t.push(r)
                    });
                    if (t.length == 0) return;
                    return t.length == 1 && (t = t[0]), t
                }
            };
        e.fn.popover = function (t) {
            if (i[t]) return i[t].apply(this, Array.prototype.slice.call(arguments, 1));
            if (typeof t == "object" || !t) return i.init.apply(this, arguments);
            e.error("Method " + t + " does not exist on jQuery.popover")
        }
    }(jQuery),
    function (e, t, n) {
        var r = e.jQuery || e.Zepto || e.ender || e.elo;
        typeof module != "undefined" && module.exports ? module.exports = n(r) : e[t] = n(r)
    }(this, "Response", function (e) {
        function V(e) {
            throw new TypeError(e ? i + "." + e : i)
        }

        function $(e) {
            return typeof e == "number" && e === e
        }

        function J(e) {
            return typeof e == "string" ? G(e.split(" ")) : p(e) ? G(e) : []
        }

        function K(e, t, n) {
            if (null == e) return e;
            var r = 0,
                i = e.length;
            while (r < i) t.call(n || e[r], e[r], r++, e);
            return e
        }

        function Q(e, t, n) {
            var r = [],
                i = e.length,
                s = 0,
                o;
            t = t || "", n = n || "";
            while (s < i) o = e[s++], null == o || r.push(t + o + n);
            return r
        }

        function G(e, t, n) {
            var r, i = 0,
                s = 0,
                o, u = [],
                a, f = typeof t == "function";
            if (!e) return u;
            n = (a = !0 === n) ? null : n;
            for (r = e.length; s < r; s++) o = e[s], a === (f ? !t.call(n, o, s, e) : t ? typeof o !== t : !o) && (u[i++] = o);
            return u
        }

        function Y(e, t) {
            if (!e || !t) return e;
            var n, r = t.length;
            if (typeof t != "function" && $(r)) {
                for (n = 0; n < r; n++) void 0 === t[n] || (e[n] = t[n]);
                e.length > n || (e.length = n)
            } else
                for (n in t) d.call(t, n) && void 0 !== t[n] && (e[n] = t[n]);
            return e
        }

        function Z(e, t, n) {
            return null == e ? e : (typeof e == "object" && !e.nodeType && $(e.length) ? K(e, t, n) : t.call(n || e, e), e)
        }

        function et(e) {
            return function (t, n) {
                var r, i = e();
                return r = i >= (t || 0), n ? r && i <= n : r
            }
        }

        function tt(e) {
            var t = u.devicePixelRatio;
            return null == e ? t || (tt(2) ? 2 : tt(1.5) ? 1.5 : tt(1) ? 1 : 0) : isFinite(e) ? t && t > 0 ? t >= e : (e = "only all and (min--moz-device-pixel-ratio:" + e + ")", z(e).matches ? !0 : !! z(e.replace("-moz-", "")).matches) : !1
        }

        function nt(e) {
            return e.replace(F, "$1").replace(j, function (e, t) {
                return t.toUpperCase()
            })
        }

        function rt(e) {
            return "data-" + (e ? e.replace(F, "$1").replace(B, "$1-$2").toLowerCase() : e)
        }

        function it(e) {
            var t;
            return !e || typeof e != "string" ? e : "true" === e ? !0 : "false" === e ? !1 : "undefined" === e ? t : "null" === e ? null : (t = parseFloat(e)) === +t ? t : e
        }

        function st(e) {
            return e ? e.nodeType === 1 ? e : e[0] && e[0].nodeType === 1 ? e[0] : !1 : !1
        }

        function ot(e, t) {
            var n = arguments.length,
                r = st(this),
                i = {}, s = !1,
                o;
            if (n) {
                p(e) && (s = !0, e = e[0]);
                if (typeof e == "string") {
                    e = rt(e);
                    if (1 === n) return i = r.getAttribute(e), s ? it(i) : i;
                    if (this === r || 2 > (o = this.length || 1)) r.setAttribute(e, t);
                    else
                        while (o--) o in this && ot.apply(this[o], arguments)
                } else if (e instanceof Object)
                    for (o in e) e.hasOwnProperty(o) && ot.call(this, o, e[o]);
                return this
            }
            return r.dataset && DOMStringMap ? r.dataset : (K(r.attributes, function (e) {
                e && (o = String(e.name).match(F)) && (i[nt(o[1])] = e.value)
            }), i)
        }

        function ut(e) {
            return this && typeof e == "string" && (e = J(e), Z(this, function (t) {
                K(e, function (e) {
                    e && t.removeAttribute(rt(e))
                })
            })), this
        }

        function at(e, t, n) {
            return ot.apply(e, v.call(arguments, 1))
        }

        function ft(e, t) {
            return ut.call(e, t)
        }

        function lt(e) {
            var t, n = [],
                r = 0,
                i = e.length;
            while (r < i)(t = e[r++]) && n.push("[" + rt(t.replace(H, "").replace(".", "\\.")) + "]");
            return n.join()
        }

        function ct(t) {
            return e(lt(J(t)))
        }

        function ht() {
            return window.pageXOffset || f.scrollLeft
        }

        function pt() {
            return window.pageYOffset || f.scrollTop
        }

        function dt(e, t) {
            var n = e.getBoundingClientRect ? e.getBoundingClientRect() : {};
            return t = typeof t == "number" ? t || 0 : 0, {
                top: (n.top || 0) - t,
                left: (n.left || 0) - t,
                bottom: (n.bottom || 0) + t,
                right: (n.right || 0) + t
            }
        }

        function vt(e, t) {
            var n = dt(st(e), t);
            return !!n && n.right >= 0 && n.left <= W()
        }

        function mt(e, t) {
            var n = dt(st(e), t);
            return !!n && n.bottom >= 0 && n.top <= X()
        }

        function gt(e, t) {
            var n = dt(st(e), t);
            return !!n && n.bottom >= 0 && n.top <= X() && n.right >= 0 && n.left <= W()
        }

        function yt(e) {
            var t = {
                img: 1,
                input: 1,
                source: 3,
                embed: 3,
                track: 3,
                iframe: 5,
                audio: 5,
                video: 5,
                script: 5
            }, n = t[e.tagName.toLowerCase()] || -1;
            return 4 > n ? n : typeof e.getAttribute("src") == "string" ? 5 : -5
        }

        function bt(e, t, n) {
            var i;
            return (!e || null == t) && V("store"), n = typeof n == "string" && n, Z(e, function (e) {
                n ? i = e.getAttribute(n) : 0 < yt(e) ? i = e.getAttribute("src") : i = e.innerHTML, null == i ? ft(e, t) : at(e, t, i)
            }), r
        }

        function wt(e, t) {
            var n = [];
            return e && t && K(J(t), function (t, r) {
                n.push(at(e, t))
            }, e), n
        }

        function Et(e, t) {
            return typeof e == "string" && typeof t == "function" && (T[e] = t, N[e] = 1), r
        }

        function St(e) {
            return c.on("resize", e), r
        }

        function xt(e, t) {
            var n, i, s = R.crossover;
            return typeof e == "function" && (n = t, t = e, e = n), i = e ? "" + e + s : s, c.on(i, t), r
        }

        function Tt(e) {
            return Z(e, function (e) {
                l(e), St(e)
            }), r
        }

        function Nt(e) {
            return Z(e, function (e) {
                typeof e == "object" || V("create @args");
                var t = I(w).configure(e),
                    n, r = t.verge,
                    i = t.breakpoints,
                    s = q("scroll"),
                    o = q("resize");
                if (!i.length) return;
                n = i[0] || i[1] || !1, l(function () {
                    function u() {
                        t.reset(), K(t.$e, function (e, n) {
                            t[n].decideValue().updateDOM()
                        }).trigger(e)
                    }

                    function a() {
                        K(t.$e, function (e, n) {
                            gt(t[n].$e, r) && t[n].updateDOM()
                        })
                    }
                    var e = R.allLoaded,
                        i = !! t.lazy;
                    K(t.target().$e, function (e, n) {
                        t[n] = I(t).prepareData(e), (!i || gt(t[n].$e, r)) && t[n].updateDOM()
                    }), t.dynamic && (t.custom || n < O) && St(u, o);
                    if (!i) return;
                    c.on(s, a), t.$e.one(e, function () {
                        c.off(s, a)
                    })
                })
            }), r
        }

        function Ct(e) {
            return n[i] === r && (n[i] = s), typeof e == "function" && e.call(n, r), r
        }

        function kt(e, t, n) {
            K(["inX", "inY", "inViewport"], function (i) {
                (n || !t[i]) && (t[i] = function (t, n) {
                    return e(G(this, function (e) {
                        return !!e && !n === r[i](e, t)
                    }))
                })
            })
        }

        function Lt(e, t) {
            if (typeof e == "function" && e.fn) {
                if (t || void 0 === e.fn.dataset) e.fn.dataset = ot;
                if (t || void 0 === e.fn.deletes) e.fn.deletes = ut;
                kt(e, e.fn, t)
            }
            return r
        }

        function At(t, n) {
            return t = arguments.length ? t : e, Lt(t, n)
        }
        if (typeof e != "function") try {
            console.log("Response was unable to run due to missing dependency.")
        } catch (t) {}
        var n = this,
            r, i = "Response",
            s = n[i],
            o = "init" + i,
            u = window,
            a = document,
            f = a.documentElement,
            l = e.domReady || e,
            c = e(u),
            h = u.screen,
            p = Array.isArray || function (e) {
                return e instanceof Array
            }, d = {}.hasOwnProperty,
            v = [].slice,
            m = [].concat,
            g = [].map,
            y = g ? function (e, t, n) {
                return g.call(e, t, n)
            } : function (e, t, n) {
                var r, i = e.length,
                    s = [];
                for (r = 0; r < i; r++) r in e && (s[r] = t.call(n, e[r], r, e));
                return s
            }, b = {
                width: [0, 320, 481, 641, 961, 1025, 1281],
                height: [0, 481],
                ratio: [1, 1.5, 2]
            }, w, E, S, x = {}, T = {}, N = {}, C = {
                all: []
            }, k = 1,
            L = h.width,
            A = h.height,
            O = L > A ? L : A,
            M = L + A - O,
            _ = function () {
                return L
            }, D = function () {
                return A
            }, P = /[^a-z0-9_\-\.]/gi,
            H = /^[\W\s]+|[\W\s]+$|/g,
            B = /([a-z])([A-Z])/g,
            j = /-(.)/g,
            F = /^data-(.+)$/,
            I = Object.create || function (e) {
                function t() {}
                return t.prototype = e, new t
            }, q = function (e, t) {
                return t = t || i, e.replace(H, "") + "." + t.replace(H, "")
            }, R = {
                allLoaded: q("allLoaded"),
                crossover: q("crossover")
            }, U = u.matchMedia || u.msMatchMedia,
            z = U || function () {
                return {}
            }, W = function (e, t, n) {
                var r = t.clientWidth,
                    i = e.innerWidth;
                return n && r < i && !0 === n("(min-width:" + i + "px)").matches ? function () {
                    return e.innerWidth
                } : function () {
                    return t.clientWidth
                }
            }(u, f, U),
            X = function (e, t, n) {
                var r = t.clientHeight,
                    i = e.innerHeight;
                return n && r < i && !0 === n("(min-height:" + i + "px)").matches ? function () {
                    return e.innerHeight
                } : function () {
                    return t.clientHeight
                }
            }(u, f, U);
        return E = et(W), S = et(X), x.band = et(_), x.wave = et(D), w = function () {
            function r(e) {
                return typeof e == "string" ? e.toLowerCase().replace(P, "") : ""
            }
            var t = R.crossover,
                n = Math.min;
            return {
                $e: 0,
                mode: 0,
                breakpoints: null,
                prefix: null,
                prop: "width",
                keys: [],
                dynamic: null,
                custom: 0,
                values: [],
                fn: 0,
                verge: null,
                newValue: 0,
                currValue: 1,
                aka: null,
                lazy: null,
                i: 0,
                uid: null,
                reset: function () {
                    var e = this.breakpoints,
                        n = e.length,
                        r = 0;
                    while (!r && n--) this.fn(e[n]) && (r = n);
                    return r !== this.i && (c.trigger(t).trigger(this.prop + t), this.i = r || 0), this
                },
                configure: function (e) {
                    Y(this, e);
                    var t, i, s, o, u = !0,
                        a, f = this.prop;
                    this.uid = k++, this.verge = isFinite(this.verge) ? this.verge : n(O, 500), this.fn = T[f] || V("create @fn"), typeof this.dynamic != "boolean" && (this.dynamic = "device" !== f.substring(0, 6)), this.custom = N[f], i = this.prefix ? G(y(J(this.prefix), r)) : ["min-" + f + "-"], s = 1 < i.length ? i.slice(1) : 0, this.prefix = i[0], a = this.breakpoints, p(a) ? (K(a, function (e) {
                        if (!e && e !== 0) throw "invalid breakpoint";
                        u = u && isFinite(e)
                    }), a = u ? a.sort(function (e, t) {
                        return e - t
                    }) : a, a.length || V("create @breakpoints")) : a = b[f] || b[f.split("-").pop()] || V("create @prop"), this.breakpoints = u ? G(a, function (e) {
                        return e <= O
                    }) : a, this.keys = Q(this.breakpoints, this.prefix), this.aka = null;
                    if (s) {
                        o = [], t = s.length;
                        while (t--) o.push(Q(this.breakpoints, s[t]));
                        this.aka = o, this.keys = m.apply(this.keys, o)
                    }
                    return C.all = C.all.concat(C[this.uid] = this.keys), this
                },
                target: function () {
                    return this.$e = e(lt(C[this.uid])), bt(this.$e, o), this.keys.push(o), this
                },
                decideValue: function () {
                    var e = null,
                        t = this.breakpoints,
                        n = t.length,
                        r = n;
                    while (e == null && r--) this.fn(t[r]) && (e = this.values[r]);
                    return this.newValue = typeof e == "string" ? e : this.values[n], this
                },
                prepareData: function (t) {
                    this.$e = e(t), this.mode = yt(t), this.values = wt(this.$e, this.keys);
                    if (this.aka) {
                        var n = this.aka.length;
                        while (n--) this.values = Y(this.values, wt(this.$e, this.aka[n]))
                    }
                    return this.decideValue()
                },
                updateDOM: function () {
                    return this.currValue === this.newValue ? this : (this.currValue = this.newValue, 0 < this.mode ? this.$e[0].setAttribute("src", this.newValue) : null == this.newValue ? this.$e.empty && this.$e.empty() : this.$e.html ? this.$e.html(this.newValue) : (this.$e.empty && this.$e.empty(), this.$e[0].innerHTML = this.newValue), this)
                }
            }
        }(), T.width = E, T.height = S, T["device-width"] = x.band, T["device-height"] = x.wave, T["device-pixel-ratio"] = tt, r = {
            deviceMin: function () {
                return M
            },
            deviceMax: function () {
                return O
            },
            noConflict: Ct,
            chain: At,
            bridge: Lt,
            create: Nt,
            addTest: Et,
            datatize: rt,
            camelize: nt,
            render: it,
            store: bt,
            access: wt,
            target: ct,
            object: I,
            crossover: xt,
            action: Tt,
            resize: St,
            ready: l,
            affix: Q,
            sift: G,
            dpr: tt,
            deletes: ft,
            scrollX: ht,
            scrollY: pt,
            deviceW: _,
            deviceH: D,
            device: x,
            inX: vt,
            inY: mt,
            route: Z,
            merge: Y,
            media: z,
            wave: S,
            band: E,
            map: y,
            each: K,
            inViewport: gt,
            dataset: at,
            viewportH: X,
            viewportW: W
        }, l(function () {
            var t, n = at(a.body, "responsejs");
            n && (t = !! u.JSON && JSON.parse, t ? n = t(n) : e.parseJSON && (n = e.parseJSON(n)), n && n.create && Nt(n.create)), f.className = f.className.replace(/(^|\s)(no-)?responsejs(\s|$)/, "$1$3") + " responsejs "
        }), r
    }),
    function () {
        var e = [].indexOf || function (e) {
            for (var t = 0, n = this.length; t < n; t++)
                if (t in this && this[t] === e) return t;
            return -1
        }, t = [].slice;
        (function (e, t) {
            return typeof define == "function" && define.amd ? define("waypoints", ["jquery"], function (n) {
                return t(n, e)
            }) : t(e.jQuery, e)
        })(this, function (n, r) {
            var i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b;
            return i = n(r), c = e.call(r, "ontouchstart") >= 0, u = {
                horizontal: {},
                vertical: {}
            }, a = 1, l = {}, f = "waypoints-context-id", d = "resize.waypoints", v = "scroll.waypoints", m = 1, g = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", s = function () {
                function e(e) {
                    var t = this;
                    this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + a++, this.oldScroll = {
                        x: e.scrollLeft(),
                        y: e.scrollTop()
                    }, this.waypoints = {
                        horizontal: {},
                        vertical: {}
                    }, e.data(f, this.id), l[this.id] = this, e.bind(v, function () {
                        var e;
                        if (!t.didScroll && !c) return t.didScroll = !0, e = function () {
                            return t.doScroll(), t.didScroll = !1
                        }, r.setTimeout(e, n[b].settings.scrollThrottle)
                    }), e.bind(d, function () {
                        var e;
                        if (!t.didResize) return t.didResize = !0, e = function () {
                            return n[b]("refresh"), t.didResize = !1
                        }, r.setTimeout(e, n[b].settings.resizeThrottle)
                    })
                }
                return e.prototype.doScroll = function () {
                    var e, t = this;
                    return e = {
                        horizontal: {
                            newScroll: this.$element.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left"
                        },
                        vertical: {
                            newScroll: this.$element.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up"
                        }
                    }, c && (!e.vertical.oldScroll || !e.vertical.newScroll) && n[b]("refresh"), n.each(e, function (e, r) {
                        var i, s, o;
                        return o = [], s = r.newScroll > r.oldScroll, i = s ? r.forward : r.backward, n.each(t.waypoints[e], function (e, t) {
                            var n, i;
                            if (r.oldScroll < (n = t.offset) && n <= r.newScroll) return o.push(t);
                            if (r.newScroll < (i = t.offset) && i <= r.oldScroll) return o.push(t)
                        }), o.sort(function (e, t) {
                            return e.offset - t.offset
                        }), s || o.reverse(), n.each(o, function (e, t) {
                            if (t.options.continuous || e === o.length - 1) return t.trigger([i])
                        })
                    }), this.oldScroll = {
                        x: e.horizontal.newScroll,
                        y: e.vertical.newScroll
                    }
                }, e.prototype.refresh = function () {
                    var e, t, r, i = this;
                    return r = n.isWindow(this.element), t = this.$element.offset(), this.doScroll(), e = {
                        horizontal: {
                            contextOffset: r ? 0 : t.left,
                            contextScroll: r ? 0 : this.oldScroll.x,
                            contextDimension: this.$element.width(),
                            oldScroll: this.oldScroll.x,
                            forward: "right",
                            backward: "left",
                            offsetProp: "left"
                        },
                        vertical: {
                            contextOffset: r ? 0 : t.top,
                            contextScroll: r ? 0 : this.oldScroll.y,
                            contextDimension: r ? n[b]("viewportHeight") : this.$element.height(),
                            oldScroll: this.oldScroll.y,
                            forward: "down",
                            backward: "up",
                            offsetProp: "top"
                        }
                    }, n.each(e, function (e, t) {
                        return n.each(i.waypoints[e], function (e, r) {
                            var i, s, o, u, a;
                            i = r.options.offset, o = r.offset, s = n.isWindow(r.element) ? 0 : r.$element.offset()[t.offsetProp], n.isFunction(i) ? i = i.apply(r.element) : typeof i == "string" && (i = parseFloat(i), r.options.offset.indexOf("%") > -1 && (i = Math.ceil(t.contextDimension * i / 100))), r.offset = s - t.contextOffset + t.contextScroll - i;
                            if (r.options.onlyOnScroll && o != null || !r.enabled) return;
                            if (o !== null && o < (u = t.oldScroll) && u <= r.offset) return r.trigger([t.backward]);
                            if (o !== null && o > (a = t.oldScroll) && a >= r.offset) return r.trigger([t.forward]);
                            if (o === null && t.oldScroll >= r.offset) return r.trigger([t.forward])
                        })
                    })
                }, e.prototype.checkEmpty = function () {
                    if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind([d, v].join(" ")), delete l[this.id]
                }, e
            }(), o = function () {
                function e(e, t, r) {
                    var i, s;
                    r = n.extend({}, n.fn[y].defaults, r), r.offset === "bottom-in-view" && (r.offset = function () {
                        var e;
                        return e = n[b]("viewportHeight"), n.isWindow(t.element) || (e = t.$element.height()), e - n(this).outerHeight()
                    }), this.$element = e, this.element = e[0], this.axis = r.horizontal ? "horizontal" : "vertical", this.callback = r.handler, this.context = t, this.enabled = r.enabled, this.id = "waypoints" + m++, this.offset = null, this.options = r, t.waypoints[this.axis][this.id] = this, u[this.axis][this.id] = this, i = (s = e.data(g)) != null ? s : [], i.push(this.id), e.data(g, i)
                }
                return e.prototype.trigger = function (e) {
                    if (!this.enabled) return;
                    this.callback != null && this.callback.apply(this.element, e);
                    if (this.options.triggerOnce) return this.destroy()
                }, e.prototype.disable = function () {
                    return this.enabled = !1
                }, e.prototype.enable = function () {
                    return this.context.refresh(), this.enabled = !0
                }, e.prototype.destroy = function () {
                    return delete u[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
                }, e.getWaypointsByElement = function (e) {
                    var t, r;
                    return r = n(e).data(g), r ? (t = n.extend({}, u.horizontal, u.vertical), n.map(r, function (e) {
                        return t[e]
                    })) : []
                }, e
            }(), p = {
                init: function (e, t) {
                    var r;
                    return t == null && (t = {}), (r = t.handler) == null && (t.handler = e), this.each(function () {
                        var e, r, i, u;
                        return e = n(this), i = (u = t.context) != null ? u : n.fn[y].defaults.context, n.isWindow(i) || (i = e.closest(i)), i = n(i), r = l[i.data(f)], r || (r = new s(i)), new o(e, r, t)
                    }), n[b]("refresh"), this
                },
                disable: function () {
                    return p._invoke(this, "disable")
                },
                enable: function () {
                    return p._invoke(this, "enable")
                },
                destroy: function () {
                    return p._invoke(this, "destroy")
                },
                prev: function (e, t) {
                    return p._traverse.call(this, e, t, function (e, t, n) {
                        if (t > 0) return e.push(n[t - 1])
                    })
                },
                next: function (e, t) {
                    return p._traverse.call(this, e, t, function (e, t, n) {
                        if (t < n.length - 1) return e.push(n[t + 1])
                    })
                },
                _traverse: function (e, t, i) {
                    var s, o;
                    return e == null && (e = "vertical"), t == null && (t = r), o = h.aggregate(t), s = [], this.each(function () {
                        var t;
                        return t = n.inArray(this, o[e]), i(s, t, o[e])
                    }), this.pushStack(s)
                },
                _invoke: function (e, t) {
                    return e.each(function () {
                        var e;
                        return e = o.getWaypointsByElement(this), n.each(e, function (e, n) {
                            return n[t](), !0
                        })
                    }), this
                }
            }, n.fn[y] = function () {
                var e, r;
                return r = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], p[r] ? p[r].apply(this, e) : n.isFunction(r) ? p.init.apply(this, arguments) : n.isPlainObject(r) ? p.init.apply(this, [null, r]) : r ? n.error("The " + r + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.")
            }, n.fn[y].defaults = {
                context: r,
                continuous: !0,
                enabled: !0,
                horizontal: !1,
                offset: 0,
                triggerOnce: !1
            }, h = {
                refresh: function () {
                    return n.each(l, function (e, t) {
                        return t.refresh()
                    })
                },
                viewportHeight: function () {
                    var e;
                    return (e = r.innerHeight) != null ? e : i.height()
                },
                aggregate: function (e) {
                    var t, r, i;
                    return t = u, e && (t = (i = l[n(e).data(f)]) != null ? i.waypoints : void 0), t ? (r = {
                        horizontal: [],
                        vertical: []
                    }, n.each(r, function (e, i) {
                        return n.each(t[e], function (e, t) {
                            return i.push(t)
                        }), i.sort(function (e, t) {
                            return e.offset - t.offset
                        }), r[e] = n.map(i, function (e) {
                            return e.element
                        }), r[e] = n.unique(r[e])
                    }), r) : []
                },
                above: function (e) {
                    return e == null && (e = r), h._filter(e, "vertical", function (e, t) {
                        return t.offset <= e.oldScroll.y
                    })
                },
                below: function (e) {
                    return e == null && (e = r), h._filter(e, "vertical", function (e, t) {
                        return t.offset > e.oldScroll.y
                    })
                },
                left: function (e) {
                    return e == null && (e = r), h._filter(e, "horizontal", function (e, t) {
                        return t.offset <= e.oldScroll.x
                    })
                },
                right: function (e) {
                    return e == null && (e = r), h._filter(e, "horizontal", function (e, t) {
                        return t.offset > e.oldScroll.x
                    })
                },
                enable: function () {
                    return h._invoke("enable")
                },
                disable: function () {
                    return h._invoke("disable")
                },
                destroy: function () {
                    return h._invoke("destroy")
                },
                extendFn: function (e, t) {
                    return p[e] = t
                },
                _invoke: function (e) {
                    var t;
                    return t = n.extend({}, u.vertical, u.horizontal), n.each(t, function (t, n) {
                        return n[e](), !0
                    })
                },
                _filter: function (e, t, r) {
                    var i, s;
                    return i = l[n(e).data(f)], i ? (s = [], n.each(i.waypoints[t], function (e, t) {
                        if (r(i, t)) return s.push(t)
                    }), s.sort(function (e, t) {
                        return e.offset - t.offset
                    }), n.map(s, function (e) {
                        return e.element
                    })) : []
                }
            }, n[b] = function () {
                var e, n;
                return n = arguments[0], e = 2 <= arguments.length ? t.call(arguments, 1) : [], h[n] ? h[n].apply(null, e) : h.aggregate.call(null, n)
            }, n[b].settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            }, i.load(function () {
                return n[b]("refresh")
            })
        })
    }.call(this), $.extend($.validator.defaults, {
    highlight: function (e) {
        $(e).closest(".control-group").addClass("error")
    },
    unhighlight: function (e) {
        $(e).closest(".control-group").removeClass("error"), $(e).next("p.help-block").remove()
    },
    errorElement: "p",
    errorClass: "help-block",
    errorPlacement: function (e, t) {
        t.after(e)
    }
}), $(document).ready(function () {
    $(".fancybox").fancybox(), $.fn.qtip.styles.cvctooltip = {
        tip: {
            color: "#ffffff",
            corner: "bottomMiddle"
        },
        "font-size": 16,
        color: "#494949",
        "text-align": "center",
        background: "white",
        onRender: function () {
            setTimeout(function () {
                $(".qtip-tip").css("bottom", "1px"), alert("moo!")
            }, 100)
        }
    }, $.metadata.setType("attr", "data-validate")
}),
    function () {
        var e = getURLParameter("asid");
        if (e !== "null" && $.cookie("ampush_tracking") === null) {
            var t = {
                expires: 365,
                path: "/"
            };
            $.cookie("ampush_tracking", e, t)
        }
    }(),
    function () {
        var e = getURLParameter("utm_keyword");
        if (e !== "null" && $.cookie("utm_keyword") === null) {
            var t = {
                expires: 365,
                path: "/"
            };
            $.cookie("utm_keyword", e, t)
        }
    }(),
    function () {
        var e = getURLParameter("u1");
        if (e !== "null" && $.cookie("nextjump_tracking") === null) {
            var t = {
                expires: 365,
                path: "/"
            };
            $.cookie("nextjump_tracking", e, t)
        }
    }();