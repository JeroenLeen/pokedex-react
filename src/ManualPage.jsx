import React, { useState, useEffect } from 'react';

import './ManualPage.css'
export default function ManualPage() {
  
    return (
<div className="wholeSite">
    <div className="content">
      <div className="header">
        <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1 className='titleText'>Hatch & Catch Manual</h1><img src="yogieisbar.png" alt="Image" className="logo" />
      </div>

    <h2>Purpose of the game</h2>
    <p>The Hatching 'n catching game is a twitch chat game that can be played alongside the content provided by StreamingFalcon and YogiEisbar. In this game you try to catch or hatch all the pokemons from the first 4 gen's. Pokemons can be obtained in all different kinds of ways, the mmain 3 being raids, hatching and ofcourse catching. Please remember that the game is meant as extra content and not the main purpose of the streams.</p>
        
        <h2>Raids</h2>
        <p>During add breaks the streamer will start the raids. Raids can be joined by typing !j or !join in chat. Once joined you will in the raid until the streamer ends the raid. A Raid looks like this:</p>
       <img className='manualImage' src='raid.png'></img>
       <p>You can see the pokemon that is being caugth in the center. Below the pokemon you see a bar that represents it's catch chance. The more trainers join the raid and the higher the class of said trainers the higher the chance of catching the pokemon.</p>

        <h2>The wheel (yogi exclusive)</h2>
        aaaa
        <h2>Safari zone (Falcon exclusive)</h2>
        aaaa
        <h2>Hunts (yogi exclusive)</h2>
        aaaa
        <h2>Packs (Falcon exclusive)</h2>
        aaaa
        <h2>Tokens (yogi exclusive)</h2>
        aaaa
        <h2>Trading</h2>
        aaaa
        <h2>Duels</h2>
        aaaa
        <h2>Dupe economy</h2>
        aaaa
</div>

</div>
      );
  }