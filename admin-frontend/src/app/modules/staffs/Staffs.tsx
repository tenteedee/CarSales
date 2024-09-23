import {QueryRequestProvider} from "../../../_metronic/layout/core/QueryRequestProvider";
import {staffsColumns} from "./components/columns/columns";
import {getStaffs} from "./core/requests";
import {staffFilters} from "./components/filters/StaffFilter";
import {TableFilter} from "../../../_metronic/partials/table/filter/TableFilter";
import {KTCard} from "../../../_metronic/helpers";
import {QueryResponseProvider} from "../../../_metronic/layout/core/QueryResponseProvider";
import {FC} from "react";

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
const StaffsListWrapper: FC = () => {
    return (
        <>
            <QueryRequestProvider>
                <QueryResponseProvider id={"staffs"} request={getStaffs}>
                    <Staffs></Staffs>
                </QueryResponseProvider>
            </QueryRequestProvider>
        </>
    );

}
export {StaffsListWrapper}
