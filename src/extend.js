import _ from "./utils";

let an;

export function enhance(_an) {
  an = _an
  const oldApp = App;
  const oldPage = Page;
  const oldComponent = Component;

  App = function(t) {
    try {
      const e = t.onShow,
        a = t.onLaunch,
        r = t.onHide;

      t.onLaunch = function() {
        a && a.apply(this, arguments);
        an.appLaunch(arguments[0], {}, !0);
      };
      t.onShow = function() {
        e && e.apply(this, arguments);
        an.appShow(arguments[0], {}, !0);
      };
      t.onHide = function() {
        r && r.apply(this, arguments);
        an.appHide({}, !0);
      };
      oldApp.apply(this, arguments);
    } catch (e) {
      oldApp.apply(this, arguments);
    }
  };

  Page = function (t) {
    const e = t.onShow;
    const methods = an.config.autoTrack.mpClick && _.getMethods(t);
    if(methods) {
      for(let i=0, r = methods.length; i< r; i++) {
        click_proxy(t, methods[i]);
      }
    }

    t.onShow = function () {
      e && e.apply(this, arguments);
      an.pageShow({}, !0);
    }
    oldPage.apply(this, arguments);
  }

  Component = function(t) {
    try {
      // var e =
      //   sa.para.autoTrack && sa.para.autoTrack.mpClick && _.getMethods(t.methods);
      const methods = an.config.autoTrack.mpClick && _.getMethods(t.methods);
      if (methods) {

        for (let i = 0, r = methods.length; i < r; i++) {
          click_proxy(t.methods, methods[i]);
        }
      }

      const a = t.methods.onShow;
      t.methods.onShow = function() {
        a && a.apply(this, arguments);
        an.pageShow({}, !0);
      };
      oldComponent.apply(this, arguments);
    } catch (t) {
      oldComponent.apply(this, arguments);
    }
  };
}

function click_proxy(methods, key) {
  const method = methods[key];
  methods[key] = function () {
    const result = method.apply(this, arguments);
    const e = {};
    let r = "";
    if (_.isObject(arguments[0])) {
      const s = arguments[0].currentTarget || {};
      const data = s.dataset || {};
      r = arguments[0].type;
      e.$url_path = _.getCurrentPath();
      e.$element_id = s.id;
      e.$element_type = data.type;
      e.$element_content = data.content;
      e.$element_name = data.name;
    }

    if (r && _.isClick(r)) {
      an.track("$MPClick", e);
    }
    return result;
  };
}
