import {GameTaskAvailabilityResultRead} from "../../../../../../Redux/query/generated.ts";

interface TaskListPanelProps {
    startPrompting: () => void,
    selectedTask: GameTaskAvailabilityResultRead | undefined,
    setSelectedTask: React.Dispatch<React.SetStateAction<string>>,
    visibleTasks: GameTaskAvailabilityResultRead[]
}

export default function TaskListPanel({
                                          startPrompting,
                                          selectedTask,
                                          setSelectedTask,
                                          visibleTasks
                                      }: TaskListPanelProps) {

    return (
        <ul style={{
            marginLeft: "0",
            marginTop: "1rem",
            paddingLeft: "1rem",
        }}>
            {visibleTasks.map(task => (
                /* Task element */
                <li
                    id={task.gameTaskCode}
                    onClick={() => setSelectedTask(task.gameTaskName)}
                    style={{
                        fontSize: "2rem",
                        color: "white",
                    }}
                >
                    {task.gameTaskName}
                </li>
            ))}
        </ul>
    )
}