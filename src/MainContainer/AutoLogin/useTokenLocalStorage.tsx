export function useTokenLocalStorage() {
    const getToken: () => string | null = () => window.localStorage.getItem("token")
    const setToken = (token: string) => window.localStorage.setItem("token", token)
    return {
        getToken,
        setToken,
    }
}