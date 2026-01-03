"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";

/**
 * CheerCharacter – MP4 版
 * --------------------------------------------------
 * `/public/animations/animate1.mp4` を再生するだけの軽量版。
 * - autoPlay / loop / muted / playsInline
 * - 0.6s ポップイン → 4s 表示 → フェードアウト
 */

export function CheerCharacter() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFade(true), 8000); // 4 秒後にフェード
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={classNames(
        "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-700",
        fade ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg text-center cheer-pop select-none">
        {/* MP4 アニメーション */}
        <video
          src="/animations/animate1.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-40 h-40 mx-auto"
        />

        <p className="mt-4 text-lg font-semibold text-gray-800">
          おつかれさま！ 最後までたどり着いたね 🌱
        </p>
      </div>

      {/* ポップイン keyframes */}
      <style jsx>{`
        @keyframes cheer-pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          60% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .cheer-pop {
          animation: cheer-pop 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}


