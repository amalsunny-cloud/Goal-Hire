interface FunnelItem {
  stage: string;
  value: number;
}

interface ApplicationFunnelProps {
  data: FunnelItem[];
}

export default function ApplicationFunnel({
  data,
}: ApplicationFunnelProps) {
  const values = data.map((item) => item.value);
  const maxValue = Math.max(...values, 1);

  if (data.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Application Funnel
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            See how your applications progress through each stage
          </p>
        </div>

        {/* Empty state */}
        <div className="flex min-h-55 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
            <span className="text-lg">📊</span>
          </div>

          <p className="text-sm font-semibold text-slate-700">
            No application data
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your application funnel will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">

      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Application Funnel
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            See how your applications progress through each stage
          </p>
        </div>

        {/* Funnel icon */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50">
          <div className="flex flex-col items-center gap-0.5">
            <span className="h-1.5 w-5 rounded-full bg-indigo-300" />
            <span className="h-1.5 w-4 rounded-full bg-indigo-400" />
            <span className="h-1.5 w-3 rounded-full bg-indigo-600" />
          </div>
        </div>
      </div>

      {/* Funnel */}
      <div className="space-y-5">
        {data.map((item) => {
          const width = (item.value / maxValue) * 100;

          return (
            <div key={item.stage}>

              {/* Stage information */}
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="truncate text-sm font-semibold text-slate-700">
                  {item.stage}
                </span>

                <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-slate-100 px-2 text-xs font-bold text-slate-700">
                  {item.value}
                </span>
              </div>

              {/* Progress bar */}
              <div
                className="h-3 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={item.value}
                aria-valuemin={0}
                aria-valuemax={maxValue}
              >
                <div
                  className="
                    h-full
                    rounded-full
                    bg-linear-to-r
                    from-blue-500
                    to-indigo-500
                    transition-all
                    duration-500
                  "
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom indicator */}
      <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-4">
        <span className="h-2 w-2 rounded-full bg-indigo-500" />

        <p className="text-xs text-slate-500">
          Application progress across your current pipeline
        </p>
      </div>
    </div>
  );
}