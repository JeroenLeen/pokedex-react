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
        <p>The Wheel is a post raid event, you will be automatically entered if you enter the raids! It adds all the names of raiders and spins 3 winners. </p>
        <p>1st place wins 5 points and a rare Pokémon. 2nd place wins 3 points and an uncommon Pokémon. 3rd place wins 2 points and a common Pokémon. Each winner has a chance to upgrade their Pokémon by 1 rarity level!</p>
        <p>These points place you on a leaderboard where the top 5 get a guaranteed shiny at the end of each month! </p>
        <p>Entering 3 or more of these during the month also gets your name in the hat for a random shiny at the end of each month! Be in the spin to win!</p>
        <h2>Safari zone (Falcon exclusive)</h2>
        aaaa
        <h2>Hunts (yogi exclusive)</h2>
        <p>Hunts are an opportunity to get and give Pokémon using channel points!</p>
        <p>If you spawn a Hunt you are guaranteed to get a Pokémon of that rarity and it opens up an event for the rest of chat to join in for their chance to find an Egg and get their own Pokémon. All you need to do if you see a hunt spawn is type !hunt or !h and you are in with a chance. If you spawn the hunt yourself you just sit back and relax and wait for your Pokémon</p>
        <p>Common Hunts add an extra for every 10 people who enter, Uncommon add an extra every 15 entries and Rare adds an extra every 20 chatters joining in!</p>
        <p>There is a much increased shiny chance in hunts compared to raids! </p>

        <h2>Packs (Falcon exclusive)</h2>
        <p>Spawning a Pack gives the community a chance to catch Pokémon using channel points!</p>
        <p>When you Spawn a Pack, a number of Pokémon appear depending on the rarity, and whether or not the pack got a lucky upgrade. Only ONE person can catch each of the Pokémon in the pack. As the pack spawner, you are not guaranteed to catch a Pokémon, but you do not need to throw a Pokéball, as you automatically receive a free Ultra Ball for the entire pack, and you are also the only person who is able to catch more than one Pokémon from that pack.</p>
        <p>Everyone else must choose to throw a Pokéball if they would like to catch a Pokémon in a spawned pack. You can only throw ONE BALL PER ENTIRE PACK. You have 1x Ultra Ball, 3x Great Balls, and Unlimited Pokéballs to throw each day. The Ultra Ball that you receive from spawning a pack does NOT count toward your 1x Ultra Ball limit.</p>
        <p>Spawning a pack is a generous contribution to the community, but may also endedd up being a lucrative prospect! If you spawn at least one pack per month, you are entered into the Shiny Raffle at the start of the next month. Lastly, if a pack is going to have a Shiny Pokémon, then EVERY Pokémon in the pack will be Shiny!!</p>
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