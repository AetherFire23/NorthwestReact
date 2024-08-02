import styled from "styled-components"
import { GameTaskAvailabilityResultRead } from "../../../../Redux/query/generated.ts"
import { useAppSelector } from "../../../../Redux/hooks.tsx"
import { selectVisibleTasks } from "../../../../Redux/gameStateSlice.ts"
import { ExitButtonDiv } from "../../GameBar/Inventory/Inventory.tsx"

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

export function MainTasksPanel({ startPrompting, closeMenu, selectedTask, setSelectedTask }: {
    startPrompting: () => void,
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void, 
    selectedTask: GameTaskAvailabilityResultRead | undefined,
    setSelectedTask: React.Dispatch<React.SetStateAction<string>>
}) {
    const visibleTasks = useAppSelector(selectVisibleTasks)
   console.log(selectedTask)
    return (
        <GameTasksMenuDiv>
            <div onClick={startPrompting} style={{
                position: "absolute",
                backgroundColor: "red",
                width: "5rem",
                height: "2rem",
                left: "35rem",
                top: "1rem"
            }}>
                Ex
            </div>
            <ExitButtonDiv onClick={closeMenu}>
                X
            </ExitButtonDiv>

            <AvailableTasksListDiv>
                <ul style={{ margin: "0", padding: "0" }}>
                    {visibleTasks.map((x, i) => (
                        <li key={i}>
                            <TaskAvailabilityDiv
                                style={{ backgroundColor: x.canExecuteTask ? "" : "brown" }}
                                onClick={() => {
                                    console.log(x.gameTaskName)
                                    setSelectedTask(x.gameTaskName)
                                }}>
                                {x.gameTaskName}
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
                        {selectedTask!.requirements.map(t => (
                            <li>
                                <div>
                                    {t.description}
                                </div>
                            </li>
                        ))}
                    </ul>
                </RequirementsPanelDiv>
                <EffectsLabel>
                    Effects
                </EffectsLabel>
            </TaskInfosDiv>
            <AvailableTextLabel> Available Tasks</AvailableTextLabel>
        </GameTasksMenuDiv>
    )
}