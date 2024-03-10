import {useState} from "react";


export function useRequestStatus<TReturn>() {
    const [data, setData] = useState({isSuccess: false, isFetching: false, isError: false, resultData: {} as TReturn})
    const setIsFetching = () => setData({...fetchData, resultData: data.resultData})
    const setIsSuccess = (result: TReturn) => setData({...successData, resultData: result})
    const setIsFailure = (error: any) => setData({...errorData, resultData: {} as TReturn})

    function triggerFetch(requestMethod: () => Promise<TReturn>, callback?: (arg: TReturn) => void) {
        setIsFetching()
        requestMethod().then(r => {
            if (callback) {
                callback(r)
            }
            setIsSuccess(r)
        }).catch(e => {
                console.log(e)
                setIsFailure(e)
            }
        )
    }

    return {
        data,
        triggerFetch,
    }
}




const successData = {
    isError: false,
    isFetching: false,
    isSuccess: true,
}

const errorData = {
    isError: true,
    isFetching: false,
    isSuccess: false
}

const fetchData = {
    isSuccess: false,
    isError: false,
    isFetching: true
}
