'use client';
import { useEffect, useRef, useState } from 'react';
import Link from './route-transition';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';


export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); menuRef.current?.focus(); } };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [open]);
  const links = [['Services','/services'],['AI & Agents','/ai-engineering'],['Products','/products'],['Our Work','/work'],['About','/about'],['Insights','/insights']];
  return <header className="header"><Link className="brand" href="/" aria-label="WESOUL home"><img src="/images/mark.png" width="48" height="36" alt=""/><span>WE<span>SOUL</span></span></Link><nav id="primary-navigation" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}>{links.map(([name,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}>{name}</Link>)}<Link href="/contact" className="nav-cta" onClick={()=>setOpen(false)}>Start a Conversation <ArrowUpRight size={15}/></Link></nav><button ref={menuRef} className="menu-toggle" aria-controls="primary-navigation" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>;
}
