import React, { useState, useEffect } from 'react';
import singletondDbResource from './DBResourceSingleton'
import trainerarray from './PictureArray';
import './SettingPage.css'
import Select from 'react-select'
import DropDownWithImage from './subcomponents/DropDownWithImage';
export default function SettingPage() {
    const [reveal, setReveal] = useState(false);
    const [settings, setSettings] = useState(false);
    const [notFindableTrade, setNotFindableTrade] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [logedInUser, setLogedInUser] = useState('');
    const [confirmMessage, setConfirmMessage] = useState("");
    const [changedetected, setChangedetected] = useState(false);
    const [notFindablePokemonSearch, setNotFindablePokemonSearch] = useState(false);
    const [hidePokedex, setHidePokedex] = useState(false);
    const [trainerValue, setTrainerValue] = useState({});
    const [trainerImage, setTrainerImage] = useState("");
    const [ownedMons, setOwnedMons] = useState([]);
    const [pokedexfav1, setPokedexfav1] = useState({});
    const [pokedexfav2, setPokedexfav2] = useState({});
    const [pokedexfav3, setPokedexfav3] = useState({});
    const [pokedexfav4, setPokedexfav4] = useState({});
    const [pokedexfav5, setPokedexfav5] = useState({});

    const resource = singletondDbResource;
    const saveSettings = () =>{ 
      (async () => {
        debugger;
      if(settings){
        let data = await resource.updateSettings(settings, notFindableTrade,notFindablePokemonSearch, trainerValue.value, hidePokedex,pokedexfav1?.value,pokedexfav2?.value,pokedexfav3?.value,pokedexfav4?.value,pokedexfav5?.value);
        if(data==null){
          showError();
        }else{
          setConfirmMessage("Saved")
          handleSettingsFetch(data,ownedMons);
          setChangedetected(false);
          setTimeout(function() {
            setConfirmMessage(null);
          }, 4000);
        }
      }else{
        let data = await resource.saveSettings(notFindableTrade,notFindablePokemonSearch, trainerValue.value,hidePokedex,pokedexfav1?.value,pokedexfav2?.value,pokedexfav3?.value,pokedexfav4?.value,pokedexfav5?.value);
        if(data==null){
          showError();
        }else{
          setConfirmMessage("Saved")
          handleSettingsFetch(data,ownedMons);
          setChangedetected(false);
          setTimeout(function() {
            setConfirmMessage(null);
          }, 4000);
        }
      }
    })();
 
    }

    function handleSettingsFetch(settingsArray,optionsOwnedMons) {
      if (settingsArray.length > 1) {
        setErrorMessage("Something went wrong, please contact forodor");
      } else if (settingsArray.length == 1) {
        setSettings(settingsArray[0]);
        setNotFindableTrade(settingsArray[0].notFindableTrade);
        setNotFindablePokemonSearch(settingsArray[0].notfindablepokemonsearch);
        setHidePokedex(settingsArray[0].hidedex)
        setTrainerImage("/trainers/bulk/"+settingsArray[0].trainerimage);
        setTrainerValue({label:settingsArray[0].trainerimage?.replace(/\.[^/.]+$/, ""), value:settingsArray[0].trainerimage});
        debugger;
        setPokedexfav1(optionsOwnedMons.find(s=>s.value==settingsArray[0].pokedexextrafav1));
        setPokedexfav2(optionsOwnedMons.find(s=>s.value==settingsArray[0].pokedexextrafav2));
        setPokedexfav3(optionsOwnedMons.find(s=>s.value==settingsArray[0].pokedexextrafav3));
        setPokedexfav4(optionsOwnedMons.find(s=>s.value==settingsArray[0].pokedexextrafav4));
        setPokedexfav5(optionsOwnedMons.find(s=>s.value==settingsArray[0].pokedexextrafav5));
     
      }
    }

    const handleFav1Changed = (fav,value) => {
      setChangedetected(true);
      setPokedexfav1(value);
    }

    const handleFav2Changed = (fav,value) => {
      setChangedetected(true);
      setPokedexfav2(value);
    }

    const handleFav3Changed = (fav,value) => {
      setChangedetected(true);
      setPokedexfav3(value);
    }

    const handleFav4Changed = (fav,value) => {
      setChangedetected(true);
      setPokedexfav4(value);
    }

    const handleFav5Changed = (fav,value) => {
      setChangedetected(true);
      setPokedexfav5(value);
    }

    const showError = () =>{
      setErrorMessage("Something went wrong, please contact forodor");
    }


      useEffect(() => {
        (async () => {
          let user = await resource.getUser();
          setLogedInUser(user?.user_metadata?.full_name);   
          let ownedPokemons = await resource.getUniquePokedexEntries(user?.user_metadata?.full_name);
          let options = ownedPokemons.map(mon=> {return {value:mon.pokedex, label:mon.monName}}) ; 
          debugger;
          setOwnedMons(options);
          let settingsArray = await resource.getSettings();
          handleSettingsFetch(settingsArray,options);
         
  
        }
        )();},[]);

        const onTrainerSelect = ( value) =>{ 
          setChangedetected(true);
          setTrainerValue(value);
          setTrainerImage("/trainers/bulk/"+value.value);
        }
  

    return (
        <div>
        <div className='errorDisplay'>{errorMessage}</div>
        <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1 className='titleText'>SettingsPage</h1><img src="yogieisbar.png" alt="Image" className="logo" />
        </div>
        <div className='confirmDisplayContainer'>{confirmMessage?<div className='confirmDisplay'>{confirmMessage}</div>:''}</div>
        <div className='loginContainer'>
        <div className='loginExplenation'>To change settings on this page please login with twitch:</div>
        <div>Hide me on pokedex compare <input disabled={!logedInUser} checked={notFindableTrade}  onChange={event => {
            setChangedetected(true);
            setNotFindableTrade(!notFindableTrade);
          }} type='checkbox'></input></div>
           <div>Hide me on pokemon search <input disabled={!logedInUser} checked={notFindablePokemonSearch}  onChange={event => {
            setChangedetected(true);
            setNotFindablePokemonSearch(!notFindablePokemonSearch);
          }} type='checkbox'></input></div>
          <div>Hide my pokedex <input disabled={!logedInUser} checked={hidePokedex}  onChange={event => {
            setChangedetected(true);
            setHidePokedex(!hidePokedex);
          }} type='checkbox'></input></div>
          <div  className='trainerContainer'>  Trainer (<a href='https://play.pokemonshowdown.com/sprites/trainers/'>Full list here</a>): <Select className='trainerSelect' isDisabled={!logedInUser} value={trainerValue} options={trainerarray} onChange={onTrainerSelect} ></Select></div>
          <div>  <img src= {trainerImage}></img></div>
          <div className='extraFavContainer'>
            <div  className="extraFav">  <DropDownWithImage  number={1} data={pokedexfav1} valueChange={handleFav1Changed} options={ownedMons} title={'Extra fav1'}></DropDownWithImage></div>
        
            <div  className="extraFav"> <DropDownWithImage number={2}  data={pokedexfav2} valueChange={handleFav2Changed}  options={ownedMons} title={'Extra fav2'}></DropDownWithImage></div>
            <div  className="extraFav"> <DropDownWithImage number={3}  data={pokedexfav3}  valueChange={handleFav3Changed}  options={ownedMons} title={'Extra fav3'}></DropDownWithImage></div>
            <div  className="extraFav"> <DropDownWithImage number={4}  data={pokedexfav4} valueChange={handleFav4Changed}  options={ownedMons} title={'Extra fav4'}></DropDownWithImage></div>
            <div  className="extraFav"> <DropDownWithImage number={5}  data={pokedexfav5}  valueChange={handleFav5Changed}  options={ownedMons} title={'Extra fav5'}></DropDownWithImage></div>
            </div>
        <div  className='savebuttonContainer'><button  className='savebutton' onClick={saveSettings} disabled={!logedInUser || !changedetected}>Save settings</button></div>
        </div>
        </div>
       
      );


  }