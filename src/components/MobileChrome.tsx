import { useEffect } from 'react';
import type { LayoutConfig, PreviewTone } from '../types';
import ActionPanel from './ActionPanel';
import SidebarContent from './SidebarContent';
import Brand from './Brand';

interface MobileChromeProps {
  layouts: LayoutConfig[];
  selectedLayoutId: string;
  onSelectLayout: (id: string) => void;
  showGuideInPrint: boolean;
  onToggleGuide: () => void;
  previewTone: PreviewTone;
  onChangeTone: (tone: PreviewTone) => void;
  onPrint: () => void;
  sheetOpen: boolean;
  onOpenSheet: () => void;
  onCloseSheet: () => void;
}

/** 모바일(lg 미만) 상단 바, 설정 바텀 시트, 하단 고정 액션 바. */
export function MobileHeader({
  layouts,
  selectedLayoutId,
  onOpenSheet,
}: Pick<MobileChromeProps, 'layouts' | 'selectedLayoutId' | 'onOpenSheet'>) {
  const selectedLayout = layouts.find((l) => l.id === selectedLayoutId) || layouts[0];
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-lg lg:hidden print:hidden">
      <Brand compact />
      <button
        type="button"
        onClick={onOpenSheet}
        className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3.5 text-xs font-bold text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        aria-haspopup="dialog"
        aria-expanded={false}
      >
        <span className="max-w-[9rem] truncate">{selectedLayout.name.split(' (')[0]}</span>
        <span className="text-slate-500">{selectedLayout.postItWidth}×{selectedLayout.postItHeight}</span>
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </header>
  );
}

export function MobileActionBar({
  showGuideInPrint,
  onToggleGuide,
  previewTone,
  onChangeTone,
  onPrint,
  onOpenSheet,
}: Pick<MobileChromeProps, 'showGuideInPrint' | 'onToggleGuide' | 'previewTone' | 'onChangeTone' | 'onPrint' | 'onOpenSheet'>) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 rounded-t-2xl border-t border-slate-200 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] lg:hidden print:hidden">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onOpenSheet}
          className="flex min-h-[44px] items-center gap-2 text-xs font-bold text-slate-700"
        >
          <span className="block h-1 w-10 rounded-full bg-slate-300" aria-hidden="true" />
          설정
        </button>
        <button type="button" onClick={onOpenSheet} className="min-h-[44px] text-[11px] font-semibold text-indigo-700">
          사용법 · 1:1 대조 · 제보
        </button>
      </div>
      <ActionPanel
        variant="bar"
        showGuideInPrint={showGuideInPrint}
        onToggleGuide={onToggleGuide}
        previewTone={previewTone}
        onChangeTone={onChangeTone}
        onPrint={onPrint}
      />
    </div>
  );
}

export function MobileSheet({
  layouts,
  selectedLayoutId,
  onSelectLayout,
  sheetOpen,
  onCloseSheet,
}: Pick<MobileChromeProps, 'layouts' | 'selectedLayoutId' | 'onSelectLayout' | 'sheetOpen' | 'onCloseSheet'>) {
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseSheet();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [sheetOpen, onCloseSheet]);

  if (!sheetOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden print:hidden">
      <button
        type="button"
        aria-label="설정 닫기"
        onClick={onCloseSheet}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-sheet-title"
        className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 pb-3 pt-3">
          <span className="block h-1 w-10 rounded-full bg-slate-300" aria-hidden="true" />
          <h2 id="mobile-sheet-title" className="text-sm font-extrabold text-slate-800">설정</h2>
          <button
            type="button"
            onClick={onCloseSheet}
            aria-label="닫기"
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
          <SidebarContent
            layouts={layouts}
            selectedLayoutId={selectedLayoutId}
            onSelectLayout={(id) => {
              onSelectLayout(id);
              onCloseSheet();
            }}
          />
        </div>
      </div>
    </div>
  );
}
