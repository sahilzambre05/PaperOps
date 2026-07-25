import { CheckCircle2, Circle } from 'lucide-react';
export function ConfidenceGauge({ value=0 }) {
 const radius=48; const circumference=2*Math.PI*radius; const offset=circumference-(value/100)*circumference;
 return <section className="gauge-card"><div><p>MODEL CONFIDENCE</p><h2>Prediction reliability</h2><span>Based on current operating data</span></div><div className="gauge"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r={radius}/><circle className="gauge-value" cx="60" cy="60" r={radius} strokeDasharray={circumference} strokeDashoffset={offset}/></svg><b>{value.toFixed(1)}%</b></div></section>;
}
export function Timeline({ prediction }) {
 const items=[['Current state','Machine inputs captured'],['Adjust stock flow',(prediction?.nextStockFlow ?? '—') + ' L/min target'],['Set steam pressure',(prediction?.nextSteamPressure ?? '—') + ' kPa target'],['Synchronise speed',(prediction?.nextMachineSpeed ?? '—') + ' m/min target'],['Stable production','Confirm quality targets']];
 return <section className="timeline-card"><p>TRANSITION TIMELINE</p><h2>Recommended sequence</h2><div className="timeline">{items.map(([title,text],index)=><div key={title}><span>{index===0?<Circle size={14}/>:<CheckCircle2 size={14}/>}</span><article><b>{title}</b><small>{text}</small></article></div>)}</div></section>;
}
