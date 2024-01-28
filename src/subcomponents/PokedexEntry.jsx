import './PokedexEntry.css'

export default function PokedexEntry(  props) {

        let imageUrl2 = ""
        debugger;
        if(props.selectedUser == "yogieisbar"){
            imageUrl2 =   new URL(
              "/pokemon/Normal_yogi_birthday/" + props.pokedexEntryNumber + ".png",
              import.meta.url
            ).href;
        }else{
          imageUrl2 =   new URL(
            "/pokemon/Normal/" + props.pokedexEntryNumber + ".png",
            import.meta.url
          ).href;
        }
      

      
    return (
      <>
      <div className='exclusiveLogoContainer'>
       {props.exclusiveTo? <img className='exclusiveLogoImg ' src={props.exclusiveTo + ".png"}></img> : ''} 
      <img className='rarityLogoImg ' src={props.rarity + ".png"}></img></div>
      <div className={props.shinyNumber && !props.noShine>0?'entry-container-shiny':'entry-container'}>
      <div className="image-container">
      <img src={imageUrl2} alt="Image" className={"image "+ props.rarity} />
      </div>

      <div className="numbers">
       <div> <b>{ props.name }</b></div>
       <div className='number-container'><div className={props.normalNumber>0?'green':'red'}> Normal: { props.normalNumber }</div>
        <div className={props.shinyNumber>0?'green':'red'}>Shiny: {props.shinyNumber }</div></div>
       
      </div>
      </div>
    </>
    )
  }
  