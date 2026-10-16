import {useCallback,useEffect,useRef,useState} from 'react'
import {ArrowDown,ArrowLeft,ArrowRight,ArrowUp} from 'lucide-react'
import {useT} from '../i18n'
import {beep} from '../lib/sfx'
import type {GameProps} from './types'
const N=20
type V=[number,number]
export default function Snake({onFinish}:GameProps){const {t,n}=useT()
 const cv=useRef<HTMLCanvasElement>(null),touch=useRef<V|null>(null)
 const [st,setSt]=useState<'idle'|'run'|'pause'|'over'>('idle'),[score,setScore]=useState(0)
 const g=useRef({s:[[10,10],[9,10]] as V[],d:[1,0] as V,q:[1,0] as V,f:[15,10] as V})
 const draw=useCallback(()=>{const c=cv.current?.getContext('2d');if(!c)return;const z=400/N,o=g.current;c.fillStyle='#0b1030';c.fillRect(0,0,400,400);c.fillStyle='#f472b6';c.fillRect(o.f[0]*z+3,o.f[1]*z+3,z-6,z-6);o.s.forEach(([x,y],i)=>{c.fillStyle=i?'#8b5cf6':'#22d3ee';c.fillRect(x*z+1,y*z+1,z-2,z-2)})},[])
 const start=()=>{g.current={s:[[10,10],[9,10]],d:[1,0],q:[1,0],f:[15,10]};setScore(0);setSt('run');draw()}
 const dir=(x:number,y:number)=>{const d=g.current.d;if(d[0]+x!==0||d[1]+y!==0)g.current.q=[x,y]}
 useEffect(()=>{draw()},[draw])
 useEffect(()=>{if(st!=='run')return
  const id=setInterval(()=>{const o=g.current;o.d=o.q;const h:V=[o.s[0][0]+o.d[0],o.s[0][1]+o.d[1]]
   if(h[0]<0||h[1]<0||h[0]>=N||h[1]>=N||o.s.some(p=>p[0]===h[0]&&p[1]===h[1])){setSt('over');beep(150,300);onFinish(score);return}
   o.s.unshift(h)
   if(h[0]===o.f[0]&&h[1]===o.f[1]){setScore(v=>v+1);beep(700,60);let f:V;do{f=[Math.floor(Math.random()*N),Math.floor(Math.random()*N)]}while(o.s.some(p=>p[0]===f[0]&&p[1]===f[1]));o.f=f}else o.s.pop()
   draw()},Math.max(55,140-score*4))
  return()=>clearInterval(id)},[st,score,draw,onFinish])
 useEffect(()=>{const m:Record<string,V>={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}
  const k=(e:KeyboardEvent)=>{const v=m[e.key];if(v){e.preventDefault();dir(...v)}else if(e.key===' '){e.preventDefault();setSt(s=>s==='run'?'pause':s==='pause'?'run':s)}}
  window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)},[])
 const swipe=(e:React.TouchEvent)=>{const s=touch.current,p=e.changedTouches[0];if(!s)return;const dx=p.clientX-s[0],dy=p.clientY-s[1];if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;Math.abs(dx)>Math.abs(dy)?dir(dx>0?1:-1,0):dir(0,dy>0?1:-1)}
 const pad=(x:number,y:number,I:typeof ArrowUp,l:string)=><button aria-label={l} className="btn2 !p-3" onClick={()=>dir(x,y)}><I/></button>
 return <div className="space-y-3 text-center"><p className="text-xl font-black">{t('score')}: {n(score)}</p>
  <div className="relative mx-auto max-w-sm"><canvas ref={cv} width={400} height={400} className="w-full touch-none rounded-xl border border-fg/10" onTouchStart={e=>{touch.current=[e.touches[0].clientX,e.touches[0].clientY]}} onTouchEnd={swipe}/>
   {st==='over'&&<p className="absolute inset-0 grid place-items-center rounded-xl bg-black/60 text-3xl font-black">{t('over')}</p>}</div>
  <div className="flex justify-center gap-2"><button className="btn" onClick={start}>{t(st==='idle'?'start':'restart')}</button>
   {(st==='run'||st==='pause')&&<button className="btn2" onClick={()=>setSt(st==='run'?'pause':'run')}>{t(st==='run'?'pause':'resume')}</button>}</div>
  <div className="mx-auto grid w-40 grid-cols-3 gap-1"><i/>{pad(0,-1,ArrowUp,'up')}<i/>{pad(-1,0,ArrowLeft,'left')}{pad(0,1,ArrowDown,'down')}{pad(1,0,ArrowRight,'right')}</div></div>}
