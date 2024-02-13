import { Rectangle } from "./Models/Vector";

export interface RoomInfo {
    name: string,
    square: Rectangle
}
const initialRoom: RoomInfo = {
    name: "test",
    square: {
        height: 130,
        width: 300,
        position: { x: 106, y: 534 },
    }
}
export const rooms: RoomInfo[] = [
    initialRoom,
];



