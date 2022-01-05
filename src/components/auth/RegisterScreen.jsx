import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom' 
import validator from 'validator';
import { startLoginWithForm } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {

    const { msgError } = useSelector(state => state.ui)
    console.log(msgError);

    const dispatch = useDispatch()

    const [ formValues, handleInputChange ] = useForm({

        name: 'Hernando',
        email: 'alvarez250@gmail.com',
        password: '123456',
        password2: '123456'
    })

    const { 
    name,
    email,
    password,
    password2 } = formValues

    const handleRegister = (e) => {

        e.preventDefault()

        if ( isFormValid() ) {
            
            dispatch( startLoginWithForm( email, password, name ) )
        }

    }

    const isFormValid = () => {

        if (name.trim().length === 0 ) {
            dispatch(setError('nombre requerido'));
            return false;
        }else if ( !validator.isEmail( email ) ) {
            dispatch(setError('email no valido'));
            return false
        } else if ( password !== password2 || password.length < 5 ) { 
            dispatch(setError('las contraseñas deben de ser de 6 caracteres'));
            return false
        }

        dispatch( removeError() )

        return true
    
    }

    


    return (
        <>
            <h3 className="auth__title">Register </h3>

            <form
            onSubmit={ handleRegister }
            >

                {
                    msgError && 
                    <div className="auth__alert-error">
                        {msgError}
                    </div>


                }

                <input 
                onChange={ handleInputChange }
                type="text"
                placeholder="Name"
                name="name"
                autoComplete="off"
                className="auth__input" 
                value={ name } />

                <input 
                onChange={ handleInputChange }
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                className="auth__input" 
                value={ email } />

                <input 
                onChange={ handleInputChange }
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                className="auth__input" 
                value={ password } />

                <input 
                onChange={ handleInputChange }
                type="password"
                placeholder="Confirm Password"
                name="password2"
                autoComplete="off"
                className="auth__input" 
                value={ password2 } />


                <button 
                type="submit"
                className="btn btn-primary btn-block mb-5"
                >
                    Register 
                </button>

                <Link
                to='/auth/login' 
                className="link">
                    Already registered?
                </Link>

            </form>
        
        </>
    )
}
