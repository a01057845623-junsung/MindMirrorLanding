import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, FastForward, Footprints, Pause, Play, RotateCcw } from 'lucide-react';
import { EMOTION_CHIPS, HERO_METRICS, PROTOTYPE_URL } from '../data/landingData';
import useCountdown from '../hooks/useCountdown';
import { ScoreBar, TimerRing } from './ui';

const AUTO_DUR = 6000;

function MiniAppCard() {
  const [chipId, setChipId] = useState(EMOTION_CHIPS[0].id);
  const [paused, setPaused] = useState(false);
  const [ruleKey, setRuleKey] = useState(0);
  const chip = EMOTION_CHIPS.find((c) => c.id === chipId);
  const timer = useCountdown(300);

  const select = (id) => {
    setChipId(id);
    setRuleKey((k) => k + 1);
    timer.reset();
  };

  // REA 추출 script_10.js (billdrfeaturestabs): 6000ms 주기로 감정 칩 자동 순환 (호버/타이머 실행 시 일시정지)
  useEffect(() => {
    if (paused || timer.running || timer.done) return undefined;
    const id = setTimeout(() => {
      const idx = EMOTION_CHIPS.findIndex((c) => c.id === chipId);
      const next = EMOTION_CHIPS[(idx + 1) % EMOTION_CHIPS.length];
      setChipId(next.id);
      setRuleKey((k) => k + 1);
    }, AUTO_DUR);
    return () => clearTimeout(id);
  }, [chipId, paused, timer.running, timer.done]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="bd-reveal bd-delay-2 relative w-full max-w-[440px] overflow-hidden rounded-2xl border border-line bg-white shadow-card"
    >
      {/* 앱 윈도우 바 */}
      <div className="flex items-center justify-between border-b border-line bg-ivory/60 px-5 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/10" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Step 3 · TRAP → TRAC</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-terra">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terra" />
          LIVE RUNTIME
        </span>
      </div>

      {/* 상단 자동 순환 프로그레스 바 (billdrfeaturestabs .features_tab-rule) */}
      <div className="h-[2px] w-full overflow-hidden bg-line">
        {!paused && !timer.running && !timer.done && (
          <div
            key={`${chipId}-${ruleKey}`}
            className="h-full bg-terra"
            style={{
              width: '100%',
              transformOrigin: 'left center',
              animation: `bdStrikeGrow ${AUTO_DUR}ms linear forwards`,
            }}
          />
        )}
      </div>

      <div className="space-y-4 p-5">
        <p className="font-kserif text-[16px] font-semibold leading-snug text-ink">
          지금 그 일을 떠올렸을 때 가장 크게 느껴지는 불편한 감정은 무엇인가요?
        </p>

        <div className="flex flex-wrap gap-1.5">
          {EMOTION_CHIPS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => select(c.id)}
              className={`rounded-full border px-3 py-1 text-[13px] transition-all duration-200 ${
                c.id === chipId
                  ? 'scale-[1.03] border-terra bg-terra text-white shadow-sm'
                  : 'border-line bg-ivory text-ink hover:border-terra/50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div key={chip.id} className="space-y-2.5">
          <p className="bd-msg-in rounded-lg bg-ivory/70 px-3 py-2 text-[12.5px] leading-relaxed text-muted">
            {chip.reframe}
          </p>
          <div className="bd-card-drop rounded-xl border border-terra/30 bg-terra/[0.06] p-3.5" style={{ animationDelay: '120ms' }}>
            <div className="mb-1 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-terra-dark">
              <span className="flex items-center gap-1.5">
                <Footprints size={12} /> 오늘의 5분 미세행동 · TRAC
              </span>
              <span className="rounded bg-terra/15 px-1.5 py-0.5 text-[9.5px]">5 MIN ACTION</span>
            </div>
            <p className="text-[14.5px] font-semibold leading-snug text-ink">{chip.action}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-line pt-4">
          <TimerRing
            progress={timer.progress}
            label={timer.label}
            size={88}
            stroke={5}
            caption={timer.done ? 'Done' : timer.running ? 'Running' : 'Ready'}
          />
          <div className="flex-1 space-y-2.5">
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={timer.running ? timer.pause : timer.start}
                className="inline-flex items-center gap-1 rounded-full bg-ink px-3 py-1 text-xs font-medium text-ivory transition-colors hover:bg-ink/85"
              >
                {timer.running ? <Pause size={12} /> : <Play size={12} />}
                {timer.running ? '일시정지' : timer.done ? '다시 시작' : '5분 시작'}
              </button>
              <button
                type="button"
                onClick={timer.finish}
                title="완료로 건너뛰기"
                className="grid h-6 w-6 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                <FastForward size={11} />
              </button>
              <button
                type="button"
                onClick={timer.reset}
                title="초기화"
                className="grid h-6 w-6 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                <RotateCcw size={11} />
              </button>
            </div>
            <ScoreBar label="M 사전" value={1} />
            <ScoreBar label="M 사후" value={timer.done ? 5 : 0} accent dim={!timer.done} />
            <div className="flex h-4 items-center justify-end font-mono text-[10.5px] text-muted">
              {timer.done ? (
                <span className="bd-tile-pop rounded-full bg-terra/15 px-2 py-0.5 font-semibold text-terra-dark">
                  성취감 1 → 5 ▲+4
                </span>
              ) : (
                <span>완료 버튼(⏭) 클릭 시 실시간 재평가</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="top" data-slide="Intro · Mind Mirror" className="section-anchor relative border-b border-line">
      <div className="mx-auto grid min-h-[calc(100vh-3.5rem)] max-w-container grid-cols-1 lg:grid-cols-[1.08fr_1fr]">
        {/* 좌측: 설득 카피 & 지표 */}
        <div className="flex flex-col justify-center px-5 py-8 lg:border-r lg:border-line lg:py-10 lg:pr-12">
          <span className="bd-reveal inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3">
            <span className="rounded-full bg-terra/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-terra-dark">
              BA
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Behavioral Activation AI Tool</span>
          </span>

          <h1 className="bd-reveal bd-delay-1 mt-5 font-kserif text-[2.2rem] font-semibold leading-[1.2] tracking-tight text-ink md:text-[2.85rem]">
            가장 무거운 순간,
            <br />
            가장 가벼운 <span className="text-terra">5분</span>의 시작
          </h1>
          <p className="bd-reveal bd-delay-1 mt-1 font-serif text-4xl italic text-ink/85 md:text-5xl">Mind Mirror</p>

          <p className="bd-reveal bd-delay-2 mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted">
            경증·중등도 우울감과 행동적 무기력을 겪는 사용자가 회피의 감정을 넘어{' '}
            <strong className="font-semibold text-ink">‘5분 미세행동’</strong>부터 시작하도록 돕는 LLM 기반 디지털
            행동활성화(BA) 보조 도구
          </p>

          <div className="bd-reveal bd-delay-3 mt-6 flex flex-wrap gap-3">
            <a href={PROTOTYPE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              프로토타입 체험하기 <ArrowUpRight size={17} />
            </a>
            <a href="#team" className="btn-ghost">
              발표 시작 <ArrowDown size={16} />
            </a>
          </div>

          <div className="bd-reveal bd-delay-4 mt-8 grid grid-cols-3 border border-line bg-white">
            {HERO_METRICS.map((m, i) => (
              <div key={m.value} className={`p-3.5 md:p-4 ${i > 0 ? 'border-l border-line' : ''}`}>
                <div className="font-mono text-base font-medium tracking-tight text-ink md:text-lg">{m.value}</div>
                <div className="mt-0.5 text-xs leading-snug text-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 인터랙티브 미니 앱 */}
        <div className="bg-blueprint relative flex items-center justify-center bg-sand/60 px-5 py-8 lg:py-10 lg:pl-12">
          <span className="bd-reveal bd-delay-1 absolute left-5 top-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted lg:left-12">
            ● Interactive Live Preview (6s Auto-Cycle)
          </span>
          <MiniAppCard />
        </div>
      </div>
    </section>
  );
}
