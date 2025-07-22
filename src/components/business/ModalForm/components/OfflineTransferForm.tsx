import type { FunctionalComponent } from "preact";
import { useRef } from "preact/hooks";

interface OfflineTransferFormProps {
  formState: {
    platform: string;
    transactionId: string;
    files: File[];
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files).slice(0, 10);
    setFormState((state: any) => ({ ...state, files, filesError: "" }));
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).slice(0, 10);
    setFormState((state: any) => ({ ...state, files, filesError: "" }));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleRemoveFile = (idx: number) => {
    setFormState((state: any) => ({
      ...state,
      files: state.files.filter((_: File, i: number) => i !== idx),
    }));
  };

  const handleSubmit = (e: any) => {
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
        platformError: "请选择支付平台",
      }));
      valid = false;
    }
    if (!formState.transactionId.trim()) {
      setFormState((state: any) => ({
        ...state,
        transactionIdError: "请输入转账交易ID",
      }));
      valid = false;
    }
    if (!formState.files || formState.files.length === 0) {
      setFormState((state: any) => ({
        ...state,
        filesError: "请上传转账凭证",
      }));
      valid = false;
    }
    if (!valid) return;
    // 打印表单值
    console.log("OfflineTransferForm values:", formState);
  };

  // 文件大小格式化
  const formatSize = (size: number) => {
    if (size > 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + " MB";
    if (size > 1024) return (size / 1024).toFixed(2) + " KB";
    return size + " B";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> 第三方支付平台
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
          <option value="paypal">PayPal</option>
          <option value="alipay">支付宝</option>
          <option value="wechat">微信</option>
        </select>
        {formState.platformError && (
          <div style={theme.error}>{formState.platformError}</div>
        )}
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={theme.label}>
          <span style={{ color: "#F53F3F" }}>*</span> 交易ID
        </div>
        <input
          type="text"
          placeholder="请输入转账交易ID"
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
          <span style={{ color: "#F53F3F" }}>*</span> 上传文件
        </div>
        <div
          style={{
            ...theme.upload,
            ...(formState.filesError ? theme.uploadError : {}),
          }}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>📁</div>
          <div style={{ color: "#222", fontSize: 15, marginBottom: 4 }}>
            点击或拖拽文件到此处上传
          </div>
          <div style={{ color: "#999", fontSize: 13 }}>
            支持 JPG、PNG、PDF 格式，单个文件不超过 20MB，最多上传 10 个文件
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {formState.files && formState.files.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {formState.files.map((file, idx) => (
              <div key={idx} style={theme.fileItem}>
                <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                  <span style={{ fontWeight: 500 }}>{file.name}</span>
                  <span
                    style={{ color: "#8C8F93", fontSize: 13, marginLeft: 8 }}
                  >
                    ({formatSize(file.size)})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(idx);
                  }}
                  style={theme.removeBtn}
                >
                  移除
                </button>
              </div>
            ))}
          </div>
        )}
        {formState.filesError && (
          <div style={theme.error}>{formState.filesError}</div>
        )}
      </div>
      {/* 按钮区 */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
        <button type="button" onClick={onClose} style={theme.buttonCancel}>
          取消
        </button>
        <button type="submit" disabled={loading} style={theme.buttonSubmit}>
          去支付
        </button>
      </div>
    </form>
  );
};
