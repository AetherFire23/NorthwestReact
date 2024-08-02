import styled from "styled-components"
import {MenuSelections} from "../GameBar/GameBar.tsx";
import {useState} from "react";
import TaskCheckMark from "./TargetSelectionPrompt/TaskCheckMark.tsx";
import {MainTasksPanel} from "./TasksPanelStuff/MainTasksPanel.tsx";
import TargetSelectionPrompt from "./TargetSelectionPrompt/TargetSelectionPrompt.tsx";
import {useSubmittedTasks} from "./useSubmittedTasksHook/useSubmittedTasks.tsx";

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`

interface IGameTaskProps {
    selectedMenu: MenuSelections;
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function MainTaskPanelFun({selectedMenu, closeMenu}: IGameTaskProps) {
    const isTasksOpen = selectedMenu === "tasks"
    const [isPrompting, setIsPrompting] = useState(false)

    const {
        setSelectedTask,
        targetSelection,
        displayedTargets,
        selectedTask,
        submitDisplayedTargetsOrExecuteTask,
        goToPrevious,
        executeTaskNoTargets,
        hasReachedMaximumTargets,
        hasReachedMinimumTargets
    } = useSubmittedTasks(() => setIsPrompting(false))

    // will prolly have to redo most of the tasks.
    //
    console.log(displayedTargets)



    console.log(`has previous target ${displayedTargets?.hasPreviousTargetList()}`)
    function startPrompting() {
        if (!selectedTask) throw new Error("should not be able to execute a task that does not exist.")
        if (!selectedTask.canExecuteTask) return;

        // if no targets, execute straight-away.
        if (selectedTask.taskPromptInfos.length === 0) {
            executeTaskNoTargets()
        } else {
            setIsPrompting(true)
        }
    }

    return (
        <div>
            {/*Will need a cancel task button one day*/}

            {/* Closes when prompting is open */}
            {(isTasksOpen && !isPrompting) && (
                <MainTasksPanel
                    closeMenu={closeMenu}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTask}
                    startPrompting={startPrompting}/>
            )}

            {(isPrompting) && (
                <TargetSelectionPrompt
                    hasPreviousTarget={displayedTargets?.hasPreviousTargetList()}
                    hasReachedMaximum={false}
                    hasReachedMinimum={true}
                    gameTaskPromptInfo={displayedTargets!.displayedTargets!}
                    check={targetSelection!.check}
                    isChecked={targetSelection!.isChecked}
                    uncheck={targetSelection!.uncheck}
                    submitDisplayedTargetsOrExecuteTask={submitDisplayedTargetsOrExecuteTask}
                    goToPrevious={goToPrevious}
                />
            )}
        </div>
    )
}