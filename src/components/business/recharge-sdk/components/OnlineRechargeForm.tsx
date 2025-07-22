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
  const allDicts = JSON.parse(sessionStorage.getItem("all_dicts") || "{}");
  const currencyDict = allDicts.currency;
  const channelDict = allDicts.channel.filter(
    (item: any) => item.payment_support
  );

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
        select: {
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #E5E6EB",
          background: "#fff",
          color: "#222",
          fontSize: 15,
          outline: "none",
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
          background: "#155EEF",
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
        select: {
          width: "100%",
          padding: "10px 12px",
          borderRadius: 6,
          border: "1px solid #23262F",
          background: "#23262F",
          color: "#fff",
          fontSize: 15,
          outline: "none",
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
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> 充值币种
        </div>
        <select
          style={{
            ...theme.select,
            // 币种没有错误校验
          }}
          value={formState.currency}
          onInput={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            setFormState((state: any) => ({
              ...state,
              currency: value,
            }));
          }}
        >
          <option value="" disabled hidden>
            请选择充值币种
          </option>
          {currencyDict.map((item: any) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
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
          <span style={{ color: "#F53F3F" }}>*</span> 支付平台
        </div>
        <select
          style={{
            ...theme.select,
            ...(formState.rechargeChannelError ? theme.selectError : {}),
          }}
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
          <option value="" disabled hidden>
            请选择支付平台
          </option>
          {channelDict.map((item: any) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
        {formState.rechargeChannelError && (
          <div style={theme.error}>{formState.rechargeChannelError}</div>
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
