# BestUnit 组件库使用文档

## 概述

BestUnit 是一个功能完整的组件库，提供了余额管理、充值功能和刷新按钮等核心功能。本文档详细说明了所有导出的函数、组件及其使用方法。

## 快速开始

### 1. 安装和引入

```javascript
import {
  initFundUnit,
  getBalanceData,
  refreshBalance,
  npmTest,
  printCurrentTime,
  viteProxy,
} from "best-unit";

// 引入组件
import "best-unit";
```

### 2. 初始化

```javascript
// 初始化组件库
initFundUnit({
  token: "your-jwt-token",
  user_id: "user-uuid",
  env: "dev",
});
```

## 核心函数

### initFundUnit(params: InitParams)

初始化组件库的核心函数，必须在其他功能使用前调用。

#### 参数说明

| 参数名            | 类型     | 必填 | 默认值        | 说明         |
| ----------------- | -------- | ---- | ------------- | ------------ |
| `token`           | `string` | ✅   | -             | JWT 认证令牌 |
| `user_id`         | `string` | ✅   | -             | 用户唯一标识 |
| `env`             | `Env`    | ✅   | -             | 环境配置     |
| `merchant_id`     | `string` | ❌   | -             | 商户 ID      |
| `biz_type`        | `string` | ❌   | -             | 业务类型     |
| `fund_balance_id` | `string` | ❌   | -             | 余额账户 ID  |
| `theme`           | `Theme`  | ❌   | `Theme.WHITE` | 主题设置     |
| `locale`          | `Locale` | ❌   | `Locale.ZH`   | 语言设置     |

#### 使用示例

```javascript
import { initFundUnit } from "best-unit";
import { Theme, Locale, Env } from "best-unit";

// 基本初始化
initFundUnit({
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user_id: "19b8a77c-d3fc-45da-9520-4a07463123df",
  env: Env.DEV,
});

// 完整初始化
initFundUnit({
  token: "your-jwt-token",
  user_id: "user-uuid",
  merchant_id: "merchant-123",
  biz_type: "payment",
  fund_balance_id: "FB1FNZ5Q55M7QP2C",
  theme: Theme.DARK,
  locale: Locale.EN,
  env: Env.PROD,
});
```

### getBalanceData()

获取当前余额数据。如果缓存中没有有效数据，会自动调用接口获取最新值。

#### 返回值

```typescript
interface BalanceData {
  fundBalanceId: string; // 余额账户ID
  merchantId: number; // 商户ID
  bizType: string; // 业务类型
  currency: string; // 币种
  totalAmount: string; // 真实金额
  availableAmount: string; // 可用余额
  frozenAmount: string; // 冻结金额
  pendingAmount: string; // 待处理金额
  status: string; // 状态
  createdAt: string; // 创建时间
}
```

#### 使用示例

```javascript
import { getBalanceData } from "best-unit";

// 异步获取余额数据
const balanceData = await getBalanceData();
console.log("当前余额:", balanceData);

// 使用 async/await
async function getBalance() {
  try {
    const data = await getBalanceData();
    console.log("余额数据:", data);
  } catch (error) {
    console.error("获取余额失败:", error);
  }
}

// 使用 Promise
getBalanceData()
  .then((data) => {
    console.log("余额数据:", data);
  })
  .catch((error) => {
    console.error("获取余额失败:", error);
  });
```

### refreshBalance()

触发余额刷新事件，所有余额相关组件会自动更新。

#### 使用示例

```javascript
import { refreshBalance } from "best-unit";

// 手动刷新余额
refreshBalance();
```

## 工具函数

### npmTest()

测试函数，用于验证包是否正确安装。

```javascript
import { npmTest } from "best-unit";

npmTest(); // 输出: "npm package test!!!"
```

### printCurrentTime()

打印当前时间。

```javascript
import { printCurrentTime } from "best-unit";

printCurrentTime(); // 输出: "Current time: 2024-01-01T00:00:00.000Z"
```

### viteProxy

Vite 代理配置，用于开发环境。

```javascript
import { viteProxy } from "best-unit";

// 在 vite.config.js 中使用
export default {
  server: {
    proxy: viteProxy,
  },
};
```

## 组件使用

### 1. best-statistical-balance (余额统计组件)

显示用户余额信息的组件，支持悬停查看详情。

#### 基本用法

```html
<!-- 基本使用 -->
<best-statistical-balance></best-statistical-balance>

<!-- 自定义弹窗位置 -->
<best-statistical-balance popover-position="top"></best-statistical-balance>
```

#### 属性说明

| 属性名             | 类型     | 必填 | 默认值     | 说明                                               |
| ------------------ | -------- | ---- | ---------- | -------------------------------------------------- |
| `popover-position` | `string` | ❌   | `"bottom"` | 弹窗位置：`"top"`, `"bottom"`, `"left"`, `"right"` |

#### 功能特性

- 自动获取并显示余额数据
- 悬停显示详细余额信息
- 响应式设计，支持主题切换
- 自动监听刷新事件

### 2. best-refresh-button (刷新按钮组件)

可自定义的刷新按钮，支持动画效果。

#### 基本用法

```html
<!-- 显示默认文案 -->
<best-refresh-button>刷新</best-refresh-button>

<!-- 只显示图标 -->
<best-refresh-button></best-refresh-button>

<!-- 自定义文案 -->
<best-refresh-button>重新加载</best-refresh-button>
```

#### 属性说明

| 属性名  | 类型     | 必填 | 默认值     | 说明                                       |
| ------- | -------- | ---- | ---------- | ------------------------------------------ |
| `color` | `string` | ❌   | -          | 按钮颜色                                   |
| `size`  | `string` | ❌   | `"medium"` | 按钮尺寸：`"small"`, `"medium"`, `"large"` |

#### 功能特性

- 点击时图标旋转动画
- 自动触发余额刷新
- 支持自定义文案和颜色
- 响应式设计

### 3. best-recharge (充值组件)

提供充值功能的组件。

#### 基本用法

```html
<!-- 基本使用 -->
<best-recharge></best-recharge>

<!-- 自定义主题 -->
<best-recharge theme="dark"></best-recharge>
```

#### 属性说明

| 属性名  | 类型     | 必填 | 默认值    | 说明                      |
| ------- | -------- | ---- | --------- | ------------------------- |
| `theme` | `string` | ❌   | `"white"` | 主题：`"white"`, `"dark"` |

#### 功能特性

- 在线充值功能
- 支持多种支付方式
- 自动跳转支付页面
- 响应式设计

## 类型定义

### Env (环境枚举)

```typescript
enum Env {
  DEV = "dev",
  DEVELOPMENT = "development",
  TEST = "test",
  PROD = "prod",
  PRODUCTION = "production",
}
```

### Theme (主题枚举)

```typescript
enum Theme {
  WHITE = "white",
  DARK = "dark",
}
```

### Locale (语言枚举)

```typescript
enum Locale {
  ZH = "zh",
  EN = "en",
}
```

## 完整示例

### HTML 页面集成

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>BestUnit 示例</title>
  </head>
  <body>
    <!-- 余额显示 -->
    <best-statistical-balance></best-statistical-balance>

    <!-- 刷新按钮 -->
    <best-refresh-button>刷新余额</best-refresh-button>

    <!-- 充值按钮 -->
    <best-recharge></best-recharge>

    <script type="module">
      import { initFundUnit } from "best-unit";
      import { Env, Theme, Locale } from "best-unit";

      // 初始化
      initFundUnit({
        token: "your-jwt-token",
        user_id: "user-uuid",
        theme: Theme.WHITE,
        locale: Locale.ZH,
        env: Env.DEV,
      });
    </script>
  </body>
</html>
```

### React/Vue 集成

```javascript
// React 示例
import React, { useEffect } from "react";
import { initFundUnit } from "best-unit";

function App() {
  useEffect(() => {
    initFundUnit({
      token: "your-jwt-token",
      user_id: "user-uuid",
      env: "dev",
    });
  }, []);

  return (
    <div>
      <best-statistical-balance></best-statistical-balance>
      <best-refresh-button>刷新</best-refresh-button>
      <best-recharge></best-recharge>
    </div>
  );
}
```

## 注意事项

1. **初始化顺序**：必须先调用 `initFundUnit()` 再使用其他功能
2. **Token 安全**：确保 JWT token 的安全性，不要在客户端存储敏感信息
3. **环境配置**：根据实际环境选择合适的 `env` 参数
4. **组件依赖**：所有组件都依赖于初始化配置，确保配置正确
5. **浏览器兼容性**：需要支持 Custom Elements 和 Shadow DOM 的现代浏览器

## 错误处理

```javascript
try {
  initFundUnit({
    token: "invalid-token",
    user_id: "user-uuid",
    env: "dev",
  });
} catch (error) {
  console.error("初始化失败:", error);
}

// 检查余额数据（异步）
async function checkBalanceData() {
  try {
    const balanceData = await getBalanceData();
    if (!balanceData.fundBalanceId) {
      console.warn("余额数据未初始化");
    }
  } catch (error) {
    console.error("获取余额数据失败:", error);
  }
}
```

## 更新日志

- **v1.0.0**: 初始版本，包含基础功能
- **v1.1.0**: 添加动画效果和主题支持
- **v1.2.0**: 优化缓存机制和错误处理
