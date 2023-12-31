import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Card from "./Card";

const Deck = () => {
  // initial value of null will be replace on render due to useEffect
  const [deckId, setDeckId] = useState();

  // load back of card image 
  const [currentCardImg, setCurrentCardImg] = useState('https://deckofcardsapi.com/static/img/back.png');

  // use button text to toggle startAutoDraw() and stopAutoDraw()
  const [btnTxt, setBtntxt] = useState("Get new deck")

  // initialize useRef obj to store the id of my setInterval 
  const autoDrawId = useRef()

  // async function to draw a card from same deck
  const draw = async ()=>{
    try{
    // if there is a deck id then draw from said deck
      if (deckId) {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        setCurrentCardImg(response.data.cards[0].image);
      }
    }catch{
      // once all cards have been drawn alert and show card back 
      alert('Error: no cards remaining!')
      setCurrentCardImg('https://deckofcardsapi.com/static/img/back.png')
    };
  }
  
  // draw a new card every second
  const startAutoDraw = () => {
    autoDrawId.current = setInterval(() => {
      draw();    
    }, 1000);
    setBtntxt('Stop Drawing');
  };

  // use stored id to stop auto draw
  const stopAutoDraw = () =>{
    clearInterval(autoDrawId.current)
    setBtntxt('Draw')
  }

  // set txt and function of button 
  const handleClick = () =>{
    if(btnTxt === "Draw"){
      startAutoDraw();
    }else{
    stopAutoDraw()
    }
  }

  useEffect(() => {
    // replace initial deckId value of null with a new deck 
    axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .then(res => {
        setDeckId(res.data.deck_id);
    });
    return ()=>{clearInterval(autoDrawId.current)}
  }, []);

  return (
    <>
      <Card src={currentCardImg}/>
      <br></br>
      <button onClick={handleClick}>{btnTxt}</button> 
    </>
  );
}

export default Deck;
