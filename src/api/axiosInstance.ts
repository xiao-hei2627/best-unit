import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface CreateAxiosOptions {
  baseURL?: string;
  timeout?: number;
  getToken?: () => string | null;
  getLocale?: () => string | null;
  onError?: (msg: string, error: any) => void;
}

export function createAxiosInstance(options: CreateAxiosOptions = {}) {
  const {
    baseURL = "/api",
    timeout = 10000,
    getToken,
    getLocale,
    onError,
  } = options;

  const instance: AxiosInstance = axios.create({ baseURL, timeout });

  // 请求拦截：加 token、国际化
  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (getToken) {
      const token = getToken();
      if (token)
        config.headers = { ...config.headers, Authorization: token } as any;
    }
    if (getLocale) {
      const locale = getLocale();
      if (locale)
        config.headers = {
          ...config.headers,
          "Accept-Language": locale,
        } as any;
    }
    return config;
  });

  // 响应拦截：code=0判定成功，其他走 onError
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.data && response.data.code === 0) {
        return response.data;
      }
      if (onError) {
        onError(
          response.data?.msg || response.data?.message || "未知错误",
          response
        );
      }
      return Promise.reject(response.data || { message: "未知错误" });
    },
    (error) => {
      if (onError) {
        onError(error.message, error);
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

// 默认实例
const http = createAxiosInstance();
export default http;
