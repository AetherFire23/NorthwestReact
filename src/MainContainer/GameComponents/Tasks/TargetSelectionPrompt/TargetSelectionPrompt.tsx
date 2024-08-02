import TaskCheckMark from "./TaskCheckMark.tsx";
import React from "react";
import styled from "styled-components";
import {GameTaskPromptInfo, GameTaskTargetInfo} from "../../../../Redux/query/generated.ts";

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`

interface ITargetSelectionsPromptProps {
    gameTaskPromptInfo: GameTaskPromptInfo,
    check: ((val: GameTaskTargetInfo) => void),
    uncheck: ((val: GameTaskTargetInfo) => void),
    isChecked: (val: GameTaskTargetInfo) => boolean,
    submitDisplayedTargetsOrExecuteTask: () => void,
    goToPrevious: (() => void) | undefined,
    hasReachedMaximum: boolean,
    hasReachedMinimum: boolean,
    hasPreviousTarget?: boolean | undefined
}

export default function TargetSelectionPrompt(
    {
        gameTaskPromptInfo,
        check,
        uncheck,
        isChecked,
        submitDisplayedTargetsOrExecuteTask,
        goToPrevious,
        hasReachedMaximum,
        hasReachedMinimum,
        hasPreviousTarget
    }: ITargetSelectionsPromptProps) {

    // make an exit button to cancel executing a task.

    return (
        <TargetSelectionDiv>
            <ul style={{margin: "0", padding: "0"}}>
                {gameTaskPromptInfo.taskTargets.map(x => (
                    <li>
                        <TaskCheckMark
                            hasReachedMaximumTargets={hasReachedMaximum}
                            check={() => check(x)}
                            uncheck={() => uncheck(x)}
                            isChecked={isChecked(x)!}
                            text={x.appearanceName!}/>
                    </li>
                ))}
            </ul>
            <button
                style={{visibility: hasReachedMinimum ? "inherit" : "hidden"}}
                onClick={submitDisplayedTargetsOrExecuteTask}> submitTasks
            </button>
            <button
                style={{visibility: hasPreviousTarget ? "inherit" : "hidden"}}
                onClick={() => goToPrevious!()}> previous
            </button>
        </TargetSelectionDiv>
    )
}