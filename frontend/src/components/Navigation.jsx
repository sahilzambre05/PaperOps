import { Activity, Factory, Menu } from 'lucide-react';
export function Sidebar() {
  return <aside className="sidebar"><div className="logo"><Factory size={21}/><span>Paper<span>Ops</span></span></div><p>PRODUCTION CONTROL</p><a className="active" href="#dashboard"><Activity size={17}/> Grade change</a><a href="#history">History</a><a href="#process">Process map</a><small>v1.0 · Operations workspace</small></aside>;
}
export function Header({ online }) {
  return <header className="header"><button className="menu"><Menu size={20}/></button><div><p>OPERATIONS / GRADE CHANGE</p><h1>Grade Change Dashboard</h1></div><div className="connection"><i className={online ? 'online' : ''}/>{online ? 'API connected' : 'Simulation mode'}</div></header>;
}
