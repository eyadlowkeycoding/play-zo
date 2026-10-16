let muted=false,ctx:AudioContext|null=null
export const setMuted=(m:boolean)=>{muted=m}
export function beep(freq=440,ms=80){if(muted)return;try{ctx??=new AudioContext();const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq;g.gain.value=.05;o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+ms/1000)}catch{}}
export async function share(text:string,url:string,onCopy:()=>void){try{if(navigator.share){await navigator.share({text,url});return}}catch{return}try{await navigator.clipboard.writeText(`${text} ${url}`);onCopy()}catch{}}
