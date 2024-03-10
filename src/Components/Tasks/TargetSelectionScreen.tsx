import styled from "styled-components";
import {ITaskInfo} from "./GameTaskMenu";
import {useState} from "react";
import TaskCheckMark from "./SelectionCheckMark";
import {useSelections} from "../../Hooks/useSelections";
import * as shared from "../../Redux/query/generated.ts"
import {GameTaskTargetInfo} from "../../Redux/query/generated.ts";

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`

interface ITargetSelectionProps {
    displayedTargets: undefined | {
        advanceToNextTargetList: () => void;
        displayedTargets: GameTaskTargetInfo[];
        hasNextTargetList: () => boolean
    },
    taskExecutionRequestState: any
}

export default function TargetSelectionScreen({ displayedTargets, taskExecutionRequestState }: ITargetSelectionProps) {

    // If I am executing the task, I want to show a little spinner
    // If I am selecting targets, I want the target selection screen.
    return (
        <>
            { && (
                <TargetSelectionDiv>
                    <ul style={{margin: "0", padding: "0"}}>
                        {selectedStep.targets.map(x => (
                            <li>
                                <TaskCheckMark
                                    check={() => checkSelection(x)}
                                    uncheck={() => uncheckSelection(x)}
                                    isChecked={isSelected(x)} text={x}/>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextStepOrSubmit}> submitTasks</button>
                </TargetSelectionDiv>
            )}
        </>
    )
}

export interface ITargetScreenInfo {
    targetType: string;
    targets: string[];
    minimumTargetsAmount: number;
    maximumTargetsAmount: number;
}

