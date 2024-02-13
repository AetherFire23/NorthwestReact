export function hasDuplicates<T>(array: T[]) {
    return new Set(array).size !== array.length;
}

export function hasDuplicateWithComparer<T>(array: T[], equalityComparer: (arg1: T, arg2: T) => boolean) {
    let hasFoundValue: boolean = false

    // loop inside the function twice
    for (let i = 0; i < array.length; i++) {
        //if the inner loop has found a value, 
        if (hasFoundValue) break;

        const val = array[i]

        for (let x = 0; x < array.length; x++) {
            const val2 = array[x]

            // dont compare the same indexes because they WILL be equal.
            if (x === i) continue;

            // compare two values (that dont have the same index) with the equality comparer, allows for complex equalities.
            if (equalityComparer(val, val2)) {
                hasFoundValue = true
                // we are finished, so break outside the loop
                break;
            }
        }
    }

    // if it has found a value, it means there was a duplicate.
    return hasFoundValue
}


export function containsWithEqualityComparer<T>(array: T[], arg: T, equalityComparer: (param1: T, param2: T) => boolean) {

    return array.some(x => equalityComparer(x, arg))
}
