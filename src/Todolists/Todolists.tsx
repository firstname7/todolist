import s from '../app/App.module.css';
import { useCallback, useEffect } from "react"
import { Input } from "../components/Input"
import { FilterValueType, Todolist } from "../components/Todolist"
import { useAppDispatch, useAppSelector } from "../state/store"
import { addTodosTC, changeFilterAC, getTodosTC, removeTodoTC, updateTodoTC } from "../state/todolistsReducer"
import { addTaskTC, removeTasksTC, updateTaskAC, updateTaskTC } from "../state/tasksReducer"
import { GetTaskType, GetTodolistType } from '../api/api';
import { RequestStatusType } from '../app/appReducer';
import { Navigate } from 'react-router-dom';

export const Todolists = () => {

	const todolists = useAppSelector<Array<TodolistsType>>(state => state.todolists)
	const tasks = useAppSelector<TasksTodolistsType>(state => state.tasks)
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	useEffect(() => {
		if (!isLoggedIn) return
		dispatch(getTodosTC())
	}, [])

	const dispatch = useAppDispatch()

	const addTodolist = useCallback((title: string) => {
		dispatch(addTodosTC(title))
	}, [dispatch])

	const removeTodolist = useCallback((todolistID: string) => {
		dispatch(removeTodoTC(todolistID))
	}, [dispatch])
	const changeFilter = useCallback((todolistID: string, filterValue: FilterValueType) => {
		dispatch(changeFilterAC(todolistID, filterValue))
	}, [dispatch])
	const updateTodolist = useCallback((todolistID: string, newTitle: string) => {
		dispatch(updateTodoTC(todolistID, newTitle))
	}, [dispatch])

	const removeTask = useCallback((todolistID: string, taskID: string) => {
		dispatch(removeTasksTC(todolistID, taskID))
	}, [dispatch])
	const addTask = useCallback((todolistID: string, title: string) => {
		dispatch(addTaskTC(todolistID, title))
	}, [dispatch])
	const changeStatus = useCallback((todolistID: string, taskID: string, checkedValue: boolean) => {
		let status = checkedValue ? 2 : 0
		dispatch(updateTaskTC(todolistID, taskID, status))
	}, [dispatch])
	const updateTask = useCallback((todolistID: string, taskID: string, newTitle: string) => {
		dispatch(updateTaskAC(todolistID, taskID, newTitle))
	}, [dispatch])

	if(!isLoggedIn) {
		return <Navigate to={'/login'} />
	}

	return (
		<>
			<Input callBack={addTodolist} />
			<div className={s.todocontent}>
				{todolists.map(todolist => {
					return (
						<Todolist
							key={todolist.id}
							todolistID={todolist.id}
							title={todolist.title}
							tasks={tasks[todolist.id]}
							removeTask={removeTask}
							removeTodolist={removeTodolist}
							changeFilter={changeFilter}
							addTask={addTask}
							updateTask={updateTask}
							updateTodolist={updateTodolist}
							changeStatus={changeStatus}
							filter={todolist.filter}
							entityStatus={todolist.entityStatus}
						/>
					)
				})}
			</div>
		</>
	)
}

export type TodolistsType = GetTodolistType & {
	filter: FilterValueType
	entityStatus: RequestStatusType
}

export type TasksTodolistsType = {
	[key: string]: Array<GetTaskType>
}