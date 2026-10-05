import React, {useCallback, useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Github,
  Linkedin,
  Menu,
  Moon,
  MoveUpRight,
  Sun,
  X,
} from 'lucide-react';
import './styles.css';
import portrait1 from './assets/portraits/01.jpg';
import portrait2 from './assets/portraits/02.jpg';
import portrait3 from './assets/portraits/03.jpg';

type Theme = 'dark' | 'light';

const resumeHref = '/Bhavan_Kuchibhotla_Resume.pdf';

type CarouselImage = [string, string];

const breakoutImages: CarouselImage[] = [
  ['/images/breakout-01.jpg', 'Breakout embedded agent — booking form'],
  ['/images/breakout-02.jpg', 'Breakout product tour and visitor dashboard'],
  ['/images/breakout-03.jpg', 'Breakout meeting scheduling flow'],
  ['/images/breakout-04.jpg', 'Breakout agent conversation and scheduling flow'],
];
const singulrImages: CarouselImage[] = [
  ['https://cdn.prod.website-files.com/68c7c6fc5d08d3aa30556cf2/68c81f71e0835062c5696090_control%20pane%20-main-img.webp', 'SingulrAI control plane dashboard'],
  ['https://cdn.prod.website-files.com/68c7c6fc5d08d3aa30556cf2/69522cecd23063deb5c7e09e_Group%2095.webp', 'SingulrAI product screen'],
  ['https://cdn.prod.website-files.com/68c7c6fc5d08d3aa30556cf2/69522cec994da8e11b78c075_Group%20204.webp', 'SingulrAI product interface'],
];
const spotnanaImages: CarouselImage[] = [
  ['https://www.spotnana.com/wp-content/uploads/2025/05/openplatform-3-content-1024x580.jpg', 'Spotnana open platform booking interface'],
  ['https://spotnana.com/wp-content/uploads/2022/07/1_VXB609OqmoeSJlsOLMrrrw.png', 'Spotnana travel booking product screen'],
  ['https://www.spotnana.com/wp-content/smush-webp/2024/07/Blog-Screen-Multibooking-1024x679.png.webp', 'Spotnana multi-passenger booking screen'],
  ['https://www.spotnana.com/wp-content/smush-webp/2024/12/blog_screen_ryanair-1024x533.png.webp', 'Spotnana airline booking screen'],
];
const pushengageImages: CarouselImage[] = [
  ['https://cdn.shopify.com/app-store/listing_images/6a822b1cc293113011ba9ca9321ccb69/desktop_screenshot/CKjg9NL0lu8CEAE%3D.jpg?height=900&quality=90&width=1600', 'PushEngage dashboard'],
  ['https://www.pushengage.com/wp-content/uploads/2022/01/PushEngage-Dashboard-1400x585.png', 'PushEngage dashboard overview'],
  ['https://www.pushengage.com/wp-content/uploads/2022/01/Analytics-Overview.png', 'PushEngage analytics overview'],
  ['https://www.pushengage.com/wp-content/uploads/2022/01/Opt-in-analytics.png', 'PushEngage opt-in analytics'],
];
const freshdeskImages: CarouselImage[] = [
  ['https://website-assets-fd.freshworks.com/attachments/cjiu71m7q001bz6fz4wb9pxws-ticket-list.full.png', 'Freshdesk ticket list'],
];
const cleartaxImages: CarouselImage[] = [
  ['https://assets1.cleartax-cdn.com/s/img/2018/03/27154542/CT-2.jpg', 'ClearTax ClearSave product screen'],
];
const oyoImages: CarouselImage[] = [
  ['https://m.economictimes.com/thumb/msid-54479002%2Cwidth-1600%2Cheight-900%2Cresizemode-4%2Cimgsize-257587/oyo-makes-room-to-check-in-at-6am.jpg', 'OYO Rooms early booking experience'],
  ['https://www.tnhglobal.com/wp-content/uploads/2015/08/Book-OYO-ROOM-in-3-taps-NXPowerLite-1900x700_c.jpg', 'OYO Rooms mobile booking flow'],
  ['https://miro.medium.com/v2/resize%3Afit%3A1200/1%2AAngEdf8_4bIrHTiojw0y9w.jpeg', 'OYO Rooms booking product screen'],
];

const careerProjects = [
  {period:'2026—NOW', company:'XAI', role:'Frontend Specialist Tutor', title:'Calibrating senior frontend engineering', description:'I calibrate what good senior frontend looks like. Hands-on reviews of senior candidates — React architecture, JavaScript fundamentals, UI systems, performance, production readiness — and I write the feedback other reviewers align to.', tags:['React','JavaScript','Frontend Architecture','Technical Evaluation'], images:[] as CarouselImage[]},
  {period:'2025—2026', company:'BREAKOUT', role:'Staff Frontend Engineer', title:'Embedded AI agent', description:'Technical owner for an embedded AI agent on other people’s sites. Designed a blocks-based system so UI composition stayed separate from product logic, led the admin for non-engineers, and aligned architecture with product and backend on what the agent was allowed to do.', tags:['React','TypeScript','AI','Embedded UI','Blocks'], images:breakoutImages},
  {period:'2024—2025', company:'STEALTH', role:'Founding Product / Engineer', title:'Two AI-first product concepts', description:'Sat with founders on two AI-first concepts under pre-seed experimentation. We prototyped a React + Vite web app, a Chrome sidebar, and an AI-assisted code-transformation UX — enough to decide the constraint. Neither was forced into a company.', tags:['React','Vite','Chrome Extension','AI UX'], images:[] as CarouselImage[]},
  {period:'2023—2024', company:'SINGULRAI', role:'Founding Frontend Tech Lead', title:'Dense systems, made readable', description:'0→1 analytics frontend for a dense security graph. Dashboards in React Flow and D3. I was the frontend decision-maker: what to build, what to cut, and which standards the next hires would inherit.', tags:['React','TypeScript','React Flow','D3'], images:singulrImages},
  {period:'2020—2023', company:'SPOTNANA', role:'Founding Frontend Tech Lead', title:'Travel, at enterprise scale', description:'Bootstrapped the online booking tool from a blank repo, shared React / React Native logic, and moved Webpack → Vite + Turborepo. Grew frontend 3→18, mentored, and aligned the platform with product across web and mobile.', tags:['React','React Native','TypeScript','Vite','Turborepo'], images:spotnanaImages},
  {period:'2019—2020', company:'PUSHENGAGE', role:'Senior Frontend Engineer', title:'Dashboard migration', description:'Led a ~35-page Angular CRM to React + TypeScript. Owned the new React + Node stack for 1,000+ B2B clients. Bundle down ~30%, LCP from ~4.5s to ~2.5s — a migration that kept production up.', tags:['React','TypeScript','Angular → React','Node.js'], images:pushengageImages},
  {period:'2016—2018', company:'FRESHWORKS', role:'Senior Frontend Engineer', title:'Real-time product surfaces', description:'Real-time React UIs for social monitoring and engagement, plus internal NLP tagging tools used to train and review models. Sales and social surfaces that had to stay live while the data moved.', tags:['React','Redux','Real-time UI','NLP'], images:freshdeskImages},
  {period:'2015—2016', company:'CLEARTAX', role:'Software Engineer, Frontend', title:'ClearSave', description:'Refactored a large production UI into maintainable SCSS utilities so the tax surfaces could change without a restyle every quarter. Early ClearSave: a responsive React UI while the product was still finding its shape.', tags:['React','SCSS','Responsive UI'], images:cleartaxImages},
  {period:'2014—2015', company:'OYO ROOMS', role:'Founding Frontend Engineer', title:'Booking from the early days', description:'Third engineer. Built the central reservation system from scratch and designed the first consumer booking flow — search, listings, checkout — while the company was still becoming a company.', tags:['Booking','Web','Mobile','JavaScript'], images:oyoImages},
  {period:'2011—2014', company:'FREELANCE', role:'Frontend Engineer', title:'Where the craft started', description:'Client work out of Tirupati while finishing VIT and after. Custom frontend for whoever would hire a student who could ship — the years the craft actually started.', tags:['Frontend','JavaScript','Web'], images:[] as CarouselImage[]},
];

const portraits = [
  {src: portrait1, alt: 'Bhavan Kuchibhotla, looking aside'},
  {src: portrait2, alt: 'Bhavan Kuchibhotla, portrait'},
  {src: portrait3, alt: 'Bhavan Kuchibhotla in a blazer'},
];
const sectionLinks: [string, string, string][] = [
  ['#intro', 'Intro', '01'],
  ['#work', 'Work', '02'],
  ['#practice', 'Practice', '03'],
  ['#story', 'Story', '04'],
  ['#about', 'About', '05'],
  ['#contact', 'Contact', '06'],
];
const navLinks = sectionLinks.slice(1, 5);
const marqueeItems = [
  'Founding frontend lead',
  'Design systems',
  'React',
  'TypeScript',
  'React Native',
  'Vite / Turborepo',
  'Product judgment',
  'D3 + React Flow',
  'Chrome extensions',
  'Playwright',
  'Staff conversations',
];
const career: Array<[string, string, string, string, boolean?]> = [
  ['2026—NOW', 'XAI', 'Frontend Specialist Tutor', 'I calibrate what good senior frontend looks like. Hands-on reviews of senior candidates — React architecture, JavaScript fundamentals, UI systems, performance, production readiness — and I write the feedback other reviewers align to.'],
  ['2025—2026', 'BREAKOUT', 'Staff Frontend Engineer', 'Technical owner for an embedded AI agent on other people’s sites. Designed a blocks-based system so UI composition stayed separate from product logic, led the admin for non-engineers, and aligned architecture with product and backend on what the agent was allowed to do.'],
  ['2024—2025', 'STEALTH', 'Founding Product / Engineer', 'Sat with founders on two AI-first concepts under pre-seed experimentation. We prototyped a React + Vite web app, a Chrome sidebar, and an AI-assisted code-transformation UX — enough to decide the constraint. Neither was forced into a company.'],
  ['2023—2024', 'SINGULRAI', 'Founding Frontend Tech Lead', '0→1 analytics frontend for a dense security graph. Dashboards in React Flow and D3. Testing and lint from day one. I was the frontend decision-maker: what to build, what to cut, and which standards the next hires would inherit.', true],
  ['2020—2023', 'SPOTNANA', 'Founding Frontend Tech Lead', 'Bootstrapped the online booking tool from a blank repo, shared React / React Native logic, and moved Webpack → Vite + Turborepo. Grew frontend 3→18, mentored, and aligned the platform with product across web and mobile. Tens of thousands of travelers.', true],
  ['2019—2020', 'PUSHENGAGE', 'Senior Frontend Engineer', 'Led a ~35-page Angular CRM to React + TypeScript. Owned the new React + Node stack for 1,000+ B2B clients. Bundle down ~30%, LCP from ~4.5s to ~2.5s — a migration that kept production up.'],
  ['2016—2018', 'FRESHWORKS', 'Senior Frontend Engineer', 'Real-time React UIs for social monitoring and engagement, plus internal NLP tagging tools used to train and review models. Sales and social surfaces that had to stay live while the data moved.'],
  ['2015—2016', 'CLEARTAX', 'Software Engineer, Frontend', 'Refactored a large production UI into maintainable SCSS utilities so the tax surfaces could change without a restyle every quarter. Early ClearSave: a responsive React UI while the product was still finding its shape.'],
  ['2014—2015', 'OYO ROOMS', 'Founding Frontend Engineer', 'Third engineer. Built the central reservation system from scratch and designed the first consumer booking flow — search, listings, checkout — while the company was still becoming a company.'],
  ['2011—2014', 'FREELANCE', 'Frontend engineer', 'Client work out of Tirupati while finishing VIT and after. Custom frontend for whoever would hire a student who could ship — the years the craft actually started.'],
];

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0b0b0a' : '#f3f0e9');
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    /* ignore */
  }
  return 'dark';
}

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === 'undefined' ? 'dark' : readTheme(),
  );

  const toggle = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const rect = event.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty('--toggle-x', `${rect.left + rect.width / 2}px`);
    document.documentElement.style.setProperty('--toggle-y', `${rect.top + rect.height / 2}px`);

    const commit = () => {
      setTheme(next);
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore */
      }
    };

    const doc = document as Document & {
      startViewTransition?: (update: () => void) => {finished: Promise<void>};
    };
    if (doc.startViewTransition && !prefersReducedMotion()) {
      doc.startViewTransition(commit);
      return;
    }
    commit();
  }, [theme]);

  return {theme, toggle};
}

function useMagnetic<T extends HTMLElement>(strength = 0.32) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;

    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };
    const leave = () => {
      el.style.transform = '';
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return ref;
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (prefersReducedMotion()) {
      nodes.forEach((node) => node.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      {threshold: 0.08, rootMargin: '0px 0px -4% 0px'},
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('#intro');

  useEffect(() => {
    const ids = sectionLinks.map(([href]) => href.slice(1));
    let frame = 0;
    const measure = () => {
      const line = Math.round(window.innerHeight * 0.28);
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(`#${current}`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };
    measure();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    window.addEventListener('hashchange', onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('hashchange', onScroll);
    };
  }, []);

  return active;
}

function useScrollProgress() {
  useEffect(() => {
    const root = document.documentElement;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty('--progress', String(value));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCoarsePointer()) return;
    document.documentElement.classList.add('has-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      document.documentElement.classList.add('is-cursor-on');
      document.documentElement.style.setProperty('--mx', `${x}px`);
      document.documentElement.style.setProperty('--my', `${y}px`);
      const target = event.target as Element | null;
      const hover = Boolean(target?.closest('a, button, [data-magnetic]'));
      document.documentElement.classList.toggle('is-hovering', hover);
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      frame = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, {passive: true});
    frame = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove('has-cursor', 'is-hovering', 'is-cursor-on');
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div className="spotlight" aria-hidden />
    </>
  );
}

function ThemeToggle({theme, onToggle}: {theme: Theme; onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
    >
      <Moon className="icon-moon" />
      <Sun className="icon-sun" />
      <span className="theme-knob" aria-hidden />
    </button>
  );
}

function MagneticLink({
  href,
  className,
  children,
  download,
  target,
  rel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  download?: boolean;
  target?: string;
  rel?: string;
}) {
  const ref = useMagnetic<HTMLAnchorElement>(0.36);
  return (
    <a ref={ref} href={href} className={className} download={download} target={target} rel={rel} data-magnetic>
      {children}
    </a>
  );
}

function PortraitCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((n) => (n + 1) % portraits.length), 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = card.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;
    const box = el.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${-py * 6}deg) rotateY(${px * 7}deg) translateY(-4px)`;
  };

  return (
    <div
      ref={card}
      className="portrait-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        if (card.current) card.current.style.transform = '';
      }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerMove={tilt}
    >
      <div className="portrait" role="region" aria-roledescription="carousel" aria-label="Portraits of Bhavan Kuchibhotla">
        {portraits.map((portrait, n) => (
          <img
            key={portrait.src}
            src={portrait.src}
            alt={portrait.alt}
            className={n === index ? 'is-active' : ''}
            aria-hidden={n !== index}
          />
        ))}
        <div className="portrait-caption">
          <span>BHAVAN KUCHIBHOTLA</span>
          <small>11+ YEARS · STAFF / PLATFORM</small>
        </div>
        <div className="portrait-dots" role="tablist" aria-label="Choose portrait">
          {portraits.map((portrait, n) => (
            <button
              key={portrait.src}
              type="button"
              role="tab"
              aria-selected={n === index}
              aria-label={`Portrait ${n + 1}`}
              className={n === index ? 'is-active' : ''}
              onClick={() => setIndex(n)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


function ImageLightbox({
  images,
  active,
  onClose,
  onChange,
}: {
  images: CarouselImage[];
  active: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (images.length > 1 && event.key === 'ArrowRight') onChange((active + 1) % images.length);
      if (images.length > 1 && event.key === 'ArrowLeft') onChange((active - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, images.length, onChange, onClose]);

  if (!images.length) return null;
  const [src, alt] = images[active];

  return (
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={alt} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close image">×</button>
      <div className="lightbox-content">
        <img src={src} alt={alt} />
        <div className="lightbox-footer">
          <span>{alt}</span>
          {images.length > 1 && (
            <div className="lightbox-controls">
              <button type="button" onClick={() => onChange((active - 1 + images.length) % images.length)} aria-label="Previous image">←</button>
              <span>{active + 1} / {images.length}</span>
              <button type="button" onClick={() => onChange((active + 1) % images.length)} aria-label="Next image">→</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ImageCarousel({images}: {images: CarouselImage[]}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused || lightboxOpen || prefersReducedMotion()) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % images.length), 4500);
    return () => window.clearInterval(id);
  }, [images.length, paused, lightboxOpen]);

  if (!images.length) {
    return <div className="timeline-media-placeholder" aria-hidden="true"><span /></div>;
  }

  const [src, alt] = images[active];

  return (
    <>
      <button
        type="button"
        className="image-carousel"
        aria-label={`Open ${alt}`}
        onClick={() => setLightboxOpen(true)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <img src={src} alt={alt} loading="lazy"
          onError={() => setActive((current) => images.length > 1 ? (current + 1) % images.length : current)} />
        <span className="carousel-open-hint">VIEW</span>
        {images.length > 1 && (
          <div className="carousel-controls" onClick={(event) => event.stopPropagation()}>
            <span className="carousel-count">{active + 1} / {images.length}</span>
            <div className="carousel-dots" role="tablist" aria-label="Choose image">
              {images.map(([, label], index) => (
                <span key={label} role="tab" aria-selected={index === active} aria-label={`Show image ${index + 1}: ${label}`} className={index === active ? 'is-active' : ''} />
              ))}
            </div>
          </div>
        )}
      </button>
      {lightboxOpen && (
        <ImageLightbox
          images={images}
          active={active}
          onClose={() => setLightboxOpen(false)}
          onChange={setActive}
        />
      )}
    </>
  );
}

function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }),
      );
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="clock" aria-label={`Bengaluru time ${time}`}>
      BLR {time}
    </span>
  );
}

const logoFirst = 'BHAVAN/';
const logoLast = 'KUCHIBHOTLA';

function TypewriterLogo() {
  const reduced = typeof window !== 'undefined' && prefersReducedMotion();
  const [first, setFirst] = useState(reduced ? logoFirst.length : 0);
  const [last, setLast] = useState(reduced ? logoLast.length : 0);
  const [phase, setPhase] = useState<'type-first' | 'type-last' | 'delete-last' | 'delete-first'>(
    'type-first',
  );

  useEffect(() => {
    if (prefersReducedMotion()) {
      setFirst(logoFirst.length);
      setLast(logoLast.length);
      return;
    }
    let delay = 86;
    if (phase === 'type-first' && first === logoFirst.length) delay = 220;
    else if (phase === 'type-last' && last === logoLast.length) delay = 1700;
    else if (phase === 'delete-last' && last === 0) delay = 240;
    else if (phase === 'delete-last' || phase === 'delete-first') delay = 46;

    const id = window.setTimeout(() => {
      if (phase === 'type-first') {
        if (first < logoFirst.length) setFirst((n) => n + 1);
        else setPhase('type-last');
        return;
      }
      if (phase === 'type-last') {
        if (last < logoLast.length) setLast((n) => n + 1);
        else setPhase('delete-last');
        return;
      }
      if (phase === 'delete-last') {
        if (last > 0) setLast((n) => n - 1);
        else setPhase('delete-first');
        return;
      }
      if (first > 0) setFirst((n) => n - 1);
      else setPhase('type-first');
    }, delay);
    return () => window.clearTimeout(id);
  }, [first, last, phase]);

  const firstShown = logoFirst.slice(0, first);
  const firstBody = firstShown.endsWith('/') ? firstShown.slice(0, -1) : firstShown;
  const slash = firstShown.endsWith('/');
  const lastShown = logoLast.slice(0, last);
  const caretOnLast = phase === 'type-last' || phase === 'delete-last';

  return (
    <a className="logo" href="#intro" aria-label="Bhavan Kuchibhotla">
      <span className="logo-stack" aria-hidden="true">
        <span className="logo-line">
          {firstBody}
          {slash && <span className="logo-slash">/</span>}
          {!caretOnLast && <i className="logo-caret" />}
        </span>
        <span className="logo-line logo-last">
          {lastShown}
          {caretOnLast && <i className="logo-caret" />}
        </span>
      </span>
    </a>
  );
}

function Topbar({
  theme,
  onToggle,
  active,
}: {
  theme: Theme;
  onToggle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  active: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="topbar">
      <TypewriterLogo />
      <nav className="desk-nav" aria-label="Primary">
        {navLinks.slice(0, 4).map(([href, label]) => (
          <a key={href} href={href} className={active === href ? 'is-active' : ''}>
            {label}
          </a>
        ))}
      </nav>
      <div className="topbar-end">
        <a className="availability" href="#contact">
          <i /> Open to conversations now <ArrowUpRight size={14} />
        </a>
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div id="mobile-nav" className="mobile-nav">
          {navLinks.map(([href, label]) => (
            <a key={href} href={href} onClick={close}>
              {label}
            </a>
          ))}
          <a href="#contact" onClick={close}>
            Contact
          </a>
          <a href={resumeHref} download onClick={close}>
            Resume
          </a>
        </div>
      )}
    </header>
  );
}

function App() {
  const {theme, toggle} = useTheme();
  const active = useActiveSection();
  const [booting, setBooting] = useState(() =>
    typeof window === 'undefined' ? false : !prefersReducedMotion(),
  );
  useReveal();
  useScrollProgress();

  useEffect(() => {
    if (!booting) return;
    const id = window.setTimeout(() => setBooting(false), 1100);
    return () => window.clearTimeout(id);
  }, [booting]);

  return (
    <div className="page">
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Cursor />
      <div className="grain" aria-hidden />
      <div className="progress" aria-hidden />
      {booting && (
        <div className="loader" aria-hidden>
          <b>
            BHAVAN<span>/</span>
          </b>
          <i />
        </div>
      )}
      <nav className="rail" aria-label="Sections">
        {sectionLinks.map(([href, label, num]) => (
          <a key={href} href={href} className={active === href ? 'is-active' : ''} aria-label={label}>
            <span>
              {num} {label.toUpperCase()}
            </span>
          </a>
        ))}
      </nav>
      <Topbar theme={theme} onToggle={toggle} active={active} />

      <section id="intro" className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">STAFF FRONTEND · TECH LEAD · BENGALURU</div>
            <h1>
              <span className="line">
                <span>Engineering</span>
              </span>
              <span className="line">
                <span className="serif">with taste.</span>
              </span>
            </h1>
            <p className="hero-proof">Founding frontend lead · 0→1 twice · teams 3→18 · Bengaluru</p>
            <p>
              I own the frontend system — and the team around it. Architecture, product judgment, and the practices that
              survive hiring. Taste is how it feels. Leadership is how it lasts. Looking for the next staff or founding
              frontend seat.
            </p>
            <div className="hero-links">
              <MagneticLink className="solid" href="#work">
                Explore my work <ArrowDownRight />
              </MagneticLink>
              <MagneticLink className="ghost-link" href={resumeHref} download>
                Download resume <ArrowUpRight />
              </MagneticLink>
            </div>
          </div>
          <PortraitCarousel />
        </div>
        <div className="scroll-note">
          <span>01</span>
          <div className="rule" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy}>
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`}>
                  {item}
                  <em>✦</em>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <main>
        <section id="work" className="work">
          <div className="section-label" data-reveal>
            <span>02</span> WORK / CASE STUDIES
          </div>
          <div className="work-intro">
            <h2 data-reveal>
              Products I helped
              <br />
              <i>make real.</i>
            </h2>
            <p data-reveal data-delay="2">
              One timeline, latest to oldest. Each chapter shows what I owned, the systems I worked in, and public product screens where a safe reference exists.
            </p>
          </div>

          <div className="career-timeline">
            {careerProjects.map((project, index) => (
              <article className={`timeline-item ${index % 2 ? 'is-right' : 'is-left'}`} key={project.company} data-reveal>
                <div className="timeline-node" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="timeline-card">
                  <div className="timeline-media">
                    <ImageCarousel images={project.images} />
                  </div>
                  <div className="timeline-info">
                    <div className="timeline-meta">
                      <span>{project.period}</span>
                      <span>{project.company}</span>
                    </div>
                    <div className="feature-role">{project.role}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="timeline-label">TECH / SURFACES</div>
                    <div className="pill-row">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="practice" className="practice">
          <div className="section-label" data-reveal>
            <span>03</span> PRACTICE
          </div>
          <div className="practice-head">
            <h2 data-reveal>
              The work behind
              <br />
              <i>the screens.</i>
            </h2>
            <p data-reveal data-delay="2">
              Staff frontend is the stack, the team, and the product call. The job is keeping those three from drifting
              apart.
            </p>
          </div>
          <div className="practice-grid">
            <article data-reveal>
              <small>01</small>
              <h3>Platforms &amp; design systems</h3>
              <p>Component foundations, shared tokens, and the boring rules that let a team of 18 ship without inventing a new button every week.</p>
            </article>
            <article data-reveal data-delay="1">
              <small>02</small>
              <h3>Technical leadership</h3>
              <p>Hire, mentor, review, set the bar. I grew a frontend group from 3 to 18 and aligned it with product and backend — not a team that only I could run.</p>
            </article>
            <article data-reveal data-delay="2">
              <small>03</small>
              <h3>Product judgment</h3>
              <p>I am not a PM. I sit with founders and product on discovery, cut scope, and design for the person who is not an engineer. The constraint comes before the component.</p>
            </article>
            <article data-reveal>
              <small>04</small>
              <h3>Multi-surface apps</h3>
              <p>Web, React Native, Chrome extensions, embedded agents. One business layer, conditional runtimes — not three codebases that drift.</p>
            </article>
            <article data-reveal data-delay="1">
              <small>05</small>
              <h3>Migrations in place</h3>
              <p>Angular → React, jQuery → React, Webpack → Vite. Production stays up. Bundle and LCP actually move. Rewrite-for-purity is a last resort.</p>
            </article>
            <article data-reveal data-delay="2">
              <small>06</small>
              <h3>Taste as a review skill</h3>
              <p>At xAI I assess senior frontend work — architecture, JS fundamentals, UI systems, production readiness — and calibrate what “good” means across reviewers.</p>
            </article>
          </div>
          <div id="skills" className="skills">
            <div data-reveal>
              <h3>Practice</h3>
              <div className="pill-row">
                <span>Frontend architecture</span>
                <span>Platform design</span>
                <span>Technical leadership</span>
                <span>Product judgment</span>
                <span>Design systems</span>
                <span>Performance</span>
              </div>
            </div>
            <div data-reveal data-delay="1">
              <h3>Stack</h3>
              <div className="pill-row">
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>React</span>
                <span>React Native</span>
                <span>Redux</span>
                <span>React Query</span>
                <span>D3.js</span>
                <span>React Flow</span>
              </div>
            </div>
            <div data-reveal data-delay="2">
              <h3>Tooling</h3>
              <div className="pill-row">
                <span>Vite</span>
                <span>Webpack</span>
                <span>Turborepo</span>
                <span>GitHub Actions</span>
                <span>AWS · S3 / CloudFront</span>
                <span>Playwright</span>
                <span>Jest</span>
                <span>Chrome Extensions</span>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="story">
          <div className="section-label" data-reveal>
            <span>04</span> CAREER STORY
          </div>
          <div className="story-head">
            <h2 data-reveal>
              Scope, widened
              <br />
              <i>on purpose.</i>
            </h2>
            <p data-reveal data-delay="2">
              From third engineer at OYO to founding frontend lead — hiring, product calls, then assessing senior work
              itself. The through-line is systems other people can keep.
            </p>
          </div>
          <div className="story-proof" data-reveal>
            <span>THE THROUGH-LINE</span>
            <p>The timeline above is the evidence. The progression is from shipping interfaces to owning frontend systems, product constraints, hiring, and technical judgment.</p>
          </div>
          <div className="education" data-reveal>
            <span className="year">2008—2012</span>
            <div>
              <small>EDUCATION</small>
              <h3>B.E. Information Technology</h3>
              <p>VIT University, Vellore. The computer-science foundation. Freelance started in the last year; full-time started in 2014.</p>
            </div>
            <span className="row-no">11</span>
          </div>
        </section>

        <section id="about" className="about">
          <div className="section-label" data-reveal>
            <span>05</span> HOW I WORK
          </div>
          <div className="about-head">
            <h2 data-reveal>
              Senior enough
              <br />
              <i>to see the whole thing.</i>
            </h2>
            <p className="lead" data-reveal data-delay="2">
              I’m a frontend engineer first. That is why I can lead the team and sit with product without becoming a
              tourist in either. I care less about a layer than about whether the next person can keep the system.
            </p>
          </div>
          <div className="principles">
            <div data-reveal>
              <b>01</b>
              <div>
                <h3>Constraint before abstraction</h3>
                <p>Architecture is a means. I want the product constraint in hand — often before anyone has written a spec — before I pick the clever shape.</p>
              </div>
            </div>
            <div data-reveal>
              <b>02</b>
              <div>
                <h3>Lead the people, not just the repo</h3>
                <p>Hiring, mentoring, review, alignment. A platform that only I can run is not a platform. 3 becoming 18 is a leadership problem.</p>
              </div>
            </div>
            <div data-reveal>
              <b>03</b>
              <div>
                <h3>Share logic across surfaces</h3>
                <p>Web, mobile, extension, embed. Forked products are how teams slow down. One business layer, many shells.</p>
              </div>
            </div>
            <div data-reveal>
              <b>04</b>
              <div>
                <h3>Migrate in place</h3>
                <p>Rewrite-for-purity is expensive. Incremental migrations that keep production up and move real numbers — bundle, LCP, duplication.</p>
              </div>
            </div>
            <div data-reveal>
              <b>05</b>
              <div>
                <h3>Taste is a review skill</h3>
                <p>I evaluate senior frontend work for a living. Clarity, maintainability and judgment beat novelty.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-inner">
            <div className="section-label" data-reveal>
              <span>06</span> CONTACT
            </div>
            <h2 data-reveal>
              Have a staff-shaped
              <br />
              <i>problem?</i>
            </h2>
            <p className="contact-lead" data-reveal data-delay="1">
              Bengaluru. In-office, hybrid, or remote. Actively open to staff or founding frontend-lead conversations.
              Subject line: staff / founding frontend.
            </p>
            <MagneticLink className="email" href="mailto:bhavanvitu@gmail.com?subject=Staff%20/%20founding%20frontend">
              bhavanvitu@gmail.com <ArrowUpRight />
            </MagneticLink>
            <div className="social" data-reveal>
              <a href="https://github.com/bhavan777" target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/bhavan-kuchibhotla/" target="_blank" rel="noreferrer">
                <Linkedin /> LinkedIn
              </a>
              <a href={resumeHref} download>
                <FileText /> Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>BHAVAN KUCHIBHOTLA</span>
        <Clock />
        <span>STAFF FRONTEND · BENGALURU · 2026</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
