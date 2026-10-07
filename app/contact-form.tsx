'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { ServiceSelect } from './service-select';
export function ContactForm() {
  const [toast,setToast]=useState(false);
  const [service,setService]=useState('');
  const [serviceError,setServiceError]=useState('');
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
    if(!service){setServiceError('Please select what we can help with.');form.querySelector<HTMLButtonElement>('#contact-service')?.focus();return;}
    console.log('WESOUL enquiry form submission',data);
    setToast(true);
    if(timer.current)clearTimeout(timer.current);
    timer.current=setTimeout(()=>setToast(false),6000);
    form.reset();
  }
  return <><form className="enquiry-form" ref={formRef} onSubmit={submit} onReset={()=>{setService('');setServiceError('');}}><div className="form-heading"><span className="eyebrow">LET’S START WITH THE PROBLEM</span><p>A few details. A better conversation.</p></div><div className="form-row"><label>Your name <span>*</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" onInput={e=>e.currentTarget.setCustomValidity('')}/></label><label>Company<input name="company" autoComplete="organization" maxLength={160} placeholder="Where you work"/></label></div><div className="form-row"><label>Work email <span>*</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com"/></label><label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Including country code"/></label></div><ServiceSelect value={service} error={serviceError} onChange={value=>{setService(value);setServiceError('');}}/><label>Tell us about the problem or opportunity <span>*</span><textarea name="message" required rows={5} maxLength={5000} placeholder="What would you like to build, improve or explore?" onInput={e=>e.currentTarget.setCustomValidity('')}/></label><p className="form-note" id="form-note">Preview form: submitting logs your details in this browser’s console. Nothing is sent to WESOUL.</p><button className="button orange" aria-describedby="form-note" type="submit">Start the Conversation <ArrowUpRight size={18}/></button></form><div className="toast-announcer" role="status" aria-live="polite" aria-atomic="true">{toast&&<div className="center-toast"><span className="toast-check"><Check size={23}/></span><div><strong>Form submitted in preview</strong><p>Your details were logged to the browser console.<br/>No message has been sent.</p></div><button aria-label="Dismiss notification" onClick={()=>setToast(false)}><X size={18}/></button></div>}</div></>;
}
