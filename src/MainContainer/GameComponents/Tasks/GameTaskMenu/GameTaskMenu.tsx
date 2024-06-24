import styled from "styled-components"
import { MenuSelections } from "../../GameBar/GameBar.tsx";
import { useState } from "react";
import { useSubmittedTasks } from "./GameTaskMenu-hooks.tsx";
import TaskCheckMark from "../TasksPanelStuff/SelectionCheckMark.tsx";
import { MainTasksPanel } from "../TasksPanelStuff/MainTasksPanel.tsx";

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

export default function GameTaskMenu({ selectedMenu, closeMenu }: IGameTaskProps) {
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
    } = useSubmittedTasks(() => setIsPrompting(false))

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
            {(isPrompting) && (
                <TargetSelectionDiv>
                    <ul style={{ margin: "0", padding: "0" }}>
                        {displayedTargets?.displayedTargets.taskTargets.map(x => (
                            <li>
                                <TaskCheckMark
                                    check={() => targetSelection?.check(x)}
                                    uncheck={() => targetSelection?.uncheck(x)}
                                    isChecked={targetSelection!.isChecked(x)!}
                                    text={x.appearanceName!} />
                            </li>
                        ))}
                    </ul>
                    <button onClick={submitDisplayedTargetsOrExecuteTask}> submitTasks</button>
                    <button onClick={() => goToPrevious!()}> previous</button>
                </TargetSelectionDiv>
            )}

            {/* Closes when prompting is open */}
            {(isTasksOpen && !isPrompting) && (
                <MainTasksPanel closeMenu={closeMenu} selectedTask={selectedTask} setSelectedTask={setSelectedTask} startPrompting={startPrompting} />
            )}
        </div>
    )
}
const dummyTaskNames = [
    "stupidTask",
    "stupidTask2",
    "stupidTask3",
]

// export interface ITargetCheck {
//     isChecked: boolean,
//     targetValue: string
// }

// export interface ITaskInfo {
//     hasTarget: boolean,
//     requirements: string[],
//     effects: string[],
//     targetSteps?: ITargetScreenInfo[]
// }

// const stupidTaskTargetsInfo2: ITargetScreenInfo = {
//     minimumTargetsAmount: 1,
//     maximumTargetsAmount: 3,
//     targets: ["second screen !"],
//     targetType: "room",
// }
// const stupidTaskTargetsInfo: ITargetScreenInfo = {
//     minimumTargetsAmount: 1,
//     maximumTargetsAmount: 3,
//     targets: ["funstuffhere", "another bunch iof funstuff"],
//     targetType: "room",
// }

// const stupidTaskInfo: ITaskInfo = {
//     hasTarget: true,
//     requirements: ["test"],
//     effects: ["test"],
//     targetSteps: [stupidTaskTargetsInfo, stupidTaskTargetsInfo2],
// }

// const stupidTaskInfo2: ITaskInfo = {
//     hasTarget: true,
//     requirements: ["test", "requirement2"],
//     effects: ["test", "test2"],
//     targetSteps: [stupidTaskTargetsInfo, stupidTaskTargetsInfo2],
// }
// const taskInfoMap: { [key: string]: ITaskInfo } = {
//     "stupidTask": stupidTaskInfo,
//     "stupidTask2": stupidTaskInfo2,
// };


// interesting problem : any sort of conditional logic can happen here.
// ex: cannot select x and y, but can select xyz.
// Should the server, in that case, send the possible target selections permutations ?
// and I check if the current selection is inside the allowed permutations ?
// I am probably in the YAGNI space here.
// All I know is that im gonna need a target of X type
// and X amount of selections.

