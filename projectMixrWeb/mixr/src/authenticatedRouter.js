import React from 'react'
import { Switch, Route, BrowserRouter as Router, withRouter, useHistory } from 'react-router-dom'

import AdministratorMain from './ReactComponents/AdministratorPages/admin'
import SelectIngredients from './ReactComponents/SelectIngredients/selectIngredients'
import UploadingDrinksMain from './ReactComponents/UploadingDrinks/upload'
import NavigationBar from './ReactComponents/Navbar/navBar'
import ProfilePage from './ReactComponents/ProfilePage/profilePage'
import WelcomePage from './ReactComponents/WelcomePage/welcome'
import SearchingDrinksMain from './ReactComponents/SearchingDrinks/search'

const AuthenticatedAppRouter = () => {
    
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route
                            exact path="/SearchingDrinks"
                            render={() => (
                                <SelectIngredients/>
                            )}
                        />
                        <Route
                            exact path="/SearchingDrinks/SearchingDrinksMain"
                            render={() => (
                                <SearchingDrinksMain/>
                            )}
                        />
                        <Route
                            path="/UploadingDrinks"
                            render={() => (
                                <UploadingDrinksMain/>
                            )}
                        />
                        <Route
                            path="/ProfilePage"
                            render={() => (
                                <ProfilePage/>
                            )}
                        />
                        <Route
                            path="/LogoutPage"
                            render={() => (
                                <AdministratorMain/>
                            )}
                        />
                        <Route
                            path="/"
                            render={() => (
                                <WelcomePage/>
                            )}
                        />
                    </Switch>
                </div>
                <NavigationBar/>
            </Router>
        </div>   
    )
}

export default withRouter(AuthenticatedAppRouter)