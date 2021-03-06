! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = function(b, c) {
        return void 0 === c && (c = "undefined" != typeof window ? require("jquery") : require("jquery")(b)), a(c), c
    } : a(jQuery)
}(function(a) {
    "use strict";
    var b = a(document),
        c = a(window),
        d = "selectric",
        e = "Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Scroll Group GroupLabel",
        f = ".sl",
        g = ["a", "e", "i", "o", "u", "n", "c", "y"],
        h = [/[\xE0-\xE5]/g, /[\xE8-\xEB]/g, /[\xEC-\xEF]/g, /[\xF2-\xF6]/g, /[\xF9-\xFC]/g, /[\xF1]/g, /[\xE7]/g, /[\xFD-\xFF]/g],
        i = function(b, c) {
            var d = this;
            d.element = b, d.$element = a(b), d.state = {
                multiple: !!d.$element.attr("multiple"),
                enabled: !1,
                opened: !1,
                currValue: -1,
                selectedIdx: -1,
                highlightedIdx: -1
            }, d.eventTriggers = {
                open: d.open,
                close: d.close,
                destroy: d.destroy,
                refresh: d.refresh,
                init: d.init
            }, d.init(c)
        };
    i.prototype = {
        utils: {
            isMobile: function() {
                return /android|ip(hone|od|ad)/i.test(navigator.userAgent)
            },
            escapeRegExp: function(a) {
                return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            },
            replaceDiacritics: function(a) {
                for (var b = h.length; b--;) a = a.toLowerCase().replace(h[b], g[b]);
                return a
            },
            format: function(a) {
                var b = arguments;
                return ("" + a).replace(/\{(?:(\d+)|(\w+))\}/g, function(a, c, d) {
                    return d && b[1] ? b[1][d] : b[c]
                })
            },
            nextEnabledItem: function(a, b) {
                for (; a[b = (b + 1) % a.length].disabled;);
                return b
            },
            previousEnabledItem: function(a, b) {
                for (; a[b = (b > 0 ? b : a.length) - 1].disabled;);
                return b
            },
            toDash: function(a) {
                return a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
            },
            triggerCallback: function(b, c) {
                var e = c.element,
                    f = c.options["on" + b],
                    g = [e].concat([].slice.call(arguments).slice(1));
                a.isFunction(f) && f.apply(e, g), a(e).trigger(d + "-" + this.toDash(b), g)
            },
            arrayToClassname: function(b) {
                var c = a.grep(b, function(a) {
                    return !!a
                });
                return a.trim(c.join(" "))
            }
        },
        init: function(b) {
            var c = this;
            if (c.options = a.extend(!0, {}, a.fn[d].defaults, c.options, b), c.utils.triggerCallback("BeforeInit", c), c.destroy(!0), c.options.disableOnMobile && c.utils.isMobile()) return void(c.disableOnMobile = !0);
            c.classes = c.getClassNames();
            var e = a("<input/>", {
                    class: c.classes.input,
                    readonly: c.utils.isMobile()
                }),
                f = a("<div/>", {
                    class: c.classes.items,
                    tabindex: -1
                }),
                g = a("<div/>", {
                    class: c.classes.scroll
                }),
                h = a("<div/>", {
                    class: c.classes.prefix,
                    html: c.options.arrowButtonMarkup
                }),
                i = a("<span/>", {
                    class: "label"
                }),
                j = c.$element.wrap("<div/>").parent().append(h.prepend(i), f, e),
                k = a("<div/>", {
                    class: c.classes.hideselect
                });
            c.elements = {
                input: e,
                items: f,
                itemsScroll: g,
                wrapper: h,
                label: i,
                outerWrapper: j
            }, c.options.nativeOnMobile && c.utils.isMobile() && (c.elements.input = void 0, k.addClass(c.classes.prefix + "-is-native"), c.$element.on("change", function() {
                c.refresh()
            })), c.$element.on(c.eventTriggers).wrap(k), c.originalTabindex = c.$element.prop("tabindex"), c.$element.prop("tabindex", !1), c.populate(), c.activate(), c.utils.triggerCallback("Init", c)
        },
        activate: function() {
            var a = this,
                b = a.elements.items.closest(":visible").children(":hidden").addClass(a.classes.tempshow),
                c = a.$element.width();
            b.removeClass(a.classes.tempshow), a.utils.triggerCallback("BeforeActivate", a), a.elements.outerWrapper.prop("class", a.utils.arrayToClassname([a.classes.wrapper, a.$element.prop("class").replace(/\S+/g, a.classes.prefix + "-$&"), a.options.responsive ? a.classes.responsive : ""])), a.options.inheritOriginalWidth && c > 0 && a.elements.outerWrapper.width(c), a.unbindEvents(), a.$element.prop("disabled") ? (a.elements.outerWrapper.addClass(a.classes.disabled), a.elements.input && a.elements.input.prop("disabled", !0)) : (a.state.enabled = !0, a.elements.outerWrapper.removeClass(a.classes.disabled), a.$li = a.elements.items.removeAttr("style").find("li"), a.bindEvents()), a.utils.triggerCallback("Activate", a)
        },
        getClassNames: function() {
            var b = this,
                c = b.options.customClass,
                d = {};
            return a.each(e.split(" "), function(a, e) {
                var f = c.prefix + e;
                d[e.toLowerCase()] = c.camelCase ? f : b.utils.toDash(f)
            }), d.prefix = c.prefix, d
        },
        setLabel: function() {
            var b = this,
                c = b.options.labelBuilder;
            if (b.state.multiple) {
                var d = a.isArray(b.state.currValue) ? b.state.currValue : [b.state.currValue];
                d = 0 === d.length ? [0] : d;
                var e = a.map(d, function(c) {
                    return a.grep(b.lookupItems, function(a) {
                        return a.index === c
                    })[0]
                });
                e = a.grep(e, function(b) {
                    return e.length > 1 || 0 === e.length ? "" !== a.trim(b.value) : b
                }), e = a.map(e, function(d) {
                    return a.isFunction(c) ? c(d) : b.utils.format(c, d)
                }), b.options.multiple.maxLabelEntries && (e.length >= b.options.multiple.maxLabelEntries + 1 ? (e = e.slice(0, b.options.multiple.maxLabelEntries), e.push(a.isFunction(c) ? c({
                    text: "..."
                }) : b.utils.format(c, {
                    text: "..."
                }))) : e.slice(e.length - 1)), b.elements.label.html(e.join(b.options.multiple.separator))
            } else {
                var f = b.lookupItems[b.state.currValue];
                b.elements.label.html(a.isFunction(c) ? c(f) : b.utils.format(c, f))
            }
        },
        populate: function() {
            var b = this,
                c = b.$element.children(),
                d = b.$element.find("option"),
                e = d.filter(":selected"),
                f = d.index(e),
                g = 0,
                h = b.state.multiple ? [] : 0;
            e.length > 1 && b.state.multiple && (f = [], e.each(function() {
                f.push(a(this).index())
            })), b.state.currValue = ~f ? f : h, b.state.selectedIdx = b.state.currValue, b.state.highlightedIdx = b.state.currValue, b.items = [], b.lookupItems = [], c.length && (c.each(function(c) {
                var d = a(this);
                if (d.is("optgroup")) {
                    var e = {
                        element: d,
                        label: d.prop("label"),
                        groupDisabled: d.prop("disabled"),
                        items: []
                    };
                    d.children().each(function(c) {
                        var d = a(this);
                        e.items[c] = b.getItemData(g, d, e.groupDisabled || d.prop("disabled")), b.lookupItems[g] = e.items[c], g++
                    }), b.items[c] = e
                } else b.items[c] = b.getItemData(g, d, d.prop("disabled")), b.lookupItems[g] = b.items[c], g++
            }), b.setLabel(), b.elements.items.append(b.elements.itemsScroll.html(b.getItemsMarkup(b.items))))
        },
        getItemData: function(b, c, d) {
            var e = this;
            return {
                index: b,
                element: c,
                value: c.val(),
                className: c.prop("class"),
                text: c.html(),
                slug: a.trim(e.utils.replaceDiacritics(c.html())),
                selected: c.prop("selected"),
                disabled: d
            }
        },
        getItemsMarkup: function(b) {
            var c = this,
                d = "<ul>";
            return a.isFunction(c.options.listBuilder) && c.options.listBuilder && (b = c.options.listBuilder(b)), a.each(b, function(b, e) {
                void 0 !== e.label ? (d += c.utils.format('<ul class="{1}"><li class="{2}">{3}</li>', c.utils.arrayToClassname([c.classes.group, e.groupDisabled ? "disabled" : "", e.element.prop("class")]), c.classes.grouplabel, e.element.prop("label")), a.each(e.items, function(a, b) {
                    d += c.getItemMarkup(b.index, b)
                }), d += "</ul>") : d += c.getItemMarkup(e.index, e)
            }), d + "</ul>"
        },
        getItemMarkup: function(b, c) {
            var d = this,
                e = d.options.optionsItemBuilder,
                f = {
                    value: c.value,
                    text: c.text,
                    slug: c.slug,
                    index: c.index
                };
            return d.utils.format('<li data-index="{1}" class="{2}">{3}</li>', b, d.utils.arrayToClassname([c.className, b === d.items.length - 1 ? "last" : "", c.disabled ? "disabled" : "", c.selected ? "selected" : ""]), a.isFunction(e) ? d.utils.format(e(c), c) : d.utils.format(e, f))
        },
        unbindEvents: function() {
            var a = this;
            a.elements.wrapper.add(a.$element).add(a.elements.outerWrapper).add(a.elements.input).off(f)
        },
        bindEvents: function() {
            var b = this;
            b.elements.outerWrapper.on("mouseenter" + f + " mouseleave" + f, function(c) {
                a(this).toggleClass(b.classes.hover, "mouseenter" === c.type), b.options.openOnHover && (clearTimeout(b.closeTimer), "mouseleave" === c.type ? b.closeTimer = setTimeout(a.proxy(b.close, b), b.options.hoverIntentTimeout) : b.open())
            }), b.elements.wrapper.on("click" + f, function(a) {
                b.state.opened ? b.close() : b.open(a)
            }), b.options.nativeOnMobile && b.utils.isMobile() || (b.$element.on("focus" + f, function() {
                b.elements.input.focus()
            }), b.elements.input.prop({
                tabindex: b.originalTabindex,
                disabled: !1
            }).on("keydown" + f, a.proxy(b.handleKeys, b)).on("focusin" + f, function(a) {
                b.elements.outerWrapper.addClass(b.classes.focus), b.elements.input.one("blur", function() {
                    b.elements.input.blur()
                }), b.options.openOnFocus && !b.state.opened && b.open(a)
            }).on("focusout" + f, function() {
                b.elements.outerWrapper.removeClass(b.classes.focus)
            }).on("input propertychange", function() {
                var c = b.elements.input.val(),
                    d = new RegExp("^" + b.utils.escapeRegExp(c), "i");
                clearTimeout(b.resetStr), b.resetStr = setTimeout(function() {
                    b.elements.input.val("")
                }, b.options.keySearchTimeout), c.length && a.each(b.items, function(a, c) {
                    if (!c.disabled && d.test(c.text) || d.test(c.slug)) return void b.highlight(a)
                })
            })), b.$li.on({
                mousedown: function(a) {
                    a.preventDefault(), a.stopPropagation()
                },
                click: function() {
                    return b.select(a(this).data("index")), !1
                }
            })
        },
        handleKeys: function(b) {
            var c = this,
                d = b.keyCode || b.which,
                e = c.options.keys,
                f = a.inArray(d, e.previous) > -1,
                g = a.inArray(d, e.next) > -1,
                h = a.inArray(d, e.select) > -1,
                i = a.inArray(d, e.open) > -1,
                j = c.state.highlightedIdx,
                k = f && 0 === j || g && j + 1 === c.items.length,
                l = 0;
            if (13 !== d && 32 !== d || b.preventDefault(), f || g) {
                if (!c.options.allowWrap && k) return;
                f && (l = c.utils.previousEnabledItem(c.lookupItems, j)), g && (l = c.utils.nextEnabledItem(c.lookupItems, j)), c.highlight(l)
            }
            return h && c.state.opened ? (c.select(j), void(c.state.multiple && c.options.multiple.keepMenuOpen || c.close())) : void(i && !c.state.opened && c.open())
        },
        refresh: function() {
            var a = this;
            a.populate(), a.activate(), a.utils.triggerCallback("Refresh", a)
        },
        setOptionsDimensions: function() {
            var a = this,
                b = a.elements.items.closest(":visible").children(":hidden").addClass(a.classes.tempshow),
                c = a.options.maxHeight,
                d = a.elements.items.outerWidth(),
                e = a.elements.wrapper.outerWidth() - (d - a.elements.items.width());
            !a.options.expandToItemText || e > d ? a.finalWidth = e : (a.elements.items.css("overflow", "scroll"), a.elements.outerWrapper.width(9e4), a.finalWidth = a.elements.items.width(), a.elements.items.css("overflow", ""), a.elements.outerWrapper.width("")), a.elements.items.width(a.finalWidth).height() > c && a.elements.items.height(c), b.removeClass(a.classes.tempshow)
        },
        isInViewport: function() {
            var a = this,
                b = c.scrollTop(),
                d = c.height(),
                e = a.elements.outerWrapper.offset().top,
                f = a.elements.outerWrapper.outerHeight(),
                g = e + f + a.itemsHeight <= b + d,
                h = e - a.itemsHeight > b,
                i = !g && h;
            a.elements.outerWrapper.toggleClass(a.classes.above, i)
        },
        detectItemVisibility: function(b) {
            var c = this;
            c.state.multiple && (b = a.isArray(b) && 0 === b.length ? 0 : b, b = a.isArray(b) ? Math.min.apply(Math, b) : b);
            var d = c.$li.eq(b).outerHeight(),
                e = c.$li[b].offsetTop,
                f = c.elements.itemsScroll.scrollTop(),
                g = e + 2 * d;
            c.elements.itemsScroll.scrollTop(g > f + c.itemsHeight ? g - c.itemsHeight : e - d < f ? e - d : f)
        },
        open: function(c) {
            var e = this;
            return (!e.options.nativeOnMobile || !e.utils.isMobile()) && (e.utils.triggerCallback("BeforeOpen", e), c && (c.preventDefault(), e.options.stopPropagation && c.stopPropagation()), void(e.state.enabled && (e.setOptionsDimensions(), a("." + e.classes.hideselect, "." + e.classes.open).children()[d]("close"), e.state.opened = !0, e.itemsHeight = e.elements.items.outerHeight(), e.itemsInnerHeight = e.elements.items.height(), e.elements.outerWrapper.addClass(e.classes.open), e.elements.input.val(""), c && "focusin" !== c.type && e.elements.input.focus(), setTimeout(function() {
                b.on("click" + f, a.proxy(e.close, e)).on("scroll" + f, a.proxy(e.isInViewport, e))
            }, 1), e.isInViewport(), e.options.preventWindowScroll && b.on("mousewheel" + f + " DOMMouseScroll" + f, "." + e.classes.scroll, function(b) {
                var c = b.originalEvent,
                    d = a(this).scrollTop(),
                    f = 0;
                "detail" in c && (f = c.detail * -1), "wheelDelta" in c && (f = c.wheelDelta), "wheelDeltaY" in c && (f = c.wheelDeltaY), "deltaY" in c && (f = c.deltaY * -1), (d === this.scrollHeight - e.itemsInnerHeight && f < 0 || 0 === d && f > 0) && b.preventDefault()
            }), e.detectItemVisibility(e.state.selectedIdx), e.highlight(e.state.multiple ? -1 : e.state.selectedIdx), e.utils.triggerCallback("Open", e))))
        },
        close: function() {
            var a = this;
            a.utils.triggerCallback("BeforeClose", a), b.off(f), a.elements.outerWrapper.removeClass(a.classes.open), a.state.opened = !1, a.utils.triggerCallback("Close", a)
        },
        change: function() {
            var b = this;
            b.utils.triggerCallback("BeforeChange", b), b.state.multiple ? (a.each(b.lookupItems, function(a) {
                b.lookupItems[a].selected = !1, b.$element.find("option").prop("selected", !1)
            }), a.each(b.state.selectedIdx, function(a, c) {
                b.lookupItems[c].selected = !0, b.$element.find("option").eq(c).prop("selected", !0)
            }), b.state.currValue = b.state.selectedIdx, b.setLabel(), b.utils.triggerCallback("Change", b)) : b.state.currValue !== b.state.selectedIdx && (b.$element.prop("selectedIndex", b.state.currValue = b.state.selectedIdx).data("value", b.lookupItems[b.state.selectedIdx].text), b.setLabel(), b.utils.triggerCallback("Change", b))
        },
        highlight: function(a) {
            var b = this,
                c = b.$li.filter("[data-index]").removeClass("highlighted");
            b.utils.triggerCallback("BeforeHighlight", b), void 0 === a || a === -1 || b.lookupItems[a].disabled || (c.eq(b.state.highlightedIdx = a).addClass("highlighted"), b.detectItemVisibility(a), b.utils.triggerCallback("Highlight", b))
        },
        select: function(b) {
            var c = this,
                d = c.$li.filter("[data-index]");
            if (c.utils.triggerCallback("BeforeSelect", c, b), void 0 !== b && b !== -1 && !c.lookupItems[b].disabled) {
                if (c.state.multiple) {
                    c.state.selectedIdx = a.isArray(c.state.selectedIdx) ? c.state.selectedIdx : [c.state.selectedIdx];
                    var e = a.inArray(b, c.state.selectedIdx);
                    e !== -1 ? c.state.selectedIdx.splice(e, 1) : c.state.selectedIdx.push(b), d.removeClass("selected").filter(function(b) {
                        return a.inArray(b, c.state.selectedIdx) !== -1
                    }).addClass("selected")
                } else d.removeClass("selected").eq(c.state.selectedIdx = b).addClass("selected");
                c.state.multiple && c.options.multiple.keepMenuOpen || c.close(), c.change(), c.utils.triggerCallback("Select", c, b)
            }
        },
        destroy: function(a) {
            var b = this;
            b.state && b.state.enabled && (b.elements.items.add(b.elements.wrapper).add(b.elements.input).remove(), a || b.$element.removeData(d).removeData("value"), b.$element.prop("tabindex", b.originalTabindex).off(f).off(b.eventTriggers).unwrap().unwrap(), b.state.enabled = !1)
        }
    }, a.fn[d] = function(b) {
        return this.each(function() {
            var c = a.data(this, d);
            c && !c.disableOnMobile ? "string" == typeof b && c[b] ? c[b]() : c.init(b) : a.data(this, d, new i(this, b))
        })
    }, a.fn[d].defaults = {
        onChange: function(b) {
            a(b).change()
        },
        maxHeight: 300,
        keySearchTimeout: 500,
        arrowButtonMarkup: '<b class="button">&#x25be;</b>',
        disableOnMobile: !1,
        nativeOnMobile: !0,
        openOnFocus: !0,
        openOnHover: !1,
        hoverIntentTimeout: 500,
        expandToItemText: !1,
        responsive: !1,
        preventWindowScroll: !0,
        inheritOriginalWidth: !1,
        allowWrap: !0,
        stopPropagation: !0,
        optionsItemBuilder: "{text}",
        labelBuilder: "{text}",
        listBuilder: !1,
        keys: {
            previous: [37, 38],
            next: [39, 40],
            select: [9, 13, 27],
            open: [13, 32, 37, 38, 39, 40],
            close: [9, 27]
        },
        customClass: {
            prefix: d,
            camelCase: !1
        },
        multiple: {
            separator: ", ",
            keepMenuOpen: !0,
            maxLabelEntries: !1
        }
    }
}), ! function(a) {
    "use strict";
    var b = function(b, c) {
        this.el = a(b), this.options = a.extend({}, a.fn.typed.defaults, c), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = !this.isInput && this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    b.prototype = {
        constructor: b,
        init: function() {
            var a = this;
            a.timeout = setTimeout(function() {
                for (var b = 0; b < a.strings.length; ++b) a.sequence[b] = b;
                a.shuffle && (a.sequence = a.shuffleArray(a.sequence)), a.typewrite(a.strings[a.sequence[a.arrayPos]], a.strPos)
            }, a.startDelay)
        },
        build: function() {
            var b = this;
            if (this.showCursor === !0 && (this.cursor = a('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                b.strings = [], this.stringsElement.hide();
                var c = this.stringsElement.find("p");
                a.each(c, function(c, d) {
                    b.strings.push(a(d).html())
                })
            }
            this.init()
        },
        typewrite: function(a, b) {
            if (this.stop !== !0) {
                var c = Math.round(70 * Math.random()) + this.typeSpeed,
                    d = this;
                d.timeout = setTimeout(function() {
                    var c = 0,
                        e = a.substr(b);
                    if ("^" === e.charAt(0)) {
                        var f = 1;
                        /^\^\d+/.test(e) && (e = /\d+/.exec(e)[0], f += e.length, c = parseInt(e)), a = a.substring(0, b) + a.substring(b + f)
                    }
                    if ("html" === d.contentType) {
                        var g = a.substr(b).charAt(0);
                        if ("<" === g || "&" === g) {
                            var h = "",
                                i = "";
                            for (i = "<" === g ? ">" : ";"; a.substr(b).charAt(0) !== i;) h += a.substr(b).charAt(0), b++;
                            b++, h += i
                        }
                    }
                    d.timeout = setTimeout(function() {
                        if (b === a.length) {
                            if (d.options.onStringTyped(d.arrayPos), d.arrayPos === d.strings.length - 1 && (d.options.callback(), d.curLoop++, d.loop === !1 || d.curLoop === d.loopCount)) return;
                            d.timeout = setTimeout(function() {
                                d.backspace(a, b)
                            }, d.backDelay)
                        } else {
                            0 === b && d.options.preStringTyped(d.arrayPos);
                            var c = a.substr(0, b + 1);
                            d.attr ? d.el.attr(d.attr, c) : d.isInput ? d.el.val(c) : "html" === d.contentType ? d.el.html(c) : d.el.text(c), b++, d.typewrite(a, b)
                        }
                    }, c)
                }, c)
            }
        },
        backspace: function(a, b) {
            if (this.stop !== !0) {
                var c = Math.round(70 * Math.random()) + this.backSpeed,
                    d = this;
                d.timeout = setTimeout(function() {
                    if ("html" === d.contentType && ">" === a.substr(b).charAt(0)) {
                        for (var c = "";
                            "<" !== a.substr(b).charAt(0);) c -= a.substr(b).charAt(0), b--;
                        b--, c += "<"
                    }
                    var e = a.substr(0, b);
                    d.attr ? d.el.attr(d.attr, e) : d.isInput ? d.el.val(e) : "html" === d.contentType ? d.el.html(e) : d.el.text(e), b > d.stopNum ? (b--, d.backspace(a, b)) : b <= d.stopNum && (d.arrayPos++, d.arrayPos === d.strings.length ? (d.arrayPos = 0, d.shuffle && (d.sequence = d.shuffleArray(d.sequence)), d.init()) : d.typewrite(d.strings[d.sequence[d.arrayPos]], b))
                }, c)
            }
        },
        shuffleArray: function(a) {
            var b, c, d = a.length;
            if (d)
                for (; --d;) c = Math.floor(Math.random() * (d + 1)), b = a[c], a[c] = a[d], a[d] = b;
            return a
        },
        reset: function() {
            var a = this;
            clearInterval(a.timeout);
            var b = this.el.attr("id");
            this.el.after('<span id="' + b + '"/>'), this.el.remove(), "undefined" != typeof this.cursor && this.cursor.remove(), a.options.resetCallback()
        },
        destroy: function() {
            var a = this;
            a.stop = !0, clearInterval(a.timeout), "undefined" != typeof this.cursor && this.cursor.remove()
        }
    }, a.fn.typed = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("typed"),
                f = "object" == typeof c && c;
            e || d.data("typed", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function() {},
        preStringTyped: function() {},
        onStringTyped: function() {},
        resetCallback: function() {}
    }
}(window.jQuery), ! function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return a.svg4everybody = b()
    }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b()
}(this, function() {
    function a(a, b) {
        if (b) {
            var c = document.createDocumentFragment(),
                d = !a.getAttribute("viewBox") && b.getAttribute("viewBox");
            d && a.setAttribute("viewBox", d);
            for (var e = b.cloneNode(!0); e.childNodes.length;) c.appendChild(e.firstChild);
            a.appendChild(c)
        }
    }

    function b(b) {
        b.onreadystatechange = function() {
            if (4 === b.readyState) {
                var c = b._cachedDocument;
                c || (c = b._cachedDocument = document.implementation.createHTMLDocument(""), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function(d) {
                    var e = b._cachedTarget[d.id];
                    e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.svg, e)
                })
            }
        }, b.onreadystatechange()
    }

    function c(c) {
        function d() {
            for (var c = 0; c < l.length;) {
                var g = l[c],
                    h = g.parentNode;
                if (h && /svg/i.test(h.nodeName)) {
                    var i = g.getAttribute("xlink:href");
                    if (e && (!f.validate || f.validate(i, h, g))) {
                        h.removeChild(g);
                        var m = i.split("#"),
                            n = m.shift(),
                            o = m.join("#");
                        if (n.length) {
                            var p = j[n];
                            p || (p = j[n] = new XMLHttpRequest, p.open("GET", n), p.send(), p._embeds = []), p._embeds.push({
                                svg: h,
                                id: o
                            }), b(p)
                        } else a(h, document.getElementById(o))
                    }
                } else ++c
            }
            k(d, 67)
        }
        var e, f = Object(c),
            g = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
            h = /\bAppleWebKit\/(\d+)\b/,
            i = /\bEdge\/12\.(\d+)\b/;
        e = "polyfill" in f ? f.polyfill : g.test(navigator.userAgent) || (navigator.userAgent.match(i) || [])[1] < 10547 || (navigator.userAgent.match(h) || [])[1] < 537;
        var j = {},
            k = window.requestAnimationFrame || setTimeout,
            l = document.getElementsByTagName("use");
        e && d()
    }
    return c
}), ! function(a, b) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : function() {
        var c = a.Ractive,
            d = b();
        return d.noConflict = function() {
            return a.Ractive = c, d
        }, a.Ractive = d
    }()
}(this, function() {
    "use strict";

    function a() {
        return mg.createDocumentFragment()
    }

    function b(a) {
        var b;
        if (a && "boolean" != typeof a) return lg && mg && a ? a.nodeType ? a : "string" == typeof a && (b = mg.getElementById(a), !b && mg.querySelector && (b = mg.querySelector(a)), b && b.nodeType) ? b : a[0] && a[0].nodeType ? a[0] : null : null
    }

    function c(a) {
        return a && "unknown" != typeof a.parentNode && a.parentNode && a.parentNode.removeChild(a), a
    }

    function d(a) {
        return null != a && a.toString ? "" + a : ""
    }

    function e(a) {
        return d(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    function f(a) {
        return a.replace(Kg, function(a) {
            return "-" + a.toLowerCase()
        })
    }

    function g(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        var d;
        return b.forEach(function(b) {
            for (d in b) Og.call(b, d) && (a[d] = b[d])
        }), a
    }

    function h(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return b.forEach(function(b) {
            for (var c in b) !Og.call(b, c) || c in a || (a[c] = b[c])
        }), a
    }

    function i(a) {
        return "[object Array]" === Pg.call(a)
    }

    function j(a, b) {
        return null === a && null === b || "object" != typeof a && "object" != typeof b && a === b
    }

    function k(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function l(a) {
        return a && "[object Object]" === Pg.call(a)
    }

    function m() {}

    function n(a, b) {
        return a.replace(/%s/g, function() {
            return b.shift()
        })
    }

    function o(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        throw a = n(a, b), new Error(a)
    }

    function p() {
        gg.DEBUG && Lg.apply(null, arguments)
    }

    function q(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        a = n(a, b), Mg(a, b)
    }

    function r(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        a = n(a, b), Qg[a] || (Qg[a] = !0, Mg(a, b))
    }

    function s() {
        gg.DEBUG && q.apply(null, arguments)
    }

    function t() {
        gg.DEBUG && r.apply(null, arguments)
    }

    function u(a, b, c) {
        var d = v(a, b, c);
        return d ? d[a][c] : null
    }

    function v(a, b, c) {
        for (; b;) {
            if (c in b[a]) return b;
            if (b.isolated) return null;
            b = b.parent
        }
    }

    function w(a, b, c, d) {
        if (a === b) return null;
        if (d) {
            var e = u("interpolators", c, d);
            if (e) return e(a, b) || null;
            o(Vg(d, "interpolator"))
        }
        return Wg.number(a, b) || Wg.array(a, b) || Wg.object(a, b) || null
    }

    function x(a) {
        return function() {
            return a
        }
    }

    function y(a, b) {
        var c = a.indexOf(b);
        c === -1 && a.push(b)
    }

    function z(a, b) {
        for (var c = 0, d = a.length; c < d; c++)
            if (a[c] == b) return !0;
        return !1
    }

    function A(a, b) {
        var c;
        if (!i(a) || !i(b)) return !1;
        if (a.length !== b.length) return !1;
        for (c = a.length; c--;)
            if (a[c] !== b[c]) return !1;
        return !0
    }

    function B(a) {
        return "string" == typeof a ? [a] : void 0 === a ? [] : a
    }

    function C(a) {
        return a[a.length - 1]
    }

    function D(a, b) {
        if (a) {
            var c = a.indexOf(b);
            c !== -1 && a.splice(c, 1)
        }
    }

    function E(a) {
        for (var b = [], c = a.length; c--;) b[c] = a[c];
        return b
    }

    function F(a) {
        setTimeout(a, 0)
    }

    function G(a, b) {
        return function() {
            for (var c; c = a.shift();) c(b)
        }
    }

    function H(a, b, c, d) {
        var e;
        if (b === a) throw new TypeError("A promise's fulfillment handler cannot return the same promise");
        if (b instanceof Zg) b.then(c, d);
        else if (!b || "object" != typeof b && "function" != typeof b) c(b);
        else {
            try {
                e = b.then
            } catch (a) {
                return void d(a)
            }
            if ("function" == typeof e) {
                var f, g, h;
                g = function(b) {
                    f || (f = !0, H(a, b, c, d))
                }, h = function(a) {
                    f || (f = !0, d(a))
                };
                try {
                    e.call(b, g, h)
                } catch (a) {
                    if (!f) return d(a), void(f = !0)
                }
            } else c(b)
        }
    }

    function I(a) {
        a.detach()
    }

    function J(a) {
        a.detachNodes()
    }

    function K(a) {
        !a.ready || a.outros.length || a.outroChildren || (a.outrosComplete || (a.outrosComplete = !0, a.parent && !a.parent.outrosComplete ? a.parent.decrementOutros(a) : a.detachNodes()), a.intros.length || a.totalChildren || ("function" == typeof a.callback && a.callback(), a.parent && !a.notifiedTotal && (a.notifiedTotal = !0, a.parent.decrementTotal())))
    }

    function L(a) {
        var b, c, d = a.detachQueue,
            e = M(a),
            f = d.length,
            g = 0;
        a: for (; f--;) {
            for (b = d[f].node, g = e.length; g--;)
                if (c = e[g].element.node, c === b || c.contains(b) || b.contains(c)) continue a;
            d[f].detach(), d.splice(f, 1)
        }
    }

    function M(a, b) {
        if (b) {
            for (var c = a.children.length; c--;) b = M(a.children[c], b);
            return b = b.concat(a.outros)
        }
        b = [];
        for (var d = a; d.parent;) d = d.parent;
        return M(d, b)
    }

    function N(a) {
        a.dispatch()
    }

    function O() {
        var a = dh.immediateObservers;
        dh.immediateObservers = [], a.forEach(N);
        var b, c = dh.fragments.length;
        a = dh.fragments, dh.fragments = [];
        var d = dh.ractives;
        for (dh.ractives = []; c--;) {
            b = a[c];
            var e = b.ractive;
            Object.keys(e.viewmodel.changes).length && eh.fire(e, e.viewmodel.changes), e.viewmodel.changes = {}, D(d, e), b.update()
        }
        for (c = d.length; c--;) {
            var f = d[c];
            eh.fire(f, f.viewmodel.changes), f.viewmodel.changes = {}
        }
        dh.transitionManager.ready(), a = dh.deferredObservers, dh.deferredObservers = [], a.forEach(N);
        var g = dh.tasks;
        for (dh.tasks = [], c = 0; c < g.length; c += 1) g[c]();
        if (dh.fragments.length || dh.immediateObservers.length || dh.deferredObservers.length || dh.ractives.length || dh.tasks.length) return O()
    }

    function P(a) {
        return "string" == typeof a ? a.replace(ih, "\\$&") : a
    }

    function Q(a) {
        return a ? a.replace(gh, ".$1") : ""
    }

    function R(a) {
        var b, c = [];
        for (a = Q(a); b = hh.exec(a);) {
            var d = b.index + b[1].length;
            c.push(a.substr(0, d)), a = a.substr(d + 1)
        }
        return c.push(a), c
    }

    function S(a) {
        return "string" == typeof a ? a.replace(jh, "$1$2") : a
    }

    function T(a, b) {
        if (!/this/.test(a.toString())) return a;
        var c = a.bind(b);
        for (var d in a) c[d] = a[d];
        return c
    }

    function U(a, b) {
        for (var c = fh.start(a, !0), d = b.length; d--;) {
            var e = b[d],
                f = e[0],
                g = e[1];
            "function" == typeof g && (g = T(g, a)), f.set(g)
        }
        return fh.end(), c
    }

    function V(a, b, c) {
        return void 0 === c && (c = a.viewmodel), kh.test(b) ? c.findMatches(R(b)) : [c.joinAll(R(b))]
    }

    function W(a, b, c) {
        var d = [];
        if (l(b)) {
            var e = function(c) {
                b.hasOwnProperty(c) && d.push.apply(d, V(a, c).map(function(a) {
                    return [a, b[c]]
                }))
            };
            for (var f in b) e(f)
        } else d.push.apply(d, V(a, b).map(function(a) {
            return [a, c]
        }));
        return d
    }

    function X(a, b, c) {
        if ("string" != typeof b || !k(c)) throw new Error("Bad arguments");
        var d = W(a, b, c);
        return U(a, d.map(function(a) {
            var b = a[0],
                c = a[1],
                d = b.get();
            if (!k(c) || !k(d)) throw new Error(lh);
            return [b, d + c]
        }))
    }

    function Y(a, b) {
        return X(this, a, void 0 === b ? 1 : +b)
    }

    function Z(a, b) {
        a = a || {};
        var c;
        return a.easing && (c = "function" == typeof a.easing ? a.easing : b.easing[a.easing]), {
            easing: c || nh,
            duration: "duration" in a ? a.duration : 400,
            complete: a.complete || m,
            step: a.step || m
        }
    }

    function $(a, b, c, d) {
        d = Z(d, a);
        var e = b.get();
        if (j(e, c)) return d.complete(d.to), mh;
        var f = w(e, c, a, d.interpolator);
        return f ? b.animate(e, c, d, f) : (fh.start(), b.set(c), fh.end(), mh)
    }

    function _(a, b, c) {
        if ("object" == typeof a) {
            var d = Object.keys(a);
            throw new Error("ractive.animate(...) no longer supports objects. Instead of ractive.animate({\n  " + d.map(function(b) {
                return "'" + b + "': " + a[b]
            }).join("\n  ") + "\n}, {...}), do\n\n" + d.map(function(b) {
                return "ractive.animate('" + b + "', " + a[b] + ", {...});"
            }).join("\n") + "\n")
        }
        return $(this, this.viewmodel.joinAll(R(a)), b, c)
    }

    function aa() {
        return this.isDetached ? this.el : (this.el && D(this.el.__ractive_instances__, this), this.el = this.fragment.detach(), this.isDetached = !0, oh.fire(this), this.el)
    }

    function ba(a) {
        if (!this.el) throw new Error("Cannot call ractive.find('" + a + "') unless instance is rendered to the DOM");
        return this.fragment.find(a)
    }

    function ca(a, b) {
        if (a.compareDocumentPosition) {
            var c = a.compareDocumentPosition(b);
            return 2 & c ? 1 : -1
        }
        return da(a, b)
    }

    function da(a, b) {
        for (var c, d = fa(a.component || a._ractive.proxy), e = fa(b.component || b._ractive.proxy), f = C(d), g = C(e); f && f === g;) d.pop(), e.pop(), c = f, f = C(d), g = C(e);
        f = f.component || f, g = g.component || g;
        var h = f.parentFragment,
            i = g.parentFragment;
        if (h === i) {
            var j = h.items.indexOf(f),
                k = i.items.indexOf(g);
            return j - k || d.length - e.length
        }
        var l = c.iterations;
        if (l) {
            var m = l.indexOf(h),
                n = l.indexOf(i);
            return m - n || d.length - e.length
        }
        throw new Error("An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/ractivejs/ractive/issues - thanks!")
    }

    function ea(a) {
        var b = a.parentFragment;
        return b ? b.owner : a.component && (b = a.component.parentFragment) ? b.owner : void 0
    }

    function fa(a) {
        for (var b = [a], c = ea(a); c;) b.push(c), c = ea(c);
        return b
    }

    function ga(a, b) {
        if (!this.el) throw new Error("Cannot call ractive.findAll('" + a + "', ...) unless instance is rendered to the DOM");
        b = b || {};
        var c = this._liveQueries,
            d = c[a];
        return d ? b && b.live ? d : d.slice() : (d = new ph(this, a, !!b.live, !1), d.live && (c.push(a), c["_" + a] = d), this.fragment.findAll(a, d), d.init(), d.result)
    }

    function ha(a, b) {
        b = b || {};
        var c = this._liveComponentQueries,
            d = c[a];
        return d ? b && b.live ? d : d.slice() : (d = new ph(this, a, !!b.live, !0), d.live && (c.push(a), c["_" + a] = d), this.fragment.findAllComponents(a, d), d.init(), d.result)
    }

    function ia(a) {
        return this.fragment.findComponent(a)
    }

    function ja(a) {
        return this.container ? this.container.component && this.container.component.name === a ? this.container : this.container.findContainer(a) : null
    }

    function ka(a) {
        return this.parent ? this.parent.component && this.parent.component.name === a ? this.parent : this.parent.findParent(a) : null
    }

    function la(a, b) {
        a.event && a._eventQueue.push(a.event), a.event = b
    }

    function ma(a) {
        a._eventQueue.length ? a.event = a._eventQueue.pop() : a.event = null
    }

    function na(a) {
        var b, c, d, e, f, g;
        for (b = R(a), (c = rh[b.length]) || (c = oa(b.length)), f = [], d = function(a, c) {
                return a ? "*" : b[c]
            }, e = c.length; e--;) g = c[e].map(d).join("."), f.hasOwnProperty(g) || (f.push(g), f[g] = !0);
        return f
    }

    function oa(a) {
        var b, c, d, e, f, g, h, i, j = "";
        if (!rh[a]) {
            for (d = []; j.length < a;) j += 1;
            for (b = parseInt(j, 2), e = function(a) {
                    return "1" === a
                }, f = 0; f <= b; f += 1) {
                for (c = f.toString(2); c.length < a;) c = "0" + c;
                for (i = [], h = c.length, g = 0; g < h; g++) i.push(e(c[g]));
                d[f] = i
            }
            rh[a] = d
        }
        return rh[a]
    }

    function pa(a, b, c) {
        if (void 0 === c && (c = {}), b) {
            c.event ? c.event.name = b : c.event = {
                name: b,
                _noArg: !0
            };
            var d = qa(b);
            return ra(a, d, c.event, c.args, !0)
        }
    }

    function qa(a) {
        return sh.hasOwnProperty(a) ? sh[a] : sh[a] = na(a)
    }

    function ra(a, b, c, d, e) {
        void 0 === e && (e = !1);
        var f, g, h = !0;
        for (la(a, c), g = b.length; g >= 0; g--) f = a._subs[b[g]], f && (h = sa(a, f, c, d) && h);
        if (ma(a), a.parent && h) {
            if (e && a.component) {
                var i = a.component.name + "." + b[b.length - 1];
                b = qa(i), c && !c.component && (c.component = a)
            }
            ra(a.parent, b, c, d)
        }
        return h
    }

    function sa(a, b, c, d) {
        var e = null,
            f = !1;
        c && !c._noArg && (d = [c].concat(d)), b = b.slice();
        for (var g = 0, h = b.length; g < h; g += 1) b[g].off || b[g].apply(a, d) !== !1 || (f = !0);
        return c && !c._noArg && f && (e = c.original) && (e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation()), !f
    }

    function ta(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return pa(this, a, {
            args: b
        })
    }

    function ua(a) {
        throw new Error("An index or key reference (" + a + ") cannot have child properties")
    }

    function va(a, b) {
        for (var c, d, e, f = a.findContext().root, g = R(b), h = g[0]; a;) {
            if (a.isIteration) {
                if (h === a.parent.keyRef) return g.length > 1 && ua(h), a.context.getKeyModel(a.key);
                if (h === a.parent.indexRef) return g.length > 1 && ua(h), a.context.getKeyModel(a.index)
            }
            if (((e = a.owner.aliases) || (e = a.aliases)) && e.hasOwnProperty(h)) {
                var i = e[h];
                if (1 === g.length) return i;
                if ("function" == typeof i.joinAll) return i.joinAll(g.slice(1))
            }
            if (a.context && (a.isRoot && !a.ractive.component || (c = !0), a.context.has(h))) return d ? f.createLink(h, a.context.joinKey(g.shift()), h).joinAll(g) : a.context.joinAll(g);
            a.componentParent && !a.ractive.isolated ? (a = a.componentParent, d = !0) : a = a.parent
        }
        if (!c) return f.joinAll(g)
    }

    function wa() {
        th.push(qh = [])
    }

    function xa() {
        var a = th.pop();
        return qh = th[th.length - 1], a
    }

    function ya(a) {
        qh && qh.push(a)
    }

    function za(a) {
        a.bind()
    }

    function Aa(a) {
        a.cancel()
    }

    function Ba(a) {
        a.handleChange()
    }

    function Ca(a) {
        a.mark()
    }

    function Da(a) {
        a.marked()
    }

    function Ea(a) {
        a.notifiedUpstream()
    }

    function Fa(a) {
        a.render()
    }

    function Ga(a) {
        a.teardown()
    }

    function Ha(a) {
        a.unbind()
    }

    function Ia(a) {
        a.unrender()
    }

    function Ja(a) {
        a.unrender(!0)
    }

    function Ka(a) {
        a.update()
    }

    function La(a) {
        return a.toString()
    }

    function Ma(a) {
        return a.toString(!0)
    }

    function Na(a) {
        a.updateFromBindings(!0)
    }

    function Oa(a) {
        for (var b = a.length; b--;)
            if (a[b].bound) {
                var c = a[b].owner;
                if (c) {
                    var d = "checked" === c.name ? c.node.checked : c.node.value;
                    return {
                        value: d
                    }
                }
            }
    }

    function Pa(a) {
        if (a) {
            var b = xh[a];
            xh[a] = [];
            for (var c = b.length; c--;) b[c]();
            var d = yh[a];
            for (yh[a] = [], c = d.length; c--;) d[c].model.register(d[c].item)
        } else Pa("early"), Pa("mark")
    }

    function Qa(a, b, c) {
        var d = a.r || a;
        if (!d || "string" != typeof d) return b;
        if ("." === d || "@" === d[0] || (b || c).isKey || (b || c).isKeypath) return b;
        for (var e = d.split("/"), f = R(e[e.length - 1]), g = b || c, h = f.length, i = !0, j = !1; g && h--;) g.shuffling && (j = !0), f[h] != g.key && (i = !1), g = g.parent;
        return !b && i && j ? c : b && !i && j ? c : b
    }

    function Ra() {
        fh.start();
        var a, b, c = Dh();
        for (a = 0; a < Eh.length; a += 1) b = Eh[a], b.tick(c) || Eh.splice(a--, 1);
        fh.end(), Eh.length ? Ch(Ra) : Fh = !1
    }

    function Sa(a, b) {
        var c, d = {};
        if (!b) return a;
        b += ".";
        for (c in a) a.hasOwnProperty(c) && (d[b + c] = a[c]);
        return d
    }

    function Ta(a) {
        var b;
        return Hh[a] || (b = a ? a + "." : "", Hh[a] = function(c, d) {
            var e;
            return "string" == typeof c ? (e = {}, e[b + c] = d, e) : "object" == typeof c ? b ? Sa(c, a) : c : void 0
        }), Hh[a]
    }

    function Ua(a) {
        for (var b = [], c = 0; c < a.length; c++) b[c] = (a.childByKey[c] || {}).value;
        return b
    }

    function Va(a, b) {
        var c = a.findContext();
        if ("." === b || "this" === b) return c;
        if (0 === b.indexOf("@keypath")) {
            var d = Lh.exec(b);
            if (d && d[1]) {
                var e = Va(a, d[1]);
                if (e) return e.getKeypathModel()
            }
            return c.getKeypathModel()
        }
        if (0 === b.indexOf("@rootpath")) {
            for (; c.isRoot && c.ractive.component;) c = c.ractive.component.parentFragment.findContext();
            var f = Lh.exec(b);
            if (f && f[1]) {
                var g = Va(a, f[1]);
                if (g) return g.getKeypathModel(a.ractive.root)
            }
            return c.getKeypathModel(a.ractive.root)
        }
        if ("@index" === b || "@key" === b) {
            var h = a.findRepeatingFragment();
            if (!h.isIteration) return;
            return h.context.getKeyModel(h["i" === b[1] ? "index" : "key"])
        }
        if ("@this" === b) return a.ractive.viewmodel.getRactiveModel();
        if ("@global" === b) return Kh;
        if ("~" === b[0]) return a.ractive.viewmodel.joinAll(R(b.slice(2)));
        if ("." === b[0]) {
            for (var i = b.split("/");
                "." === i[0] || ".." === i[0];) {
                var j = i.shift();
                ".." === j && (c = c.parent)
            }
            return b = i.join("/"), "." === b[0] && (b = b.slice(1)), c.joinAll(R(b))
        }
        return va(a, b)
    }

    function Wa(a, b) {
        if ("string" != typeof a) return this.viewmodel.get(!0, a);
        var c, d = R(a),
            e = d[0];
        return this.viewmodel.has(e) || this.component && !this.isolated && (c = Va(this.component.parentFragment, e), c && this.viewmodel.map(e, c)), c = this.viewmodel.joinAll(d), c.get(!0, b)
    }

    function Xa(a) {
        for (var b = {}, c = {}; a;) {
            if (a.parent && (a.parent.indexRef || a.parent.keyRef)) {
                var d = a.parent.indexRef;
                !d || d in c || (c[d] = a.index), d = a.parent.keyRef, !d || d in b || (b[d] = a.key)
            }
            a = a.componentParent && !a.ractive.isolated ? a.componentParent : a.parent
        }
        return {
            key: b,
            index: c
        }
    }

    function Ya(a, b, c) {
        var d, e, f, g, h, i = [];
        if (d = Za(a, b, c), !d) return null;
        for (g = d.length - 2 - d[1], e = Math.min(a, d[0]), f = e + d[1], i.startIndex = e, h = 0; h < e; h += 1) i.push(h);
        for (; h < f; h += 1) i.push(-1);
        for (; h < a; h += 1) i.push(h + g);
        return 0 !== g ? i.touchedFrom = d[0] : i.touchedFrom = a, i
    }

    function Za(a, b, c) {
        switch (b) {
            case "splice":
                for (void 0 !== c[0] && c[0] < 0 && (c[0] = a + Math.max(c[0], -a)), void 0 === c[0] && (c[0] = 0); c.length < 2;) c.push(a - c[0]);
                return "number" != typeof c[1] && (c[1] = a - c[0]), c[1] = Math.min(c[1], a - c[0]), c;
            case "sort":
            case "reverse":
                return null;
            case "pop":
                return a ? [a - 1, 1] : [0, 0];
            case "push":
                return [a, 0].concat(c);
            case "shift":
                return [0, a ? 1 : 0];
            case "unshift":
                return [0, 0].concat(c)
        }
    }

    function $a(a) {
        function b(a) {
            for (var b = [], d = arguments.length - 1; d-- > 0;) b[d] = arguments[d + 1];
            return c(this.viewmodel.joinAll(R(a)), b)
        }

        function c(b, c) {
            var d = b.get();
            if (!i(d)) {
                if (void 0 === d) {
                    d = [];
                    var e = Mh[a].apply(d, c),
                        f = fh.start(this, !0).then(function() {
                            return e
                        });
                    return b.set(d), fh.end(), f
                }
                throw new Error("shuffle array method " + a + " called on non-array at " + b.getKeypath())
            }
            var g = Ya(d.length, a, c),
                h = Mh[a].apply(d, c),
                j = fh.start(this, !0).then(function() {
                    return h
                });
            return j.result = h, g ? b.shuffle(g) : b.set(h), fh.end(), j
        }
        return {
            path: b,
            model: c
        }
    }

    function _a(a) {
        if (!a) return null;
        if (a === !0) return JSON.stringify;
        if ("function" == typeof a) return a;
        if ("string" == typeof a) return Nh[a] || (Nh[a] = function(b) {
            return b[a]
        });
        throw new Error("If supplied, options.compare must be a string, function, or `true`")
    }

    function ab(a, b, c, d) {
        var e = fh.start(a, !0),
            f = b.get();
        if (!i(f) || !i(c)) throw new Error("You cannot merge an array with a non-array");
        var g = _a(d && d.compare);
        return b.merge(c, g), fh.end(), e
    }

    function bb(a, b, c) {
        return ab(this, this.viewmodel.joinAll(R(a)), b, c)
    }

    function cb(a, b) {
        b.parent && b.parent.wrapper && b.parent.adapt();
        var c = fh.start(a, !0);
        if (b.mark(), b.registerChange(b.getKeypath(), b.get()), !b.isRoot)
            for (var d = b.parent, e = b.key; d && !d.isRoot;) d.clearUnresolveds && d.clearUnresolveds(e), e = d.key, d = d.parent;
        return b.notifyUpstream(), fh.end(), Oh.fire(a, b), c
    }

    function db(a) {
        return a && (a = R(a)), cb(this, a ? this.viewmodel.joinAll(a) : this.viewmodel)
    }

    function eb(a, b, c) {
        var d = [];
        if (l(b))
            for (var e in b) b.hasOwnProperty(e) && d.push([hb(a, e).model, b[e]]);
        else d.push([hb(a, b).model, c]);
        return d
    }

    function fb(a) {
        if (!a) return this._element.parentFragment.findContext().get(!0);
        var b = Va(this._element.parentFragment, a);
        return b ? b.get(!0) : void 0
    }

    function gb(a, b) {
        var c = hb(this, a),
            d = c.model,
            e = c.instance;
        return d ? d.getKeypath(b || e) : a
    }

    function hb(a, b) {
        var c = a._element.parentFragment;
        return "string" != typeof b ? {
            model: c.findContext(),
            instance: b
        } : {
            model: Va(c, b),
            instance: c.ractive
        }
    }

    function ib(a, b) {
        if (void 0 === b && (b = 1), !k(b)) throw new Error("Bad arguments");
        return U(this.ractive, eb(this, a, b).map(function(a) {
            var b = a[0],
                c = a[1],
                d = b.get();
            if (!k(c) || !k(d)) throw new Error("Cannot add non-numeric value");
            return [b, d + c]
        }))
    }

    function jb(a, b, c) {
        var d = hb(this, a).model;
        return $(this.ractive, d, b, c)
    }

    function kb(a, b) {
        var c = hb(this, a).model,
            d = hb(this, b).model,
            e = fh.start(this.ractive, !0);
        return d.link(c, a), fh.end(), e
    }

    function lb(a, b, c) {
        return ab(this.ractive, hb(this, a).model, b, c)
    }

    function mb(a) {
        return Qh(hb(this, a).model, [])
    }

    function nb(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return Ph(hb(this, a).model, b)
    }

    function ob(a) {
        return Vh(hb(this, a).model, [])
    }

    function pb(a, b) {
        return U(this.ractive, eb(this, a, b))
    }

    function qb(a) {
        return Rh(hb(this, a).model, [])
    }

    function rb(a, b, c) {
        for (var d = [], e = arguments.length - 3; e-- > 0;) d[e] = arguments[e + 3];
        return d.unshift(b, c), Uh(hb(this, a).model, d)
    }

    function sb(a) {
        return Th(hb(this, a).model, [])
    }

    function tb(a, b) {
        if (void 0 === b && (b = 1), !k(b)) throw new Error("Bad arguments");
        return U(this.ractive, eb(this, a, b).map(function(a) {
            var b = a[0],
                c = a[1],
                d = b.get();
            if (!k(c) || !k(d)) throw new Error("Cannot add non-numeric value");
            return [b, d - c]
        }))
    }

    function ub(a) {
        var b = hb(this, a),
            c = b.model;
        return U(this.ractive, [
            [c, !c.get()]
        ])
    }

    function vb(a) {
        var b = hb(this, a).model,
            c = fh.start(this.ractive, !0);
        return b.owner && b.owner._link && b.owner.unlink(), fh.end(), c
    }

    function wb(a) {
        for (var b = [], c = arguments.length - 1; c-- > 0;) b[c] = arguments[c + 1];
        return Sh(hb(this, a).model, b)
    }

    function xb(a) {
        return cb(this.ractive, hb(this, a).model)
    }

    function yb(a, b) {
        var c = hb(this, a),
            d = c.model,
            e = fh.start(this.ractive, !0);
        return d.updateFromBindings(b), fh.end(), e
    }

    function zb() {
        var a = Cb(this),
            b = a.model;
        return !!b
    }

    function Ab(a) {
        var b = Cb(this),
            c = b.model,
            d = b.instance;
        if (c) return c.getKeypath(a || d)
    }

    function Bb() {
        var a = Cb(this),
            b = a.model;
        if (b) return b.get(!0)
    }

    function Cb(a) {
        var b = a._element;
        return {
            model: b.binding && b.binding.model,
            instance: b.parentFragment.ractive
        }
    }

    function Db(a) {
        var b = Cb(this),
            c = b.model;
        return U(this.ractive, [
            [c, a]
        ])
    }

    function Eb() {
        return t("Object property keypath is deprecated, please use resolve() instead."), this.resolve()
    }

    function Fb() {
        return t("Object property rootpath is deprecated, please use resolve( ractive.root ) instead."), this.resolve(this.ractive.root)
    }

    function Gb() {
        return t("Object property context is deprecated, please use get() instead."), this.get()
    }

    function Hb() {
        return t('Object property index is deprecated, you can use get( "indexName" ) instead.'), Xa(this._element.parentFragment).index
    }

    function Ib() {
        return t('Object property key is deprecated, you can use get( "keyName" ) instead.'), Xa(this._element.parentFragment).key
    }

    function Jb(a, b) {
        return Jg(a, {
            _element: {
                value: b
            },
            ractive: {
                value: b.parentFragment.ractive
            },
            resolve: {
                value: gb
            },
            get: {
                value: fb
            },
            add: {
                value: ib
            },
            animate: {
                value: jb
            },
            link: {
                value: kb
            },
            merge: {
                value: lb
            },
            pop: {
                value: mb
            },
            push: {
                value: nb
            },
            reverse: {
                value: ob
            },
            set: {
                value: pb
            },
            shift: {
                value: qb
            },
            sort: {
                value: sb
            },
            splice: {
                value: rb
            },
            subtract: {
                value: tb
            },
            toggle: {
                value: ub
            },
            unlink: {
                value: vb
            },
            unshift: {
                value: wb
            },
            update: {
                value: xb
            },
            updateModel: {
                value: yb
            },
            isBound: {
                value: zb
            },
            getBindingPath: {
                value: Ab
            },
            getBinding: {
                value: Bb
            },
            setBinding: {
                value: Db
            },
            keypath: {
                get: Eb
            },
            rootpath: {
                get: Fb
            },
            context: {
                get: Gb
            },
            index: {
                get: Hb
            },
            key: {
                get: Ib
            }
        }), a
    }

    function Kb(a) {
        if ("string" == typeof a && Wh && (a = Wh.call(document, a)), !a || !a._ractive) return {};
        var b = a._ractive;
        return Jb({}, b.proxy)
    }

    function Lb(a) {
        return "string" == typeof a && (a = this.find(a)), Kb(a)
    }

    function Mb(a, c) {
        if (!this.fragment.rendered) throw new Error("The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.");
        if (a = b(a), c = b(c) || null, !a) throw new Error("You must specify a valid target to insert into");
        a.insertBefore(this.detach(), c), this.el = a, (a.__ractive_instances__ || (a.__ractive_instances__ = [])).push(this), this.isDetached = !1, Nb(this)
    }

    function Nb(a) {
        Xh.fire(a), a.findAllComponents("*").forEach(function(a) {
            Nb(a.instance)
        })
    }

    function Ob(a, b) {
        if (b === a || 0 === (a + ".").indexOf(b + ".") || 0 === (b + ".").indexOf(a + ".")) throw new Error("A keypath cannot be linked to itself.");
        var c, d = fh.start(),
            e = R(a);
        return !this.viewmodel.has(e[0]) && this.component && (c = Va(this.component.parentFragment, e[0]), c = c.joinAll(e.slice(1))), this.viewmodel.joinAll(R(b)).link(c || this.viewmodel.joinAll(e), a), fh.end(), d
    }

    function Pb(a, b, c) {
        var d, e = this,
            f = [];
        if (l(a)) d = a, c = b || {}, Object.keys(d).forEach(function(a) {
            var b = d[a],
                g = a.split(" ");
            g.length > 1 && (g = g.filter(function(a) {
                return a
            })), g.forEach(function(a) {
                f.push(Qb(e, a, b, c))
            })
        });
        else {
            var g;
            "function" == typeof a ? (c = b, b = a, g = [""]) : g = a.split(" "), g.length > 1 && (g = g.filter(function(a) {
                return a
            })), g.forEach(function(a) {
                f.push(Qb(e, a, b, c || {}))
            })
        }
        return this._observers.push.apply(this._observers, f), {
            cancel: function() {
                f.forEach(function(a) {
                    D(e._observers, a), a.cancel()
                })
            }
        }
    }

    function Qb(a, b, c, d) {
        var e = a.viewmodel,
            f = R(b),
            g = f.indexOf("*");
        if (d.keypath = b, !~g) {
            var h, i = f[0];
            return "" === i || e.has(i) ? h = e.joinAll(f) : a.component && !a.isolated && (h = Va(a.component.parentFragment, i), h && (e.map(i, h), h = e.joinAll(f))), new Zh(a, h, c, d)
        }
        var j = 0 === g ? e : e.joinAll(f.slice(0, g));
        return new $h(a, j, f.splice(g), c, d)
    }

    function Rb(a, b, c) {
        if ("string" != typeof a) throw new Error("ractive.observeList() must be passed a string as its first argument");
        var d = this.viewmodel.joinAll(R(a)),
            e = new _h(this, d, b, c || {});
        return this._observers.push(e), {
            cancel: function() {
                e.cancel()
            }
        }
    }

    function Sb() {
        return -1
    }

    function Tb(a, b, c) {
        return l(a) || "function" == typeof a ? (c = g(b || {}, ai), this.observe(a, c)) : (c = g(c || {}, ai), this.observe(a, b, c))
    }

    function Ub(a) {
        return a.trim()
    }

    function Vb(a) {
        return "" !== a
    }

    function Wb(a, b) {
        var c = this;
        if (a) {
            var d = a.split(" ").map(Ub).filter(Vb);
            d.forEach(function(a) {
                var d = c._subs[a];
                if (d)
                    if (b) {
                        b.off = !0;
                        var e = d.indexOf(b);
                        e !== -1 && d.splice(e, 1)
                    } else c._subs[a] = []
            })
        } else
            for (a in this._subs) delete this._subs[a];
        return this
    }

    function Xb(a, b) {
        var c = this;
        if ("object" == typeof a) {
            var d, e = [];
            for (d in a) a.hasOwnProperty(d) && e.push(this.on(d, a[d]));
            return {
                cancel: function() {
                    for (var a; a = e.pop();) a.cancel()
                }
            }
        }
        var f = a.split(" ").map(Ub).filter(Vb);
        return f.forEach(function(a) {
            (c._subs[a] || (c._subs[a] = [])).push(b)
        }), {
            cancel: function() {
                return c.off(a, b)
            }
        }
    }

    function Yb(a, b) {
        var c = this.on(a, function() {
            b.apply(this, arguments), c.cancel()
        });
        return c
    }

    function Zb(a) {
        ei.push(a), fi = !0
    }

    function $b() {
        mg && fi && (hi ? gi.styleSheet.cssText = _b(null) : gi.innerHTML = _b(null), fi = !1)
    }

    function _b(a) {
        var b = a ? ei.filter(function(b) {
            return ~a.indexOf(b.id)
        }) : ei;
        return b.reduce(function(a, b) {
            return "" + a + "\n\n/* {" + b.id + "} */\n" + b.styles
        }, di)
    }

    function ac(a, c, d, e) {
        var f = a.transitionsEnabled;
        a.noIntro && (a.transitionsEnabled = !1);
        var g = fh.start(a, !0);
        if (fh.scheduleTask(function() {
                return ki.fire(a)
            }, !0), a.fragment.rendered) throw new Error("You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first");
        if (d = b(d) || a.anchor, a.el = c, a.anchor = d, a.cssId && $b(), c)
            if ((c.__ractive_instances__ || (c.__ractive_instances__ = [])).push(a), d) {
                var h = mg.createDocumentFragment();
                a.fragment.render(h), c.insertBefore(h, d)
            } else a.fragment.render(c, e);
        return fh.end(), a.transitionsEnabled = f, g.then(function() {
            return li.fire(a)
        })
    }

    function bc(a, c) {
        if (this.torndown) return s("ractive.render() was called on a Ractive instance that was already torn down"), Promise.resolve();
        if (a = b(a) || this.el, !this.append && a) {
            var d = a.__ractive_instances__;
            d && d.forEach(Ga), this.enhance || (a.innerHTML = "")
        }
        var e = this.enhance ? E(a.childNodes) : null,
            f = ac(this, a, c, e);
        if (e)
            for (; e.length;) a.removeChild(e.pop());
        return f
    }

    function cc(a, b) {
        for (var c = a.slice(), d = b.length; d--;) ~c.indexOf(b[d]) || c.push(b[d]);
        return c
    }

    function dc(a) {
        return a.trim()
    }

    function ec(a) {
        return a.str
    }

    function fc(a, b) {
        for (var c, d = []; c = pi.exec(a);) d.push({
            str: c[0],
            base: c[1],
            modifiers: c[2]
        });
        for (var e = d.map(ec), f = [], g = d.length; g--;) {
            var h = e.slice(),
                i = d[g];
            h[g] = i.base + b + i.modifiers || "";
            var j = e.slice();
            j[g] = b + " " + j[g], f.push(h.join(" "), j.join(" "))
        }
        return f.join(", ")
    }

    function gc(a, b) {
        var c, d = '[data-ractive-css~="{' + b + '}"]';
        return c = ri.test(a) ? a.replace(ri, d) : a.replace(oi, "").replace(ni, function(a, b) {
            if (qi.test(b)) return a;
            var c = b.split(",").map(dc),
                e = c.map(function(a) {
                    return fc(a, d)
                }).join(", ") + " ";
            return a.replace(b, e)
        })
    }

    function hc() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    function ic() {
        return hc() + hc() + "-" + hc() + "-" + hc() + "-" + hc() + "-" + hc() + hc() + hc()
    }

    function jc(a) {
        a && a.constructor !== Object && ("function" == typeof a || ("object" != typeof a ? o("data option must be an object or a function, `" + a + "` is not valid") : s("If supplied, options.data should be a plain JavaScript object - using a non-POJO as the root object may work, but is discouraged")))
    }

    function kc(a, b) {
        jc(b);
        var c = "function" == typeof a,
            d = "function" == typeof b;
        return b || c || (b = {}), c || d ? function() {
            var e = d ? lc(b, this) : b,
                f = c ? lc(a, this) : a;
            return mc(e, f)
        } : mc(b, a)
    }

    function lc(a, b) {
        var c = a.call(b);
        if (c) return "object" != typeof c && o("Data function must return an object"), c.constructor !== Object && t("Data function returned something other than a plain JavaScript object. This might work, but is strongly discouraged"), c
    }

    function mc(a, b) {
        if (a && b) {
            for (var c in b) c in a || (a[c] = b[c]);
            return a
        }
        return a || b
    }

    function nc(a, b) {
        void 0 === b && (b = 0);
        for (var c = new Array(b); b--;) c[b] = "_" + b;
        return new Function([], "return function (" + c.join(",") + "){return(" + a + ");};")()
    }

    function oc(a, b) {
        var c, d = "return (" + a.replace(vi, function(a, b) {
            return c = !0, '__ractive.get("' + b + '")'
        }) + ");";
        c && (d = "var __ractive = this; " + d);
        var e = new Function(d);
        return c ? e.bind(b) : e
    }

    function pc(a, b) {
        return wi[a] ? wi[a] : wi[a] = Ld(a, b)
    }

    function qc(a) {
        if (a) {
            var b = a.e;
            b && Object.keys(b).forEach(function(a) {
                wi[a] || (wi[a] = b[a])
            })
        }
    }

    function rc(a) {
        var b, c, d;
        return a.matchString("=") ? (b = a.pos, a.allowWhitespace(), (c = a.matchPattern(sj)) ? a.matchPattern(tj) ? (d = a.matchPattern(sj)) ? (a.allowWhitespace(), a.matchString("=") ? [c, d] : (a.pos = b, null)) : (a.pos = b, null) : null : (a.pos = b, null)) : null
    }

    function sc(a) {
        var b;
        return (b = a.matchPattern(uj)) ? {
            t: Yi,
            v: b
        } : null
    }

    function tc(a) {
        return a.replace(vj, "\\$&")
    }

    function uc(a, b) {
        return a.search(wj[b.join()] || (wj[b.join()] = new RegExp(b.map(tc).join("|"))))
    }

    function vc(a) {
        return a.replace(Bj, function(a, b) {
            var c;
            return c = "#" !== b[0] ? zj[b] : "x" === b[1] ? parseInt(b.substring(2), 16) : parseInt(b.substring(1), 10), c ? Dj(xc(c)) : a
        })
    }

    function wc(a) {
        return a.replace(Gj, "&amp;").replace(Ej, "&lt;").replace(Fj, "&gt;")
    }

    function xc(a) {
        return a ? 10 === a ? 32 : a < 128 ? a : a <= 159 ? Aj[a - 128] : a < 55296 ? a : a <= 57343 ? Hj : a <= 65535 ? a : Cj ? a >= 65536 && a <= 131071 ? a : a >= 131072 && a <= 196607 ? a : Hj : Hj : Hj
    }

    function yc(a) {
        var b;
        return (b = a.matchPattern(Kj)) ? {
            t: Ti,
            v: b
        } : null
    }

    function zc(a) {
        var b = a.remaining();
        return "true" === b.substr(0, 4) ? (a.pos += 4, {
            t: Xi,
            v: "true"
        }) : "false" === b.substr(0, 5) ? (a.pos += 5, {
            t: Xi,
            v: "false"
        }) : null
    }

    function Ac(a) {
        return function(b) {
            for (var c, d = '"', e = !1; !e;) c = b.matchPattern(yi) || b.matchPattern(zi) || b.matchString(a), c ? d += '"' === c ? '\\"' : "\\'" === c ? "'" : c : (c = b.matchPattern(Ai), c ? d += "\\u" + ("000" + c.charCodeAt(1).toString(16)).slice(-4) : e = !0);
            return d += '"', JSON.parse(d)
        }
    }

    function Bc(a) {
        var b, c;
        return b = a.pos, a.matchString('"') ? (c = Oj(a), a.matchString('"') ? {
            t: Ui,
            v: c
        } : (a.pos = b, null)) : a.matchString("'") ? (c = Nj(a), a.matchString("'") ? {
            t: Ui,
            v: c
        } : (a.pos = b, null)) : null
    }

    function Cc(a) {
        var b;
        return (b = Bc(a)) ? Qj.test(b.v) ? b.v : '"' + b.v.replace(/"/g, '\\"') + '"' : (b = yc(a)) ? b.v : (b = a.matchPattern(Pj)) ? b : null
    }

    function Dc(a) {
        var b, c, d;
        b = a.pos, a.allowWhitespace();
        var e = "'" !== a.nextChar() && '"' !== a.nextChar();
        return c = Cc(a), null === c ? (a.pos = b, null) : (a.allowWhitespace(), !e || "," !== a.nextChar() && "}" !== a.nextChar() ? a.matchString(":") ? (a.allowWhitespace(), d = Pc(a), null === d ? (a.pos = b, null) : {
            t: $i,
            k: c,
            v: d
        }) : (a.pos = b, null) : (Pj.test(c) || a.error("Expected a valid reference, but found '" + c + "' instead."), {
            t: $i,
            k: c,
            v: {
                t: _i,
                n: c
            }
        }))
    }

    function Ec(a) {
        var b, c, d, e;
        return b = a.pos, d = Dc(a), null === d ? null : (c = [d], a.matchString(",") ? (e = Ec(a), e ? c.concat(e) : (a.pos = b, null)) : c)
    }

    function Fc(a) {
        var b, c;
        return b = a.pos, a.allowWhitespace(), a.matchString("{") ? (c = Ec(a), a.allowWhitespace(), a.matchString("}") ? {
            t: Wi,
            m: c
        } : (a.pos = b, null)) : (a.pos = b, null)
    }

    function Gc(a) {
        a.allowWhitespace();
        var b = Pc(a);
        if (null === b) return null;
        var c = [b];
        if (a.allowWhitespace(), a.matchString(",")) {
            var d = Gc(a);
            null === d && a.error(Ij), c.push.apply(c, d)
        }
        return c
    }

    function Hc(a) {
        var b, c;
        return b = a.pos, a.allowWhitespace(), a.matchString("[") ? (c = Gc(a), a.matchString("]") ? {
            t: Vi,
            m: c
        } : (a.pos = b, null)) : (a.pos = b, null)
    }

    function Ic(a) {
        return yc(a) || zc(a) || Bc(a) || Fc(a) || Hc(a) || sc(a)
    }

    function Jc(a) {
        var b, c, d, e, f, g, h, i;
        if (b = a.pos, d = a.matchPattern(Wj), ("@keypath" === d || "@rootpath" === d) && a.matchPattern(Xj)) {
            var j = Jc(a);
            j || a.error("Expected a valid reference for a keypath expression"), a.allowWhitespace(), a.matchString(")") || a.error("Unclosed keypath expression"), d += "(" + j.n + ")"
        }
        if (i = !d && a.spreadArgs && a.matchPattern(Yj), d || (c = a.matchPattern(Rj) || "", d = !c && a.relaxedNames && a.matchPattern(Vj) || a.matchPattern(Uj), d || "." !== c ? !d && c && (d = c, c = "") : (c = "", d = ".")), !d) return null;
        if (!c && !a.relaxedNames && Mj.test(d)) return a.pos = b, null;
        if (!c && Lj.test(d)) return e = Lj.exec(d)[0], a.pos = b + e.length, {
            t: Zi,
            v: (i ? "..." : "") + e
        };
        if (g = (i ? 3 : 0) + (c || "").length + d.length, f = (c || "") + Q(d), a.matchString("("))
            if (h = f.lastIndexOf("."), h !== -1 && "]" !== d[d.length - 1]) {
                var k = f.length;
                f = f.substr(0, h), a.pos = b + (g - (k - h))
            } else a.pos -= 1;
        return {
            t: _i,
            n: (i ? "..." : "") + f.replace(/^this\./, "./").replace(/^this$/, ".")
        }
    }

    function Kc(a) {
        if (!a.matchString("(")) return null;
        a.allowWhitespace();
        var b = Pc(a);
        return b || a.error(Ij), a.allowWhitespace(), a.matchString(")") || a.error(Jj), {
            t: dj,
            x: b
        }
    }

    function Lc(a) {
        return Ic(a) || Jc(a) || Kc(a)
    }

    function Mc(a) {
        if (a.strictRefinement || a.allowWhitespace(), a.matchString(".")) {
            a.allowWhitespace();
            var b = a.matchPattern(Pj);
            if (b) return {
                t: aj,
                n: b
            };
            a.error("Expected a property name")
        }
        if (a.matchString("[")) {
            a.allowWhitespace();
            var c = Pc(a);
            return c || a.error(Ij), a.allowWhitespace(), a.matchString("]") || a.error("Expected ']'"), {
                t: aj,
                x: c
            }
        }
        return null
    }

    function Nc(a) {
        var b = Lc(a);
        if (!b) return null;
        for (; b;) {
            var c = Mc(a);
            if (c) b = {
                t: bj,
                x: b,
                r: c
            };
            else {
                if (!a.matchString("(")) break;
                a.allowWhitespace();
                var d = a.spreadArgs;
                a.spreadArgs = !0;
                var e = Gc(a);
                a.spreadArgs = d, a.allowWhitespace(), a.matchString(")") || a.error(Jj), b = {
                    t: gj,
                    x: b
                }, e && (b.o = e)
            }
        }
        return b
    }

    function Oc(a) {
        var b, c, d, e;
        return (c = bk(a)) ? (b = a.pos, a.allowWhitespace(), a.matchString("?") ? (a.allowWhitespace(), d = Pc(a), d || a.error(Ij), a.allowWhitespace(), a.matchString(":") || a.error('Expected ":"'), a.allowWhitespace(), e = Pc(a), e || a.error(Ij), {
            t: ej,
            o: [c, d, e]
        }) : (a.pos = b, c)) : null
    }

    function Pc(a) {
        return Oc(a)
    }

    function Qc(a) {
        function b(a) {
            for (var b = [], c = f - 1; c >= 0; c--) b.push("spread$" + c);
            return b.length ? "(function(){var " + b.join(",") + ";return(" + a + ");})()" : a
        }

        function c(a) {
            switch (a.t) {
                case Xi:
                case Zi:
                case Ti:
                case Yi:
                    return a.v;
                case Ui:
                    return JSON.stringify(String(a.v));
                case Vi:
                    return "[" + (a.m ? a.m.map(c).join(",") : "") + "]";
                case Wi:
                    return "{" + (a.m ? a.m.map(c).join(",") : "") + "}";
                case $i:
                    return a.k + ":" + c(a.v);
                case cj:
                    return ("typeof" === a.s ? "typeof " : a.s) + c(a.o);
                case fj:
                    return c(a.o[0]) + ("in" === a.s.substr(0, 2) ? " " + a.s + " " : a.s) + c(a.o[1]);
                case gj:
                    if (a.spread) {
                        var b = f++;
                        return "(spread$" + b + " = " + c(a.x) + ").apply(spread$" + b + ", [].concat(" + (a.o ? a.o.map(function(a) {
                            return a.n && 0 === a.n.indexOf("...") ? c(a) : "[" + c(a) + "]"
                        }).join(",") : "") + ") )"
                    }
                    return c(a.x) + "(" + (a.o ? a.o.map(c).join(",") : "") + ")";
                case dj:
                    return "(" + c(a.x) + ")";
                case bj:
                    return c(a.x) + c(a.r);
                case aj:
                    return a.n ? "." + a.n : "[" + c(a.x) + "]";
                case ej:
                    return c(a.o[0]) + "?" + c(a.o[1]) + ":" + c(a.o[2]);
                case _i:
                    return "_" + d.indexOf(a.n);
                default:
                    throw new Error("Expected legal JavaScript")
            }
        }
        var d, e, f = 0;
        return Rc(a, d = []), e = c(a), d = d.map(function(a) {
            return 0 === a.indexOf("...") ? a.substr(3) : a
        }), {
            r: d,
            s: b(e)
        }
    }

    function Rc(a, b) {
        var c, d;
        if (a.t === _i && b.indexOf(a.n) === -1 && b.unshift(a.n), d = a.o || a.m)
            if (l(d)) Rc(d, b);
            else
                for (c = d.length; c--;) d[c].n && 0 === d[c].n.indexOf("...") && (a.spread = !0), Rc(d[c], b);
        a.x && Rc(a.x, b), a.r && Rc(a.r, b), a.v && Rc(a.v, b)
    }

    function Sc(a) {
        a.allowWhitespace();
        var b = Cc(a);
        if (!b) return null;
        var c = {
            key: b
        };
        if (a.allowWhitespace(), !a.matchString(":")) return null;
        a.allowWhitespace();
        var d = a.read();
        return d ? (c.value = d.v, c) : null
    }

    function Tc(a, b) {
        var c = new ik(a, {
            values: b
        });
        return c.result
    }

    function Uc(a, b, c) {
        var d, e, f, g, h, i, j;
        if ("string" == typeof a) {
            var k = b.pos - a.length;
            if (c === pj || c === qj) {
                var l = new ak("[" + a + "]");
                return {
                    a: Qc(l.result[0])
                }
            }
            if (c === oj && (e = jk.exec(a)) && (s(b.getContextMessage(k, "Unqualified method events are deprecated. Prefix methods with '@this.' to call methods on the current Ractive instance.")[2]), a = "@this." + e[1] + a.substr(e[1].length)), c === oj && ~a.indexOf("(")) {
                var m = new ak("[" + a + "]");
                if (m.result && m.result[0]) return m.remaining().length && (b.pos = k + a.length - m.remaining().length, b.error("Invalid input after event expression '" + m.remaining() + "'")), {
                    x: Qc(m.result[0])
                };
                (a.indexOf(":") > a.indexOf("(") || !~a.indexOf(":")) && (b.pos = k, b.error("Invalid input in event expression '" + a + "'"))
            }
            if (a.indexOf(":") === -1) return a.trim();
            a = [a]
        }
        if (d = {}, h = [], i = [], a) {
            for (; a.length;)
                if (f = a.shift(), "string" == typeof f) {
                    if (g = f.indexOf(":"), g !== -1) {
                        g && h.push(f.substr(0, g)), f.length > g + 1 && (i[0] = f.substring(g + 1));
                        break
                    }
                    h.push(f)
                } else h.push(f);
            i = i.concat(a)
        }
        return h.length ? i.length || "string" != typeof h ? (d = {
            n: 1 === h.length && "string" == typeof h[0] ? h[0] : h
        }, 1 === i.length && "string" == typeof i[0] ? (j = Tc("[" + i[0] + "]"), d.a = j ? j.value : [i[0].trim()]) : d.d = i) : d = h : d = "", i.length && c && s(b.getContextMessage(b.pos, "Proxy events with arguments are deprecated. You can fire events with arguments using \"@this.fire('eventName', arg1, arg2, ...)\".")[2]), d
    }

    function Vc(a) {
        var b, c, d, e, f, g;
        if (a.allowWhitespace(), c = a.matchPattern(lk), !c) return null;
        for (f = c.length, e = 0; e < a.tags.length; e++) ~(g = c.indexOf(a.tags[e].open)) && g < f && (f = g);
        return f < c.length ? (a.pos -= c.length - f, c = c.substr(0, f), c ? {
            n: c
        } : null) : (b = {
            n: c
        }, d = Wc(a), null != d && (b.f = d), b)
    }

    function Wc(a) {
        var b, c, d, e;
        return b = a.pos, /[=\/>\s]/.test(a.nextChar()) || a.error("Expected `=`, `/`, `>` or whitespace"), a.allowWhitespace(), a.matchString("=") ? (a.allowWhitespace(), c = a.pos, d = a.sectionDepth, e = Zc(a, "'") || Zc(a, '"') || Yc(a), null === e && a.error("Expected valid attribute value"), a.sectionDepth !== d && (a.pos = c, a.error("An attribute value must contain as many opening section tags as closing section tags")), e.length ? 1 === e.length && "string" == typeof e[0] ? vc(e[0]) : e : "") : (a.pos = b, null)
    }

    function Xc(a) {
        var b, c, d, e, f;
        return b = a.pos, (c = a.matchPattern(sk)) ? (d = c, e = a.tags.map(function(a) {
            return a.open
        }), (f = uc(d, e)) !== -1 && (c = c.substr(0, f), a.pos = b + c.length), c) : null
    }

    function Yc(a) {
        var b, c;
        for (a.inAttribute = !0, b = [], c = ad(a) || Xc(a); c;) b.push(c), c = ad(a) || Xc(a);
        return b.length ? (a.inAttribute = !1, b) : null
    }

    function Zc(a, b) {
        var c, d, e;
        if (c = a.pos, !a.matchString(b)) return null;
        for (a.inAttribute = b, d = [], e = ad(a) || $c(a, b); null !== e;) d.push(e), e = ad(a) || $c(a, b);
        return a.matchString(b) ? (a.inAttribute = !1, d) : (a.pos = c, null)
    }

    function $c(a, b) {
        var c = a.remaining(),
            d = a.tags.map(function(a) {
                return a.open
            });
        d.push(b);
        var e = uc(c, d);
        return e === -1 && a.error("Quoted attribute value must have a closing quote"), e ? (a.pos += e, c.substr(0, e)) : null
    }

    function _c(a) {
        var b, c, d;
        if (c = Vc(a), !c) return null;
        if (d = rk[c.n]) c.t = d.t, d.v && (c.v = d.v), delete c.n, d.t !== qj && d.t !== pj || (c.f = Uc(c.f, a)), d.t === qj ? t("" + ("t0" === d.v ? "intro-outro" : "t1" === d.v ? "intro" : "outro") + " is deprecated. To specify tranisitions, use the transition name suffixed with '-in', '-out', or '-in-out' as an attribute. Arguments can be specified in the attribute value as a simple list of expressions without mustaches.") : d.t === pj && t("decorator is deprecated. To specify decorators, use the decorator name prefixed with 'as-' as an attribute. Arguments can be specified in the attribute value as a simple list of expressions without mustaches.");
        else if (b = pk.exec(c.n)) delete c.n, c.t = pj, c.f = Uc(c.f, a, pj), "object" == typeof c.f ? c.f.n = b[1] : c.f = b[1];
        else if (b = qk.exec(c.n)) delete c.n, c.t = qj, c.f = Uc(c.f, a, qj), "object" == typeof c.f ? c.f.n = b[1] : c.f = b[1], c.v = "in-out" === b[2] ? "t0" : "in" === b[2] ? "t1" : "t2";
        else if (b = nk.exec(c.n)) c.n = b[1], c.t = oj, c.f = Uc(c.f, a, oj), ok.test(c.f.n || c.f) && (a.pos -= (c.f.n || c.f).length, a.error("Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, detach, insert)"));
        else {
            if (a.sanitizeEventAttributes && mk.test(c.n)) return {
                exclude: !0
            };
            c.f = c.f || ("" === c.f ? "" : 0), c.t = Mi
        }
        return c
    }

    function ad(a) {
        var b, c;
        if (a.interpolate[a.inside] === !1) return null;
        for (c = 0; c < a.tags.length; c += 1)
            if (b = bd(a, a.tags[c])) return b;
        return a.inTag && !a.inAttribute && (b = _c(a)) ? (a.allowWhitespace(), b) : void 0
    }

    function bd(a, b) {
        var c, d, e, f;
        if (c = a.pos, a.matchString("\\" + b.open)) {
            if (0 === c || "\\" !== a.str[c - 1]) return b.open
        } else if (!a.matchString(b.open)) return null;
        if (d = rc(a)) return a.matchString(b.close) ? (b.open = d[0], b.close = d[1], a.sortMustacheTags(), tk) : null;
        if (a.allowWhitespace(), a.matchString("/")) {
            a.pos -= 1;
            var g = a.pos;
            if (sc(a)) a.pos = g;
            else {
                if (a.pos = g - b.close.length, a.inAttribute) return a.pos = c, null;
                a.error("Attempted to close a section that wasn't open")
            }
        }
        for (f = 0; f < b.readers.length; f += 1)
            if (e = b.readers[f], d = e(a, b)) return b.isStatic && (d.s = !0), a.includeLinePositions && (d.p = a.getLinePos(c)), d;
        return a.pos = c, null
    }

    function cd(a, b) {
        var c;
        if (a) {
            for (; a.t === dj && a.x;) a = a.x;
            return a.t === _i ? b.r = a.n : (c = dd(a)) ? b.rx = c : b.x = Qc(a), b
        }
    }

    function dd(a) {
        for (var b, c = []; a.t === bj && a.r.t === aj;) b = a.r, b.x ? b.x.t === _i ? c.unshift(b.x) : c.unshift(Qc(b.x)) : c.unshift(b.n), a = a.x;
        return a.t !== _i ? null : {
            r: a.n,
            m: c
        }
    }

    function ed(a, b) {
        var c, d = Pc(a);
        return d ? (a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), c = {
            t: Ei
        }, cd(d, c), c) : null
    }

    function fd(a, b) {
        var c, d;
        return a.matchString("&") ? (a.allowWhitespace(), (c = Pc(a)) ? (a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), d = {
            t: Ei
        }, cd(c, d), d) : null) : null
    }

    function gd(a) {
        var b, c = [],
            d = a.pos;
        if (a.allowWhitespace(), b = hd(a)) {
            for (b.x = cd(b.x, {}), c.push(b), a.allowWhitespace(); a.matchString(",");) b = hd(a), b || a.error("Expected another alias."), b.x = cd(b.x, {}), c.push(b), a.allowWhitespace();
            return c
        }
        return a.pos = d, null
    }

    function hd(a) {
        var b, c, d = a.pos;
        return a.allowWhitespace(), (b = Pc(a, [])) ? (a.allowWhitespace(), a.matchPattern(vk) ? (a.allowWhitespace(), c = a.matchPattern(uk), c || a.error("Expected a legal alias name."), {
            n: c,
            x: b
        }) : (a.pos = d, null)) : (a.pos = d, null)
    }

    function id(a, b) {
        if (!a.matchString(">")) return null;
        a.allowWhitespace(), a.relaxedNames = a.strictRefinement = !0;
        var c = Pc(a);
        if (a.relaxedNames = a.strictRefinement = !1, !c) return null;
        var d = {
            t: Ji
        };
        cd(c, d), a.allowWhitespace();
        var e = gd(a);
        if (e) d = {
            t: Si,
            z: e,
            f: [d]
        };
        else {
            var f = Pc(a);
            f && (d = {
                t: Fi,
                n: kj,
                f: [d]
            }, cd(f, d))
        }
        return a.allowWhitespace(), a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), d
    }

    function jd(a, b) {
        var c;
        return a.matchString("!") ? (c = a.remaining().indexOf(b.close), c !== -1 ? (a.pos += c + b.close.length, {
            t: Ki
        }) : void 0) : null
    }

    function kd(a, b) {
        var c, d, e;
        if (c = a.pos, d = Pc(a), !d) {
            var f = a.matchPattern(/^(\w+)/);
            return f ? {
                t: _i,
                n: f
            } : null
        }
        for (e = 0; e < b.length; e += 1)
            if (a.remaining().substr(0, b[e].length) === b[e]) return d;
        return a.pos = c, Jc(a)
    }

    function ld(a, b) {
        var c, d, e, f;
        c = a.pos;
        try {
            d = kd(a, [b.close])
        } catch (a) {
            f = a
        }
        if (!d) {
            if ("!" === a.str.charAt(c)) return a.pos = c, null;
            if (f) throw f
        }
        if (!a.matchString(b.close) && (a.error("Expected closing delimiter '" + b.close + "' after reference"), !d)) {
            if ("!" === a.nextChar()) return null;
            a.error("Expected expression or legal reference")
        }
        return e = {
            t: Di
        }, cd(d, e), e
    }

    function md(a, b) {
        if (!a.matchPattern(wk)) return null;
        var c = a.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-]*/);
        a.allowWhitespace(), a.matchString(b.close) || a.error("expected legal partial name");
        var d = {
            t: Pi
        };
        return c && (d.n = c), d
    }

    function nd(a, b) {
        var c, d, e, f;
        return c = a.pos, a.matchString(b.open) ? (a.allowWhitespace(), a.matchString("/") ? (a.allowWhitespace(), d = a.remaining(), e = d.indexOf(b.close), e !== -1 ? (f = {
            t: Hi,
            r: d.substr(0, e).split(" ")[0]
        }, a.pos += e, a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), f) : (a.pos = c, null)) : (a.pos = c, null)) : null
    }

    function od(a, b) {
        var c = a.pos;
        return a.matchString(b.open) ? a.matchPattern(xk) ? (a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), {
            t: mj
        }) : (a.pos = c, null) : null
    }

    function pd(a, b) {
        var c = a.pos;
        if (!a.matchString(b.open)) return null;
        if (!a.matchPattern(yk)) return a.pos = c, null;
        var d = Pc(a);
        return a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), {
            t: nj,
            x: d
        }
    }

    function qd(a, b) {
        var c, d, e, f, g, h, i, j, k, l, m, n, o = !1;
        if (c = a.pos, a.matchString("^")) e = {
            t: Fi,
            f: [],
            n: ij
        };
        else {
            if (!a.matchString("#")) return null;
            e = {
                t: Fi,
                f: []
            }, a.matchString("partial") && (a.pos = c - a.standardDelimiters[0].length, a.error("Partial definitions can only be at the top level of the template, or immediately inside components")), (i = a.matchPattern(Ck)) && (n = i, e.n = zk[i])
        }
        if (a.allowWhitespace(), "with" === i) {
            var p = gd(a);
            p && (o = !0, e.z = p, e.t = Si)
        } else if ("each" === i) {
            var q = hd(a);
            q && (e.z = [{
                n: q.n,
                x: {
                    r: "."
                }
            }], d = q.x)
        }
        if (!o && (d || (d = Pc(a)), d || a.error("Expected expression"), m = a.matchPattern(Ak))) {
            var r;
            (r = a.matchPattern(Bk)) ? e.i = m + "," + r: e.i = m
        }
        a.allowWhitespace(), a.matchString(b.close) || a.error("Expected closing delimiter '" + b.close + "'"), a.sectionDepth += 1, g = e.f, k = [];
        var s;
        do
            if (s = a.pos, f = nd(a, b)) n && f.r !== n && (a.pos = s, a.error("Expected " + b.open + "/" + n + b.close)), a.sectionDepth -= 1, l = !0;
            else if (!o && (f = pd(a, b))) {
            e.n === ij && a.error("{{else}} not allowed in {{#unless}}"), h && a.error("illegal {{elseif...}} after {{else}}"), j || (j = []);
            var t = {
                t: Fi,
                n: hj,
                f: g = []
            };
            cd(f.x, t), j.push(t)
        } else if (!o && (f = od(a, b))) e.n === ij && a.error("{{else}} not allowed in {{#unless}}"), h && a.error("there can only be one {{else}} block, at the end of a section"), h = !0, j || (j = []), j.push({
            t: Fi,
            n: ij,
            f: g = []
        });
        else {
            if (f = a.read(Zk), !f) break;
            g.push(f)
        }
        while (!l);
        return j && (e.l = j), o || cd(d, e), e.f.length || delete e.f, e
    }

    function rd(a) {
        var b, c, d, e, f;
        return b = a.pos, a.textOnlyMode || !a.matchString(Dk) ? null : (d = a.remaining(), e = d.indexOf(Ek), e === -1 && a.error("Illegal HTML - expected closing comment sequence ('-->')"), c = d.substr(0, e), a.pos += e + 3, f = {
            t: Ki,
            c: c
        }, a.includeLinePositions && (f.p = a.getLinePos(b)), f)
    }

    function sd(a) {
        var b, c, d, e, f;
        for (b = 1; b < a.length; b += 1) c = a[b], d = a[b - 1], e = a[b - 2], td(c) && ud(d) && td(e) && Gk.test(e) && Fk.test(c) && (a[b - 2] = e.replace(Gk, "\n"), a[b] = c.replace(Fk, "")), vd(c) && td(d) && Gk.test(d) && td(c.f[0]) && Fk.test(c.f[0]) && (a[b - 1] = d.replace(Gk, "\n"), c.f[0] = c.f[0].replace(Fk, "")), td(c) && vd(d) && (f = C(d.f), td(f) && Gk.test(f) && Fk.test(c) && (d.f[d.f.length - 1] = f.replace(Gk, "\n"), a[b] = c.replace(Fk, "")));
        return a
    }

    function td(a) {
        return "string" == typeof a
    }

    function ud(a) {
        return a.t === Ki || a.t === Li
    }

    function vd(a) {
        return (a.t === Fi || a.t === Gi) && a.f
    }

    function wd(a, b, c) {
        var d;
        b && (d = a[0], "string" == typeof d && (d = d.replace(b, ""), d ? a[0] = d : a.shift())), c && (d = C(a), "string" == typeof d && (d = d.replace(c, ""), d ? a[a.length - 1] = d : a.pop()))
    }

    function xd(a, b, c, d, e) {
        if ("string" != typeof a) {
            var f, g, h, j, k, l, m, n;
            for (sd(a), f = a.length; f--;) g = a[f], g.exclude ? a.splice(f, 1) : b && g.t === Ki && a.splice(f, 1);
            for (wd(a, d ? Jk : null, e ? Kk : null), f = a.length; f--;) {
                if (g = a[f], g.f) {
                    var o = g.t === Ii && Ik.test(g.e);
                    k = c || o, !c && o && wd(g.f, Lk, Mk), k || (h = a[f - 1], j = a[f + 1], (!h || "string" == typeof h && Kk.test(h)) && (l = !0), (!j || "string" == typeof j && Jk.test(j)) && (m = !0)), xd(g.f, b, k, l, m), i(g.f.n) && xd(g.f.n, b, c, l, e), i(g.f.d) && xd(g.f.d, b, c, l, e)
                }
                if (g.l && (xd(g.l, b, c, l, m), g.l.forEach(function(a) {
                        return a.l = 1
                    }), g.l.unshift(f + 1, 0), a.splice.apply(a, g.l), delete g.l), g.a)
                    for (n in g.a) g.a.hasOwnProperty(n) && "string" != typeof g.a[n] && xd(g.a[n], b, c, l, m);
                g.m && (xd(g.m, b, c, l, m), g.m.length < 1 && delete g.m)
            }
            for (f = a.length; f--;) "string" == typeof a[f] && ("string" == typeof a[f + 1] && (a[f] = a[f] + a[f + 1], a.splice(f + 1, 1)), c || (a[f] = a[f].replace(Hk, " ")), "" === a[f] && a.splice(f, 1))
        }
    }

    function yd(a) {
        var b, c;
        return b = a.pos, a.matchString("</") ? (c = a.matchPattern(Nk)) ? a.inside && c !== a.inside ? (a.pos = b, null) : {
            t: Ni,
            e: c
        } : (a.pos -= 2, void a.error("Illegal closing tag")) : null
    }

    function zd(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m;
        if (b = a.pos, a.inside || a.inAttribute || a.textOnlyMode) return null;
        if (!a.matchString("<")) return null;
        if ("/" === a.nextChar()) return null;
        if (c = {}, a.includeLinePositions && (c.p = a.getLinePos(b)), a.matchString("!")) return c.t = Ri, a.matchPattern(/^doctype/i) || a.error("Expected DOCTYPE declaration"), c.a = a.matchPattern(/^(.+?)>/), c;
        if (c.t = Ii, c.e = a.matchPattern(Ok), !c.e) return null;
        for (Pk.test(a.nextChar()) || a.error("Illegal tag name"),
            a.allowWhitespace(), a.inTag = !0; d = ad(a);) d !== !1 && (c.m || (c.m = []), c.m.push(d)), a.allowWhitespace();
        if (a.inTag = !1, a.allowWhitespace(), a.matchString("/") && (e = !0), !a.matchString(">")) return null;
        var n = c.e.toLowerCase(),
            o = a.preserveWhitespace;
        if (!e && !yj.test(c.e)) {
            a.elementStack.push(n), "script" !== n && "style" !== n && "textarea" !== n || (a.inside = n), f = [], g = Hg(null);
            do
                if (k = a.pos, l = a.remaining(), l || a.error("Missing end " + (a.elementStack.length > 1 ? "tags" : "tag") + " (" + a.elementStack.reverse().map(function(a) {
                        return "</" + a + ">"
                    }).join("") + ")"), Ad(n, l))
                    if (m = yd(a)) {
                        j = !0;
                        var p = m.e.toLowerCase();
                        if (p !== n && (a.pos = k, !~a.elementStack.indexOf(p))) {
                            var q = "Unexpected closing tag";
                            yj.test(p) && (q += " (<" + p + "> is a void element - it cannot contain children)"), a.error(q)
                        }
                    } else(i = nd(a, {
                        open: a.standardDelimiters[0],
                        close: a.standardDelimiters[1]
                    })) ? (j = !0, a.pos = k) : (i = a.read($k)) ? (g[i.n] && (a.pos = k, a.error("Duplicate partial definition")), xd(i.f, a.stripComments, o, !o, !o), g[i.n] = i.f, h = !0) : (i = a.read(Zk)) ? f.push(i) : j = !0;
            else j = !0; while (!j);
            f.length && (c.f = f), h && (c.p = g), a.elementStack.pop()
        }
        return a.inside = null, a.sanitizeElements && a.sanitizeElements.indexOf(n) !== -1 ? Qk : c
    }

    function Ad(a, b) {
        var c, d;
        return c = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec(b), d = kk[a], !c || !d || !~d.indexOf(c[1].toLowerCase())
    }

    function Bd(a) {
        var b, c, d, e;
        return c = a.remaining(), a.textOnlyMode ? (d = a.tags.map(function(a) {
            return a.open
        }), d = d.concat(a.tags.map(function(a) {
            return "\\" + a.open
        })), b = uc(c, d)) : (e = a.inside ? "</" + a.inside : "<", a.inside && !a.interpolate[a.inside] ? b = c.indexOf(e) : (d = a.tags.map(function(a) {
            return a.open
        }), d = d.concat(a.tags.map(function(a) {
            return "\\" + a.open
        })), a.inAttribute === !0 ? d.push('"', "'", "=", "<", ">", "`") : a.inAttribute ? d.push(a.inAttribute) : d.push(e), b = uc(c, d))), b ? (b === -1 && (b = c.length), a.pos += b, a.inside && "textarea" !== a.inside || a.textOnlyMode ? c.substr(0, b) : vc(c.substr(0, b))) : null
    }

    function Cd(a) {
        var b = a.pos,
            c = a.standardDelimiters[0],
            d = a.standardDelimiters[1];
        if (!a.matchPattern(Sk) || !a.matchString(c)) return a.pos = b, null;
        var e = a.matchPattern(Tk);
        if (t("Inline partial comments are deprecated.\nUse this...\n  {{#partial " + e + "}} ... {{/partial}}\n\n...instead of this:\n  <!-- {{>" + e + "}} --> ... <!-- {{/" + e + "}} -->'"), !a.matchString(d) || !a.matchPattern(Uk)) return a.pos = b, null;
        var f, g = [],
            h = new RegExp("^<!--\\s*" + tc(c) + "\\s*\\/\\s*" + e + "\\s*" + tc(d) + "\\s*-->");
        do
            if (a.matchPattern(h)) f = !0;
            else {
                var i = a.read(Zk);
                i || a.error("expected closing comment ('<!-- " + c + "/" + e + d + " -->')"), g.push(i)
            }
        while (!f);
        return {
            t: Qi,
            f: g,
            n: e
        }
    }

    function Dd(a) {
        var b, c, d, e, f;
        b = a.pos;
        var g = a.standardDelimiters;
        if (!a.matchString(g[0])) return null;
        if (!a.matchPattern(Vk)) return a.pos = b, null;
        c = a.matchPattern(/^[a-zA-Z_$][a-zA-Z_$0-9\-\/]*/), c || a.error("expected legal partial name"), a.allowWhitespace(), a.matchString(g[1]) || a.error("Expected closing delimiter '" + g[1] + "'"), d = [];
        do(e = nd(a, {
            open: a.standardDelimiters[0],
            close: a.standardDelimiters[1]
        })) ? ("partial" === !e.r && a.error("Expected " + g[0] + "/partial" + g[1]), f = !0) : (e = a.read(Zk), e || a.error("Expected " + g[0] + "/partial" + g[1]), d.push(e)); while (!f);
        return {
            t: Qi,
            n: c,
            f: d
        }
    }

    function Ed(a) {
        for (var b = [], c = Hg(null), d = !1, e = a.preserveWhitespace; a.pos < a.str.length;) {
            var f, g, h = a.pos;
            (g = a.read($k)) ? (c[g.n] && (a.pos = h, a.error("Duplicated partial definition")), xd(g.f, a.stripComments, e, !e, !e), c[g.n] = g.f, d = !0) : (f = a.read(Zk)) ? b.push(f): a.error("Unexpected template content")
        }
        var i = {
            v: ui,
            t: b
        };
        return d && (i.p = c), i
    }

    function Fd(a, b) {
        Object.keys(a).forEach(function(c) {
            if (Gd(c, a)) return Hd(a, b);
            var d = a[c];
            Id(d) && Fd(d, b)
        })
    }

    function Gd(a, b) {
        return "s" === a && i(b.r)
    }

    function Hd(a, b) {
        var c = a.s,
            d = a.r;
        b[c] || (b[c] = nc(c, d.length))
    }

    function Id(a) {
        return i(a) || l(a)
    }

    function Jd(a, b) {
        return new Rk(a, b || {}).result
    }

    function Kd(a, b, c) {
        a || o("Missing Ractive.parse - cannot parse " + b + ". " + c)
    }

    function Ld(a, b) {
        return Kd(nc, "new expression function", al), nc(a, b)
    }

    function Md(a, b) {
        return Kd(oc, 'compution string "${str}"', bl), oc(a, b)
    }

    function Nd(a) {
        var b = a._config.template;
        if (b && b.fn) {
            var c = Od(a, b.fn);
            return c !== b.result ? (b.result = c, c) : void 0
        }
    }

    function Od(a, b) {
        return b.call(a, {
            fromId: cl.fromId,
            isParsed: cl.isParsed,
            parse: function(b, c) {
                return void 0 === c && (c = cl.getParseOptions(a)), cl.parse(b, c)
            }
        })
    }

    function Pd(a, b) {
        return "string" == typeof a ? a = Qd(a, b) : (Rd(a), qc(a)), a
    }

    function Qd(a, b) {
        return "#" === a[0] && (a = cl.fromId(a)), cl.parseFor(a, b)
    }

    function Rd(a) {
        if (void 0 == a) throw new Error("The template cannot be " + a + ".");
        if ("number" != typeof a.v) throw new Error("The template parser was passed a non-string template, but the template doesn't have a version.  Make sure you're passing in the template you think you are.");
        if (a.v !== ui) throw new Error("Mismatched template version (expected " + ui + ", got " + a.v + ") Please ensure you are using the latest version of Ractive.js in your build process as well as in your app")
    }

    function Sd(a, b, c) {
        if (b)
            for (var d in b) !c && a.hasOwnProperty(d) || (a[d] = b[d])
    }

    function Td(a, b, c) {
        function d() {
            var a = Ud(d._parent, b),
                e = "_super" in this,
                f = this._super;
            this._super = a;
            var g = c.apply(this, arguments);
            return e ? this._super = f : delete this._super, g
        }
        return /_super/.test(c) ? (d._parent = a, d._method = c, d) : c
    }

    function Ud(a, b) {
        if (b in a) {
            var c = a[b];
            return "function" == typeof c ? c : function() {
                return c
            }
        }
        return m
    }

    function Vd(a, b, c) {
        return "options." + a + " has been deprecated in favour of options." + b + "." + (c ? " You cannot specify both options, please use options." + b + "." : "")
    }

    function Wd(a, b, c) {
        if (b in a) {
            if (c in a) throw new Error(Vd(b, c, !0));
            s(Vd(b, c)), a[c] = a[b]
        }
    }

    function Xd(a) {
        Wd(a, "beforeInit", "onconstruct"), Wd(a, "init", "onrender"), Wd(a, "complete", "oncomplete"), Wd(a, "eventDefinitions", "events"), i(a.adaptors) && Wd(a, "adaptors", "adapt")
    }

    function Yd(a, b, c, d) {
        Xd(d);
        for (var e in d)
            if (jl.hasOwnProperty(e)) {
                var f = d[e];
                "el" !== e && "function" == typeof f ? s("" + e + " is a Ractive option that does not expect a function and will be ignored", "init" === a ? c : null) : c[e] = f
            }
        if (d.append && d.enhance) throw new Error("Cannot use append and enhance at the same time");
        gl.forEach(function(e) {
            e[a](b, c, d)
        }), mi[a](b, c, d), dl[a](b, c, d), si[a](b, c, d), Zd(b.prototype, c, d)
    }

    function Zd(a, b, c) {
        for (var d in c)
            if (!kl[d] && c.hasOwnProperty(d)) {
                var e = c[d];
                "function" == typeof e && (e = Td(a, d, e)), b[d] = e
            }
    }

    function $d(a) {
        var b = {};
        return a.forEach(function(a) {
            return b[a] = !0
        }), b
    }

    function _d(a) {
        if (a = a || {}, "object" != typeof a) throw new Error("The reset method takes either no arguments, or an object containing new data");
        a = ti.init(this.constructor, this, {
            data: a
        });
        var b = fh.start(this, !0),
            c = this.viewmodel.wrapper;
        c && c.reset ? c.reset(a) === !1 && this.viewmodel.set(a) : this.viewmodel.set(a);
        for (var d, e = ml.reset(this), f = e.length; f--;)
            if (nl.indexOf(e[f]) > -1) {
                d = !0;
                break
            }
        return d && (rl.fire(this), this.fragment.resetTemplate(this.template), ql.fire(this), ol.fire(this)), fh.end(), pl.fire(this, a), b
    }

    function ae(a, b, c, d) {
        a.forEach(function(a) {
            if (a.type === Ji && (a.refName === b || a.name === b)) return a.inAttribute = c, void d.push(a);
            if (a.fragment) ae(a.fragment.iterations || a.fragment.items, b, c, d);
            else if (i(a.items)) ae(a.items, b, c, d);
            else if (a.type === Oi && a.instance) {
                if (a.instance.partials[b]) return;
                ae(a.instance.fragment.items, b, c, d)
            }
            a.type === Ii && i(a.attributes) && ae(a.attributes, b, !0, d)
        })
    }

    function be(a) {
        a.forceResetTemplate()
    }

    function ce(a, b) {
        var c = [];
        ae(this.fragment.items, a, !1, c);
        var d = fh.start(this, !0);
        return this.partials[a] = b, c.forEach(be), fh.end(), d
    }

    function de(a, b, c) {
        var d = a.fragment.resolve(b, function(b) {
            D(a.resolvers, d), a.models[c] = b, a.bubble()
        });
        a.resolvers.push(d)
    }

    function ee(a, b) {
        return b.r ? Va(a, b.r) : b.x ? new ul(a, b.x) : b.rx ? new wl(a, b.rx) : void 0
    }

    function fe(a) {
        if (a.template.z) {
            a.aliases = {};
            for (var b = a.template.z, c = 0; c < b.length; c++) a.aliases[b[c].n] = ee(a.parentFragment, b[c].x)
        }
    }

    function ge(a, b, c) {
        for (void 0 === b && (b = !0); a && (a.type !== Ii || c && a.name !== c) && (!b || a.type !== Oi);) a = a.owner ? a.owner : a.component ? a.containerFragment || a.component.parentFragment : a.parent ? a.parent : a.parentFragment ? a.parentFragment : void 0;
        return a
    }

    function he(a) {
        var b = [];
        return "string" != typeof a ? {} : a.replace(Al, function(a) {
            return "\0" + (b.push(a) - 1)
        }).replace(zl, "").split(";").filter(function(a) {
            return !!a.trim()
        }).map(function(a) {
            return a.replace(Bl, function(a, c) {
                return b[c]
            })
        }).reduce(function(a, b) {
            var c = b.indexOf(":"),
                d = b.substr(0, c).trim();
            return a[d] = b.substr(c + 1).trim(), a
        }, {})
    }

    function ie(a) {
        for (var b = a.split(yl), c = b.length; c--;) b[c] || b.splice(c, 1);
        return b
    }

    function je(a) {
        var b = a.element,
            c = a.name;
        if ("id" === c) return ke;
        if ("value" === c) {
            if (a.interpolator && (a.interpolator.bound = !0), "select" === b.name && "value" === c) return b.getAttribute("multiple") ? le : me;
            if ("textarea" === b.name) return qe;
            if (null != b.getAttribute("contenteditable")) return ne;
            if ("input" === b.name) {
                var d = b.getAttribute("type");
                if ("file" === d) return m;
                if ("radio" === d && b.binding && "name" === b.binding.attribute.name) return oe;
                if (~Cl.indexOf(d)) return qe
            }
            return pe
        }
        var e = b.node;
        if (a.isTwoway && "name" === c) {
            if ("radio" === e.type) return re;
            if ("checkbox" === e.type) return se
        }
        if ("style" === c) return te;
        if (0 === c.indexOf("style-")) return ue;
        if ("class" === c && (!e.namespaceURI || e.namespaceURI === Ag)) return ve;
        if (0 === c.indexOf("class-")) return we;
        if (a.isBoolean) {
            var f = b.getAttribute("type");
            return !a.interpolator || "checked" !== c || "checkbox" !== f && "radio" !== f || (a.interpolator.bound = !0), xe
        }
        return a.namespace && a.namespace !== a.node.namespaceURI ? ze : ye
    }

    function ke(a) {
        var b = this,
            c = b.node,
            d = this.getValue();
        return this.ractive.nodes[c.id] === c && delete this.ractive.nodes[c.id], a ? c.removeAttribute("id") : (this.ractive.nodes[d] = c, void(c.id = d))
    }

    function le(a) {
        var b = this.getValue();
        i(b) || (b = [b]);
        var c = this.node.options,
            d = c.length;
        if (a)
            for (; d--;) c[d].selected = !1;
        else
            for (; d--;) {
                var e = c[d],
                    f = e._ractive ? e._ractive.value : e.value;
                e.selected = z(b, f)
            }
    }

    function me(a) {
        var b = this.getValue();
        if (!this.locked) {
            this.node._ractive.value = b;
            var c = this.node.options,
                d = c.length,
                e = !1;
            if (a)
                for (; d--;) c[d].selected = !1;
            else
                for (; d--;) {
                    var f = c[d],
                        g = f._ractive ? f._ractive.value : f.value;
                    if (f.disabled && f.selected && (e = !0), g == b) return void(f.selected = !0)
                }
            e || (this.node.selectedIndex = -1)
        }
    }

    function ne(a) {
        var b = this.getValue();
        this.locked || (a ? this.node.innerHTML = "" : this.node.innerHTML = void 0 === b ? "" : b)
    }

    function oe(a) {
        var b = this.node,
            c = b.checked,
            d = this.getValue();
        return a ? b.checked = !1 : (b.value = this.node._ractive.value = d, b.checked = d === this.element.getAttribute("name"), void(c && !b.checked && this.element.binding && this.element.binding.rendered && this.element.binding.group.model.set(this.element.binding.group.getValue())))
    }

    function pe(a) {
        if (!this.locked) {
            if (a) return this.node.removeAttribute("value"), void(this.node.value = this.node._ractive.value = null);
            var b = this.getValue();
            this.node.value = this.node._ractive.value = b, this.node.setAttribute("value", b)
        }
    }

    function qe(a) {
        if (!this.locked) {
            if (a) return this.node._ractive.value = "", void this.node.removeAttribute("value");
            var b = this.getValue();
            this.node._ractive.value = b, this.node.value = d(b), this.node.setAttribute("value", d(b))
        }
    }

    function re(a) {
        a ? this.node.checked = !1 : this.node.checked = this.getValue() == this.node._ractive.value
    }

    function se(a) {
        var b = this,
            c = b.element,
            d = b.node,
            e = c.binding,
            f = this.getValue(),
            g = c.getAttribute("value");
        if (i(f)) {
            for (var h = f.length; h--;)
                if (g == f[h]) return void(e.isChecked = d.checked = !0);
            e.isChecked = d.checked = !1
        } else e.isChecked = d.checked = f == g
    }

    function te(a) {
        for (var b = a ? {} : he(this.getValue() || ""), c = this.node.style, d = Object.keys(b), e = this.previous || [], f = 0; f < d.length;) {
            if (d[f] in c) {
                var g = b[d[f]].replace("!important", "");
                c.setProperty(d[f], g, g.length !== b[d[f]].length ? "important" : "")
            }
            f++
        }
        for (f = e.length; f--;) !~d.indexOf(e[f]) && e[f] in c && c.setProperty(e[f], "", "");
        this.previous = d
    }

    function ue(a) {
        this.style || (this.style = f(this.name.substr(6)));
        var b = a ? "" : d(this.getValue()),
            c = b.replace("!important", "");
        this.node.style.setProperty(this.style, c, c.length !== b.length ? "important" : "")
    }

    function ve(a) {
        for (var b = a ? [] : ie(d(this.getValue())), c = ie(this.node.className), e = this.previous || c.slice(0), f = 0; f < b.length;) ~c.indexOf(b[f]) || c.push(b[f]), f++;
        for (f = e.length; f--;)
            if (!~b.indexOf(e[f])) {
                var g = c.indexOf(e[f]);
                ~g && c.splice(g, 1)
            }
        var h = c.join(" ");
        h !== this.node.className && (this.node.className = h), this.previous = b
    }

    function we(a) {
        var b = this.name.substr(6),
            c = ie(this.node.className),
            d = !a && this.getValue();
        this.inlineClass || (this.inlineClass = b), d && !~c.indexOf(b) ? c.push(b) : !d && ~c.indexOf(b) && c.splice(c.indexOf(b), 1), this.node.className = c.join(" ")
    }

    function xe(a) {
        if (!this.locked) {
            if (a) return this.useProperty && (this.node[this.propertyName] = !1), void this.node.removeAttribute(this.propertyName);
            this.useProperty ? this.node[this.propertyName] = this.getValue() : this.getValue() ? this.node.setAttribute(this.propertyName, "") : this.node.removeAttribute(this.propertyName)
        }
    }

    function ye(a) {
        a ? this.node.removeAttribute(this.name) : this.node.setAttribute(this.name, d(this.getString()))
    }

    function ze(a) {
        a ? this.node.removeAttributeNS(this.namespace, this.name.slice(this.name.indexOf(":") + 1)) : this.node.setAttributeNS(this.namespace, this.name.slice(this.name.indexOf(":") + 1), d(this.getString()))
    }

    function Ae(a, b) {
        for (var c = "xmlns:" + b; a;) {
            if (a.hasAttribute && a.hasAttribute(c)) return a.getAttribute(c);
            a = a.parentNode
        }
        return Gg[b]
    }

    function Be(a, b, c) {
        0 === b ? a.value = !0 : "true" === b ? a.value = !0 : "false" === b || "0" === b ? a.value = !1 : a.value = b;
        var d = a.element[a.flag];
        return a.element[a.flag] = a.value, c && !a.element.attributes.binding && d !== a.value && a.element.recreateTwowayBinding(), a.value
    }

    function Ce() {
        return Hl
    }

    function De(a) {
        Hl = !0, a(), Hl = !1
    }

    function Ee(a, b) {
        var c = b ? "svg" : "div";
        return a ? (Gl.innerHTML = "<" + c + " " + a + "></" + c + ">") && E(Gl.childNodes[0].attributes) : []
    }

    function Fe(a, b) {
        for (var c = a.length; c--;)
            if (a[c].name === b.name) return !1;
        return !0
    }

    function Ge(a, b, c, d) {
        var e = a.__model;
        d && e.shuffle(d)
    }

    function He(a, b, c, d) {
        if (a.set && a.set.__magic) return a.set.__magic.dependants.push({
            ractive: b,
            keypath: c
        }), a;
        var e, f = [{
                ractive: b,
                keypath: c
            }],
            g = {
                get: function() {
                    return "value" in a ? a.value : a.get.call(this)
                },
                set: function(b) {
                    e || ("value" in a ? a.value = b : a.set.call(this, b), d.locked || (e = !0, f.forEach(function(a) {
                        var c = a.ractive,
                            d = a.keypath;
                        c.set(d, b)
                    }), e = !1))
                },
                enumerable: !0
            };
        return g.set.__magic = {
            dependants: f,
            originalDescriptor: a
        }, g
    }

    function Ie(a, b, c) {
        if (!a.set || !a.set.__magic) return !0;
        for (var d = a.set.__magic, e = d.length; e--;) {
            var f = d[e];
            if (f.ractive === b && f.keypath === c) return d.splice(e, 1), !1
        }
    }

    function Je(a) {
        var b = a.replace(/^\t+/gm, function(a) {
                return a.split("\t").join("  ")
            }).split("\n"),
            c = b.length < 2 ? 0 : b.slice(1).reduce(function(a, b) {
                return Math.min(a, /^\s*/.exec(b)[0].length)
            }, 1 / 0);
        return b.map(function(a, b) {
            return "    " + (b ? a.substring(c) : a)
        }).join("\n")
    }

    function Ke(a) {
        if (!a) return "";
        for (var b = a.split("\n"), c = Wl.name + ".getValue", d = [], e = b.length, f = 1; f < e; f += 1) {
            var g = b[f];
            if (~g.indexOf(c)) return d.join("\n");
            d.push(g)
        }
    }

    function Le(a, b, c) {
        var d, e, f, g, h;
        return "function" == typeof c && (d = T(c, a), f = c.toString(), g = !0), "string" == typeof c && (d = Md(c, a), f = c), "object" == typeof c && ("string" == typeof c.get ? (d = Md(c.get, a), f = c.get) : "function" == typeof c.get ? (d = T(c.get, a), f = c.get.toString(), g = !0) : o("`%s` computation must have a `get()` method", b), "function" == typeof c.set && (e = T(c.set, a), h = c.set.toString())), {
            getter: d,
            setter: e,
            getterString: f,
            setterString: h,
            getterUseStack: g
        }
    }

    function Me(a, b) {
        gg.DEBUG && Ng(), Pe(a), Ig(a, "data", {
            get: Qe
        }), $l.fire(a, b), _l.forEach(function(c) {
            a[c] = g(Hg(a.constructor[c] || null), b[c])
        });
        var c = new Zl({
            adapt: Oe(a, a.adapt, b),
            data: ti.init(a.constructor, a, b),
            ractive: a
        });
        a.viewmodel = c;
        var d = g(Hg(a.constructor.prototype.computed), b.computed);
        for (var e in d) {
            var f = Le(a, e, d[e]);
            c.compute(e, f)
        }
    }

    function Ne(a) {
        for (var b = [], c = b.concat.apply(b, a), d = c.length; d--;) ~b.indexOf(c[d]) || b.unshift(c[d]);
        return b
    }

    function Oe(a, b, c) {
        function d(b) {
            return "string" == typeof b && (b = u("adaptors", a, b), b || o(Vg(b, "adaptor"))), b
        }
        b = b.map(d);
        var e = B(c.adapt).map(d),
            f = [],
            g = [b, e];
        a.parent && !a.isolated && g.push(a.parent.viewmodel.adaptors), g.push(f);
        var h = "magic" in c ? c.magic : a.magic,
            i = "modifyArrays" in c ? c.modifyArrays : a.modifyArrays;
        if (h) {
            if (!hg) throw new Error("Getters and setters (magic mode) are not supported in this browser");
            i && f.push(Vl), f.push(Sl)
        }
        return i && f.push(Pl), Ne(g)
    }

    function Pe(a) {
        a._guid = "r-" + am++, a._subs = Hg(null), a._config = {}, a.nodes = {}, a.event = null, a._eventQueue = [], a._liveQueries = [], a._liveComponentQueries = [], a._observers = [], a.component || (a.root = a, a.parent = a.container = null)
    }

    function Qe() {
        throw new Error("Using `ractive.data` is no longer supported - you must use the `ractive.get()` API instead")
    }

    function Re(a, b) {
        return a[b._guid] || (a[b._guid] = [])
    }

    function Se(a, b) {
        var c = Re(a.queue, b);
        for (a.hook.fire(b); c.length;) Se(a, c.shift());
        delete a.queue[b._guid]
    }

    function Te(a, c, d) {
        Object.keys(a.viewmodel.computations).forEach(function(b) {
            var c = a.viewmodel.computations[b];
            a.viewmodel.value.hasOwnProperty(b) && c.set(a.viewmodel.value[b])
        }), ml.init(a.constructor, a, c), cm.fire(a), dm.begin(a);
        var e;
        if (a.template) {
            var f;
            (d.cssIds || a.cssId) && (f = d.cssIds ? d.cssIds.slice() : [], a.cssId && f.push(a.cssId)), a.fragment = e = new yn({
                owner: a,
                template: a.template,
                cssIds: f
            }).bind(a.viewmodel)
        }
        if (dm.end(a), e) {
            var g = b(a.el);
            if (g) {
                var h = a.render(g, a.append);
                gg.DEBUG_PROMISES && h.catch(function(b) {
                    throw t("Promise debugging is enabled, to help solve errors that happen asynchronously. Some browsers will log unhandled promise rejections, in which case you can safely disable promise debugging:\n  Ractive.DEBUG_PROMISES = false;"), s("An error happened during rendering", {
                        ractive: a
                    }), p(b), b
                })
            }
        }
    }

    function Ue(a) {
        var b = a.ractive;
        do
            for (var c = b._liveComponentQueries, d = c.length; d--;) {
                var e = c[d],
                    f = c["_" + e];
                f.test(a) && (f.add(a.instance), a.liveQueries.push(f))
            }
        while (b = b.parent)
    }

    function Ve(a) {
        for (var b = a.ractive; b;) {
            var c = b._liveComponentQueries["_" + a.name];
            c && c.remove(a), b = b.parent
        }
    }

    function We(a) {
        a.makeDirty()
    }

    function Xe(a) {
        var b = a.node,
            c = a.ractive;
        do
            for (var d = c._liveQueries, e = d.length; e--;) {
                var f = d[e],
                    g = d["_" + f];
                g.test(b) && (g.add(b), a.liveQueries.push(g))
            }
        while (c = c.parent)
    }

    function Ye(a, b) {
        t("The " + a + " being used for two-way binding is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity", {
            ractive: b
        })
    }

    function Ze() {
        this._ractive.binding.handleChange()
    }

    function $e(a, b, c) {
        var d = "" + a + "-bindingGroup";
        return b[d] || (b[d] = new rm(d, b, c))
    }

    function _e() {
        var a = this.bindings.filter(function(a) {
                return a.node && a.node.checked
            }).map(function(a) {
                return a.element.getAttribute("value")
            }),
            b = [];
        return a.forEach(function(a) {
            z(b, a) || b.push(a)
        }), b
    }

    function af() {
        Ze.call(this);
        var a = this._ractive.binding.model.get();
        this.value = void 0 == a ? "" : a
    }

    function bf(a) {
        var b;
        return function() {
            var c = this;
            b && clearTimeout(b), b = setTimeout(function() {
                var a = c._ractive.binding;
                a.rendered && Ze.call(c), b = null
            }, a)
        }
    }

    function cf(a) {
        return a.selectedOptions ? E(a.selectedOptions) : a.options ? E(a.options).filter(function(a) {
            return a.selected
        }) : []
    }

    function df(a) {
        return zm[a] || (zm[a] = [])
    }

    function ef() {
        var a = this.bindings.filter(function(a) {
            return a.node.checked
        });
        if (a.length > 0) return a[0].element.getAttribute("value")
    }

    function ff(a) {
        return a && a.template.f && 1 === a.template.f.length && a.template.f[0].t === Di && !a.template.f[0].s
    }

    function gf(a) {
        var b = a.attributeByName;
        if (a.getAttribute("contenteditable") || ff(b.contenteditable)) return ff(b.value) ? um : null;
        if ("input" === a.name) {
            var c = a.getAttribute("type");
            if ("radio" === c || "checkbox" === c) {
                var d = ff(b.name),
                    e = ff(b.checked);
                if (d && e) {
                    if ("radio" !== c) return qm;
                    s("A radio input can have two-way binding on its name attribute, or its checked attribute - not both", {
                        ractive: a.root
                    })
                }
                if (d) return "radio" === c ? Bm : tm;
                if (e) return "radio" === c ? Am : qm
            }
            return "file" === c && ff(b.value) ? wm : ff(b.value) ? "number" === c || "range" === c ? ym : vm : null
        }
        return "select" === a.name && ff(b.value) ? a.getAttribute("multiple") ? xm : Cm : "textarea" === a.name && ff(b.value) ? vm : void 0
    }

    function hf(a) {
        a.makeDirty()
    }

    function jf(a) {
        var b = a.attributeByName,
            c = b.type,
            d = b.value,
            e = b.name;
        if (c && "radio" === c.value && d && e.interpolator) return d.getValue() === e.interpolator.model.get() || void 0
    }

    function kf(a) {
        var b = a.toString();
        return b ? " " + b : ""
    }

    function lf(a) {
        for (var b = a.liveQueries.length; b--;) {
            var c = a.liveQueries[b];
            c.remove(a.node)
        }
    }

    function mf(a) {
        var b = a.getAttribute("xmlns");
        if (b) return b;
        if ("svg" === a.name) return Cg;
        var c = a.parent;
        return c ? "foreignobject" === c.name ? Ag : c.node.namespaceURI : a.ractive.el.namespaceURI
    }

    function nf() {
        var a = this._ractive.proxy;
        fh.start(), a.formBindings.forEach( of ), fh.end()
    }

    function of (a) {
        a.model.set(a.resetValue)
    }

    function pf(a) {
        var b = a.template.f,
            c = a.element.instance.viewmodel,
            d = c.value;
        1 === b.length && b[0].t === Di ? (a.model = ee(a.parentFragment, b[0]), a.model || (t("The " + a.name + "='{{" + b[0].r + "}}' mapping is ambiguous, and may cause unexpected results. Consider initialising your data to eliminate the ambiguity", {
            ractive: a.element.instance
        }), a.parentFragment.ractive.get(a.name), a.model = a.parentFragment.findContext().joinKey(a.name)), a.link = c.createLink(a.name, a.model, b[0].r), void 0 === a.model.get() && a.name in d && a.model.set(d[a.name])) : (a.boundFragment = new yn({
            owner: a,
            template: b
        }).bind(), a.model = c.joinKey(a.name), a.model.set(a.boundFragment.valueOf()), a.boundFragment.bubble = function() {
            yn.prototype.bubble.call(a.boundFragment), fh.scheduleTask(function() {
                a.boundFragment.update(), a.model.set(a.boundFragment.valueOf())
            })
        })
    }

    function qf(a, b, c) {
        var d = rf(a, b, c || {});
        if (d) return d;
        if (d = cl.fromId(b, {
                noThrow: !0
            })) {
            var e = cl.parseFor(d, a);
            return e.p && h(a.partials, e.p), a.partials[b] = e.t
        }
    }

    function rf(a, b, c) {
        var d = uf(b, c.owner);
        if (d) return d;
        var e = v("partials", a, b);
        if (e) {
            d = e.partials[b];
            var f;
            if ("function" == typeof d && (f = d.bind(e), f.isOwner = e.partials.hasOwnProperty(b), d = f.call(a, cl)), !d && "" !== d) return void s(Ug, b, "partial", "partial", {
                ractive: a
            });
            if (!cl.isParsed(d)) {
                var g = cl.parseFor(d, e);
                g.p && s("Partials ({{>%s}}) cannot contain nested inline partials", b, {
                    ractive: a
                });
                var h = f ? e : sf(e, b);
                h.partials[b] = d = g.t
            }
            return f && (d._fn = f), d.v ? d.t : d
        }
    }

    function sf(a, b) {
        return a.partials.hasOwnProperty(b) ? a : tf(a.constructor, b)
    }

    function tf(a, b) {
        if (a) return a.partials.hasOwnProperty(b) ? a : tf(a._Parent, b)
    }

    function uf(a, b) {
        if (b) {
            if (b.template && b.template.p && b.template.p[a]) return b.template.p[a];
            if (b.parentFragment && b.parentFragment.owner) return uf(a, b.parentFragment.owner)
        }
    }

    function vf(a, b, c) {
        var d;
        try {
            d = cl.parse(b, cl.getParseOptions(c))
        } catch (b) {
            s("Could not parse partial from expression '" + a + "'\n" + b.message)
        }
        return d || {
            t: []
        }
    }

    function wf(a) {
        return !a || i(a) && 0 === a.length || l(a) && 0 === Object.keys(a).length
    }

    function xf(a, b) {
        return b || i(a) ? jj : l(a) || "function" == typeof a ? lj : void 0 === a ? null : hj
    }

    function yf(a, b) {
        for (var c = a.length; c--;)
            if (a[c] == b) return !0
    }

    function zf(a) {
        return a.replace(/-([a-zA-Z])/g, function(a, b) {
            return b.toUpperCase()
        })
    }

    function Af() {
        Um = !mg[Wm]
    }

    function Bf() {
        Um = !1
    }

    function Cf() {
        Um = !0
    }

    function Df(a) {
        return a.replace(_m, "")
    }

    function Ef(a) {
        return a ? (an.test(a) && (a = "-" + a), a.replace(/[A-Z]/g, function(a) {
            return "-" + a.toLowerCase()
        })) : ""
    }

    function Ff(a, b) {
        b ? a.setAttribute("style", b) : (a.getAttribute("style"), a.removeAttribute("style"))
    }

    function Gf(a, b, c) {
        var d = [];
        if (null == a || "" === a) return d;
        var e, f, g;
        rn && (f = sn[b.tagName]) ? (e = Hf("DIV"), e.innerHTML = f[0] + a + f[1], e = e.querySelector(".x"), "SELECT" === e.tagName && (g = e.options[e.selectedIndex])) : b.namespaceURI === Cg ? (e = Hf("DIV"), e.innerHTML = '<svg class="x">' + a + "</svg>", e = e.querySelector(".x")) : "TEXTAREA" === b.tagName ? (e = pg("div"), "undefined" != typeof e.textContent ? e.textContent = a : e.innerHTML = a) : (e = Hf(b.tagName), e.innerHTML = a, "SELECT" === e.tagName && (g = e.options[e.selectedIndex]));
        for (var h; h = e.firstChild;) d.push(h), c.appendChild(h);
        var i;
        if ("SELECT" === b.tagName)
            for (i = d.length; i--;) d[i] !== g && (d[i].selected = !1);
        return d
    }

    function Hf(a) {
        return tn[a] || (tn[a] = pg(a))
    }

    function If(a, b) {
        var c, d = v("components", a, b);
        if (d && (c = d.components[b], !c._Parent)) {
            var e = c.bind(d);
            if (e.isOwner = d.components.hasOwnProperty(b), c = e(), !c) return void s(Ug, b, "component", "component", {
                ractive: a
            });
            "string" == typeof c && (c = If(a, c)), c._fn = e, d.components[b] = c
        }
        return c
    }

    function Jf(a) {
        if ("string" == typeof a.template) return new Rm(a);
        if (a.template.t === Ii) {
            var b = If(a.parentFragment.ractive, a.template.e);
            if (b) return new lm(a, b);
            var c = a.template.e.toLowerCase(),
                d = xn[c] || Em;
            return new d(a)
        }
        var e;
        if (a.template.t === Mi) {
            var f = a.owner;
            (!f || f.type !== Oi && f.type !== Ii) && (f = ge(a.parentFragment)), a.element = f, e = f.type === Oi ? Jm : El
        } else e = wn[a.template.t];
        if (!e) throw new Error("Unrecognised item type " + a.template.t);
        return new e(a)
    }

    function Kf(a, b, c, d) {
        return void 0 === d && (d = 0), a.map(function(a) {
            if (a.type === Ci) return a.template;
            if (a.fragment) return a.fragment.iterations ? a.fragment.iterations.map(function(a) {
                return Kf(a.items, b, c, d)
            }).join("") : Kf(a.fragment.items, b, c, d);
            var e = "" + c + "-" + d++,
                f = a.model || a.newModel;
            return b[e] = f ? f.wrapper ? f.wrapperValue : f.get() : void 0, "${" + e + "}"
        }).join("")
    }

    function Lf(a) {
        a.unrender(!0)
    }

    function Mf(b) {
        dl.init(null, this, {
            template: b
        });
        var c = this.transitionsEnabled;
        this.transitionsEnabled = !1;
        var d = this.component;
        d && (d.shouldDestroy = !0), this.unrender(), d && (d.shouldDestroy = !1), this.fragment.unbind().unrender(!0), this.fragment = new yn({
            template: this.template,
            root: this,
            owner: this
        });
        var e = a();
        this.fragment.bind(this.viewmodel).render(e), d ? this.fragment.findParentNode().insertBefore(e, d.findNextNode()) : this.el.insertBefore(e, this.anchor), this.transitionsEnabled = c
    }

    function Nf(a, b) {
        var c = this;
        return U(c, W(c, a, b))
    }

    function Of(a, b) {
        return X(this, a, void 0 === b ? -1 : -b)
    }

    function Pf() {
        if (this.torndown) return s("ractive.teardown() was called on a Ractive instance that was already torn down"), bh.resolve();
        this.torndown = !0, this.fragment.unbind(), this.viewmodel.teardown(), this._observers.forEach(Aa), this.fragment.rendered && this.el.__ractive_instances__ && D(this.el.__ractive_instances__, this), this.shouldDestroy = !0;
        var a = this.fragment.rendered ? this.unrender() : bh.resolve();
        return Dn.fire(this), a
    }

    function Qf(a) {
        if ("string" != typeof a) throw new TypeError(Tg);
        return U(this, V(this, a).map(function(a) {
            return [a, !a.get()]
        }))
    }

    function Rf() {
        var a = [this.cssId].concat(this.findAllComponents().map(function(a) {
                return a.cssId
            })),
            b = Object.keys(a.reduce(function(a, b) {
                return a[b] = !0, a
            }, {}));
        return _b(b)
    }

    function Sf() {
        return this.fragment.toString(!0)
    }

    function Tf() {
        return this.fragment.toString(!1)
    }

    function Uf(a, b, c) {
        b instanceof HTMLElement || l(b) && (c = b), b = b || this.event.node, b && b._ractive || o("No node was supplied for transition " + a), c = c || {};
        var d = b._ractive.proxy,
            e = new qn({
                owner: d,
                parentFragment: d.parentFragment,
                name: a,
                params: c
            });
        e.bind();
        var f = fh.start(this, !0);
        return fh.registerTransition(e), fh.end(), f.then(function() {
            return e.unbind()
        }), f
    }

    function Vf(a) {
        var b = fh.start();
        return this.viewmodel.joinAll(R(a), {
            lastLink: !1
        }).unlink(), fh.end(), b
    }

    function Wf() {
        if (!this.fragment.rendered) return s("ractive.unrender() was called on a Ractive instance that was not rendered"), bh.resolve();
        var a = fh.start(this, !0),
            b = !this.component || this.component.shouldDestroy || this.shouldDestroy;
        return this.fragment.unrender(b), D(this.el.__ractive_instances__, this), En.fire(this), fh.end(), a
    }

    function Xf(a, b) {
        var c = fh.start(this, !0);
        return a ? this.viewmodel.joinAll(R(a)).updateFromBindings(b !== !1) : this.viewmodel.updateFromBindings(!0), fh.end(), c
    }

    function Yf(a, b, c) {
        return c || Zf(a, b) ? function() {
            var c, d = "_super" in this,
                e = this._super;
            return this._super = b, c = a.apply(this, arguments), d && (this._super = e), c
        } : a
    }

    function Zf(a, b) {
        return "function" == typeof b && /_super/.test(a)
    }

    function $f(a) {
        for (var b = {}; a;) _f(a, b), bg(a, b), a = a._Parent !== gg && a._Parent;
        return b
    }

    function _f(a, b) {
        gl.forEach(function(c) {
            ag(c.useDefaults ? a.prototype : a, b, c.name)
        })
    }

    function ag(a, b, c) {
        var d, e = Object.keys(a[c]);
        e.length && ((d = b[c]) || (d = b[c] = {}), e.filter(function(a) {
            return !(a in d)
        }).forEach(function(b) {
            return d[b] = a[c][b]
        }))
    }

    function bg(a, b) {
        Object.keys(a.prototype).forEach(function(c) {
            if ("computed" !== c) {
                var d = a.prototype[c];
                if (c in b) {
                    if ("function" == typeof b[c] && "function" == typeof d && b[c]._method) {
                        var e, f = d._method;
                        f && (d = d._method), e = Yf(b[c]._method, d), f && (e._method = e), b[c] = e
                    }
                } else b[c] = d._method ? d._method : d
            }
        })
    }

    function cg() {
        for (var a = [], b = arguments.length; b--;) a[b] = arguments[b];
        return a.length ? a.reduce(dg, this) : dg(this)
    }

    function dg(a, b) {
        void 0 === b && (b = {});
        var c, d;
        return b.prototype instanceof gg && (b = $f(b)), c = function(a) {
            return this instanceof c ? (Me(this, a || {}), void Te(this, a || {}, {})) : new c(a)
        }, d = Hg(a.prototype), d.constructor = c, Jg(c, {
            defaults: {
                value: d
            },
            extend: {
                value: cg,
                writable: !0,
                configurable: !0
            },
            _Parent: {
                value: a
            }
        }), ml.extend(a, d, b), ti.extend(a, d, b), b.computed && (d.computed = g(Hg(a.prototype.computed), b.computed)), c.prototype = d, c
    }

    function eg() {
        for (var a = [], b = arguments.length; b--;) a[b] = arguments[b];
        return a.map(P).join(".")
    }

    function fg(a) {
        return R(a).map(S)
    }

    function gg(a) {
        return this instanceof gg ? (Me(this, a || {}), void Te(this, a || {}, {})) : new gg(a)
    }
    var hg, ig = {
            el: void 0,
            append: !1,
            template: null,
            delimiters: ["{{", "}}"],
            tripleDelimiters: ["{{{", "}}}"],
            staticDelimiters: ["[[", "]]"],
            staticTripleDelimiters: ["[[[", "]]]"],
            csp: !0,
            interpolate: !1,
            preserveWhitespace: !1,
            sanitize: !1,
            stripComments: !0,
            contextLines: 0,
            data: {},
            computed: {},
            magic: !1,
            modifyArrays: !1,
            adapt: [],
            isolated: !1,
            twoway: !0,
            lazy: !1,
            noIntro: !1,
            transitionsEnabled: !0,
            complete: void 0,
            css: null,
            noCssTransform: !1
        },
        jg = {
            linear: function(a) {
                return a
            },
            easeIn: function(a) {
                return Math.pow(a, 3)
            },
            easeOut: function(a) {
                return Math.pow(a - 1, 3) + 1
            },
            easeInOut: function(a) {
                return (a /= .5) < 1 ? .5 * Math.pow(a, 3) : .5 * (Math.pow(a - 2, 3) + 2)
            }
        },
        kg = null,
        lg = "undefined" != typeof window ? window : null,
        mg = lg ? document : null,
        ng = !!mg,
        og = ("undefined" != typeof navigator && /jsDom/.test(navigator.appName), "undefined" != typeof console && "function" == typeof console.warn && "function" == typeof console.warn.apply);
    try {
        Object.defineProperty({}, "test", {
            value: 0
        }), hg = !0
    } catch (a) {
        hg = !1
    }
    var pg, qg, rg, sg, tg, ug, vg, wg, xg, yg = !!mg && mg.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
        zg = ["o", "ms", "moz", "webkit"],
        Ag = "http://www.w3.org/1999/xhtml",
        Bg = "http://www.w3.org/1998/Math/MathML",
        Cg = "http://www.w3.org/2000/svg",
        Dg = "http://www.w3.org/1999/xlink",
        Eg = "http://www.w3.org/XML/1998/namespace",
        Fg = "http://www.w3.org/2000/xmlns",
        Gg = {
            html: Ag,
            mathml: Bg,
            svg: Cg,
            xlink: Dg,
            xml: Eg,
            xmlns: Fg
        };
    if (pg = yg ? function(a, b, c) {
            return b && b !== Ag ? c ? mg.createElementNS(b, a, c) : mg.createElementNS(b, a) : c ? mg.createElement(a, c) : mg.createElement(a)
        } : function(a, b, c) {
            if (b && b !== Ag) throw "This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you're trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information";
            return c ? mg.createElement(a, c) : mg.createElement(a)
        }, ng) {
        for (rg = pg("div"), sg = ["matches", "matchesSelector"], xg = function(a) {
                return function(b, c) {
                    return b[a](c)
                }
            }, vg = sg.length; vg-- && !qg;)
            if (tg = sg[vg], rg[tg]) qg = xg(tg);
            else
                for (wg = zg.length; wg--;)
                    if (ug = zg[vg] + tg.substr(0, 1).toUpperCase() + tg.substring(1), rg[ug]) {
                        qg = xg(ug);
                        break
                    }
        qg || (qg = function(a, b) {
            var c, d, e;
            for (d = a.parentNode, d || (rg.innerHTML = "", d = rg, a = a.cloneNode(), rg.appendChild(a)), c = d.querySelectorAll(b), e = c.length; e--;)
                if (c[e] === a) return !0;
            return !1
        })
    } else qg = null;
    var Hg, Ig, Jg, Kg = /[A-Z]/g;
    try {
        Object.defineProperty({}, "test", {
            get: function() {},
            set: function() {}
        }), mg && Object.defineProperty(pg("div"), "test", {
            value: 0
        }), Ig = Object.defineProperty
    } catch (a) {
        Ig = function(a, b, c) {
            c.get ? a[b] = c.get() : a[b] = c.value
        }
    }
    try {
        try {
            Object.defineProperties({}, {
                test: {
                    value: 0
                }
            })
        } catch (a) {
            throw a
        }
        mg && Object.defineProperties(pg("div"), {
            test: {
                value: 0
            }
        }), Jg = Object.defineProperties
    } catch (a) {
        Jg = function(a, b) {
            var c;
            for (c in b) b.hasOwnProperty(c) && Ig(a, c, b[c])
        }
    }
    try {
        Object.create(null), Hg = Object.create
    } catch (a) {
        Hg = function() {
            var a = function() {};
            return function(b, c) {
                var d;
                return null === b ? {} : (a.prototype = b, d = new a, c && Object.defineProperties(d, c), d)
            }
        }()
    }
    var Lg, Mg, Ng, Og = Object.prototype.hasOwnProperty,
        Pg = Object.prototype.toString,
        Qg = {};
    if (og) {
        var Rg = ["%cRactive.js %c0.8.9 %cin debug mode, %cmore...", "color: rgb(114, 157, 52); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(85, 85, 85); font-weight: normal;", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;"],
            Sg = "You're running Ractive 0.8.9 in debug mode - messages will be printed to the console to help you fix problems and optimise your application.\n\nTo disable debug mode, add this line at the start of your app:\n  Ractive.DEBUG = false;\n\nTo disable debug mode when your app is minified, add this snippet:\n  Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});\n\nGet help and support:\n  http://docs.ractivejs.org\n  http://stackoverflow.com/questions/tagged/ractivejs\n  http://groups.google.com/forum/#!forum/ractive-js\n  http://twitter.com/ractivejs\n\nFound a bug? Raise an issue:\n  https://github.com/ractivejs/ractive/issues\n\n";
        Ng = function() {
            if (gg.WELCOME_MESSAGE === !1) return void(Ng = m);
            var a = "WELCOME_MESSAGE" in gg ? gg.WELCOME_MESSAGE : Sg,
                b = !!console.groupCollapsed;
            b && console.groupCollapsed.apply(console, Rg), console.log(a), b && console.groupEnd(Rg), Ng = m
        }, Mg = function(a, b) {
            if (Ng(), "object" == typeof b[b.length - 1]) {
                var c = b.pop(),
                    d = c ? c.ractive : null;
                if (d) {
                    var e;
                    d.component && (e = d.component.name) && (a = "<" + e + "> " + a);
                    var f;
                    (f = c.node || d.fragment && d.fragment.rendered && d.find("*")) && b.push(f)
                }
            }
            console.warn.apply(console, ["%cRactive.js: %c" + a, "color: rgb(114, 157, 52);", "color: rgb(85, 85, 85);"].concat(b))
        }, Lg = function() {
            console.log.apply(console, arguments)
        }
    } else Mg = Lg = Ng = m;
    var Tg = "Bad arguments",
        Ug = 'A function was specified for "%s" %s, but no %s was returned',
        Vg = function(a, b) {
            return 'Missing "' + a + '" ' + b + " plugin. You may need to download a plugin via http://docs.ractivejs.org/latest/plugins#" + b + "s"
        },
        Wg = {
            number: function(a, b) {
                var c;
                return k(a) && k(b) ? (a = +a, b = +b, c = b - a, c ? function(b) {
                    return a + b * c
                } : function() {
                    return a
                }) : null
            },
            array: function(a, b) {
                var c, d, e, f;
                if (!i(a) || !i(b)) return null;
                for (c = [], d = [], f = e = Math.min(a.length, b.length); f--;) d[f] = w(a[f], b[f]);
                for (f = e; f < a.length; f += 1) c[f] = a[f];
                for (f = e; f < b.length; f += 1) c[f] = b[f];
                return function(a) {
                    for (var b = e; b--;) c[b] = d[b](a);
                    return c
                }
            },
            object: function(a, b) {
                var c, d, e, f, g;
                if (!l(a) || !l(b)) return null;
                c = [], f = {}, e = {};
                for (g in a) Og.call(a, g) && (Og.call(b, g) ? (c.push(g), e[g] = w(a[g], b[g]) || x(b[g])) : f[g] = a[g]);
                for (g in b) Og.call(b, g) && !Og.call(a, g) && (f[g] = b[g]);
                return d = c.length,
                    function(a) {
                        for (var b, g = d; g--;) b = c[g], f[b] = e[b](a);
                        return f
                    }
            }
        },
        Xg = {
            construct: {
                deprecated: "beforeInit",
                replacement: "onconstruct"
            },
            render: {
                deprecated: "init",
                message: 'The "init" method has been deprecated and will likely be removed in a future release. You can either use the "oninit" method which will fire only once prior to, and regardless of, any eventual ractive instance being rendered, or if you need to access the rendered DOM, use "onrender" instead. See http://docs.ractivejs.org/latest/migrating for more information.'
            },
            complete: {
                deprecated: "complete",
                replacement: "oncomplete"
            }
        },
        Yg = function(a) {
            this.event = a, this.method = "on" + a, this.deprecate = Xg[a]
        };
    Yg.prototype.call = function(a, b, c) {
        if (b[a]) return c ? b[a](c) : b[a](), !0
    }, Yg.prototype.fire = function(a, b) {
        this.call(this.method, a, b), !a[this.method] && this.deprecate && this.call(this.deprecate.deprecated, a, b) && (this.deprecate.message ? s(this.deprecate.message) : s('The method "%s" has been deprecated in favor of "%s" and will likely be removed in a future release. See http://docs.ractivejs.org/latest/migrating for more information.', this.deprecate.deprecated, this.deprecate.replacement)), b ? a.fire(this.event, b) : a.fire(this.event)
    };
    var Zg, $g = {},
        _g = {},
        ah = {};
    "function" == typeof Promise ? Zg = Promise : (Zg = function(a) {
        var b, c, d, e, f, g, h = [],
            i = [],
            j = $g;
        d = function(a) {
            return function(d) {
                j === $g && (b = d, j = a, c = G(j === _g ? h : i, b), F(c))
            }
        }, e = d(_g), f = d(ah);
        try {
            a(e, f)
        } catch (a) {
            f(a)
        }
        return g = {
            then: function(a, b) {
                var d = new Zg(function(e, f) {
                    var g = function(a, b, c) {
                        "function" == typeof a ? b.push(function(b) {
                            var c;
                            try {
                                c = a(b), H(d, c, e, f)
                            } catch (a) {
                                f(a)
                            }
                        }) : b.push(c)
                    };
                    g(a, h, e), g(b, i, f), j !== $g && F(c)
                });
                return d
            }
        }, g.catch = function(a) {
            return this.then(null, a)
        }, g
    }, Zg.all = function(a) {
        return new Zg(function(b, c) {
            var d, e, f, g = [];
            if (!a.length) return void b(g);
            for (f = function(a, e) {
                    a && "function" == typeof a.then ? a.then(function(a) {
                        g[e] = a, --d || b(g)
                    }, c) : (g[e] = a, --d || b(g))
                }, d = e = a.length; e--;) f(a[e], e)
        })
    }, Zg.resolve = function(a) {
        return new Zg(function(b) {
            b(a)
        })
    }, Zg.reject = function(a) {
        return new Zg(function(b, c) {
            c(a)
        })
    });
    var bh = Zg,
        ch = function(a, b) {
            this.callback = a, this.parent = b, this.intros = [], this.outros = [], this.children = [], this.totalChildren = this.outroChildren = 0, this.detachQueue = [], this.outrosComplete = !1, b && b.addChild(this)
        };
    ch.prototype.add = function(a) {
        var b = a.isIntro ? this.intros : this.outros;
        b.push(a)
    }, ch.prototype.addChild = function(a) {
        this.children.push(a), this.totalChildren += 1, this.outroChildren += 1
    }, ch.prototype.decrementOutros = function() {
        this.outroChildren -= 1, K(this)
    }, ch.prototype.decrementTotal = function() {
        this.totalChildren -= 1, K(this)
    }, ch.prototype.detachNodes = function() {
        this.detachQueue.forEach(I), this.children.forEach(J)
    }, ch.prototype.ready = function() {
        L(this)
    }, ch.prototype.remove = function(a) {
        var b = a.isIntro ? this.intros : this.outros;
        D(b, a), K(this)
    }, ch.prototype.start = function() {
        this.children.forEach(function(a) {
            return a.start()
        }), this.intros.concat(this.outros).forEach(function(a) {
            return a.start()
        }), this.ready = !0, K(this)
    };
    var dh, eh = new Yg("change"),
        fh = {
            start: function(a, b) {
                var c, d;
                return b && (c = new bh(function(a) {
                    return d = a
                })), dh = {
                    previousBatch: dh,
                    transitionManager: new ch(d, dh && dh.transitionManager),
                    fragments: [],
                    tasks: [],
                    immediateObservers: [],
                    deferredObservers: [],
                    ractives: [],
                    instance: a
                }, c
            },
            end: function() {
                O(), dh.previousBatch || dh.transitionManager.start(), dh = dh.previousBatch
            },
            addFragment: function(a) {
                y(dh.fragments, a)
            },
            addFragmentToRoot: function(a) {
                if (dh) {
                    for (var b = dh; b.previousBatch;) b = b.previousBatch;
                    y(b.fragments, a)
                }
            },
            addInstance: function(a) {
                dh && y(dh.ractives, a)
            },
            addObserver: function(a, b) {
                y(b ? dh.deferredObservers : dh.immediateObservers, a)
            },
            registerTransition: function(a) {
                a._manager = dh.transitionManager, dh.transitionManager.add(a)
            },
            detachWhenReady: function(a) {
                dh.transitionManager.detachQueue.push(a)
            },
            scheduleTask: function(a, b) {
                var c;
                if (dh) {
                    for (c = dh; b && c.previousBatch;) c = c.previousBatch;
                    c.tasks.push(a)
                } else a()
            }
        },
        gh = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g,
        hh = /([^\\](?:\\\\)*)\./,
        ih = /\\|\./g,
        jh = /((?:\\)+)\1|\\(\.)/g,
        kh = /\*/,
        lh = "Cannot add to a non-numeric value",
        mh = bh.resolve();
    Ig(mh, "stop", {
        value: m
    });
    var nh = jg.linear,
        oh = new Yg("detach"),
        ph = function(a, b, c, d) {
            this.ractive = a, this.selector = b, this.live = c, this.isComponentQuery = d, this.result = [], this.dirty = !0
        };
    ph.prototype.add = function(a) {
        this.result.push(a), this.makeDirty()
    }, ph.prototype.cancel = function() {
        var a = this._root[this.isComponentQuery ? "liveComponentQueries" : "liveQueries"],
            b = this.selector,
            c = a.indexOf(b);
        c !== -1 && (a.splice(c, 1), a[b] = null)
    }, ph.prototype.init = function() {
        this.dirty = !1
    }, ph.prototype.makeDirty = function() {
        var a = this;
        this.dirty || (this.dirty = !0, fh.scheduleTask(function() {
            return a.update()
        }))
    }, ph.prototype.remove = function(a) {
        var b = this.result.indexOf(this.isComponentQuery ? a.instance : a);
        b !== -1 && this.result.splice(b, 1)
    }, ph.prototype.update = function() {
        this.result.sort(this.isComponentQuery ? da : ca), this.dirty = !1
    }, ph.prototype.test = function(a) {
        return this.isComponentQuery ? !this.selector || a.name === this.selector : a ? qg(a, this.selector) : null
    };
    var qh, rh = {},
        sh = {},
        th = [],
        uh = function(a, b) {
            this.value = a, this.isReadonly = this.isKey = !0, this.deps = [], this.links = [], this.parent = b
        };
    uh.prototype.get = function(a) {
        return a && ya(this), S(this.value)
    }, uh.prototype.getKeypath = function() {
        return S(this.value)
    }, uh.prototype.rebinding = function(a, b) {
        for (var c = this, d = this.deps.length; d--;) c.deps[d].rebinding(a, b, !1);
        for (d = this.links.length; d--;) c.links[d].rebinding(a, b, !1)
    }, uh.prototype.register = function(a) {
        this.deps.push(a)
    }, uh.prototype.registerLink = function(a) {
        y(this.links, a)
    }, uh.prototype.unregister = function(a) {
        D(this.deps, a)
    }, uh.prototype.unregisterLink = function(a) {
        D(this.links, a)
    };
    var vh = function(a, b) {
        this.parent = a, this.ractive = b, this.value = b ? a.getKeypath(b) : a.getKeypath(), this.deps = [], this.children = {}, this.isReadonly = this.isKeypath = !0
    };
    vh.prototype.get = function(a) {
        return a && ya(this), this.value
    }, vh.prototype.getChild = function(a) {
        if (!(a._guid in this.children)) {
            var b = new vh(this.parent, a);
            this.children[a._guid] = b, b.owner = this
        }
        return this.children[a._guid]
    }, vh.prototype.getKeypath = function() {
        return this.value
    }, vh.prototype.handleChange = function() {
        for (var a = this, b = Object.keys(this.children), c = b.length; c--;) a.children[b[c]].handleChange();
        this.deps.forEach(Ba)
    }, vh.prototype.rebindChildren = function(a) {
        for (var b = this, c = Object.keys(this.children), d = c.length; d--;) {
            var e = b.children[c[d]];
            e.value = a.getKeypath(e.ractive), e.handleChange()
        }
    }, vh.prototype.rebinding = function(a, b) {
        for (var c = this, d = a ? a.getKeypathModel(this.ractive) : void 0, e = Object.keys(this.children), f = e.length; f--;) c.children[e[f]].rebinding(a, b, !1);
        for (f = this.deps.length; f--;) c.deps[f].rebinding(d, c, !1)
    }, vh.prototype.register = function(a) {
        this.deps.push(a)
    }, vh.prototype.removeChild = function(a) {
        a.ractive && delete this.children[a.ractive._guid]
    }, vh.prototype.teardown = function() {
        var a = this;
        this.owner && this.owner.removeChild(this);
        for (var b = Object.keys(this.children), c = b.length; c--;) a.children[b[c]].teardown()
    }, vh.prototype.unregister = function(a) {
        D(this.deps, a), this.deps.length || this.teardown()
    };
    var wh = Object.prototype.hasOwnProperty,
        xh = {
            early: [],
            mark: []
        },
        yh = {
            early: [],
            mark: []
        },
        zh = function(a) {
            this.deps = [], this.children = [], this.childByKey = {}, this.links = [], this.keyModels = {}, this.unresolved = [], this.unresolvedByKey = {}, this.bindings = [], this.patternObservers = [], a && (this.parent = a, this.root = a.root)
        };
    zh.prototype.addUnresolved = function(a, b) {
        this.unresolvedByKey[a] || (this.unresolved.push(a), this.unresolvedByKey[a] = []), this.unresolvedByKey[a].push(b)
    }, zh.prototype.addShuffleTask = function(a, b) {
        void 0 === b && (b = "early"), xh[b].push(a)
    }, zh.prototype.addShuffleRegister = function(a, b) {
        void 0 === b && (b = "early"), yh[b].push({
            model: this,
            item: a
        })
    }, zh.prototype.clearUnresolveds = function(a) {
        for (var b = this, c = this.unresolved.length; c--;) {
            var d = b.unresolved[c];
            if (!a || d === a) {
                for (var e = b.unresolvedByKey[d], f = b.has(d), g = e.length; g--;) f && e[g].attemptResolution(), e[g].resolved && e.splice(g, 1);
                e.length || (b.unresolved.splice(c, 1), b.unresolvedByKey[d] = null)
            }
        }
    }, zh.prototype.findMatches = function(a) {
        var b, c, d = a.length,
            e = [this],
            f = function() {
                var d = a[c];
                "*" === d ? (b = [], e.forEach(function(a) {
                    b.push.apply(b, a.getValueChildren(a.get()))
                })) : b = e.map(function(a) {
                    return a.joinKey(d)
                }), e = b
            };
        for (c = 0; c < d; c += 1) f();
        return b
    }, zh.prototype.getKeyModel = function(a, b) {
        return void 0 === a || b ? (a in this.keyModels || (this.keyModels[a] = new uh(P(a), this)), this.keyModels[a]) : this.parent.getKeyModel(a, !0)
    }, zh.prototype.getKeypath = function(a) {
        return a !== this.ractive && this._link ? this._link.target.getKeypath(a) : (this.keypath || (this.keypath = this.parent.isRoot ? this.key : "" + this.parent.getKeypath(a) + "." + P(this.key)), this.keypath)
    }, zh.prototype.getValueChildren = function(a) {
        var b, c = this;
        if (i(a)) b = [], "length" in this && this.length !== a.length && b.push(this.joinKey("length")), a.forEach(function(a, d) {
            b.push(c.joinKey(d))
        });
        else if (l(a) || "function" == typeof a) b = Object.keys(a).map(function(a) {
            return c.joinKey(a)
        });
        else if (null != a) return [];
        return b
    }, zh.prototype.getVirtual = function(a) {
        var b = this,
            c = this.get(a, {
                virtual: !1
            });
        if (l(c)) {
            for (var d = i(c) ? [] : {}, e = Object.keys(c), f = e.length; f--;) {
                var g = b.childByKey[e[f]];
                g ? g._link ? d[e[f]] = g._link.getVirtual() : d[e[f]] = g.getVirtual() : d[e[f]] = c[e[f]]
            }
            for (f = this.children.length; f--;) {
                var h = b.children[f];
                h.key in d || !h._link || (d[h.key] = h._link.getVirtual())
            }
            return d
        }
        return c
    }, zh.prototype.has = function(a) {
        if (this._link) return this._link.has(a);
        var b = this.get();
        if (!b) return !1;
        if (a = S(a), wh.call(b, a)) return !0;
        for (var c = b.constructor; c !== Function && c !== Array && c !== Object;) {
            if (wh.call(c.prototype, a)) return !0;
            c = c.constructor
        }
        return !1
    }, zh.prototype.joinAll = function(a, b) {
        for (var c = this, d = 0; d < a.length; d += 1) {
            if (b && b.lastLink === !1 && d + 1 === a.length && c.childByKey[a[d]] && c.childByKey[a[d]]._link) return c.childByKey[a[d]];
            c = c.joinKey(a[d], b)
        }
        return c
    }, zh.prototype.notifyUpstream = function() {
        for (var a = this.parent, b = [this.key]; a;) a.patternObservers.length && a.patternObservers.forEach(function(a) {
            return a.notify(b.slice())
        }), b.unshift(a.key), a.links.forEach(Ea), a.deps.forEach(Ba), a = a.parent
    }, zh.prototype.rebinding = function(a, b, c) {
        for (var d = this, e = this.deps.length; e--;) d.deps[e].rebinding && d.deps[e].rebinding(a, b, c);
        for (e = this.links.length; e--;) {
            var f = d.links[e];
            f.owner._link && f.relinking(a, !0, c)
        }
        for (e = this.children.length; e--;) {
            var g = d.children[e];
            g.rebinding(a ? a.joinKey(g.key) : void 0, g, c)
        }
        for (e = this.unresolved.length; e--;)
            for (var h = d.unresolvedByKey[d.unresolved[e]], i = h.length; i--;) h[i].rebinding(a, b);
        for (this.keypathModel && this.keypathModel.rebinding(a, b, !1), e = this.bindings.length; e--;) d.bindings[e].rebinding(a, b, c)
    }, zh.prototype.register = function(a) {
        this.deps.push(a)
    }, zh.prototype.registerChange = function(a, b) {
        this.isRoot ? (this.changes[a] = b, fh.addInstance(this.root.ractive)) : this.root.registerChange(a, b)
    }, zh.prototype.registerLink = function(a) {
        y(this.links, a)
    }, zh.prototype.registerPatternObserver = function(a) {
        this.patternObservers.push(a), this.register(a)
    }, zh.prototype.registerTwowayBinding = function(a) {
        this.bindings.push(a)
    }, zh.prototype.removeUnresolved = function(a, b) {
        var c = this.unresolvedByKey[a];
        c && D(c, b)
    }, zh.prototype.shuffled = function() {
        for (var a = this, b = this.children.length; b--;) a.children[b].shuffled();
        this.wrapper && (this.wrapper.teardown(), this.wrapper = null, this.rewrap = !0)
    }, zh.prototype.unregister = function(a) {
        D(this.deps, a)
    }, zh.prototype.unregisterLink = function(a) {
        D(this.links, a)
    }, zh.prototype.unregisterPatternObserver = function(a) {
        D(this.patternObservers, a), this.unregister(a)
    }, zh.prototype.unregisterTwowayBinding = function(a) {
        D(this.bindings, a)
    }, zh.prototype.updateFromBindings = function(a) {
        for (var b = this, c = this.bindings.length; c--;) {
            var d = b.bindings[c].getValue();
            d !== b.value && b.set(d)
        }
        if (!this.bindings.length) {
            var e = Oa(this.deps);
            e && e.value !== this.value && this.set(e.value)
        }
        a && (this.children.forEach(Na), this.links.forEach(Na), this._link && this._link.updateFromBindings(a))
    }, uh.prototype.addShuffleTask = zh.prototype.addShuffleTask, uh.prototype.addShuffleRegister = zh.prototype.addShuffleRegister, vh.prototype.addShuffleTask = zh.prototype.addShuffleTask, vh.prototype.addShuffleRegister = zh.prototype.addShuffleRegister;
    var Ah = function(a) {
        function b(b, c, d, e) {
            a.call(this, b), this.owner = c, this.target = d, this.key = void 0 === e ? c.key : e, c.isLink && (this.sourcePath = "" + c.sourcePath + "." + this.key), d.registerLink(this), this.isReadonly = b.isReadonly, this.isLink = !0
        }
        return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.animate = function(a, b, c, d) {
            return this.target.animate(a, b, c, d)
        }, b.prototype.applyValue = function(a) {
            this.target.applyValue(a)
        }, b.prototype.get = function(a, b) {
            return a && (ya(this), b = b || {}, b.unwrap = !0), this.target.get(!1, b)
        }, b.prototype.getKeypath = function(b) {
            return b && b !== this.root.ractive ? this.target.getKeypath(b) : a.prototype.getKeypath.call(this, b)
        }, b.prototype.getKeypathModel = function(a) {
            return this.keypathModel || (this.keypathModel = new vh(this)), a && a !== this.root.ractive ? this.keypathModel.getChild(a) : this.keypathModel
        }, b.prototype.handleChange = function() {
            this.deps.forEach(Ba), this.links.forEach(Ba), this.notifyUpstream()
        }, b.prototype.joinKey = function(a) {
            if (void 0 === a || "" === a) return this;
            if (!this.childByKey.hasOwnProperty(a)) {
                var c = new b(this, this, this.target.joinKey(a), a);
                this.children.push(c), this.childByKey[a] = c
            }
            return this.childByKey[a]
        }, b.prototype.mark = function() {
            this.target.mark()
        }, b.prototype.marked = function() {
            this.links.forEach(Da), this.deps.forEach(Ba), this.clearUnresolveds()
        }, b.prototype.notifiedUpstream = function() {
            this.links.forEach(Ea), this.deps.forEach(Ba)
        }, b.prototype.relinked = function() {
            this.target.registerLink(this), this.children.forEach(function(a) {
                return a.relinked()
            })
        }, b.prototype.relinking = function(a, b, c) {
            var d = this;
            b && this.sourcePath && (a = Qa(this.sourcePath, a, this.target)), a && this.target !== a && (this.target.unregisterLink(this), this.keypathModel && this.keypathModel.rebindChildren(a), this.target = a, this.children.forEach(function(b) {
                b.relinking(a.joinKey(b.key), !1, c)
            }), b && this.addShuffleTask(function() {
                d.relinked(), c || d.notifyUpstream()
            }))
        }, b.prototype.set = function(a) {
            this.target.set(a)
        }, b.prototype.shuffle = function(a) {
            var b = this;
            if (!this.shuffling)
                if (this.target.shuffling) {
                    this.shuffling = !0;
                    for (var c = a.length; c--;) {
                        var d = a[c];
                        c !== d && (c in b.childByKey && b.childByKey[c].rebinding(~d ? b.joinKey(d) : void 0, b.childByKey[c], !0), !~d && b.keyModels[c] ? b.keyModels[c].rebinding(void 0, b.keyModels[c], !1) : ~d && b.keyModels[c] && (b.keyModels[d] || b.childByKey[d].getKeyModel(d), b.keyModels[c].rebinding(b.keyModels[d], b.keyModels[c], !1)))
                    }
                    var e = this.source().length !== this.source().value.length;
                    for (this.links.forEach(function(b) {
                            return b.shuffle(a)
                        }), c = this.deps.length; c--;) b.deps[c].shuffle && b.deps[c].shuffle(a);
                    this.marked(), e && this.notifyUpstream(), this.shuffling = !1
                } else this.target.shuffle(a)
        }, b.prototype.source = function() {
            return this.target.source ? this.target.source() : this.target
        }, b.prototype.teardown = function() {
            this._link && this._link.teardown(), this.children.forEach(Ga)
        }, b
    }(zh);
    zh.prototype.link = function(a, b) {
        var c = this._link || new Ah(this.parent, this, a, this.key);
        c.sourcePath = b, this._link && this._link.relinking(a, !0, !1), this.rebinding(c, this, !1), Pa();
        var d = !this._link;
        return this._link = c, d && this.parent.clearUnresolveds(), c.marked(), c
    }, zh.prototype.unlink = function() {
        if (this._link) {
            var a = this._link;
            this._link = void 0, a.rebinding(this, this._link), Pa(), a.teardown()
        }
    };
    var Bh;
    lg ? (! function(a, b, c) {
        var d, e;
        if (!c.requestAnimationFrame) {
            for (d = 0; d < a.length && !c.requestAnimationFrame; ++d) c.requestAnimationFrame = c[a[d] + "RequestAnimationFrame"];
            c.requestAnimationFrame || (e = c.setTimeout, c.requestAnimationFrame = function(a) {
                var c, d, f;
                return c = Date.now(), d = Math.max(0, 16 - (c - b)), f = e(function() {
                    a(c + d)
                }, d), b = c + d, f
            })
        }
    }(zg, 0, lg), Bh = lg.requestAnimationFrame) : Bh = null;
    var Ch = Bh,
        Dh = lg && lg.performance && "function" == typeof lg.performance.now ? function() {
            return lg.performance.now()
        } : function() {
            return Date.now()
        },
        Eh = [],
        Fh = !1,
        Gh = function(a) {
            this.duration = a.duration, this.step = a.step, this.complete = a.complete, this.easing = a.easing, this.start = Dh(), this.end = this.start + this.duration, this.running = !0, Eh.push(this), Fh || Ch(Ra)
        };
    Gh.prototype.tick = function(a) {
        if (!this.running) return !1;
        if (a > this.end) return this.step && this.step(1), this.complete && this.complete(1), !1;
        var b = a - this.start,
            c = this.easing(b / this.duration);
        return this.step && this.step(c), !0
    }, Gh.prototype.stop = function() {
        this.abort && this.abort(), this.running = !1
    };
    var Hh = {},
        Ih = function(a) {
            function b(b, c) {
                a.call(this, b), this.ticker = null, b && (this.key = S(c), this.isReadonly = b.isReadonly, b.value && (this.value = b.value[this.key], i(this.value) && (this.length = this.value.length), this.adapt()))
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.adapt = function() {
                var a = this,
                    b = this.root.adaptors,
                    c = b.length;
                if (this.rewrap = !1, 0 !== c) {
                    var d = this.wrapper ? "newWrapperValue" in this ? this.newWrapperValue : this.wrapperValue : this.value,
                        e = this.root.ractive,
                        f = this.getKeypath();
                    if (this.wrapper) {
                        var g = this.wrapperValue !== d && (!this.wrapper.reset || this.wrapper.reset(d) === !1);
                        if (!g) return delete this.newWrapperValue, this.wrapperValue = d, void(this.value = this.wrapper.get());
                        if (this.wrapper.teardown(), this.wrapper = null, void 0 !== this.value) {
                            var h = this.parent.value || this.parent.createBranch(this.key);
                            h[this.key] !== d && (h[this.key] = d)
                        }
                    }
                    var i;
                    for (i = 0; i < c; i += 1) {
                        var j = b[i];
                        if (j.filter(d, f, e)) {
                            a.wrapper = j.wrap(e, d, f, Ta(f)), a.wrapperValue = d, a.wrapper.__model = a, a.value = a.wrapper.get();
                            break
                        }
                    }
                }
            }, b.prototype.animate = function(a, b, c, d) {
                var e = this;
                this.ticker && this.ticker.stop();
                var f, g = new bh(function(a) {
                    return f = a
                });
                return this.ticker = new Gh({
                    duration: c.duration,
                    easing: c.easing,
                    step: function(a) {
                        var b = d(a);
                        e.applyValue(b), c.step && c.step(a, b)
                    },
                    complete: function() {
                        e.applyValue(b), c.complete && c.complete(b), e.ticker = null, f()
                    }
                }), g.stop = this.ticker.stop, g
            }, b.prototype.applyValue = function(a) {
                if (!j(a, this.value)) {
                    if (this.registerChange(this.getKeypath(), a), this.parent.wrapper && this.parent.wrapper.set) this.parent.wrapper.set(this.key, a), this.parent.value = this.parent.wrapper.get(), this.value = this.parent.value[this.key], this.wrapper && (this.newWrapperValue = this.value), this.adapt();
                    else if (this.wrapper) this.newWrapperValue = a, this.adapt();
                    else {
                        var b = this.parent.value || this.parent.createBranch(this.key);
                        b[this.key] = a, this.value = a, this.adapt()
                    }
                    this.parent.clearUnresolveds(), this.clearUnresolveds(), i(a) ? (this.length = a.length, this.isArray = !0) : this.isArray = !1, this.links.forEach(Ba), this.children.forEach(Ca), this.deps.forEach(Ba), this.notifyUpstream(), this.parent.isArray && ("length" === this.key ? this.parent.length = a : this.parent.joinKey("length").mark())
                }
            }, b.prototype.createBranch = function(a) {
                var b = k(a) ? [] : {};
                return this.set(b), b
            }, b.prototype.get = function(a, b) {
                return this._link ? this._link.get(a, b) : (a && ya(this), b && b.virtual ? this.getVirtual(!1) : (a || b && b.unwrap) && this.wrapper ? this.wrapperValue : this.value)
            }, b.prototype.getKeypathModel = function(a) {
                return this.keypathModel || (this.keypathModel = new vh(this)), this.keypathModel
            }, b.prototype.joinKey = function(a, c) {
                if (this._link) return !c || 0 != !c.lastLink || void 0 !== a && "" !== a ? this._link.joinKey(a) : this;
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var d = new b(this, a);
                    this.children.push(d), this.childByKey[a] = d
                }
                return this.childByKey[a]._link ? this.childByKey[a]._link : this.childByKey[a]
            }, b.prototype.mark = function() {
                if (this._link) return this._link.mark();
                var a = this.retrieve();
                if (!j(a, this.value)) {
                    var b = this.value;
                    this.value = a, (b !== a || this.rewrap) && (this.wrapper && (this.newWrapperValue = a), this.adapt()), i(a) ? (this.length = a.length, this.isArray = !0) : this.isArray = !1, this.children.forEach(Ca), this.links.forEach(Da), this.deps.forEach(Ba), this.clearUnresolveds()
                }
            }, b.prototype.merge = function(a, b) {
                var c = this.value,
                    d = a;
                c === d && (c = Ua(this)), b && (c = c.map(b), d = d.map(b));
                var e = c.length,
                    f = {},
                    g = 0,
                    h = c.map(function(a) {
                        var b, c = g;
                        do {
                            if (b = d.indexOf(a, c), b === -1) return -1;
                            c = b + 1
                        } while (f[b] === !0 && c < e);
                        return b === g && (g += 1), f[b] = !0, b
                    });
                this.parent.value[this.key] = a, this.shuffle(h)
            }, b.prototype.retrieve = function() {
                return this.parent.value ? this.parent.value[this.key] : void 0
            }, b.prototype.set = function(a) {
                this.ticker && this.ticker.stop(), this.applyValue(a)
            }, b.prototype.shuffle = function(a) {
                var b = this;
                this.shuffling = !0;
                for (var c = a.length; c--;) {
                    var d = a[c];
                    c !== d && (c in b.childByKey && b.childByKey[c].rebinding(~d ? b.joinKey(d) : void 0, b.childByKey[c], !0), !~d && b.keyModels[c] ? b.keyModels[c].rebinding(void 0, b.keyModels[c], !1) : ~d && b.keyModels[c] && (b.keyModels[d] || b.childByKey[d].getKeyModel(d), b.keyModels[c].rebinding(b.keyModels[d], b.keyModels[c], !1)))
                }
                var e = this.length !== this.value.length;
                for (this.links.forEach(function(b) {
                        return b.shuffle(a)
                    }), Pa("early"), c = this.deps.length; c--;) b.deps[c].shuffle && b.deps[c].shuffle(a);
                this.mark(), Pa("mark"), e && this.notifyUpstream(), this.shuffling = !1
            }, b.prototype.teardown = function() {
                this._link && this._link.teardown(), this.children.forEach(Ga), this.wrapper && this.wrapper.teardown(), this.keypathModel && this.keypathModel.teardown()
            }, b
        }(zh),
        Jh = function(a) {
            function b() {
                a.call(this, null, "@global"), this.value = "undefined" != typeof global ? global : window, this.isRoot = !0, this.root = this, this.adaptors = []
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getKeypath = function() {
                return "@global"
            }, b.prototype.registerChange = function() {}, b
        }(Ih),
        Kh = new Jh,
        Lh = /^@[^\(]+\(([^\)]+)\)/,
        Mh = Array.prototype,
        Nh = {},
        Oh = new Yg("update"),
        Ph = $a("push").model,
        Qh = $a("pop").model,
        Rh = $a("shift").model,
        Sh = $a("unshift").model,
        Th = $a("sort").model,
        Uh = $a("splice").model,
        Vh = $a("reverse").model,
        Wh = mg && mg.querySelector,
        Xh = new Yg("insert"),
        Yh = function(a, b, c) {
            var d = this;
            for (this.fragment = a, this.reference = Q(b), this.callback = c, this.keys = R(b), this.resolved = !1, this.contexts = []; a;) a.context && (a.context.addUnresolved(d.keys[0], d), d.contexts.push(a.context)), a = a.componentParent || a.parent
        };
    Yh.prototype.attemptResolution = function() {
        if (!this.resolved) {
            var a = va(this.fragment, this.reference);
            a && (this.resolved = !0, this.callback(a))
        }
    }, Yh.prototype.forceResolution = function() {
        if (!this.resolved) {
            var a = this.fragment.findContext().joinAll(this.keys);
            this.callback(a), this.resolved = !0
        }
    }, Yh.prototype.rebinding = function(a, b) {
        var c = this;
        b && b.removeUnresolved(this.keys[0], this), a && fh.scheduleTask(function() {
            return a.addUnresolved(c.keys[0], c)
        })
    }, Yh.prototype.unbind = function() {
        var a = this;
        this.fragment && D(this.fragment.unresolved, this), this.resolved || this.contexts.forEach(function(b) {
            return b.removeUnresolved(a.keys[0], a)
        })
    };
    var Zh = function(a, b, c, d) {
        var e = this;
        this.context = d.context || a, this.callback = c, this.ractive = a, b ? this.resolved(b) : (this.keypath = d.keypath, this.resolver = new Yh(a.fragment, d.keypath, function(a) {
            e.resolved(a)
        })), d.init !== !1 ? (this.dirty = !0, this.dispatch()) : this.oldValue = this.newValue, this.defer = d.defer, this.once = d.once, this.strict = d.strict, this.dirty = !1
    };
    Zh.prototype.cancel = function() {
        this.cancelled = !0, this.model ? this.model.unregister(this) : this.resolver.unbind()
    }, Zh.prototype.dispatch = function() {
        this.cancelled || (this.callback.call(this.context, this.newValue, this.oldValue, this.keypath), this.oldValue = this.model ? this.model.get() : this.newValue, this.dirty = !1)
    }, Zh.prototype.handleChange = function() {
        var a = this;
        if (!this.dirty) {
            var b = this.model.get();
            if (j(b, this.oldValue)) return;
            if (this.newValue = b, this.strict && this.newValue === this.oldValue) return;
            fh.addObserver(this, this.defer), this.dirty = !0, this.once && fh.scheduleTask(function() {
                return a.cancel()
            })
        }
    }, Zh.prototype.rebinding = function(a, b) {
        var c = this;
        return a = Qa(this.keypath, a, b), a !== this.model && (this.model && this.model.unregister(this), void(a && a.addShuffleTask(function() {
            return c.resolved(a)
        })))
    }, Zh.prototype.resolved = function(a) {
        this.model = a, this.keypath = a.getKeypath(this.ractive), this.oldValue = void 0, this.newValue = a.get(), a.register(this)
    };
    var $h = function(a, b, c, d, e) {
        var f = this;
        this.context = e.context || a, this.ractive = a, this.baseModel = b, this.keys = c, this.callback = d;
        var g = c.join("\\.").replace(/\*/g, "(.+)"),
            h = b.getKeypath(a);
        this.pattern = new RegExp("^" + (h ? h + "\\." : "") + g + "$"), this.oldValues = {}, this.newValues = {}, this.defer = e.defer, this.once = e.once, this.strict = e.strict, this.dirty = !1, this.changed = [], this.partial = !1;
        var i = b.findMatches(this.keys);
        i.forEach(function(a) {
            f.newValues[a.getKeypath(f.ractive)] = a.get()
        }), e.init !== !1 ? this.dispatch() : this.oldValues = this.newValues, b.registerPatternObserver(this)
    };
    $h.prototype.cancel = function() {
        this.baseModel.unregisterPatternObserver(this)
    }, $h.prototype.dispatch = function() {
        var a = this,
            b = this.newValues;
        if (this.newValues = {}, Object.keys(b).forEach(function(c) {
                if (!a.newKeys || a.newKeys[c]) {
                    var d = b[c],
                        e = a.oldValues[c];
                    if (!(a.strict && d === e || j(d, e))) {
                        var f = [d, e, c];
                        if (c) {
                            var g = a.pattern.exec(c);
                            g && (f = f.concat(g.slice(1)))
                        }
                        a.callback.apply(a.context, f)
                    }
                }
            }), this.partial)
            for (var c in b) this.oldValues[c] = b[c];
        else this.oldValues = b;
        this.newKeys = null, this.dirty = !1
    }, $h.prototype.notify = function(a) {
        this.changed.push(a)
    }, $h.prototype.shuffle = function(a) {
        var b = this;
        if (i(this.baseModel.value)) {
            var c = this.baseModel.getKeypath(this.ractive),
                d = this.baseModel.value.length,
                e = this.keys.length > 1 ? "." + this.keys.slice(1).join(".") : "";
            this.newKeys = {};
            for (var f = 0; f < a.length; f++) a[f] !== -1 && a[f] !== f && (b.newKeys["" + c + "." + f + e] = !0);
            for (var g = a.touchedFrom; g < d; g++) b.newKeys["" + c + "." + g + e] = !0
        }
    }, $h.prototype.handleChange = function() {
        var a = this;
        if (!this.dirty || this.changed.length) {
            if (this.dirty || (this.newValues = {}), this.changed.length) {
                var b = 0,
                    c = this.baseModel.isRoot ? this.changed.map(function(a) {
                        return a.map(P).join(".")
                    }) : this.changed.map(function(b) {
                        return a.baseModel.getKeypath(a.ractive) + "." + b.map(P).join(".")
                    });
                if (this.baseModel.findMatches(this.keys).forEach(function(d) {
                        var e = d.getKeypath(a.ractive),
                            f = function(a) {
                                return 0 === a.indexOf(e) && (a.length === e.length || "." === a[e.length]) || 0 === e.indexOf(a) && (a.length === e.length || "." === e[a.length])
                            };
                        c.filter(f).length && (b++, a.newValues[e] = d.get())
                    }), !b) return;
                this.partial = !0
            } else this.baseModel.findMatches(this.keys).forEach(function(b) {
                var c = b.getKeypath(a.ractive);
                a.newValues[c] = b.get()
            }), this.partial = !1;
            fh.addObserver(this, this.defer), this.dirty = !0, this.changed.length = 0, this.once && this.cancel()
        }
    };
    var _h = function(a, b, c, d) {
        this.context = a, this.model = b, this.keypath = b.getKeypath(), this.callback = c, this.pending = null, b.register(this), d.init !== !1 ? (this.sliced = [], this.shuffle([]), this.handleChange()) : this.sliced = this.slice()
    };
    _h.prototype.handleChange = function() {
        this.pending ? (this.callback(this.pending), this.pending = null) : (this.shuffle(this.sliced.map(Sb)), this.handleChange())
    }, _h.prototype.shuffle = function(a) {
        var b, c = this,
            d = this.slice(),
            e = [],
            f = [],
            g = {};
        a.forEach(function(a, d) {
            g[a] = !0, a !== d && void 0 === b && (b = d), a === -1 && f.push(c.sliced[d])
        }), void 0 === b && (b = a.length);
        for (var h = d.length, i = 0; i < h; i += 1) g[i] || e.push(d[i]);
        this.pending = {
            inserted: e,
            deleted: f,
            start: b
        }, this.sliced = d
    }, _h.prototype.slice = function() {
        var a = this.model.get();
        return i(a) ? a.slice() : []
    };
    var ai = {
            init: !1,
            once: !0
        },
        bi = $a("pop").path,
        ci = $a("push").path,
        di = "/* Ractive.js component styles */",
        ei = [],
        fi = !1,
        gi = null,
        hi = null;
    !mg || gi && gi.parentNode || (gi = mg.createElement("style"), gi.type = "text/css", mg.getElementsByTagName("head")[0].appendChild(gi), hi = !!gi.styleSheet);
    var ii, ji, ki = new Yg("render"),
        li = new Yg("complete"),
        mi = {
            extend: function(a, b, c) {
                b.adapt = cc(b.adapt, B(c.adapt))
            },
            init: function() {}
        },
        ni = /(?:^|\})?\s*([^\{\}]+)\s*\{/g,
        oi = /\/\*[\s\S]*?\*\//g,
        pi = /((?:(?:\[[^\]+]\])|(?:[^\s\+\>~:]))+)((?:::?[^\s\+\>\~\(:]+(?:\([^\)]+\))?)*\s*[\s\+\>\~]?)\s*/g,
        qi = /^(?:@|\d+%)/,
        ri = /\[data-ractive-css~="\{[a-z0-9-]+\}"]/g,
        si = {
            name: "css",
            extend: function(a, b, c) {
                if (c.css) {
                    var d = ic(),
                        e = c.noCssTransform ? c.css : gc(c.css, d);
                    b.cssId = d, Zb({
                        id: d,
                        styles: e
                    })
                }
            },
            init: function(a, b, c) {
                c.css && s("\nThe css option is currently not supported on a per-instance basis and will be discarded. Instead, we recommend instantiating from a component definition with a css option.\n\nconst Component = Ractive.extend({\n\t...\n\tcss: '/* your css */',\n\t...\n});\n\nconst componentInstance = new Component({ ... })\n\t\t")
            }
        },
        ti = {
            name: "data",
            extend: function(a, b, c) {
                var d, e;
                if (c.data && l(c.data))
                    for (d in c.data) e = c.data[d], e && "object" == typeof e && (l(e) || i(e)) && s("Passing a `data` option with object and array properties to Ractive.extend() is discouraged, as mutating them is likely to cause bugs. Consider using a data function instead:\n\n  // this...\n  data: function () {\n    return {\n      myObject: {}\n    };\n  })\n\n  // instead of this:\n  data: {\n    myObject: {}\n  }");
                b.data = kc(b.data, c.data)
            },
            init: function(a, b, c) {
                var d = kc(a.prototype.data, c.data);
                if ("function" == typeof d && (d = d.call(b)), d && d.constructor === Object)
                    for (var e in d) "function" == typeof d[e] && (d[e] = T(d[e], b));
                return d || {}
            },
            reset: function(a) {
                var b = this.init(a.constructor, a, a.viewmodel);
                return a.viewmodel.root.set(b), !0
            }
        },
        ui = 4,
        vi = /\$\{([^\}]+)\}/g,
        wi = Hg(null),
        xi = /^\s+/;
    ji = function(a) {
        this.name = "ParseError", this.message = a;
        try {
            throw new Error(a)
        } catch (a) {
            this.stack = a.stack
        }
    }, ji.prototype = Error.prototype, ii = function(a, b) {
        var c, d, e = this,
            f = 0;
        for (this.str = a, this.options = b || {}, this.pos = 0, this.lines = this.str.split("\n"), this.lineEnds = this.lines.map(function(a) {
                var b = f + a.length + 1;
                return f = b, b
            }, 0), this.init && this.init(a, b), c = []; e.pos < e.str.length && (d = e.read());) c.push(d);
        this.leftover = this.remaining(), this.result = this.postProcess ? this.postProcess(c, b) : c
    }, ii.prototype = {
        read: function(a) {
            var b, c, d, e, f = this;
            for (a || (a = this.converters), b = this.pos, d = a.length, c = 0; c < d; c += 1)
                if (f.pos = b, e = a[c](f)) return e;
            return null
        },
        getContextMessage: function(a, b) {
            var c = this.getLinePos(a),
                d = c[0],
                e = c[1];
            if (this.options.contextLines === -1) return [d, e, "" + b + " at line " + d + " character " + e];
            var f = this.lines[d - 1],
                g = "",
                h = "";
            if (this.options.contextLines) {
                var i = d - 1 - this.options.contextLines < 0 ? 0 : d - 1 - this.options.contextLines;
                g = this.lines.slice(i, d - 1 - i).join("\n").replace(/\t/g, "  "), h = this.lines.slice(d, d + this.options.contextLines).join("\n").replace(/\t/g, "  "), g && (g += "\n"), h && (h = "\n" + h)
            }
            var j = 0,
                k = g + f.replace(/\t/g, function(a, b) {
                    return b < e && (j += 1), "  "
                }) + "\n" + new Array(e + j).join(" ") + "^----" + h;
            return [d, e, "" + b + " at line " + d + " character " + e + ":\n" + k]
        },
        getLinePos: function(a) {
            for (var b, c = this, d = 0, e = 0; a >= c.lineEnds[d];) e = c.lineEnds[d], d += 1;
            return b = a - e, [d + 1, b + 1, a]
        },
        error: function(a) {
            var b = this.getContextMessage(this.pos, a),
                c = b[0],
                d = b[1],
                e = b[2],
                f = new ji(e);
            throw f.line = c, f.character = d, f.shortMessage = a, f
        },
        matchString: function(a) {
            if (this.str.substr(this.pos, a.length) === a) return this.pos += a.length, a
        },
        matchPattern: function(a) {
            var b;
            if (b = a.exec(this.remaining())) return this.pos += b[0].length, b[1] || b[0]
        },
        allowWhitespace: function() {
            this.matchPattern(xi)
        },
        remaining: function() {
            return this.str.substring(this.pos)
        },
        nextChar: function() {
            return this.str.charAt(this.pos)
        }
    }, ii.extend = function(a) {
        var b, c, d = this;
        b = function(a, b) {
            ii.call(this, a, b);
        }, b.prototype = Hg(d.prototype);
        for (c in a) Og.call(a, c) && (b.prototype[c] = a[c]);
        return b.extend = ii.extend, b
    };
    var yi, zi, Ai, Bi = ii,
        Ci = 1,
        Di = 2,
        Ei = 3,
        Fi = 4,
        Gi = 5,
        Hi = 6,
        Ii = 7,
        Ji = 8,
        Ki = 9,
        Li = 10,
        Mi = 13,
        Ni = 14,
        Oi = 15,
        Pi = 16,
        Qi = 17,
        Ri = 18,
        Si = 19,
        Ti = 20,
        Ui = 21,
        Vi = 22,
        Wi = 23,
        Xi = 24,
        Yi = 25,
        Zi = 26,
        $i = 27,
        _i = 30,
        aj = 31,
        bj = 32,
        cj = 33,
        dj = 34,
        ej = 35,
        fj = 36,
        gj = 40,
        hj = 50,
        ij = 51,
        jj = 52,
        kj = 53,
        lj = 54,
        mj = 60,
        nj = 61,
        oj = 70,
        pj = 71,
        qj = 72,
        rj = 73,
        sj = /^[^\s=]+/,
        tj = /^\s+/,
        uj = /^(\/(?:[^\n\r\u2028\u2029\/\\[]|\\.|\[(?:[^\n\r\u2028\u2029\]\\]|\\.)*])+\/(?:([gimuy])(?![a-z]*\2))*(?![a-zA-Z_$0-9]))/,
        vj = /[-\/\\^$*+?.()|[\]{}]/g,
        wj = {},
        xj = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i,
        yj = /^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i,
        zj = {
            quot: 34,
            amp: 38,
            apos: 39,
            lt: 60,
            gt: 62,
            nbsp: 160,
            iexcl: 161,
            cent: 162,
            pound: 163,
            curren: 164,
            yen: 165,
            brvbar: 166,
            sect: 167,
            uml: 168,
            copy: 169,
            ordf: 170,
            laquo: 171,
            not: 172,
            shy: 173,
            reg: 174,
            macr: 175,
            deg: 176,
            plusmn: 177,
            sup2: 178,
            sup3: 179,
            acute: 180,
            micro: 181,
            para: 182,
            middot: 183,
            cedil: 184,
            sup1: 185,
            ordm: 186,
            raquo: 187,
            frac14: 188,
            frac12: 189,
            frac34: 190,
            iquest: 191,
            Agrave: 192,
            Aacute: 193,
            Acirc: 194,
            Atilde: 195,
            Auml: 196,
            Aring: 197,
            AElig: 198,
            Ccedil: 199,
            Egrave: 200,
            Eacute: 201,
            Ecirc: 202,
            Euml: 203,
            Igrave: 204,
            Iacute: 205,
            Icirc: 206,
            Iuml: 207,
            ETH: 208,
            Ntilde: 209,
            Ograve: 210,
            Oacute: 211,
            Ocirc: 212,
            Otilde: 213,
            Ouml: 214,
            times: 215,
            Oslash: 216,
            Ugrave: 217,
            Uacute: 218,
            Ucirc: 219,
            Uuml: 220,
            Yacute: 221,
            THORN: 222,
            szlig: 223,
            agrave: 224,
            aacute: 225,
            acirc: 226,
            atilde: 227,
            auml: 228,
            aring: 229,
            aelig: 230,
            ccedil: 231,
            egrave: 232,
            eacute: 233,
            ecirc: 234,
            euml: 235,
            igrave: 236,
            iacute: 237,
            icirc: 238,
            iuml: 239,
            eth: 240,
            ntilde: 241,
            ograve: 242,
            oacute: 243,
            ocirc: 244,
            otilde: 245,
            ouml: 246,
            divide: 247,
            oslash: 248,
            ugrave: 249,
            uacute: 250,
            ucirc: 251,
            uuml: 252,
            yacute: 253,
            thorn: 254,
            yuml: 255,
            OElig: 338,
            oelig: 339,
            Scaron: 352,
            scaron: 353,
            Yuml: 376,
            fnof: 402,
            circ: 710,
            tilde: 732,
            Alpha: 913,
            Beta: 914,
            Gamma: 915,
            Delta: 916,
            Epsilon: 917,
            Zeta: 918,
            Eta: 919,
            Theta: 920,
            Iota: 921,
            Kappa: 922,
            Lambda: 923,
            Mu: 924,
            Nu: 925,
            Xi: 926,
            Omicron: 927,
            Pi: 928,
            Rho: 929,
            Sigma: 931,
            Tau: 932,
            Upsilon: 933,
            Phi: 934,
            Chi: 935,
            Psi: 936,
            Omega: 937,
            alpha: 945,
            beta: 946,
            gamma: 947,
            delta: 948,
            epsilon: 949,
            zeta: 950,
            eta: 951,
            theta: 952,
            iota: 953,
            kappa: 954,
            lambda: 955,
            mu: 956,
            nu: 957,
            xi: 958,
            omicron: 959,
            pi: 960,
            rho: 961,
            sigmaf: 962,
            sigma: 963,
            tau: 964,
            upsilon: 965,
            phi: 966,
            chi: 967,
            psi: 968,
            omega: 969,
            thetasym: 977,
            upsih: 978,
            piv: 982,
            ensp: 8194,
            emsp: 8195,
            thinsp: 8201,
            zwnj: 8204,
            zwj: 8205,
            lrm: 8206,
            rlm: 8207,
            ndash: 8211,
            mdash: 8212,
            lsquo: 8216,
            rsquo: 8217,
            sbquo: 8218,
            ldquo: 8220,
            rdquo: 8221,
            bdquo: 8222,
            dagger: 8224,
            Dagger: 8225,
            bull: 8226,
            hellip: 8230,
            permil: 8240,
            prime: 8242,
            Prime: 8243,
            lsaquo: 8249,
            rsaquo: 8250,
            oline: 8254,
            frasl: 8260,
            euro: 8364,
            image: 8465,
            weierp: 8472,
            real: 8476,
            trade: 8482,
            alefsym: 8501,
            larr: 8592,
            uarr: 8593,
            rarr: 8594,
            darr: 8595,
            harr: 8596,
            crarr: 8629,
            lArr: 8656,
            uArr: 8657,
            rArr: 8658,
            dArr: 8659,
            hArr: 8660,
            forall: 8704,
            part: 8706,
            exist: 8707,
            empty: 8709,
            nabla: 8711,
            isin: 8712,
            notin: 8713,
            ni: 8715,
            prod: 8719,
            sum: 8721,
            minus: 8722,
            lowast: 8727,
            radic: 8730,
            prop: 8733,
            infin: 8734,
            ang: 8736,
            and: 8743,
            or: 8744,
            cap: 8745,
            cup: 8746,
            int: 8747,
            there4: 8756,
            sim: 8764,
            cong: 8773,
            asymp: 8776,
            ne: 8800,
            equiv: 8801,
            le: 8804,
            ge: 8805,
            sub: 8834,
            sup: 8835,
            nsub: 8836,
            sube: 8838,
            supe: 8839,
            oplus: 8853,
            otimes: 8855,
            perp: 8869,
            sdot: 8901,
            lceil: 8968,
            rceil: 8969,
            lfloor: 8970,
            rfloor: 8971,
            lang: 9001,
            rang: 9002,
            loz: 9674,
            spades: 9824,
            clubs: 9827,
            hearts: 9829,
            diams: 9830
        },
        Aj = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376],
        Bj = new RegExp("&(#?(?:x[\\w\\d]+|\\d+|" + Object.keys(zj).join("|") + "));?", "g"),
        Cj = "function" == typeof String.fromCodePoint,
        Dj = Cj ? String.fromCodePoint : String.fromCharCode,
        Ej = /</g,
        Fj = />/g,
        Gj = /&/g,
        Hj = 65533,
        Ij = "Expected a JavaScript expression",
        Jj = "Expected closing paren",
        Kj = /^(?:[+-]?)0*(?:(?:(?:[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
    yi = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/, zi = /^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/, Ai = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;
    var Lj, Mj, Nj = Ac('"'),
        Oj = Ac("'"),
        Pj = /^[a-zA-Z_$][a-zA-Z_$0-9]*/,
        Qj = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/,
        Rj = /^(?:~\/|(?:\.\.\/)+|\.\/(?:\.\.\/)*|\.)/;
    Lj = /^(?:Array|console|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null|Object|Number|String|Boolean)\b/, Mj = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;
    var Sj, Tj, Uj = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:\.(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/,
        Vj = /^[a-zA-Z_$][-\/a-zA-Z_$0-9]*/,
        Wj = /^@(?:keypath|rootpath|index|key|this|global)/,
        Xj = /^\s*\(/,
        Yj = /^\s*\.{3}/;
    Tj = function(a, b) {
            return function(c) {
                var d;
                return (d = b(c)) ? d : c.matchString(a) ? (c.allowWhitespace(), d = Pc(c), d || c.error(Ij), {
                    s: a,
                    o: d,
                    t: cj
                }) : null
            }
        },
        function() {
            var a, b, c, d, e;
            for (d = "! ~ + - typeof".split(" "), e = Nc, a = 0, b = d.length; a < b; a += 1) c = Tj(d[a], e), e = c;
            Sj = e
        }();
    var Zj, $j, _j = Sj;
    $j = function(a, b) {
            return function(c) {
                var d, e, f;
                if (e = b(c), !e) return null;
                for (;;) {
                    if (d = c.pos, c.allowWhitespace(), !c.matchString(a)) return c.pos = d, e;
                    if ("in" === a && /[a-zA-Z_$0-9]/.test(c.remaining().charAt(0))) return c.pos = d, e;
                    if (c.allowWhitespace(), f = b(c), !f) return c.pos = d, e;
                    e = {
                        t: fj,
                        s: a,
                        o: [e, f]
                    }
                }
            }
        },
        function() {
            var a, b, c, d, e;
            for (d = "* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||".split(" "), e = _j, a = 0, b = d.length; a < b; a += 1) c = $j(d[a], e), e = c;
            Zj = e
        }();
    var ak, bk = Zj,
        ck = {
            true: !0,
            false: !1,
            null: null,
            undefined: void 0
        },
        dk = new RegExp("^(?:" + Object.keys(ck).join("|") + ")"),
        ek = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/,
        fk = /\$\{([^\}]+)\}/g,
        gk = /^\$\{([^\}]+)\}/,
        hk = /^\s*$/,
        ik = Bi.extend({
            init: function(a, b) {
                this.values = b.values, this.allowWhitespace()
            },
            postProcess: function(a) {
                return 1 === a.length && hk.test(this.leftover) ? {
                    value: a[0].v
                } : null
            },
            converters: [function(a) {
                if (!a.values) return null;
                var b = a.matchPattern(gk);
                return b && a.values.hasOwnProperty(b) ? {
                    v: a.values[b]
                } : void 0
            }, function(a) {
                var b = a.matchPattern(dk);
                if (b) return {
                    v: ck[b]
                }
            }, function(a) {
                var b = a.matchPattern(ek);
                if (b) return {
                    v: +b
                }
            }, function(a) {
                var b = Bc(a),
                    c = a.values;
                return b && c ? {
                    v: b.v.replace(fk, function(a, b) {
                        return b in c ? c[b] : b
                    })
                } : b
            }, function(a) {
                if (!a.matchString("{")) return null;
                var b = {};
                if (a.allowWhitespace(), a.matchString("}")) return {
                    v: b
                };
                for (var c; c = Sc(a);) {
                    if (b[c.key] = c.value, a.allowWhitespace(), a.matchString("}")) return {
                        v: b
                    };
                    if (!a.matchString(",")) return null
                }
                return null
            }, function(a) {
                if (!a.matchString("[")) return null;
                var b = [];
                if (a.allowWhitespace(), a.matchString("]")) return {
                    v: b
                };
                for (var c; c = a.read();) {
                    if (b.push(c.v), a.allowWhitespace(), a.matchString("]")) return {
                        v: b
                    };
                    if (!a.matchString(",")) return null;
                    a.allowWhitespace()
                }
                return null
            }]
        }),
        jk = /^([a-zA-Z_$][a-zA-Z_$0-9]*)\(.*\)\s*$/;
    ak = Bi.extend({
        converters: [Pc],
        spreadArgs: !0
    });
    var kk, lk = /^[^\s"'>\/=]+/,
        mk = /^on/,
        nk = /^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,
        ok = /^(?:change|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/,
        pk = /^as-([a-z-A-Z][-a-zA-Z_0-9]*)$/,
        qk = /^([a-zA-Z](?:(?!-in-out)[-a-zA-Z_0-9])*)-(in|out|in-out)$/,
        rk = {
            "intro-outro": {
                t: qj,
                v: "t0"
            },
            intro: {
                t: qj,
                v: "t1"
            },
            outro: {
                t: qj,
                v: "t2"
            },
            lazy: {
                t: rj,
                v: "l"
            },
            twoway: {
                t: rj,
                v: "t"
            },
            decorator: {
                t: pj
            }
        },
        sk = /^[^\s"'=<>\/`]+/,
        tk = {
            t: Li,
            exclude: !0
        },
        uk = /^(?:[a-zA-Z$_0-9]|\\\.)+(?:(?:(?:[a-zA-Z$_0-9]|\\\.)+)|(?:\[[0-9]+\]))*/,
        vk = /^as/i,
        wk = /^yield\s*/,
        xk = /^\s*else\s*/,
        yk = /^\s*elseif\s+/,
        zk = {
            each: jj,
            if: hj,
            with: lj,
            unless: ij
        },
        Ak = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
        Bk = /^\s*,\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
        Ck = new RegExp("^(" + Object.keys(zk).join("|") + ")\\b"),
        Dk = "<!--",
        Ek = "-->",
        Fk = /^[ \t\f\r\n]*\r?\n/,
        Gk = /\r?\n[ \t\f\r\n]*$/,
        Hk = /[ \t\f\r\n]+/g,
        Ik = /^(?:pre|script|style|textarea)$/i,
        Jk = /^[ \t\f\r\n]+/,
        Kk = /[ \t\f\r\n]+$/,
        Lk = /^(?:\r\n|\r|\n)/,
        Mk = /(?:\r\n|\r|\n)$/,
        Nk = /^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/,
        Ok = /^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,
        Pk = /^[\s\n\/>]/,
        Qk = {
            exclude: !0
        };
    kk = {
        li: ["li"],
        dt: ["dt", "dd"],
        dd: ["dt", "dd"],
        p: "address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul".split(" "),
        rt: ["rt", "rp"],
        rp: ["rt", "rp"],
        optgroup: ["optgroup"],
        option: ["option", "optgroup"],
        thead: ["tbody", "tfoot"],
        tbody: ["tbody", "tfoot"],
        tfoot: ["tbody"],
        tr: ["tr", "tbody"],
        td: ["td", "th", "tr"],
        th: ["td", "th", "tr"]
    };
    var Rk, Sk = /^<!--\s*/,
        Tk = /s*>\s*([a-zA-Z_$][-a-zA-Z_$0-9]*)\s*/,
        Uk = /\s*-->/,
        Vk = /^\s*#\s*partial\s+/,
        Wk = [id, fd, qd, md, ld, jd],
        Xk = [ed],
        Yk = [fd, qd, ld];
    Jd.computedStrings = function(a) {
        return a ? void Object.keys(a).forEach(function(b) {
            var c = a[b];
            "string" == typeof c && (a[b] = oc(c))
        }) : []
    };
    var Zk = [ad, rd, zd, Bd],
        $k = [Cd, Dd];
    Rk = Bi.extend({
        init: function(a, b) {
            var c = b.tripleDelimiters || ["{{{", "}}}"],
                d = b.staticDelimiters || ["[[", "]]"],
                e = b.staticTripleDelimiters || ["[[[", "]]]"];
            this.standardDelimiters = b.delimiters || ["{{", "}}"], this.tags = [{
                isStatic: !1,
                isTriple: !1,
                open: this.standardDelimiters[0],
                close: this.standardDelimiters[1],
                readers: Wk
            }, {
                isStatic: !1,
                isTriple: !0,
                open: c[0],
                close: c[1],
                readers: Xk
            }, {
                isStatic: !0,
                isTriple: !1,
                open: d[0],
                close: d[1],
                readers: Yk
            }, {
                isStatic: !0,
                isTriple: !0,
                open: e[0],
                close: e[1],
                readers: Xk
            }], this.contextLines = b.contextLines || 0, this.sortMustacheTags(), this.sectionDepth = 0, this.elementStack = [], this.interpolate = {
                script: !b.interpolate || b.interpolate.script !== !1,
                style: !b.interpolate || b.interpolate.style !== !1,
                textarea: !0
            }, b.sanitize === !0 && (b.sanitize = {
                elements: "applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title".split(" "),
                eventAttributes: !0
            }), this.stripComments = b.stripComments !== !1, this.preserveWhitespace = b.preserveWhitespace, this.sanitizeElements = b.sanitize && b.sanitize.elements, this.sanitizeEventAttributes = b.sanitize && b.sanitize.eventAttributes, this.includeLinePositions = b.includeLinePositions, this.textOnlyMode = b.textOnlyMode, this.csp = b.csp
        },
        postProcess: function(a) {
            if (!a.length) return {
                t: [],
                v: ui
            };
            if (this.sectionDepth > 0 && this.error("A section was left open"), xd(a[0].t, this.stripComments, this.preserveWhitespace, !this.preserveWhitespace, !this.preserveWhitespace), this.csp !== !1) {
                var b = {};
                Fd(a[0].t, b), Object.keys(b).length && (a[0].e = b)
            }
            return a[0]
        },
        converters: [Ed],
        sortMustacheTags: function() {
            this.tags.sort(function(a, b) {
                return b.open.length - a.open.length
            })
        }
    });
    var _k = ["delimiters", "tripleDelimiters", "staticDelimiters", "staticTripleDelimiters", "csp", "interpolate", "preserveWhitespace", "sanitize", "stripComments", "contextLines"],
        al = "Either preparse or use a ractive runtime source that includes the parser. ",
        bl = "Either use:\n\n\tRactive.parse.computedStrings( component.computed )\n\nat build time to pre-convert the strings to functions, or use functions instead of strings in computed properties.",
        cl = {
            fromId: function(a, b) {
                if (!mg) {
                    if (b && b.noThrow) return;
                    throw new Error("Cannot retrieve template #" + a + " as Ractive is not running in a browser.")
                }
                a && (a = a.replace(/^#/, ""));
                var c;
                if (!(c = mg.getElementById(a))) {
                    if (b && b.noThrow) return;
                    throw new Error("Could not find template element with id #" + a)
                }
                if ("SCRIPT" !== c.tagName.toUpperCase()) {
                    if (b && b.noThrow) return;
                    throw new Error("Template element with id #" + a + ", must be a <script> element")
                }
                return "textContent" in c ? c.textContent : c.innerHTML
            },
            isParsed: function(a) {
                return !("string" == typeof a)
            },
            getParseOptions: function(a) {
                return a.defaults && (a = a.defaults), _k.reduce(function(b, c) {
                    return b[c] = a[c], b
                }, {})
            },
            parse: function(a, b) {
                Kd(Jd, "template", al);
                var c = Jd(a, b);
                return qc(c), c
            },
            parseFor: function(a, b) {
                return this.parse(a, this.getParseOptions(b))
            }
        },
        dl = {
            name: "template",
            extend: function(a, b, c) {
                if ("template" in c) {
                    var d = c.template;
                    "function" == typeof d ? b.template = d : b.template = Pd(d, b)
                }
            },
            init: function(a, b, c) {
                var d = "template" in c ? c.template : a.prototype.template;
                if (d = d || {
                        v: ui,
                        t: []
                    }, "function" == typeof d) {
                    var e = d;
                    d = Od(b, e), b._config.template = {
                        fn: e,
                        result: d
                    }
                }
                d = Pd(d, b), b.template = d.t, d.p && Sd(b.partials, d.p)
            },
            reset: function(a) {
                var b = Nd(a);
                if (b) {
                    var c = Pd(b, a);
                    return a.template = c.t, Sd(a.partials, c.p, !0), !0
                }
            }
        },
        el = ["adaptors", "components", "computed", "decorators", "easing", "events", "interpolators", "partials", "transitions"],
        fl = function(a, b) {
            this.name = a, this.useDefaults = b
        };
    fl.prototype.extend = function(a, b, c) {
        this.configure(this.useDefaults ? a.defaults : a, this.useDefaults ? b : b.constructor, c)
    }, fl.prototype.init = function() {}, fl.prototype.configure = function(a, b, c) {
        var d = this.name,
            e = c[d],
            f = Hg(a[d]);
        for (var g in e) f[g] = e[g];
        b[d] = f
    }, fl.prototype.reset = function(a) {
        var b = a[this.name],
            c = !1;
        return Object.keys(b).forEach(function(a) {
            var d = b[a];
            d._fn && (d._fn.isOwner ? b[a] = d._fn : delete b[a], c = !0)
        }), c
    };
    var gl = el.map(function(a) {
            return new fl(a, "computed" === a)
        }),
        hl = {
            adapt: mi,
            css: si,
            data: ti,
            template: dl
        },
        il = Object.keys(ig),
        jl = $d(il.filter(function(a) {
            return !hl[a]
        })),
        kl = $d(il.concat(gl.map(function(a) {
            return a.name
        }))),
        ll = [].concat(il.filter(function(a) {
            return !gl[a] && !hl[a]
        }), gl, hl.template, hl.css),
        ml = {
            extend: function(a, b, c) {
                return Yd("extend", a, b, c)
            },
            init: function(a, b, c) {
                return Yd("init", a, b, c)
            },
            reset: function(a) {
                return ll.filter(function(b) {
                    return b.reset && b.reset(a)
                }).map(function(a) {
                    return a.name
                })
            },
            order: ll
        },
        nl = ["template", "partials", "components", "decorators", "events"],
        ol = new Yg("complete"),
        pl = new Yg("reset"),
        ql = new Yg("render"),
        rl = new Yg("unrender"),
        sl = function(a) {
            this.parentFragment = a.parentFragment, this.ractive = a.parentFragment.ractive, this.template = a.template, this.index = a.index, this.type = a.template.t, this.dirty = !1
        };
    sl.prototype.bubble = function() {
        this.dirty || (this.dirty = !0, this.parentFragment.bubble())
    }, sl.prototype.destroyed = function() {
        this.fragment && this.fragment.destroyed()
    }, sl.prototype.find = function() {
        return null
    }, sl.prototype.findAll = function() {}, sl.prototype.findComponent = function() {
        return null
    }, sl.prototype.findAllComponents = function() {}, sl.prototype.findNextNode = function() {
        return this.parentFragment.findNextNode(this)
    }, sl.prototype.shuffled = function() {
        this.fragment && this.fragment.shuffled()
    }, sl.prototype.valueOf = function() {
        return this.toString()
    };
    var tl = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.get = function(a) {
                a && ya(this);
                var b = this.parent.get();
                return b ? b[this.key] : void 0
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.links.forEach(Da), this.deps.forEach(Ba), this.children.forEach(Ba), this.clearUnresolveds()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var c = new b(this, a);
                    this.children.push(c), this.childByKey[a] = c
                }
                return this.childByKey[a]
            }, b
        }(Ih),
        ul = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, b.ractive.viewmodel, null), this.fragment = b, this.template = c, this.isReadonly = !0, this.dirty = !0, this.fn = pc(c.s, c.r.length), this.resolvers = [], this.models = this.template.r.map(function(a, b) {
                    var c = Va(d.fragment, a);
                    return c || de(d, a, b), c
                }), this.dependencies = [], this.shuffle = void 0, this.bubble()
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function(a) {
                void 0 === a && (a = !0), this.registered && delete this.root.expressions[this.keypath], this.keypath = void 0, a && (this.dirty = !0, this.handleChange())
            }, b.prototype.get = function(a) {
                return a && ya(this), this.dirty && (this.dirty = !1, this.value = this.getValue(), this.wrapper && (this.newWrapperValue = this.value), this.adapt()), a && this.wrapper ? this.wrapperValue : this.value
            }, b.prototype.getKeypath = function() {
                var a = this;
                return this.template ? (this.keypath || (this.keypath = "@" + this.template.s.replace(/_(\d+)/g, function(b, c) {
                    if (c >= a.models.length) return b;
                    var d = a.models[c];
                    return d ? d.getKeypath() : "@undefined"
                }), this.root.expressions[this.keypath] = this, this.registered = !0), this.keypath) : "@undefined"
            }, b.prototype.getValue = function() {
                var a = this;
                wa();
                var b;
                try {
                    var c = this.models.map(function(a) {
                        return a ? a.get(!0) : void 0
                    });
                    b = this.fn.apply(this.fragment.ractive, c)
                } catch (a) {
                    s("Failed to compute " + this.getKeypath() + ": " + (a.message || a))
                }
                var d = xa();
                return this.dependencies.filter(function(a) {
                    return !~d.indexOf(a)
                }).forEach(function(b) {
                    b.unregister(a), D(a.dependencies, b)
                }), d.filter(function(b) {
                    return !~a.dependencies.indexOf(b)
                }).forEach(function(b) {
                    b.register(a), a.dependencies.push(b)
                }), b
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.links.forEach(Da), this.deps.forEach(Ba), this.children.forEach(Ba), this.clearUnresolveds()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var b = new tl(this, a);
                    this.children.push(b), this.childByKey[a] = b
                }
                return this.childByKey[a]
            }, b.prototype.mark = function() {
                this.handleChange()
            }, b.prototype.rebinding = function(a, b, c) {
                var d = this.models.indexOf(b);
                ~d && (a = Qa(this.template.r[d], a, b), a !== b && (b.unregister(this), this.models.splice(d, 1, a), a && a.addShuffleRegister(this, "mark"))), this.bubble(!c)
            }, b.prototype.retrieve = function() {
                return this.get()
            }, b.prototype.teardown = function() {
                var b = this;
                this.unbind(), this.fragment = void 0, this.dependencies && this.dependencies.forEach(function(a) {
                    return a.unregister(b)
                }), a.prototype.teardown.call(this)
            }, b.prototype.unregister = function(b) {
                a.prototype.unregister.call(this, b), this.deps.length || this.teardown()
            }, b.prototype.unbind = function() {
                this.resolvers.forEach(Ha)
            }, b
        }(Ih),
        vl = function(a) {
            function b(b, c) {
                a.call(this, b, c)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.applyValue = function(a) {
                if (!j(a, this.value))
                    for (var b = this.parent, c = [this.key]; b;) {
                        if (b.base) {
                            var d = b.model.joinAll(c);
                            d.applyValue(a);
                            break
                        }
                        c.unshift(b.key), b = b.parent
                    }
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var c = new b(this, a);
                    this.children.push(c), this.childByKey[a] = c
                }
                return this.childByKey[a]
            }, b.prototype.retrieve = function() {
                var a = this.parent.get();
                return a && a[this.key]
            }, b
        }(Ih),
        wl = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, null, null), this.dirty = !0, this.root = b.ractive.viewmodel, this.template = c, this.resolvers = [], this.base = ee(b, c);
                var e;
                this.base || (e = b.resolve(c.r, function(a) {
                    d.base = a, d.bubble(), D(d.resolvers, e)
                }), this.resolvers.push(e));
                var f = this.intermediary = {
                    handleChange: function() {
                        return d.handleChange()
                    },
                    rebinding: function(a, b) {
                        if (b === d.base) a = Qa(c, a, b), a !== d.base && (d.base.unregister(f), d.base = a);
                        else {
                            var e = d.members.indexOf(b);
                            ~e && (a = Qa(c.m[e].n, a, b), a !== d.members[e] && d.members.splice(e, 1, a))
                        }
                        a !== b && b.unregister(f), a && a.addShuffleTask(function() {
                            return a.register(f)
                        }), d.bubble()
                    }
                };
                this.members = c.m.map(function(a, c) {
                    if ("string" == typeof a) return {
                        get: function() {
                            return a
                        }
                    };
                    var e, g;
                    return a.t === _i ? (e = Va(b, a.n), e ? e.register(f) : (g = b.resolve(a.n, function(a) {
                        d.members[c] = a, a.register(f), d.handleChange(), D(d.resolvers, g)
                    }), d.resolvers.push(g)), e) : (e = new ul(b, a), e.register(f), e)
                }), this.isUnresolved = !0, this.bubble()
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function() {
                this.base && (this.dirty || this.handleChange())
            }, b.prototype.forceResolution = function() {
                this.resolvers.forEach(function(a) {
                    return a.forceResolution()
                }), this.dirty = !0, this.bubble()
            }, b.prototype.get = function(a) {
                var b = this;
                if (this.dirty) {
                    this.bubble();
                    for (var c = this.members.length, d = !0; d && c--;) b.members[c] || (d = !1);
                    if (this.base && d) {
                        var e = this.members.map(function(a) {
                                return P(String(a.get()))
                            }),
                            f = this.base.joinAll(e);
                        f !== this.model && (this.model && (this.model.unregister(this), this.model.unregisterTwowayBinding(this)), this.model = f, this.parent = f.parent, this.model.register(this), this.model.registerTwowayBinding(this), this.keypathModel && this.keypathModel.handleChange())
                    }
                    return this.value = this.model ? this.model.get(a) : void 0, this.dirty = !1, this.mark(), this.value
                }
                return this.model ? this.model.get(a) : void 0
            }, b.prototype.getValue = function() {
                var a = this;
                this.value = this.model ? this.model.get() : void 0;
                for (var b = this.bindings.length; b--;) {
                    var c = a.bindings[b].getValue();
                    if (c !== a.value) return c
                }
                var d = Oa(this.deps);
                return d ? d.value : this.value
            }, b.prototype.getKeypath = function() {
                return this.model ? this.model.getKeypath() : "@undefined"
            }, b.prototype.handleChange = function() {
                this.dirty = !0, this.mark()
            }, b.prototype.joinKey = function(a) {
                if (void 0 === a || "" === a) return this;
                if (!this.childByKey.hasOwnProperty(a)) {
                    var b = new vl(this, a);
                    this.children.push(b), this.childByKey[a] = b
                }
                return this.childByKey[a]
            }, b.prototype.mark = function() {
                this.dirty && this.deps.forEach(Ba), this.links.forEach(Da), this.children.forEach(Ca), this.clearUnresolveds()
            }, b.prototype.retrieve = function() {
                return this.value
            }, b.prototype.rebinding = function() {}, b.prototype.set = function(a) {
                if (!this.model) throw new Error("Unresolved reference expression. This should not happen!");
                this.model.set(a)
            }, b.prototype.unbind = function() {
                this.resolvers.forEach(Ha), this.model && (this.model.unregister(this), this.model.unregisterTwowayBinding(this))
            }, b
        }(Ih),
        xl = function(b) {
            function c(a) {
                b.call(this, a), this.fragment = null
            }
            return c.prototype = Object.create(b && b.prototype), c.prototype.constructor = c, c.prototype.bind = function() {
                fe(this), this.fragment = new yn({
                    owner: this,
                    template: this.template.f
                }).bind()
            }, c.prototype.detach = function() {
                return this.fragment ? this.fragment.detach() : a()
            }, c.prototype.find = function(a) {
                if (this.fragment) return this.fragment.find(a)
            }, c.prototype.findAll = function(a, b) {
                this.fragment && this.fragment.findAll(a, b)
            }, c.prototype.findComponent = function(a) {
                if (this.fragment) return this.fragment.findComponent(a)
            }, c.prototype.findAllComponents = function(a, b) {
                this.fragment && this.fragment.findAllComponents(a, b)
            }, c.prototype.firstNode = function(a) {
                return this.fragment && this.fragment.firstNode(a)
            }, c.prototype.rebinding = function() {
                var a = this;
                this.locked || (this.locked = !0, fh.scheduleTask(function() {
                    a.locked = !1, fe(a)
                }))
            }, c.prototype.render = function(a) {
                this.rendered = !0, this.fragment && this.fragment.render(a)
            }, c.prototype.toString = function(a) {
                return this.fragment ? this.fragment.toString(a) : ""
            }, c.prototype.unbind = function() {
                this.aliases = {}, this.fragment && this.fragment.unbind()
            }, c.prototype.unrender = function(a) {
                this.rendered && this.fragment && this.fragment.unrender(a), this.rendered = !1
            }, c.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.fragment.update())
            }, c
        }(sl),
        yl = /\s+/,
        zl = /\/\*(?:[\s\S]*?)\*\//g,
        Al = /url\(\s*(['"])(?:\\[\s\S]|(?!\1).)*\1\s*\)|url\((?:\\[\s\S]|[^)])*\)|(['"])(?:\\[\s\S]|(?!\1).)*\2/gi,
        Bl = /\0(\d+)/g,
        Cl = [void 0, "text", "search", "url", "email", "hidden", "password", "search", "reset", "submit"],
        Dl = {
            "accept-charset": "acceptCharset",
            accesskey: "accessKey",
            bgcolor: "bgColor",
            class: "className",
            codebase: "codeBase",
            colspan: "colSpan",
            contenteditable: "contentEditable",
            datetime: "dateTime",
            dirname: "dirName",
            for: "htmlFor",
            "http-equiv": "httpEquiv",
            ismap: "isMap",
            maxlength: "maxLength",
            novalidate: "noValidate",
            pubdate: "pubDate",
            readonly: "readOnly",
            rowspan: "rowSpan",
            tabindex: "tabIndex",
            usemap: "useMap"
        },
        El = function(a) {
            function b(b) {
                a.call(this, b), this.name = b.template.n, this.namespace = null, this.owner = b.owner || b.parentFragment.owner || b.element || ge(b.parentFragment), this.element = b.element || (this.owner.attributeByName ? this.owner : ge(b.parentFragment)), this.parentFragment = b.parentFragment, this.ractive = this.parentFragment.ractive, this.rendered = !1, this.updateDelegate = null, this.fragment = null, this.element.attributeByName[this.name] = this, i(b.template.f) ? this.fragment = new yn({
                    owner: this,
                    template: b.template.f
                }) : (this.value = b.template.f, 0 === this.value && (this.value = "")), this.interpolator = this.fragment && 1 === this.fragment.items.length && this.fragment.items[0].type === Di && this.fragment.items[0], this.interpolator && (this.interpolator.owner = this)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment && this.fragment.bind()
            }, b.prototype.bubble = function() {
                this.dirty || (this.parentFragment.bubble(), this.element.bubble(), this.dirty = !0)
            }, b.prototype.destroyed = function() {
                this.updateDelegate(!0)
            }, b.prototype.getString = function() {
                return this.fragment ? this.fragment.toString() : null != this.value ? "" + this.value : ""
            }, b.prototype.getValue = function() {
                return this.fragment ? this.fragment.valueOf() : !!xj.test(this.name) || this.value
            }, b.prototype.render = function() {
                var a = this.element.node;
                if (this.node = a, a.namespaceURI && a.namespaceURI !== Gg.html || (this.propertyName = Dl[this.name] || this.name, void 0 !== a[this.propertyName] && (this.useProperty = !0), (xj.test(this.name) || this.isTwoway) && (this.isBoolean = !0), "value" === this.propertyName && (a._ractive.value = this.value)), a.namespaceURI) {
                    var b = this.name.indexOf(":");
                    b !== -1 ? this.namespace = Ae(a, this.name.slice(0, b)) : this.namespace = a.namespaceURI
                }
                this.rendered = !0, this.updateDelegate = je(this), this.updateDelegate()
            }, b.prototype.toString = function() {
                var a = this.getValue();
                if ("value" !== this.name || void 0 === this.element.getAttribute("contenteditable") && "select" !== this.element.name && "textarea" !== this.element.name) {
                    if ("name" === this.name && "input" === this.element.name && this.interpolator && "radio" === this.element.getAttribute("type")) return 'name="{{' + this.interpolator.model.getKeypath() + '}}"';
                    if (this.owner !== this.element || "style" !== this.name && "class" !== this.name && !this.style && !this.inlineClass) {
                        if (!(this.rendered || this.owner !== this.element || this.name.indexOf("style-") && this.name.indexOf("class-"))) return void(this.name.indexOf("style-") ? this.inlineClass = this.name.substr(6) : this.style = f(this.name.substr(6)));
                        if (xj.test(this.name)) return a ? this.name : "";
                        if (null == a) return "";
                        var b = e(this.getString());
                        return b ? "" + this.name + '="' + b + '"' : this.name
                    }
                }
            }, b.prototype.unbind = function() {
                this.fragment && this.fragment.unbind()
            }, b.prototype.unrender = function() {
                this.updateDelegate(!0), this.rendered = !1
            }, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.fragment && this.fragment.update(), this.rendered && this.updateDelegate(), this.isTwoway && !this.locked && this.interpolator.twowayBinding.lastVal(!0, this.interpolator.model.get()))
            }, b
        }(sl),
        Fl = function(a) {
            function b(b) {
                a.call(this, b), this.owner = b.owner || b.parentFragment.owner || ge(b.parentFragment), this.element = this.owner.attributeByName ? this.owner : ge(b.parentFragment), this.flag = "l" === b.template.v ? "lazy" : "twoway", this.element.type === Ii && (i(b.template.f) && (this.fragment = new yn({
                    owner: this,
                    template: b.template.f
                })), this.interpolator = this.fragment && 1 === this.fragment.items.length && this.fragment.items[0].type === Di && this.fragment.items[0])
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment && this.fragment.bind(), Be(this, this.getValue(), !0)
            }, b.prototype.bubble = function() {
                this.dirty || (this.element.bubble(), this.dirty = !0)
            }, b.prototype.getValue = function() {
                return this.fragment ? this.fragment.valueOf() : "value" in this ? this.value : !("f" in this.template) || this.template.f
            }, b.prototype.render = function() {
                Be(this, this.getValue(), !0)
            }, b.prototype.toString = function() {
                return ""
            }, b.prototype.unbind = function() {
                this.fragment && this.fragment.unbind(), delete this.element[this.flag]
            }, b.prototype.unrender = function() {
                this.element.rendered && this.element.recreateTwowayBinding()
            }, b.prototype.update = function() {
                this.dirty && (this.fragment && this.fragment.update(), Be(this, this.getValue(), !0))
            }, b
        }(sl),
        Gl = mg ? pg("div") : null,
        Hl = !1,
        Il = function(a) {
            function b(b) {
                a.call(this, b), this.attributes = [], this.owner = b.owner, this.fragment = new yn({
                    ractive: this.ractive,
                    owner: this,
                    template: this.template
                }), this.fragment.findNextNode = m, this.dirty = !1
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment.bind()
            }, b.prototype.bubble = function() {
                this.dirty || (this.dirty = !0, this.owner.bubble())
            }, b.prototype.render = function() {
                this.node = this.owner.node, this.node && (this.isSvg = this.node.namespaceURI === Cg), Hl = !0, this.rendered || this.fragment.render(), Hl = !1, this.rendered = !0, this.dirty = !0, this.update()
            }, b.prototype.toString = function() {
                return this.fragment.toString()
            }, b.prototype.unbind = function() {
                this.fragment.unbind()
            }, b.prototype.unrender = function() {
                this.rendered = !1, this.fragment.unrender()
            }, b.prototype.update = function() {
                var a, b, c = this;
                this.dirty && (this.dirty = !1, Hl = !0, this.fragment.update(), Hl = !1, this.rendered && this.node && (a = this.fragment.toString(), b = Ee(a, this.isSvg), this.attributes.filter(function(a) {
                    return Fe(b, a)
                }).forEach(function(a) {
                    c.node.removeAttribute(a.name)
                }), b.forEach(function(a) {
                    c.node.setAttribute(a.name, a.value)
                }), this.attributes = b))
            }, b
        }(sl),
        Jl = ["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
        Kl = [];
    Jl.forEach(function(a) {
        var b = function() {
            for (var b = this, c = [], d = arguments.length; d--;) c[d] = arguments[d];
            var e = Ya(this.length, a, c);
            this._ractive.wrappers.forEach(function(a) {
                a.magic && (a.magic.locked = !0)
            });
            var f = Array.prototype[a].apply(this, arguments);
            fh.start(), this._ractive.setting = !0;
            for (var g = this._ractive.wrappers.length; g--;) Ge(b._ractive.wrappers[g], b, a, e);
            return fh.end(), this._ractive.setting = !1, this._ractive.wrappers.forEach(function(a) {
                a.magic && (a.magic.locked = !1)
            }), f
        };
        Ig(Kl, a, {
            value: b,
            configurable: !0
        })
    });
    var Ll, Ml;
    ({}).__proto__ ? (Ll = function(a) {
        return a.__proto__ = Kl
    }, Ml = function(a) {
        return a.__proto__ = Array.prototype
    }) : (Ll = function(a) {
        for (var b = Jl.length; b--;) {
            var c = Jl[b];
            Ig(a, c, {
                value: Kl[c],
                configurable: !0
            })
        }
    }, Ml = function(a) {
        for (var b = Jl.length; b--;) delete a[Jl[b]]
    }), Ll.unpatch = Ml;
    var Nl = Ll,
        Ol = "Something went wrong in a rather interesting way",
        Pl = {
            filter: function(a) {
                return i(a) && (!a._ractive || !a._ractive.setting)
            },
            wrap: function(a, b, c) {
                return new Ql(a, b, c)
            }
        },
        Ql = function(a, b) {
            this.root = a, this.value = b, this.__model = null, b._ractive || (Ig(b, "_ractive", {
                value: {
                    wrappers: [],
                    instances: [],
                    setting: !1
                },
                configurable: !0
            }), Nl(b)), b._ractive.instances[a._guid] || (b._ractive.instances[a._guid] = 0, b._ractive.instances.push(a)), b._ractive.instances[a._guid] += 1, b._ractive.wrappers.push(this)
        };
    Ql.prototype.get = function() {
        return this.value
    }, Ql.prototype.reset = function(a) {
        return this.value === a
    }, Ql.prototype.teardown = function() {
        var a, b, c, d, e;
        if (a = this.value, b = a._ractive, c = b.wrappers, d = b.instances, b.setting) return !1;
        if (e = c.indexOf(this), e === -1) throw new Error(Ol);
        if (c.splice(e, 1), c.length) {
            if (d[this.root._guid] -= 1, !d[this.root._guid]) {
                if (e = d.indexOf(this.root), e === -1) throw new Error(Ol);
                d.splice(e, 1)
            }
        } else delete a._ractive, Nl.unpatch(this.value)
    };
    var Rl;
    try {
        Object.defineProperty({}, "test", {
            get: function() {},
            set: function() {}
        }), Rl = {
            filter: function(a) {
                return a && "object" == typeof a
            },
            wrap: function(a, b, c) {
                return new Tl(a, b, c)
            }
        }
    } catch (a) {
        Rl = !1
    }
    var Sl = Rl,
        Tl = function(a, b, c) {
            var d = this;
            this.ractive = a, this.value = b, this.keypath = c, this.originalDescriptors = {}, Object.keys(b).forEach(function(b) {
                var e = Object.getOwnPropertyDescriptor(d.value, b);
                d.originalDescriptors[b] = e;
                var f = c ? "" + c + "." + P(b) : P(b),
                    g = He(e, a, f, d);
                Object.defineProperty(d.value, b, g)
            })
        };
    Tl.prototype.get = function() {
        return this.value
    }, Tl.prototype.reset = function(a) {
        return this.value === a
    }, Tl.prototype.set = function(a, b) {
        this.value[a] = b
    }, Tl.prototype.teardown = function() {
        var a = this;
        Object.keys(this.value).forEach(function(b) {
            var c = Object.getOwnPropertyDescriptor(a.value, b);
            c.set && c.set.__magic && (Ie(c), 1 === c.set.__magic.dependants.length && Object.defineProperty(a.value, b, c.set.__magic.originalDescriptor))
        })
    };
    var Ul = function(a, b, c) {
        this.value = b, this.magic = !0, this.magicWrapper = Sl.wrap(a, b, c), this.arrayWrapper = Pl.wrap(a, b, c), this.arrayWrapper.magic = this.magicWrapper, Object.defineProperty(this, "__model", {
            get: function() {
                return this.arrayWrapper.__model
            },
            set: function(a) {
                this.arrayWrapper.__model = a
            }
        })
    };
    Ul.prototype.get = function() {
        return this.value
    }, Ul.prototype.teardown = function() {
        this.arrayWrapper.teardown(), this.magicWrapper.teardown()
    }, Ul.prototype.reset = function(a) {
        return this.arrayWrapper.reset(a) && this.magicWrapper.reset(a)
    };
    var Vl = {
            filter: function(a, b, c) {
                return Sl.filter(a, b, c) && Pl.filter(a)
            },
            wrap: function(a, b, c) {
                return new Ul(a, b, c)
            }
        },
        Wl = function(a) {
            function b(b, c, d) {
                a.call(this, null, null), this.root = this.parent = b, this.signature = c, this.key = d, this.isExpression = d && "@" === d[0], this.isReadonly = !this.signature.setter, this.context = b.computationContext, this.dependencies = [], this.children = [], this.childByKey = {}, this.deps = [], this.dirty = !0, this.shuffle = void 0
            }
            return b.prototype = Object.create(a && a.prototype),
                b.prototype.constructor = b, b.prototype.get = function(a) {
                    return a && ya(this), this.dirty && (this.dirty = !1, this.value = this.getValue(), this.wrapper && (this.newWrapperValue = this.value), this.adapt()), a && this.wrapper ? this.wrapperValue : this.value
                }, b.prototype.getValue = function() {
                    wa();
                    var a;
                    try {
                        a = this.signature.getter.call(this.context)
                    } catch (a) {
                        if (s("Failed to compute " + this.getKeypath() + ": " + (a.message || a)), og) {
                            console.groupCollapsed && console.groupCollapsed("%cshow details", "color: rgb(82, 140, 224); font-weight: normal; text-decoration: underline;");
                            var b = Je(this.signature.getterString),
                                c = this.signature.getterUseStack ? "\n\n" + Ke(a.stack) : "";
                            console.error("" + a.name + ": " + a.message + "\n\n" + b + c), console.groupCollapsed && console.groupEnd()
                        }
                    }
                    var d = xa();
                    return this.setDependencies(d), "value" in this && a !== this.value && this.registerChange(this.getKeypath(), a), a
                }, b.prototype.handleChange = function() {
                    this.dirty = !0, this.links.forEach(Da), this.deps.forEach(Ba), this.children.forEach(Ba), this.clearUnresolveds()
                }, b.prototype.joinKey = function(a) {
                    if (void 0 === a || "" === a) return this;
                    if (!this.childByKey.hasOwnProperty(a)) {
                        var b = new tl(this, a);
                        this.children.push(b), this.childByKey[a] = b
                    }
                    return this.childByKey[a]
                }, b.prototype.mark = function() {
                    this.handleChange()
                }, b.prototype.rebinding = function(a, b) {
                    a !== b && this.handleChange()
                }, b.prototype.set = function(a) {
                    if (!this.signature.setter) throw new Error("Cannot set read-only computed value '" + this.key + "'");
                    this.signature.setter(a), this.mark()
                }, b.prototype.setDependencies = function(a) {
                    for (var b = this, c = this.dependencies.length; c--;) {
                        var d = b.dependencies[c];
                        ~a.indexOf(d) || d.unregister(b)
                    }
                    for (c = a.length; c--;) {
                        var e = a[c];
                        ~b.dependencies.indexOf(e) || e.register(b)
                    }
                    this.dependencies = a
                }, b.prototype.teardown = function() {
                    for (var b = this, c = this.dependencies.length; c--;) b.dependencies[c] && b.dependencies[c].unregister(b);
                    this.root.computations[this.key] === this && delete this.root.computations[this.key], a.prototype.teardown.call(this)
                }, b.prototype.unregister = function(b) {
                    a.prototype.unregister.call(this, b), this.isExpression && 0 === this.deps.length && this.teardown()
                }, b
        }(Ih),
        Xl = function(a) {
            function b(b) {
                a.call(this, null, ""), this.value = b, this.isRoot = !0, this.root = this, this.adaptors = [], this.ractive = b, this.changes = {}
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getKeypath = function() {
                return "@this"
            }, b
        }(Ih),
        Yl = Object.prototype.hasOwnProperty,
        Zl = function(a) {
            function b(b) {
                a.call(this, null, null), this.changes = {}, this.isRoot = !0, this.root = this, this.ractive = b.ractive, this.value = b.data, this.adaptors = b.adapt, this.adapt(), this.computationContext = b.ractive, this.computations = {}, this.expressions = {}
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.applyChanges = function() {
                return this._changeHash = {}, this.flush(), this._changeHash
            }, b.prototype.compute = function(a, b) {
                var c = new Wl(this, b, a);
                return this.computations[P(a)] = c, c
            }, b.prototype.createLink = function(a, b, c) {
                for (var d = this, e = R(a), f = this; e.length;) {
                    var g = e.shift();
                    f = d.childByKey[g] || d.joinKey(g)
                }
                return f.link(b, c)
            }, b.prototype.get = function(a, b) {
                var c = this;
                if (a && ya(this), b && b.virtual === !1) return this.value;
                for (var d = this.getVirtual(), e = Object.keys(this.computations), f = e.length; f--;) {
                    var g = c.computations[e[f]];
                    g.isExpression || (d[e[f]] = g.get())
                }
                return d
            }, b.prototype.getKeypath = function() {
                return ""
            }, b.prototype.getRactiveModel = function() {
                return this.ractiveModel || (this.ractiveModel = new Xl(this.ractive))
            }, b.prototype.getValueChildren = function() {
                var b = a.prototype.getValueChildren.call(this, this.value);
                this.children.forEach(function(a) {
                    if (a._link) {
                        var c = b.indexOf(a);
                        ~c ? b.splice(c, 1, a._link) : b.push(a._link)
                    }
                });
                for (var c in this.computations) b.push(this.computations[c]);
                return b
            }, b.prototype.handleChange = function() {
                this.deps.forEach(Ba)
            }, b.prototype.has = function(a) {
                var b = this.value,
                    c = S(a);
                if (Yl.call(b, c)) return !0;
                if (a in this.computations || this.childByKey[c] && this.childByKey[c]._link) return !0;
                if (a in this.expressions) return !0;
                for (var d = b.constructor; d !== Function && d !== Array && d !== Object;) {
                    if (Yl.call(d.prototype, c)) return !0;
                    d = d.constructor
                }
                return !1
            }, b.prototype.joinKey = function(b, c) {
                return "@global" === b ? Kh : "@this" === b ? this.getRactiveModel() : this.expressions.hasOwnProperty(b) ? (s("Accessing expression keypaths (" + b.substr(1) + ") from the instance is deprecated. You can used a getNodeInfo or event object to access keypaths with expression context."), this.expressions[b]) : this.computations.hasOwnProperty(b) ? this.computations[b] : a.prototype.joinKey.call(this, b, c)
            }, b.prototype.map = function(a, b) {
                var c = this.joinKey(a);
                c.link(b)
            }, b.prototype.rebinding = function() {}, b.prototype.set = function(a) {
                var b = this.wrapper;
                if (b) {
                    var c = !b.reset || b.reset(a) === !1;
                    c && (b.teardown(), this.wrapper = null, this.value = a, this.adapt())
                } else this.value = a, this.adapt();
                this.deps.forEach(Ba), this.children.forEach(Ca), this.clearUnresolveds()
            }, b.prototype.retrieve = function() {
                return this.wrapper ? this.wrapper.get() : this.value
            }, b.prototype.update = function() {}, b
        }(Ih),
        $l = new Yg("construct"),
        _l = ["adaptors", "components", "decorators", "easing", "events", "interpolators", "partials", "transitions"],
        am = 0,
        bm = function(a) {
            this.hook = new Yg(a), this.inProcess = {}, this.queue = {}
        };
    bm.prototype.begin = function(a) {
        this.inProcess[a._guid] = !0
    }, bm.prototype.end = function(a) {
        var b = a.parent;
        b && this.inProcess[b._guid] ? Re(this.queue, b).push(a) : Se(this, a), delete this.inProcess[a._guid]
    };
    var cm = new Yg("config"),
        dm = new bm("init"),
        em = function(a, b) {
            a.indexOf("*") !== -1 && o('Only component proxy-events may contain "*" wildcards, <' + b.name + " on-" + a + '="..."/> is not valid'), this.name = a, this.owner = b, this.node = null, this.handler = null
        };
    em.prototype.listen = function(a) {
        var b = this.node = this.owner.node,
            c = this.name;
        "on" + c in b || r(Vg(c, "events")), b.addEventListener(c, this.handler = function(c) {
            a.fire({
                node: b,
                original: c
            })
        }, !1)
    }, em.prototype.unlisten = function() {
        this.handler && this.node.removeEventListener(this.name, this.handler, !1)
    };
    var fm = function(a, b) {
        this.eventPlugin = a, this.owner = b, this.handler = null
    };
    fm.prototype.listen = function(a) {
        var b = this.owner.node;
        this.handler = this.eventPlugin(b, function(c) {
            void 0 === c && (c = {}), c.node = c.node || b, a.fire(c)
        })
    }, fm.prototype.unlisten = function() {
        this.handler.teardown()
    };
    var gm = function(a, b) {
        this.ractive = a, this.name = b, this.handler = null
    };
    gm.prototype.listen = function(a) {
        var b = this.ractive;
        this.handler = b.on(this.name, function() {
            var c;
            arguments.length && arguments[0] && arguments[0].node && (c = Array.prototype.shift.call(arguments), c.component = b);
            var d = Array.prototype.slice.call(arguments);
            return a.fire(c, d), !1
        })
    }, gm.prototype.unlisten = function() {
        this.handler.cancel()
    };
    var hm = /^(event|arguments)(\..+)?$/,
        im = /^\$(\d+)(\..+)?$/,
        jm = function(a) {
            var b = this;
            this.owner = a.owner || a.parentFragment.owner || ge(a.parentFragment), this.element = this.owner.attributeByName ? this.owner : ge(a.parentFragment), this.template = a.template, this.parentFragment = a.parentFragment, this.ractive = a.parentFragment.ractive, this.events = [], this.element.type === Oi ? this.template.n.split("-").forEach(function(a) {
                b.events.push(new gm(b.element.instance, a))
            }) : this.template.n.split("-").forEach(function(a) {
                var c = u("events", b.ractive, a);
                b.events.push(c ? new fm(c, b.element) : new em(a, b.element))
            }), this.context = null, this.resolvers = null, this.models = null, this.action = null, this.args = null
        };
    jm.prototype.bind = function() {
        var a = this;
        this.context = this.parentFragment.findContext();
        var b = this.template.f;
        b.x ? (this.fn = pc(b.x.s, b.x.r.length), this.resolvers = [], this.models = b.x.r.map(function(b, c) {
            var d = hm.exec(b);
            if (d) return {
                special: d[1],
                keys: d[2] ? R(d[2].substr(1)) : []
            };
            var e = im.exec(b);
            if (e) return {
                special: "arguments",
                keys: [e[1] - 1].concat(e[2] ? R(e[2].substr(1)) : [])
            };
            var f, g = Va(a.parentFragment, b);
            return g ? g.register(a) : (f = a.parentFragment.resolve(b, function(b) {
                a.models[c] = b, D(a.resolvers, f), b.register(a)
            }), a.resolvers.push(f)), g
        })) : (this.action = "string" == typeof b ? b : "string" == typeof b.n ? b.n : new yn({
            owner: this,
            template: b.n
        }), this.args = b.a ? "string" == typeof b.a ? [b.a] : b.a : b.d ? new yn({
            owner: this,
            template: b.d
        }) : []), this.action && "string" != typeof this.action && this.action.bind(), this.args && b.d && this.args.bind()
    }, jm.prototype.bubble = function() {
        this.dirty || (this.dirty = !0, this.owner.bubble())
    }, jm.prototype.destroyed = function() {
        this.events.forEach(function(a) {
            return a.unlisten()
        })
    }, jm.prototype.fire = function(a, b) {
        if (void 0 === b && (b = []), a && !a.hasOwnProperty("_element") && Jb(a, this.owner), this.fn) {
            var c = [];
            a && b.unshift(a), this.models && this.models.forEach(function(d) {
                if (!d) return c.push(void 0);
                if (d.special) {
                    for (var e = "event" === d.special ? a : b, f = d.keys.slice(); f.length;) e = e[f.shift()];
                    return c.push(e)
                }
                return d.wrapper ? c.push(d.wrapperValue) : void c.push(d.get())
            });
            var d = this.ractive,
                e = d.event;
            d.event = a;
            var f = this.fn.apply(d, c).pop();
            if (f === !1) {
                var g = a ? a.original : void 0;
                g ? (g.preventDefault && g.preventDefault(), g.stopPropagation && g.stopPropagation()) : t("handler '" + this.template.n + "' returned false, but there is no event available to cancel")
            }
            d.event = e
        } else {
            var h = this.action.toString(),
                i = this.template.f.d ? this.args.getArgsList() : this.args;
            b.length && (i = i.concat(b)), a && (a.name = h), pa(this.ractive, h, {
                event: a,
                args: i
            })
        }
    }, jm.prototype.handleChange = function() {}, jm.prototype.rebinding = function(a, b) {
        var c = this;
        if (this.models) {
            var d = this.models.indexOf(b);
            ~d && (this.models.splice(d, 1, a), b.unregister(this), a && a.addShuffleTask(function() {
                return a.register(c)
            }))
        }
    }, jm.prototype.render = function() {
        var a = this;
        fh.scheduleTask(function() {
            return a.events.forEach(function(b) {
                return b.listen(a)
            }, !0)
        })
    }, jm.prototype.toString = function() {
        return ""
    }, jm.prototype.unbind = function() {
        var a = this,
            b = this.template.f;
        b.m ? (this.resolvers && this.resolvers.forEach(Ha), this.resolvers = [], this.models && this.models.forEach(function(b) {
            b.unregister && b.unregister(a)
        }), this.models = null) : (this.action && this.action.unbind && this.action.unbind(), this.args && this.args.unbind && this.args.unbind())
    }, jm.prototype.unrender = function() {
        this.events.forEach(function(a) {
            return a.unlisten()
        })
    }, jm.prototype.update = function() {
        !this.method && this.dirty && (this.dirty = !1, this.action && this.action.update && this.action.update(), this.args && this.args.update && this.args.update())
    };
    var km = new Yg("teardown"),
        lm = function(a) {
            function b(b, c) {
                var d = this;
                a.call(this, b), this.type = Oi;
                var e = Hg(c.prototype);
                this.instance = e, this.name = b.template.e, this.parentFragment = b.parentFragment, this.liveQueries = [], e.el && s("The <" + this.name + "> component has a default 'el' property; it has been disregarded");
                var f = b.template.p || {};
                "content" in f || (f.content = b.template.f || []), this._partials = f, this.yielders = {};
                for (var g, h = b.parentFragment; h;) {
                    if (h.owner.type === Pi) {
                        g = h.owner.container;
                        break
                    }
                    h = h.parent
                }
                e.parent = this.parentFragment.ractive, e.container = g || null, e.root = e.parent.root, e.component = this, Me(this.instance, {
                    partials: f
                }), e._inlinePartials = f, this.attributeByName = {}, this.attributes = [];
                var i = [];
                (this.template.m || []).forEach(function(a) {
                    switch (a.t) {
                        case Mi:
                        case oj:
                        case qj:
                            d.attributes.push(Jf({
                                owner: d,
                                parentFragment: d.parentFragment,
                                template: a
                            }));
                            break;
                        case rj:
                        case pj:
                            break;
                        default:
                            i.push(a)
                    }
                }), this.attributes.push(new Il({
                    owner: this,
                    parentFragment: this.parentFragment,
                    template: i
                })), this.eventHandlers = [], this.template.v && this.setupEvents()
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.attributes.forEach(za), Te(this.instance, {
                    partials: this._partials
                }, {
                    cssIds: this.parentFragment.cssIds
                }), this.eventHandlers.forEach(za), this.bound = !0
            }, b.prototype.bubble = function() {
                this.dirty || (this.dirty = !0, this.parentFragment.bubble())
            }, b.prototype.checkYielders = function() {
                var a = this;
                Object.keys(this.yielders).forEach(function(b) {
                    if (a.yielders[b].length > 1) throw fh.end(), new Error("A component template can only have one {{yield" + (b ? " " + b : "") + "}} declaration at a time")
                })
            }, b.prototype.destroyed = function() {
                this.instance.fragment && this.instance.fragment.destroyed()
            }, b.prototype.detach = function() {
                return this.instance.fragment.detach()
            }, b.prototype.find = function(a) {
                return this.instance.fragment.find(a)
            }, b.prototype.findAll = function(a, b) {
                this.instance.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                return a && this.name !== a ? this.instance.fragment ? this.instance.fragment.findComponent(a) : void 0 : this.instance
            }, b.prototype.findAllComponents = function(a, b) {
                b.test(this) && (b.add(this.instance), b.live && this.liveQueries.push(b)), this.instance.fragment.findAllComponents(a, b)
            }, b.prototype.firstNode = function(a) {
                return this.instance.fragment.firstNode(a)
            }, b.prototype.render = function(a, b) {
                ac(this.instance, a, null, b), this.checkYielders(), this.attributes.forEach(Fa), this.eventHandlers.forEach(Fa), Ue(this), this.rendered = !0
            }, b.prototype.setupEvents = function() {
                var a = this,
                    b = this.eventHandlers;
                Object.keys(this.template.v).forEach(function(c) {
                    var d = c.split("-"),
                        e = a.template.v[c];
                    d.forEach(function(c) {
                        var d = new gm(a.instance, c);
                        b.push(new jm(a, d, e))
                    })
                })
            }, b.prototype.shuffled = function() {
                this.liveQueries.forEach(We), a.prototype.shuffled.call(this)
            }, b.prototype.toString = function() {
                return this.instance.toHTML()
            }, b.prototype.unbind = function() {
                this.bound = !1, this.attributes.forEach(Ha);
                var a = this.instance;
                a.viewmodel.teardown(), a.fragment.unbind(), a._observers.forEach(Aa), Ve(this), a.fragment.rendered && a.el.__ractive_instances__ && D(a.el.__ractive_instances__, a), km.fire(a)
            }, b.prototype.unrender = function(a) {
                var b = this;
                this.rendered = !1, this.shouldDestroy = a, this.instance.unrender(), this.attributes.forEach(Ia), this.eventHandlers.forEach(Ia), this.liveQueries.forEach(function(a) {
                    return a.remove(b.instance)
                })
            }, b.prototype.update = function() {
                this.dirty = !1, this.instance.fragment.update(), this.checkYielders(), this.attributes.forEach(Ka), this.eventHandlers.forEach(Ka)
            }, b
        }(sl),
        mm = {
            update: m,
            teardown: m
        },
        nm = function(a) {
            this.owner = a.owner || a.parentFragment.owner || ge(a.parentFragment), this.element = this.owner.attributeByName ? this.owner : ge(a.parentFragment), this.parentFragment = this.owner.parentFragment, this.ractive = this.owner.ractive;
            var b = this.template = a.template;
            this.dynamicName = "object" == typeof b.f.n, this.dynamicArgs = !!b.f.d, this.dynamicName ? this.nameFragment = new yn({
                owner: this,
                template: b.f.n
            }) : this.name = b.f.n || b.f, this.dynamicArgs ? this.argsFragment = new yn({
                owner: this,
                template: b.f.d
            }) : b.f.a && b.f.a.s ? this.args = [] : this.args = b.f.a || [], this.node = null, this.intermediary = null, this.element.decorators.push(this)
        };
    nm.prototype.bind = function() {
        var a = this;
        this.dynamicName && (this.nameFragment.bind(), this.name = this.nameFragment.toString()), this.dynamicArgs && this.argsFragment.bind(), this.template.f.a && this.template.f.a.s && (this.resolvers = [], this.models = this.template.f.a.r.map(function(b, c) {
            var d, e = Va(a.parentFragment, b);
            return e ? e.register(a) : (d = a.parentFragment.resolve(b, function(b) {
                a.models[c] = b, D(a.resolvers, d), b.register(a)
            }), a.resolvers.push(d)), e
        }), this.argsFn = pc(this.template.f.a.s, this.template.f.a.r.length))
    }, nm.prototype.bubble = function() {
        this.dirty || (this.dirty = !0, this.owner.bubble())
    }, nm.prototype.destroyed = function() {
        this.intermediary && this.intermediary.teardown(), this.shouldDestroy = !0
    }, nm.prototype.handleChange = function() {
        this.bubble()
    }, nm.prototype.rebinding = function(a, b, c) {
        var d = this.models.indexOf(b);
        ~d && (a = Qa(this.template.f.a.r[d], a, b), a !== b && (b.unregister(this), this.models.splice(d, 1, a), a && a.addShuffleRegister(this, "mark"), c || this.bubble()))
    }, nm.prototype.render = function() {
        var a = this;
        fh.scheduleTask(function() {
            var b = u("decorators", a.ractive, a.name);
            if (!b) return r(Vg(a.name, "decorator")), void(a.intermediary = mm);
            a.node = a.element.node;
            var c;
            if (a.argsFn ? (c = a.models.map(function(a) {
                    if (a) return a.get()
                }), c = a.argsFn.apply(a.ractive, c)) : c = a.dynamicArgs ? a.argsFragment.getArgsList() : a.args, a.intermediary = b.apply(a.ractive, [a.node].concat(c)), !a.intermediary || !a.intermediary.teardown) throw new Error("The '" + a.name + "' decorator must return an object with a teardown method");
            a.shouldDestroy && a.destroyed()
        }, !0), this.rendered = !0
    }, nm.prototype.toString = function() {
        return ""
    }, nm.prototype.unbind = function() {
        var a = this;
        this.dynamicName && this.nameFragment.unbind(), this.dynamicArgs && this.argsFragment.unbind(), this.resolvers && this.resolvers.forEach(Ha), this.models && this.models.forEach(function(b) {
            b && b.unregister(a)
        })
    }, nm.prototype.unrender = function(a) {
        a && !this.element.rendered || !this.intermediary || this.intermediary.teardown(), this.rendered = !1
    }, nm.prototype.update = function() {
        if (this.dirty) {
            this.dirty = !1;
            var a = !1;
            if (this.dynamicName && this.nameFragment.dirty) {
                var b = this.nameFragment.toString();
                a = b !== this.name, this.name = b
            }
            if (this.intermediary)
                if (a || !this.intermediary.update) this.unrender(), this.render();
                else if (this.dynamicArgs) {
                if (this.argsFragment.dirty) {
                    var c = this.argsFragment.getArgsList();
                    this.intermediary.update.apply(this.ractive, c)
                }
            } else if (this.argsFn) {
                var d = this.models.map(function(a) {
                    if (a) return a.get()
                });
                this.intermediary.update.apply(this.ractive, this.argsFn.apply(this.ractive, d))
            } else this.intermediary.update.apply(this.ractive, this.args);
            this.dynamicName && this.nameFragment.dirty && this.nameFragment.update(), this.dynamicArgs && this.argsFragment.dirty && this.argsFragment.update()
        }
    };
    var om = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {}, b.prototype.render = function() {}, b.prototype.teardown = function() {}, b.prototype.toString = function() {
                return "<!DOCTYPE" + this.template.a + ">"
            }, b.prototype.unbind = function() {}, b.prototype.unrender = function() {}, b.prototype.update = function() {}, b
        }(sl),
        pm = function(a, b) {
            void 0 === b && (b = "value"), this.element = a, this.ractive = a.ractive, this.attribute = a.attributeByName[b];
            var c = this.attribute.interpolator;
            c.twowayBinding = this;
            var d = c.model;
            if (d) {
                if (d.isUnresolved) d.forceResolution(), Ye("expression", this.ractive);
                else if (d.isReadonly) {
                    var e = d.getKeypath().replace(/^@/, "");
                    return t("Cannot use two-way binding on <" + a.name + "> element: " + e + " is read-only. To suppress this warning use <" + a.name + " twoway='false'...>", {
                        ractive: this.ractive
                    }), !1
                }
            } else c.resolver.forceResolution(), d = c.model, Ye("'" + c.template.r + "' reference", this.ractive);
            this.attribute.isTwoway = !0, this.model = d;
            var f = d.get();
            this.wasUndefined = void 0 === f, void 0 === f && this.getInitialValue && (f = this.getInitialValue(), d.set(f)), this.lastVal(!0, f);
            var g = ge(this.element, !1, "form");
            g && (this.resetValue = f, g.formBindings.push(this))
        };
    pm.prototype.bind = function() {
        this.model.registerTwowayBinding(this)
    }, pm.prototype.handleChange = function() {
        var a = this,
            b = this.getValue();
        this.lastVal() !== b && (fh.start(this.root), this.attribute.locked = !0, this.model.set(b), this.lastVal(!0, b), this.model.get() !== b ? this.attribute.locked = !1 : fh.scheduleTask(function() {
            return a.attribute.locked = !1
        }), fh.end())
    }, pm.prototype.lastVal = function(a, b) {
        return a ? void(this.lastValue = b) : this.lastValue
    }, pm.prototype.rebinding = function(a, b) {
        var c = this;
        this.model && this.model === b && b.unregisterTwowayBinding(this), a && (this.model = a, fh.scheduleTask(function() {
            return a.registerTwowayBinding(c)
        }))
    }, pm.prototype.render = function() {
        this.node = this.element.node, this.node._ractive.binding = this, this.rendered = !0
    }, pm.prototype.setFromNode = function(a) {
        this.model.set(a.value)
    }, pm.prototype.unbind = function() {
        this.model.unregisterTwowayBinding(this)
    }, pm.prototype.unrender = function() {};
    var qm = function(a) {
            function b(b) {
                a.call(this, b, "checked")
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ze, !1), this.node.attachEvent && this.node.addEventListener("click", Ze, !1)
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ze, !1), this.node.removeEventListener("click", Ze, !1)
            }, b.prototype.getInitialValue = function() {
                return !!this.element.getAttribute("checked")
            }, b.prototype.getValue = function() {
                return this.node.checked
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.checked)
            }, b
        }(pm),
        rm = function(a, b, c) {
            var d = this;
            this.model = b, this.hash = a, this.getValue = function() {
                return d.value = c.call(d), d.value
            }, this.bindings = []
        };
    rm.prototype.add = function(a) {
        this.bindings.push(a)
    }, rm.prototype.bind = function() {
        this.value = this.model.get(), this.model.registerTwowayBinding(this), this.bound = !0
    }, rm.prototype.remove = function(a) {
        D(this.bindings, a), this.bindings.length || this.unbind()
    }, rm.prototype.unbind = function() {
        this.model.unregisterTwowayBinding(this), this.bound = !1, delete this.model[this.hash]
    };
    var sm = [].push,
        tm = function(a) {
            function b(b) {
                if (a.call(this, b, "name"), this.checkboxName = !0, this.group = $e("checkboxes", this.model, _e), this.group.add(this), this.noInitialValue && (this.group.noInitialValue = !0), this.group.noInitialValue && this.element.getAttribute("checked")) {
                    var c = this.model.get(),
                        d = this.element.getAttribute("value");
                    z(c, d) || sm.call(c, d)
                }
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.group.bound || this.group.bind()
            }, b.prototype.changed = function() {
                var a = !!this.isChecked;
                return this.isChecked = this.node.checked, this.isChecked === a
            }, b.prototype.getInitialValue = function() {
                return this.noInitialValue = !0, []
            }, b.prototype.getValue = function() {
                return this.group.value
            }, b.prototype.handleChange = function() {
                this.isChecked = this.element.node.checked, this.group.value = this.model.get();
                var b = this.element.getAttribute("value");
                this.isChecked && !z(this.group.value, b) ? this.group.value.push(b) : !this.isChecked && z(this.group.value, b) && D(this.group.value, b), this.lastValue = null, a.prototype.handleChange.call(this)
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.node,
                    c = this.model.get(),
                    d = this.element.getAttribute("value");
                i(c) ? this.isChecked = z(c, d) : this.isChecked = c == d, b.name = "{{" + this.model.getKeypath() + "}}", b.checked = this.isChecked, b.addEventListener("change", Ze, !1), b.attachEvent && b.addEventListener("click", Ze, !1)
            }, b.prototype.setFromNode = function(a) {
                if (this.group.bindings.forEach(function(a) {
                        return a.wasUndefined = !0
                    }), a.checked) {
                    var b = this.group.getValue();
                    b.push(this.element.getAttribute("value")), this.group.model.set(b)
                }
            }, b.prototype.unbind = function() {
                this.group.remove(this)
            }, b.prototype.unrender = function() {
                var a = this.element.node;
                a.removeEventListener("change", Ze, !1), a.removeEventListener("click", Ze, !1)
            }, b
        }(pm),
        um = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {
                return this.element.fragment ? this.element.fragment.toString() : ""
            }, b.prototype.getValue = function() {
                return this.element.node.innerHTML
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.node;
                b.addEventListener("change", Ze, !1), b.addEventListener("blur", Ze, !1), this.ractive.lazy || (b.addEventListener("input", Ze, !1), b.attachEvent && b.addEventListener("keyup", Ze, !1))
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.innerHTML)
            }, b.prototype.unrender = function() {
                var a = this.node;
                a.removeEventListener("blur", Ze, !1), a.removeEventListener("change", Ze, !1), a.removeEventListener("input", Ze, !1), a.removeEventListener("keyup", Ze, !1)
            }, b
        }(pm),
        vm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {
                return ""
            }, b.prototype.getValue = function() {
                return this.node.value
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.ractive.lazy,
                    c = !1;
                "lazy" in this.element && (b = this.element.lazy), k(b) && (c = +b, b = !1), this.handler = c ? bf(c) : Ze;
                var d = this.node;
                d.addEventListener("change", Ze, !1), b || (d.addEventListener("input", this.handler, !1), d.attachEvent && d.addEventListener("keyup", this.handler, !1)), d.addEventListener("blur", af, !1)
            }, b.prototype.unrender = function() {
                var a = this.element.node;
                this.rendered = !1, a.removeEventListener("change", Ze, !1), a.removeEventListener("input", this.handler, !1), a.removeEventListener("keyup", this.handler, !1), a.removeEventListener("blur", af, !1)
            }, b
        }(pm),
        wm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {}, b.prototype.getValue = function() {
                return this.node.files
            }, b.prototype.render = function() {
                this.element.lazy = !1, a.prototype.render.call(this)
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.files)
            }, b
        }(vm),
        xm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.forceUpdate = function() {
                var a = this,
                    b = this.getValue();
                void 0 !== b && (this.attribute.locked = !0, fh.scheduleTask(function() {
                    return a.attribute.locked = !1
                }), this.model.set(b))
            }, b.prototype.getInitialValue = function() {
                return this.element.options.filter(function(a) {
                    return a.getAttribute("selected")
                }).map(function(a) {
                    return a.getAttribute("value")
                })
            }, b.prototype.getValue = function() {
                for (var a = this.element.node.options, b = a.length, c = [], d = 0; d < b; d += 1) {
                    var e = a[d];
                    if (e.selected) {
                        var f = e._ractive ? e._ractive.value : e.value;
                        c.push(f)
                    }
                }
                return c
            }, b.prototype.handleChange = function() {
                var b = this.attribute,
                    c = b.getValue(),
                    d = this.getValue();
                return void 0 !== c && A(d, c) || a.prototype.handleChange.call(this), this
            }, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ze, !1), void 0 === this.model.get() && this.handleChange()
            }, b.prototype.setFromNode = function(a) {
                for (var b = cf(a), c = b.length, d = new Array(c); c--;) {
                    var e = b[c];
                    d[c] = e._ractive ? e._ractive.value : e.value
                }
                this.model.set(d)
            }, b.prototype.setValue = function() {
                throw new Error("TODO not implemented yet")
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ze, !1)
            }, b.prototype.updateModel = function() {
                void 0 !== this.attribute.value && this.attribute.value.length || this.keypath.set(this.initialValue)
            }, b
        }(pm),
        ym = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getInitialValue = function() {}, b.prototype.getValue = function() {
                var a = parseFloat(this.node.value);
                return isNaN(a) ? void 0 : a
            }, b.prototype.setFromNode = function(a) {
                var b = parseFloat(a.value);
                isNaN(b) || this.model.set(b)
            }, b
        }(vm),
        zm = {},
        Am = function(a) {
            function b(b) {
                a.call(this, b, "checked"), this.siblings = df(this.ractive._guid + this.element.getAttribute("name")), this.siblings.push(this)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.getValue = function() {
                return this.node.checked
            }, b.prototype.handleChange = function() {
                fh.start(this.root), this.siblings.forEach(function(a) {
                    a.model.set(a.getValue())
                }), fh.end()
            }, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ze, !1), this.node.attachEvent && this.node.addEventListener("click", Ze, !1)
            }, b.prototype.setFromNode = function(a) {
                this.model.set(a.checked)
            }, b.prototype.unbind = function() {
                D(this.siblings, this)
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ze, !1), this.node.removeEventListener("click", Ze, !1)
            }, b
        }(pm),
        Bm = function(a) {
            function b(b) {
                a.call(this, b, "name"), this.group = $e("radioname", this.model, ef), this.group.add(this), b.checked && (this.group.value = this.getValue())
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                var a = this;
                this.group.bound || this.group.bind(), this.nameAttributeBinding = {
                    handleChange: function() {
                        return a.node.name = "{{" + a.model.getKeypath() + "}}"
                    }
                }, this.model.getKeypathModel().register(this.nameAttributeBinding)
            }, b.prototype.getInitialValue = function() {
                if (this.element.getAttribute("checked")) return this.element.getAttribute("value")
            }, b.prototype.getValue = function() {
                return this.element.getAttribute("value")
            }, b.prototype.handleChange = function() {
                this.node.checked && (this.group.value = this.getValue(), a.prototype.handleChange.call(this))
            }, b.prototype.lastVal = function(a, b) {
                if (this.group) return a ? void(this.group.lastValue = b) : this.group.lastValue
            }, b.prototype.render = function() {
                a.prototype.render.call(this);
                var b = this.node;
                b.name = "{{" + this.model.getKeypath() + "}}", b.checked = this.model.get() == this.element.getAttribute("value"), b.addEventListener("change", Ze, !1), b.attachEvent && b.addEventListener("click", Ze, !1)
            }, b.prototype.setFromNode = function(a) {
                a.checked && this.group.model.set(this.element.getAttribute("value"))
            }, b.prototype.unbind = function() {
                this.group.remove(this), this.model.getKeypathModel().unregister(this.nameAttributeBinding)
            }, b.prototype.unrender = function() {
                var a = this.node;
                a.removeEventListener("change", Ze, !1), a.removeEventListener("click", Ze, !1)
            }, b
        }(pm),
        Cm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.forceUpdate = function() {
                var a = this,
                    b = this.getValue();
                void 0 !== b && (this.attribute.locked = !0, fh.scheduleTask(function() {
                    return a.attribute.locked = !1
                }), this.model.set(b))
            }, b.prototype.getInitialValue = function() {
                if (void 0 === this.element.getAttribute("value")) {
                    var a = this.element.options,
                        b = a.length;
                    if (b) {
                        for (var c, d, e = b; e--;) {
                            var f = a[e];
                            if (f.getAttribute("selected")) {
                                f.getAttribute("disabled") || (c = f.getAttribute("value")), d = !0;
                                break
                            }
                        }
                        if (!d)
                            for (; ++e < b;)
                                if (!a[e].getAttribute("disabled")) {
                                    c = a[e].getAttribute("value");
                                    break
                                }
                        return void 0 !== c && (this.element.attributeByName.value.value = c), c
                    }
                }
            }, b.prototype.getValue = function() {
                var a, b = this.node.options,
                    c = b.length;
                for (a = 0; a < c; a += 1) {
                    var d = b[a];
                    if (b[a].selected && !b[a].disabled) return d._ractive ? d._ractive.value : d.value
                }
            }, b.prototype.render = function() {
                a.prototype.render.call(this), this.node.addEventListener("change", Ze, !1)
            }, b.prototype.setFromNode = function(a) {
                var b = cf(a)[0];
                this.model.set(b._ractive ? b._ractive.value : b.value)
            }, b.prototype.setValue = function(a) {
                this.model.set(a)
            }, b.prototype.unrender = function() {
                this.node.removeEventListener("change", Ze, !1)
            }, b
        }(pm),
        Dm = /;\s*$/,
        Em = function(a) {
            function b(b) {
                var c = this;
                if (a.call(this, b), this.liveQueries = [], this.name = b.template.e.toLowerCase(), this.isVoid = yj.test(this.name), this.parent = ge(this.parentFragment, !1), this.parent && "option" === this.parent.name) throw new Error("An <option> element cannot contain other elements (encountered <" + this.name + ">)");
                this.decorators = [], this.attributeByName = {}, this.attributes = [];
                var d = [];
                (this.template.m || []).forEach(function(a) {
                    switch (a.t) {
                        case Mi:
                        case rj:
                        case pj:
                        case oj:
                        case qj:
                            c.attributes.push(Jf({
                                owner: c,
                                parentFragment: c.parentFragment,
                                template: a
                            }));
                            break;
                        default:
                            d.push(a)
                    }
                }), d.length && this.attributes.push(new Il({
                    owner: this,
                    parentFragment: this.parentFragment,
                    template: d
                }));
                for (var e = this.attributes.length; e--;) {
                    var f = c.attributes[e];
                    "type" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "max" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "min" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "class" === f.name ? c.attributes.unshift(c.attributes.splice(e, 1)[0]) : "value" === f.name && c.attributes.push(c.attributes.splice(e, 1)[0])
                }
                b.template.f && !b.deferContent && (this.fragment = new yn({
                    template: b.template.f,
                    owner: this,
                    cssIds: null
                })), this.binding = null
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.attributes.binding = !0, this.attributes.forEach(za), this.attributes.binding = !1, this.fragment && this.fragment.bind(), this.binding || this.recreateTwowayBinding()
            }, b.prototype.createTwowayBinding = function() {
                var a = "twoway" in this ? this.twoway : this.ractive.twoway;
                if (!a) return null;
                var b = gf(this);
                if (!b) return null;
                var c = new b(this);
                return c && c.model ? c : null
            }, b.prototype.destroyed = function() {
                this.attributes.forEach(function(a) {
                    return a.destroyed()
                }), this.fragment && this.fragment.destroyed()
            }, b.prototype.detach = function() {
                return this.rendered || this.destroyed(), c(this.node)
            }, b.prototype.find = function(a) {
                return this.node && qg(this.node, a) ? this.node : this.fragment ? this.fragment.find(a) : void 0
            }, b.prototype.findAll = function(a, b) {
                var c = b.test(this.node);
                c && (b.add(this.node), b.live && this.liveQueries.push(b)), this.fragment && this.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                if (this.fragment) return this.fragment.findComponent(a)
            }, b.prototype.findAllComponents = function(a, b) {
                this.fragment && this.fragment.findAllComponents(a, b)
            }, b.prototype.findNextNode = function() {
                return null
            }, b.prototype.firstNode = function() {
                return this.node
            }, b.prototype.getAttribute = function(a) {
                var b = this.attributeByName[a];
                return b ? b.getValue() : void 0
            }, b.prototype.recreateTwowayBinding = function() {
                this.binding && (this.binding.unbind(), this.binding.unrender()), (this.binding = this.createTwowayBinding()) && (this.binding.bind(), this.rendered && this.binding.render())
            }, b.prototype.render = function(a, b) {
                var d = this;
                this.namespace = mf(this);
                var e, f = !1;
                if (b)
                    for (var g; g = b.shift();) {
                        if (g.nodeName.toUpperCase() === d.template.e.toUpperCase() && g.namespaceURI === d.namespace) {
                            d.node = e = g, f = !0;
                            break
                        }
                        c(g)
                    }
                if (e || (e = pg(this.template.e, this.namespace, this.getAttribute("is")), this.node = e), Ig(e, "_ractive", {
                        value: {
                            proxy: this
                        }
                    }), this.parentFragment.cssIds && e.setAttribute("data-ractive-css", this.parentFragment.cssIds.map(function(a) {
                        return "{" + a + "}"
                    }).join(" ")), f && this.foundNode && this.foundNode(e), this.fragment) {
                    var h = f ? E(e.childNodes) : void 0;
                    this.fragment.render(e, h), h && h.forEach(c)
                }
                if (f) {
                    this.binding && this.binding.wasUndefined && this.binding.setFromNode(e);
                    for (var i = e.attributes.length; i--;) {
                        var j = e.attributes[i].name;
                        j in d.attributeByName || e.removeAttribute(j)
                    }
                }
                this.attributes.forEach(Fa), this.binding && this.binding.render(), Xe(this), this._introTransition && this.ractive.transitionsEnabled && (this._introTransition.isIntro = !0, fh.registerTransition(this._introTransition)), f || a.appendChild(e), this.rendered = !0
            }, b.prototype.shuffled = function() {
                this.liveQueries.forEach(hf), a.prototype.shuffled.call(this)
            }, b.prototype.toString = function() {
                var a = this.template.e,
                    b = this.attributes.map(kf).join("");
                "option" === this.name && this.isSelected() && (b += " selected"), "input" === this.name && jf(this) && (b += " checked");
                var c, d;
                this.attributes.forEach(function(a) {
                    "class" === a.name ? d = (d || "") + (d ? " " : "") + e(a.getString()) : "style" === a.name ? (c = (c || "") + (c ? " " : "") + e(a.getString()), c && !Dm.test(c) && (c += ";")) : a.style ? c = (c || "") + (c ? " " : "") + a.style + ": " + e(a.getString()) + ";" : a.inlineClass && a.getValue() && (d = (d || "") + (d ? " " : "") + a.inlineClass)
                }), void 0 !== c && (b = " style" + (c ? '="' + c + '"' : "") + b), void 0 !== d && (b = " class" + (d ? '="' + d + '"' : "") + b);
                var f = "<" + a + b + ">";
                return this.isVoid ? f : ("textarea" === this.name && void 0 !== this.getAttribute("value") ? f += wc(this.getAttribute("value")) : void 0 !== this.getAttribute("contenteditable") && (f += this.getAttribute("value") || ""), this.fragment && (f += this.fragment.toString(!/^(?:script|style)$/i.test(this.template.e))), f += "</" + a + ">")
            }, b.prototype.unbind = function() {
                this.attributes.unbinding = !0, this.attributes.forEach(Ha), this.attributes.unbinding = !1, this.binding && this.binding.unbind(), this.fragment && this.fragment.unbind()
            }, b.prototype.unrender = function(a) {
                if (this.rendered) {
                    this.rendered = !1;
                    var b = this._introTransition;
                    b && b.complete && b.complete(), "option" === this.name ? this.detach() : a && fh.detachWhenReady(this), this.fragment && this.fragment.unrender(), this.binding && this.binding.unrender(), this._outroTransition && this.ractive.transitionsEnabled && (this._outroTransition.isIntro = !1, fh.registerTransition(this._outroTransition)), lf(this)
                }
            }, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.attributes.forEach(Ka), this.fragment && this.fragment.update())
            }, b
        }(sl),
        Fm = function(a) {
            function b(b) {
                a.call(this, b), this.formBindings = []
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.node.addEventListener("reset", nf, !1)
            }, b.prototype.unrender = function(b) {
                this.node.removeEventListener("reset", nf, !1), a.prototype.unrender.call(this, b)
            }, b
        }(Em),
        Gm = function(a) {
            function b(b) {
                a.call(this, b), this.parentFragment = b.parentFragment, this.template = b.template, this.index = b.index, b.owner && (this.parent = b.owner), this.isStatic = !!b.template.s, this.model = null, this.dirty = !1
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                var a = this,
                    b = ee(this.parentFragment, this.template),
                    c = b ? b.get() : void 0;
                return this.isStatic ? void(this.model = {
                    get: function() {
                        return c
                    }
                }) : void(b ? (b.register(this), this.model = b) : this.resolver = this.parentFragment.resolve(this.template.r, function(b) {
                    a.model = b, b.register(a), a.handleChange(), a.resolver = null
                }))
            }, b.prototype.handleChange = function() {
                this.bubble()
            }, b.prototype.rebinding = function(a, b, c) {
                return a = Qa(this.template, a, b), !this.static && a !== this.model && (this.model && this.model.unregister(this), a && a.addShuffleRegister(this, "mark"), this.model = a, c || this.handleChange(), !0)
            }, b.prototype.unbind = function() {
                this.isStatic || (this.model && this.model.unregister(this), this.model = void 0, this.resolver && this.resolver.unbind())
            }, b
        }(sl),
        Hm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function() {
                this.owner && this.owner.bubble(), a.prototype.bubble.call(this)
            }, b.prototype.detach = function() {
                return c(this.node)
            }, b.prototype.firstNode = function() {
                return this.node
            }, b.prototype.getString = function() {
                return this.model ? d(this.model.get()) : ""
            }, b.prototype.render = function(a, b) {
                if (!Ce()) {
                    var c = this.getString();
                    if (this.rendered = !0, b) {
                        var d = b[0];
                        d && 3 === d.nodeType ? (b.shift(), d.nodeValue !== c && (d.nodeValue = c)) : (d = this.node = mg.createTextNode(c), b[0] ? a.insertBefore(d, b[0]) : a.appendChild(d)), this.node = d
                    } else this.node = mg.createTextNode(c), a.appendChild(this.node)
                }
            }, b.prototype.toString = function(a) {
                var b = this.getString();
                return a ? wc(b) : b
            }, b.prototype.unrender = function(a) {
                a && this.detach(), this.rendered = !1
            }, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.rendered && (this.node.data = this.getString()))
            }, b.prototype.valueOf = function() {
                return this.model ? this.model.get() : void 0
            }, b
        }(Gm),
        Im = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.node.defaultValue = this.node.value
            }, b
        }(Em),
        Jm = function(a) {
            function b(b) {
                a.call(this, b), this.name = b.template.n, this.owner = b.owner || b.parentFragment.owner || b.element || ge(b.parentFragment), this.element = b.element || (this.owner.attributeByName ? this.owner : ge(b.parentFragment)), this.parentFragment = this.element.parentFragment, this.ractive = this.parentFragment.ractive, this.fragment = null, this.element.attributeByName[this.name] = this, this.value = b.template.f
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.fragment && this.fragment.bind();
                var a = this.template.f,
                    b = this.element.instance.viewmodel;
                if (0 === a) b.joinKey(this.name).set(!0);
                else if ("string" == typeof a) {
                    var c = Tc(a);
                    b.joinKey(this.name).set(c ? c.value : a)
                } else i(a) && pf(this, !0)
            }, b.prototype.render = function() {}, b.prototype.unbind = function() {
                this.fragment && this.fragment.unbind(), this.boundFragment && this.boundFragment.unbind(), this.element.bound && this.link.target === this.model && this.link.owner.unlink()
            }, b.prototype.unrender = function() {}, b.prototype.update = function() {
                this.dirty && (this.dirty = !1, this.fragment && this.fragment.update(), this.boundFragment && this.boundFragment.update(), this.rendered && this.updateDelegate())
            }, b
        }(sl),
        Km = function(a) {
            function b(b) {
                var c = b.template;
                c.a || (c.a = {}), void 0 !== c.a.value || "disabled" in c.a || (c.a.value = c.f || ""), a.call(this, b), this.select = ge(this.parent || this.parentFragment, !1, "select")
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                if (!this.select) return void a.prototype.bind.call(this);
                var b = this.attributeByName.selected;
                if (b && void 0 !== this.select.getAttribute("value")) {
                    var c = this.attributes.indexOf(b);
                    this.attributes.splice(c, 1), delete this.attributeByName.selected
                }
                a.prototype.bind.call(this), this.select.options.push(this)
            }, b.prototype.bubble = function() {
                var b = this.getAttribute("value");
                this.node && this.node.value !== b && (this.node._ractive.value = b), a.prototype.bubble.call(this)
            }, b.prototype.getAttribute = function(a) {
                var b = this.attributeByName[a];
                return b ? b.getValue() : "value" === a && this.fragment ? this.fragment.valueOf() : void 0
            }, b.prototype.isSelected = function() {
                var a = this.getAttribute("value");
                if (void 0 === a || !this.select) return !1;
                var b = this.select.getAttribute("value");
                if (b == a) return !0;
                if (this.select.getAttribute("multiple") && i(b))
                    for (var c = b.length; c--;)
                        if (b[c] == a) return !0
            }, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.attributeByName.value || (this.node._ractive.value = this.getAttribute("value"))
            }, b.prototype.unbind = function() {
                a.prototype.unbind.call(this), this.select && D(this.select.options, this)
            }, b
        }(Em),
        Lm = function(a) {
            function b() {
                a.apply(this, arguments)
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                this.refName = this.template.r;
                var b, c = this.refName ? qf(this.ractive, this.refName, this.parentFragment) || null : null;
                c && (this.named = !0, this.setTemplate(this.template.r, c)), c || (a.prototype.bind.call(this), this.model && (b = this.model.get()) && "object" == typeof b && ("string" == typeof b.template || i(b.t)) ? (b.template ? (this.source = b.template, b = vf(this.template.r, b.template, this.ractive)) : this.source = b.t, this.setTemplate(this.template.r, b.t)) : this.model && "string" == typeof this.model.get() || !this.refName ? this.setTemplate(this.model.get()) : this.setTemplate(this.refName, c)), this.fragment = new yn({
                    owner: this,
                    template: this.partialTemplate
                }).bind()
            }, b.prototype.detach = function() {
                return this.fragment.detach()
            }, b.prototype.find = function(a) {
                return this.fragment.find(a)
            }, b.prototype.findAll = function(a, b) {
                this.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                return this.fragment.findComponent(a)
            }, b.prototype.findAllComponents = function(a, b) {
                this.fragment.findAllComponents(a, b)
            }, b.prototype.firstNode = function(a) {
                return this.fragment.firstNode(a)
            }, b.prototype.forceResetTemplate = function() {
                var a = this;
                this.partialTemplate = void 0, this.refName && (this.partialTemplate = qf(this.ractive, this.refName, this.parentFragment)), this.partialTemplate || (this.partialTemplate = qf(this.ractive, this.name, this.parentFragment)), this.partialTemplate || (t("Could not find template for partial '" + this.name + "'"), this.partialTemplate = []), this.inAttribute ? De(function() {
                    return a.fragment.resetTemplate(a.partialTemplate)
                }) : this.fragment.resetTemplate(this.partialTemplate), this.bubble()
            }, b.prototype.render = function(a, b) {
                this.fragment.render(a, b)
            }, b.prototype.setTemplate = function(a, b) {
                this.name = a, b || null === b || (b = qf(this.ractive, a, this.parentFragment)), b || t("Could not find template for partial '" + a + "'"), this.partialTemplate = b || []
            }, b.prototype.toString = function(a) {
                return this.fragment.toString(a)
            }, b.prototype.unbind = function() {
                a.prototype.unbind.call(this), this.fragment.unbind()
            }, b.prototype.unrender = function(a) {
                this.fragment.unrender(a)
            }, b.prototype.update = function() {
                var a;
                this.dirty && (this.dirty = !1, this.named || (this.model && (a = this.model.get()), a && "string" == typeof a && a !== this.name ? (this.setTemplate(a), this.fragment.resetTemplate(this.partialTemplate)) : a && "object" == typeof a && ("string" == typeof a.template || i(a.t)) && a.t !== this.source && a.template !== this.source && (a.template ? (this.source = a.template, a = vf(this.name, a.template, this.ractive)) : this.source = a.t, this.setTemplate(this.name, a.t), this.fragment.resetTemplate(this.partialTemplate))), this.fragment.update())
            }, b
        }(Gm),
        Mm = function(a) {
            this.parent = a.owner.parentFragment, this.parentFragment = this, this.owner = a.owner, this.ractive = this.parent.ractive, this.cssIds = "cssIds" in a ? a.cssIds : this.parent ? this.parent.cssIds : null, this.context = null, this.rendered = !1, this.iterations = [], this.template = a.template, this.indexRef = a.indexRef, this.keyRef = a.keyRef, this.pendingNewIndices = null, this.previousIterations = null, this.isArray = !1
        };
    Mm.prototype.bind = function(a) {
        var b = this;
        this.context = a;
        var c = a.get();
        if (this.isArray = i(c)) {
            this.iterations = [];
            for (var d = c.length, e = 0; e < d; e += 1) b.iterations[e] = b.createIteration(e, e)
        } else if (l(c)) {
            if (this.isArray = !1, this.indexRef) {
                var f = this.indexRef.split(",");
                this.keyRef = f[0], this.indexRef = f[1]
            }
            this.iterations = Object.keys(c).map(function(a, c) {
                return b.createIteration(a, c)
            })
        }
        return this
    }, Mm.prototype.bubble = function() {
        this.owner.bubble()
    }, Mm.prototype.createIteration = function(a, b) {
        var c = new yn({
            owner: this,
            template: this.template
        });
        c.key = a, c.index = b, c.isIteration = !0;
        var d = this.context.joinKey(a);
        return this.owner.template.z && (c.aliases = {}, c.aliases[this.owner.template.z[0].n] = d), c.bind(d)
    }, Mm.prototype.destroyed = function() {
        this.iterations.forEach(function(a) {
            return a.destroyed()
        })
    }, Mm.prototype.detach = function() {
        var b = a();
        return this.iterations.forEach(function(a) {
            return b.appendChild(a.detach())
        }), b
    }, Mm.prototype.find = function(a) {
        var b, c = this,
            d = this.iterations.length;
        for (b = 0; b < d; b += 1) {
            var e = c.iterations[b].find(a);
            if (e) return e
        }
    }, Mm.prototype.findAll = function(a, b) {
        var c, d = this,
            e = this.iterations.length;
        for (c = 0; c < e; c += 1) d.iterations[c].findAll(a, b)
    }, Mm.prototype.findComponent = function(a) {
        var b, c = this,
            d = this.iterations.length;
        for (b = 0; b < d; b += 1) {
            var e = c.iterations[b].findComponent(a);
            if (e) return e
        }
    }, Mm.prototype.findAllComponents = function(a, b) {
        var c, d = this,
            e = this.iterations.length;
        for (c = 0; c < e; c += 1) d.iterations[c].findAllComponents(a, b)
    }, Mm.prototype.findNextNode = function(a) {
        var b = this;
        if (a.index < this.iterations.length - 1)
            for (var c = a.index + 1; c < b.iterations.length; c++) {
                var d = b.iterations[c].firstNode(!0);
                if (d) return d
            }
        return this.owner.findNextNode()
    }, Mm.prototype.firstNode = function(a) {
        return this.iterations[0] ? this.iterations[0].firstNode(a) : null
    }, Mm.prototype.rebinding = function(a) {
        var b = this;
        this.context = a, this.iterations.forEach(function(c) {
            var d = a ? a.joinKey(c.key || c.index) : void 0;
            c.context = d, b.owner.template.z && (c.aliases = {}, c.aliases[b.owner.template.z[0].n] = d)
        })
    }, Mm.prototype.render = function(a, b) {
        this.iterations && this.iterations.forEach(function(c) {
            return c.render(a, b)
        }), this.rendered = !0
    }, Mm.prototype.shuffle = function(a) {
        var b = this;
        this.pendingNewIndices || (this.previousIterations = this.iterations.slice()), this.pendingNewIndices || (this.pendingNewIndices = []), this.pendingNewIndices.push(a);
        var c = [];
        a.forEach(function(a, d) {
            if (a !== -1) {
                var e = b.iterations[d];
                c[a] = e, a !== d && e && (e.dirty = !0)
            }
        }), this.iterations = c, this.bubble()
    }, Mm.prototype.shuffled = function() {
        this.iterations.forEach(function(a) {
            return a.shuffled()
        })
    }, Mm.prototype.toString = function(a) {
        return this.iterations ? this.iterations.map(a ? Ma : La).join("") : ""
    }, Mm.prototype.unbind = function() {
        return this.iterations.forEach(Ha), this
    }, Mm.prototype.unrender = function(a) {
        this.iterations.forEach(a ? Ja : Ia), this.pendingNewIndices && this.previousIterations && this.previousIterations.forEach(function(b) {
            b.rendered && (a ? Ja(b) : Ia(b))
        }), this.rendered = !1
    }, Mm.prototype.update = function() {
        var b = this;
        if (this.pendingNewIndices) return void this.updatePostShuffle();
        if (!this.updating) {
            this.updating = !0;
            var c, d, e, f = this.context.get(),
                g = this.isArray,
                h = !0;
            if (this.isArray = i(f)) g && (h = !1, this.iterations.length > f.length && (c = this.iterations.splice(f.length)));
            else if (l(f) && !g)
                for (h = !1, c = [], d = {}, e = this.iterations.length; e--;) {
                    var j = b.iterations[e];
                    j.key in f ? d[j.key] = !0 : (b.iterations.splice(e, 1), c.push(j))
                }
            h && (c = this.iterations, this.iterations = []), c && c.forEach(function(a) {
                a.unbind(), a.unrender(!0)
            }), this.iterations.forEach(Ka);
            var k, m, n = i(f) ? f.length : l(f) ? Object.keys(f).length : 0;
            if (n > this.iterations.length) {
                if (k = this.rendered ? a() : null, e = this.iterations.length, i(f))
                    for (; e < f.length;) m = b.createIteration(e, e), b.iterations.push(m), b.rendered && m.render(k), e += 1;
                else if (l(f)) {
                    if (this.indexRef && !this.keyRef) {
                        var o = this.indexRef.split(",");
                        this.keyRef = o[0], this.indexRef = o[1]
                    }
                    Object.keys(f).forEach(function(a) {
                        d && a in d || (m = b.createIteration(a, e), b.iterations.push(m), b.rendered && m.render(k), e += 1)
                    })
                }
                if (this.rendered) {
                    var p = this.parent.findParentNode(),
                        q = this.parent.findNextNode(this.owner);
                    p.insertBefore(k, q)
                }
            }
            this.updating = !1
        }
    }, Mm.prototype.updatePostShuffle = function() {
        var b = this,
            c = this.pendingNewIndices[0];
        this.pendingNewIndices.slice(1).forEach(function(a) {
            c.forEach(function(b, d) {
                c[d] = a[b]
            })
        });
        var d, e = this.context.get().length,
            f = this.previousIterations.length,
            g = {};
        c.forEach(function(a, c) {
            var d = b.previousIterations[c];
            if (b.previousIterations[c] = null, a === -1) g[c] = d;
            else if (d.index !== a) {
                var e = b.context.joinKey(a);
                d.index = a, d.context = e, b.owner.template.z && (d.aliases = {}, d.aliases[b.owner.template.z[0].n] = e)
            }
        }), this.previousIterations.forEach(function(a, b) {
            a && (g[b] = a)
        });
        var h = this.rendered ? a() : null,
            i = this.rendered ? this.parent.findParentNode() : null,
            j = "startIndex" in c;
        for (d = j ? c.startIndex : 0; d < e; d++) {
            var k = b.iterations[d];
            k && j ? b.rendered && (g[d] && h.appendChild(g[d].detach()), h.childNodes.length && i.insertBefore(h, k.firstNode())) : (k || (b.iterations[d] = b.createIteration(d, d)), b.rendered && (g[d] && h.appendChild(g[d].detach()), k ? h.appendChild(k.detach()) : b.iterations[d].render(h)))
        }
        if (this.rendered) {
            for (d = e; d < f; d++) g[d] && h.appendChild(g[d].detach());
            h.childNodes.length && i.insertBefore(h, this.owner.findNextNode())
        }
        Object.keys(g).forEach(function(a) {
            return g[a].unbind().unrender(!0)
        }), this.iterations.forEach(Ka), this.pendingNewIndices = null, this.shuffled()
    };
    var Nm, Om = function(b) {
            function c(a) {
                b.call(this, a), this.sectionType = a.template.n || null, this.templateSectionType = this.sectionType, this.subordinate = 1 === a.template.l, this.fragment = null
            }
            return c.prototype = Object.create(b && b.prototype), c.prototype.constructor = c, c.prototype.bind = function() {
                b.prototype.bind.call(this), this.subordinate && (this.sibling = this.parentFragment.items[this.parentFragment.items.indexOf(this) - 1], this.sibling.nextSibling = this), this.model ? (this.dirty = !0, this.update()) : !this.sectionType || this.sectionType !== ij || this.sibling && this.sibling.isTruthy() || (this.fragment = new yn({
                    owner: this,
                    template: this.template.f
                }).bind())
            }, c.prototype.detach = function() {
                return this.fragment ? this.fragment.detach() : a()
            }, c.prototype.find = function(a) {
                if (this.fragment) return this.fragment.find(a)
            }, c.prototype.findAll = function(a, b) {
                this.fragment && this.fragment.findAll(a, b)
            }, c.prototype.findComponent = function(a) {
                if (this.fragment) return this.fragment.findComponent(a)
            }, c.prototype.findAllComponents = function(a, b) {
                this.fragment && this.fragment.findAllComponents(a, b)
            }, c.prototype.firstNode = function(a) {
                return this.fragment && this.fragment.firstNode(a)
            }, c.prototype.isTruthy = function() {
                if (this.subordinate && this.sibling.isTruthy()) return !0;
                var a = this.model ? this.model.isRoot ? this.model.value : this.model.get() : void 0;
                return !(!a || this.templateSectionType !== lj && wf(a))
            }, c.prototype.rebinding = function(a, c, d) {
                b.prototype.rebinding.call(this, a, c, d) && this.fragment && this.sectionType !== hj && this.sectionType !== ij && this.fragment.rebinding(a, c)
            }, c.prototype.render = function(a, b) {
                this.rendered = !0, this.fragment && this.fragment.render(a, b)
            }, c.prototype.shuffle = function(a) {
                this.fragment && this.sectionType === jj && this.fragment.shuffle(a)
            }, c.prototype.toString = function(a) {
                return this.fragment ? this.fragment.toString(a) : ""
            }, c.prototype.unbind = function() {
                b.prototype.unbind.call(this), this.fragment && this.fragment.unbind()
            }, c.prototype.unrender = function(a) {
                this.rendered && this.fragment && this.fragment.unrender(a), this.rendered = !1
            }, c.prototype.update = function() {
                if (this.dirty && (this.fragment && this.sectionType !== hj && this.sectionType !== ij && (this.fragment.context = this.model), this.model || this.sectionType === ij)) {
                    this.dirty = !1;
                    var b = this.model ? this.model.isRoot ? this.model.value : this.model.get() : void 0,
                        c = !this.subordinate || !this.sibling.isTruthy(),
                        d = this.sectionType;
                    null !== this.sectionType && null !== this.templateSectionType || (this.sectionType = xf(b, this.template.i)), d && d !== this.sectionType && this.fragment && (this.rendered && this.fragment.unbind().unrender(!0), this.fragment = null);
                    var e, f = this.sectionType === jj || this.sectionType === kj || c && (this.sectionType === ij ? !this.isTruthy() : this.isTruthy());
                    if (f)
                        if (this.fragment) this.fragment.update();
                        else if (this.sectionType === jj) e = new Mm({
                        owner: this,
                        template: this.template.f,
                        indexRef: this.template.i
                    }).bind(this.model);
                    else {
                        var g = this.sectionType !== hj && this.sectionType !== ij ? this.model : null;
                        e = new yn({
                            owner: this,
                            template: this.template.f
                        }).bind(g)
                    } else this.fragment && this.rendered && this.fragment.unbind().unrender(!0), this.fragment = null;
                    if (e) {
                        if (this.rendered) {
                            var h = this.parentFragment.findParentNode(),
                                i = this.parentFragment.findNextNode(this);
                            if (i) {
                                var j = a();
                                e.render(j), i.parentNode.insertBefore(j, i)
                            } else e.render(h)
                        }
                        this.fragment = e
                    }
                    this.nextSibling && (this.nextSibling.dirty = !0, this.nextSibling.update())
                }
            }, c
        }(Gm),
        Pm = function(a) {
            function b(b) {
                a.call(this, b), this.options = []
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.foundNode = function(a) {
                if (this.binding) {
                    var b = cf(a);
                    b.length > 0 && (this.selectedOptions = b)
                }
            }, b.prototype.render = function(b, c) {
                a.prototype.render.call(this, b, c), this.sync();
                for (var d = this.node, e = d.options.length; e--;) d.options[e].defaultSelected = d.options[e].selected;
                this.rendered = !0
            }, b.prototype.sync = function() {
                var a = this,
                    b = this.node;
                if (b) {
                    var c = E(b.options);
                    if (this.selectedOptions) return c.forEach(function(b) {
                        a.selectedOptions.indexOf(b) >= 0 ? b.selected = !0 : b.selected = !1
                    }), this.binding.setFromNode(b), void delete this.selectedOptions;
                    var d = this.getAttribute("value"),
                        e = this.getAttribute("multiple");
                    if (void 0 !== d) {
                        var f;
                        c.forEach(function(a) {
                            var b = a._ractive ? a._ractive.value : a.value,
                                c = e ? yf(d, b) : d == b;
                            c && (f = !0), a.selected = c
                        }), f || e || this.binding && this.binding.forceUpdate()
                    } else this.binding && this.binding.forceUpdate()
                }
            }, b.prototype.update = function() {
                a.prototype.update.call(this), this.sync()
            }, b
        }(Em),
        Qm = function(a) {
            function b(b) {
                var c = b.template;
                b.deferContent = !0, a.call(this, b), this.attributeByName.value || (c.f && ff({
                    template: c
                }) ? this.attributes.push(Jf({
                    owner: this,
                    template: {
                        t: Mi,
                        f: c.f,
                        n: "value"
                    },
                    parentFragment: this.parentFragment
                })) : this.fragment = new yn({
                    owner: this,
                    cssIds: null,
                    template: c.f
                }))
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bubble = function() {
                var a = this;
                this.dirty || (this.dirty = !0, this.rendered && !this.binding && this.fragment && fh.scheduleTask(function() {
                    a.dirty = !1, a.node.value = a.fragment.toString()
                }), this.parentFragment.bubble())
            }, b
        }(Im),
        Rm = function(a) {
            function b(b) {
                a.call(this, b), this.type = Ci
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {}, b.prototype.detach = function() {
                return c(this.node)
            }, b.prototype.firstNode = function() {
                return this.node
            }, b.prototype.render = function(a, b) {
                if (!Ce())
                    if (this.rendered = !0, b) {
                        var c = b[0];
                        c && 3 === c.nodeType ? (b.shift(), c.nodeValue !== this.template && (c.nodeValue = this.template)) : (c = this.node = mg.createTextNode(this.template), b[0] ? a.insertBefore(c, b[0]) : a.appendChild(c)), this.node = c
                    } else this.node = mg.createTextNode(this.template), a.appendChild(this.node)
            }, b.prototype.toString = function(a) {
                return a ? wc(this.template) : this.template
            }, b.prototype.unbind = function() {}, b.prototype.unrender = function(a) {
                this.rendered && a && this.detach(), this.rendered = !1
            }, b.prototype.update = function() {}, b.prototype.valueOf = function() {
                return this.template
            }, b
        }(sl);
    if (ng) {
        var Sm = {},
            Tm = pg("div").style;
        Nm = function(a) {
            if (a = zf(a), !Sm[a])
                if (void 0 !== Tm[a]) Sm[a] = a;
                else
                    for (var b = a.charAt(0).toUpperCase() + a.substring(1), c = zg.length; c--;) {
                        var d = zg[c];
                        if (void 0 !== Tm[d + b]) {
                            Sm[a] = d + b;
                            break
                        }
                    }
            return Sm[a]
        }
    } else Nm = null;
    var Um, Vm = Nm,
        Wm = "hidden";
    if (mg) {
        var Xm;
        if (Wm in mg) Xm = "";
        else
            for (var Ym = zg.length; Ym--;) {
                var Zm = zg[Ym];
                if (Wm = Zm + "Hidden", Wm in mg) {
                    Xm = Zm;
                    break
                }
            }
        void 0 !== Xm ? (mg.addEventListener(Xm + "visibilitychange", Af), Af()) : ("onfocusout" in mg ? (mg.addEventListener("focusout", Bf), mg.addEventListener("focusin", Cf)) : (lg.addEventListener("pagehide", Bf), lg.addEventListener("blur", Bf), lg.addEventListener("pageshow", Cf), lg.addEventListener("focus", Cf)), Um = !0)
    }
    var $m, _m = new RegExp("^-(?:" + zg.join("|") + ")-"),
        an = new RegExp("^(?:" + zg.join("|") + ")([A-Z])");
    if (ng) {
        var bn, cn, dn, en, fn, gn, hn = pg("div").style,
            jn = function(a) {
                return a
            },
            kn = {},
            ln = {};
        void 0 !== hn.transition ? (bn = "transition", cn = "transitionend", dn = !0) : void 0 !== hn.webkitTransition ? (bn = "webkitTransition", cn = "webkitTransitionEnd", dn = !0) : dn = !1, bn && (en = bn + "Duration", fn = bn + "Property", gn = bn + "TimingFunction"), $m = function(a, b, c, d, e) {
            setTimeout(function() {
                function f() {
                    clearTimeout(l)
                }

                function g() {
                    j && k && (a.unregisterCompleteHandler(f), a.ractive.fire(a.name + ":end", a.node, a.isIntro), e())
                }

                function h(a) {
                    var b = d.indexOf(zf(Df(a.propertyName)));
                    b !== -1 && d.splice(b, 1), d.length || (clearTimeout(l), i())
                }

                function i() {
                    n[fn] = o.property, n[gn] = o.duration, n[en] = o.timing, a.node.removeEventListener(cn, h, !1), k = !0, g()
                }
                var j, k, l, m = (a.node.namespaceURI || "") + a.node.tagName,
                    n = a.node.style,
                    o = {
                        property: n[fn],
                        timing: n[gn],
                        duration: n[en]
                    };
                n[fn] = d.map(Vm).map(Ef).join(","), n[gn] = Ef(c.easing || "linear"), n[en] = c.duration / 1e3 + "s", a.node.addEventListener(cn, h, !1), l = setTimeout(function() {
                    d = [], i()
                }, c.duration + (c.delay || 0) + 50), a.registerCompleteHandler(f), setTimeout(function() {
                    for (var e, f, i, l, o, p, q = d.length, r = []; q--;) l = d[q], e = m + l, dn && !ln[e] && (n[Vm(l)] = b[l], kn[e] || (f = a.getStyle(l), kn[e] = a.getStyle(l) != b[l], ln[e] = !kn[e], ln[e] && (n[Vm(l)] = f))), dn && !ln[e] || (void 0 === f && (f = a.getStyle(l)), i = d.indexOf(l), i === -1 ? s("Something very strange happened with transitions. Please raise an issue at https://github.com/ractivejs/ractive/issues - thanks!", {
                        node: a.node
                    }) : d.splice(i, 1), o = /[^\d]*$/.exec(b[l])[0], p = w(parseFloat(f), parseFloat(b[l])) || function() {
                        return b[l]
                    }, r.push({
                        name: Vm(l),
                        interpolator: p,
                        suffix: o
                    }));
                    if (r.length) {
                        var u;
                        "string" == typeof c.easing ? (u = a.ractive.easing[c.easing], u || (t(Vg(c.easing, "easing")), u = jn)) : u = "function" == typeof c.easing ? c.easing : jn, new Gh({
                            duration: c.duration,
                            easing: u,
                            step: function(b) {
                                for (var c = r.length; c--;) {
                                    var d = r[c];
                                    a.node.style[d.name] = d.interpolator(b) + d.suffix
                                }
                            },
                            complete: function() {
                                j = !0, g()
                            }
                        })
                    } else j = !0;
                    d.length || (a.node.removeEventListener(cn, h, !1), k = !0, g())
                }, 0)
            }, c.delay || 0)
        }
    } else $m = null;
    var mn = $m,
        nn = lg && (lg.getComputedStyle || kg.getComputedStyle),
        on = bh.resolve(),
        pn = {
            t0: "intro-outro",
            t1: "intro",
            t2: "outro"
        },
        qn = function(a) {
            this.owner = a.owner || a.parentFragment.owner || ge(a.parentFragment), this.element = this.owner.attributeByName ? this.owner : ge(a.parentFragment), this.ractive = this.owner.ractive, this.template = a.template, this.parentFragment = a.parentFragment, this.options = a, this.onComplete = []
        };
    qn.prototype.animateStyle = function(a, b, c) {
        var d = this;
        if (4 === arguments.length) throw new Error("t.animateStyle() returns a promise - use .then() instead of passing a callback");
        if (!Um) return this.setStyle(a, b), on;
        var e;
        return "string" == typeof a ? (e = {}, e[a] = b) : (e = a, c = b), c || (t('The "%s" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340', this.name), c = this), new bh(function(a) {
            if (!c.duration) return d.setStyle(e), void a();
            for (var b = Object.keys(e), f = [], g = nn(d.node), h = b.length; h--;) {
                var i = b[h],
                    j = g[Vm(i)];
                "0px" === j && (j = 0), j != e[i] && (f.push(i), d.node.style[Vm(i)] = j)
            }
            return f.length ? void mn(d, e, c, f, a) : void a()
        })
    }, qn.prototype.bind = function() {
        var a = this,
            b = this.options,
            c = b.template && b.template.v;
        c && ("t0" !== c && "t1" !== c || (this.element._introTransition = this), "t0" !== c && "t2" !== c || (this.element._outroTransition = this), this.eventName = pn[c]);
        var d = this.owner.ractive;
        if (b.name) this.name = b.name;
        else {
            var e = b.template.f;
            if ("string" == typeof e.n && (e = e.n), "string" != typeof e) {
                var f = new yn({
                    owner: this.owner,
                    template: e.n
                }).bind();
                if (e = f.toString(), f.unbind(), "" === e) return
            }
            this.name = e
        }
        if (b.params) this.params = b.params;
        else if (b.template.f.a && !b.template.f.a.s) this.params = b.template.f.a;
        else if (b.template.f.d) {
            var g = new yn({
                owner: this.owner,
                template: b.template.f.d
            }).bind();
            this.params = g.getArgsList(), g.unbind()
        }
        "function" == typeof this.name ? (this._fn = this.name, this.name = this._fn.name) : this._fn = u("transitions", d, this.name), this._fn || t(Vg(this.name, "transition"), {
            ractive: d
        }), b.template && this.template.f.a && this.template.f.a.s && (this.resolvers = [], this.models = this.template.f.a.r.map(function(b, c) {
            var d, e = Va(a.parentFragment, b);
            return e ? e.register(a) : (d = a.parentFragment.resolve(b, function(b) {
                a.models[c] = b, D(a.resolvers, d), b.register(a)
            }), a.resolvers.push(d)), e
        }), this.argsFn = pc(this.template.f.a.s, this.template.f.a.r.length))
    }, qn.prototype.destroyed = function() {}, qn.prototype.getStyle = function(a) {
        var b = nn(this.node);
        if ("string" == typeof a) {
            var c = b[Vm(a)];
            return "0px" === c ? 0 : c
        }
        if (!i(a)) throw new Error("Transition$getStyle must be passed a string, or an array of strings representing CSS properties");
        for (var d = {}, e = a.length; e--;) {
            var f = a[e],
                g = b[Vm(f)];
            "0px" === g && (g = 0), d[f] = g
        }
        return d
    }, qn.prototype.processParams = function(a, b) {
        return "number" == typeof a ? a = {
            duration: a
        } : "string" == typeof a ? a = "slow" === a ? {
            duration: 600
        } : "fast" === a ? {
            duration: 200
        } : {
            duration: 400
        } : a || (a = {}), g({}, b, a)
    }, qn.prototype.rebinding = function(a, b) {
        var c = this.models.indexOf(b);
        ~c && (a = Qa(this.template.f.a.r[c], a, b), a !== b && (b.unregister(this), this.models.splice(c, 1, a), a && a.addShuffleRegister(this, "mark")))
    }, qn.prototype.registerCompleteHandler = function(a) {
        y(this.onComplete, a)
    }, qn.prototype.render = function() {}, qn.prototype.setStyle = function(a, b) {
        if ("string" == typeof a) this.node.style[Vm(a)] = b;
        else {
            var c;
            for (c in a) a.hasOwnProperty(c) && (this.node.style[Vm(c)] = a[c])
        }
        return this
    }, qn.prototype.start = function() {
        var a, b = this,
            c = this.node = this.element.node,
            d = c.getAttribute("style"),
            e = this.params;
        if (this.complete = function(e) {
                a || (b.onComplete.forEach(function(a) {
                    return a()
                }), !e && b.isIntro && Ff(c, d), b._manager.remove(b), a = !0)
            }, !this._fn) return void this.complete();
        if (this.argsFn) {
            var f = this.models.map(function(a) {
                if (a) return a.get()
            });
            e = this.argsFn.apply(this.ractive, f)
        }
        var g = this._fn.apply(this.ractive, [this].concat(e));
        g && g.then(this.complete)
    }, qn.prototype.toString = function() {
        return ""
    }, qn.prototype.unbind = function() {
        if (this.resolvers && this.resolvers.forEach(Ha), !this.element.attributes.unbinding) {
            var a = this.options && this.options.template && this.options.template.v;
            "t0" !== a && "t1" !== a || (this.element._introTransition = null), "t0" !== a && "t2" !== a || (this.element._outroTransition = null)
        }
    }, qn.prototype.unregisterCompleteHandler = function(a) {
        D(this.onComplete, a)
    }, qn.prototype.unrender = function() {}, qn.prototype.update = function() {};
    var rn, sn, tn = {};
    try {
        pg("table").innerHTML = "foo"
    } catch (a) {
        rn = !0, sn = {
            TABLE: ['<table class="x">', "</table>"],
            THEAD: ['<table><thead class="x">', "</thead></table>"],
            TBODY: ['<table><tbody class="x">', "</tbody></table>"],
            TR: ['<table><tr class="x">', "</tr></table>"],
            SELECT: ['<select class="x">', "</select>"]
        }
    }
    var un = function(b) {
            function d(a) {
                b.call(this, a)
            }
            return d.prototype = Object.create(b && b.prototype), d.prototype.constructor = d, d.prototype.detach = function() {
                var b = a();
                return this.nodes.forEach(function(a) {
                    return b.appendChild(a)
                }), b
            }, d.prototype.find = function(a) {
                var b, c = this,
                    d = this.nodes.length;
                for (b = 0; b < d; b += 1) {
                    var e = c.nodes[b];
                    if (1 === e.nodeType) {
                        if (qg(e, a)) return e;
                        var f = e.querySelector(a);
                        if (f) return f
                    }
                }
                return null
            }, d.prototype.findAll = function(a, b) {
                var c, d = this,
                    e = this.nodes.length;
                for (c = 0; c < e; c += 1) {
                    var f = d.nodes[c];
                    if (1 === f.nodeType) {
                        b.test(f) && b.add(f);
                        var g = f.querySelectorAll(a);
                        if (g) {
                            var h, i = g.length;
                            for (h = 0; h < i; h += 1) b.add(g[h])
                        }
                    }
                }
            }, d.prototype.findComponent = function() {
                return null
            }, d.prototype.firstNode = function() {
                return this.nodes[0]
            }, d.prototype.render = function(a) {
                var b = this.model ? this.model.get() : "";
                this.nodes = Gf(b, this.parentFragment.findParentNode(), a), this.rendered = !0
            }, d.prototype.toString = function() {
                return this.model && null != this.model.get() ? vc("" + this.model.get()) : ""
            }, d.prototype.unrender = function() {
                this.nodes && this.nodes.forEach(function(a) {
                    return c(a)
                }), this.rendered = !1
            }, d.prototype.update = function() {
                if (this.rendered && this.dirty) {
                    this.dirty = !1, this.unrender();
                    var b = a();
                    this.render(b);
                    var c = this.parentFragment.findParentNode(),
                        d = this.parentFragment.findNextNode(this);
                    c.insertBefore(b, d)
                } else this.dirty = !1
            }, d
        }(Gm),
        vn = function(a) {
            function b(b) {
                a.call(this, b), this.container = b.parentFragment.ractive, this.component = this.container.component, this.containerFragment = b.parentFragment, this.parentFragment = this.component.parentFragment, this.name = b.template.n || ""
            }
            return b.prototype = Object.create(a && a.prototype), b.prototype.constructor = b, b.prototype.bind = function() {
                var a = this.name;
                (this.component.yielders[a] || (this.component.yielders[a] = [])).push(this);
                var b = this.container._inlinePartials[a || "content"];
                "string" == typeof b && (b = Jd(b).t), b || (s('Could not find template for partial "' + a + '"', {
                    ractive: this.ractive
                }), b = []), this.fragment = new yn({
                    owner: this,
                    ractive: this.container.parent,
                    template: b
                }).bind()
            }, b.prototype.bubble = function() {
                this.dirty || (this.containerFragment.bubble(), this.dirty = !0)
            }, b.prototype.detach = function() {
                return this.fragment.detach()
            }, b.prototype.find = function(a) {
                return this.fragment.find(a)
            }, b.prototype.findAll = function(a, b) {
                this.fragment.findAll(a, b)
            }, b.prototype.findComponent = function(a) {
                return this.fragment.findComponent(a)
            }, b.prototype.findAllComponents = function(a, b) {
                this.fragment.findAllComponents(a, b)
            }, b.prototype.findNextNode = function() {
                return this.containerFragment.findNextNode(this)
            }, b.prototype.firstNode = function(a) {
                return this.fragment.firstNode(a)
            }, b.prototype.render = function(a, b) {
                return this.fragment.render(a, b)
            }, b.prototype.setTemplate = function(a) {
                var b = this.parentFragment.ractive.partials[a];
                "string" == typeof b && (b = Jd(b).t), this.partialTemplate = b || []
            }, b.prototype.toString = function(a) {
                return this.fragment.toString(a)
            }, b.prototype.unbind = function() {
                this.fragment.unbind(), D(this.component.yielders[this.name], this)
            }, b.prototype.unrender = function(a) {
                this.fragment.unrender(a)
            }, b.prototype.update = function() {
                this.dirty = !1, this.fragment.update()
            }, b
        }(sl),
        wn = {};
    wn[Si] = xl, wn[Ri] = om, wn[Di] = Hm, wn[Ji] = Lm, wn[Fi] = Om, wn[Ei] = un, wn[Pi] = vn, wn[Mi] = El, wn[rj] = Fl, wn[pj] = nm, wn[oj] = jm, wn[qj] = qn;
    var xn = {
            doctype: om,
            form: Fm,
            input: Im,
            option: Km,
            select: Pm,
            textarea: Qm
        },
        yn = function(a) {
            this.owner = a.owner, this.isRoot = !a.owner.parentFragment, this.parent = this.isRoot ? null : this.owner.parentFragment, this.ractive = a.ractive || (this.isRoot ? a.owner : this.parent.ractive), this.componentParent = this.isRoot && this.ractive.component ? this.ractive.component.parentFragment : null, this.context = null, this.rendered = !1, this.cssIds = "cssIds" in a ? a.cssIds : this.parent ? this.parent.cssIds : null, this.resolvers = [], this.dirty = !1, this.dirtyArgs = this.dirtyValue = !0, this.template = a.template || [], this.createItems()
        };
    yn.prototype.bind = function(a) {
        return this.context = a, this.items.forEach(za), this.bound = !0, this.dirty && this.update(), this
    }, yn.prototype.bubble = function() {
        this.dirtyArgs = this.dirtyValue = !0, this.dirty || (this.dirty = !0, this.isRoot ? this.ractive.component ? this.ractive.component.bubble() : this.bound && fh.addFragment(this) : this.owner.bubble())
    }, yn.prototype.createItems = function() {
        var a = this,
            b = this.template.length;
        this.items = [];
        for (var c = 0; c < b; c++) a.items[c] = Jf({
            parentFragment: a,
            template: a.template[c],
            index: c
        })
    }, yn.prototype.destroyed = function() {
        this.items.forEach(function(a) {
            return a.destroyed()
        })
    }, yn.prototype.detach = function() {
        var b = a();
        return this.items.forEach(function(a) {
            return b.appendChild(a.detach())
        }), b
    }, yn.prototype.find = function(a) {
        var b, c = this,
            d = this.items.length;
        for (b = 0; b < d; b += 1) {
            var e = c.items[b].find(a);
            if (e) return e
        }
    }, yn.prototype.findAll = function(a, b) {
        var c = this;
        if (this.items) {
            var d, e = this.items.length;
            for (d = 0; d < e; d += 1) {
                var f = c.items[d];
                f.findAll && f.findAll(a, b)
            }
        }
        return b
    }, yn.prototype.findComponent = function(a) {
        var b, c = this,
            d = this.items.length;
        for (b = 0; b < d; b += 1) {
            var e = c.items[b].findComponent(a);
            if (e) return e
        }
    }, yn.prototype.findAllComponents = function(a, b) {
        var c = this;
        if (this.items) {
            var d, e = this.items.length;
            for (d = 0; d < e; d += 1) {
                var f = c.items[d];
                f.findAllComponents && f.findAllComponents(a, b)
            }
        }
        return b
    }, yn.prototype.findContext = function() {
        for (var a = this; a && !a.context;) a = a.parent;
        return a ? a.context : this.ractive.viewmodel
    }, yn.prototype.findNextNode = function(a) {
        var b = this;
        if (a)
            for (var c = a.index + 1; c < b.items.length; c++)
                if (b.items[c]) {
                    var d = b.items[c].firstNode(!0);
                    if (d) return d
                }
        return this.isRoot ? this.ractive.component ? this.ractive.component.parentFragment.findNextNode(this.ractive.component) : null : this.parent ? this.owner.findNextNode(this) : void 0
    }, yn.prototype.findParentNode = function() {
        var a = this;
        do {
            if (a.owner.type === Ii) return a.owner.node;
            if (a.isRoot && !a.ractive.component) return a.ractive.el;
            a = a.owner.type === Pi ? a.owner.containerFragment : a.componentParent || a.parent
        } while (a);
        throw new Error("Could not find parent node")
    }, yn.prototype.findRepeatingFragment = function() {
        for (var a = this;
            (a.parent || a.componentParent) && !a.isIteration;) a = a.parent || a.componentParent;
        return a
    }, yn.prototype.firstNode = function(a) {
        for (var b, c = this, d = 0; d < c.items.length; d++)
            if (b = c.items[d].firstNode(!0)) return b;
        return a ? null : this.parent.findNextNode(this.owner)
    }, yn.prototype.getArgsList = function() {
        if (this.dirtyArgs) {
            var a = {},
                b = Kf(this.items, a, this.ractive._guid),
                c = Tc("[" + b + "]", a);
            this.argsList = c ? c.value : [this.toString()], this.dirtyArgs = !1
        }
        return this.argsList
    }, yn.prototype.rebinding = function(a) {
        this.context = a
    }, yn.prototype.render = function(a, b) {
        if (this.rendered) throw new Error("Fragment is already rendered!");
        this.rendered = !0, this.items.forEach(function(c) {
            return c.render(a, b)
        })
    }, yn.prototype.resetTemplate = function(b) {
        var c = this.bound,
            d = this.rendered;
        if (c && (d && this.unrender(!0), this.unbind()), this.template = b, this.createItems(), c && (this.bind(this.context), d)) {
            var e = this.findParentNode(),
                f = this.findNextNode();
            if (f) {
                var g = a();
                this.render(g), e.insertBefore(g, f)
            } else this.render(e)
        }
    }, yn.prototype.resolve = function(a, b) {
        if (!this.context && this.parent.resolve) return this.parent.resolve(a, b);
        var c = new Yh(this, a, b);
        return this.resolvers.push(c), c
    }, yn.prototype.shuffled = function() {
        this.items.forEach(function(a) {
            return a.shuffled()
        })
    }, yn.prototype.toHtml = function() {
        return this.toString()
    }, yn.prototype.toString = function(a) {
        return this.items.map(a ? Ma : La).join("")
    }, yn.prototype.unbind = function() {
        return this.items.forEach(Ha), this.bound = !1, this
    }, yn.prototype.unrender = function(a) {
        this.items.forEach(a ? Lf : Ia), this.rendered = !1
    }, yn.prototype.update = function() {
        this.dirty && (this.updating ? this.isRoot && fh.addFragmentToRoot(this) : (this.dirty = !1, this.updating = !0, this.items.forEach(Ka), this.updating = !1))
    }, yn.prototype.valueOf = function() {
        if (1 === this.items.length) return this.items[0].valueOf();
        if (this.dirtyValue) {
            var a = {},
                b = Kf(this.items, a, this.ractive._guid),
                c = Tc(b, a);
            this.value = c ? c.value : this.toString(), this.dirtyValue = !1
        }
        return this.value
    };
    var zn = $a("reverse").path,
        An = $a("shift").path,
        Bn = $a("sort").path,
        Cn = $a("splice").path,
        Dn = new Yg("teardown"),
        En = new Yg("unrender"),
        Fn = $a("unshift").path,
        Gn = {
            add: Y,
            animate: _,
            detach: aa,
            find: ba,
            findAll: ga,
            findAllComponents: ha,
            findComponent: ia,
            findContainer: ja,
            findParent: ka,
            fire: ta,
            get: Wa,
            getNodeInfo: Lb,
            insert: Mb,
            link: Ob,
            merge: bb,
            observe: Pb,
            observeList: Rb,
            observeOnce: Tb,
            off: Wb,
            on: Xb,
            once: Yb,
            pop: bi,
            push: ci,
            render: bc,
            reset: _d,
            resetPartial: ce,
            resetTemplate: Mf,
            reverse: zn,
            set: Nf,
            shift: An,
            sort: Bn,
            splice: Cn,
            subtract: Of,
            teardown: Pf,
            toggle: Qf,
            toCSS: Rf,
            toCss: Rf,
            toHTML: Sf,
            toHtml: Sf,
            toText: Tf,
            transition: Uf,
            unlink: Vf,
            unrender: Wf,
            unshift: Fn,
            update: db,
            updateModel: Xf
        },
        Hn = "function";
    if (typeof Date.now !== Hn || typeof String.prototype.trim !== Hn || typeof Object.keys !== Hn || typeof Array.prototype.indexOf !== Hn || typeof Array.prototype.forEach !== Hn || typeof Array.prototype.map !== Hn || typeof Array.prototype.filter !== Hn || lg && typeof lg.addEventListener !== Hn) throw new Error("It looks like you're attempting to use Ractive.js in an older browser. You'll need to use one of the 'legacy builds' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.");
    return g(gg.prototype, Gn, ig), gg.prototype.constructor = gg, gg.defaults = gg.prototype, Jg(gg, {
        DEBUG: {
            writable: !0,
            value: !0
        },
        DEBUG_PROMISES: {
            writable: !0,
            value: !0
        },
        extend: {
            value: cg
        },
        escapeKey: {
            value: P
        },
        getNodeInfo: {
            value: Kb
        },
        joinKeys: {
            value: eg
        },
        parse: {
            value: Jd
        },
        splitKeypath: {
            value: fg
        },
        unescapeKey: {
            value: S
        },
        getCSS: {
            value: _b
        },
        Promise: {
            value: bh
        },
        enhance: {
            writable: !0,
            value: !1
        },
        svg: {
            value: yg
        },
        magic: {
            value: hg
        },
        VERSION: {
            value: "0.8.9"
        },
        adaptors: {
            writable: !0,
            value: {}
        },
        components: {
            writable: !0,
            value: {}
        },
        decorators: {
            writable: !0,
            value: {}
        },
        easing: {
            writable: !0,
            value: jg
        },
        events: {
            writable: !0,
            value: {}
        },
        interpolators: {
            writable: !0,
            value: Wg
        },
        partials: {
            writable: !0,
            value: {}
        },
        transitions: {
            writable: !0,
            value: {}
        }
    }), gg
});