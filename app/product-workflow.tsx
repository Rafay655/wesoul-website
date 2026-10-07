import type { CSSProperties } from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';
import styles from './product-workflow.module.css';

export function ProductWorkflow({name,steps,evaluation=false}:{name:string;steps:string[];evaluation?:boolean}) {
  const columns=steps.length>4?Math.ceil(steps.length/2):steps.length;
  const rows=Math.ceil(steps.length/columns);
  const points=steps.map((_,i)=>{const row=Math.floor(i/columns);const col=row%2?columns-1-i%columns:i%columns;return {x:(col+.5)*1000/columns,y:57+row*210,row,col};});
  const path=points.map((point,i)=>{if(i===0)return `M${point.x} ${point.y}`;const prev=points[i-1];return point.row===prev.row?`H${point.x}`:`C990 ${prev.y} 990 ${point.y} ${point.x} ${point.y}`;}).join(' ');
  return <section className={`section ${styles.section}`} id="product-workflow" aria-labelledby="product-workflow-title">
    <div className={styles.heading}><div><p className="eyebrow">03 / {evaluation?'EVALUATION FRAMEWORK':'THE WORKFLOW'}</p><h2 id="product-workflow-title">{evaluation?<>Define the verification<br/><em>you need.</em></>:<>See how the<br/>work <em>connects.</em></>}</h2></div><div className={styles.identity}><GitBranch size={24} strokeWidth={1.3} aria-hidden="true"/><span>{name}</span><small>{String(steps.length).padStart(2,'0')} CONNECTED STAGES</small></div></div>
    <div className={styles.map}>
      <div className={styles.mapHeader}><span>{evaluation?'MAP THE REQUIREMENTS':'FOLLOW THE PROCESS'}</span><span>START <ArrowRight size={12} aria-hidden="true"/> {evaluation?'REVIEW':'OUTCOME'}</span></div>
      <div className={styles.diagram}>
        <svg className={styles.path} viewBox={`0 0 1000 ${rows*210}`} preserveAspectRatio="none" style={{height:rows*210}} aria-hidden="true"><path d={path} fill="none" stroke="#b9beac" strokeWidth="1.5"/>{points.slice(1).filter((p,i)=>p.row===points[i].row).map((p,i)=>{const left=p.row%2===1;return <path key={i} d={`M${p.x+(left?1:-1)*500/columns} ${p.y-4}l${left?-6:6} 4 ${left?6:-6} 4`} fill="none" stroke="#af512e" strokeWidth="1.5"/>;})}</svg>
        <ol className={styles.steps} aria-label={`${name} ${evaluation?'evaluation framework':'workflow'}`} style={{'--columns':columns} as CSSProperties}>{steps.map((step,i)=><li className={styles.step} key={`${i}-${step}`} style={{gridColumn:points[i].col+1,gridRow:points[i].row+1}}><span className={styles.node} aria-hidden="true">{String(i+1).padStart(2,'0')}</span><div className={styles.stepCopy}><span className={styles.stage}>{i===0?'THE STARTING POINT':i===steps.length-1?'THE FINAL STAGE':`STEP ${String(i+1).padStart(2,'0')}`}</span><h3>{step}</h3></div></li>)}</ol>
      </div>
      <div className={styles.mapFooter}><span aria-hidden="true">✳</span><p>{evaluation?'A framework for discussing your verification needs.':'Each step connects to the next part of the work.'}</p><span className={styles.wordmark}>W / {name.toUpperCase()}</span></div>
    </div>
  </section>;
}
