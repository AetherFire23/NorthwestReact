interface ICheckMarkProps {
    isChecked: boolean,
    uncheck: () => void,
    check: () => void,
    text: string,
    hasReachedMaximumTargets?: boolean
}

export default function TaskCheckMark({check, uncheck, isChecked, text, hasReachedMaximumTargets}: ICheckMarkProps) {
    // if maximum amount of selected target reached
    // Grey out all non-checked targets

    function handleCheck() {
        console.log(text)
        if (isChecked) {
            uncheck()
            console.log("unchecked")
        } else {
            console.log("checked")
            check()
        }
    }

    const visibility = hasReachedMaximumTargets && !isChecked ? "hidden" : "inherit"

    return (
        <div style={{display: "flex", flexDirection: "row", visibility: visibility}}>
            <div
                onClick={handleCheck}
                style={{width: "1rem", height: "1rem", backgroundColor: "blueviolet"}}>
                {isChecked ? "X" : ""}
            </div>
            <div style={{width: "100%"}}>
                {text}
            </div>
        </div>
    )
}