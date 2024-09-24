import {FC, useState, createContext, useContext, useMemo} from 'react'

import {useQueryResponse, useQueryResponseData} from './QueryResponseProvider'
import {
    calculatedGroupingIsDisabled,
    calculateIsAllDataSelected, groupingOnSelect,
    groupingOnSelectAll,
    ID,
    initialListView,
    ListViewContextProps,
    WithChildren
} from "../../helpers";

const ListViewContext = createContext<ListViewContextProps>(initialListView)

const ListViewProvider: FC<WithChildren> = ({children}) => {
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useQueryResponse()
    const data = useQueryResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])
    // Function to handle delete with confirmation
    const onDelete = (): Promise<void> => {
        return new Promise((resolve, reject) => {
            // Your delete logic here
            // If successful, call resolve()
            resolve();

            // If there's an error, call reject() with an error
            // reject(new Error('Something went wrong'));
        });
    };

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
                    //groupingOnSelectAll(isAllSelected, setSelected, data)
                },
                onDelete: onDelete,
                clearSelected: () => {
                    setSelected([])
                },
            }}
        >
            {children}
        </ListViewContext.Provider>
    )
}

const useListView = () => useContext(ListViewContext)

export {ListViewProvider, useListView}
