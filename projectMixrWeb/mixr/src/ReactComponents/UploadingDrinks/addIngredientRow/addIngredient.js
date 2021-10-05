import React,{useEffect,useState} from 'react'
import style from './addIngredient.module.css'

const AddIngredient = (props) => {
    const [ingred, setIngred] = useState({
        iName: "",
        iAmount: 0
    }) 
    useEffect(() => {
        var temp = props.dbUpload.ingredients
        temp[props.i] = ingred
        props.setDBUpload({
            ...props.dbUpload,
            ingredients: temp
        })
    },[ingred])
    return (
        <div className={style.root}>
                <input className={style.inputBox1} type='text' id={props.i} name='dname' placeholder='Ingredient Name' onChange={(name) => {
                    setIngred({
                        ...ingred,
                        iName: name.target.value
                    })
                }}></input>
                <input className={style.inputBox1} type='text' id={props.i+"second"} name='dname' placeholder='Amount' onChange={(amount) => {
                    setIngred({
                        ...ingred,
                        iAmount: amount.target.value
                    })
                }}></input>
        </div>
    )
}

export default AddIngredient