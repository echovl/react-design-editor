import InformationCircleOutline from "~/components/Icons/InformationCircleOutline"
import { Button, SIZE } from "baseui/button"
import { textComponents } from "~/constants/editor"
import { useStyletron } from "styletron-react"
import { useEditor } from "@scenify/react"
import { FontItem } from "~/interfaces/common"
import { loadFonts } from "~/utils/fonts"

export default function () {
  const editor = useEditor()
  const addObject = async () => {
    if (editor) {
      const font: FontItem = {
        name: "Open_Sans__regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        type: "StaticText",
        width: 420,
        metadata: {
          text: "Add some text",
          fontSize: 92,
          fontFamily: font.name,
          textAlign: "center",
          fontStyle: "normal",
          fontURL: font.url,
        },
      }
      editor.objects.add(options)
    }
  }
  const addComponent = async (component: any) => {
    if (editor) {
      const fontItemsList: FontItem[] = []
      if (component.objects) {
        component.objects.forEach((object: any) => {
          if (object.type === "StaticText" || object.type === "DynamicText") {
            fontItemsList.push({
              name: object.metadata.fontFamily,
              url: object.metadata.fontURL,
            })
          }
        })
        const filteredFonts = fontItemsList.filter((f) => !!f.url)
        await loadFonts(filteredFonts)
      } else {
        if (component.type === "StaticText" || component.type === "DynamicText") {
          fontItemsList.push({
            name: component.metadata.fontFamily,
            url: component.metadata.fontURL,
          })
          await loadFonts(fontItemsList)
        }
      }
      editor.objects.add(component)
    }
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div>Text</div>
        <InformationCircleOutline size={24} />
      </div>

      <div style={{ padding: "0 1.5rem" }}>
        <Button
          onClick={addObject}
          size={SIZE.compact}
          overrides={{
            Root: {
              style: {
                width: "100%",
              },
            },
          }}
        >
          Add text
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "8px",
          padding: "1.5rem",
        }}
      >
        {textComponents.map((tc) => (
          <TextComponentItem onClick={addComponent} key={tc.id} component={tc} />
        ))}
      </div>
    </div>
  )
}

interface TextComponent {
  id: string
  metadata: {
    preview: string
  }
}
function TextComponentItem({ component, onClick }: { component: TextComponent; onClick: (option: any) => void }) {
  const [css] = useStyletron()
  return (
    <div
      onClick={() => onClick(component)}
      className={css({
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      ></div>
      <img
        src={component.metadata.preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}
