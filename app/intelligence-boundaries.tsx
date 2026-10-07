import { ArrowDown, ArrowUpRight, BookOpen, Braces, Check, Database, LockKeyhole, ShieldCheck, UserRound } from 'lucide-react';
import styles from './intelligence-boundaries.module.css';

export function IntelligenceBoundaries() {
  return <section className={`section ${styles.section}`} id="intelligence-boundaries" aria-labelledby="agent-visual-title">
    <div className={styles.topline}><p className="eyebrow">05 / AI + EXISTING SYSTEMS</p><span>CAPABILITY, WITH CONTROL.</span></div>
    <div className={styles.layout}>
      <div className={styles.copy}><h2 id="agent-visual-title">Intelligence<br/>with <em>clear <br/>boundaries.</em></h2><p className={styles.lead}>Powerful enough to help.<br/>Considered enough to trust.</p><p className={styles.body}>A person sets the goal. An agent works with permitted knowledge and tools. Decisions that need human approval stay with people.</p>
        <ol className={styles.principles}><li><span>01</span><div><h3>Access with purpose</h3><p>Only the information and tools the task needs.</p></div></li><li><span>02</span><div><h3>People at the right points</h3><p>Review before consequential actions.</p></div></li><li><span>03</span><div><h3>A result you can follow</h3><p>Defined responsibilities and recorded actions.</p></div></li></ol>
      </div>
      <figure className={styles.figure} aria-label="Architecture: a human request enters a permission boundary containing the WESOUL AI layer, knowledge, tools and systems; human approval precedes the outcome.">
        <div className={styles.canvas}>
          <div className={styles.canvasTop}><span>W / SYSTEM ARCHITECTURE</span><span className={styles.cornerMark} aria-hidden="true">✳</span></div>
          <div className={styles.person}><span className={styles.personIcon}><UserRound size={20} strokeWidth={1.4}/></span><div><span className={styles.kicker}>HUMAN INTENT</span><h3>A request with a purpose</h3><p>Employee · Customer · Manager</p></div></div>
          <div className={styles.connector} aria-hidden="true"><ArrowDown size={17}/></div>
          <div className={styles.boundary}>
            <div className={styles.boundaryLabel}><LockKeyhole size={12} aria-hidden="true"/>PERMISSION BOUNDARY</div>
            <div className={styles.core}><div className={styles.orbit} aria-hidden="true"><span>✳</span><i/><b/></div><span className={styles.kicker}>WESOUL AI LAYER</span><h3>Understand. Plan. Use tools.</h3><p>Intelligence working within a defined scope.</p></div>
            <div className={styles.branches} aria-hidden="true"><span/><span/><span/></div>
            <div className={styles.resources}>{[{Icon:BookOpen,name:'Knowledge',note:'Documents, policies & permitted records'},{Icon:Braces,name:'Tools & APIs',note:'Only the actions the task requires'},{Icon:Database,name:'Business systems',note:'ERP · CRM · HRMS · DMS · Databases'}].map(({Icon,name,note})=><div className={styles.resource} key={name}><Icon size={20} strokeWidth={1.25} aria-hidden="true"/><h4>{name}</h4><p>{note}</p></div>)}</div>
            <div className={styles.boundaryFoot}><span>SCOPED ACCESS</span><span>RECORDED ACTIONS</span></div>
          </div>
          <div className={styles.connector} aria-hidden="true"><ArrowDown size={17}/></div>
          <div className={styles.approval}><span className={styles.shield}><ShieldCheck size={24} strokeWidth={1.4}/></span><div><span className={styles.kicker}>HUMAN APPROVAL</span><h3>The decision stays with people.</h3><p>Approve to proceed. Revise or stop when needed.</p></div><ArrowUpRight className={styles.approvalArrow} size={20} aria-hidden="true"/></div>
          <div className={styles.connector} aria-hidden="true"><ArrowDown size={17}/></div>
          <div className={styles.outcome}><Check size={19} aria-hidden="true"/><div><span className={styles.kicker}>A TRACEABLE OUTCOME</span><p>A completed action. A clear record.</p></div></div>
        </div>
        <figcaption>Illustrative architecture. Permissions, review gates and connected systems are defined for each implementation.</figcaption>
      </figure>
    </div>
  </section>;
}
