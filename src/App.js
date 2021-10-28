import { useState } from "react"
import "./App.css"
import SingleCard from "./components/singleCard"
const cardImages = [
  { src: "/img/helmet-1.png" },
  { src: "/img/potion-1.png" },
  { src: "/img/ring-1.png" },
  { src: "/img/scroll-1.png" },
  { src: "/img/shield-1.png" },
  { src: "/img/sword-1.png" },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
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
  console.log(cards, turns)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return <SingleCard key={card.id} src={card.src} />
        })}
      </div>
    </div>
  )
}

export default App
