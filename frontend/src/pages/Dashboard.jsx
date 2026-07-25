import { useCallback, useEffect, useState } from 'react';
import ControlPanel from '../components/ControlPanel';
import { Header, Sidebar } from '../components/Navigation';
import { ConfidenceGauge, Timeline } from '../components/Timeline';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { PredictionCards, PredictionSummary } from '../components/PredictionPanels';
import { MachineDiagram, ProcessFlow } from '../components/ProcessDiagrams';
import HistoryTable from '../components/HistoryTable';
import { DEFAULT_INPUTS } from '../utils/constants';
import { getHealth, getPrediction } from '../services/api';

const createFallback = (input) => {
 const payload=Object.fromEntries(Object.entries(input).map(([key,value])=>[key,Number(value)||0])); const delta=payload.targetGrade-payload.currentGrade;
 return {nextBasisWeight:+(payload.basisWeight*(1+delta*.002)).toFixed(2),nextStockFlow:+(payload.stockFlow*(1+delta*.0015)).toFixed(2),nextSteamPressure:+(payload.steamPressure*1.01).toFixed(2),nextMachineSpeed:+(payload.machineSpeed*.995).toFixed(2),nextMoisture:+(payload.moisture*.99).toFixed(2),nextAsh:+(payload.ash*1.01).toFixed(2),nextFillerFlow:+(payload.fillerFlow*.98).toFixed(2),modelConfidence:98.5,estimatedTransitionTimeMinutes:Math.round(10+Math.abs(delta)*.25)};
};

export default function Dashboard() {
 const [values,setValues]=useState(DEFAULT_INPUTS); const [prediction,setPrediction]=useState(null); const [loading,setLoading]=useState(false); const [online,setOnline]=useState(false); const [notice,setNotice]=useState(''); const [history,setHistory]=useState([]);
 const runPrediction=useCallback(async(input)=>{
  setLoading(true); setNotice(''); const payload=Object.fromEntries(Object.entries(input).map(([key,value])=>[key,Number(value)||0]));
  try { const {data}=await getPrediction(payload); setPrediction(data); setOnline(true); setHistory(old=>[{id:Date.now(),time:new Date().toLocaleTimeString(),from:payload.currentGrade,to:payload.targetGrade,duration:data.estimatedTransitionTimeMinutes,confidence:data.modelConfidence},...old].slice(0,10)); }
  catch { const fallback=createFallback(input); setPrediction(fallback); setOnline(false); setNotice('Live API is unavailable. Displaying the existing local simulation fallback.'); setHistory(old=>[{id:Date.now(),time:new Date().toLocaleTimeString(),from:payload.currentGrade,to:payload.targetGrade,duration:fallback.estimatedTransitionTimeMinutes,confidence:fallback.modelConfidence},...old].slice(0,10)); }
  finally { setLoading(false); }
 },[]);
 useEffect(()=>{runPrediction(DEFAULT_INPUTS);},[runPrediction]);
 useEffect(()=>{const check=async()=>{try{await getHealth();setOnline(true);}catch{setOnline(false);}};check();const id=setInterval(check,10000);return()=>clearInterval(id);},[]);
 const applyPreset=(preset)=>{setValues(preset);runPrediction(preset);};
 return <div className="app-shell"><Sidebar/><main className="main-content"><Header online={online}/><section className="intro"><div><p>LIVE PRODUCTION SUPPORT</p><h1>Grade change recommendations, ready for the mill floor.</h1><span>Use measured process inputs to generate a clear and traceable transition plan.</span></div>{notice&&<aside>{notice}</aside>}</section><PredictionSummary values={values} prediction={prediction}/><div className="workspace" id="dashboard"><ControlPanel values={values} loading={loading} onChange={event=>setValues({...values,[event.target.name]:event.target.value})} onPreset={applyPreset} onReset={()=>applyPreset(DEFAULT_INPUTS)} onSubmit={event=>{event.preventDefault();runPrediction(values);}}/><section className="results"><div className="results-heading"><div><p>RECOMMENDATIONS</p><h2>Parameter changes</h2></div><small>Values update after each prediction</small></div><PredictionCards values={values} prediction={prediction}/></section></div><section className="insight-grid"><ConfidenceGauge value={Number(prediction?.modelConfidence??0)}/><Timeline prediction={prediction}/></section><AnalyticsCharts values={values} prediction={prediction}/><section className="diagram-grid"><ProcessFlow/><MachineDiagram/></section><HistoryTable items={history} onClear={()=>setHistory([])}/></main></div>;
}
