import { v1 } from 'uuid'
import { todolistsReducer } from './todolistsReducer'
import { TodolistsType } from '../Todolists/Todolists'

let todolistID1 = v1()
let todolistID2 = v1()

let startState: TodolistsType[]

// beforeEach(() => {
// 	startState = [
// 		{ id: todolistID1, title: 'What to learn', filter: 'all' },
// 		{ id: todolistID2, title: 'What to buy', filter: 'all' },
// 	]
// })

// test('Test add todolist', () => {
// 	const endState = todolistsReducer(startState, {
// 		type: 'ADD-TODOLIST',
// 		payload: {
// 			todolistID: '1',
// 			title: 'New Title'
// 		}
// 	})

// 	expect(endState[0].title).toBe('New Title')
// 	expect(endState[2].title).toBe('What to buy')
// 	expect(endState.length).toBe(3)
// })

test('Test remove todolist', () => {
	const endState = todolistsReducer(startState, {
		type: 'REMOVE-TODOLIST',
		payload: {
			todolistID: todolistID1
		}
	})

	expect(endState[0].title).toBe('What to buy')
	expect(endState.length).toBe(1)
})

test('Test change filter', () => {
	const endState = todolistsReducer(startState, {
		type: 'CHANGE-FILTER',
		payload: {
			todolistID: todolistID1,
			filterValue: 'active',
		}
	})

	expect(endState[0].title).toBe('What to learn')
	expect(endState[0].filter).toBe('active')
	expect(endState.length).toBe(2)
})

test('Test update todolist', () => {
	const endState = todolistsReducer(startState, {
		type: 'UPDATE-TODOLIST',
		payload: {
			todolistID: todolistID1,
			newTitle: 'New title todolist',
		}
	})

	expect(endState[0].title).toBe('New title todolist')
	expect(endState.length).toBe(2)
})