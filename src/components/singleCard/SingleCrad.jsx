import React from "react"
import "./singleCard.css"
const SingleCard = ({ card, handleChoice, flipped }) => {
  const handleClick = () => {
    handleChoice(card)
  }
  return (
    <div className={"card"}>
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img
          src="/img/cover.png"
          alt="back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard
