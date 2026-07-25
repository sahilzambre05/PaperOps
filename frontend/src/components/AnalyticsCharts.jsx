import { BarChart3, LineChart as LineIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PARAMETERS } from '../utils/constants';
const colors=['#2563eb','#3b82f6','#60a5fa','#0f766e','#0891b2','#64748b','#1d4ed8'];
export default function AnalyticsCharts({ values, prediction }) {
 const comparison=PARAMETERS.map(p=>({name:p.label,Current:+values[p.key],Recommended:+(prediction?.[p.result] ?? values[p.key])}));
 const change=PARAMETERS.map(p=>({name:p.label,Change:+Math.abs((prediction?.[p.result] ?? values[p.key])-values[p.key]).toFixed(2)}));
 const progression=[0,25,50,75,100].map((progress,index)=>({name:index===0?'Current':index===4?'Target':'+' + index*5 + 'm', value:progress}));
 return <section className="analytics">
  <article className="chart-card"><div className="chart-title"><LineIcon size={17}/><div><h3>Parameter comparison</h3><p>Current value versus recommendation</p></div></div><ResponsiveContainer width="100%" height={250}><LineChart data={comparison}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:10}} interval={0}/><YAxis tick={{fontSize:10}}/><Tooltip/><Line type="monotone" dataKey="Current" stroke="#64748b" strokeWidth={2}/><Line type="monotone" dataKey="Recommended" stroke="#2563eb" strokeWidth={2}/></LineChart></ResponsiveContainer></article>
  <article className="chart-card"><div className="chart-title"><BarChart3 size={17}/><div><h3>Change magnitude</h3><p>Absolute difference by parameter</p></div></div><ResponsiveContainer width="100%" height={250}><BarChart data={change}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name" tick={{fontSize:10}} interval={0}/><YAxis tick={{fontSize:10}}/><Tooltip/><Bar dataKey="Change">{change.map((_,index)=><Cell key={index} fill={colors[index]}/>)}</Bar></BarChart></ResponsiveContainer></article>
  <article className="chart-card"><div className="chart-title"><LineIcon size={17}/><div><h3>Transition progression</h3><p>Planned change-over completion</p></div></div><ResponsiveContainer width="100%" height={250}><LineChart data={progression}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="name"/><YAxis domain={[0,100]} unit="%"/><Tooltip/><Line type="stepAfter" dataKey="value" stroke="#0f766e" strokeWidth={3}/></LineChart></ResponsiveContainer></article>
 </section>;
}
