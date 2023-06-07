import './App.css';
import { useEffect } from "react"
import s from './App.module.css';
import { useAppDispatch, useAppSelector } from '../state/store';
import { Preloader } from '../components/Preloader';
import { ErrorType, RequestStatusType } from './appReducer';
import { ErrorInfo } from '../components/ErrorsInfo';
import { Route, Routes } from 'react-router-dom'
import { Login } from '../Login/Login';
import { Todolists } from '../Todolists/Todolists';
import { NavLink } from 'react-router-dom'
import { meTC } from '../Login/auth-reducer';

function App() {

	const dispatch = useAppDispatch()
	const status = useAppSelector<RequestStatusType>(state => state.app.status)
	const error = useAppSelector<ErrorType>(state => state.app.error)

	useEffect(() => {
		dispatch(meTC())
	}, [])

	return (
		<div className="App">
			<div className={s.appBar}>
				<div className={s.menuBox}>
					<NavLink to={'/'} > {'Главная'} </NavLink>
					<NavLink to={'/login'} > {'Вход'} </NavLink>
				</div>
				{status === 'loading' && <Preloader />}
			</div>
			<div className={s.content}>
				<Routes>
					<Route path={'/'} element={<Todolists />} />
					<Route path={'/login'} element={<Login />} />
					<Route path={'*'} element={<h1>404 Страница не найдена</h1>} />
				</Routes>
			</div>
			{error !== null && <ErrorInfo />}
		</div>
	);
}

export default App;
