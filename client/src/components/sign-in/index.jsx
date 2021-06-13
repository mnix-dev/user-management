import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormInput from '../form-input/'
import CustomButton from '../custom-button/'

import {
    emailSignInStart,
    googleSignInStart,
    userIdSignInStart
} from '../../redux/user/actions'

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './styles'

const SignIn = ({ emailSignInStart, userIdSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({
        login: '',
        password: ''
    })

    const { password, login } = userCredentials

    const handleSubmit = async e => {
        e.preventDefault()
        if (login.includes('@')) return emailSignInStart(login, password)
        else return userIdSignInStart(login, password)
    }

    const handleChange = e => {
        const { value, name } = e.target
        setCredentials({ ...userCredentials, [name]: value })
    }
    return (
        <SignInContainer>
            <SignInTitle>I already have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
            <FormInput
                name='login'
                type='login'
                value={login}
                handleChange={handleChange}
                label='email or username'
                required
            />
            <FormInput
                name='password'
                type='password'
                value={password}
                handleChange={handleChange}
                label='password'
                required
            />
            <ButtonsBarContainer>
                <CustomButton type='submit'> Sign in </CustomButton>
                <CustomButton 
                    type='button'
                    onClick={googleSignInStart}
                    isGoogleSignIn
                >
                Sign in with Google
                </CustomButton>
            </ButtonsBarContainer>
            </form>
        </SignInContainer>
        )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (login, password) => dispatch(emailSignInStart({ email: login, password })),
    userIdSignInStart: (login, password) => dispatch(userIdSignInStart({ username: login, password }))
})
export default connect(
    null,
    mapDispatchToProps
)(SignIn)