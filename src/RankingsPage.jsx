import React, { useState, useEffect } from 'react';
import DBResource from './DBResource'

import Top10 from './top10'
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
  
    const resource = new DBResource();


  
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
          setMostShinyTrainers(mostShinyTrainers);
          setClosestToCompletionTrainers(closestToCompletionTrainers);
          setMostUniqueSeasonalsTrainer(mostUniqueSeasonalsTrainer);
          setBestGifter(bestGifter);
          setBestDueler(bestDueler);
          setBestTrader(bestTrader);
          setMagikarpTrainer(magikarpTrainer);
        }
      })();},[]);
    return (
      <div>
        <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Hatch & Catch rankings</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>
        <div className="top10scontainer">
            <Top10 borderColor='1' title = 'Most Shiny Trainers' firstColumnData = 'currentOwner' secondColumnName='Amount' secondColumnData = 'count' data = {mostShinyTrainers}></Top10>
            <Top10 borderColor='2' title = 'Closest To completed dex' firstColumnData = 'currentOwner' secondColumnName='Amount' secondColumnData = 'count'  data = {closestToCompletionTrainers}></Top10>
            <Top10 borderColor='3' title = 'Most Unique Seasonals' firstColumnData = 'currentOwner' secondColumnName='Amount'  secondColumnData = 'count' data = {mostUniqueSeasonalsTrainer}></Top10>
            <Top10 borderColor='4' title = 'Best Trader' firstColumnData = 'username' secondColumnName='Trades completed'  secondColumnData = 'tradesCompleted' data = {bestTrader}></Top10>
            <Top10 borderColor='0' title = 'Best Dueler' firstColumnData = 'username' secondColumnName='Duels won'  secondColumnData = 'duelsWon' data = {bestDueler}></Top10>
            <Top10 borderColor='1' title = 'Best Gifter'firstColumnData = 'username' secondColumnName='Gifts given'  secondColumnData = 'giftsGiven' data = {bestGifter}></Top10>
            <Top10 borderColor='2' title = 'Most Magikarps Caught'firstColumnData = 'currentOwner' secondColumnName='Magikarps owned'  secondColumnData = 'count' data = {magikarpTrainer}></Top10>

            
        </div>
        </div>
    );
}