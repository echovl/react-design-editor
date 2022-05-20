import React from "react"
import { Provider as ScenifyProvider } from "@scenify/react"
import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { BaseProvider, LightTheme } from "baseui"
import { store } from "./store/store"
import { Provider } from "react-redux"

const engine = new Styletron()

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ScenifyProvider>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>{children}</BaseProvider>
        </StyletronProvider>
      </ScenifyProvider>
    </Provider>
  )
}
