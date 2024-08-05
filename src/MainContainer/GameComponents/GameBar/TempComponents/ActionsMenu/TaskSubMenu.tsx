import {useState} from "react";
import {useAppSelector} from "../../../../../Redux/hooks.tsx";

export default function TaskSubMenu() {
    const [isPrompting, setIsPrompting] = useState(false)
    const visibleTasks = useAppSelector(x => x.gameState.gameState.visibleGameTasks)
    const [selectedTaskName, setSelectedTaskName] = useState(visibleTasks[0].gameTaskName);

    const initialTask = visibleTasks.find(x => x.gameTaskName === selectedTaskName)

    if (!initialTask) throw new Error(" should have initial task or at least dummy task")
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


    return (
        <div
            style={{
                height: "100%",
                backgroundColor: "red"
            }}
        >

            {!isPrompting && (
                <TaskInformationPanel/>
            )}
        </div>
    )
}

function TaskInformationPanel() {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row"
            }}
        >

            <div
                style={{
                    height: "100%",
                    width: "50%",
                    backgroundColor: "blue",
                }}
            >
                Requirements
            </div>


            {/*Requirements begin ! */}
            <div
                style={{
                    height: "100%",
                    width: "50%",
                    backgroundColor: "violet",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "50%",
                        backgroundColor: "blanchedalmond"
                    }}
                >
                    1
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "50%",
                        backgroundColor: "darkslateblue"
                    }}
                >
                    2
                </div>

            </div>
        </div>
    )
}

function TaskPrompt() {
    return (
        <div>
            <label> Prompt </label>
        </div>
    )
}