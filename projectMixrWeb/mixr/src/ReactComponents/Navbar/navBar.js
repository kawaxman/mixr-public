import React, { useState } from 'react'
import style from './navBar.module.css'
import { BrowserRouter as Router, Link, useHistory, withRouter } from 'react-router-dom'

import UploadDrinks from '../../assets/images/cocktail3.png'
import SearchDrinks from '../../assets/images/search2.png'
import Profile from '../../assets/images/admin2.png'
import Logout from '../../assets/images/logout2.png'
import Welcome from '../../assets/images/welcome.png'

const NavigationBar = () => {
    const history = useHistory()

    return (
        <div className={style.root}>
            <Router>
                <Link key={"/SearchingDrinks/SearchingDrinksMain"} to={"/SearchingDrinks/SearchingDrinksMain"} className={style.navBarItemL} onClick={() => (history.push("/SearchingDrinks/SearchingDrinksMain"))}>
                    <img
                        className={style.imageStyle}
                        src={SearchDrinks}
                    />
                </Link>
                <Link key={"/UploadingDrinks"} to={"/UploadingDrinks"} className={style.navBarItem2} onClick={() => (history.push("/UploadingDrinks"))}>
                    <img
                        className={style.imageStyle}
                        src={UploadDrinks}
                    />
                </Link>
                <Link key={"/ProfilePage"} to={"/ProfilePage"} className={style.navBarItem2} onClick={() => (history.push("/ProfilePage"))}>
                    <img
                        className={style.imageStyle}
                        src={Profile}
                    />
                </Link>
                <Link key={"/LogoutPage"} to={"/LogoutPage"} className={style.navBarItem2} onClick={() => (history.push("/LogoutPage"))}>
                    <img
                        className={style.imageStyle}
                        src={Logout}
                    />
                </Link>
            </Router>
        </div>
    )
}

export default withRouter(NavigationBar)