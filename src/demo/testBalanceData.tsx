import { useState } from "preact/hooks";
import { getBalanceData } from "@/utils/business";

interface TestBalanceDataProps {
  isDark: boolean;
}

export function TestBalanceData({ isDark }: TestBalanceDataProps) {
  const [balanceData, setBalanceData] = useState<any>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  // 测试 getBalanceData 函数
  const testGetBalanceData = () => {
    setBalanceLoading(true);
    try {
      const result = getBalanceData();
      setBalanceData(result);
      console.log("getBalanceData 测试结果:", result);
    } catch (error) {
      console.error("getBalanceData 测试失败:", error);
      setBalanceData({ error: "获取失败" });
    } finally {
      setBalanceLoading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: 16,
        border: "2px solid #52c41a",
        borderRadius: 8,
        backgroundColor: "#f6ffed",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12, color: "#52c41a" }}>
        🧪 getBalanceData 函数测试：
      </h3>
      <button
        onClick={testGetBalanceData}
        disabled={balanceLoading}
        style={{
          padding: "8px 16px",
          backgroundColor: balanceLoading ? "#d9d9d9" : "#52c41a",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: balanceLoading ? "not-allowed" : "pointer",
          marginBottom: 12,
        }}
      >
        {balanceLoading ? "测试中..." : "测试 getBalanceData 函数"}
      </button>

      {balanceData && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            backgroundColor: isDark ? "#23262F" : "#fff",
            border: "1px solid #d9d9d9",
            borderRadius: 6,
            fontSize: "12px",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            maxHeight: "200px",
            overflow: "auto",
          }}
        >
          <strong>测试结果：</strong>
          {JSON.stringify(balanceData, null, 2)}
        </div>
      )}
    </div>
  );
}

export default TestBalanceData;
