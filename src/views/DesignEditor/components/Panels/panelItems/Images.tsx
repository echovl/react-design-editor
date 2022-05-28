import React from "react";
import InformationCircleOutline from "~/components/Icons/InformationCircleOutline";
import Shadow from "./Common/Shadow";
import { Input, SIZE } from "baseui/input";
import { ChevronRight } from "baseui/icon";
import useAppContext from "~/hooks/useAppContext";

export default function () {
    const [value, setValue] = React.useState([]);
    const { setActiveSubMenu } = useAppContext();
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
                <div>FONT SELECTOR</div>
                <InformationCircleOutline size={24} />
            </div>
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
                    value={"Open Sans"}
                    placeholder="Controlled Input"
                    clearOnEscape
                />
            </div>
            <div>
                <Shadow />
            </div>
        </div>
    );
}
