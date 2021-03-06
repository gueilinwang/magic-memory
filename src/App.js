import { useState, useEffect } from "react"
import "./App.css"
import SingleCard from "./components/singleCard"
const cardImages = [
  { src: "/img/helmet-1.png", name: "helmet", matched: false },
  { src: "/img/potion-1.png", name: "potion", matched: false },
  { src: "/img/ring-1.png", name: "ring", matched: false },
  { src: "/img/scroll-1.png", name: "scroll", matched: false },
  { src: "/img/shield-1.png", name: "shield", matched: false },
  { src: "/img/sword-1.png", name: "sword", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false) //當值為true時,卡牌將無法再被點擊
  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages] //將卡牌由6張轉為各2張,total 12張
      // .sort(() => Math.random() - 0.5) //隨機排序
      .map((card) => ({ ...card, id: Math.random() }))
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))
      let temp = shuffledCards[i]
      shuffledCards[i] = shuffledCards[j]
      shuffledCards[j] = temp
    }
    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }
  //handle choise
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two choice
  const compareChoice = (first, second) => {
    if (!first || !second) {
      return
    }
    setDisabled(true)
    if (first?.name === second?.name) {
      setCards((prevCards) => {
        return prevCards.map((card) => {
          if (card.name === first.name) {
            return { ...card, matched: true }
          } else {
            return card
          }
        })
      })
    }
    setTimeout(() => resetTurn(), 700)
  }
  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }
  useEffect(() => {
    compareChoice(choiceOne, choiceTwo)
  }, [choiceTwo])
  useEffect(() => {
    shuffleCards()
  }, [])
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setTimeout(() => {
        alert("You win!!!")
        shuffleCards()
      }, 1000)
    }
  }, [cards])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          )
        })}
      </div>
      <p>Turns:{turns}</p>
    </div>
  )
}

export default App
