import type { LayoutConfig } from '../types';

interface LayoutChangeDialogProps {
  target: LayoutConfig | null;
  filledCount: number;
  keptCount: number;
  onCancel: () => void;
  onReset: () => void;
  onKeep: () => void;
}

export default function LayoutChangeDialog({
  target,
  filledCount,
  keptCount,
  onCancel,
  onReset,
  onKeep,
}: LayoutChangeDialogProps) {
  if (!target) return null;

  const targetCount = target.cols * target.rows;
  const droppedCount = filledCount - keptCount;
  const targetName = target.name.split(' (')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm print:hidden">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
        role="dialog"
        aria-modal="true"
        aria-labelledby="layout-change-title"
        aria-describedby="layout-change-description"
      >
        <h3 id="layout-change-title" className="mb-3 text-xl font-extrabold tracking-tight text-slate-900">
          규격을 바꿀까요?
        </h3>
        <p id="layout-change-description" className="mb-4 text-sm leading-relaxed text-slate-600">
          입력한 내용이 <b className="text-slate-900">{filledCount}칸</b> 있습니다. 새 규격{' '}
          <b className="text-slate-900">{targetName}({targetCount}칸)</b>에 앞에서부터 순서대로 옮길 수 있습니다.
          {droppedCount > 0 ? (
            <>
              {' '}칸이 모자라 <b className="text-red-600">{droppedCount}칸</b>은 사라집니다.
            </>
          ) : (
            <> 글꼴과 크기, 정렬도 함께 옮깁니다.</>
          )}
        </p>
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
          <span className="font-bold text-indigo-700">{keptCount}칸 유지</span>
          {droppedCount > 0 && <span className="font-bold text-red-600">{droppedCount}칸 사라짐</span>}
          <span className="ml-auto">{targetCount}칸으로 변경</span>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            비우고 변경
          </button>
          <button
            type="button"
            onClick={onKeep}
            autoFocus
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
          >
            내용 유지하고 변경
          </button>
        </div>
      </div>
    </div>
  );
}
