import { ArrowDown, ArrowUpRight, Check, GitBranch, LockKeyhole, Plus } from 'lucide-react';
import './service-visuals.css';

/** Editorial diagrams are server-rendered and contain no invented product claims. */
export function SoftwareVisual() {
  return <section className="section visual-section" aria-labelledby="software-visual-title">
    <div className="visual-heading"><p className="eyebrow">ONE WORKFLOW / EVERY SURFACE</p><h2 id="software-visual-title">The system behind<br/><span>the screen.</span></h2><p>A useful application connects the person doing the work to the information, decisions and next steps they need.</p></div>
    <figure className="software-composition">
      <div className="software-stage">
        <div className="desktop-example">
          <div className="example-top"><span><i/><i/><i/></span><span>WORKSPACE / SERVICE OPERATIONS</span><span>Illustrative interface</span></div>
          <div className="example-workspace">
            <div className="example-sidebar"><strong>Workspace<span>Operations</span></strong><span className="selected">Service requests</span><span>Equipment</span><span>Team schedule</span><span>Documents</span><span className="sidebar-foot">Connected by design</span></div>
            <div className="example-content"><div className="example-title"><div><small>OPERATIONS</small><h3>Service requests</h3></div><span className="example-pill">Active work</span></div>
              <div className="example-table-wrap"><table className="example-table"><caption className="sr-only">Illustrative service request queue, using sample data</caption><thead><tr><th scope="col">Request</th><th scope="col">Equipment</th><th scope="col">State</th></tr></thead><tbody>
                <tr className="selected-row"><td>SR-1042</td><td>Inspection · Unit A</td><td><span className="sample-status">In progress</span></td></tr>
                <tr><td>SR-1041</td><td>Maintenance · Unit B</td><td>Scheduled</td></tr>
                <tr><td>SR-1040</td><td>Repair · Unit C</td><td>For review</td></tr>
              </tbody></table></div>
              <div className="example-detail"><span className="detail-kicker">SELECTED REQUEST / SR-1042</span><div><h4>Inspection record</h4><span>Assigned to field team</span></div><ol><li><Check size={14}/>Equipment identified</li><li><Check size={14}/>Inspection in progress</li><li><span className="outline-dot"/>Service notes to follow</li></ol></div>
            </div>
          </div>
        </div>
        <div className="mobile-example"><div className="phone-speaker"/><div className="phone-head"><span>FIELD WORK</span><strong>Today’s visit</strong></div><p className="phone-id">SR-1042</p><h3>Inspection<br/>Unit A</h3><span className="sample-status">In progress</span><div className="phone-task"><Check size={15}/><span>Check equipment record</span></div><div className="phone-task"><Check size={15}/><span>Complete inspection</span></div><div className="phone-note"><small>SERVICE NOTES</small><p>Record findings and attach the service document.</p></div><span className="phone-action">Prepare for review <ArrowUpRight size={14}/></span></div>
      </div>
      <div className="system-foundation"><span>SUPPORTING SYSTEM</span><p>Identity & roles</p><p>Workflow & approvals</p><p>APIs & data</p><p>Activity history</p></div>
      <figcaption>Illustrative application design using sample data, not a screenshot of a released WESOUL product.</figcaption>
    </figure>
  </section>;
}

export function AgentVisual() {
  return <section className="section visual-section agent-section" aria-labelledby="agent-visual-title">
    <div className="visual-heading"><p className="eyebrow">AI + EXISTING SYSTEMS</p><h2 id="agent-visual-title">Intelligence with<br/><span>clear boundaries.</span></h2><p>A person sets the goal. An agent works with permitted knowledge and tools. Decisions that need human approval stay with people.</p></div>
    <figure className="agent-diagram">
      <div className="agent-person"><span className="diagram-index">01 / HUMAN</span><h3>A request with a purpose</h3><p>Employee · Customer · Manager</p></div>
      <ArrowDown className="diagram-arrow" aria-hidden="true"/>
      <div className="permission-boundary"><div className="boundary-label"><LockKeyhole size={15}/><span>PERMITTED DATA · SCOPED TOOLS · RECORDED ACTIONS</span></div><div className="agent-core"><span className="agent-star" aria-hidden="true">✳</span><div><span className="diagram-index">02 / WESOUL AI LAYER</span><h3>Understand. Plan. Use tools.</h3></div></div><div className="agent-resources"><div><span>03 / KNOWLEDGE</span><h4>Find the context</h4><p>Documents, policies and permitted records</p></div><div><span>04 / TOOLS & APIs</span><h4>Perform a defined step</h4><p>Access only the actions the task requires</p></div><div><span>05 / BUSINESS SYSTEMS</span><h4>Work where the data lives</h4><p>ERP · CRM · HRMS · DMS · Databases</p></div></div></div>
      <ArrowDown className="diagram-arrow" aria-hidden="true"/>
      <div className="agent-decision"><GitBranch size={24} aria-hidden="true"/><div><span className="diagram-index">06 / APPROVAL GATE</span><h3>Review before a consequential action</h3><p>Approve to proceed. Revise or stop when needed.</p></div></div>
      <ArrowDown className="diagram-arrow" aria-hidden="true"/><div className="agent-outcome"><Check size={22} aria-hidden="true"/><div><span className="diagram-index">07 / OUTCOME</span><h3>A completed action. A traceable result.</h3></div></div>
      <figcaption>Illustrative architecture. Permissions, review gates and connected systems are defined for each implementation.</figcaption>
    </figure>
  </section>;
}

export function ModernizationVisual() {
  return <section className="section visual-section modernization-section" aria-labelledby="modernization-visual-title">
    <div className="visual-heading"><p className="eyebrow">ARCHITECTURE VIEW</p><h2 id="modernization-visual-title">Keep what works.<br/><span>Connect what’s next.</span></h2><p>Expose useful capabilities through a controlled integration layer, then build the experiences the business needs.</p></div>
    <figure className="modernization-diagram"><div className="layer-label"><span>01</span><h3>Your existing systems</h3><p>Preserve useful business logic and records</p></div><ul className="system-nodes">{['ERP','CRM','HRMS','Database','Legacy application'].map(s=><li key={s}>{s}</li>)}</ul><div className="integration-connector" aria-hidden="true"><ArrowDown/></div><div className="integration-layer"><span className="diagram-index">02 / THE CONNECTIVE LAYER</span><h3>Integration & APIs</h3><p>Identity · Data contracts · Permissions · Monitoring</p><span className="layer-rule"/></div><div className="integration-connector" aria-hidden="true"><ArrowDown/></div><div className="layer-label"><span>03</span><h3>New ways to use what you know</h3><p>Extend capability without replacing everything</p></div><ul className="system-nodes system-destinations">{['Web','Mobile','AI','Analytics','Partner systems'].map(s=><li key={s}>{s}</li>)}</ul><figcaption>An illustrative modernization pattern. The right boundaries depend on the systems, data and users involved.</figcaption></figure>
  </section>;
}

export function TeamVisual() {
  return <section className="section visual-section team-section" aria-labelledby="team-visual-title"><div className="visual-heading"><p className="eyebrow">YOUR TEAM + SPECIALIST CAPABILITY</p><h2 id="team-visual-title">More capability.<br/><span>Still your team.</span></h2><p>Keep product ownership and business context with your people. Bring in the engineering expertise the next stage requires.</p></div><figure className="team-composition"><div className="team-halves"><div className="client-team"><span className="diagram-index">YOUR TEAM</span><h3>The context.<br/>The direction.</h3><ul><li>Product ownership</li><li>Business knowledge</li><li>Delivery priorities</li></ul></div><div className="team-plus" aria-hidden="true"><Plus size={28}/></div><div className="specialist-team"><span className="diagram-index">WESOUL CAPABILITY</span><h3>The expertise.<br/>Where it’s needed.</h3><ul>{['Frontend & backend','Mobile & product','Architecture & integrations','AI & consulting'].map(s=><li key={s}>{s}</li>)}</ul></div></div><div className="shared-team"><span>ONE DELIVERY TEAM</span><p>Shared backlog</p><p>Code reviews</p><p>Technical decisions</p><p>Knowledge transfer</p></div><figcaption>Specialists work alongside your team. Collaboration and responsibilities are agreed around your delivery needs.</figcaption></figure></section>;
}

export function EvolutionVisual() {
  const stages=[['Web','Give the idea a first digital form.'],['Applications','Turn interactions into useful work.'],['Products','Design for ownership and everyday use.'],['Connected systems','Bring processes and information together.'],['AI-enabled systems','Add intelligence where it earns its place.']];
  return <section className="section visual-section evolution-section" aria-labelledby="evolution-title"><div className="visual-heading"><p className="eyebrow">OUR EVOLUTION</p><h2 id="evolution-title">One idea.<br/><span>More possibilities.</span></h2><p>Websites became applications. Applications became products. The same orange thread runs through everything we build.</p></div><figure className="evolution-art"><svg viewBox="0 0 1100 250" role="img" aria-label="One orange thread evolves from a simple line into connected, increasingly complex systems" preserveAspectRatio="xMidYMid meet"><g fill="none" stroke="#cfcec5" strokeWidth="1"><path d="M0 65H1100M0 185H1100"/>{[85,310,535,760,985].map(x=><path key={x} d={`M${x} 25V225`}/>)}</g><path className="evolution-thread" d="M25 150H140C210 150 190 70 260 70S290 180 355 180S410 75 475 75S490 170 550 170S580 55 650 55S685 195 755 195S790 45 855 45S880 190 945 190S1010 85 1080 85" fill="none" stroke="#f55323" strokeWidth="7" strokeLinecap="round"/><g fill="none" stroke="#181818" strokeWidth="2"><rect x="56" y="115" width="62" height="65" rx="3"/><path d="M56 130H118M285 45h52v112h-52zM293 62h36M293 136h36"/><rect x="477" y="115" width="112" height="65" rx="4"/><rect x="495" y="98" width="77" height="65" rx="4"/><circle cx="760" cy="115" r="30"/><path d="M760 85V55M730 115H698M790 115H822M760 145V175"/><circle cx="760" cy="48" r="7"/><circle cx="690" cy="115" r="7"/><circle cx="830" cy="115" r="7"/><circle cx="760" cy="183" r="7"/><circle cx="993" cy="113" r="55"/><circle cx="993" cy="113" r="35"/><path d="M965 113h56M993 85v56M973 93l40 40M973 133l40-40"/></g><circle cx="25" cy="150" r="10" fill="#f55323"/></svg><ol className="evolution-stages">{stages.map(([title,body],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol><figcaption>Different technology. The same principle: understand the idea, give it purpose, bring it to life.</figcaption></figure></section>;
}

export function InsightCover({title,category,index}:{title:string;category:string;index:number}) {
  return <div className={'editorial-cover editorial-cover--'+index} aria-hidden="true"><div className="cover-topline"><span>W / THINKING</span><span>0{index+1}</span></div><div className="cover-metaphor">{index===0?<><span className="metaphor-request"/><span className="metaphor-agent">✳</span><span className="metaphor-result"/></>:index===1?<><span className="metaphor-layer layer-one"/><span className="metaphor-layer layer-two"/><span className="metaphor-layer layer-three"/></>:<><span className="metaphor-legacy"/><span className="metaphor-bridge"/><span className="metaphor-new"/></>}</div><span className="cover-category">{category}</span><strong>{title}</strong></div>;
}
