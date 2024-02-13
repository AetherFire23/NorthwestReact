// // for each room id, summon a room,

// import styled from "styled-components";
// import { Rectangle } from "../Models/Vector"
// import { produce } from "immer";
// import { logObject, useTransformations } from "../Utils/nice";
// import { useState } from "react";


// const RoomStyledDiv = styled.div<{ $square: Rectangle }>`
//     left: ${({ $square }) => $square.position.x}px;
//     top: ${({ $square }) => $square.position.y}px;
//     width: ${({ $square }) => $square.width}px;
//     height: ${({ $square }) => $square.height}px;
//     padding: 20px;
//     position: absolute;
//     /* background-color: aquamarine; */
//     background-color: rgba(0, 217, 255, 0.603);
// `
// export default function Room() {

//     console.clear()
//     const { worldToScreen } = useTransformations()
//     const square: Rectangle = {
//         position: worldToScreen(initialRoom.square.position),
//         height: initialRoom.square.height,
//         width: initialRoom.square.width,
//     }

   
//     logObject("square", square.position)
//     return (
//         <RoomStyledDiv $square={square} onClick={() => console.log("clicked")}>

//         </RoomStyledDiv>
//     )
// }