export type Cell='X'|'O'|null
const L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
export const winner=(b:Cell[]):Cell|'draw'|null=>{for(const [a,c,d] of L)if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];return b.every(Boolean)?'draw':null}
function mm(b:Cell[],turn:'X'|'O'):number{const w=winner(b);if(w==='O')return 1;if(w==='X')return -1;if(w==='draw')return 0;let r=turn==='O'?-2:2
 b.forEach((c,i)=>{if(c)return;const n=[...b];n[i]=turn;const s=mm(n,turn==='O'?'X':'O');r=turn==='O'?Math.max(r,s):Math.min(r,s)});return r}
/** Unbeatable move for O (minimax). */
export function bestMove(b:Cell[]):number{let best=-2,mv=-1;b.forEach((c,i)=>{if(c)return;const n=[...b];n[i]='O';const s=mm(n,'X');if(s>best){best=s;mv=i}});return mv}
export const randomMove=(b:Cell[])=>{const e=b.map((c,i)=>c?-1:i).filter(i=>i>=0);return e[Math.floor(Math.random()*e.length)]}
