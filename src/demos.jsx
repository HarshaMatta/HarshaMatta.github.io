import React, { useState } from 'react';
import Chart from './Chart.jsx';
import { model } from './math.js';
import vrpData from './vrp-data.json';

function DemoLabel({ title, kind = 'Browser illustration', level = 3 }) {
  const Heading = `h${level}`;
  return <div className="demo-top"><Heading className="demo-title">{title}</Heading><span className="small-label">{kind}</span></div>;
}

export function OfficeDemo() {
  const [days, setDays] = useState([true, false, true, false, true]);
  const [exported, setExported] = useState(false);
  const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const count = days.filter(Boolean).length;
  function download() {
    const blob = new Blob(['Day,Location\n' + days.map((day, index) => `${names[index].slice(0, 3)},${day ? 'Office' : 'Remote'}`).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'sample-attendance.csv'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setExported(true);
  }
  return <div className="office-demo">
    <DemoLabel title="Sample week" kind="Interactive demo" />
    <div className="office-grid"><div><p>Tap a day to switch between office and remote.</p>
      <div className="week" role="group" aria-label="Sample weekday attendance">{days.map((day, index) => <button key={names[index]} aria-label={`${names[index]}: ${day ? 'Office' : 'Remote'}`} aria-pressed={day} onClick={() => { setDays(days.map((value, position) => position === index ? !value : value)); setExported(false); }}>
        <span>{names[index].slice(0, 3)}</span><strong>{day ? 'Office' : 'Remote'}</strong>
      </button>)}</div><button className="text-button" onClick={download}>Export sample CSV ↓</button>
      <p className="demo-note" role="status">{exported ? 'Sample CSV download started.' : `${count} of 5 days marked as office days.`}</p>
    </div><div className="progress-ring" style={{ '--progress': `${count / 5 * 360}deg` }} aria-hidden="true"><div><strong>{count}<small>/5</small></strong><span>office days</span></div></div></div>
  </div>;
}

export function FinanceDemo({ kind }) {
  const [spot, setSpot] = useState(100), [volatility, setVolatility] = useState(25);
  const [months, setMonths] = useState(12), [type, setType] = useState('call'), [metric, setMetric] = useState('delta');
  const result = model(spot, volatility / 100, months / 12, type);
  const prices = Array.from({ length: 61 }, (_, index) => 70 + index);
  const field = kind === 'greeks' ? metric : 'price';
  const axis = field === 'price' ? 'Option price ($)' : field === 'delta' ? 'Delta (per $1 underlying move)' : 'Gamma (delta change per $1)';
  const summary = field === 'price' ? `At an underlying price of $${spot}, the modeled ${type} price is $${result.price.toFixed(2)}. The point marks your selected price.` : `At an underlying price of $${spot}, ${field} is ${result[field].toFixed(4)}. The point marks your selected price.`;
  return <div className="finance-demo">
    <DemoLabel title={kind === 'greeks' ? 'Delta & Gamma' : 'European option pricing'} kind="Educational model" level={2} />
    <div className="finance-grid"><div className="controls">
      {[['Underlying price', spot, setSpot, 70, 130, `$${spot}`], ['Volatility', volatility, setVolatility, 5, 70, `${volatility}%`], ['Time to expiry', months, setMonths, 1, 24, `${months} ${months === 1 ? 'month' : 'months'}`]].map(([label, value, set, min, max, display]) => <label key={label} className="slider-field"><span>{label}<output>{display}</output></span><input aria-label={label} type="range" min={min} max={max} step="1" value={value} onChange={(event) => set(+event.target.value)} /></label>)}
      <label className="select-field">Option type<select value={type} onChange={(event) => setType(event.target.value)}><option value="call">Call</option><option value="put">Put</option></select></label>
      <div className="assumptions"><strong>Model assumptions</strong><p>European exercise · no dividends <br />Strike $100 · annual rate 4%</p><p>Hypothetical inputs. No market data.</p></div>
    </div><div className="finance-result"><dl className="metrics" aria-live="polite"><div><dt>Model price</dt><dd>${result.price.toFixed(2)}</dd></div><div><dt>Delta</dt><dd>{result.delta.toFixed(3)}</dd></div><div><dt>Gamma</dt><dd>{result.gamma.toFixed(3)}</dd></div></dl>
      {kind === 'greeks' && <div className="pills metric-switch" role="group" aria-label="Chart sensitivity">{['delta', 'gamma'].map((name) => <button aria-pressed={metric === name} onClick={() => setMetric(name)} key={name}>{name === 'delta' ? 'Delta' : 'Gamma'}</button>)}</div>}
      <Chart series={[{ name: field === 'price' ? `${type === 'call' ? 'Call' : 'Put'} price` : field === 'delta' ? 'Delta' : 'Gamma', color: 'var(--accent)', values: prices.map((price) => model(price, volatility / 100, months / 12, type)[field]) }]} xValues={prices} axis={axis} xLabel="Underlying price ($)" summary={summary} activeIndex={spot - 70} />
    </div></div>
  </div>;
}

export function VrpDemo() {
  const [range, setRange] = useState('All');
  const rows = range === 'All' ? vrpData : vrpData.filter((row) => row.date.startsWith(range));
  const last = rows.at(-1);
  return <div className="vrp-demo">
    <div className="demo-top"><h2 className="demo-title">Historical volatility</h2><label className="select-field">Period<select value={range} onChange={(event) => setRange(event.target.value)}>{['All', '2018', '2020', '2022', '2025'].map((year) => <option key={year}>{year}</option>)}</select></label></div>
    <Chart series={[{ name: 'VIX', color: '#655096', values: rows.map((row) => row.vix) }, { name: 'Forward realized volatility', color: '#99582f', values: rows.map((row) => row.rv) }]} xValues={rows.map((row) => row.date)} axis="Annualized volatility (%)" xLabel="Monthly observation date"
      summary={`${rows.length} monthly observations, ${rows[0].date} to ${last.date}. At the last observation, VIX was ${last.vix.toFixed(2)}% and forward realized volatility was ${last.rv.toFixed(2)}%.`} />
    <p className="demo-boundary">Monthly observations from the project dataset · January 2010–April 2026.</p>
  </div>;
}
