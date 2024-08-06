import {useState} from "react";
import {useAppSelector} from "../../../../../../Redux/hooks.tsx";
import TaskListPanel from "./TaskListPanel.tsx";
import styles from "../../../../../../TextModule.module.css";
import {
    GameTaskAvailabilityResult,
    GameTaskAvailabilityResultRead,
    GameTaskTargetInfo, usePutGameExecuteTaskMutation
} from "../../../../../../Redux/query/generated.ts";
import {selectPlayerId} from "../../../../../../Redux/gameStateSlice.ts";
import {range} from "../../../../../../Utils/ListExtensions.tsx";
import {produce} from "immer";
import {ITarget} from "../../../../Tasks/TargetSelectionPrompt/TargetSelectionPrompt-types.tsx";

export default function TaskSubMenu() {
    const [isPrompting, setIsPrompting] = useState(false)
    const visibleTasks = useAppSelector(x => x.gameState.gameState.visibleGameTasks)
    const [selectedTaskName, setSelectedTaskName] = useState(visibleTasks[0].gameTaskName);

    const initialTask = visibleTasks.find(x => x.gameTaskName === selectedTaskName)

    if (!initialTask) throw new Error(" should have initi" +
        "al task or at least dummy task")
    const [selectedTask, setSelectedTask] = useState(initialTask);

    // caching the task inside useState so that it doesnt change the prompts if the targets change mid-prompt
    // taskName changes, then we update the Real Task
    if (selectedTaskName !== selectedTask.gameTaskName) {
        const nextTask = visibleTasks.find(x => x.gameTaskName === selectedTaskName)
        if (!nextTask) throw new Error("Next selected task should have valid task name")
        setSelectedTask(nextTask)
    }

    const startPrompting = () => {
        if (!selectedTask!.canExecuteTask) return;
        if (selectedTask.taskPromptInfos.length === 0) return;

        setIsPrompting(true)
    }

    const stopPrompting = () => setIsPrompting(false)

    return (
        <div
            style={{
                height: "100%",
                backgroundColor: "black"
            }}
        >
            {/*// ON MOBILE THEY WILL  HIT EXECUTE if it is on the top*/ }
            {/* COLOR for tabs*/}
            {/* make a single panel for requirements ,effects to allow for more info to be added later */}

            <div
                style={{
                    height: "1rem",
                }}
            />
            {/*Execute Button*/}
            <div
                style={{
                    display: "flex",
                    height: "15%",
                    backgroundColor: "green",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >


                <label
                    onClick={startPrompting}
                    className={styles.pixelselectable}
                    style={{
                        fontSize: "200%",
                    }}
                >
                    Execute
                </label>
            </div>
            {/*Screen show if prompting */}
            {!isPrompting && (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "green",
                        }}
                    >

                    </div>


                    <div
                        id={"tasks-list"}
                        style={{
                            height: "100%",
                            width: "50%",
                            backgroundColor: "black",

                        }}
                    >

                        <TaskListPanel
                            visibleTasks={visibleTasks}
                            selectedTask={selectedTask}
                            setSelectedTask={setSelectedTaskName}
                            startPrompting={startPrompting}
                        />
                    </div>

                    {/*Requirements */}
                    <div
                        style={{
                            height: "100%",
                            width: "50%",
                            backgroundColor: "white",
                            display: "flex",
                            flexDirection: "column"

                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: "50%",
                                backgroundColor: "black"
                            }}
                        >
                            <ul
                                style={{
                                    margin: "0",
                                    padding: "0",
                                }}
                            >
                                {/* will need to think about scrolling */}
                                {selectedTask.requirements.map((x, i) => (
                                    <li
                                        id={x.description}
                                        style={{
                                            fontSize: "1.5rem",
                                            color: "white",

                                        }}
                                    >
                                        {i + x.description}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/*Effects */}
                        <div
                            style={{
                                width: "100%",
                                height: "50%",
                                backgroundColor: "black"
                            }}
                        >
                            <ul
                                style={{
                                    margin: "0",
                                    color: "white"
                                }}
                            >
                                - not available -
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {isPrompting && (
                <div
                    style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    <PromptScreen
                        gameTaskResult={selectedTask}
                        closePrompt={stopPrompting}
                    />
                </div>
            )}
        </div>
    )
}

interface IPromptScreen {
    gameTaskResult: GameTaskAvailabilityResultRead,
    closePrompt: () => void
}

function PromptScreen({gameTaskResult, closePrompt}: IPromptScreen) {
    const {shownTargets, formButtons} = useTargetPrompt(gameTaskResult)

    const onTaskComplete = () => {
        closePrompt()
        formButtons.completeTask()
    }
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <ul
                style={{
                    margin: "0",
                    padding: "0",
                }}
            >
                {shownTargets.map((task) => (
                    <li
                        onClick={task.onCheck}
                        className={styles.pixelSelectableWhite}
                        style={{
                            color: task.isChecked ? "green" : "",
                            fontSize: "2rem"
                        }}
                    >
                        {task.name}
                    </li>
                ))}
            </ul>
            <label
                onClick={formButtons.previous}
                className={styles.pixelSelectableWhite}
                style={{
                    visibility: formButtons.canGoToPrevious ? "visible" : "hidden",

                }}
            >
                Previous
            </label>
            <label
                onClick={formButtons.submit}
                className={styles.pixelSelectableWhite}
                style={{
                    visibility: formButtons.canSubmit ? "visible" : "hidden",
                }}
            >
                Next
            </label>
            <label
                onClick={onTaskComplete}
                className={styles.pixelSelectableWhite}
                style={{
                    visibility: formButtons.canCompleteTask ? "visible" : "hidden",
                    color: "white",
                }}
            >
                Execute
            </label>
            <label
                onClick={closePrompt}
                className={styles.pixelSelectableWhite}
                style={{}}
            > Cancel Task </label>
        </div>
    )
}

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
    const isMinimumReached = checksAtCurrentIndex.length >= currentScreen.minimumTargets
    const isMaximumReached = checksAtCurrentIndex.length === currentScreen.maximumTargets - 1
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
                name: x.appearanceName,

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

const stylesTest = StyleSheet