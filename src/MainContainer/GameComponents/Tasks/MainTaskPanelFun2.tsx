import styled from "styled-components"
import {useState} from "react";
import {MainTasksPanel} from "./TasksPanelStuff/MainTasksPanel.tsx";
import TargetSelectionPrompt2 from "./TargetSelectionPrompt/TargetSelectionPrompt2.tsx";
import {useAppSelector} from "../../../Redux/hooks.tsx";

const TargetSelectionDiv = styled.div`
    position: absolute;
    background-color: #6e6e5a;
    width: 50%;
    height: 50%;
    left: 25%;
    top: 25%;
`

interface IGameTaskProps {
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function MainTaskPanelFun2({closeMenu}: IGameTaskProps) {
    const [isPrompting, setIsPrompting] = useState(false)
    const visibleTasks = useAppSelector(x => x.gameState.gameState.visibleGameTasks)
    const [selectedTaskName, setSelectedTaskName] = useState(visibleTasks[0].gameTaskName);

    const initialTask = visibleTasks.find(x => x.gameTaskName === selectedTaskName)

    if(!initialTask) throw new Error(" should have initial task or at least dummy task")
    const [selectedTask, setSelectedTask] = useState(initialTask);



    // caching the task inside useState so that it doesnt change the prompts if the targets change mid-prompt
    if (selectedTaskName !== selectedTask.gameTaskName) {
        const nextTask =  visibleTasks.find(x => x.gameTaskName === selectedTaskName)
        if(!nextTask)  throw new Error("Next selected task should have valid task name")
        setSelectedTask(nextTask)
    }

    const startPrompting = () => {
        if (!selectedTask!.canExecuteTask) return;
        if(selectedTask.taskPromptInfos.length === 0) return;

        setIsPrompting(true)
    }

    return (
        <div>
            {/*Will need a cancel task button one day*/}
            {/* Closes when prompting is open */}
            {(!isPrompting) && (
                <MainTasksPanel
                    closeMenu={closeMenu}
                    selectedTask={selectedTask}
                    setSelectedTask={setSelectedTaskName}
                    startPrompting={startPrompting}/>
            )}
            {(isPrompting) && (
                <TargetSelectionPrompt2
                    gameTaskResult={selectedTask!}
                />
            )}
        </div>
    )
}