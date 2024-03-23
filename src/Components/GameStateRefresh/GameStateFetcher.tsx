import {useState} from "react";
import {MenuSelections} from "../Bar.tsx";

type MenuSelections2 = "none" | "inventory" | "ship" | "logs" | "chat" | "tasks"
function useGameStateRefresher() {
    const [activePanel, setActivePanel] = useState<MenuSelections2>("none")
    const isOpen = (selection: MenuSelections2) => selection === activePanel

    return {
        isOpen,
        setActivePanel,
    }
}

export default function GameStateFetcher() {
    return (
        <div>

        </div>)
}
