import React, { useState, useEffect } from 'react';

import './SettingPage.css'
export default function SettingPage() {
    const [reveal, setReveal] = useState(false);

    const [logedInUser, setLogedInUser] = useState('');

    const onLoginClick = () =>{ 
        resource.signInWithTwitch();
      }
    
      const getUser = () =>{
        let user = resource.getUser();
        setLogedInUser(user);
      }
    

    return (
        <div>
        <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>SettingsPage</h1><img src="yogieisbar.png" alt="Image" className="logo" />
        </div>
        <div className='loginContainer'>
        <div className='loginExplenation'>To view this page and alter your settings please login with twitch:</div>
        <button className='loginWithTwitchButton' onClick={onLoginClick} ><img className='loginWithTwitchIcon' src='/twitch-icon.png'></img>Login with Twitch</button>
        </div>
        </div>
       
      );
  }