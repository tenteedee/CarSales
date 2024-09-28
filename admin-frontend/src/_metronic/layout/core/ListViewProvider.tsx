import {FC, useState, createContext, useContext, useMemo} from 'react'
import {
    ID,
    calculatedGroupingIsDisabled,
    calculateIsAllDataSelected,
    groupingOnSelect,
    initialListView,
    ListViewContextProps,
    groupingOnSelectAll,
    WithChildren,
} from '../../helpers'
import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider'
import {QueryResponse} from "../../../app/utils/model/models";

const ListViewContext = createContext<ListViewContextProps>(initialListView)

type Props = WithChildren & {
    onDelete?: (ids: Array<ID>) => Promise<QueryResponse>
};
const ListViewProvider: FC<Props> = ({children, onDelete}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useQueryResponse()
    const data = useQueryResponseData<any>()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <ListViewContext.Provider
            value={{
                selected,
                itemIdForUpdate,
                setItemIdForUpdate,
                disabled,
                isAllSelected,
                onSelect: (id: ID) => {
                    groupingOnSelect(id, selected, setSelected)
                },
                onSelectAll: () => {
                    groupingOnSelectAll<any>(isAllSelected, setSelected, data)
                },
                clearSelected: () => {
                    setSelected([])
                },
                onDelete: () => onDelete?.(selected),
            }}
        >
            {children}
        </ListViewContext.Provider>
    )
}

const useListView = () => useContext(ListViewContext)

export {ListViewProvider, useListView}
