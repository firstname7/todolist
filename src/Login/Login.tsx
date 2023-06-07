import { useFormik } from "formik"
import { Button } from "../components/Button"
import s from "./Login.module.css"
import { useAppDispatch, useAppSelector } from "../state/store"
import { loginTC } from "./auth-reducer"
import { Navigate } from "react-router-dom"

type FormikErrorType = {
	email?: string
	password?: string
}

export const Login = () => {

	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		validate: (values) => {

			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required';
			} else if (values.password.length < 4) {
				errors.password = 'От 4 символов';
			}

			return errors;
		},
		onSubmit: values => {
			dispatch(loginTC(values))
			formik.resetForm()
		}
	})

	let keys = Object.keys(formik.errors)


	if(isLoggedIn) {
		return <Navigate to={'/'} />
	}

	return (
		<div>
			<p>Чтобы войти в систему, пройдите регистрацию
				<a href={'https://social-network.samuraijs.com/'}
					target={'_blank'}> здесь
				</a>
			</p>
			<p>or use common test account credentials:</p>
			<p>Email: free@samuraijs.com</p>
			<p>Password: free</p>
			<form className={s.formBox} action="" onSubmit={formik.handleSubmit}>
				<input
					type="text"
					{...formik.getFieldProps('email')}
				/>
				{formik.touched.email && formik.errors.email && <span style={{ color: 'red' }}>{formik.errors.email}</span>}
				<input
					type="password"
					{...formik.getFieldProps('password')}
				/>
				{formik.touched.password && formik.errors.password && <span style={{ color: 'red' }}>{formik.errors.password}</span>}
				<input
					type="checkbox"
					checked={formik.values.rememberMe}
					{...formik.getFieldProps('rememberMe')}
				/>
				<button disabled={!!keys.length} >send</button>
			</form>
		</div>

	)
}