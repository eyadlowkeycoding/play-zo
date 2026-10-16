import {Link,NavLink,Outlet} from 'react-router-dom'
import {Moon,Sun,Volume2,VolumeX} from 'lucide-react'
import {useT} from '../i18n'
import {useApp} from '../lib/state'
const nav:[string,string][]=[['/','nav.home'],['/games','nav.games'],['/favorites','nav.favs'],['/daily','nav.daily'],['/stats','nav.stats']]
export const BRAND='PLAYZO',EMAIL='hello@example.com'
export default function Layout(){const {t,lang,setLang}=useT(),{s,set}=useApp()
 const cls=({isActive}:{isActive:boolean})=>`rounded-lg px-3 py-1.5 font-semibold ${isActive?'bg-violet-500/25 text-cyan-300':'hover:bg-fg/10'}`
 return <div className="flex min-h-screen flex-col">
  <header className="sticky top-0 z-20 border-b border-fg/10 bg-bg/80 backdrop-blur"><div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-4 py-3">
   <Link to="/" className="me-auto flex items-center gap-2 text-2xl font-black tracking-tight"><img src="/favicon.svg" alt="" width={32} height={32}/>{BRAND}</Link>
   <nav aria-label="Main" className="order-3 flex w-full flex-wrap gap-1 text-sm sm:order-none sm:w-auto">{nav.map(([to,k])=><NavLink key={to} to={to} end={to==='/'} className={cls}>{t(k)}</NavLink>)}</nav>
   <button className="btn2" onClick={()=>set({mute:!s.mute})} aria-label={t('mute')} aria-pressed={s.mute}>{s.mute?<VolumeX size={18}/>:<Volume2 size={18}/>}</button>
   <button className="btn2" onClick={()=>set({theme:s.theme==='dark'?'light':'dark'})} aria-label={t('theme')}>{s.theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button>
   <button className="btn2" onClick={()=>setLang(lang==='en'?'ar':'en')}>{t('lang')}</button></div></header>
  <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8"><Outlet/></main>
  <footer className="border-t border-fg/10 py-6 text-center text-sm text-fg/60"><nav aria-label="Footer" className="mb-2 flex justify-center gap-4">{(['about','contact','privacy','terms'] as const).map(k=><Link key={k} to={`/${k}`} className="hover:text-cyan-300">{t(`${k}.t`)}</Link>)}</nav><p>© {BRAND} · {t('local')}</p></footer></div>}
