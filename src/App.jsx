import React, {useState} from 'react';
import {projects,articles} from './data.js';
import {ArticleCard,ArticleLink,Footer,Icon,Media,Nav,PathContext,Screenshot,ScreenshotGallery,SectionTitle,Tags,usePaths} from './components.jsx';
import {FinanceDemo,OfficeDemo,VrpDemo} from './demos.jsx';
import notebook from './notebook.json';

function ProjectHeading({project,children}) {
  return <div className="project-heading"><div className="project-identity"><Icon project={project}/><h1>{project.name}</h1></div><ArticleLink project={project}/><p className="lead">{project.description}</p>{children}<Tags values={project.tech}/></div>;
}
function SourceLink({project}) {return project.source && <a className="text-button" href={project.source}>GitHub ↗</a>;}
function NativePage({project}) {
 return <><section className="native-hero"><ProjectHeading project={project}><div className="button-row"><a className="button" href="#screenshots">Screenshots ↓</a><SourceLink project={project}/></div></ProjectHeading><div className="product-visual">{project.id==='paatam'?<div className="paired-phones"><Screenshot name="paatam/screen1.jpg" caption="Paatam character categories" portrait eager/><Screenshot name="paatam/screen4.jpg" caption="Paatam character review" portrait eager/></div>:<Screenshot name={project.image} caption="InOffice attendance dashboard" portrait eager/>}</div></section>
 {project.id==='paatam'?<section className="section features-section"><SectionTitle title="Spaced repetition for Indian languages"/><div className="feature-grid">{project.features.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>:<section className="section"><SectionTitle title="Attendance demo"/><OfficeDemo/></section>}
 <div id="screenshots"><ScreenshotGallery project={project}/></div></>;
}
function QuantPage({project}) {
 return <><section className="technical-hero"><ProjectHeading project={project}><div className="button-row"><a className="button" href={project.source}>GitHub & setup ↗</a></div></ProjectHeading><Screenshot name="screens/qsl-manual.jpg" caption="Quant Strategy Lab: manual backtest using built-in sample prices" eager/></section><section className="section"><div className="mode-grid"><article><h2>Deterministic backtesting</h2><p>Choose SMA crossover, RSI reversion, or channel breakout. Set parameters and inspect trades, equity curves, and metrics.</p></article><article><h2>AI + MCP</h2><p>A proof of concept that translates a request into strategy tool calls. The same backtesting tools are available through MCP.</p></article></div><details className="source-preview"><summary>AI / MCP interface <span aria-hidden="true">+</span></summary><Screenshot name="screens/qsl-ai.jpg" caption="Quant Strategy Lab AI and MCP configuration interface"/></details><p className="caption">Manual screenshot uses built-in sample prices. AI mode requires a configured model.</p></section></>;
}
function Notebook() {
 return <section className="section notebook-section"><SectionTitle title="From the notebook"><a className="text-button" href="https://github.com/HarshaMatta/VolatilityRiskPremium/blob/main/notebooks/02_realized_volatility.ipynb">Full notebook ↗</a></SectionTitle><p className="caption">02_realized_volatility.ipynb · original code cells</p>{notebook.map(cell=><article className="notebook-cell" key={cell.label}><div><span>Cell {cell.cell}</span><strong>{cell.label}</strong></div><pre tabIndex="0" aria-label={cell.label}><code>{cell.source}</code></pre></article>)}</section>;
}
function VrpPage({project}) {
 return <><section className="technical-hero"><ProjectHeading project={project}><div className="button-row"><a className="button" href={project.live}>Open Streamlit ↗</a><SourceLink project={project}/></div></ProjectHeading><Screenshot name="screens/vrp.jpg" caption="Original VRP Streamlit dashboard" eager/></section><section className="section" id="demo"><SectionTitle title="VIX vs. realized volatility"/><VrpDemo/></section><Notebook/></>;
}
function FinancePage({project}) {
 return <>{project.id==='greeks'?<section className="technical-hero"><ProjectHeading project={project}><div className="button-row"><a className="button" href={project.live}>Open Streamlit ↗</a><SourceLink project={project}/></div></ProjectHeading><Screenshot name="screens/greeks.jpg" caption="Original Streamlit Greeks dashboard with parameters, risk metrics, and charts" eager/></section>:<section className="simple-heading"><ProjectHeading project={project}><div className="button-row"><SourceLink project={project}/></div></ProjectHeading></section>}
 <section className="section" id="demo"><SectionTitle title={project.id==='greeks'?'Interactive preview':'Black–Scholes calculator'}/><FinanceDemo kind={project.id}/></section></>;
}
function ProjectPage({project}) {
 if(project.id==='next')return <><Nav/><main id="main" className="shell" tabIndex="-1"><section className="simple-heading"><ProjectHeading project={project}><a className="button" href={project.destination}>Open Next product site ↗</a></ProjectHeading></section></main><Footer/></>;
 return <div className={`project-page ${project.id}`} style={{'--accent':project.color}}><Nav/><main id="main" className="shell" tabIndex="-1">{['inoffice','paatam'].includes(project.id)?<NativePage project={project}/>:project.id==='quant-lab'?<QuantPage project={project}/>:project.id==='vrp'?<VrpPage project={project}/>:<FinancePage project={project}/>}</main><Footer/></div>;
}
function ProjectCard({project}) {
 const {link}=usePaths();
 return <a href={link(project.id)} className={`project-card card-${project.id}`}><div className="card-art">{project.id==='next'?<div className="next-phone-pair"><Media name="next/iphone-dashboard.webp" alt="Next iPhone dashboard"/><Media name="next/iphone-schedule.webp" alt="Next iPhone schedule"/></div>:project.image?<Media name={project.image} alt={`${project.name} application screenshot`}/>:<div className="formula-art" aria-hidden="true"><span>C = S N(d₁) − K e⁻ʳᵀ N(d₂)</span><svg viewBox="0 0 420 140"><path d="M20 120H400M25 125V10"/><path d="M35 112C180 112 210 100 255 67S340 20 390 12" className="formula-curve"/></svg></div>}</div><div className="card-body"><div className="card-title"><Icon project={project}/><h3>{project.name}</h3><span aria-hidden="true">↗</span></div><p>{project.description}</p><Tags values={project.tech.slice(0,3)}/></div></a>;
}
function ArticleList({limit}) {return <div className="article-grid">{articles.slice(0,limit).map(article=><ArticleCard article={article} key={article.id}/>)}</div>;}
function Contributions() {
  return <section className="section contributions" aria-labelledby="open-source-title">
    <SectionTitle title="Open source" id="open-source-title" />
    <div className="contribution-panel">
      <div className="contribution-intro">
        <span className="library-mark" aria-hidden="true">deal.II</span>
        <h3>C++ for scientific computing</h3>
        <p>I contribute to deal.II, a finite-element library for numerical simulation. My work covers interpolation performance and affine coordinate mapping.</p>
        <div className="optimization-note"><span>Grid spacing</span><code>delta_x[d]</code><p>Compute once in the constructor.<br/>Reuse during interpolation.</p></div>
        <a className="text-button" href="https://github.com/dealii/dealii/pulls?q=is%3Apr+author%3AHarshaMatta">All contributions ↗</a>
      </div>
      <div className="contribution-list">
        <a href="https://github.com/dealii/dealii/pull/19327"><div className="pr-meta"><span className="pr-status merged">Merged</span><span>#19327 · Feb 25, 2026</span><span aria-hidden="true">↗</span></div><h3>Cache uniform-grid spacing</h3><p>Precomputed grid spacing in <code>InterpolatedUniformGridData</code> instead of recalculating it on repeated interpolation calls.</p></a>
        <a href="https://github.com/dealii/dealii/pull/19370"><div className="pr-meta"><span className="pr-status merged">Merged</span><span>#19370 · Mar 8, 2026</span><span aria-hidden="true">↗</span></div><h3>Guard unsupported cell types</h3><p>Added an assertion to catch non-hypercube cells in the real-to-unit affine approximation.</p></a>
        <a href="https://github.com/dealii/dealii/pull/19804"><div className="pr-meta"><span className="pr-status open">Open</span><span>#19804</span><span aria-hidden="true">↗</span></div><h3>Improve affine coordinate mapping</h3><p>Work on real-to-unit cell mapping, including geometry changes and regression tests.</p></a>
      </div>
    </div>
  </section>;
}
function Home() {
 const [filter,setFilter]=useState('All');const {link}=usePaths();const selected=projects.filter(p=>filter==='All'||p.category===filter);
 return <><Nav/><main id="main" className="shell" tabIndex="-1"><section className="home-hero"><p className="intro-meta">Applied mathematics & computer science · UNC–Chapel Hill</p><h1>Harsha Matta</h1><p className="lead">I build apps and tools, explore quantitative finance, and write about the math behind it.</p></section><section id="work" className="section work"><SectionTitle title="Projects"><div className="pills" role="group" aria-label="Filter projects">{['All','Apps','Data & tools'].map(name=><button key={name} aria-pressed={filter===name} onClick={()=>setFilter(name)}>{name}</button>)}</div></SectionTitle><p className="sr-only" role="status">{selected.length} projects</p><div className="project-grid">{selected.map(project=><ProjectCard key={project.id} project={project}/>)}</div></section><section id="writing" className="section writing"><SectionTitle title="Medium articles"><a className="text-button" href={link('articles')}>All articles ↗</a></SectionTitle><ArticleList/></section><Contributions/></main><Footer/></>;
}
function ArticlesPage() {
 return <><Nav/><main id="main" className="shell" tabIndex="-1"><section className="simple-heading"><h1>Medium articles</h1><a className="text-button" href="https://medium.com/@harsha.v.matta">Medium profile ↗</a></section><ArticleList/></main><Footer/></>;
}
export default function App({page='home'}) {
 const project=projects.find(p=>p.id===page);return <PathContext value={page==='home'?'./':'../'}>{page==='home'?<Home/>:page==='articles'?<ArticlesPage/>:<ProjectPage project={project}/>}</PathContext>;
}
