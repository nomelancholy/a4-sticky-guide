import { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import A4Canvas from './components/A4Canvas';
import AdBanner from './components/AdBanner';
import GuideContent from './components/GuideContent';
import SiteFooter from './components/SiteFooter';
import PrintWarningModal from './components/PrintWarningModal';
import LayoutChangeDialog from './components/LayoutChangeDialog';
import SupportToast from './components/SupportToast';
import { MobileActionBar, MobileHeader, MobileSheet } from './components/MobileChrome';
import type { LayoutConfig, PostItItem, PreviewTone } from './types';
import { layouts } from './data/layouts';
import { DEFAULT_FONT_FAMILY } from './data/fonts';

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_TEXT_ALIGN = 'left';
const SUPPORT_TOAST_SESSION_KEY = 'a4sg:support-toast-shown';

const findLayout = (layoutId: string): LayoutConfig =>
  layouts.find((candidate) => candidate.id === layoutId) ?? layouts[0];

const createItems = (layout: LayoutConfig): PostItItem[] =>
  Array.from({ length: layout.cols * layout.rows }, (_, index) => ({
    id: index,
    text: '',
    fontSize: DEFAULT_FONT_SIZE,
    fontFamily: DEFAULT_FONT_FAMILY,
    textAlign: DEFAULT_TEXT_ALIGN,
  }));

const hasText = (item: PostItItem) => item.text.trim().length > 0;

function App() {
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>(layouts[0].id);
  const [items, setItems] = useState<PostItItem[]>(() => createItems(layouts[0]));
  const [showGuideInPrint, setShowGuideInPrint] = useState(true);
  const [previewTone, setPreviewTone] = useState<PreviewTone>('mono');
  const [pendingLayoutId, setPendingLayoutId] = useState<string | null>(null);
  const [showPrintWarning, setShowPrintWarning] = useState(false);
  const [showSupportToast, setShowSupportToast] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const selectedLayout = findLayout(selectedLayoutId);
  const pendingLayout = pendingLayoutId ? findLayout(pendingLayoutId) : null;

  // --- 규격 변경: 내용이 있으면 확인 후 유지/초기화 ---
  const applyLayout = useCallback(
    (layoutId: string, mode: 'reset' | 'keep') => {
      const layout = findLayout(layoutId);
      const nextItems = createItems(layout);
      if (mode === 'keep') {
        items.slice(0, nextItems.length).forEach((item, index) => {
          nextItems[index] = { ...item, id: index };
        });
      }
      setSelectedLayoutId(layout.id);
      setItems(nextItems);
      setPendingLayoutId(null);
    },
    [items],
  );

  const requestLayoutChange = (layoutId: string) => {
    if (layoutId === selectedLayoutId) return;
    if (items.some(hasText)) {
      setPendingLayoutId(layoutId);
    } else {
      applyLayout(layoutId, 'reset');
    }
  };

  const filledCount = items.filter(hasText).length;
  const keptCount = pendingLayout
    ? items.slice(0, pendingLayout.cols * pendingLayout.rows).filter(hasText).length
    : 0;

  // --- 셀 편집 ---
  const updateItem = (id: number, updates: Partial<PostItItem>) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const applyToAll = (sourceId: number) => {
    const sourceItem = items.find((i) => i.id === sourceId);
    if (!sourceItem) return;
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        fontSize: sourceItem.fontSize,
        fontFamily: sourceItem.fontFamily,
        textAlign: sourceItem.textAlign,
        text: sourceItem.text,
      })),
    );
  };

  // --- 인쇄: 설정 안내 → 웹폰트 로드 대기 → window.print() → 후원 토스트 ---
  const confirmPrint = async () => {
    setShowPrintWarning(false);
    setSheetOpen(false);
    try {
      await document.fonts.ready;
    } catch {
      // 폰트 API가 없는 브라우저는 그대로 진행한다.
    }
    await new Promise((resolve) => window.setTimeout(resolve, 120));
    window.print();
  };

  useEffect(() => {
    const onAfterPrint = () => {
      let alreadyShown = false;
      try {
        alreadyShown = window.sessionStorage.getItem(SUPPORT_TOAST_SESSION_KEY) === '1';
        if (!alreadyShown) window.sessionStorage.setItem(SUPPORT_TOAST_SESSION_KEY, '1');
      } catch {
        // 비공개 창 등에서는 세션 저장이 막힐 수 있다. 그 경우 매번 보여준다.
      }
      if (!alreadyShown) setShowSupportToast(true);
    };
    window.addEventListener('afterprint', onAfterPrint);
    return () => window.removeEventListener('afterprint', onAfterPrint);
  }, []);

  const closeSupportToast = useCallback(() => setShowSupportToast(false), []);
  const openSheet = useCallback(() => setSheetOpen(true), []);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const controlProps = {
    showGuideInPrint,
    onToggleGuide: () => setShowGuideInPrint((prev) => !prev),
    previewTone,
    onChangeTone: setPreviewTone,
    onPrint: () => setShowPrintWarning(true),
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900 lg:flex-row">
      <Sidebar
        layouts={layouts}
        selectedLayoutId={selectedLayoutId}
        onSelectLayout={requestLayoutChange}
        {...controlProps}
      />

      <MobileHeader layouts={layouts} selectedLayoutId={selectedLayoutId} onOpenSheet={openSheet} />

      <main className="flex w-full flex-1 flex-col items-center overflow-auto bg-gradient-to-br from-slate-100 via-slate-50 to-gray-200 px-4 pb-44 pt-5 lg:px-8 lg:py-12 print:bg-white print:p-0">
        <div className="mb-4 flex w-full max-w-[210mm] items-center justify-between lg:mb-6 lg:max-w-4xl print:hidden">
          <h2 className="text-lg font-bold tracking-tight text-slate-700 lg:text-xl">미리보기 (Preview)</h2>
          <div className="rounded-full border border-slate-100 bg-white px-3 py-1.5 text-xs text-slate-600 shadow-sm lg:px-4 lg:py-2 lg:text-sm">
            A4 기준 • {selectedLayout.a4Orientation === 'landscape' ? '가로 방향' : '세로 방향'}
          </div>
        </div>

        <AdBanner />

        <A4Canvas
          layout={selectedLayout}
          items={items}
          updateItem={updateItem}
          showGuideInPrint={showGuideInPrint}
          previewTone={previewTone}
          onApplyToAll={applyToAll}
        />

        <p className="mt-3 text-center text-xs text-slate-600 lg:hidden print:hidden">
          칸을 누르면 편집 도구가 나타납니다. 화면에서는 축소되어 보여도 인쇄는 실제 크기로 됩니다.
        </p>

        <GuideContent />
        <SiteFooter />
      </main>

      <MobileActionBar {...controlProps} onOpenSheet={openSheet} />
      <MobileSheet
        layouts={layouts}
        selectedLayoutId={selectedLayoutId}
        onSelectLayout={requestLayoutChange}
        sheetOpen={sheetOpen}
        onCloseSheet={closeSheet}
      />

      <PrintWarningModal open={showPrintWarning} onCancel={() => setShowPrintWarning(false)} onConfirm={confirmPrint} />
      <LayoutChangeDialog
        target={pendingLayout}
        filledCount={filledCount}
        keptCount={keptCount}
        onCancel={() => setPendingLayoutId(null)}
        onReset={() => pendingLayoutId && applyLayout(pendingLayoutId, 'reset')}
        onKeep={() => pendingLayoutId && applyLayout(pendingLayoutId, 'keep')}
      />
      <SupportToast open={showSupportToast} onClose={closeSupportToast} />
    </div>
  );
}

export default App;
