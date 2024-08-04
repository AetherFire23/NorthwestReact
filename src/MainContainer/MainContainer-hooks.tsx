import {useEffect} from "react"
import {getMousePosition, useTransformations} from "../Utils/nice"
import {Vector} from "./GameComponents/Models/Vector.ts";



export function useMouseLog() {
    const {camera, mouseToWorld} = useTransformations()

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            console.log(`Mouse position: ${e.clientX}x, ${e.clientY}y`)

            const world = mouseToWorld(e)
            console.log(`Mouse World: ${world.x}x ${world.y}y`)
        }
        window.addEventListener("click", handleClick)

        return () => window.removeEventListener("click", handleClick)
    }, [camera, mouseToWorld])
}

// Does something on click and passes click information as event
// lesson : you can pass any additional dependencies through React.DependencyList
export function useMouseEffect(clickHandler: (screenPosition: Vector, worldPosition: Vector) => void, deps?: React.DependencyList | undefined) {
    const {mouseToWorld} = useTransformations()

    useEffect(() => {
        function onClick(e: MouseEvent) {
            const worldPos = mouseToWorld(e)
            const screenPos = getMousePosition(e)

            clickHandler(screenPos, worldPos)
        }

        window.addEventListener("click", onClick)

        return () => window.removeEventListener("click", onClick)

    }, [deps])
}
