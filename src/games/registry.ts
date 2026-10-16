import {lazy,type ComponentType,type LazyExoticComponent} from 'react'
import type {GameProps} from './types'
export type Cat='arcade'|'puzzle'|'brain'|'reaction'|'strategy'|'words'|'trivia'|'casual'
export const CATS:Cat[]=['arcade','puzzle','brain','reaction','strategy','words','trivia','casual']
export interface GameDef{id:string;cat:Cat;emoji:string;grad:string;lowerBetter?:boolean;unit?:string;Comp:LazyExoticComponent<ComponentType<GameProps>>}
/** Add a game: create src/games/X.tsx, add i18n keys (g.<id>.name/desc/how), then add one line here. */
export const GAMES:GameDef[]=[
{id:'snake',cat:'arcade',emoji:'🐍',grad:'from-emerald-500 to-cyan-500',Comp:lazy(()=>import('./Snake'))},
{id:'2048',cat:'puzzle',emoji:'🔢',grad:'from-amber-500 to-pink-500',Comp:lazy(()=>import('./Game2048'))},
{id:'tictactoe',cat:'strategy',emoji:'❌',grad:'from-violet-600 to-blue-500',Comp:lazy(()=>import('./TicTacToe'))},
{id:'memory',cat:'brain',emoji:'🃏',grad:'from-pink-500 to-violet-600',lowerBetter:true,Comp:lazy(()=>import('./Memory'))},
{id:'reaction',cat:'reaction',emoji:'⚡',grad:'from-cyan-400 to-blue-600',lowerBetter:true,unit:'ms',Comp:lazy(()=>import('./Reaction'))}]
