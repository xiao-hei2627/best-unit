import type { FunctionalComponent } from "preact";
import { Upload } from "../../../common/Upload";
import { createOfflineRecharge } from "../../../../api";
import { message } from "../../../common/Message";
import { t } from "../../../../local";

interface OfflineTransferFormProps {
  formState: {
    platform: string;
    transactionId: string;
    files: string[]; // 绑定url数组
    platformError?: string;
    transactionIdError?: string;
    filesError?: string;
    loading?: boolean;
  };
  setFormState: (fn: (state: any) => any) => void;
  onClose: () => void;
  loading: boolean;
  whiteTheme?: boolean;
}

export const OfflineTransferForm: FunctionalComponent<
  OfflineTransferFormProps
> = ({ formState, setFormState, onClose, loading, whiteTheme = false }) => {
  const allDicts = JSON.parse(sessionStorage.getItem("all_dicts") || "{}");
  console.log(allDicts, "allDicts");
  const channelDict = allDicts?.channel || [];

  // 样式对象
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
        upload: {
          border: "1px dashed #E5E6EB",
          borderRadius: 8,
          background: "#FCFCFD",
          padding: 24,
          textAlign: "center",
          cursor: "pointer",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          fontSize: 15,
        },
        uploadError: {
          border: "1px dashed #ff4d4f",
        },
        fileItem: {
          display: "flex",
          alignItems: "center",
          background: "#F7F8FA",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 8,
          fontSize: 15,
          color: "#222",
          justifyContent: "space-between",
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
        removeBtn: {
          background: "#FF4D4F",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "4px 14px",
          fontSize: 15,
          marginLeft: 16,
          cursor: "pointer",
        },
        error: {
          color: "#ff4d4f",
          fontSize: 13,
          marginTop: 4,
          textAlign: "left",
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
        upload: {
          border: "1px dashed #23262F",
          borderRadius: 8,
          background: "#181A20",
          padding: 24,
          textAlign: "center",
          cursor: "pointer",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#999",
          fontSize: 15,
        },
        uploadError: {
          border: "1px dashed #ff4d4f",
        },
        fileItem: {
          display: "flex",
          alignItems: "center",
          background: "#23262F",
          borderRadius: 8,
          padding: "12px 16px",
          marginBottom: 8,
          fontSize: 15,
          color: "#fff",
          justifyContent: "space-between",
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
        removeBtn: {
          background: "#FF4D4F",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "4px 14px",
          fontSize: 15,
          marginLeft: 16,
          cursor: "pointer",
        },
        error: {
          color: "#ff4d4f",
          fontSize: 13,
          marginTop: 4,
          textAlign: "left",
        },
      };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let valid = true;
    setFormState((state: any) => ({
      ...state,
      platformError: "",
      transactionIdError: "",
      filesError: "",
    }));
    if (!formState.platform) {
      setFormState((state: any) => ({
        ...state,
        platformError: t("请选择支付平台"),
      }));
      valid = false;
    }
    if (!formState.transactionId.trim()) {
      setFormState((state: any) => ({
        ...state,
        transactionIdError: t("请输入转账交易ID"),
      }));
      valid = false;
    }
    if (!formState.files || formState.files.length === 0) {
      setFormState((state: any) => ({
        ...state,
        filesError: t("请上传转账凭证"),
      }));
      valid = false;
    }
    if (!valid) return;
    await createOfflineRecharge({
      transferChannel: formState.platform,
      transferNo: formState.transactionId,
      voucherUrls: formState.files,
    });
    onClose();
    message.success(t("离线充值创建成功"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> {t("第三方支付平台")}
        </div>
        <select
          style={{
            ...theme.select,
            ...(formState.platformError ? theme.selectError : {}),
          }}
          value={formState.platform}
          onInput={(e) => {
            const value = (e.target as HTMLSelectElement).value;
            setFormState((state: any) => ({
              ...state,
              platform: value,
              platformError: value ? "" : state.platformError,
            }));
          }}
        >
          <option value="" disabled hidden>
            {t("请选择支付平台")}
          </option>
          {channelDict?.map((item: any) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
        {formState.platformError && (
          <div style={theme.error}>{formState.platformError}</div>
        )}
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> {t("交易ID")}
        </div>
        <input
          type="text"
          placeholder={t("请输入转账交易ID")}
          value={formState.transactionId}
          onInput={(e) => {
            const value = (e.target as HTMLInputElement).value;
            setFormState((state: any) => ({
              ...state,
              transactionId: value,
              transactionIdError: value ? "" : state.transactionIdError,
            }));
          }}
          style={{
            ...theme.input,
            ...(formState.transactionIdError ? theme.inputError : {}),
          }}
        />
        {formState.transactionIdError && (
          <div style={theme.error}>{formState.transactionIdError}</div>
        )}
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> {t("上传文件")}
        </div>
        <Upload
          value={formState.files}
          onChange={(urls) =>
            setFormState((state: any) => ({
              ...state,
              files: urls,
              filesError: "",
            }))
          }
          maxCount={10}
          accept={".jpg,.jpeg,.png,.pdf"}
          multiple={true}
        />
        {formState.filesError && (
          <div style={theme.error}>{formState.filesError}</div>
        )}
      </div>
      {/* 按钮区 */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button type="button" onClick={onClose} style={theme.buttonCancel}>
          {t("取消")}
        </button>
        <button type="submit" disabled={loading} style={theme.buttonSubmit}>
          {t("去支付")}
        </button>
      </div>
    </form>
  );
};
