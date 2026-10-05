import { ArrowDownRight, ArrowUpRight, ChevronRight, Inbox, RefreshCw } from 'lucide-react'

export const formatNumber = (value) => new Intl.NumberFormat('zh-CN').format(Number(value || 0))
export const formatMoney = (value) => `¥${formatNumber(Number(value || 0).toFixed(0))}`

export function StatCard({ label, value, hint, trend, icon: Icon, tone = 'green' }) {
  const positive = Number(trend) >= 0
  return <article className={`stat-card tone-${tone}`}>
    <div className="stat-top"><span className="stat-label">{label}</span><span className="stat-icon"><Icon size={19}/></span></div>
    <strong className="stat-value">{value}</strong>
    <div className="stat-foot">
      {trend !== undefined && <span className={positive ? 'trend up' : 'trend down'}>{positive ? <ArrowUpRight/> : <ArrowDownRight/>}{Math.abs(trend)}%</span>}
      <span>{hint}</span>
    </div>
  </article>
}

export function Panel({ title, subtitle, action, children, className = '' }) {
  return <section className={`panel ${className}`}>
    <header className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</header>
    {children}
  </section>
}

export function BarChart({ data, valueKey, color = '#3478d4', valueFormatter = formatNumber }) {
  const max = Math.max(...data.map(item => Number(item[valueKey] || 0)), 1)
  return <div className="bar-chart">
    {data.map((item) => <div className="bar-row" key={item.cityName}>
      <span className="bar-label">{item.cityName}</span>
      <div className="bar-track"><i style={{ width: `${Math.max(4, Number(item[valueKey] || 0) / max * 100)}%`, background: color }}/></div>
      <strong>{valueFormatter(item[valueKey])}</strong>
    </div>)}
  </div>
}

export function Donut({ segments, total, centerLabel }) {
  let cursor = 0
  const gradient = segments.map(({ value, color }) => {
    const start = cursor
    cursor += total ? value / total * 100 : 0
    return `${color} ${start}% ${cursor}%`
  }).join(', ')
  return <div className="donut-wrap">
    <div className="donut" style={{ background: `conic-gradient(${gradient})` }}><div><strong>{formatNumber(total)}</strong><span>{centerLabel}</span></div></div>
    <div className="donut-legend">{segments.map(item => <div key={item.label}><i style={{background:item.color}}/><span>{item.label}</span><strong>{formatNumber(item.value)}</strong></div>)}</div>
  </div>
}

export function TrendChart({ data = [], valueKey = 'value', valueFormatter = formatNumber }) {
  const max = Math.max(...data.map(item => Number(item[valueKey] || 0)), 1)
  return <div className="trend-chart">
    <div className="trend-grid"><i/><i/><i/></div>
    <div className="trend-columns">{data.map((item) => <div className="trend-column" key={item.month}>
      <span className="trend-tip">{valueFormatter(item[valueKey])}</span>
      <div style={{height:`${Math.max(8, Number(item[valueKey] || 0) / max * 100)}%`}}/>
      <small>{String(item.month || '').slice(5)}月</small>
    </div>)}</div>
  </div>
}

export function DataTable({ columns, rows, empty = '暂无数据', onRowClick }) {
  if (!rows?.length) return <div className="empty"><Inbox/><span>{empty}</span></div>
  return <div className="table-wrap"><table><thead><tr>{columns.map(c => <th key={c.key}>{c.title}</th>)}<th/></tr></thead><tbody>
    {rows.map((row, index) => <tr key={`${row.id ?? 'row'}-${index}`} onClick={() => onRowClick?.(row)}>{columns.map(c => <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key] ?? '-'}</td>)}<td><ChevronRight size={16}/></td></tr>)}
  </tbody></table></div>
}

export function LoadingState() {
  return <div className="loading-page"><RefreshCw className="spin"/><span>正在汇总运营数据…</span></div>
}
