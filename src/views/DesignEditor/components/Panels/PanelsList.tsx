import { useStyletron } from "baseui"
import { panelListItems } from "~/constants/app-options"
import useAppContext from "~/hooks/useAppContext"
import { styled } from "baseui"
import { useEditor } from "@scenify/react"
import Icons from "~/components/Icons"
import { SubMenuType } from "~/constants/editor"

const Container = styled("div", (props) => ({
  width: "84px",
  backgroundColor: props.$theme.colors.primary100,
}))

function PanelsList() {
  const { activePanel } = useAppContext()
  return (
    <Container>
      {panelListItems.map((panelListItem) => (
        <PanelListItem
          label={panelListItem.name}
          name={panelListItem.name}
          key={panelListItem.name}
          icon={panelListItem.name}
          activePanel={activePanel}
        />
      ))}
    </Container>
  )
}

function PanelListItem({ label, icon, activePanel }: any) {
  const { setActivePanel, setActiveSubMenu } = useAppContext()
  const editor = useEditor()
  const [css, theme] = useStyletron()
  // @ts-ignore
  const Icon = Icons[icon]
  return (
    <div
      onClick={() => {
        editor.objects.deselect()
        setActiveSubMenu(SubMenuType.ANIMATIONS)
        setActivePanel(label)
      }}
      className={css({
        width: "84px",
        height: "80px",
        backgroundColor: label === activePanel ? theme.colors.white : theme.colors.primary100,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "Uber Move Text",
        fontWeight: 500,
        fontSize: "0.8rem",
        userSelect: "none",
        transition: "all 0.5s",
        gap: "0.1rem",
        ":hover": {
          cursor: "pointer",
          backgroundColor: theme.colors.white,
          transition: "all 1s",
        },
      })}
    >
      <Icon size={24} />
      <div>{label}</div>
    </div>
  )
}

export default PanelsList
