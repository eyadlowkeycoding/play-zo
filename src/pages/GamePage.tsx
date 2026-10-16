import {Suspense,useCallback,useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import {Heart,RotateCcw,Share2} from 'lucide-react'
import {useT} from '../i18n'
import {useApp} from '../lib/state'
import {usePageMeta} from '../lib/meta'
import {share} from '../lib/sfx'
import {GAMES} from '../games/registry'
import {AdSlot,Boundary} from '../components/Ui'
export default function GamePage(){const {id}=useParams(),g=GAMES.find(x=>x.id===id),{t,n}=useT(),{s,record,toggleFav}=useApp(),[run,setRun]=useState(0),[last,setLast]=useState<number|null>(null),[note,setNote]=useState('')
 const name=g?t(`g.${g.id}.name`):'',url=location.origin+`/games/${id}`
 usePageMeta(g?`${name} – PLAYZO`:'PLAYZO',g?t(`g.${g!.id}.desc`):'',g?{'@context':'https://schema.org','@type':'Game',name,description:t(`g.${g.id}.desc`),url,genre:g.cat,inLanguage:['en','ar']}:undefined)
 const fin=useCallback((sc:number)=>{if(g){record(g.id,sc);setLast(sc)}},[g,record])  // eslint-disable-line
 if(!g)return <p>{t('nf')} <Link className="underline" to="/games">{t('nav.games')}</Link></p>
 const C=g.Comp,f=s.favs.includes(g.id),b=s.best[g.id],u=g.unit?' '+g.unit:''
 const flash=()=>{setNote(t('copied'));setTimeout(()=>setNote(''),2000)}
 return <div className="mx-auto max-w-xl"><Link to="/games" className="text-sm text-cyan-300">← {t('nav.games')}</Link>
  <div className="my-3 flex flex-wrap items-center gap-2"><h1 className="me-auto text-4xl font-black">{g.emoji} {name}</h1>
   <button className="btn2" aria-pressed={f} aria-label={t(f?'fav.rm':'fav.add')} onClick={()=>toggleFav(g.id)}><Heart size={18} className={f?'fill-pink-500 text-pink-500':''}/></button>
   <button className="btn2" onClick={()=>share(t('share.game',{g:name}),url,flash)}><Share2 size={18}/>{t('share')}</button></div>
  <p className="text-fg/75">{t(`g.${g.id}.how`)}</p><p className="my-2 font-bold" aria-live="polite">{t('best')}: {b!==undefined?n(b)+u:'–'} {note&&<span className="text-cyan-300">· {note}</span>}</p>
  <div className="rounded-2xl border border-fg/10 bg-card/70 p-4"><Boundary msg={t('err')} key={run}><Suspense fallback={<p className="p-8 text-center">…</p>}><C onFinish={fin}/></Suspense></Boundary></div>
  <div className="mt-3 flex flex-wrap gap-2"><button className="btn" onClick={()=>{setRun(r=>r+1);setLast(null)}}><RotateCcw size={18}/>{t('again')}</button>
   {last!==null&&<button className="btn2" onClick={()=>share(t('share.score',{s:n(last)+u,g:name}),url,flash)}><Share2 size={18}/>{t('share')} {t('score')}</button>}</div>
  <AdSlot id="game-below"/></div>}
