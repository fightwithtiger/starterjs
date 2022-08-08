import _ from './utils';
import sdmp from "./system";

let an;

export function initGlobalAPI(_an) {
  an = _an;
  an.track = function(event, data) {
    if (an.config.show_log) {
      console.log("analysis tract: ", event, data);
    }
    send({ event, data })
  };

  // App
  an.appLaunch = function() {
    const data = {};
    an.config.autoTrack.appLaunch && an.track("$MPLaunch", data);
  };

  an.appShow = function() {
    const data = {};
    an.config.autoTrack.appShow && an.track("$MPShow", data);
  };

  an.appHide = function() {
    const data = {};
    an.config.autoTrack.appHide && an.track("$MPHide", data);
  };

  // Page
  an.pageShow = function() {
    const data = {};
    an.config.autoTrack.pageShow && an.track("$MPViewScreen", data);
  };
}

function send(data) {
  data = "data_list=" + JSON.stringify(data)
  console.log('analysis datalist', data)

  sdmp.sdmp_request({
    url: an.config.server_url + "?" + data,
    method: "get",
    data: data,
    dataType: "text",
    success: function(t) {
    },
    fail: function(t) {
    }
  });
}
