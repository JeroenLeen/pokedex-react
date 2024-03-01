import React, { useState, useEffect } from 'react';
import singletondDbResource from './DBResourceSingleton'
import trainerarray from './PictureArray';
import './SettingPage.css'
import Select from 'react-select'
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
    const resource = singletondDbResource;
    const saveSettings = () =>{ 
      (async () => {
      if(settings){
        debugger;
        let data = await resource.updateSettings(settings, notFindableTrade,notFindablePokemonSearch, trainerValue.value, hidePokedex);
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
        debugger;
        let data = await resource.saveSettings(notFindableTrade,notFindablePokemonSearch, trainerValue.value,hidePokedex);
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
      }
    })();
 
    }

    function handleSettingsFetch(settingsArray) {
      if (settingsArray.length > 1) {
        setErrorMessage("Something went wrong, please contact forodor");
      } else if (settingsArray.length == 1) {
        setSettings(settingsArray[0]);
        setNotFindableTrade(settingsArray[0].notFindableTrade);
        setNotFindablePokemonSearch(settingsArray[0].notfindablepokemonsearch);
        setHidePokedex(settingsArray[0].hidedex)
        setTrainerImage("/trainers/bulk/"+settingsArray[0].trainerimage);
        setTrainerValue({label:settingsArray[0].trainerimage?.replace(/\.[^/.]+$/, ""), value:settingsArray[0].trainerimage});
      }
    }

    const showError = () =>{
      setErrorMessage("Something went wrong, please contact forodor");
    }


      useEffect(() => {
        (async () => {
          let user = await resource.getUser();
          setLogedInUser(user?.user_metadata?.full_name);   
          let settingsArray = await resource.getSettings();
          handleSettingsFetch(settingsArray);
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
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>SettingsPage</h1><img src="yogieisbar.png" alt="Image" className="logo" />
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
        <div  className='savebuttonContainer'><button  className='savebutton' onClick={saveSettings} disabled={!logedInUser || !changedetected}>Save settings</button></div>
        </div>
        </div>
       
      );


  }