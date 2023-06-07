import { AppRootStateType } from './store';
import { setTodolistType } from "./todolistsReducer"
import { GetTaskType, todolistAPI, TaskStatuses, UpdateTaskModelType } from "../api/api"
import { setErrorAC, setStatusAC } from '../app/appReducer';
import { handleServerAppError, handleServerNetworkError } from '../utils/error-utils';
import { TasksTodolistsType } from '../Todolists/Todolists';

const initialState: TasksTodolistsType = {}

export const tasksReducer = (state = initialState, action: allType): TasksTodolistsType => {
	switch (action.type) {
		case 'SET-TASKS': {
			return {
				...state,
				[action.payload.todolistID]: action.payload.tasks
			}
		}
		case 'SET-TODOS': {
			const copyState = { ...state }
			action.payload.todos.forEach((tl) => {
				copyState[tl.id] = []
			})
			return copyState
		}
		case 'REMOVE-TASKS': {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID) }
		}
		case 'ADD-TASK': {
			return {
				...state,
				[action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
			}
		}
		case 'CHANGE-STATUS': {
			return {
				...state,
				[action.payload.todolistID]: state[action.payload.todolistID]
					.map(task => task.id === action.payload.taskID
						? { ...task, status: action.payload.checkedValue }
						: task
					)
			}
		}
		case 'UPDATE-TASK': {
			return {
				...state, [action.payload.todolistID]: state[action.payload.todolistID]
					.map(el => el.id === action.payload.taskID
						? { ...el, title: action.payload.newTitle }
						: el
					)
			}
		}
		default: return state
	}
}

export const removeTaskAC = (todolistID: string, taskID: string) =>
	({ type: 'REMOVE-TASKS', payload: { todolistID, taskID } } as const)

export const addTaskAC = (task: GetTaskType) =>
	({ type: 'ADD-TASK', payload: { task } } as const)

export const changeStatusAC = (todolistID: string, taskID: string, checkedValue: TaskStatuses) =>
	({ type: 'CHANGE-STATUS', payload: { todolistID, taskID, checkedValue } } as const)

export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) =>
	({ type: 'UPDATE-TASK', payload: { todolistID, taskID, newTitle } } as const)

export const setTasksAC = (tasks: GetTaskType[], todolistID: string) =>
	({ type: 'SET-TASKS', payload: { tasks, todolistID } } as const)


export const getTasksTC = (todolistID: string) => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	todolistAPI.getTasks(todolistID)
		.then((res) => {
			dispatch(setTasksAC(res.data.items, todolistID))
			dispatch(setStatusAC('succeeded'))
		})
		.catch((e) => {
			handleServerNetworkError(dispatch, e.message)
		}) 
}

export const removeTasksTC = (todolistID: string, taskId: string) => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	todolistAPI.deleteTask(todolistID, taskId)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(removeTaskAC(todolistID, taskId))
				dispatch(setStatusAC('succeeded'))
			} else {
				if(res.data.messages.length) {
					dispatch(setErrorAC(res.data.messages[0]))
				} else {
					dispatch(setErrorAC('Some error'))
				}
				dispatch(setStatusAC('failed'))
			}
		})
		.catch((e) => {
			handleServerNetworkError(dispatch, e.message)
		})
}

export const addTaskTC = (todolistID: string, title: string) => (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	todolistAPI.createTask(todolistID, title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				const item = res.data.data.item
				dispatch(addTaskAC(item))
				dispatch(setStatusAC('succeeded'))
			} else {
				handleServerAppError(dispatch, res.data.data)
			}
		}).catch((e) => handleServerNetworkError(dispatch, e.message))
}

export const updateTaskTC = (todolistID: string, taskId: string, status: TaskStatuses) => (dispatch: any, getState: () => AppRootStateType) => {
	dispatch(setStatusAC('loading'))
	const tasks = getState().tasks
	const task = tasks[todolistID].find((t: any) => t.id === taskId)
	if (task) {
		const model: UpdateTaskModelType = {
			title: task.title,
			description: task.description,
			status,
			priority: task.priority,
			startDate: task.startDate,
			deadline: task.deadline
		}

		todolistAPI.updateTask(todolistID, taskId, model)
			.then((res) => {
				dispatch(changeStatusAC(todolistID, taskId, status))
				dispatch(setStatusAC('succeeded'))
			})
			.catch((e) => {
				handleServerNetworkError(dispatch, e.message)
			})
	}

}

type allType = removeTaskType
	| addTaskType
	| changeStatusType
	| updateTaskType
	| setTodolistType
	| setTasksType

type removeTaskType = ReturnType<typeof removeTaskAC>
type addTaskType = ReturnType<typeof addTaskAC>
type changeStatusType = ReturnType<typeof changeStatusAC>
type updateTaskType = ReturnType<typeof updateTaskAC>
type setTasksType = ReturnType<typeof setTasksAC>