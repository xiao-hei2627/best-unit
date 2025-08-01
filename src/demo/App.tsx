import { useState } from "preact/hooks";
import { npmTest, printCurrentTime } from "@/main";
import { BestUnit } from "@/components/business/recharge-sdk";
import { initFundUnit, refreshBalance } from "@/main";
import StatisticalBalance from "@/components/business/statistical-balance";
import RefreshButton from "@/components/business/refresh-button";
import { t } from "@/local";
import { Env, Locale, Theme } from "@/types";
import TestBalanceData from "./testBalanceData";

export default function DemoApp() {
  const [currentLocale, setCurrentLocale] = useState<Locale>(Locale.ZH);
  const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.WHITE);
  const [currentEnv, setCurrentEnv] = useState<Env>(Env.DEV);

  const initApp = ({
    locale,
    theme,
    env,
  }: {
    locale?: Locale;
    theme?: Theme;
    env?: Env;
  }) => {
    // 测试代码：每次刷新页面时生成不同的 token
    const generateTestToken = () => {
      const timestamp = Date.now();
      const randomId = Math.floor(Math.random() * 1000);
      return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM0MTM1MjksIm1lcmNoYW50X2lkIjoxMTI4LCJ0aW1lc3RhbXAiOjE3NTMxNTQzMjl9.${timestamp}_${randomId}_TEST_TOKEN`;
    };

    const testToken = generateTestToken();
    console.log("=== 测试 Token 生成 ===");
    console.log("当前时间戳:", Date.now());
    console.log("生成的测试 Token:", testToken);
    console.log("========================");

    initFundUnit({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudF9pZCI6MTAwMiwidGltZXN0YW1wIjoxNzUzNDMwNjkyLCJleHAiOjE3NTM0MzQyOTJ9.OPYKUxLQ3C36rKiAmCnUwxTkvM9eKgtsnoxrB9Ntrag",
      fund_balance_id: "FB1FNZ5Q55M7QP2C",
      user_id: "19b8a77c-d3fc-45da-9520-4a07463123df",
      locale: locale as Locale,
      theme: theme ?? Theme.WHITE,
      env: env ?? currentEnv,
    });
  };

  // 初始化应用
  initApp({ locale: currentLocale, theme: currentTheme, env: currentEnv });

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    // 重新初始化以更新语言设置
    initApp({ locale, theme: currentTheme, env: currentEnv });
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    initApp({ locale: currentLocale, theme, env: currentEnv });
  };

  const handleEnvChange = (env: Env) => {
    setCurrentEnv(env);
    initApp({ locale: currentLocale, theme: currentTheme, env });
    window.location.reload();
  };

  const isDark = currentTheme === Theme.DARK;

  return (
    <div
      style={{
        background: isDark ? "#181A20" : "#fff",
        minHeight: "100vh",
        transition: "background 0.3s",
        color: isDark ? "#F5F6FA" : "#111827",
      }}
    >
      <h2
        style={{
          color: isDark ? "#F5F6FA" : undefined,
          background: isDark ? "#23262F" : undefined,
          padding: isDark ? 8 : undefined,
          borderRadius: isDark ? 8 : undefined,
        }}
      >
        组件库可视化测试 (Token 测试版本)
      </h2>

      {/* Token 测试信息显示 */}
      <div
        style={{
          marginBottom: 20,
          padding: 16,
          border: "2px solid #1890ff",
          borderRadius: 8,
          backgroundColor: "#e6f7ff",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12, color: "#1890ff" }}>
          🧪 Token 测试信息：
        </h3>
        <p style={{ margin: 0, color: "#1890ff" }}>
          每次刷新页面都会生成新的测试 Token，请查看控制台输出。
        </p>
        <p style={{ margin: "8px 0 0 0", color: "#1890ff", fontSize: "12px" }}>
          当前时间戳: {Date.now()}
        </p>
      </div>

      {/* getBalanceData 测试区域 */}
      <TestBalanceData isDark={isDark} />

      {/* 国际化切换区域 */}
      <div
        style={{
          marginBottom: 20,
          padding: 16,
          border: isDark ? "1px solid #23262F" : "1px solid #e5e7eb",
          borderRadius: 8,
          backgroundColor: isDark ? "#23262F" : "#f9fafb",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 12,
            color: isDark ? "#F5F6FA" : undefined,
          }}
        >
          国际化测试：
        </h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span>当前语言：</span>
          <button
            onClick={() => handleLocaleChange("zh" as Locale)}
            style={{
              padding: "8px 16px",
              backgroundColor:
                currentLocale === "zh"
                  ? "#1890ff"
                  : isDark
                  ? "#23262F"
                  : "#fff",
              color:
                currentLocale === "zh" ? "#fff" : isDark ? "#F5F6FA" : "#333",
              border: "1px solid #1890ff",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: currentLocale === "zh" ? "bold" : "normal",
            }}
          >
            中文
          </button>
          <button
            onClick={() => handleLocaleChange("en" as Locale)}
            style={{
              padding: "8px 16px",
              backgroundColor:
                currentLocale === "en"
                  ? "#1890ff"
                  : isDark
                  ? "#23262F"
                  : "#fff",
              color:
                currentLocale === "en" ? "#fff" : isDark ? "#F5F6FA" : "#333",
              border: "1px solid #1890ff",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: currentLocale === "en" ? "bold" : "normal",
            }}
          >
            English
          </button>
          <span
            style={{
              marginLeft: 12,
              fontSize: 14,
              color: isDark ? "#B5B8BE" : "#666",
            }}
          >
            {currentLocale === "zh"
              ? "当前显示中文"
              : "Currently showing English"}
          </span>
        </div>
      </div>

      <div>
        <h3 style={{ color: isDark ? "#F5F6FA" : undefined }}>
          BestUnit 主题切换：
        </h3>
        <button
          onClick={() => handleThemeChange(Theme.WHITE)}
          style={{
            padding: "8px 16px",
            backgroundColor:
              currentTheme === Theme.WHITE
                ? "#1890ff"
                : isDark
                ? "#23262F"
                : "#fff",
            color:
              currentTheme === Theme.WHITE
                ? "#fff"
                : isDark
                ? "#F5F6FA"
                : "#333",
            border: "1px solid #1890ff",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: currentTheme === Theme.WHITE ? "bold" : "normal",
            marginRight: 8,
          }}
        >
          白色主题
        </button>
        <button
          onClick={() => handleThemeChange(Theme.DARK)}
          style={{
            padding: "8px 16px",
            backgroundColor:
              currentTheme === Theme.DARK
                ? "#1890ff"
                : isDark
                ? "#23262F"
                : "#fff",
            color:
              currentTheme === Theme.DARK
                ? "#fff"
                : isDark
                ? "#F5F6FA"
                : "#333",
            border: "1px solid #1890ff",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: currentTheme === Theme.DARK ? "bold" : "normal",
          }}
        >
          暗黑主题
        </button>
      </div>

      <div>
        <h3 style={{ color: isDark ? "#F5F6FA" : undefined }}>
          BestUnit 环境切换：
        </h3>
        <button
          onClick={() => handleEnvChange(Env.DEV)}
          style={{
            padding: "8px 16px",
            backgroundColor:
              currentEnv === "dev" ? "#52c41a" : isDark ? "#23262F" : "#fff",
            color: currentEnv === "dev" ? "#fff" : isDark ? "#F5F6FA" : "#333",
            border: "1px solid #52c41a",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: currentEnv === "dev" ? "bold" : "normal",
            marginRight: 8,
          }}
        >
          开发环境 (dev)
        </button>
        <button
          onClick={() => handleEnvChange(Env.TEST)}
          style={{
            padding: "8px 16px",
            backgroundColor:
              currentEnv === "test" ? "#faad14" : isDark ? "#23262F" : "#fff",
            color: currentEnv === "test" ? "#fff" : isDark ? "#F5F6FA" : "#333",
            border: "1px solid #faad14",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: currentEnv === "test" ? "bold" : "normal",
            marginRight: 8,
          }}
        >
          测试环境 (test)
        </button>
        <button
          onClick={() => handleEnvChange(Env.PROD)}
          style={{
            padding: "8px 16px",
            backgroundColor:
              currentEnv === "prod" ? "#ff4d4f" : isDark ? "#23262F" : "#fff",
            color: currentEnv === "prod" ? "#fff" : isDark ? "#F5F6FA" : "#333",
            border: "1px solid #ff4d4f",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: currentEnv === "prod" ? "bold" : "normal",
          }}
        >
          生产环境 (prod)
        </button>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: isDark ? "#B5B8BE" : "#666",
          }}
        >
          当前环境:{" "}
          {currentEnv === "dev"
            ? "开发环境"
            : currentEnv === "test"
            ? "测试环境"
            : "生产环境"}
        </div>
      </div>

      <div>
        <h3 style={{ color: isDark ? "#F5F6FA" : undefined }}>
          BestUnit 组件演示：
        </h3>
        <BestUnit />
      </div>

      <div>
        <h3 style={{ color: isDark ? "#F5F6FA" : undefined }}>方法演示：</h3>
        <button
          onClick={npmTest}
          style={{
            marginRight: 10,
            background: isDark ? "#23262F" : undefined,
            color: isDark ? "#F5F6FA" : undefined,
            border: isDark ? "1px solid #444C5C" : undefined,
          }}
        >
          调用 npmTest()
        </button>
        <button
          onClick={printCurrentTime}
          style={{
            background: isDark ? "#23262F" : undefined,
            color: isDark ? "#F5F6FA" : undefined,
            border: isDark ? "1px solid #444C5C" : undefined,
          }}
        >
          调用 printCurrentTime()
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <h3 style={{ color: isDark ? "#F5F6FA" : undefined }}>
          余额卡片组件演示：
        </h3>
        <StatisticalBalance />
      </div>

      {/* Refresh Button 测试区域 */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          border: "2px solid #722ed1",
          borderRadius: 8,
          backgroundColor: "#f9f0ff",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12, color: "#722ed1" }}>
          🧪 Refresh Button 组件测试：
        </h3>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: isDark ? "#F5F6FA" : "#333", marginBottom: 8 }}>
            基本用法：
          </h4>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <RefreshButton />
            <RefreshButton showText={false} />
            <RefreshButton color="#ff6b6b" />
            <RefreshButton color="#52c41a" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: isDark ? "#F5F6FA" : "#333", marginBottom: 8 }}>
            不同尺寸：
          </h4>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <RefreshButton size="small" />
            <RefreshButton size="medium" />
            <RefreshButton size="large" />
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: isDark ? "#F5F6FA" : "#333", marginBottom: 8 }}>
            与余额组件配合使用：
          </h4>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <RefreshButton />
          </div>
          <p
            style={{
              marginTop: 8,
              fontSize: "12px",
              color: "#666",
              textAlign: "center",
            }}
          >
            点击刷新按钮可以重新获取余额数据
          </p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: isDark ? "#F5F6FA" : "#333", marginBottom: 8 }}>
            自定义样式：
          </h4>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <RefreshButton color="#1890ff" size="medium" />
            <RefreshButton color="#52c41a" size="small" showText={false} />
            <RefreshButton color="#faad14" size="large" />
            <RefreshButton color="#ff4d4f" size="medium" showText={false} />
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: isDark ? "#23262F" : "#fff",
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            fontSize: "12px",
          }}
        >
          <strong>测试说明：</strong>
          <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
            <li>点击任意刷新按钮都会触发余额组件重新获取数据</li>
            <li>鼠标悬停在按钮上会有缩放和透明度变化效果</li>
            <li>鼠标悬停在刷新图标上会有旋转动画</li>
            <li>支持不同尺寸和颜色自定义</li>
            <li>可以通过showText属性控制是否显示文字</li>
          </ul>
        </div>
      </div>

      {/* 国际化文本测试区域 */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          border: isDark ? "1px solid #23262F" : "1px solid #e5e7eb",
          borderRadius: 8,
          backgroundColor: isDark ? "#23262F" : "#f9fafb",
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: 12,
            color: isDark ? "#F5F6FA" : undefined,
          }}
        >
          国际化文本测试：
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          <div
            style={{
              padding: 8,
              backgroundColor: isDark ? "#181A20" : "#fff",
              borderRadius: 4,
              color: isDark ? "#F5F6FA" : undefined,
            }}
          >
            <strong>余额相关：</strong>
            <br />
            {t("余额详情")}
            <br />
            {t("真实金额")}
            <br />
            {t("冻结金额")}
            <br />
            {t("总可用")}
          </div>
          <div
            style={{
              padding: 8,
              backgroundColor: isDark ? "#181A20" : "#fff",
              borderRadius: 4,
              color: isDark ? "#F5F6FA" : undefined,
            }}
          >
            <strong>充值相关：</strong>
            <br />
            {t("充值 / 转账")}
            <br />
            {t("在线充值")}
            <br />
            {t("线下转账")}
            <br />
            {t("去支付")}
          </div>
          <div
            style={{
              padding: 8,
              backgroundColor: isDark ? "#181A20" : "#fff",
              borderRadius: 4,
              color: isDark ? "#F5F6FA" : undefined,
            }}
          >
            <strong>按钮文本：</strong>
            <br />
            {t("充值/转账")}
            <br />
            {t("取消")}
            <br />
            {t("提交中...")}
            <br />
            {t("关闭")}
          </div>
        </div>
      </div>

      {/* Business Utils 测试区域 */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          border: "2px solid #13c2c2",
          borderRadius: 8,
          backgroundColor: "#e6fffb",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12, color: "#13c2c2" }}>
          🧪 Business Utils 方法测试：
        </h3>

        <div style={{ marginBottom: 16 }}>
          <h4 style={{ color: isDark ? "#F5F6FA" : "#333", marginBottom: 8 }}>
            refreshBalanceEvent 方法测试：
          </h4>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => refreshBalance()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#13c2c2",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              调用 refreshBalanceEvent()
            </button>
            <button
              onClick={() => refreshBalance()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#722ed1",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              静默刷新余额
            </button>
            <button
              onClick={() => refreshBalance()}
              style={{
                padding: "8px 16px",
                backgroundColor: "#52c41a",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              自定义来源刷新
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: isDark ? "#23262F" : "#fff",
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            fontSize: "12px",
          }}
        >
          <strong>Business Utils 方法说明：</strong>
          <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
            <li>
              <code>refreshBalanceEvent()</code> -
              基础刷新方法，触发所有余额组件刷新
            </li>
            <li>
              <code>refreshBalanceEvent(&#123; silent: true &#125;)</code> -
              静默刷新，不显示控制台日志
            </li>
            <li>
              <code>refreshBalanceEvent(&#123; source: "custom" &#125;)</code> -
              自定义来源标识的刷新
            </li>
            <li>现在refresh-button组件内部也使用这个函数，实现了代码复用</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
