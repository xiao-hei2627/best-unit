import { getAllDicts } from "../../api";
import { Locale, Theme } from "../../types";

export function initFundUnit(params: {
  token: string;
  merchant_id?: string;
  biz_type?: string;
  fund_balance_id?: string;
  theme?: Theme;
  locale?: Locale;
}) {
  getAllDicts();
  const {
    merchant_id,
    biz_type,
    fund_balance_id,
    theme = Theme.WHITE,
    locale = Locale.ZH,
  } = params;
  const token = "Bearer " + params.token;
  sessionStorage.setItem(
    "fund_unit_params",
    JSON.stringify({
      merchantId: merchant_id,
      bizType: biz_type,
      fundBalanceId: fund_balance_id,
      token,
      theme,
      locale,
    })
  );
  return {
    token,
    merchantId: merchant_id,
    bizType: biz_type,
    fundBalanceId: fund_balance_id,
    theme,
    locale,
  };
}
