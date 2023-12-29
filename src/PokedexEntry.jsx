import './PokedexEntry.css'

export default function PokedexEntry(  props) {
  
        const imageUrl2 = new URL(
        "/pokemon/Normal/" + props.pokedexEntryNumber + ".png",
        import.meta.url
      ).href;

      
    return (
      <>
      <div className='exclusiveLogoContainer'><img className='exclusiveLogoImg ' src={props.exclusiveTo + ".png"}></img></div>
      <div className={props.shinyNumber>0?'entry-container-shiny':'entry-container'}>
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
  