import { ArrowUpRight, ScanSearch, ListChecks, PenTool, Blocks, Code2, ShieldCheck, Rocket, RefreshCw } from 'lucide-react';
import styles from './build-process.module.css';

const steps = [
  {title:'Understand',label:'START WITH WHY',icon:ScanSearch,body:'Get close to the business, the people and the problem worth solving.'},
  {title:'Define',label:'FIND THE FOCUS',icon:ListChecks,body:'Turn what we learn into a clear scope, priorities and shared direction.'},
  {title:'Design',label:'MAKE IT USEFUL',icon:PenTool,body:'Shape the journeys and interfaces around how people actually work.'},
  {title:'Architect',label:'SET THE FOUNDATION',icon:Blocks,body:'Connect the systems, data and decisions that make the product work.'},
  {title:'Build',label:'BRING IT TO LIFE',icon:Code2,body:'Engineer the product in focused steps, with working software to review.'},
  {title:'Validate',label:'CHECK THE DETAILS',icon:ShieldCheck,body:'Test the behavior, reliability and experience against real needs.'},
  {title:'Deploy',label:'PUT IT TO WORK',icon:Rocket,body:'Prepare the release, support the handover and help people get started.'},
  {title:'Learn & Evolve',label:'KEEP MOVING FORWARD',icon:RefreshCw,body:'Listen to users, learn from real use and improve what matters next.'},
];

export function BuildProcess() {
  return <section className={`section ${styles.section}`} id="how-we-build" aria-labelledby="build-heading">
    <div className={styles.heading}><div><p className="eyebrow">05 / HOW WESOUL BUILDS</p><h2 id="build-heading">Good software starts<br/><span>before the first line of code.</span></h2></div><p className={styles.intro}>A clear process.<br/>Care at every step.</p></div>
    <ol className={styles.grid} aria-label="WESOUL product development process">{steps.map(({title,label,icon:Icon,body},i)=><li key={title} className={styles.card}>
      <div className={styles.cardTop}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><span className={styles.icon}><Icon size={25} strokeWidth={1.4} aria-hidden="true"/></span></div>
      <div className={styles.cardBody}><p className={styles.label}>{label}</p><h3>{title}</h3><p className={styles.description}>{body}</p></div>
      <div className={styles.cardFoot} aria-hidden="true"><span className={styles.rule}/>{i===7?<RefreshCw size={16}/>:<ArrowUpRight size={17}/>}</div>
    </li>)}</ol>
    <div className={styles.footer}><span className={styles.star} aria-hidden="true">✳</span><p>Business understanding. Product thinking.<br className={styles.mobileBreak}/> Engineering discipline. Human ownership.</p><span className={styles.loop}><RefreshCw size={14} aria-hidden="true"/> Built to keep evolving</span></div>
  </section>;
}
