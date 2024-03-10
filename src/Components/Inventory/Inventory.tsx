import styled from "styled-components"
import {MenuSelections} from "../Bar"
import Item from "./Item"
import {useAppDispatch, useAppSelector} from "../../Redux/hooks.tsx";
import {swapItemOptimistically} from "../../Redux/gameStateSlice.ts";
import * as shared from "../../Redux/query/generated.ts"
import {getSelectedRoom, isPlayerItem} from "../../Hooks/gameStateHooks.tsx";
import {usePutGameTransferitemMutation} from "../../Redux/query/generated.ts";

const InventoryScreenContainer = styled.div`
    background-color: black;
    width: 90%;
    height: 98%;
    left: 3%;
    top: 1%;
    position: absolute;
    z-index: 99;
`
const InventoryItemsContainer = styled.ul<{ $left: number }>`
    background-color: aliceblue;
    display: grid;
    grid-template-columns: repeat(2, 3);
    grid-auto-flow: dense;
    width: 30%;
    height: 83%;
    top: 5%;
    left: ${({$left}) => $left}%;
    padding-bottom: 1rem;
    overflow: scroll;
    position: absolute;
    padding-right: 1rem;
    padding-left: 0;
    margin-left: 0;
    user-select: none;
`
export const ExitButtonDiv = styled.div`
    background-color: aliceblue;
    width: 5%;
    height: 5%;
    position: absolute;
    top: 1rem;
    right: 1rem;
`

interface InventoryProps {
    selectedMenu: MenuSelections;
    closeMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const NameLabel = styled.div<{ $left: number }>`
    position: absolute;
    left: ${({$left}) => $left}%;
    top: 1%;
    font-size: larger;
    color: aliceblue;
`

function Inventory({selectedMenu, closeMenu}: InventoryProps) {
    const isInventory = selectedMenu === "inventory"
    const dispatch = useAppDispatch()
    const [transferItem, transferItemRequestData] = usePutGameTransferitemMutation()

    const gameStateSlice = useAppSelector(x => x.gameState)
    const roomItems = getSelectedRoom(gameStateSlice).items
    const playerItems = gameStateSlice.gameState.playerDto.items

    function handleSwapItem(item: shared.Item) {
        // if player, send to room, if room, send to player
        const targetId = isPlayerItem(gameStateSlice.gameState, item) ? gameStateSlice.gameState.localPlayerRoom.id : gameStateSlice.gameState.playerDto.id

        // idea: wait for RESPONSE before updating.
        // catch () => do nothing
        // then() => update
        transferItem({
            itemId: item.id,
            gameId: gameStateSlice.gameState.playerDto.gameId,
            targetId: targetId,
            ownerId: item.ownerId
        }).unwrap().then(r => {
            dispatch(swapItemOptimistically(item))
        })
    }

    return (
        <div>
            {isInventory && (
                <InventoryScreenContainer>
                    <NameLabel $left={5}>
                        {"name" + gameStateSlice.gameState.playerDto.name}
                    </NameLabel>
                    <NameLabel $left={55}>
                        {getSelectedRoom(gameStateSlice).name}
                    </NameLabel>
                    <ExitButtonDiv onClick={closeMenu}>
                        <label> X </label>
                    </ExitButtonDiv>

                    {/* Player items */}
                    <InventoryItemsContainer $left={5}>
                        {playerItems.map((x) => (
                            <li key={x.id}>
                                {/*<Item onClick={() => swapItems(x, true)} item={x}/>*/}
                                <Item onClick={() => handleSwapItem(x)} item={x}/>
                            </li>
                        ))}
                        {/* Room items */}
                    </InventoryItemsContainer>
                    <InventoryItemsContainer $left={55}>
                        {roomItems.map((x) => (
                            <li key={x.id}>
                                <Item onClick={() => handleSwapItem(x)} item={x}/>
                            </li>
                        ))}
                    </InventoryItemsContainer>
                </InventoryScreenContainer>
            )}
        </div>
    );
}

export default Inventory

export interface IItem {
    id: string,
    name: string,
}
