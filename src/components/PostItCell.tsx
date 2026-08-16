import React, { useState } from 'react';
import type { LayoutConfig, PostItItem } from '../types';

interface PostItCellProps {
  item: PostItItem;
  layout: LayoutConfig;
  updateItem: (id: number, updates: Partial<PostItItem>) => void;
  showGuideInPrint: boolean;
  isColorMode: boolean;
  onApplyToAll: () => void;
  isFirst: boolean;
}

const PostItCell: React.FC<PostItCellProps> = ({
  item,
  layout,
  updateItem,
  showGuideInPrint,
  isColorMode,
  onApplyToAll,
  isFirst
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // When printing without guide: transparent border, transparent bg
  // When printing with guide: dashed border, transparent bg (or slightly visible if desired, but usually we don't print yellow ink, just border)
  const printGuideClasses = showGuideInPrint
    ? 'print:border-slate-300 print:border-dashed'
    : 'print:border-transparent print:border-none';

  const colorClasses = isColorMode
    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200/50'
    : 'bg-white border-slate-200';

  const zoneColorClasses = isColorMode
    ? 'bg-yellow-200/40'
    : 'bg-slate-100/50';

  const zoneTextClasses = isColorMode
    ? 'text-yellow-600/60'
    : 'text-slate-400';

  return (
    <div 
      className={`relative group flex flex-col border shadow-sm hover:shadow-md transition-shadow print:shadow-none print:bg-none print:bg-transparent ${colorClasses} ${printGuideClasses}`}
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
        className={`absolute top-0 left-0 right-0 h-[15mm] flex items-center justify-center pointer-events-none print:bg-slate-100 ${zoneColorClasses} ${!showGuideInPrint ? 'print:hidden' : ''}`}
      >
        <span className={`text-[10px] font-bold print:text-slate-400 select-none tracking-widest ${zoneTextClasses}`}>
          접착면
        </span>
      </div>

      {/* Editor Toolbar */}
      <div className={`absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-1.5 bg-slate-800/90 backdrop-blur-md shadow-xl border border-slate-700/50 rounded-lg p-1.5 z-20 transition-all duration-200 print:hidden ${isFocused || isFirst ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0'}`}>
        <select 
          aria-label={`${item.id + 1}번 포스트잇 글꼴`}
          className="text-xs font-medium bg-slate-700/50 text-white border-none rounded-md px-2 py-1.5 focus:ring-1 focus:ring-indigo-400 outline-none cursor-pointer"
          value={item.fontFamily}
          onChange={e => updateItem(item.id, { fontFamily: e.target.value })}
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="sans-serif">Sans-Serif</option>
          <option value="serif">Serif</option>
        </select>

        <div className="flex items-center bg-slate-700/50 rounded-md px-1">
          <input 
            type="number" 
            aria-label={`${item.id + 1}번 포스트잇 글자 크기`}
            className="text-xs font-medium bg-transparent text-white border-none w-10 py-1.5 text-center focus:ring-1 focus:ring-indigo-400 outline-none"
            value={item.fontSize}
            onChange={e => updateItem(item.id, { fontSize: Number(e.target.value) })}
            min={8}
            max={120}
          />
          <span className="text-[10px] text-slate-400 pr-2">px</span>
        </div>

        <div className="flex bg-slate-700/50 rounded-md p-0.5 space-x-0.5">
          {['left', 'center', 'right'].map((align) => (
            <button
              key={align}
              className={`p-1.5 rounded-sm transition-colors ${item.textAlign === align ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-600'}`}
              onClick={() => updateItem(item.id, { textAlign: align as PostItItem['textAlign'] })}
              title={`정렬: ${align}`}
              aria-label={`${item.id + 1}번 포스트잇 ${align} 정렬`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {align === 'left' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h16"></path>}
                {align === 'center' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M4 18h16"></path>}
                {align === 'right' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M10 12h10M4 18h16"></path>}
              </svg>
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-slate-600 mx-1"></div>

        <button 
          className="px-3 py-1.5 text-xs font-bold bg-indigo-500 text-white rounded-md hover:bg-indigo-400 transition-colors whitespace-nowrap shadow-sm flex items-center space-x-1"
          onClick={onApplyToAll}
          title="이 칸의 텍스트와 스타일을 모든 칸에 똑같이 적용합니다"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span>일괄 적용</span>
        </button>
      </div>

      {/* Textarea */}
      <textarea
        aria-label={`${item.id + 1}번 포스트잇 내용`}
        className="w-full h-full bg-transparent resize-none focus:outline-none p-3 pt-[18mm] z-0 overflow-hidden leading-snug text-slate-800 placeholder:text-yellow-600/30 print:placeholder:text-transparent print:text-black"
        style={{
          fontSize: `${item.fontSize}px`,
          fontFamily: item.fontFamily,
          textAlign: item.textAlign,
        }}
        value={item.text}
        onChange={e => updateItem(item.id, { text: e.target.value })}
        placeholder="내용 입력..."
      />
    </div>
  );
};

export default PostItCell;
