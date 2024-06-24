// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from "../store.ts";

let cachedToken: string | null = null;

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:7060/',
        prepareHeaders: (headers, {getState}) => {
            // The prepareHeaders tries to get a token for each request.
            cachedToken = !cachedToken ? window.localStorage.getItem("token") : cachedToken

            if (!cachedToken) return headers

            headers.set("Authorization", "Bearer " + cachedToken)
            return headers;
        }
    }),
    endpoints: () => ({}),
})
