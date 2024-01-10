import React, { useState, useEffect } from 'react';
import './App.css'
import DBResource from './DBResource'
import PokedexEntry from './PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import PokedexPage from './PokedexPage';
import DoubleFinder from './DoubleFinder';
import InfoPage from './InfoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokedexPage />}>
        </Route>
        <Route path="/doubleFinder" element={<DoubleFinder />}>
        </Route>
        <Route path="/info" element={<InfoPage />}>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}


