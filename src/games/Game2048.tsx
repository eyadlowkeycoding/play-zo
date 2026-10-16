import {useCallback,useEffect,useRef,useState} from 'react'
import {useT} from '../i18n'
import {beep} from '../lib/sfx'
import {addTile,canMove,move,newBoard,type Dir} from './g2048logic'
import type {GameProps} from './types'
const col:Record<number,string>={0:'bg-fg/10',2:'bg-cyan-500',4:'bg-blue-500',8:'bg-violet-500',16:'bg-violet-600',32:'bg-pink-500',64:'bg-pink-600',128:'bg-amber-500',256:'bg-amber-600',512:'bg-orange-500',1024:'bg-orange-600',2048:'bg-yellow-400 text-black'}
export default function Game2048({onFinish}:GameProps){const {t,n}=useT()
 const [b,setB]=useState(newBoard),[score,setScore]=useState(0),[over,setOver]=useState(false),t0=useRef<[number,number]|null>(null)
 const go=useCallback((d:Dir)=>{if(over)return;const r=move(b,d);if(!r.moved)return;const nb=addTile(r.board),sc=score+r.gained;setB(nb);setScore(sc);if(r.gained)beep(500,50)
  if(!canMove(nb)){setOver(true);beep(150,300);onFinish(sc)}},[b,score,over,onFinish])
 useEffect(()=>{const m:Record<string,Dir>={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'}
  const k=(e:KeyboardEvent)=>{const d=m[e.key];if(d){e.preventDefault();go(d)}};window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)},[go])
 const end=(e:React.TouchEvent)=>{const s=t0.current,p=e.changedTouches[0];if(!s)return;const dx=p.clientX-s[0],dy=p.clientY-s[1];if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;go(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'))}
 const restart=()=>{setB(newBoard());setScore(0);setOver(false)}
 return <div className="space-y-3 text-center"><p className="text-xl font-black">{t('score')}: {n(score)}</p>
  <div className="relative mx-auto grid max-w-sm touch-none grid-cols-4 gap-2 rounded-xl bg-fg/10 p-2" onTouchStart={e=>{t0.current=[e.touches[0].clientX,e.touches[0].clientY]}} onTouchEnd={end}>
   {b.flat().map((v,i)=><div key={i} className={`grid aspect-square place-items-center rounded-lg text-xl font-black text-white transition ${col[v]??'bg-yellow-300 text-black'}`}>{v?n(v):''}</div>)}
   {over&&<p className="absolute inset-0 grid place-items-center rounded-xl bg-black/65 text-3xl font-black">{t('over')}</p>}</div>
  <button className="btn" onClick={restart}>{t('restart')}</button></div>}
