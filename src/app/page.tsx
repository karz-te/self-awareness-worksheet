// src/app/worksheet/self-awareness/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Step1 } from "@/components/worksheet/Step1";
import { Step2 } from "@/components/worksheet/Step2";
import { Step3 } from "@/components/worksheet/Step3";
import { Step4 } from "@/components/worksheet/Step4";
import { clearFormData, loadFormData, saveFormData } from "@/lib/storage";
import { FormData } from "@/types/FormData";
import { CheerCharacter } from "@/components/worksheet/CheerCharacter";
import classNames from "classnames";

const initialFormData: FormData = {
  step1Scene: "",
  step1Body: "",
  step1Feelings: "",
  step1Intensity: null,
  step2External: "",
  step2Internal: "",
  step2Physical: "",
  step2Social: "",
  step2Fatigue: null,
  step3Reliefs: "",
  step3Awareness: "",
  step3ReliefScore: null,
  step4Name: "",
  step4Guide: "",
  step4Confidence: null,
};

type ToastType = "saved" | "reset" | "none";

export default function SelfAwarenessWorksheet() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [toastType, setToastType] = useState<ToastType>("none");
  const [showToast, setShowToast] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [hasShownCharacter, setHasShownCharacter] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  /** フォーカス時にアクティブステップを更新 */
  const makeOnFocus = (n: number) => () => setActiveStep(n);

  /** ---------- localStorage 読み書き ---------- */
  useEffect(() => {
    // schema が増えても壊れないよう、defaults にマージして復元
    const restored = loadFormData(initialFormData);
    setFormData(restored);
  }, []);

  useEffect(() => {
    saveFormData(formData);
    setToastType((prev) => (prev === "none" ? "saved" : prev));
  }, [formData]);

  useEffect(() => {
    saveFormData(formData);
    if (toastType === "none") {
      setShowToast(true);
      const t1 = setTimeout(() => setShowToast(false), 3000);
      const t2 = setTimeout(() => setToastType("none"), 3500);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [toastType]);

  /** ---------- 完了判定 ---------- */
  const isComplete = Boolean(
    formData.step1Scene.trim().length >= 2 &&
      formData.step1Body.trim().length >= 2 &&
      formData.step1Feelings &&
      formData.step1Intensity !== null &&
      formData.step2External &&
      formData.step2Internal &&
      formData.step2Physical &&
      formData.step2Social &&
      formData.step2Fatigue !== null &&
      formData.step3Reliefs.trim().length >= 2 &&
      formData.step3Awareness &&
      formData.step3ReliefScore !== null &&
      formData.step4Name.trim().length >= 2 &&
      formData.step4Guide.trim().length >= 2 &&
      formData.step4Confidence !== null
  );

  /** ---------- ハンドラ ---------- */
  const handleCelebrate = () => {
    if (!isComplete || hasShownCharacter) return;
    setShowCharacter(true);
    setHasShownCharacter(true);
    setTimeout(() => setShowCharacter(false), 8000);
  };

  const handlePrint = () => window.print();

  const downloadText = (filename: string, content: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadText(
      `self-awareness-${stamp}.json`,
      JSON.stringify(formData, null, 2),
      "application/json;charset=utf-8"
    );
  };

  const handleDownloadMarkdown = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    const md =
      `# わたしだけのセルフアウェアネス設計図\n\n` +
      `## Step 1: いまの思考の暴走を観察する\n` +
      `- 場面: ${formData.step1Scene}\n` +
      `- 感情: ${formData.step1Feelings}\n` +
      `- 身体反応: ${formData.step1Body}\n\n` +
      `- 暴走の強さ(0-10): ${formData.step1Intensity ?? ""}\n` +
      `## Step 2: 見えない要因を探る\n` +
      `- 外部要因: ${formData.step2External}\n` +
      `- 内部要因: ${formData.step2Internal}\n` +
      `- 生理的要因: ${formData.step2Physical}\n` +
      `- 社会的要因: ${formData.step2Social}\n\n` +
      `- 疲労/余裕(0-10): ${formData.step2Fatigue ?? ""}\n` +
      `## Step 3: セルフアウェアネスの芽を見つける\n` +
      `- 楽になれた行動・習慣: ${formData.step3Reliefs}\n` +
      `- 気づきやすい方法: ${formData.step3Awareness}\n\n` +
      `- 楽になれた度(0-10): ${formData.step3ReliefScore ?? ""}\n` +
      `## Step 4: 設計図を描く\n` +
      `- 名前: ${formData.step4Name}\n` +
      `- ガイドメッセージ: ${formData.step4Guide}\n` +
      `- 次回気づけそう度(0-10): ${formData.step4Confidence ?? ""}\n`;

    downloadText(`self-awareness-${stamp}.md`, md, "text/markdown;charset=utf-8");
  };

  const handleReset = () => {
    clearFormData();
    setFormData(initialFormData);
    setToastType("reset");
    setShowToast(true);
    const t1 = setTimeout(() => setShowToast(false), 4000);
    const t2 = setTimeout(() => setToastType("none"), 4500);
    setHasShownCharacter(false);
    setActiveStep(null);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  };

  /** ---------- JSX ---------- */
  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-12 text-gray-800 print:bg-white print:text-black print:px-0 print:py-0">
      <div className="max-w-3xl mx-auto relative">
        <h1 className="text-3xl font-sans font-semibold text-center border-t-2 border-b-2 border-gray-400 py-4 mb-10 leading-tight">
          <span className="block sm:inline">わたしだけの</span>
          <span className="block sm:inline">セルフアウェアネス設計図</span>
        </h1>

        {/* Step カード */}
        <div className="space-y-10">
          <div
            className={classNames(
              "bg-white rounded-xl shadow-xl p-6 print:shadow-none print:border print:border-gray-300 print:rounded-none",
              activeStep === 1 && "ring-2 ring-blue-400"
            )}
          >
            <Step1
              formData={formData}
              setFormData={setFormData}
              onFocus={makeOnFocus(1)}
            />
          </div>
          <div
            className={classNames(
              "bg-white rounded-xl shadow-xl p-6 print:shadow-none print:border print:border-gray-300 print:rounded-none",
              activeStep === 2 && "ring-2 ring-blue-400"
            )}
          >
            <Step2
              formData={formData}
              setFormData={setFormData}
              onFocus={makeOnFocus(2)}
            />
          </div>
          <div
            className={classNames(
              "bg-white rounded-xl shadow-xl p-6 print:shadow-none print:border print:border-gray-300 print:rounded-none",
              activeStep === 3 && "ring-2 ring-blue-400"
            )}
          >
            <Step3
              formData={formData}
              setFormData={setFormData}
              onFocus={makeOnFocus(3)}
            />
          </div>
          <div
            className={classNames(
              "bg-white rounded-xl shadow-xl p-6 print:shadow-none print:border print:border-gray-300 print:rounded-none",
              activeStep === 4 && "ring-2 ring-blue-400"
            )}
          >
            <Step4
              formData={formData}
              setFormData={setFormData}
              onFocus={makeOnFocus(4)}
            />
          </div>
        </div>

        {/* ボタン群 */}
        <div className="mt-10 print:hidden flex flex-wrap justify-end gap-4">
          <button
            onClick={handleCelebrate}
            disabled={!isComplete || hasShownCharacter}
            className={classNames(
              "px-4 py-2 rounded text-white transition-all",
              isComplete && !hasShownCharacter
                ? "bg-green-600 hover:bg-green-700"
                : "bg-green-400 cursor-not-allowed"
            )}
          >
            完了！おつかれさま
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            入力内容をリセット
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-900"
          >
            Markdownで保存
          </button>

          <button
            onClick={handleDownloadJson}
            className="bg-neutral-700 text-white px-4 py-2 rounded hover:bg-neutral-800"
          >
            JSONで保存
          </button>

          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            印刷する
          </button>
        </div>
      </div>

      {/* トースト */}
      {toastType !== "none" && (
        <div
          className={classNames(
            "fixed bottom-8 right-8 bg-gray-800 text-white px-4 py-2 rounded shadow-lg z-50 text-sm transition-opacity duration-500 ease-in-out",
            showToast ? "opacity-100" : "opacity-0"
          )}
        >
          {toastType === "saved"
            ? "このまま閉じても、記録は保持されます"
            : "記録はリセットされました"}
        </div>
      )}

      {showCharacter && <CheerCharacter />}
    </div>
  );
}