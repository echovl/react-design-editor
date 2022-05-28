import React from "react"
import { useStyletron } from "baseui"
import { Input, SIZE } from "baseui/input"
import { useEditor } from "@scenify/react"
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox"
import SwapHorizontal from "~/components/Icons/SwapHorizontal"
import { Button } from "baseui/button"
export default function () {
  const [checked, setChecked] = React.useState(false)
  const [css] = useStyletron()
  return (
    <div
      className={css({
        backgroundColor: "#fafafa",
        border: "1px solid #ececf5",
        display: "grid",
        gridTemplateColumns: "1.75fr 1fr",
        padding: "1rem",
        borderRadius: "4px",
        gap: "0.5rem",
        alignItems: "end",
        marginTop: "0.35rem",
      })}
    >
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "1fr 50px 1fr",
          alignItems: "end",
          fontSize: "14px",
        })}
      >
        <div>
          <div style={{ paddingBottom: "0.5rem", fontFamily: "Uber Move Text", fontWeight: 500 }}>Width</div>
          <Input size={SIZE.compact} />
        </div>
        <Button
          overrides={{
            Root: {
              style: {
                height: "32px",
              },
            },
          }}
          size={SIZE.compact}
          kind="tertiary"
        >
          <SwapHorizontal size={24} />
        </Button>
        <div>
          <div style={{ paddingBottom: "0.5rem", fontWeight: 500 }}>Height</div>
          <Input size={SIZE.compact} />
        </div>
      </div>
      <div>
        <Checkbox
          overrides={{
            Label: {
              style: {
                fontSize: "14px",
              },
            },
          }}
          checked={checked}
          onChange={(e) => setChecked((e.target as any).checked)}
          labelPlacement={LABEL_PLACEMENT.right}
        >
          Lock aspect ratio
        </Checkbox>
      </div>
    </div>
  )
}
