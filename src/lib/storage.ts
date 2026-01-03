import { FormData } from "@/types/FormData";

/**
 * localStorage 永続化ユーティリティ
 * - 将来、項目追加しても壊れないように「version + defaults マージ」を採用
 */

const STORAGE_KEY = "selfAwarenessFormData";
const STORAGE_VERSION = 1;

type StoredPayload = {
  v: number;
  data: Partial<FormData>;
};

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveFormData(data: FormData) {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredPayload = { v: STORAGE_VERSION, data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error("Failed to save data to localStorage:", e);
  }
}

/**
 * defaults を受け取り、保存済みデータを安全にマージして返す
 * - 旧形式（FormData をそのまま保存していた）にも対応
 */
export function loadFormData(defaults: FormData): FormData {
  if (typeof window === "undefined") return defaults;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return defaults;

    const parsed = safeJsonParse(item);
    if (!parsed || typeof parsed !== "object") return defaults;

    // 新形式: { v, data }
    if ("data" in parsed) {
      const p = parsed as StoredPayload;
      return { ...defaults, ...(p.data ?? {}) };
    }

    // 旧形式: FormData を直保存
    return { ...defaults, ...(parsed as Partial<FormData>) };
  } catch (e) {
    console.error("Failed to load data from localStorage:", e);
    return defaults;
  }
}

export function clearFormData() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear localStorage:", e);
  }
}
