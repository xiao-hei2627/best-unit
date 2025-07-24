export function initFundUnit(params: {
  token: string;
  merchant_id?: string;
  biz_type?: string;
  fund_balance_id: string;
  theme?: string;
  locale?: "zh" | "en";
}) {
  const {
    merchant_id,
    biz_type,
    fund_balance_id,
    theme,
    locale = "zh",
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
