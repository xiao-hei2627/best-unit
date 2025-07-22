import { npmTest, printCurrentTime } from "./utils/common/index";
import { initFundUnit } from "./utils/business/index";

import "./components/business/recharge-sdk";
import "./components/business/statistical-balance";

// 可选：导出组件列表或版本信息
export const components = [
  "x-greeting",
  "x-best-modal-form",
  "best-statistical-balance",
];
export { npmTest, printCurrentTime, initFundUnit };
