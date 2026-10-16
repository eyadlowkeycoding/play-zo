export interface Streak{last:string;count:number;best:number}
export const ymd=(d=new Date())=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
export const yesterday=(s:string)=>{const [y,m,d]=s.split('-').map(Number);return ymd(new Date(y,m-1,d-1))}
/** A day counts when you finish a round of that day's daily game. Skipping a day resets to 1. */
export function nextStreak(s:Streak,today:string):Streak{if(s.last===today)return s;const c=s.last===yesterday(today)?s.count+1:1;return{last:today,count:c,best:Math.max(s.best,c)}}
export const dailyIndex=(d:string,n:number)=>{let h=0;for(const ch of d)h=(h*31+ch.charCodeAt(0))>>>0;return h%n}
export function shuffle<T>(a:T[],rnd=Math.random):T[]{const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
