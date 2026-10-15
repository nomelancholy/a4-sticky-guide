import type { PreviewTone } from '../types';
import { SUPPORT_URL } from '../data/fonts';

interface ActionPanelProps {
  showGuideInPrint: boolean;
  onToggleGuide: () => void;
  previewTone: PreviewTone;
  onChangeTone: (tone: PreviewTone) => void;
  onPrint: () => void;
  /** 'sidebar'는 데스크톱 사이드바 하단, 'bar'는 모바일 고정 바 */
  variant: 'sidebar' | 'bar';
}

const PrinterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v7H6z" />
  </svg>
);

function ToneSegment({ previewTone, onChangeTone }: Pick<ActionPanelProps, 'previewTone' | 'onChangeTone'>) {
  const options: { value: PreviewTone; label: string; swatch: string }[] = [
    { value: 'mono', label: '흑백', swatch: 'bg-slate-200 border-slate-400' },
    { value: 'color', label: '컬러', swatch: 'bg-yellow-200 border-yellow-600' },
  ];
  return (
    <div
      role="radiogroup"
      aria-label="화면 미리보기 색상"
      className="inline-flex w-full overflow-hidden rounded-lg border border-slate-300 text-xs font-bold"
    >
      {options.map(({ value, label, swatch }) => {
        const active = previewTone === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChangeTone(value)}
            className={`flex flex-1 items-center justify-center gap-1.5 py-2 transition-colors ${
              active ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className={`h-3 w-3 rounded-sm border ${swatch}`} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function GuideSwitch({ showGuideInPrint, onToggleGuide, withHint }: Pick<ActionPanelProps, 'showGuideInPrint' | 'onToggleGuide'> & { withHint: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3">
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-bold text-slate-800">가이드선 인쇄</span>
        {withHint && (
          <span className="text-[11px] leading-snug text-slate-600">시험 인쇄 때 켜고, 포스트잇을 붙인 뒤에는 끄세요</span>
        )}
      </span>
      <span className="relative inline-flex shrink-0">
        <input
          type="checkbox"
          role="switch"
          aria-checked={showGuideInPrint}
          checked={showGuideInPrint}
          onChange={onToggleGuide}
          className="peer sr-only"
        />
        <span className="h-6 w-10 rounded-full bg-slate-300 transition-colors peer-checked:bg-indigo-600 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2" aria-hidden="true" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" aria-hidden="true" />
      </span>
    </label>
  );
}

export default function ActionPanel({
  showGuideInPrint,
  onToggleGuide,
  previewTone,
  onChangeTone,
  onPrint,
  variant,
}: ActionPanelProps) {
  const printButton = (
    <button
      type="button"
      onClick={onPrint}
      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-base font-extrabold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 active:scale-[0.98]"
    >
      <PrinterIcon />
      인쇄하기
    </button>
  );

  if (variant === 'bar') {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white px-3">
            <GuideSwitch showGuideInPrint={showGuideInPrint} onToggleGuide={onToggleGuide} withHint={false} />
          </div>
          <ToneSegment previewTone={previewTone} onChangeTone={onChangeTone} />
        </div>
        {printButton}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {printButton}

      <div className="space-y-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3">
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">인쇄 옵션</p>
          <GuideSwitch showGuideInPrint={showGuideInPrint} onToggleGuide={onToggleGuide} withHint />
        </div>
        <div className="h-px bg-slate-200" />
        <div className="space-y-2">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
            화면 미리보기 색상 <span className="font-medium normal-case tracking-normal">· 인쇄 결과와 무관</span>
          </p>
          <ToneSegment previewTone={previewTone} onChangeTone={onChangeTone} />
        </div>
      </div>

      <a
        href={SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] px-4 py-3 text-base font-extrabold text-black shadow-md shadow-yellow-200/60 transition-colors hover:bg-[#FADA0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        aria-label="카카오페이로 후원하기 (새 탭에서 열림)"
      >
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21s-7-4.6-9.3-9A5.3 5.3 0 0 1 12 6.6 5.3 5.3 0 0 1 21.3 12C19 16.4 12 21 12 21z" />
        </svg>
        카카오페이로 후원하기
      </a>
    </div>
  );
}
