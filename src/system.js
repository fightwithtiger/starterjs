import { platfrom } from "./env";

const plat = global[platfrom]

function strToVar(str) {
  return (new Function("return " + str))()
}

const sdmp = Object.assign({}, plat);

// sdmp_info = {
//   storageName: "sensorsdata2015_tt",
//   lib_name: "BytedanceMini",
//   lib_method: "code",
//   select_utm: !0,
//   data_is_store: "sensors_prepare_data",
// };

sdmp.sdmp_request = plat.request;
sdmp.sdmp_getSystemInfo = plat.getSystemInfo;
sdmp.sdmp_getNetworkType = plat.getNetworkType;
sdmp.sdmp_getStorageSync = plat.getStorageSync;
sdmp.sdmp_setStorageSync = plat.setStorageSync;
sdmp.sdmp_getStorage = plat.getStorage;

export default sdmp;
