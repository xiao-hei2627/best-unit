import type { FunctionalComponent } from "preact";

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
  whiteTheme?: boolean;
}

export const OnlineRechargeForm: FunctionalComponent<
  OnlineRechargeFormProps
> = ({ formState, setFormState, onClose, loading, whiteTheme = false }) => {
  // 白色主题样式
  const inputStyle = whiteTheme
    ? {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        boxSizing: "border-box",
        border: formState.amountError
          ? "1px solid #ff4d4f"
          : "1px solid #E5E6EB",
        background: "#fff",
        color: "#222",
        fontSize: 15,
        outline: "none",
        marginBottom: 0,
      }
    : {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        boxSizing: "border-box",
        border: formState.amountError
          ? "1px solid #ff4d4f"
          : "1px solid #23262F",
        background: "#23262F",
        color: "#fff",
        fontSize: 15,
        outline: "none",
        marginBottom: 0,
      };
  const selectStyle = whiteTheme
    ? {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        border: formState.rechargeChannelError
          ? "1px solid #ff4d4f"
          : "1px solid #E5E6EB",
        background: "#fff",
        color: "#222",
        fontSize: 15,
        outline: "none",
      }
    : {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        border: formState.rechargeChannelError
          ? "1px solid #ff4d4f"
          : "1px solid #23262F",
        background: "#23262F",
        color: "#fff",
        fontSize: 15,
        outline: "none",
      };
  const selectCurrencyStyle = whiteTheme
    ? {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        border: "1px solid #E5E6EB",
        background: "#fff",
        color: "#222",
        fontSize: 15,
        outline: "none",
      }
    : {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        border: "1px solid #23262F",
        background: "#23262F",
        color: "#fff",
        fontSize: 15,
        outline: "none",
      };
  const labelStyle = whiteTheme
    ? { marginBottom: 8, fontSize: 14, color: "#222" }
    : { marginBottom: 8, fontSize: 14 };
  const errorStyle = { color: "#ff4d4f", fontSize: 13, marginTop: 4 };
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
        background: "#155EEF",
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
        <div style={labelStyle}>
          <span style={{ color: "#F53F3F" }}>*</span> 充值币种
        </div>
        <select
          style={selectCurrencyStyle}
          value={formState.currency}
          onInput={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            setFormState((state: any) => ({
              ...state,
              currency: value,
            }));
          }}
        >
          <option value="USD">USD - 美元</option>
          <option value="CNY">CNY - 人民币</option>
          <option value="EUR">EUR - 欧元</option>
        </select>
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={labelStyle}>
          <span style={{ color: "#F53F3F" }}>*</span> 充值金额
        </div>
        <input
          type="text"
          placeholder="请输入充值金额"
          value={formState.amount}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setFormState((state: any) => ({
              ...state,
              amount: value,
              amountError: value.trim() ? "" : state.amountError,
            }));
          }}
          style={inputStyle}
        />
        {formState.amountError && (
          <div style={errorStyle}>{formState.amountError}</div>
        )}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={labelStyle}>
          <span style={{ color: "#F53F3F" }}>*</span> 支付平台
        </div>
        <select
          style={selectStyle}
          value={formState.rechargeChannel}
          onInput={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            setFormState((state: any) => ({
              ...state,
              rechargeChannel: value,
              rechargeChannelError: value ? "" : state.rechargeChannelError,
            }));
          }}
        >
          <option value="alipay">支付宝</option>
          <option value="wechat">微信</option>
          <option value="paypal">PayPal</option>
        </select>
        {formState.rechargeChannelError && (
          <div style={errorStyle}>{formState.rechargeChannelError}</div>
        )}
      </div>
      {formState.error && (
        <div style={{ color: "#ff4d4f", marginBottom: 12 }}>
          {formState.error}
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button type="button" onClick={onClose} style={buttonCancelStyle}>
          取消
        </button>
        <button type="submit" disabled={loading} style={buttonSubmitStyle}>
          {loading ? "提交中..." : "去支付"}
        </button>
      </div>
    </>
  );
};
