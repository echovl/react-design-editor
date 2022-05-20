import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Navbar from "./components/Navbar"
import Panels from "./components/Panels"
import Canvas from "./components/Canvas"
import Footer from "./components/Footer"
const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: $theme.colors.white,
  fontFamily: "Uber Move Text",
}))

function DesignEditor() {
  return (
    <Container>
      <Navbar />
      <div style={{ display: "flex", flex: 1 }}>
        <Panels />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Canvas />
          <Footer />
        </div>
      </div>
    </Container>
  )
}

export default DesignEditor
