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

const spotnanaImg = 'https://www.spotnana.com/wp-content/uploads/2025/05/openplatform-3-content-1024x580.jpg';
const singulrImg = 'https://cdn.prod.website-files.com/68c7c6fc5d08d3aa30556cf2/68c81f71e0835062c5696090_control%20pane%20-main-img.webp';
const resumeHref = '/Bhavan_Kuchibhotla_Resume.pdf';
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

function TiltFigure({src, alt, caption}: {src: string; alt: string; caption: string}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || isCoarsePointer() || prefersReducedMotion()) return;
    const box = el.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width - 0.5;
    const py = (event.clientY - box.top) / box.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-py * 4}deg) rotateY(${px * 5}deg)`;
  };

  return (
    <div
      ref={ref}
      className="feature-image"
      onPointerMove={move}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = '';
      }}
    >
      <img src={src} alt={alt} />
      <span>{caption}</span>
    </div>
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
            <span>02</span> SELECTED WORK
          </div>
          <div className="work-intro">
            <h2 data-reveal>
              Products I helped
              <br />
              <i>make real.</i>
            </h2>
            <p data-reveal data-delay="2">
              Two founding-lead cases in full — Spotnana and SingulrAI. I owned the frontend system, led the people on
              it, and sat with product on what was worth building. The cards below are the path that made those possible.
            </p>
          </div>

          <article className="feature" data-reveal>
            <TiltFigure src={spotnanaImg} alt="Spotnana booking interface" caption="SPOTNANA · ONLINE BOOKING TOOL" />
            <div className="feature-info">
              <div className="number">01</div>
              <div className="feature-role">FOUNDING FRONTEND TECH LEAD · 2020—2023</div>
              <h3>Travel, at enterprise scale.</h3>
              <p>
                Spotnana needed one booking surface for flights, hotels and cars — on web and mobile — from a blank repo. I
                bootstrapped the frontend, hired and mentored the team, and stayed close to product until a larger group
                could own it.
              </p>
              <div className="case-beats">
                <div>
                  <small>Problem</small>
                  <p>
                    Enterprise travel UIs were stitched together. There was no shared platform, no component system, and no
                    path from a three-person frontend to a multi-surface product.
                  </p>
                </div>
                <div>
                  <small>System</small>
                  <p>
                    Shared React / React Native logic, a design system, Webpack → Vite + Turborepo, CI/CD. Coding
                    standards, reviews, and mentoring so the architecture survived hiring — not just the first three
                    people.
                  </p>
                </div>
                <div>
                  <small>Outcome</small>
                  <p>
                    Mission-critical booking used daily by tens of thousands of travelers. Duplication across web and
                    mobile dropped ~40%. I grew the frontend group from 3 to 18 and aligned it with product across
                    surfaces.
                  </p>
                </div>
              </div>
              <div className="stats">
                <div>
                  <b>20–40K+</b>
                  <span>travelers</span>
                </div>
                <div>
                  <b>3 → 18</b>
                  <span>frontend team</span>
                </div>
                <div>
                  <b>~40%</b>
                  <span>less duplication</span>
                </div>
              </div>
              <div className="pill-row">
                <span>React</span>
                <span>React Native</span>
                <span>TypeScript</span>
                <span>Vite / Turborepo</span>
              </div>
              <a href="https://www.spotnana.com/open-platform/" target="_blank" rel="noreferrer">
                View the product <MoveUpRight size={15} />
              </a>
            </div>
          </article>

          <article className="feature reverse" data-reveal>
            <TiltFigure src={singulrImg} alt="SingulrAI control plane dashboard" caption="SINGULRAI · AI CONTROL PLANE" />
            <div className="feature-info">
              <div className="number">02</div>
              <div className="feature-role">FOUNDING FRONTEND TECH LEAD · 2023—2024</div>
              <h3>Dense systems, made readable.</h3>
              <p>
                SingulrAI’s product is a graph: services, agents, risk. The frontend had to stay inspectable as that graph
                got denser — and someone had to set the product and engineering bar before there was a team to inherit it.
              </p>
              <div className="case-beats">
                <div>
                  <small>Problem</small>
                  <p>
                    Security and observability data is hostile to UI. Dashboards rot into noise, and graph views collapse
                    once you have thousands of nodes and edges.
                  </p>
                </div>
                <div>
                  <small>System</small>
                  <p>
                    0→1 frontend with React Flow and D3. Testing and lint from day one. I was the frontend decision-maker:
                    what to build, what to cut, and which standards the next hires would inherit.
                  </p>
                </div>
                <div>
                  <small>Outcome</small>
                  <p>Rendering improved ~30%. Practices and architecture became the default as I grew the frontend group from founding.</p>
                </div>
              </div>
              <div className="stats">
                <div>
                  <b>0 → 1</b>
                  <span>frontend</span>
                </div>
                <div>
                  <b>1000s</b>
                  <span>nodes / edges</span>
                </div>
                <div>
                  <b>~30%</b>
                  <span>faster renders</span>
                </div>
              </div>
              <div className="pill-row">
                <span>React</span>
                <span>TypeScript</span>
                <span>D3.js</span>
                <span>React Flow</span>
              </div>
              <a href="https://singulr.ai/" target="_blank" rel="noreferrer">
                Explore SingulrAI <MoveUpRight size={15} />
              </a>
            </div>
          </article>

          <figure className="quote" data-reveal>
            <blockquote>
              Bhavan joined Singulr AI as founding front end engineer and worked single handedly to develop the
              foundations of UI from grounds up. He thrives in a fast paced startup environment and delivers features at
              speed of light. He doesn&apos;t compromise on quality and scale even under high pressure environment to
              keep the backlog under control. He did initial hiring and ramped up the team to lay the right foundation of
              the product. It was a pleasure working with him.
            </blockquote>
            <figcaption>
              <b>Rohit Reja</b>
              <span>Co-Founder, Vyomex Labs · colleague at Spotnana and SingulrAI</span>
            </figcaption>
          </figure>

          <div className="small-grid">
            <article data-reveal>
              <div className="mini-num">03</div>
              <h3>An agent, inside other people’s sites</h3>
              <p>
                Staff frontend for an embedded AI agent. Blocks-based composition, an admin for non-engineers, and the
                product call on what the agent was allowed to do — not only how it rendered.
              </p>
              <span className="ghost">BREAKOUT · 2025</span>
            </article>
            <article data-reveal data-delay="1">
              <div className="mini-num">04</div>
              <h3>A CRM, moved without a rewrite-for-purity</h3>
              <p>
                Led a ~35-page Angular CRM to React + TypeScript. Bundle down ~30%, LCP from ~4.5s to ~2.5s. A thousand
                B2B clients landed on the new stack with production still up.
              </p>
              <span className="ghost">PUSHENGAGE · 2019</span>
            </article>
            <article data-reveal>
              <div className="mini-num">05</div>
              <h3>Live social and sales surfaces</h3>
              <p>
                Real-time React UIs for social monitoring and engagement at Freshworks, plus internal NLP tagging tools
                used to train and review models.
              </p>
              <span className="ghost">FRESHWORKS · 2016</span>
            </article>
            <article data-reveal data-delay="1">
              <div className="mini-num">06</div>
              <h3>Styles that could survive a tax season</h3>
              <p>
                Refactored a large ClearTax UI into SCSS utilities, then built the early ClearSave React surface while
                the product was still finding its shape.
              </p>
              <span className="ghost">CLEARTAX · 2015</span>
            </article>
            <article data-reveal>
              <div className="mini-num">07</div>
              <h3>From the early days</h3>
              <p>
                Third engineer at OYO. Built the central reservation system and the first consumer booking flow — search,
                listings, checkout — while the company was still becoming a company.
              </p>
              <span className="ghost">OYO ROOMS · 2014</span>
            </article>
            <article data-reveal data-delay="1">
              <div className="mini-num">08</div>
              <h3>Whoever would hire a student who could ship</h3>
              <p>
                Client frontend out of Tirupati through the last year at VIT and after. Custom work until a company
                hired the same person full-time.
              </p>
              <span className="ghost">FREELANCE · 2011</span>
            </article>
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
          <div className="career">
            {career.map((row, i) => (
              <div className={row[4] ? 'career-row featured' : 'career-row'} key={row[1]} data-reveal>
                <span className="year">{row[0]}</span>
                <div>
                  <small>{row[1]}</small>
                  <h3>{row[2]}</h3>
                  <p>{row[3]}</p>
                </div>
                <span className="row-no">{String(i + 1).padStart(2, '0')}</span>
              </div>
            ))}
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
