import styled from "styled-components"
import { MenuSelections } from "./Bar"

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
    grid-template-columns: repeat(3,1fr);
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

const Item = styled.div`
    background-color: black;
    width: 75%;
    height: 4rem;
    margin-left: 1rem;
    margin-top: 1rem;
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

const NameLabel = styled.div<{$left: number}>`
    position: absolute;
    left: ${({$left}) => $left}%;
    top: 1%;
    font-size: larger;
    color: aliceblue;
`

function Inventory({ selectedMenu, closeMenu }: InventoryProps) {
    const isInventory = selectedMenu === "inventory"
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
                    <InventoryItemsContainer $left={5}>
                        {defaultItems.map((_, i) => (
                            <li key={i}>
                                <Item />
                            </li>
                        ))}

                    </InventoryItemsContainer>
                    <InventoryItemsContainer $left={55}>
                        {defaultItems.map((_, i) => (
                            <li key={i}>
                                <Item />
                            </li>
                        ))}
                    </InventoryItemsContainer>
                </InventoryScreenContainer>
            )}
        </div>
    );
}

export default Inventory

const defaultItems = [
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
    "test",
    "test2",
    "test3",
]