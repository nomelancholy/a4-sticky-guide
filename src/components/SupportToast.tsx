import { useEffect } from 'react';
import { SUPPORT_URL } from '../data/fonts';

interface SupportToastProps {
  open: boolean;
  onClose: () => void;
}

const AUTO_DISMISS_MS = 12000;

export default function SupportToast({ open, onClose }: SupportToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-40 z-40 mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 pl-4 shadow-2xl shadow-slate-300/60 lg:bottom-6 lg:left-auto lg:right-6 lg:mx-0 print:hidden"
    >
      <svg className="h-5 w-5 shrink-0 text-yellow-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0 1 12 6.6 5.3 5.3 0 0 1 21.3 12C19 16.4 12 21 12 21z" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-slate-900">인쇄가 잘 됐나요?</p>
        <p className="text-xs text-slate-600">도움이 됐다면 무료 도구 운영을 응원해 주세요.</p>
      </div>
      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className="shrink-0 rounded-lg bg-[#FEE500] px-3 py-2 text-xs font-extrabold text-[#191919] transition-colors hover:bg-[#FADA0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500"
        aria-label="카카오페이로 후원하기 (새 탭에서 열림)"
      >
        후원하기
      </a>
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}
