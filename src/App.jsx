import React, { useState, useEffect } from 'react';
import './App.css'
import DBResource from './DBResource'
import PokedexEntry from './PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function App() {
  //static contextType = ThemeContext;


  const resource = new DBResource();


  //const items2 = useRef([]);

  const [items2, setItems2] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCalled, setUsersCalled] = useState(false);
  const [usersName, setUserName] = useState(false);
  const [pokemonCaugth, setPokemonCaugth] = useState(0);
  const [uniquePokemonCaugth, setUniquePokemonCaugth] = useState(0);
  const [totalShinyCaugth, setTotalShinyCaugth] = useState(0);

  function refreshData() {
    (async () => {
        console.log("finding pokemon for:" + usersName);
        const data  = await resource.getUniquePokedexEntries(usersName)
        setItems2(data) ;
  })()
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
  
    setUserName(change.value);
    (async () => {
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
      setUniquePokemonCaugth( data.filter((entry) => entry.normalNumber > 0 | entry.shinyNumber > 0 ).length);
      setItems2(data) ;
      let menu =       "<div className='menu'>"+
      "<div className='pokedexMenuItemContainer menuItemContainer'></div>"+
      "<div className='doubleFinderMenuItemContainer menuItemContainer'></div>"+
      "<div className='ExplenationMenuItemContainer menuItemContainer'></div>"+
      "<div className='aboutSiteMenuItemContainer menuItemContainer'></div>"+
      "</div>"


      })()
  };
  return (
    <>
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
      <div className='generalData'>  
        <div><img className='legendLogo' src="/Common.png"></img> = Common </div>
        <div><img className='legendLogo' src="/Uncommon.png"></img> = Uncommon </div>
        <div><img className='legendLogo' src="/Rare.png"></img> = Rare </div>
        <div><img className='legendLogo' src="/Legendary.png"></img> = Legendary </div>
        <div><img className='legendLogo' src="/yogieisbar.png"></img> = Yogieisbar exclusive </div>
        <div><img className='legendLogo' src="/streamingfalcon.png"></img> = Streamingfalcon exclusive </div>
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
    </>
  )
}


