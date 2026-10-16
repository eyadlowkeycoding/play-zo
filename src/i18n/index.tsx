import {createContext,useContext,useEffect,useState,type ReactNode} from 'react'
import {en} from './en'
import {ar} from './ar'
export type Lang='en'|'ar'
const dict:Record<Lang,Record<string,string>>={en,ar}
interface Ctx{lang:Lang;setLang:(l:Lang)=>void;t:(k:string,v?:Record<string,string|number>)=>string;n:(x:number)=>string}
const C=createContext<Ctx>(null as unknown as Ctx)
export const useT=()=>useContext(C)
const initial=():Lang=>{try{const s=localStorage.getItem('playzo:lang');if(s==='ar'||s==='en')return s}catch{}return navigator.language.startsWith('ar')?'ar':'en'}
export function I18nProvider({children}:{children:ReactNode}){
 const [lang,setLang]=useState<Lang>(initial)
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';try{localStorage.setItem('playzo:lang',lang)}catch{}},[lang])
 const t:Ctx['t']=(k,v)=>{let s=dict[lang][k]??dict.en[k]??k;if(v)for(const x in v)s=s.replace(`{${x}}`,String(v[x]));return s}
 const nf=new Intl.NumberFormat(lang==='ar'?'ar-EG':'en')
 return <C.Provider value={{lang,setLang,t,n:x=>nf.format(x)}}>{children}</C.Provider>
}
