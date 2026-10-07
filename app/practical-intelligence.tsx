'use client';

import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, CornerDownRight, LockKeyhole } from 'lucide-react';
import Link from './route-transition';
import styles from './practical-intelligence.module.css';

const examples = [
  {name:'Service requests',request:'“Arrange an inspection for this equipment.”',context:'Find the equipment record and service history.',action:'Prepare a service request in the connected system.',review:'A coordinator reviews the request before scheduling.',outcome:'A clear request. Ready for the right team.'},
  {name:'Team knowledge',request:'“What is our process for onboarding a vendor?”',context:'Retrieve the relevant approved policies and guidance.',action:'Bring the steps and their source references together.',review:'Your team checks the guidance before making a decision.',outcome:'A useful answer. Grounded in your knowledge.'},
  {name:'Purchase approvals',request:'“Help me prepare this purchase for approval.”',context:'Read the requisition and applicable approval rules.',action:'Prepare the details for the existing approval workflow.',review:'An authorized person makes the approval decision.',outcome:'Less preparation. A decision that stays with people.'},
];

export function PracticalIntelligence() {
  const [selected,setSelected]=useState(0);
  const example=examples[selected];
  return <section className={`section ${styles.section}`} id="practical-intelligence" aria-labelledby="intelligence-heading">
    <div className={styles.topline}><p className="eyebrow">03 / PRACTICAL INTELLIGENCE</p><span>LESS BUSYWORK. MORE POSSIBILITY.</span></div>
    <div className={styles.layout}>
      <div className={styles.copy}><h2 id="intelligence-heading">AI is useful<br/>when it can<br/><em>do something.</em></h2><p>Beyond answers. Into the work.</p><p>We design AI systems that understand requests, work with your knowledge and use permitted systems to help complete real business processes.</p><Link href="/ai-engineering" className={styles.explore}>Explore AI at WESOUL<span><ArrowUpRight size={21}/></span></Link><div className={styles.note}><span aria-hidden="true">✳</span><p>Built around your business.<br/>With people in control.</p></div></div>
      <div className={styles.lab}>
        <div className={styles.labTitle}><span>FROM INTENT TO OUTCOME</span><span className={styles.exampleLabel}>Illustrative workflows</span></div>
        <div className={styles.choices} role="group" aria-label="Choose an illustrative AI workflow">{examples.map((item,i)=><button type="button" key={item.name} aria-pressed={selected===i} aria-controls="intelligence-example" onClick={()=>setSelected(i)}>{item.name}</button>)}</div>
        <div id="intelligence-example" className={styles.example}>
          <div className={styles.request}><span className={styles.stepLabel}>01 / A PERSON ASKS</span><p>{example.request}</p><CornerDownRight size={21} aria-hidden="true"/></div>
          <div className={styles.connection} aria-hidden="true"><ArrowDown size={18}/></div>
          <div className={styles.engine}><div className={styles.engineMark} aria-hidden="true">✳</div><div><span className={styles.stepLabel}>02 / INTELLIGENCE AT WORK</span><h3>Context. Tools. Action.</h3></div><div className={styles.engineSteps}><p><span>UNDERSTAND & RETRIEVE</span>{example.context}</p><p><span>USE SYSTEMS & PREPARE</span>{example.action}</p></div></div>
          <div className={styles.approval}><LockKeyhole size={17} aria-hidden="true"/><p><strong>Permissions first.</strong> {example.review}</p></div>
          <div className={styles.outcome}><span className={styles.check}><Check size={19}/></span><div><span className={styles.stepLabel}>03 / A USEFUL OUTCOME</span><p>{example.outcome}</p></div></div>
        </div>
        <div className={styles.footnote}>Example patterns, not a live demo. Each workflow is scoped to your systems and approval rules.</div>
        <span className="sr-only" role="status" aria-live="polite">Selected workflow: {example.name}. {example.outcome}</span>
      </div>
    </div>
    <div className={styles.bottomline}><span>UNDERSTAND</span><span aria-hidden="true">→</span><span>CONNECT</span><span aria-hidden="true">→</span><span>ACT WITH PURPOSE</span><span className={styles.signature}>W / INTELLIGENCE WITH SOUL</span></div>
  </section>;
}
