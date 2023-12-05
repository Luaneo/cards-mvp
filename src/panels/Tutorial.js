import { useEffect } from "react";
import { Panel } from "@vkontakte/vkui";
import HeaderLogo from "../components/HeaderLogo";
import ok from '../img/ok.svg';
import exit from '../img/exit.svg';

export default function Tutorial({ setActivePanel }) {
  useEffect(() => {
    let popupBg = document.querySelector(".popup__bg");
    let popup = document.querySelector(".popup");
    let tutorialDescCard = document.querySelector(".tutorialCard");
    let closePopup = document.querySelector(".close-popup");

    const words = ["Адаптив", "Бэкап", "Дамп", "Деплой", "Капча", "Редирект"];
    const wordCards = Array.from(document.getElementsByClassName("wordCard"));

    let tutorial = true;

    for (let i = 0; i < words.length; i++) {
      wordCards[i].innerHTML = words[i];
    }

    document.getElementById("popupText").innerHTML =
      "Нажми на цветную карточку, чтобы увидеть ее описание";
    popupBg.classList.add("active");
    popup.classList.add("active");

    tutorialDescCard.addEventListener("click", () => {
      popupBg.classList.remove("active");
      popup.classList.remove("active");
      tutorialDescCard.classList.remove("glowing");
      tutorialDescCard.classList.remove("tutorialCard");
      setTimeout(function () {
        closePopup.classList.remove("hidden");
        document.getElementById("popupText").innerHTML =
          "процесс адаптации веб-страниц или веб-интерфейса к использованию на экранах различных устройств";
        popupBg.classList.add("active");
        popup.classList.add("active");

        closePopup.onclick = function () {
          popupBg.classList.remove("active");
          popup.classList.remove("active");
          setTimeout(function () {
            tutorialDescCard.classList.add("tutorialCard");
            wordCards[0].classList.add("tutorialCard");
            popupBg.classList.add("active");
            popup.classList.add("active");

            tutorialDescCard.style.position = "absolute";
            let startX = tutorialDescCard.getBoundingClientRect().left;

            function moveDown(startX) {
              let coordX = startX;
              let time = setInterval(frame, 5);
              function frame() {
                if (tutorial) {
                  if (coordX <= 40) {
                    tutorialDescCard.style.left = startX + "px";
                    coordX = startX;
                    clearInterval(time);
                    tutorialDescCard.classList.add("hidden");
                    wordCards[0].innerHTML = '';
                    setTimeout(function () {
                      wordCards[0].innerHTML = "Адаптив";
                      tutorialDescCard.classList.remove("hidden");
                      time = setInterval(frame, 5);
                    }, 1000);
                  }
                  coordX--;
                  tutorialDescCard.style.left = parseInt(coordX) + "px";
                }
              }
            }

            moveDown(startX);
            document.getElementById("popupBox").classList.add("popupStart");
            document.getElementById("popupText").innerHTML =
              "Соедини определения и термины, наиболее подходящие друг другу";
            popupBg.classList.add("active");
            popup.classList.add("active");

            let btnNext = document.getElementById("btnNext");
            btnNext.classList.remove("hidden");
            closePopup.classList.add("hidden");
            btnNext.onclick = function () {
              console.log("+");
              tutorial = false;
              tutorialDescCard.style.left = startX + "px";
              tutorialDescCard.style.removeProperty("position");
              popupBg.classList.remove("active");
              popup.classList.remove("active");
              setActivePanel('cards');
            };
          }, 500);
        };
      }, 500);
    });
  }, []);

  return (
    <>
      <HeaderLogo />
      <div id="page">
        <section className="cardsBox">
          <div className="words">
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
            <div className="wordCard"></div>
          </div>
          <div className="cards">
            <div className="descCard pink tutorialCard glowing"></div>
            <div className="descCard blue"></div>
            <div className="descCard violet"></div>
            <div className="descCard pink"></div>
            <div className="descCard blue"></div>
            <div className="descCard violet"></div>
          </div>
        </section>
        <div className="popup__bg">
          <form className="popup">
            <img
              src={exit}
              className="close-popup hidden"
            />
            <div id="popupBox">
              <p id="popupText"></p>
              <button type="button" id="btnNext" className="next hidden">
                Начать
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
