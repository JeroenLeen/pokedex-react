import './DoubleFinder.css'
import DBResource from './DBResource'
import { useNavigate } from "react-router-dom";
import React, { Link, useState, useEffect } from 'react';
import Select from 'react-select'
import { Tooltip } from 'react-tooltip'
export default function DoubleFinder() {

    const [pokemon, setPokemon] = useState([]);
    const [pokedexCalled, setPokedexCalled] = useState(false);
    const [pokedex, setPokedex] = useState("");
    const [usersFound, setUsersFound] = useState([]);
    const [imgUrl, setImgUrl] = useState([]);
    const [testArray, setTestArray] = useState([1,2,3,4,5,6,7,8,9,10]);
    useEffect(() => {
        (async () => {
          if(!pokedexCalled){
            setPokedexCalled(true);
            console.log("calling pokedex:");
            const foundPokemon  = await resource.getPokedex();
            console.log(foundPokemon);
            setPokemon(foundPokemon) ;
          }
        })();},[]);

      //static contextType = ThemeContext;
    
      let navigate = useNavigate(); 
      const resource = new DBResource();

      const routeTodex = () =>{ 
        let path = `/`; 
        navigate(path);
      }

      const routeToSelf = () =>{ 
        let path = ``; 
        navigate(path);
      }

      const onChangeHandler = (change) => {
        setPokedex(change.value);
        (async () => {
          console.log("finding users for pokedex:" + change.value);
          const data  = await resource.getUsersWhoOwnPokemon(change.value);
          console.log( data);
          setUsersFound(data);

          const imageUrl2 = new URL(
            "/pokemon/Normal/" + change.value + ".png",
            import.meta.url
          ).href;
          setImgUrl(imageUrl2);
          })()
      
      };


    return (
<div className="wholeSite">
    <div className="content">
    <div className='menu'>

      <button onClick={routeTodex}  className='pokedexMenuItemContainer menuItemContainer'></button>
      <button onClick={routeToSelf} className='doubleFinderMenuItemContainer menuItemContainer'></button>
      <button className='ExplenationMenuItemContainer menuItemContainer'></button>
      <button className='aboutSiteMenuItemContainer menuItemContainer'></button>
      </div>

      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Pokemon finder</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>
      <div className='selectorWrapper'>
      <div className='selector'>
           <h4 className='selectTitle'>
            Pokemon:
            </h4><div className='selectAndTooltip' >
              <Select className='selectorSelect'  options={pokemon} onChange={onChangeHandler}  defaultValue={"pokemon"}></Select>
              <div className="selectIcon">
              <img data-tooltip-id="my-tooltip"  className='selectIconImg' src="/unown-question.png"></img>
              <Tooltip id="my-tooltip" 
                place="top"
                effect='solid'
                content="The pokemon that you wanna search for. Only doubles will be shown"/>
            </div>
            </div>
      </div>
      </div>
      <div className='dataContainer'>
        
        {
         usersFound.map(el =><div className='userContainer'><div className='userText'>{el.currentOwner}  owns:{el.count} </div>
         <div>
          {
          testArray.map(number => number<=el.count? <img  className='userImage' src= {imgUrl}></img>:'')
          }
          {
              el.count>10?<img  className='userImage' src= "and_more.png"></img>:''
          }
        </div>
        </div> )
          }
    
      </div>
          
</div>

</div>

    );
}