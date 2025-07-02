// src/components/worksheet/Step4.tsx

import { FormData } from "@/types/FormData";
import { Compass } from "lucide-react";
import { useState } from "react";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onFocus: () => void; // フォーカスガイド用
};

export function Step4({ formData, setFormData, onFocus }: Props) {
  /* ---------------- バリデーション ---------------- */
  const [touched, setTouched] = useState({ name: false, guide: false });
  const nameError = touched.name && formData.step4Name.trim().length < 2; // 2文字以上
  const guideError = touched.guide && formData.step4Guide.trim().length < 5; // 5文字以上

  return (
    <section className="mb-8">
      <h2 className="text-xl font-medium mb-2 flex items-center gap-2">
        <Compass className="w-5 h-5 text-indigo-500" />
        Step 4: わたしだけのセルフアウェアネス設計図を描く
      </h2>

      {/* 名前 */}
      <label className="block mb-2 font-semibold">あなたの名前（ニックネームでもOK）</label>
      <input
        type="text"
        className={`w-full p-2 border rounded-md ${nameError ? "border-red-500" : "border-gray-300"}`}
        placeholder="例：あおい、自分、○○さん"
        value={formData.step4Name}
        onFocus={onFocus}
        onChange={(e) => setFormData((p) => ({ ...p, step4Name: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
      />
      {nameError && (
        <p className="text-xs text-red-500 mt-1">2文字以上で入力してください</p>
      )}

      {/* ガイドメッセージ */}
      <label className="block mt-6 mb-2 font-semibold">あなた自身へのガイドメッセージ</label>
      <textarea
        className={`w-full h-28 p-2 border rounded-md ${guideError ? "border-red-500" : "border-gray-300"}`}
        placeholder="例：不安になったときは、深呼吸してこのワークを思い出してみよう。"
        value={formData.step4Guide}
        onFocus={onFocus}
        onChange={(e) => setFormData((p) => ({ ...p, step4Guide: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, guide: true }))}
      />
      {guideError && (
        <p className="text-xs text-red-500 mt-1">5文字以上で入力してください</p>
      )}
    </section>
  );
}
