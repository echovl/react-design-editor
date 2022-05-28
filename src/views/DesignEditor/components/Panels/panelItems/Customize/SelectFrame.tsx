import React from "react"
import { StatefulPopover } from "baseui/popover"
import { useStyletron } from "baseui"
import { sampleFrames } from "~/constants/editor"
import Scrollbar from "@scenify/react-custom-scrollbar"
import { TriangleDown } from "baseui/icon"

export default function () {
  const [css, theme] = useStyletron()
  const selectRef = React.useRef(null)

  const contentCx = css({
    width: "450px",
    backgroundColor: theme.colors.white,
  })

  return (
    <StatefulPopover
      // dismissOnEsc={false}
      // dismissOnClickOutside={false}
      accessibilityType={"tooltip"}
      placement="bottom"
      content={({ close }) => (
        <div className={contentCx}>
          <Scrollbar style={{ height: "240px", width: "100%" }}>
            <div style={{ padding: "0.25rem 0" }}>
              {sampleFrames.map((sf) => (
                <CustomSelectOption
                  key={sf.id}
                  label={sf.name}
                  suffix={`${sf.width} x ${sf.height}`}
                  onClick={() => {
                    close()
                  }}
                />
              ))}
            </div>
          </Scrollbar>
        </div>
      )}
    >
      <div
        ref={selectRef}
        style={{
          background: "rgb(238, 238, 238)",
          height: "42px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0.5rem 0 1rem",
        }}
      >
        <div>Click Me</div>
        <TriangleDown size={20} />
      </div>
    </StatefulPopover>
  )
}

interface CustomSelectOptionProps {
  onClick: () => void
  label: string
  prefix?: string
  suffix: string
}
function CustomSelectOption(props: CustomSelectOptionProps) {
  const [css, theme] = useStyletron()
  return (
    <div
      onClick={() => props.onClick()}
      className={css({
        height: "24px",
        fontFamily: "Uber Move Text",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        color: "rgb(84, 84, 84)",
        padding: "8px 8px 8px 16px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "rgb(246, 246, 246)",
          color: "#000000",
        },
      })}
    >
      {props.label}
    </div>
  )
}
