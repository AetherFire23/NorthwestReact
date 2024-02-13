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
}
export default function TargetSelectionScreen({ taskInfo }: ITargetSelectionProps) {
    const [currentTargetStep, setCurrentTargetStep] = useState(0);
    const selectedStep = taskInfo.targetSteps![currentTargetStep]
    const { checkSelection, isSelected, reset, uncheckSelection, selections } = useSelections<string>(selectedStep.targets, (x, y) => x === y)
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