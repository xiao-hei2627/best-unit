import { useState } from "preact/hooks";
import { npmTest, printCurrentTime } from "../main";
import { BestUnit } from "../components/business/recharge-sdk";
import { initFundUnit } from "../main";
import StatisticalBalance from "../components/business/statistical-balance";
import { t } from "../local";
import { Locale, Theme } from "../types";

export default function DemoApp() {
  const [currentLocale, setCurrentLocale] = useState<Locale>(Locale.ZH);
  const [currentTheme, setCurrentTheme] = useState<Theme>(Theme.WHITE);

  const initApp = ({ locale, theme }: { locale?: Locale; theme?: Theme }) => {
    initFundUnit({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM0MTM1MjksIm1lcmNoYW50X2lkIjoxMTI4LCJ0aW1lc3RhbXAiOjE3NTMxNTQzMjl9.UAvzq0P4HCnbJR1Ga3CgF6q3vk2RHiZRvnAFohBTHpw",
      merchant_id: "1128",
      biz_type: "ad",
      locale: locale as Locale,
      theme: theme ?? Theme.WHITE,
    });
  };

  // 初始化应用
  initApp({ locale: currentLocale, theme: currentTheme });

  const handleLocaleChange = (locale: Locale) => {
    setCurrentLocale(locale);
    // 重新初始化以更新语言设置
    initApp({ locale, theme: currentTheme });
  };

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    initApp({ locale: currentLocale, theme });
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
        组件库可视化测试
      </h2>

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
                  ? "#155EEF"
                  : isDark
                  ? "#23262F"
                  : "#fff",
              color:
                currentLocale === "zh" ? "#fff" : isDark ? "#F5F6FA" : "#333",
              border: "1px solid #155EEF",
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
                  ? "#155EEF"
                  : isDark
                  ? "#23262F"
                  : "#fff",
              color:
                currentLocale === "en" ? "#fff" : isDark ? "#F5F6FA" : "#333",
              border: "1px solid #155EEF",
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
                ? "#155EEF"
                : isDark
                ? "#23262F"
                : "#fff",
            color:
              currentTheme === Theme.WHITE
                ? "#fff"
                : isDark
                ? "#F5F6FA"
                : "#333",
            border: "1px solid #155EEF",
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
                ? "#155EEF"
                : isDark
                ? "#23262F"
                : "#fff",
            color:
              currentTheme === Theme.DARK
                ? "#fff"
                : isDark
                ? "#F5F6FA"
                : "#333",
            border: "1px solid #155EEF",
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
