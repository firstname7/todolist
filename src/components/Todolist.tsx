import { memo, useCallback, useState, useEffect } from "react"
import { Button } from "./Button"
import { Input } from "./Input"
import { EditableSpan } from "./EditableSpan"
import { Task } from "./Task"
import { useAppDispatch } from "../state/store"
import { getTasksTC } from "../state/tasksReducer"
import { GetTaskType, TaskStatuses } from "../api/api"
import s from "./Todolist.module.css"
import { RequestStatusType } from "../app/appReducer"

export type TitleTodolistType = {
	title: string
	todolistID: string
	filter: FilterValueType
	tasks: Array<GetTaskType>
	removeTask: (todolistID: string, taskID: string) => void
	removeTodolist: (todolistID: string) => void
	changeFilter: (id: string, filterValue: FilterValueType) => void
	addTask: (todolistID: string, title: string) => void
	changeStatus: (todolistID: string, newId: string, checkedValue: boolean) => void
	updateTask: (todolistID: string, taskID: string, newTitle: string) => void
	updateTodolist: (todolistID: string, newTitle: string) => void
	entityStatus: RequestStatusType
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

export const Todolist = memo((props: TitleTodolistType) => {

	const dispatch = useAppDispatch()

	useEffect(()=> {
		dispatch(getTasksTC(props.todolistID))
	}, [])

	let [btnActive, setBtnActive] = useState<FilterValueType>('all')

	const removeTaskHandler = useCallback((taskID: string) => {
		props.removeTask(props.todolistID, taskID)
	}, [])
	const onChangeCheckedHandler = useCallback((id: string, eventCurrentTarget: boolean) => {
		props.changeStatus(props.todolistID, id, eventCurrentTarget)
	}, [])
	const updateTask = useCallback((newTitle: string, taskID: string) => {
		props.updateTask(props.todolistID, taskID, newTitle)
	}, [])
	const removeTodolistHandler = useCallback(() => {
		props.removeTodolist(props.todolistID)
	}, [])
	const addTaskHandler = useCallback((newTitle: string) => {
		props.addTask(props.todolistID, newTitle)
	}, [])
	const updateTodolistHandler = useCallback((newTitle: string) => {
		props.updateTodolist(props.todolistID, newTitle)
	}, [])

	let filteredTasks = props.tasks

	if (props.filter === 'active') {
		filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.New)
	}
	if (props.filter === 'completed') {
		filteredTasks = props.tasks.filter(el => el.status === TaskStatuses.Completed)
	}

	const changeFilterHandler = useCallback((filterValue: FilterValueType) => {
		props.changeFilter(props.todolistID, filterValue)
	}, [])


	return (
		<div className={s.container}>
			<h3>
				<EditableSpan title={props.title} callBack={updateTodolistHandler} />
				<Button className={''} name={"x"} callBack={removeTodolistHandler} disabled={props.entityStatus === 'loading'} />
			</h3>

			<Input callBack={addTaskHandler} disabled={props.entityStatus === 'loading'} />
			<ul>
				{
					filteredTasks?.map((task) => {

						return (
							<Task
								key={task.id}
								isDone={task.status}
								title={task.title}
								id={task.id}
								removeTaskHandler={removeTaskHandler}
								onChangeCheckedHandler={onChangeCheckedHandler}
								updateTask={updateTask}
								disabled={props.entityStatus === 'loading'}
							/>
						)
					})
				}
			</ul>
			<div>
				<Button
					className={btnActive === 'all' ? 'btn-active' : ''}
					name={"all"}
					callBack={() => changeFilterHandler('all')} />
				<Button
					className={btnActive === 'active' ? 'btn-active' : ''}
					name={"active"}
					callBack={() => changeFilterHandler('active')} />
				<Button
					className={btnActive === 'completed' ? 'btn-active' : ''}
					name={"completed"}
					callBack={() => changeFilterHandler('completed')} />
			</div>
		</div>
	)
})