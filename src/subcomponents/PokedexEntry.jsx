import { useState } from 'react';
import './PokedexEntry.css'
import { FaBalanceScale, FaBeer, FaLock, FaSearch } from "react-icons/fa";
import singletondDbResource from './../DBResourceSingleton'
import React, { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';
import { useNavigate } from "react-router-dom";
export default function PokedexEntry(  props) {

  const resource = singletondDbResource;
  let navigate = useNavigate();
        const imageUrl2 = new URL(
        "/pokemon/Normal/" + props.pokedexEntryNumber + ".png",
        import.meta.url
      ).href;


      const saveSettings = () =>{ 
        (async () => {
        if(props.setting?.id){
          let data = await resource.updatePokemonSettings(props.setting, !props.setting?.wanttrade);
          if(data==null){

          }else{
            props.valuechange(props.pokedexEntryNumber, data[0]);
 
          }
        }else{
          let data = await resource.savePokemonSettings(props.pokedexEntryNumber, !props.setting?.wanttrade);
          if(data==null){
  
          }else{
            props.valuechange(props.pokedexEntryNumber, data[0]);
          
          }
        }
      })();
    }

    const routeChange = () =>{ 
      let path = `/doubleFinder?pokedex=` +props.pokedexEntryNumber + '&pokename='+ props.name; 
      navigate(path);
    }

    const changeTrade = () =>{ 
    
     saveSettings();
    }

    return (
      <>
      <div className='exclusiveLogoContainer'>
      {props.exclusiveTo? <img className='exclusiveLogoImg ' src={props.exclusiveTo + ".png"}></img> : ''} 
      <img className='rarityLogoImg' src={props.rarity + ".png"}></img>
      {props.compareEntry? 
        <FaBalanceScale className={props.setting?.wanttrade ?'rarityLogoImg fillGreen':'hide'} />
      :''}
      <FaLock className={props.lock?.id ?'rarityLogoImg fillGreen':'hide'} />
      
      </div>
      <div className={props.shinyNumber && !props.noShine>0?'entry-container-shiny':'entry-container'}>
      <div className="image-container">
      <img src={imageUrl2} alt="Image" className={"image "+ props.rarity} />
      </div>

      <div className="numbers">
       <div> <b>{ props.name }</b></div>
       <div className='number-container'><div className={props.normalNumber>0?'green':'red'}> Normal: { props.normalNumber }</div>
        <div className={props.shinyNumber>0?'green':'red'}>Shiny: {props.shinyNumber }</div></div>
      </div>
      </div>
      {props.compareEntry? '': <div className='actionsLogoContainer'> 
        <button className='buttondiv pointer' onClick={routeChange}>  <FaSearch className='searchLogoImg' /></button>
        <button className='buttondiv pointer' disabled={!props.mydex} onClick={changeTrade}><FaBalanceScale className={!props.mydex? 'disabledbutton':props.setting?.wanttrade ?'tradeLogoImg  fillGreen':'tradeLogoImg' }/></button>

     
      </div>}
     
    </>
    )
  }
  