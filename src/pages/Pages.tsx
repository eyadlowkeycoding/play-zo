import {useMemo,useState} from 'react'
import {Link,useSearchParams} from 'react-router-dom'
import {Flame,Search} from 'lucide-react'
import {useT} from '../i18n'
import {achievements,currentStreak,dailyGame,totalPlays,useApp} from '../lib/state'
import {usePageMeta} from '../lib/meta'
import {CATS,GAMES} from '../games/registry'
import {AdSlot,GameCard,Grid} from '../components/Ui'
import {EMAIL} from '../components/Layout'
const H=({children}:{children:string})=><h2 className="mb-4 mt-10 text-2xl font-black">{children}</h2>
function Home(){const {t}=useT();usePageMeta('PLAYZO – '+t('hero.t'),t('hero.s'));const d=dailyGame()
 return <>
  <section className="rounded-3xl border border-fg/10 bg-gradient-to-br from-violet-600/30 via-blue-500/10 to-pink-500/20 p-8 sm:p-14">
   <h1 className="text-5xl font-black leading-tight sm:text-7xl">{t('hero.t')}</h1><p className="mt-4 max-w-xl text-lg text-fg/80">{t('hero.s')}</p>
   <Link to="/games" className="btn mt-6 px-6 py-3 text-lg">{t('hero.cta')}</Link></section>
  <H>{t('sec.daily')}</H><div className="max-w-sm"><GameCard g={d}/></div>
  <H>{t('sec.trending')}</H><Grid list={GAMES}/><AdSlot id="home-mid"/>
  <H>{t('sec.cats')}</H><div className="flex flex-wrap gap-2">{CATS.map(c=><Link key={c} to={`/games?c=${c}`} className="btn2">{t(`cat.${c}`)}</Link>)}</div></>}
function Games(){const {t}=useT();usePageMeta('PLAYZO – '+t('nav.games'),t('hero.s'));const [sp,setSp]=useSearchParams(),[q,setQ]=useState(''),c=sp.get('c')||'all'
 const list=useMemo(()=>GAMES.filter(g=>(c==='all'||g.cat===c)&&t(`g.${g.id}.name`).toLowerCase().includes(q.toLowerCase())),[c,q,t])
 return <><h1 className="text-4xl font-black">{t('nav.games')}</h1>
  <div className="my-5 flex flex-wrap gap-2"><label className="relative flex-1 min-w-[12rem]"><Search size={18} className="pointer-events-none absolute start-3 top-3"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('search')} aria-label={t('search')} className="w-full rounded-xl border border-fg/15 bg-card/60 py-2 ps-10 pe-3"/></label>
   {['all',...CATS].map(k=><button key={k} aria-pressed={c===k} onClick={()=>setSp(k==='all'?{}:{c:k})} className={`btn2 ${c===k?'!border-cyan-400 !text-cyan-300':''}`}>{k==='all'?t('all'):t(`cat.${k}`)}</button>)}</div>
  {list.length?<Grid list={list}/>:<p>{t('empty')}</p>}<AdSlot id="games-bottom"/></>}
function Favs(){const {t}=useT(),{s}=useApp();usePageMeta('PLAYZO – '+t('fav.t'),t('hero.s'));const l=GAMES.filter(g=>s.favs.includes(g.id))
 return <><h1 className="text-4xl font-black mb-5">{t('fav.t')}</h1>{l.length?<Grid list={l}/>:<p>{t('empty')}</p>}</>}
function Daily(){const {t,n}=useT(),{s}=useApp();usePageMeta('PLAYZO – '+t('daily.t'),t('daily.d'));const d=dailyGame()
 return <><h1 className="text-4xl font-black">{t('daily.t')}</h1><p className="my-3 max-w-xl text-fg/80">{t('daily.d')}</p>
  <p className="mb-5 flex items-center gap-2 text-xl font-extrabold"><Flame className="text-pink-500"/>{t('streak')}: {n(currentStreak(s))} {t('days')} · {t('best.streak')}: {n(s.streak.best)}</p><div className="max-w-sm"><GameCard g={d}/></div><p className="mt-4 text-sm text-fg/60">{t('local')}</p></>}
function Stats(){const {t,n}=useT(),{s}=useApp();usePageMeta('PLAYZO – '+t('stats.t'),t('local'))
 return <><h1 className="text-4xl font-black">{t('stats.t')}</h1><p className="my-3 text-xl font-bold">{t('plays')}: {n(totalPlays(s))} · {t('streak')}: {n(currentStreak(s))}</p>
  <div className="grid gap-3 sm:grid-cols-2">{GAMES.map(g=><div key={g.id} className="flex justify-between rounded-xl border border-fg/10 bg-card/60 p-3"><span>{g.emoji} {t(`g.${g.id}.name`)}</span><span>{s.best[g.id]!==undefined?`${t('best')}: ${n(s.best[g.id])}${g.unit?' '+g.unit:''}`:'–'} · {n(s.plays[g.id]||0)}×</span></div>)}</div>
  <H>{t('ach')}</H><ul className="flex flex-wrap gap-2">{achievements(s).map(([k,ok])=><li key={k} className={`rounded-full px-4 py-1.5 font-bold ${ok?'bg-gradient-to-r from-violet-600 to-pink-500':'bg-fg/10 text-fg/50'}`}>{ok?'🏅 ':'🔒 '}{t(k)}</li>)}</ul>
  <H>{t('recent')}</H>{s.recent.length?<Grid list={s.recent.map(id=>GAMES.find(g=>g.id===id)!).filter(Boolean)}/>:<p>{t('empty')}</p>}</>}
function Static({k}:{k:'about'|'contact'|'privacy'|'terms'}){const {t}=useT();usePageMeta(`PLAYZO – ${t(k+'.t')}`,t(k+'.b').split('\n')[0])
 return <article className="max-w-2xl space-y-3"><h1 className="text-4xl font-black">{t(k+'.t')}</h1>{t(k+'.b').split('\n').map((p,i)=><p key={i}>{p}</p>)}{k==='contact'&&<a className="btn" href={`mailto:${EMAIL}`}>{EMAIL}</a>}</article>}
function NotFound(){const {t}=useT();return <div><h1 className="text-4xl font-black">{t('nf')}</h1><p className="my-3">{t('nf.b')}</p><Link className="btn" to="/">{t('nav.home')}</Link></div>}
export default {Home,Games,Favs,Daily,Stats,Static,NotFound}
