import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { nameSearchRequested } from '../../reduxGettingDrinks/actions'
import { useHistory } from 'react-router-dom'

import DrinkCards from '../DrinkCards/index'
import style from './search.module.css'

const SearchDrinksMain = (props) => {
    const [enteredName, setEnteredName] = useState({
        name: ''
    })
    const [isEmptyInput, setIsEmptyInput] = useState(false)
    const [drinksReturned, setDrinksReturned] = useState(false)
    const [fetched, setFetched] = useState(false)
    const [forceRender, setForceRender] = useState(false)
    const history = useHistory()

    const submitHandler = () => {
        if(enteredName.name === ''){
            if(!isEmptyInput){
                setIsEmptyInput(true)
            }
        }
        else {
            if(!isEmptyInput){
                setFetched(true)
                props.fetchDrinks(enteredName)
            }
        }
    }

    useEffect(() => {
        if(fetched){
            setDrinksReturned(true)
            setFetched(false)
        }
    }, [ props.drinksArr, fetched ])

    return (
        <div className={style.root}>
            { !drinksReturned?
                <div className={style.borderBox}>
                    <h1 className={style.loginTitle}>Search Drinks
                    </h1>
                    <hr className={style.blueLine}/>
                    <label  htmlFor="header-search">
                    </label>  
                    <input className={style.searchBar}
                        type="text"
                        id="header-search"
                        placeholder="Search Drinks"
                        name="s" 
                        onChange={(event) => {
                            setIsEmptyInput(false)
                            setEnteredName({
                                name: event.target.value
                            })
                        }}
                    />
                    <br />
                    <br />
                    <button 
                        className={style.button}
                        onClick={() => {
                            submitHandler()
                            setForceRender(!forceRender)
                        }}
                    >
                        Search
                    </button>
                </div>  
                :
                <div className={style.borderBox}>
                { props.drinksArr.length > 0?
                <div className={style.returnedColumn}>
                    <h1 className={style.returnedTitle}>
                        These are the drinks we could find with that name!
                    </h1>
                    <div className={style.textAndButtonRow}>
                        <h3 className={style.returnedTitleSmall}>
                            Choose some and start mixing!
                        </h3>
                        <button className={style.backButton}
                            onClick={() => {
                                setDrinksReturned(false)
                            }}
                        >
                            Click me to search again!
                        </button>
                        {/* <button className={style.backButton2}
                            onClick={() => {
                                setDrinksReturned(false)
                                history.push('/SearchingDrinks')
                            }}
                        >
                            Click me to select ingredients!
                        </button> */}
                    </div>
                    <div className={props.drinksArr.length > 2? style.returnedDrinksContainer : style.returnedDrinksContainerOther}>
                    { props.drinksArr.map((drink) => {
                        return (
                            <DrinkCards
                                uploadedDrink={drink}
                            />
                        )
                        })
                    }
                    </div>
                </div>
                :
                <>
                    <h1 className={style.loginTitle}>
                        Unfortunately it looks like no drinks were returned for the name you have entered.
                    </h1>
                    <button className={style.backButton}
                        onClick={() => {
                            setDrinksReturned(false)
                        }}
                    >
                        Click me to search again!
                    </button>
                </>
                }
            </div>
            }
       </div>
    )
}

const mapStateToProps = (state) => {
    return {
        drinksArr: state.fetchDrinks.namedDrinksArr
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchDrinks: (inputtedName) => {
        dispatch(nameSearchRequested(inputtedName))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchDrinksMain);