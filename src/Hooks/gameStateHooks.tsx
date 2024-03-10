import {IGameStateSlice} from "../Redux/gameStateSlice.ts";
import * as shared from "../Redux/query/generated.ts";

export function getRoomItemsByName(gameState: shared.GameStateRead, roomName: string) {
    const room = gameState.rooms?.find(r => r.name === roomName);

    if (!room) {
        console.error("Invalid room name")
    }

    const items = room!.items ?? []
    return items
}

export function isPlayerItem(gameState: shared.GameStateRead, item: shared.Item) {
    const isPlayerItem = item.ownerId === gameState.playerDto?.id
    return isPlayerItem
}

export function getPlayerRoom(gameState: shared.GameStateRead) {
    const currentRoomId = gameState.playerDto.currentGameRoomId
    const playerRoom = gameState.rooms.find(x => x.id === currentRoomId)

    return playerRoom
}

export function getSelectedRoom(gameStateSlice: IGameStateSlice) {
    const selectedRoom = gameStateSlice.gameState.rooms.find(x => x.id === gameStateSlice.currentSelectedRoomId)

    if (!selectedRoom) {
        throw new Error("room cannot be null, dummy !")
    }

    return selectedRoom
}
