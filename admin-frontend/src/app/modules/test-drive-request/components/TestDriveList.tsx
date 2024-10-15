import {TableFilter} from "../../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {testDrivesColumns} from "./table/columns/columns";
import {testtDriveFilters} from "./table/filters/TestDriveFilter";

export const TestDrivesList = () => {
    return (
        <>
            <TableFilter filters={testtDriveFilters}/>
            <KTCard>
                <Table columns={testDrivesColumns}/>
            </KTCard>
        </>
    )
}