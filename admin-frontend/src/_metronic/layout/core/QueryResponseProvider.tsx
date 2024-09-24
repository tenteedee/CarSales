/* eslint-disable react-hooks/exhaustive-deps */
import {FC, useContext, useState, useEffect, useMemo} from 'react'
import {useQuery} from 'react-query'
import {
    createResponseContext,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    stringifyRequestQuery,
    WithChildren,
} from '../../helpers'
import {useQueryRequest} from './QueryRequestProvider'

type Props = {
    id: string
    request: (query: string) => any
}

const QueryResponseContext = createResponseContext<any>(initialQueryResponse)
const QueryResponseProvider: FC<Props & WithChildren> = ({id, request, children}) => {
    const {state} = useQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        `${id}-${query}`,
        () => {
            return request(query)
        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </QueryResponseContext.Provider>
    )
}

const useQueryResponse = () => useContext(QueryResponseContext)

function useQueryResponseData<T>(): Array<T> {
    const {response} = useQueryResponse()
    if (!response) {
        return []
    }
    return response?.data || []
}

// const useQueryResponseData = () => {
//   const {response} = useQueryResponse()
//   if (!response) {
//     return []
//   }

//   return response?.data || []
// }

const useQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useQueryResponsePayload = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useQueryResponse()
    if (!response || !response.payload) {
        return defaultPaginationState
    }

    return response.payload
}

const useQueryResponseLoading = (): boolean => {
    const {isLoading} = useQueryResponse()
    return isLoading
}

export {
    QueryResponseProvider,
    useQueryResponse,
    useQueryResponseData,
    useQueryResponsePagination,
    useQueryResponseLoading,
    useQueryResponsePayload,
}
