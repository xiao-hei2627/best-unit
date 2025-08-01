import { npmTest, printCurrentTime } from "@/utils/common/index";
import {
  initFundUnit,
  getBalanceData,
  refreshBalance,
} from "@/utils/business/index";
import { viteProxy } from "@/api/proxy";

import "@/components/business/recharge-sdk";
import "@/components/business/statistical-balance";
import "@/components/business/refresh-button";

// 可选：导出组件列表或版本信息
export const components = [
  "best-recharge",
  "best-statistical-balance",
  "best-refresh-button",
];
export {
  npmTest,
  printCurrentTime,
  initFundUnit,
  getBalanceData,
  refreshBalance,
  viteProxy,
};
