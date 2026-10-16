import {Component,type ReactNode} from 'react'
import {Link} from 'react-router-dom'
import {Heart} from 'lucide-react'
import {useT} from '../i18n'
import {useApp} from '../lib/state'
import type {GameDef} from '../games/registry'
/** Reserved ad slot. No ad script or publisher ID is loaded; set ADS in src/ads.ts after AdSense approval. */
export const ADS={enabled:false,publisherId:''}
export function AdSlot({id}:{id:string}){const {t}=useT();return <aside aria-label={t('ad')} data-slot={id} className="my-8 grid min-h-[90px] place-items-center rounded-xl border border-dashed border-fg/20 text-xs text-fg/50">{t('ad')}</aside>}
export class Boundary extends Component<{msg:string;children:ReactNode},{e:boolean}>{state={e:false};static getDerivedStateFromError(){return{e:true}};render(){return this.state.e?<p role="alert" className="rounded-xl bg-pink-500/15 p-4">{this.props.msg}</p>:this.props.children}}
export function GameCard({g}:{g:GameDef}){const {t}=useT(),{s,toggleFav}=useApp(),f=s.favs.includes(g.id)
 return <article className="group overflow-hidden rounded-2xl border border-fg/10 bg-card/70 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-violet-600/20">
  <Link to={`/games/${g.id}`} className={`relative grid h-36 place-items-center bg-gradient-to-br ${g.grad}`} aria-label={t(`g.${g.id}.name`)}><span className="bob text-6xl drop-shadow-lg" aria-hidden>{g.emoji}</span></Link>
  <div className="space-y-2 p-4"><div className="flex items-center justify-between gap-2"><h3 className="text-lg font-extrabold">{t(`g.${g.id}.name`)}</h3>
   <button onClick={()=>toggleFav(g.id)} aria-pressed={f} aria-label={t(f?'fav.rm':'fav.add')} className="rounded-full p-1.5 hover:bg-fg/10"><Heart size={20} className={f?'fill-pink-500 text-pink-500':''}/></button></div>
   <span className="inline-block rounded-full bg-violet-500/20 px-2.5 py-0.5 text-xs font-semibold text-violet-300">{t(`cat.${g.cat}`)}</span>
   <p className="text-sm text-fg/70">{t(`g.${g.id}.desc`)}</p>
   <Link to={`/games/${g.id}`} className="btn w-full">{t('play')}</Link></div></article>}
export const Grid=({list}:{list:GameDef[]})=><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(g=><GameCard key={g.id} g={g}/>)}</div>
