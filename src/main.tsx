import ReactDOM from "react-dom/client";
import App from "./App";
import { EditorProvider } from "@scenify/react";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider, DarkTheme } from "baseui";
import { store } from "./store/store";
import { Provider } from "react-redux";

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <EditorProvider>
      <StyletronProvider value={engine}>
        <BaseProvider theme={DarkTheme}>
          <App />
        </BaseProvider>
      </StyletronProvider>
    </EditorProvider>
  </Provider>
);
