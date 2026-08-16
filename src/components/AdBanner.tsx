import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const clientId = 'ca-pub-6300878538210736';
const slotId = import.meta.env.VITE_ADSENSE_SLOT_ID?.trim();
const hasAdSenseConfig = /^ca-pub-\d+$/.test(clientId ?? '') && /^\d+$/.test(slotId ?? '');

function AdBanner() {
  const hasRequestedAd = useRef(false);

  useEffect(() => {
    if (!import.meta.env.PROD || !hasAdSenseConfig || hasRequestedAd.current) {
      return;
    }

    hasRequestedAd.current = true;

    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch (error) {
      console.error('AdSense 광고를 요청하지 못했습니다.', error);
    }
  }, []);

  if (import.meta.env.DEV) {
    return (
      <aside
        className="ad-container mb-8 w-full max-w-[728px] min-h-24 rounded-xl border border-dashed border-slate-300 bg-white/70 px-4 py-5 text-center print:hidden"
        aria-label="광고 영역 미리보기"
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">광고</p>
        <p className="mt-2 text-xs font-medium text-slate-500">
          AdSense 광고 영역 · 프로덕션 환경에서만 광고를 요청합니다
        </p>
      </aside>
    );
  }

  if (!hasAdSenseConfig) {
    return null;
  }

  return (
    <aside className="ad-container mb-8 w-full max-w-[728px] min-h-24 print:hidden" aria-label="광고">
      <p className="mb-1 text-center text-[10px] font-medium tracking-wider text-slate-400">광고</p>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={clientId}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

export default AdBanner;
