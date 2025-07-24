// 英文语言包
export const en: Record<string, string> = {
  // 余额相关
  余额详情: "Balance Details",
  真实金额: "Real Amount",
  冻结金额: "Frozen Amount",
  总可用: "Total Available",
  暂无数据: "No Data",

  // 充值相关
  "充值 / 转账": "Recharge / Transfer",
  在线充值: "Online Recharge",
  线下转账: "Offline Transfer",
  充值币种: "Recharge Currency",
  充值金额: "Recharge Amount",
  支付平台: "Payment Platform",
  请选择充值币种: "Please select recharge currency",
  请输入充值金额: "Please enter recharge amount",
  请选择支付平台: "Please select payment platform",
  "提交失败，请重试": "Submit failed, please try again",
  "提交中...": "Submitting...",
  去支付: "Go to Pay",
  取消: "Cancel",
  关闭: "Close",

  // 离线转账相关
  第三方支付平台: "Third-party Payment Platform",
  交易ID: "Transaction ID",
  请输入转账交易ID: "Please enter transfer transaction ID",
  上传文件: "Upload Files",
  请上传转账凭证: "Please upload transfer voucher",
  离线充值创建成功: "Offline recharge created successfully",

  // 通用
  "加载中...": "Loading...",
  错误: "Error",
  成功: "Success",
  必填: "Required",

  // 按钮文本
  "充值/转账": "Recharge/Transfer",
  切换为暗黑主题: "Switch to Dark Theme",
  切换为白色主题: "Switch to Light Theme",

  // 上传组件相关
  点击或拖拽文件到此处上传: "Click or drag files here to upload",
  "支持 JPG、PNG、PDF 格式，单个文件不超过 20MB，最多上传":
    "Supports JPG, PNG, PDF formats, single file not exceeding 20MB, maximum",
  个文件: "files can be uploaded",
  "正在上传...": "Uploading...",
  已上传: "Uploaded",
  移除: "Remove",
};

// 根据中文key获取英文文本的函数
export function getEnText(zhKey: string): string {
  return en[zhKey] || zhKey; // 如果找不到英文，返回中文key
}
