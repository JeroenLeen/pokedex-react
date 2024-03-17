import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { Link, useState, useEffect } from 'react';
import singletondDbResource from './DBResourceSingleton'
import PokedexEntry from './subcomponents/PokedexEntry'
import Top10 from './subcomponents/top10'
import Select from 'react-select'
import './infoPage.css'
export default function PokedexPage() {
  let navigate = useNavigate(); 
  const [dataCalled, setDataCalled] = useState(false);
  const [data, setData] = useState([]);
 
  const sortOptions = [{value:"Pokedex", label:"Pokedex"},
  {value:"Name", label:"Name"},{value:"Number caught ↑", label:"Number caught ↑"},{value:"Number caught ↓", label:"Number caught ↓"}
  ,{value:"Shiny's caught ↑", label:"Shiny's caught ↑"},{value:"Shiny's caught ↓", label:"Shiny's caught ↓"}
  ,{value:"Rarity ↑", label:"Rarity ↑"},{value:"Rarity ↓", label:"Rarity ↓"}]
  const [selectValue,setSelectValue] = useState({value:"Pokedex", label:"Pokedex"});
  const [pokemonsOriginalSort, setPokemonsOriginalSort] = useState([]);

  const resource =singletondDbResource;
  

  useEffect(() => {
    (async () => {
      if(!dataCalled){
        setDataCalled(true);
        console.log("calling data:");
        const foundData  = await resource.getTotalPokemonOverview();
        setData(foundData) ;
        setPokemonsOriginalSort(foundData);

      }
    })();},[]);
  
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
      if(change.value == "Number caught ↑"){
        tempData.sort(function (a, b) {
          if (a.normalCount < b.normalCount) {
            return -1;
          }
          if (a.normalCount > b.normalCount) {
            return 1;
          }
          return 0;
        });
      }
  
      if(change.value == "Number caught ↓"){
        tempData.sort(function (a, b) {
          if (a.normalCount > b.normalCount) {
            return -1;
          }
          if (a.normalCount < b.normalCount) {
            return 1;
          }
          return 0;
        });
      }
  
      if(change.value == "Shiny's caught ↑"){
        tempData.sort(function (a, b) {
          if (a.shinyCount < b.shinyCount) {
            return -1;
          }
          if (a.shinyCount > b.shinyCount) {
            return 1;
          }
          return 0;
        });
      }
  
      if(change.value == "Shiny's caught ↓"){
        tempData.sort(function (a, b) {
          if (a.shinyCount > b.shinyCount) {
            return -1;
          }
          if (a.shinyCount < b.shinyCount) {
            return 1;
          }
          return 0;
        });
      }
  
      if(change.value == "Rarity ↑"){
        tempData.sort(function (a, b) {
          if (a.rarityNumber < b.rarityNumber) {
            return -1;
          }
          if (a.rarityNumber > b.rarityNumber) {
            return 1;
          }
          return 0;
        });
      }
    
        if(change.value == "Rarity ↓"){
          tempData.sort(function (a, b) {
            if (a.rarityNumber > b.rarityNumber) {
              return -1;
            }
            if (a.rarityNumber < b.rarityNumber) {
              return 1;
            }
            return 0;
          });
        }
      
  
      setData(tempData) ;
    };


  
    return (
<div className="wholeSite">
    <div className="content">
      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1 className='titleText'>Hatch & Catch overview</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>


       <div className='sortContainer'>
            <div className='sortSelectContainer' ><h4 className='selectTitle'>Sort:</h4> <Select className='sortSelect'  options={sortOptions} onChange={onSortChangeHandler}  value={selectValue}></Select>
            </div>
            </div>
            <div className='entries'> 
            {
           data.map(function (el, index) { 

            return <div key={el.key} className={"entryBorder" + index %5 + " entry"}>
            <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
            normalNumber={el.normalCount}  shinyNumber={el.shinyCount} name={el.monName}  exclusiveTo={el.exclusiveTo} noShine={true}
            rarity={el.rarity}></PokedexEntry>
            </div>})
            }
        </div>
  
      
</div>

</div>
  )

 
}

