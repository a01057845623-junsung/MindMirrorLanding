import { useState } from 'react';
import { ArrowUpRight, BookOpenCheck, ExternalLink, RotateCcw, Sparkles } from 'lucide-react';
import { APA_REFERENCES, PROTOTYPE_URL } from '../data/landingData';
import useCountdown from '../hooks/useCountdown';
import { TimerRing } from './ui';

const EASE = 'cubic-bezier(.16,.84,.44,1)';
const SPRING = 'cubic-bezier(.34,1.4,.64,1)';

const DUST_PARTICLES = [
  { cx: 345, cy: 295, r: 2.2, delay: '0.6s', dur: '4.2s' },
  { cx: 385, cy: 255, r: 1.8, delay: '1.1s', dur: '3.8s' },
  { cx: 425, cy: 310, r: 2.6, delay: '0.8s', dur: '4.6s' },
  { cx: 365, cy: 350, r: 2.0, delay: '1.4s', dur: '3.9s' },
  { cx: 445, cy: 270, r: 1.7, delay: '1.7s', dur: '4.4s' },
  { cx: 405, cy: 365, r: 2.4, delay: '0.9s', dur: '4.1s' },
  { cx: 325, cy: 375, r: 1.9, delay: '1.9s', dur: '3.7s' },
  { cx: 470, cy: 355, r: 2.1, delay: '1.2s', dur: '4.5s' },
];

/**
 * 1점 투시 건축 도면(.bl-draw) + 입체 여닫이 창문 + 볼류메트릭 채광 + 부유 입자(Particles) 씬
 */
function RoomScene({ awake }) {
  const line = awake ? 'rgba(31,30,29,0.58)' : 'rgba(251,249,245,0.30)';
  const soft = awake ? 'rgba(31,30,29,0.16)' : 'rgba(251,249,245,0.09)';
  const gridLine = awake ? 'rgba(31,30,29,0.08)' : 'rgba(251,249,245,0.05)';
  const t = (p, d = 1.4, delay = 0) => ({ transition: `${p} ${d}s ${EASE} ${delay}s` });

  return (
    <svg
      viewBox="0 0 800 430"
      className="h-auto w-full select-none"
      role="img"
      aria-label={awake ? '창문이 입체적으로 열리고 따뜻한 햇살과 빛 입자가 들어오는 방' : '어두운 방 안의 멈춘 시계와 닫힌 창문'}
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF6EC" />
          <stop offset="55%" stopColor="#FCD8BE" />
          <stop offset="100%" stopColor="#EFA278" />
        </linearGradient>
        <linearGradient id="volumetricRay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9D2" stopOpacity="0.88" />
          <stop offset="65%" stopColor="#F8C7A4" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#FBF9F5" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="floorLight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD9B8" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#FBF9F5" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#FFFDF9" stopOpacity="1" />
          <stop offset="45%" stopColor="#FFD7B3" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#D97757" stopOpacity="0" />
        </radialGradient>
        <clipPath id="windowClip">
          <rect x="305" y="58" width="190" height="234" />
        </clipPath>
      </defs>

      {/* 1. 1점 투시 건축 공간 그리드 (Perspective Room Walls & Floor) */}
      <g>
        {/* 정면 벽 프레임 (Back Wall) */}
        <rect
          x="130"
          y="28"
          width="540"
          height="302"
          fill={awake ? 'rgba(243,239,234,0.45)' : 'rgba(20,19,18,0.45)'}
          stroke={line}
          strokeWidth="1.2"
          className="bl-draw"
          style={t('all')}
        />
        {/* 원근 코너 모서리 선 (천장·바닥 투시선) */}
        <line x1="130" y1="28" x2="20" y2="0" stroke={soft} strokeWidth="1.2" style={t('stroke')} />
        <line x1="670" y1="28" x2="780" y2="0" stroke={soft} strokeWidth="1.2" style={t('stroke')} />
        <line x1="130" y1="330" x2="10" y2="425" stroke={line} strokeWidth="1.5" style={t('stroke')} />
        <line x1="670" y1="330" x2="790" y2="425" stroke={line} strokeWidth="1.5" style={t('stroke')} />

        {/* 원근 바닥 그리드 (Perspective Floor Tiles) */}
        {[350, 374, 400, 424].map((y) => (
          <line key={y} x1="20" y1={y} x2="780" y2={y} stroke={gridLine} strokeWidth="1" style={t('stroke')} />
        ))}
        {[220, 310, 400, 490, 580].map((x) => (
          <line
            key={x}
            x1={x}
            y1="330"
            x2={400 + (x - 400) * 1.65}
            y2="428"
            stroke={gridLine}
            strokeWidth="1"
            style={t('stroke')}
          />
        ))}
      </g>

      {/* 2. 창 밖 풍경 & 떠오르는 태양 */}
      <g clipPath="url(#windowClip)">
        <rect x="305" y="58" width="190" height="234" fill="#171615" />
        <rect
          x="305"
          y="58"
          width="190"
          height="234"
          fill="url(#skyGrad)"
          style={{ opacity: awake ? 1 : 0, ...t('opacity', 1.5, 0.15) }}
        />
        {/* 원경 능선 */}
        <path
          d="M300 255 Q355 232 405 248 T500 236 L500 295 L300 295 Z"
          fill="rgba(217,119,87,0.22)"
          style={{ opacity: awake ? 1 : 0, ...t('opacity', 1.6, 0.4) }}
        />
        {/* 태양 광원 */}
        <circle
          cx="400"
          cy="176"
          r="72"
          fill="url(#sunGlow)"
          style={{
            transform: awake ? 'translateY(0)' : 'translateY(120px)',
            opacity: awake ? 0.95 : 0,
            ...t('all', 2.0, 0.25),
          }}
        />
        <circle
          cx="400"
          cy="176"
          r="28"
          fill="#FFFDF9"
          style={{
            transform: awake ? 'translateY(0)' : 'translateY(120px)',
            opacity: awake ? 1 : 0,
            ...t('all', 1.9, 0.25),
          }}
        />
        {/* 창살(Mullions) */}
        <line x1="400" y1="58" x2="400" y2="292" stroke={awake ? 'rgba(193,95,62,0.32)' : 'rgba(251,249,245,0.1)'} strokeWidth="1.5" style={t('stroke')} />
        <line x1="305" y1="175" x2="495" y2="175" stroke={awake ? 'rgba(193,95,62,0.32)' : 'rgba(251,249,245,0.1)'} strokeWidth="1.5" style={t('stroke')} />
      </g>

      {/* 3. 볼류메트릭 채광 (Volumetric Sunbeams & Floor Light Polygon) */}
      <g style={{ opacity: awake ? 1 : 0, ...t('opacity', 1.6, 0.35) }}>
        {/* 바닥에 드리우는 사다리꼴 창문 빛 */}
        <polygon points="305,330 495,330 640,428 160,428" fill="url(#floorLight)" />
        {/* 바닥 창살 그림자 라인 */}
        <line x1="400" y1="330" x2="400" y2="428" stroke="rgba(217,119,87,0.18)" strokeWidth="2" />
        <line x1="235" y1="378" x2="565" y2="378" stroke="rgba(217,119,87,0.16)" strokeWidth="2" />
        {/* 공기 중을 가로지르는 입체 빛줄기 (God Rays) */}
        <polygon points="305,58 495,58 640,428 160,428" fill="url(#volumetricRay)" />
        <polygon points="335,58 465,58 560,428 240,428" fill="url(#volumetricRay)" opacity="0.65" />
      </g>

      {/* 4. 성취감 파동 링 (Mastery Ripple) */}
      {awake &&
        [0, 0.9, 1.8].map((d) => (
          <circle
            key={d}
            cx="400"
            cy="175"
            r="115"
            fill="none"
            stroke="#D97757"
            strokeWidth="1.2"
            className="animate-ripple"
            style={{ transformBox: 'fill-box', transformOrigin: 'center', animationDelay: `${d + 0.7}s`, opacity: 0 }}
          />
        ))}

      {/* 5. 입체 여닫이 덧창 (3D Casement Shutters — 클릭 시 바깥/옆으로 회전 개방) */}
      <g>
        {/* 좌측 덧창 */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'left center',
            transform: awake ? 'scaleX(0.16) skewY(-8deg)' : 'scaleX(1) skewY(0deg)',
            transition: `transform 1.45s ${SPRING} 0.1s`,
          }}
        >
          <rect
            x="305"
            y="58"
            width="95"
            height="234"
            fill={awake ? '#EAE0D5' : '#151413'}
            stroke={line}
            strokeWidth="1.4"
            style={t('all')}
          />
          {[86, 114, 142, 170, 198, 226, 254].map((y) => (
            <line key={y} x1="313" y1={y} x2="392" y2={y} stroke={awake ? 'rgba(31,30,29,0.18)' : 'rgba(251,249,245,0.08)'} strokeWidth="1" />
          ))}
        </g>

        {/* 우측 덧창 */}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'right center',
            transform: awake ? 'scaleX(0.16) skewY(8deg)' : 'scaleX(1) skewY(0deg)',
            transition: `transform 1.45s ${SPRING} 0.1s`,
          }}
        >
          <rect
            x="400"
            y="58"
            width="95"
            height="234"
            fill={awake ? '#EAE0D5' : '#151413'}
            stroke={line}
            strokeWidth="1.4"
            style={t('all')}
          />
          {[86, 114, 142, 170, 198, 226, 254].map((y) => (
            <line key={y} x1="408" y1={y} x2="487" y2={y} stroke={awake ? 'rgba(31,30,29,0.18)' : 'rgba(251,249,245,0.08)'} strokeWidth="1" />
          ))}
        </g>
      </g>

      {/* 창문 외곽 건축 몰딩 프레임 */}
      <rect x="297" y="50" width="206" height="250" fill="none" stroke={line} strokeWidth="2" style={t('stroke')} />
      <line x1="286" y1="300" x2="514" y2="300" stroke={line} strokeWidth="3.2" style={t('stroke')} />

      {/* 6. 좌측 벽시계 & 책상 위 펼쳐진 교재 첫 페이지 (TRAC 미세행동 상징) */}
      <g>
        {/* 벽시계 */}
        <circle cx="195" cy="128" r="36" fill="none" stroke={line} strokeWidth="1.8" style={t('stroke')} />
        {[0, 90, 180, 270].map((a) => (
          <line
            key={a}
            x1="195"
            y1="96"
            x2="195"
            y2="102"
            stroke={line}
            strokeWidth="1.8"
            style={{ transform: `rotate(${a}deg)`, transformOrigin: '195px 128px', ...t('stroke') }}
          />
        ))}
        <line x1="195" y1="128" x2="195" y2="108" stroke={line} strokeWidth="2.5" strokeLinecap="round" style={t('stroke')} />
        <g style={{ transformOrigin: '195px 128px', animation: awake ? 'spin 6s linear infinite' : 'none' }}>
          <line
            x1="195"
            y1="132"
            x2="195"
            y2="100"
            stroke={awake ? '#D97757' : line}
            strokeWidth="1.6"
            strokeLinecap="round"
            style={t('stroke')}
          />
        </g>
        <circle cx="195" cy="128" r="2.8" fill={awake ? '#D97757' : 'rgba(251,249,245,0.5)'} style={t('fill')} />

        {/* 책상 & 펼쳐진 교재 첫 페이지 */}
        <polygon
          points="148,284 256,284 268,300 136,300"
          fill={awake ? 'rgba(217,119,87,0.12)' : soft}
          stroke={line}
          strokeWidth="1.4"
          style={t('all')}
        />
        <line x1="146" y1="300" x2="146" y2="352" stroke={line} strokeWidth="1.5" style={t('stroke')} />
        <line x1="258" y1="300" x2="258" y2="352" stroke={line} strokeWidth="1.5" style={t('stroke')} />
        {/* 교재 첫 페이지 (깨어날 때 테라코타 빛으로 점등) */}
        <path
          d="M180 282 Q192 276 202 282 Q212 276 224 282 L228 292 Q214 287 202 292 Q190 287 176 292 Z"
          fill={awake ? '#FFF6EC' : 'none'}
          stroke={awake ? '#D97757' : line}
          strokeWidth="1.5"
          style={t('all', 1.2, 0.6)}
        />
      </g>

      {/* 7. 우측 침대 (멈춰 있던 자리) */}
      <g>
        <rect x="536" y="286" width="122" height="36" rx="5" fill={soft} stroke={line} strokeWidth="1.5" style={t('all')} />
        <rect x="650" y="254" width="10" height="82" rx="3" fill="none" stroke={line} strokeWidth="1.5" style={t('stroke')} />
        <rect x="616" y="274" width="30" height="13" rx="5" fill="none" stroke={line} strokeWidth="1.5" style={t('stroke')} />
        <line x1="546" y1="322" x2="546" y2="338" stroke={line} strokeWidth="1.5" style={t('stroke')} />
        <line x1="644" y1="322" x2="644" y2="338" stroke={line} strokeWidth="1.5" style={t('stroke')} />
      </g>

      {/* 8. 부유하는 따뜻한 빛 입자 (Floating Warm Dust Particles) */}
      {awake &&
        DUST_PARTICLES.map((p, idx) => (
          <circle
            key={idx}
            cx={p.cx}
            cy={p.cy}
            r={p.r}
            fill="#D97757"
            className="bd-particle"
            style={{
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}

      {/* 9. 첫걸음 발자국 — 침대(우측)에서 빛이 비치는 책상/창가(중앙·좌측)로 이동 */}
      {awake &&
        [
          [520, 368, -14],
          [480, 382, -20],
          [438, 372, -12],
          [395, 386, -18],
          [350, 376, -10],
        ].map(([x, y, r], i) => (
          <ellipse
            key={x}
            cx={x}
            cy={y}
            rx="8.5"
            ry="4.5"
            fill="#D97757"
            className="animate-step-in"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              rotate: `${r}deg`,
              animationDelay: `${1.0 + i * 0.28}s`,
              opacity: 0,
            }}
          />
        ))}
    </svg>
  );
}

export default function VisualClosingSection() {
  const [isAwakened, setIsAwakened] = useState(false);
  const timer = useCountdown(300);

  const awaken = () => {
    setIsAwakened(true);
    timer.start();
  };
  const reset = () => {
    setIsAwakened(false);
    timer.reset();
  };

  return (
    <section id="vision" className="section-anchor relative">
      <div
        data-slide="05 · Visual Closing"
        className={`section-anchor relative overflow-hidden transition-colors ${isAwakened ? 'bg-ivory' : 'bg-ink'}`}
        style={{ transitionDuration: '1500ms' }}
      >
        {/* 햇살 글로우 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity"
          style={{
            opacity: isAwakened ? 1 : 0,
            transitionDuration: '2000ms',
            background:
              'radial-gradient(ellipse 55% 60% at 50% 30%, rgba(217,119,87,0.30), rgba(251,249,245,0) 70%), linear-gradient(180deg, #FBF9F5 0%, #F6E7DC 100%)',
          }}
        />

        <div className="relative mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col items-center justify-center px-5 py-6">
          <span className={`eyebrow transition-colors duration-1000 ${isAwakened ? 'text-muted' : 'text-ivory/45'}`}>
            <span className="h-2 w-2 bg-terra" /> 05 / Vision
          </span>

          {/* 비주얼 스테이지 */}
          <div className="relative mt-3 w-full max-w-3xl">
            <RoomScene awake={isAwakened} />

            {/* 성취감 파동 배지 */}
            <div
              className="absolute left-0 top-0 rounded-xl border border-line bg-white/80 px-3.5 py-2 backdrop-blur transition-all duration-1000"
              style={{
                opacity: isAwakened ? 1 : 0,
                transform: isAwakened ? 'none' : 'translateY(12px)',
                transitionDelay: isAwakened ? '1.6s' : '0s',
              }}
            >
              <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted">Mastery</div>
              <div className="font-mono text-xl font-semibold text-terra">▲+4</div>
            </div>

            {/* 05:00 타이머 링 */}
            <div
              className="absolute right-0 top-0 transition-all duration-1000"
              style={{
                opacity: isAwakened ? 1 : 0,
                transform: isAwakened ? 'none' : 'scale(.9)',
                transitionDelay: isAwakened ? '1.2s' : '0s',
              }}
            >
              <TimerRing progress={timer.progress} label={timer.label} size={96} stroke={5} caption="First Step" />
            </div>
          </div>

          {/* 텍스트 영역: Before / After */}
          <div className="relative mt-3 grid min-h-[130px] w-full place-items-center text-center">
            <div
              className="col-start-1 row-start-1 flex flex-col items-center transition-all duration-700"
              style={{ opacity: isAwakened ? 0 : 1, transform: isAwakened ? 'translateY(-10px)' : 'none', pointerEvents: isAwakened ? 'none' : 'auto' }}
            >
              <p className="font-mono text-base tracking-[0.2em] text-ivory/55">00:00 — 멈춰버린 일상</p>
              <button
                type="button"
                onClick={awaken}
                className="group mt-5 inline-flex items-center gap-3 rounded-full border border-ivory/25 px-6 py-3 font-mono text-[14px] text-ivory transition-all duration-300 hover:border-terra hover:bg-terra/10"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terra opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-terra" />
                </span>
                5분의 첫 걸음 켜기
              </button>
            </div>

            <div
              className="col-start-1 row-start-1 flex flex-col items-center transition-all duration-1000"
              style={{
                opacity: isAwakened ? 1 : 0,
                transform: isAwakened ? 'none' : 'translateY(16px)',
                transitionDelay: isAwakened ? '0.9s' : '0s',
                pointerEvents: isAwakened ? 'auto' : 'none',
              }}
            >
              <h2 className="font-kserif text-2xl font-semibold leading-snug tracking-tight text-ink md:text-4xl">
                가장 무거운 순간에 건네는,
                <br />
                가장 가벼운 <span className="text-terra">첫걸음.</span>
              </h2>
              <span className="mt-3.5 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <Sparkles size={12} className="text-terra" /> Mind Mirror | Behavioral Activation AI
              </span>
              <button
                type="button"
                onClick={reset}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-muted/70 hover:text-ink"
              >
                <RotateCcw size={12} /> 다시 보기
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* APA 7th Edition References Table + Bottom CTA (한 슬라이드 화면에 표시) */}
      <div id="references" data-slide="06 · References & Launch" className="section-anchor border-t border-line bg-ivory">
        <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-container flex-col justify-center gap-2.5 px-5 py-4 pb-12">
          <div className="bd-reveal">
            <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
              <div className="flex items-baseline gap-3">
                <span className="eyebrow">
                  <span className="h-2 w-2 bg-terra" />
                  REFERENCES / APA 7TH EDITION
                </span>
                <h3 className="font-kserif text-lg font-semibold tracking-tight text-ink lg:text-xl">
                  참고문헌 및 서비스 설계 학술 근거
                </h3>
              </div>
              <span className="chip-mono w-fit shrink-0">
                <BookOpenCheck size={12} className="mr-1.5 text-terra" /> 8 Peer-Reviewed Studies · APA Style
              </span>
            </div>

            <div className="bd-reveal bd-delay-1 mt-2.5 overflow-x-auto border border-line bg-white shadow-card">
              <table className="w-full min-w-[900px] border-collapse text-left text-[11px]">
                <thead>
                  <tr className="border-b border-line bg-sand/70">
                    <th className="w-[42px] px-2.5 py-1.5 font-mono text-[9.5px] font-normal uppercase tracking-wider text-muted">
                      No.
                    </th>
                    <th className="w-[185px] border-l border-line px-3 py-1.5 font-mono text-[9.5px] font-normal uppercase tracking-wider text-muted">
                      연구 구분 · 핵심 인용
                    </th>
                    <th className="border-l border-line px-3.5 py-1.5 font-mono text-[9.5px] font-normal uppercase tracking-wider text-muted">
                      APA 7th Edition 참고문헌 전문 (Full Citation &amp; DOI)
                    </th>
                    <th className="w-[235px] border-l border-line px-3.5 py-1.5 font-mono text-[9.5px] font-normal uppercase tracking-wider text-muted">
                      Mind Mirror 서비스 설계 반영
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {APA_REFERENCES.map((ref) => (
                    <tr key={ref.no} className="align-top transition-colors hover:bg-ivory/70">
                      <td className="px-2.5 py-1 font-mono text-[10px] text-muted">{ref.no}</td>
                      <td className="border-l border-line px-3 py-1">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-block shrink-0 rounded bg-terra/10 px-1.5 py-0.5 font-mono text-[8.5px] font-medium text-terra-dark">
                            {ref.category}
                          </span>
                          <span className="font-mono text-[10.5px] font-medium text-ink">{ref.shortCite}</span>
                        </div>
                      </td>
                      <td className="border-l border-line px-3.5 py-1 leading-[1.35] text-ink/90">
                        <p className="pl-4 -indent-4">
                          <span>{ref.authorsYear} </span>
                          <span>{ref.title} </span>
                          <em className="font-serif text-[12.5px] italic text-ink">{ref.journalItalic}</em>
                          <span>{ref.journalRest}</span>
                          {ref.doi && (
                            <>
                              {' '}
                              <a
                                href={ref.doi}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline indent-0 break-all font-mono text-[10px] text-terra-dark underline decoration-terra/40 underline-offset-2 hover:text-terra"
                              >
                                {ref.doi}
                              </a>
                            </>
                          )}
                        </p>
                      </td>
                      <td className="border-l border-line bg-ivory/40 px-3.5 py-1 text-[11px] leading-[1.35] text-muted">
                        {ref.roleInService}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA & Footer integrated in final slide */}
          <div className="bd-reveal bd-delay-2 border border-line bg-sand px-5 py-2.5">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
              <div className="text-center md:text-left">
                <div className="text-[12.5px] text-muted">
                  <strong className="font-semibold text-ink">팀 도파민 삼형제</strong> (박준성 · 김승선 · 유지성) ·{' '}
                  <span className="font-kserif text-ink">경청해 주셔서 감사합니다.</span>
                </div>
                <p className="font-mono text-[10px] text-muted">
                  Mind Mirror · Behavioral Activation AI Prototype
                </p>
              </div>
              <a
                href={PROTOTYPE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-terra px-5 py-2.5 text-[14px] font-medium text-white shadow-card transition-colors duration-200 hover:bg-terra-dark"
              >
                <span>서비스 시작하기</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
