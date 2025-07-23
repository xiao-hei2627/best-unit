import http from "./axiosInstance";
import type { AxiosProgressEvent } from "axios";
// 获取余额
export function getBalance() {
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  return http
    .get("/balance", {
      params: {
        merchant_id: fundUnitParams.merchantId,
        biz_type: fundUnitParams.bizType,
      },
    })
    .then((res) => {
      const data = res.data;
      return {
        totalAmount: data.total_amount || 0,
        availableAmount: data.available_amount || 0,
        frozenAmount: data.frozen_amount || 0,
      };
    });
}

// 获取所有字典
export const getAllDicts = async () => {
  return http.get("/all-dicts", {}).then((res) => {
    sessionStorage.setItem("all_dicts", JSON.stringify(res.data));
    return res.data || {};
  });
};

// 上传文件
export const uploadFile = async (
  file: any,
  onProgress?: (percent: number) => void
) => {
  return http
    .post("/oss/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress && onProgress(percent);
        }
      },
    })
    .then((res) => {
      return res.data?.url || "";
    });
};

// 创建离线充值
export const createOfflineRecharge = async (data: any) => {
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );

  const params = {
    merchant_id: Number(fundUnitParams.merchantId),
    biz_type: fundUnitParams.bizType,
    source_operator: String(fundUnitParams.userId),
    transfer_no: data.transferNo,
    transfer_channel: data.transferChannel,
    voucher_urls: data.voucherUrls,
  };
  return http.post("/offline/recharge/create", params, {});
};

// 创建在线充值
export const createOnlineRecharge = async (data: any) => {
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );

  console.log(fundUnitParams, "fundUnitParams");

  const params = {
    merchant_id: Number(fundUnitParams.merchantId),
    biz_type: fundUnitParams.bizType,
    source_operator: String(fundUnitParams.userId),
    amount: data.amount,
    currency: data.currency,
    recharge_channel: data.rechargeChannel,
    return_url: window.location.href,
  };
  return http.post("/online/recharge/create", params, {}).then((res) => {
    return res.data.redirect_url;
  });
};

// 示例用法：
// getBalance({ merchant_id: '1128', biz_type: 'ad', token: 'xxx' }).then(res => console.log(res));
