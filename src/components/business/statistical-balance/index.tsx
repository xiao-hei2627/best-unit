import { useState, useEffect } from "preact/hooks";
import HoverPopover, {
  type PopoverPosition,
} from "@/components/common/hover-popover";
import { getBalance } from "@/api";
import { t } from "@/local";
import register from "preact-custom-element";
import { getStatisticalBalanceTheme } from "./theme";

function formatNumber(num: number) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function StatisticalBalance(props: { popoverPosition?: PopoverPosition }) {
  const [balanceData, setBalanceData] = useState({
    available: 0,
    currency: "USD",
    symbol: "$",
    details: [
      { label: t("真实金额"), value: 0, color: "#15b36b", dot: "#15b36b" },
      { label: t("冻结金额"), value: 0, color: "#f59e0b", dot: "#f59e0b" },
      { label: t("总可用"), value: 0, color: "#1890ff", dot: "#15b36b" },
    ],
  });

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
            label: t("真实金额"),
            value: balance.availableAmount,
            color: "#15b36b",
            dot: "#15b36b",
          },
          {
            label: t("冻结金额"),
            value: balance.frozenAmount,
            color: "#f59e0b",
            dot: "#f59e0b",
          },
          {
            label: t("总可用"),
            value: balance.totalAmount,
            color: "#1890ff",
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

  useEffect(() => {
    fetchBalance();
  }, []);

  useEffect(() => {
    // 监听refresh-balance事件
    const handleRefreshBalance = () => {
      fetchBalance();
    };

    // 添加事件监听器
    document.addEventListener(
      "refresh-balance",
      handleRefreshBalance as EventListener
    );

    // 清理函数
    return () => {
      document.removeEventListener(
        "refresh-balance",
        handleRefreshBalance as EventListener
      );
    };
  }, []);

  const theme = getStatisticalBalanceTheme();

  return (
    <HoverPopover
      popover={
        <>
          <div style={theme.popoverTitle}>{t("余额详情")}</div>
          {balanceData.details.map((item) => (
            <div key={item.label} style={theme.detailRow}>
              <span style={theme.detailLabel}>
                <span style={theme.detailDot(item.dot)} />
                {item.label}
              </span>
              <span style={theme.detailValue(item.color)}>
                {balanceData.symbol}
                {formatNumber(item.value)}
              </span>
            </div>
          ))}
        </>
      }
      popoverPosition={props.popoverPosition || "bottom"}
    >
      <div style={theme.main}>
        {balanceData.symbol}
        {formatNumber(balanceData.available)}
        <span style={theme.currency}>{balanceData.currency}</span>
      </div>
    </HoverPopover>
  );
}

register(StatisticalBalance, "best-statistical-balance");

export default StatisticalBalance;
