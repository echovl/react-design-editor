import React from "react"
import { useStyletron } from "baseui"
import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox"

export default function () {
  const [checked, setChecked] = React.useState(false)
  const [css] = useStyletron()
  return (
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
        Smart resize
      </Checkbox>
      <div
        className={css({
          fontSize: "14px",
          lineHeight: "calc(12px + 6px)",
          letterSpacing: "0.25px",
          padding: "8px",
          border: "1px solid #f1d952",
          backgroundColor: "rgb(255, 250, 240)",
          marginTop: "1rem",
        })}
      >
        With Smart Resize, we’ll resize your layers as well as your template background.
      </div>
    </div>
  )
}
