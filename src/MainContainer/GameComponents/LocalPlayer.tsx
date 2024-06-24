import styled, {keyframes} from 'styled-components';

import {useRef, useState} from 'react';
import {IVector, squareContains} from './Models/Vector';
import {useAppDispatch, useAppSelector} from '../../Redux/hooks';
import {selectCamera, selectLocalPlayer, updateLocalPlayer} from '../../Redux/gameSlice';
import {getElementScreenPosition, logObject, useTransformations} from '../../Utils/nice';
import {rooms} from '../../RoomPositions';
import {useMouseEffect} from "../MainContainer-hooks.tsx";

// import { useMouseEffect } from '../App';
// import { rooms } from '../RoomPositions';
// import { IVector, squareContains } from '../Models/Vector';
// import { useAppDispatch, useAppSelector } from "../Redux/hooks";
// import { selectCamera, selectLocalPlayer, updateLocalPlayer } from "../Redux/gameSlice";
// import { getElementScreenPosition, logObject, useTransformations } from '../Utils/nice';

// Remember everything gotta be at the correct PIXEL position
// html-css doesnt care about my world positions.
const moveAtPointClickAnimation = (fromPosition: IVector, targetPosition: IVector) => keyframes`
    0% {
        transform: translate(${fromPosition.x}px, ${fromPosition.y}px);
    }
    100% {
        transform: translate(${targetPosition.x}px, ${targetPosition.y}px);
    }
`;

const StyledDiv = styled.div<{ $localPosition: IVector, $targetPosition: IVector }>`
    background-color: blue;
    padding: 20px;
    position: absolute;
        /* left: ${({$localPosition}) => $localPosition.x}px;
    top: ${({$localPosition}) => $localPosition.y}px; */
    animation: ${({
                      $localPosition,
                      $targetPosition
                  }) => moveAtPointClickAnimation($localPosition, $targetPosition)} 1s linear forwards;
`;

export default function SquareObj() {
    const dispatch = useAppDispatch()
    const camera = useAppSelector(selectCamera)
    const localPlayer = useAppSelector(selectLocalPlayer)
    const {screenToWorld, mouseToWorld, worldToScreen} = useTransformations()
    const localPlayerPosition = worldToScreen(localPlayer)
    const [targetWorldPosition, setTargetWorldPosition] = useState<IVector>(localPlayerPosition)
    const squareRef = useRef<HTMLDivElement>(null)
    const [isAnimating, setIsAnimating] = useState(false)


    // useEffect(() => {
    //     const handleClick = (e: MouseEvent) => {
    //         const mouseWorld = mouseToWorld(e)
    //         if (isAnimating) {
    //             // When interrupting the ongoing css animation, the playerPosition is contained in the view in screenPx
    //             // since the css animation is not controlled by react.
    //             const playerRefWorldPosition = screenToWorld(getElementScreenPosition(squareRef))
    //             dispatch(updateLocalPlayer(playerRefWorldPosition))
    //             setTargetWorldPosition(mouseWorld)
    //         }
    //         else {
    //             setTargetWorldPosition(mouseWorld)
    //             setIsAnimating(true)
    //             console.log("animating")
    //         }
    //     };
    //     window.addEventListener("click", handleClick);
    //     return () => {
    //         window.removeEventListener("click", handleClick);
    //     };
    // }, [camera, squareRef, isAnimating]);


    // seems to work lol
    useMouseEffect((_, mouseWorldPosition) => {
        // To check if out of bounds
        // need all the rooms, the current room the player is in. if room contains click
        const currentRoomSquare = rooms.find(x => x.name === "test")?.square
        const isOutsideCurrentRoom = !squareContains(currentRoomSquare!, mouseWorldPosition)
        logObject("is outside current:", isOutsideCurrentRoom)

        if (isOutsideCurrentRoom) {
            return
        }

        if (isAnimating) {
            // When interrupting the ongoing css animation, the playerPosition is contained in the view in screenPx
            // since the interpolating positions during the css animation is not controlled by react.
            const playerRefWorldPosition = screenToWorld(getElementScreenPosition(squareRef))
            dispatch(updateLocalPlayer(playerRefWorldPosition))
            setTargetWorldPosition(mouseWorldPosition)
        } else {
            setTargetWorldPosition(mouseWorldPosition)
            setIsAnimating(true)
            console.log("animating")
        }
    }, [squareRef, isAnimating])

    function onAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {

        // targetWorldPosition
        const newPosition: IVector = {
            x: targetWorldPosition.x,
            y: targetWorldPosition.y
        }
        dispatch(updateLocalPlayer(newPosition))
        setIsAnimating(false)
    }

    return (
        <StyledDiv $localPosition={localPlayerPosition} $targetPosition={worldToScreen(targetWorldPosition)}
                   onAnimationEnd={onAnimationEnd} ref={squareRef}>

        </StyledDiv>
    )
}
