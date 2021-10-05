import React, { useState } from 'react'
import { Switch, Route, BrowserRouter as Router, useHistory } from "react-router-dom"

import Login from './ReactComponents/Login/login'
import CreateProfile from './ReactComponents/CreateAccount/createAccount'

const UnauthenticatedAppRouter = () => {
    const history = useHistory()

    //Immediately redirects user to the routed login page...
    history.push("/LoginPage")

    return (
        <div>
            <Router>
                <Switch>
                    <Route path = "/LoginPage">
                        <Login/>
                    </Route>
                </Switch>
                <Switch>
                    <Route path = "/CreateProfilePage">
                        <CreateProfile/>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default UnauthenticatedAppRouter