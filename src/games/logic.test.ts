import {describe,expect,it} from 'vitest'
import {addTile,canMove,move,slideRow} from './g2048logic'
import {bestMove,winner,type Cell} from './tttlogic'
import {dailyIndex,nextStreak,shuffle,yesterday} from '../lib/date'
describe('2048',()=>{
 it('merges once per pair',()=>expect(slideRow([2,2,2,2])).toEqual({row:[4,4,0,0],gained:8}))
 it('slides left and right',()=>{expect(move([[0,2,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0]],'left').board[0]).toEqual([4,0,0,0]);expect(move([[2,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],'right').board[0]).toEqual([0,0,0,4])})
 it('moves up and down',()=>{const b=[[2,0,0,0],[2,0,0,0],[0,0,0,0],[0,0,0,0]];expect(move(b,'up').board[0][0]).toBe(4);expect(move(b,'down').board[3][0]).toBe(4)})
 it('detects stuck boards',()=>expect(canMove([[2,4,2,4],[4,2,4,2],[2,4,2,4],[4,2,4,2]])).toBe(false))
 it('adds one tile',()=>expect(addTile([[0,2],[2,2]]).flat().filter(Boolean).length).toBe(4))})
describe('tic tac toe',()=>{
 it('finds winner',()=>expect(winner(['X','X','X',null,null,null,null,null,null])).toBe('X'))
 it('AI blocks and wins',()=>{const e=null;expect(bestMove(['X','X',e,e,'O',e,e,e,e] as Cell[])).toBe(2);expect(bestMove(['O','O',e,'X','X',e,e,e,e] as Cell[])).toBe(2)})})
describe('utils',()=>{
 it('daily pick is deterministic',()=>expect(dailyIndex('2026-10-16',5)).toBe(dailyIndex('2026-10-16',5)))
 it('streak rules',()=>{const s={last:'2026-10-15',count:2,best:2};expect(nextStreak(s,'2026-10-16').count).toBe(3);expect(nextStreak(s,'2026-10-18').count).toBe(1);expect(yesterday('2026-03-01')).toBe('2026-02-28')})
 it('shuffle keeps items',()=>expect(shuffle([1,2,3,4]).sort()).toEqual([1,2,3,4]))})
