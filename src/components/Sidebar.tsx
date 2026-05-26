import React, { useState } from 'react';
import type { LayoutConfig, PostItItem } from '../types';

interface SidebarProps {
  layouts: LayoutConfig[];
  selectedLayoutId: string;
  onSelectLayout: (id: string) => void;
  showGuideInPrint: boolean;
  onToggleGuide: () => void;
  onPrint: () => void;
  items: PostItItem[];
  updateItem: (id: number, updates: Partial<PostItItem>) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  layouts,
  selectedLayoutId,
  onSelectLayout,
  showGuideInPrint,
  onToggleGuide,
  onPrint,
}) => {
  const [showPrintWarning, setShowPrintWarning] = useState(false);

  const selectedLayout = layouts.find(l => l.id === selectedLayoutId) || layouts[0];

  const handlePrintClick = () => {
    setShowPrintWarning(true);
  };

  const confirmPrint = () => {
    setShowPrintWarning(false);
    setTimeout(() => {
      onPrint();
    }, 100);
  };

  return (
    <aside className="w-full lg:w-80 xl:w-96 bg-white/80 backdrop-blur-xl border-b lg:border-b-0 lg:border-r border-slate-200 shadow-xl lg:shadow-2xl shadow-slate-200/50 flex flex-col h-auto lg:h-screen print:hidden z-10">
      <div className="p-6 border-b border-slate-100 bg-white/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-inner">
            <span className="text-white font-bold text-sm">A4</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">Sticky Guide</h1>
            <p className="text-xs text-indigo-600 font-semibold tracking-wide uppercase mt-0.5">Perfect Print Alignment</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
        
        {/* Usage Guide Banner */}
        <section className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4 shadow-sm">
          <h2 className="text-sm font-bold text-indigo-800 flex items-center mb-3">
            <span className="mr-2">💡</span> 이렇게 사용하세요!
          </h2>
          <ol className="space-y-3 text-xs text-indigo-900/80 leading-relaxed font-medium">
            <li className="flex gap-2">
              <span className="bg-indigo-200 text-indigo-800 w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span><strong>빈 A4 용지</strong>에 현재 가이드라인을 먼저 인쇄하세요. <br/><span className="text-indigo-600/70">(가이드선 인쇄 체크 필수)</span></span>
            </li>
            <li className="flex gap-2">
              <span className="bg-indigo-200 text-indigo-800 w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>출력된 종이의 <strong>노란색 접착면 가이드</strong>에 맞춰 실제 포스트잇을 붙이세요.</span>
            </li>
            <li className="flex gap-2">
              <span className="bg-indigo-200 text-indigo-800 w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>화면에서 내용을 작성한 후, 포스트잇이 붙은 A4 용지를 프린터에 넣고 <strong>다시 인쇄</strong>하세요.</span>
            </li>
          </ol>
        </section>

        {/* Step 1: Layout Selection */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">1. 포스트잇 규격 선택</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {layouts.map(layout => {
              const isSelected = selectedLayoutId === layout.id;
              return (
                <label 
                  key={layout.id} 
                  className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
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
                      className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 rounded-full"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="px-2 py-1 bg-white rounded-md border border-slate-100 text-slate-500 font-medium shadow-sm">
                      {layout.postItWidth} × {layout.postItHeight} mm
                    </span>
                    <span className="text-slate-400">{(layout.description || '').split(' (')[0]}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* Actual Size Preview */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800">모니터 실물 사이즈 대조</h2>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">1:1 모니터 비교</span>
          </div>
          <p className="text-xs text-slate-500 text-center mb-4 px-2">
            가이드에 실제 포스트잇을 직접 대어보고 크기가 맞는지 확인해 보세요.
          </p>
          <div className="relative border-2 border-indigo-400 border-dashed bg-indigo-50/50 flex items-center justify-center rounded-sm shadow-sm"
               style={{
                 width: `${selectedLayout.postItWidth}mm`,
                 height: `${selectedLayout.postItHeight}mm`
               }}>
            <span className="text-[10px] font-bold text-indigo-400/80 rotate-[-15deg] select-none whitespace-nowrap">
              여기에 포스트잇을 대보세요
            </span>
            <div className="absolute top-0 left-0 right-0 h-[15mm] bg-yellow-200/50 pointer-events-none border-b border-indigo-200 border-dashed"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 text-center">
            * 모니터 해상도(DPI) 설정에 따라 1~2mm의 오차가 발생할 수 있습니다.
          </p>
        </section>

      </div>

      <div className="p-4 bg-white/90 border-t border-slate-100 backdrop-blur-lg space-y-3 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
        <label className="flex items-center justify-center space-x-2 cursor-pointer group bg-slate-50 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
          <input 
            type="checkbox" 
            checked={showGuideInPrint}
            onChange={onToggleGuide}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300"
          />
          <span className="text-xs font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
            가이드선(테두리) 함께 인쇄
          </span>
        </label>

        <button 
          onClick={handlePrintClick}
          className="relative w-full overflow-hidden bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group active:scale-[0.98]"
        >
          <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
          <span className="tracking-wide">인쇄하기 (Print)</span>
        </button>
      </div>

      {/* Print Warning Modal */}
      {showPrintWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform scale-100 transition-transform">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">프린터 설정 확인</h3>
            <p className="text-slate-500 mb-6 leading-relaxed">
              실제 사이즈로 정확하게 인쇄하기 위해, 인쇄 대화창에서 다음 설정을 반드시 확인해주세요.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 space-y-3">
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">✓</span>
                <div>
                  <span className="font-bold text-slate-800">여백 (Margins): </span>
                  <span className="text-red-600 font-bold">없음 (None)</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-red-500 mr-2 mt-0.5">✓</span>
                <div>
                  <span className="font-bold text-slate-800">배율 (Scale): </span>
                  <span className="text-red-600 font-bold">100% (기본값)</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowPrintWarning(false)}
                className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                취소
              </button>
              <button 
                onClick={confirmPrint}
                className="px-5 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95"
              >
                확인 및 인쇄
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
