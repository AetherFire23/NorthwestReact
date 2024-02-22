import styled from "styled-components"
import { MenuSelections } from "../Bar";
import { ExitButtonDiv } from "../Inventory/Inventory";
import { useState } from "react";
import { ITargetScreenInfo } from "./TargetSelectionScreen";
import TargetSelectionScreen from './TargetSelectionScreen';
import { useSelections } from "../../Hooks/useSelections";
import { isEmpty } from "../../Utils/ListExtensions";

const GameTasksMenuDiv = styled.div`
    background-color: black;
    position: absolute;
    left: 5%;
    top: 5%;
    width: 90%;
    height: 90%;
    z-index: 99;
`
const AvailableTasksListDiv = styled.div`
    background-color: aliceblue;
    position: absolute;
    width: 30%;
    height: 85%;
    left: 5%;
    top: 10%;
`
const TaskInfosDiv = styled.div`
    background-color: aliceblue;
    position: absolute;
    width: 55%;
    height: 85%;
    left: 40%;
    top: 10%;
`
const AvailableTextLabel = styled.label`
    background-color: aliceblue;
    position: absolute;
    width: 20%;
    left: 5%;
    top: 3%;
`
const RequirementsLabel = styled.label`
    position: absolute;
    background-color: aliceblue;
    left: 5%;
    top: 2%;
`
const RequirementLineLabel = styled.label`
    
`
const RequirementsPanelDiv = styled.div`
    background-color: #aa9a9a;
    position: absolute;
    width: 90%;
    height: 40%;
    left: 5%;
    top: 7%;
`

const EffectsLabel = styled.label`
    position: absolute;
    left: 5%;
    top: 50%;
`
const EffectsPanelDiv = styled.div`
    background-color: blue;
    position: absolute;
    width: 90%;
    height: 40%;
    left: 5%;
    top: 55%;
`
const TaskAvailabilityDiv = styled.div`
    margin-left: 0.5rem;
    margin-top: 0.5rem;
`
interface IGameTaskProps {
    selectedMenu: MenuSelections;
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
export default function GameTaskMenu({ selectedMenu, closeMenu }: IGameTaskProps) {
    console.log(taskInfoMap)
    const isMenuOpen = selectedMenu === "tasks";
    const [selectedTask, setSelectedTask] = useState("stupidTask")
    const [isPrompting, setIsPrompting] = useState(false)

    // each inner array represents a STEP - a list of possible selections with a certain type (ex. room, item, player)
    const [submittedSelections, setSubmittedSelections] = useState<string[][]>([])
    function addSelections(selections: string[]) {
        const updatedSubmissions = [...submittedSelections!, selections]
        setSubmittedSelections(updatedSubmissions)
    }

    function submitTask() {
        console.log("Submit task completely")
        setIsPrompting(false)
    }

    function executeTaskOrStartPrompting() {
        if (!taskInfoMap[selectedTask].hasTarget) {
            console.log("execute task completely")
        }
        else {
            console.log("start prompting user")
            setIsPrompting(true)
        }
    }
    return (
        <div>
            {isPrompting && (
                <TargetSelectionScreen
                    submitTask={submitTask}
                    submitSelections={addSelections}
                    taskInfo={taskInfoMap[selectedTask]}>
                </TargetSelectionScreen>
            )}
            {(isMenuOpen && !isPrompting) && (
                <GameTasksMenuDiv>
                    <div onClick={executeTaskOrStartPrompting} style={{ position: "absolute", backgroundColor: "white", width: "5rem", height: "2rem", left: "1rem", top: "1rem" }}>

                    </div>
                    <ExitButtonDiv onClick={closeMenu}>
                        X
                    </ExitButtonDiv>
                    <AvailableTasksListDiv>
                        <ul style={{ margin: "0", padding: "0" }}>
                            {dummyTaskNames.map((x, i) => (
                                <li key={i}>
                                    <TaskAvailabilityDiv onClick={e => setSelectedTask(x)}>
                                        {x}
                                    </TaskAvailabilityDiv>
                                </li>
                            ))}
                        </ul>
                    </AvailableTasksListDiv>
                    <TaskInfosDiv>
                        <RequirementsLabel>
                            Requirements
                        </RequirementsLabel>
                        <RequirementsPanelDiv>
                            <ul style={{ margin: "0", padding: "0" }}>
                                {taskInfoMap[selectedTask].requirements.map(t => (
                                    <li>
                                        <div>
                                            {t}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </RequirementsPanelDiv>
                        <EffectsLabel>
                            Effects
                        </EffectsLabel>
                        <EffectsPanelDiv>
                            <ul style={{ margin: "0", padding: "0" }}>
                                {taskInfoMap[selectedTask].effects.map(t => (
                                    <li>
                                        <div>
                                            {t}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </EffectsPanelDiv>
                    </TaskInfosDiv>
                    <AvailableTextLabel> Available Tasks</AvailableTextLabel>
                </GameTasksMenuDiv>
            )}
        </div>
    )
}
const dummyTaskNames = [
    "stupidTask",
    "stupidTask2",
    "stupidTask3",
]
export interface ITargetCheck {
    isChecked: boolean,
    targetValue: string
}
export interface ITaskInfo {
    hasTarget: boolean,
    requirements: string[],
    effects: string[],
    targetSteps?: ITargetScreenInfo[]
}
const stupidTaskTargetsInfo2: ITargetScreenInfo = {
    minimumTargetsAmount: 1,
    maximumTargetsAmount: 3,
    targets: ["second screen !"],
    targetType: "room",
}
const stupidTaskTargetsInfo: ITargetScreenInfo = {
    minimumTargetsAmount: 1,
    maximumTargetsAmount: 3,
    targets: ["funstuffhere", "another bunch iof funstuff"],
    targetType: "room",
}

const stupidTaskInfo: ITaskInfo = {
    hasTarget: true,
    requirements: ["test"],
    effects: ["test"],
    targetSteps: [stupidTaskTargetsInfo, stupidTaskTargetsInfo2],
}

const stupidTaskInfo2: ITaskInfo = {
    hasTarget: true,
    requirements: ["test", "requirement2"],
    effects: ["test", "test2"],
    targetSteps: [stupidTaskTargetsInfo, stupidTaskTargetsInfo2],
}
const taskInfoMap: { [key: string]: ITaskInfo } = {
    "stupidTask": stupidTaskInfo,
    "stupidTask2": stupidTaskInfo2,
};


// interesting problem : any sort of conditional logic can happen here.
// ex: cannot select x and y, but can select xyz.
// Should the server, in that case, send the possible target selections permutations ?
// and I check if the current selection is inside the allowed permutations ?
// I am probably in the YAGNI space here.
// All I know is that im gonna need a target of X type
// and X amount of selections.
