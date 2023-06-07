import { setErrorAC, setStatusAC } from "../app/appReducer"


export const handleServerAppError = (dispatch: any, data: any) => {
	if(data.messages.length) {
		dispatch(setStatusAC('failed'))
		dispatch(setErrorAC(data.messages[0]))
	} else {
		dispatch(setErrorAC('Some error'))
	}
}

export const handleServerNetworkError = (dispatch: any, e: any) => {
	dispatch(setStatusAC('failed'))
	dispatch(setErrorAC(e.message))
}