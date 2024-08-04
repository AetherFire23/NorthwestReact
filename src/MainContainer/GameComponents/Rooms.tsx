import styled from 'styled-components';
import { RoomInfo, rooms } from '../../RoomPositions';
import { useTransformations } from '../../Utils/nice';
import { Rectangle } from './Models/Vector';
// import { RoomInfo, rooms } from '../RoomPositions';
// import { Rectangle } from '../Models/Vector';
// import { useTransformations } from '../Utils/nice';

function Rooms() {
    return (
        <div style={{overflow: "hidden", width: "100%", height: "100%"}}>
            <ul>
                {
                    rooms && rooms.map((x, i) => (
                        <li id={`room ${x.name} ${i} `} key={x.name}>
                            <Room room={x} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Rooms


function Room({ room }: { room: RoomInfo }) {
    const { rectangleToScreen} = useTransformations()
    return (
        <RoomStyledDiv $square={rectangleToScreen(room.square)}>
        </RoomStyledDiv>
    )
}

const RoomStyledDiv = styled.div<{ $square: Rectangle }>`
    left: ${({ $square }) => $square.position.x}px;
    top: ${({ $square }) => $square.position.y}px;
    width: ${({ $square }) => $square.width}px;
    height: ${({ $square }) => $square.height}px;
    padding: 0px;
    position: absolute;
    /* background-color: aquamarine; */
    background-color: rgba(0, 217, 255, 0.603);
`