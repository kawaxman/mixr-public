import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import rootReducer from './store/reducer';
import sagas from './store/saga';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'

//Create the middleware to apply to saga functions
const sagaMiddleware = createSagaMiddleware()

//Declare enhancers to allow use of Redux dev tools chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Initialize the redux store with reducers, saga functions, and redux dev tools extension
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

//Continually run saga functions for regular use throughout application
sagaMiddleware.run(sagas)

//Wrap redux provider around application to give store to all components
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
