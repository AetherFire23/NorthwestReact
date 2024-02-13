import styled from "styled-components";
import { ITargetCheck, ITaskInfo } from "./GameTaskMenu";
import { useState } from "react";
import TaskCheckMark from "./SelectionCheckMark";
import { useSelections } from "../../Hooks/useSelections";
const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`
interface ITargetSelectionProps {
    taskInfo: ITaskInfo,
    submitSelections: (arg: string[]) => void
}
export default function TargetSelectionScreen({ taskInfo }: ITargetSelectionProps) {
    const [currentTargetStepIndex, setCurrentTargetStep] = useState(0);
    const selectedStep = taskInfo.targetSteps![currentTargetStepIndex]
    const { checkSelection, isSelected, reset, uncheckSelection, selections } = useSelections<string>(selectedStep.targets, (x, y) => x === y)

    function handleNextStep() {
        const hasNextStep = currentTargetStepIndex + 1 === taskInfo.targetSteps?.length
        setCurrentTargetStep(currentTargetStepIndex + 1)
    }
    return (
        <>
            {taskInfo.hasTarget && (
                <TargetSelectionDiv>
                    <ul style={{ margin: "0", padding: "0" }}>
                        {selectedStep.targets.map(x => (
                            <li>
                                <TaskCheckMark
                                    check={() => checkSelection(x)}
                                    uncheck={() => uncheckSelection(x)}
                                    isChecked={isSelected(x)} text={x} />
                            </li>
                        ))}
                    </ul>
                    <button> submitTasks </button>
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

interface ISelectedTargets {
    targetType: string,
    selectedTargets: string[]
}