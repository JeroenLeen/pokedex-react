import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, { Link, useState, useEffect } from 'react';
import DBResource from './DBResource'
import PokedexEntry from './PokedexEntry'
import Top10 from './top10'
import Select from 'react-select'
import './infoPage.css'
export default function PokedexPage() {
  let navigate = useNavigate(); 
  const [dataCalled, setDataCalled] = useState(false);
  const [data, setData] = useState([]);
  const [mostShinyTrainers, setMostShinyTrainers] = useState([]);
  const [closestToCompletionTrainers, setClosestToCompletionTrainers] = useState([]);
  const sortOptions = [{value:"Pokedex", label:"Pokedex"},
  {value:"Name", label:"Name"},{value:"Number caught ↑", label:"Number caught ↑"},{value:"Number caught ↓", label:"Number caught ↓"}
  ,{value:"Shiny's caught ↑", label:"Shiny's caught ↑"},{value:"Shiny's caught ↓", label:"Shiny's caught ↓"}
  ,{value:"Rarity ↑", label:"Rarity ↑"},{value:"Rarity ↓", label:"Rarity ↓"}]
  const [selectValue,setSelectValue] = useState({value:"Pokedex", label:"Pokedex"});
  const [pokemonsOriginalSort, setPokemonsOriginalSort] = useState([]);
  const [mostUniqueSeasonalsTrainer, setMostUniqueSeasonalsTrainer] = useState([]);
  const [bestGifter, setBestGifter] = useState([]);
  const [bestDueler, setBestDueler] = useState([]);
  const [bestTrader, setBestTrader] = useState([]);

  const resource = new DBResource();
  const routeToDouble = () =>{ 
    let path = `/doubleFinder`; 
    navigate(path);
  }

  const routeToDex = () =>{ 
    let path = `/`; 
    navigate(path);
  }

  useEffect(() => {
    (async () => {
      if(!dataCalled){
        setDataCalled(true);
        console.log("calling data:");
        const foundData  = await resource.getTotalPokemonOverview();
        const mostShinyTrainers = await resource.getTopShinyTrainers();
        const closestToCompletionTrainers = await resource.getClosestToCompletionTrainers();
        const mostUniqueSeasonalsTrainer = await resource.getMostUniqueSeasonalsTrainer();
        const bestGifter = await resource.getBestGifter();
        const bestTrader = await resource.getBestTrader();
        const bestDueler = await resource.getBestDueler();
        setMostShinyTrainers(mostShinyTrainers);
        setData(foundData) ;
        setPokemonsOriginalSort(foundData);
        setClosestToCompletionTrainers(closestToCompletionTrainers);
        setMostUniqueSeasonalsTrainer(mostUniqueSeasonalsTrainer);
        setBestGifter(bestGifter);
        setBestDueler(bestDueler);
        setBestTrader(bestTrader);
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
    <div className='menu'>

      <button  onClick={routeToDex} className='pokedexMenuItemContainer menuItemContainer'></button>
 
      <button onClick={routeToDouble} className='doubleFinderMenuItemContainer menuItemContainer'></button>
   
      <button className='ExplenationMenuItemContainer menuItemContainer'></button>
      <button className='aboutSiteMenuItemContainer menuItemContainer'></button>
      </div>

      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Hatch & Catch data</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>

      <Tabs>
        <TabList>
        <Tab><h2>Pokemon overview</h2></Tab>
        <Tab><h2>LeaderBoards</h2></Tab>
        </TabList>

        <TabPanel>
            <div className='sortContainer'>
            <div className='sortSelectContainer' ><h4 className='selectTitle'>Sort:</h4> <Select className='sortSelect'  options={sortOptions} onChange={onSortChangeHandler}  value={selectValue}></Select>
            </div>
            </div>
            <div className='entries'> 
            {
            data.map(el =>  <div key={el.key} className="entry">
            <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
            normalNumber={el.normalCount}  shinyNumber={el.shinyCount} name={el.monName}  exclusiveTo={el.exclusiveTo} noShine={true}
            rarity={el.rarity}></PokedexEntry>
            </div>)
            }
        </div>
        </TabPanel>
        <TabPanel>
          <div className="top10scontainer">
            <Top10 title = 'Most Shiny Trainers' firstColumnData = 'currentOwner' secondColumnData = 'count' data = {mostShinyTrainers}></Top10>
            <Top10 title = 'Closest To completed dex' firstColumnData = 'currentOwner' secondColumnData = 'count'  data = {closestToCompletionTrainers}></Top10>
            <Top10 title = 'Most Unique Seasonals' firstColumnData = 'currentOwner' secondColumnData = 'count' data = {mostUniqueSeasonalsTrainer}></Top10>
            <Top10 title = 'Best Trader' firstColumnData = 'username' secondColumnData = 'tradesCompleted' data = {bestTrader}></Top10>
            <Top10 title = 'Best Dueler' firstColumnData = 'username' secondColumnData = 'duelsWon' data = {bestDueler}></Top10>
            <Top10 title = 'Best Gifter'firstColumnData = 'username' secondColumnData = 'giftsGiven' data = {bestGifter}></Top10>
            </div>
        </TabPanel>
    </Tabs>
      
</div>

</div>
  )

 
}

