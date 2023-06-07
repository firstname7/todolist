import { v1 } from 'uuid'
import { tasksReducer } from './tasksReducer';

let todolistID1 = v1()
let todolistID2 = v1()

let taskID1 = v1()
let taskID2 = v1()
let taskID3 = v1()
let taskID4 = v1()
let taskID5 = v1()
let taskID6 = v1()
let taskID7 = v1()

let startState: any

beforeEach(() => {
	startState = {
		[todolistID1]: [
			{ id: taskID1, title: 'HTML&CSS', isDone: true },
			{ id: taskID2, title: 'JS', isDone: true },
			{ id: taskID3, title: 'ReactJS', isDone: false },
			{ id: taskID4, title: 'WordPress', isDone: false }
		],
		[todolistID2]: [
			{ id: taskID5, title: 'Rest API', isDone: true },
			{ id: taskID6, title: 'GraphQL', isDone: false },
			{ id: taskID7, title: "Rest API 2", isDone: false },
		]
	}
})

test('Test remove task in first todolist', () => {
	const endState = tasksReducer(startState, {
		type: 'REMOVE-TASKS',
		payload: {
			todolistID: todolistID1,
			taskID: taskID3
		}
	})

	expect(endState[todolistID1][0].title).toBe('HTML&CSS')
	expect(endState[todolistID1][1].title).toBe('JS')
	expect(endState[todolistID1][2].title).toBe('WordPress')
	expect(endState[todolistID1].length).toBe(3)
})
// test('Test add task for first todolist', () => {
// 	const endState = tasksReducer(startState, {
// 		type: 'ADD-TASK',
// 		payload: {
// 			todolistID: todolistID1,
// 			title: 'Title new task'
// 		}
// 	})
// 	expect(endState[todolistID1][0].title).toBe('Title new task')
// 	expect(endState[todolistID1][4].title).toBe('WordPress')
// 	expect(endState[todolistID1].length).toBe(5)
// })
// test('Test add task for new todolist', () => {
// 	const endState = tasksReducer(startState, {
// 		type: 'ADD-TASK-TODOLIST',
// 		payload: {
// 			todolistID: 'new-todolist-ID'
// 		}
// 	})
// 	expect(endState['new-todolist-ID'].length).toBe(0)
// })
// test('Test change status task for first todolist', () => {
// 	const endState = tasksReducer(startState, {
// 		type: 'CHANGE-STATUS',
// 		payload: {
// 			todolistID: todolistID1,
// 			taskID: taskID3,
// 			checkedValue: true
// 		}
// 	})
// 	// expect(endState[todolistID1][2].isDone).toBe(true)
// 	expect(endState[todolistID1].length).toBe(4)
// })
test('Test update task title for first todolist', () => {
	const endState = tasksReducer(startState, {
		type: 'UPDATE-TASK',
		payload: {
			todolistID: todolistID1,
			taskID: taskID3,
			newTitle: 'New task title for first todolist'
		}
	})
	expect(endState[todolistID1][2].title).toBe('New task title for first todolist')
	expect(endState[todolistID1].length).toBe(4)
})
// test('Test delete task in todolist', () => {
// 	const endState = tasksReducer(startState, {
// 		type: 'DELETE-TASK-TODOLIST',
// 		payload: { todolistID: todolistID2 }
// 	})
// 	expect(endState[todolistID1].length).toBe(4)
// 	expect(endState[todolistID2]).toBe(undefined)
// })
