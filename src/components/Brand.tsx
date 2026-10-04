export default function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 shadow-inner">
        <span className="text-sm font-bold text-white">A4</span>
      </div>
      <div className="min-w-0">
        <h1 className={`whitespace-nowrap font-extrabold tracking-tight text-slate-800 ${compact ? 'text-base' : 'text-xl'}`}>
          Sticky Guide
        </h1>
        {!compact && (
          <p className="mt-0.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Perfect Print Alignment
          </p>
        )}
      </div>
    </div>
  );
}
