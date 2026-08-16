import { useState } from 'react';
import Sidebar from './components/Sidebar';
import A4Canvas from './components/A4Canvas';
import AdBanner from './components/AdBanner';
import GuideContent from './components/GuideContent';
import SiteFooter from './components/SiteFooter';
import type { PostItItem } from './types';
import { layouts } from './data/layouts';

const DEFAULT_FONT_SIZE = 14;
const DEFAULT_FONT_FAMILY = 'Inter';
const DEFAULT_TEXT_ALIGN = 'left';

const createItems = (layoutId: string): PostItItem[] => {
  const layout = layouts.find((candidate) => candidate.id === layoutId) ?? layouts[0];
  const totalItems = layout.cols * layout.rows;

  return Array.from({ length: totalItems }, (_, index) => ({
    id: index,
    text: '',
    fontSize: DEFAULT_FONT_SIZE,
    fontFamily: DEFAULT_FONT_FAMILY,
    textAlign: DEFAULT_TEXT_ALIGN,
  }));
};

function App() {
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>(layouts[0].id);
  const [items, setItems] = useState<PostItItem[]>(() => createItems(layouts[0].id));
  const [showGuideInPrint, setShowGuideInPrint] = useState(true);
  const [isColorMode, setIsColorMode] = useState(false);

  const selectedLayout = layouts.find(l => l.id === selectedLayoutId) || layouts[0];

  const handleSelectLayout = (layoutId: string) => {
    setSelectedLayoutId(layoutId);
    setItems(createItems(layoutId));
  };

  const updateItem = (id: number, updates: Partial<PostItItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const applyToAll = (sourceId: number) => {
    const sourceItem = items.find(i => i.id === sourceId);
    if (!sourceItem) return;

    setItems(prev => prev.map(item => ({
      ...item,
      fontSize: sourceItem.fontSize,
      fontFamily: sourceItem.fontFamily,
      textAlign: sourceItem.textAlign,
      text: sourceItem.text,
    })));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar 
        layouts={layouts}
        selectedLayoutId={selectedLayoutId}
        onSelectLayout={handleSelectLayout}
        showGuideInPrint={showGuideInPrint}
        onToggleGuide={() => setShowGuideInPrint(prev => !prev)}
        isColorMode={isColorMode}
        onToggleColorMode={() => setIsColorMode(prev => !prev)}
        onPrint={handlePrint}
        items={items}
        updateItem={updateItem}
      />
      
      <main className="flex-1 overflow-auto flex flex-col items-center py-6 lg:py-12 px-4 lg:px-8 print:p-0 bg-gradient-to-br from-slate-100 via-slate-50 to-gray-200 print:bg-white w-full">
        <div className="w-full max-w-[210mm] lg:max-w-4xl flex justify-between items-center mb-6 print:hidden">
          <h2 className="text-xl font-bold text-slate-700 tracking-tight">미리보기 (Preview)</h2>
          <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            A4 기준 • {selectedLayout.a4Orientation === 'landscape' ? '가로 방향' : '세로 방향'}
          </div>
        </div>

        <AdBanner />
        
        <A4Canvas 
          layout={selectedLayout} 
          items={items} 
          updateItem={updateItem} 
          showGuideInPrint={showGuideInPrint} 
          isColorMode={isColorMode}
          onApplyToAll={applyToAll}
        />

        <GuideContent />
        <SiteFooter />
      </main>
    </div>
  );
}

export default App;
