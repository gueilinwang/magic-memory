import { useState, useEffect } from "react"
import "./App.css"
import SingleCard from "./components/singleCard"
const cardImages = [
  { src: "/img/helmet-1.png", name: "helmet" },
  { src: "/img/potion-1.png", name: "potion" },
  { src: "/img/ring-1.png", name: "ring" },
  { src: "/img/scroll-1.png", name: "scroll" },
  { src: "/img/shield-1.png", name: "shield" },
  { src: "/img/sword-1.png", name: "sword" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
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
    if (first?.name === second?.name) {
      console.log("Match")
    } else {
      console.log("No match")
    }
    resetTurn()
  }

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
  }
  useEffect(() => {
    compareChoice(choiceOne, choiceTwo)
  }, [choiceTwo])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
          )
        })}
      </div>
    </div>
  )
}

export default App
