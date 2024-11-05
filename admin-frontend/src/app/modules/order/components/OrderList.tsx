import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {orderFilter} from "./table/filters/OrderFilter";
import {orderColumns} from "./table/columns/columns";

export const OrderList = () => {
    return (
        <>
            <TableFilter filters={orderFilter}/>
            <KTCard>
                <Table columns={orderColumns}/>
            </KTCard>
        </>
    )
}