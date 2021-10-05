import React, { useState } from 'react';

import style from './index.module.css';

import GenericDrinkImg from '../../assets/images/images.jpg';

const DrinkCard = (props) => {
    const [isBroken, setIsBroken] = useState(false)

    return (
        <div className={style.root}>
            <h1 className={style.drinkTitle}>
                {props.uploadedDrink.drinkName}
            </h1>
            <img
                className={style.genericDrinkImage}
                src={isBroken? GenericDrinkImg : props.uploadedDrink.imageURL}
                onError={() => {
                    setIsBroken(true)
                }}
            />
            <p className={style.description}>
                {props.uploadedDrink.drinkDesc}
            </p>
            { props.uploadedDrink.ingredients.map((ingredient) => {
                    return (
                        <p className={style.ingredient}>
                            {ingredient.iName}: {ingredient.iAmount}
                        </p>
                    )
                })
            }
        </div>
    );
};

export default DrinkCard;