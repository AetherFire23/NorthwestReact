import styled from "styled-components"
import { MenuSelections } from "../Bar"
import Item from "./Item"
import { useState } from "react"
import { removeSingle } from "../../Utils/ListExtensions"

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
    width:  30%;
    height: 83%;
    top: 5%;
    left: ${({ $left }) => $left}%;
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
    left: ${({ $left }) => $left}%;
    top: 1%;
    font-size: larger;
    color: aliceblue;
`

function Inventory({ selectedMenu, closeMenu }: InventoryProps) {
    const isInventory = selectedMenu === "inventory"
    const [playerOneItems, setPlayer1Items] = useState(defaultPlayer1Items)
    const [roomsItems, setRoomItems] = useState(defaultRoomItems)

    function swapItems(item: IItem, isPlayerItem: boolean) {
        if (isPlayerItem) {
            setRoomItems([...roomsItems, item])
            const updatedPlayerItems = removeSingle(playerOneItems, x => x.id === item.id)
            setPlayer1Items(updatedPlayerItems)
        }
        else {
            setPlayer1Items([...playerOneItems, item])
            const updatedRoomItems = removeSingle(roomsItems, x => x.id === item.id)
            setRoomItems(updatedRoomItems)
        }
    }

    return (
        <div>
            {isInventory && (
                <InventoryScreenContainer>
                    <NameLabel $left={5}>
                        PlayerName
                    </NameLabel>
                    <NameLabel $left={55}>
                        RoomName
                    </NameLabel>
                    <ExitButtonDiv onClick={closeMenu}>
                        <label> X </label>
                    </ExitButtonDiv>

                    {/* Player items */}
                    <InventoryItemsContainer $left={5}>
                        {playerOneItems.map((x, i) => (
                            <li key={i}>
                                <Item onClick={() => swapItems(x, true)} item={x} />
                            </li>
                        ))}
                        {/* Room items */}
                    </InventoryItemsContainer>
                    <InventoryItemsContainer $left={55}>
                        {roomsItems.map((x, i) => (
                            <li key={i}>
                                <Item onClick={() => swapItems(x, false)} item={x} />
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
// Define the default items
const defaultPlayer1Items: IItem[] = [
    { id: crypto.randomUUID(), name: "item1" },
    { id: crypto.randomUUID(), name: "Item2" },
    { id: crypto.randomUUID(), name: "item1" },
    { id: crypto.randomUUID(), name: "Item2" },
    { id: crypto.randomUUID(), name: "item1" },
    { id: crypto.randomUUID(), name: "Item2" },
];

const defaultRoomItems: IItem[] = [
    { id: crypto.randomUUID(), name: "test" },
    { id: crypto.randomUUID(), name: "test" },
];