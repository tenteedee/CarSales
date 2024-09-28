import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {staffFilters} from "./table/filters/StaffFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {staffsColumns} from "./table/columns/columns";

export const StaffsList = () => {
    return (
        <>
            <TableFilter filters={staffFilters}/>
            <KTCard>
                <Table columns={staffsColumns}/>
            </KTCard>
        </>
    )
}