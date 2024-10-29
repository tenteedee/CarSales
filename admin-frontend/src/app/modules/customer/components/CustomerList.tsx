import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {customerFilters} from "./table/filters/CustomerFilter";
import {customersColumns} from "./table/columns/columns";

export const CustomerList = () => {
    return (
        <>
            <TableFilter filters={customerFilters}/>
            <KTCard>
                <Table columns={customersColumns}/>
            </KTCard>
        </>
    )
}