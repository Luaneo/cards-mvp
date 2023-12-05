import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  SplitLayout,
  SplitCol,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import "./style.css";
import "./popup.css";
import Index from "./panels/Index";
import Tutorial from "./panels/Tutorial";
import Cards from "./panels/Cards";
import Finish from "./panels/Finish";

const App = () => {
  const [activePanel, setActivePanel] = useState("index");
  const [fetchedUser, setUser] = useState(null);
  const [popout, setPopout] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send("VKWebAppGetUserInfo");
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={popout}>
            <SplitCol>
              <View activePanel={activePanel}>
                <Index id="index" setActivePanel={setActivePanel} />
								<Tutorial id="tutorial" setActivePanel={setActivePanel} />
								<Cards id="cards" setActivePanel={setActivePanel} />
								<Finish id="finish" setActivePanel={setActivePanel} />
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
