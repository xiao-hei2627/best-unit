import { npmTest, printCurrentTime } from "./utils/common/index";
import { initFundUnit } from "./utils/business/index";
import { viteProxy } from "./api/proxy";

import "./components/business/recharge-sdk";
import "./components/business/statistical-balance";

// 可选：导出组件列表或版本信息
export const components = ["best-recharge", "best-statistical-balance"];
export { npmTest, printCurrentTime, initFundUnit, viteProxy };
