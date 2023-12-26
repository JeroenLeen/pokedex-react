import React, { useState, useEffect } from 'react';
import './App.css'
import DBResource from './DBResource'
import PokedexEntry from './PokedexEntry'
import Select from 'react-select'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function App() {
  //static contextType = ThemeContext;


  const resource = new DBResource();


  //const items2 = useRef([]);

  const [items2, setItems2] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCalled, setUsersCalled] = useState(false);
  const [usersName, setUserName] = useState(false);

  function refreshData() {
    (async () => {
        console.log("finding pokemon for:" + usersName);
        const data  = await resource.getUniquePokedexEntries(usersName)
        console.log("response:");
        console.log(data);
        setItems2(data) ;
  })()
  }

  useEffect(() => {
  (async () => {
    if(!usersCalled){
      setUsersCalled(true);
      console.log("calling unique users:");
      const foundUsers  = await resource.getUniqueUsers()
      console.log("response users:");
      console.log(foundUsers);
      setUsers(foundUsers) ;
    }
  })();},[]);

  const onChangeHandler = (change) => {
  
    setUserName(change.value);
    (async () => {
      console.log("finding pokemon for:" + change.value);
      const data  = await resource.getUniquePokedexEntries(change.value)
      console.log("response:");
      console.log(data);
      setItems2(data) ;
      })()
  };
  return (
    <>
<div className="wholeSite">
    <div className="content">
      <div className="header">
        <img src='/falcon_logo.png' alt="Image" className="logo" /><h1>Hatch & Catch Pokedex</h1><img src="yogitap.gif" alt="Image" className="logo" />
      </div>
      <div className='selectorWrapper'>
      <div className='selector'>
           <h4 className='selectTitle'>
            User:
            </h4><div className='selectAndTooltip' >
              <Select className='selectorSelect'  options={users} onChange={onChangeHandler}  defaultValue={"User"}></Select><div className="selectIcon">
              <img data-tooltip-id="my-tooltip"  className='selectIconImg' src="/unown-question.png"></img>
              <Tooltip id="my-tooltip" 
                place="bottom"
                effect='solid'
                content="The user whose pokedex you want to see. You can search in this field"/>
            </div>
            </div>
      </div>
      </div>

   
     <div className='entries'> 
          {
         items2.map(el =>  <div key={el.key} className="entry">
          <PokedexEntry   key={el.pokedex}  pokedexEntryNumber={el.pokedex} 
          normalNumber={el.normalNumber}  shinyNumber={el.shinyNumber} name={el.monName}></PokedexEntry>
           </div>)
          }
      </div>
     


</div>

</div>
    </>
  )
}


