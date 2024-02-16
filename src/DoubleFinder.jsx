import './DoubleFinder.css'
import singletondDbResource from './DBResourceSingleton'
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
    const [isShiny, setIsShiny] = useState(false);


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
    

      const resource = singletondDbResource;

      

      const onChangeHandler = (change) => {
        setPokedex(change.value);
        (async () => {
          console.log("finding users for pokedex:" + change.value);
          let data;
            if(isShiny){
              data = await resource.getUsersWhoOwnShinyPokemon(change.value);
            }else {
              data  = await resource.getUsersWhoOwnPokemon(change.value);
            }
          console.log( data);
          setUsersFound(data);

          let imageUrl2 ;
          if(isShiny){
            imageUrl2 = new URL(
            "/pokemon/Shiny/" + change.value + ".png",
            import.meta.url
          ).href;
          }else{
            imageUrl2 = new URL(
              "/pokemon/Normal/" + change.value + ".png",
              import.meta.url
            ).href;
          }
          setImgUrl(imageUrl2);
          })()
      
      };

      const onShinyChange = (change) => {
        setIsShiny(change.target.checked);
        if(pokedex!=""){
          (async () => {
            console.log("finding users for pokedex:" + change.value);
            let data;
            if(change.target.checked){
              data = await resource.getUsersWhoOwnShinyPokemon(pokedex);
            }else {
              data  = await resource.getUsersWhoOwnPokemon(pokedex);
            }
            
            console.log( data);
            setUsersFound(data);

            let imageUrl2 ;
            if(change.target.checked){
              imageUrl2 = new URL(
              "/pokemon/Shiny/" + pokedex + ".png",
              import.meta.url
            ).href;
            }else{
              imageUrl2 = new URL(
                "/pokemon/Normal/" + pokedex + ".png",
                import.meta.url
              ).href;
            }
            setImgUrl(imageUrl2);
            })()
        }
      };


    return (
<div className="wholeSite">
    <div className="content">
      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Pokemon finder</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>
      <div className='selectorWrapper'>
      <div className='selector'>
           <h4 className='selectTitle'>
            Pokemon:
            </h4><div className='selectAndTooltip'>
             
              <Select className='selectorSelect'  options={pokemon} onChange={onChangeHandler}  defaultValue={"pokemon"}></Select>
              <div className="selectIcon">
              <img data-tooltip-id="my-tooltip"  className='selectIconImg' src="/unown-question.png"></img>
              
              <Tooltip id="my-tooltip" 
                place="top"
                effect='solid'
                content="The pokemon that you wanna search for"/>
            </div>
            </div>
      </div>
      <div className='shiny'>
      <h4 className='selectTitle'>Shiny:</h4>
        <input className='shinyCheckbox' onChange={onShinyChange}  type='checkbox'></input>
      </div>
      </div>
      <div id="data" className='dataContainer'>
        
        {
        usersFound.map(function (el, index) {
        return <div className={"entryBorder" + index %5 + " userContainer"}>
          <div className='userText'><b>{el.currentOwner} </b> owns: <b>{el.count} </b></div>
         <div className='userImagesContainer'>
  
          {
          testArray.map(number => number<=el.count? <img  className='userImage' src= {imgUrl}></img>:'')
          }
         
        </div>
        </div>} )
          }
          {
              pokedex == "" || usersFound.length>0?'':'No Users found who own this pokemon'
          }
    
      </div>
          
</div>

</div>

    );
}