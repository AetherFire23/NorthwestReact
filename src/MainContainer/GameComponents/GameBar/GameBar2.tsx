import styled from 'styled-components'
import React, {useState} from 'react';
import {useAppSelector} from '../../../Redux/hooks.tsx';
import {isValidObject} from '../../../Utils/nice.tsx';
import useGameStateRefresher from './GameStateRefresh/GameStateFetcher.tsx';
import ChatLogMenu from "./TempComponents/ChatLogMenu/ChatLogMenu.tsx";
import ActionsMenu from "./TempComponents/ActionsMenu/ActionsMenu.tsx";

const MenuButtonDiv2 = styled.div<{ $iconUrl: string, $marginProps: { bottom: string, top: string } }>`
    background-image: url(${({$iconUrl}) => $iconUrl});
    background-size: cover;
    height: 6rem;
    width: 6rem;
    margin-top: ${({$marginProps}) => $marginProps.top};
    margin-bottom: ${({$marginProps}) => $marginProps.bottom};
    image-rendering: pixelated;
`

export type MenuSelections = "none" | "actions" | "character" | "logchat"
export default function GameBar2({gameId}: {
    gameId: string,
}) {
    useGameStateRefresher(gameId)
    const [selectedMenu, setSelectedMenu] = useState<MenuSelections>("none")
    const closeMenu = () => {
        setSelectedMenu("none")
    }
    const setMenuNoProp = (menu: MenuSelections, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setSelectedMenu(menu)
        e.stopPropagation()
    }
    const gameState = useAppSelector(x => x.gameState.gameState)
    return (
        <div>
            {isValidObject(gameState) && (
                <>
                    <div style={{
                        position: "absolute",
                        width: "100vw",
                        height: "100vh",
                    }}>
                        <div style={{
                            height: "50%",
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}>
                            <MenuButtonDiv2
                                onClick={(e) => setMenuNoProp("logchat", e)}
                                $iconUrl={"src/assets/Chatlog.png"}
                                $marginProps={{
                                    bottom: "",
                                    top: "2rem"
                                }}
                            />
                            <div style={{
                                marginLeft: "12rem",
                                marginRight: "12rem",

                            }}/>
                            <MenuButtonDiv2
                                onClick={(e) => setMenuNoProp("actions", e)}
                                $iconUrl={"src/assets/actions.png"}
                                $marginProps={{
                                    bottom: "",
                                    top: "2rem"
                                }}
                            />
                        </div>
                        <div style={{
                            height: "50%",
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "flex-end" // Aligns children at the bottom of the container
                        }}>
                            <MenuButtonDiv2
                                $iconUrl={"src/assets/character.png"}
                                $marginProps={{
                                    bottom: "2rem",
                                    top: ""
                                }}
                            />
                            {/*div to space more */}
                            <div style={{
                                marginLeft: "12rem",
                                marginRight: "12rem",

                            }}/>
                            <MenuButtonDiv2
                                $iconUrl={"src/assets/character.png"}
                                $marginProps={{
                                    bottom: "2rem",
                                    top: ""
                                }}
                                style={{
                                    visibility: "hidden"
                                }}
                            />
                        </div>
                    </div>


                    {selectedMenu === "logchat" && (
                        <ChatLogMenu closeMenu={() => closeMenu()}/>
                    )}
                    {selectedMenu === "actions" && (
                        <ActionsMenu closeMenu={closeMenu}/>
                    )}


                    {/*/!* <Logs selectedMenu={selectedMenu} closeMenu={closeMenu}/> *!/*/}
                    {/*{selectedMenu === "tasks" && (*/}
                    {/*    <MainTaskPanelFun2 closeMenu={closeMenu}/>*/}
                    {/*)}*/}
                    {/*<Inventory selectedMenu={selectedMenu} closeMenu={closeMenu}/>*/}

                    {/*<Chat closeMenu={closeMenu} selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>*/}
                    {/*<StyledBar>*/}
                    {/*    <MenuButton txt='inv' onClick={() => setSelectedMenu("inventory")}/>*/}
                    {/*    <MenuButton txt='chat' onClick={() => setSelectedMenu("chat")}/>*/}
                    {/*    <MenuButton txt='logs' onClick={() => setSelectedMenu("logs")}/>*/}
                    {/*    <MenuButton txt='Task' onClick={() => setSelectedMenu("tasks")}/>*/}
                    {/*    <MenuButton txt='ship' onClick={() => setSelectedMenu("ship")}/>*/}
                    {/*    <MenuButton txt='character' onClick={() => setSelectedMenu("chat")}/>*/}
                    {/*</StyledBar>*/}
                    {/*<OtherPlayers/>*/}

                    {/*{selectedMenu === "logs" && (*/}
                    {/*    <Logs closeMenu={closeMenu}/>*/}
                    {/*)}*/}


                </>
            )}
        </div>
    )
}