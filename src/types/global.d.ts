export declare function npmTest(): void;

export declare function printCurrentTime(): void;

export declare function initFundUnit(params: {
  token: string;
  merchant_id?: string;
  biz_type?: string;
  fund_balance_id?: string;
  user_id: string;
  theme?: Theme;
  locale?: Locale;
  env: Env;
}): {
  token: string;
  merchantId?: string;
  bizType?: string;
  fundBalanceId?: string;
  theme?: Theme;
  locale: Locale;
  env: Env;
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
        user_id: string;
        fund_balance_id?: string;
        locale?: "zh" | "en";
        theme?: Theme;
        env: Env;
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
