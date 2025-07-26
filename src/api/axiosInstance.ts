import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { message } from "@/components/common/Message";
import { Env, Locale } from "@/types";

export interface CreateAxiosOptions {
  baseURL?: string;
  timeout?: number;
  onError?: (msg: string, error: any) => void;
}

export function createAxiosInstance(options: CreateAxiosOptions = {}) {
  // 根据 fund_unit_params 中的 env 参数选择 API URL
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );

  console.log("fundUnitParams", fundUnitParams);
  const { env } = fundUnitParams;

  let apiUrl: string;
  switch (env) {
    case Env.PROD:
    case Env.PRODUCTION:
      apiUrl = "https://fund.bestfulfill.com/api/sdk";
      break;
    case Env.TEST:
      apiUrl = "https://fund.bestfulfill.tech/api/sdk";
      break;
    case Env.DEV:
    case Env.DEVELOPMENT:
    default:
      apiUrl = "/api";
      break;
  }

  const { baseURL = apiUrl, timeout = 10000, onError } = options;

  const instance: AxiosInstance = axios.create({ baseURL, timeout });

  // 请求拦截：加 token、国际化
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { token, locale } = fundUnitParams;
    config.headers = {
      ...config.headers,
      Authorization: token,
      "x-locale": locale === Locale.ZH ? "zh-CN" : "en-US",
    } as any;

    return config;
  });

  // 响应拦截：code=0判定成功，其他走 onError
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data && response.data.code === 0) {
        return response.data;
      }
      const errorMsg =
        response.data?.msg || response.data?.message || "未知错误";

      // 显示错误消息
      message.error(errorMsg);

      if (onError) {
        onError(errorMsg, response);
      }
      return Promise.reject(response.data || { message: "未知错误" });
    },
    (error) => {
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        "网络请求失败";

      // 显示错误消息
      message.error(errorMsg);

      if (onError) {
        onError(errorMsg, error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// 缓存 axios 实例
let httpInstance: AxiosInstance | null = null;

// 获取 axios 实例的函数
export function http(): AxiosInstance {
  if (!httpInstance) {
    httpInstance = createAxiosInstance();
  }
  return httpInstance;
}

// 重置 axios 实例（当 fund_unit_params 更新时调用）
export function resetHttpInstance(): void {
  httpInstance = null;
}

// 默认导出获取实例的函数
export default http;
