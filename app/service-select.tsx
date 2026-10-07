'use client';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown, Layers } from 'lucide-react';
import styles from './service-select.module.css';

const options = [
  ['Software / Product Development','Bring a new product or business system to life'],
  ['Web Application','Build an experience for the browser'],
  ['Mobile Application','Create an app for people on the move'],
  ['AI / Agents','Put intelligence to work in your business'],
  ['Integration','Connect your existing tools and systems'],
  ['Modernization','Evolve the software you already rely on'],
  ['Engineering Augmentation','Add specialist capability to your team'],
  ['WESOUL Product','Explore a product from our portfolio'],
  ['Something Else','Start with the idea or problem you have'],
];

export function ServiceSelect({value,onChange,error}:{value:string;onChange:(value:string)=>void;error?:string}) {
  const uid=useId();const listId=uid+'-options';const labelId=uid+'-label';const errorId=uid+'-error';
  const [open,setOpen]=useState(false);const [active,setActive]=useState(0);const [placement,setPlacement]=useState({up:false,height:300});
  const root=useRef<HTMLDivElement>(null);const trigger=useRef<HTMLButtonElement>(null);const list=useRef<HTMLUListElement>(null);
  const search=useRef({text:'',at:0});
  useEffect(()=>{if(!open)return;const close=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false);};document.addEventListener('pointerdown',close);return()=>document.removeEventListener('pointerdown',close);},[open]);
  useEffect(()=>{if(!open)return;const menu=list.current;const item=menu?.children[active] as HTMLElement|undefined;if(menu&&item){if(item.offsetTop<menu.scrollTop)menu.scrollTop=item.offsetTop;else if(item.offsetTop+item.offsetHeight>menu.scrollTop+menu.clientHeight)menu.scrollTop=item.offsetTop+item.offsetHeight-menu.clientHeight;}},[active,open]);
  useEffect(()=>{if(!value)setOpen(false);},[value]);
  function show(index=options.findIndex(([name])=>name===value)) {const rect=trigger.current?.getBoundingClientRect();if(rect){const below=window.innerHeight-rect.bottom;const up=below<280&&rect.top>below;setPlacement({up,height:Math.max(120,Math.min(320,(up?rect.top:below)-55))});}setActive(Math.max(0,index));setOpen(true);}
  function select(index:number){onChange(options[index][0]);setOpen(false);trigger.current?.focus();search.current={text:'',at:0};}
  function keyDown(event:KeyboardEvent<HTMLButtonElement>){
    const key=event.key;
    if(key==='Escape'){if(open){event.preventDefault();event.stopPropagation();setOpen(false);}return;}
    if(key==='Tab'){setOpen(false);return;}
    if(key==='ArrowDown'||key==='ArrowUp'){event.preventDefault();if(!open)show(key==='ArrowUp'?options.length-1:undefined);else setActive(i=>(i+(key==='ArrowDown'?1:-1)+options.length)%options.length);return;}
    if(key==='Home'||key==='End'){event.preventDefault();const index=key==='Home'?0:options.length-1;if(!open)show(index);else setActive(index);return;}
    if(key==='Enter'||key===' '){event.preventDefault();if(open)select(active);else show();return;}
    if(key.length===1&&!event.ctrlKey&&!event.metaKey&&!event.altKey){event.preventDefault();const now=Date.now();const text=(now-search.current.at<700?search.current.text:'')+key.toLowerCase();search.current={text,at:now};const index=options.findIndex(([name])=>name.toLowerCase().startsWith(text));if(index>=0){if(!open)show(index);else setActive(index);}}
  }
  return <div className={styles.field} ref={root} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget as Node|null))setOpen(false);}}>
    <label id={labelId} htmlFor="contact-service">What can we help with? <span>*</span></label>
    <input type="hidden" name="service" value={value}/>
    <button ref={trigger} id="contact-service" type="button" role="combobox" aria-labelledby={labelId} aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-activedescendant={open?uid+'-'+active:undefined} aria-required="true" aria-invalid={!!error} aria-describedby={error?errorId:undefined} className={`${styles.trigger} ${open?styles.open:''} ${error?styles.invalid:''}`} onClick={()=>open?setOpen(false):show()} onKeyDown={keyDown}>
      <span className={styles.leading}><Layers size={18} strokeWidth={1.5} aria-hidden="true"/></span><span className={value?styles.value:styles.placeholder}>{value||'Select a starting point'}</span><ChevronDown className={styles.chevron} size={18} aria-hidden="true"/>
    </button>
    {open&&<div className={`${styles.popup} ${placement.up?styles.up:''}`}><div className={styles.menuHeading}>LET’S FIND YOUR STARTING POINT<span>{options.length} options</span></div><ul id={listId} ref={list} role="listbox" aria-labelledby={labelId} className={styles.list} style={{maxHeight:placement.height}}>{options.map(([name,description],i)=><li key={name} id={uid+'-'+i} role="option" aria-selected={value===name} className={`${styles.option} ${active===i?styles.active:''}`} onPointerMove={()=>setActive(i)} onPointerDown={e=>e.preventDefault()} onClick={()=>select(i)}><span><strong>{name}</strong><small>{description}</small></span><span className={styles.check}>{value===name&&<Check size={16} aria-hidden="true"/>}</span></li>)}</ul></div>}
    {error&&<p className={styles.error} id={errorId} role="alert">{error}</p>}
  </div>;
}
