import { useState } from "preact/hooks";
import { npmTest, printCurrentTime } from "../main";
import { BestUnit } from "../components/business/recharge-sdk";
import { initFundUnit } from "../main";
import StatisticalBalance from "../components/business/statistical-balance";
import { t } from "../local";
import { Env, Locale, Theme } from "../types";

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
    </div>
  );
}
