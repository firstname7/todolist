import { memo } from "react"

type PropsType = {
	name: string
	className: string
	disabled?: boolean
	callBack: () => void
}

export const Button = memo((props: PropsType) => {
	const onClickHandler = () => {
		props.callBack()
	}
	return (
		<button
			disabled={props.disabled}
			className={props.className}
			onClick={onClickHandler}>{props.name}</button>
	)
})