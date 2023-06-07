import { ErrorType, setErrorAC, setStatusAC } from "../app/appReducer"
import { useAppDispatch, useAppSelector } from "../state/store"

export const ErrorInfo = () => {

	const dispatch = useAppDispatch()
	const error = useAppSelector<ErrorType>(state => state.app.error)

	const closeHandler = () => {
		dispatch(setErrorAC(null))
		dispatch(setStatusAC('failed'))
	}

	return (
		<div>
			<div
				style={{
					position: 'fixed',
					left: '50px',
					bottom: '50px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					background: 'red',
					padding: '20px 30px',
					borderRadius: '5px',
					color: '#ffffff'
				}}>
				<span>{error}</span>
				<span style={{
					marginLeft: '20px',
					fontSize: '30px',
					cursor: 'pointer'
				}} onClick={closeHandler}>x</span>
			</div>
		</div>
	)
}