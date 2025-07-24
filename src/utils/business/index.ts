export function initFundUnit(params: {
  token: string;
  merchant_id: string;
  biz_type: string;
  theme?: string;
  locale?: "zh" | "en";
}) {
  const { merchant_id, biz_type, theme, locale = "zh" } = params;
  const token = "Bearer " + params.token;
  sessionStorage.setItem(
    "fund_unit_params",
    JSON.stringify({
      merchantId: merchant_id,
      bizType: biz_type,
      token,
      theme,
      locale,
    })
  );
  return {
    token,
    merchantId: merchant_id,
    bizType: biz_type,
    theme,
    locale,
  };
}
