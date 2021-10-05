import React, { useState, useEffect } from 'react'
import style from './profilePage.module.css'

import icon from '../../assets/images/TESTicon.png'
import { connect } from 'react-redux'

import { isValidPassword, isValidUsername, isValidEmail } from '../../utils/regexCommon'
import { uploadNewProfileDataRequested } from '../../reduxUpdateProfile/actions'
import { GetClientRequested } from '../../reduxAuthentication/actions'

const ProfilePage = (props) => {
    const [newProfile, setNewProfile] = useState({
        field: '',
        newInfo: '',
        userId: ''
    })
    const [isInvalid, setIsInvalid] = useState(false)
    const [firstName, setFirstName] = useState(false)
    const [lastName, setLastName] = useState(false)
    const [email, setEmail] = useState(false)
    const [username, setUsername] = useState(false)
    const [password, setPassword] = useState(false)
    const [didUpload, setDidUpload] = useState(false)

    const submitHandler = () => {
        if(newProfile.field === 'email') {
            if(newProfile.newInfo === '' || !isValidEmail(newProfile.newInfo)){
                if(!isInvalid) {
                    setIsInvalid(true)
                } 
            }
            else if(newProfile.newInfo !== '' && isValidEmail(newProfile.newInfo)){
                if(isInvalid) {
                    setIsInvalid(false)
                }
                props.uploadNewData(newProfile)
                setDidUpload(true)
                setEmail(false)
            }
        }
        else if(newProfile.field === 'firstName') {
            if(newProfile.newInfo === '' || !isValidUsername(newProfile.newInfo)){
                if(!isInvalid) {
                    setIsInvalid(true)
                }
            }
            else if(newProfile.newInfo !== '' && isValidUsername(newProfile.newInfo)){
                if(isInvalid) {
                    setIsInvalid(false)
                } 
                props.uploadNewData(newProfile)
                setDidUpload(true)
                setFirstName(false)
            }
        }
        else if(newProfile.field === 'lastName') {
            if(newProfile.newInfo === '' || !isValidUsername(newProfile.newInfo)){
                if(!isInvalid) {
                    setIsInvalid(true)
                }
            }
            else if(newProfile.newInfo !== '' && isValidUsername(newProfile.newInfo)){
                if(isInvalid) {
                    setIsInvalid(false)
                } 
                props.uploadNewData(newProfile)
                setDidUpload(true)
                setLastName(false)
            }
        }
        else if(newProfile.field === 'userName') {
            if(newProfile.newInfo === '' || !isValidUsername(newProfile.newInfo)){
                if(!isInvalid) {
                    setIsInvalid(true)
                }
            }
            else if(newProfile.newInfo !== '' && isValidUsername(newProfile.newInfo)){
                if(isInvalid) {
                    setIsInvalid(false)
                } 
                props.uploadNewData(newProfile)
                setDidUpload(true)
            }
        }
        else if(newProfile.field === 'password') {
            if(newProfile.newInfo === '' || !isValidPassword(newProfile.newInfo)){
                if(!isInvalid) {
                    setIsInvalid(true)
                }
            }
            else if(newProfile.newInfo !== '' && isValidPassword(newProfile.newInfo)){
                if(isInvalid) {
                    setIsInvalid(false)
                }
                props.uploadNewData(newProfile)
                setDidUpload(true)
            }
        }
    }

    useEffect(() => {
        if(didUpload) {
            if(password){
                var clientInfo = {
                    Username: props.loggedUser.userName,
                    Password: newProfile.newInfo
                }
            }
            else if(username){
                var clientInfo = {
                    Username: newProfile.newInfo,
                    Password: props.loggedUser.password
                }
            }
            else {
                var clientInfo = {
                    Username: props.loggedUser.userName,
                    Password: props.loggedUser.password
                }
            }
            if(clientInfo.Username && clientInfo.Password){
                setDidUpload(false)
                setTimeout(() => {
                    props.refetchClient(clientInfo)
                }, [ 2000 ]) 
            }
        }
    }, [ props.didUpdate, didUpload, password, username ])

    return (
        <div className={style.root}>
            <div className={style.borderBox}>
                <div className={style.userNameAndPPColumn}>
                    <h1 className={style.loginTitle}>{props.loggedUser.userName}</h1> 
                    <hr className={style.blueLine}/>
                    <br/>
                    <img
                        className={style.profileIcon}
                        src={props.loggedUser.profilePicture? props.loggedUser.profilePicture : icon}
                    />
                    <h3 className={style.submitButtonText}>
                        Select the button below to submit your update.
                    </h3>
                    <button className={style.updateInfoButton}
                        onClick={() => {
                            submitHandler()
                        }}
                    >
                        Submit Update Info
                    </button>
                </div>     
                <div className={style.userInfoColumn}>
                    <div className={style.userInfoRow}>
                        <h2 className={style.regInline}>Email: {props.loggedUser.email}</h2>
                    </div>
                    <br/>
                    <div className={style.userInfoRow}>
                        <h2 className={style.regInline}>First Name: {props.loggedUser.firstName}</h2>
                    </div>
                    <br/>
                    <div className={style.userInfoRow}>
                        <h2 className={style.regInline}>Last Name: {props.loggedUser.lastName}</h2>
                    </div>
                    <div className={style.editContainer}>
                        <h3 className={style.editTitleText}>
                            Edit profile information:
                        </h3>
                        <div className={style.alignButtons}>
                            { isInvalid?
                                <>
                                    <p className={style.invalidInputText}>
                                        Please fill in the field with valid information.
                                    </p>
                                    <p className={style.invalidInputText}>
                                        Password: Two numbers, one uppercase and one lower case character.
                                    </p>
                                    <p className={style.invalidInputText}>
                                        All Other Fields: Actually enter information please.
                                    </p>
                                </>
                                :
                                null
                            }
                            <div className={style.buttonAndInputContainer}>
                                { (password || username || firstName || lastName)?
                                    null
                                    :
                                    <button
                                        className={style.editButtonEmail}
                                        onClick={() => {
                                            setEmail(true)
                                            setNewProfile({
                                                ...newProfile,
                                                field: 'email',
                                                userId: props.loggedUserId
                                            })
                                        }}
                                    >
                                        Edit Email Address
                                    </button>
                                }
                                { (!password && !username && email && !firstName && !lastName)?
                                    <input className={style.inputBox1} placeholder="Enter New Email"
                                        onChange={(event) => setNewProfile({
                                            ...newProfile,
                                            newInfo: event.target.value,
                                        })}
                                    />
                                    :
                                    null
                                }
                            </div>
                            <div className={style.buttonAndInputContainer}>
                                { (password || username || email || lastName)?
                                    null
                                    :
                                    <button
                                        className={style.editButtonFirst}
                                        onClick={() => {
                                            setFirstName(true)
                                            setNewProfile({
                                                ...newProfile,
                                                field: 'firstName',
                                                userId: props.loggedUserId
                                            })
                                        }}
                                    >
                                        Edit First Name
                                    </button>
                                }
                                { (!password && !username && !email && firstName && !lastName)?
                                    <input className={style.inputBox1} placeholder="Enter New First Name"
                                        onChange={(event) => setNewProfile({
                                            ...newProfile,
                                            field: 'firstName',
                                            newInfo: event.target.value,
                                        })}
                                    />
                                    :
                                    null
                                }
                            </div>
                            <div className={style.buttonAndInputContainer}>
                                { (password || username || email || firstName)?
                                    null
                                    :
                                    <button
                                    className={style.editButtonLast}
                                    onClick={() => {
                                        setLastName(true)
                                        setNewProfile({
                                            ...newProfile,
                                            field: 'lastName',
                                            userId: props.loggedUserId
                                        })
                                    }}
                                    >
                                        Edit Last Name
                                    </button>
                                }
                                { (!password && !username && !email && !firstName && lastName)?
                                    <input className={style.inputBox1} placeholder="Enter New Last Name"
                                        onChange={(event) => setNewProfile({
                                            ...newProfile,
                                            field: 'lastName',
                                            newInfo: event.target.value,
                                        })}
                                    />
                                    :
                                    null
                                }
                            </div>
                            <div className={style.buttonAndInputContainer}>
                                { (password || email || lastName || firstName)?
                                    null
                                    :
                                    <button
                                    className={style.editButtonLast}
                                    onClick={() => {
                                        setUsername(true)
                                        setNewProfile({
                                            ...newProfile,
                                            field: 'userName',
                                            userId: props.loggedUserId
                                        })
                                    }}
                                    >
                                        Edit Username
                                    </button>
                                }
                                { (!password && username && !email && !firstName && !lastName)?
                                    <input className={style.inputBox1} placeholder="Enter New Username"
                                        onChange={(event) => setNewProfile({
                                            ...newProfile,
                                            field: 'userName',
                                            newInfo: event.target.value,
                                        })}
                                    />
                                    :
                                    null
                                }
                            </div>
                            <div className={style.buttonAndInputContainer}>
                                { (username || email || lastName || firstName)?
                                    null
                                    :
                                    <button
                                    className={style.editButtonLast}
                                    onClick={() => {
                                        setPassword(true)
                                        setNewProfile({
                                            ...newProfile,
                                            field: 'password',
                                            userId: props.loggedUserId
                                        })
                                    }}
                                    >
                                        Edit Password
                                    </button>
                                }
                                { (password && !username && !email && !firstName && !lastName)?
                                    <input className={style.inputBox1} type="password" placeholder="Enter New Password"
                                        onChange={(event) => setNewProfile({
                                            ...newProfile,
                                            field: 'password',
                                            newInfo: event.target.value,
                                        })}
                                    />
                                    :
                                    null
                                }
                            </div>
                            { password || username || email || firstName || lastName?
                                <button className={style.cancelButton}
                                    onClick={() => {
                                        if(password){
                                            setPassword(false)
                                        }
                                        else if(username){
                                            setUsername(false)
                                        }  
                                        else if(email){
                                            setEmail(false)
                                        }  
                                        else if(firstName){
                                            setFirstName(false)
                                        }  
                                        else if(lastName){
                                            setLastName(false)
                                        }     
                                    }}
                                >
                                    Cancel
                                </button>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.authentication.authorizedClient[0],
        loggedUserId: state.authentication.authorizedClient[0]._id,
        didUpdate: state.profileData.updateConfirmed.modifiedCount
    };
};

const mapDispatchToProps = (dispatch) => ({
    uploadNewData: (uploadObject) => {
        dispatch(uploadNewProfileDataRequested(uploadObject))
    },
    refetchClient: (clientInfo) => {
        dispatch(GetClientRequested(clientInfo))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);