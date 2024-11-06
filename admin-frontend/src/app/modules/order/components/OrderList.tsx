import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {orderColumns} from "./table/columns/columns";
import {OrderFiltersComponent} from "./table/filters/OrderFilter";

export const OrderList = () => {
    return (
        <>
            <OrderFiltersComponent/>
            <KTCard>
                <Table columns={orderColumns}/>
            </KTCard>
        </>
    )
}