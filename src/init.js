import _ from "./utils";

let an, sdmp;

export function initProperties(_an, _sdmp) {
  an = _an;
  sdmp = _sdmp;

  setProperties();
}

function setProperties() {
  setNetworkType();
}

function setNetworkType() {
  const p = an.store.properties;
  sdmp.sdmp_getNetworkType({
    success: function(e) {
      p.$network_type = _.setUpperCase(e.networkType);
      setSystemInfo();
    },
    complete: function() {
      setSystemInfo();
    }
  });
}

function setSystemInfo() {
  const p = an.store.properties;
  sdmp.sdmp_getSystemInfo({
    success: function(e) {
      p.$model = e.model;
      p.$screen_width = Number(e.screenWidth);
      p.$screen_height = Number(e.screenHeight);
      p.$os = getPlatform(e.platform);
      p.$os_version =
        e.system.indexOf(" ") > -1 ? e.system.split(" ")[1] : e.system;
      p.$brand = _.setUpperCase(e.brand);
      p.$manufacturer = e.brand;
    },
    complete: function() {
      const app_id = _.getAppId(),
        a = new Date().getTimezoneOffset();
      app_id && (p.$app_id = app_id);
      _.isNumber(a) && (p.$timezone_offset = a);
    }
  });
}

function getPlatform(platform) {
  try {
    const plat = platform.toLowerCase();
    return "ios" === plat ? "iOS" : "android" === plat ? "Android" : platform;
  } catch (e) {
    console.log(e);
  }
}
