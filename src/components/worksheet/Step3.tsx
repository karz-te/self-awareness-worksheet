// src/components/worksheet/Step3.tsx

import { FormData } from "@/types/FormData";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onFocus: () => void;
};

export function Step3({ formData, setFormData, onFocus }: Props) {
  const awarenessMethods = [
    "書く（メモ・日記など）",
    "話す（信頼できる人との対話）",
    "感じる（呼吸・身体の感覚）",
    "観察する（自然や風景を眺める）",
    "その他",
  ];

  /* ---------------- バリデーション ---------------- */
  const [touched, setTouched] = useState({ relief: false, awareness: false });
  const reliefError = touched.relief && formData.step3Reliefs.trim().length < 5;
  const awarenessError = touched.awareness && formData.step3Awareness === "";

  const handleReliefBlur = () => setTouched((t) => ({ ...t, relief: true }));
  const handleAwarenessChange = (value: string) => {
    setFormData((p) => ({ ...p, step3Awareness: value }));
    setTouched((t) => ({ ...t, awareness: true }));
  };

  const inputFocus = "transition focus:outline-none focus:bg-indigo-50 focus:ring-indigo-400";

  /* ---------------- Render ---------------- */
  return (
    <section className="mb-8">
      <h2 className="text-xl font-medium mb-2 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-400" />
        Step 3: セルフアウェアネスの”芽”を見つける
      </h2>

      {/* 行動・習慣 */}
      <label className="block mb-2 font-semibold">少し楽になれた行動・習慣（自由記述）</label>
      <textarea
        className={`w-full h-24 p-2 border rounded-md ${reliefError ? "border-red-500" : "border-gray-300"}`}
        placeholder="例：深呼吸した、日記を書いた、誰かに話した など"
        value={formData.step3Reliefs}
        onFocus={onFocus}
        onChange={(e) => setFormData((p) => ({ ...p, step3Reliefs: e.target.value }))}
        onBlur={handleReliefBlur}
      />
      {reliefError && <p className="text-xs text-red-500 mt-1">5文字以上で入力してください</p>}

      {/* 気づきやすい方法 */}
      <label className="block mt-6 mb-2 font-semibold">自分が”気づきやすい”方法（１つ選んでください）</label>
      <div className="space-y-2">
        {awarenessMethods.map((method) => (
          <label key={method} className="block">
            <input
              type="radio"
              name="step3Awareness"
              className={`mr-2 ${inputFocus}`}
              value={method}
              checked={formData.step3Awareness === method}
              onFocus={onFocus}
              onChange={() => handleAwarenessChange(method)}
            />
            {method}
          </label>
        ))}
      </div>
      {awarenessError && (
        <p className="text-xs text-red-500 mt-1">どれか 1 つ選択してください</p>
      )}
    </section>
  );
}

