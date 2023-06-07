import { RequestStatusType, setErrorAC, setStatusAC } from './../app/appReducer';
import { todolistAPI } from './../api/api';
import { GetTodolistType } from "../api/api"
import { FilterValueType } from "../components/Todolist"
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { TodolistsType } from '../Todolists/Todolists';

const initialState: Array<TodolistsType> = []

export const todolistsReducer = (state = initialState, action: AllType): Array<TodolistsType> => {
	switch (action.type) {
		case 'SET-TODOS': {
			return action.payload.todos.map(el => ({ ...el, filter: 'all', entityStatus: 'idle' }))
		}
		case 'ADD-TODOLIST': {
			return [{ ...action.payload.todo, filter: 'all', entityStatus: 'idle' }, ...state]
		}
		case 'REMOVE-TODOLIST': {
			return state.filter(el => el.id !== action.payload.todolistID)
		}
		case 'CHANGE-FILTER': {
			return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.filterValue } : el)
		}
		case 'UPDATE-TODOLIST': {
			return state.map(el => el.id === action.payload.todolistID ? { ...el, title: action.payload.newTitle } : el)
		}
		case 'CANGE-ENTITY-STATUS': {
			return state.map(el => el.id === action.payload.todolistID ? { ...el, entityStatus: action.payload.entityStatus } : el)
		}
		default: return state
	}

}


export const changeEntityStatusAC = (todolistID: string, entityStatus: RequestStatusType) =>
	({ type: 'CANGE-ENTITY-STATUS', payload: { todolistID, entityStatus } } as const)

export const addTodolistAC = (todo: GetTodolistType) =>
	({ type: 'ADD-TODOLIST', payload: { todo } } as const)

export const removeTodolistAC = (todolistID: string) =>
	({ type: 'REMOVE-TODOLIST', payload: { todolistID } } as const)

export const changeFilterAC = (todolistID: string, filterValue: FilterValueType) =>
	({ type: 'CHANGE-FILTER', payload: { todolistID, filterValue } } as const)

export const updateTodolistAC = (todolistID: string, newTitle: string) =>
	({ type: 'UPDATE-TODOLIST', payload: { todolistID, newTitle } } as const)

export const setTodolist = (todos: GetTodolistType[]) =>
	({ type: 'SET-TODOS', payload: { todos } } as const)


export const getTodosTC = () => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	todolistAPI.getTodolist()
		.then((res) => {
			dispatch(setTodolist(res.data))
			dispatch(setStatusAC('succeeded'))
		})
}
export const addTodosTC = (title: string) => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	todolistAPI.createTodolist(title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				const todo = res.data.data.item
				dispatch(addTodolistAC(todo))
				dispatch(setStatusAC('succeeded'))
			} else {
				handleServerAppError(dispatch, res.data.data)
			}
		}).catch((e) => handleServerNetworkError(dispatch, e.message))
}
export const removeTodoTC = (todolistID: string) => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	dispatch(changeEntityStatusAC(todolistID, 'loading'))
	todolistAPI.deleteTodolist(todolistID)
		.then((res) => {
			dispatch(removeTodolistAC(todolistID))
			dispatch(setStatusAC('succeeded'))
		})
		.catch((e) => {
			dispatch(setStatusAC('failed'))
			dispatch(changeEntityStatusAC(todolistID, 'failed'))
		})
}
export const updateTodoTC = (todolistID: string, title: string) => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	todolistAPI.updateTodolist(todolistID, title)
		.then((res) => {
			dispatch(updateTodolistAC(todolistID, title))
			dispatch(setStatusAC('succeeded'))
		}).catch((e) => handleServerNetworkError(dispatch, e.message))
}

export type AllType = addTodolistType
	| removeTodolistType
	| changeFilterType
	| updateTodolistType
	| setTodolistType
	| changeEntityStatusType

type addTodolistType = ReturnType<typeof addTodolistAC>
type removeTodolistType = ReturnType<typeof removeTodolistAC>
type changeFilterType = ReturnType<typeof changeFilterAC>
type updateTodolistType = ReturnType<typeof updateTodolistAC>
export type setTodolistType = ReturnType<typeof setTodolist>
export type changeEntityStatusType = ReturnType<typeof changeEntityStatusAC>