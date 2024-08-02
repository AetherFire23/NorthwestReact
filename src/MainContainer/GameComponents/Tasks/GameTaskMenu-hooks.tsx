// import {useState} from "react";
// import { useAppSelector } from "../../../Redux/hooks.tsx";
// import { selectVisibleTasks } from "../../../Redux/gameStateSlice.ts";
// import { useSelections } from "../../../Hooks/useSelections.tsx";
// import { GameTaskTargetInfo, PutGameExecuteTaskApiArg, usePutGameExecuteTaskMutation } from "../../../Redux/query/generated.ts";
//
// // Goal : readonly and no persistence except for displaying stuff.
// export function useSelectedTask() {
//     const availableGameTasks = useAppSelector(selectVisibleTasks)
//
//
//     const [selectedTaskName, setSelectedTaskName] = useState(availableGameTasks[0].gameTaskName)
//     const selectedTask = availableGameTasks.find(t => t.gameTaskName === selectedTaskName)
//
//     return {
//         setSelectedTaskName,
//         selectedTask,
//     }
// }
//
// export function useSelectedTargets() {
//     const selectedTargetsData = useSelections<GameTaskTargetInfo>((x, y) => x === y)
//
//     // where the actual selections are stored: List of list of targets
//     const [savedSelections, setSavedSelections] = useState<GameTaskTargetInfo[][]>([])
//     const [selectedIndex, setSelectedIndex] = useState<number>(0)
//
//     function setSelectionsIndex(nextIndex: number) {
//         const savedSelectionsCopy = [...savedSelections]
//         savedSelectionsCopy[selectedIndex] = selectedTargetsData.selections
//
//         const isOOB = nextIndex > savedSelections.length - 1
//         if (isOOB) {
//             // Add an empty list since it is the first time the user reaches this point.
//             console.log("this is considered OOB")
//             const selectionsWithEmptyArray =[...savedSelectionsCopy, []]
//             setSavedSelections(selectionsWithEmptyArray)
//             selectedTargetsData.reset()
//         } else {
//             // Set selections at the index
//             console.log("this move was considered already initialized")
//             // before moving to next index, save the current selections
//             setSavedSelections(savedSelectionsCopy)
//
//             const nextSelections = savedSelections[nextIndex]
//             selectedTargetsData.reset(nextSelections)
//         }
//         setSelectedIndex(nextIndex)
//     }
//
//     function clearSelections() {
//         setSavedSelections([])
//         selectedTargetsData.reset()
//     }
//
//     return {
//         selectedTargets: selectedTargetsData.selections,
//         isChecked: selectedTargetsData.isSelected,
//         check: selectedTargetsData.checkSelection,
//         uncheck: selectedTargetsData.uncheckSelection,
//         setSelections: setSelectionsIndex,
//         clear: clearSelections,
//     }
// }
//
// export function useDisplayedTargets() {
//     const {selectedTask} = useSelectedTask()
//     const [displayedTargetsIndex, setDisplayedTargetsIndex] = useState(0)
//     const selectionsData = useSelectedTargets()
//
//     // Targets shown on screen based on index
//     // should not try to access anything if the task has disappeared
//     if (!selectedTask) return undefined
//
//     const displayedTargets = selectedTask.taskPromptInfos[displayedTargetsIndex]
//
//     const hasNextTargetList = () => {
//         if (selectedTask.taskPromptInfos.length === 0) return false
//
//         return displayedTargetsIndex !== selectedTask.taskPromptInfos.length - 1
//     }
//
//     // selections only move with the displayed targets
//     const advanceToNextTargetList = () => {
//         const nextIndex = displayedTargetsIndex + 1
//         setDisplayedTargetsIndex(nextIndex)
//         selectionsData.setSelections(nextIndex)
//     }
//
//     function goToPreviousTargetList() {
//         const previousIndex = displayedTargetsIndex - 1
//         setDisplayedTargetsIndex(previousIndex)
//         selectionsData.setSelections(previousIndex)
//     }
//
//     const resetDisplayedTargets = () => setDisplayedTargetsIndex(0)
//     return {
//         displayedTargets,
//         hasNextTargetList,
//         advanceToNextTargetList,
//         resetDisplayedTargets,
//         goToPreviousTargetList,
//         selectionsData: selectionsData,
//         index: displayedTargetsIndex,
//     }
// }
//
// export function useSubmittedTasks(closeTargetsPrompt: () => void) {
//     const gameState = useAppSelector(x => x.gameState)
//     const selectedTaskData = useSelectedTask()
//     const displayedTargetsData = useDisplayedTargets()
//     const currentSelectedTargets = displayedTargetsData?.selectionsData.selectedTargets
//     const [triggerExecuteTask, taskQueryData] = usePutGameExecuteTaskMutation()
//
//     // A list of targets, therefore a list of list.
//     const [submittedTargets, setSubmittedTargets] = useState<GameTaskTargetInfo[][]>([])
//
//     const saveCurrentTargetSelectionToSubmitted = () => {
//         if (!currentSelectedTargets) throw new Error(" shouldnt be null")
//
//         const submittedTargetsCopy = [...submittedTargets]
//         submittedTargetsCopy[displayedTargetsData?.index] = displayedTargetsData?.selectionsData.selectedTargets
//         setSubmittedTargets(submittedTargetsCopy)
//     }
//
//     function executeTaskWithTargets() {
//         if (!selectedTaskData.selectedTask) throw new Error("should not be able to submit targets without a task")
//         if (!currentSelectedTargets) throw new Error(" shouldnt be null")
//
//         const triggerTaskArguments: PutGameExecuteTaskApiArg = {
//             taskCode: selectedTaskData.selectedTask.gameTaskCode,
//             body: [...submittedTargets, currentSelectedTargets],
//             playerId: gameState.gameState.playerUID,
//         }
//         triggerExecuteTask(triggerTaskArguments)
//     }
//
//     function executeTaskNoTargets() {
//         if (!selectedTaskData.selectedTask) throw new Error("should not be able to submit targets without a task")
//
//         const triggerTaskArguments: PutGameExecuteTaskApiArg = {
//             taskCode: selectedTaskData.selectedTask.gameTaskCode,
//             body: [],
//             playerId: gameState.gameState.playerUID,
//         }
//         triggerExecuteTask(triggerTaskArguments)
//     }
//
//     function submitSelectionTargetsOrExecuteTask() {
//         if (!selectedTaskData.selectedTask) throw new Error("should not be able to submit targets without a task")
//         if (!displayedTargetsData) throw new Error("should not be able to submit targets without targets")
//
//         const mustExecuteTask: boolean = !displayedTargetsData.hasNextTargetList()
//         if (mustExecuteTask) {
//             executeTaskWithTargets()
//
//             // cleanup with finished prompting so that next task isn't filled with garbage
//             closeTargetsPrompt()
//             displayedTargetsData.resetDisplayedTargets()
//             setSubmittedTargets([])
//             displayedTargetsData.selectionsData.clear()
//             return;
//         }
//
//         saveCurrentTargetSelectionToSubmitted()
//         displayedTargetsData.advanceToNextTargetList() // only changes index
//     }
//
//     return {
//         selectedTask: selectedTaskData.selectedTask, // can be undefined to check if task still visible
//         setSelectedTask: selectedTaskData.setSelectedTaskName,
//         taskExecutionRequestData: taskQueryData,
//         displayedTargets: displayedTargetsData, // remember to null-check when using this.
//         submitDisplayedTargetsOrExecuteTask: submitSelectionTargetsOrExecuteTask,
//         targetSelection: displayedTargetsData?.selectionsData,
//         executeTaskNoTargets: executeTaskNoTargets,
//         goToPrevious: displayedTargetsData?.goToPreviousTargetList,
//     }
// }
