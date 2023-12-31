const Card = ({src='https://deckofcardsapi.com/static/img/back.png'}) =>{
	return(
    // use image url as src that was passed down as props. 
		<img  src={src} alt=''/>
  )
}

export default Card;
