import { useEffect, useState, useRef } from "react";
import { Panel } from "@vkontakte/vkui";
import HeaderLogo from "../components/HeaderLogo";
import exit from "../img/exit.svg";
import { DescCard, WordCard } from "../components/cards";

const colors = ["pink", "blue", "violet", "pink", "blue", "violet"];

const words = ["Адаптив", "Бэкап", "Дамп", "Деплой", "Капча", "Редирект"];
const pointsEnd = words.length;

const values = [
  "процесс адаптации веб-страниц или веб-интерфейса к использованию на экранах различных устройств",
  "резервное копирование проекта для того, чтобы при каких-либо сбоях иметь возможность восстановить данные",
  "файл, содержащий резервную копию системы/базы данных, актуальную на момент его создания",
  "развертывание программного обеспечения на выбранный сервер, где оно будет работать",
  "картинка, предназначенная для проверки пользователя на предмет его реальности",
  "автоматическое перенаправление пользователя куда-либо: на другой сайт или страницу",
];

export default function Cards({ setActivePanel }) {
  const [popupActive, setPopupActive] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [points, setPoints] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [shuffledValues, setShuffledValues] = useState([]);
  const [wordCardsInGame, setWordCardsInGame] = useState(Array(pointsEnd).fill(true));

  const wordCardsRef = useRef(null);

  useEffect(() => {
    setShuffledValues(shuffled(values));
    setPrevIndex(
      shuffledValues.indexOf(
        "процесс адаптации веб-страниц или веб-интерфейса к использованию на экранах различных устройств"
      )
    );
    setPrevValue(shuffledValues[0]);
  }, []);

  useEffect(() => {
    console.log('popupAcitve changed: ', popupActive);
  }, [popupActive]);

  return (
    <>
      <HeaderLogo />
      <div id="page">
        <section className="cardsBox">
          <div className="words" ref={wordCardsRef}>
            {words.map((word, index) => (
              <WordCard key={index} word={word} value={values[index]} />
            ))}
          </div>
          <div className="cards">
            {shuffledValues.map((value, index) => (
              <DescCard
                key={index}
                color={colors[index]}
                value={value}
                setPopupActive={setPopupActive}
                setPopupText={setPopupText}
                wordCardsRef={wordCardsRef}
                points={points}
                setPoints={setPoints}
                pointsEnd={pointsEnd}
                words={words}
                wordCardsInGame={wordCardsInGame}
                setWordCardsInGame={setWordCardsInGame}
                values={values}
                setActivePanel={setActivePanel}
              />
            ))}
          </div>
        </section>
        <div className={`popup__bg ${popupActive ? "active" : ""}`}>
          <form className={`popup ${popupActive ? "active": ""}`}>
            <img src={exit} className="close-popup" onClick={() => {
              setPopupActive(false);
            }} />
            <div id="popupBox">
              <p id="popupText">{popupText}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function shuffled(array) {
  const copy = [...array];
  return copy.sort(() => Math.random() - 0.5);
}
