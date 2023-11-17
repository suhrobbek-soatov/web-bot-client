// style
import "./Card.scss";

// components
import { Button } from "../";
import { useState } from "react";
import { priceOptions } from "../../constants/constants";

const Card = ({ course, onAddItem, onRemoveItem }) => {
  const [count, setCount] = useState(0);
  const { image, title, price } = course;

  const handleInc = () => {
    setCount(prev => prev + 1);
    onAddItem(course);
  };

  const handleDec = () => {
    setCount(prev => prev - 1);
    onRemoveItem(course);
  };

  return (
    <div className="card">
      <span className={`card__badge ${count === 0 ? "card__badge--hidden" : ""}`}>{count}</span>
      <div className="card__image-wrapper">
        <img className="card__image" src={image} title={title} alt={title} width={300} />
      </div>
      <div className="card__body">
        <h2 className="card__title">{title}</h2>
        <div className="card__price">{price.toLocaleString("en-US", priceOptions)}</div>
      </div>
      <div className="card__divider"></div>
      <div className="card__btns">
        <Button title={"+"} type={"add"} click={handleInc} />
        <Button title={"-"} type={"remove"} disabled={count === 0} click={handleDec} />
      </div>
    </div>
  );
};

export default Card;
