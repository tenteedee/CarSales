import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {insuranceFilter} from "./table/filters/InsuranceFilter";
import {insuranceColumns} from "./table/columns/columns";

export const InsuranceList = () => {
    return (
        <>
            <TableFilter filters={insuranceFilter}/>
            <KTCard>
                <Table columns={insuranceColumns}/>
            </KTCard>
        </>
    )
}