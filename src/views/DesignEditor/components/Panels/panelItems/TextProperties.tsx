// @ts-nocheck
import React from "react"
import InformationCircleOutline from "~/components/Icons/InformationCircleOutline"
import Underline from "~/components/Icons/Underline"

import Shadow from "./Common/Shadow"
import { Input, SIZE } from "baseui/input"
import { Button, SHAPE } from "baseui/button"
import { ChevronRight } from "baseui/icon"
import useAppContext from "~/hooks/useAppContext"
import { useActiveObject, useEditor } from "@scenify/react"
import { useSelector } from "react-redux"
import { selectFonts } from "~/store/slices/fonts/selectors"
import { getTextOptions } from "~/utils/object-options"
import { fontStyleLabels } from "~/constants/fonts"
import { Select } from "baseui/select"
import { loadFonts } from "~/utils/fonts"

interface State {
  underline: boolean
  textAlign: string
  fontSize: number
  fill: string
  charSpacing: number
  lineHeight: number
  fontFamily: string
  isGroup: boolean
  isMultiple: boolean
  styles: any[]
  font: any
  activeStyle: any
}

const defaultProps: State = {
  underline: false,
  textAlign: "left",
  charSpacing: 0,
  fill: "#000000",
  fontFamily: "Open Sans",
  fontSize: 12,
  lineHeight: 12,
  isGroup: false,
  isMultiple: false,
  styles: [],
  font: {},
  activeStyle: {},
}

export default function () {
  const fonts = useSelector(selectFonts)
  const [state, setState] = React.useState<State>(defaultProps)
  const { setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject() as any
  const editor = useEditor()

  React.useEffect(() => {
    if (activeObject) {
      const textOptions = getTextOptions(activeObject)
      const isGroup = textOptions.isGroup
      const active = textOptions.fontFamily.split("__")[1]
      const font = fonts.find((f) => f.family === textOptions.fontFamily.split("__")[0].split("_").join(" "))
      const isNotGradient = typeof activeObject.value?.fill === "string" || activeObject.value?.fill instanceof String
      const styles = Object.keys(font.files)
        .map((file: string) => ({
          value: file,
          label: fontStyleLabels[file].label,
          id: fontStyleLabels[file].id,
          url: font.files[file],
          family: font.family,
        }))
        .sort((a, b) => (a.id > b.id ? 1 : -1))

      setState({
        ...textOptions,
        font,
        styles,
        fontFamily: font.family,
        activeStyle: {
          label: fontStyleLabels[active].label,
          id: fontStyleLabels[active].id,
        },
        fill: isGroup ? "#000000" : isNotGradient ? textOptions.fill : "#000000",
      })
    }
  }, [activeObject])

  const handleChange = async (key: string, value: any) => {
    if (key === "fontStyle") {
      const selected = value[0]
      const updatedFamily = `${selected.family.split(" ").join("_")}__${selected.value}`
      const font = {
        name: updatedFamily,
        url: selected.url,
      }
      console.log({ font_2: font })

      await loadFonts([font])
      editor.objects.update({
        fontFamily: updatedFamily,
        metadata: {
          fontURL: font.url,
        },
      })
      setState({ ...state, activeStyle: selected })
    } else {
      editor.objects.update({
        [key]: value,
      })
      setState({ ...state, [key]: value })
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
        <div>Text properties</div>
        <InformationCircleOutline size={24} />
      </div>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        <div style={{ padding: "0 1.5rem" }}>
          <Input
            overrides={{
              Root: {
                style: {
                  paddingRight: "0px",
                },
              },
            }}
            onFocus={() => setActiveSubMenu("FontSelector")}
            endEnhancer={<ChevronRight size="18px" />}
            size={SIZE.compact}
            value={state.fontFamily}
            placeholder="Controlled Input"
            clearOnEscape
          />
        </div>
        <div style={{ padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 2fr", gap: "0.5rem" }}>
          <Input size={SIZE.compact} value={24} />

          <Select
            size={SIZE.compact}
            options={state.styles}
            // @ts-ignore
            value={[state.activeStyle]}
            placeholder="Select color"
            clearable={false}
            onChange={(params) => {
              console.log(params)
              // @ts-ignore
              handleChange("fontStyle", params.value)
            }}
          />
        </div>
      </div>
      <div style={{ padding: "0 1.5rem" }}>
        <Button onClick={() => handleChange("underline", activeObject.underline ? false : true)} kind="tertiary">
          <Underline size={24} />
        </Button>
      </div>
      <div>
        <Shadow />
      </div>
    </div>
  )
}
