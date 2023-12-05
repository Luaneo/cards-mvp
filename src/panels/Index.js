import { Group, Panel } from "@vkontakte/vkui";
import HeaderLogo from "../components/HeaderLogo";

export default function Index({ setActivePanel }) {
  return (
    <>
      <HeaderLogo />
      <div id="page">
        <section>
          <div id="infoBox">
            <h1>Привет!</h1>
            <p>
              Твоя задача — соединять карточки слов из IT-сленга с карточками их
              определений.
            </p>
          </div>
          <button onClick={() => setActivePanel("tutorial")}>Поехали!</button>
        </section>
      </div>
    </>
  );
}
