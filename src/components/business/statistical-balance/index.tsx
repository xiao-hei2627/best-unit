import { useState, useEffect } from "preact/hooks";
import HoverPopover, { type PopoverPosition } from "../../common/HoverPopover";
import { getBalance } from "../../../api";
import { t } from "../../../local";
import register from "preact-custom-element";
import { Theme } from "../../../types";

function formatNumber(num: number) {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const balanceTheme = {
  white: {
    popoverTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "#222",
      marginBottom: 16,
      textAlign: "center",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #e5e7eb",
      fontSize: 15,
    },
    detailLabel: {
      display: "flex",
      alignItems: "center",
      color: "#6b7280",
      fontWeight: 500,
    },
    detailDot: (color: string) => ({
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      marginRight: 8,
    }),
    detailValue: (color: string) => ({
      color,
      fontWeight: 600,
      fontSize: 15,
    }),
    main: {
      fontSize: 24,
      fontWeight: 800,
      color: "#111827",
      display: "inline-block",
    },
    currency: {
      fontSize: 18,
      color: "#6b7280",
      marginLeft: 8,
      fontWeight: 600,
    },
  },
  dark: {
    popoverTitle: {
      fontSize: 16,
      fontWeight: 600,
      color: "#fff",
      marginBottom: 16,
      textAlign: "center",
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #23262F",
      fontSize: 15,
    },
    detailLabel: {
      display: "flex",
      alignItems: "center",
      color: "#B5B8BE",
      fontWeight: 500,
    },
    detailDot: (color: string) => ({
      display: "inline-block",
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      marginRight: 8,
    }),
    detailValue: (color: string) => ({
      color,
      fontWeight: 600,
      fontSize: 15,
    }),
    main: {
      fontSize: 24,
      fontWeight: 800,
      color: "#fff",
      display: "inline-block",
    },
    currency: {
      fontSize: 18,
      color: "#B5B8BE",
      marginLeft: 8,
      fontWeight: 600,
    },
  },
};

function StatisticalBalance(props: { popoverPosition?: PopoverPosition }) {
  const [balanceData, setBalanceData] = useState({
    available: 0,
    currency: "USD",
    symbol: "$",
    details: [
      { label: t("真实金额"), value: 0, color: "#15b36b", dot: "#15b36b" },
      { label: t("冻结金额"), value: 0, color: "#f59e0b", dot: "#f59e0b" },
      { label: t("总可用"), value: 0, color: "#155EEF", dot: "#15b36b" },
    ],
  });

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
              label: t("真实金额"),
              value: balance.totalAmount,
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

  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  const whiteTheme = fundUnitParams.theme === Theme.WHITE;
  const theme = balanceTheme[whiteTheme ? "white" : "dark"];

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
