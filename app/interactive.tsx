'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from './route-transition';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Check, Menu, Search, X } from 'lucide-react';
import { products, type Product } from './data';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, []);
  const links = [['Services','/services'],['AI & Agents','/ai-engineering'],['Products','/products'],['Our Work','/work'],['About','/about'],['Insights','/insights']];
  return <header className="header"><Link className="brand" href="/" aria-label="WESOUL home"><img src="/images/mark.png" width="48" height="36" alt=""/><span>WE<span>SOUL</span></span></Link><nav id="primary-navigation" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}>{links.map(([name,href])=><Link key={href} href={href} aria-current={pathname===href?'page':undefined} onClick={()=>setOpen(false)}>{name}</Link>)}<Link href="/contact" className="nav-cta" onClick={()=>setOpen(false)}>Start a Conversation <ArrowUpRight size={15}/></Link></nav><button className="menu-toggle" aria-controls="primary-navigation" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></header>;
}

export function ProductCard({product:p}: {product:Product}) {
  return <article className="product"><Link href={'/products/'+p.slug} className="product-image" aria-label={'Explore '+p.name}><img loading="lazy" src={'/images/'+p.slug+'.webp'} width="900" height="650" alt={p.name+' concept artwork'}/><span>{p.category}</span><span className="image-arrow"><ArrowUpRight size={20}/></span></Link><div className="product-title"><h3><Link href={'/products/'+p.slug}>{p.name}</Link></h3><span>W / {String(products.indexOf(p)+1).padStart(2,'0')}</span></div><h4>{p.headline}</h4><p>{p.description}</p><Link className="card-link" href={'/products/'+p.slug}>Learn more about {p.name}<ArrowUpRight size={17}/></Link></article>;
}
export function ProductGrid({filterable=false}: {filterable?:boolean}) {
  const [filter,setFilter]=useState('All products');
  const [query,setQuery]=useState('');
  const categories=['All products','Personal finance','Healthcare','Retail','AI & automation','Procurement','E-commerce'];
  const filtered=products.filter(p=>(filter==='All products'||filter===p.category)&&(p.name+' '+p.description).toLowerCase().includes(query.toLowerCase()));
  return <>{filterable&&<div className="product-tools"><div className="filters" role="group" aria-label="Filter products">{categories.map(c=><button key={c} className={filter===c?'active':''} aria-pressed={filter===c} onClick={()=>setFilter(c)}>{c}</button>)}</div><label className="product-search"><Search size={17}/><input aria-label="Search products" placeholder="Find a product" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>}<div className="product-grid" aria-live="polite">{filtered.map(p=><ProductCard key={p.slug} product={p}/>)}</div>{!filtered.length&&<div className="empty-results"><h3>No products match your search.</h3><button className="button dark" onClick={()=>{setFilter('All products');setQuery('');}}>Reset filters</button></div>}</>;
}

export function ContactForm() {
  const [toast,setToast]=useState(false);
  const timer=useRef<ReturnType<typeof setTimeout> | null>(null);
  const formRef=useRef<HTMLFormElement>(null);
  useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
  useEffect(()=>{
    const topic = new URLSearchParams(window.location.search).get('topic');
    const form=formRef.current;
    if(topic&&form){const field=form.elements.namedItem('message') as HTMLTextAreaElement;field.value='I’d like to discuss '+topic+'.';}
  },[]);
  function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    const form=event.currentTarget;
    const data=Object.fromEntries(new FormData(form));
    if(!String(data.name).trim()||!String(data.message).trim()){
      const field=form.elements.namedItem(!String(data.name).trim()?'name':'message') as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity('Please enter a little more detail.');field.reportValidity();return;
    }
    console.log('WESOUL enquiry form submission',data);
    setToast(true);
    if(timer.current)clearTimeout(timer.current);
    timer.current=setTimeout(()=>setToast(false),6000);
    form.reset();
  }
  return <><form className="enquiry-form" ref={formRef} onSubmit={submit}><div className="form-heading"><span className="eyebrow">LET’S START WITH THE PROBLEM</span><p>A few details. A better conversation.</p></div><div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" onInput={e=>e.currentTarget.setCustomValidity('')}/></label><label>Company<input name="company" autoComplete="organization" maxLength={160} placeholder="Where you work"/></label></div><div className="form-row"><label>Work email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></label><label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Including country code"/></label></div><label>What can we help with? <span>*</span><select name="service" required defaultValue=""><option value="" disabled>Select a starting point</option>{['Software / Product Development','Web Application','Mobile Application','AI / Agents','Integration','Modernization','Engineering Augmentation','WESOUL Product','Something Else'].map(s=><option key={s}>{s}</option>)}</select></label><label>Tell us about the problem or opportunity <span>*</span><textarea name="message" required rows={5} maxLength={5000} placeholder="What would you like to build, improve or explore?" onInput={e=>e.currentTarget.setCustomValidity('')}/></label><p className="form-note" id="form-note">Preview form: submitting logs your details in this browser’s console. Nothing is sent to WESOUL.</p><button className="button orange" aria-describedby="form-note" type="submit">Start the Conversation <ArrowUpRight size={18}/></button></form><div className="toast-announcer" role="status" aria-live="polite" aria-atomic="true">{toast&&<div className="center-toast"><span className="toast-check"><Check size={23}/></span><div><strong>Form submitted in preview</strong><p>Your details were logged to the browser console.<br/>No message has been sent.</p></div><button aria-label="Dismiss notification" onClick={()=>setToast(false)}><X size={18}/></button></div>}</div></>;
}
