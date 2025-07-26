import type { FunctionalComponent } from "preact";
import { Upload } from "@/components/common/upload";
import { createOfflineRecharge } from "@/api";
import { message } from "@/components/common/message";
import { t } from "@/local";
import { Select } from "@/components/common/select";
import { getOfflineTransferFormTheme } from "./theme";

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
}

export const OfflineTransferForm: FunctionalComponent<
  OfflineTransferFormProps
> = ({ formState, setFormState, onClose, loading }) => {
  const allDicts = JSON.parse(sessionStorage.getItem("all_dicts") || "{}");
  console.log(allDicts, "allDicts");
  const channelDict = allDicts?.channel || [];
  const theme = getOfflineTransferFormTheme();

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
        <Select
          value={formState.platform}
          onChange={(value) => {
            setFormState((state: any) => ({
              ...state,
              platform: value,
              platformError: value ? "" : state.platformError,
            }));
          }}
          options={[
            ...channelDict?.map((item: any) => ({
              value: item.value,
              label: item.label,
            })),
          ]}
          placeholder={t("请选择支付平台")}
        />
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
          maxLength={200}
          onInput={(e) => {
            let value = (e.target as HTMLInputElement).value;
            if (value.length > 200) value = value.slice(0, 200);
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
