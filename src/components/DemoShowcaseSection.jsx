import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Ban,
  CheckCircle2,
  FastForward,
  Pause,
  Phone,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  X,
} from 'lucide-react';
import { CRISIS_LINES, PHQ9_Q9, PIPELINE, SCENARIO, SCENARIO_STEPS } from '../data/landingData';
import useCountdown from '../hooks/useCountdown';
import { ScoreBar, SectionHeader, TimerRing } from './ui';

const STEP_DUR = 6000;

/* ---------------- Tab 1 : Safety First ---------------- */
function SafetyDemo() {
  const [score, setScore] = useState(null);
  const [scanLine, setScanLine] = useState(0);
  const blocked = score !== null && score >= 1;

  const handleSelectScore = (s) => {
    setScore(s);
    setScanLine(1);
    setTimeout(() => setScanLine(2), 180);
    setTimeout(() => setScanLine(3), 380);
  };

  const handleReset = () => {
    setScore(null);
    setScanLine(0);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* 좌측: PHQ-9 Q9 질문 */}
      <div className="p-5 lg:p-6">
        <span className="chip-mono">Step 1 · PHQ-9 · 문항 9</span>
        <p className="mt-3.5 font-kserif text-lg font-semibold leading-snug text-ink">{PHQ9_Q9.question}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {PHQ9_Q9.options.map((o) => (
            <button
              key={o.score}
              type="button"
              onClick={() => handleSelectScore(o.score)}
              className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-all duration-200 ${
                score === o.score
                  ? o.score >= 1
                    ? 'scale-[1.02] border-crisis bg-red-50 text-crisis shadow-sm'
                    : 'scale-[1.02] border-ink bg-ink text-ivory shadow-sm'
                  : 'border-line bg-ivory text-ink hover:border-line-strong'
              }`}
            >
              <span className="text-[14px] font-medium">{o.label}</span>
              <span className="font-mono text-xs">{o.score}점</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="mt-3.5 inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink"
        >
          <RotateCcw size={12} /> 초기화
        </button>
      </div>

      {/* 우측: 시스템 반응 (실시간 코드 스캔 + 애니메이션 카드) */}
      <div className="border-t border-line bg-ivory p-5 lg:border-l lg:border-t-0 lg:p-6">
        <div className="mb-3 rounded-lg bg-ink px-3.5 py-2.5 font-mono text-[11.5px] leading-snug text-ivory/80">
          <div className="flex items-center justify-between text-ivory/40">
            <span>// rule-first safety filter</span>
            {score !== null && (
              <span className="inline-flex items-center gap-1 text-[10px] text-terra">
                <span className="h-1.5 w-1.5 animate-ping rounded-full bg-terra" /> EVALUATED
              </span>
            )}
          </div>
          <div
            className={`mt-0.5 rounded px-1.5 py-0.5 transition-colors duration-300 ${
              scanLine >= 1 ? 'bg-white/10 text-ivory' : ''
            }`}
          >
            phq9_q9 = <span className="font-semibold text-terra">{score === null ? 'null' : score}</span>
          </div>
          <div
            className={`mt-0.5 rounded px-1.5 py-0.5 transition-colors duration-300 ${
              scanLine >= 2 ? (blocked ? 'bg-red-500/20 text-ivory' : 'bg-emerald-500/20 text-ivory') : ''
            }`}
          >
            if (phq9_q9 &gt;= 1) → BLOCK_LLM ={' '}
            <span className={`font-semibold ${blocked ? 'animate-pulse text-red-400' : 'text-emerald-400'}`}>
              {blocked ? 'true' : 'false'}
            </span>
          </div>
        </div>

        {score === null && (
          <div className="grid h-[195px] place-items-center rounded-xl border border-dashed border-line-strong text-center text-xs text-muted">
            <div>
              <ShieldCheck size={24} className="mx-auto mb-1.5 text-line-strong" />
              왼쪽에서 점수를 선택하면
              <br />
              안전 필터의 실시간 코드 스캔과 차단 반응을 확인할 수 있습니다.
            </div>
          </div>
        )}

        {score === 0 && (
          <div key="pass" className="bd-card-rise rounded-xl border border-line bg-white p-4 shadow-card">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-emerald-700">
              <CheckCircle2 size={18} /> 안전 필터 통과
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              위기 신호가 감지되지 않았습니다. <strong className="text-ink">Step 2 과제 체크인</strong>으로 진행하며, 이후
              단계에서만 LLM 호출이 허용됩니다.
            </p>
            <div className="mt-3.5 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-muted">
              <span className="bd-tile-pop rounded bg-emerald-50 px-2 py-0.5 text-emerald-700" style={{ animationDelay: '160ms' }}>
                LLM allowed
              </span>
              <ArrowRight size={12} /> Step 2
            </div>
          </div>
        )}

        {blocked && (
          <div key={`block-${score}`} className="bd-card-drop overflow-hidden rounded-xl border border-crisis/30 bg-red-50/80 shadow-card">
            <div className="flex items-center justify-between bg-crisis px-4 py-2 font-mono text-[10.5px] uppercase tracking-wider text-white">
              <span className="flex items-center gap-1.5">
                <Ban size={12} className="animate-pulse" /> LLM 호출 완전 차단
              </span>
              <span>Fixed Crisis Protocol</span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 font-kserif text-base font-semibold text-crisis">
                <ShieldAlert size={18} /> 지금 당신의 안전이 가장 중요해요.
              </div>
              <p className="mt-1 text-[13px] leading-snug text-ink/80">
                혼자 견디지 않아도 괜찮습니다. 지금 바로 전문 상담사와 이야기할 수 있어요.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {CRISIS_LINES.map((c, idx) => (
                  <div
                    key={c.number}
                    className="bd-tile-pop rounded-lg border border-crisis/20 bg-white px-3 py-2 shadow-sm"
                    style={{ animationDelay: `${160 + idx * 120}ms` }}
                  >
                    <div className="text-[11px] text-muted">{c.name}</div>
                    <div className="mt-0.5 flex items-center gap-1 font-mono text-lg font-medium text-crisis">
                      <Phone size={13} /> {c.number}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 font-mono text-[10.5px] text-muted">※ 위기 발화 원문은 저장되지 않습니다.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Tab 2 : Killer Use Case ---------------- */
function ScenarioDemo() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [ruleKey, setRuleKey] = useState(0);
  const timer = useCountdown(300);

  const go = (n, manual = false) => {
    setStep(n);
    setRuleKey((k) => k + 1);
    if (manual) setAutoPlay(false);
    if (n !== 3) timer.reset();
  };

  // REA 추출 script_10.js (billdrfeaturestabs): 6000ms 프로그레스 바가 차오르며 다음 스텝으로 자동 전환
  useEffect(() => {
    if (!autoPlay) return undefined;
    // Step 4(타이머 & 재평가) 진입 시 1.1초 후 자동으로 완료 상태 시연
    let finishTimer;
    if (step === 3 && !timer.done && !timer.running) {
      finishTimer = setTimeout(() => {
        timer.finish();
      }, 1100);
    }
    const id = setTimeout(() => {
      const next = (step + 1) % SCENARIO_STEPS.length;
      if (next !== 3) timer.reset();
      setStep(next);
      setRuleKey((k) => k + 1);
    }, STEP_DUR);
    return () => {
      clearTimeout(id);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [step, autoPlay, timer]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* 좌측 스텝 리스트 + Billdr Auto-Progress Rule */}
      <div className="border-b border-line p-4 lg:border-b-0 lg:border-r lg:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="chip-mono">시험기간 · 스크린타임 8h</span>
          <button
            type="button"
            onClick={() => {
              setAutoPlay((p) => !p);
              setRuleKey((k) => k + 1);
            }}
            className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] transition-colors ${
              autoPlay
                ? 'border-terra/40 bg-terra/10 text-terra-dark'
                : 'border-line-strong bg-ivory text-muted hover:text-ink'
            }`}
          >
            {autoPlay ? <Pause size={9} /> : <Play size={9} />}
            {autoPlay ? 'AUTO 6s' : 'MANUAL'}
          </button>
        </div>

        <ol className="mt-3 space-y-1.5">
          {SCENARIO_STEPS.map((s, i) => {
            const active = step === i;
            return (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => go(i, true)}
                  className={`relative flex w-full flex-col overflow-hidden rounded-lg px-3 py-2 text-left transition-colors ${
                    active ? 'bg-ink text-ivory shadow-sm' : 'text-ink hover:bg-sand'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full font-mono text-[10.5px] ${
                        active
                          ? 'bg-terra text-white'
                          : i < step
                            ? 'bg-terra/15 text-terra-dark'
                            : 'border border-line-strong text-muted'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13.5px] font-medium">{s.title}</span>
                  </div>
                  {/* Billdr .features_tab-rule (6000ms 진행 바) */}
                  {active && autoPlay && (
                    <span className="mt-1.5 block h-[2px] w-full overflow-hidden rounded-full bg-white/15">
                      <span
                        key={`${step}-${ruleKey}`}
                        className="block h-full bg-terra"
                        style={{
                          width: '100%',
                          transformOrigin: 'left center',
                          animation: `bdStrikeGrow ${STEP_DUR}ms linear forwards`,
                        }}
                      />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 우측 스테이지 */}
      <div className="bg-blueprint flex flex-col bg-ivory">
        <div className="flex min-h-[250px] flex-1 items-center justify-center p-4 lg:p-6">
          <div key={step} className="w-full max-w-xl">
            {step === 0 && (
              <div>
                <div className="bd-msg-in mb-3 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-wider text-muted">
                  <Smartphone size={12} /> 1) 사용자 발화 입력
                </div>
                <div
                  className="bd-msg-in ml-auto max-w-md rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-[15px] leading-relaxed text-ivory shadow-card"
                  style={{ animationDelay: '80ms' }}
                >
                  {SCENARIO.utterance}
                </div>
                <div className="mt-3 flex items-center justify-end gap-2 text-[11.5px] text-muted">
                  <span
                    className="bd-tile-pop rounded border border-line bg-white px-2 py-0.5 font-mono shadow-sm"
                    style={{ animationDelay: '240ms' }}
                  >
                    Screen Time 8h 12m
                  </span>
                  <span
                    className="bd-tile-pop rounded border border-terra/30 bg-terra/10 px-2 py-0.5 font-mono text-terra-dark shadow-sm"
                    style={{ animationDelay: '360ms' }}
                  >
                    D-1 전공 시험
                  </span>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="bd-card-drop rounded-2xl border border-line bg-white p-4 shadow-card lg:p-5">
                <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted">
                  <span>2) TRAP 기능분석</span>
                  <span className="text-terra">Trigger → Response → Avoidance</span>
                </div>
                <p className="font-kserif text-base font-semibold leading-snug text-ink lg:text-[17px]">
                  ‘전공 시험 공부’를 떠올렸을 때 가장 크게 느껴지는 감정은 무엇인가요?
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {['막막함/압박감', '불안/두려움', '피로/무기력', '완벽주의 부담'].map((c, i) => (
                    <span
                      key={c}
                      className={`bd-tile-pop rounded-full border px-3 py-1 text-xs ${
                        i === 0 ? 'border-terra bg-terra font-medium text-white shadow-sm' : 'border-line bg-ivory text-muted'
                      }`}
                      style={{ animationDelay: `${120 + i * 90}ms` }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <p
                  className="bd-msg-in mt-3 rounded-lg border border-line bg-ivory px-3.5 py-2.5 text-[13px] leading-snug text-ink/80"
                  style={{ animationDelay: '460ms' }}
                >
                  릴스를 본 건 게을러서가 아니라, 시험이라는 거대한 압박을 잠시 피하려는{' '}
                  <strong className="text-ink">자연스러운 방어 반응(회피)</strong>이었어요.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="bd-card-drop rounded-2xl border border-line bg-white p-4 shadow-card lg:p-5">
                <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted">
                  <span>3) TRAC 5분 다운사이징</span>
                  <span className="text-terra">Alternative Coping</span>
                </div>
                <div className=" flex items-center gap-2 text-[13.5px] text-muted">
                  <X size={14} className="text-crisis" />
                  <span className="bd-strike font-medium text-ink/65">[{SCENARIO.originalTask}]</span>
                </div>
                <div className="my-1.5 ml-2 h-3.5 border-l border-dashed border-line-strong" />
                <div
                  className="bd-card-drop rounded-xl border border-terra/30 bg-terra/[0.07] px-3.5 py-2.5"
                  style={{ animationDelay: '280ms' }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-wider text-terra-dark">오늘의 5분 미세행동</div>
                  <p className="mt-0.5 text-[15px] font-semibold text-ink">[{SCENARIO.microAction}]</p>
                </div>
                <div
                  className="bd-msg-in mt-2.5 rounded-lg bg-ink px-3.5 py-2 font-mono text-[11px] text-ivory/80"
                  style={{ animationDelay: '440ms' }}
                >
                  <div className="text-ivory/40">// JSON validator · 부담 단어 실시간 차단</div>
                  <div className="mt-1 flex flex-wrap items-center gap-1.5">
                    {SCENARIO.blockedWords.map((w, idx) => (
                      <span
                        key={w}
                        className="bd-tile-pop rounded bg-red-500/15 px-1.5 py-0.5 text-red-300 line-through"
                        style={{ animationDelay: `${540 + idx * 90}ms` }}
                      >
                        {w}
                      </span>
                    ))}
                    <span
                      className="bd-tile-pop font-semibold text-emerald-400"
                      style={{ animationDelay: '920ms' }}
                    >
                      → PASS (single physical action)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bd-card-drop rounded-2xl border border-line bg-white p-4 shadow-card lg:p-5">
                <div className="mb-2.5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted">
                  <span>4) 타이머 & P/M 재평가</span>
                  <span className="text-terra">Mastery Feedback Loop</span>
                </div>
                <div className="flex flex-col items-center gap-5 sm:flex-row">
                  <TimerRing
                    progress={timer.progress}
                    label={timer.label}
                    size={108}
                    stroke={6}
                    caption={timer.done ? 'Complete' : timer.running ? 'Running' : 'Ready'}
                  />
                  <div className="w-full flex-1 space-y-2">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={timer.start}
                        disabled={timer.running}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-ivory disabled:opacity-40"
                      >
                        <Play size={11} /> 5분 시작
                      </button>
                      <button
                        type="button"
                        onClick={timer.finish}
                        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-ink hover:bg-sand"
                      >
                        <FastForward size={11} /> 완료로 건너뛰기
                      </button>
                    </div>
                    <ScoreBar label="M 사전" value={1} />
                    <ScoreBar label="M 사후" value={timer.done ? 5 : 0} accent />
                    <div className="flex h-8 items-center justify-between rounded-lg bg-ivory px-3">
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">성취감 Mastery</span>
                      {timer.done ? (
                        <span className="bd-tile-pop font-mono text-base font-semibold text-terra">1 → 5 ▲+4</span>
                      ) : (
                        <span className="font-mono text-xs text-muted">측정 대기 중...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line bg-white/70 px-5 py-2">
          <button
            type="button"
            onClick={() => go(Math.max(step - 1, 0), true)}
            disabled={step === 0}
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink disabled:opacity-30"
          >
            <ArrowLeft size={14} /> 이전
          </button>
          <span className="font-mono text-[11px] text-muted">
            {step + 1} / {SCENARIO_STEPS.length}
          </span>
          <button
            type="button"
            onClick={() => go(Math.min(step + 1, SCENARIO_STEPS.length - 1), true)}
            disabled={step === SCENARIO_STEPS.length - 1}
            className="inline-flex items-center gap-1 text-xs font-medium text-terra-dark hover:text-terra disabled:opacity-30"
          >
            다음 <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'safety', label: '시연 1', title: '위기 감지 시 즉각 차단 프로토콜', tag: 'Safety First' },
  { id: 'scenario', label: '시연 2', title: '릴스 스크린타임 8시간 탈출', tag: 'Killer Use Case' },
];

export default function DemoShowcaseSection() {
  const [tab, setTab] = useState('safety');

  return (
    <section id="demo" data-slide="04 · Live Demo & Architecture" className="section-anchor border-b border-line bg-sand/50">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col justify-center px-5 py-4 lg:py-6">
        <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-end">
          <SectionHeader
            index="04"
            label="Live Demo & Architecture"
            title="안전이 먼저, 그다음이 5분"
          />
          <p className="text-[13px] text-muted">
            모든 대화는 6단계 단일 파이프라인을 따르며, 위기 신호는 LLM 호출 전에 규칙으로 먼저 차단됩니다.
          </p>
        </div>

        {/* 6단계 파이프라인 바 */}
        <div className="bd-reveal bd-delay-1 mt-3 grid grid-cols-3 border border-line bg-white md:grid-cols-6">
          {PIPELINE.map((p, i) => {
            const on = p.tab === tab;
            return (
              <div
                key={p.step}
                className={`relative px-3 py-2 transition-colors duration-300 ${i > 0 ? 'border-l border-line' : ''} ${
                  i >= 3 ? 'border-t border-line md:border-t-0' : ''
                } ${on ? 'bg-terra/[0.08]' : ''}`}
              >
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] transition-colors duration-300 ${on ? 'bg-terra' : 'bg-transparent'}`}
                />
                <div className={`font-mono text-[10px] uppercase tracking-wider ${on ? 'text-terra-dark' : 'text-muted'}`}>
                  {p.step}
                </div>
                <div className={`text-[12.5px] font-semibold ${on ? 'text-ink' : 'text-ink/60'}`}>{p.label}</div>
              </div>
            );
          })}
        </div>

        {/* 듀얼 탭 */}
        <div className="bd-reveal bd-delay-2 mt-2.5 border border-line bg-white">
          <div className="grid grid-cols-2 border-b border-line">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative px-5 py-2.5 text-left transition-colors ${i > 0 ? 'border-l border-line' : ''} ${
                  tab === t.id ? 'bg-white' : 'bg-ivory/70 hover:bg-ivory'
                }`}
              >
                <span
                  className={`absolute inset-x-0 bottom-[-1px] h-[2px] ${tab === t.id ? 'bg-terra' : 'bg-transparent'}`}
                />
                <div className="flex items-center gap-2">
                  <span className={`font-mono text-[10px] uppercase tracking-wider ${tab === t.id ? 'text-terra-dark' : 'text-muted'}`}>
                    {t.label} · {t.tag}
                  </span>
                </div>
                <div className={`font-semibold md:text-[15px] ${tab === t.id ? 'text-ink' : 'text-ink/55'}`}>{t.title}</div>
              </button>
            ))}
          </div>
          {tab === 'safety' ? <SafetyDemo /> : <ScenarioDemo />}
        </div>
      </div>
    </section>
  );
}
