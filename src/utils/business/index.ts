import { getAllDicts } from "../../api";
import { resetHttpInstance } from "../../api/axiosInstance";
import { Locale, Theme, type Env } from "../../types";

export function initFundUnit(params: {
  token: string;
  merchant_id?: string;
  biz_type?: string;
  fund_balance_id?: string;
  user_id: string;
  theme?: Theme;
  locale?: Locale;
  env: Env;
}) {
  const {
    merchant_id,
    biz_type,
    fund_balance_id,
    user_id,
    theme = Theme.WHITE,
    locale = Locale.ZH,
    env,
  } = params;
  const token = "Bearer " + params.token;
  sessionStorage.setItem(
    "fund_unit_params",
    JSON.stringify({
      merchantId: merchant_id,
      bizType: biz_type,
      fundBalanceId: fund_balance_id,
      userId: user_id,
      token,
      theme,
      locale,
      env,
    })
  );

  // 重置 axios 实例，确保使用新的配置
  resetHttpInstance();

  getAllDicts();
  return {
    token,
    merchantId: merchant_id,
    bizType: biz_type,
    fundBalanceId: fund_balance_id,
    userId: user_id,
    theme,
    locale,
    env,
  };
}
