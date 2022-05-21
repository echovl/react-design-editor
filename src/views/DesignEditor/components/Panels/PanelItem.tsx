import { SubMenuType } from "~/constants/editor"
import useAppContext from "~/hooks/useAppContext"
import { styled } from "baseui"
import { useActiveObject } from "@scenify/react"
import Text from "./panelItems/Text"

const Container = styled("div", (props) => ({
  background: "#ffffff",
  width: "300px",
  flex: "none",
  borderRight: "1px solid #d7d8e3",
}))

function PanelsList() {
  const { activePanel, activeSubMenu, setActiveSubMenu } = useAppContext()
  //   const { activeObject } = useEditorContext()
  const activeObject = useActiveObject()

  //   useEffect(() => {
  //     setActiveSubMenu(null)
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [activeObject])

  //   const Component =
  //     (activeObject && activeSubMenu) || (!activeObject && activeSubMenu === SubMenuType.COLOR)
  //       ? PanelItems[activeSubMenu]
  //       : PanelItems[activePanel]

  return (
    <Container>
      <Text />
    </Container>
  )
}

export default PanelsList
