export default function Header({
  stage,
  onReset,
}: {
  stage: string;
  onReset: () => void;
}) {
  return (
    <header className="no-print sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f766e] text-white font-bold text-sm">
              TL
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-gray-900 leading-tight">
                TrustLedger Rapid Lab
              </div>
              <div className="text-xs text-gray-500 leading-tight">
                Social Licence to Build™ Readiness Assessment
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {stage !== "landing" && (
              <button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
