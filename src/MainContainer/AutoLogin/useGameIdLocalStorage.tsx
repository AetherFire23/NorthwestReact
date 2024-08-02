export function useGameIdLocalStorage() {
    const getGameId: () => string | null = () => window.localStorage.getItem("gameId")
    const setGameId = (gameId: string) => window.localStorage.setItem("gameId", gameId)

    return {
        getGameId,
        setGameId,
    }
}

