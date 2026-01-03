// src/components/worksheet/Step2.tsx

import { FormData } from "@/types/FormData";
import { Eye } from "lucide-react";

/**
 * Step2 — 見えない要因を探る
 * - カテゴリごとに 1 つ選択
 * - 選択に応じたフィードバック表示
 * - onFocus で親のフォーカスガイドを更新
 */

type Props = {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onFocus: () => void;
};

const scoreOptions = Array.from({ length: 11 }, (_, i) => i);

export function Step2({ formData, setFormData, onFocus }: Props) {
  const factors = [
    {
      category: "外部要因",
      key: "step2External",
      items: ["環境や視覚・聴覚などの刺激", "他人の言葉や意見の影響"],
    },
    {
      category: "内部要因",
      key: "step2Internal",
      items: [
        "感情の揺れ（怒り・不安など）",
        "過去の記憶・体験の再生",
        "自分の価値観・信念",
      ],
    },
    {
      category: "生理的要因",
      key: "step2Physical",
      items: ["睡眠不足や疲労", "ホルモンバランスや空腹など"],
    },
    {
      category: "社会的要因",
      key: "step2Social",
      items: ["常識や文化・社会通念", "集団圧力や周囲の空気", "SNSやメディアの影響"],
    },
  ] as const;

  const feedbackMap: Record<string, string> = {
    "環境や視覚・聴覚などの刺激": "まわりの風景や音が、思考のきっかけになることがあります。気づかないうちに影響を受けているかもしれません。",
    "他人の言葉や意見の影響": "言葉は強い力を持ちます。誰の声に耳を傾けたか、改めて見直すこともヒントになります。",
    "感情の揺れ（怒り・不安など）": "強く揺れた感情は、あなたにとって大切な何かを守ろうとしているサインかもしれません。",
    "過去の記憶・体験の再生": "過去の体験が、今の考え方に影響していることはよくあります。その記憶に優しく気づいてみましょう。",
    "自分の価値観・信念": "自分の信じていることが、思考の軸になっていることがあります。それに気づくことは、とても大きな一歩です。",
    "睡眠不足や疲労": "身体が疲れていると、思考も悲観的になりやすいもの。まずは休息を。",
    "ホルモンバランスや空腹など": "体の状態は、思考にも影響します。整えることが第一歩になることもあります。",
    "常識や文化・社会通念": "『当たり前』と思っていたことが、実は選択を縛っているかもしれません。",
    "集団圧力や周囲の空気": "“空気”に合わせることが続くと、自分の声が聞こえにくくなることも。少し距離をとっても大丈夫です。",
    "SNSやメディアの影響": "情報の多さが、思考を刺激しすぎているかもしれません。一度手放す時間を作ってみましょう。",
  };

  const inputFocus = "transition focus:outline-none focus:bg-indigo-50 focus:ring-indigo-400";

  return (
    <section className="mb-8">
      <h2 className="text-xl font-medium mb-2 flex items-center gap-2">
        <Eye className="w-5 h-5 text-blue-500" />
        Step 2: 見えない要因を探る
      </h2>

      <p className="mb-2">各カテゴリごとに、最も当てはまるものを 1 つ選んでください。</p>

      <div className="space-y-4">
        {factors.map((group) => {
          const selected = formData[group.key];
          return (
            <div key={group.category}>
              <label className="block font-semibold mb-1">{group.category}</label>

              {group.items.map((item) => (
                <label key={item} className="block">
                  <input
                    type="radio"
                    name={group.key}
                    className={`mr-2 ${inputFocus}`}
                    value={item}
                    checked={selected === item}
                    onFocus={onFocus}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, [group.key]: e.target.value }))
                    }
                  />
                  {item}
                </label>
              ))}

              {selected && (
                <p className="text-sm text-blue-600 mt-2">
                  {feedbackMap[selected as string]}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <label className="block mt-6 mb-2 font-semibold">疲労/余裕（0〜10）</label>
      <select
        className="w-full p-2 border rounded-md border-gray-300"
        value={formData.step2Fatigue === null ? "" : String(formData.step2Fatigue)}
        onFocus={onFocus}
        onChange={(e) => {
          const v = e.target.value === "" ? null : Number(e.target.value);
          setFormData((p) => ({ ...p, step2Fatigue: v }));
        }}
      >
        <option value="">選択してください</option>
        {scoreOptions.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-1">0=余裕あり / 10=かなり消耗している</p>
      </section>
  );
}