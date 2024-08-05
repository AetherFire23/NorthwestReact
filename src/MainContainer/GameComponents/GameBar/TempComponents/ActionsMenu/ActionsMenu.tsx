import styles from "../../../../../TextModule.module.css";
import {useState} from "react";
import TaskSubMenu from "./TaskSubMenu.tsx";
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
                    onClick={() => setSubMenu("Tasks")}
                    className={styles.pixelselectable}
                    style={{
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
                        fontSize: "4rem",
                    }}>
                    X
                </div>

            </div>
            {subMenu === "Tasks" && (
                <TaskSubMenu/>
            )}
        </div>
    )
}