// The autorefresh will refresh the players and their state.
// The player just need to teleport to their predefined location, no animation at all
// So should just be
import {useAppSelector} from "../../Redux/hooks.tsx";
import styled from "styled-components";
import {IVector} from "./Models/Vector.ts";
import {useTransformations} from "../../Utils/nice.tsx";

const PlayerNameDiv = styled.div<{ $screenPosition: IVector }>`
    position: absolute;
    left: ${({$screenPosition}) => $screenPosition.x}px;
    top: ${({$screenPosition}) => $screenPosition.y}px;
    transform: translate(-50%, -50%) scale(1);
    transform-origin: 50% %; /* X-origin in the middle, Y-origin at the top */
    z-index: 99;
`;

const OtherPlayerDiv = styled.div<{ $screenPosition: IVector }>`
    background-color: white;
    position: absolute;
    left: ${({$screenPosition}) => $screenPosition.x}px;
    top: ${({$screenPosition}) => $screenPosition.y}px;
    width: 64px;
    height: 64px;
    background-image: url("src/assets/Untitled2.png");
    background-repeat: no-repeat;
    z-index: 99;
    border: antiquewhite;
`;

export default function OtherPlayers() {
    const players = useAppSelector(x => x.gameState.gameState.players)
    const {worldToScreen} = useTransformations()

    return (
        <div>
            {/* Default margin garbage needs to be set to 0 because of ul */}
            <ul style={{margin: "0px"}}>
                {players && (
                    players.map((player) => (
                        <li id={player.id}>
                            <PlayerNameDiv
                                id={` player ${player.name}, ${player.game}`}
                                $screenPosition={worldToScreen({x: player.x, y: player.y -25})}
                            >
                                {player.name}
                            </PlayerNameDiv>
                            <OtherPlayerDiv
                                id={` player ${player.name}, ${player.game}`}
                                $screenPosition={worldToScreen({x: player.x, y: player.y})}/>
                        </li>
                    ))
                )}
            </ul>
        </div>)
}

// TODO:
// Map each roleType to a portrait image.