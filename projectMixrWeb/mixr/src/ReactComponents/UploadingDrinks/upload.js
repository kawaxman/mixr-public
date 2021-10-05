import React,{ useEffect, useState, useRef } from 'react'
import style from './upload.module.css'
import AddIngredient from './addIngredientRow/addIngredient'
import { GetPreviousRequested, UploadDrinksRequested } from '../../ReduxDrinks/actions'
import { connect } from 'react-redux'

import GenericDrinkImg from '../../assets/images/images.jpg';

import DrinkCards from '../DrinkCards'

const UploadingDrinksMain = (props) => {
    const [renderRow, setRenderRow] = useState(false)
    const [ingredients, setIngredients] = useState([{}])
    const [dbUpload, setDBUpload] = useState({
        uID: props.userId,
        drinkName: "",
        drinkDesc: "",
        ingredients: [{
            name: "",
            quantity: 0
        }],
        image: ""
    })
    const [readyToUpload, setReadyToUpload] = useState(false)
    const [renderFeedback, setRenderFeedback] = useState(false)

    const uploadHandler = () => {
        if(dbUpload.image === "")
        {
            dbUpload.image = GenericDrinkImg
        }
        if((dbUpload.drinkName !== "") && (dbUpload.drinkDesc !== "") && (dbUpload.ingredients.length !== 0))
        {
            setReadyToUpload(true)
        }
    }

    useEffect(() => {
        if(readyToUpload && !props.uploadedDrink?._id){
            setDBUpload({
                ...dbUpload,
                uID: props.userId.toString()
            })
            props.fetchPrevDrinks(props.userId)
            props.uploadDrink(dbUpload)
        }
    }, [ readyToUpload ])

    useEffect(() => {
        if(props.uploadedDrink?._id){
            setRenderFeedback(true)
        }
    }, [ props.uploadedDrink ])
    
    return (
        <div className={style.root}>
            { !renderFeedback?
                <div className={style.borderBox}>
                    <h1 className={style.loginTitle}>Create A Drink</h1>
                    <hr className={style.blueLine}/>
                    <div className={style.subHeader}>
                        <input className={style.inputBox1} type="text" id="dname" name="dname" placeholder="Drink Name" onChange={(name) => {
                            setDBUpload({ 
                                ...dbUpload,
                                drinkName: name.target.value
                            })
                        }}></input>
                    </div>
                    <div className={style.subHeader}>
                    <textarea className={style.textArea} type="text" placeholder="Short description of drink" rows="4" cols="50" onChange={(desc) => {
                        setDBUpload({ 
                            ...dbUpload,
                            drinkDesc: desc.target.value
                        })
                    }}></textarea>
                    </div>
                    <div className={style.subHeader}>
                        <input
                            placeholder="Enter a public image url..."
                            className={style.inputBox1}
                            onChange={(event) =>
                                setDBUpload({
                                    ...dbUpload,
                                    image: event.target.value
                                })
                            }
                        />
                    </div>
                    <div className={style.buttonContainer}>
                        <button onClick={() => {
                            var temp = ingredients
                            temp.push({})
                            setRenderRow(!renderRow)
                            setIngredients(temp)
                            console.log(ingredients)
                        }} className={style.button}>
                            Add Ingredient
                        </button>
                    </div>
                    <div className={style.ingredientRows}>
                        {
                            ingredients && ingredients.map((ingredient,i) => { 
                                if (ingredient === undefined){
                                    return null
                                }
                                return ( 
                                    <AddIngredient
                                    i={i}
                                    setIngredients = {setIngredients}
                                    ingredients = {ingredients}
                                    dbUpload = {dbUpload}
                                    setDBUpload = {setDBUpload}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className={style.buttonContainer}>
                        <button className={style.button} onClick={() => uploadHandler()}>
                            Create Drink!
                        </button>
                        <button className={style.buttonCancel}>
                            Cancel
                        </button>
                    </div>  
                </div>
                :
                <>
                    { props.uploadedDrink?._id?
                        <div className={style.borderBox}>
                                <h1 className={style.loginTitle}>
                                    Success! You've uploaded a drink!
                                </h1>
                            <div className={style.feedbackRow}>
                                <div className={style.newUploadDrinks}>
                                    {/* It would be good to maybe add some drink info and maybe show some other uploaded drinks */}
                                    <div className={style.goBackAndTextRow}>
                                        <h3 className={style.newDrink}>The newly upload drink:</h3>
                                        <button className={style.backButton}
                                            onClick={() => {
                                                setRenderFeedback(false)
                                            }}
                                        >
                                            Upload another!
                                        </button>
                                    </div>
                                    <DrinkCards
                                        uploadedDrink={props.uploadedDrink}
                                    />
                                </div>
                                { props.prevDrinksArr.length > 0?
                                    <div className={style.oldUploadDrinks}>
                                        <h3 className={style.newDrink}>Some old drinks (Scroll right to see more if more exist...):</h3>
                                        <div className={style.newDrinkRow}>
                                        { props.prevDrinksArr?.map((drink, index) => {
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
                                    <div className={style.oldUploadDrinks}>
                                        <h3 className={style.newDrink}>Some old drinks (Scroll right to see more if more exist...):</h3>
                                        <h3 className={style.newDrink}>It looks like this is your first uploaded drink! Congratulations!</h3>
                                        <button className={style.backButton}
                                            onClick={() => {
                                                setRenderFeedback(false)
                                            }}
                                        >
                                            Upload another!
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        null
                    }
                </>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.authentication.authorizedClient[0]._id,
        uploadedDrink: state.uploadDrinks.drinkUploadSuccess,
        prevDrinksArr: state.uploadDrinks.prevDrinks
    };
};

const mapDispatchToProps = (dispatch) => ({
    uploadDrink: (drink) => {
        dispatch(UploadDrinksRequested(drink))
    },
    fetchPrevDrinks: (userId) => {
        dispatch(GetPreviousRequested(userId))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadingDrinksMain)