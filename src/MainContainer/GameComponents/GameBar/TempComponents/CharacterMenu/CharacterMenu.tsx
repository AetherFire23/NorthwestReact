import styles from "../../../../../TextModule.module.css";
import TaskSubMenu from "../ActionsMenu/TaskSubMenu/TaskSubMenu.tsx";
import {useState} from "react";
import InventorySubMenu from "./InventorySubmenu/InventorySubMenu.tsx";

interface ICharacterMenuProps {
    closeMenu: () => void,
}

type SubMenus = "Inventory" | "Character"
export default function CharacterMenu({closeMenu} : ICharacterMenuProps){
    const [subMenu, setSubMenu] = useState<SubMenus>("Inventory")

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
                    onClick={() => setSubMenu("Inventory")}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                    Inventory
                </div>


                <div
                    onClick={() => setSubMenu("Character")}
                    className={styles.pixelselectable}
                    style={{
                        userSelect: "none",
                        fontSize: "3rem",
                        fontWeight: "bold",
                        letterSpacing: "0.1em",
                    }}>
                    Character
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
                {subMenu === "Inventory" && (
                    <InventorySubMenu/>
                )}
                {/*{subMenu === "Character" && (*/}
                {/*    <TaskSubMenu/>*/}
                {/*)}*/}
                {/*    Add submenu here I think */}
            </div>

            {/*{subMenu === "Environment" && (*/}
            {/*    <div>*/}

            {/*    </div>*/}
            {/*)}*/}

        </div>
    )
}