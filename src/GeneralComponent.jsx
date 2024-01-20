import React, { useState, useEffect } from 'react';

import 'react-tooltip/dist/react-tooltip.css'
import PokedexPage from './PokedexPage';
import DoubleFinder from './DoubleFinder';
import InfoPage from './InfoPage';
import RankingsPage from './RankingsPage';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './GeneralComponent.css'
export default function GeneralComponent() {

    const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() ;
    let navigate = useNavigate(); 
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
    
  
    return (
      <div>
          <div className='menuTopDecorator'><div className='menuTopDecoratorTime'>{showTime}</div><img src="/battery.png"></img></div>
          <div className='menu'>
            <button onClick={routeToDex} className='pokedexMenuItemContainer menuItemContainer'></button>
      
            <button onClick={routeChange} className='pokemonFinderMenuItemContainer menuItemContainer'></button>
        
            <button  onClick={routeToInfo} className='overviewMenuItemContainer menuItemContainer'></button>
            <button onClick={routeToRanking} className='rankingsMenuItemContainer menuItemContainer'></button>
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
            </Routes>
      
          </div>
      </div>
    )
}