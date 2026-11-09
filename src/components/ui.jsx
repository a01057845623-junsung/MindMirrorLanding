/* 여러 섹션에서 공유하는 작은 UI 조각들 */

/** Billdr .heading_wrap 패턴: eyebrow(사각 도트 + 모노) + H2 + 설명 */
export function SectionHeader({ index, label, title, desc, align = 'left' }) {
  const center = align === 'center';
  return (
    <div className={`bd-reveal flex flex-col gap-2 ${center ? 'items-center text-center' : ''}`}>
      <span className="eyebrow">
        <span className="h-2 w-2 bg-terra" />
        {index} / {label}
      </span>
      <h2 className="max-w-3xl font-kserif text-2xl font-semibold leading-[1.22] tracking-tight text-ink md:text-[2rem]">
        {title}
      </h2>
      {desc && <p className={`max-w-2xl text-[14.5px] leading-relaxed text-muted ${center ? 'mx-auto' : ''}`}>{desc}</p>}
    </div>
  );
}

/** 원형 5분 타이머 링 */
export function TimerRing({ progress = 0, label = '05:00', size = 120, stroke = 6, caption, tone = 'light' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dark = tone === 'dark';
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={dark ? 'rgba(251,249,245,0.14)' : 'rgba(31,30,29,0.08)'}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#D97757"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - Math.min(Math.max(progress, 0), 1))}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-mono font-medium tabular-nums ${dark ? 'text-ivory' : 'text-ink'}`}
          style={{ fontSize: Math.round(size * 0.2) }}
        >
          {label}
        </span>
        {caption && (
          <span className={`font-mono text-[9px] uppercase tracking-[0.16em] ${dark ? 'text-ivory/60' : 'text-muted'}`}>
            {caption}
          </span>
        )}
      </div>
    </div>
  );
}

/** P/M 점수 세그먼트 바 (0–10) */
export function ScoreBar({ label, value, max = 10, accent = false, dim = false }) {
  return (
    <div className={`flex items-center gap-3 transition-opacity duration-500 ${dim ? 'opacity-35' : 'opacity-100'}`}>
      <span className="w-12 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">{label}</span>
      <div className="flex flex-1 gap-[3px]">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i < value;
          return (
            <span
              key={i}
              className={`h-2 flex-1 origin-left rounded-[2px] transition-all duration-500 ${
                filled ? (accent ? 'scale-y-110 bg-terra shadow-sm' : 'bg-ink/50') : 'bg-ink/[0.07]'
              }`}
              style={{
                transitionDelay: `${i * 75}ms`,
                transitionTimingFunction: 'cubic-bezier(.34,1.4,.64,1)',
              }}
            />
          );
        })}
      </div>
      <span className="w-6 text-right font-mono text-sm font-semibold tabular-nums text-ink">{value}</span>
    </div>
  );
}
