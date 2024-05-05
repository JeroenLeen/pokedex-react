import { useState } from 'react';
import './PokedexEntry.css'
import { FaBalanceScale, FaBeer, FaLock, FaSearch } from "react-icons/fa";
import singletondDbResource from './../DBResourceSingleton'
import React, { useEffect } from 'react';

import Select from 'react-select'
import './DropDownWithImage.css'
export default function DropDownWithImage(  props) {

    const onItemSelect = ( value) =>{ 
        props.valueChange(props.number,value);
      }


    return (
      <>
      <div className='DDIContainer'> 
            <div  className='DDITitle'>  {props.title}:      </div>
            <img className='DDIImage' src={props.data?.value?"/pokemon/Normal/" + props.data?.value + ".png":"transparant.png"} ></img>
            <Select className='DDISelect DDIDopdownText'  options={props.options} value={props.data}  onChange={onItemSelect}></Select>
       
          <div> </div></div>
     
    </>
    )
  }
  