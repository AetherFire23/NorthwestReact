import styles from "../../../../../TextModule.module.css";
import {useState} from "react";
import TaskSubMenu from "./TaskSubMenu/TaskSubMenu.tsx";

interface IChatLogProps {
    closeMenu: () => void,
}

type SubMenus = "Tasks" | "Environment"
export default function ActionsMenu({closeMenu}: IChatLogProps) {
    const [subMenu, setSubMenu] = useState<SubMenus>("Tasks")

    return (

        <div
            onClick={e => e.stopPropagation()}
            style={{
                position: "absolute",
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                display: "flex",
                flexDirection: "column"
                // For some reason, without display column, there is a bug in the parent's height
                // which becomes always 100% of view height.
            }}>
            <div
                style={{
                    width: "100%",
                    height: "15%",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",

                }}>
                <div
                    onClick={() => setSubMenu("Tasks")}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                    Tasks

                </div>


                <div
                    onClick={() => setSubMenu("Environment")}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                    Environment
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

            {/*Overflow hidden seems to be needed */}
            <div
                style={{
                    flex: "1",
                }}
            >
                {subMenu === "Tasks" && (
                    <TaskSubMenu/>
                )}
            </div>

            {/*{subMenu === "Environment" && (*/}
            {/*    <div>*/}

            {/*    </div>*/}
            {/*)}*/}

        </div>
    )
}