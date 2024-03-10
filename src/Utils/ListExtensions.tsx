export function hasDuplicates<T>(array: T[]) {
    return new Set(array).size !== array.length;
}

export function hasDuplicateWithComparer<T>(array: T[], equalityComparer: (arg1: T, arg2: T) => boolean) {
    let hasFoundDuplicate: boolean = false

    // loop inside the array twice (to check each value_
    for (let i = 0; i < array.length; i++) {
        //if the inner loop has found a value, break
        if (hasFoundDuplicate) break;

        const outerloopValue = array[i]

        for (let x = 0; x < array.length; x++) {
            const innerloopValue = array[x]

            // dont compare the same object to itself, i am look if any OTHER is a duplicate.
            if (x === i) continue;

            // compare two values (that dont have the same index) with the equality comparer, allows for complex equalities.
            if (equalityComparer(outerloopValue, innerloopValue)) {
                hasFoundDuplicate = true
                break;
            }
        }
    }

    return hasFoundDuplicate
}


export function containsWithEqualityComparer<T>(array: T[], arg: T, equalityComparer: (param1: T, param2: T) => boolean) {

    return array.some(x => equalityComparer(x, arg))
}

export function isEmpty<T>(a: Array<T>) {
    const isEmpty = a.length === 0

    return isEmpty;
}

export function removeSingle<T>(arr: Array<T>, toRemove: (arg: T) => boolean) {
    const updatedArray = arr.filter(x => !toRemove(x))

    if (updatedArray.length !== arr.length - 1) {
        console.log(updatedArray)
        console.log(arr)
        throw new Error("cannot remove more that a single element")
    }

    return updatedArray
}


export function removeElementById<T extends { id: string }>(arr: Array<T>, arg: T) {
    const updatedArray = removeSingle(arr, x => x.id === arg.id)
    return updatedArray
}

export function first<T>(arr: Array<T>, predicate: (arg: T) => boolean) {
    const foundItem = arr.find(predicate)

    if (!foundItem) {
        throw new Error("The sequence has found no elements")
    }

    return foundItem
}

/**
 * returns a new array containing the former array and the added elements.
 */
export function addRangeImmutable<T>(arr: Array<T>, arr2: Array<T>) {
    const updatedArray = [...arr, ...arr2]
    return updatedArray
}

export function addElementImmutable<T>(arr: Array<T>, element: T) {
    const updatedArray = [...arr, element]
    return updatedArray
}
