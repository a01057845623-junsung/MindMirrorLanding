import { DoorClosed, ListX, MessageCircleQuestion } from 'lucide-react';
import { TODO_ITEMS, TREATMENT_GAP } from '../data/landingData';
import { SectionHeader } from './ui';

export default function ProblemSection() {
  return (
    <section id="problem" data-slide="02 · Problem Statement" className="section-anchor border-b border-line bg-sand/50">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col justify-center px-5 py-6 lg:py-8">
        <SectionHeader
          index="02"
          label="Problem Statement"
          title="왜 마음이 무너져도 상담실에 오지 못하고, 일상 도구는 실패할까?"
          desc="사회적 낙인과 진료 기록에 대한 두려움, 그리고 일상에서 마비되는 ‘시작의 장벽’"
        />

        <div className="mt-4 grid grid-cols-1 border border-line bg-white lg:grid-cols-2">
          {/* Left: Treatment Gap */}
          <div className="bd-reveal bd-delay-1 p-5 lg:p-6">
            <div className="flex items-center justify-between">
              <span className="chip-mono">Barrier A · Treatment Gap</span>
              <DoorClosed size={18} className="text-muted" />
            </div>
            <h3 className="mt-2.5 font-kserif text-lg font-semibold text-ink lg:text-xl">현실의 치료 장벽</h3>
            <div className="mt-3 divide-y divide-line border-y border-line">
              {TREATMENT_GAP.map((item, i) => (
                <div key={item.title} className="flex gap-3 py-2.5">
                  <span className="font-mono text-xs text-terra">0{i + 1}</span>
                  <div>
                    <p className="text-[14px] font-semibold text-ink">{item.title}</p>
                    <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Execution Gap */}
          <div className="bd-reveal bd-delay-2 border-t border-line p-5 lg:border-l lg:border-t-0 lg:p-6">
            <div className="flex items-center justify-between">
              <span className="chip-mono">Barrier B · Execution Gap</span>
              <ListX size={18} className="text-muted" />
            </div>
            <h3 className="mt-2.5 font-kserif text-lg font-semibold text-ink lg:text-xl">일상 도구의 한계</h3>
            <p className="mt-1.5 text-[13px] leading-snug text-muted">
              기존 생산성/To-Do 앱은 <strong className="text-ink">“무엇을 해야 하는가?”</strong>만 나열합니다. 무기력한
              사용자에게는 오히려 <strong className="text-crisis">‘죄책감 생성기’</strong>로 작동합니다.
            </p>

            {/* 죄책감 생성기 To-Do 목업 */}
            <div className="bg-blueprint mt-3 rounded-xl border border-line bg-ivory p-3.5">
              <div className="mb-2 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-wider text-muted">
                <span>Today · To-Do</span>
                <span className="text-crisis">0 / 4 완료</span>
              </div>
              <ul className="grid grid-cols-2 gap-1.5">
                {TODO_ITEMS.map((t) => (
                  <li key={t} className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-1.5">
                    <span className="h-3 w-3 shrink-0 rounded border border-line-strong" />
                    <span className="flex-1 truncate text-[12.5px] text-ink">[{t}]</span>
                    <span className="font-mono text-[9.5px] uppercase text-crisis/80">overdue</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-center font-kserif text-[13px] italic text-muted">
                “오늘도 아무것도 못 했네…”
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Highlight Banner */}
        <div className="bd-reveal bd-delay-3 flex flex-col gap-3 border-x border-b border-line bg-ink px-5 py-3.5 text-ivory md:flex-row md:items-center lg:px-7">
          <MessageCircleQuestion size={22} className="shrink-0 text-terra" />
          <div className="flex-1">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ivory/50">우리가 던진 핵심 질문</span>
            <p className="font-kserif text-base font-semibold leading-snug md:text-lg">
              “<span className="text-terra">무엇 때문에</span> 시작하기 어려운가?”
            </p>
          </div>
          <p className="max-w-md text-[13px] leading-snug text-ivory/75">
            할 일을 쪼개기 전에, 행동을 가로막는 <strong className="text-ivory">‘감정(막막함·불안)’</strong>을 먼저
            다루자!
          </p>
        </div>
      </div>
    </section>
  );
}
