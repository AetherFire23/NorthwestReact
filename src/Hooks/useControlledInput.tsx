import {useState} from "react";

export default function useControlledInput(initialValue: string = "") {
    const [textInput, setTextInput] = useState(initialValue)
    const controlChatMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value)
    }

    return {
        control: controlChatMessage,
        text: textInput
    }
}
