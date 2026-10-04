import type { LayoutConfig, PreviewTone } from '../types';
import ActionPanel from './ActionPanel';
import SidebarContent from './SidebarContent';
import Brand from './Brand';

interface SidebarProps {
  layouts: LayoutConfig[];
  selectedLayoutId: string;
  onSelectLayout: (id: string) => void;
  showGuideInPrint: boolean;
  onToggleGuide: () => void;
  previewTone: PreviewTone;
  onChangeTone: (tone: PreviewTone) => void;
  onPrint: () => void;
}

/** 데스크톱(lg 이상) 전용 사이드바. 모바일은 MobileChrome이 담당한다. */
export default function Sidebar({
  layouts,
  selectedLayoutId,
  onSelectLayout,
  showGuideInPrint,
  onToggleGuide,
  previewTone,
  onChangeTone,
  onPrint,
}: SidebarProps) {
  return (
    <aside className="z-10 hidden h-screen w-80 flex-col border-r border-slate-200 bg-white/80 shadow-2xl shadow-slate-200/50 backdrop-blur-xl lg:flex xl:w-96 print:hidden">
      <div className="border-b border-slate-100 bg-white/50 p-6">
        <Brand />
      </div>

      <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
        <SidebarContent layouts={layouts} selectedLayoutId={selectedLayoutId} onSelectLayout={onSelectLayout} />
      </div>

      <div className="border-t border-slate-100 bg-white/90 p-4 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] backdrop-blur-lg">
        <ActionPanel
          variant="sidebar"
          showGuideInPrint={showGuideInPrint}
          onToggleGuide={onToggleGuide}
          previewTone={previewTone}
          onChangeTone={onChangeTone}
          onPrint={onPrint}
        />
      </div>
    </aside>
  );
}
