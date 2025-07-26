import type { FunctionalComponent } from "preact";
import { useState, useRef } from "preact/hooks";
import { uploadFile } from "@/api";
import { t } from "@/local";
import { getUploadTheme } from "./theme";

interface UploadProps {
  value?: string[];
  onChange?: (urls: string[]) => void;
  maxCount?: number;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
}

export const Upload: FunctionalComponent<UploadProps> = ({
  value = [],
  onChange,
  maxCount = 10,
  accept = ".jpg,.jpeg,.png,.pdf",
  multiple = true,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const theme = getUploadTheme();

  const handleFileChange = async (e: any) => {
    const files: File[] = Array.from(e.target.files as FileList).slice(
      0,
      maxCount
    );
    if (!files.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      setProgress(0);
      const formData = new FormData();
      formData.append("file", files[i]);
      try {
        const url = await uploadFile(formData, (percent) =>
          setProgress(percent)
        );
        if (url) urls.push(url);
      } catch (err) {
        // 可扩展错误处理
      }
    }
    setUploading(false);
    setProgress(0);
    onChange?.([...value, ...urls]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (idx: number) => {
    const newArr = value.filter((_, i) => i !== idx);
    onChange?.(newArr);
  };

  return (
    <div>
      <div
        style={{
          ...theme.container,
          cursor: disabled ? "not-allowed" : theme.container.cursor,
          opacity: disabled ? 0.6 : 1,
        }}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>📁</div>
        <div style={{ color: "#222", fontSize: 15, marginBottom: 4 }}>
          {t("点击或拖拽文件到此处上传")}
        </div>
        <div style={{ color: "#999", fontSize: 13 }}>
          {t("支持 JPG、PNG、PDF 格式，单个文件不超过 20MB，最多上传")}{" "}
          {maxCount} {t("个文件")}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={disabled}
        />
        {uploading && (
          <div style={{ marginTop: 12, color: "#1677ff" }}>
            {t("正在上传...")} {progress}%
          </div>
        )}
      </div>
      {value && value.length > 0 && (
        <div style={{ marginTop: 12 }}>
          {value.map((url, idx) => (
            <div key={url} style={theme.fileItem}>
              <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <span style={{ fontWeight: 500, wordBreak: "break-all" }}>
                  {url.split("/").pop()}
                </span>
                <span style={{ color: "#8C8F93", fontSize: 13, marginLeft: 8 }}>
                  [{t("已上传")}]
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(idx);
                }}
                style={theme.removeBtn}
                disabled={disabled}
              >
                {t("移除")}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
