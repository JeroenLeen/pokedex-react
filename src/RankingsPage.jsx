import React, { useState, useEffect } from 'react';
import singletondDbResource from './DBResourceSingleton'

import Top10 from './subcomponents/top10'
import './RankingsPage.css'

export default function RankingsPage() {

    const [dataCalled, setDataCalled] = useState(false);
    const [mostShinyTrainers, setMostShinyTrainers] = useState([]);
    const [closestToCompletionTrainers, setClosestToCompletionTrainers] = useState([]);
    const [mostUniqueSeasonalsTrainer, setMostUniqueSeasonalsTrainer] = useState([]);
    const [bestGifter, setBestGifter] = useState([]);
    const [bestDueler, setBestDueler] = useState([]);
    const [bestTrader, setBestTrader] = useState([]);
    const [magikarpTrainer, setMagikarpTrainer] = useState([]);
    const [yogivsfalcon, setYogivsfalcon] = useState([]);
    const [pokemonCaugthRank, setPokemonCaugthRank] = useState([]);
    const [birthday, setBirthday] = useState([{name:"YogiEisbar", value: 30},{name:"YogiEisbar", value: 29},{name:"YogiEisbar", value: 28},{name:"YogiEisbar", value: 27},{name:"YogiEisbar", value: 26},{name:"YogiEisbar", value: 25},{name:"YogiEisbar", value: 24},{name:"YogiEisbar", value: 23},{name:"YogiEisbar", value: 22},{name:"YogiEisbar", value: 21}]);

    const resource = singletondDbResource;



  
    useEffect(() => {
      (async () => {
        if(!dataCalled){
          setDataCalled(true);
          console.log("calling data:");
          const mostShinyTrainers = await resource.getAllForTable('mostShinyTrainers');
          const closestToCompletionTrainers = await resource.getAllForTable('closesttocompletiontrainers');
          const mostUniqueSeasonalsTrainer = await resource.getAllForTable('mostuniqueseasonalstrainer');
          const bestGifter = await resource.getAllForTable('bestgifter');
          const bestTrader = await resource.getAllForTable('besttrader');
          const bestDueler = await resource.getAllForTable('bestdueler');
          const magikarpTrainer = await resource.getAllForTable('magikarpTrainer');
          const yogivsfalcon = await resource.getAllForTable('yogivsfalcon');
          const pokemonCaugthRank = await resource.getAllForTable('pokemonCaugthRank');
          setMostShinyTrainers(mostShinyTrainers);
          setClosestToCompletionTrainers(closestToCompletionTrainers);
          setMostUniqueSeasonalsTrainer(mostUniqueSeasonalsTrainer);
          setBestGifter(bestGifter);
          setBestDueler(bestDueler);
          setBestTrader(bestTrader);
          setMagikarpTrainer(magikarpTrainer);
          setYogivsfalcon(yogivsfalcon);
          setPokemonCaugthRank(pokemonCaugthRank);
        }
      })();},[]);
    return (
      <div>
        <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1 className='titleText'>Hatch & Catch rankings</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>
        <div className="top10scontainer">
            <Top10 borderColor='1'  firstColumnName='User' title = 'Most Shiny Trainers' firstColumnData = 'currentOwner' secondColumnName='Amount' secondColumnData = 'count' double={false}  data = {mostShinyTrainers}></Top10>
            <Top10 borderColor='2' firstColumnName='User' title = 'Closest To completed dex' firstColumnData = 'currentOwner' secondColumnName='Amount' secondColumnData = 'count'  data = {closestToCompletionTrainers}></Top10>
            <Top10 borderColor='3' firstColumnName='User' title = 'Most Unique Seasonals' firstColumnData = 'currentOwner' secondColumnName='Amount'  secondColumnData = 'count' data = {mostUniqueSeasonalsTrainer}></Top10>
            <Top10 borderColor='4' firstColumnName='User' title = 'Best Trader' firstColumnData = 'username' secondColumnName='Trades completed'  secondColumnData = 'tradesCompleted' data = {bestTrader}></Top10>
            <Top10 borderColor='0' firstColumnName='User' title = 'Best Dueler' firstColumnData = 'username' secondColumnName='Duels won'  secondColumnData = 'duelsWon' data = {bestDueler}></Top10>
            <Top10 borderColor='1' firstColumnName='User' title = 'Best Gifter'firstColumnData = 'username' secondColumnName='Gifts given'  secondColumnData = 'giftsGiven' data = {bestGifter}></Top10>
            <Top10 borderColor='4' firstColumnName='User' title = 'Most of single pokemon' firstColumnData = 'currentOwner' secondColumnName='Pokemon' thirdColumnName='Caught on stream'  secondColumnData = 'monName' thirdColumnData = 'count' data = {pokemonCaugthRank}></Top10>
            <Top10 borderColor='2' firstColumnName='User' title = 'Most Magikarps Caught'firstColumnData = 'currentOwner' secondColumnName='Magikarps owned'  secondColumnData = 'count' double='true' data = {magikarpTrainer}></Top10>
            <Top10 borderColor='3' firstColumnName='Streamer' title = 'Yogi vs Falcon (last 7 days)'firstColumnData = 'acquiredAt' secondColumnName='Caught on stream'  secondColumnData = 'count' data = {yogivsfalcon}></Top10>
            <Top10 borderColor='4' firstColumnName='Yogi' title = 'Years lived as yogi'firstColumnData = 'name' secondColumnName='Years'  secondColumnData = 'value' data = {birthday}></Top10>
           
            
        </div>
        </div>
    );
}