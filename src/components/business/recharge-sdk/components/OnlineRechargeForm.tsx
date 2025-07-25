import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { t } from "../../../../local";
import { Theme } from "../../../../types";
import { Select } from "../../../common/Select";
import { calcPaymentAmount } from "../../../../api";

interface OnlineRechargeFormProps {
  formState: {
    amount: string;
    rechargeChannel: string;
    currency: string;
    loading: boolean;
    error: string;
    amountError: string;
    rechargeChannelError: string;
    currencyError: string;
  };
  setFormState: (fn: (state: any) => any) => void;
  onClose: () => void;
  loading: boolean;
}

// 辅助函数：只允许输入数字和小数点，且最多两位小数
function formatAmountInput(value: string) {
  // 只保留数字和小数点
  value = value.replace(/[^\d.]/g, "");
  // 只保留第一个小数点
  value = value.replace(/\.(?=.*\.)/g, "");
  // 保证最多两位小数
  value = value.replace(/^(\d+)(\.\d{0,2})?.*$/, "$1$2");
  // 去除前导0（保留0.和0.xx）
  value = value.replace(/^0+(\d)/, "$1");
  if (value.startsWith(".")) value = "0" + value;
  return value;
}
// 辅助函数：格式化为两位小数
function formatToTwoDecimal(value: string) {
  if (!value) return "";
  const num = parseFloat(value);
  if (isNaN(num)) return "";
  return num.toFixed(2);
}

export const OnlineRechargeForm: FunctionalComponent<
  OnlineRechargeFormProps
> = ({ formState, setFormState, onClose, loading }) => {
  const allDicts = JSON.parse(sessionStorage.getItem("all_dicts") || "{}");
  const currencyDict = allDicts?.currency || [];
  const channelDict =
    allDicts?.channel?.filter((item: any) => item.payment_support) || [];
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  const whiteTheme = fundUnitParams.theme === Theme.WHITE;
  const [actualAmount, setActualAmount] = useState<string>("");
  const [showFeeTip, setShowFeeTip] = useState(false);

  // 当三个参数都填写完整时，计算实际支付金额
  useEffect(() => {
    if (formState.currency && formState.amount && formState.rechargeChannel) {
      calcPaymentAmount({
        channel: formState.rechargeChannel,
        amount: formState.amount,
        currency: formState.currency,
      })
        .then((paymentAmount) => {
          setActualAmount(paymentAmount);
          setShowFeeTip(true);
        })
        .catch((error) => {
          console.error("计算支付金额失败:", error);
          setShowFeeTip(false);
        });
    } else {
      setShowFeeTip(false);
    }
  }, [formState.currency, formState.amount, formState.rechargeChannel]);

  const theme = whiteTheme
    ? {
        label: {
          marginBottom: 8,
          fontSize: 14,
          color: "#222",
          textAlign: "left",
          display: "block",
        },
        input: {
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          boxSizing: "border-box",
          border: "1px solid #E5E6EB",
          background: "#fff",
          color: "#222",
          fontSize: 15,
          outline: "none",
          marginBottom: 0,
        },
        inputError: {
          border: "1px solid #ff4d4f",
        },
        selectError: {
          border: "1px solid #ff4d4f",
        },
        error: {
          color: "#ff4d4f",
          fontSize: 13,
          marginTop: 4,
          textAlign: "left",
        },
        buttonCancel: {
          background: "#fff",
          color: "#222",
          border: "1px solid #E5E6EB",
          borderRadius: 6,
          padding: "8px 24px",
          fontSize: 15,
          cursor: "pointer",
        },
        buttonSubmit: {
          background: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 24px",
          fontSize: 15,
          cursor: "pointer",
          fontWeight: 600,
        },
      }
    : {
        label: {
          marginBottom: 8,
          fontSize: 14,
          color: "#fff",
          textAlign: "left",
          display: "block",
        },
        input: {
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          boxSizing: "border-box",
          border: "1px solid #23262F",
          background: "#23262F",
          color: "#fff",
          fontSize: 15,
          outline: "none",
          marginBottom: 0,
        },
        inputError: {
          border: "1px solid #ff4d4f",
        },
        selectError: {
          border: "1px solid #ff4d4f",
        },
        error: {
          color: "#ff4d4f",
          fontSize: 13,
          marginTop: 4,
          textAlign: "left",
        },
        buttonCancel: {
          background: "#23262F",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 24px",
          fontSize: 15,
          cursor: "pointer",
        },
        buttonSubmit: {
          background: "#00E8C6",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 24px",
          fontSize: 15,
          cursor: "pointer",
          fontWeight: 600,
        },
      };
  //   const selectCurrencyStyle = whiteTheme
  //     ? {
  //         width: "100%",
  //         padding: "10px 12px",
  //         borderRadius: 6,
  //         border: "1px solid #E5E6EB",
  //         background: "#fff",
  //         color: "#222",
  //         fontSize: 15,
  //         outline: "none",
  //       }
  //     : {
  //         width: "100%",
  //         padding: "10px 12px",
  //         borderRadius: 6,
  //         border: "1px solid #23262F",
  //         background: "#23262F",
  //         color: "#fff",
  //         fontSize: 15,
  //         outline: "none",
  //       };
  //   const labelStyle = whiteTheme
  //     ? {
  //         marginBottom: 8,
  //         fontSize: 14,
  //         color: "#222",
  //         textAlign: "left",
  //         display: "block",
  //       }
  //     : { marginBottom: 8, fontSize: 14, textAlign: "left", display: "block" };
  //   const errorStyle = { color: "#ff4d4f", fontSize: 13, marginTop: 4 };
  const buttonCancelStyle = whiteTheme
    ? {
        background: "#fff",
        color: "#222",
        border: "1px solid #E5E6EB",
        borderRadius: 6,
        padding: "8px 24px",
        fontSize: 15,
        cursor: "pointer",
      }
    : {
        background: "#23262F",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "8px 24px",
        fontSize: 15,
        cursor: "pointer",
      };
  const buttonSubmitStyle = whiteTheme
    ? {
        background: "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "8px 24px",
        fontSize: 15,
        cursor: "pointer",
        fontWeight: 600,
      }
    : {
        background: "#00E8C6",
        color: "#fff",
        border: "none",
        borderRadius: 6,
        padding: "8px 24px",
        fontSize: 15,
        cursor: "pointer",
        fontWeight: 600,
      };

  return (
    <>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> {t("充值币种")}
        </div>
        <Select
          value={formState.currency}
          onChange={(value) => {
            setFormState((state: any) => ({
              ...state,
              currency: value,
            }));
          }}
          options={currencyDict?.map((item: any) => ({
            value: item.value,
            label: item.label,
          }))}
          placeholder={t("请选择充值币种")}
        />
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> {t("充值金额")}
        </div>
        <input
          type="text"
          placeholder={t("请输入充值金额")}
          value={formState.amount}
          onInput={(e) => {
            let value = (e.target as HTMLInputElement).value;
            value = formatAmountInput(value);
            let amountError = "";
            // 只有输入为合法数字且不以小数点结尾时才做区间修正
            if (value && !value.endsWith(".")) {
              let num = parseFloat(value);
              if (!isNaN(num)) {
                if (num < 1) num = 1;
                if (num > 999999.99) num = 999999.99;
                value = num.toString();
                // 如果原始输入有小数点且小数点后有内容，保留小数部分
                if (/\./.test((e.target as HTMLInputElement).value)) {
                  const decimalPart = (
                    e.target as HTMLInputElement
                  ).value.split(".")[1];
                  if (decimalPart !== undefined && decimalPart.length > 0) {
                    value = num.toFixed(Math.min(decimalPart.length, 2));
                  }
                }
              }
            }
            setFormState((state: any) => ({
              ...state,
              amount: value,
              amountError,
            }));
          }}
          onBlur={(e) => {
            let value = (e.target as HTMLInputElement).value;
            value = formatToTwoDecimal(value);
            setFormState((state: any) => ({
              ...state,
              amount: value,
              amountError: "",
            }));
          }}
          style={{
            ...theme.input,
            ...(formState.amountError ? theme.inputError : {}),
          }}
        />
        {formState.amountError && (
          <div style={theme.error}>{formState.amountError}</div>
        )}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> {t("支付平台")}
        </div>
        <Select
          value={formState.rechargeChannel}
          onChange={(value) => {
            setFormState((state: any) => ({
              ...state,
              rechargeChannel: value,
              rechargeChannelError: value ? "" : state.rechargeChannelError,
            }));
          }}
          options={channelDict?.map((item: any) => ({
            value: item.value,
            label: item.label,
          }))}
          placeholder={t("请选择支付平台")}
        ></Select>
        {formState.rechargeChannelError && (
          <div style={theme.error}>{formState.rechargeChannelError}</div>
        )}
      </div>
      {/* 手续费提示 */}
      {showFeeTip && actualAmount && (
        <div
          style={{
            marginBottom: 24,
            padding: "12px 16px",
            background: whiteTheme ? "#f6ffed" : "#1a1a1a",
            border: `1px solid ${whiteTheme ? "#b7eb8f" : "#333"}`,
            borderRadius: 6,
            fontSize: 14,
            color: whiteTheme ? "#52c41a" : "#52c41a",
          }}
        >
          {channelDict.find(
            (item: any) => item.value === formState.rechargeChannel
          )?.label || formState.rechargeChannel}
          {t("需要收取手续费，实际支付金额约为：")}${actualAmount}
        </div>
      )}
      {formState.error && (
        <div style={{ color: "#ff4d4f", marginBottom: 12 }}>
          {formState.error}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button type="button" onClick={onClose} style={buttonCancelStyle}>
          {t("取消")}
        </button>
        <button type="submit" disabled={loading} style={buttonSubmitStyle}>
          {loading ? t("提交中...") : t("去支付")}
        </button>
      </div>
    </>
  );
};
