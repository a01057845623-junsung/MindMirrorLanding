import { ArrowRight, BookMarked, Bot, Check, Minus, RotateCcw, Scissors } from 'lucide-react';
import { COMPARISON, RESEARCH, SOLUTION_STEPS, VICIOUS_CYCLE } from '../data/landingData';
import { SectionHeader } from './ui';

function CycleDiagram() {
  return (
    <div className="bd-reveal bd-delay-1 border border-line bg-white p-4 lg:p-5">
      <div className="mb-3.5 flex items-center justify-between">
        <span className="chip-mono">Part A · 우울의 악순환</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">
          <RotateCcw size={12} /> Vicious Cycle
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0">
        {VICIOUS_CYCLE.map((node, i) => (
          <div key={node.label} className={`bd-reveal bd-delay-${i + 1} relative flex items-center`}>
            <div
              className={`relative w-full rounded-xl border px-3 py-3.5 text-center transition-transform duration-300 hover:-translate-y-0.5 md:mx-2.5 ${
                node.intervene ? 'border-terra bg-terra/[0.07] shadow-sm' : 'border-line bg-ivory'
              }`}
            >
              {node.intervene && (
                <span className="absolute -top-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-terra px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-white">
                  <Scissors size={9} /> Mind Mirror 개입
                </span>
              )}
              <div className="font-mono text-[9.5px] uppercase tracking-wider text-muted">{node.sub}</div>
              <div className={`mt-0.5 text-[14.5px] font-semibold ${node.intervene ? 'text-terra-dark' : 'text-ink'}`}>{node.label}</div>
            </div>
            {i < VICIOUS_CYCLE.length - 1 && (
              <ArrowRight size={15} className="absolute -right-2 z-10 hidden text-line-strong md:block" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 md:mx-2.5">
        <span className="h-px flex-1 border-t border-dashed border-line-strong" />
        <span className="font-mono text-[10.5px] text-muted">↺ 자책이 다시 의욕 저하로 — 2번 ‘회피’ 단계에서 고리를 끊는다 (TRAP → TRAC)</span>
        <span className="h-px flex-1 border-t border-dashed border-line-strong" />
      </div>
    </div>
  );
}

function SolutionCards() {
  return (
    <div className="grid grid-cols-1 border-x border-b border-line bg-white md:grid-cols-3">
      {SOLUTION_STEPS.map((s, i) => (
        <div
          key={s.no}
          className={`bd-reveal bd-delay-${i + 2} flex flex-col p-5 transition-colors hover:bg-ivory/60 ${
            i > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-serif text-3xl italic text-terra">{s.no}</span>
            <span className="chip-mono">{s.tag}</span>
          </div>
          <h4 className="mt-2.5 font-kserif text-lg font-semibold text-ink">{s.title}</h4>
          <p className="mt-1.5 flex-1 text-[13px] leading-snug text-muted">{s.desc}</p>
          <div className="mt-3.5 rounded-lg border border-dashed border-line-strong bg-ivory px-3 py-2 text-[12.5px] text-ink/80">
            {s.example}
          </div>
        </div>
      ))}
    </div>
  );
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto border border-line bg-white">
      <table className="w-full min-w-[760px] border-collapse text-left text-[13px]">
        <thead>
          <tr className="border-b border-line">
            <th className="w-[15%] px-4 py-2 font-mono text-[10.5px] font-normal uppercase tracking-wider text-muted">비교 항목</th>
            {COMPARISON.columns.map((c, i) => {
              const ours = i === COMPARISON.columns.length - 1;
              return (
                <th
                  key={c}
                  className={`border-l border-line px-4 py-2 font-semibold ${ours ? 'bg-terra/[0.07] text-terra-dark' : 'text-ink'}`}
                >
                  {ours && <span className="block font-mono text-[9.5px] uppercase tracking-wider text-terra">Ours</span>}
                  {c}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.rows.map((row) => (
            <tr key={row.label} className="border-b border-line last:border-b-0">
              <td className="px-4 py-2 font-semibold text-ink">{row.label}</td>
              {row.values.map((v, i) => {
                const ours = i === row.values.length - 1;
                return (
                  <td
                    key={v}
                    className={`border-l border-line px-4 py-2 leading-snug ${ours ? 'bg-terra/[0.07] font-medium text-ink' : 'text-muted'}`}
                  >
                    <span className="flex gap-2">
                      {ours ? (
                        <Check size={14} className="mt-[2px] shrink-0 text-terra" />
                      ) : (
                        <Minus size={14} className="mt-[2px] shrink-0 text-line-strong" />
                      )}
                      {v}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ResearchColumn({ title, icon: Icon, items }) {
  return (
    <div className="px-4 py-3 lg:px-5 lg:py-3.5">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-md border border-line bg-ivory text-terra">
          <Icon size={13} />
        </span>
        <h4 className="text-[13.5px] font-semibold text-ink">{title}</h4>
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {items.map((r) => (
          <li key={r.cite} className="grid grid-cols-[130px_1fr] gap-2.5 py-1.5">
            <div>
              <div className="font-mono text-[11px] text-ink">{r.cite}</div>
              <div className="text-[9.5px] leading-tight text-muted">{r.venue}</div>
            </div>
            <p className="text-[12px] leading-snug text-ink/85">{r.finding}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MechanismSection() {
  return (
    <section id="mechanism" className="section-anchor border-b border-line">
      {/* Slide 03-A : TRAP → TRAC 메커니즘 */}
      <div data-slide="03-A · TRAP → TRAC 원리" className="section-anchor">
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col justify-center px-5 py-6 lg:py-8">
          <SectionHeader
            index="03"
            label="Our Solution & Evidence"
            title="회피의 고리를 끊는 TRAP → TRAC 전환"
            desc="임상적으로 검증된 행동활성화(BA)의 핵심 원리를, LLM과 규칙 기반 안전장치로 일상 속 5분에 담았습니다."
          />

          <div className="mt-5">
            <CycleDiagram />
            <SolutionCards />
          </div>
        </div>
      </div>

      {/* Slide 03-B : 시장 포지셔닝 비교 매트릭스 & 선행연구 아카이브 */}
      <div
        id="mechanism-evidence"
        data-slide="03-B · 시장 비교 & 선행연구"
        className="section-anchor border-t border-line bg-sand/30"
      >
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col justify-center px-5 py-6 lg:py-8">
          <div className="bd-reveal bd-delay-1">
            <div className="mb-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="chip-mono">Part B · Market Positioning</span>
                <h3 className="font-kserif text-lg font-semibold text-ink lg:text-xl">시장 포지셔닝 비교 매트릭스</h3>
              </div>
            </div>
            <ComparisonTable />
          </div>

          <div className="bd-reveal bd-delay-2 mt-4">
            <div className="mb-2 flex items-center gap-3">
              <span className="chip-mono">Part C · Prior Research</span>
              <h3 className="font-kserif text-lg font-semibold text-ink lg:text-xl">학술적 선행연구 아카이브</h3>
            </div>
            <div className="grid grid-cols-1 border border-line bg-white lg:grid-cols-2">
              <ResearchColumn title="임상 행동활성화(BA) 검증" icon={BookMarked} items={RESEARCH.clinical} />
              <div className="border-t border-line lg:border-l lg:border-t-0">
                <ResearchColumn title="디지털 정신건강 챗봇 연구" icon={Bot} items={RESEARCH.digital} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
