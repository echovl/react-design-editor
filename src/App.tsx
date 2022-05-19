import { Canvas, useEditor } from "@scenify/react";
import { styled } from "baseui";
import { Theme } from "baseui/theme";
import { Button } from "baseui/button";
import Pages from "./Pages";

const Header = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  background: $theme.colors.backgroundPrimary,
  color: $theme.colors.white,
  display: "flex",
  alignItems: "center",
  padding: "0 1rem",
}));

function App() {
  const editor = useEditor();

  const addText = () => {
    editor.objects.add({
      type: "StaticText",
      width: 240,
      metadata: {
        text: "Hello world",
        textAlign: "center",
      },
    });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Pages />
      <Header style={{ height: "80px" }}>
        <Button onClick={addText}>Add text</Button>
      </Header>
      <div style={{ flex: 1, display: "flex" }}>
        <Canvas />
      </div>
    </div>
  );
}

export default App;
