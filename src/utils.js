import sdmp from "./system";

var mpHook = {
  data: 1,
  onLoad: 1,
  onShow: 1,
  onReady: 1,
  onHide: 1,
  onUnload: 1,
  onPullDownRefresh: 1,
  onReachBottom: 1,
  onShareAppMessage: 1,
  onPageScroll: 1,
  onResize: 1,
  onTabItemTap: 1,
  onURLQueryChange: 1,
  attached: 1,
  created: 1,
  detached: 1,
  methods: 1,
  properties: 1,
  ready: 1,
  __customConstructor__: 1
};

function isNumber(t) {
  return "[object Number]" == toString.call(t) && /[\d\.]+/.test(String(t));
}

function isString(t) {
  return "[object String]" == toString.call(t);
}

function isObject(t) {
  return "[object Object]" == toString.call(t) && null != t;
}

function setUpperCase(t) {
  return isString(t) ? t.toLocaleUpperCase() : t;
}

function getAppId() {
  return sdmp.sdmp_getAppId && sdmp.sdmp_getAppId();
}

function getMethods(t) {
  var e = [];
  for (const a in t) {
    "function" != typeof t[a] || mpHook[a] || e.push(a);
  }
  return e;
}

function isClick(t) {
  return !!{ tap: 1, longpress: 1, longtap: 1 }[t];
}

function getCurrentPath() {
  let t = "\u672a\u53d6\u5230";
  try {
    const e = getCurrentPages(),
      a = e[e.length - 1];
    t = a.route ? a.route : a.__route__;
  } catch (t) {
    console.log(t);
  }
  return t;
}

function getPath(t) {
  return "string" == typeof t
    ? t.replace(/^\//, "")
    : "\u53d6\u503c\u5f02\u5e38";
}

function assign(pre, next) {
  for (const key in next) {
    if (_.isObject(pre[key]) && _.isObject(next[key])) {
      assign(pre[key], next[key]);
    } else {
      pre[key] = next[key];
    }
  }
}

function utf8Encode(t) {
  var e,
    a,
    r,
    s,
    n = "";
  for (
    e = a = 0,
      r = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length,
      s = 0;
    s < r;
    s++
  ) {
    var i = t.charCodeAt(s),
      o = null;
    i < 128
      ? a++
      : (o =
          i > 127 && i < 2048
            ? String.fromCharCode((i >> 6) | 192, (63 & i) | 128)
            : String.fromCharCode(
                (i >> 12) | 224,
                ((i >> 6) & 63) | 128,
                (63 & i) | 128
              )),
      null !== o &&
        (a > e && (n += t.substring(e, a)), (n += o), (e = a = s + 1));
  }
  return a > e && (n += t.substring(e, t.length)), n;
}

function base64Encode(t) {
  var e,
    a,
    r,
    s,
    n,
    i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    o = 0,
    c = 0,
    p = "",
    u = [];
  if (!t) return t;
  t = utf8Encode(t);
  do {
    (e =
      ((n =
        (t.charCodeAt(o++) << 16) |
        (t.charCodeAt(o++) << 8) |
        t.charCodeAt(o++)) >>
        18) &
      63),
      (a = (n >> 12) & 63),
      (r = (n >> 6) & 63),
      (s = 63 & n),
      (u[c++] = i.charAt(e) + i.charAt(a) + i.charAt(r) + i.charAt(s));
  } while (o < t.length);
  switch (((p = u.join("")), t.length % 3)) {
    case 1:
      p = p.slice(0, -2) + "==";
      break;
    case 2:
      p = p.slice(0, -1) + "=";
  }
  return p;
}

const tools = {
  isNumber,
  isString,
  isObject,
  setUpperCase,
  getAppId,
  getMethods,
  isClick,
  getCurrentPath,
  getPath,
  assign,
  base64Encode
};

export default tools;
