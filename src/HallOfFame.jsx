import React, { useState, useEffect } from 'react';
import singletondDbResource from './DBResourceSingleton'

import './HallOfFame.css'
import Select from 'react-select'
export default function HallOfFame() {
    const [dataCalled, setDataCalled] = useState(false);
    const [hallOfFame, setHallOfFame] = useState([]);
    const resource = singletondDbResource;

    useEffect(() => {
        (async () => {
          if(!dataCalled){
            setDataCalled(true);
            console.log("calling data:");
            const halloffame = await resource.getAllForTable('halloffame');
           debugger;
            setHallOfFame(halloffame);
           
          }
        })();},[]);

    return (
        <div>
        <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Hall of fame</h1><img src="yogieisbar.png" alt="Image" className="logo" />
        </div>
        <div className='hofentries'> 
        {

    hallOfFame.map(function (el, index) { 
        return <div  className={"entryBorder" + index %4 + " entry hallOfFameContainer"}> 
            <div><h2>Hatch & Catch Champion</h2></div>
            <div className='hallOfFameEntry'>
                <div className='hallOfFameBackground'>
                    <div className='trainerdiv'><img className='trainer' src={ el.trainerimage?"/trainers/bulk/" +el.trainerimage:"/trainers/bulk/pokemaniac-gen3.png"}></img><div className='emptydiv'></div></div>
                    <div className='favdiv'><img className='fav' src={el.shiny?"/pokemon/Shiny/"+ el.pokedex+".png":"/pokemon/Normal/"+ el.pokedex+".png"}></img><div className='emptydiv'></div></div>
                </div>
            </div>
            <div className='userdata'><h2>{el.dexCompletedDate}</h2><h2>{el.username}</h2></div>
        </div>
       return 
        })
        }
        </div>
        </div>

       
      );


  }