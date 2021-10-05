import React from 'react'
import { useHistory } from 'react-router-dom'

import style from './admin.module.css'

const AdministratorMain = () => {
    const history = useHistory()

    return (
        <div className={style.root}>
            <div className={style.borderBox}>
                <h1 className= {style.adminTitle}>NOTE: You are about to logout.</h1>
                <hr className={style.blueLine}/>
                <br/>
                <div className={style.rememberMe}>
                    Are you sure you would like to logout?
                </div>
                <div className={style.buttonRow}>
                    <button className={style.confirm}
                        onClick={() => {
                            localStorage.clear()
                            sessionStorage.clear()
                            history.push('/LoginPage')
                            window.location.reload()
                        }}
                    >
                        Yes
                    </button>
                    <button className={style.deny}
                        onClick={() => {
                            history.push('/')
                        }}
                    >
                        No
                    </button>
                </div>
            </div>    
        </div>
    )
}

export default AdministratorMain