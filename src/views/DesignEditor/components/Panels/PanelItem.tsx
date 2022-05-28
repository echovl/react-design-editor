import React from "react"
import { SubMenuType } from "~/constants/editor"
import useAppContext from "~/hooks/useAppContext"
import { styled } from "baseui"
import { useActiveObject } from "@scenify/react"
import Text from "./panelItems/Text"
import Customize from "./panelItems/Customize"
import getSelectionType from "~/utils/get-selection-type"
import panelItems from "./panelItems"

const Container = styled("div", (props) => ({
  background: "#ffffff",
  width: "300px",
  flex: "none",
  borderRight: "1px solid #d7d8e3",
  display: "flex",
}))

interface State {
  panel: string
}
function PanelsList() {
  const [state, setState] = React.useState<State>({ panel: "Text" })
  const { activePanel, activeSubMenu, setActiveSubMenu } = useAppContext()
  const activeObject = useActiveObject()

  React.useEffect(() => {
    setState({ panel: activePanel })
  }, [activePanel])

  React.useEffect(() => {
    const selectionType = getSelectionType(activeObject)
    if (selectionType) {
      if (selectionType.length > 1) {
        setState({ panel: "Selection" })
      } else {
        setState({ panel: selectionType[0] })
      }
    } else {
      setState({ panel: activePanel })
    }
  }, [activeObject])

  React.useEffect(() => {
    if (activeSubMenu) {
      setState({ panel: activeSubMenu })
    } else {
      setState({ panel: activePanel })
    }
  }, [activeSubMenu])

  const Component = panelItems[state.panel]
  return <Container>{Component && <Component />}</Container>
}

export default PanelsList
