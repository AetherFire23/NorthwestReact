import { useState } from "react";
import { useAppSelector } from "../../../../../../Redux/hooks.tsx";
import TaskListPanel from "./TaskListPanel.tsx";
import styles from "../../../../../../TextModule.module.css";
import {
    GameTaskAvailabilityResult,
    GameTaskAvailabilityResultRead,
    GameTaskTargetInfo, usePutGameExecuteTaskMutation
} from "../../../../../../Redux/query/generated.ts";
import { selectPlayerId } from "../../../../../../Redux/gameStateSlice.ts";
import { range } from "../../../../../../Utils/ListExtensions.tsx";
import { produce } from "immer";
import { ITarget } from "../../../../Tasks/TargetSelectionPrompt/TargetSelectionPrompt-types.tsx";

export default function TaskSubMenu() {
    const [isPrompting, setIsPrompting] = useState(false);
    const visibleTasks = useAppSelector(x => x.gameState.gameState.visibleGameTasks);
    const [selectedTaskName, setSelectedTaskName] = useState(visibleTasks[0].gameTaskName);

    const initialTask = visibleTasks.find(x => x.gameTaskName === selectedTaskName);

    if (!initialTask) throw new Error(" should have initial task or at least dummy task");
    const [selectedTask, setSelectedTask] = useState(initialTask);

    if (selectedTaskName !== selectedTask.gameTaskName) {
        const nextTask = visibleTasks.find(x => x.gameTaskName === selectedTaskName);
        if (!nextTask) throw new Error("Next selected task should have valid task name");
        setSelectedTask(nextTask);
    }

    const startPrompting = () => {
        if (!selectedTask!.canExecuteTask) return;
        if (selectedTask.taskPromptInfos.length === 0) return;
        setIsPrompting(true);
    };

    const stopPrompting = () => setIsPrompting(false);

    return (
        // this is so that we have two columns, then a last row at the end without the row's height taking 100% of the immedate parent height
            // where in our situation, the immediate parent height is 80% of the screen.
            // https://stackoverflow.com/questions/37386244/what-does-flex-1-mean
            <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Screen show if prompting */}
                {!isPrompting && (
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ flex: "1 1 0", display: "flex" }}>
                            <div
                                id={"tasks-list"}
                                style={{
                                    flex: "1",
                                    backgroundColor: "black",
                                    display: "flex",
                                    alignItems: "stretch"
                            }}
                        >
                            <TaskListPanel
                                visibleTasks={visibleTasks}
                                selectedTask={selectedTask}
                                setSelectedTask={setSelectedTaskName}
                                startPrompting={startPrompting}
                            />
                        </div>

                        {/* Requirements */}
                        <div
                            style={{
                                flex: "1",
                                backgroundColor: "black",
                                display: "flex",
                                flexDirection: "column",
                                padding: "1rem"
                            }}
                        >
                            <ul style={{ margin: "0", padding: "0" }}>
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

                            {/* Task DESCRIPTION */}
                            <div style={{ marginTop: "1rem" }}>
                                <label style={{ color: "white" }}> - Task Description</label>
                            </div>
                        </div>
                    </div>

                    {/* Execute Button */}
                    <div
                        style={{
                            flex: "0 0 15%",
                            display: "flex",
                            backgroundColor: "green",
                            justifyContent: "center",
                            alignItems: "center",
                            visibility: selectedTask.canExecuteTask ? "visible" : "hidden",
                        }}
                    >
                        <label
                            onClick={startPrompting}
                            className={styles.pixelselectable}
                            style={{ fontSize: "200%" }}
                        >
                            Execute
                        </label>
                    </div>
                </div>
            )}

            {isPrompting && (
                <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
                    <PromptScreen
                        gameTaskResult={selectedTask}
                        closePrompt={stopPrompting}
                    />
                </div>
            )}
        </div>
    );
}

interface IPromptScreen {
    gameTaskResult: GameTaskAvailabilityResultRead,
    closePrompt: () => void
}

function PromptScreen({ gameTaskResult, closePrompt }: IPromptScreen) {
    const { shownTargets, formButtons } = useTargetPrompt(gameTaskResult);

    const onTaskComplete = () => {
        closePrompt();
        formButtons.completeTask();
    };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <ul style={{ margin: "0", padding: "0" }}>
                {shownTargets.map((task) => (
                    <li
                        onClick={task.onCheck}
                        className={styles.pixelSelectableWhite}
                        style={{ color: task.isChecked ? "green" : "", fontSize: "2rem" }}
                    >
                        {task.name}
                    </li>
                ))}
            </ul>
            <label
                onClick={formButtons.previous}
                className={styles.pixelSelectableWhite}
                style={{ visibility: formButtons.canGoToPrevious ? "visible" : "hidden" }}
            >
                Previous
            </label>
            <label
                onClick={formButtons.submit}
                className={styles.pixelSelectableWhite}
                style={{ visibility: formButtons.canSubmit ? "visible" : "hidden" }}
            >
                Next
            </label>
            <label
                onClick={onTaskComplete}
                className={styles.pixelSelectableWhite}
                style={{ visibility: formButtons.canCompleteTask ? "visible" : "hidden", color: "white" }}
            >
                Execute
            </label>
            <label
                onClick={closePrompt}
                className={styles.pixelSelectableWhite}
            >
                Cancel Task
            </label>
        </div>
    );
}

function useTargetPrompt(selectedGameTaskResult: GameTaskAvailabilityResult) {
    // ========== SETUP STATE ==========
    const playerId = useAppSelector(selectPlayerId);
    const [screenIndex, setCurrentScreenIndex] = useState(0);
    const [checkedTargets, setCheckedTargets] = useState<GameTaskTargetInfo[][]>(range(0, selectedGameTaskResult.taskPromptInfos.length)
        .map((_) => []));

    // ========== DERIVED STATE ==========
    const currentScreen = selectedGameTaskResult.taskPromptInfos[screenIndex];
    const lastPromptIndex = selectedGameTaskResult.taskPromptInfos.length - 1;
    const checksAtCurrentIndex = checkedTargets[screenIndex];
    const isMinimumReached = checksAtCurrentIndex.length >= currentScreen.minimumTargets;
    const isMaximumReached = checksAtCurrentIndex.length === currentScreen.maximumTargets - 1;
    const isChecksWithinMinMaxBounds =
        (checksAtCurrentIndex.length >= currentScreen.minimumTargets) &&
        (checksAtCurrentIndex.length <= currentScreen.maximumTargets);
    const hasNextScreen = screenIndex < lastPromptIndex;
    const canCompleteTask = isChecksWithinMinMaxBounds && (screenIndex === lastPromptIndex);

    const isCheckedTarget = (target: GameTaskTargetInfo) =>
        checksAtCurrentIndex.some(x => x.id === target.id);

    const handleCheck = (target: GameTaskTargetInfo) => {
        if (isCheckedTarget(target)) {
            setCheckedTargets(produce(checkedTargets, checkedTargetsDraft => {
                checkedTargetsDraft[screenIndex] = checkedTargetsDraft[screenIndex].filter(x => x.id != target.id);
            }));
        } else {
            setCheckedTargets(produce(checkedTargets, checkedTargetsDraft => {
                checkedTargetsDraft[screenIndex].push(target);
            }));
        }
    };

    const [triggerExecuteTask, data] = usePutGameExecuteTaskMutation();
    const completeGameTask = () => {
        triggerExecuteTask({
            taskCode: selectedGameTaskResult.gameTaskCode,
            playerId: playerId,
            body: checkedTargets
        });
    };

    return {
        shownTargets: currentScreen.taskTargets.map(x => {
            const target: ITarget = {
                isChecked: isCheckedTarget(x),
                onCheck: () => handleCheck(x),
                name: x.appearanceName,
                isHidden: (isMaximumReached || isMinimumReached) && !isCheckedTarget(x),
            };
            return target;
        }),
        formButtons: {
            canGoToPrevious: screenIndex !== 0,
            canSubmit: isChecksWithinMinMaxBounds && hasNextScreen,
            canCompleteTask: canCompleteTask,
            submit: () => setCurrentScreenIndex(screenIndex + 1),
            previous: () => setCurrentScreenIndex(screenIndex - 1),
            completeTask: completeGameTask
        }
    };
}
