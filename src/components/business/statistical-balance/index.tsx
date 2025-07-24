import { useState, useEffect } from "preact/hooks";
import HoverPopover, { type PopoverPosition } from "../../common/HoverPopover";
import { getBalance } from "../../../api";
import register from "preact-custom-element";

// 默认数据，用于加载时显示
const defaultBalanceData = {
  available: 0,
  currency: "USD",
  symbol: "$",
  details: [
    { label: "真实金额", value: 0, color: "#15b36b", dot: "#15b36b" },
    { label: "冻结金额", value: 0, color: "#f59e0b", dot: "#f59e0b" },
    { label: "总可用", value: 0, color: "#155EEF", dot: "#15b36b" },
  ],
};

function formatNumber(num: number) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function StatisticalBalance(props: { popoverPosition?: PopoverPosition }) {
  const [balanceData, setBalanceData] = useState(defaultBalanceData);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();

        // 根据 API 返回的数据构建 balanceData
        const newBalanceData = {
          available: balance.availableAmount,
          currency: "USD", // 可以根据实际 API 返回调整
          symbol: "$",
          details: [
            {
              label: "真实金额",
              value: balance.totalAmount,
              color: "#15b36b",
              dot: "#15b36b",
            },
            {
              label: "冻结金额",
              value: balance.frozenAmount,
              color: "#f59e0b",
              dot: "#f59e0b",
            },
            {
              label: "总可用",
              value: balance.availableAmount,
              color: "#155EEF",
              dot: "#15b36b",
            },
          ],
        };

        setBalanceData(newBalanceData);
      } catch (err) {
        console.error("获取余额失败:", err);
        // 获取失败时保持默认的 $0 USD 显示
      }
    };

    fetchBalance();
  }, []);

  return (
    <HoverPopover
      popover={
        <>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#222",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            余额详情
          </div>
          {balanceData.details.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #e5e7eb",
                fontSize: 15,
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#6b7280",
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: item.dot,
                    marginRight: 8,
                  }}
                />
                {item.label}
              </span>
              <span
                style={{ color: item.color, fontWeight: 600, fontSize: 15 }}
              >
                {balanceData.symbol}
                {formatNumber(item.value)}
              </span>
            </div>
          ))}
        </>
      }
      popoverPosition={props.popoverPosition || "bottom"}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#111827",
          display: "inline-block",
        }}
      >
        {balanceData.symbol}
        {formatNumber(balanceData.available)}
        <span
          style={{
            fontSize: 18,
            color: "#6b7280",
            marginLeft: 8,
            fontWeight: 600,
          }}
        >
          {balanceData.currency}
        </span>
      </div>
    </HoverPopover>
  );
}

register(StatisticalBalance, "best-statistical-balance");

export default StatisticalBalance;
