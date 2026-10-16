import {useEffect} from 'react'
export function usePageMeta(title:string,desc:string,ld?:object){useEffect(()=>{document.title=title
 let m=document.querySelector('meta[name=description]');if(!m){m=document.createElement('meta');m.setAttribute('name','description');document.head.appendChild(m)};m.setAttribute('content',desc)
 let s=document.getElementById('ld');if(ld){if(!s){s=document.createElement('script');s.id='ld';s.setAttribute('type','application/ld+json');document.head.appendChild(s)};s.textContent=JSON.stringify(ld)}else s?.remove()},[title,desc,ld])}
