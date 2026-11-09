import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '../data/landingData';

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateActive = () => {
      const isHorizontal = document.documentElement.dataset.deckMode === 'horizontal';
      setScrolled(isHorizontal || window.scrollY > 8);

      if (isHorizontal) {
        const activeSlide = document.querySelector('[data-slide][data-active-slide="true"]');
        const slideName = activeSlide?.getAttribute('data-slide') || '';
        if (slideName.startsWith('01')) setActive('team');
        else if (slideName.startsWith('02')) setActive('problem');
        else if (slideName.startsWith('03')) setActive('mechanism');
        else if (slideName.startsWith('04')) setActive('demo');
        else if (slideName.startsWith('05') || slideName.startsWith('06')) setActive('vision');
        else setActive('');
        return;
      }

      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 140) current = item.id;
      }
      setActive(current);
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('deckslidechange', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('deckslidechange', updateActive);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? 'border-line bg-ivory/85 backdrop-blur-md' : 'border-transparent bg-ivory'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-container items-center justify-between gap-6 px-5">
        <a href="#top" className="flex shrink-0 items-center gap-2.5 text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-terra font-serif text-lg italic leading-none text-white">
            M
          </span>
          <span className="font-semibold tracking-tight text-lg">Mind Mirror</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors duration-200 ${
                active === item.id ? 'bg-ink text-ivory' : 'text-muted hover:bg-sand hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
