import { RotateCcw, Sparkles } from 'lucide-react';
import { INPUT_FIELDS, PRESETS } from '../utils/constants';
export default function ControlPanel({ values, onChange, onPreset, onReset, onSubmit, loading }) {
  return <section className="panel control-panel"><div className="section-title"><div><p>INPUTS</p><h2>Machine conditions</h2></div><button className="icon-btn" onClick={onReset} title="Reset inputs"><RotateCcw size={16}/></button></div><div className="preset-row">{PRESETS.map(p => <button key={p.name} onClick={() => onPreset(p.values)}>{p.name}</button>)}</div><form onSubmit={onSubmit}><div className="input-grid">{INPUT_FIELDS.map(([key,label,unit]) => <label key={key}>{label}<small>{unit}</small><input name={key} type="number" step="any" value={values[key]} onChange={onChange}/></label>)}</div><button className="primary-button" disabled={loading}><Sparkles size={17}/>{loading ? 'Calculating…' : 'Generate recommendation'}</button></form></section>;
}
