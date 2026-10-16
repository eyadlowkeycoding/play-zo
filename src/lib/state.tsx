import {createContext,useContext,useEffect,useState,type ReactNode} from 'react'
import {GAMES} from '../games/registry'
import {dailyIndex,nextStreak,ymd,yesterday,type Streak} from './date'
import {setMuted} from './sfx'
export interface Save{favs:string[];recent:string[];best:Record<string,number>;plays:Record<string,number>;streak:Streak;mute:boolean;theme:'dark'|'light'}
const KEY='playzo:v1'
const init:Save={favs:[],recent:[],best:{},plays:{},streak:{last:'',count:0,best:0},mute:false,theme:'dark'}
const load=():Save=>{try{return{...init,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{return init}}
export const dailyGame=(d=ymd())=>GAMES[dailyIndex(d,GAMES.length)]
interface A{s:Save;toggleFav:(id:string)=>void;record:(id:string,score:number)=>void;set:(p:Partial<Save>)=>void}
const C=createContext<A>(null as unknown as A)
export const useApp=()=>useContext(C)
export function AppProvider({children}:{children:ReactNode}){
 const [s,setS]=useState<Save>(load)
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}setMuted(s.mute);document.documentElement.classList.toggle('light',s.theme==='light')},[s])
 const toggleFav=(id:string)=>setS(p=>({...p,favs:p.favs.includes(id)?p.favs.filter(x=>x!==id):[...p.favs,id]}))
 const record=(id:string,score:number)=>setS(p=>{const g=GAMES.find(x=>x.id===id),b=p.best[id],today=ymd()
  const better=b===undefined||(g?.lowerBetter?score<b:score>b)
  return{...p,best:better?{...p.best,[id]:score}:p.best,plays:{...p.plays,[id]:(p.plays[id]||0)+1},recent:[id,...p.recent.filter(x=>x!==id)].slice(0,6),streak:id===dailyGame(today).id?nextStreak(p.streak,today):p.streak}})
 return <C.Provider value={{s,toggleFav,record,set:p=>setS(o=>({...o,...p}))}}>{children}</C.Provider>
}
export const totalPlays=(s:Save)=>Object.values(s.plays).reduce((a,b)=>a+b,0)
export const currentStreak=(s:Save)=>s.streak.last===ymd()||s.streak.last===yesterday(ymd())?s.streak.count:0
export const achievements=(s:Save)=>[['ach.first',totalPlays(s)>=1],['ach.ten',totalPlays(s)>=10],['ach.streak3',s.streak.best>=3],['ach.fav3',s.favs.length>=3],['ach.mix',Object.keys(s.plays).length>=3]] as [string,boolean][]
