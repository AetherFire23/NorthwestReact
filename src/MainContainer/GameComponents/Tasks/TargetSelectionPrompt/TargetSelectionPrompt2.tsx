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
                onClick={() => formButtons.completeTask}> Complete: {formButtons.canCompleteTask ? "True" : "False"} </button>
        </TargetSelectionDiv>
    )
}

// Transforms the selectedTask into objects that map well to visual components.
// In other words, this transforms the DTO and backend data into frontend data.
// TODO : implement mechanism to execute the task
// dont forget the gameTaskResult needs to be stored in state in order to avoid null errors if the game state changes in the middle of a prompt
function useTargetPrompt(selectedGameTaskResult: GameTaskAvailabilityResult) {
    const [currentPromptsIndex, setCurrentScreenIndex] = useState(0);
    const currentPrompt = selectedGameTaskResult.taskPromptInfos[currentPromptsIndex]

    // First array is a screen, second is a list of targets
    // Put empty arrays to avoid out of bounds
    const [checkedTargets, setCheckedTargets] = useState<GameTaskTargetInfo[][]>(range(0, selectedGameTaskResult.taskPromptInfos.length)
        .map(x => []))
    const checksAtCurrentIndex = checkedTargets[currentPromptsIndex]


    const isCheckedTarget = (target: GameTaskTargetInfo) => {
        // requires target to actually have an Id.
        const isChecked = checksAtCurrentIndex.some(x => x.id === target.id)
        return isChecked
    }
    const onCheck = (target: GameTaskTargetInfo) => {
        // remove the check if checked
        if (isCheckedTarget(target)) {
            setCheckedTargets(produce(checkedTargets, checkedTargetsDraft => {
                // currently can only check/ uncheck by id, which would make the id prop absolutely mandatory
                // checkedTargetsDraft[currentPromptsIndex] = checkedTargetsDraft[currentPromptsIndex].filter(x => x != draftCheckedItem) // remove an element
                checkedTargetsDraft[currentPromptsIndex] = checkedTargetsDraft[currentPromptsIndex].filter(x => x.id != target.id) // remove an element
            }))
        }
        // add the check if NOT checked
        else {
            setCheckedTargets(produce(checkedTargets, draft => {
                draft[currentPromptsIndex].push(target)
            }))
        }
    }

    const isMinimumReached = checksAtCurrentIndex.length >= currentPrompt.minimumTargets!
    const isMaximumReached = checksAtCurrentIndex.length === currentPrompt.maximumTargets! - 1!
    // create current shown targets
    const shownTargets: ITarget[] = currentPrompt.taskTargets.map(x => {
        const target: ITarget = {
            isChecked: isCheckedTarget(x),
            onCheck: () => onCheck(x),
            name: x.appearanceName!,

            // must not hide a currently selected target (not used yet)
            isHidden: (isMaximumReached || isMinimumReached) && !isCheckedTarget(x),
        }
        return target
    })

    const isChecksWithinMinMaxBounds =
        (checksAtCurrentIndex.length >= currentPrompt.minimumTargets)
        &&
        (checksAtCurrentIndex.length <= currentPrompt.maximumTargets)
    const hasNextScreen = currentPromptsIndex < selectedGameTaskResult.taskPromptInfos.length -1
    const canCompleteTask = isChecksWithinMinMaxBounds && (currentPromptsIndex === selectedGameTaskResult.taskPromptInfos.length - 1)

    const formButtons: IFormButtons = {
        canGoToPrevious: currentPromptsIndex !== 0,
        canSubmit: isChecksWithinMinMaxBounds && hasNextScreen,
        canCompleteTask: canCompleteTask,
        submit: () => setCurrentScreenIndex(currentPromptsIndex + 1),
        previous: () => setCurrentScreenIndex(currentPromptsIndex - 1),
        completeTask: () => console.log("task should complete")
    }

    const fState: FormState = {
        shownTargets: shownTargets,
        formButtons: formButtons,
    }

    return fState;
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