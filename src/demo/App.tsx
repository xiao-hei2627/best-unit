import { useState } from "preact/hooks";
import { npmTest, printCurrentTime } from "../main";
import { BestUnit } from "../components/business/recharge-sdk";
import { initFundUnit } from "../main";
import StatisticalBalance from "../components/business/statistical-balance";
import { t } from "../local";

export default function DemoApp() {
  const [currentLocale, setCurrentLocale] = useState<"zh" | "en">("zh");

  const initApp = (locale: "zh" | "en") => {
    initFundUnit({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTM0MTM1MjksIm1lcmNoYW50X2lkIjoxMTI4LCJ0aW1lc3RhbXAiOjE3NTMxNTQzMjl9.UAvzq0P4HCnbJR1Ga3CgF6q3vk2RHiZRvnAFohBTHpw",
      merchant_id: "1128",
      biz_type: "ad",
      locale: locale,
    });
  };

  // 初始化应用
  initApp(currentLocale);

  const handleLocaleChange = (locale: "zh" | "en") => {
    setCurrentLocale(locale);
    // 重新初始化以更新语言设置
    initApp(locale);
  };

  return (
    <div>
      <h2>组件库可视化测试</h2>

      {/* 国际化切换区域 */}
      <div
        style={{
          marginBottom: 20,
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          backgroundColor: "#f9fafb",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>国际化测试：</h3>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span>当前语言：</span>
          <button
            onClick={() => handleLocaleChange("zh")}
            style={{
              padding: "8px 16px",
              backgroundColor: currentLocale === "zh" ? "#155EEF" : "#fff",
              color: currentLocale === "zh" ? "#fff" : "#333",
              border: "1px solid #155EEF",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: currentLocale === "zh" ? "bold" : "normal",
            }}
          >
            中文
          </button>
          <button
            onClick={() => handleLocaleChange("en")}
            style={{
              padding: "8px 16px",
              backgroundColor: currentLocale === "en" ? "#155EEF" : "#fff",
              color: currentLocale === "en" ? "#fff" : "#333",
              border: "1px solid #155EEF",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: currentLocale === "en" ? "bold" : "normal",
            }}
          >
            English
          </button>
          <span style={{ marginLeft: 12, fontSize: 14, color: "#666" }}>
            {currentLocale === "zh"
              ? "当前显示中文"
              : "Currently showing English"}
          </span>
        </div>
      </div>

      <div>
        <h3>BestUnit 组件演示：</h3>
        <BestUnit
          theme={{ primaryColor: "#6366f1" }}
          merchant_id="1128"
          biz_type="ad"
          token="123"
        />
      </div>
      <div>
        <h3>方法演示：</h3>
        <button onClick={npmTest} style={{ marginRight: 10 }}>
          调用 npmTest()
        </button>
        <button onClick={printCurrentTime}>调用 printCurrentTime()</button>
      </div>
      <div>
        <h3>余额卡片组件演示：</h3>
        <StatisticalBalance />
      </div>

      {/* 国际化文本测试区域 */}
      <div
        style={{
          marginTop: 20,
          padding: 16,
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          backgroundColor: "#f9fafb",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 12 }}>国际化文本测试：</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
          }}
        >
          <div style={{ padding: 8, backgroundColor: "#fff", borderRadius: 4 }}>
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
          <div style={{ padding: 8, backgroundColor: "#fff", borderRadius: 4 }}>
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
          <div style={{ padding: 8, backgroundColor: "#fff", borderRadius: 4 }}>
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
