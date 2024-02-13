import { useState } from "react";
import { containsWithEqualityComparer, hasDuplicateWithComparer, hasDuplicates } from "../Utils/ListExtensions";



// equality is to check if two checked items are the same. 
export function useSelections<T>(initialSelections: T[], equalityComparer: (arg1: T, arg2: T) => boolean) {
    // expects non-duplicates

    if (hasDuplicateWithComparer(initialSelections, equalityComparer)) {
        console.error("Yeah so no duplicates allowed in target selections")
    }

    const [selections, setSelections] = useState<T[]>(initialSelections)

    function checkSelection(val: T) {
        const updatedSelections = [...selections, val]

        console.log("update selections")
        console.log(updatedSelections)
        setSelections(updatedSelections)
    }
    function uncheckSelection(val: T) {
        // remove the one that has it value
        const updatedSelections = selections.filter(x => !equalityComparer(x, val))
        setSelections(updatedSelections)
    }

    function isSelected(val: T) {
        const isSelected = containsWithEqualityComparer(selections, val, equalityComparer)
        return isSelected
    }

    function reset() {
        setSelections([])
    }

    const returns = {
        checkSelection,
        uncheckSelection,
        isSelected,
        reset,
        selections,
    }
    return returns;
}