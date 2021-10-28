import React from "react"
import "./singleCard.css"
const SingleCard = ({ src }) => {
  return (
    <div className="card">
      <img src={src} alt="card front" className="front" />
      <img src="/img/cover.png" alt="back" className="back" />
    </div>
  )
}

export default SingleCard
