import React, { Link, useState, useEffect } from 'react';
import './PokedexPage.css'
import DBResource from './DBResource'
import PokedexEntry from './PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom";
export default function PokedexPage() {
  //static contextType = ThemeContext;

  let navigate = useNavigate(); 
  const resource = new DBResource();


  //const items2 = useRef([]);

  const [items2, setItems2] = useState([]);
  const [pokemonsOriginalSort, setPokemonsOriginalSort] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCalled, setUsersCalled] = useState(false);
  const [usersName, setUserName] = useState(false);
  const [hasData, setHasData] = useState(true);
  const [pokemonCaugth, setPokemonCaugth] = useState(0);
  const [uniquePokemonCaugth, setUniquePokemonCaugth] = useState(0);
  const [totalShinyCaugth, setTotalShinyCaugth] = useState(0);
  const sortOptions = [{value:"Pokedex", label:"Pokedex"},{value:"Name", label:"Name"},{value:"Number caught", label:"Number caught"},{value:"Shiny's caught", label:"Shiny's caught"}]
  const [selectValue,setSelectValue] = useState({value:"Pokedex", label:"Pokedex"});

  const routeChange = () =>{ 
    let path = `doubleFinder`; 
    navigate(path);
  }

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
    setSelectValue({value:"Pokedex", label:"Pokedex"});
    setUserName(change.value);
    (async () => {
      setHasData(false);
      console.log("finding pokemon for:" + change.value);
      const data  = await resource.getUniquePokedexEntries(change.value)

      let shinySum = 0;
      let totalSum=0;
      // calculate sum using forEach() method
      data.forEach( entry => {
        shinySum += entry.shinyNumber;
        totalSum+= entry.normalNumber + entry.shinyNumber;
      })
     
      setPokemonCaugth(totalSum);
      setTotalShinyCaugth(shinySum);
      setUniquePokemonCaugth( data.filter((entry) => (entry.normalNumber > 0 | entry.shinyNumber > 0) && !entry.isSeasonal  ).length);
      setItems2(data) ;
      setPokemonsOriginalSort(data);
      })()
  };


  const onSortChangeHandler = (change) => {
  
    setSelectValue(change);
    let tempData = pokemonsOriginalSort.map(a => {return {...a}}) ;

    if(change.value == "Name"){
      tempData.sort(function (a, b) {
        if (a.monName < b.monName) {
          return -1;
        }
        if (a.monName > b.monName) {
          return 1;
        }
        return 0;
      });
    }
    if(change.value == "Number caught"){
      tempData.sort(function (a, b) {
        if (a.normalNumber > b.normalNumber) {
          return -1;
        }
        if (a.normalNumber < b.normalNumber) {
          return 1;
        }
        return 0;
      });
    }

    if(change.value == "Shiny's caught"){
      tempData.sort(function (a, b) {
        if (a.shinyNumber > b.shinyNumber) {
          return -1;
        }
        if (a.shinyNumber < b.shinyNumber) {
          return 1;
        }
        return 0;
      });
    }
   

    setItems2(tempData) ;
  };

  return (
<div className="wholeSite">
    <div className="content">
    <div className='menu'>

      <button className='pokedexMenuItemContainer menuItemContainer'></button>
 
      <button onClick={routeChange} className='doubleFinderMenuItemContainer menuItemContainer'></button>
   
      <button className='ExplenationMenuItemContainer menuItemContainer'></button>
      <button className='aboutSiteMenuItemContainer menuItemContainer'></button>
      </div>

      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Hatch & Catch Pokedex</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>
      <div className='selectorWrapper'>
      <div className='selector'>
           <h4 className='selectTitle'>
            User:
            </h4><div className='selectAndTooltip' >
              <Select className='selectorSelect'  options={users} onChange={onChangeHandler}  defaultValue={"User"}></Select>
              <div className="selectIcon">
              <img data-tooltip-id="my-tooltip"  className='selectIconImg' src="/unown-question.png"></img>
              <Tooltip id="my-tooltip" 
                place="top"
                effect='solid'
                content="The user whose pokedex you want to see. You can search in this field"/>
            </div>
            </div>
      </div>
      </div>

    <div>
      <div className='generalData'>  
        <div><h4>Total Catches: {pokemonCaugth}</h4> </div>
       <div><h4> Unique Catches: {uniquePokemonCaugth}</h4></div>
       <div><h4> Total Shiny's Caught: {totalShinyCaugth}</h4></div>
    </div>

    </div>
    <div className='sortContainer'>
      <div className='sortSelectContainer' ><h4 className='selectTitle'>Sort:</h4> <Select isDisabled={hasData} className='sortSelect'  options={sortOptions} onChange={onSortChangeHandler}  value={selectValue}></Select>
      </div>
      </div>
     <div className='entries'> 
          {
         items2.map(el =>  <div key={el.key} className="entry">
          <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
          normalNumber={el.normalNumber}  shinyNumber={el.shinyNumber} name={el.monName} exclusiveTo={el.exclusiveTo}
          rarity={el.rarity}></PokedexEntry>
           </div>)
          }
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
  )
}


