import { BookOpen, Check, Code2, Palette } from 'lucide-react';
import { TEAM } from '../data/landingData';
import { SectionHeader } from './ui';

const ICONS = { code: Code2, book: BookOpen, palette: Palette };

export default function TeamRoleSection() {
  return (
    <section id="team" data-slide="01 · Team & Roles" className="section-anchor border-b border-line">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col justify-center px-5 py-6 lg:py-8">
        <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <SectionHeader
            index="01"
            label="Team & Roles"
            title="팀 도파민 삼형제 및 역할 분담"
            desc="심리학적 임상 원리, 학술 선행연구, 모던 웹 인터랙션을 결합한 다학제 프로토타입 팀"
          />
          <span className="bd-reveal bd-delay-1 chip-mono w-fit">3 Members · 3 Disciplines</span>
        </div>

        <div className="mt-5 grid grid-cols-1 border border-line bg-white md:grid-cols-3">
          {TEAM.map((m, i) => {
            const Icon = ICONS[m.icon];
            return (
              <article
                key={m.name}
                className={`bd-reveal bd-delay-${i + 1} group relative flex flex-col p-5 transition-colors duration-300 hover:bg-ivory lg:p-6 ${
                  i > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''
                }`}
              >
                {/* 상단 액센트 라인 (호버 시) */}
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-terra transition-transform duration-500 group-hover:scale-x-100" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-muted">0{i + 1}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-lg border border-line bg-ivory text-terra">
                    <Icon size={16} />
                  </span>
                </div>

                <div className="mt-3.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-terra-dark">{m.role}</span>
                  <h3 className="mt-0.5 font-kserif text-[1.45rem] font-semibold tracking-tight text-ink">{m.name}</h3>
                  <p className="mt-0.5 text-[13px] text-muted">
                    <span className="font-medium text-ink">{m.dept}</span> · {m.roleDetail}
                  </p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.badges.map((b) => (
                    <span key={b} className="rounded-md bg-terra/10 px-2 py-0.5 font-mono text-[10.5px] text-terra-dark">
                      {b}
                    </span>
                  ))}
                </div>

                <ul className="mt-4 space-y-2 border-t border-dashed border-line-strong pt-4">
                  {m.tasks.map((t) => (
                    <li key={t} className="flex gap-2 text-[13px] leading-snug text-ink/85">
                      <Check size={14} className="mt-[2px] shrink-0 text-terra" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
