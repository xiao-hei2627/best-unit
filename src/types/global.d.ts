export declare function npmTest(): void;

export declare function printCurrentTime(): void;

export declare function initFundUnit(params: {
  token: string;
  merchant_id: string;
  biz_type: string;
  user_id: string;
  theme?: string;
}): {
  token: string;
  merchantId: string;
  bizType: string;
  theme?: string;
  userId: string;
};
declare global {
  interface Window {
    bestUnit: {
      initFundUnit: (params: {
        token: string;
        merchant_id: string;
        biz_type: string;
      }) => void;
    };
  }

  namespace JSX {
    interface IntrinsicElements {
      "x-greeting": any;
      "x-best-modal-form": {
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
