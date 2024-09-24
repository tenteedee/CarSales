import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {staffsColumns} from "./components/columns/columns";
import {getStaffs} from "./core/requests";
import {staffFilters} from "./components/filters/StaffFilter";
import {TableFilter} from "../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../_metronic/helpers";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {Table} from "../../../_metronic/partials/table/Table";
import { ListViewProvider } from "../../../_metronic/layout/core/ListViewProvider";

const Staffs = () => {
    return (
        <>
            <TableFilter filters={staffFilters}/>
            <KTCard>
                <Table columns={staffsColumns}/>
            </KTCard>
        </>
    )
}
const StaffsListWrapper = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"staffs"} request={getStaffs}>
                    <ListViewProvider>
                        <Staffs/>
                    </ListViewProvider>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );

}
export {StaffsListWrapper}
