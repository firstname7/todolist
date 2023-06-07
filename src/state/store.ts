import { combineReducers, legacy_createStore, applyMiddleware, AnyAction } from 'redux'
import { tasksReducer } from './tasksReducer'
import { todolistsReducer } from './todolistsReducer'
import thunk, {ThunkDispatch} from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from '../app/appReducer'
import { authReducer } from '../Login/auth-reducer'
// import { combineReducers, createStore } from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReducer,
	auth: authReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk)) 
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store