import React, { useState, useEffect } from 'react';

import 'react-tooltip/dist/react-tooltip.css'
import PokedexPage from './PokedexPage';
import DoubleFinder from './DoubleFinder';
import InfoPage from './InfoPage';
import RankingsPage from './RankingsPage';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './GeneralComponent.css'
import CompareDexPage from './CompareDexPage';
import SupportPage from './SupportPage';
import SettingPage from './SettingPage';
import DBResource from './DBResource'
export default function GeneralComponent() {
    const resource = new DBResource();
    const date = new Date();
    const [logedInUser, setLogedInUser] = useState('');
    const [userImage, setUserImage] = useState('');
    const [menuShown, setMenuShown] = useState(false);
    const showTime = date.getHours() 
        + ':' + date.getMinutes() ;
    let navigate = useNavigate();


    useEffect(() => {
      (async () => {
        let user = await resource.getUser();
        setLogedInUser(user?.user_metadata?.full_name);
        setUserImage(user?.user_metadata?.avatar_url);
        
      }
      )();},[]);

    const routeChange = () =>{ 
      let path = `doubleFinder`; 
      navigate(path);
    }
  
    const routeToInfo = () =>{ 
      let path = `info`; 
      navigate(path);
    }

    const routeToDex = () =>{ 
      let path = `/`; 
      navigate(path);
    }

    const routeToRanking = () =>{ 
      let path = `ranking`; 
      navigate(path);
    }

    const routeToDexCompare = () =>{ 
      let path = `dexcompare`; 
      navigate(path);
    }

    const routeToSupport = () => {
      let path = 'support';
      navigate(path);
    }

    const onLoginClick = () =>{ 
      resource.signInWithTwitch();
    }

    const onLogoutClick = () =>{ 
      resource.signOutWithTwitch();
    }

    
    const routeToSetting = () => {
      let path = 'settings';
      navigate(path);
    }

    const showMenu = () => {
      setMenuShown(true);
    }


    const hideMenu = () => {
      setMenuShown(false);
    }


    useEffect(() => {
          const img = new Image();
          img.src = '/menuItemSelectedPokedex.png';
          const img2 = new Image();
          img2.src = '/menuItempokefindselected.png';
          const img3 = new Image();
          img3.src = '/menuItemoverviewSelected.png';
          const img4 = new Image();
          img4.src = '/menuItemRankingSelected.png';
          const img5 = new Image();
          img5.src = '/menuItemDexCompareSelected.png'
      });
  
    
  
    return (
      <div>
          <div className='menuTopDecorator'><div className='menuTopDecoratorTime'>{showTime}</div><div className='menuTopDecorator'><img src={logedInUser?"/batteryLogedIn.png":"/battery.png"}></img>
          { logedInUser? <div onMouseEnter={showMenu} onMouseLeave={hideMenu}><button className='loginWithTwitchButton'> <img className='loggedInWithTwitchIcon' src={userImage}></img> {logedInUser}</button>
          {menuShown?<button  onClick={onLogoutClick} className='popupMenu'>  <img className='loginWithTwitchIcon' src="/logout.png"></img>  Log Out</button>:''}
          </div>:<button className='loginWithTwitchButton' onClick={onLoginClick} ><img className='loginWithTwitchIcon' src='/twitch-icon.png'></img>Login with Twitch</button>
          }
          </div>
          </div>
          <div className='menu'>
            <button onClick={routeToDex} className='pokedexMenuItemContainer menuItemContainer'></button>
      
            <button onClick={routeChange} className='pokemonFinderMenuItemContainer menuItemContainer'></button>
        
            <button  onClick={routeToInfo} className='overviewMenuItemContainer menuItemContainer'></button>
            <button onClick={routeToRanking} className='rankingsMenuItemContainer menuItemContainer'></button>
            <button onClick={routeToDexCompare} className='rankingsMenuItemDexCompare menuItemContainer'></button>
            <button onClick={routeToSupport} className='supportMenuItemContainer menuItemContainer'></button>
            <button onClick={routeToSetting} className='settingsMenuItemContainer menuItemContainer'></button>
          </div>
          <div className='rootDiv'>
        
            <Routes>
              <Route path="/" element={<PokedexPage />}>
              </Route>
              <Route path="/doubleFinder" element={<DoubleFinder />}>
              </Route>
              <Route path="/info" element={<InfoPage />}>
              </Route>
              <Route path="/ranking" element={<RankingsPage />}>
              </Route>
              <Route path="/dexcompare" element={<CompareDexPage />}>
              </Route>
              <Route path='/support' element={<SupportPage/>}></Route>
              <Route path='/settings' element={<SettingPage/>}></Route>
            </Routes>
      
          </div>
      </div>
    )
}