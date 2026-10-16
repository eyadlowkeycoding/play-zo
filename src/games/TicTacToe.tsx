import {useEffect,useState} from 'react'
import {useT} from '../i18n'
import {beep} from '../lib/sfx'
import {bestMove,randomMove,winner,type Cell} from './tttlogic'
import type {GameProps} from './types'
const E:Cell[]=Array(9).fill(null)
export default function TicTacToe({onFinish}:GameProps){const {t,n}=useT()
 const [b,setB]=useState<Cell[]>(E),[hard,setHard]=useState(true),[pts,setPts]=useState(0),w=winner(b)
 useEffect(()=>{if(w)return;const nx=b.filter(Boolean).length%2===1;if(!nx)return
  const id=setTimeout(()=>{const m=hard||Math.random()<.2?bestMove(b):randomMove(b),c=[...b];c[m]='O';setB(c);beep(300,60)},350);return()=>clearTimeout(id)},[b,hard,w])
 useEffect(()=>{if(!w)return;const add=w==='X'?3:w==='draw'?1:0;setPts(p=>{onFinish(p+add);return p+add});beep(w==='X'?800:200,200)},[w]) // eslint-disable-line
 const tap=(i:number)=>{if(w||b[i]||b.filter(Boolean).length%2)return;const c=[...b];c[i]='X';setB(c);beep(500,50)}
 return <div className="space-y-3 text-center"><p className="text-xl font-black">{t('score')}: {n(pts)}</p>
  <div className="flex justify-center gap-2">{[true,false].map(h=><button key={String(h)} aria-pressed={hard===h} className={`btn2 ${hard===h?'!border-cyan-400':''}`} onClick={()=>{setHard(h);setB(E)}}>{t(h?'hard':'easy')}</button>)}</div>
  <div className="mx-auto grid max-w-xs grid-cols-3 gap-2">{b.map((c,i)=><button key={i} onClick={()=>tap(i)} aria-label={`${i+1} ${c??''}`} className={`aspect-square rounded-xl bg-fg/10 text-5xl font-black hover:bg-fg/20 ${c==='X'?'text-cyan-300':'text-pink-400'}`}>{c}</button>)}</div>
  <p className="h-7 text-xl font-black" aria-live="polite">{w==='X'?t('win'):w==='O'?t('lose'):w==='draw'?t('draw'):''}</p>
  <button className="btn" onClick={()=>setB(E)}>{t(w?'again':'restart')}</button></div>}
