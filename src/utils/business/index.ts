import { getAllDicts } from "@/api";
import { resetHttpInstance } from "@/api/axiosInstance";
import { Locale, Theme, type Env } from "@/types";

export interface InitParams {
  token: string;
  merchant_id?: string;
  biz_type?: string;
  fund_balance_id?: string;
  user_id: string;
  theme?: Theme;
  locale?: Locale;
  env: Env;
}

export function initFundUnit(params: InitParams) {
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

export function getInitParams<T = InitParams>(key?: string | string[]): T {
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );

  if (!key) {
    return fundUnitParams as T;
  }

  if (Array.isArray(key)) {
    const result: Partial<InitParams> = {};
    key.forEach((k) => {
      result[k as keyof InitParams] = fundUnitParams[k as keyof InitParams];
    });
    return result as T;
  }

  return fundUnitParams[key] as T;
}
