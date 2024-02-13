export interface IVector {
    x: number;
    y: number;
}
export class Vector implements IVector {
    // this is how to declare props in ctor
    constructor(public x: number, public y: number) {
    }

}
export const vectorZero: IVector = {
    x: 0,
    y: 0,
}
export interface Rectangle {
    position: IVector,
    width: number,
    height: number,
}
export function squareContains(sq: Rectangle, vec: Vector) {
    const minX = sq.position.x
    const maxX = sq.position.x + sq.width

    const minY = sq.position.y
    const maxY = sq.position.y + sq.height

    const contains =
        (vec.x > minX && vec.x < maxX)
        &&
        (vec.y > minY && vec.y < maxY)

    return contains
}