import {Suspense,lazy} from 'react'
import {Route,Routes} from 'react-router-dom'
import Layout from './components/Layout'
import Pages from './pages/Pages'
const GamePage=lazy(()=>import('./pages/GamePage'))
export default function App(){return <Suspense fallback={<p className="p-8 text-center">…</p>}><Routes><Route element={<Layout/>}>
 <Route index element={<Pages.Home/>}/><Route path="games" element={<Pages.Games/>}/><Route path="games/:id" element={<GamePage/>}/>
 <Route path="favorites" element={<Pages.Favs/>}/><Route path="daily" element={<Pages.Daily/>}/><Route path="stats" element={<Pages.Stats/>}/>
 {(['about','contact','privacy','terms'] as const).map(k=><Route key={k} path={k} element={<Pages.Static k={k}/>}/>)}
 <Route path="*" element={<Pages.NotFound/>}/></Route></Routes></Suspense>}
