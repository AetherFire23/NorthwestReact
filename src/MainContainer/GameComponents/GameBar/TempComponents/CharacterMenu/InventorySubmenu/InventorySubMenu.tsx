import {Item, usePutGameTransferitemMutation} from "@src/Redux/query/generated.ts";
import {useAppDispatch, useAppSelector} from "@src/Redux/hooks.tsx";
import {getSelectedRoom, isPlayerItem} from "@src/Hooks/gameStateHooks.tsx";
import {swapItemOptimistically} from "@src/Redux/gameStateSlice.ts";
import styles from "@src/TextModule.module.css"
import React from "react";

export default function InventorySubMenu() {
    const dispatch = useAppDispatch()
    const [transferItem, transferItemRequestData] = usePutGameTransferitemMutation()

    const gameStateSlice = useAppSelector(x => x.gameState)
    const roomItems = getSelectedRoom(gameStateSlice).items
    const playerItems = gameStateSlice.gameState.playerDto.items

    function handleSwapItem(item: Item) {
        // if player, send to room, if room, send to player
        const targetId = isPlayerItem(gameStateSlice.gameState, item) ? gameStateSlice.gameState.localPlayerRoom.id : gameStateSlice.gameState.playerDto.id

        // idea: wait for RESPONSE before updating.
        // catch () => do nothing
        // then() => update
        transferItem({
            itemId: item.id,
            gameId: gameStateSlice.gameState.playerDto.gameId,
            targetId: targetId,

        }).unwrap().then(r => {
            dispatch(swapItemOptimistically(item))
        })
    }

    return (
        <div style={{
            height: "100%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
        }}>
            <div style={{
                width: "50%",
                padding: "10px", // Adjust padding to create space around child divs
            }}>
                <div className={styles.pixelSelectableWhite} style={{margin: "10px 0"}}> sd</div>
                <div className={styles.pixelSelectableWhite} style={{margin: "10px 0"}}> sd</div>
            </div>
            <div style={{
                width: "50%",
                padding: "10px", // Adjust padding to create space around child divs
            }}>
                <div className={styles.pixelSelectableWhite} style={{margin: "10px 0"}}> sd</div>
            </div>
        </div>
    )
}

interface IItemProps {
    item: Item,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}


function ItemComponent({ item, onClick }: IItemProps) {
    return (
        <div
            onClick={onClick}
            className={styles.pixelSelectableWhite}>
            {item.itemType}
        </div>
    )
}