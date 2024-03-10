import {IVector, Rectangle, Vector} from "../Models/Vector";
import {selectCamera} from "../Redux/gameSlice";
import {useAppSelector} from "../Redux/hooks";

export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    return distance;
}

export function calcualteOffset(p: IVector, p2: IVector): IVector {
    const offsetPosition: IVector = {
        x: p.x - p2.x,
        y: p.y - p2.y,
    }

    return offsetPosition
}

export function logObject(message: string, o: any) {
    console.log(message)
    console.log(o)
}

// basic idea is that any worldPosition - camerPosition = screenPosition and vice-versa.
// IF screen position is x, it means that It was translated by the camera, so + x
export function useTransformations() {
    const camera = useAppSelector(selectCamera)
    const worldToScreen = (worldPosition: IVector) => new Vector(worldPosition.x - camera.x, worldPosition.y - camera.y) as IVector
    const mouseToWorld = (mouseEvent: MouseEvent) => new Vector(mouseEvent.clientX + camera.x, mouseEvent.clientY + camera.y) as IVector
    const screenToWorld = (screenPosition: IVector) => new Vector(screenPosition.x + camera.x, screenPosition.y + camera.y) as IVector
    const rectangleToScreen = (rect: Rectangle) => {
        const newRect: Rectangle = {
            position: worldToScreen(rect.position),
            height: rect.height,
            width: rect.width
        }
        return newRect
    }

    const transformations = {
        worldToScreen,
        mouseToWorld,
        screenToWorld,
        rectangleToScreen,
        camera
    }

    return transformations
}

export function getMousePosition(e: MouseEvent) {
    const mp: Vector = {
        x: e.clientX,
        y: e.clientY
    }
    return mp
}

export function getElementScreenPosition<T extends HTMLElement>(ref: React.RefObject<T>) {
    const boundingBox = ref.current?.getBoundingClientRect()

    const position: IVector = {
        x: boundingBox!.left,
        y: boundingBox!.top
    }

    return position
}

export function getElementRectangle<T extends HTMLElement>(ref: React.RefObject<T>) {
    const boundingBox = ref.current?.getBoundingClientRect()

    const elementSquare: Rectangle = {
        position: {x: boundingBox!.left, y: boundingBox!.top},
        width: boundingBox!.width,
        height: boundingBox!.height,
    }

    return elementSquare
}

export function calculateTranslation(vec1: IVector, vec2: IVector) {
    const translatedVector: IVector = {
        x: vec1.x - vec2.x,
        y: vec1.y - vec2.y,
    }

    return translatedVector
}

export function translateX(vec1: IVector, x: number) {
    const translated: IVector = {
        x: vec1.x - x,
        y: vec1.y
    }

    return translated
}

export function translateY(vec1: IVector, y: number) {
    const translated: IVector = {
        x: vec1.x,
        y: vec1.y - y
    }

    return translated
}

export function isWithin(num: number, min: number, max: number) {
    const isWithinRange = num > min && num < max
    return isWithinRange
}

export function isValidObject(obj: any) {

    const isFalsy = obj === null || obj === undefined

    if (isFalsy) return false;

    if(Object.keys(obj).length === 0) return false

    return true
}
