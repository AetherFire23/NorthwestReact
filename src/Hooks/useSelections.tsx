import {useState} from "react";
import {addElementImmutable, containsWithEqualityComparer, hasDuplicateWithComparer} from "../Utils/ListExtensions";

// idea: does not keep a local version of the CHOICEs of selections. SImply keeps a local version of the SELECTED elements.
// therefore I can use isSelected and check for a value.
export function useSelections<T>(equalityComparer: (arg1: T, arg2: T) => boolean) {
    // expects non-duplicates
    const [selections, setSelections] = useState<T[]>([])

    function checkSelection(val: T) {
        setSelections([...selections, val])
    }

    function uncheckSelection(val: T) {
        // KEEP all the ones that are NOT equal to this value
        const updatedSelections = selections.filter(x => !equalityComparer(x, val))
        setSelections(updatedSelections)
    }

    function isSelected(val: T) {
        const isSelected = containsWithEqualityComparer(selections, val, equalityComparer)
        return isSelected
    }

    function reset(arr?: Array<T>) {
        if (arr) {
            setSelections(arr)
        } else {
            setSelections([])
        }
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
