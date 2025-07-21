import axiosInstance from "./axiosInstance";

export function getBalance(params: {
  merchant_id: string;
  biz_type: string;
  token?: string;
}) {
  const { token, ...rest } = params;
  return axiosInstance.get("/balance", {
    params: rest,
    headers: token ? { Authorization: token } : undefined,
  });
}

// 示例用法：
// getBalance({ merchant_id: '1128', biz_type: 'ad', token: 'xxx' }).then(res => console.log(res));
