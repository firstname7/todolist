import { handleServerAppError, handleServerNetworkError } from './../utils/error-utils';
import { authAPI } from './../api/api';
import { setErrorACType, setStatusAC, setStatusACType } from '../app/appReducer'
import { LoginType } from '../api/api'

const initialState = {
	isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return { ...state, isLoggedIn: action.value }
		default:
			return state
	}
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
	({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const loginTC = (data: LoginType) => async (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	console.log(data)
	try {
		const res = await authAPI.login(data)
		console.log(res)
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true))
			dispatch(setStatusAC('succeeded'))
		} else {
			handleServerAppError(dispatch, res.data)
		}
	} catch (e) {
		handleServerNetworkError(dispatch, e)
	}

}

export const meTC = () => async (dispatch: any) => {
	dispatch(setStatusAC('loading'))
	try {
		const res = await authAPI.me()
		console.log(res)
		if (res.data.resultCode === 0) {
			dispatch(setIsLoggedInAC(true))
			dispatch(setStatusAC('succeeded'))
		} else {
			handleServerAppError(dispatch, res.data)
		}
	} catch (e) {
		handleServerNetworkError(dispatch, e)
	}

}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | setStatusACType | setErrorACType
