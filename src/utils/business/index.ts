export function initFundUnit(params: {
  token: string;
  merchant_id: string;
  biz_type: string;
  theme?: string;
  locale?: string;
}) {
  const { merchant_id, biz_type, theme, locale } = params;
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
  };
}
