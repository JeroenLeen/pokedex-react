export default function PokedexEntry(  props) {
  debugger;
        const imageUrl2 = new URL(
        "/pokemon/Normal/" + props.pokedexEntryNumber + ".png",
        import.meta.url
      ).href;

      debugger;
    return (
      <>
      <div class="image-container">
      <img src={imageUrl2} alt="Image" class="image" />
      <div class="numbers">
        <p><b>{ props.name }</b></p>
        <p>Normal: { props.normalNumber }</p>
        <p>Shiny: {props.shinyNumber }</p>
      </div>
    </div>
    </>
    )
  }
  