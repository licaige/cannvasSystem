!function (t, i) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = i(); else if ("function" == typeof define && define.amd) define([], i); else {
        var s = i();
        for (var e in s) ("object" == typeof exports ? exports : t)[e] = s[e]
    }
}(window, function () {
    return function (t) {
        var i = {};

        function s(e) {
            if (i[e]) return i[e].exports;
            var h = i[e] = {i: e, l: !1, exports: {}};
            return t[e].call(h.exports, h, h.exports, s), h.l = !0, h.exports
        }

        return s.m = t, s.c = i, s.d = function (t, i, e) {
            s.o(t, i) || Object.defineProperty(t, i, {configurable: !1, enumerable: !0, get: e})
        }, s.r = function (t) {
            Object.defineProperty(t, "__esModule", {value: !0})
        }, s.n = function (t) {
            var i = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return s.d(i, "a", i), i
        }, s.o = function (t, i) {
            return Object.prototype.hasOwnProperty.call(t, i)
        }, s.p = "", s(s.s = 0)
    }([function (t, i, s) {
        "use strict";
        s.r(i), s.d(i, "okay", function () {
            return e
        });
        let e = {
            preload_img: function (t) {
                return new Promise((i, s) => {
                    let e = t.length, h = [];
                    t.forEach((t, n) => {
                        let o = new Image;
                        o.src = t, o.complete ? (h[n] = o, 0 == --e && i(h)) : (o.onload = (t => (function () {
                            h[t] = o, 0 == --e && i(h)
                        }))(n), o.onerror = function (i) {
                            e--, console.log("fail to load " + t), s(i)
                        })
                    })
                })
            }, Canvas: class {
                constructor(t) {
                    if (void 0 == t.ele) throw"Not found config of ele";
                    this.canAction = !1 | t.canAction;
                    let i = document.getElementById(t.ele);
                    if (void 0 == i) throw"Not found Element";
                    let s = document.createElement("canvas"), h = parseInt(i.style.width.replace("px", "")),
                        n = parseInt(i.style.height.replace("px", ""));
                    s.width = h, s.height = n, i.appendChild(s), this.selectNode = null, this.painter = s.getContext("2d"), this.ele = s, this.width = h, this.height = n, this.childs = new Array, this.eventManager = new e.EventManager(this), this.ele.setAttribute("tabindex", "0"), this.ele.style.outline = "none", this.ele.onclick = (t => {
                        this.ele.focus()
                    })
                }

                addChild(t) {
                    if (!(t instanceof e.Node)) throw"Error Argument";
                    -1 == this.childs.indexOf(t) ? (t.canvas = this, this.childs.push(t)) : (this.childs.splice(this.childs.indexOf(t), 1), t.canvas = this, this.childs.push(t))
                }

                removeChild(t) {
                    -1 != this.childs.indexOf(t) && this.childs.splice(this.childs.indexOf(t), 1)
                }

                paint() {
                    this.painter.clearRect(0, 0, this.width, this.height);
                    for (let t = 0; t < this.childs.length; t++) this.childs[t].paint();
                    this.canAction && setTimeout(() => {
                        this.paint()
                    }, Math.round(1e3 / 60))
                }
            }, Point: class {
                constructor(t, i) {
                    this.x = t, this.y = i
                }

                add(t, i = 0) {
                    if (t instanceof e.Point) this.x += t.x, this.y += t.y; else {
                        if (!/^[0-9]*\.?[0-9]*/.test(t)) throw"Type Error";
                        this.x += t, this.y += i
                    }
                }

                sub(t, i = 0) {
                    if (point instanceof e.Point) this.x -= point.x, this.y -= point.y; else {
                        if (!/^[0-9]*\.?[0-9]*/.test(point)) throw"Type Error";
                        this.x -= point, this.y -= i
                    }
                }
            }, Size: class {
                constructor(t, i) {
                    this.width = t, this.height = i
                }
            }, Scheduler: class {
                constructor(t, i) {
                    this.scheduler = t, this.callback = i
                }
            }, Action: class {
                constructor(t) {
                    this.running = !0, this.duration = 60 * t, this.currentFrame = 60 * t
                }

                run(t) {
                    this.update(t, this.currentFrame), this.currentFrame--, this.currentFrame > 0 && this.running && setTimeout(() => {
                        this.run(t)
                    }, Math.round(1e3 / 60))
                }

                stop() {
                    this.running = !1
                }

                update(t, i) {
                }

                reset() {
                }
            }, ActionMove: class extends e.Action {
                constructor(t, i) {
                    super(t), this.destination = i
                }

                run(t) {
                    let i = t.getPosition();
                    if (this.destination.x != i.x) {
                        let s = (this.destination.y - i.y) / (this.destination.x - i.x),
                            e = (this.destination.x - i.x) / this.currentFrame;
                        t.setPosition(i.x + e, i.y + e * s)
                    } else this.deta = (this.destination.y - i.y) / this.currentFrame, t.setPosition(i.x, i.y + deta);
                    this.currentFrame--, this.currentFrame > 0 && this.running && setTimeout(() => {
                        this.run(t)
                    }, Math.round(1e3 / 60))
                }

                directTo(t, i) {
                    this.destination = t, this.duration = i
                }

                reset() {
                    this.running = !0, this.currentFrame = this.duration
                }
            }, ActionScale: class extends e.Action {
                constructor(t, i, s) {
                    super(t), this.scaleX = i, this.scaleY = s, this.detaX = (this.scaleX - 1) / this.duration, this.detaY = (this.scaleY - 1) / this.duration
                }

                run(t) {
                    t.scaleX += this.detaX, t.scaleY += this.detaY, this.currentFrame--, this.currentFrame > 0 && this.running && setTimeout(() => {
                        this.run(t)
                    }, Math.round(1e3 / 60))
                }
            }, ActionRotate: class extends e.Action {
                constructor(t, i) {
                    super(t), this.rotate = i, this.deta = i / this.duration
                }

                run(t) {
                    t.rotation += this.deta, this.currentFrame--, this.currentFrame > 0 && this.running && setTimeout(() => {
                        this.run(t)
                    }, Math.round(1e3 / 60))
                }
            }, ActionAlpha: class extends e.Action {
                constructor(t, i) {
                    super(t), this.alpha = i, this.delta = (this.alpha - 1) / this.duration
                }

                run(t) {
                    t.alpha += this.delta, t.alpha < 0 && (t.alpha = 0), this.currentFrame--, this.currentFrame > 0 && this.running && setTimeout(() => {
                        this.run(t)
                    }, Math.round(1e3 / 60))
                }
            }, Event: class {
                constructor(t, i) {
                    this.event = t, this.callback = i
                }
            }
        };
        e.Event.Type = {
            EVENT_MOUSE_DOWN: "event_mouse_down",
            EVENT_MOUSE_MOVE: "event_mouse_move",
            EVENT_MOUSE_UP: "event_mouse_up",
            EVENT_KEY_DOWN: "event_key_down",
            EVENT_KEY_PRESS: "event_key_press",
            EVENT_KEY_UP: "event_key_up"
        }, e.Listener = class {
            constructor(t, i) {
                if (!(t instanceof e.Node && i instanceof e.Event)) throw"Error Arguments";
                this.obj = t, this.event = i
            }
        }, e.EventManager = class {
            constructor(t) {
                this.canvas = t, this.listeners = new Array, this.canvas.ele.onmousedown = (t => {
                    this.downFunc(t)
                }), this.canvas.ele.onmouseup = (t => {
                    this.upFunc(t)
                }), this.canvas.ele.onmousemove = (t => {
                    this.moveFunc(t)
                }), this.canvas.ele.onkeydown = (t => {
                    this.key_downFunc(t)
                }), this.canvas.ele.onkeypress = (t => {
                    this.key_pressFunc(t)
                }), this.canvas.ele.onkeyup = (t => {
                    this.key_upFunc(t)
                })
            }

            addEventListener(t) {
                if (!(t instanceof e.Listener)) throw"Error Arguments";
                this.listeners.push(t)
            }

            removeEventListener(t) {
                for (let i = 0; i < this.listeners.length; i++) {
                    if (this.listeners[i].event.event == t.event.event) {
                        this.listeners.splice(index, 1);
                        break
                    }
                }
            }

            mouseEvent(t, i) {
                if (i == e.Event.Type.EVENT_MOUSE_DOWN) {
                    let i = !1;
                    this.canvas.childs.forEach((s, h) => {
                        s.containPoint(new e.Point(t.pageX, this.canvas.height - t.pageY)) && (this.canvas.selectNode = s, i = !0)
                    }), i || (this.canvas.selectNode = null)
                }
                for (let s of this.listeners) null != s.obj && s.obj instanceof e.Node && s.event.event == i && s.obj.containPoint(new e.Point(t.pageX, this.canvas.height - t.pageY)) && s.event.callback(t, s.obj)
            }

            triggerEvent(t, i) {
                for (let s of this.listeners) s.event.event == t && s.obj == i && s.event.callback(t, s.obj)
            }

            downFunc(t) {
                this.mouseEvent(t, e.Event.Type.EVENT_MOUSE_DOWN)
            }

            upFunc(t) {
                this.mouseEvent(t, e.Event.Type.EVENT_MOUSE_UP)
            }

            moveFunc(t) {
                this.mouseEvent(t, e.Event.Type.EVENT_MOUSE_MOVE)
            }

            keyEvent(t, i) {
                for (let s of this.listeners) null != s.obj && s.obj instanceof e.Node && s.event.event == i && s.obj == this.canvas.selectNode && s.event.callback(t, s.obj)
            }

            key_downFunc(t) {
                this.keyEvent(t, e.Event.Type.EVENT_KEY_DOWN)
            }

            key_pressFunc(t) {
                this.keyEvent(t, e.Event.Type.EVENT_KEY_PRESS)
            }

            key_upFunc(t) {
                this.keyEvent(t, e.Event.Type.EVENT_KEY_UP)
            }
        }, e.Rect = class {
            constructor(t, i, s, e) {
                this.originX = t, this.originY = i, this.width = s, this.height = e
            }

            containPoint(t, i = 0) {
                return t instanceof e.Point ? !(t.x > this.originX + this.width || t.x < this.originX) && !(t.y > this.originY + this.height || t.y < this.originY) : !(t > this.originX + this.width || t < this.originX) && !(i > this.originY + this.height || i < this.originY)
            }

            getArea() {
                return this.width * this.height
            }

            isCross(t) {
                if (t instanceof e.Rect) return this.getArea() > t.getArea() ? this.containPoint(t.originX, t.originY) || this.containPoint(t.originX + t.width, t.originY) || this.containPoint(t.originX, t.originY + t.height) || this.containPoint(t.originX + t.width, t.originY + t.height) : t.containPoint(this.originX, this.originY) || t.containPoint(this.originX + this.width, this.originY) || t.containPoint(this.originX, this.originY + this.height) || t.containPoint(this.originX + this.width, this.originY + this.height);
                throw"Error Arguments"
            }
        }, e.Node = class {
            constructor() {
                this.position = new e.Point(0, 0), this.size = new e.Size(0, 0), this.visible = !0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.alpha = 1, this.schedulers = new Array, this.canvas = null
            }

            setPosition(t, i = 0) {
                t instanceof e.Point ? this.position = t : this.position = new e.Point(t, i)
            }

            getPosition() {
                return this.position
            }

            setSize(t, i = 0) {
                t instanceof e.Size ? this.size = t : (this.size.width = t, this.size.height = i)
            }

            scheduleUpdate(t) {
                this.updateScheduler = setInterval(t => {
                    this.update(t)
                }, t)
            }

            unschedulerUpdate() {
                clearInterval(this.updateScheduler)
            }

            update(t) {
            }

            schedule(t, i) {
                let s = setInterval(t(i), i);
                this.schedulers.push(new e.Scheduler(s, t))
            }

            runAction(t) {
                if (!(t instanceof e.Action)) throw"Error Arguments";
                t.reset(), t.run(this)
            }

            stopAction(t) {
                if (!(t instanceof e.Action)) throw"Error Arguments";
                t.stop()
            }

            unscheduler(t) {
                for (let i in this.schedulers) {
                    let s = this.schedulers[i];
                    if (s.callback == t) {
                        this.schedulers.slice(i, 1), clearInterval(s.scheduler);
                        break
                    }
                }
            }

            getContentBounding() {
                return new e.Rect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height)
            }

            containPoint(t) {
                return this.getContentBounding().containPoint(t)
            }

            addEventListener(t, i) {
                if (void 0 == this.canvas || null == this.canvas) throw"No Canvas Found";
                let s = new e.Event(t, i), h = new e.Listener(this, s);
                this.canvas.eventManager.addEventListener(h)
            }

            removeEventListener(t, i) {
                if (void 0 == this.canvas || null == this.canvas) throw"No Canvas Found";
                let s = new e.Event(t, i), h = new e.Listener(this, s);
                this.canvas.eventManager.removeEventListener(h)
            }

            trigger(t) {
                if (void 0 == this.canvas || null == this.canvas) throw"No Canvas Found";
                this.canvas.eventManager.triggerEvent(t, this)
            }

            draw(t) {
            }

            paint() {
                if (this.visible) {
                    let t = this.canvas.painter;
                    t.save(), t.globalAlpha = this.alpha, t.translate(0, this.scaleY * (this.canvas.height - 2 * this.position.y)), t.rotate(this.rotation * Math.PI / 180), t.scale(this.scaleX, this.scaleY), this.draw(t), t.restore()
                }
            }
        }, e.Layer = class extends e.Node {
            constructor() {
                super(), this.childs = new Array
            }

            addChild(t) {
                t instanceof e.Node && (-1 == this.childs.indexOf(t) ? (this.childs.push(t), t.canvas = this.canvas) : (this.childs.splice(this.childs.indexOf(t), 1), this.childs.push(t), t.canvas = this.canvas))
            }

            removeChild(t) {
                -1 != this.childs.indexOf(t) && this.childs.splice(this.childs.indexOf(t), 1)
            }

            paint() {
                if (this.visible) for (let t of this.childs) t.paint()
            }
        }, e.Color = class {
            constructor(t, i, s, e) {
                this.r = t, this.g = i, this.b = s, this.a = e
            }

            getColor() {
                return "#" + (this.r > 16 ? (this.r % 256).toString(16) : "0" + (this.r % 256).toString(16)) + (this.g > 16 ? (this.g % 256).toString(16) : "0" + (this.g % 256).toString(16)) + (this.b > 16 ? (this.b % 256).toString(16) : "0" + (this.b % 256).toString(16))
            }

            add(t) {
                this.r += t.r, this.g += t.g, this.b += t.b, this.a += t.a
            }

            sub(t) {
                this.r -= t.r, this.g -= t.g, this.b -= t.b, this.a -= t.a
            }

            digMul(t) {
                this.r = Math.round(this.r + this.r * t.r), this.g = Math.round(this.g + this.g * t.g), this.b = Math.round(this.b + this.b * t.b), this.a = Math.round(this.a + this.a * t.a)
            }

            ldMul(t) {
                if (!(t < 1 && t > 0)) throw"Error Arguments";
                this.r = Math.floor(this.r * t), this.g = Math.floor(this.g * t), this.b = Math.floor(this.b * t), this.a = Math.floor(this.a * t)
            }

            changeAlpha(t) {
                this.a + t <= 255 && this.a + t >= 0 && (this.a += t)
            }

            fadeIn(t) {
                this.a < 255 && (this.a += t)
            }

            fadeOut(t) {
                this.a > 0 && (this.a -= t)
            }
        }, e.Rectangle = class extends e.Node {
            constructor() {
                super(), this.color = new e.Color(0, 0, 0, 255)
            }

            setColor(t) {
                this.color = t
            }

            draw(t) {
                t.fillStyle = this.color.getColor(), t.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)
            }
        }, e.HollowRectangle = class extends e.Rectangle {
            constructor() {
                super(), this.lineWidth = 5
            }

            setLineWidth(t) {
                this.lineWidth = t
            }

            draw(t) {
                t.storkeStyle = this.color.getColor(), t.lineWidth = this.lineWidth, t.strokeRect(this.position.x, this.position.y, this.size.width, this.size.height)
            }
        }, e.Line = class extends e.Node {
            constructor(t, i) {
                super(), this.color = new e.Color(255, 255, 255, 255), this.from = t, this.to = i, this.lineWidth = 5
            }

            setColor(t) {
                this.color = t
            }

            setFrom(t, i = 0) {
                t instanceof e.Point ? this.from = t : this.from = new e.Point(t, i)
            }

            setTo(t, i = 0) {
                t instanceof e.Point ? this.to = t : this.to = new e.Point(t, i)
            }

            setLineWidth(t) {
                this.lineWidth = t
            }

            draw(t) {
                t.fillStyle = this.color.getColor(), t.lineWidth = this.lineWidth, t.moveTo(this.from.x, -this.from.y), t.lineTo(this.to.x, -this.to.y), t.stroke()
            }
        }, e.Sector = class extends e.Node {
            constructor(t, i = 0, s = 2 * Math.PI) {
                super(), this.color = new e.Color(0, 0, 0, 255), this.start = i, this.stop = s, this.radius = t
            }

            setStart(t) {
                this.start = t
            }

            setStop(t) {
                this.stop = t
            }

            setRadius(t) {
                this.radius = t
            }

            setColor(t) {
                this.color = t
            }

            containPoint(t) {
                if ((t.x - this.position.x) * (t.x - this.position.x) + (t.y - this.position.y) * (t.y - this.position.y) > this.radius * this.radius) return !1;
                let i = -(t.y - this.position.y) / (t.x - this.position.x), s = Math.atan(i);
                return t.x < this.position.x && t.y < this.position.y ? s = Math.PI + s : t.x < this.position.x && t.y > this.position.y ? s = 3 * Math.PI / 2 + s : t.x > this.position.x && t.y > this.position.y && (s = 2 * Math.PI + s), this.stop < this.start ? s >= this.start || s <= this.stop : s >= this.start && s <= this.stop
            }

            draw(t) {
                t.fillStyle = this.color.getColor(), t.beginPath(), t.arc(this.position.x / this.scaleX, this.position.y / this.scaleY, this.radius, this.start, this.stop), t.lineTo(this.position.x / this.scaleX, this.position.y / this.scaleY), t.fill()
            }
        }, e.HollowSector = class extends e.Sector {
            constructor(t, i = 0, s = 2 * Math.PI) {
                super(t, i, s), this.lineWidth = 5
            }

            setLineWidth(t) {
                this.lineWidth = t
            }

            draw(t) {
                t.beginPath(), t.strokeStyle = this.color.getColor(), t.lineWidth = this.lineWidth, t.arc(this.position.x / this.scaleX, this.position.y / this.scaleY, this.radius, this.start, this.stop), t.lineTo(this.position.x / this.scaleX, this.position.y / this.scaleY), t.closePath(), t.stroke()
            }
        }, e.Circle = class extends e.Sector {
            constructor(t) {
                super(t)
            }

            containPoint(t) {
                return (t.x - this.position.x) * (t.x - this.position.x) + (t.y - this.position.y) * (t.y - this.position.y) <= this.radius * this.radius
            }
        }, e.HollowCircle = class extends e.HollowSector {
            constructor(t) {
                super(t)
            }

            containPoint(t) {
                return (t.x - this.position.x) * (t.x - this.position.x) + (t.y - this.position.y) * (t.y - this.position.y) <= this.radius * this.radius
            }

            draw(t) {
                t.beginPath(), t.strokeStyle = this.color.getColor(), t.lineWidth = this.lineWidth, t.arc(this.position.x / this.scaleX, this.position.y / this.scaleY, this.radius, this.start, this.stop), t.stroke()
            }
        }, e.Text = class extends e.Node {
            constructor(t = "", i = "30px Arial") {
                super(), this.text = t, this.font = i, this.color = new e.Color(255, 255, 255, 255)
            }

            setColor(t) {
                this.color = t
            }

            draw(t) {
                t.font = this.font, t.fillStyle = this.color.getColor(), t.fillText(this.text, this.position.x / this.scaleX, this.position.y / this.scaleY)
            }
        }, e.Triangle = class extends e.Node {
            constructor(t, i, s) {
                super(), this.p1 = t, this.p2 = i, this.p3 = s, this.color = new e.Color(0, 0, 0, 255)
            }

            setColor(t) {
                this.color = t
            }

            draw(t) {
                t.translate(0, -this.canvas.height / this.scaleY), t.beginPath(), t.fillStyle = this.color.getColor(), t.moveTo(this.p1.x * this.scaleX, (this.canvas.height - this.p1.y) * this.scaleY), t.lineTo(this.p2.x * this.scaleX, (this.canvas.height - this.p2.y) * this.scaleY), t.lineTo(this.p3.x * this.scaleX, (this.canvas.height - this.p3.y) * this.scaleY), t.fill()
            }

            containPoint(t) {
                let i = [t.x - this.p1.x, -t.y + this.p1.y], s = [t.x - this.p2.x, -t.y + this.p2.y],
                    e = [t.x - this.p3.x, -t.y + this.p3.y],
                    h = (i[0] * s[0] + i[1] * s[1]) / Math.sqrt((i[0] * i[0] + i[1] * i[1]) * (s[0] * s[0] + s[1] * s[1])),
                    n = (i[0] * e[0] + i[1] * e[1]) / Math.sqrt((i[0] * i[0] + i[1] * i[1]) * (e[0] * e[0] + e[1] * e[1])),
                    o = (e[0] * s[0] + e[1] * s[1]) / Math.sqrt((e[0] * e[0] + e[1] * e[1]) * (s[0] * s[0] + s[1] * s[1]));
                return Math.acos(h) + Math.acos(n) + Math.acos(o) == 2 * Math.PI
            }
        }, e.HollowTriangle = class extends e.Triangle {
            constructor(t, i, s) {
                super(t, i, s), this.lineWidth = 5
            }

            setLineWidth(t) {
                this.lineWidth = t
            }

            draw(t) {
                t.translate(0, -this.canvas.height / this.scaleY), t.beginPath(), t.moveTo(this.p1.x * this.scaleX, (this.canvas.height - this.p1.y) * this.scaleY), t.lineTo(this.p2.x * this.scaleX, (this.canvas.height - this.p2.y) * this.scaleY), t.lineTo(this.p3.x * this.scaleX, (this.canvas.height - this.p3.y) * this.scaleY), t.closePath(), t.strokeStyle = this.color.getColor(), t.lineWidth = this.lineWidth, t.stroke()
            }
        }, e.Ellipse = class extends e.Node {
            constructor(t, i) {
                super(), this.a = t, this.b = i, this.color = new e.Color(0, 0, 0, 255)
            }

            setColor(t) {
                this.color = t
            }

            draw(t) {
                t.fillStyle = this.color.getColor();
                let i = this.a > this.b ? this.a : this.b, s = this.a / i, e = this.b / i;
                t.scale(s, e), t.arc(this.position.x / s / this.scaleX, this.position.y / e / this.scaleY, i, 0, 2 * Math.PI), t.lineTo(this.position.x / s / this.scaleX, this.position.y / e / this.scaleY), t.fill()
            }

            containPoint(t) {
                return (t.x - this.position.x) * (t.x - this.position.x) / this.a / this.a + (t.y - this.position.y) * (t.y - this.position.y) / this.b / this.b <= 1
            }
        }, e.HollowEllipse = class extends e.Ellipse {
            constructor(t, i) {
                super(t, i), this.lineWidth = 5
            }

            setLineWidth(t) {
                this.lineWidth = t
            }

            draw(t) {
                t.strokeStyle = this.color.getColor(), t.lineWidth = this.lineWidth;
                let i = this.a > this.b ? this.a : this.b, s = this.a / i, e = this.b / i;
                t.scale(s, e), t.arc(this.position.x / s / this.scaleX, this.position.y / e, i / this.scaleY, 0, 2 * Math.PI), t.stroke()
            }
        }, e.Image = class extends e.Node {
            constructor(t, i) {
                if (super(), this.img = new Image, 1 == arguments.length) this.img.src = t, this.rect = new e.Rect(0, 0, this.img.width, this.img.height); else {
                    if (2 != arguments.length) throw"Error Arguments";
                    this.img.src = t, this.rect = i
                }
            }

            resetTexture(t) {
                if (!(t.originX + t.width < this.img.width && t.originY + t.height < this.img.height && t.originX + t.width > 0 && t.originY + t.height > 0)) throw"Out of Bounding";
                this.rect = t
            }

            draw(t) {
                t.translate(this.position.x, this.position.y), t.drawImage(this.img, this.rect.originX, this.rect.originY, this.rect.width, this.rect.height, -this.rect.width / 2, -this.rect.height / 2, this.rect.width, this.rect.height)
            }
        }
    }])
});
