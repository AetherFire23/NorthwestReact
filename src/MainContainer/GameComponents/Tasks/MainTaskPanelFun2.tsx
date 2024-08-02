import styled from "styled-components"
import {MenuSelections} from "../GameBar/GameBar.tsx";
import {useState} from "react";
import TaskCheckMark from "./TargetSelectionPrompt/TaskCheckMark.tsx";
import {MainTasksPanel} from "./TasksPanelStuff/MainTasksPanel.tsx";
import TargetSelectionPrompt from "./TargetSelectionPrompt/TargetSelectionPrompt.tsx";
import {useSubmittedTasks} from "./useSubmittedTasksHook/useSubmittedTasks.tsx";
import TargetSelectionPrompt2 from "./TargetSelectionPrompt/TargetSelectionPrompt2.tsx";
import {useAppSelector} from "../../../Redux/hooks.tsx";

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`

interface IGameTaskProps {
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function MainTaskPanelFun2({closeMenu}: IGameTaskProps) {
    const [isPrompting, setIsPrompting] = useState(false)
    const visibleTasks = useAppSelector(x => x.gameState.gameState.visibleGameTasks)
    const [selectedTaskName, setSelectedTaskName] = useState(visibleTasks[0].gameTaskName);
    const [selectedTask, setSelectedTask] = useState(visibleTasks.find(x => x.gameTaskName === selectedTaskName));

    // caching the task inside useState so that it doesnt change the prompts if the targets change mid-prompt
    if (selectedTaskName !== selectedTask.gameTaskName) {
        setSelectedTask(visibleTasks.find(x => x.gameTaskName === selectedTaskName))
    }

    const startPrompting = () => {
        if (!selectedTask!.canExecuteTask) console.log("cant execute")

        setIsPrompting(true)
    }

    return (
        <div>
            {/*Will need a cancel task button one day*/}

            {/* Closes when prompting is open */}
            {(!isPrompting) && (
                <MainTasksPanel
                    closeMenu={closeMenu}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTaskName}
                    startPrompting={startPrompting}/>
            )}

            {(isPrompting) && (
                <TargetSelectionPrompt2
                    gameTaskResult={selectedTask!}
                />
            )}
        </div>
    )
}