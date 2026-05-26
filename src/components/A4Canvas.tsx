import React from 'react';
import type { LayoutConfig, PostItItem } from '../types';
import PostItCell from './PostItCell';

interface A4CanvasProps {
  layout: LayoutConfig;
  items: PostItItem[];
  updateItem: (id: number, updates: Partial<PostItItem>) => void;
  showGuideInPrint: boolean;
  onApplyToAll: (id: number) => void;
}

const A4Canvas: React.FC<A4CanvasProps> = ({
  layout,
  items,
  updateItem,
  showGuideInPrint,
  onApplyToAll
}) => {
  const isLandscape = layout.a4Orientation === 'landscape';
  
  // A4 dimensions: 210mm x 297mm
  const a4Width = isLandscape ? '297mm' : '210mm';
  const a4Height = isLandscape ? '210mm' : '297mm';

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`,
  };

  return (
    <div 
      className="relative bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] print:shadow-none print:m-0 flex flex-col mx-auto border border-slate-300 print:border-none print:border-0 rounded-sm print:rounded-none overflow-hidden"
      style={{
        width: a4Width,
        height: a4Height,
      }}
    >
      {/* Feed Indicator */}
      <div 
        className={`absolute top-0 w-full flex items-center justify-center pt-3 text-slate-400 select-none ${
          !showGuideInPrint ? 'print:hidden' : ''
        }`}
      >
        <div className="flex items-center space-x-2 bg-slate-50/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-100 shadow-sm print:bg-transparent print:border-none print:shadow-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
          <span className="text-xs font-bold tracking-wide">프린터 급지 방향 (종이가 들어가는 쪽)</span>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 p-[10mm] w-full h-full flex items-center justify-center pt-[20mm]">
        <div 
          className={layout.gap || 'gap-[3mm]'} 
          style={gridStyle}
        >
          {items.map((item, index) => (
            <PostItCell
              key={item.id}
              item={item}
              layout={layout}
              updateItem={updateItem}
              showGuideInPrint={showGuideInPrint}
              onApplyToAll={() => onApplyToAll(item.id)}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default A4Canvas;
