export declare function npmTest(): void;

export declare function printCurrentTime(): void;

export declare function initFundUnit(params: {
  token: string;
  merchant_id: string;
  biz_type: string;
  theme?: string;
  locale?: "zh" | "en";
}): {
  token: string;
  merchantId: string;
  bizType: string;
  theme?: string;
  userId: string;
  locale: "zh" | "en";
};

// Vite 代理配置类型
export declare const viteProxy: {
  "/api": {
    target: string;
    changeOrigin: boolean;
    rewrite: (path: string) => string;
    secure: boolean;
  };
};

declare global {
  interface Window {
    bestUnit: {
      initFundUnit: (params: {
        token: string;
        merchant_id: string;
        biz_type: string;
        locale?: "zh" | "en";
      }) => void;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      "best-recharge": {
        theme?: any;
        merchant_id?: string;
        biz_type?: string;
        token?: string;
        [key: string]: any;
      };
      "best-statistical-balance": any;
    }
  }
}
export {};
/// <reference path="./preact-custom-element.d.ts" />
