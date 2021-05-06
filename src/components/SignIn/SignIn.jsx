import './signIn.scss';
import InputField from "../InputField/InputField";
import { auth, signInWithGoogle } from "../../firebase/firebaseUtils";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/user.actions";
import { useDispatch } from "react-redux";

const SignIn = () => {
	const dispatch = useDispatch();
	const { register, handleSubmit, errors } = useForm({
		mode: "onTouched"
	})

	const onSubmit = data => {
		const { email, password } = data;
		dispatch(signInStart());
		auth.signInWithEmailAndPassword(email, password)
			.then(authUser => dispatch(signInSuccess(authUser)))
			.catch((error) => dispatch(signInFailure(error.message)))
	}

	return (
		<form className="SignIn__form" onSubmit={handleSubmit(onSubmit)}>
			<div className="SignIn__form--inputwrp">
				<InputField
					type="text"
					name="email"
					placeholder="E-mail"
					validationMessage="Please enter a valid email address."
					validation={register({
						required: true,
						pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
					})}
					errors={errors}
				/>
			</div>
			<div className="SignIn__form--inputwrp">
				<InputField
					type="password"
					name="password"
					placeholder="Password"
					validationMessage="The password should have a length between 6 and 30 characters."
					validation={register({
						required: true,
						minLength: 6,
						maxLength: 30,
					})}
					errors={errors}
				/>
			</div>
			<button
				type="submit"
				className="SignIn__form--button button__submit"
			>
				Sign in
			</button>
			<button
				type="button"
				className="SignIn__form--button button__google"
				onClick={signInWithGoogle}
			>
				<FcGoogle />
				Sign in with Google
			</button>
		</form>
	)
}

export default SignIn;