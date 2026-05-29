"use client";

export function InputProgressBar({ steps, currentStep }: any) {
  return (
    <div className="flex items-center gap-0 mb-2">
      {steps.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;

        return (
          <div key={label} className="flex items-center flex-1">
            {/* Node */}
            <div className="flex flex-col items-center relative">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                style={{
                  background: isCompleted
                    ? "#00e5a0"
                    : isActive
                    ? "rgba(0,229,160,0.1)"
                    : "rgba(255,255,255,0.04)",
                  borderColor: isCompleted || isActive
                    ? "#00e5a0"
                    : "rgba(255,255,255,0.12)",
                  color: isCompleted
                    ? "#070a0f"
                    : isActive
                    ? "#00e5a0"
                    : "rgba(255,255,255,0.25)",
                }}
              >
                {isCompleted ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} className="w-3.5 h-3.5" strokeLinecap="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>

              <span
                className="absolute -bottom-6 text-[10px] font-medium whitespace-nowrap transition-colors"
                style={{ color: isActive ? "#00e5a0" : "rgba(255,255,255,0.25)" }}
              >
                {label}
              </span>
            </div>

            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="flex-1 h-px mx-2 transition-all duration-500"
                style={{
                  background: i < currentStep
                    ? "#00e5a0"
                    : "rgba(255,255,255,0.08)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}