import React, { useState, useEffect } from 'react';

import './SettingPage.css'
export default function SettingPage() {
    const [reveal, setReveal] = useState(false);

    function routeChange (){
        setReveal(true);
    }

    return (
        <div>
        <div className="header">
            <img src='/streamingfalcon.png' alt="Image" className="logo" /><h1>SettingPage</h1><img src="yogieisbar.png" alt="Image" className="logo" />
        </div>
        </div>
       
      );
  }