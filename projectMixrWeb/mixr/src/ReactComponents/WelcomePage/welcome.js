import React from 'react'

import style from './welcome.module.css'

const WelcomePage = () => {
    return(
        <div className={style.root}>
            <div className={style.borderBox}>
                <h1 className={style.loginTitle}>Mixr - mix it up</h1>
                <hr className={style.blueLine}/> 
                <div className={style.subHeader}>
                    <h3 className={style.rememberMe}>Welcome to Mixr, a website for all of your mixed drink mixology needs.</h3>
                </div>
                <div className={style.rememberMeContainer}>
                    <h3 className={style.rememberMe}>News</h3>
                    
                </div>
                <div className={style.buttonContainer}>
                    <ul className={style.listStyle}>
                        <li className={style.listItem}>
                            Site is now functional, if you have any bugs report them to this email: mixrtechsupport@email.com
                        </li>
                        <li className={style.listItem}>
                            We plan on updating the site in the coming weeks to add new features. Check back weekly!
                        </li>
                        <li className={style.listItem}>
                            NOTE: This page is simply meant to greet you and cannot be reached again later unless using the logout flow or login flow.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default WelcomePage