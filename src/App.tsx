import {Provider} from "react-redux";
import {store} from "./Redux/store";
import React, {useEffect, useState} from "react";
import MainContainer from "./MainContainer/MainContainer.tsx";

export default function App() {
    return (
        <div style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            overflow: "hidden",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0"
        }}>
            <Provider store={store}>
                <MainContainer/>
            </Provider>
        </div>
    )
}

// // Does something on click and passes click information as event
// // lesson : you can apss anny additional dependencies through React.DependencyList
// export function useMouseEffect(clickHandler: (screenPosition: Vector, worldPosition: Vector) => void, deps?: React.DependencyList | undefined) {
//     const {mouseToWorld} = useTransformations()
//
//     useEffect(() => {
//         function onClick(e: MouseEvent) {
//             const worldPos = mouseToWorld(e)
//             const screenPos = getMousePosition(e)
//
//             clickHandler(screenPos, worldPos)
//         }
//
//         window.addEventListener("click", onClick)
//
//         return () => window.removeEventListener("click", onClick)
//
//     }, [deps])
// }
