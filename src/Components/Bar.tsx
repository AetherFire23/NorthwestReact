import styled from 'styled-components'
import Inventory from './Inventory/Inventory';
import {useEffect, useState} from 'react';
import Chat from './Chat/Chat';
import GameTaskMenu from './Tasks/GameTaskMenu';
import Logs from './Logs/Logs';
import {useAppSelector} from "../Redux/hooks.tsx";

const StyledBar = styled.div`
    background-color: black;
    width: 40%;
    height: 20%;
    left: 5%;
    top: 75%;
    position: absolute;
    display: flex;
    align-items: center;
    padding-right: 1rem;
    box-shadow: 0 0px 25px rgba(0, 0, 0, 1); /* Slightly stronger shadow */
    border-radius: 10px; /* More rounded corners */
`;
const MenuButtonDiv = styled.div`
    width: 15%;
    height: 60%;
    background-color: aliceblue;
    margin-left: 1rem;
    border-radius: 10px; /* More rounded corners */
`
export type MenuSelections = "none" | "inventory" | "ship" | "logs" | "chat" | "tasks"
export default function Bar() {

    useGameStateFetcher()
    const [selectedMenu, setSelectedMenu] = useState<MenuSelections>("none")
    const closeMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedMenu("none")
        e.stopPropagation()
    }
    return (
        <div>
            <Logs selectedMenu={selectedMenu} closeMenu={closeMenu}/>
            <GameTaskMenu closeMenu={closeMenu} selectedMenu={selectedMenu}/>
            <Inventory selectedMenu={selectedMenu} closeMenu={closeMenu}/>
            <Chat closeMenu={closeMenu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
            <StyledBar>
                <MenuButton txt='inv' onClick={() => setSelectedMenu("inventory")}/>
                <MenuButton txt='chat' onClick={() => setSelectedMenu("chat")}/>
                <MenuButton txt='logs' onClick={() => setSelectedMenu("logs")}/>
                <MenuButton txt='Task' onClick={() => setSelectedMenu("tasks")}/>
                <MenuButton txt='ship' onClick={() => setSelectedMenu("ship")}/>
                <MenuButton txt='character' onClick={() => setSelectedMenu("chat")}/>
            </StyledBar>
        </div>
    )
}

interface MenuButtonParams {
    txt: string,
    onClick?: () => void,
}

function MenuButton({onClick, txt}: MenuButtonParams) {
    function onClick2(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (onClick) {
            onClick()
        }
        e.stopPropagation();
    }

    return (
        <MenuButtonDiv onClick={onClick2}>
            <label> {txt}</label>
        </MenuButtonDiv>
    )
}

function useGameStateFetcher() {
    const userDto = useAppSelector(x => x.mainMenu.userDto);

    useEffect(() => {
        function onTick() {
            console.log("ontick")
            console.log(userDto.players.$values[0])
            if (userDto.players.$values[0] && userDto.players.$values[0].length > 0) {
                triggerGetGameState({
                    playerId: userDto.players[0].id,
                    lastTimeStamp: lastTimeStamp
                }).unwrap().then(x => {
                    console.log('successfully fetched gameState');
                    console.log(x);
                    console.log(userDto);
                }).catch(error => {
                    console.error('Error fetching gameState:', error);
                });
            } else {
                console.log("No players available yet.");
            }
        }

        const intervalId = setInterval(onTick, 1000);
        return () => clearInterval(intervalId);
    }, );
}
