import { MessageSquare, BookOpen, Network, ShieldCheck, Check, ArrowUpRight } from 'lucide-react';
import styles from './questions-to-actions.module.css';

const journey = [
  {title:'User Request',verb:'ASK',icon:MessageSquare,copy:'Start with what a person needs to get done.'},
  {title:'Understand Context',verb:'INTERPRET',icon:null,copy:'Make sense of the intent, the situation and the boundaries.'},
  {title:'Access Knowledge',verb:'RETRIEVE',icon:BookOpen,copy:'Bring in the relevant information from permitted sources.'},
  {title:'Use Business Systems',verb:'CONNECT',icon:Network,copy:'Work with the tools and systems where the process lives.'},
  {title:'Take Approved Action',verb:'ACT RESPONSIBLY',icon:ShieldCheck,copy:'Follow defined permissions and keep people at approval points.'},
  {title:'Deliver Outcome',verb:'COMPLETE',icon:Check,copy:'Turn the request into a useful result that can be reviewed.'},
];

export function QuestionsToActions() {
  return <section className={`section ${styles.section}`} id="questions-to-actions" aria-labelledby="questions-actions-title">
    <div className={styles.heading}><div><p className="eyebrow">01 / FROM QUESTIONS TO ACTIONS</p><h2 id="questions-actions-title">A question is<br/>just the <em>beginning.</em></h2></div><div className={styles.intro}><span className={styles.introMark} aria-hidden="true">↳</span><p>From understanding what you mean<br/>to helping make it happen.</p><span>SIX STEPS. ONE CONNECTED WORKFLOW.</span></div></div>
    <div className={styles.diagram}>
      <svg className={styles.thread} viewBox="0 0 1200 480" preserveAspectRatio="none" aria-hidden="true"><path d="M200 56H1000C1240 56 1240 296 1000 296H200" fill="none" stroke="#c9c8bc" strokeWidth="1.5"/><path d="M200 56H600" fill="none" stroke="#ca4c24" strokeWidth="2"/><path d="m387 51 7 5-7 5m397-10 7 5-7 5m392 108 5 7 5-7M814 291l-7 5 7 5m-400-10-7 5 7 5" fill="none" stroke="#b44b2a" strokeWidth="1.5"/></svg>
      <ol className={styles.stops} aria-label="From questions to actions: AI workflow">{journey.map(({title,verb,icon:Icon,copy},i)=><li key={title} className={styles.stop}>
        <div className={styles.node} aria-hidden="true"><span className={styles.index}>0{i+1}</span>{Icon?<Icon size={27} strokeWidth={1.35}/>:<span className={styles.soul}>✳</span>}</div>
        <div className={styles.words}><p className={styles.verb}>{verb}</p><h3>{title}</h3><p className={styles.description}>{copy}</p></div>
      </li>)}</ol>
    </div>
    <div className={styles.caption}><div><ShieldCheck size={19} aria-hidden="true"/><p>Connected by intelligence.<br/><strong>Guided by human judgment.</strong></p></div><p>An illustrative workflow.<br/>Designed around your data, systems and permissions.</p><ArrowUpRight size={27} strokeWidth={1} aria-hidden="true"/></div>
  </section>;
}
