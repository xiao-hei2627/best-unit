import { getZhText, zh } from "./zh";
import { getEnText, en } from "./en";

export type Locale = "zh" | "en";

const locales = {
  zh,
  en,
};

// 获取当前语言
export function getCurrentLocale(): Locale {
  const fundUnitParams = JSON.parse(
    sessionStorage.getItem("fund_unit_params") || "{}"
  );
  return fundUnitParams.locale || "zh";
}

// 获取国际化文本
export function getLocaleText() {
  const locale = getCurrentLocale();
  return locales[locale];
}

// 获取指定语言的文本
export function getLocaleTextByLang(locale: Locale) {
  return locales[locale];
}

// 使用中文key的t函数
export function t(zhKey: string): string {
  const locale = getCurrentLocale();

  if (locale === "zh") {
    return getZhText(zhKey);
  } else {
    return getEnText(zhKey);
  }
}

// 导出所有语言包
export { zh, en };
