import { useEffect, useMemo, useState } from 'react'
import {
  Activity, AlertCircle, ArrowRight, BadgeCheck, Bell, Building2, CalendarDays,
  ChartNoAxesCombined, CheckCircle2, CircleDollarSign, Clock3, Database,
  Dumbbell, FileText, Gauge, LayoutDashboard, LogOut, MapPin, Menu, MessageSquare,
  RefreshCw, Search, Settings, ShieldCheck, TableProperties, Trophy, UserCheck,
  Users, WalletCards, X
} from 'lucide-react'
import { adminApi, auth } from './api'
import { mockData } from './mock'
import { BarChart, DataTable, Donut, LoadingState, Panel, StatCard, formatMoney, formatNumber } from './components'

const navItems = [
  { id: 'overview', label: '运营总览', icon: LayoutDashboard },
  { id: 'matches', label: '赛事分析', icon: Trophy },
  { id: 'leisure', label: '闲时场馆', icon: TableProperties },
  { id: 'organizers', label: '入驻与审核', icon: BadgeCheck },
  { id: 'activity', label: '操作动态', icon: Activity }
]

const statusBadge = (value) => <span className={`badge ${value === 0 ? 'pending' : 'success'}`}>{value === 0 ? '待审核' : '已通过'}</span>

function Login({ onLogin }) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (event) => {
    event.preventDefault(); setError(''); setLoading(true)
    try {
      auth.setToken(token)
      const user = await adminApi.verify()
      if (Number(user?.admin) !== 1) throw new Error('该账号不是平台管理员')
      onLogin(false, user)
    } catch (e) { auth.clear(); setError(e.message || '令牌验证失败') }
    finally { setLoading(false) }
  }
  return <main className="login-page">
    <section className="login-brand">
      <div className="brand-mark large"><span/><span/></div>
      <div><p>PingPong Ops</p><h1>让每一场比赛，<br/>都有数据可循。</h1></div>
      <div className="login-metrics"><div><strong>1,284</strong><span>累计赛事</span></div><div><strong>38,642</strong><span>参赛人次</span></div><div><strong>186</strong><span>合作场馆</span></div></div>
      <p className="login-note">赛事、场馆、营收和平台健康度，在一个工作台清晰呈现。</p>
    </section>
    <section className="login-box">
      <div className="login-card">
        <span className="eyebrow">ADMIN CONSOLE</span><h2>欢迎回来</h2><p>使用管理员令牌安全进入运营中心</p>
        <form onSubmit={submit}><label>访问令牌</label><div className="token-field"><ShieldCheck/><input autoFocus type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="粘贴 Bearer Token"/></div>
          {error && <div className="form-error"><AlertCircle/>{error}</div>}
          <button className="primary-btn" disabled={!token.trim() || loading}>{loading ? <RefreshCw className="spin"/> : <><span>进入运营中心</span><ArrowRight/></>}</button>
        </form>
        <button className="demo-btn" onClick={()=>onLogin(true, mockData.user)}><Gauge/>预览演示数据</button>
        <p className="login-help">当前沿用小程序管理员 JWT，后续可平滑接入账号密码或扫码登录。</p>
      </div>
    </section>
  </main>
}

function Sidebar({ active, setActive, open, setOpen, demo, logout }) {
  return <aside className={`sidebar ${open ? 'open' : ''}`}>
    <div className="side-brand"><div className="brand-mark"><span/><span/></div><div><strong>乒乓赛事</strong><small>运营管理中心</small></div><button onClick={()=>setOpen(false)}><X/></button></div>
    <nav>{navItems.map(({id,label,icon:Icon})=><button className={active===id?'active':''} onClick={()=>{setActive(id);setOpen(false)}} key={id}><Icon/><span>{label}</span></button>)}</nav>
    <div className="side-separator"/><p className="side-caption">系统</p>
    <nav><button><Settings/><span>平台设置</span></button><button><MessageSquare/><span>建议反馈</span><em>4</em></button></nav>
    <div className="side-foot"><div className="system-health"><i/><div><strong>系统运行正常</strong><span>全部服务可用</span></div></div>{demo && <span className="demo-tag">演示模式</span>}<button className="logout" onClick={logout}><LogOut/><span>退出登录</span></button></div>
  </aside>
}

function Header({ title, user, onMenu, refreshing, onRefresh }) {
  return <header className="topbar"><div className="top-title"><button className="menu-btn" onClick={onMenu}><Menu/></button><div><p>运营中心 / {title}</p><h1>{title}</h1></div></div><div className="top-actions"><label className="global-search"><Search/><input placeholder="搜索赛事、主办方、场馆…"/><kbd>⌘ K</kbd></label><button className="icon-btn"><Bell/><i/></button><button className="refresh-btn" onClick={onRefresh}><RefreshCw className={refreshing?'spin':''}/><span>刷新</span></button><div className="avatar">{(user?.nickname||'管').slice(0,1)}</div><div className="user-name"><strong>{user?.nickname||'平台管理员'}</strong><span>超级管理员</span></div></div></header>
}

function Overview({ data, matches, leisure, activities, setActive }) {
  const s=data.summary||{}
  const applicationRows=[...(data.organizerApplications||[]).map(x=>({...x,type:'机构主办方',name:x.orgName,contact:x.contactName||x.contactPhone})),...(data.personalOrganizerApplications||[]).map(x=>({...x,type:'个人组织者',name:x.organizerName||x.realName,contact:x.realName||x.phone}))].slice(0,5)
  const cityData=(matches.matchByCity||[]).slice(0,6)
  return <div className="page-stack">
    <section className="welcome"><div><span className="eyebrow">MONDAY · 05 OCT</span><h2>早上好，{s.adminName||'管理员'}</h2><p>平台今日运行稳定，当前有 <strong>{formatNumber((s.pendingOrganizerCount||0)+(s.pendingPersonalOrganizerCount||0))} 项</strong> 入驻申请等待处理。</p></div><div className="welcome-art"><span/><span/><span/></div></section>
    <div className="stats-grid"><StatCard label="累计赛事" value={formatNumber(matches.totalMatchCount)} hint="较上月" trend={12.6} icon={Trophy}/><StatCard label="累计参赛人次" value={formatNumber(matches.participantCount)} hint="较上月" trend={8.4} icon={Users} tone="blue"/><StatCard label="报名费流水" value={formatMoney(matches.totalEntryFee)} hint="较上月" trend={15.2} icon={CircleDollarSign} tone="gold"/><StatCard label="待处理事项" value={formatNumber((s.pendingOrganizerCount||0)+(s.pendingPersonalOrganizerCount||0)+(s.pendingFeedbackCount||0))} hint="需要及时处理" icon={Clock3} tone="orange"/></div>
    <div className="content-grid two-one"><Panel title="城市赛事分布" subtitle="累计发布赛事数量 TOP 6" action={<button className="text-btn" onClick={()=>setActive('matches')}>查看完整分析 <ArrowRight/></button>}><BarChart data={cityData} valueKey="totalMatches"/></Panel>
      <Panel title="赛事构成" subtitle="按比赛赛制统计"><Donut total={matches.totalMatchCount||0} centerLabel="场赛事" segments={[{label:'单打',value:matches.matchByFormat?.single||0,color:'#3478d4'},{label:'双打',value:matches.matchByFormat?.double||0,color:'#84b6ed'},{label:'团体',value:matches.matchByFormat?.team||0,color:'#b9d7f6'}]}/></Panel></div>
    <div className="content-grid two-one"><Panel title="最新入驻申请" subtitle="机构与个人组织者申请" action={<button className="text-btn" onClick={()=>setActive('organizers')}>全部申请 <ArrowRight/></button>}><DataTable rows={applicationRows} columns={[{key:'name',title:'申请主体'},{key:'type',title:'类型',render:v=><span className="type-text">{v}</span>},{key:'contact',title:'联系人'},{key:'createTime',title:'申请时间',render:v=><span className="muted-cell">{String(v||'').slice(5,16)}</span>},{key:'auditStatus',title:'状态',render:statusBadge}]}/></Panel>
      <Panel title="平台速览" subtitle="核心资源健康度"><div className="quick-list"><div><span className="quick-icon green"><Building2/></span><div><strong>{formatNumber(leisure.onShelfVenueCount)}</strong><span>营业中场馆</span></div><small>{Math.round((leisure.onShelfVenueCount||0)/(leisure.publishedVenueCount||1)*100)}% 上架率</small></div><div><span className="quick-icon blue"><TableProperties/></span><div><strong>{formatNumber(leisure.totalConfiguredTables)}</strong><span>可预约球台</span></div><small>覆盖 {formatNumber(leisure.publishedVenueCount)} 家场馆</small></div><div><span className="quick-icon gold"><UserCheck/></span><div><strong>{formatNumber((s.approvedOrganizerCount||0)+(s.approvedPersonalOrganizerCount||0))}</strong><span>认证组织者</span></div><small>持续增长中</small></div></div></Panel></div>
    <Panel title="近期操作动态" subtitle="管理员与系统关键行为" action={<button className="text-btn" onClick={()=>setActive('activity')}>查看日志 <ArrowRight/></button>}><ActivityList items={activities.slice(0,4)}/></Panel>
  </div>
}

function ActivityList({items}) { return <div className="activity-list">{items.map((item,i)=><div key={item.id||i}><span className={`activity-dot ${item.statusCode>=400?'error':''}`}>{item.statusCode>=400?<AlertCircle/>:<CheckCircle2/>}</span><div><strong>{item.actionName||item.requestUri||'平台操作'}</strong><p><span>{item.nickname||item.userId||'系统'}</span><i/> {item.category||item.httpMethod||'操作'}</p></div><time>{item.createTime||'-'}</time></div>)}</div> }

function MatchesPage({m}) {
  const cities=m.matchByCity||[]
  return <div className="page-stack"><div className="stats-grid"><StatCard label="赛事总数" value={formatNumber(m.totalMatchCount)} hint={`${formatNumber(m.unfinishedMatchCount)} 场进行中`} icon={Trophy}/><StatCard label="参赛人次" value={formatNumber(m.participantCount)} hint={`${formatNumber(m.doublePairCountTotal)} 对双打组合`} icon={Users} tone="blue"/><StatCard label="报名费流水" value={formatMoney(m.totalEntryFee)} hint="平台累计交易额" icon={WalletCards} tone="gold"/><StatCard label="赛事完成率" value={`${Math.round((m.finishedMatchCount||0)/(m.totalMatchCount||1)*100)}%`} hint={`${formatNumber(m.finishedMatchCount)} 场已完赛`} icon={CheckCircle2} tone="orange"/></div>
    <div className="content-grid equal"><Panel title="赛事城市分布" subtitle="各城市累计赛事"><BarChart data={cities} valueKey="totalMatches"/></Panel><Panel title="参赛用户结构" subtitle="按性别统计"><Donut total={m.participantCount||0} centerLabel="参赛人次" segments={[{label:'男性',value:m.participantFormatGlobal?.maleCount||0,color:'#3478d4'},{label:'女性',value:m.participantFormatGlobal?.femaleCount||0,color:'#8ab7eb'},{label:'未知',value:m.participantFormatGlobal?.unknownGenderCount||0,color:'#dce8f5'}]}/></Panel></div>
    <Panel title="城市经营明细" subtitle="赛事、参与和报名费的横向比较"><DataTable rows={cities.map(c=>({...c,people:(m.participantByCity||[]).find(x=>x.cityName===c.cityName)?.peopleTotal,fee:(m.feeByCity||[]).find(x=>x.cityName===c.cityName)?.totalFee}))} columns={[{key:'cityName',title:'城市',render:v=><strong>{v}</strong>},{key:'totalMatches',title:'赛事数',render:formatNumber},{key:'organizerMatches',title:'机构赛事',render:formatNumber},{key:'personalMatches',title:'个人赛事',render:formatNumber},{key:'people',title:'参赛人次',render:formatNumber},{key:'fee',title:'报名费流水',render:formatMoney}]}/></Panel></div>
}

function LeisurePage({l}) { return <div className="page-stack"><div className="stats-grid"><StatCard label="已发布场馆" value={formatNumber(l.publishedVenueCount)} hint={`${formatNumber(l.onShelfVenueCount)} 家营业中`} icon={Building2}/><StatCard label="配置球台" value={formatNumber(l.totalConfiguredTables)} hint="平台场馆资源" icon={TableProperties} tone="blue"/><StatCard label="累计预约时长" value={`${formatNumber(l.bookedTableHours)}h`} hint={`${formatNumber(l.totalBookingRows)} 笔订单`} icon={Clock3} tone="gold"/><StatCard label="场馆交易额" value={formatMoney(l.totalBookingFee)} hint={`${formatNumber(l.activeBookingCount)} 笔进行中`} icon={CircleDollarSign} tone="orange"/></div><div className="content-grid equal"><Panel title="城市预约时长" subtitle="累计球台预约小时数"><BarChart data={l.leisureByCity||[]} valueKey="bookedTableHours" color="#3478d4"/></Panel><Panel title="城市场馆交易额" subtitle="完成及进行中的预约费用"><BarChart data={l.leisureByCity||[]} valueKey="totalBookingFee" color="#70a7e5" valueFormatter={formatMoney}/></Panel></div><Panel title="城市场馆明细"><DataTable rows={l.leisureByCity||[]} columns={[{key:'cityName',title:'城市',render:v=><strong>{v}</strong>},{key:'publishedVenueCount',title:'发布场馆',render:formatNumber},{key:'onShelfVenueCount',title:'营业场馆',render:formatNumber},{key:'bookedTableHours',title:'预约时长',render:v=>`${formatNumber(v)} 小时`},{key:'totalBookingFee',title:'交易额',render:formatMoney}]}/></Panel></div> }

function OrganizersPage({d}) { const s=d.summary||{}; const rows=[...(d.organizerApplications||[]).map(x=>({...x,type:'机构主办方',name:x.orgName,contact:x.contactName||x.contactPhone})),...(d.personalOrganizerApplications||[]).map(x=>({...x,type:'个人组织者',name:x.organizerName||x.realName,contact:x.realName||x.phone}))]; return <div className="page-stack"><div className="stats-grid"><StatCard label="机构主办方" value={formatNumber(s.organizerTotalCount)} hint={`${formatNumber(s.approvedOrganizerCount)} 家已认证`} icon={Building2}/><StatCard label="个人组织者" value={formatNumber(s.personalOrganizerTotalCount)} hint={`${formatNumber(s.approvedPersonalOrganizerCount)} 人已认证`} icon={UserCheck} tone="blue"/><StatCard label="机构待审核" value={formatNumber(s.pendingOrganizerCount)} hint="请及时处理" icon={Clock3} tone="gold"/><StatCard label="个人待审核" value={formatNumber(s.pendingPersonalOrganizerCount)} hint="请及时处理" icon={FileText} tone="orange"/></div><Panel title="待审核申请" subtitle="最新提交的组织者认证资料" action={<div className="filter-search"><Search/><input placeholder="搜索名称或联系人"/></div>}><DataTable rows={rows} columns={[{key:'name',title:'申请主体',render:v=><strong>{v}</strong>},{key:'type',title:'主体类型'},{key:'contact',title:'联系人'},{key:'contactPhone',title:'联系电话',render:(v,r)=>v||r.phone||'-'},{key:'createTime',title:'提交时间'},{key:'auditStatus',title:'状态',render:statusBadge}]}/></Panel></div> }

function App() {
  const [session,setSession]=useState(()=>auth.getToken()?{demo:false,user:null}:null), [active,setActive]=useState('overview'), [sideOpen,setSideOpen]=useState(false), [loading,setLoading]=useState(false), [error,setError]=useState(''), [payload,setPayload]=useState(null)
  const load=async (demo=session?.demo)=>{if(!session)return;setLoading(true);setError('');try{if(demo){setPayload(mockData);return}const [user,dashboard,matches,leisure,logResponse]=await Promise.all([adminApi.verify(),adminApi.dashboard({pageNum:1,pageSize:8,includeConfigs:false,includeFeedbacks:false}),adminApi.matchStats(),adminApi.leisureStats(),adminApi.operationLogs({pageNum:1,pageSize:10})]);if(Number(user?.admin)!==1)throw new Error('该账号没有管理员权限');setSession({demo:false,user});setPayload({user,dashboard,matches,leisure,activities:logResponse?.records||logResponse?.list||[]})}catch(e){if(e.code===401||e.code===403){auth.clear();setSession(null)}setError(e.message)}finally{setLoading(false)}}
  useEffect(()=>{if(session&&!payload)load(session.demo)},[session])
  const title=useMemo(()=>navItems.find(x=>x.id===active)?.label||'运营总览',[active])
  if(!session)return <Login onLogin={(demo,user)=>{setSession({demo,user});setPayload(null)}}/>
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} open={sideOpen} setOpen={setSideOpen} demo={session.demo} logout={()=>{auth.clear();setSession(null);setPayload(null)}}/><main className="main"><Header title={title} user={session.user||payload?.user} onMenu={()=>setSideOpen(true)} refreshing={loading} onRefresh={()=>load(session.demo)}/><div className="page-content">{error&&<div className="error-banner"><AlertCircle/><span>{error}</span><button onClick={()=>load(session.demo)}>重试</button></div>}{loading&&!payload?<LoadingState/>:payload&&<>{active==='overview'&&<Overview data={payload.dashboard} matches={payload.matches} leisure={payload.leisure} activities={payload.activities} setActive={setActive}/>} {active==='matches'&&<MatchesPage m={payload.matches}/>} {active==='leisure'&&<LeisurePage l={payload.leisure}/>} {active==='organizers'&&<OrganizersPage d={payload.dashboard}/>} {active==='activity'&&<Panel title="操作动态" subtitle="平台最近的管理及系统行为"><ActivityList items={payload.activities}/></Panel>}</>}</div></main>{sideOpen&&<div className="side-mask" onClick={()=>setSideOpen(false)}/>}</div>
}

export default App
