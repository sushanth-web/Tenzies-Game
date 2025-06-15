import { useEffect, useRef, useState } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'


export default function App(){

  function generateAllNewDice(){
    return new Array(10)
      .fill(0)
      .map(() => ({
        value:Math.ceil(Math.random()*6),
        isHeld:false,
        id:nanoid(),
      }))
  }

  function hold(id) {
  setDice(oldDice => 
    oldDice.map(die =>
      die.id === id ? { ...die, isHeld: !die.isHeld } : die
      
    )
  );
}



  const[dice,setDice]=useState(() => generateAllNewDice())
  const buttonRef = useRef(null)

  const gameWon= dice.every(die => die.isHeld)&&
  dice.every(die => die.value === dice[0].value)
  
  useEffect(() => {
    if(gameWon){
       buttonRef.current.focus()
    }
  })

  const diceElements=dice.map(dieObj => 
  <Die
    isHeld={dieObj.isHeld}
    key={dieObj.id} 
    value={dieObj.value}
    hold={hold}
    id={dieObj.id}
    />)

  function rollDice(){
    if(!gameWon){
      setDice(oldDice => oldDice.map(die => 
      die.isHeld?die:{...die,value: Math.ceil(Math.random()*6)}
    ))
    }
    else{
      setDice(generateAllNewDice())
    }
  }

  return(
    <main>
      {gameWon && <Confetti/>}
      <div className="title-box">
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="section">
      {diceElements}
      </div>
      <button ref={buttonRef} className="roll" onClick={rollDice}>{gameWon?"New Game":"Roll"}</button>
    </main>
  )
}