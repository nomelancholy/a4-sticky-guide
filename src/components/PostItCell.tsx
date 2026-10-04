import { useState } from 'react';
import type { LayoutConfig, PostItItem, PreviewTone, TextAlign } from '../types';
import { fontGroups } from '../data/fonts';

interface PostItCellProps {
  item: PostItItem;
  layout: LayoutConfig;
  updateItem: (id: number, updates: Partial<PostItItem>) => void;
  showGuideInPrint: boolean;
  previewTone: PreviewTone;
  onApplyToAll: () => void;
  isFirst: boolean;
}

const ALIGN_OPTIONS: { value: TextAlign; label: string; path: string }[] = [
  { value: 'left', label: '왼쪽', path: 'M4 6h16M4 12h10M4 18h16' },
  { value: 'center', label: '가운데', path: 'M4 6h16M7 12h10M4 18h16' },
  { value: 'right', label: '오른쪽', path: 'M4 6h16M10 12h10M4 18h16' },
];

export default function PostItCell({
  item,
  layout,
  updateItem,
  showGuideInPrint,
  previewTone,
  onApplyToAll,
  isFirst,
}: PostItCellProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isColor = previewTone === 'color';
  const isNarrow = layout.postItWidth < 30;

  const printGuideClasses = showGuideInPrint
    ? 'print:border-slate-300 print:border-dashed'
    : 'print:border-transparent print:border-none';

  const colorClasses = isColor
    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200/50'
    : 'bg-white border-slate-200';
  const zoneColorClasses = isColor ? 'bg-yellow-200/40' : 'bg-slate-100/50';
  const zoneTextClasses = isColor ? 'text-yellow-700/70' : 'text-slate-500';

  return (
    <div
      className={`group relative flex flex-col border shadow-sm transition-shadow hover:shadow-md print:bg-none print:bg-transparent print:shadow-none ${colorClasses} ${printGuideClasses}`}
      style={{
        width: `${layout.postItWidth}mm`,
        height: `${layout.postItHeight}mm`,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      tabIndex={-1}
    >
      {/* Sticky Zone Indicator */}
      <div
        className={`pointer-events-none absolute left-0 right-0 top-0 flex items-center justify-center print:bg-slate-100 ${zoneColorClasses} ${
          !showGuideInPrint ? 'print:hidden' : ''
        }`}
        style={{ height: `${layout.stickyZoneMm}mm` }}
      >
        <span
          className={`select-none font-bold print:text-slate-400 ${isNarrow ? 'text-[7px] tracking-normal' : 'text-[10px] tracking-widest'} ${zoneTextClasses}`}
        >
          접착면
        </span>
      </div>

      {/* Editor Toolbar */}
      <div
        className={`absolute -top-12 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center space-x-1.5 rounded-lg border border-slate-700/50 bg-slate-800/90 p-1.5 shadow-xl backdrop-blur-md transition-all duration-200 print:hidden ${
          isFocused || isFirst
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
        }`}
      >
        <select
          aria-label={`${item.id + 1}번 포스트잇 글꼴`}
          className="cursor-pointer rounded-md border-none bg-slate-700/50 px-2 py-1.5 text-xs font-medium text-white outline-none focus:ring-1 focus:ring-indigo-400"
          value={item.fontFamily}
          onChange={(e) => updateItem(item.id, { fontFamily: e.target.value })}
        >
          {fontGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.fonts.map((font) => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>

        <div className="flex items-center rounded-md bg-slate-700/50 px-1">
          <input
            type="number"
            aria-label={`${item.id + 1}번 포스트잇 글자 크기`}
            className="w-10 border-none bg-transparent py-1.5 text-center text-xs font-medium text-white outline-none focus:ring-1 focus:ring-indigo-400"
            value={item.fontSize}
            onChange={(e) => updateItem(item.id, { fontSize: Number(e.target.value) })}
            min={8}
            max={120}
          />
          <span className="pr-2 text-[10px] text-slate-400">px</span>
        </div>

        <div className="flex space-x-0.5 rounded-md bg-slate-700/50 p-0.5">
          {ALIGN_OPTIONS.map(({ value, label, path }) => (
            <button
              key={value}
              type="button"
              className={`rounded-sm p-1.5 transition-colors ${
                item.textAlign === value ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
              onClick={() => updateItem(item.id, { textAlign: value })}
              title={`정렬: ${label}`}
              aria-label={`${item.id + 1}번 포스트잇 ${label} 정렬`}
              aria-pressed={item.textAlign === value}
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
              </svg>
            </button>
          ))}
        </div>

        <div className="mx-1 h-5 w-px bg-slate-600" />

        <button
          type="button"
          className="flex items-center space-x-1 whitespace-nowrap rounded-md bg-indigo-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-indigo-400"
          onClick={onApplyToAll}
          title="이 칸의 텍스트와 스타일을 모든 칸에 똑같이 적용합니다"
        >
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>일괄 적용</span>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        aria-label={`${item.id + 1}번 포스트잇 내용`}
        className={`z-0 h-full w-full resize-none overflow-hidden bg-transparent leading-snug text-slate-800 placeholder:text-slate-400 focus:outline-none print:text-black print:placeholder:text-transparent ${
          isNarrow ? 'px-1' : 'px-3'
        } pb-3`}
        style={{
          paddingTop: `${layout.textTopMm}mm`,
          fontSize: `${item.fontSize}px`,
          fontFamily: item.fontFamily,
          textAlign: item.textAlign,
        }}
        value={item.text}
        onChange={(e) => updateItem(item.id, { text: e.target.value })}
        placeholder={isNarrow ? '' : '내용 입력...'}
      />
    </div>
  );
}
