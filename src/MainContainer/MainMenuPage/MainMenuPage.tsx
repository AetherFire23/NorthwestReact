import {useAppSelector} from "../../Redux/hooks.tsx";
import {LobbyDto, MainMenuState, PostMainmenuCreatelobbyApiArg} from "../../Redux/query/generated.ts";
import {usePostMainmenuCreatelobbyMutation} from "../../Redux/query/generated.ts";
import {useMainMenuRefresh} from "./MainMenuPage-hooks.tsx";

export default function MainMenuPage({setGameId}: {
    setGameId: React.Dispatch<React.SetStateAction<string>>
}) {
    const mainMenu: MainMenuState = useAppSelector(x => x.mainMenu)
    const lobbies = mainMenu.userDto?.availableLobbies
    const [triggerCreateLobby,] = usePostMainmenuCreatelobbyMutation();
    useMainMenuRefresh()

    // AutoJoin lobby at this point

    function joinGame(gameId: string) {
        setGameId(gameId)
    }
    function createNewLobby() {
        const arg: PostMainmenuCreatelobbyApiArg = {
            userId: mainMenu.userDto?.id
        }
        triggerCreateLobby(arg)
    }

    return (
        <>
            <button onClick={createNewLobby}> Create Lobby</button>
            <ul>
                {lobbies?.map(lobby => (
                    <li id={lobby.id}>
                        <JoinLobbyButton lobby={lobby}/>
                    </li>
                ))}
            </ul>

            <ul>
                {mainMenu!.userDto!.activeGames!.map(x => (
                    <li id={x.id}>
                        <button onClick={() => joinGame(x.id!)}> Game - {x.id} </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

function JoinLobbyButton(lobby: {
    lobby: LobbyDto,
}) {
    return (
        <button>
            {lobby.lobby.id}
        </button>
    )
}