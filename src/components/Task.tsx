import { ChangeEvent, memo, useCallback } from "react"
import { Button } from "./Button"
import { EditableSpan } from "./EditableSpan"
import { TaskStatuses } from "../api/api"

type TaskType = {
	id: string
	isDone: TaskStatuses
	title: string
	disabled: boolean
	removeTaskHandler: (taskID: string) => void
	onChangeCheckedHandler: (id: string, eventCurrentTarget: boolean) => void
	updateTask: (newTitle: string, taskID: string) => void
}

export const Task = memo((props: TaskType) => {

	const onClickHandler = useCallback(() => {
		props.removeTaskHandler(props.id)
	}, [])
	const updateTaskHandler = useCallback(() => {
		props.updateTask(props.title, props.id)
	}, [])
	const status = props.isDone === TaskStatuses.Completed
	return (
		<>
			<li key={props.id} className={status ? 'opacity' : ''} >
				<Button className={''} name={"x"} callBack={onClickHandler} />
				<input
					type="checkbox"
					checked={status}
					disabled={props.disabled}
					onChange={(e: ChangeEvent<HTMLInputElement>) => props.onChangeCheckedHandler(props.id, e.currentTarget.checked)} />
				<EditableSpan title={props.title} callBack={updateTaskHandler} />
			</li></>
	)
})