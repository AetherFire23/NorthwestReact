import {GameTaskAvailabilityResultRead} from "../../../../../../Redux/query/generated.ts";
import styles from "../../../../../../../src/TextModule.module.css"

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
                    className={styles.pixelSelectableWhite}
                    id={task.gameTaskCode}
                    onClick={() => setSelectedTask(task.gameTaskName)}
                    style={{
                        fontSize: "2rem",
                        userSelect: "none",

                    }}
                >
                    {task.gameTaskName}

                    {/*Puts an arrow besides the task that is currently selected*/}
                    {selectedTask?.gameTaskName === task.gameTaskName ? " <-" : ""}
                </li>


            ))}

        </ul>
    )
}