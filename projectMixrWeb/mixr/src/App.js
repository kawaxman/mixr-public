import React, { useState, useEffect } from 'react'
import './App.css';
import { connect } from 'react-redux'

import UnauthenticatedAppRouter from './unauthenticatedRouter'
import AuthenticatedAppRouter from './authenticatedRouter'
import UploadingDrinksMain from './ReactComponents/UploadingDrinks/upload'

import { initializeAndLogin } from './MongoDBRealm/index'
import { Stitch } from 'mongodb-stitch-browser-sdk'

const App = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  //Initialize the mongoDB client and establish a connection using mongo-stitch-browser-sdk
  //This grants the ability to properly call backend function in a backend application, such that reads and writes can actually be performed
  //Need to write proper stitch functions then call them from saga functions
  useEffect(() => {
    if(!Stitch.hasAppClient('mixrrealm-uxlfh')){
      window.onload = initializeAndLogin();
    }
  }, [  ])

  useEffect(() => {
    if(props.loggedUser.length > 0){
      setIsAuthenticated(true)
    }
    else {
      console.log('is not authenticated')
    }
  }, [ props.loggedUser ])

  if(isAuthenticated){
    return (
      <AuthenticatedAppRouter/>
    )
  }
  else if(!isAuthenticated) {
    return (
      <UnauthenticatedAppRouter/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.authentication?.authorizedClient,
  }
}

export default connect(mapStateToProps, null)(App);