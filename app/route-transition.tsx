'use client';

import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { flushSync } from 'react-dom';
import { Suspense, createContext, startTransition, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';
import { routeLabel, routeTarget } from './route-target';
import { afterPaint } from './transition-scheduler';
import './route-transition.css';

type Phase = 'idle' | 'cover' | 'reveal';
type NavigationOptions = { replace?: boolean; scroll?: boolean };
const TransitionContext = createContext<((destination: URL, options: NavigationOptions) => void) | null>(null);

/** Lives in the persistent root layout, outside the changing page segment. */
export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [scene, setScene] = useState<{ phase: Phase; label: string; id: number }>({ phase: 'idle', label: '', id: 0 });
  const active = useRef(false);
  const started = useRef(0);
  const sequence = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const route = useRef('');
  const reduced = useRef(false);
  const cancelScheduledNavigation = useRef<(() => void) | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const dismiss = useCallback(() => {
    clearTimers();
    active.current = false;
    setScene(value => ({ ...value, phase: 'idle' }));
  }, [clearTimers]);

  const begin = useCallback((destination: URL) => {
    clearTimers();
    active.current = true;
    started.current = performance.now();
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setScene({ phase: 'cover', label: routeLabel(destination.pathname), id: ++sequence.current });
    // A cancelled or failed navigation must never trap the visitor behind a curtain.
    timers.current.push(setTimeout(dismiss, 12000));
  }, [clearTimers, dismiss]);

  const navigate = useCallback((destination: URL, options: NavigationOptions) => {
    cancelScheduledNavigation.current?.();
    // Commit outside React's navigation transition, then allow a browser paint.
    // This also works for prefetched destinations that commit immediately.
    flushSync(() => begin(destination));
    cancelScheduledNavigation.current = afterPaint(requestAnimationFrame, cancelAnimationFrame, () => {
      cancelScheduledNavigation.current = null;
      const href = destination.pathname + destination.search + destination.hash;
      startTransition(() => {
        if (options.replace) router.replace(href, { scroll: options.scroll });
        else router.push(href, { scroll: options.scroll });
      });
    });
  }, [begin, router]);

  const committed = useCallback((key: string) => {
    if (route.current === key) return;
    route.current = key;
    if (!active.current) return;
    clearTimers();
    const remaining = Math.max(0, (reduced.current ? 350 : 700) - (performance.now() - started.current));
    timers.current.push(setTimeout(() => {
      setScene(value => ({ ...value, phase: 'reveal' }));
      timers.current.push(setTimeout(dismiss, reduced.current ? 120 : 520));
    }, remaining));
  }, [clearTimers, dismiss]);

  useEffect(() => {
    const initial = new URL(window.location.href);
    const initialQuery = initial.searchParams.toString();
    route.current = initial.pathname + (initialQuery ? '?' + initialQuery : '');
    const onHistory = () => {
      const next = new URL(window.location.href);
      const query = next.searchParams.toString();
      if (next.pathname + (query ? '?' + query : '') !== route.current) begin(next);
    };
    const onPageShow = (event: PageTransitionEvent) => { if (event.persisted) dismiss(); };
    window.addEventListener('popstate', onHistory);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      clearTimers();
      cancelScheduledNavigation.current?.();
      window.removeEventListener('popstate', onHistory);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [begin, clearTimers, dismiss]);

  const visible = scene.phase !== 'idle';
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') dismiss(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [visible, dismiss]);

  return <TransitionContext.Provider value={navigate}>
    <Suspense fallback={null}><RouteCommit onCommit={committed}/></Suspense>
    <div className="site-shell" inert={visible || undefined}>{children}</div>
    <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{visible ? `Opening ${scene.label}` : ''}</div>
    {visible && <div key={scene.id} className={`route-curtain route-curtain--${scene.phase}`}>
      <div className="route-curtain-grid" aria-hidden="true"/>
      <div className="route-curtain-top"><span className="route-wordmark">WE<span>SOUL</span><sup>✳</sup></span><span className="route-edition">IDEAS INTO WHAT’S NEXT</span></div>
      <div className="route-curtain-center" aria-hidden="true">
        <div className="route-orbit"><span className="route-orbit-ring"/><span className="route-orbit-ring route-orbit-ring--inner"/><span className="route-orbit-dot"/><svg className="route-soul-mark" viewBox="0 0 100 100" fill="none"><path d="M50 8V92M8 50H92M20.3 20.3L79.7 79.7M20.3 79.7L79.7 20.3" stroke="currentColor" strokeWidth="14"/><circle cx="50" cy="50" r="13" fill="#181918"/></svg></div>
        <div className="route-manifesto">Give ideas a <em>Soul.</em></div>
        <div className="route-destination"><span>EXPLORING</span><strong>{scene.label}</strong></div>
      </div>
      <div className="route-curtain-bottom"><span>THINK. BUILD. EVOLVE.</span><span className="route-loading-label"><i/> A NEW PERSPECTIVE</span><button onClick={dismiss}>Skip transition <span aria-hidden="true">↗</span></button></div>
      <div className="route-loading-track" aria-hidden="true"><span/></div>
    </div>}
  </TransitionContext.Provider>;
}

function RouteCommit({ onCommit }: { onCommit: (key: string) => void }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const query = search.toString();
  useEffect(() => { onCommit(pathname + (query ? '?' + query : '')); }, [pathname, query, onCommit]);
  return null;
}

/** Keep Next Link's prefetching; navigate through the App Router after the curtain paints. */
export default function Link({ onClick, onNavigate, ...props }: ComponentProps<typeof NextLink>) {
  const navigate = useContext(TransitionContext);
  return <NextLink {...props} onNavigate={onNavigate} onClick={event => {
    onClick?.(event);
    const anchor = event.currentTarget;
    if (!navigate || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
    const target = routeTarget(anchor.href, window.location.href);
    if (!target) return;
    let cancelled = false;
    onNavigate?.({ preventDefault() { cancelled = true; event.preventDefault(); } });
    if (cancelled) return;
    event.preventDefault();
    navigate(target, { replace: props.replace, scroll: props.scroll });
  }}/>;
}
