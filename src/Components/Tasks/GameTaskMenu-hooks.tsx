import {useState} from "react";
import {useAppSelector} from "../../Redux/hooks.tsx";
import {
    GameTaskCodes,
    GameTaskTargetInfo, PutGameExecuteTaskApiArg, usePutGameExecuteTaskMutation
} from "../../Redux/query/generated.ts";
import {useSelections} from "../../Hooks/useSelections.tsx";
import {selectVisibleTasks} from "../../Redux/gameStateSlice.ts";
import {logObject} from "../../Utils/nice.tsx";
import {addElementImmutable, addRangeImmutable} from "../../Utils/ListExtensions.tsx";

// Goal : readonly and no persistence except for displaying stuff.
function useSelectedTask() {
    const availableGameTasks = useAppSelector(selectVisibleTasks)
    const [selectedTaskName, setSelectedTaskName] = useState(availableGameTasks[0].gameTaskName) // make condition if taskName === "" dont render anything
    const selectedTask = availableGameTasks.find(t => t.gameTaskName === selectedTaskName)

    return {
        setSelectedTaskName,
        selectedTask,
    }
}

function useDisplayedTargets() {
    const {selectedTask} = useSelectedTask()
    const [displayedTargetsIndex, setDisplayedTargetsIndex] = useState(0)

    // Targets shown on screen based on index
    // should not try to access anything if the task has disappeared
    if (!selectedTask) return undefined

    const displayedTargets = selectedTask.taskPromptInfos[displayedTargetsIndex]

    const hasNextTargetList = () => {
        if (selectedTask.taskPromptInfos.length === 0) {
            return false
        }
        return displayedTargetsIndex !== selectedTask.taskPromptInfos.length - 1
    }
    const advanceToNextTargetList = () => setDisplayedTargetsIndex(i => i + 1)
    const resetDisplayedTargets = () => setDisplayedTargetsIndex(0)
    return {
        displayedTargets,
        hasNextTargetList,
        advanceToNextTargetList,
        resetDisplayedTargets
    }
}

// desired return type:
// The currently selected task.
// The currently shown targets
// A method to advance to the next task target, OR to submit the task
// a method to goes back in the previous targets.
// Should not remove the

// Selected targets and displayed targets should follow the same index.
function useTargetSubmittedSelections() {


}

export function useSubmittedTasks(closeTargetsPrompt: () => void) {
    const gameState = useAppSelector(x => x.gameState)
    const selectedTaskData = useSelectedTask()
    const displayedTargetsData = useDisplayedTargets()
    const selectedTargetsData = useSelections<GameTaskTargetInfo>((x, y) => x === y)
    const [triggerExecuteTask, taskQueryData] = usePutGameExecuteTaskMutation()

    // A list of targets, therefore a list of list.
    // will probably need a hook of the submitted I guess
    const [submittedTargets, setSubmittedTargets] = useState<GameTaskTargetInfo[][]>([])



    const addCurrentTargetSelection = () => {
        setSubmittedTargets([...submittedTargets, selectedTargetsData.selections])
    }

    function executeTaskWithTargets() {
        if (!selectedTaskData.selectedTask) throw new Error("should not be able to submit targets without a task")

        const triggerTaskArguments: PutGameExecuteTaskApiArg = {
            taskCode: selectedTaskData.selectedTask.gameTaskCode,
            body: [...submittedTargets, selectedTargetsData.selections],
            playerId: gameState.gameState.playerUID,
        }
        triggerExecuteTask(triggerTaskArguments)
    }

    function executeTaskNoTargets() {
        if (!selectedTaskData.selectedTask) throw new Error("should not be able to submit targets without a task")

        const triggerTaskArguments: PutGameExecuteTaskApiArg = {
            taskCode: selectedTaskData.selectedTask.gameTaskCode,
            body: [],
            playerId: gameState.gameState.playerUID,
        }
        triggerExecuteTask(triggerTaskArguments)
    }

    function submitSelectionTargetsOrExecuteTask() {
        if (!selectedTaskData.selectedTask) throw new Error("should not be able to submit targets without a task")
        if (!displayedTargetsData) throw new Error("should not be able to submit targets without targets")

        const mustExecuteTask: boolean = !displayedTargetsData.hasNextTargetList()
        if (mustExecuteTask) {
            executeTaskWithTargets()

            // cleanup with finished prompting so that next task isnt filled with garbage
            closeTargetsPrompt()
            displayedTargetsData.resetDisplayedTargets()
            setSubmittedTargets([])
            selectedTargetsData.reset()
            return;
        }

        addCurrentTargetSelection()
        displayedTargetsData.advanceToNextTargetList() // only changes index
        selectedTargetsData.reset()
    }

    return {
        selectedTask: selectedTaskData.selectedTask, // can be undefined to check if task still visible
        setSelectedTask: selectedTaskData.setSelectedTaskName,
        taskExecutionRequestData: taskQueryData,
        displayedTargets: displayedTargetsData, // remember to null-check when using this.
        submitDisplayedTargetsOrExecuteTask: submitSelectionTargetsOrExecuteTask,
        targetSelection: selectedTargetsData,
        executeTaskNoTargets: executeTaskNoTargets,
    }
}
