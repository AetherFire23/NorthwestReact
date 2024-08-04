import styled from 'styled-components'
import React, { useState} from 'react';
import Chat from './Chat/Chat.tsx';
import Inventory from './Inventory/Inventory.tsx';
import { useAppSelector} from '../../../Redux/hooks.tsx';
import {isValidObject} from '../../../Utils/nice.tsx';
import useGameStateRefresher from './GameStateRefresh/GameStateFetcher.tsx';
import MainTaskPanelFun2 from '../Tasks/MainTaskPanelFun2.tsx';
import OtherPlayers from "../OtherPlayers.tsx";

const StyledBar = styled.div`
    background-color: black;
    width: 98%;
    height: 20%;
    left: 0%;
    top: 0%;
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
export default function GameBar({gameId}: {
    gameId: string,
}) {
    useGameStateRefresher(gameId)
    const [selectedMenu, setSelectedMenu] = useState<MenuSelections>("none")
    const closeMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedMenu("none")
        e.stopPropagation()
    }

    const gameState = useAppSelector(x => x.gameState.gameState)
    return (
        <div>
            {isValidObject(gameState) && (
                <div>
                    {/* <Logs selectedMenu={selectedMenu} closeMenu={closeMenu}/> */}
                    {selectedMenu === "tasks" && (
                        <MainTaskPanelFun2 closeMenu={closeMenu}/>
                    )}
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
                    <OtherPlayers/>
                </div>
            )}
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

// function useGameStateRefresher() {
//     const dispatch = useAppDispatch()
//     const mainMenuSlice = useAppSelector(x => x.mainMenu)
//     const [triggerFetchGameState,] = api.useLazyGetGameGetGameStateQuery()

//     useEffect(() => {
//         const onTick = () => {
//             const player = mainMenuSlice!.userDto!.players[0]!

//             // Faire le GameStateSlice pour pouvoir savoir si le timestamp y'est null ou pas.
//             // et ensuite storer le result dans le slice de redux
//             // logObject("this is player", player)
//             triggerFetchGameState({ lastTimeStamp: undefined, playerId: player.id }).unwrap().then(fetchedGameState => {
//                 dispatch(updateGameStateSlice({
//                     gameState: fetchedGameState,
//                     currentPlayerId: player.id!,
//                 }))
//                 console.log(fetchedGameState)
//             })
//         }
//         const intervalId = setInterval(onTick, 2000)
//         return () => clearInterval(intervalId)
//     }, []);
// }
