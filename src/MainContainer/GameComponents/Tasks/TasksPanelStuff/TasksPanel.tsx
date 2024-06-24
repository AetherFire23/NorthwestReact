import styled from "styled-components"
import TaskCheckMark from "./SelectionCheckMark"
import { GameTaskTargetInfo } from "../../../../Redux/query/generated"

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`

export function TasksPanel({ taskTargets, check, uncheck, isChecked, submitDisplayedTargetsOrExecuteTask, goToPrevious }: {
    taskTargets: GameTaskTargetInfo[],
    check: (val: GameTaskTargetInfo) => void,
    uncheck: (val: GameTaskTargetInfo) => void,
    isChecked: (val: GameTaskTargetInfo) => boolean,
    submitDisplayedTargetsOrExecuteTask: () => void,
    goToPrevious: (() => void) | undefined,
}) {
    return (
        <TargetSelectionDiv>
            <ul style={{ margin: "0", padding: "0" }}>
                {taskTargets.map(x => (
                    <li>
                        <TaskCheckMark
                            check={() => check(x)}
                            uncheck={() => uncheck(x)}
                            isChecked={isChecked(x)!}
                            text={x.appearanceName!} />
                    </li>
                ))}
            </ul>
            <button onClick={submitDisplayedTargetsOrExecuteTask}> submitTasks</button>
            <button onClick={() => goToPrevious!()}> previous</button>
        </TargetSelectionDiv>
    )
}