import React, { useState, useEffect } from 'react';
import singletondDbResource from './DBResourceSingleton'
import './YogiWheel.css'
export default function YogiWheel() {
    const resource =singletondDbResource;

    const [dataCalled, setDataCalled] = useState(false);
    const [allWheelData, setAllWheelData] = useState([]);
  
    useEffect(() => {
        (async () => {
          if(!dataCalled){
            setDataCalled(true);
            console.log("calling data:");
            let wheelData = await resource.getAllForTable("yogiwheel");
        
            setAllWheelData(wheelData);
          }
        })();},[]);

  



    return (
        <div>
        <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1 className='titleText'>Yogi Wheel Results</h1><img src="yogieisbar.png" alt="Image" className="logo" />
        </div>
        <div className='tableFlexCenter'>
        <table className='wheeltable'>
        <tbody>
          <tr  className='columns greenBackground'>
            <th></th>
            <th></th>
            <th className='nameColumn'><h3>User</h3></th>
  
            <th className='secondColumn hideSmall'><h3>Firsts</h3> </th>
            <th className='secondColumn hideSmall'><h3>Seconds</h3> </th>
            <th className='secondColumn hideSmall'><h3>Thirds</h3> </th>
            <th  className='secondColumn' ><h3>Points</h3></th>
          </tr>
          {
            allWheelData.map(function (itemData, index) { 
            
              return <tr className={ index%2?'wheelLine grayBackground':'wheelLine gray2Background'} key={itemData.username} >
                <td>{ index == 0?<img className='exclusiveLogoImg' src='Collector_Gold.png'></img> : ''}
          { index == 1?<img className='exclusiveLogoImg' src='Collector_Silver.png'></img> : ''}
          { index == 2?<img className='exclusiveLogoImg' src='Collector_Bronze.png'></img> : ''}</td>
          <td > { itemData.trainerimage?<img className='wheelTrainer' src={ "/trainers/bulk/" +itemData.trainerimage}></img>:<div className='wheelTrainer'></div>}</td>
          <td className='name'>
          { itemData['username']}</td>
         
          <td className='hideSmall'>{itemData.wheelFirsts}</td>
          <td className='hideSmall'>{itemData.wheelSeconds}</td>
          <td className='hideSmall'>{itemData.wheelThirds}</td>
          <td>{itemData['wheelPoints']}</td>
          </tr>})
          }
         
         
            </tbody>
        </table>
        </div>
        </div>
      );
  }