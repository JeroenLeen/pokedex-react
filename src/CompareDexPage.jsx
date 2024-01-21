import React, { useState, useEffect } from 'react';
import './PokedexPage.css'
import DBResource from './DBResource'
import PokedexEntry from './subcomponents/PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import './CompareDexPage.css'
export default function CompareDexPage() {
      
 
  const resource = new DBResource();
  const queryParameters = new URLSearchParams(window.location.search)
  const userParam = queryParameters.get("user")?.toLowerCase();

  //const items2 = useRef([]);

  const [items1, setItems1] = useState([]);
  const [items2, setItems2] = useState([]);
  const [pokemonsOriginalSort1, setPokemonsOriginalSort1] = useState([]);
  const [pokemonsOriginalSort2, setPokemonsOriginalSort2] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCalled, setUsersCalled] = useState(false);
  const [userValue, setUserValue] = useState();
  const [hasData, setHasData] = useState(true);
  const [compareToValue, setCompareToValue] = useState();
  const sortOptions = [{value:"Pokedex", label:"Pokedex"},{value:"Tradeable User 1", label:"Tradeable User 1"},{value:"Tradeable User 2", label:"Tradeable User 2"},
  {value:"Name", label:"Name"},{value:"Number caught ↑", label:"Number caught ↑"},{value:"Number caught ↓", label:"Number caught ↓"}
  ,{value:"Shiny's caught ↑", label:"Shiny's caught ↑"},{value:"Shiny's caught ↓", label:"Shiny's caught ↓"}
  ,{value:"Rarity ↑", label:"Rarity ↑"},{value:"Rarity ↓", label:"Rarity ↓"}]
  const [selectValue,setSelectValue] = useState({value:"Pokedex", label:"Pokedex"});

  useEffect(() => {
  (async () => {
    if(!usersCalled){
      setUsersCalled(true);
      console.log("calling unique users:");
      const foundUsers  = await resource.getUniqueUsers()
      setUsers(foundUsers) ;
    }
  })();},[]);


  const onChangeHandler = (change) => {
    setUserValue(change);
    setSelectValue({value:"Pokedex", label:"Pokedex"});
    (async () => {
     
      console.log("finding pokemon for:" + change.value);
      await fetchAndDisplayPokemonData(change.value);
      })()
  };

  const onChangeCompareToHandler = (change) => {
    setCompareToValue(change);
    setSelectValue({value:"Pokedex", label:"Pokedex"});
    (async () => {
     
      console.log("finding pokemon for:" + change.value);
      await fetchAndDisplayPokemonData2(change.value);
      })()
  };

  async function fetchAndDisplayPokemonData(value) {


    const data = await resource.getUniquePokedexEntries(value);
    if(items2.length>0){
      setHasData(false);
      setTradeableData(data, pokemonsOriginalSort2);
      setItems2(pokemonsOriginalSort2);
     }
     debugger;
    setItems1(data);
    setPokemonsOriginalSort1(data);
  }

  function setTradeableData(array1, array2){
    for(let i = 0; i< array1.length; i ++){
      if((array1[i].normalNumber >=2 && array2[i].normalNumber ==0) || (array1[i].shinyNumber >=2 && array2[i].shinyNumber ==0) ){
        array1[i].tradeableFor1 = true;
        array2[i].tradeableFor1 = true;
      } else if((array2[i].normalNumber >=2 && array1[i].normalNumber ==0  )|| (array2[i].shinyNumber >=2 && array1[i].shinyNumber ==0)){
        array1[i].tradeableFor2 = true;
        array2[i].tradeableFor2 = true;
      }else{
        array1[i].tradeableFor1 = false;
        array2[i].tradeableFor1 = false;
        array1[i].tradeableFor2 = false;
        array2[i].tradeableFor2 = false;
      }
    }
  }


  async function fetchAndDisplayPokemonData2(value) {
    const data = await resource.getUniquePokedexEntries(value);
    if(items1.length>0){
      setHasData(false);
      setTradeableData(data, pokemonsOriginalSort1);
      setItems1(pokemonsOriginalSort1);

     }
     debugger;
    setItems2(data);
    setPokemonsOriginalSort2(data);
  }

  function sortByFieldAsc(data, field) {

      data.sort(function (a, b) {
        if (a[field] < b[field]) {
          return -1;
        }
        if (a[field] > b[field]) {
          return 1;
        }
        return 0;
      });
    
  }

  function sortByFieldDesc(data, field) {
    data.sort(function (a, b) {
      if (a[field] > b[field]) {
        return -1;
      }
      if (a[field] < b[field]) {
        return 1;
      }
      return 0;
    });
  
}

  const onSortChangeHandler = (change) => {
  
    setSelectValue(change);
    let tempData1 = pokemonsOriginalSort1.map(a => {return {...a}}) ;
    let tempData2 = pokemonsOriginalSort2.map(a => {return {...a}}) ;
    debugger;


    if(change.value == "Name"){
      sortByFieldAsc(tempData1,"monName");
      sortByFieldAsc(tempData2,"monName");
    }

    if(change.value == "Tradeable User 1"){
      sortByFieldDesc(tempData1,"tradeableFor2");
      sortByFieldDesc(tempData2,"tradeableFor2");
    }

    
    if(change.value == "Tradeable User 2"){
      sortByFieldDesc(tempData1,"tradeableFor1");
      sortByFieldDesc(tempData2,"tradeableFor1");
    }

    if(change.value == "Rarity ↑"){
      sortByFieldAsc(tempData1,"rarityNumber");
      sortByFieldAsc(tempData2,"rarityNumber");
    }
  
    if(change.value == "Rarity ↓"){
        sortByFieldDesc(tempData1,"rarityNumber");
        sortByFieldDesc(tempData2,"rarityNumber");
    }
    

    setItems1(tempData1) ;
    setItems2(tempData2) ;

  };
    return (
        <div className="wholeSite">
        <div className="content">
          <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Compare pokedex</h1><img src="yogieisbar.png" alt="Image" className="logo" />
          </div>
          <div className='selectorWrapper'>
          <div className='selector'>
               <h4 className='selectTitle'>
                User:
                </h4><div className='selectAndTooltip' >
                  <Select className='selectorSelect' value={userValue} options={users} onChange={onChangeHandler}  defaultValue={"User"}></Select>
                  <div className="selectIcon">
                  <img data-tooltip-id="my-tooltip1"  className='selectIconImg' src="/unown-question.png"></img>
                  <Tooltip id="my-tooltip1" 
                    place="top"
                    effect='solid'
                    content="The user whose pokedex you want to compare. You can search in this field"/>
                </div>
                </div>
          </div>
          <div className='selector'>
               <h4 className='selectTitle'>
                User2:
                </h4><div className='selectAndTooltip' >
                  <Select className='selectorSelect' value={compareToValue} options={users} onChange={onChangeCompareToHandler}  defaultValue={"User"}></Select>
                  <div className="selectIcon">
                  <img data-tooltip-id="my-tooltip2"  className='selectIconImg' src="/unown-question.png"></img>
                  <Tooltip id="my-tooltip2" 
                    place="top"
                    effect='solid'
                    content="The user whose pokedex you want to compare to. You can search in this field"/>
                </div>
                </div>
          </div>
          </div>

        <div className='sortContainer'>
          <div className='sortSelectContainer' ><h4 className='selectTitle'>Sort:</h4> <Select isDisabled={hasData} className='sortSelect'  options={sortOptions} onChange={onSortChangeHandler}  value={selectValue}></Select>
          </div>
          </div>
          <div className='doubleEntriesContainer'>
         <div className='compareEntries'> 
              {
    
            items1.map(function (el, index) { 
    
             return <div key={el.key} className={"entryBorder" + index %4 + " compareEntry"}>
              <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
              normalNumber={el.normalNumber}  shinyNumber={el.shinyNumber} name={el.monName} exclusiveTo={el.exclusiveTo}
              rarity={el.rarity}></PokedexEntry>
               </div>})
              }
          </div>
          <div className='compareEntries'> 
              {
    
            items2.map(function (el, index) { 
    
             return <div key={el.key} className={"entryBorder" + index %4 + " compareEntry"}>
              <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
              normalNumber={el.normalNumber}  shinyNumber={el.shinyNumber} name={el.monName} exclusiveTo={el.exclusiveTo}
              rarity={el.rarity}></PokedexEntry>
               </div>})
              }
          </div>
          </div>
          <div className="footer">
    
                  <div className="selectIcon">
                  <img data-tooltip-id="info-tooltip"  className='selectIconImg' src="/unown-question.png"></img>
                  <Tooltip id="info-tooltip" 
                    place="left"
                    effect='solid'
                    content="For bugs, please contact Forodor on discord"/>
                </div>
     
          </div>
         
    </div>
    
    </div>
    );
}