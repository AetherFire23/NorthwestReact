// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from "../store.ts";

const cachedToken: string = ""

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7060/',
        prepareHeaders: (headers, {getState}) => {
            // The prepareHeaders tries to get a token for each request.
            const token = window.localStorage.getItem("token")
            console.log(token)

            if (!token) return headers

            headers.set("Authorization", "Bearer " + token)

            console.log("did I prepare headers correctly")
            return headers;
        }
    }),
    endpoints: () => ({}),

})
