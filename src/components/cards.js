import { useState, useRef } from "react";
import ok from "../img/ok.svg";

export function WordCard({ word }) {
  return <div className="wordCard">{word}</div>;
}

export function DescCard({
  color,
  value,
  setPopupActive,
  setPopupText,
  wordCardsRef,
  points,
  setPoints,
  pointsEnd,
  words,
  wordCardsInGame,
  setWordCardsInGame,
  values,
  setActivePanel,
}) {
  const descCardRef = useRef(null);
  const [rerender, setRerender] = useState(false);

  return (
    <div
      className={`descCard ${color}`}
      ref={descCardRef}
      onClick={() => {
        console.log('in descCard onClick');
        setPopupActive(true);
        setPopupText(value);
      }}
      onTouchMove={(e) => {
        const touchLocation = e.targetTouches[0];
        const card = descCardRef.current;
        console.log('touchLocation: ', touchLocation);
        console.log('card: ', card);
        if (
          touchLocation.pageX < window.innerWidth - card.offsetWidth / 2 &&
          touchLocation.pageY < window.innerHeight - card.offsetHeight / 2
        ) {
          card.style.position = "absolute";
          card.style.left = touchLocation.pageX - card.offsetWidth / 2 + "px";
          card.style.top = touchLocation.pageY - card.offsetHeight / 2 + "px";
          setRerender(!rerender);
        }
      }}
      onTouchEnd={(e) => {
        const wordCards = Array.from(wordCardsRef.current.children);
        const descCard = descCardRef.current;
        console.log('wordCards: ', wordCards);
        wordCards.forEach((wordCard, index) => {
          console.log('wordCard: ', wordCard);
          let descRect = descCard.getBoundingClientRect();
          let wordRect = wordCard.getBoundingClientRect();
          if (
            descRect.bottom > wordRect.top &&
            descRect.right > wordRect.left &&
            descRect.top < wordRect.bottom &&
            descRect.left < wordRect.right
          ) {
            console.log('in if body');
            console.log('descCard.value: ', value);
            console.log('wordCard.value: ', words[index]);
            console.log('wordCard.inGame: ', wordCardsInGame[index]);
            if (wordCardsInGame[index]) {
              if (value == values[index]) {
                descCard.style.display = "none";
                wordCard.innerHTML = `<img src="${ok}" alt="ok" />`;
                setWordCardsInGame(
                  wordCardsInGame.map((item, i) => {
                    if (i === index) {
                      return false;
                    } else {
                      return item;
                    }
                  })
                );
                if (points + 1 === pointsEnd) {
                  setActivePanel("finish");
                }
                setPoints(points + 1);
              } else {
                setPopupText("Упс, попробуй другую карточку");
                setPopupActive(true);
              }
            }
          }
        })
        descCard.style.removeProperty("position");
        descCard.style.removeProperty("left");
        descCard.style.removeProperty("top");
      }}
    ></div>
  );
}
