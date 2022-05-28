import React from "react";
import InformationCircleOutline from "~/components/Icons/InformationCircleOutline";
import { Button, SIZE } from "baseui/button";
import { HexColorPicker } from "react-colorful";
import { StatefulPopover, PLACEMENT } from "baseui/popover";
import { Plus } from "baseui/icon";
import { Input } from "baseui/input";
import { useEditor } from "@scenify/react";
import { Modal, ROLE } from "baseui/modal";
import SelectFrame from "./SelectFrame";
import CustomFrame from "./CustomFrame";
import SmartResize from "./SmartResize";
import { ButtonGroup } from "baseui/button-group";

const colors = ["#ffffff", "#9B9B9B", "#4A4A4A", "#000000", "#A70C2C", "#DA9A15", "#F8E71D", "#47821A", "#4990E2"];

interface State {
    backgroundColor: string;
}

export default function () {
    const editor = useEditor();

    const [state, setState] = React.useState<State>({
        backgroundColor: "#000000",
    });

    const changeBackgroundColor = (color: string) => {
        if (editor) {
            editor.frame.setBackgroundColor(color);
        }
    };
    const handleChange = (type: string, value: any) => {
        setState({ ...state, [type]: value });
        changeBackgroundColor(value);
    };
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
                <div>Customize</div>
                <InformationCircleOutline size={24} />
            </div>

            <div style={{ padding: "0 1.5rem" }}>
                <ResizeTemplate />
                <div style={{ fontSize: "14px", textAlign: "center", paddingTop: "0.35rem" }}>1080 x 1920px</div>
            </div>
            {/* Colors list */}
            <div style={{ padding: "1.5rem" }}>
                <div
                    style={{
                        background: "#fafafa",
                        borderRadius: "8px",
                        border: "1px solid #ececf5",
                        padding: "0.45rem 1rem",
                        fontSize: "14px",
                    }}
                >
                    <div>Background color</div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(5, 1fr)",
                            gap: "0.5rem",
                            paddingTop: "0.25rem",
                        }}
                    >
                        <StatefulPopover
                            placement={PLACEMENT.bottomLeft}
                            content={
                                <div
                                    style={{
                                        padding: "1rem",
                                        background: "#ffffff",
                                        width: "200px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                        textAlign: "center",
                                    }}
                                >
                                    <HexColorPicker onChange={(v) => handleChange("backgroundColor", v)} />
                                    <Input
                                        overrides={{ Input: { style: { textAlign: "center" } } }}
                                        value={state.backgroundColor}
                                        onChange={(e) => handleChange("backgroundColor", (e.target as any).value)}
                                        placeholder="#000000"
                                        clearOnEscape
                                    />
                                </div>
                            }
                            accessibilityType={"tooltip"}
                        >
                            <div>
                                <div
                                    style={{
                                        height: "40px",
                                        width: "40px",
                                        backgroundSize: "100% 100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backgroundImage:
                                            'url("https://static.canva.com/web/images/788ee7a68293bd0264fc31f22c31e62d.png")',
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "32px",
                                            width: "32px",
                                            background: "#ffffff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "1.3rem",
                                        }}
                                    >
                                        <Plus size={24} />
                                    </div>
                                </div>
                            </div>
                        </StatefulPopover>

                        {colors.map((color) => (
                            <div
                                onClick={() => handleChange("backgroundColor", color)}
                                key={color}
                                style={{
                                    background: color,
                                    borderRadius: "4px",
                                    border: "1px solid #d7d8e3",
                                    height: "34px",
                                    cursor: "pointer",
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ResizeTemplate() {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                size={SIZE.compact}
                overrides={{
                    Root: {
                        style: {
                            width: "100%",
                        },
                    },
                }}
            >
                Resize template
            </Button>
            <Modal
                onClose={() => setIsOpen(false)}
                closeable={true}
                isOpen={isOpen}
                animate
                autoFocus
                size={SIZE.default}
                role={ROLE.dialog}
                overrides={{
                    Close: {
                        component: () => null,
                    },
                    Dialog: {
                        style: {
                            borderTopRightRadius: "8px",
                            borderEndStartRadius: "8px",
                            borderEndEndRadius: "8px",
                            borderStartEndRadius: "8px",
                            borderStartStartRadius: "8px",
                        },
                    },
                }}
            >
                <div
                    style={{
                        height: "56px",
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Uber Move Text",
                        borderBottom: "1px solid #d7d8e3",
                        padding: "0 1.5rem",
                    }}
                >
                    Resize template
                </div>
                <div
                    style={{
                        padding: "1.25rem",
                    }}
                >
                    <div style={{ fontFamily: "Uber Move Text" }}>
                        <div style={{ marginBottom: "0.25rem" }}>Template size presets</div>
                        <SelectFrame />
                    </div>
                </div>
                <div
                    style={{
                        padding: "0 1.25rem",
                        fontFamily: "Uber Move Text",
                    }}
                >
                    <CustomFrame />
                </div>
                <div
                    style={{
                        padding: "1.25rem",
                        fontFamily: "Uber Move Text",
                    }}
                >
                    <SmartResize />
                </div>

                <div
                    style={{
                        padding: "1.25rem",
                        fontFamily: "Uber Move Text",
                        display: "flex",
                        gap: "0.5rem",
                    }}
                >
                    <Button size={SIZE.compact} kind="secondary">
                        Cancel
                    </Button>
                    <Button size={SIZE.compact}>Resize</Button>
                </div>
            </Modal>
        </>
    );
}
