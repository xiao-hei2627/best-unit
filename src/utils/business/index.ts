export function initFundUnit(params: {
  token: string;
  merchant_id: string;
  biz_type: string;
  userId: string;
  theme?: string;
  locale?: string;
}) {
  const { merchant_id, biz_type, theme, locale, userId } = params;
  const token = "Bearer " + params.token;
  sessionStorage.setItem(
    "fund_unit_params",
    JSON.stringify({ ...params, token })
  );
  return {
    token,
    merchant_id,
    biz_type,
    theme,
    locale,
    userId,
  };
}
