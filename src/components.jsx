import React, { createContext, useContext, useState } from 'react';
import { mediaSizes } from './media.js';
import { articles } from './data.js';

export const PathContext = createContext('./');
export function usePaths() {
  const root = useContext(PathContext);
  return { root, asset: name => `${root}assets/${name}`, link: id => id === 'next' ? 'https://harshamatta.github.io/projNext/' : `${root}${id}/` };
}
export function Media({ name, alt, eager = false, ...props }) {
  const { asset } = usePaths();
  const [width, height] = mediaSizes[name] || [1440, 1000];
  return <img src={asset(name)} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} decoding="async" {...props} />;
}
export function Icon({ project }) {
  return project.icon ? <Media name={project.icon} alt="" className="app-icon" /> : <span className="app-icon glyph" aria-hidden="true" style={{background:project.color}}>{project.mark}</span>;
}
export function Nav() {
  const {root,link} = usePaths();
  return <header className="nav shell"><a className="brand" href={root}>Harsha Matta<span className="brand-dot" aria-hidden="true" /></a><nav aria-label="Main navigation"><a href={`${root}#work`}>Projects</a><a href={link('articles')}>Articles</a><a href="mailto:harsha.v.matta@gmail.com">Email ↗</a></nav></header>;
}
const social = [
  ['LinkedIn','https://linkedin.com/in/harshamatta','in'],
  ['Email','mailto:harsha.v.matta@gmail.com','mail'],
  ['Medium','https://medium.com/@harsha.v.matta','medium'],
  ['GitHub','https://github.com/HarshaMatta','github'],
];
function SocialIcon({kind}) {
  if(kind==='in') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="5" r="1.5" fill="currentColor" stroke="none"/><path d="M5 9v11M10 20V9M10 14c0-6 9-6 9 0v6" strokeWidth="2.6"/></svg>;
  if(kind==='mail') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>;
  if(kind==='medium') return <svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="7" cy="12" rx="5" ry="6"/><ellipse cx="17" cy="12" rx="2" ry="6"/><path d="M22 7v10"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 21v-4c-4 1-4-2-6-2M16 21v-4c0-1-.4-2-1-2 4-.5 6-2 6-6a6 6 0 0 0-2-4l-.2-3-4 2a12 12 0 0 0-6 0L5 2v3a6 6 0 0 0-2 4c0 4 2 5.5 6 6-1 0-1 1-1 2"/></svg>;
}
export function Footer() {
  return <footer className="footer shell" id="connect"><div className="footer-heading"><strong>Harsha Matta</strong><span>Connect</span></div><div className="social-grid">{social.map(([label,url,kind])=><a key={label} href={url} className={`social-link social-${kind}`}><span className="social-icon"><SocialIcon kind={kind}/></span><span className="social-name">{label}</span><span className="social-arrow" aria-hidden="true">↗</span></a>)}</div></footer>;
}
export function Tags({values}) {return <ul className="tags" aria-label="Technologies">{values.map(value=><li key={value}>{value}</li>)}</ul>;}
export function SectionTitle({title,children,id}) {return <div className="section-head"><h2 id={id}>{title}</h2>{children}</div>;}
export function ArticleLink({project}) {
  const article=articles.find(a=>a.project===project.id);
  if(!article) return null;
  return <a className="project-article" href={article.url}><Media name={article.image} alt=""/><span><small>Medium · <time dateTime={article.date}>{article.displayDate}</time></small><strong>{article.title}</strong></span><span aria-hidden="true">↗</span></a>;
}
export function ArticleCard({article}) {
  const {link}=usePaths();
  return <article className="article-card"><a href={article.url}><Media name={article.image} alt=""/><time dateTime={article.date}>{article.displayDate}</time><h3>{article.title} <span aria-hidden="true">↗</span></h3></a>{article.project && <a className="article-project" href={link(article.project)}>View project →</a>}</article>;
}
export function Screenshot({name,caption,eager=false,portrait=false}) {
  const {asset}=usePaths();
  return <figure className={`media-figure ${portrait?'portrait':''}`}><a className={portrait?'device-frame':'desktop-frame'} href={asset(name)} target="_blank" rel="noopener" aria-label={`Open screenshot: ${caption}`}><Media name={name} alt={caption} eager={eager}/></a></figure>;
}
export function ScreenshotGallery({project}) {
  const [photo,setPhoto]=useState(0);const {asset}=usePaths();const name=project.gallery[photo];const caption=project.galleryCaptions[photo];
  return <section className="section gallery"><SectionTitle title="Screenshots"><div className="pills" role="group" aria-label={`${project.name} screenshots`}>{project.gallery.map((name,index)=><button key={name} aria-label={`Show screenshot ${index+1}`} aria-pressed={photo===index} onClick={()=>setPhoto(index)}>{index+1}</button>)}</div></SectionTitle><div className="gallery-stage"><Screenshot name={name} caption={caption} portrait={project.id!=='next'}/></div><p className="gallery-caption"><span aria-live="polite">{caption}</span><a href={asset(name)} target="_blank" rel="noopener">Full image ↗</a></p></section>;
}
