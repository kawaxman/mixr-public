import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import style from './login.module.css'
import { GetClientRequested, clearErrors } from '../../reduxAuthentication/actions'
import { isValidPassword, isValidUsername } from '../../utils/regexCommon'

//Need to use backend to actually log a user in and verify that user exists
//Need to use backend to actually create a new account for a user if they don't already exist
const Login = (props) => {
    const [login, setLogin] = useState(false)
    const [inputInfo, setInputInfo] = useState({
        Username: "",
        Password: "",
    })
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const [justCreated, setJustCreated] = useState(false)
    const history = useHistory()

    const validInputHandler = (inputType) => {
        if(inputType === 'Username'){
            if(inputInfo.Username === ''){
                setInvalidUsername(true)
            }
            else if(inputInfo.Username !== ''){
                if(!isValidUsername(inputInfo.Username)){
                    setInvalidUsername(true)
                }
                else {
                    if(invalidUsername){
                        setInvalidUsername(false)
                    }
                }
            }
        }
        else if(inputType === 'Password'){
            if(inputInfo.Password === ''){
                setInvalidPassword(true)
            }
            else if(inputInfo.Password !== ''){
                if(!isValidPassword(inputInfo.Password)){
                    setInvalidPassword(true)
                }
                else {
                    if(invalidPassword){
                        setInvalidPassword(false)
                    }
                }
            }
        }
        else if(inputType === 'Submitted' && inputInfo.Username !== '' && inputInfo.Password !== ''){
            if(!login && !invalidUsername && !invalidPassword){
                setLogin(true)
            }
        }
    }

    useEffect(() => {
        if(login){
            if(fieldsFilled){
                if(!invalidUsername && !invalidPassword){
                    props.fetchClient(inputInfo)
                }
                if(props.fetchedError.length > 0){
                    setLogin(false)
                }
            }
        }
    }, [ login, invalidUsername, invalidPassword, props.fetchedError ])

    return (
        <div className={style.root}>
            <div className={style.borderBox}>
                <h1 className={style.loginTitle}>Welcome to Mixr</h1>
                {/* <img
                    className={style.image}
                    src={'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/whiskeyv4-1547582476.jpg?crop=1xw:0.8880994671403197xh;center,top&resize=1200:*'}
                /> */}
                <hr className={style.blueLine}/>
                <div className={style.inputContainer}>
                    <input className={style.inputBox1} type="text" id="fname" name="fname" placeholder="Username"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('Username'), setInputInfo({
                            ...inputInfo,
                            Username: event.target.value
                        }))}
                    />
                    { invalidUsername?
                        <p className={style.invalidTextUsername}>
                            Please enter a valid and existing username.
                        </p>
                        :
                        null
                    }
                    <input className={style.inputBox1} type="password" id="lname" name="lname" placeholder="Password"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('Password'), setInputInfo({
                            ...inputInfo,
                            Password: event.target.value
                        }))}
                    />
                    { invalidPassword?
                        <p className={style.invalidTextPassword}>
                            Please enter a valid and existing password.
                        </p>
                        :
                        null
                    }
                </div>
                <div className={style.rememberMeContainer}>
                    <input className={style.inputBox2} type="checkbox" name="rememberMe" id="rememberMe"/>
                    <p className={style.rememberMe}>
                        Remember Me
                    </p>
                </div>
                { props.fetchedError.length === 0?
                    null
                    :
                    <p className={style.invalidTextFailedFetch}>
                        No client was found with the enter username and password. Please enter a valid username and password.
                    </p>
                }
                { fieldsFilled?
                    null
                    :
                    <p className={style.invalidTextFailedFetch}>
                        Please enter a valid username and password.
                    </p>
                }
                { justCreated?
                    <p className={style.alreadyCreatedAccount}>
                        Our systems say you've just created an account, please login with your new credentials.
                        Otherwise, contact our support line at MixrSupport.getmixr.com.
                    </p>
                    :
                    null
                }
                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => (props.clearLocalErrors(), setLogin(true), validInputHandler('Submitted'))}>
                        Log in
                    </button>
                    <button className={style.button} onClick={() => {
                            if(!props.insertToken?.insertedId){
                                history.push('/CreateProfilePage')
                            }
                            else {
                                setJustCreated(true)
                            }
                        }}
                    >
                        Create account
                    </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedClient: state.authentication.authorizedClient,
        fetchedError: state.authentication.errorFetch,
        insertToken: state.authentication.authorizedClient
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchClient: (inputInfo) => {
        dispatch(GetClientRequested(inputInfo))
    },
    clearLocalErrors: () => {
        dispatch(clearErrors())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)