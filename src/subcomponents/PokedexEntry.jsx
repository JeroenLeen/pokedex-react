import { useState } from 'react';
import './PokedexEntry.css'
import { FaBalanceScale, FaBeer, FaSearch } from "react-icons/fa";
export default function PokedexEntry(  props) {
        const [pokemonSettings, setPokemonSettings] = useState({});
        const imageUrl2 = new URL(
        "/pokemon/Normal/" + props.pokedexEntryNumber + ".png",
        import.meta.url
      ).href;

      const showError = () =>{
        setErrorMessage("Something went wrong, please contact forodor");
      }
  

      const saveSettings = () =>{ 
        (async () => {
        if(pokemonSettings?.id){
          let data = await resource.updatePokemonSettings(pokemonSettings, tradeable);
          if(data==null){
            showError();
          }else{
            setConfirmMessage("Saved")
            handleSettingsFetch(data);
            setChangedetected(false);
            setTimeout(function() {
              setConfirmMessage(null);
            }, 4000);
          }
        }else{
          let data = await resource.savePokemonSettings(tradeable);
          if(data==null){
           // showError();
          }else{
            /*
           setConfirmMessage("Saved")
            handleSettingsFetch(data);
            setChangedetected(false);
            setTimeout(function() {
              setConfirmMessage(null);
            }, 4000);*/
          }
        }
      })();
    }


    const changeTrade = () =>{ 
      debugger;
     if(pokemonSettings?.wanttrade){
      setPokemonSettings({...pokemonSettings, wanttrade: false});
     }else{
      setPokemonSettings({...pokemonSettings, wanttrade: true});
     }
     saveSettings();
    }

    return (
      <>
      <div className='exclusiveLogoContainer'>
      <div> {props.exclusiveTo? <img className='exclusiveLogoImg ' src={props.exclusiveTo + ".png"}></img> : ''} </div>
      <img className='rarityLogoImg' src={props.rarity + ".png"}></img>
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
      <div className='exclusiveLogoContainer'> 
        <FaSearch className='searchLogoImg' />
        <FaBalanceScale className={pokemonSettings?.wanttrade ?'tradeLogoImg fillGreen':'tradeLogoImg'} onClick={changeTrade} />
      </div>
    </>
    )
  }
  