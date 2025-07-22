export function initFundUnit(params: {
  token: string;
  merchant_id: string;
  biz_type: string;
  user_id: string;
  theme?: string;
}) {
  const { merchant_id, biz_type, theme, user_id } = params;
  const token = "Bearer " + params.token;
  sessionStorage.setItem(
    "fund_unit_params",
    JSON.stringify({
      merchantId: merchant_id,
      bizType: biz_type,
      userId: user_id,
      token,
      theme,
    })
  );
  return {
    token,
    merchantId: merchant_id,
    bizType: biz_type,
    theme,
    userId: user_id,
  };
}
