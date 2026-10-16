export type Board=number[][]
export type Dir='left'|'right'|'up'|'down'
export function slideRow(r:number[]){const a=r.filter(Boolean),o:number[]=[];let gained=0;for(let i=0;i<a.length;i++){if(a[i]===a[i+1]){o.push(a[i]*2);gained+=a[i]*2;i++}else o.push(a[i])}while(o.length<r.length)o.push(0);return{row:o,gained}}
const rev=(b:Board)=>b.map(r=>[...r].reverse()),tr=(b:Board)=>b[0].map((_,i)=>b.map(r=>r[i]))
export function move(b:Board,d:Dir){let w=d==='left'?b:d==='right'?rev(b):d==='up'?tr(b):rev(tr(b));let gained=0
 w=w.map(r=>{const s=slideRow(r);gained+=s.gained;return s.row})
 const out=d==='left'?w:d==='right'?rev(w):d==='up'?tr(w):tr(rev(w))
 return{board:out,gained,moved:out.some((r,i)=>r.some((v,j)=>v!==b[i][j]))}}
export function addTile(b:Board,rnd=Math.random):Board{const e:[number,number][]=[];b.forEach((r,i)=>r.forEach((v,j)=>{if(!v)e.push([i,j])}));if(!e.length)return b;const [i,j]=e[Math.floor(rnd()*e.length)],c=b.map(r=>[...r]);c[i][j]=rnd()<.9?2:4;return c}
export const newBoard=():Board=>addTile(addTile(Array.from({length:4},()=>Array<number>(4).fill(0))))
export const canMove=(b:Board)=>(['left','right','up','down'] as Dir[]).some(d=>move(b,d).moved)
