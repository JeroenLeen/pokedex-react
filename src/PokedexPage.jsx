import React, { useContext , useState, useEffect } from 'react';
import './PokedexPage.css'
import singletondDbResource from './DBResourceSingleton'
import PokedexEntry from './subcomponents/PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from "react-router-dom";
import { UserContext } from './GeneralComponent';

export default function PokedexPage() {
  //static contextType = ThemeContext;


  const resource =singletondDbResource;
  const queryParameters = new URLSearchParams(window.location.search)
  const userParam = queryParameters.get("user")?.toLowerCase();

  //const items2 = useRef([]);

  const [items2, setItems2] = useState([]);
  const [pokemonsOriginalSort, setPokemonsOriginalSort] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCalled, setUsersCalled] = useState(false);
  const [userValue, setUserValue] = useState();
  const [hasData, setHasData] = useState(true);
  const [pokemonCaugth, setPokemonCaugth] = useState(0);
  const [uniquePokemonCaugth, setUniquePokemonCaugth] = useState(0);
  const [totalShinyCaugth, setTotalShinyCaugth] = useState(0);
  const [disableSort2, setDisableSort2] = useState(true);
  const sortOptions = [{value:"Pokedex", label:"Pokedex"},
  {value:"Name", label:"Name"},{value:"Number caught ↑", label:"Number caught ↑"},{value:"Number caught ↓", label:"Number caught ↓"}
  ,{value:"Shiny's caught ↑", label:"Shiny's caught ↑"},{value:"Shiny's caught ↓", label:"Shiny's caught ↓"}
  ,{value:"Rarity ↑", label:"Rarity ↑"},{value:"Rarity ↓", label:"Rarity ↓"}]
  const [selectValue,setSelectValue] = useState({value:"Pokedex", label:"Pokedex"});
  const [selectValue2,setSelectValue2] = useState({value:"Pokedex", label:"Pokedex"});
  const {logedInUser, setLogedInUser} = useContext(UserContext);
  const [pokemonsettings, setPokemonSettings] = useState([]);
  useEffect(() => {
  (async () => {
    if(!usersCalled){
      setUsersCalled(true);
      console.log("calling unique users:");
      const foundUsers  = await resource.getUniqueUsers();
      setUsers(foundUsers) ;
      if(userParam){
        console.log("found value")
        setUserValue({label:userParam, value:userParam});
        await fetchAndDisplayPokemonData(userParam);
      }
   
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

  async function fetchAndDisplayPokemonData(value) {
    window.history.pushState({path:'?user=' + value },'','?user=' + value );
    setHasData(false);
    let test;
    if(logedInUser ===value){
      const settingdata = await resource.getPokemonSettings();
      setPokemonSettings(settingdata);
    }
    const data = await resource.getUniquePokedexEntries(value);

    let shinySum = 0;
    let totalSum = 0;
    // calculate sum using forEach() method
    data.forEach(entry => {
      shinySum += entry.shinyNumber;
      totalSum += entry.normalNumber + entry.shinyNumber;
    });

    setPokemonCaugth(totalSum);
    setTotalShinyCaugth(shinySum);
    setUniquePokemonCaugth(data.filter((entry) => (entry.normalNumber > 0 | entry.shinyNumber > 0) && !entry.isSeasonal).length);
    setItems2(data);
    setPokemonsOriginalSort(data);
  }

  function sortByFieldAscPrimary(data, primaryField, secondaryField ) {

    data.sort(function (a, b) {
      if (a[primaryField] < b[primaryField]) {
        return -1;
      }
      if (a[primaryField] > b[primaryField]) {
        return 1;
      }
      return secondarySort(a,b,secondaryField);
    });
  
}

function sortByFieldDescPrimary(data, primaryField, secondaryField) {
  data.sort(function (a, b) {
    if (a[primaryField] > b[primaryField]) {
      return -1;
    }
    if (a[primaryField] < b[primaryField]) {
      return 1;
    }
    return secondarySort(a,b,secondaryField);
  });
}

  function sortByFieldAsc(a,b, field) {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
}

function sortByFieldDesc(a,b, field) {
    if (a[field] > b[field]) {
      return -1;
    }
    if (a[field] < b[field]) {
      return 1;
    }
    return 0;
}

const secondarySort = (a,b,secondaryFilter) => {
  

  if(secondaryFilter == "Pokedex"){
    return sortByFieldAsc(a,b,"pokedex");
  }

  if(secondaryFilter == "Name"){
    return sortByFieldAsc(a,b,"monName");
  }

  if(secondaryFilter == "Number caught ↑"){
    return sortByFieldAsc(a,b,"normalNumber");
  }

  if(secondaryFilter == "Number caught ↓"){
    return sortByFieldDesc(a,b,"normalNumber");
  }

  if(secondaryFilter == "Shiny's caught ↑"){
    return sortByFieldAsc(a,b,"shinyNumber");
  }

  if(secondaryFilter == "Shiny's caught ↓"){
    return sortByFieldDesc(a,b,"shinyNumber");
  }

  if(secondaryFilter == "Rarity ↑"){
    return sortByFieldAsc(a,b,"rarityNumber");
  }

  if(secondaryFilter == "Rarity ↓"){
    return sortByFieldDesc(a,b,"rarityNumber");
  }
  
};

  const onSortChangeHandler = (change) => {
  
    setSelectValue(change);
    let tempData = pokemonsOriginalSort.map(a => {return {...a}}) ;

    if(change.value == "Pokedex"){
      setDisableSort2(true);
    }
  
    if(change.value == "Name"){
      sortByFieldAscPrimary(tempData,"monName", selectValue2.value);
      setDisableSort2(true);
    }

    if(change.value == "Number caught ↑"){
      sortByFieldAscPrimary(tempData,"normalNumber", selectValue2.value);
      setDisableSort2(false);
    }

    if(change.value == "Number caught ↓"){
      sortByFieldDescPrimary(tempData,"normalNumber", selectValue2.value);
      setDisableSort2(false);
    }

    if(change.value == "Shiny's caught ↑"){
      sortByFieldAscPrimary(tempData,"shinyNumber", selectValue2.value);
      setDisableSort2(false);
    }

    if(change.value == "Shiny's caught ↓"){
      sortByFieldDescPrimary(tempData,"shinyNumber", selectValue2.value);
      setDisableSort2(false);
    }

    if(change.value == "Rarity ↑"){
      sortByFieldAscPrimary(tempData,"rarityNumber", selectValue2.value);
      setDisableSort2(false);
    }
  
    if(change.value == "Rarity ↓"){
      sortByFieldDescPrimary(tempData,"rarityNumber", selectValue2.value);
      setDisableSort2(false);
    }
    
    setItems2(tempData) ;
  };

  
  const onSortChangeHandler2 = (change) => {
  
    setSelectValue2(change);
    let tempData = pokemonsOriginalSort.map(a => {return {...a}}) ;
    if(selectValue.value == "Name"){
      sortByFieldAscPrimary(tempData,"monName",change.value);
    }


    if(selectValue.value == "Number caught ↑"){
      sortByFieldAscPrimary(tempData,"normalNumber",change.value);
    }

    if(selectValue.value == "Number caught ↓"){
      sortByFieldDescPrimary(tempData,"normalNumber",change.value);
    }

    if(selectValue.value == "Shiny's caught ↑"){
      sortByFieldAscPrimary(tempData,"shinyNumber",change.value);
    }

    if(selectValue.value == "Shiny's caught ↓"){
      sortByFieldDescPrimary(tempData,"shinyNumber",change.value);
    }

    if(selectValue.value == "Rarity ↑"){
      sortByFieldAscPrimary(tempData,"rarityNumber",change.value);
    }
  
      if(selectValue.value == "Rarity ↓"){
        sortByFieldDescPrimary(tempData,"rarityNumber",change.value);
      }
    

    setItems2(tempData) ;
  };


  return (
<div className="wholeSite">
    <div className="content">
   
      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Hatch & Catch Pokedex</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>
      <div className='selectorWrapper'>
      <div className='selector'>
           <h4 className='selectTitle'>
            User:
            </h4><div className='selectAndTooltip' >
              <Select className='selectorSelect' value={userValue} options={users} onChange={onChangeHandler}  defaultValue={"User"}></Select>
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
      <div className='sortSelectContainer' ><h4 className='selectTitle'>Primary sort:</h4> <Select isDisabled={hasData} className='sortSelect'  options={sortOptions} onChange={onSortChangeHandler}  value={selectValue}></Select>
      </div>
      <div className='sortSelectContainer' ><h4 className='selectTitle'>Secondary sort:</h4> <Select isDisabled={hasData || disableSort2} className='sortSelect'  options={sortOptions} onChange={onSortChangeHandler2}  value={selectValue2}></Select>
      </div>
      </div>
     <div className='entries'> 
          {

        items2.map(function (el, index) { 

         return <div key={el.key} className={"entryBorder" + index %4 + " entry"}>
          <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
          normalNumber={el.normalNumber}  shinyNumber={el.shinyNumber} name={el.monName} exclusiveTo={el.exclusiveTo} setting={pokemonsettings.find((set)=>set.pokedex == el.pokedex)}
          rarity={el.rarity}></PokedexEntry>
           </div>})
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


