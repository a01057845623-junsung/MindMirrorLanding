import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Maximize2,
  Minimize2,
  Presentation,
} from 'lucide-react';

const ANCHOR_TO_SLIDE = {
  '#top': 0,
  '#team': 1,
  '#problem': 2,
  '#mechanism': 3,
  '#mechanism-evidence': 4,
  '#demo': 5,
  '#vision': 6,
  '#references': 7,
};

export default function SlideDeckController() {
  const [slides, setSlides] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPresentation, setIsPresentation] = useState(false);
  const [toast, setToast] = useState('');
  const lastPgDnRef = useRef(0);
  const wheelLockRef = useRef(0);
  const currentIdxRef = useRef(0);
  const isPresentationRef = useRef(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  }, []);

  /**
   * 모든 [data-slide] 섹션이 어떤 해상도/배율(125%, 150% 등)이나 탭 전환 상태에서도
   * 상단 고정 헤더를 제외한 화면(availH) 안에 100% 잘림 없이 들어오도록 자동 스케일 보정
   */
  const fitAllSlides = useCallback(() => {
    const els = Array.from(document.querySelectorAll('[data-slide]'));
    const navH = document.querySelector('header')?.offsetHeight || 56;
    const isDesktop = window.innerWidth >= 1024;
    const availH = window.innerHeight - navH;

    document.documentElement.style.setProperty('--nav-h', `${navH}px`);
    document.documentElement.style.setProperty('--slide-count', String(els.length || 8));

    els.forEach((slideEl) => {
      const inner = slideEl.querySelector('.max-w-container') || slideEl.firstElementChild;
      if (!inner) return;

      if (!isDesktop && !isPresentationRef.current) {
        slideEl.style.height = '';
        slideEl.style.minHeight = '';
        slideEl.style.overflow = '';
        inner.style.transform = '';
        return;
      }

      // 데스크톱 및 발표 모드에서는 각 슬라이드 프레임을 정확히 1화면(availH)으로 고정하고 수직 중앙 정렬
      slideEl.style.height = `${availH}px`;
      slideEl.style.minHeight = `${availH}px`;
      slideEl.style.overflow = 'hidden';
      slideEl.style.display = 'flex';
      slideEl.style.flexDirection = 'column';
      slideEl.style.justifyContent = 'center';

      // 내부 콘텐츠의 순수 높이(min-height 해제 상태) 측정 후 화면보다 크면 비율 축소
      inner.style.transform = '';
      inner.style.minHeight = '0px';
      inner.style.width = '100%';
      const naturalH = inner.scrollHeight;
      const safeH = availH - 18;
      if (naturalH > safeH && safeH > 200) {
        const scale = Math.max(0.65, safeH / naturalH);
        inner.style.transform = `scale(${scale.toFixed(4)})`;
        inner.style.transformOrigin = 'center center';
      }
    });
  }, []);

  const syncSlideAttributes = useCallback((activeIdx) => {
    const els = Array.from(document.querySelectorAll('[data-slide]'));
    document.documentElement.style.setProperty('--slide-idx', String(activeIdx));
    els.forEach((el, idx) => {
      if (idx === activeIdx) {
        el.setAttribute('data-active-slide', 'true');
        el.setAttribute('data-inview', 'true');
      } else {
        el.removeAttribute('data-active-slide');
      }
    });
    window.dispatchEvent(new CustomEvent('deckslidechange', { detail: { index: activeIdx } }));
  }, []);

  const getActiveVerticalIndex = useCallback(() => {
    if (isPresentationRef.current) return currentIdxRef.current;
    const els = Array.from(document.querySelectorAll('[data-slide]'));
    const navH = document.querySelector('header')?.offsetHeight || 56;
    const probeY = navH + (window.innerHeight - navH) * 0.35;
    let active = 0;
    els.forEach((el, idx) => {
      if (el.getBoundingClientRect().top <= probeY) active = idx;
    });
    return active;
  }, []);

  const goToSlide = useCallback(
    (index, behavior = 'smooth') => {
      fitAllSlides();
      const els = Array.from(document.querySelectorAll('[data-slide]'));
      if (!els.length) return;
      const clamped = Math.max(0, Math.min(index, els.length - 1));
      const target = els[clamped];

      // 타겟 슬라이드가 바뀔 때 내부 Billdr staggered reveal 애니메이션 재생
      if (clamped !== currentIdxRef.current) {
        target.removeAttribute('data-inview');
        requestAnimationFrame(() => {
          target.setAttribute('data-inview', 'true');
        });
      } else {
        target.setAttribute('data-inview', 'true');
      }

      currentIdxRef.current = clamped;
      setCurrentIdx(clamped);
      syncSlideAttributes(clamped);

      if (!isPresentationRef.current) {
        const navH = document.querySelector('header')?.offsetHeight || 56;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: Math.max(0, Math.round(top)), behavior });
      }
    },
    [fitAllSlides, syncSlideAttributes],
  );

  const setPresentationMode = useCallback(
    async (enable, tryFullscreen = true) => {
      const activeIdx = getActiveVerticalIndex();
      isPresentationRef.current = enable;
      setIsPresentation(enable);

      if (enable) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        document.documentElement.dataset.deckMode = 'horizontal';
        currentIdxRef.current = activeIdx;
        setCurrentIdx(activeIdx);
        syncSlideAttributes(activeIdx);
        fitAllSlides();
        showToast('가로 슬라이드 + 3D 플로팅 발표 모드 ON (이동: ←/→ · PgUp/PgDn | 해제: Esc / F)');

        if (tryFullscreen && !document.fullscreenElement) {
          try {
            await document.documentElement.requestFullscreen();
          } catch {
            // 브라우저 정책으로 전체화면이 차단되어도 가로 슬라이드 발표 모드는 그대로 작동
          }
        }
        setTimeout(() => {
          fitAllSlides();
          syncSlideAttributes(activeIdx);
        }, 80);
      } else {
        const restoreIdx = currentIdxRef.current;
        document.documentElement.dataset.deckMode = 'vertical';
        if (document.fullscreenElement) {
          try {
            await document.exitFullscreen();
          } catch {
            // ignore
          }
        }
        showToast('일반 웹 스크롤 모드로 전환되었습니다.');
        setTimeout(() => {
          fitAllSlides();
          goToSlide(restoreIdx, 'instant');
        }, 80);
      }
    },
    [fitAllSlides, getActiveVerticalIndex, goToSlide, showToast, syncSlideAttributes],
  );

  const togglePresentation = useCallback(() => {
    setPresentationMode(!isPresentationRef.current, true);
  }, [setPresentationMode]);

  useEffect(() => {
    document.documentElement.dataset.deckMode = 'vertical';
    const els = Array.from(document.querySelectorAll('[data-slide]'));
    setSlides(els.map((el) => el.getAttribute('data-slide') || ''));
    if (els[0]) {
      els[0].setAttribute('data-inview', 'true');
      els[0].setAttribute('data-active-slide', 'true');
    }
    fitAllSlides();

    // REA 추출 Billdr IntersectionObserver 패턴: 일반 수직 스크롤 시 뷰포트 진입 감지
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-inview', 'true');
          }
        });
      },
      { threshold: 0.25 },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      if (isPresentationRef.current) return;
      const active = getActiveVerticalIndex();
      currentIdxRef.current = active;
      setCurrentIdx(active);
      syncSlideAttributes(active);
    };

    const onResize = () => {
      fitAllSlides();
    };

    const onFullscreenChange = () => {
      // 사용자가 Esc로 브라우저 전체화면을 빠져나온 경우 일반 웹 모드로 자연스럽게 복귀
      if (!document.fullscreenElement && isPresentationRef.current) {
        setPresentationMode(false, false);
      } else {
        setTimeout(() => {
          fitAllSlides();
        }, 80);
      }
    };

    // 상단 GNB 및 본문 내 앵커(#team 등) 클릭 시 현재 모드에 맞춰 매끄럽게 슬라이드 이동
    const onAnchorClick = (e) => {
      const link = e.target?.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (hash && hash in ANCHOR_TO_SLIDE) {
        e.preventDefault();
        goToSlide(ANCHOR_TO_SLIDE[hash]);
      }
    };

    // 탭 전환·버튼 클릭 등으로 내부 DOM 높이가 바뀔 때 즉시 재계산
    const mo = new MutationObserver(() => {
      fitAllSlides();
    });
    const mainEl = document.querySelector('main');
    if (mainEl) {
      mo.observe(mainEl, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    }
    document.addEventListener('click', onAnchorClick);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [fitAllSlides, getActiveVerticalIndex, goToSlide, setPresentationMode, syncSlideAttributes]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) return;

      if (e.key === 'PageDown') {
        e.preventDefault();
        const now = performance.now();
        const delta = now - lastPgDnRef.current;
        lastPgDnRef.current = now;

        // 빠르게 PgDn 2번 연속 입력 시 가로 발표 모드 토글
        if (delta > 0 && delta < 340) {
          lastPgDnRef.current = 0;
          togglePresentation();
          return;
        }

        const active = isPresentationRef.current ? currentIdxRef.current : getActiveVerticalIndex();
        goToSlide(active + 1);
      } else if (e.key === 'PageUp') {
        e.preventDefault();
        const active = isPresentationRef.current ? currentIdxRef.current : getActiveVerticalIndex();
        goToSlide(active - 1);
      } else if (isPresentationRef.current && (e.key === 'ArrowRight' || e.key === ' ')) {
        e.preventDefault();
        goToSlide(currentIdxRef.current + 1);
      } else if (isPresentationRef.current && e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide(currentIdxRef.current - 1);
      } else if (isPresentationRef.current && e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (isPresentationRef.current && e.key === 'End') {
        e.preventDefault();
        goToSlide((slides.length || 8) - 1);
      } else if (isPresentationRef.current && e.key === 'Escape') {
        e.preventDefault();
        setPresentationMode(false, false);
      } else if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        togglePresentation();
      }
    };

    // 발표 모드에서는 마우스 휠도 1칸씩 가로 슬라이드로 스냅 이동
    const onWheel = (e) => {
      if (!isPresentationRef.current) return;
      e.preventDefault();
      const now = performance.now();
      if (now - wheelLockRef.current < 680) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 18) return;
      wheelLockRef.current = now;
      if (delta > 0) {
        goToSlide(currentIdxRef.current + 1);
      } else {
        goToSlide(currentIdxRef.current - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
    };
  }, [getActiveVerticalIndex, goToSlide, setPresentationMode, slides.length, togglePresentation]);

  const total = slides.length || 8;
  const progressPct = ((currentIdx + 1) / total) * 100;

  return (
    <>
      {/* 발표 모드 전용 상단 가로 진행 게이지 (Keynote 스타일) */}
      {isPresentation && (
        <div className="fixed inset-x-0 top-14 z-50 h-[3px] bg-line/40">
          <div
            className="h-full bg-terra transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              transitionTimingFunction: 'cubic-bezier(.16,.84,.44,1)',
            }}
          />
        </div>
      )}

      {toast && (
        <div className="fixed left-1/2 top-16 z-50 -translate-x-1/2 animate-fade-up rounded-full border border-line bg-ink/95 px-4 py-2 font-mono text-xs text-ivory shadow-card">
          {toast}
        </div>
      )}

      {/* 우하단 하이브리드 슬라이드 컨트롤러 HUD */}
      <div className="fixed bottom-3 right-4 z-50 hidden items-center gap-1.5 rounded-full border border-line-strong bg-white/92 px-3 py-1 shadow-card backdrop-blur-md md:flex">
        <Presentation size={13} className="text-terra" />
        <span className="px-1 font-mono text-[11px] font-medium text-ink">
          {String(currentIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className="hidden max-w-[135px] truncate font-mono text-[10.5px] text-muted lg:inline">
          {slides[currentIdx]}
        </span>

        {/* 슬라이드 도트 인디케이터 (클릭 시 즉시 해당 슬라이드로 이동) */}
        <div className="mx-1 hidden items-center gap-1 xl:flex">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              title={`${i + 1}번 슬라이드로 이동`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIdx === i ? 'w-4 bg-terra' : 'w-1.5 bg-line-strong hover:bg-muted'
              }`}
            />
          ))}
        </div>

        <span className="mx-0.5 h-3 w-px bg-line-strong" />
        <button
          type="button"
          onClick={() => goToSlide(currentIdx - 1)}
          disabled={currentIdx <= 0}
          title={isPresentation ? '이전 슬라이드 (← / PgUp)' : '이전 슬라이드 (PgUp)'}
          className="grid h-6 w-6 place-items-center rounded-full text-ink transition-colors hover:bg-sand disabled:opacity-30"
        >
          {isPresentation ? <ChevronLeft size={13} /> : <ChevronUp size={13} />}
        </button>
        <button
          type="button"
          onClick={() => goToSlide(currentIdx + 1)}
          disabled={currentIdx >= total - 1}
          title={isPresentation ? '다음 슬라이드 (→ / PgDn)' : '다음 슬라이드 (PgDn)'}
          className="grid h-6 w-6 place-items-center rounded-full text-ink transition-colors hover:bg-sand disabled:opacity-30"
        >
          {isPresentation ? <ChevronRight size={13} /> : <ChevronDown size={13} />}
        </button>
        <span className="mx-0.5 h-3 w-px bg-line-strong" />
        <button
          type="button"
          onClick={togglePresentation}
          title="가로 슬라이드 발표 모드 전환 (단축키: F 또는 PgDn×2)"
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10.5px] transition-colors ${
            isPresentation ? 'bg-terra text-white' : 'bg-ink text-ivory hover:bg-terra'
          }`}
        >
          {isPresentation ? <Minimize2 size={11} /> : <Maximize2 size={11} />}
          <span>{isPresentation ? '발표 모드 해제 (Esc)' : '가로 발표 모드 (F)'}</span>
        </button>
      </div>
    </>
  );
}
