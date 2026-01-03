// src/components/worksheet/Step1.tsx

import { FormData } from "@/types/FormData";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";

/**
 * Step1 — フィードバック + フォーカスガイド + バリデーション
 */

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onFocus: () => void; // 親から渡されるフォーカスハイライト用
};

const scoreOptions = Array.from({ length: 11 }, (_, i) => i);

export function Step1({ formData, setFormData, onFocus }: Props) {
  const feelings = ["不安", "怒り", "悲しみ", "焦り", "孤独", "その他"];
  const inputFocus = "transition focus:outline-none focus:bg-indigo-50 focus:ring-indigo-400";

  // 感情に応じたフィードバック
  const feedbackMap: Record<string, string> = {
    不安: "不安があるのは、何かを大切にしたい気持ちがあるからかもしれません。まずは、その気持ちに静かに寄り添ってみても大丈夫です。",
    怒り: "怒りは、あなたにとって譲れない大切な価値がある証かもしれません。少し立ち止まって、その奥にある気持ちを感じてみましょう。",
    悲しみ: "悲しみは、失ったものや心が触れた証。その感情があることは、あなたが豊かに感じているということかもしれません。",
    焦り: "焦りを感じるのは、前に進みたい気持ちがあるから。今できることを、小さく一つだけ選んでみるのも良いかもしれません。",
    孤独: "孤独を感じたときは、自分との静かな時間がはじまるサインかもしれません。今ここにいる自分と、そっとつながってみましょう。",
    その他: "うまく言葉にできない感情も、確かに存在しています。どんな感情も、大切に扱ってみてくださいね。",
  };

  /* ----- 即時バリデーション ----- */
  const [touched, setTouched] = useState({ scene: false, body: false, intensity: false });
  const sceneError = touched.scene && formData.step1Scene.trim().length < 2;
  const bodyError = touched.body && formData.step1Body.trim().length < 2;
  const intensityError = touched.intensity && formData.step1Intensity === null;

  /* ----- Render ----- */
  return (
    <section className="mb-8">
      <h2 className="text-xl font-medium mb-2 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-yellow-500" />
        Step 1: いまの”思考の暴走”を観察する
      </h2>

      {/* 場面入力 */}
      <label className="block mb-2 font-semibold">思考が止まらなくなった場面</label>
      <textarea
        className={`w-full h-28 p-2 border rounded-md ${sceneError ? "border-red-500" : "border-gray-300"}`}
        placeholder="例：夜眠れなかった、相手の一言が頭から離れなかった など"
        value={formData.step1Scene}
        onFocus={onFocus}
        onChange={(e) => setFormData((p) => ({ ...p, step1Scene: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, scene: true }))}
      />
      {sceneError && <p className="text-xs text-red-500 mt-1">2文字以上で入力してください</p>}

      {/* 感情選択 */}
      <label className="block mt-6 mb-2 font-semibold">そのときの感情（ひとつ選択）</label>
      <div className="space-y-2">
        {feelings.map((feeling) => (
          <label key={feeling} className="block">
            <input
              type="radio"
              name="step1Feelings"
              className={`mr-2 ${inputFocus}`}
              value={feeling}
              checked={formData.step1Feelings === feeling}
              onFocus={onFocus}
              onChange={(e) => setFormData((p) => ({ ...p, step1Feelings: e.target.value }))}
            />
            {feeling}
          </label>
        ))}
        {formData.step1Feelings && (
          <p className="text-sm text-blue-600 mt-2">
            {feedbackMap[formData.step1Feelings]}
          </p>
        )}
      </div>

      <label className="block mt-6 mb-2 font-semibold">暴走の強さ（0〜10）</label>
      <select
        className={`w-full p-2 border rounded-md ${intensityError ? "border-red-500" : "border-gray-300"}`}
        value={formData.step1Intensity === null ? "" : String(formData.step1Intensity)}
        onFocus={onFocus}
        onChange={(e) => {
          const v = e.target.value === "" ? null : Number(e.target.value);
          setFormData((p) => ({ ...p, step1Intensity: v }));
        }}
        onBlur={() => setTouched((t) => ({ ...t, intensity: true }))}
      >
        <option value="">選択してください</option>
        {scoreOptions.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      {intensityError && <p className="text-xs text-red-500 mt-1">0〜10で選択してください</p>}
      <p className="text-xs text-gray-500 mt-1">0=ほぼ落ち着いている / 10=制御不能に近い</p>


      {/* 身体反応 */}
      <label className="block mt-6 mb-2 font-semibold">身体に出た反応：自由記述（無い場合は「なし」と入力）</label>
      <textarea
        className={`w-full h-20 p-2 border rounded-md ${bodyError ? "border-red-500" : "border-gray-300"}`}
        placeholder="例：胸が苦しくなる、呼吸が浅くなる、手が冷たくなる など"
        value={formData.step1Body}
        onFocus={onFocus}
        onChange={(e) => setFormData((p) => ({ ...p, step1Body: e.target.value }))}
        onBlur={() => setTouched((t) => ({ ...t, body: true }))}
      />
      {bodyError && <p className="text-xs text-red-500 mt-1">2文字以上で入力してください</p>}
    </section>
  );
}
