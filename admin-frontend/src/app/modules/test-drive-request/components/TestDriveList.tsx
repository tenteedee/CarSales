import {KTCard} from "../../../../_metronic/helpers";
import {Table} from "../../../../_metronic/partials/table/Table";
import {testDrivesColumns} from "./table/columns/columns";
import {TestDriveFiltersComponent} from "./table/filters/TestDriveFilter";

export const TestDrivesList = () => {
    return (
        <>
            <TestDriveFiltersComponent/>
            <KTCard>
                <Table columns={testDrivesColumns}/>
            </KTCard>
        </>
    )
}