import React, { useState, useEffect } from 'react';

import './SupportPage.css'
export default function SupportPage() {
    const [reveal, setReveal] = useState(false);

    function routeChange (){
        setReveal(true);
    }

    return (
        <div>
  
        <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>Support the devs</h1><img src="yogieisbar_birthday.png" alt="Image" className="logo" />
        </div>
        <div>
            <div>
            Would you like to support Monkey & Aylex for 'totaly unrelated reasons' then feel free to make a donation here:
            </div>
            <button  onClick={routeChange}  className={reveal?'hide':''}>reveal</button>
            <div className={reveal?'show':'hide'}> <a href="https://www.paypal.com/"><img className='paypalLogo' src='/paypal-logo.jpg'></img></a> Donate to: jenniferprytz@gmail.com</div>

            <div className="monkeyAylexImagePlacer">         <div className="monkeyAylexImageContainer"><img className="monkeyAylexImage" src="/logoDesign.png"></img></div></div>
   
        </div>
        </div>
      );
  }