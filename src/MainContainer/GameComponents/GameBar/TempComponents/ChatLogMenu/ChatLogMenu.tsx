import styled from "styled-components";
import {useState} from "react";
import styles from "../../../../../TextModule.module.css"
import LogSubMenu from "./LogSubMenu.tsx";

interface IChatLogProps {
    closeMenu: () => void,
}

type SubMenus = "Chat" | "Log"
export default function ChatLogMenu({closeMenu}: IChatLogProps) {
    const [subMenu, setSubMenu] = useState<SubMenus>("Log")

    return (
        <div
            onClick={e => e.stopPropagation()}
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
            }}>
            <div
                style={{
                    width: "100%",
                    height: "15%",
                    backgroundColor: "snow",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}>
                <div
                    onClick={() => setSubMenu("Chat")}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                    Chat
                </div>


                <div
                    onClick={() => setSubMenu("Log")}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                    Logs
                </div>
                <div
                    onClick={closeMenu}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "4rem",
                    }}>
                    X
                </div>

            </div>
            {subMenu === "Log" && (
                <LogSubMenu/>
            )}
        </div>
    )
}