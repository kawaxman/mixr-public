import React ,{ useState, useEffect }from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
import { categorySearchRequested } from '../../reduxGettingDrinks/actions'
import { connect } from 'react-redux'

import DrinkCards from '../DrinkCards/index'
import style from './selectIngredients.module.css'

const SelectIngredientsPage = (props) => {
    const [categoriesToSearch, setCategoriesToSearch] = useState({
      Spirits: '',
      WinesAndChampagnes: '',
      Sodas: '',
      Juice: '',
      Mixers: ''
    })
    const [noFieldsEntered, setNoFieldEntered] = useState(false)
    const [drinksReturned, setDrinksReturned] = useState(false)
    const [fetched, setFetched] = useState(false)

    const history = useHistory()
    const [forceRender, setForceRender] = useState(false)

    const Spirits = [
        { label: "None"},
        { label: "Tequila"},
        { label: "Rum"},
        { label: "Whiskey"},
        { label: "Vodka"},
        { label: "Gin"},
        { label: "Beer"}
      ];

    const WinesChampanges = [
        { label: "None"},
        { label: "Red Wine"},
        { label: "White Wine"},
        { label: "Champagnes"},
        { label: "Rose"},
      ];
      const Sodas = [
        { label: "None"},
        { label: "Coke"},
        { label: "Sprite"},
        { label: "Mtn Dew"},
        { label: "Ginger Ale"},
        { label: "Cream Soda"},
        { label: "Dr Pepper"}
      ];

      const Juice = [
        { label: "None"},
        { label: "Orange Juice"},
        { label: "Apple Juice"},
        { label: "Grape Juice"},
        { label: "Pineapple Juice"},
        { label: "Mango Juice"},
      ];

      const Mixers = [
        { label: "None"},
        { label: "Salt"},
        { label: "Sugar"},
        { label: "Lemon"},
      ];

      const submitHandler = () => {
        if(categoriesToSearch.Spirits === '' && categoriesToSearch.WinesAndChampagnes === '' &&
          categoriesToSearch.Sodas === '' && categoriesToSearch.Juice === '' &&
          categoriesToSearch.Mixers === ''
        ) {
            if(!noFieldsEntered){
              setNoFieldEntered(true)
            }
        }
        else {
          if(!noFieldsEntered){
            setFetched(true)
            props.fetchDrinks(categoriesToSearch)
          }
        }
      }

      useEffect(() => {
        if(fetched){
          setDrinksReturned(true)
          setFetched(false)
        }
      }, [ props.drinksArr ])

    return(
      <div className={style.root}>
        { !drinksReturned?
          <div className={style.borderBox}>
            <div className={style.columnContainer}>
              <div className={style.column1}>
                <h1 className={style.loginTitle}>Select Ingredients
                </h1>
                <p className={style.titleText}>
                  If you would like to select some drink categories select below.
                </p>
                <hr className={style.blueLine}/>
                <br/>
                <h2 className={style.dropdownTitle}>Spirits
                </h2>
                <Select onChange = {(event) => {
                  setNoFieldEntered(false)
                  setCategoriesToSearch({
                    ...categoriesToSearch,
                    Spirits: event.label
                  })}} 
                  className={style.dropdown} options={Spirits} 
                />
                <h2 className={style.dropdownTitle}>Wines & Champagnes
                </h2>
                <Select onChange = {(event) => {
                  setNoFieldEntered(false)
                  setCategoriesToSearch({
                    ...categoriesToSearch,
                    WinesAndChampagnes: event.label
                  })}}  
                  className={style.dropdown} options={WinesChampanges} 
                />
                <h2 className={style.dropdownTitle}>Sodas
                </h2>
                <Select onChange = {(event) => {
                  setNoFieldEntered(false)
                  setCategoriesToSearch({
                    ...categoriesToSearch,
                    Sodas: event.label
                  })}}  
                  className={style.dropdown} options={Sodas} 
                />
                <h2 className={style.dropdownTitle}>Juices
                </h2>
                <Select onChange = {(event) => {
                  setNoFieldEntered(false)
                  setCategoriesToSearch({
                    ...categoriesToSearch,
                    Juice: event.label
                  })}}  
                  className={style.dropdown} options={Juice} 
                />
                <h2 className={style.dropdownTitle}>Mixers
                </h2>
                <Select onChange = {(event) => {
                  setNoFieldEntered(false)
                  setCategoriesToSearch({
                    ...categoriesToSearch,
                    Mixers: event.label
                  })}}  
                  className={style.dropdown} options={Mixers} 
                />
                {/* <select name={Spirits}>
                  <option selected>Spirits</option>
                  <option value="0">None</option>
                  <option value="1">Tequila</option>
                  <option value="2">Rum</option>
                  <option value="3">Whiskey</option>
                  <option value="4">Vodka</option>
                  <option value="5">Gin</option>
                  <option value="6">Beer</option>
                </select>
                <select name={WinesChampanges}>
                  <option selected>Wines  Champanges</option>
                  <option value="0">None</option>
                  <option value="1">Red Wine</option>
                  <option value="2">White Wine</option>
                  <option value="3">Champanges</option>
                  <option value="4">Rose</option>
                </select>
                <select name={Sodas}>
                  <option selected>Sodas</option>
                  <option value="0">None</option>
                  <option value="1">Coke</option>
                  <option value="2">Sprite</option>
                  <option value="3">Mtn Dew</option>
                  <option value="4">Ginger Ale</option>
                  <option value="5">Cream Soda</option>
                  <option value="6">Dr Pepper</option>
                </select>
                <select name={Juice}>
                  <option selected>Juice</option>
                  <option value="0">None</option>
                  <option value="1">Orange Juice</option>
                  <option value="2">Apple Juice</option>
                  <option value="3">Grape Juice</option>
                  <option value="4">Pineapple Juice</option>
                  <option value="5">Mango Juice</option>
                </select>
                <select name={Mixers}>
                  <option selected>Mixers</option>
                  <option value="0">None</option>
                  <option value="1">Salt</option>
                  <option value="2">Suger</option>
                  <option value="3">Lemon</option>
                </select> */}
                <p className={style.clearboth}/><br/>
                { noFieldsEntered?
                  <p className={style.noFieldEntered}>
                    Please enter at least one field before submitting. Otherwise use the search bar.
                  </p>
                  :
                  null
                }
                <div className={style.button1}>
                  <button className={style.button} onClick={() => {
                    submitHandler();
                    setForceRender(!forceRender)
                  }}>Mix It</button>
                </div>  
              </div>
              <div className={style.column2}>
                <p className={style.titleText2}>
                  If you would like to search for drinks by name click the button below.
                </p>
                <button 
                  className={style.searchButton}
                  onClick={() => {
                    history.push('/SearchingDrinks/SearchingDrinksMain')
                    setForceRender(!forceRender)
                  }}
                >
                  Search Drinks 
                </button>
              </div>
            </div>
          </div>
          :
          <div className={style.borderBox}>
            { props.drinksArr.length > 0?
              <div className={style.returnedColumn}>
                <h1 className={style.returnedTitle}>
                  These are the drinks we could find containing your ingredients!
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
                </div>
                <div className={style.returnedDrinksContainer}>
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
                  Unfortunately it looks like no drinks were returned for the ingredients you selected.
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
    drinksArr: state.fetchDrinks.categoryDrinksArr
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDrinks: (inputtedCategories) => {
    dispatch(categorySearchRequested(inputtedCategories))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectIngredientsPage);