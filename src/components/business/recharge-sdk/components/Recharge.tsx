import { useState, useEffect } from "preact/hooks";
import { OnlineRechargeForm } from "./OnlineRechargeForm";
import { OfflineTransferForm } from "./OfflineTransferForm";

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (form: {
    amount: string;
    rechargeChannel: string;
    currency: string;
  }) => Promise<void>;
  color?: string;
  merchantId?: string;
  bizType?: string;
  token?: string;
}

export function Recharge({
  visible,
  onClose,
  onSubmit,
  color,
  whiteTheme = true,
}: ModalFormProps & { whiteTheme?: boolean }) {
  const [formState, setFormState] = useState({
    amount: "",
    rechargeChannel: "paypal",
    currency: "USD",
    loading: false,
    error: "",
    amountError: "",
    rechargeChannelError: "",
    currencyError: "",
  });
  const [activeTab, setActiveTab] = useState<"online" | "offline">("online");
  const [offlineFormState, setOfflineFormState] = useState({
    platform: "paypal",
    transactionId: "",
    files: [],
    platformError: "",
    transactionIdError: "",
    filesError: "",
    loading: false,
  });

  // 每次关闭弹窗时重置内容
  useEffect(() => {
    if (!visible) {
      setActiveTab("online");
      setFormState({
        amount: "",
        rechargeChannel: "paypal",
        currency: "USD",
        loading: false,
        error: "",
        amountError: "",
        rechargeChannelError: "",
        currencyError: "",
      });
      setOfflineFormState({
        platform: "paypal",
        transactionId: "",
        files: [],
        platformError: "",
        transactionIdError: "",
        filesError: "",
        loading: false,
      });
    }
  }, [visible]);

  if (!visible) return null;

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    let valid = true;
    setFormState((state) => ({
      ...state,
      amountError: "",
      rechargeChannelError: "",
    }));
    if (!formState.amount.trim()) {
      setFormState((state) => ({ ...state, amountError: "请输入充值金额" }));
      valid = false;
    }
    if (!formState.rechargeChannel) {
      setFormState((state) => ({
        ...state,
        rechargeChannelError: "请选择支付平台",
      }));
      valid = false;
    }
    if (!valid) return;
    setFormState((state) => ({ ...state, loading: true, error: "" }));
    try {
      await onSubmit({
        amount: formState.amount,
        rechargeChannel: formState.rechargeChannel,
        currency: formState.currency,
      });
      onClose();
    } catch {
      setFormState((state) => ({ ...state, error: "提交失败，请重试" }));
    } finally {
      setFormState((state) => ({ ...state, loading: false }));
    }
  };

  // 点击弹窗外部关闭
  const handleMaskClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const theme = whiteTheme
    ? {
        modalBg: "#fff",
        modalColor: "#222",
        modalBoxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        mask: "rgba(0,0,0,0.3)",
        title: {
          fontWeight: 600,
          fontSize: 20,
          marginBottom: 24,
          textAlign: "left",
          color: "#222",
        },
        closeBtn: {
          position: "absolute",
          right: 16,
          top: 16,
          background: "none",
          border: "none",
          color: "#222",
          fontSize: 22,
          cursor: "pointer",
          lineHeight: 1,
        },
        tabBtn: (active: boolean, left: boolean) => ({
          flex: 1,
          background: active ? "#fff" : "#F7F8FA",
          color: active ? "#155EEF" : "#222",
          border: "none",
          borderRadius: left ? "8px 0 0 8px" : "0 8px 8px 0",
          fontWeight: active ? 600 : 400,
          fontSize: 16,
          height: 48,
          boxShadow: active ? "0 2px 8px 0 rgba(20,20,20,0.04)" : "none",
          outline: "none",
          cursor: "pointer",
          borderRight: left ? "1px solid #F0F1F3" : undefined,
          borderLeft: !left ? "1px solid #F0F1F3" : undefined,
          transition: "all 0.2s",
        }),
      }
    : {
        modalBg: "#181A20",
        modalColor: "#fff",
        modalBoxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        mask: "rgba(0,0,0,0.7)",
        title: {
          fontWeight: 600,
          fontSize: 20,
          marginBottom: 24,
          textAlign: "left",
          color: "#fff",
        },
        closeBtn: {
          position: "absolute",
          right: 16,
          top: 16,
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
          lineHeight: 1,
        },
        tabBtn: (active: boolean, left: boolean) => ({
          flex: 1,
          background: active ? "#23262F" : "#181A20",
          color: active ? "#00E8C6" : "#fff",
          border: "none",
          borderRadius: left ? "8px 0 0 8px" : "0 8px 8px 0",
          fontWeight: active ? 600 : 400,
          fontSize: 16,
          height: 48,
          boxShadow: active ? "0 2px 8px 0 rgba(20,20,20,0.10)" : "none",
          outline: "none",
          cursor: "pointer",
          borderRight: left ? "1px solid #23262F" : undefined,
          borderLeft: !left ? "1px solid #23262F" : undefined,
          transition: "all 0.2s",
        }),
      };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.mask,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={handleMaskClick}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: theme.modalBg,
          padding: 32,
          borderRadius: 12,
          minWidth: 400,
          color: color || theme.modalColor,
          boxShadow: theme.modalBoxShadow,
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          style={theme.closeBtn}
          aria-label="关闭"
        >
          ×
        </button>
        <div style={theme.title}>充值 / 转账</div>
        {/* tab 按钮区域 */}
        <div style={{ display: "flex", marginBottom: 28 }}>
          <button
            type="button"
            onClick={() => setActiveTab("online")}
            style={theme.tabBtn(activeTab === "online", true)}
          >
            在线充值
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("offline")}
            style={theme.tabBtn(activeTab === "offline", false)}
          >
            线下转账
          </button>
        </div>
        {/* tab 内容区域 */}
        {activeTab === "online" ? (
          <OnlineRechargeForm
            formState={formState}
            setFormState={setFormState}
            onClose={onClose}
            loading={formState.loading}
            whiteTheme={whiteTheme}
          />
        ) : (
          <OfflineTransferForm
            formState={offlineFormState}
            setFormState={setOfflineFormState}
            onClose={onClose}
            loading={offlineFormState.loading}
            whiteTheme={whiteTheme}
          />
        )}
      </form>
    </div>
  );
}
