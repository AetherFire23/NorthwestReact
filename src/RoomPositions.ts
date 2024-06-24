import { Rectangle } from "./MainContainer/GameComponents/Models/Vector";

export interface RoomInfo {
    name: string,
    square: Rectangle
}
const MiddleCorridor: RoomInfo = {
    name: "test",
    square: {
        height: 130,
        width: 300,
        position: { x: 106, y: 534 },
    }
}
export const rooms: RoomInfo[] = [
    MiddleCorridor,

];



