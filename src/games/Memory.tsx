import {useEffect,useState} from 'react'
import {useT} from '../i18n'
import {beep} from '../lib/sfx'
import {shuffle} from '../lib/date'
import type {GameProps} from './types'
const mk=()=>shuffle(['🚀','🎈','🍕','🎸','🦊','🌈','⚡','🍩'].flatMap(e=>[e,e]).map((e,i)=>({id:i,e})))
export default function Memory({onFinish}:GameProps){const {t,n}=useT()
 const [cards,setCards]=useState(mk),[open,setOpen]=useState<number[]>([]),[done,setDone]=useState<number[]>([]),[moves,setMoves]=useState(0)
 const won=done.length===cards.length
 useEffect(()=>{if(open.length!==2)return;const [a,b]=open,ok=cards[a].e===cards[b].e;setMoves(m=>m+1)
  const id=setTimeout(()=>{if(ok){setDone(d=>[...d,a,b]);beep(800,80)}else beep(220,80);setOpen([])},ok?250:800);return()=>clearTimeout(id)},[open]) // eslint-disable-line
 useEffect(()=>{if(won){onFinish(moves);beep(1000,250)}},[won]) // eslint-disable-line
 const flip=(i:number)=>{if(open.length<2&&!open.includes(i)&&!done.includes(i)){setOpen(o=>[...o,i]);beep(440,40)}}
 const restart=()=>{setCards(mk());setOpen([]);setDone([]);setMoves(0)}
 return <div className="space-y-3 text-center"><p className="text-xl font-black">{t('moves')}: {n(moves)}</p>
  <div className="mx-auto grid max-w-sm grid-cols-4 gap-2">{cards.map((c,i)=>{const up=open.includes(i)||done.includes(i);return <button key={c.id} onClick={()=>flip(i)} aria-label={up?c.e:'?'} className={`aspect-square rounded-xl text-3xl transition ${up?'bg-card border border-cyan-400/60':'bg-gradient-to-br from-violet-600 to-pink-500'}`}>{up?c.e:''}</button>})}</div>
  <p className="h-7 text-xl font-black" aria-live="polite">{won?t('win'):''}</p><button className="btn" onClick={restart}>{t(won?'again':'restart')}</button></div>}
