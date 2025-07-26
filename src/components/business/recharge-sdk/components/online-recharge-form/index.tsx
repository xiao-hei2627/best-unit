import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import { t } from "@/local";
import { Select } from "@/components/common/select";
import { calcPaymentAmount } from "@/api";
import { getOnlineRechargeFormTheme } from "./theme";

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
  const [actualAmount, setActualAmount] = useState<string>("");
  const [showFeeTip, setShowFeeTip] = useState(false);
  const theme = getOnlineRechargeFormTheme();

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
        <div style={theme.feeTip}>
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
        <button type="button" onClick={onClose} style={theme.buttonCancel}>
          {t("取消")}
        </button>
        <button type="submit" disabled={loading} style={theme.buttonSubmit}>
          {loading ? t("提交中...") : t("去支付")}
        </button>
      </div>
    </>
  );
};
