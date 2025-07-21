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
}

export function ModalForm({
  visible,
  onClose,
  onSubmit,
  color,
}: ModalFormProps) {
  console.log(1111);
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

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)", // 更浅的遮罩
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
          background: "#fff", // 白色弹窗
          padding: 32,
          borderRadius: 12,
          minWidth: 400,
          color: "#222", // 深色字体
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
            background: "none",
            border: "none",
            color: "#222",
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
          }}
          aria-label="关闭"
        >
          ×
        </button>
        <div
          style={{
            fontWeight: 600,
            fontSize: 20,
            marginBottom: 24,
            textAlign: "left",
            color: "#222",
          }}
        >
          充值 / 转账
        </div>
        {/* tab 按钮区域 */}
        <div style={{ display: "flex", marginBottom: 28 }}>
          <button
            type="button"
            onClick={() => setActiveTab("online")}
            style={{
              flex: 1,
              background: activeTab === "online" ? "#fff" : "#F7F8FA",
              color: activeTab === "online" ? "#155EEF" : "#222",
              border: "none",
              borderRadius: "8px 0 0 8px",
              fontWeight: activeTab === "online" ? 600 : 400,
              fontSize: 16,
              height: 48,
              boxShadow:
                activeTab === "online"
                  ? "0 2px 8px 0 rgba(20,20,20,0.04)"
                  : "none",
              outline: "none",
              cursor: "pointer",
              borderRight: "1px solid #F0F1F3",
              transition: "all 0.2s",
            }}
          >
            在线充值
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("offline")}
            style={{
              flex: 1,
              background: activeTab === "offline" ? "#fff" : "#F7F8FA",
              color: activeTab === "offline" ? "#155EEF" : "#222",
              border: "none",
              borderRadius: "0 8px 8px 0",
              fontWeight: activeTab === "offline" ? 600 : 400,
              fontSize: 16,
              height: 48,
              boxShadow:
                activeTab === "offline"
                  ? "0 2px 8px 0 rgba(20,20,20,0.04)"
                  : "none",
              outline: "none",
              cursor: "pointer",
              borderLeft: "1px solid #F0F1F3",
              transition: "all 0.2s",
            }}
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
            whiteTheme={true}
          />
        ) : (
          <OfflineTransferForm
            formState={offlineFormState}
            setFormState={setOfflineFormState}
            onClose={onClose}
            loading={offlineFormState.loading}
          />
        )}
      </form>
    </div>
  );
}
