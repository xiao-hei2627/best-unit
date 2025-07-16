export declare function npmTest(): void;

export declare function printCurrentTime(): void;

declare namespace JSX {
    interface IntrinsicElements {
      'x-greeting': {
        name?: string; // 组件支持的属性
        [key: string]: any;
      };
    }
  }

/// <reference path="./preact-custom-element.d.ts" />
