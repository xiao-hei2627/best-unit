import http from "./axiosInstance";

export function getBalance() {
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  const { token, ...rest } = fundUnitParams;
  return http.get("/balance", {
    params: rest,
    headers: token ? { Authorization: token } : undefined,
  });
}

// export const getAllDicts = async () => {
//     return http
//       .get('/all-dicts', {
//         headers: {
//           Authorization: 'Bearer ' + token
//         },
//       })
//       .then((res) => {
//         return res.data || {}
//       })
//   }

// 示例用法：
// getBalance({ merchant_id: '1128', biz_type: 'ad', token: 'xxx' }).then(res => console.log(res));
