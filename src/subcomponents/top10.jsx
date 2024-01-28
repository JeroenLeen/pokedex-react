import './top10.css'

export default function Top10(  props) {
  
    let topCounter = 0;

    function hasTrophy(){
      if(topCounter<3){
        topCounter = topCounter+1;
        return true;
      }
      return false;
    };
    let imgGold = " "
    
    return (
      <>
      <div className={'entryBorder' + props.borderColor + ' top10Container'}  >
        <div className='top10TitleContainer'><h2>{props.title}</h2></div>
        <div className='top10DataContainer'>
        <table>
        <tbody>
          <tr  className='columns'>
            <th></th>
            <th className='nameColumn'>{props.firstColumnName}</th>
            <th  className='secondColumn' >{props.secondColumnName}</th>
            {props.thirdColumnName? <th >{props.thirdColumnName}</th>:''}
          </tr>
          {
            props.data.map(function (itemData, index) { 
            
              return <tr  key={itemData.currentOwner} >
                <td>{ index == 0?<img className='exclusiveLogoImg' src='Collector_Gold.png'></img> : ''}
          { index == 1?<img className='exclusiveLogoImg' src='Collector_Silver.png'></img> : ''}
          { index == 2?<img className='exclusiveLogoImg' src='Collector_Bronze.png'></img> : ''}</td>
          <td className='nameColumn'>
          { itemData[props.firstColumnData]}</td>
          <td>{itemData[props.secondColumnData]}</td>
          {props.thirdColumnName? <td>{itemData[props.thirdColumnData]}</td>:''}
          </tr>})
          }
         
         
            </tbody>
        </table>
        </div>
      </div>
    </>
    )
  }
  