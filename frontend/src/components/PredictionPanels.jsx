import { ArrowDown, ArrowRight, ArrowUp, Clock3, Target } from 'lucide-react';
import { PARAMETERS } from '../utils/constants';
export function PredictionSummary({ values, prediction }) {
 return <section className="summary"><div><span>GRADE TRANSITION</span><strong>{values.currentGrade} <ArrowRight size={17}/> {values.targetGrade}</strong><small>GSM</small></div><div><Clock3/><span>ESTIMATED TIME</span><strong>{prediction?.estimatedTransitionTimeMinutes ?? '—'} min</strong></div><div><Target/><span>MODEL CONFIDENCE</span><strong>{prediction?.modelConfidence ?? '—'}%</strong></div></section>;
}
export function PredictionCards({ values, prediction }) {
 return <div className="prediction-cards">{PARAMETERS.map(item => { const current=Number(values[item.key]); const recommended=Number(prediction?.[item.result] ?? current); const change=recommended-current; const Icon=change>0?ArrowUp:change<0?ArrowDown:ArrowRight; return <article className="parameter-card" key={item.key}><div><h3>{item.label}</h3><span>{item.unit}</span></div><b className={change>0?'up':change<0?'down':''}><Icon size={14}/>{change>0?'+':''}{change.toFixed(2)}</b><div className="comparison"><span><small>CURRENT</small>{current}</span><ArrowRight size={16}/><strong><small>RECOMMENDED</small>{recommended}</strong></div></article>; })}</div>;
}
