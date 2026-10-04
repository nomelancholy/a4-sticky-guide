import { useEffect, useRef, useState } from 'react';
import type { LayoutConfig, PostItItem, PreviewTone } from '../types';
import PostItCell from './PostItCell';

interface A4CanvasProps {
  layout: LayoutConfig;
  items: PostItItem[];
  updateItem: (id: number, updates: Partial<PostItItem>) => void;
  showGuideInPrint: boolean;
  previewTone: PreviewTone;
  onApplyToAll: (id: number) => void;
}

const MM_TO_PX = 96 / 25.4;

/** 컨테이너가 A4보다 좁으면(모바일) 비율을 유지한 채 축소한다. 인쇄 시에는 CSS로 해제된다. */
function useFitScale(widthPx: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? widthPx;
      setScale(width >= widthPx ? 1 : width / widthPx);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [widthPx]);

  return { containerRef, scale };
}

export default function A4Canvas({
  layout,
  items,
  updateItem,
  showGuideInPrint,
  previewTone,
  onApplyToAll,
}: A4CanvasProps) {
  const isLandscape = layout.a4Orientation === 'landscape';
  const a4WidthMm = isLandscape ? 297 : 210;
  const a4HeightMm = isLandscape ? 210 : 297;
  const { containerRef, scale } = useFitScale(a4WidthMm * MM_TO_PX);
  const isScaled = scale < 1;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${layout.cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`,
  };

  return (
    <div ref={containerRef} className="flex w-full justify-center print:block print:w-auto">
      <div
        className="print:h-auto! print:w-auto!"
        style={
          isScaled
            ? { width: a4WidthMm * MM_TO_PX * scale, height: a4HeightMm * MM_TO_PX * scale }
            : undefined
        }
      >
        <div
          className="relative mx-auto flex origin-top-left flex-col overflow-hidden rounded-sm border border-slate-300 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] print:m-0 print:transform-none! print:rounded-none print:border-0 print:border-none print:shadow-none"
          style={{
            width: `${a4WidthMm}mm`,
            height: `${a4HeightMm}mm`,
            transform: isScaled ? `scale(${scale})` : undefined,
          }}
        >
          {/* Feed Indicator */}
          <div
            className={`absolute top-0 flex w-full select-none items-center justify-center pt-3 text-slate-400 ${
              !showGuideInPrint ? 'print:hidden' : ''
            }`}
          >
            <div className="flex items-center space-x-2 rounded-full border border-slate-100 bg-slate-50/80 px-4 py-1.5 shadow-sm backdrop-blur-sm print:border-none print:bg-transparent print:shadow-none">
              <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-xs font-bold tracking-wide">프린터 급지 방향 (종이가 들어가는 쪽)</span>
            </div>
          </div>

          {/* Grid Container */}
          <div className="flex h-full w-full flex-1 items-center justify-center p-[10mm] pt-[20mm]">
            <div className={layout.gap || 'gap-[3mm]'} style={gridStyle}>
              {items.map((item, index) => (
                <PostItCell
                  key={item.id}
                  item={item}
                  layout={layout}
                  updateItem={updateItem}
                  showGuideInPrint={showGuideInPrint}
                  previewTone={previewTone}
                  onApplyToAll={() => onApplyToAll(item.id)}
                  isFirst={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
