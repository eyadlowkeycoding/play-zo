import {useEffect,useRef,useState} from 'react'
import {useT} from '../i18n'
import {beep} from '../lib/sfx'
import type {GameProps} from './types'
export default function Reaction({onFinish}:GameProps){const {t,n}=useT()
 const [st,setSt]=useState<'idle'|'wait'|'go'|'early'|'res'>('idle'),[ms,setMs]=useState(0),t0=useRef(0),tm=useRef<number>()
 useEffect(()=>()=>clearTimeout(tm.current),[])
 const tap=()=>{if(st==='wait'){clearTimeout(tm.current);setSt('early');beep(180,200)}
  else if(st==='go'){const r=Math.round(performance.now()-t0.current);setMs(r);setSt('res');beep(900,80);onFinish(r)}
  else{setSt('wait');tm.current=window.setTimeout(()=>{t0.current=performance.now();setSt('go');beep(600,60)},1000+Math.random()*3000)}}
 const bg={idle:'bg-violet-600',wait:'bg-pink-600',go:'bg-emerald-500',early:'bg-amber-600',res:'bg-blue-600'}[st]
 return <button onClick={tap} className={`grid h-64 w-full select-none place-items-center rounded-2xl text-2xl font-black text-white transition-colors ${bg}`} aria-live="polite">{st==='res'?t('r.res',{ms:n(ms)}):t({idle:'r.idle',wait:'r.wait',go:'r.go',early:'r.early'}[st as 'idle'])}</button>}
