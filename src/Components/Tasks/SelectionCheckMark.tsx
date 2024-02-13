
interface ICheckMarkProps {
    isChecked: boolean,
    uncheck: () => void,
    check: () => void,
    text: string,
}
export default function TaskCheckMark({ check, uncheck, isChecked, text }: ICheckMarkProps) {

    function handleCheck() {
        console.log(text)
        if (isChecked) {
            uncheck()
            console.log("unchecked")
        }
        else {
            console.log("checked")
            check()
        }
    }
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div
                onClick={handleCheck}
                style={{ width: "1rem", height: "1rem", backgroundColor: "blueviolet" }}>
                {isChecked ? "X" : ""}
            </div>
            <div style={{ width: "100%" }}>
                {text}
            </div>
        </div>
    )
}