import {
    GameTaskAvailabilityResult,
    GameTaskAvailabilityResultRead, GameTaskCodes, GameTaskPromptInfo,
    GameTaskTargetInfo, usePutGameExecuteTaskMutation
} from "../../../../Redux/query/generated.ts";
import React, {useState} from "react";
import {produce} from "immer";
import styled from "styled-components";
import {FormState, IFormButtons, ITarget} from "./TargetSelectionPrompt-types.tsx";
import {range} from "../../../../Utils/ListExtensions.tsx";
import {useAppSelector} from "../../../../Redux/hooks.tsx";
import {selectPlayerId} from "../../../../Redux/gameStateSlice.ts";

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`
export default function TargetSelectionPrompt({gameTaskResult}:
                                                  {
                                                      gameTaskResult: GameTaskAvailabilityResultRead
                                                  }) {
    const {shownTargets, formButtons} = useTargetPrompt(gameTaskResult)
    // make an exit button to cancel executing a task.

    return (
        <TargetSelectionDiv>
            <ul>
                {shownTargets.map((x, i) => (
                    <li id={i.toString()}>
                        <button onClick={x.onCheck}>
                            {x.isChecked ? "X" : " -"}
                            -
                            {x.isHidden ? "hidden" : "vis"}
                            -
                            {x.name}
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={formButtons.submit}> Submit {formButtons.canSubmit ? "Can go to" : "cannot"} </button>
            <button
                onClick={formButtons.previous}> Previous {formButtons.canGoToPrevious ? "can preivous" : "cannot previous"}</button>
            <button
                onClick={() => formButtons.completeTask()}> Complete: {formButtons.canCompleteTask ? "True" : "False"} </button>
        </TargetSelectionDiv>
    )
}

// Transforms the selectedTask into objects that map well to visual components.
// In other words, this transforms the DTO and backend data into frontend components.
// TODO : implement method to execute the task
// dont forget the gameTaskResult needs to be stored in state in order to avoid null errors if the game state changes in the middle of a prompt
function useTargetPrompt(selectedGameTaskResult: GameTaskAvailabilityResult) {
    // ========== SETUP STATE ==========
    const playerId = useAppSelector(selectPlayerId)

    // Track the current screen index
    const [screenIndex, setCurrentScreenIndex] = useState(0);

    // Array of arrays to keep track of selected targets for each prompt
    // Initialize with empty arrays to avoid out-of-bounds errors
    const [checkedTargets, setCheckedTargets] = useState<GameTaskTargetInfo[][]>(range(0, selectedGameTaskResult.taskPromptInfos.length)
        .map((_) => []))

    // ========== DERIVED STATE ==========
    const currentScreen = selectedGameTaskResult.taskPromptInfos[screenIndex]
    const lastPromptIndex = selectedGameTaskResult.taskPromptInfos.length - 1
    const checksAtCurrentIndex = checkedTargets[screenIndex]
    const isMinimumReached = checksAtCurrentIndex.length >= currentScreen.minimumTargets!
    const isMaximumReached = checksAtCurrentIndex.length === currentScreen.maximumTargets! - 1!
    const isChecksWithinMinMaxBounds =
        (checksAtCurrentIndex.length >= currentScreen.minimumTargets) &&
        (checksAtCurrentIndex.length <= currentScreen.maximumTargets)
    const hasNextScreen = screenIndex < lastPromptIndex
    const canCompleteTask = isChecksWithinMinMaxBounds && (screenIndex === lastPromptIndex)

    // ========== DERIVED STATE FUNCTIONS ==========
    const isCheckedTarget = (target: GameTaskTargetInfo) =>
        checksAtCurrentIndex.some(x => x.id === target.id)

    // ========== FORM ACTIONS ==========
    // Handle the check/uncheck action for a target
    const handleCheck = (target: GameTaskTargetInfo) => {
        // remove the check if checked
        if (isCheckedTarget(target)) {
            setCheckedTargets(produce(checkedTargets, checkedTargetsDraft => {
                // currently can only check/ uncheck by id, which is currently making the id prop absolutely mandatory
                // The reason is if the equality comparer is the reference, it would reset on every render
                checkedTargetsDraft[screenIndex] = checkedTargetsDraft[screenIndex].filter(x => x.id != target.id) // remove an element
            }))
        } else {
            setCheckedTargets(produce(checkedTargets, checkedTargetsDraft => {
                checkedTargetsDraft[screenIndex].push(target)
            }))
        }
    }

    console.log(playerId)

    const [triggerExecuteTask, data] = usePutGameExecuteTaskMutation()
    const completeGameTask = () => {
        triggerExecuteTask(
            {
                taskCode: selectedGameTaskResult.gameTaskCode,
                playerId: playerId,
                body: checkedTargets
            })
    }

    // ========== CREATE OBJECTS MAPPABLE TO REACTIVE COMPONENTS   ==========
    return {
        shownTargets: currentScreen.taskTargets.map(x => {
            const target: ITarget = {
                isChecked: isCheckedTarget(x),
                onCheck: () => handleCheck(x),
                name: x.appearanceName!,

                // must not hide a currently selected target (not used yet)
                isHidden: (isMaximumReached || isMinimumReached) && !isCheckedTarget(x),
            }
            return target
        }),
        formButtons: {
            canGoToPrevious: screenIndex !== 0,
            canSubmit: isChecksWithinMinMaxBounds && hasNextScreen,
            canCompleteTask: canCompleteTask,
            submit: () => setCurrentScreenIndex(screenIndex + 1),
            previous: () => setCurrentScreenIndex(screenIndex - 1),
            completeTask: completeGameTask
        }
    }
}


// function useCompleteGameTask(checks: GameTaskPromptInfo[][], taskCode: GameTaskCodes) {
//     const [triggerExecuteTask, data] = usePutGameExecuteTaskMutation()
//     const execute = () => {
//         triggerExecuteTask({
//             body: checks,
//             taskCode: taskCode,
//             playerId:
//         })
//     }
//
// }