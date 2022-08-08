import sdmp from "./system";
import defaultConfig from "./config";
import { initProperties } from "./init";
import { initGlobalAPI } from "./operation";
import { enhance } from "./extend";
import _ from "./utils";
import { platfrom } from "./env";

const an = {
  store: {
    mem: [],
    timestap: Date.now(),
    publicInfo: {
      // 公共属性
      platform_type: "",
      is_login: "",
      lbs_city: "",
      app_name: ""
    },
    properties: {
      // 预置属性
      $manufacturer: "",
      $model: "",
      $os: "",
      $os_version: "",
      $screen_height: "",
      $screen_width: "",
      $wifi: "",
      $carrier: "",
      $network_type: "",
      $device_id: "",
      $screen_orientation: ""
    }
  },
  config: defaultConfig,
  params: {
    event: ""
  },
  setConfig(config) {
    _.assign(this.config, config);
  },
  init() {
    enhance(an);
  }
};

initProperties(an, sdmp);
initGlobalAPI(an);

export default an;
