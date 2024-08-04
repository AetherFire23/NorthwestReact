import { Rectangle } from "./MainContainer/GameComponents/Models/Vector";

export interface RoomInfo {
    name: string,
    square: Rectangle
}
const MiddleCorridor: RoomInfo = {
    name: "test",
    square: {
        height: 260,
        width: 350,
        position: { x: 50, y: 485 },
    }
}
export const rooms: RoomInfo[] = [
    MiddleCorridor,

];



