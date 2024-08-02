export interface FormState {
    shownTargets: ITarget[],
    formButtons: IFormButtons,

}

export interface ITarget {
    isHidden: boolean
    isChecked: boolean,
    name: string,
    onCheck: () => void,
}

export interface IFormButtons {
    canGoToPrevious: boolean,
    canSubmit: boolean,
    previous: () => void,
    submit: () => void,
    canCompleteTask: boolean,
    completeTask: () => void,
}