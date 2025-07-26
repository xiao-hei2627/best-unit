import { useState, useEffect } from "preact/hooks";
import { OnlineRechargeForm } from "../online-recharge-form";
import { OfflineTransferForm } from "../offline-transfer-form";
import { t } from "@/local";
import { getRechargeTheme } from "./theme";

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

export function Recharge({ visible, onClose, onSubmit }: ModalFormProps) {
  const [formState, setFormState] = useState({
    amount: "",
    rechargeChannel: "",
    currency: "USD",
    loading: false,
    error: "",
    amountError: "",
    rechargeChannelError: "",
    currencyError: "",
  });
  const [activeTab, setActiveTab] = useState<"online" | "offline">("online");
  const [offlineFormState, setOfflineFormState] = useState({
    platform: "",
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
        rechargeChannel: "",
        currency: "USD",
        loading: false,
        error: "",
        amountError: "",
        rechargeChannelError: "",
        currencyError: "",
      });
      setOfflineFormState({
        platform: "",
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
      setFormState((state) => ({ ...state, amountError: t("请输入充值金额") }));
      valid = false;
    }
    if (!formState.rechargeChannel) {
      setFormState((state) => ({
        ...state,
        rechargeChannelError: t("请选择支付平台"),
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
      setFormState((state) => ({ ...state, error: t("提交失败，请重试") }));
    } finally {
      setFormState((state) => ({ ...state, loading: false }));
    }
  };

  // 记录鼠标是否在mask上按下
  const [maskMouseDown, setMaskMouseDown] = useState(false);

  // 只有mousedown和mouseup都在mask上才关闭弹窗
  const handleMaskMouseDown = (e: any) => {
    if (e.target === e.currentTarget) {
      setMaskMouseDown(true);
    } else {
      setMaskMouseDown(false);
    }
  };
  const handleMaskMouseUp = (e: any) => {
    if (e.target === e.currentTarget && maskMouseDown) {
      onClose();
    }
    setMaskMouseDown(false);
  };

  const theme = getRechargeTheme();

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
      onMouseDown={handleMaskMouseDown}
      onMouseUp={handleMaskMouseUp}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: theme.modalBg,
          padding: 32,
          borderRadius: 12,
          minWidth: 400,
          maxWidth: 400,
          color: theme.modalColor,
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
          aria-label={t("关闭")}
        >
          ×
        </button>
        <div style={theme.title}>{t("充值 / 转账")}</div>
        {/* tab 按钮区域 */}
        <div style={{ display: "flex", marginBottom: 28 }}>
          <button
            type="button"
            onClick={() => setActiveTab("online")}
            style={theme.tabBtn(activeTab === "online", true)}
          >
            {t("在线充值")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("offline")}
            style={theme.tabBtn(activeTab === "offline", false)}
          >
            {t("线下转账")}
          </button>
        </div>
        {/* tab 内容区域 */}
        {activeTab === "online" ? (
          <OnlineRechargeForm
            formState={formState}
            setFormState={setFormState}
            onClose={onClose}
            loading={formState.loading}
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
