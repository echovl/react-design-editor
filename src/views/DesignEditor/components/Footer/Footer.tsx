import React from "react"
import { styled } from "baseui"
import { Theme } from "baseui/theme"
import Icons from "~/components/Icons"
import { Button, KIND, SIZE } from "baseui/button"
import { Slider } from "baseui/slider"
import { Input } from "baseui/input"
import { useEditor, useZoomRatio } from "@scenify/react"

const Container = styled<{}, "div", Theme>("div", ({ $theme }) => ({
  height: "56px",
  background: $theme.colors.white,
  display: "grid",
  gridTemplateColumns: "240px 1fr 240px",
  borderTop: "1px solid #d7d8e3",
  alignItems: "center",
}))

interface Options {
  zoomRatio: number
}

export default function () {
  const [options, setOptions] = React.useState<Options>({
    zoomRatio: 20,
  })
  const editor = useEditor()
  const zoomRatio: number = useZoomRatio()

  React.useEffect(() => {
    console.log(zoomRatio)
    setOptions({ ...options, zoomRatio: zoomRatio * 100 })
  }, [zoomRatio])

  const handleChange = (type: string, value: any) => {
    console.log(value)
    editor.zoom.zoomToRatio(value / 100)
    // setOptions({ ...options, [type]: value })
  }
  return (
    <Container>
      <div>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Layers size={20} />
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Expand size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Compress size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.AddCircleOutline size={24} />
        </Button>
        <Slider
          overrides={{
            InnerThumb: () => null,
            ThumbValue: () => null,
            TickBar: () => null,
            Root: {
              style: { width: "140px" },
            },
            Thumb: {
              style: {
                height: "12px",
                width: "12px",
                paddingLeft: 0,
              },
            },
            Track: {
              style: {
                paddingLeft: 0,
                paddingRight: 0,
              },
            },
          }}
          value={[options.zoomRatio]}
          onChange={({ value }) => handleChange("zoomRatio", value[0])}
          min={10}
          max={300}
        />
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.RemoveCircleOutline size={24} />
        </Button>
        <Input
          value={options.zoomRatio}
          endEnhancer="%"
          overrides={{
            Root: {
              style: {
                width: "100px",
              },
            },
          }}
          size={SIZE.mini}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "end" }}>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Refresh size={16} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Undo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.Redo size={22} />
        </Button>
        <Button kind={KIND.tertiary} size={SIZE.compact}>
          <Icons.TimePast size={16} />
        </Button>
      </div>
    </Container>
  )
}
