import React from "react"
import InformationCircleOutline from "~/components/Icons/InformationCircleOutline"
import ArrowBackOutline from "~/components/Icons/ArrowBackOutline"
import Search from "~/components/Icons/Search"
import { Input, SIZE } from "baseui/input"
import useAppContext from "~/hooks/useAppContext"
import { useSelector } from "react-redux"
import { selectFonts } from "~/store/slices/fonts/selectors"
import Scrollbars from "@scenify/react-custom-scrollbar"
import { useStyletron } from "baseui"
import { IFontFamily } from "~/interfaces/editor"
import { useEditor } from "@scenify/react"
import { loadFonts } from "~/utils/fonts"

export default function () {
  const [query, setQuery] = React.useState("")
  const { setActiveSubMenu } = useAppContext()
  const fonts = useSelector(selectFonts)
  const [css] = useStyletron()
  const editor = useEditor()

  const handleFontFamilyChange = async (fontFamily: IFontFamily) => {
    if (editor) {
      // const fontFile = fontFamily.files["regular" as any]
      const firstFontStyle = Object.keys(fontFamily.files)[0]
      // @ts-ignore
      const fontFile = fontFamily.files[Object.keys(fontFamily.files)[0]]

      const updatedFamily = `${fontFamily.family.split(" ").join("_")}__${firstFontStyle}`
      console.log({ updatedFamily })
      const font = {
        name: updatedFamily,
        url: fontFile,
      }
      console.log({ font_1: font })
      await loadFonts([font])
      editor.objects.update({
        fontFamily: updatedFamily,
        metadata: {
          fontURL: font.url,
        },
      })
    }
  }

  return (
    <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowBackOutline size={24} />
          <div>Choose a font</div>
        </div>
        <InformationCircleOutline size={24} />
      </div>
      <div style={{ padding: "0 1.5rem 1rem" }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: "8px",
              },
            },
          }}
          onChange={(e) => setQuery((e.target as any).value)}
          placeholder="Search font"
          size={SIZE.compact}
          startEnhancer={<Search size={16} />}
        />
      </div>
      <Scrollbars>
        <div style={{ padding: "0 1.5rem", display: "grid", gap: "0.2rem" }}>
          {fonts
            .filter((f) => f.family.toLowerCase().includes(query))
            .map((font) => {
              return (
                <div
                  onClick={() => handleFontFamilyChange(font)}
                  className={css({
                    backgroundColor: "rgb(248, 248, 251)",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "1rem",
                    cursor: "pointer",
                    fontSize: "14px",
                    ":hover": {
                      backgroundColor: "#ECECF5",
                    },
                  })}
                  id={font.id}
                >
                  {font.family}
                </div>
              )
            })}
        </div>
      </Scrollbars>
    </div>
  )
}
