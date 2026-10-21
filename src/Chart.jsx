import React from 'react';

const number = (value) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 4 }).format(value);
const tick = (value) => Math.abs(value) < .0001 ? '0' : new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(value);

export default function Chart({ series, xValues, axis, xLabel, summary, activeIndex }) {
  const values = series.flatMap((item) => item.values);
  const minimum = Math.min(...values), maximum = Math.max(...values);
  const span = maximum - minimum || 1;
  const x = (index) => 84 + index / Math.max(xValues.length - 1, 1) * 604;
  const y = (value) => 220 - (value - minimum) / span * 170;
  const first = String(xValues[0]), last = String(xValues.at(-1));
  return <figure className="chart-figure">
    <div className="chart-heading"><span>{axis}</span><span>{xLabel}</span></div>
    <ul className="chart-legend" aria-label="Chart series">{series.map((item) => <li key={item.name}><i aria-hidden="true" style={{ background: item.color }} />{item.name}</li>)}</ul>
    <svg className="chart" viewBox="0 0 720 272" role="img" aria-label={`${axis}. ${xLabel}, ${first} to ${last}. ${summary}`}>
      {[0, .5, 1].map((fraction) => <g key={fraction}><line x1="84" x2="688" y1={220 - fraction * 170} y2={220 - fraction * 170} className="chart-grid" /><text x="72" y={225 - fraction * 170} textAnchor="end" className="chart-text">{tick(minimum + span * fraction)}</text></g>)}
      {series.map((item) => <polyline key={item.name} points={item.values.map((value, index) => `${x(index)},${y(value)}`).join(' ')} fill="none" stroke={item.color} strokeWidth="3" strokeLinejoin="round" />)}
      {activeIndex !== undefined && <g><line x1={x(activeIndex)} x2={x(activeIndex)} y1="40" y2="220" className="chart-marker" /><circle cx={x(activeIndex)} cy={y(series[0].values[activeIndex])} r="5" fill={series[0].color} stroke="var(--surface)" strokeWidth="2" /></g>}
      <text x="84" y="258" className="chart-text">{first}</text><text x="688" y="258" textAnchor="end" className="chart-text">{last}</text>
    </svg>
    <figcaption className="chart-summary">{summary}</figcaption>
    <details className="chart-data"><summary>View chart data <span aria-hidden="true">+</span></summary>
      <div className="table-scroll" role="region" aria-label={`${axis} data table`} tabIndex="0"><table><caption>{axis} by {xLabel.toLowerCase()}</caption>
        <thead><tr><th scope="col">{xLabel}</th>{series.map((item) => <th key={item.name} scope="col">{item.name}</th>)}</tr></thead>
        <tbody>{xValues.map((value, index) => <tr key={String(value)}><th scope="row">{value}</th>{series.map((item) => <td key={item.name}>{number(item.values[index])}</td>)}</tr>)}</tbody>
      </table></div>
    </details>
  </figure>;
}
