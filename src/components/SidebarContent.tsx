import type { LayoutConfig } from '../types';
import { ISSUES_URL } from '../data/fonts';

interface SidebarContentProps {
  layouts: LayoutConfig[];
  selectedLayoutId: string;
  onSelectLayout: (id: string) => void;
}

/** 사용법, 규격 선택, 1:1 대조, 피드백. 데스크톱 사이드바와 모바일 시트가 공유한다. */
export default function SidebarContent({ layouts, selectedLayoutId, onSelectLayout }: SidebarContentProps) {
  const selectedLayout = layouts.find((l) => l.id === selectedLayoutId) || layouts[0];

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 shadow-sm">
        <h2 className="mb-3 flex items-center text-sm font-bold text-indigo-800">
          <span className="mr-2" aria-hidden="true">💡</span> 이렇게 사용하세요!
        </h2>
        <ol className="space-y-3 text-xs font-medium leading-relaxed text-indigo-900/80">
          {[
            <><strong>빈 A4 용지</strong>에 현재 가이드라인을 먼저 인쇄하세요. <br /><span className="text-indigo-600/70">(가이드선 인쇄 체크 필수)</span></>,
            <>출력된 종이의 <strong>접착면 가이드</strong>에 맞춰 실제 포스트잇을 붙이세요.</>,
            <>화면에서 내용을 작성한 후, 포스트잇이 붙은 A4 용지를 프린터에 넣고 <strong>다시 인쇄</strong>하세요.</>,
          ].map((content, index) => (
            <li key={index} className="flex gap-2">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-200 text-indigo-800">{index + 1}</span>
              <span>{content}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-800">1. 포스트잇 규격 선택</h2>
        <div className="grid grid-cols-1 gap-3">
          {layouts.map((layout) => {
            const isSelected = selectedLayoutId === layout.id;
            return (
              <label
                key={layout.id}
                className={`relative flex cursor-pointer flex-col rounded-xl border-2 p-4 transition-all duration-200 ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/30 shadow-md shadow-indigo-100'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>
                    {layout.name.split(' (')[0]}
                  </span>
                  <input
                    type="radio"
                    name="layout"
                    value={layout.id}
                    checked={isSelected}
                    onChange={() => onSelectLayout(layout.id)}
                    className="h-4 w-4 rounded-full border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="rounded-md border border-slate-100 bg-white px-2 py-1 font-medium text-slate-500 shadow-sm">
                    {layout.postItWidth} × {layout.postItHeight} mm
                  </span>
                  <span className="text-slate-500">{(layout.description || '').split(' (')[0]}</span>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-4 flex w-full items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">모니터 실물 사이즈 대조</h2>
          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600">1:1 모니터 비교</span>
        </div>
        <p className="mb-4 px-2 text-center text-xs text-slate-500">
          가이드에 실제 포스트잇을 직접 대어보고 크기가 맞는지 확인해 보세요.
        </p>
        <div
          className="relative flex max-w-full items-center justify-center rounded-sm border-2 border-dashed border-indigo-400 bg-indigo-50/50 shadow-sm"
          style={{
            width: `${selectedLayout.postItWidth}mm`,
            height: `${selectedLayout.postItHeight}mm`,
          }}
        >
          <span className="select-none whitespace-nowrap text-[10px] font-bold text-indigo-400/80 rotate-[-15deg]">
            {selectedLayout.postItWidth < 30 ? '' : '여기에 포스트잇을 대보세요'}
          </span>
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 border-b border-dashed border-indigo-200 bg-yellow-200/50"
            style={{ height: `${selectedLayout.stickyZoneMm}mm` }}
          />
        </div>
        <p className="mt-3 text-center text-[10px] text-slate-500">
          * 모니터 해상도(DPI) 설정에 따라 1~2mm의 오차가 발생할 수 있습니다.
        </p>
      </section>

      <section className="flex flex-col items-center rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
        <span className="mb-2 text-3xl drop-shadow-sm" aria-hidden="true">💬</span>
        <h2 className="mb-1 text-sm font-extrabold text-amber-900">더 나은 가이드를 함께 만들어요</h2>
        <p className="mb-4 text-center text-xs font-medium leading-relaxed text-amber-700/90">
          맞지 않는 규격이나 인쇄 오류가 있다면<br />GitHub에서 알려주세요.
        </p>
        <a
          href={ISSUES_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 font-bold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow active:scale-[0.98]"
        >
          <span className="tracking-tight">오류 제보 및 기능 제안</span>
        </a>
      </section>
    </div>
  );
}
