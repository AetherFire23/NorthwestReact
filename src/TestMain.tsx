// import { LegacyRef, MouseEventHandler, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
// import styled, { keyframes } from 'styled-components';
// import s from "../src/assets/anime.jpg"

// const calculateDistance = (x1, y1, x2, y2) => {
//   return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
// };

// const moveRight = (xPos: string, yPos: string, startX: string, startY: string) => keyframes`
//   0% {
//     transform: translate(${startX}px, ${startY}px);
//   }
//   100% {
//     transform: translate(${xPos}px, ${yPos}px);
//   } 
// `;

// const StyledDiv = styled.div<{ $xPos: string, $yPos: string, $startX: string, $startY: string, $duration: string }>`
//   background-color: blue;
//   color: white;
//   padding: 20px;
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   animation: ${({ $xPos, $yPos, $startX, $startY }) => moveRight($xPos, $yPos, $startX, $startY)} ${({ $duration }) => $duration}s linear forwards;
//   overflow: hidden;
//   z-index: 1;
// `;
// const ImageDiv = styled.div<{ $xPos: string, $yPos: string }>`
// position: absolute;
// background-color: blue;
//   width: 100vw;
//   height: 90vh;
//   color: white;
//   left: ${({ $xPos }) => $xPos}px;
//   top: 0px;
//   padding: 20px;
//   background-image: url("../src/assets/anime.jpg");
//   background-position: ${({ $xPos, $yPos }) => $xPos + 'px ' + $yPos + 'px'};
//   left: ${({ $xPos }) => $xPos}px;
//   top: ${({ $yPos }) => $yPos}px;
//   z-index: -10;
//   /* Replace with the actual path to your image */

// `;
// interface IVector {
//   x: number,
//   y: number
// }
// function App() {
//   const squareRef = useRef<HTMLDivElement>(null)
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [y, setY] = useState(0);
//   const [x, setX] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [otherCount, setOtherCount] = useState(0)
//   const [iterations, setIterations] = useState(0)
//   const [cameraPosition, setCameraPosition] = useState<IVector>({ x: 0, y: 0 })

//   function handleMouseClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//     const squarePosition = squareRef.current?.getBoundingClientRect()
//     setStartX(squarePosition?.x as number)
//     setStartY(squarePosition?.y as number)

//     // must always go were the mouse goes, but the actual x-y of the square arent necessarily (world position)
//     const newDistance = calculateDistance(squarePosition.x, squarePosition?.y, e.clientX, e.clientY);
//     setDuration(Math.max(newDistance / 150))


//     setY(e.clientY)
//     setX(e.clientX)


//     // doing collision:
//     // 
//     console.log(cameraPosition)
//   }

//   function handleKeyPress(e) {
//     setCameraPosition({ x: cameraPosition.x - 5, y: cameraPosition.y - 5 })
//     e.stopPropagation()
//     console.log(`did camera pos change`)
//     console.log(cameraPosition)
//   }

//   useEffect(() => {


//     // window.addEventListener('scroll', handleKeyPress)

//     // let lastDate = Date.now()
//     // const intervalId = setInterval(() => {
//     //   // Simulated API response with new positions
//     //   const delta = Date.now() - lastDate
//     //   lastDate = Date.now()
//     //   console.log(`${delta} : ${iterations}`)
//     //   const newSquarePosition = {
//     //     x: Math.random() * window.innerWidth,
//     //     y: Math.random() * window.innerHeight,
//     //   };
//     //   const squarePosition = squareRef.current?.getBoundingClientRect()
//     //   setStartX(squarePosition.x - cameraPosition.x);
//     //   setStartY(squarePosition?.y - cameraPosition.y);
//     //   setX(newSquarePosition.x - cameraPosition.x);
//     //   setY(newSquarePosition.y - cameraPosition.y);

//     //   const newDistance = calculateDistance(squarePosition.x, squarePosition.y, newSquarePosition.x, newSquarePosition.y);
//     //   setDuration(Math.max(newDistance / 1000));
//     //   // setIterations((prev) => prev + 1)
//     //   setIterations(iterations + 1)
//     // }, 2000);
//     // // important : or else it restarts at each rerender !
//     // // really needs to clean it up each time.
//     // return () => clearInterval(intervalId)
//   })

//   return (
//     <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', zIndex: 0 }} onClick={handleMouseClick}>
//       <label> {x}, {y}</label>
//       <button onClick={handleKeyPress}> move camera </button>
//       <button onClick={(e) => {
//         setOtherCount(otherCount + 1)
//         e.stopPropagation()
//       }
//       } style={{ zIndex: 1 }}> unrelated rerender</button>

//       <label> {otherCount}</label>
//       <StyledDiv
//         onClick={() => setY(x + 50)}
//         $startX={(startX - cameraPosition.x).toString()}
//         $startY={startY.toString()}
//         $xPos={(x - cameraPosition.x).toString()}
//         $yPos={y.toString()}
//         $duration={duration.toString()}
//         ref={squareRef}
//       ></StyledDiv>


//       <ImageDiv $xPos={(0 - cameraPosition.x).toString()} $yPos={(0 - cameraPosition.y).toString()}>

//       </ImageDiv>
//     </div>
//   );
// }

// export default App;
