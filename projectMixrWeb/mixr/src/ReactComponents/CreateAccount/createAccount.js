//create account
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import style from './createAccount.module.css'
import { UploadClientRequested, VerifyClientRequested, clearErrors } from '../../reduxAuthentication/actions'
import { isValidPassword, isValidUsername, isValidEmail } from '../../utils/regexCommon'
import { BSON } from 'mongodb-stitch-browser-sdk'
import { useHistory } from 'react-router-dom'

const CreateAccount = (props) => {
    const [inputInfo, setInputInfo] = useState({
        Username: '',
        Password: '',
        Email: '',
        FirsName: '',
        LastName: ''
    })
    const [allowCreate, setAllowCreate] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [invalidFirstName, setInvalidFirstName] = useState(false)
    const [invalidLastName, setInvalidLastName] = useState(false)
    const [fieldsFilled, setFieldsFilled] = useState(false)
    const history = useHistory()

    const validInputHandler = (inputType) => {
        setAllowCreate(false)
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
        else if(inputType === 'Email'){
            if(inputInfo.Email === ''){
                setInvalidEmail(true)
            }
            else if(inputInfo.Email !== ''){
                if(!isValidEmail(inputInfo.Email)){
                    setInvalidEmail(true)
                }
                else {
                    if(invalidEmail){
                        setInvalidEmail(false)
                    }
                }
            }
        }
        else if(inputType === 'FirstName'){
            if(inputInfo.FirstName === ''){
                setInvalidFirstName(true)
            }
            else {
                setInvalidFirstName(false)
            }
        }
        else if(inputType === 'LastName'){
            if(inputInfo.LastName === ''){
                setInvalidLastName(true)
            }
            else {
                setInvalidLastName(false)
            }
        }
        else if(inputType === 'Submitted' && inputInfo.Username !== '' && inputInfo.Password !== ''){
            if(!allowCreate && !invalidLastName && !invalidFirstName && !invalidEmail && !invalidUsername && !invalidPassword){
                setAllowCreate(true)
            }
        }
    }

    useEffect(() => {
        if(allowCreate){
            if(fieldsFilled){
                if(!props.didSucceed){
                    props.verifyClient(inputInfo)
                }
                if(!props.didFetch._id){
                    if(!invalidLastName && !invalidFirstName && !invalidEmail && !invalidUsername && !invalidPassword){
                        props.createNewClient(inputInfo)
                    }
                }
            }
        }
    },[ inputInfo, invalidUsername, invalidPassword, invalidEmail, invalidFirstName, invalidLastName, allowCreate, props.didFetch ])

    useEffect(() => {
        if(props.insertToken?.insertedId){
            history.push('/LoginPage')
        }
    }, [ props.insertToken ])
    
    return(

        <div className={style.root}>
            <div className={style.borderBox}>
                <h1 className={style.loginTitle}>Welcome to Mixr</h1>
                <hr className={style.blueLine}/>
                <h3 className={style.passwordExplanation}>
                    To create an account, choose a username and password. Password must be at least 5 characters and include at least two numbers.
                    If you are rerouted to login, the create was successful. Please then proceed to login with your new username and password.
                </h3>
                <div className={style.inputContainer}>
                    <input className={style.inputBox1} type="text" placeholder="Email"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('Email'), setInputInfo({
                            ...inputInfo,
                            Email: event.target.value
                        }))}
                    />
                    { invalidEmail?
                        <p className={style.invalidTextEmail}>
                            Please enter a valid email.
                        </p>
                        :
                        null
                    }
                    <input className={style.inputBox1} type="text" placeholder="Username"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('Username'),setInputInfo({
                            ...inputInfo,
                            Username: event.target.value
                        }))}
                    />
                    { invalidUsername?
                        <p className={style.invalidTextUsername}>
                            Please enter a valid username containing no spaces.
                        </p>
                        :
                        null
                    }
                    <input className={style.inputBox1} type="password" placeholder="Password"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('Password'), setInputInfo({
                            ...inputInfo,
                            Password: event.target.value
                        }))}
                    />
                    { invalidPassword?
                        <p className={style.invalidTextPassword}>
                            Please enter a valid password.
                        </p>
                        :
                        null
                    }
                    <input className={style.inputBox1} type="text" placeholder="First Name"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('FirstName'), setInputInfo({
                            ...inputInfo,
                            FirstName: event.target.value
                        }))}
                    />
                    { invalidFirstName?
                        <p className={style.invalidTextFirstName}>
                            Please enter a first name.
                        </p>
                        :
                        null
                    }
                    <input className={style.inputBox1} type="text" placeholder="Last Name"
                        onChange={(event) => (setFieldsFilled(true), validInputHandler('LastName'), setInputInfo({
                            ...inputInfo,
                            LastName: event.target.value
                        }))}
                    />
                    { invalidLastName?
                        <p className={style.invalidTextLastName}>
                            Please enter a last name.
                        </p>
                        :
                        null
                    }
                </div>
                { fieldsFilled?
                    null
                    :
                    <p className={style.invalidTextFailedFetch}>
                        Please enter the above fields.
                    </p>
                }
                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => (setAllowCreate(true), validInputHandler('Submitted'))}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        didFetch: state.authentication.existingClient,
        didSucceed: state.authentication.loadingVerifyClient,
        insertToken: state.authentication.authorizedClient
    }; 
};

const mapDispatchToProps = (dispatch) => ({
    createNewClient: (clientToUpload) => {
        dispatch(UploadClientRequested(clientToUpload))
    },
    verifyClient: (inputInfo) => {
        dispatch(VerifyClientRequested(inputInfo))
    },
    clearLocalErrors: () => {
        dispatch(clearErrors())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);