import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { selectCamera, updateCamera } from "../Redux/gameSlice.ts"
import { useMouseEffect } from '../App.tsx';
import { isWithin } from '../Utils/nice.tsx';
import chalk from 'chalk';
import { calculateTranslation } from '../Utils/nice';
import { Vector } from '../Models/Vector.ts';

function useMoveCamera() {
    const dispatch = useAppDispatch()
    const cameraPosition = useAppSelector(selectCamera)

    function translateCamera(vec: Vector) {
        dispatch(updateCamera(calculateTranslation(cameraPosition, vec)))
        console.log("am i movinn")
    }

    // will have to make a function one day that detects center of screen
    function moveCamera(vec: Vector) {
        dispatch(updateCamera(vec))
    }

    const s = {
        cameraPosition,
        translateCamera,
        moveCamera
    }

    return s
}
export default function CamChange() {
    const { cameraPosition, translateCamera } = useMoveCamera()
    const moveDistance = 125;
    // useEffect(() => {
    //     const test = (e: KeyboardEvent) => {
    //         if (e.key === "w") {
    //             dispatch(updateCamera(translateY(cameraPosition, moveDistance)))
    //         }
    //         if (e.key === "a") {
    //             dispatch(updateCamera(translateX(cameraPosition, moveDistance)))
    //         }
    //         if (e.key === "s") {
    //             dispatch(updateCamera(translateY(cameraPosition, -moveDistance)))
    //         }
    //         if (e.key === "d") {
    //             dispatch(updateCamera(translateX(cameraPosition, -moveDistance)))
    //         }
    //     }
    //     window.addEventListener("keydown", test)

    //     return () => window.removeEventListener("keydown", test)
    // }, [cameraPosition])

    useMouseEffect((mouseScreenPos, world) => {
        const detectableGap = 50
        if (isWithin(mouseScreenPos.x, window.innerWidth - detectableGap, window.innerWidth)) {
            console.log(chalk.green("right"))
            translateCamera({ x: -moveDistance, y: 0 })
        }
        if (isWithin(mouseScreenPos.x, 0, detectableGap)) {
            console.log(chalk.green("left"))
            translateCamera({ x: moveDistance, y: 0 })
        }
        if (isWithin(mouseScreenPos.y, 0, detectableGap)) {
            console.log(chalk.green("up"))
            translateCamera({ x: 0, y: moveDistance })
        }
        if (isWithin(mouseScreenPos.y, window.innerHeight - detectableGap, window.innerHeight)) {
            console.log(chalk.green("down"))
            translateCamera({ x: 0, y: -moveDistance })
        }
    }, [cameraPosition])


    return (
        <div style={{overflow: "hidden", width: "100%", height: "100%"}}>
            {/* <button onClick={(e) => {
                dispatch(updateCamera({ x: cameraPosition.x - 50, y: cameraPosition.y }))
                e.stopPropagation()
            }}> Left</button>
            <button onClick={(e) => {
                dispatch(updateCamera({ x: cameraPosition.x + 50, y: cameraPosition.y }))
                e.stopPropagation()
            }}> Right</button> */}
        </div>
    )
}
