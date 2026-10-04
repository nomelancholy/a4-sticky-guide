interface PrintWarningModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function PrintWarningModal({ open, onCancel, onConfirm }: PrintWarningModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm print:hidden">
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="print-warning-title"
        aria-describedby="print-warning-description"
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 id="print-warning-title" className="mb-2 text-2xl font-bold text-slate-900">프린터 설정 확인</h3>
        <p id="print-warning-description" className="mb-6 leading-relaxed text-slate-600">
          실제 사이즈로 정확하게 인쇄하기 위해, 인쇄 대화창에서 다음 설정을 반드시 확인해주세요.
        </p>
        <div className="mb-7 space-y-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-start">
            <span className="mr-2 mt-0.5 text-red-500" aria-hidden="true">✓</span>
            <div>
              <span className="font-bold text-slate-800">여백 (Margins): </span>
              <span className="font-bold text-red-600">없음 (None)</span>
            </div>
          </div>
          <div className="flex items-start">
            <span className="mr-2 mt-0.5 text-red-500" aria-hidden="true">✓</span>
            <div>
              <span className="font-bold text-slate-800">배율 (Scale): </span>
              <span className="font-bold text-red-600">100% (기본값)</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            autoFocus
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-95"
          >
            확인 및 인쇄
          </button>
        </div>
      </div>
    </div>
  );
}
